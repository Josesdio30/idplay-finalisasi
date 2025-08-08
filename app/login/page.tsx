"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!agree) {
      setError("Anda harus menyetujui Syarat & Ketentuan");
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setError(data?.message || "Login gagal. Periksa kredensial Anda.");
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-[70vh] w-full bg-[#FFFBF9]">
      <section className="mx-auto flex w-full max-w-md md:max-w-xl flex-col items-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-[28px]">
          Masuk ke Akun idPlay
        </h1>
        <p className="mt-4 text-sm text-neutral-600">
          Akses tagihan, pengaturan layanan, dan lainnya.
        </p>

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

          {error ? (
            <p className="text-left text-sm text-red-600">{error}</p>
          ) : null}

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

          <div className="flex items-start gap-3 pt-2 text-left">
            <Checkbox
              id="terms"
              checked={agree}
              onCheckedChange={(v) => setAgree(Boolean(v))}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-neutral-600">
              Saya setuju dengan {" "}
              <Link href="#" className="font-medium text-neutral-800 underline">
                Syarat & Ketentuan
              </Link>
            </label>
          </div>

          <p className="pt-2 text-left text-sm text-neutral-600">
            Belum punya akun? {" "}
            <Link href="/register" className="font-medium text-neutral-800 underline">
              Daftar di sini
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}