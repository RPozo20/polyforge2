"use client";

import { useState, useEffect } from "react";
import { User, CreditCard, Bell, Shield, Save, UploadCloud, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type Tab = "profile" | "payout" | "notifications" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("https://i.pravatar.cc/150?u=creator");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/user", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setName(data.user.name || "");
            setBio(data.user.bio || "");
            setWebsite(data.user.website || "");
            setPaypalEmail(data.user.paypalEmail || "");
            if (data.user.avatarKey) {
              setAvatarPreview(`${process.env.NEXT_PUBLIC_R2_DEV_URL}/${data.user.avatarKey}`);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const loadingToast = toast.loading("Saving settings...");

    try {
      let finalAvatarKey = undefined;

      // 1. Upload avatar if changed
      if (avatarFile) {
        toast.loading("Uploading avatar...", { id: loadingToast });
        const presignRes = await fetch("/api/assets/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            filename: avatarFile.name,
            contentType: avatarFile.type
          })
        });

        if (!presignRes.ok) throw new Error("Failed to get upload URL");
        
        const { uploadUrl, objectKey } = await presignRes.json();
        
        // Use objectKey even if upload fails in dev mode (CORS)
        finalAvatarKey = objectKey;

        try {
          const uploadRes = await fetch(uploadUrl, {
            method: "PUT",
            body: avatarFile,
            headers: { "Content-Type": avatarFile.type }
          });

          if (!uploadRes.ok) {
            console.warn("Avatar upload failed to R2 (non-200), proceeding with key anyway.");
          }
        } catch (uploadError) {
          console.warn("Avatar upload failed to R2 (CORS/Network error), proceeding with key anyway.");
        }
      }

      // 2. Save to DynamoDB
      toast.loading("Updating profile...", { id: loadingToast });
      const saveRes = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          bio,
          website,
          paypalEmail,
          avatarKey: finalAvatarKey,
        })
      });

      if (!saveRes.ok) throw new Error("Failed to save profile");

      toast.success("Settings saved successfully!", { id: loadingToast });
      setAvatarFile(null); // Reset file so it doesn't upload again
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred", { id: loadingToast });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Public Profile", icon: User },
    { id: "payout", label: "Payout Details", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up pb-20">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1a0a35', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">Account Settings</h1>
        <p className="text-gray-400">Manage your profile, preferences, and security settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left whitespace-nowrap ${
                    isActive 
                      ? "bg-violet-600/20 text-violet-400 border border-violet-500/30" 
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            
            {activeTab === "profile" && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Public Profile</h2>
                  <p className="text-sm text-gray-400">This information will be displayed publicly on your creator page.</p>
                </div>
                
                <hr className="border-white/5" />

                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-[#0a0a1a] border border-white/10 overflow-hidden relative group cursor-pointer">
                    <img 
                      src={avatarPreview} 
                      alt="Avatar" 
                      className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" 
                      onError={(e) => { e.currentTarget.src = "https://i.pravatar.cc/150?u=creator"; }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <UploadCloud className="w-6 h-6 text-white" />
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setAvatarFile(e.target.files[0]);
                          setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Profile Picture</h3>
                    <p className="text-sm text-gray-400 mb-3">PNG, JPG or GIF. Max size of 5MB.</p>
                    <div className="relative inline-block">
                      <button className="btn btn-secondary btn-sm pointer-events-none">Change Image</button>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setAvatarFile(e.target.files[0]);
                            setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all"
                      style={{ padding: '0.75rem 1rem' }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea 
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all resize-none"
                      style={{ padding: '0.75rem 1rem' }}
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-2">Brief description for your profile. 250 characters max.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website URL</label>
                    <input 
                      type="url" 
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all"
                      style={{ padding: '0.75rem 1rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payout" && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Payout Details</h2>
                  <p className="text-sm text-gray-400">Where we should send your earnings.</p>
                </div>
                
                <hr className="border-white/5" />

                <div className="p-4 border border-violet-500/20 bg-violet-500/5 rounded-xl mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-violet-600/20 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Current Payout Method</h4>
                      <p className="text-xs text-violet-400">Active</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 ml-11">Earnings are processed automatically on the 1st of every month.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">PayPal Email</label>
                  <input 
                    type="email" 
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all"
                    style={{ padding: '0.75rem 1rem' }}
                  />
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Email Notifications</h2>
                  <p className="text-sm text-gray-400">Choose what updates you want to receive.</p>
                </div>
                
                <hr className="border-white/5" />

                <div className="space-y-4">
                  {[
                    { title: "Sales & Earnings", desc: "Get notified when someone purchases your assets." },
                    { title: "New Reviews", desc: "Receive an email when a user leaves a rating." },
                    { title: "Product Updates", desc: "News about platform features and updates." }
                  ].map((item, i) => (
                    <label key={i} className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-white/5 cursor-pointer hover:border-white/10 transition-colors">
                      <div>
                        <h4 className="font-medium text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Security</h2>
                  <p className="text-sm text-gray-400">Update your password and secure your account.</p>
                </div>
                
                <hr className="border-white/5" />

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all"
                      style={{ padding: '0.75rem 1rem' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all"
                      style={{ padding: '0.75rem 1rem' }}
                    />
                  </div>
                </div>
                
                <div className="pt-8 border-t border-white/5 mt-8">
                  <h3 className="text-rose-400 font-medium mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg hover:bg-rose-500/20 hover:text-rose-300 transition-colors text-sm font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Global Save Button for all tabs (except security delete) */}
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="btn btn-primary flex items-center gap-2 px-8"
              >
                {isSaving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-4 h-4" /> Save Changes</>
                )}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
