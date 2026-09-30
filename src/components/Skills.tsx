import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';
import { ease } from '../lib/ui';
import SectionHead from './SectionHead';

const hoverFill = ['hover:bg-pop', 'hover:bg-sun', 'hover:bg-mint', 'hover:bg-moss hover:text-paper'];

const Skills = () => (
  <section id="stack" className="bg-paper pb-24 pt-20 text-ink sm:pb-32 sm:pt-28">
    <div className="shell">
      <SectionHead n="06" title="What I work with" />

      <ul>
        {skillGroups.map((g, i) => (
          <motion.li
            key={g.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.05, ease }}
            className="group grid gap-5 py-8 sm:py-10 lg:grid-cols-[64px_1fr_1.25fr] lg:items-center"
          >
            <span className="display text-[40px] text-ink/25 transition-colors group-hover:text-pop">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3
                className="display text-[clamp(2.4rem,5vw,4.2rem)] group-hover:[--wdth:92]"
                style={{ transition: '--wdth 0.6s cubic-bezier(0.22,1,0.36,1)' }}
              >
                {g.label}
              </h3>
            </div>
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {g.items.map((s) => (
                <li
                  key={s}
                  className={`tag cursor-default border-[1.5px] border-ink px-3.5 py-1.5 text-[14px] font-semibold ${hoverFill[i % 4]}`}
                >
                  {s}
                </li>
              ))}
            </ul>
            <div className="rule-dash text-ink/25 lg:col-span-3" />
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

export default Skills;
