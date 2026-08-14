import { personalInfo } from '../data/personalInfo';

const Footer = () => (
  <footer className="relative z-10 py-8">
    <div className="shell">
      <div className="rule mb-6" />
      <div className="flex items-center gap-x-8 gap-y-3">
        <p className="label">
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
        <a href="#home" className="label link-underline ml-auto hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
