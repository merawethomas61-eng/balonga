import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const baseServices = [
  { id: "ext", name: "Utvendig Vask", price: 299, desc: "Skånsom håndvask og tørk" },
  { id: "int", name: "Innvendig Rens", price: 499, desc: "Støvsuging og vask av overflater" },
  { id: "pol", name: "Polering", price: 999, desc: "Fjerner vaskeriper og gir glans" },
];

const extraServices = [
  { id: "wheel", name: "Felgrens", price: 149 },
  { id: "engine", name: "Motorvask", price: 349 },
  { id: "ceramic", name: "Keramisk Forsegling", price: 1499 },
  { id: "leather", name: "Skinnpleie", price: 499 },
];

export function PriceCalculator() {
  const [selectedBase, setSelectedBase] = useState<string[]>(["ext"]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleBase = (id: string) => {
    setSelectedBase(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const total = [...selectedBase.map(id => baseServices.find(s => s.id === id)?.price || 0),
                 ...selectedExtras.map(id => extraServices.find(s => s.id === id)?.price || 0)]
                 .reduce((a, b) => a + b, 0);

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Base Services */}
        <div className="space-y-4">
          <h3 className="text-2xl font-heading font-semibold">Hovedtjenester</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {baseServices.map(service => (
              <button
                key={service.id}
                onClick={() => toggleBase(service.id)}
                className={cn(
                  "flex flex-col text-left p-6 rounded-2xl border transition-all duration-200",
                  selectedBase.includes(service.id) 
                    ? "border-primary bg-primary/5" 
                    : "border-border/50 bg-card hover:border-primary/30"
                )}
              >
                <div className="flex justify-between items-start w-full mb-2">
                  <span className="font-semibold text-lg">{service.name}</span>
                  <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center border",
                    selectedBase.includes(service.id) ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"
                  )}>
                    {selectedBase.includes(service.id) && <Check className="h-4 w-4" />}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground mb-4">{service.desc}</span>
                <span className="mt-auto font-heading font-bold text-xl">{service.price} kr</span>
              </button>
            ))}
          </div>
        </div>

        {/* Extra Services */}
        <div className="space-y-4">
          <h3 className="text-2xl font-heading font-semibold">Tilleggstjenester</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {extraServices.map(service => (
              <button
                key={service.id}
                onClick={() => toggleExtra(service.id)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
                  selectedExtras.includes(service.id)
                    ? "border-primary bg-primary/5"
                    : "border-border/50 bg-card hover:border-primary/30"
                )}
              >
                <span className="font-medium">{service.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold">{service.price} kr</span>
                  <div className={cn(
                    "h-5 w-5 rounded flex items-center justify-center border",
                    selectedExtras.includes(service.id) ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"
                  )}>
                    {selectedExtras.includes(service.id) ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3 text-muted-foreground" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Panel */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 p-8 rounded-3xl border border-border/50 bg-card shadow-2xl">
          <h3 className="text-xl font-heading font-semibold mb-6">Din Pris</h3>
          
          <div className="space-y-4 mb-8 min-h-[150px]">
            {selectedBase.length === 0 && selectedExtras.length === 0 && (
              <p className="text-muted-foreground text-sm italic">Ingen tjenester valgt enda.</p>
            )}
            
            {selectedBase.map(id => {
              const s = baseServices.find(x => x.id === id);
              return s && (
                <div key={id} className="flex justify-between text-sm">
                  <span>{s.name}</span>
                  <span>{s.price} kr</span>
                </div>
              );
            })}
            
            {selectedExtras.length > 0 && selectedBase.length > 0 && <div className="h-px w-full bg-border/50 my-2" />}
            
            {selectedExtras.map(id => {
              const s = extraServices.find(x => x.id === id);
              return s && (
                <div key={id} className="flex justify-between text-sm text-muted-foreground">
                  <span>+ {s.name}</span>
                  <span>{s.price} kr</span>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-border/50 mb-8">
            <div className="flex justify-between items-end">
              <span className="text-lg font-medium">Totalt</span>
              <motion.span 
                key={total}
                initial={{ scale: 1.1, color: "var(--primary)" }}
                animate={{ scale: 1, color: "var(--foreground)" }}
                className="text-4xl font-heading font-bold"
              >
                {total} kr
              </motion.span>
            </div>
          </div>

          <a 
            href="#booking"
            className="w-full flex items-center justify-center py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Gå til Booking
          </a>
        </div>
      </div>
    </div>
  );
}
