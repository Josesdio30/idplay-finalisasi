"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState, Suspense } from "react"; // Import Suspense
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// Separate component to handle useSearchParams
function LoginRedirectHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}user/login?apps_id=IDMALL_CUSTOMER`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setError(data?.message || "Login gagal. Periksa kredensial Anda.");
        return;
      }

      if (data.status === "success" && data.data) {
        login(data.data);
        // Redirect ke tujuan jika ada, jika tidak ke dashboard
        const redirect = searchParams.get("redirect");
        router.push(redirect || "/dashboard");
      } else {
        setError("Login gagal. Periksa kredensial Anda.");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 w-full space-y-5" onSubmit={onSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-12 rounded-full border-0 bg-[#F3EBE7] px-5 text-[15px] placeholder:text-neutral-500"
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="h-12 rounded-full border-0 bg-[#F3EBE7] px-5 text-[15px] placeholder:text-neutral-500"
      />

      {error ? <p className="text-left text-sm text-red-600">{error}</p> : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
      >
        {isSubmitting ? "Memproses..." : "Masuk"}
      </Button>

      <div className="relative py-2 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="h-[1px] w-full bg-neutral-200" />
        </div>
        <div className="relative inline-block bg-[#FFFBF9] px-3 text-xs text-neutral-500">
          or continue with
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full rounded-full border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
      >
        <FcGoogle className="text-xl" />
        Google
      </Button>

      <p className="pt-2 text-left text-sm text-neutral-600">
        Belum punya akun?{" "}
        <Link href="/register" className="font-medium text-neutral-800 underline">
          Daftar di sini
        </Link>
      </p>
      <p className="pt-2 text-left text-sm text-neutral-600">
        <Link href="/forgot" className="font-medium text-neutral-800 underline">
          Lupa Password?
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-[70vh] w-full bg-[#FFFBF9]">
      <section className="mx-auto flex w-full max-w-md md:max-w-xl flex-col items-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-[28px]">
          Masuk ke Akun idPlay
        </h1>
        <p className="mt-4 text-sm text-neutral-600">
          Akses tagihan, pengaturan layanan, dan lainnya.
        </p>

        {/* Wrap the component that uses useSearchParams in Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <LoginRedirectHandler />
        </Suspense>
      </section>
    </main>
  );
}