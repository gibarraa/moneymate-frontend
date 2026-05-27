import {
  createContext,
  startTransition,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn } from "@/utils/cn";

interface NavigateOptions {
  replace?: boolean;
}

interface RouterContextValue {
  pathname: string;
  navigate: (path: string, options?: NavigateOptions) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const RouterProvider = ({ children }: PropsWithChildren) => {
  const [pathname, setPathname] = useState(
    window.location.pathname || "/dashboard",
  );

  useEffect(() => {
    const onPopState = () => {
      startTransition(() => {
        setPathname(window.location.pathname || "/dashboard");
      });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path: string, { replace }: NavigateOptions = {}) => {
    if (path === pathname) {
      return;
    }

    startTransition(() => {
      if (replace) {
        window.history.replaceState({}, "", path);
      } else {
        window.history.pushState({}, "", path);
      }

      setPathname(path);
    });
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("useRouter must be used within RouterProvider");
  }

  return context;
};

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const handleLinkClick = (
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  navigate: RouterContextValue["navigate"],
) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  ) {
    return;
  }

  if (/^https?:\/\//.test(href)) {
    return;
  }

  event.preventDefault();
  navigate(href);
};

export const Link = ({ href, onClick, ...props }: LinkProps) => {
  const { navigate } = useRouter();

  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        handleLinkClick(event, href, navigate);
      }}
      {...props}
    />
  );
};

interface NavLinkProps extends LinkProps {
  activeClassName?: string;
}

export const NavLink = ({
  href,
  className,
  activeClassName,
  ...props
}: NavLinkProps) => {
  const { pathname } = useRouter();

  return (
    <Link
      href={href}
      className={cn(className, pathname === href && activeClassName)}
      {...props}
    />
  );
};
