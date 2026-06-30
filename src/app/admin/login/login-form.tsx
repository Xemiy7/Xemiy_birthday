"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoginFormClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed");

      const redirect = searchParams.get("redirect") || "/admin";
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="card card-glass p-10">
        <div className="mb-8 stack-xs text-center">
          <Lock className="mx-auto mb-4 size-8 text-muted-foreground" strokeWidth={1.5} />
          <h1 className="text-title-lg">xemiy Admin</h1>
          <p className="text-body-sm text-muted-foreground">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="stack-md">
          <div>
            <label htmlFor="password" className="text-overline mb-2 block">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              invalid={!!error}
              required
              autoFocus
            />
          </div>

          {error && (
            <p className="text-caption text-mono-300" role="alert">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
