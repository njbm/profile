import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Briefcase, Globe, GraduationCap, Trophy, Rocket, CreditCard, BookOpen, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const quickStats = [
  { icon: MapPin, label: 'Location', value: 'Uttara, Dhaka, Bangladesh' },
  { icon: Mail, label: 'Email', value: 'jabermasud.dev@gmail.com' },
  { icon: Briefcase, label: 'Status', value: 'Open for opportunities' },
  { icon: Globe, label: 'Experience', value: '5+ years' },
  { icon: GraduationCap, label: 'Degree', value: 'B.Sc. in Computer Science' },
];

const achievements = [
  { icon: Trophy, text: 'Published products on Codecanyon' },
  { icon: Rocket, text: 'Omnichannel CRM Core Developer & Architect' },
  { icon: CreditCard, text: 'Multi-gateway payment integrations (6+ gateways)' },
  { icon: BookOpen, text: 'Technical Trainer at Knowledge IT Institute' },
  { icon: Languages, text: 'Multi-language fluency (Bengali, English, Hindi, Urdu)' },
];

const philosophyCards = [
  {
    title: 'Code Quality',
    description: 'Clean, readable code with best practices',
    gradient: 'from-primary to-primary/50',
  },
  {
    title: 'Problem Solving',
    description: 'Turning complex problems into elegant solutions',
    gradient: 'from-accent to-accent/50',
  },
  {
    title: 'Continuous Learning',
    description: 'Always exploring new technologies',
    gradient: 'from-success to-success/50',
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 lg:py-32 scroll-mt-nav relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      
      <div className="section-container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-2 block">&lt;about&gt;</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            The Engineer Behind The Code
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Software Engineer Specializing in Scalable Web Architecture
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden border border-border shadow-lg">
                <img
                  src="https://cdn.jsdelivr.net/gh/njbm/assets/img/logo.png"
                  alt="Jaber Masud"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-mono text-sm shadow-lg"
              >
                5+ Years Experience
              </motion.div>
            </div>

            {/* Quick Stats Card */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold mb-4 text-primary">Quick Info</h3>
                <div className="space-y-3">
                  {quickStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <stat.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{stat.label}:</span>
                      <span className="text-sm font-medium truncate">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Bio & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Bio */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a software engineer with over 5 years of experience building production-ready web applications using PHP, Laravel, and modern web technologies. I specialize in turning complex ideas into scalable products — from enterprise-level systems to published SaaS solutions on Codecanyon.
              </p>
              <p>
                My expertise spans full-stack development with a strong focus on backend architecture. I've integrated Meta Official APIs (WhatsApp Cloud, Messenger, Instagram) into Omnichannel CRM systems, built digital wallet solutions with multiple payment gateway integrations (Stripe, Marqeta, Rapyd, Flutterwave), and optimized high-traffic Laravel applications for performance.
              </p>
              <p>
                Writing clean, maintainable code and following best practices is at the core of my work. I'm constantly learning new tools and technologies to build better software, and I enjoy mentoring others to grow their technical skills.
              </p>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="font-mono font-semibold text-primary">Key Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm"
                  >
                    <achievement.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{achievement.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {philosophyCards.map((card, index) => (
            <Card key={card.title} className="hover-lift overflow-hidden group">
              <CardContent className="p-6 relative">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient}`} />
                <h4 className="font-mono font-semibold mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h4>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <span className="text-primary font-mono text-sm">&lt;/about&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};
