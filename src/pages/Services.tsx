import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Clock, ShoppingCart, Wrench, Settings, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
const services = [{
  id: "cho-thue",
  icon: Clock,
  title: "Cho thuê thiết bị",
  shortDesc: "Cho thuê các loại thiết bị xây dựng theo ngày, tuần, tháng với giá cạnh tranh nhất.",
  fullDesc: "Dịch vụ cho thuê thiết bị xây dựng linh hoạt theo nhu cầu của khách hàng. Chúng tôi cung cấp đầy đủ các loại máy móc từ máy đục bê tông, máy tời, máy phát điện đến các thiết bị chuyên dụng khác.",
  features: ["Thuê theo ngày, tuần hoặc tháng", "Giá ưu đãi cho hợp đồng dài hạn", "Giao nhận tận nơi miễn phí", "Hỗ trợ kỹ thuật 24/7", "Bảo hiểm thiết bị đầy đủ", "Thay thế ngay khi có sự cố"],
  color: "bg-blue-500"
}, {
  id: "mua-ban",
  icon: ShoppingCart,
  title: "Mua bán thiết bị",
  shortDesc: "Mua bán thiết bị xây dựng mới và đã qua sử dụng, bảo hành uy tín.",
  fullDesc: "Cung cấp các loại thiết bị xây dựng chính hãng với giá cả cạnh tranh. Đội ngũ tư vấn chuyên nghiệp giúp bạn lựa chọn sản phẩm phù hợp nhất với nhu cầu và ngân sách.",
  features: ["Thiết bị mới chính hãng", "Thiết bị đã qua sử dụng được kiểm định", "Bảo hành từ 6-24 tháng", "Thanh toán linh hoạt", "Hỗ trợ trả góp 0%", "Thu cũ đổi mới"],
  color: "bg-primary"
}, {
  id: "sua-chua",
  icon: Wrench,
  title: "Sửa chữa thiết bị",
  shortDesc: "Dịch vụ sửa chữa thiết bị xây dựng chuyên nghiệp, nhanh chóng.",
  fullDesc: "Đội ngũ kỹ thuật viên lành nghề với nhiều năm kinh nghiệm, sử dụng linh kiện chính hãng để đảm bảo thiết bị hoạt động ổn định sau khi sửa chữa.",
  features: ["Báo giá miễn phí", "Sửa chữa tại chỗ hoặc tại xưởng", "Linh kiện chính hãng", "Bảo hành sau sửa chữa", "Thời gian xử lý nhanh", "Hỗ trợ khẩn cấp 24/7"],
  color: "bg-success"
}, {
  id: "bao-tri",
  icon: Settings,
  title: "Bảo trì định kỳ",
  shortDesc: "Gói bảo trì định kỳ giúp thiết bị luôn hoạt động ổn định, kéo dài tuổi thọ.",
  fullDesc: "Chương trình bảo trì định kỳ được thiết kế riêng cho từng loại thiết bị, giúp phát hiện sớm các vấn đề tiềm ẩn và duy trì hiệu suất hoạt động tối ưu.",
  features: ["Kiểm tra định kỳ theo lịch", "Thay thế linh kiện hao mòn", "Vệ sinh và bôi trơn", "Báo cáo tình trạng thiết bị", "Ưu tiên hỗ trợ kỹ thuật", "Giảm giá sửa chữa lớn"],
  color: "bg-purple-500"
}];
const Services = () => {
  return <Layout>
      <PageTransition>
        {/* Hero */}
        <section className="pt-24 pb-12 bg-industrial-dark">
          <div className="container-custom my-[30px]">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <span className="inline-block bg-primary/10 text-primary font-medium rounded-full mb-4 px-[25px] text-2xl py-[5px]">
                Dịch vụ
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-4 my-0 py-[10px]">
                DỊCH VỤ <span className="text-primary">TOÀN DIỆN</span>
              </h1>
              <p className="text-primary-foreground text-2xl">
                 Cửa Hàng  Văn Trung cung cấp đầy đủ các dịch vụ từ cho thuê, mua bán đến sửa chữa và bảo trì thiết bị xây dựng.                                       
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding bg-background">
          <div className="container-custom space-y-16">
            {services.map((service, index) => <motion.div key={service.id} id={service.id} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-100px"
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <motion.div initial={{
                scale: 0
              }} whileInView={{
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.4,
                delay: 0.2
              }} className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                    {service.title.toUpperCase()}
                  </h2>
                  <p className="text-muted-foreground mb-6 text-justify">{service.fullDesc}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => <motion.li key={feature} initial={{
                  opacity: 0,
                  x: -20
                }} whileInView={{
                  opacity: 1,
                  x: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.3,
                  delay: 0.3 + featureIndex * 0.05
                }} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </motion.li>)}
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild>
                      <Link to="/contact">
                        Yêu cầu dịch vụ
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="tel:0819516052">
                        <Phone className="w-4 h-4 mr-2" />
                        0819 516 052      
                      </a>
                    </Button>
                  </div>
                </div>
                <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} className={`bg-muted rounded-lg p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-primary/50" />
                  </div>
                </motion.div>
              </motion.div>)}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 overflow-hidden bg-[#f98806]/[0.77]">
          <div className="container-custom">
            <AnimatedSection className="text-center">
              <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">
                BẠN CẦN TƯ VẤN THÊM?
              </h2>
              <p className="mb-8 max-w-2xl mx-auto text-black text-xl">Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá tốt nhất cho dịch vụ bạn cần</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/contact">Liên hệ ngay</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <a href="tel:0819516052" className="text-black">
                    <Phone className="w-4 h-4 mr-2" />
                    0819 516 052  
                  </a>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </PageTransition>
    </Layout>;
};
export default Services;