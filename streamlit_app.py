import streamlit as st
import google.generativeai as genai

st.set_page_config(page_title="صانع المحتوى الذكي", layout="centered")
st.title("🚀 محرك النصوص الفيروسية")

# هنا نسحب المفتاح من إعدادات الموقع السرية وليس من الكود
try:
    API_KEY = st.secrets["GEMINI_API_KEY"]
except:
    st.error("لم يتم ضبط مفتاح الـ API في إعدادات الموقع.")
    st.stop()

genai.configure(api_key=API_KEY)

# البحث عن نموذج متاح
try:
    available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
    model = genai.GenerativeModel(available_models[0])

    topic = st.text_input("عن ماذا يتحدث الفيديو؟")
    if st.button("توليد النص السحري ✨"):
        if topic:
            with st.spinner("جاري الكتابة..."):
                response = model.generate_content(f"اكتب نص فيديو تيك توك فيروسي عن: {topic}")
                st.success("تم!")
                st.write(response.text)
except Exception as e:
    st.error(f"حدث خطأ: {e}")
