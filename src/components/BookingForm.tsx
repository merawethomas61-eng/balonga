import React, { useState } from "react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { CalendarIcon, CarFront, Check, ChevronRight, Droplets, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const services = [
  {
    id: "express",
    name: "Express Vask",
    price: 399,
    description: "Rask og effektiv utvendig vask. Perfekt for vedlikehold.",
    icon: Droplets,
  },
  {
    id: "premium",
    name: "Premium Detailing",
    price: 1299,
    description: "Grundig innvendig og utvendig vask med voksbehandling.",
    icon: CarFront,
  },
  {
    id: "ultimate",
    name: "Ultimate Shine",
    price: 2499,
    description: "Full lakkrens, polering, keramisk forsegling og dyprens innvendig.",
    icon: Sparkles,
  },
];

const addons = [
  { id: "leather", name: "Skinnpleie", price: 499 },
  { id: "odor", name: "Ozonbehandling (Lukt fjerning)", price: 599 },
  { id: "engine", name: "Motorvask", price: 349 },
  { id: "glass", name: "Glassforsegling", price: 299 },
];

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState<string>("premium");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
  });

  const handleAddonChange = (addonId: string, checked: boolean) => {
    if (checked) {
      setSelectedAddons([...selectedAddons, addonId]);
    } else {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    }
  };

  const calculateTotal = () => {
    const servicePrice = services.find((s) => s.id === selectedService)?.price || 0;
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    return servicePrice + addonsPrice;
  };

  const handleNext = () => {
    if (step === 1 && !date) {
      toast.error("Vennligst velg en dato for bookingen.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.carModel) {
      toast.error("Vennligst fyll ut alle feltene.");
      return;
    }
    
    toast.success("Booking bekreftet!", {
      description: `Takk ${formData.name}. Vi har sendt en bekreftelse til ${formData.email}.`,
    });
    
    // Reset form
    setTimeout(() => {
      setStep(1);
      setDate(undefined);
      setSelectedService("premium");
      setSelectedAddons([]);
      setFormData({ name: "", email: "", phone: "", carModel: "" });
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-card border border-border/50 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-muted">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "33%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold tracking-tight">
          {step === 1 && "Velg Tjeneste"}
          {step === 2 && "Tillegg & Dato"}
          {step === 3 && "Dine Detaljer"}
        </h2>
        <div className="text-sm text-muted-foreground font-mono">
          Steg {step} av 3
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <RadioGroup value={selectedService} onValueChange={setSelectedService} className="grid gap-4 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.id}>
                    <RadioGroupItem value={service.id} id={service.id} className="peer sr-only" />
                    <Label
                      htmlFor={service.id}
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      <Icon className="mb-4 h-8 w-8 text-primary" />
                      <div className="text-center space-y-2">
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                        <p className="text-xl font-heading font-bold mt-4">{service.price} kr</p>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tilpass din vask (Valgfritt)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {addons.map((addon) => (
                  <div key={addon.id} className="flex items-center space-x-3 border border-border/50 p-4 rounded-lg hover:border-primary/50 transition-colors">
                    <Checkbox 
                      id={addon.id} 
                      checked={selectedAddons.includes(addon.id)}
                      onCheckedChange={(checked) => handleAddonChange(addon.id, checked as boolean)}
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <Label htmlFor={addon.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                        {addon.name}
                      </Label>
                      <span className="text-sm text-muted-foreground">+{addon.price} kr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Velg Dato</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-14 rounded-xl border-border/50",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5" />
                    {date ? format(date, "PPP", { locale: nb }) : <span>Velg en dato fra kalenderen</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Fullt Navn</Label>
                <Input 
                  id="name" 
                  placeholder="Ola Nordmann" 
                  className="h-12 bg-background/50"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="123 45 678" 
                  className="h-12 bg-background/50"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-postadresse</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="ola@eksempel.no" 
                  className="h-12 bg-background/50"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carModel">Bilmerke og Modell</Label>
                <Input 
                  id="carModel" 
                  placeholder="Tesla Model 3" 
                  className="h-12 bg-background/50"
                  value={formData.carModel}
                  onChange={(e) => setFormData({...formData, carModel: e.target.value})}
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-accent/20 rounded-xl border border-accent/30">
              <h4 className="font-heading font-semibold mb-4">Oppsummering</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{services.find(s => s.id === selectedService)?.name}</span>
                  <span>{services.find(s => s.id === selectedService)?.price} kr</span>
                </div>
                {selectedAddons.map(addonId => {
                  const addon = addons.find(a => a.id === addonId);
                  return (
                    <div key={addonId} className="flex justify-between">
                      <span className="text-muted-foreground">+ {addon?.name}</span>
                      <span>{addon?.price} kr</span>
                    </div>
                  );
                })}
                {date && (
                  <div className="flex justify-between pt-2 border-t border-border/50 mt-2">
                    <span className="text-muted-foreground">Dato</span>
                    <span>{format(date, "PPP", { locale: nb })}</span>
                  </div>
                )}
                <div className="flex justify-between pt-4 border-t border-border/50 mt-4 text-lg font-bold">
                  <span>Totalt</span>
                  <span className="text-primary">{calculateTotal()} kr</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex justify-between items-center pt-6 border-t border-border/50">
        {step > 1 ? (
          <Button variant="ghost" onClick={handleBack} className="text-muted-foreground">
            Tilbake
          </Button>
        ) : (
          <div></div>
        )}
        
        {step < 3 ? (
          <Button onClick={handleNext} className="h-12 px-8 rounded-full">
            Neste Steg <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            Bekreft Booking <Check className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
