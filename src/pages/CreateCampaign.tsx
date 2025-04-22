
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Check, Trash } from "lucide-react";

// Dados fictícios para demonstração
const availableSites = [
  { id: "site1", name: "Tech Blog", da: 70, price: 150 },
  { id: "site2", name: "Finance News", da: 85, price: 300 },
  { id: "site3", name: "Digital Marketing Blog", da: 65, price: 120 },
  { id: "site4", name: "Lifestyle Magazine", da: 78, price: 200 },
  { id: "site5", name: "Health & Fitness", da: 72, price: 180 },
  { id: "site6", name: "Travel Guide", da: 68, price: 160 },
  { id: "site7", name: "Food & Cooking", da: 63, price: 130 },
  { id: "site8", name: "Business Insider", da: 82, price: 280 },
];

type Step = "sites" | "links" | "review";

type LinkData = {
  id: string;
  anchorText: string;
  url: string;
  siteId: string;
};

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("sites");
  const [campaignName, setCampaignName] = useState("");
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [links, setLinks] = useState<LinkData[]>([]);
  
  const handleSiteSelection = (siteId: string, checked: boolean) => {
    if (checked) {
      setSelectedSites([...selectedSites, siteId]);
    } else {
      setSelectedSites(selectedSites.filter(id => id !== siteId));
    }
  };
  
  const handleAddLink = () => {
    if (selectedSites.length > 0) {
      const newLink: LinkData = {
        id: `link-${links.length + 1}`,
        anchorText: "",
        url: "",
        siteId: selectedSites[0],
      };
      setLinks([...links, newLink]);
    }
  };
  
  const handleUpdateLink = (id: string, field: keyof LinkData, value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };
  
  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };
  
  const totalPrice = selectedSites.reduce((total, siteId) => {
    const site = availableSites.find(site => site.id === siteId);
    return total + (site?.price || 0);
  }, 0);
  
  const goToNextStep = () => {
    if (step === "sites") {
      if (selectedSites.length > 0) {
        setStep("links");
      }
    } else if (step === "links") {
      if (links.length > 0 && links.every(link => link.anchorText && link.url)) {
        setStep("review");
      }
    } else if (step === "review") {
      navigate("/checkout", { 
        state: { 
          campaignName,
          selectedSites,
          links,
          totalPrice
        } 
      });
    }
  };
  
  const goToPreviousStep = () => {
    if (step === "links") {
      setStep("sites");
    } else if (step === "review") {
      setStep("links");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nova Campanha</h1>
        <p className="text-muted-foreground mt-2">Crie sua campanha de link building em três passos simples.</p>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "sites" || step === "links" || step === "review" ? "bg-linkbloom-mint text-white" : "bg-gray-200"}`}>
            1
          </div>
          <span className={step === "sites" ? "font-medium" : ""}>Selecionar Sites</span>
        </div>
        <Separator className="w-12 hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "links" || step === "review" ? "bg-linkbloom-mint text-white" : "bg-gray-200"}`}>
            2
          </div>
          <span className={step === "links" ? "font-medium" : ""}>Definir Links</span>
        </div>
        <Separator className="w-12 hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "review" ? "bg-linkbloom-mint text-white" : "bg-gray-200"}`}>
            3
          </div>
          <span className={step === "review" ? "font-medium" : ""}>Revisar</span>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {step === "sites" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Nome da Campanha</Label>
                <Input 
                  id="campaign-name" 
                  value={campaignName} 
                  onChange={(e) => setCampaignName(e.target.value)} 
                  placeholder="Minha Campanha de Link Building"
                />
              </div>
              
              <div className="space-y-4">
                <Label>Selecione os Sites para sua Campanha</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableSites.map((site) => (
                    <div key={site.id} className="flex items-start space-x-3 p-3 border rounded-md hover:bg-muted/30">
                      <Checkbox 
                        id={site.id} 
                        checked={selectedSites.includes(site.id)} 
                        onCheckedChange={(checked) => handleSiteSelection(site.id, checked === true)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={site.id}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {site.name}
                        </label>
                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                          <span>DA: {site.da}</span>
                          <span>•</span>
                          <span>R$ {site.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {step === "links" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Defina seus Links</h3>
                  <p className="text-sm text-muted-foreground">
                    Adicione textos âncora e URLs de destino para seus links
                  </p>
                </div>
                <Button
                  onClick={handleAddLink}
                  variant="outline"
                  className="bg-linkbloom-primary/50 border-linkbloom-mint/20"
                >
                  Adicionar Link
                </Button>
              </div>
              
              <div className="space-y-4">
                {links.length === 0 && (
                  <div className="p-6 text-center border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Clique em "Adicionar Link" para começar a adicionar links à sua campanha
                    </p>
                  </div>
                )}
                
                {links.map((link, index) => (
                  <div key={link.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Link #{index + 1}</h4>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveLink(link.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`site-${link.id}`}>Site</Label>
                        <RadioGroup
                          id={`site-${link.id}`}
                          value={link.siteId}
                          onValueChange={(value) => handleUpdateLink(link.id, "siteId", value)}
                          className="grid grid-cols-1 md:grid-cols-2 gap-2"
                        >
                          {selectedSites.map((siteId) => {
                            const site = availableSites.find(s => s.id === siteId);
                            return (
                              <div key={siteId} className="flex items-center space-x-2">
                                <RadioGroupItem value={siteId} id={`${siteId}-${link.id}`} />
                                <Label htmlFor={`${siteId}-${link.id}`} className="cursor-pointer">
                                  {site?.name}
                                </Label>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor={`anchor-${link.id}`}>Texto Âncora</Label>
                        <Input
                          id={`anchor-${link.id}`}
                          value={link.anchorText}
                          onChange={(e) => handleUpdateLink(link.id, "anchorText", e.target.value)}
                          placeholder="Texto que aparecerá no link"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor={`url-${link.id}`}>URL de Destino</Label>
                        <Input
                          id={`url-${link.id}`}
                          value={link.url}
                          onChange={(e) => handleUpdateLink(link.id, "url", e.target.value)}
                          placeholder="https://seusite.com/pagina"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {step === "review" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Revise sua Campanha</h3>
                <p className="text-sm text-muted-foreground">
                  Verifique todos os detalhes antes de finalizar sua campanha
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-linkbloom-primary/20 rounded-md">
                  <h4 className="font-medium mb-2">Detalhes da Campanha</h4>
                  <p>Nome: <span className="font-medium">{campaignName || "Campanha sem nome"}</span></p>
                  <p className="mt-1">Sites selecionados: <span className="font-medium">{selectedSites.length}</span></p>
                  <p className="mt-1">Total de links: <span className="font-medium">{links.length}</span></p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Sites Selecionados</h4>
                  <div className="space-y-2">
                    {selectedSites.map((siteId) => {
                      const site = availableSites.find(s => s.id === siteId);
                      return (
                        <div key={siteId} className="flex justify-between p-2 border-b">
                          <span>{site?.name}</span>
                          <span>R$ {site?.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between p-2 font-medium">
                      <span>Total</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Links da Campanha</h4>
                  <div className="space-y-3">
                    {links.map((link, index) => {
                      const site = availableSites.find(s => s.id === link.siteId);
                      return (
                        <div key={link.id} className="p-3 border rounded-md">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Link #{index + 1}</span>
                            <span className="text-sm text-muted-foreground">{site?.name}</span>
                          </div>
                          <div>
                            <p className="text-sm"><span className="text-muted-foreground">Texto âncora:</span> {link.anchorText}</p>
                            <p className="text-sm truncate"><span className="text-muted-foreground">URL:</span> {link.url}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        {step !== "sites" ? (
          <Button variant="outline" onClick={goToPreviousStep}>
            Voltar
          </Button>
        ) : (
          <div></div>
        )}
        
        <Button 
          onClick={goToNextStep} 
          className="bg-linkbloom-mint hover:bg-linkbloom-mint/90 text-white transition-all duration-300 hover:shadow-md"
          disabled={
            (step === "sites" && (selectedSites.length === 0 || !campaignName)) ||
            (step === "links" && (links.length === 0 || links.some(link => !link.anchorText || !link.url)))
          }
        >
          {step === "review" ? (
            <>
              Finalizar e Pagar
              <Check className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Próximo
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
