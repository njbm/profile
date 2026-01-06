import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Code2, Server, Palette, Link, Settings, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const coreSkills = [
  { name: 'Laravel', level: 95, years: '5+ years' },
  { name: 'PHP', level: 90, years: 'OOP, PHP 8.x' },
  { name: 'MySQL/PostgreSQL', level: 85, years: 'Design & Optimization' },
  { name: 'JavaScript', level: 80, years: 'ES6+, async/await' },
  { name: 'Vue.js', level: 70, years: 'Components & State' },
  { name: 'HTML/CSS', level: 95, years: 'Semantic HTML5' },
  { name: 'Bootstrap/Tailwind', level: 90, years: 'Utility-first CSS' },
  { name: 'Git/GitHub', level: 85, years: 'Version control' },
];

const skillCategories = [
  {
    icon: Server,
    title: 'Backend & Server',
    skills: [
      'RESTful API Design',
      'Laravel Ecosystem (Livewire, Reverb, Queues)',
      'Database Architecture',
      'SQL Query Optimization',
      'Redis (Caching & Sessions)',
      'Webhooks & Event-Driven Architecture',
      'Authentication (JWT, Sanctum)',
      'Multi-tenancy Architecture',
    ],
  },
  {
    icon: Palette,
    title: 'Frontend & UI',
    skills: [
      'Vue.js (Composition API)',
      'Blade Template Engine',
      'jQuery & AJAX',
      'Bootstrap 5 & Tailwind CSS',
      'Responsive Design',
      'DataTables & Interactive Components',
      'Modern JavaScript (ES6+)',
    ],
  },
  {
    icon: Link,
    title: 'Third-Party Integrations',
    skills: [
      'Meta APIs (WhatsApp, Messenger, Instagram)',
      'Payment Gateways (Stripe, Marqeta, Rapyd)',
      'Virtual Card Systems',
      'KYC Services (Sumsub)',
      'Stripe Connect',
      'Email & SMS Services',
      'Cloud Storage (AWS S3)',
    ],
  },
  {
    icon: Settings,
    title: 'DevOps & Tools',
    skills: [
      'Git & GitHub',
      'Docker (Containerization)',
      'CI/CD Pipelines',
      'Linux Server Management',
      'cPanel & WHM',
      'API Testing (Postman)',
      'VS Code, PhpStorm',
    ],
  },
  {
    icon: Code2,
    title: 'Software Engineering',
    skills: [
      'Object-Oriented Programming',
      'Design Patterns (Repository, Service)',
      'SOLID Principles',
      'Clean Code Practices',
      'Code Review & Refactoring',
      'Agile/Scrum Methodologies',
      'Technical Documentation',
    ],
  },
];

const learningSkills = ['React & Next.js', 'TypeScript', 'Laravel Octane & Horizon', 'Microservices', 'GraphQL'];

const ProgressBar = ({ skill, delay, isInView }: { skill: { name: string; level: number; years: string }; delay: number; isInView: boolean }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, skill.level, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.years}</span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 lg:py-32 bg-muted/30 scroll-mt-nav">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-2 block">&lt;skills&gt;</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">The Arsenal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to build scalable applications
          </p>
        </motion.div>

        {/* Core Skills with Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="font-mono font-semibold text-lg mb-8 text-center">Core Technical Stack</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
            {coreSkills.map((skill, index) => (
              <ProgressBar
                key={skill.name}
                skill={skill}
                delay={0.3 + index * 0.1}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <category.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-mono font-semibold">{category.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">▸</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Currently Learning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            <Card className="h-full border-dashed border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-mono font-semibold">Currently Exploring</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {learningSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <span className="text-primary font-mono text-sm">&lt;/skills&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};
