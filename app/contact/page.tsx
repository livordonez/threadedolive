import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Use the Threaded Olive contact page for questions, collaborations, and future commission inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-12">
      <div className="max-w-3xl space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pimento-700">
          Contact
        </p>
        <h1 className="font-serif text-5xl leading-none tracking-[-0.05em] text-olive-900 sm:text-6xl">
          A friendly place for questions, collaborations, and future inquiries.
        </h1>
        <p className="text-lg leading-9 text-charcoal-700">
          This first pass includes a polished, non-live contact form UI. The
          fields are ready for a future form service once you choose the backend
          you want to connect.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <form
          className="rounded-[2.25rem] border border-olive-900/10 bg-white/82 p-8 shadow-[0_24px_60px_rgba(37,33,29,0.05)]"
          aria-describedby="contact-form-note"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-charcoal-900">
              Name
              <input
                type="text"
                name="name"
                className="rounded-[1rem] border border-olive-900/12 bg-linen-0 px-4 py-3 text-base font-normal text-charcoal-900"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-charcoal-900">
              Email
              <input
                type="email"
                name="email"
                className="rounded-[1rem] border border-olive-900/12 bg-linen-0 px-4 py-3 text-base font-normal text-charcoal-900"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-6 flex flex-col gap-2 text-sm font-semibold text-charcoal-900">
            Subject
            <input
              type="text"
              name="subject"
              className="rounded-[1rem] border border-olive-900/12 bg-linen-0 px-4 py-3 text-base font-normal text-charcoal-900"
              placeholder="What would you like to talk about?"
            />
          </label>

          <label className="mt-6 flex flex-col gap-2 text-sm font-semibold text-charcoal-900">
            Message
            <textarea
              name="message"
              rows={7}
              className="rounded-[1.25rem] border border-olive-900/12 bg-linen-0 px-4 py-3 text-base font-normal text-charcoal-900"
              placeholder="This form is a visual placeholder for now, but the layout is ready for a real submission flow."
            />
          </label>

          <button
            type="button"
            className="mt-6 inline-flex rounded-full bg-olive-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-linen-0"
          >
            Submission placeholder
          </button>

          <p id="contact-form-note" className="mt-4 text-sm leading-7 text-charcoal-700">
            Connect this form later by adding a real endpoint or third-party
            form action. The surrounding page layout does not need to change.
          </p>
        </form>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-olive-900/10 bg-white/78 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
              Contact topics
            </p>
            <ul className="mt-4 space-y-3 text-base leading-8 text-charcoal-700">
              {siteConfig.contactTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-olive-900/10 bg-white/78 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pimento-700">
              Placeholder links
            </p>
            <ul className="mt-4 space-y-3 text-base leading-8 text-charcoal-700">
              {siteConfig.socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-semibold text-olive-900 underline decoration-olive-900/20 underline-offset-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-olive-900/10 bg-olive-900 p-6 text-linen-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass-100">
              To make this live later
            </p>
            <ol className="mt-4 space-y-3 text-base leading-8">
              {siteConfig.futureFormSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
