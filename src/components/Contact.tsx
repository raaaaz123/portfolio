import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMessageCircle, FiArrowUpRight } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const contactLinks = [
  {
    name: 'Email',
    icon: <FiMail size={20} />,
    href: `mailto:${personalInfo.email}`,
    label: personalInfo.email,
    color: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
    bg: 'group-hover:bg-teal-50 dark:group-hover:bg-teal-500/10 group-hover:border-teal-200/60 dark:group-hover:border-teal-500/20',
  },
  {
    name: 'WhatsApp',
    icon: <FiMessageCircle size={20} />,
    href: personalInfo.socialLinks.whatsapp,
    label: 'Chat on WhatsApp',
    color: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    bg: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:border-emerald-200/60 dark:group-hover:border-emerald-500/20',
  },
  {
    name: 'Phone',
    icon: <FiPhone size={20} />,
    href: personalInfo.socialLinks.phone,
    label: personalInfo.phone,
    color: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
    bg: 'group-hover:bg-cyan-50 dark:group-hover:bg-cyan-500/10 group-hover:border-cyan-200/60 dark:group-hover:border-cyan-500/20',
  },
  {
    name: 'GitHub',
    icon: <FiGithub size={20} />,
    href: personalInfo.socialLinks.github,
    label: 'GitHub Profile',
    color: 'group-hover:text-foreground',
    bg: 'group-hover:bg-secondary group-hover:border-border',
  },
  {
    name: 'LinkedIn',
    icon: <FiLinkedin size={20} />,
    href: personalInfo.socialLinks.linkedin,
    label: 'LinkedIn Profile',
    color: 'group-hover:text-sky-600 dark:group-hover:text-sky-400',
    bg: 'group-hover:bg-sky-50 dark:group-hover:bg-sky-500/10 group-hover:border-sky-200/60 dark:group-hover:border-sky-500/20',
  },
];

/* ─── Contact Link Card ─── */
const ContactCard: React.FC<{
  link: (typeof contactLinks)[0];
  index: number;
}> = ({ link, index }) => (
  <motion.a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.98 }}
    className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border/60 hover:shadow-md hover:shadow-teal-500/[0.03] transition-all duration-300"
  >
    {/* Icon */}
    <div className={`flex-shrink-0 w-11 h-11 rounded-xl border border-border/60 flex items-center justify-center text-muted-foreground transition-all duration-300 ${link.color} ${link.bg}`}>
      {link.icon}
    </div>

    {/* Text */}
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-foreground">{link.name}</div>
      <div className="text-xs text-muted-foreground truncate">{link.label}</div>
    </div>

    {/* Arrow */}
    <FiArrowUpRight
      size={16}
      className="flex-shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  </motion.a>
);

/* ─── Main Contact Section ─── */
const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 relative overflow-hidden bg-background text-foreground">
      {/* Subtle aurora blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] dark:opacity-[0.08] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(168 76% 50%) 0%, transparent 70%)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <motion.span
              className="inline-block text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
              Get in Touch
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Interested in working together? Reach out through any of these channels.
            </p>
          </motion.div>

          {/* Contact Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {contactLinks.map((link, index) => (
              <ContactCard key={link.name} link={link} index={index} />
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500 shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiMail size={16} />
              Send Email
              <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            <motion.a
              href={personalInfo.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-border/80 text-foreground bg-card hover:bg-teal-50/40 dark:hover:bg-teal-500/[0.06] hover:border-teal-500/30 dark:hover:border-teal-400/20 transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiMessageCircle size={16} />
              WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
