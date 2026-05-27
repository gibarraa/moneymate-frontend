import { cn } from "@/utils/cn";

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo = ({ className }: BrandLogoProps) => (
  <img
    src="/moneymate-logo.png"
    alt="MoneyMate"
    className={cn(
      "w-auto max-w-full object-contain mix-blend-screen select-none",
      className,
    )}
    draggable={false}
  />
);
