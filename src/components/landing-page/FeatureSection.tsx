'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wand2Icon, PaletteIcon, RocketIcon, MicIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Wand2Icon,
    title: 'Prompt to Prototype',
    description: 'Describe your vision in natural language and watch as AI transforms it into a functional web application instantly.',
  },
  {
    icon: PaletteIcon,
    title: 'Smart UI Design',
    description: 'Intelligent design systems that adapt to your brand, ensuring beautiful and consistent interfaces every time.',
  },
  {
    icon: RocketIcon,
    title: 'Instant Deployment',
    description: 'From concept to live application in minutes. Deploy your AI-generated apps with a single click.',
  }
];

const FeatureSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 lg:py-32 px-8 lg:px-16 bg-background"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            AI-Powered Capabilities
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of web development with intelligent features designed to accelerate your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
              >
                <Card className="h-full bg-card border-border p-8 hover:border-primary/50 transition-colors">
                  <CardHeader className="p-0">
                    <div className="mb-6">
                      <Icon className="text-primary" size={40} strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl font-heading font-semibold text-card-foreground mb-4">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
