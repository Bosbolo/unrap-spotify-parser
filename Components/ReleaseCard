import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ReleaseCard({ release, index }) {
  const openInSpotify = () => {
    window.open(release.url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={openInSpotify}
      className="bg-[#181818] border border-white/10 rounded-lg p-4 flex items-center justify-between gap-4 hover:bg-[#282828] hover:border-white/20 transition-all duration-200 cursor-pointer group"
    >
      <p className="font-medium text-white/90 flex-1 truncate" title={release.title}>
        {release.title}
      </p>
      <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors shrink-0" />
    </motion.div>
  );
}
