import { type ReactNode } from "react";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import type { LucideIcon } from "lucide-react";

interface AuthLayoutProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children?: ReactNode;
}

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <Logo />
          </div>

          {Icon && (
            <div className="flex justify-center mb-4 text-primary">
              <Icon className="w-10 h-10"/>
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
          {children}
        </div>
        {footer && (
          <p className="text-center text-sm text-muted-foreground mt-6">{footer}</p>
        )}
      </div>
    </div>
  );
}