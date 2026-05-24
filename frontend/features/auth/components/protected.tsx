"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);


  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] gap-3">
        <div className="spinner" />
        <p className="text-sm text-slate-400">Loading...</p>
      </main>
    );
  }


  if (!user) {
    return null;
  }

 
  return <>{children}</>;
};

export default Protected;