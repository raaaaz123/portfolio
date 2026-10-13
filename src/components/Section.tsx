/** A section: heading and optional intro side by side on wide screens, then content. */
const Section: React.FC<{
  id: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, title, intro, children }) => (
  <section id={id} className="page py-12 sm:py-16">
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
      <h2 className="h2">{title}</h2>
      {intro && <p className="max-w-text text-[15px] text-muted lg:justify-self-end">{intro}</p>}
    </div>
    <div className="mt-8">{children}</div>
  </section>
);

export default Section;
