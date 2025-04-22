
import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  className?: string;
}

export function AppNavbar({ className }: NavbarProps) {
  const isMobile = useIsMobile();

  return (
    <header className={cn(
      "sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="mr-4 flex-shrink-0">
            {isMobile && (
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-linkbloom-mint flex items-center justify-center text-white font-bold">
                  LB
                </div>
                <span className="font-semibold hidden md:inline-block">LinkBloom</span>
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex md:gap-2">
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-linkbloom-yellow animate-pulse" />
          </Button>
          
          <Button asChild className="bg-linkbloom-mint hover:bg-linkbloom-mint/90 text-white transition-all duration-300 hover:shadow-md">
            <Link to="/campaign/new">
              <Plus className="mr-2 h-4 w-4" />
              {!isMobile && "Nova Campanha"}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
