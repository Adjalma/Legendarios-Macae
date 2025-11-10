import { useMemo } from "react";
import { motion } from "framer-motion";
import { legendariosTimeline } from "../../../content/timeline";

export const TimelineSection = () => {
  const timeline = useMemo(
    () => legendariosTimeline.sort((a, b) => a.year - b.year),
    []
  );

  return (
    <section className="bg-white py-24 text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
            Nossa história
          </span>
          <h2 className="mt-3 font-display text-3xl uppercase md:text-4xl">
            Linha do tempo Legendários
          </h2>
          <p className="mt-4 text-base text-black/70 md:text-lg">
            Do coração de Chepe Putzu à chegada em Macaé, percorremos um legado de transformação.
            Reviva os principais marcos do movimento Legendários.
          </p>
        </div>

        <div className="relative mt-12 border-l-2 border-black/10 pl-8 md:pl-12">
          {timeline.map((step, index) => (
            <motion.div
              key={step.year}
              className="relative mb-14 flex flex-col gap-6 md:flex-row md:gap-10"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <div className="absolute -left-10 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-legendarios-orange bg-white text-sm font-semibold text-legendarios-orange shadow-md md:-left-16">
                {step.year}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl uppercase text-black md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-black/70 md:text-base">{step.description}</p>
              </div>
              {step.media && (
                <div className="flex-1 overflow-hidden rounded-3xl border border-black/5 bg-black/5">
                  <img
                    src={step.media.image}
                    alt={step.media.caption ?? step.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  {step.media.caption && (
                    <p className="px-4 py-3 text-xs uppercase tracking-wide text-black/60">
                      {step.media.caption}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

