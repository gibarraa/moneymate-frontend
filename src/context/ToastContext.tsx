import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

type ToastTone = "success" | "error" | "info";

interface ToastItem {
  id: string;
  title: string;
  description: string;
  tone: ToastTone;
}

interface ToastContextValue {
  notify: (toast: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<ToastTone, string> = {
  success: "border-emerald-400/40 bg-emerald-400/10 text-emerald-50",
  error: "border-rose-400/40 bg-rose-400/10 text-rose-50",
  info: "border-sky-400/40 bg-sky-400/10 text-sky-50",
};

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const notify: ToastContextValue["notify"] = (toast) => {
    const item = { id: crypto.randomUUID(), ...toast };
    setToasts((current) => [...current, item]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((entry) => entry.id !== item.id));
    }, 3200);
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-3">
        {toasts.map((toast) => (
          <article
            key={toast.id}
            className={`rounded-3xl border px-4 py-3 shadow-soft backdrop-blur ${toastStyles[toast.tone]}`}
          >
            <p className="text-sm font-semibold">{toast.title}</p>
            <p className="mt-1 text-xs text-current/80">{toast.description}</p>
          </article>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};
