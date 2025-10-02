import { EchoProvider } from "@merit-systems/echo-react-sdk";
import { ImageGeneration } from "./components/ImageGeneration";
import { EchoAccount } from "./components/echo-account-react";
import { ThemeToggle } from "./components/ui/theme-toggle";

function Dashboard() {
  // Main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/70 dark:bg-gray-900/60 shadow-sm border-b backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Meme Render
              </h1>
              <img
                src="	https://img.icons8.com/?size=1200&id=r0hnAB4GmKi6&format=png"
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
            </div>

            {/* User info */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <EchoAccount />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab content */}
        <div className="glass-card rounded-3xl shadow-2xl p-6 min-h-[600px] border border-gray-100 dark:border-gray-800">
          <ImageGeneration />
        </div>
      </main>
    </div>
  );
}

function App() {
  const baseEchoUrl =
    import.meta.env.VITE_ECHO_URL || "https://echo.merit.systems";
  const baseRouterUrl =
    import.meta.env.VITE_ROUTER_URL || "https://echo.router.merit.systems";
  const appId =
    import.meta.env.VITE_ECHO_APP_ID || "46e0ce04-641d-4238-93c9-2482668de9bc";

  return (
    <EchoProvider
      config={{
        appId,
        baseEchoUrl,
        baseRouterUrl,
        redirectUri: window.location.origin,
        scope: "llm:invoke offline_access",
      }}
    >
      <Dashboard />
    </EchoProvider>
  );
}

export default App;
