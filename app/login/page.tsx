"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <main className="min-h-[70vh] w-full bg-[#FFFBF9]">
      <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-[28px]">
          Daftar & Mulai Langganan
        </h1>
        <h2 className="mt-1 text-2xl font-semibold text-neutral-900 md:text-[28px]">
          idPlay
        </h2>
        <p className="mt-4 text-sm text-neutral-600">
          Silakan isi informasi berikut untuk mendaftar.
        </p>

        <form
          className="mt-8 w-full space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            placeholder="Nama Lengkap"
            className="h-12 rounded-full border-0 bg-[#F3EBE7] px-5 text-[15px] placeholder:text-neutral-500"
          />

          <Button
            type="submit"
            className="h-12 w-full rounded-full bg-[#FF7A4A] text-white hover:bg-[#ff6b33]"
          >
            Daftar Sekarang
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
            <Checkbox id="terms" className="mt-0.5" />
            <label htmlFor="terms" className="text-sm text-neutral-600">
              Saya setuju dengan {" "}
              <Link href="#" className="font-medium text-neutral-800 underline">
                Syarat & Ketentuan
              </Link>
            </label>
          </div>
        </form>
      </section>
    </main>
  );
}