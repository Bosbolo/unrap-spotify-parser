import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReleaseCard from "../components/ReleaseCard";

export default function HomePage() {
  const [inputText, setInputText] = useState("");
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for content URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const contentParam = urlParams.get("content");
    if (contentParam) {
      setInputText(decodeURIComponent(contentParam));
    }
  }, []);

  const handleFindReleases = () => {
    setIsLoading(true);
    setReleases([]);

    // Simulate processing delay for a better UX
    setTimeout(() => {
      let lines;

      // Check if input contains line breaks (textbox format) or bullet points (URL format)
      if (inputText.includes("\n")) {
        // Textbox format: split by line breaks and remove "-   " prefix
        lines = inputText
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((line) => line.replace(/^-\s+/, "")); // Remove "-   " prefix
      } else {
        // URL parameter format: split by "• " and handle first item
        lines = inputText
          .split("• ")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
      }

      const spotifyReleases = lines.map((line) => {
        // Find the text after the last " - "
        const parts = line.split(" - ");
        const albumName =
          parts.length > 1 ? parts[parts.length - 1].trim() : line.trim();

        return {
          title: line.trim(), // Keep the full line for display on the card
          url: `https://open.spotify.com/search/${encodeURIComponent(albumName)}`, // Use only the album name for the search URL
        };
      });

      setReleases(spotifyReleases);
      setIsLoading(false);
    }, 500);
  };

  const handleClear = () => {
    setInputText("");
    setReleases([]);
  };

  return (
    <div className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#181818] p-6 rounded-2xl border border-white/10 shadow-2xl shadow-black/20"
      >
        <h2 className="text-lg font-semibold text-white/90 mb-4">
          Paste your newsletter content below
        </h2>
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Example:\n-   Artist 1, Artist 2, Artist 3 - Album Name\n-   Artist 4 - Album Name 2\n..."
          className="bg-[#282828] border-white/20 text-white/90 rounded-lg min-h-[200px] focus:ring-2 focus:ring-[#1DB954] focus-visible:ring-offset-0 focus-visible:ring-[#1DB954]"
        />
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleFindReleases}
            disabled={!inputText || isLoading}
            className="w-full sm:w-auto bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold flex-grow"
          >
            <Sparkles
              className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            {isLoading ? "Finding..." : "Find Releases"}
          </Button>
          {(inputText || releases.length > 0) && (
            <Button
              onClick={handleClear}
              variant="ghost"
              className="w-full sm:w-auto text-white/50 hover:text-white/80 hover:bg-white/10 sm:ml-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {releases.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <h3 className="text-xl font-semibold text-white/90 px-2">
              Found {releases.length} Releases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {releases.map((release, index) => (
                  <ReleaseCard key={index} release={release} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
