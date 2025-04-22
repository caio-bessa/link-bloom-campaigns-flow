
import { AppNavbar } from "@/components/AppNavbar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col w-full min-h-screen">
          <AppNavbar />
          <main className="flex-1 p-6 overflow-auto">
            <div className="container mx-auto">
              {children}
            </div>
          </main>
          <SidebarTrigger />
        </div>
      </div>
    </SidebarProvider>
  );
}
