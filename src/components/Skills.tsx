import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';
import Section from './Section';
import { ease } from '../lib/ui';

const Skills = () => (
  <Section id="stack" index="04" path="stack">
    <div className="border-t border-hairline">
      {skillGroups.map((group, i) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: i * 0.06, ease }}
          className="flex flex-col gap-x-8 gap-y-3 border-b border-hairline py-5 sm:flex-row sm:py-6"
        >
          <h3 className="label shrink-0 pt-0.5 text-foreground sm:w-40">{group.label}</h3>

          <ul className="flex flex-wrap gap-x-2 gap-y-2">
            {group.items.map((item, k) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.06 + k * 0.02, ease }}
                whileHover={{ y: -2 }}
                className="glass sheen cursor-default rounded-full px-3 py-1 text-[11.5px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default Skills;
