'use client'
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { SparklesIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6 },
        '-=0.4'
      );
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
      
      <motion.video
        src="https://c.animaapp.com/mgguac45fK2Xdp/img/ai_1.mp4"
        poster="https://c.animaapp.com/mgguac45fK2Xdp/img/ai_1-poster.png"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="relative z-20 h-full flex items-center justify-center px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            ref={headlineRef}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-8 leading-tight"
          >
            Build Web Apps by <span className="aurora-text">Prompt</span>.
          </h1>
          
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transform ideas into web applications instantly — powered by AI.
          </p>
          
          <div ref={buttonRef}>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal text-base px-8 py-6 h-auto"
              onClick={()=>{
                router.push("/chat")
              }}
            >
              <SparklesIcon className="mr-2" size={20} strokeWidth={2} />
              Generate Your First App
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
