import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Star, ShoppingBag } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { products, categories, type Product } from "@/data/products";

export default function Shop() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<"pop" | "low" | "high">("pop");

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      (cat === "all" || p.category === cat) &&
      (p.title.toLowerCase().includes(query.toLowerCase()) || p.short.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "pop") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [query, cat, sort]);

  return (
    <>
      <PageHeader
        eyebrow="Boutique"
        title={<>Les ressources <span className="text-gradient-gold">du coach</span></>}
        subtitle="Ebooks, programmes PDF, livres et guides nutrition signés Cheyson Eder."
      />

      <section className="py-10">
        <div className="container-luxe">
          {/* Toolbar */}
          <div className="glass-strong rounded-2xl p-4 mb-8 border border-border/60 flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un produit…"
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <select
              value={sort} onChange={(e) => setSort(e.target.value as any)}
              className="px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-gold"
            >
              <option value="pop">Plus populaires</option>
              <option value="low">Prix croissant</option>
              <option value="high">Prix décroissant</option>
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c.id} onClick={() => setCat(c.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
                  cat === c.id
                    ? "bg-gradient-gold text-primary-foreground shadow-gold"
                    : "glass border border-border hover:border-gold"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">Aucun produit ne correspond à ta recherche.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} p={p} delay={i * 60} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProductCard({ p, delay }: { p: Product; delay: number }) {
  return (
    <Link
      to={`/shop/${p.id}`}
      className="group relative rounded-2xl glass-strong border border-border/60 overflow-hidden hover-lift animate-fade-up flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`relative h-56 bg-gradient-to-br ${p.cover} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_60%)]" />
        <div className="relative z-10 p-6 text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70 mb-2">
            {categories.find((c) => c.id === p.category)?.label}
          </div>
          <div className="font-display text-2xl text-primary-foreground leading-tight px-2 line-clamp-3">
            {p.title}
          </div>
        </div>
        {p.oldPrice && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest rounded-full">
            -{Math.round((1 - p.price / p.oldPrice) * 100)}%
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-base leading-tight">{p.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.short}</p>

        <div className="flex items-center gap-1 mt-3 text-xs">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-gold font-bold">{p.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({p.reviews})</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-gradient-gold">{p.price}€</span>
            {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{p.oldPrice}€</span>}
          </div>
          <span className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground transition-transform group-hover:scale-110">
            <ShoppingBag className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
