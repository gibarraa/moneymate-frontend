import { type PropsWithChildren, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

interface AppLayoutProps {
  title: string;
}

export const AppLayout = ({
  title,
  children,
}: PropsWithChildren<AppLayoutProps>) => {
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(44,183,190,0.12),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(123,232,207,0.12),_transparent_22%),linear-gradient(180deg,_#050a0d_0%,_#04080b_100%)]" />
      <div className="flex min-h-screen">
        <Sidebar
          isMobileOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
          onLogout={logout}
        />
        <main className="flex-1 px-4 py-4 md:px-6 md:py-6">
          <Header
            title={title}
            user={user}
            onOpenMenu={() => setIsMobileOpen(true)}
          />
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
};
