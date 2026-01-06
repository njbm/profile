import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Award, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const experiences = [
  {
    type: 'work',
    title: 'Software Engineer',
    company: 'Bug Finder',
    location: 'Uttara, Dhaka, Bangladesh',
    period: '2023 - Present',
    description: [
      'Built and optimized high-performance Laravel applications for scalability',
      'Designed RESTful APIs for third-party and internal system integrations',
      'Integrated Meta Official APIs (WhatsApp Cloud, Messenger, Instagram) into Omnichannel CRM',
      'Integrated payment gateways and virtual card systems',
      'Conducted code reviews and optimized SQL queries for performance',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Redis', 'Laravel Reverb'],
  },
  {
    type: 'work',
    title: 'Web Development Trainer',
    company: 'Knowledge IT Institute',
    location: 'Uttara, Dhaka, Bangladesh',
    period: '2022',
    description: [
      'Conducted training sessions on PHP, Laravel, and JavaScript frameworks',
      'Developed course materials and hands-on projects for students',
      'Mentored students to build real-world applications',
    ],
    impact: 'Trained 100+ students in modern web development',
    tech: ['PHP', 'Laravel', 'JavaScript', 'MySQL'],
  },
  {
    type: 'work',
    title: 'Web Design Specialist',
    company: 'Skill Base IT',
    location: 'Feni, Bangladesh',
    period: '2017 - 2018',
    description: ['Early career foundation in web design and development'],
    tech: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
  },
];

const education = [
  {
    degree: "Bachelor's in Computer Science & Engineering",
    institution: 'Northern University Bangladesh',
    period: '2021 - 2024',
    focus: 'Software Engineering, Database Systems, Web Technologies',
  },
  {
    degree: 'Diploma in Computer Science & Engineering',
    institution: 'Feni Polytechnic Institute',
    period: '2016 - 2020',
    focus: 'Government Technical Educational Institution',
  },
];

const certifications = [
  'PHP with Laravel Framework – PONDIT (Under BASIS SEIP), Dhaka',
  'Web Design & Development – SBIT, Feni (1-year program, 2017)',
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 lg:py-32 bg-muted/30 scroll-mt-nav">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-2 block">&lt;experience&gt;</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Career Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From early beginnings to enterprise-level development
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Professional Experience - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-mono font-semibold text-lg flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-primary" />
              Professional Experience
            </h3>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.15 }}
                  className="relative pl-20 pb-8 last:pb-0"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  </div>

                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{exp.title}</h4>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      {exp.impact && (
                        <p className="text-success text-sm font-medium mb-4">
                          ✨ {exp.impact}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <span key={tech} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Certifications - Takes 1 column */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="font-mono font-semibold text-lg flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </h3>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="hover-lift">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-sm mb-1">{edu.degree}</h4>
                        <p className="text-primary text-sm">{edu.institution}</p>
                        <p className="text-muted-foreground text-xs mt-1">{edu.period}</p>
                        <p className="text-muted-foreground text-xs mt-2 italic">{edu.focus}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-mono font-semibold text-lg flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-primary" />
                Certifications
              </h3>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-success mt-0.5">✓</span>
                    <span className="text-muted-foreground">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closing Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <span className="text-primary font-mono text-sm">&lt;/experience&gt;</span>
        </motion.div>
      </div>
    </section>
  );
};
