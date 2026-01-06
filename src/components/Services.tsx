import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Monitor, Link2, CreditCard, Wrench, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Rocket,
    title: 'Laravel Application Development',
    description:
      'Build robust, scalable Laravel applications from scratch or enhance existing systems. Specializing in complex business logic, database architecture, and performance optimization.',
    deliverables: [
      'Custom Laravel applications',
      'Database design & migrations',
      'RESTful API development',
      'Authentication systems',
      'Payment gateway integration',
      'Admin panels & dashboards',
    ],
    bestFor: 'SaaS products, enterprise systems, fintech applications',
    gradient: 'from-primary to-primary/50',
  },
  {
    icon: Monitor,
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web application development covering both frontend and backend. From responsive UI design to complex server-side logic.',
    deliverables: [
      'Backend: Laravel, PHP, MySQL/PostgreSQL',
      'Frontend: Vue.js, JavaScript, HTML/CSS',
      'Styling: Bootstrap, Tailwind CSS',
    ],
    bestFor: 'Complete web applications, MVPs, business software',
    gradient: 'from-accent to-accent/50',
  },
  {
    icon: Link2,
    title: 'API Development & Integration',
    description:
      'Design and build RESTful APIs or integrate third-party services into your application. Experience with Meta APIs, payment gateways, KYC services, and more.',
    deliverables: [
      'Custom REST API development',
      'Third-party API integration',
      'Webhook implementation',
      'API documentation',
      'Performance optimization',
    ],
    bestFor: 'Mobile app backends, system integrations, automation',
    gradient: 'from-success to-success/50',
  },
  {
    icon: CreditCard,
    title: 'Payment System Integration',
    description:
      'Integrate multiple payment gateways and virtual card systems. Proven experience with Stripe, Marqeta, Rapyd, Flutterwave, and other major providers.',
    deliverables: [
      'Multi-gateway payment processing',
      'Virtual card management',
      'Subscription billing',
      'Payout systems (Stripe Connect)',
      'Transaction security',
    ],
    bestFor: 'E-commerce, fintech, digital wallets, marketplaces',
    gradient: 'from-warning to-warning/50',
  },
  {
    icon: Wrench,
    title: 'Legacy Code Modernization',
    description:
      'Refactor and optimize existing codebases. Improve performance, security, and maintainability of legacy applications.',
    deliverables: [
      'Code review & analysis',
      'Performance optimization',
      'Security audits',
      'Database optimization',
      'Migration to modern frameworks',
    ],
    bestFor: 'Inherited projects, performance issues, technical debt',
    gradient: 'from-destructive to-destructive/50',
  },
  {
    icon: GraduationCap,
    title: 'Technical Training & Mentoring',
    description:
      'One-on-one or group training sessions on Laravel, PHP, and modern web development practices. Patient, clear explanations with hands-on projects.',
    deliverables: [
      'Laravel fundamentals to advanced',
      'PHP best practices',
      'Database design',
      'API development',
      'Frontend integration',
    ],
    bestFor: 'Teams, junior developers, bootcamp students',
    gradient: 'from-primary via-accent to-primary',
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-32 scroll-mt-nav">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-2 block">&lt;services&gt;</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Professional Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment — building scalable web solutions
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full hover-lift group overflow-hidden">
                <CardContent className="p-6 relative">
                  {/* Gradient Top Border */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`} />

                  {/* Icon */}
                  <div className="p-3 rounded-xl bg-muted w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-mono font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-foreground mb-2">Deliverables:</p>
                    <ul className="space-y-1">
                      {service.deliverables.slice(0, 4).map((item) => (
                        <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs">
                      <span className="font-semibold text-foreground">Best for:</span>{' '}
                      <span className="text-muted-foreground">{service.bestFor}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground mb-6">
                Ready to start your project? Let's discuss how I can help bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={scrollToContact} className="rounded-full">
                  Send a Message
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToContact}
                  className="rounded-full"
                >
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <span className="text-primary font-mono text-sm">&lt;/services&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};
