import Image from "next/image";
import Button from "../atoms/Button";

const ArtistSpotlight = () => {
  return (
    <section className="max-w-7xl mx-auto py-32 px-6 border-y border-glass my-24 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 relative group">
          <div className="aspect-4/5 relative overflow-hidden bg-surface">
            <Image
              src="/artist.webp"
              alt="Elena Vasquez in her studio"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-brand px-6 py-4 shadow-neon hidden md:block">
            <p className="font-jakarta text-[10px] font-bold uppercase tracking-[0.3em]">
              Studio Feature
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12 lg:pl-12">
          <div className="space-y-4">
            <span className="font-jakarta text-brand text-[10px] font-bold uppercase tracking-[0.4em]">
              The Creator Series
            </span>
            <h2 className="text-6xl md:text-7xl font-luxury leading-[0.9] tracking-tight">
              The hands <br />
              <span className="italic">behind the work.</span>
            </h2>
          </div>

          <div className="space-y-8">
            <p className="font-jakarta text-muted leading-relaxed tracking-wide text-lg max-w-xl">
              Meet Elena Vasquez, a self-taught painter from Barcelona who
              transforms everyday moments into visceral abstract expressions.
            </p>
            <div className="relative py-4">
              <div className="absolute left-0 top-0 w-1 h-full bg-brand" />
              <blockquote className="pl-10 font-luxury italic text-2xl text-white/90 leading-snug">
                "I paint the feelings that words can't capture—the space between
                memory and dream."
              </blockquote>
            </div>
          </div>
          <Button
            title="Explore Artist Profile"
            variant="outline"
            className="h-16 px-12"
          />
        </div>
      </div>
    </section>
  );
};

export default ArtistSpotlight;
