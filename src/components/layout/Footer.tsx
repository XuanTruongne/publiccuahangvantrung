import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Wrench, ChevronRight } from "lucide-react";
const quickLinks = [{
  name: "Trang chủ",
  path: "/"
}, {
  name: "Sản phẩm",
  path: "/products"
}, {
  name: "Dịch vụ",
  path: "/services"
}, {
  name: "Tin tức",
  path: "/blog"
}, {
  name: "Liên hệ",
  path: "/contact"
}];
const services = [{
  name: "Cho thuê thiết bị",
  path: "/services#cho-thue"
}, {
  name: "Mua bán thiết bị",
  path: "/services#mua-ban"
}, {
  name: "Sửa chữa",
  path: "/services#sua-chua"
}, {
  name: "Bảo trì định kỳ",
  path: "/services#bao-tri"
}];
export function Footer() {
  return <footer className="bg-industrial-dark text-industrial-light">
      {/* Main Footer */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <Wrench className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl leading-none text-primary font-bold">
                  VĂN TRUNG
                </span>
                <span className="text-xs text-primary">
                  Thiết bị xây dựng
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground text-justify">Chuyên cho thuê, mua bán, sửa chữa và bảo trì các loại thiết bị cho công trình thi công, xây dựng</p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/vantrung" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4 text-primary">
              LIÊN KẾT NHANH
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="flex items-center gap-2 text-sm transition-colors group text-primary-foreground">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg mb-4 text-primary">
              DỊCH VỤ
            </h4>
            <ul className="space-y-2">
              {services.map(service => <li key={service.path}>
                  <Link to={service.path} className="flex items-center gap-2 text-sm transition-colors group text-primary-foreground">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {service.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg mb-4 text-primary">
              LIÊN HỆ
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white">
                  57 Chu Mạnh Trinh, P. Tam Thắng, TP. Hồ Chí Minh (P. 8, TP. Vũng Tàu cũ)                   
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:0819516052" className="text-sm transition-colors text-white">
                  0819 516 052  
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:\u200Btrungnguyen0916151266@gmail.com" className="text-sm transition-colors text-white">
                  ​trungnguyen0916151266@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-white">
                  7:00 - 18:00 (T2 - T7)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-industrial-gray/30">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Văn Trung. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Chính sách bảo mật
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}