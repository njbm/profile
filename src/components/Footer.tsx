import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

const connectLinks = [
  { name: 'GitHub Projects', href: 'https://github.com/njbm', icon: Github },
  { name: 'LeetCode Profile', href: 'https://leetcode.com/u/njbm', icon: Code2 },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/masud9900', icon: Linkedin },
  { name: 'Email', href: 'mailto:jabermasud.dev@gmail.com', icon: Mail },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="section-container py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* About Column */}
          <div>
            <a href="#home" className="flex items-center gap-3 mb-4">
              <img
                src="https://cdn.jsdelivr.net/gh/njbm/assets/img/logo.png"
                alt="Jaber Masud"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="font-mono font-bold text-lg">
                <span className="text-primary">Jaber</span> Masud
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-Stack Engineer specializing in Laravel and scalable web applications. 
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              {connectLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jaber Masud. All rights reserved.
          </p>
          
          <p className="text-sm text-muted-foreground">
            Made by Jaber Masud
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="rounded-full gap-2"
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Back to Top FAB (Fixed) */}
      <BackToTopButton />
    </footer>
  );
};

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  );
};

import React from 'react';
