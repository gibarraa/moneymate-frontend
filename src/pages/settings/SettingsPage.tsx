import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SettingsIcon, SparklesIcon, WalletIcon } from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import { useFinance } from "@/context/FinanceContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatLongDate } from "@/utils/date";

export const SettingsPage = () => {
  usePageMeta("Configuración");

  const { user, logout } = useAuth();
  const { snapshot } = useFinance();

  if (!user || !snapshot) {
    return null;
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
      <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/14 text-primary">
            <WalletIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Perfil</p>
            <h2 className="mt-2 font-display text-2xl text-white">{user.name}</h2>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-slate-300">
          <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Email</p>
            <p className="mt-2">{user.email}</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Plan</p>
            <div className="mt-2">
              <Badge tone="success">{user.plan ?? "Premium"}</Badge>
            </div>
          </div>
          <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Miembro desde</p>
            <p className="mt-2">{formatLongDate(user.joinedAt)}</p>
          </div>
        </div>

        <Button variant="danger" className="mt-6 w-full" onClick={logout}>
          Cerrar sesión
        </Button>
      </article>

      <section className="space-y-5">
        <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <SettingsIcon className="h-6 w-6 text-slate-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Proyecto</p>
              <h3 className="mt-2 font-display text-xl text-white">Estado</h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Versión</p>
              <p className="mt-2">v1.0.0 frontend-premium</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">API base</p>
              <p className="mt-2">{import.meta.env.VITE_API_URL ?? "http://localhost:4000/api"}</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Última sincronización</p>
              <p className="mt-2">{formatLongDate(snapshot.lastSynced)}</p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-primary/16 bg-gradient-to-br from-secondary/12 via-white/5 to-primary/10 p-5">
          <div className="flex items-center gap-3">
            <SparklesIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-primary/80">API</p>
              <h3 className="mt-2 font-display text-xl text-white">Lista para conectar</h3>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
