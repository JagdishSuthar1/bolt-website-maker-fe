'use client'
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LightbulbIcon, PencilIcon, CodeIcon, SmartphoneIcon } from 'lucide-react';

const steps = [
  {
    icon: LightbulbIcon,
    title: 'Idea',
    description: 'Start with a simple concept or problem you want to solve.',
  },
  {
    icon: PencilIcon,
    title: 'Design',
    description: 'AI generates beautiful, responsive designs tailored to your needs.',
  },
  {
    icon: CodeIcon,
    title: 'Code',
    description: 'Clean, production-ready code is automatically generated.',
  },
  {
    icon: SmartphoneIcon,
    title: 'App',
    description: 'Your fully functional web application is ready to deploy.',
  },
];

const ParallaxSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 px-8 lg:px-16 bg-background overflow-hidden"
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-tertiary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            From Idea to App in Minutes
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered process transforms your vision into reality through four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const yOffset = useTransform(
              scrollYProgress,
              [0, 1],
              [0, -50 * (index + 1)]
            );

            return (
              <motion.div
                key={index}
                style={{ y: yOffset }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-1 flex items-center justify-center">
                    <Icon className="text-primary-foreground" size={36} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-16 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
