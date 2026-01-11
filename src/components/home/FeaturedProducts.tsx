import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/ui/animated-section";
import { motion } from "framer-motion";

// Sample featured products - in real app, fetch from Supabase
const featuredProducts = [{
  id: "1",
  slug: "may-duc-be-tong-bosch",
  name: "Máy đục bê tông Bosch GSH 11E",
  buyPrice: 15000000,
  rentPriceDaily: 200000,
  image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
  category: "Máy đục bê tông"
}, {
  id: "2",
  slug: "may-toi-dien-500kg",
  name: "Máy tời điện 500kg PA500",
  buyPrice: 8500000,
  rentPriceDaily: 150000,
  image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
  category: "Máy tời"
}, {
  id: "3",
  slug: "may-phat-dien-honda-5kw",
  name: "Máy phát điện Honda 5KW",
  buyPrice: 25000000,
  rentPriceDaily: 350000,
  image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
  category: "Máy phát điện"
}, {
  id: "4",
  slug: "may-cat-sat-makita",
  name: "Máy cắt sắt Makita 355mm",
  buyPrice: 4500000,
  rentPriceDaily: 100000,
  image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
  category: "Máy cắt"
}];
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}
export function FeaturedProducts() {
  return <section className="section-padding bg-muted">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-primary/10 text-primary font-medium rounded-full mb-4 px-[25px] py-[5px] text-2xl">
              Sản phẩm nổi bật
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              THIẾT BỊ CỦA CHÚNG TÔI    
            </h2>
          </div>
          <Button variant="outline" asChild className="group">
            <Link to="/products">
              Xem tất cả
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </AnimatedSection>

        {/* Products Grid */}
        <AnimatedContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {featuredProducts.map(product => <AnimatedItem key={product.id}>
              <motion.div whileHover={{
            y: -8
          }} transition={{
            duration: 0.3
          }}>
                <Link to={`/products/${product.slug}`} className="group card-industrial block">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Prices */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Mua:</span>
                        </div>
                        <span className="font-semibold text-foreground">
                          {formatPrice(product.buyPrice)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>Thuê/ngày:</span>
                        </div>
                        <span className="font-semibold text-primary">
                          {formatPrice(product.rentPriceDaily)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatedItem>)}
        </AnimatedContainer>
      </div>
    </section>;
}