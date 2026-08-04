import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { roles, values } from "../data/content";
import FadeUp from "./FadeUp";
import ValueCard from "./ValueCard";

gsap.registerPlugin(ScrollTrigger);

const accentColors = [
  "var(--color-green)",
  "var(--color-accent)",
  "#f59e0b",
  "#ec4899",
];

export default function About() {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-alt py-24 px-10 md:py-16 md:px-5" id="about">
      <FadeUp>
        <div className="section-label">About Ciigus</div>
        <h2 className="section-title">
          A versatile team.
          <br />
          Ready for anything.
        </h2>
        <p className="section-sub">
          Ciigus brings together developers, QA engineers, business analysts,
          and project managers - who take on challenges head-on and deliver
          exactly what our clients expect, every time.
        </p>
      </FadeUp>

      <FadeUp delay={0.15} className="flex flex-wrap gap-[0.6rem] mt-8 mb-12">
        {roles.map((role) => (
          <div
            className="bg-faint border border-border rounded-full py-[0.35rem] px-4 text-[0.82rem] text-muted transition-all duration-200 ease-in-out hover:border-accent2/50 hover:text-text hover:-translate-y-0.5"
            key={role}
          >
            {role}
          </div>
        ))}
      </FadeUp>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4"
      >
        {values.map((val, i) => (
          <ValueCard
            key={val.title}
            icon={val.icon}
            title={val.title}
            desc={val.desc}
            accentColor={accentColors[i % accentColors.length]}
            cardRef={(el) => (cardsRef.current[i] = el)}
          />
        ))}
      </div>
    </section>
  );
}
