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
    try:
        genai.configure(api_key=API_KEY)
        
        # التغيير الجوهري هنا: نستخدم الاسم الكامل والحديث للنموذج
        model = genai.GenerativeModel('models/gemini-1.5-pro')

        # 3. مدخلات المستخدم
        topic = st.text_input("عن ماذا يتحدث الفيديو؟", placeholder="مثلاً: نصائح للاستثمار في الذهب")
        
        if st.button("توليد النص السحري ✨"):
            if topic:
                with st.spinner("جاري الكتابة بذكاء..."):
                    try:
                        # طلب النص
                        prompt = f"اكتب نص فيديو تيك توك فيروسي وممتع عن: {topic}. اجعل البداية قوية جداً لجذب الانتباه."
                        response = model.generate_content(prompt)
                        
                        if response.text:
                            st.success("تم التوليد بنجاح!")
                            st.markdown(f"### 📝 النص المقترح:\n{response.text}")
                        else:
                            st.error("لم يتم استلام نص، حاول مرة أخرى.")
                    except Exception as e:
                        st.error(f"عذراً، المحرك يحتاج لتحديث الاسم: {e}")
            else:
                st.error("رجاءً اكتب فكرة أولاً!")
    except Exception as e:
        st.error(f"خطأ في إعداد المكتبة: {e}")
