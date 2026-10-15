import { SiGithub, SiLinkedin } from 'react-icons/si';
import { personalInfo } from '../data/personalInfo';
import { productsShipped, usersReached } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';
import AskAI from './AskAI';
import HeroSlider from './HeroSlider';

const people = usersReached.replace('k', ',000');

/** Row one: intro beside the assistant. Row two: the products, full width. */
const Hero: React.FC = () => {
  const { trackEvent } = useAnalytics();

  return (
    <section id="top" className="page pb-12 pt-10 sm:pt-14 lg:pb-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
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
            {productsShipped} products since 2022, used by about {people} people. These days it’s RAG systems, LLM
            features and native iOS and Android apps. I’m open to freelance and full-time work.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a
              href={personalInfo.socialLinks.email}
              className="btn-ink"
              onClick={() => trackEvent('cta_click', { cta: 'hero_email' })}
            >
              Email me
            </a>
            <a
              href={personalInfo.resumeUrl}
              className="btn-line"
              onClick={() => trackEvent('resume_download', { from: 'hero' })}
            >
              Download résumé
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
        </div>

        <div className="lift" style={{ animationDelay: '0.1s' }}>
          <AskAI />
        </div>
      </div>

      <div className="lift mt-10 lg:mt-14" style={{ animationDelay: '0.2s' }}>
        <HeroSlider />
      </div>
    </section>
  );
};

export default Hero;
