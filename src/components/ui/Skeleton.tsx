import { cn } from "@/utils/cn";

export const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-pulse rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5",
      className,
    )}
  />
);
