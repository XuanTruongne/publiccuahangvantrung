import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/ui/animated-section";
import { motion } from "framer-motion";
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}
export function RecentNews() {
  const {
    data: recentNews,
    isLoading
  } = useQuery({
    queryKey: ["recentBlogs"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("blogs").select("id, slug, title, excerpt, featured_image, published_at, created_at").eq("published", true).order("published_at", {
        ascending: false
      }).limit(3);
      if (error) throw error;
      return data;
    }
  });
  return <section className="section-padding bg-muted">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-primary/10 text-primary font-medium rounded-full mb-4 px-[25px] py-[5px] text-2xl">
              Tin tức mới nhất
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              KIẾN THỨC HỮU ÍCH
            </h2>
          </div>
          <Button variant="outline" asChild className="group">
            <Link to="/blog">
              Xem tất cả
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </AnimatedSection>

        {/* News Grid */}
        {isLoading ? <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="card-industrial">
                <Skeleton className="aspect-[3/2] w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>)}
          </div> : recentNews && recentNews.length > 0 ? <AnimatedContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {recentNews.map(post => <AnimatedItem key={post.id}>
                <motion.div whileHover={{
            y: -8
          }} transition={{
            duration: 0.3
          }}>
                  <Link to={`/blog/${post.slug}`} className="group card-industrial block">
                    {/* Image */}
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img src={post.featured_image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.published_at || post.created_at)}</span>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </AnimatedItem>)}
          </AnimatedContainer> : <div className="text-center py-8">
            <p className="text-muted-foreground">Chưa có bài viết nào.</p>
          </div>}
      </div>
    </section>;
}