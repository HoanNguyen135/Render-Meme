import { useEcho, useEchoModelProviders } from "@merit-systems/echo-react-sdk";
import { experimental_generateImage as generateImage } from "ai";
import { useState } from "react";
import {
  getCryptoImageSuggestions,
  type CryptoImageSuggestion,
} from "../lib/crypto-image-suggestions";

function SuggestionList({
  query,
  onUseExample,
  disabled,
}: {
  query: string;
  onUseExample: (example: string) => void;
  disabled?: boolean;
}) {
  const suggestions: CryptoImageSuggestion[] = getCryptoImageSuggestions(query);

  const getEmojiForLabel = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("logo")) return "🔷";
    if (l.includes("nft")) return "🖼️";
    if (l.includes("meme")) return "🤣";
    if (l.includes("chart") || l.includes("trading")) return "📈";
    if (l.includes("wallet") || l.includes("ui")) return "📱";
    if (l.includes("mascot")) return "🦊";
    return "✨";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {suggestions.map((s) => (
        <button
          key={s.label}
          type="button"
          onClick={() => onUseExample(s.examplePrompt)}
          disabled={disabled}
          className="group flex flex-col items-start gap-3 p-4 bg-white/90 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex-none h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-lg text-white shadow-inner">
              <span aria-hidden>{getEmojiForLabel(s.label)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm truncate">{s.label}</div>
                <div className="text-[11px] text-gray-400">
                  {s.label === "NFT Art" ? "Art" : ""}
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                {s.description}
              </div>
            </div>
          </div>

          <div className="w-full mt-2 text-xs text-gray-700 dark:text-gray-200 italic truncate">
            {s.examplePrompt}
          </div>

          <div className="w-full flex items-center justify-end mt-2">
            <span className="text-[11px] text-gray-400 mr-auto">
              Click to insert
            </span>
            <div className="px-2 py-1 bg-gradient-to-r from-gray-100 to-white dark:from-gray-700 dark:to-gray-800 text-xs rounded-lg">
              Use
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function ImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [suggestionQuery, setSuggestionQuery] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { openai } = useEchoModelProviders();
  const { user, isLoading } = useEcho();

  const handleGenerateImage = async () => {
    if (!prompt.trim() || isGenerating || !user) return;

    setIsGenerating(true);
    setError(null);
    setImageUrl(null);

    try {
      const result = await generateImage({
        model: openai.image("gpt-image-1"),
        prompt: prompt.trim(),
        size: "1024x1024",
        providerOptions: { openai: { quality: "low" } },
      });

      if (result.image) {
        setImageUrl(`data:image/png;base64,${result.image.base64}`);
      } else {
        setError("No image was generated");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "crypto-image.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const copyImageToClipboard = async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new (window as any).ClipboardItem({ [blob.type]: blob }),
      ]);
    } catch (e) {
      // ignore copy errors silently
    }
  };

  if (!user && isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading Echo providers...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Please sign in to generate images.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-900/60 dark:to-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl backdrop-blur-sm">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Create crypto images
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Generate logos, NFT concepts, memes and charts from a short
              description. Use the examples to get started quickly.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* <div className="text-xs text-gray-500">Signed in as</div>
            <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
              {user?.email ?? user?.name ?? "Account"}
            </div> */}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* Suggestions panel */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Suggestions
            </label>
            <div className="flex gap-2">
              <input
                value={suggestionQuery}
                onChange={(e) => setSuggestionQuery(e.target.value)}
                placeholder="Filter suggestions (e.g. logo, nft, meme)"
                className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-900"
                disabled={isGenerating}
              />
              <button
                onClick={() => setSuggestionQuery("")}
                className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                type="button"
              >
                Clear
              </button>
            </div>

            <SuggestionList
              query={suggestionQuery}
              onUseExample={(p) =>
                setPrompt((prev) => (prev ? prev + "\n" + p : p))
              }
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Image Description
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                rows={4}
                disabled={isGenerating}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleGenerateImage}
                disabled={!prompt.trim() || isGenerating}
                className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg transition-all"
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate Image"
                )}
              </button>

              <button
                onClick={() => {
                  setPrompt("");
                  setImageUrl(null);
                  setError(null);
                }}
                className="px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl"
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-600">Error: {error}</div>
        </div>
      )}

      {imageUrl && (
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={imageUrl}
              alt="Generated image"
              className="w-full h-auto block"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={downloadImage}
              className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-md"
            >
              Download PNG
            </button>
            <button
              onClick={copyImageToClipboard}
              className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-md"
            >
              Copy to clipboard
            </button>
            <button
              onClick={() => navigator.clipboard?.writeText(prompt)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border rounded-md"
            >
              Copy prompt
            </button>
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="flex items-center justify-center p-8">
          {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div> */}
          {/* <span className="ml-3 text-gray-600 dark:text-gray-300">
            Generating your image...
          </span> */}
        </div>
      )}
    </div>
  );
}
