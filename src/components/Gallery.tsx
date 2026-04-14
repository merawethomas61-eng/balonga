import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

const initialImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80",
    caption: "Premium Detailing av Porsche 911",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
    caption: "Keramisk forsegling",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    caption: "Innvendig rens og skinnpleie",
  },
];

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingUrl, setPendingUrl] = useState<string>("");
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingFile(file);
      setPendingUrl(URL.createObjectURL(file));
      setIsUploadOpen(true);
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = () => {
    if (pendingUrl && caption) {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: pendingUrl,
        caption: caption,
      };
      setImages([newImage, ...images]);
      setIsUploadOpen(false);
      setPendingFile(null);
      setPendingUrl("");
      setCaption("");
    }
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2">Resultater</h2>
          <p className="text-muted-foreground">Se hva vi har gjort for andre kunder.</p>
        </div>
        
        <div>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="rounded-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            Last opp bilde
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {images.map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted"
            >
              <img 
                src={img.url} 
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.caption}
                </p>
              </div>
              <button 
                onClick={() => removeImage(img.id)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-destructive transition-all z-10"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Legg til i galleriet</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {pendingUrl && (
              <div className="aspect-video rounded-xl overflow-hidden bg-muted relative">
                <img src={pendingUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="caption">Bildetekst</Label>
              <Input 
                id="caption" 
                placeholder="F.eks. Keramisk forsegling av Tesla Model Y" 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsUploadOpen(false)}>Avbryt</Button>
            <Button onClick={handleUpload} disabled={!caption.trim()}>Lagre bilde</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
