import AuthCard from "@/components/auth/auth-card";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-linear-to-br from-emerald-400/30 to-cyan-400/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-122 w-md rounded-full bg-linear-to-br from-violet-400/25 to-fuchsia-400/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-120 w-120 rounded-full bg-linear-to-br from-amber-300/20 to-rose-400/15 blur-3xl" />
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-size-[24-24] opacity-40" />
      </div>

      <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-center px-16">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold tracking-tight">
              Play local. <br />
              Rank local.
            </h1>
            <p className="mt-5 text-base text-muted-foreground">
              See who’s playing right now at nearby courts and tables. Track
              matches, confirm results, and climb venue leaderboards.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <Feature
                label="Tennis + Ping Pong"
                desc="One profile, two cards"
              />
              <Feature label="Live activity" desc="Check-ins per venue" />
              <Feature label="Trusted results" desc="Confirm matches" />
              <Feature label="Local leaderboards" desc="Per venue, per sport" />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center px-6 py-12">
          <AuthCard />
        </div>
      </div>
    </div>
  );
}

function Feature({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="rounded-2xl border bg-card/50 backdrop-blur px-4 py-3 shadow-sm">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-muted-foreground mt-1">{desc}</div>
    </div>
  );
}
