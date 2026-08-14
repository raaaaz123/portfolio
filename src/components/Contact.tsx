import { motion } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';
import Section from './Section';
import { ease } from '../lib/ui';

const channels = [
  { name: 'GitHub', href: personalInfo.socialLinks.github },
  { name: 'LinkedIn', href: personalInfo.socialLinks.linkedin },
  { name: 'WhatsApp', href: personalInfo.socialLinks.whatsapp },
  { name: 'Phone', href: personalInfo.socialLinks.phone },
];

const Contact: React.FC<{ onHire: () => void }> = ({ onHire }) => (
  <Section id="contact" index="05" path="contact">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease }}
    >
      <p className="max-w-[24ch] font-display text-[1.85rem] font-light leading-[1.15] tracking-tight text-foreground min-[400px]:text-3xl sm:text-5xl">
        Have something worth building?
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 sm:mt-9">
        <motion.button
          type="button"
          onClick={onHire}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.25, ease }}
          className="sheen inline-flex items-center rounded-full bg-foreground px-6 py-3 text-[12px] font-medium tracking-wide text-background shadow-lg shadow-foreground/15"
        >
          Hire me
        </motion.button>

        <a
          href={`mailto:${personalInfo.email}`}
          className="link-underline break-all text-[14px] text-primary sm:text-base"
        >
          {personalInfo.email}
        </a>
      </div>

      <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 sm:mt-10">
        {channels.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="label link-underline hover:text-foreground"
          >
            {c.name}
          </a>
        ))}
      </div>
    </motion.div>
  </Section>
);

export default Contact;
