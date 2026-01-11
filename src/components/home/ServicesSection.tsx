import { Link } from "react-router-dom";
import { Clock, ShoppingCart, Wrench, Settings, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/ui/animated-section";
import { motion } from "framer-motion";
const services = [{
  id: "cho-thue",
  icon: Clock,
  title: "Cho thuê thiết bị",
  description: "Cho thuê các loại thiết bị xây dựng theo ngày, tuần, tháng với giá cạnh tranh nhất thị trường.",
  color: "bg-blue-500"
}, {
  id: "mua-ban",
  icon: ShoppingCart,
  title: "Mua bán thiết bị",
  description: "Mua bán thiết bị xây dựng mới và đã qua sử dụng, bảo hành uy tín, giá tốt.",
  color: "bg-primary"
}, {
  id: "sua-chua",
  icon: Wrench,
  title: "Sửa chữa",
  description: "Dịch vụ sửa chữa thiết bị xây dựng chuyên nghiệp, nhanh chóng, đảm bảo chất lượng.",
  color: "bg-success"
}, {
  id: "bao-tri",
  icon: Settings,
  title: "Bảo trì định kỳ",
  description: "Gói bảo trì định kỳ giúp thiết bị luôn hoạt động ổn định, kéo dài tuổi thọ.",
  color: "bg-purple-500"
}];
export function ServicesSection() {
  return <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-primary/10 text-primary font-medium rounded-full mb-4 px-[25px] py-[5px] text-2xl">
            Dịch vụ của chúng tôi
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 py-[10px]">
            GIẢI PHÁP TOÀN DIỆN
          </h2>
          <p className="text-muted-foreground">Cửa Hàng Văn Trung cung cấp đầy đủ các dịch vụ từ cho thuê, mua bán đến sửa chữa và bảo trì các thiết bị xây dựng.</p>
        </AnimatedSection>

        {/* Services Grid */}
        <AnimatedContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {services.map(service => <AnimatedItem key={service.id}>
              <motion.div whileHover={{
            y: -8
          }} transition={{
            duration: 0.3
          }}>
                <Link to={`/services#${service.id}`} className="group card-industrial p-6 flex flex-col h-full">
                  <div className={cn("w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110", service.color)}>
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title.toUpperCase()}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1 mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Tìm hiểu thêm
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            </AnimatedItem>)}
        </AnimatedContainer>
      </div>
    </section>;
}