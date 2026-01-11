-- Enum cho loại action
CREATE TYPE public.lead_action AS ENUM ('buy', 'rent', 'contact', 'service');

-- Enum cho trạng thái sản phẩm
CREATE TYPE public.product_status AS ENUM ('available', 'out_of_stock', 'discontinued');

-- Bảng danh mục sản phẩm
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bảng sản phẩm
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    specifications JSONB,
    buy_price DECIMAL(12, 0),
    rent_price_daily DECIMAL(12, 0),
    rent_price_monthly DECIMAL(12, 0),
    stock_quantity INTEGER DEFAULT 0,
    status product_status DEFAULT 'available',
    featured BOOLEAN DEFAULT false,
    images TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bảng dịch vụ
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    full_description TEXT,
    icon TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bảng bài viết/tin tức
CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    author TEXT,
    tags TEXT[],
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bảng leads/liên hệ
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    address TEXT,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    action lead_action DEFAULT 'contact',
    source TEXT DEFAULT 'website',
    processed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bảng cài đặt
CREATE TABLE public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Policies cho public read (categories, products, services, posts)
CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Anyone can read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Anyone can read published posts" ON public.posts FOR SELECT USING (published = true);
CREATE POLICY "Anyone can read settings" ON public.settings FOR SELECT USING (true);

-- Policy cho leads: chỉ cho phép insert từ public
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Trigger update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON public.settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
('Máy đục bê tông', 'may-duc-be-tong', 'Các loại máy đục bê tông chất lượng cao', 'hammer'),
('Máy tời', 'may-toi', 'Máy tời điện các loại', 'arrow-up'),
('Máy phát điện', 'may-phat-dien', 'Máy phát điện công suất lớn', 'zap'),
('Máy cắt', 'may-cat', 'Máy cắt sắt, cắt bê tông', 'scissors'),
('Máy hàn', 'may-han', 'Máy hàn điện các loại', 'flame'),
('Thiết bị khác', 'thiet-bi-khac', 'Các thiết bị xây dựng khác', 'tool');

-- Insert default services
INSERT INTO public.services (name, slug, short_description, icon, display_order) VALUES
('Cho thuê thiết bị', 'cho-thue', 'Cho thuê các loại thiết bị xây dựng theo ngày, tuần, tháng với giá cạnh tranh', 'clock', 1),
('Mua bán thiết bị', 'mua-ban', 'Mua bán thiết bị xây dựng mới và đã qua sử dụng, bảo hành uy tín', 'shopping-cart', 2),
('Sửa chữa', 'sua-chua', 'Dịch vụ sửa chữa thiết bị xây dựng chuyên nghiệp, nhanh chóng', 'wrench', 3),
('Bảo trì', 'bao-tri', 'Gói bảo trì định kỳ giúp thiết bị luôn hoạt động ổn định', 'settings', 4);

-- Insert sample settings
INSERT INTO public.settings (key, value) VALUES
('store_info', '{"name": "Cửa hàng Văn Trung", "phone": "0123456789", "email": "vantrung@example.com", "address": "123 Đường ABC, Quận XYZ, TP.HCM", "zalo": "0123456789", "facebook": "https://facebook.com/vantrung", "working_hours": "7:00 - 18:00 (Thứ 2 - Thứ 7)"}'::jsonb);