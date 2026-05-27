import type { PropsWithChildren } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface AuthShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export const AuthShell = ({
  eyebrow,
  title,
  subtitle,
  children,
}: PropsWithChildren<AuthShellProps>) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(44,183,190,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(123,232,207,0.14),_transparent_24%),linear-gradient(180deg,_#050a0d_0%,_#04080b_100%)]" />
    <div className="absolute left-[-8rem] top-16 h-64 w-64 rounded-full bg-secondary/12 blur-3xl" />
    <div className="absolute bottom-8 right-[-6rem] h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

    <div className="relative grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 text-white shadow-soft backdrop-blur lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="w-full max-w-lg text-center">
          <div className="rounded-[2rem] border border-white/8 bg-black/45 p-6">
            <BrandLogo className="mx-auto h-28" />
          </div>
          <h1 className="mt-8 font-display text-5xl leading-tight">Tu dinero, claro.</h1>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/7 p-6 shadow-soft backdrop-blur md:p-8">
        <div className="mb-8 rounded-[1.75rem] border border-white/8 bg-black/40 p-4 lg:hidden">
          <BrandLogo className="mx-auto h-16" />
        </div>

        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-display text-4xl text-white">{title}</h2>
        {subtitle ? (
          <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
        ) : null}

        <div className="mt-8">{children}</div>
      </section>
    </div>
  </div>
);
