import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => (
  <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/4 p-8 text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 text-slate-100">
      {icon}
    </div>
    <h3 className="mt-5 font-display text-xl text-white">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
      {description}
    </p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);
