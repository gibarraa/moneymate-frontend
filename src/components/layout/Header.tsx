import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MenuIcon } from "@/components/ui/Icons";
import type { User } from "@/types/auth";
import { formatLongDate } from "@/utils/date";
import { getInitials } from "@/utils/initials";

interface HeaderProps {
  title: string;
  subtitle: string;
  user: User;
  onOpenMenu: () => void;
}

export const Header = ({
  title,
  subtitle,
  user,
  onOpenMenu,
}: HeaderProps) => (
  <header className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-5 shadow-soft md:flex-row md:items-center md:justify-between">
    <div className="flex items-start gap-4">
      <Button
        variant="secondary"
        className="md:hidden"
        onClick={onOpenMenu}
        aria-label="Abrir navegación"
      >
        <MenuIcon className="h-4 w-4" />
      </Button>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
          {formatLongDate(new Date().toISOString())}
        </p>
        <h1 className="mt-2 font-display text-3xl text-white">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <Badge tone="success">{user.plan ?? "Premium"}</Badge>
      <div className="text-right">
        <p className="text-sm font-semibold text-white">{user.name}</p>
        <p className="text-xs text-slate-500">{user.email}</p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/25 to-sky-300/20 font-semibold text-white">
        {getInitials(user.name)}
      </div>
    </div>
  </header>
);
