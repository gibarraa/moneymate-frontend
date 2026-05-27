import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { useRouter } from "@/routes/RouterProvider";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { TransactionsPage } from "@/pages/transactions/TransactionsPage";
import { BudgetsPage } from "@/pages/budgets/BudgetsPage";
import { GoalsPage } from "@/pages/goals/GoalsPage";
import { ReportsPage } from "@/pages/reports/ReportsPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";

const publicRoutes = {
  "/login": <LoginPage />,
  "/register": <RegisterPage />,
};

const privateRoutes = {
  "/dashboard": {
    title: "Dashboard",
    page: <DashboardPage />,
  },
  "/transactions": {
    title: "Movimientos",
    page: <TransactionsPage />,
  },
  "/budgets": {
    title: "Presupuestos",
    page: <BudgetsPage />,
  },
  "/goals": {
    title: "Metas",
    page: <GoalsPage />,
  },
  "/reports": {
    title: "Reportes",
    page: <ReportsPage />,
  },
  "/settings": {
    title: "Configuración",
    page: <SettingsPage />,
  },
};

export const AppRoutes = () => {
  const { pathname, navigate } = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!pathname || pathname === "/") {
      navigate(isAuthenticated ? "/dashboard" : "/login", { replace: true });
      return;
    }

    if (pathname in publicRoutes && isAuthenticated) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (!(pathname in publicRoutes) && !(pathname in privateRoutes)) {
      navigate(isAuthenticated ? "/dashboard" : "/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="rounded-3xl border border-white/10 bg-white/6 px-6 py-5 text-sm text-slate-300 shadow-soft">
          Cargando experiencia MoneyMate...
        </div>
      </div>
    );
  }

  if (pathname in publicRoutes) {
    return publicRoutes[pathname as keyof typeof publicRoutes];
  }

  const route = privateRoutes[pathname as keyof typeof privateRoutes];

  if (!route) {
    return null;
  }

  return (
    <PrivateRoute>
      <AppLayout title={route.title}>
        {route.page}
      </AppLayout>
    </PrivateRoute>
  );
};
