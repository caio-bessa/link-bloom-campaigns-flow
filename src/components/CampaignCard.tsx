
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CampaignCardProps {
  id: string;
  title: string;
  status: "active" | "completed" | "draft";
  sites: number;
  links: number;
  progress: number;
  date: string;
  className?: string;
}

export function CampaignCard({
  id,
  title,
  status,
  sites,
  links,
  progress,
  date,
  className,
}: CampaignCardProps) {
  const statusColors = {
    active: "bg-linkbloom-yellow text-linkbloom-text",
    completed: "bg-linkbloom-mint text-white",
    draft: "bg-gray-200 text-gray-700",
  };

  // Add animation classes to make the cards more engaging
  const animationClass = "transition-all duration-300 hover:shadow-md hover:translate-y-[-3px]";

  return (
    <Card className={cn(animationClass, className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Badge className={statusColors[status]}>
            {status === "active" ? "Ativa" : status === "completed" ? "Concluída" : "Rascunho"}
          </Badge>
        </div>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span>Sites: {sites}</span>
            <span>Links: {links}</span>
          </div>
          <div className="space-y-1">
            <div className="text-xs flex justify-between">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linkbloom-mint rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="ml-auto">
          <Link to={`/campaign/${id}`}>
            Detalhes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
