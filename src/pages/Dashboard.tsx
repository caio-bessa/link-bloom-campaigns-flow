
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignCard } from "@/components/CampaignCard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

// Dados fictícios para demonstração
const activeCampaigns = [
  {
    id: "1",
    title: "Campanha Blog Tech",
    status: "active" as const,
    sites: 12,
    links: 24,
    progress: 45,
    date: "Iniciada em 15/04/2025",
  },
  {
    id: "2",
    title: "Sites de Finanças",
    status: "active" as const,
    sites: 8,
    links: 16,
    progress: 65,
    date: "Iniciada em 02/04/2025",
  },
  {
    id: "3",
    title: "Portfólio Criativo",
    status: "active" as const,
    sites: 5,
    links: 10,
    progress: 30,
    date: "Iniciada em 10/04/2025",
  },
];

const completedCampaigns = [
  {
    id: "4",
    title: "E-commerce Nutrição",
    status: "completed" as const,
    sites: 15,
    links: 30,
    progress: 100,
    date: "Concluída em 25/03/2025",
  },
  {
    id: "5",
    title: "Blogs Fitness",
    status: "completed" as const,
    sites: 7,
    links: 14,
    progress: 100,
    date: "Concluída em 18/03/2025",
  },
];

export default function Dashboard() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild className="bg-linkbloom-mint hover:bg-linkbloom-mint/90 text-white transition-all duration-300 hover:shadow-md">
          <Link to="/campaign/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova Campanha
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-linkbloom-primary/50 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCampaigns.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-linkbloom-yellow/50 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Links Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeCampaigns.reduce((acc, campaign) => acc + campaign.links, 0) + 
                completedCampaigns.reduce((acc, campaign) => acc + campaign.links, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-linkbloom-mint/30 transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Campanhas Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCampaigns.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-linkbloom-primary/20">
          <TabsTrigger value="active">Campanhas Ativas</TabsTrigger>
          <TabsTrigger value="completed">Campanhas Concluídas</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
