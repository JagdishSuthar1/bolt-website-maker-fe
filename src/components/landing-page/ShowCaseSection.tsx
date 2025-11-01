'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';

const showcaseItems = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A fully functional online store with product catalog, cart, and checkout flow.',
    image: 'https://c.animaapp.com/mgguac45fK2Xdp/img/ai_2.png',
    altTag: 'feature section visual',
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard with real-time data visualization and user management.',
    image: 'https://c.animaapp.com/mgguac45fK2Xdp/img/ai_3.png',
    altTag: 'showcase app preview',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Creative portfolio showcasing projects with smooth animations and transitions.',
    image: 'https://c.animaapp.com/mgguac45fK2Xdp/img/ai_4.png',
    altTag: 'parallax storytelling imagery',
  },
];

const ShowcaseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<typeof showcaseItems[0] | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  return (
    <section id="showcase" className="py-24 lg:py-32 px-8 lg:px-16 bg-muted">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            AI-Generated Showcases
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore real applications built entirely through natural language prompts.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {showcaseItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="min-w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="bg-card border-border overflow-hidden cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <img
                          src={item.image}
                          alt={item.altTag}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-heading font-semibold text-card-foreground mb-4">
                          {item.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="bg-background text-foreground border-border hover:bg-muted hover:text-foreground"
            >
              <ChevronLeftIcon size={24} strokeWidth={2} />
            </Button>
            
            <div className="flex gap-2">
              {showcaseItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-border'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="bg-background text-foreground border-border hover:bg-muted hover:text-foreground"
            >
              <ChevronRightIcon size={24} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-8"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-card border border-border rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full text-foreground hover:bg-background transition-colors"
                aria-label="Close"
              >
                <XIcon size={24} strokeWidth={2} />
              </button>
              
              <img
                src={selectedItem.image}
                alt={selectedItem.altTag}
                className="w-full aspect-video object-cover"
              />
              
              <div className="p-8">
                <h3 className="text-3xl font-heading font-bold text-card-foreground mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShowcaseSection;
