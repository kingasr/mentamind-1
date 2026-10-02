"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckinCard, CoachCard, SignalCard } from "@/components/marketing/ProductCards";

const SIDE_COPY: Record<string, { line1: string; line2: string; body: string }> = {
  "/register": {
    line1: "Set up your organisation",
    line2: "in an afternoon",
    body: "Create the workspace, invite your people, and have the first team signal within a month.",
  },
  default: {
    line1: "A calmer team",
    line2: "starts with a check-in",
    body: "Two minutes a day for every employee. Team-level signals for HR, never an individual entry.",
  },
};

export function AuthContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRegister = pathname === "/register";
  const copy = SIDE_COPY[isRegister ? "/register" : "default"];

  return (
    <div className="mm-auth dark min-h-screen bg-[#06080c] p-3 font-geist text-[#f2f5fa] antialiased sm:p-5">
      <div className="grid min-h-[calc(100vh-24px)] gap-3 sm:min-h-[calc(100vh-40px)] sm:gap-5 lg:grid-cols-2">
        {/* Form column */}
        <div className="flex flex-col">
          <div className="flex h-14 items-center justify-between rounded-full border border-white/10 bg-[#0a0d13]/80 pl-5 pr-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Mentamind home">
              <Image src="/logo/mentamind.webp" alt="" width={26} height={26} unoptimized className="object-contain" />
              <span className="text-[17px] font-medium tracking-tight text-white">mentamind</span>
            </Link>
            <Link
              href={isRegister ? "/login" : "/register"}
              className="inline-flex h-10 items-center rounded-full border border-white/10 px-4 text-[14px] text-white/75 transition-colors hover:bg-white/5 hover:text-white"
            >
              {isRegister ? "Log in" : "Create account"}
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-[420px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7 sm:p-8"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Product panel, desktop only */}
        <div className="relative hidden overflow-hidden rounded-[32px] lg:sticky lg:top-5 lg:block lg:h-[calc(100vh-40px)]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#03202f_0%,#075a78_26%,#0f98b8_48%,#67cde3_70%,#b6e9f3_86%,#e3f7fb_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-12%,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_62%)]" />
          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
            <div className="max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                <span className="h-1 w-1 rounded-full bg-white" />
                Wellbeing for every employee
              </span>
              <h2 className="mt-7 text-[40px] font-normal leading-[1.04] tracking-[-0.03em] text-white xl:text-[48px]">
                {copy.line1}
                <br />
                <em className="font-serif italic text-[1.08em] tracking-[-0.005em]">{copy.line2}</em>
              </h2>
              <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-white/90">{copy.body}</p>
            </div>

            <div className="relative mt-12 flex origin-bottom scale-[0.82] items-end justify-center gap-4 xl:scale-100">
              <div className="[transform:rotate(-5deg)_translateY(10px)]">
                <CheckinCard />
              </div>
              <div className="[transform:translateY(-10px)]">
                <CoachCard />
              </div>
              <div className="[transform:rotate(5deg)_translateY(10px)]">
                <SignalCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
