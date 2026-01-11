import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  full_name: string;
  phone: string;
  email?: string;
  address?: string;
  message?: string;
  product_name?: string;
  action: string;
  source: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-lead-notification");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: LeadNotificationRequest = await req.json();
    console.log("Lead data received:", data);

    const actionLabels: Record<string, string> = {
      contact: "Liên hệ tư vấn",
      quote: "Yêu cầu báo giá",
      rent: "Yêu cầu thuê thiết bị",
      buy: "Yêu cầu mua hàng",
    };

    const actionLabel = actionLabels[data.action] || data.action;
    const currentTime = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { color: #1f2937; margin-top: 4px; }
          .highlight { background: #fff7ed; border-left: 4px solid #f97316; padding: 10px 15px; margin: 15px 0; }
          .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🔔 Thông báo khách hàng mới</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${actionLabel}</p>
          </div>
          <div class="content">
            <div class="highlight">
              <strong>⏰ Thời gian:</strong> ${currentTime}
            </div>
            
            <div class="field">
              <div class="label">👤 Họ và tên:</div>
              <div class="value">${data.full_name}</div>
            </div>
            
            <div class="field">
              <div class="label">📞 Số điện thoại:</div>
              <div class="value"><a href="tel:${data.phone}" style="color: #f97316;">${data.phone}</a></div>
            </div>
            
            ${data.email ? `
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${data.email}" style="color: #f97316;">${data.email}</a></div>
            </div>
            ` : ''}
            
            ${data.address ? `
            <div class="field">
              <div class="label">📍 Địa chỉ:</div>
              <div class="value">${data.address}</div>
            </div>
            ` : ''}
            
            ${data.product_name ? `
            <div class="field">
              <div class="label">🛠️ Sản phẩm quan tâm:</div>
              <div class="value" style="color: #f97316; font-weight: bold;">${data.product_name}</div>
            </div>
            ` : ''}
            
            ${data.message ? `
            <div class="field">
              <div class="label">💬 Lời nhắn:</div>
              <div class="value" style="background: white; padding: 10px; border-radius: 4px; border: 1px solid #e5e7eb;">${data.message}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">📌 Nguồn:</div>
              <div class="value">${data.source}</div>
            </div>
          </div>
          <div class="footer">
            <p>Email này được gửi tự động từ hệ thống Văn Trung</p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("Sending email to truongnguyen6560@gmail.com");

    const emailResponse = await resend.emails.send({
      from: "Văn Trung <onboarding@resend.dev>",
      to: ["truongnguyen6560@gmail.com"],
      subject: `[Văn Trung] ${actionLabel} - ${data.full_name}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-lead-notification function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
