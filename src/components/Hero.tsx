import { useState, useEffect, useRef, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const terminalLines = [
  { prefix: '>', text: 'whoami', delay: 0 },
  { prefix: '', text: 'Jaber Masud', delay: 0.5, isOutput: true, highlight: true },
  { prefix: '', text: 'Full-Stack Engineer', delay: 1, isOutput: true },
  { prefix: '>', text: 'cat role.txt', delay: 1.8 },
  { prefix: '', text: 'Architecting scalable Laravel applications', delay: 2.3, isOutput: true },
  { prefix: '', text: 'Building production-ready SaaS platforms', delay: 2.8, isOutput: true },
  { prefix: '', text: 'Integrating complex third-party systems', delay: 3.3, isOutput: true },
];

const techBadges = ['Laravel', 'PHP', 'Vue.js', 'MySQL', 'Redis', 'TypeScript'];

// Magnetic hover hook
const useMagneticHover = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return { ref, position, handleMouseMove, handleMouseLeave };
};

// Ripple effect component
const RippleButton = ({ children, onClick, className, variant = 'default', size = 'lg' }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline';
  size?: 'lg' | 'default';
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
    
    onClick?.();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out]"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: 0,
            height: 0,
          }}
        />
      ))}
      {children}
    </Button>
  );
};

// Magnetic social link
const MagneticLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; target?: string; rel?: string }) => {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagneticHover();
  
  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
      {...props}
    >
      {children}
    </motion.a>
  );
};

export const Hero = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < terminalLines.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = () => {
    toast({
      title: "Resume Coming Soon",
      description: "The resume download will be available shortly. Stay tuned!",
    });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20"
    >
      {/* Background Elements with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 dark:opacity-10" 
      />
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0" 
      >
        <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      </motion.div>
      
      {/* Floating Tech Badges - Background with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {techBadges.map((badge, index) => (
          <motion.div
            key={badge}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 0.1, 
              y: 0,
              x: [0, 10, 0, -10, 0],
            }}
            transition={{ 
              delay: 3 + index * 0.2,
              duration: 0.5,
              x: {
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute text-primary font-mono text-sm"
            style={{
              top: `${20 + (index * 12)}%`,
              left: index % 2 === 0 ? '5%' : '85%',
            }}
          >
            {badge}
          </motion.div>
        ))}
      </motion.div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Terminal with Parallax */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            {/* Terminal Window */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-warning/70" />
                <div className="w-3 h-3 rounded-full bg-success/70" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm lg:text-base min-h-[280px]">
                {terminalLines.slice(0, visibleLines).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-2 ${line.isOutput ? 'ml-4' : ''} mb-1`}
                  >
                    {line.prefix && (
                      <span className="text-success">{line.prefix}</span>
                    )}
                    <span
                      className={
                        line.highlight
                          ? 'gradient-text text-2xl lg:text-3xl font-bold'
                          : line.isOutput
                          ? 'text-muted-foreground'
                          : 'text-foreground'
                      }
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}
                {visibleLines < terminalLines.length && (
                  <span className={`inline-block w-2 h-5 bg-primary ml-4 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                )}
              </div>
            </div>

            {/* CTA Buttons with Ripple Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.5 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <RippleButton
                onClick={() => scrollToSection('projects')}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Code2 className="w-4 h-4" />
                View Projects
              </RippleButton>
              <RippleButton
                variant="outline"
                onClick={handleResumeClick}
                className="rounded-full gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Download Resume
              </RippleButton>
              <RippleButton
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="rounded-full gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Let's Connect
              </RippleButton>
            </motion.div>

            {/* Social Links with Magnetic Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 0.5 }}
              className="flex items-center gap-4 mt-8"
            >
              <MagneticLink
                href="https://github.com/njbm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </MagneticLink>
              <MagneticLink
                href="https://linkedin.com/in/masud9900"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </MagneticLink>
              <MagneticLink href="mailto:jabermasud.dev@gmail.com">
                <Mail className="w-5 h-5" />
              </MagneticLink>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image with Parallax */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Animated Gradient Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-50 blur-md"
              />
              
              {/* Profile Image Container - Hexagon Shape */}
              <div className="relative w-48 h-48 lg:w-64 lg:h-64">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary to-accent"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                />
                <div
                  className="absolute inset-1 bg-card flex items-center justify-center overflow-hidden"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/njbm/assets/img/logo.png"
                    alt="Jaber Masud"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Tech Badges Around Image */}
              {['Laravel', 'PHP', 'Vue.js'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.2 }}
                  className="absolute tech-badge text-xs"
                  style={{
                    top: index === 0 ? '-10%' : index === 1 ? '30%' : '70%',
                    left: index === 0 ? '50%' : index === 1 ? '-20%' : '100%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
