import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Check, ShoppingBag, Shield, Download, Clock } from "lucide-react";
import { getProduct, products, categories } from "@/data/products";
import { toast } from "sonner";
import NotFound from "./NotFound";

export default function ShopProduct() {
  const { id } = useParams();
  const p = getProduct(id || "");
  if (!p) return <NotFound />;

  const cat = categories.find((c) => c.id === p.category);
  const similar = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);

  return (
    <section className="pt-32 pb-20">
      <div className="container-luxe">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-8">
          <ArrowLeft className="h-4 w-4" /> Retour à la boutique
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className={`relative rounded-3xl bg-gradient-to-br ${p.cover} h-[560px] flex items-center justify-center overflow-hidden shadow-luxe`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="relative z-10 text-center p-8">
              <div className="text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70 mb-4">{cat?.label}</div>
              <div className="font-display text-5xl text-primary-foreground leading-tight">{p.title}</div>
              <div className="mt-6 inline-block px-4 py-1.5 rounded-full bg-onyx/40 text-primary-foreground text-[10px] uppercase tracking-widest">
                {p.format} · {p.pages} pages
              </div>
            </div>
          </div>

          <div className="space-y-7">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold">{cat?.label}</div>
              <h1 className="font-display text-4xl md:text-5xl mt-3 leading-tight">{p.title}</h1>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(p.rating) ? "fill-gold text-gold" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <span className="text-sm text-gold font-bold">{p.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({p.reviews} avis)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl text-gradient-gold">{p.price}€</span>
              {p.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{p.oldPrice}€</span>
                  <span className="px-2 py-1 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest rounded-full">
                    -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{p.description}</p>

            <ul className="space-y-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" /> {h}
                </li>
              ))}
            </ul>

            <button
              onClick={() => toast.success("Ajouté au panier (démo)")}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-bold uppercase tracking-widest shadow-gold hover:scale-[1.02] transition-transform"
            >
              <ShoppingBag className="h-4 w-4" /> Ajouter au panier
            </button>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/40 text-xs text-muted-foreground">
              <div className="flex flex-col items-center gap-1 text-center">
                <Download className="h-4 w-4 text-gold" /> Accès immédiat
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Shield className="h-4 w-4 text-gold" /> Paiement sécurisé
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Clock className="h-4 w-4 text-gold" /> Mises à jour à vie
              </div>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-3xl mb-8">Pourrait aussi t'intéresser</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {similar.map((s) => (
                <Link key={s.id} to={`/shop/${s.id}`} className="glass-strong rounded-2xl overflow-hidden hover-lift border border-border/60">
                  <div className={`h-40 bg-gradient-to-br ${s.cover} flex items-center justify-center p-4`}>
                    <div className="font-display text-lg text-primary-foreground text-center">{s.title}</div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="text-sm font-bold">{s.title}</div>
                    <div className="font-display text-xl text-gradient-gold">{s.price}€</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
