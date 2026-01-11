import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/ui/animated-section";
import { Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}
const Blog = () => {
  const {
    data: posts,
    isLoading
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("blogs").select("*").eq("published", true).order("published_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  return <Layout>
      <PageTransition>
        {/* Hero */}
        <section className="pt-24 pb-12 bg-industrial-dark">
          <div className="container-custom my-[30px]">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <span className="inline-block bg-primary/10 text-primary font-medium rounded-full mb-4 px-[25px] py-[5px] text-2xl">
                Tin tức
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-4 py-[10px]">
                TIN TỨC & <span className="text-primary">KIẾN THỨC</span>
              </h1>
              <p className="text-primary-foreground text-2xl">
                Cập nhật những thông tin mới nhất về thiết bị xây dựng, hướng dẫn
                sử dụng và bảo trì hiệu quả.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            {isLoading ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <div key={i} className="card-industrial">
                    <Skeleton className="aspect-[16/10] w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>)}
              </div> : posts && posts.length > 0 ? <AnimatedContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
                {posts.map(post => <AnimatedItem key={post.id}>
                    <Link to={`/blog/${post.slug}`} className="group card-industrial block h-full">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img src={post.featured_image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop"} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        {post.tags && post.tags.length > 0 && <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map(tag => <span key={tag} className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                                {tag}
                              </span>)}
                          </div>}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.published_at || post.created_at)}</span>
                          </div>
                          {post.author && <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>}
                        </div>
                        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-primary text-sm font-medium">
                          Đọc thêm
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </AnimatedItem>)}
              </AnimatedContainer> : <AnimatedSection className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Chưa có bài viết nào. Vui lòng quay lại sau.
                </p>
              </AnimatedSection>}
          </div>
        </section>
      </PageTransition>
    </Layout>;
};
export default Blog;