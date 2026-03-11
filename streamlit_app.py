import streamlit as st
import google.generativeai as genai

# 1. إعداد واجهة الموقع
st.set_page_config(page_title="صانع المحتوى الذكي", layout="centered")
st.title("🚀 محرك النصوص الفيروسية")
st.write("أدخل فكرتك وسيقوم **شفري** بكتابة نص فيديو تيك توك احترافي لك.")

# 2. إعداد مفتاح API
API_KEY = "AIzaSyAH2I6wxGdj8TU-okMPxum0qP6Vgp6-Qd4"

if not API_KEY or API_KEY == "ضغ_مفتاحك_هنا":
    st.warning("رجاءً ضع مفتاح API الخاص بك في الكود لتشغيل التطبيق.")
else:
    genai.configure(api_key=API_KEY)
    # اخترنا gemini-1.5-flash لأنه الأسرع والأفضل للنصوص القصيرة
    model = genai.GenerativeModel('gemini-1.5-flash')

    # 3. مدخلات المستخدم (تأكد أنها تحت مستوى الـ else)
    topic = st.text_input("عن ماذا يتحدث الفيديو؟", placeholder="مثلاً: نصائح للاستثمار في الذهب")
    
    if st.button("توليد النص السحري ✨"):
        if topic:
            with st.spinner("جاري الكتابة بذكاء..."):
                try:
                    # طلب النص من الذكاء الاصطناعي
                    prompt = f"اكتب نص فيديو تيك توك فيروسي وممتع عن: {topic}. اجعل البداية قوية جداً لجذب الانتباه."
                    response = model.generate_content(prompt)
                    
                    # عرض النتيجة
                    st.success("تم التوليد بنجاح!")
                    st.markdown(f"### 📝 النص المقترح:\n{response.text}")
                except Exception as e:
                    st.error(f"حدث خطأ أثناء الاتصال بـ Gemini: {e}")
        else:
            st.error("رجاءً اكتب فكرة أولاً!")
