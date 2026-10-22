export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="max-w-xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Unified Workspace
        </h1>
        <p className="text-lg text-slate-400">
          AI-Native Development Workspace foundation running successfully.
        </p>
        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300">
          API health endpoint: <code className="text-emerald-400">/health</code>
        </div>
      </div>
    </main>
  );
}
