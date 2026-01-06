import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, FileText, ShoppingCart, Layers, Wallet, Store, MessageSquare, CreditCard, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const filters = ['All Projects', 'SaaS & CRM', 'Fintech & Payments', 'E-commerce'];

const projects = [
  {
    id: 1,
    title: 'Omnichannel CRM & E-commerce Platform',
    category: 'SaaS & CRM',
    status: 'In Development',
    statusColor: 'bg-primary',
    icon: MessageSquare,
    description:
      'Enterprise-grade Omnichannel CRM integrating Meta Official APIs (WhatsApp Cloud, Messenger, Instagram) for unified communication dashboard with CRM workflows and e-commerce features.',
    role: 'Core Developer & Architect',
    highlights: [
      'Implemented full-stack development (frontend & backend)',
      'Built real-time messaging system with Laravel Reverb',
      'Designed service-driven architecture with interfaces for multiple messaging channels',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Redis', 'Laravel Reverb', 'Vue.js', 'Meta APIs'],
    links: {
      docs: 'https://github.com/njbm',
    },
  },
  {
    id: 2,
    title: 'Waiz - Digital Wallet & Remittance',
    category: 'Fintech & Payments',
    status: 'Published',
    statusColor: 'bg-accent',
    icon: Wallet,
    description:
      'Complete digital wallet and remittance solution for global money transfers with mobile app and web platform, including comprehensive admin panel.',
    highlights: [
      'Multi-currency wallet system',
      'Global remittance/money transfer',
      'Virtual card management',
      'KYC/AML compliance integration',
    ],
    integrations: ['Stripe', 'Strowallet', 'Marqeta', 'Rapyd', 'Flutterwave', 'Ufitpay'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Flutter', 'RESTful APIs'],
    links: {
      live: 'https://codecanyon.net/item/waiz-digital-wallet-and-remittance-app-and-website-with-admin-panel/52577738',
    },
  },
  {
    id: 3,
    title: 'Pay Secure - Digital Wallet Solution',
    category: 'Fintech & Payments',
    status: 'Published',
    statusColor: 'bg-accent',
    icon: CreditCard,
    description:
      'Complete digital wallet ecosystem with separate add-ons for agents and merchants. Built from scratch with optimized database design for secure, high-volume transactions.',
    highlights: [
      'Optimized database schema for high-volume transactions',
      'Role-based access control (RBAC)',
      'Multi-tenant architecture support',
      '6 separate products: Main + Agent/Merchant addons + Mobile apps',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Flutter', 'Redis'],
    links: {
      live: 'https://codecanyon.net/item/pay-secure-a-complete-digital-wallet-solution/51726768',
      collection: 'https://codecanyon.net/collections/pay-secure',
    },
  },
  {
    id: 4,
    title: 'Marketlyst - Digital Content Marketplace',
    category: 'E-commerce',
    status: 'Published',
    statusColor: 'bg-accent',
    icon: Store,
    description:
      'Scalable multi-vendor digital marketplace with advanced product management, automated delivery system, Sumsub KYC integration, and Stripe Connect for vendor payouts.',
    highlights: [
      'Multi-vendor marketplace architecture',
      'Sumsub KYC integration for vendor verification',
      'Stripe Connect for automated vendor payouts',
      'Real-time inventory management',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Sumsub KYC', 'Stripe Connect'],
    links: {
      live: '#',
    },
  },
];

const additionalProjects = [
  { name: 'Advanced Real-Time Chat System', tech: 'Laravel, WebSockets, Redis' },
  { name: 'Crypto Exchange Platform', tech: 'Laravel, Blockchain APIs' },
  { name: 'Inventory Management System', tech: 'Laravel, Vue.js, MySQL' },
  { name: 'Appointment Booking System', tech: 'Laravel, Calendar APIs' },
  { name: 'Learning Management System', tech: 'Laravel, Video streaming' },
  { name: 'Restaurant Management POS', tech: 'Laravel, Vue.js' },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'All Projects' || project.category === activeFilter
  );

  return (
    <section id="projects" className="py-20 lg:py-32 scroll-mt-nav">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm mb-2 block">&lt;projects&gt;</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real products serving real users — from SaaS platforms to fintech solutions
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover-lift group overflow-hidden">
                <CardContent className="p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <project.icon className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className={`${project.statusColor} text-white border-0`}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {project.links.docs && (
                        <a
                          href={project.links.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-muted transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-muted transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.role && (
                    <p className="text-primary text-sm font-medium mb-3">{project.role}</p>
                  )}
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                  {/* Highlights */}
                  <ul className="space-y-1 mb-4">
                    {project.highlights.slice(0, 3).map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">▸</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Payment Integrations */}
                  {project.integrations && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Payment Integrations:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.integrations.map((int) => (
                          <span key={int} className="text-xs px-2 py-0.5 bg-success/10 text-success rounded">
                            {int}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-badge text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Collection Link */}
                  {project.links.collection && (
                    <a
                      href={project.links.collection}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Package className="w-4 h-4" />
                      View Full Collection (6 Products)
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="font-mono font-semibold text-lg mb-6 text-center">
            Other Published Products & Custom Solutions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalProjects.map((project, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-4 text-center">
                  <Layers className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <h4 className="font-medium text-sm mb-1">{project.name}</h4>
                  <p className="text-xs text-muted-foreground">{project.tech}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* GitHub & Codecanyon Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <Button variant="outline" size="lg" className="rounded-full gap-2" asChild>
            <a href="https://github.com/njbm" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              View More on GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full gap-2" asChild>
            <a
              href="https://codecanyon.net/user/njbm/portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShoppingCart className="w-4 h-4" />
              Codecanyon Portfolio
            </a>
          </Button>
        </motion.div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <span className="text-primary font-mono text-sm">&lt;/projects&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};
