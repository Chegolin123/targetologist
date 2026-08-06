/**
 * Three large blurred amber orbs drifting across the page.
 * Fixed, non-interactive, adds atmosphere.
 */
export function Aurora() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Amber warm orb — top right */}
      <div
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full animate-aurora-drift"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200, 120, 44, 0.12) 0%, transparent 70%)",
        }}
      />
      {/* Amber light orb — bottom left */}
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200, 120, 44, 0.08) 0%, transparent 70%)",
          animation: "aurora-drift 25s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Subtle warm neutral orb — center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(180, 150, 120, 0.05) 0%, transparent 60%)",
          animation: "aurora-drift 30s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
