import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Package, Briefcase, Users, Clock, Trophy, Rocket, CreditCard, BookOpen, Globe, Code2, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { icon: Package, value: 5, suffix: '+', label: 'Products Published', description: 'on Codecanyon' },
  { icon: Briefcase, value: 20, suffix: '+', label: 'Projects Completed', description: 'SaaS, enterprise, custom' },
  { icon: Users, value: 50, suffix: '+', label: 'Students Trained', description: 'in web development' },
  { icon: Clock, value: 5, suffix: '+', label: 'Years Experience', description: 'production development' },
];

const badges = [
  { icon: Trophy, text: 'Published Author on Codecanyon' },
  { icon: Rocket, text: 'Omnichannel CRM Core Developer' },
  { icon: CreditCard, text: 'Multi-gateway Integration Specialist' },
  { icon: BookOpen, text: 'Technical Trainer' },
  { icon: Globe, text: 'Multi-language Developer' },
  { icon: Code2, text: 'LeetCode Problem Solver' },
  { icon: Shield, text: 'KYC & Compliance Expert' },
];

const Counter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 lg:py-32 bg-muted/30 scroll-mt-nav">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-2 block">&lt;stats&gt;</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">By The Numbers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milestones and achievements from my journey as a developer
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="text-center hover-lift group">
                <CardContent className="p-6 lg:p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold font-mono gradient-text mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </div>
                  <p className="font-semibold text-sm mb-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-mono font-semibold text-lg mb-6 text-center">Achievement Badges</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <badge.icon className="w-4 h-4 text-primary" />
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <span className="text-primary font-mono text-sm">&lt;/stats&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};
