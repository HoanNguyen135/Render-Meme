// Suggests image types for crypto-related image generation

export type CryptoImageSuggestion = {
  label: string;
  description: string;
  examplePrompt: string;
};

export const cryptoImageSuggestions: CryptoImageSuggestion[] = [
  {
    label: "Token Logo",
    description: "Generate a logo for a new cryptocurrency token.",
    examplePrompt:
      'Create a sleek, modern logo for a token called "SolX" with a blue and silver color scheme.',
  },
  {
    label: "NFT Art",
    description: "Suggest an NFT artwork concept.",
    examplePrompt:
      "Design a pixel art NFT featuring a futuristic robot holding a Bitcoin.",
  },
  {
    label: "Crypto Meme",
    description: "Generate a meme image about crypto trends.",
    examplePrompt:
      'A cartoon of a rocket labeled "ETH" blasting off to the moon.',
  },
  {
    label: "Trading Chart",
    description: "Visualize a crypto price chart or trading signal.",
    examplePrompt:
      "Render a candlestick chart showing a bullish breakout for Dogecoin.",
  },
  {
    label: "Wallet UI",
    description: "Suggest a UI mockup for a crypto wallet app.",
    examplePrompt:
      "Design a mobile wallet interface with a dark theme and neon highlights.",
  },
  {
    label: "Crypto Mascot",
    description: "Create a mascot character for a blockchain project.",
    examplePrompt: "Draw a friendly fox mascot for a DeFi platform.",
  },
];

export function getCryptoImageSuggestions(
  query?: string
): CryptoImageSuggestion[] {
  if (!query) return cryptoImageSuggestions;
  const q = query.toLowerCase();
  return cryptoImageSuggestions.filter(
    (s) =>
      s.label.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.examplePrompt.toLowerCase().includes(q)
  );
}
