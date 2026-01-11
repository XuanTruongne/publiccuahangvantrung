import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/ui/animated-section";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, ShoppingCart, Clock, Phone, MessageCircle, Check, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
function formatPrice(price: number | null) {
  if (!price) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}
type LeadAction = "buy" | "rent" | "contact";
const ProductDetail = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const {
    toast
  } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<LeadAction>("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: ""
  });

  // Fetch product
  const {
    data: product,
    isLoading
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("products").select("*, categories(name)").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  // Fetch related products
  const {
    data: relatedProducts = []
  } = useQuery({
    queryKey: ["related-products", product?.category_id],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("products").select("*, categories(name)").eq("category_id", product!.category_id!).neq("id", product!.id).limit(4);
      if (error) throw error;
      return data;
    },
    enabled: !!product?.category_id
  });
  const images = product?.images?.length ? product.images : ["https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop"];
  const openModal = (action: LeadAction) => {
    setModalAction(action);
    setIsModalOpen(true);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from("leads").insert({
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email || null,
        message: formData.message || null,
        product_id: product?.id,
        action: modalAction,
        source: "product_detail"
      });
      if (error) throw error;

      // Gửi email thông báo
      const actionText = modalAction === "buy" ? "Đặt mua" : modalAction === "rent" ? "Thuê" : "Liên hệ";
      try {
        await supabase.functions.invoke("send-lead-notification", {
          body: {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email || "",
            message: formData.message || "",
            source: `Trang sản phẩm - ${actionText}: ${product?.name}`
          }
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }
      toast({
        title: "Gửi thành công!",
        description: "Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất."
      });
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        message: ""
      });
      setIsModalOpen(false);
    } catch {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const specifications = product?.specifications as Record<string, string> | null;
  if (isLoading) {
    return <Layout>
        <section className="pt-32 pb-16 bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10">
              <Skeleton className="aspect-[4/3] rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-48" />
              </div>
            </div>
          </div>
        </section>
      </Layout>;
  }
  if (!product) {
    return <Layout>
        <section className="pt-32 pb-16 bg-background">
          <div className="container-custom text-center py-20">
            <h1 className="font-display text-3xl text-foreground mb-4">
              Không tìm thấy sản phẩm
            </h1>
            <p className="text-muted-foreground mb-6">
              Sản phẩm bạn đang tìm không tồn tại hoặc đã bị xóa.
            </p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách
              </Link>
            </Button>
          </div>
        </section>
      </Layout>;
  }
  return <Layout>
      <PageTransition>
        {/* Breadcrumb */}
        <section className="bg-industrial-dark pt-28 pb-4">
          <div className="container-custom">
            <AnimatedSection>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">
                  Trang chủ
                </Link>
                <span>/</span>
                <Link to="/products" className="hover:text-primary transition-colors">
                  Sản phẩm
                </Link>
                <span>/</span>
                <span className="text-primary-foreground">{product.name}</span>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Product Content */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Image Gallery */}
              <AnimatedSection direction="left" className="space-y-4">
                {/* Main Image */}
                <motion.div initial={{
                opacity: 0,
                scale: 0.95
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 0.5
              }} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
                  <img src={images[selectedImageIndex]} alt={product.name} className="w-full h-full object-cover" />
                  {images.length > 1 && <>
                      <button onClick={() => setSelectedImageIndex(i => i === 0 ? images.length - 1 : i - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={() => setSelectedImageIndex(i => i === images.length - 1 ? 0 : i + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>}
                  {product.status === "out_of_stock" && <div className="absolute top-4 left-4 px-3 py-1 bg-destructive text-destructive-foreground text-sm font-medium rounded">
                      Hết hàng
                    </div>}
                </motion.div>

                {/* Thumbnails */}
                {images.length > 1 && <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, index) => <motion.button key={index} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.3,
                  delay: index * 0.05
                }} onClick={() => setSelectedImageIndex(index)} className={cn("flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors", selectedImageIndex === index ? "border-primary" : "border-transparent hover:border-primary/50")}>
                        <img src={img} alt={`${product.name} - ${index + 1}`} className="w-full h-full object-cover" />
                      </motion.button>)}
                  </div>}
              </AnimatedSection>

              {/* Product Info */}
              <AnimatedSection direction="right" delay={0.1} className="space-y-6">
                {/* Category */}
                <motion.span initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 0.3
              }} className="inline-block bg-primary/10 text-primary font-medium rounded-full px-[25px] py-[5px] text-2xl">
                  {(product.categories as {
                  name: string;
                } | null)?.name || "Thiết bị"}
                </motion.span>

                {/* Title */}
                <motion.h1 initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.4,
                delay: 0.1
              }} className="font-display text-3xl md:text-4xl text-foreground">
                  {product.name}
                </motion.h1>

                {/* Description */}
                {product.description && <motion.p initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                duration: 0.4,
                delay: 0.15
              }} className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </motion.p>}

                {/* Prices */}
                <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.4,
                delay: 0.2
              }} className="bg-muted rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="font-bold">Giá mua:</span>
                    </div>
                    <span className="font-display text-2xl text-foreground">
                      {formatPrice(product.buy_price)}
                    </span>
                  </div>
                  <div className="border-t border-border" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold">Thuê theo ngày:</span>
                    </div>
                    <span className="font-display text-2xl text-primary">
                      {formatPrice(product.rent_price_daily)}
                    </span>
                  </div>
                  {product.rent_price_monthly && <>
                      <div className="border-t border-border" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-5 h-5" />
                          <span className="font-bold">Thuê theo tháng:</span>
                        </div>
                        <span className="font-display text-xl text-primary">
                          {formatPrice(product.rent_price_monthly)}
                        </span>
                      </div>
                    </>}
                </motion.div>

                {/* Action Buttons */}
                <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.4,
                delay: 0.25
              }} className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="flex-1" onClick={() => openModal("buy")}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Đặt mua
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => openModal("rent")}>
                    <Clock className="w-4 h-4 mr-2" />
                    Thuê ngay
                  </Button>
                </motion.div>

                {/* Quick Contact */}
                <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                duration: 0.4,
                delay: 0.3
              }} className="flex items-center gap-4 pt-4 border-t border-border">
                  <a className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" href="tel:0819516052">
                    <Phone className="w-4 h-4" />
                    0819 516 052  
                  </a>
                  <a href="https://zalo.me/0123456789" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Zalo
                  </a>
                </motion.div>
              </AnimatedSection>
            </div>

            {/* Specifications */}
            {specifications && Object.keys(specifications).length > 0 && <AnimatedSection delay={0.3} className="mt-12">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  THÔNG SỐ KỸ THUẬT
                </h2>
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  {Object.entries(specifications).map(([key, value], index) => <motion.div key={key} initial={{
                opacity: 0,
                x: -10
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.3,
                delay: index * 0.05
              }} className={cn("grid grid-cols-2 gap-4 p-4", index % 2 === 0 ? "bg-card" : "bg-muted")}>
                      <span className="font-medium text-foreground text-justify">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </motion.div>)}
                </div>
              </AnimatedSection>}

            {/* Related Products */}
            {relatedProducts.length > 0 && <div className="mt-16">
                <AnimatedSection>
                  <h2 className="font-display text-2xl text-foreground mb-6">
                    SẢN PHẨM LIÊN QUAN
                  </h2>
                </AnimatedSection>
                <AnimatedContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
                  {relatedProducts.map(relProduct => <AnimatedItem key={relProduct.id}>
                      <Link to={`/products/${relProduct.slug}`} className="group card-industrial block">
                        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                          <img src={relProduct.images?.[0] || "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop"} alt={relProduct.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {relProduct.name}
                          </h3>
                          <p className="text-sm text-primary mt-2">
                            {formatPrice(relProduct.rent_price_daily)}/ngày
                          </p>
                        </div>
                      </Link>
                    </AnimatedItem>)}
                </AnimatedContainer>
              </div>}
          </div>
        </section>

        {/* Contact Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {modalAction === "buy" ? "ĐẶT MUA SẢN PHẨM" : modalAction === "rent" ? "THUÊ SẢN PHẨM" : "LIÊN HỆ TƯ VẤN"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Info */}
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <img src={images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-medium text-foreground line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-sm text-primary">
                    {modalAction === "buy" ? formatPrice(product.buy_price) : `${formatPrice(product.rent_price_daily)}/ngày`}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="fullName">
                  Họ và tên <span className="text-destructive">*</span>
                </Label>
                <Input id="fullName" value={formData.fullName} onChange={e => setFormData({
                ...formData,
                fullName: e.target.value
              })} required />
              </div>

              <div>
                <Label htmlFor="phone">
                  Số điện thoại <span className="text-destructive">*</span>
                </Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} required />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} />
              </div>

              <div>
                <Label htmlFor="message">Ghi chú</Label>
                <Textarea id="message" rows={3} placeholder="Nhập yêu cầu của bạn..." value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi..." : <>
                    <Check className="w-4 h-4 mr-2" />
                    Gửi yêu cầu
                  </>}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </PageTransition>
    </Layout>;
};
export default ProductDetail;