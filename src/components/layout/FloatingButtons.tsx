import { Phone, MessageCircle, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

const buttons = [
  {
    id: "phone",
    icon: Phone,
    href: "tel:0123456789",
    label: "Gọi điện",
    color: "bg-success hover:bg-success/90",
  },
  {
    id: "zalo",
    icon: MessageCircle,
    href: "https://zalo.me/0123456789",
    label: "Zalo",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    id: "facebook",
    icon: Facebook,
    href: "https://facebook.com/vantrung",
    label: "Facebook",
    color: "bg-blue-600 hover:bg-blue-700",
  },
];

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {buttons.map((button, index) => (
        <a
          key={button.id}
          href={button.href}
          target={button.id !== "phone" ? "_blank" : undefined}
          rel={button.id !== "phone" ? "noopener noreferrer" : undefined}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl animate-fade-in",
            button.color
          )}
          style={{ animationDelay: `${index * 100}ms` }}
          aria-label={button.label}
          title={button.label}
        >
          <button.icon className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
}
