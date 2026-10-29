import { SiGithub, SiLinkedin } from 'react-icons/si';
import { personalInfo } from '../data/personalInfo';
import { liveCount, productsShipped, usersReached } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';
import AskAI from './AskAI';

const people = usersReached.replace('k', ',000');

const stats = [
  { value: String(productsShipped), label: 'products shipped' },
  { value: `${usersReached}+`, label: 'users reached' },
  { value: String(liveCount), label: 'live today' },
  { value: '2022', label: 'shipping since' },
];

/** Intro and stats beside the assistant. The work itself starts right below. */
const Hero: React.FC = () => {
  const { trackEvent } = useAnalytics();

  return (
    <section id="top" className="page pb-6 pt-10 sm:pt-16 lg:pb-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
        <div className="lift">
          <p className="font-mono text-[13px] text-muted">
            <span className="text-link">~/rasheed</span> <span className="opacity-60">$</span> whoami
          </p>
          <p className="mt-1 font-mono text-[13px] text-ink/80">
            Rasheed M, software engineer in Kerala
            <span className="caret" aria-hidden />
          </p>
          <h1 className="mt-3 text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[48px] xl:text-[54px]">
            I build AI products and ship them to real users.
          </h1>
          <p className="mt-5 max-w-[34rem] text-[16px] leading-relaxed text-muted sm:text-[17px]">
            {productsShipped} products since 2022, used by about {people} people: native iOS and Android apps, RAG
            systems and LLM features, end to end. I’m open to freelance and full-time work.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a href="#work" className="btn-ink" onClick={() => trackEvent('cta_click', { cta: 'hero_work' })}>
              See my work
            </a>
            <a
              href={personalInfo.socialLinks.email}
              className="btn-line"
              onClick={() => trackEvent('cta_click', { cta: 'hero_email' })}
            >
              Email me
            </a>
            <a
              href={personalInfo.resumeUrl}
              className="btn-line"
              onClick={() => trackEvent('resume_download', { from: 'hero' })}
            >
              Résumé
            </a>
            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="btn-line w-9 px-0"
              onClick={() => trackEvent('social_click', { channel: 'LinkedIn', from: 'hero' })}
            >
              <SiLinkedin className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="btn-line w-9 px-0"
              onClick={() => trackEvent('social_click', { channel: 'GitHub', from: 'hero' })}
            >
              <SiGithub className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-10 grid max-w-[34rem] grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1.5 text-[13px] text-muted">{s.label}</dt>
                <dd className="text-[26px] font-semibold leading-none tracking-[-0.02em]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lift" style={{ animationDelay: '0.1s' }}>
          <AskAI />
        </div>
      </div>
    </section>
  );
};

export default Hero;
