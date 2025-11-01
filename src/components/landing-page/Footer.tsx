'use client'
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-2 py-16 px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-4">
              AI<span className="aurora-text">Builder</span>
            </h3>
            <p className="text-base text-primary-foreground/80 leading-relaxed">
              Transform ideas into web applications instantly with the power of AI.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold text-primary-foreground mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('features')}
                className="text-base text-primary-foreground/80 hover:text-primary-foreground hover:underline text-left transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('showcase')}
                className="text-base text-primary-foreground/80 hover:text-primary-foreground hover:underline text-left transition-colors"
              >
                Showcase
              </button>
              <button
                onClick={() => scrollToSection('hero')}
                className="text-base text-primary-foreground/80 hover:text-primary-foreground hover:underline text-left transition-colors"
              >
                Get Started
              </button>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-heading font-semibold text-primary-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/JagdishSuthar1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={20} strokeWidth={2} />
              </a>
              <a
                href="https://www.linkedin.com/in/jagdish-suthar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} strokeWidth={2} />
              </a>
              <a
                href="https://x.com/jagdish437041"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon size={20} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} AIBuilder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
