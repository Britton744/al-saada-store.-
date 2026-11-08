const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

exports.emailNewOrder = onDocumentCreated(
  { document: "orders/{orderId}", secrets: [RESEND_API_KEY], region: "us-central1" },
  async (event) => {
    const order = event.data.data();
    const lines = (order.items || []).map(i =>
      `${i.name} × ${i.quantity} — ${i.price} ر.س${i.image ? ` | صورة: ${i.image}` : ""}`
    ).join("\n");
    const body = [
      `طلب جديد رقم: ${event.params.orderId}`,
      `الاسم: ${order.name}`,
      `الجوال: ${order.phone}`,
      `المدينة: ${order.city}`,
      `الحي: ${order.district}`,
      `العنوان الوطني: ${order.nationalAddress}`,
      `المنتجات:\n${lines}`,
      `الإجمالي: ${order.total} ${order.currency || "ر.س"}`,
      `ملاحظات: ${order.notes || "لا يوجد"}`
    ].join("\n\n");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY.value()}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "BRITTON Orders <orders@YOUR-VERIFIED-DOMAIN.com>",
        to: ["roooo77775@gmail.com"],
        subject: `طلب BRITTON جديد — ${event.params.orderId}`,
        text: body
      })
    });
    if (!response.ok) throw new Error(`Resend failed: ${response.status} ${await response.text()}`);
  }
);
