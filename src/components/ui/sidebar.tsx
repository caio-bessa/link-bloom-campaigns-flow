
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, ArrowRight, Menu } from "lucide-react";
import { Button } from "./button";

// Contexts
const SidebarContext = React.createContext<{
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  mobileExpanded: boolean;
  setMobileExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  expanded: true,
  setExpanded: () => undefined,
  mobileExpanded: false,
  setMobileExpanded: () => undefined,
});

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Components
export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(defaultOpen);
  const [mobileExpanded, setMobileExpanded] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    } else {
      setExpanded(defaultOpen);
    }
  }, [isMobile, defaultOpen]);

  return (
    <SidebarContext.Provider
      value={{ expanded, setExpanded, mobileExpanded, setMobileExpanded }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

const sidebarVariants = cva(
  "relative h-screen bg-linkbloom-primary p-4 flex flex-col gap-4 border-r border-linkbloom-mint/20 transition-all duration-300 ease-in-out",
  {
    variants: {
      expanded: {
        true: "w-64",
        false: "w-20",
      },
      mobile: {
        true: "fixed inset-y-0 left-0 z-50",
        false: "",
      },
    },
    defaultVariants: {
      expanded: true,
      mobile: false,
    },
  }
);

export function Sidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { expanded, mobileExpanded } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && mobileExpanded && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={() => useSidebar().setMobileExpanded(false)} />
      )}
      <aside
        className={cn(
          sidebarVariants({
            expanded: isMobile ? true : expanded,
            mobile: isMobile,
          }),
          isMobile ? (mobileExpanded ? "translate-x-0" : "-translate-x-full") : "",
          className
        )}
      >
        {children}
      </aside>
    </>
  );
}

export function SidebarHeader({ className }: { className?: string }) {
  const { expanded } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center space-x-2">
        <div className={cn(
          "w-8 h-8 rounded-full bg-linkbloom-mint flex items-center justify-center text-white font-bold"
        )}>
          LB
        </div>
        {(expanded || isMobile) && (
          <h1 className="text-lg font-semibold">LinkBloom</h1>
        )}
      </div>
    </div>
  );
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { expanded, setExpanded, mobileExpanded, setMobileExpanded } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileExpanded(!mobileExpanded)}
        className={cn("fixed top-4 left-4 z-30", className)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setExpanded(!expanded)}
      className={cn("fixed bottom-4 left-4 z-30", className)}
    >
      {expanded ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
    </Button>
  );
}

export function SidebarContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("flex flex-col flex-1 overflow-y-auto", className)}>{children}</div>;
}

export function SidebarFooter({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { expanded } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div className={cn("mt-auto pt-4", className)}>
      {children || (
        <div className="text-xs text-muted-foreground">
          {(expanded || isMobile) ? (
            <span>LinkBloom © 2025</span>
          ) : (
            <span>LB</span>
          )}
        </div>
      )}
    </div>
  );
}

export function SidebarGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function SidebarGroupLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { expanded } = useSidebar();
  const isMobile = useIsMobile();

  if (!expanded && !isMobile) return null;

  return (
    <div className={cn("text-xs font-medium text-muted-foreground", className)}>
      {children}
    </div>
  );
}

export function SidebarGroupContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("", className)}>{children}</div>;
}

export function SidebarMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      <ul className="space-y-1">{children}</ul>
    </nav>
  );
}

export function SidebarMenuItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <li className={cn("", className)}>{children}</li>;
}

const sidebarMenuButtonVariants = cva(
  "group flex items-center gap-3 rounded-md text-sm transition-colors",
  {
    variants: {
      variant: {
        default:
          "text-linkbloom-text hover:bg-linkbloom-mint/20 hover:text-linkbloom-text",
        ghost: "text-muted-foreground hover:text-muted-foreground hover:bg-transparent",
      },
      isActive: {
        true: "bg-linkbloom-mint/20 text-linkbloom-text font-medium",
        false: "",
      },
      size: {
        default: "px-3 py-2",
        sm: "px-2 py-1.5",
      },
      expanded: {
        true: "justify-start",
        false: "justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isActive: false,
    },
  }
);

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
  isActive?: boolean;
  size?: "default" | "sm";
  icon?: React.ReactNode;
  asChild?: boolean;
  href?: string;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      className,
      variant,
      isActive,
      size,
      icon,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const { expanded } = useSidebar();
    const isMobile = useIsMobile();

    if (asChild) {
      return (
        <button
          ref={ref}
          className={cn(
            sidebarMenuButtonVariants({
              variant,
              isActive,
              size,
              expanded: expanded || isMobile,
            }),
            (expanded || isMobile) ? "w-full" : "w-10 px-0",
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          sidebarMenuButtonVariants({
            variant,
            isActive,
            size,
            expanded: expanded || isMobile,
          }),
          (expanded || isMobile) ? "w-full" : "w-10 px-0",
          className
        )}
        {...props}
      >
        {icon && <span className="w-5 h-5">{icon}</span>}
        {(expanded || isMobile) && children}
      </button>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
