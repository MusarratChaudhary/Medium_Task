"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Hash, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: `${firstName} ${lastName}`.trim(), 
          email, 
          password 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side - Hero/Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-sidebar border-r relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(211,84,0,0.15),transparent)] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="flex items-center gap-2 font-semibold relative z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Hash className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight text-white">Lumina Notes</span>
        </div>

        <div className="relative z-10 max-w-md">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl font-bold text-white leading-tight mb-6"
          >
            Join the community of <span className="text-primary italic">high-performance</span> thinkers.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sidebar-foreground/60 text-lg leading-relaxed"
          >
            Start capturing your ideas with a workspace that moves at your speed. Free for personal use, forever.
          </motion.p>
        </div>

        <div className="flex items-center gap-6 relative z-10 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
          <span>High Performance</span>
          <span>End-to-End Encryption</span>
          <span>Offline Ready</span>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 relative">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight">Create an account</h2>
            <p className="text-sm text-muted-foreground">
              Begin your journey with Lumina Notes today.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-3 text-xs font-semibold text-destructive bg-destructive/10 rounded-lg">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">First Name</label>
                <Input 
                  placeholder="John" 
                  className="h-11 bg-secondary/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Last Name</label>
                <Input 
                  placeholder="Doe" 
                  className="h-11 bg-secondary/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <Input 
                type="email" 
                placeholder="name@company.com" 
                className="h-11 bg-secondary/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-11 bg-secondary/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full h-11 font-semibold group" disabled={loading}>
              {loading ? "Creating account..." : "Get Started"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
              <span className="bg-background px-2 text-muted-foreground font-bold">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="h-11 font-semibold gap-2 border-border/50 hover:bg-secondary/50 cursor-default opacity-60" disabled>
              <Globe className="h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Sign in instead
            </Link>
          </p>
          
          <p className="text-center text-[10px] text-muted-foreground/60 px-6">
            By clicking Get Started, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
