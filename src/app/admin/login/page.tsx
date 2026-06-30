import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginFormClient } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <Suspense>
        <LoginFormClient />
      </Suspense>
    </div>
  );
}
