import AuthCard from "@/components/auth/auth-card";
import AmbientBackground from "@/components/layout/ambient-background";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <AmbientBackground variant="auth" />

      <div className="absolute right-6 top-6 z-10">
        <ThemeToggle />
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
    <div className="rounded-2xl border border-foreground/10 bg-card/70 backdrop-blur px-4 py-3 shadow-sm">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-muted-foreground mt-1">{desc}</div>
    </div>
  );
}
