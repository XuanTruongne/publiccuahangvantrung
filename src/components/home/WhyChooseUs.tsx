import { Shield, Clock, Wrench, Truck, Award, Headphones } from "lucide-react";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/ui/animated-section";
import { motion } from "framer-motion";
const reasons = [{
  icon: Shield,
  title: "Chất lượng đảm bảo",
  description: "Tất cả thiết bị được kiểm tra kỹ lưỡng trước khi giao đến khách hàng"
}, {
  icon: Clock,
  title: "Giao hàng nhanh chóng",
  description: "Giao hàng trong ngày tại TP.HCM và các tỉnh lân cận"
}, {
  icon: Wrench,
  title: "Hỗ trợ kỹ thuật 24/7",
  description: "Đội ngũ kỹ thuật viên sẵn sàng hỗ trợ bất cứ lúc nào"
}, {
  icon: Truck,
  title: "Vận chuyển miễn phí",
  description: "Miễn phí vận chuyển cho đơn hàng từ 5 triệu đồng"
}, {
  icon: Award,
  title: "Bảo hành chính hãng",
  description: "Bảo hành theo tiêu chuẩn của nhà sản xuất"
}, {
  icon: Headphones,
  title: "Tư vấn chuyên nghiệp",
  description: "Tư vấn miễn phí, giúp bạn chọn đúng thiết bị phù hợp"
}];
export function WhyChooseUs() {
  return <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-primary/10 text-primary font-medium rounded-full mb-4 px-[25px] py-[5px] text-2xl">
            Tại sao chọn chúng tôi
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            UY TÍN LÀ VÀNG
          </h2>
          <p className="text-muted-foreground text-xl">
            Với hơn 10 năm kinh nghiệm, Văn Trung tự hào là đối tác tin cậy của
            hàng trăm công trình xây dựng.
          </p>
        </AnimatedSection>

        {/* Reasons Grid */}
        <AnimatedContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {reasons.map(reason => <AnimatedItem key={reason.title}>
              <motion.div whileHover={{
            y: -5,
            scale: 1.02
          }} transition={{
            duration: 0.3
          }} className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <reason.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </motion.div>
            </AnimatedItem>)}
        </AnimatedContainer>
      </div>
    </section>;
}