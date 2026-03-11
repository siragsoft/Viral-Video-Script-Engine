import streamlit as st
import google.generativeai as genai

# إعدادات الصفحة الاحترافية
st.set_page_config(
    page_title="Sovereign Script AI",
    page_icon="🎬",
    layout="centered"
)

# تصميم الواجهة باستخدام CSS
st.markdown("""
    <style>
    .main {
        background-color: #f5f7f9;
    }
    .stButton>button {
        width: 100%;
        border-radius: 20px;
        height: 3em;
        background-color: #FF4B4B;
        color: white;
        font-weight: bold;
    }
    .stTextInput>div>div>input {
        border-radius: 15px;
    }
    </style>
    """, unsafe_allow_html=True)

# العنوان
st.title("🎬 محرك النصوص الفيروسية الذكي")
st.subheader("بإشراف شفري - مساعدك الذكي")

# سحب المفتاح من Secrets (تأكد أنك وضعته في إعدادات Streamlit)
try:
    API_KEY = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=API_KEY)
except:
    st.error("⚠️ خطأ: لم يتم العثور على مفتاح API في Secrets.")
    st.stop()

# خيارات إضافية للمستخدم
col1, col2 = st.columns(2)
with col1:
    tone = st.selectbox("نبرة الفيديو", ["حماسي 🔥", "تعليمي 📚", "كوميدي 😂", "درامي 🎭"])
with col2:
    duration = st.selectbox("مدة الفيديو", ["15 ثانية", "30 ثانية", "60 ثانية"])

topic = st.text_input("عن ماذا يتحدث الفيديو؟", placeholder="مثلاً: كيف تصبح ثرياً من التداول..")

if st.button("توليد النص السحري ✨"):
    if topic:
        with st.spinner("شفري يحلل البيانات ويكتب لك أفضل نص..."):
            try:
                # البحث عن موديل متاح
                available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
                model = genai.GenerativeModel(available_models[0])
                
                # الطلب المطور
                prompt = f"""
                اكتب نص فيديو تيك توك فيروسي عن موضوع: {topic}.
                النبرة المطلوبة: {tone}.
                المدة التقريبية: {duration}.
                قسم النص إلى:
                1. Hook (خطف الانتباه في أول 3 ثواني).
                2. المحتوى (بشكل نقاط سريعة).
                3. CTA (طلب متابعة).
                """
                
                response = model.generate_content(prompt)
                
                st.success("جاهز للنشر! 🚀")
                st.markdown("---")
                st.write(response.text)
                
            except Exception as e:
                st.error(f"حدث خطأ تقني: {e}")
    else:
        st.warning("رجاءً اكتب فكرة الفيديو أولاً.")

# تذييل الصفحة
st.markdown("---")
st.caption("تم التطوير بواسطة siragsoft بدعم من شفري AI")
