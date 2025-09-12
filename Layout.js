import React from "react";
import { Music4 } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#121212] text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <header className="py-4 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
            <Music4 className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Undrap – Spotify Release Finder
          </h1>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
      <footer className="text-center p-6 text-xs text-white/40">
        <p>Paste your newsletter content to find releases on Spotify.</p>
      </footer>
    </div>
  );
}
