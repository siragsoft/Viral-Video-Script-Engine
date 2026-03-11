import streamlit as st
import google.generativeai as genai

# 1. إعداد واجهة الموقع
st.set_page_config(page_title="صانع المحتوى الذكي", layout="centered")
st.title("🚀 محرك النصوص الفيروسية")
st.write("أدخل فكرتك وسيقوم **شفري** بكتابة نص فيديو تيك توك احترافي لك.")

# 2. إعداد مفتاح API (ضع مفتاحك هنا)
# للحصول عليه: https://aistudio.google.com/app/apikey
API_KEY = "AIzaSyAH2I6wxGdj8TU-okMPxum0qP6Vgp6-Qd4" 

if API_KEY == "ضغ_مفتاحك_هنا":
    st.warning("رجاءً ضع مفتاح API الخاص بك في الكود لتشغيل التطبيق.")
else:
    genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')
    # 3. مدخلات المستخدم
    topic = st.text_input("عن ماذا يتحدث الفيديو؟", placeholder="مثلاً: نصائح للاستثمار في الذهب")
    
    if st.button("توليد النص السحري ✨"):
        if topic:
            with st.spinner("جاري الكتابة بذكاء..."):
                # طلب النص من الذكاء الاصطناعي
                prompt = f"اكتب نص فيديو تيك توك فيروسي وممتع عن: {topic}. اجعل البداية قوية جداً لجذب الانتباه."
                response = model.generate_content(prompt)
                
                # عرض النتيجة
                st.success("تم التوليد بنجاح!")
                st.markdown(f"### 📝 النص المقترح:\n{response.text}")
        else:
            st.error("رجاءً اكتب فكرة أولاً!")
