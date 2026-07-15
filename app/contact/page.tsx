"use client";
// app/contact/page.tsx
import React, { useState } from "react";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left */}
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Contact</p>
              <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Get in Touch
              </h1>
              <p className="text-[var(--text-secondary)] mb-8">
                Have a question, partnership inquiry, or need support? We respond within 24 hours on business days.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: "General Inquiries", value: "hello@polyforge.io" },
                  { icon: <MessageSquare className="w-5 h-5" />, label: "Press & Media", value: "press@polyforge.io" },
                  { icon: <Mail className="w-5 h-5" />, label: "Creator Support", value: "creators@polyforge.io" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-white flex-shrink-0 glow-sm">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{c.label}</p>
                      <p className="text-sm text-violet-400">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 glow-sm">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Message Sent!</h2>
                    <p className="text-[var(--text-secondary)]">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Name</label>
                        <input
                          type="text"
                          className="input w-full"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email</label>
                        <input
                          type="email"
                          className="input w-full"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Subject</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Message</label>
                      <textarea
                        className="input w-full min-h-32 resize-y"
                        placeholder="Tell us more..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-full">
                      Send Message <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
