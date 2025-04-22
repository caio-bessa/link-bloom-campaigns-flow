
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard } from "lucide-react";

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

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Se não houver dados de estado (usuário acessou a página diretamente),
  // redirecionamos para a página de criação de campanha
  if (!location.state) {
    navigate("/campaign/new");
    return null;
  }
  
  const { campaignName, selectedSites, links, totalPrice } = location.state;
  
  const handleBackToReview = () => {
    navigate(-1);
  };
  
  const handlePayment = () => {
    // Aqui seria implementada a lógica de pagamento real
    // Por enquanto, apenas simulamos o sucesso e redirecionamos para a dashboard
    setTimeout(() => {
      navigate("/", { 
        state: { 
          paymentSuccess: true,
          campaignName 
        } 
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={handleBackToReview}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Revisão
      </Button>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo da Compra</CardTitle>
              <CardDescription>
                Confira os detalhes da sua campanha antes de finalizar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Campanha: {campaignName}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedSites.length} sites • {links.length} links
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sites selecionados</h4>
                {selectedSites.map((siteId) => {
                  const site = availableSites.find(s => s.id === siteId);
                  return (
                    <div key={siteId} className="flex justify-between text-sm">
                      <span>{site?.name}</span>
                      <span>R$ {site?.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Dados de Pagamento</CardTitle>
              <CardDescription>
                Escolha um método de pagamento para finalizar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="card">
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="card" id="payment-card" />
                  <Label htmlFor="payment-card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Cartão de Crédito
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="pix" id="payment-pix" />
                  <Label htmlFor="payment-pix" className="cursor-pointer">
                    Pix
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="boleto" id="payment-boleto" />
                  <Label htmlFor="payment-boleto" className="cursor-pointer">
                    Boleto Bancário
                  </Label>
                </div>
              </RadioGroup>
              
              <div className="space-y-3 pt-3">
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Número do Cartão</Label>
                  <Input id="card-number" placeholder="0000 0000 0000 0000" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Validade</Label>
                    <Input id="expiry" placeholder="MM/AA" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome no Cartão</Label>
                  <Input id="name" placeholder="NOME COMPLETO" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handlePayment}
                className="w-full bg-linkbloom-mint hover:bg-linkbloom-mint/90 text-white transition-all duration-300 hover:shadow-md"
              >
                Pagar R$ {totalPrice.toFixed(2)}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
