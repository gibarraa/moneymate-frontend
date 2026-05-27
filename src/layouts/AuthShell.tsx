import type { PropsWithChildren } from "react";
import { WalletIcon } from "@/components/ui/Icons";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export const AuthShell = ({
  eyebrow,
  title,
  subtitle,
  children,
}: PropsWithChildren<AuthShellProps>) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(125,211,252,0.16),_transparent_25%),linear-gradient(180deg,_#07111f_0%,_#040914_100%)]" />
    <div className="absolute left-[-8rem] top-16 h-64 w-64 rounded-full bg-emerald-300/15 blur-3xl" />
    <div className="absolute bottom-8 right-[-6rem] h-80 w-80 rounded-full bg-sky-300/10 blur-3xl" />

    <div className="relative grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 text-white shadow-soft backdrop-blur lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200">
              <WalletIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-2xl">MoneyMate</p>
              <p className="text-sm text-slate-400">Frontend premium financiero</p>
            </div>
          </div>

          <div className="mt-16 max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              {eyebrow}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-tight">
              Controla tu dinero con claridad, ritmo y estilo.
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-300">
              Un dashboard diseñado para convertir tus ingresos, egresos,
              presupuestos y metas en decisiones mucho más simples.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Balance claro",
            "Alertas visuales",
            "Metas accionables",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-slate-950/35 px-4 py-5 text-sm text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/7 p-6 shadow-soft backdrop-blur md:p-8">
        <div className="mb-8 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-200">
              <WalletIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-2xl text-white">MoneyMate</p>
              <p className="text-sm text-slate-400">Finanzas personales modernas</p>
            </div>
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-4xl text-white">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">{subtitle}</p>

        <div className="mt-8">{children}</div>
      </section>
    </div>
  </div>
);
