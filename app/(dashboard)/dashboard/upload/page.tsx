"use client";

import { useState, useEffect, Suspense } from "react";
import { UploadCloud, FileType, CheckCircle2, X, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function UploadAssetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Characters");
  const [tags, setTags] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");
  
  // Tech Specs State
  const [polyCount, setPolyCount] = useState<number | "">("");
  const [triangleCount, setTriangleCount] = useState<number | "">("");
  const [lodLevels, setLodLevels] = useState<number | "">("");
  const [formats, setFormats] = useState("");
  const [software, setSoftware] = useState("");
  const [textureResolution, setTextureResolution] = useState("");
  const [hasBones, setHasBones] = useState(false);
  const [boneCount, setBoneCount] = useState<number | "">("");
  const [hasBlendShapes, setHasBlendShapes] = useState(false);
  
  // Edit mode original states
  const [originalObjectKey, setOriginalObjectKey] = useState<string | undefined>();
  const [originalCoverKey, setOriginalCoverKey] = useState<string | undefined>();
  const [createdAt, setCreatedAt] = useState<string | undefined>();

  useEffect(() => {
    if (editId) {
      const fetchAsset = async () => {
        try {
          const res = await fetch(`/api/assets/${editId}`);
          if (res.ok) {
            const data = await res.json();
            const a = data.asset;
            setTitle(a.title || "");
            setDescription(a.description || "");
            setCategory(a.category || "Characters");
            setTags(a.tags ? a.tags.join(", ") : "");
            setIsFree(a.isFree);
            setPrice(a.price ? a.price.toString() : "");
            setOriginalObjectKey(a.objectKey);
            setOriginalCoverKey(a.coverImageKey);
            setCreatedAt(a.createdAt);
            setPolyCount(a.polyCount || "");
            setTriangleCount(a.triangleCount || "");
            setLodLevels(a.lodLevels || "");
            setFormats(a.formats ? a.formats.map((f:any)=>f.name).join(", ") : "");
            setSoftware(a.software ? a.software.join(", ") : "");
            setTextureResolution(a.textureResolution || "");
            setHasBones(a.hasBones || false);
            setBoneCount(a.boneCount || "");
            setHasBlendShapes(a.hasBlendShapes || false);
            
            if (a.coverImageKey) {
              setCoverPreview(`${process.env.NEXT_PUBLIC_R2_DEV_URL}/${a.coverImageKey}`);
            }
          }
        } catch (e) {
          console.error("Failed to load asset for editing", e);
        }
      };
      fetchAsset();
    }
  }, [editId]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handlePublish = async () => {
    if (!file && !editId) {
      toast.error("Please select a 3D asset file to upload.");
      return;
    }
    if (!title) {
      toast.error("Please provide a title for your asset.");
      return;
    }
    if (!isFree && !price) {
      toast.error("Please set a price or mark the asset as free.");
      return;
    }

    setIsUploading(true);
    const loadingToast = toast.loading(editId ? "Updating asset..." : "Preparing upload...");

    try {
      let finalObjectKey = originalObjectKey;

      if (file) {
        toast.loading("Initializing multipart upload...", { id: loadingToast });
        
        // 1. Create Multipart Upload
        const createRes = await fetch("/api/assets/multipart/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type || "application/octet-stream",
          }),
        });
        
        if (!createRes.ok) {
          const errData = await createRes.json().catch(() => ({}));
          throw new Error(`Failed to initialize upload: ${errData.error || createRes.statusText}`);
        }
        const { uploadId, objectKey } = await createRes.json();
        finalObjectKey = objectKey;

        // 2. Split file into chunks (5MB minimum for S3, except the last one)
        const CHUNK_SIZE = 5 * 1024 * 1024;
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const parts: { ETag: string; PartNumber: number }[] = [];

        try {
          for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);
            const partNumber = i + 1;

            toast.loading(`Uploading part ${partNumber} of ${totalChunks}...`, { id: loadingToast });

            // Get presigned URL for this part
            const signRes = await fetch("/api/assets/multipart/sign-part", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                objectKey,
                uploadId,
                partNumber
              })
            });
            if (!signRes.ok) throw new Error(`Failed to sign part ${partNumber}`);
            const { signedUrl } = await signRes.json();

            // Upload the chunk
            const uploadRes = await fetch(signedUrl, {
              method: "PUT",
              body: chunk,
            });
            if (!uploadRes.ok) throw new Error(`Failed to upload part ${partNumber}`);
            
            // Extract ETag from response headers.
            let etag = uploadRes.headers.get("ETag");
            if (!etag) {
                console.warn("ETag missing in response header. Ensure CORS ExposeHeaders includes ETag.");
                etag = "dummy-etag";
            } else {
                // Ensure ETag has double quotes as required by AWS S3 Complete command
                if (!etag.startsWith('"')) {
                    etag = `"${etag}"`;
                }
            }
            
            parts.push({ ETag: etag, PartNumber: partNumber });
          }

          toast.loading("Assembling uploaded parts...", { id: loadingToast });

          // 3. Complete Multipart Upload
          const completeRes = await fetch("/api/assets/multipart/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              objectKey,
              uploadId,
              parts
            })
          });
          
          if (!completeRes.ok) {
            const errData = await completeRes.json().catch(() => ({}));
            throw new Error(`Failed to complete upload: ${errData.error || completeRes.statusText}`);
          }

        } catch (uploadError) {
          console.error("Multipart upload failed:", uploadError);
          // Optional: Abort upload to clean up incomplete parts
          await fetch("/api/assets/multipart/abort", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ objectKey, uploadId })
          }).catch(e => console.warn("Failed to abort upload:", e));
          
          throw uploadError; // Rethrow to stop the flow
        }
      }

      let finalCoverImageKey = originalCoverKey;

      if (coverImage) {
        toast.loading("Uploading cover image...", { id: loadingToast });
        const coverPresignRes = await fetch("/api/assets/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: coverImage.name,
            contentType: coverImage.type || "image/jpeg",
          }),
        });

        if (!coverPresignRes.ok) throw new Error("Failed to get presigned URL for cover image");
        const { uploadUrl: coverUploadUrl, objectKey: coverObjectKey } = await coverPresignRes.json();

        // Always assign the key
        finalCoverImageKey = coverObjectKey;

        try {
          const coverUploadRes = await fetch(coverUploadUrl, {
            method: "PUT",
            headers: { "Content-Type": coverImage.type || "image/jpeg" },
            body: coverImage,
          });
          if (!coverUploadRes.ok) console.warn("Cover R2 upload returned non-200 status", coverUploadRes.status);
        } catch (error) {
          console.warn("Cover upload failed", error);
        }
      }

      // 3. Save asset metadata to DynamoDB
      toast.loading("Saving asset details to database...", { id: loadingToast });
      
      const method = editId ? "PUT" : "POST";
      const payload: any = {
        title,
        description,
        category,
        tags: tags.split(",").map(t => t.trim()),
        price: isFree ? 0 : parseFloat(price),
        isFree,
        objectKey: finalObjectKey,
        coverImageKey: finalCoverImageKey,
        polyCount,
        triangleCount,
        lodLevels,
        formats,
        software,
        textureResolution,
        hasBones,
        boneCount,
        hasBlendShapes,
      };
      
      if (editId) {
        payload.id = editId;
        payload.createdAt = createdAt;
      }

      const dbRes = await fetch("/api/assets", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!dbRes.ok) throw new Error("Failed to save asset metadata");

      toast.success("Asset published successfully!", { id: loadingToast });
      
      // Redirect to assets list after a short delay
      setTimeout(() => {
        router.push("/dashboard/assets");
      }, 1500);

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred during upload.", { id: loadingToast });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-20">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1a0a35', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />

      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">{editId ? "Edit Asset" : "Upload New Asset"}</h1>
          <p className="text-gray-400">{editId ? "Update your 3D model details." : "Add a new 3D model, texture pack, or environment to your studio."}</p>
        </div>
        <button 
          onClick={handlePublish}
          disabled={isUploading}
          className="btn btn-primary hidden sm:flex items-center gap-2"
        >
          {isUploading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> {editId ? "Updating..." : "Publishing..."}</>
          ) : (
            editId ? "Update Asset" : "Publish Asset"
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Upload Dropzone */}
          <div 
            className={`border-2 border-dashed rounded-2xl py-16 px-10 flex flex-col items-center justify-center transition-all duration-300 ${
              isDragging 
                ? "border-violet-500 bg-violet-500/10" 
                : "border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-white/10"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">{file.name}</h3>
                <p className="text-sm text-gray-400 mb-6">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                <button 
                  onClick={() => setFile(null)}
                  disabled={isUploading}
                  className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" /> Remove file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center pointer-events-none">
                <div className="w-16 h-16 rounded-2xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Drag & drop your 3D files here</h3>
                <p className="text-sm text-gray-400 mb-6 max-w-sm">
                  Supports .glb, .gltf, .fbx, .obj, and .zip archives up to 500MB.
                </p>
                <div className="pointer-events-auto">
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    onChange={(e) => e.target.files && setFile(e.target.files[0])} 
                    disabled={isUploading}
                  />
                  <label htmlFor="file-upload" className={`btn btn-secondary cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    Browse Files
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Form Details */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col gap-8">
            <h3 className="text-2xl font-display font-bold text-white mb-2">Asset Details</h3>
            
            <div>
              <label className="block text-center text-sm font-medium text-gray-300 mb-3">Asset Title <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isUploading}
                placeholder="e.g. Cyberpunk City Environment Pack" 
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50"
                style={{ textAlign: 'center' }}
              />
            </div>
            
            <div>
              <label className="block text-center text-sm font-medium text-gray-300 mb-3">Description</label>
              <textarea 
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isUploading}
                placeholder="Describe what's included, technical details, polygon count, etc." 
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none disabled:opacity-50"
                style={{ textAlign: 'center' }}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-center text-sm font-medium text-gray-300 mb-3">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isUploading}
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none disabled:opacity-50"
                  style={{ textAlign: 'center', textAlignLast: 'center' }}
                >
                  <option>Characters</option>
                  <option>Environments</option>
                  <option>Props</option>
                  <option>Vehicles</option>
                </select>
              </div>
              <div>
                <label className="block text-center text-sm font-medium text-gray-300 mb-3">Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  disabled={isUploading}
                  placeholder="sci-fi, low-poly, rigged..." 
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50"
                  style={{ textAlign: 'center' }}
                />
              </div>
            </div>
          </div>

          {/* Tech Specs */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col gap-8">
            <h3 className="text-2xl font-display font-bold text-white mb-2">Technical Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-center text-sm font-medium text-gray-300 mb-3">Poly Count</label>
                <input 
                  type="number" 
                  value={polyCount}
                  onChange={(e) => setPolyCount(e.target.value === "" ? "" : Number(e.target.value))}
                  disabled={isUploading}
                  placeholder="e.g. 15000" 
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50"
                  style={{ textAlign: 'center' }}
                />
              </div>
              <div>
                <label className="block text-center text-sm font-medium text-gray-300 mb-3">Triangle Count</label>
                <input 
                  type="number" 
                  value={triangleCount}
                  onChange={(e) => setTriangleCount(e.target.value === "" ? "" : Number(e.target.value))}
                  disabled={isUploading}
                  placeholder="e.g. 30000" 
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50"
                  style={{ textAlign: 'center' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="block text-center text-sm font-medium text-gray-300 mb-3">LOD Levels</label>
                <input 
                  type="number" 
                  value={lodLevels}
                  onChange={(e) => setLodLevels(e.target.value === "" ? "" : Number(e.target.value))}
                  disabled={isUploading}
                  placeholder="e.g. 3" 
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50"
                  style={{ textAlign: 'center' }}
                />
              </div>
              <div>
                <label className="block text-center text-sm font-medium text-gray-300 mb-3">Texture Resolution</label>
                <input 
                  type="text" 
                  value={textureResolution}
                  onChange={(e) => setTextureResolution(e.target.value)}
                  disabled={isUploading}
                  placeholder="e.g. 4096x4096" 
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50"
                  style={{ textAlign: 'center' }}
                />
              </div>
              <div className="flex items-center justify-center pt-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={hasBlendShapes}
                    onChange={(e) => setHasBlendShapes(e.target.checked)}
                    disabled={isUploading}
                    className="w-5 h-5 rounded border-white/10 bg-[#0a0a1a] text-violet-500 focus:ring-violet-500"
                  />
                  <span className="text-sm font-medium text-gray-300">Has Blend Shapes</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer self-center">
                  <input 
                    type="checkbox" 
                    checked={hasBones}
                    onChange={(e) => setHasBones(e.target.checked)}
                    disabled={isUploading}
                    className="w-5 h-5 rounded border-white/10 bg-[#0a0a1a] text-violet-500 focus:ring-violet-500"
                  />
                  <span className="text-sm font-medium text-gray-300">Has Bones</span>
                </label>
                {hasBones && (
                  <input 
                    type="number" 
                    value={boneCount}
                    onChange={(e) => setBoneCount(e.target.value === "" ? "" : Number(e.target.value))}
                    disabled={isUploading}
                    placeholder="Bone Count" 
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50 mt-2"
                    style={{ textAlign: 'center' }}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
              <div>
                <label className="block text-center text-sm font-medium text-gray-300 mb-3">Included Formats (comma separated)</label>
                <input 
                  type="text" 
                  value={formats}
                  onChange={(e) => setFormats(e.target.value)}
                  disabled={isUploading}
                  placeholder="FBX, OBJ, Blend..." 
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50"
                  style={{ textAlign: 'center' }}
                />
              </div>
              <div>
                <label className="block text-center text-sm font-medium text-gray-300 mb-3">Compatible Software (comma separated)</label>
                <input 
                  type="text" 
                  value={software}
                  onChange={(e) => setSoftware(e.target.value)}
                  disabled={isUploading}
                  placeholder="Unreal Engine, Unity, Blender..." 
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50"
                  style={{ textAlign: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Settings */}
        <div className="flex flex-col gap-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col gap-6">
            <h3 className="text-2xl font-display font-bold text-white mb-2">Pricing</h3>
            
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input 
                    type="radio" 
                    name="pricing" 
                    className="peer sr-only" 
                    checked={!isFree} 
                    onChange={() => setIsFree(false)}
                    disabled={isUploading}
                  />
                  <div className="w-5 h-5 rounded-full border-2 border-white/20 peer-checked:border-violet-500 peer-checked:bg-violet-500 transition-colors"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white group-hover:text-violet-400 transition-colors">Paid Asset</p>
                  <p className="text-sm text-gray-400 mt-1">Set a price for this asset.</p>
                  
                  {!isFree && (
                    <div className="mt-4 relative animate-fade-in-up">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        disabled={isUploading}
                        placeholder="29.99"
                        min="0"
                        step="0.01"
                        className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl pr-5 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                        style={{ paddingLeft: '3rem' }}
                      />
                    </div>
                  )}
                </div>
              </label>

              <div className="h-px w-full bg-white/5 my-4"></div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input 
                    type="radio" 
                    name="pricing" 
                    className="peer sr-only" 
                    checked={isFree}
                    onChange={() => {
                      setIsFree(true);
                      setPrice("");
                    }}
                    disabled={isUploading}
                  />
                  <div className="w-5 h-5 rounded-full border-2 border-white/20 peer-checked:border-violet-500 peer-checked:bg-violet-500 transition-colors"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <div>
                  <p className="font-medium text-white group-hover:text-violet-400 transition-colors">Free Asset</p>
                  <p className="text-sm text-gray-400 mt-1">Available for anyone to download.</p>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col gap-6">
            <h3 className="text-2xl font-display font-bold text-white mb-2">Thumbnails</h3>
            <div className={`${coverPreview ? '' : 'aspect-video'} bg-[#0a0a1a] border border-dashed border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:border-violet-500/50 hover:bg-white/5 transition-all relative overflow-hidden group`}>
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const img = e.target.files[0];
                    setCoverImage(img);
                    setCoverPreview(URL.createObjectURL(img));
                  }
                }}
                disabled={isUploading}
              />
              {coverPreview ? (
                <img src={coverPreview} alt="Cover Preview" className="w-full h-auto max-h-[500px] object-contain" />
              ) : (
                <div className="text-center z-0">
                  <FileType className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-400">Add cover image</p>
                </div>
              )}
            </div>
            {coverPreview && (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setCoverImage(null);
                  setCoverPreview(null);
                }}
                disabled={isUploading}
                className="mt-3 text-sm text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
              >
                <X className="w-4 h-4" /> Remove cover
              </button>
            )}
          </div>

          <div className="pt-4 flex gap-3 sm:hidden">
            <button className="flex-1 btn btn-ghost" disabled={isUploading}>Save Draft</button>
            <button 
              className="flex-1 btn btn-primary flex justify-center items-center gap-2" 
              onClick={handlePublish}
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UploadAssetPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center text-violet-400">Loading upload form...</div>}>
      <UploadAssetForm />
    </Suspense>
  );
}
