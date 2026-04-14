import { BookingForm } from "./components/BookingForm";
import { PriceCalculator } from "./components/PriceCalculator";
import { Gallery } from "./components/Gallery";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Sparkles, Shield, Clock, MapPin, Droplets, CarFront, Check } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Toaster position="top-center" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-xl tracking-tight">LUMIÈRE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#tjenester" className="hover:text-foreground transition-colors">Tjenester</a>
            <a href="#kalkulator" className="hover:text-foreground transition-colors">Kalkulator</a>
            <a href="#galleri" className="hover:text-foreground transition-colors">Galleri</a>
            <a href="#booking" className="hover:text-foreground transition-colors">Kontakt</a>
          </div>
          <a 
            href="#booking"
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Bestill Nå
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Premium Bilpleie i Oslo
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter leading-[1.1]">
              Gi Bilen Din Den <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Behandlingen Den Fortjener
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Vi kombinerer lidenskap, presisjon og de beste produktene på markedet for å gi din bil en showroom-finish. Enkelt å booke, fantastisk resultat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="#booking"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
              >
                Book Time Nå
              </a>
              <a 
                href="#kalkulator"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-border hover:bg-accent hover:text-accent-foreground font-medium transition-all"
              >
                Beregn Pris
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-y border-border/40 bg-accent/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Premium Produkter</h3>
              <p className="text-muted-foreground">Vi bruker kun skånsomme og anerkjente produkter for å beskytte lakken din.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Effektivt & Fleksibelt</h3>
              <p className="text-muted-foreground">Velg en tid som passer deg. Vi jobber raskt uten å gå på kompromiss med kvaliteten.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Sentral Beliggenhet</h3>
              <p className="text-muted-foreground">Enkelt å finne frem til vårt moderne vaskeanlegg midt i byen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="tjenester" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Våre Tjenester</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fra en rask utvendig vask til en komplett detailing-pakke. Vi har noe for ethvert behov.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative rounded-3xl border border-border/50 bg-card p-8 hover:border-primary/50 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 space-y-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Droplets className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-semibold mb-2">Express Vask</h3>
                  <p className="text-muted-foreground">Rask og skånsom utvendig håndvask for deg i farten.</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Skånsom håndvask</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Felgrens</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Tørk med mikrofiber</li>
                </ul>
                <div className="pt-6 border-t border-border/50">
                  <p className="text-3xl font-heading font-bold">399,-</p>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative rounded-3xl border-2 border-primary bg-card p-8 shadow-2xl shadow-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-2xl text-sm font-medium">
                Mest Populær
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 space-y-6">
                <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
                  <CarFront className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-semibold mb-2">Premium Detailing</h3>
                  <p className="text-muted-foreground">Grundig innvendig og utvendig vask med voksbehandling.</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Alt i Express Vask</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Innvendig støvsuging</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Voksbehandling (3 mnd)</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Vindusvask</li>
                </ul>
                <div className="pt-6 border-t border-border/50">
                  <p className="text-3xl font-heading font-bold">1299,-</p>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative rounded-3xl border border-border/50 bg-card p-8 hover:border-primary/50 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 space-y-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-semibold mb-2">Ultimate Shine</h3>
                  <p className="text-muted-foreground">For deg som vil ha bilen tilbake i nybil-tilstand.</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Alt i Premium Detailing</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Lakkrens & Polering</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Keramisk forsegling</li>
                  <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Dyprens av seter</li>
                </ul>
                <div className="pt-6 border-t border-border/50">
                  <p className="text-3xl font-heading font-bold">2499,-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="kalkulator" className="py-24 border-t border-border/40 bg-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Priskalkulator</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sett sammen din ideelle vaskepakke og se prisen umiddelbart.
            </p>
          </div>
          <PriceCalculator />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galleri" className="py-24 border-t border-border/40">
        <div className="container mx-auto px-6">
          <Gallery />
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-32 relative bg-accent/5 border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Skreddersy Din Vask</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Velg pakken som passer din bil, legg til ekstra tjenester, og finn en tid som passer deg i vår kalender.
            </p>
          </div>
          
          <BookingForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-background">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-heading font-bold tracking-tight">LUMIÈRE</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Lumière Bilpleie. Alle rettigheter reservert.
          </p>
        </div>
      </footer>
    </div>
  );
}
