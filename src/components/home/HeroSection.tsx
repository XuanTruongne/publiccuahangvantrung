import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0
  }
};
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1
  }
};
export function HeroSection() {
  return <section className="relative min-h-[90vh] flex items-center bg-industrial-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0" style={{
      background: "linear-gradient(135deg, hsl(220 15% 18% / 0.98) 0%, hsl(220 15% 25% / 0.95) 50%, hsl(32 95% 50% / 0.1) 100%)"
    }} />

      {/* Industrial Stripe Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 industrial-stripe" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center my-[120px]">
          {/* Content */}
          <motion.div className="space-y-8 text-center lg:text-left" variants={containerVariants} initial="hidden" animate="visible">
            <div className="space-y-4">
              <motion.div variants={itemVariants} transition={{
              duration: 0.6
            }} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium py-[10px] px-[25px]">
                <Wrench className="w-4 h-4" />
                UY TÍN HƠN 10+ NĂM KINH NGHIỆM      
              </motion.div>
              <motion.h1 variants={itemVariants} transition={{
              duration: 0.6
            }} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground leading-tight py-[10px]">
                VĂN TRUNG
                <span className="block text-primary py-[20px] text-7xl">THIẾT BỊ XÂY DỰNG</span>
              </motion.h1>
              <motion.p variants={itemVariants} transition={{
              duration: 0.6
            }} className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">Chuyên cho thuê, mua bán, sửa chữa và bảo trì các thiết bị máy móc xây dựng: máy đục bê tông, máy tời, máy phát điện,...và các thiết bị xây dựng khác trong coông trình</motion.p>
            </div>

            {/* CTAs */}
            <motion.div variants={itemVariants} transition={{
            duration: 0.6
          }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="group">
                <Link to="/products">
                  Xem sản phẩm
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/contact">Liên hệ ngay</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} transition={{
            duration: 0.6
          }} className="grid grid-cols-3 gap-6 pt-8 border-t border-industrial-gray/30">
              <div className="text-center lg:text-left">
                <div className="font-display text-3xl text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Năm kinh nghiệm</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-3xl text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Khách hàng</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-3xl text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Thiết bị</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div className="hidden lg:grid grid-cols-2 gap-4" variants={containerVariants} initial="hidden" animate="visible">
            <div className="space-y-4">
              <motion.div variants={cardVariants} transition={{
              duration: 0.5
            }} whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-industrial-gray/20 backdrop-blur border border-industrial-gray/30 rounded-lg p-6 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg text-primary-foreground mb-2">BẢO HÀNH UY TÍN</h3>
                <p className="text-sm text-muted-foreground">Cam kết bảo hành chính hãng cho tất cả sản phẩm</p>
              </motion.div>
              <motion.div variants={cardVariants} transition={{
              duration: 0.5
            }} whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-industrial-gray/20 backdrop-blur border border-industrial-gray/30 rounded-lg p-6 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg text-primary-foreground mb-2">SỬA CHỮA NHANH</h3>
                <p className="text-sm text-muted-foreground">Đội ngũ kỹ thuật viên lành nghề, sửa chữa nhanh chóng</p>
              </motion.div>
            </div>
            <div className="space-y-4 mt-8">
              <motion.div variants={cardVariants} transition={{
              duration: 0.5
            }} whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-industrial-gray/20 backdrop-blur border border-industrial-gray/30 rounded-lg p-6 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg text-primary-foreground mb-2">CHO THUÊ LINH HOẠT</h3>
                <p className="text-sm text-muted-foreground">Thuê theo ngày, tuần hoặc tháng với giá ưu đãi</p>
              </motion.div>
              <motion.div variants={cardVariants} transition={{
              duration: 0.5
            }} whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-primary rounded-lg p-6">
                <div className="font-display text-2xl text-primary-foreground mb-2">GỌI NGAY</div>
                <a className="text-xl font-bold text-primary-foreground hover:underline" href="tel:0819516052">0819 516052 </a>
                <p className="text-sm text-primary-foreground/80 mt-2">Tư vấn miễn phí 24/7</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}