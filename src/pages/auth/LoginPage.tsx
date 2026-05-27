import { useState } from "react";
import { AuthShell } from "@/layouts/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link } from "@/routes/RouterProvider";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { usePageMeta } from "@/hooks/usePageMeta";

export const LoginPage = () => {
  usePageMeta("Login");

  const { login } = useAuth();
  const { notify } = useToast();
  const [email, setEmail] = useState("demo@moneymate.app");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Completa tu correo y contraseña.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ email, password });
      notify({
        title: "Sesión iniciada",
        description: "Tu dashboard financiero ya está listo.",
        tone: "success",
      });
    } catch {
      setError("No fue posible iniciar sesión. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Acceso"
      title="Iniciar sesión"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={error ? "" : undefined}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={error || undefined}
          required
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Iniciar sesión"}
        </Button>

        <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
          <span>Sin cuenta</span>
          <Link href="/register" className="font-semibold text-primary hover:text-white">
            Crear cuenta
          </Link>
        </div>
      </form>
    </AuthShell>
  );
};
