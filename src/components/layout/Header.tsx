import { Button } from "@/components/ui/Button";
import { MenuIcon } from "@/components/ui/Icons";
import type { User } from "@/types/auth";
import { getInitials } from "@/utils/initials";

interface HeaderProps {
  title: string;
  user: User;
  onOpenMenu: () => void;
}

export const Header = ({
  title,
  user,
  onOpenMenu,
}: HeaderProps) => (
  <header className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-4 shadow-soft md:grid-cols-[1fr_auto] md:items-center md:p-5">
    <div className="flex min-w-0 items-center gap-3">
      <Button
        variant="secondary"
        className="px-3 py-3 md:hidden"
        onClick={onOpenMenu}
        aria-label="Abrir navegación"
      >
        <MenuIcon className="h-4 w-4" />
      </Button>
      <div className="min-w-0">
        <h1 className="truncate font-display text-[2rem] leading-none text-white md:text-[2.4rem]">
          {title}
        </h1>
      </div>
    </div>

    <div className="flex min-w-0 items-center justify-between gap-3 md:justify-end">
      <div className="min-w-0 text-right">
        <p className="truncate text-sm font-semibold text-white">{user.name}</p>
      </div>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/30 to-primary/20 font-semibold text-white">
        {getInitials(user.name)}
      </div>
    </div>
  </header>
);
