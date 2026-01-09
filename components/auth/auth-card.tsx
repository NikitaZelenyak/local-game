"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AuthCard() {
  const [loading] = useState(false);

  const floating = useMemo(
    () => ({
      initial: { y: 10, opacity: 0, scale: 0.98 },
      animate: { y: 0, opacity: 1, scale: 1 },
      transition: { duration: 0.5, ease: "easeOut" as const },
    }),
    []
  );

  return (
    <motion.div {...floating} className="w-full max-w-md">
      <Card className="relative overflow-hidden shadow-2xl border-foreground/10 bg-card/80">
        {/* decorative court lines */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-foreground/10" />
          <div className="absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border border-foreground/10" />
          <div className="absolute top-24 left-8 right-8 h-px bg-foreground/10" />
          <div className="absolute bottom-16 left-8 right-8 h-px bg-foreground/10" />
        </div>

        <CardHeader className="relative text-center space-y-3">
          <div className="flex justify-center">
            <Badge variant="secondary" className="gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Toronto beta
            </Badge>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in to check in, confirm matches, and climb leaderboards.
          </p>
        </CardHeader>

        <CardContent className="relative">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <Input placeholder="Email" type="email" autoComplete="email" />
              <Input
                placeholder="Password"
                type="password"
                autoComplete="current-password"
              />

              <Button className="w-full" disabled={loading}>
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <button className="w-full text-xs text-muted-foreground hover:text-foreground transition">
                Forgot password?
              </button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <Input placeholder="Email" type="email" autoComplete="email" />
              <Input
                placeholder="Password"
                type="password"
                autoComplete="new-password"
              />
              <Input
                placeholder="Confirm password"
                type="password"
                autoComplete="new-password"
              />

              <Button className="w-full" disabled={loading}>
                Create account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                You’ll set up your Tennis + Ping Pong cards next.
              </p>
            </TabsContent>
          </Tabs>

          <div className="my-6">
            <Separator />
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full" disabled={loading}>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full" disabled={loading}>
              Continue with Apple
            </Button>
          </div>

          <p className="mt-6 text-[11px] text-center text-muted-foreground">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
