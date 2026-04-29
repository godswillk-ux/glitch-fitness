import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Globe, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const OurStory = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase"
        >
          {t('home.learnMore', 'Our Story')}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic"
        >
          Crafting Elegance, <br />
          <span className="text-primary text-gold">Defining Style.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          UJAYKRIS began with a simple vision: to create fashion that doesn't just follow trends, but tells a story of individual excellence and timeless beauty.
        </motion.p>
      </section>

      {/* Narrative Section 1 */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2070&auto=format&fit=crop" 
            alt="Craftsmanship" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <p className="text-white font-medium italic">"Precision in every stitch, passion in every fold."</p>
          </div>
        </motion.div>
        <div className="space-y-6">
          <h2 className="text-3xl font-black italic uppercase tracking-tight">The Beginning of a Dream</h2>
          <p className="text-muted-foreground leading-relaxed">
            In the heart of a small atelier, UJAYKRIS was born from the belief that fashion should be an extension of one's soul. We didn't start in a boardroom; we started with a needle, a thread, and a dream to redefine how the world perceives luxury.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every fabric was handpicked, every silhouette meticulously sketched. We weren't just making clothes; we were building a sanctuary for those who value the language of quality over the noise of fast fashion.
          </p>
          <div className="flex gap-4">
            <div className="p-3 rounded-xl bg-gold/10 border border-gold/20">
              <Sparkles className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h4 className="font-bold">Aesthetic Precision</h4>
              <p className="text-sm text-muted-foreground">Every piece is checked for perfection across 12 distinct quality points.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-card/50 backdrop-blur-md rounded-[3rem] p-12 border border-border shadow-inner">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black italic uppercase tracking-tight mb-4">Our Core Pillars</h2>
          <p className="text-muted-foreground">The values that guide every UJAYKRIS creation.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Heart className="h-8 w-8 text-destructive" />,
              title: "Passion for Excellence",
              desc: "We pour our heart into every detail, ensuring each garment is a masterpiece of modern design."
            },
            {
              icon: <Globe className="h-8 w-8 text-blue-500" />,
              title: "Ethical Sourcing",
              desc: "Our commitment to the planet is as strong as our commitment to style. We source responsibly."
            },
            {
              icon: <Award className="h-8 w-8 text-gold" />,
              title: "Timeless Quality",
              desc: "UJAYKRIS pieces are designed to last lifetimes, becoming heirlooms of your personal style."
            }
          ].map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-background/50 border border-border hover:shadow-lg transition-all text-center space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-background flex items-center justify-center shadow-sm">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold italic uppercase">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Narrative Section 2 */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <h2 className="text-3xl font-black italic uppercase tracking-tight">The Modern Legacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Today, UJAYKRIS stands as a beacon for global fashion. From the bustling streets of Tokyo to the chic avenues of Paris, our designs resonate with those who dare to stand out. 
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We invite you to be part of our story. Wear UJAYKRIS not just as clothing, but as a badge of elegance, a statement of confidence, and a tribute to the art of fine living.
          </p>
          <blockquote className="pl-6 border-l-4 border-gold italic text-xl text-foreground font-serif">
            "Your style is your signature. Make it bold, make it timeless, make it UJAYKRIS."
          </blockquote>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" 
            alt="Modern Style" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-24 space-y-8 bg-gold/5 rounded-[4rem] border border-gold/10">
        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Ready to join the journey?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Explore our latest collection and find the pieces that will define your next chapter.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/" className="px-8 py-4 rounded-full bg-gold text-gold-foreground font-black uppercase italic tracking-tighter hover:scale-105 transition-transform">
            Shop the Collection
          </a>
        </div>
      </section>
    </div>
  );
};
