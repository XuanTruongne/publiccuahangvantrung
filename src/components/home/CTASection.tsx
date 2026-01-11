import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { motion } from "framer-motion";
export function CTASection() {
  return <section className="relative py-16 lg:py-24 bg-industrial-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0" style={{
      background: "linear-gradient(90deg, hsl(220 15% 18% / 0.95) 0%, hsl(32 95% 50% / 0.2) 100%)"
    }} />

      <div className="container-custom relative z-10">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Content */}
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
                BẠN CẦN TƯ VẤN?
                <span className="block text-primary my-[20px]">LIÊN HỆ NGAY HÔM NAY</span>
              </h2>
              <p className="text-lg text-primary-foreground">Đội ngũ tư vấn của Văn Trung sẵn sàng hỗ trợ bạn 24/7. Gọi ngay hoặc để lại thông tin, chúng tôi sẽ liên hệ lại trong vòng 7 phút.</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.a href="tel:0123456789" className="flex items-center gap-3 px-6 py-4 bg-primary rounded-lg text-primary-foreground hover:opacity-90 transition-opacity" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.98
            }}>
                <Phone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-sm opacity-80">Hotline</div>
                  <div className="font-display text-xl">0819 516052 </div>
                </div>
              </motion.a>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.98
            }}>
                <Button size="lg" variant="outline" asChild className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/contact" className="group">
                    Gửi yêu cầu
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>;
}