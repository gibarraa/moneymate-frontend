import { useState } from "react";
import { AuthShell } from "@/layouts/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link } from "@/routes/RouterProvider";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { usePageMeta } from "@/hooks/usePageMeta";

export const RegisterPage = () => {
  usePageMeta("Registro");

  const { register } = useAuth();
  const { notify } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ name, email, password });
      notify({
        title: "Cuenta creada",
        description: "Tu espacio financiero premium ya está activo.",
        tone: "success",
      });
    } catch {
      setError("No se pudo crear la cuenta. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Onboarding premium"
      title="Crea tu cuenta"
      subtitle="Regístrate para empezar a organizar tus movimientos, presupuestos y metas desde una sola vista."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Nombre"
          placeholder="Tu nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Input
          label="Confirmar password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={error || undefined}
          required
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </Button>

        <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
          <span>¿Ya tienes cuenta?</span>
          <Link href="/login" className="font-semibold text-emerald-200 hover:text-emerald-100">
            Iniciar sesión
          </Link>
        </div>
      </form>
    </AuthShell>
  );
};
