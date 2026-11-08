إعداد البريد التلقائي:
- تحتاج Firebase CLI وNode.js 20 وخطة Firebase تدعم Cloud Functions.
- أنشئ حساب Resend وتحقق من نطاق مرسل تملكه. استبدل orders@YOUR-VERIFIED-DOMAIN.com بعنوان مرسل موثّق.
- من مجلد functions نفّذ: npm install
- من جذر المشروع نفّذ: firebase functions:secrets:set RESEND_API_KEY
  ثم أدخل مفتاح Resend عند الطلب.
- انشر الوظيفة: firebase deploy --only functions
- أرسل طلباً تجريبياً وتأكد من وصول الرسالة.
تنبيه: لا تستخدم Gmail الشخصي كعنوان from غير موثّق. البريد المستلم مضبوط على roooo77775@gmail.com.
