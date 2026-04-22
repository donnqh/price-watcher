import { Rabbit, Shield, Bell, TrendingDown } from "lucide-react";

import styles from "../styles/page.module.css";
import Button from "../components/ui/button.jsx";
import AddProduct from "../components/addProduct.jsx";
import AuthButton from "@/components/authButton.jsx";
import ProductCard from "@/components/productCard.jsx";
import { createClient } from "../../utils/supabase/server";

import { getProducts } from "./auth/callback/actions";

export default async function Home() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];


  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.logoRow}>
            <img 
              src="/logo.png" 
              alt="my logo" 
              width={140}
              className={styles.logo}/>
          </div>
          {/* Auth button */}
          <AuthButton user={user}/>
        </div>
      </header>

      {/* hero section */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <div className={styles.heroBadge}> 
            made by ... 
          </div>

          <h2 className={styles.heroTitle}>
            Never miss a price drop
          </h2>

          <p className={styles.heroParagraph}>
            track prices from e-com sites
          </p>

          {/* render a product form */}
          <AddProduct user={user} />

          {/* features */}
          {products.length === 0 && (
            <div className={styles.featureGrid}>
              {FEATURES.map(({icon: Icon, title, description}) => (
                <div key={title} className={styles.featureCard}>
                  <Icon className={styles.icon} />
                  <h3 className={styles.featureTitle}>
                    {title}
                  </h3>
                  <p className={styles.featureDescription}>
                    {description}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
      
      {user && products.length > 0 &&
        <section className={styles.productContainer}>
          <div className={styles.productDiv}>
            <h3 className={styles.productTitle}>Your Tracked products</h3>

            <span className={styles.numberOfProducts}>
              {products.length} {products.length === 1 ? "product":"products"}
            </span>
          </div>

          <div className={styles.itemDiv}>
            {products.map((product) => (
              <ProductCard key = {product.id} product={product} />
            ))}
          </div>
        </section>
      }

      {user && products.length === 0 && (
        <section className={styles.emptySection}>
          <div className={styles.emptyBox}>
            <TrendingDown className={styles.emptyIcon}/>
            <h3 className={styles.emptyTitle}>
              No products yet
            </h3>
            <p className={styles.emptyText}>
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}

    </main>
  );
}
