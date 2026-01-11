import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/ui/animated-section";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, ShoppingCart, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
const ITEMS_PER_PAGE = 12;
function formatPrice(price: number | null) {
  if (!price) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}
const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories
  const {
    data: categories = []
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data;
    }
  });

  // Fetch products
  const {
    data: products = [],
    isLoading
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("products").select("*, categories(name)").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "all" && product.category_id !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "all" && product.status !== selectedStatus) {
        return false;
      }

      // Price range filter
      if (priceRange !== "all") {
        const price = product.buy_price || 0;
        switch (priceRange) {
          case "under5":
            if (price >= 5000000) return false;
            break;
          case "5to10":
            if (price < 5000000 || price > 10000000) return false;
            break;
          case "10to20":
            if (price < 10000000 || price > 20000000) return false;
            break;
          case "above20":
            if (price < 20000000) return false;
            break;
        }
      }
      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setPriceRange("all");
    setCurrentPage(1);
  };
  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedStatus !== "all" || priceRange !== "all";
  return <Layout>
      <PageTransition>
        {/* Hero Section */}
        <section className="bg-industrial-dark pt-32 pb-12">
          <div className="container-custom my-[30px]">
            <AnimatedSection className="text-center">
              <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
                SẢN PHẨM
              </h1>
              <p className="max-w-2xl mx-auto text-2xl text-primary-foreground">
                Khám phá bộ sưu tập thiết bị xây dựng chất lượng cao với giá cả
                cạnh tranh. Cho thuê hoặc mua với bảo hành uy tín.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            {/* Search and Filter Bar */}
            <AnimatedSection delay={0.1} className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type="text" placeholder="Tìm kiếm sản phẩm..." value={searchQuery} onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }} className="pl-10" />
                </div>

                {/* Filter Toggle (Mobile) */}
                <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc
                  {hasActiveFilters && <span className="ml-2 w-2 h-2 bg-primary rounded-full" />}
                </Button>

                {/* Desktop Filters */}
                <div className="hidden md:flex gap-3">
                  <Select value={selectedCategory} onValueChange={value => {
                  setSelectedCategory(value);
                  setCurrentPage(1);
                }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>

                  <Select value={priceRange} onValueChange={value => {
                  setPriceRange(value);
                  setCurrentPage(1);
                }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Khoảng giá" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả giá</SelectItem>
                      <SelectItem value="under5">Dưới 5 triệu</SelectItem>
                      <SelectItem value="5to10">5 - 10 triệu</SelectItem>
                      <SelectItem value="10to20">10 - 20 triệu</SelectItem>
                      <SelectItem value="above20">Trên 20 triệu</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={value => {
                  setSelectedStatus(value);
                  setCurrentPage(1);
                }}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Tình trạng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="available">Còn hàng</SelectItem>
                      <SelectItem value="out_of_stock">Hết hàng</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && <Button variant="ghost" onClick={clearFilters}>
                      <X className="w-4 h-4 mr-1" />
                      Xóa lọc
                    </Button>}
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && <motion.div initial={{
              opacity: 0,
              height: 0
            }} animate={{
              opacity: 1,
              height: "auto"
            }} exit={{
              opacity: 0,
              height: 0
            }} className="md:hidden grid grid-cols-2 gap-3 p-4 bg-muted rounded-lg">
                  <Select value={selectedCategory} onValueChange={value => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>

                  <Select value={priceRange} onValueChange={value => {
                setPriceRange(value);
                setCurrentPage(1);
              }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Khoảng giá" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả giá</SelectItem>
                      <SelectItem value="under5">Dưới 5 triệu</SelectItem>
                      <SelectItem value="5to10">5 - 10 triệu</SelectItem>
                      <SelectItem value="10to20">10 - 20 triệu</SelectItem>
                      <SelectItem value="above20">Trên 20 triệu</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={value => {
                setSelectedStatus(value);
                setCurrentPage(1);
              }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tình trạng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="available">Còn hàng</SelectItem>
                      <SelectItem value="out_of_stock">Hết hàng</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && <Button variant="ghost" onClick={clearFilters} className="w-full">
                      <X className="w-4 h-4 mr-1" />
                      Xóa lọc
                    </Button>}
                </motion.div>}
            </AnimatedSection>

            {/* Results Count */}
            <AnimatedSection delay={0.15} className="mb-6 text-sm text-muted-foreground">
              Tìm thấy <span className="font-semibold text-foreground">{filteredProducts.length}</span> sản phẩm
            </AnimatedSection>

            {/* Products Grid */}
            {isLoading ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({
              length: 8
            }).map((_, i) => <div key={i} className="card-industrial">
                    <Skeleton className="aspect-[4/3]" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>)}
              </div> : paginatedProducts.length > 0 ? <AnimatedContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.05}>
                {paginatedProducts.map(product => <AnimatedItem key={product.id}>
                    <Link to={`/products/${product.slug}`} className="group card-industrial block h-full">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                        <img src={product.images?.[0] || "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop"} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                            {(product.categories as {
                        name: string;
                      } | null)?.name || "Khác"}
                          </span>
                          {product.status === "out_of_stock" && <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
                              Hết hàng
                            </span>}
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
                              {formatPrice(product.buy_price)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>Thuê/ngày:</span>
                            </div>
                            <span className="font-semibold text-primary">
                              {formatPrice(product.rent_price_daily)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedItem>)}
              </AnimatedContainer> : <AnimatedSection className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-muted-foreground mb-4">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Xóa bộ lọc
                </Button>
              </AnimatedSection>}

            {/* Pagination */}
            {totalPages > 1 && <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.3
          }} className="mt-10 flex items-center justify-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from({
              length: totalPages
            }, (_, i) => i + 1).filter(page => {
              if (totalPages <= 7) return true;
              if (page === 1 || page === totalPages) return true;
              if (Math.abs(page - currentPage) <= 1) return true;
              return false;
            }).map((page, index, arr) => {
              const prevPage = arr[index - 1];
              const showEllipsis = prevPage && page - prevPage > 1;
              return <div key={page} className="flex items-center gap-2">
                        {showEllipsis && <span className="px-2 text-muted-foreground">...</span>}
                        <Button variant={currentPage === page ? "default" : "outline"} size="icon" onClick={() => setCurrentPage(page)} className={cn(currentPage === page && "pointer-events-none")}>
                          {page}
                        </Button>
                      </div>;
            })}

                <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>}
          </div>
        </section>
      </PageTransition>
    </Layout>;
};
export default Products;