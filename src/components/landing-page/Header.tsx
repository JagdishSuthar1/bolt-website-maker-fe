'use client'
import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from "next-auth/react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const session  = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border "
    >
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <span className="text-2xl font-heading font-bold text-foreground">
              AI<span className="aurora-text">Builder</span>
            </span>
          </div>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex gap-8">
              <NavigationMenuItem>
                <NavigationMenuLink
                  onClick={() => scrollToSection('features')}
                  className="text-base font-normal text-foreground hover:text-primary cursor-pointer transition-colors"
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  onClick={() => scrollToSection('showcase')}
                  className="text-base font-normal text-foreground hover:text-primary cursor-pointer transition-colors"
                >
                  Showcase
                </NavigationMenuLink>
              </NavigationMenuItem>
            
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:flex">
           
              {session.status == "authenticated" ? <Button className="mb-2 hover:cursor-pointer" onClick={() => signOut()}>Log out</Button> : <Button className="hover:cursor-pointer" onClick={() => signIn()}>Sign in</Button>}
            
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XIcon size={24} strokeWidth={2} /> : <MenuIcon size={24} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-background border-t border-border"
        >
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col w-full p-8 gap-6">
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  onClick={() => scrollToSection('features')}
                  className="text-base font-normal text-foreground hover:text-primary cursor-pointer transition-colors block py-3"
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  onClick={() => scrollToSection('showcase')}
                  className="text-base font-normal text-foreground hover:text-primary cursor-pointer transition-colors block py-3"
                >
                  Showcase
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  onClick={() => scrollToSection('hero')}
                  className="text-base font-normal text-foreground hover:text-primary cursor-pointer transition-colors block py-3"
                >
                  Try Now
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full pt-4">
                <Button
                  onClick={() => scrollToSection('hero')}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
                >
                  Get Early Access
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
