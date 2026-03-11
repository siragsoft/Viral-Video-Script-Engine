import streamlit as st
import google.generativeai as genai
from gtts import gTTS
import io

# 1. إعدادات الصفحة والتصميم
st.set_page_config(page_title="Sovereign Voice AI", page_icon="🎙️", layout="centered")

st.markdown("""
    <style>
    .stButton>button { width: 100%; border-radius: 20px; background-color: #FF4B4B; color: white; height: 3em; font-weight: bold;}
    .audio-box { background-color: #f0f2f6; padding: 20px; border-radius: 15px; border: 1px solid #d1d5db; margin-top: 20px; }
    </style>
    """, unsafe_allow_html=True)

# شعار البراند المطور
st.markdown("""
    <div style="text-align: center; padding: 15px; background-color: #1e3a8a; border-radius: 15px; margin-bottom: 25px;">
        <h1 style="color: #fbbf24; margin: 0; font-family: 'Arial';">🎙️ SOVEREIGN VOICE</h1>
        <p style="color: white; font-size: 1.1em;">حول أفكارك إلى نصوص وأصوات فيروسية في ثوانٍ</p>
    </div>
    """, unsafe_allow_html=True)

# 2. إعداد API عبر Secrets
try:
    API_KEY = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=API_KEY)
except:
    st.error("⚠️ يرجى ضبط GEMINI_API_KEY في إعدادات Secrets الخاصة بـ Streamlit.")
    st.stop()

# 3. واجهة المستخدم
topic = st.text_input("ما هو موضوع الفيديو القادم؟", placeholder="مثلاً: كيف تبدأ تجارة إلكترونية برأس مال بسيط")

if st.button("توليد المحتوى الصوتي والبصري ✨"):
    if topic:
        with st.spinner("شفري يبحث عن أفضل نموذج ويقوم بالعمل..."):
            try:
                # اكتشاف النماذج المتاحة تلقائياً لتجنب خطأ 404
                model_list = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
                # نختار الموديل المتاح (سواء كان gemini-pro أو 1.5 flash)
                working_model = model_list[0] if model_list else 'gemini-pro'
                
                model = genai.GenerativeModel(working_model)
                
                # صياغة البرومبت (الأمر)
                prompt = f"""
                اكتب نص فيديو تيك توك قصير واحترافي عن: {topic}. 
                اجعل اللغة بسيطة وجذابة. 
                تجنب استخدام الرموز الكثيرة والنجوم في النص لسهولة قراءته صوتياً.
                """
                
                response = model.generate_content(prompt)
                script_text = response.text
                
                # عرض النص
                st.success(f"تم التوليد بنجاح!")
                st.markdown(f"### 📝 النص المقترح:\n{script_text}")
                
                # تحويل النص إلى صوت
                # نقوم بتنظيف النص من أي رموز قد تسبب مشكلة للمحرك الصوتي
                clean_text = script_text.replace("*", "").replace("#", "")
                tts = gTTS(text=clean_text, lang='ar')
                audio_fp = io.BytesIO()
                tts.write_to_fp(audio_fp)
                
                # عرض قسم الصوت
                st.markdown('<div class="audio-box">', unsafe_allow_html=True)
                st.write("### 🎧 معاينة الصوت وتحميله:")
                st.audio(audio_fp, format='audio/mp3')
                
                st.download_button(
                    label="تحميل ملف الصوت MP3 📥",
                    data=audio_fp.getvalue(),
                    file_name="viral_voice.mp3",
                    mime="audio/mp3"
                )
                st.markdown('</div>', unsafe_allow_html=True)
                
            except Exception as e:
                st.error(f"حدث خطأ تقني: {e}")
    else:
        st.warning("يرجى كتابة موضوع الفيديو أولاً.")

st.markdown("---")
st.caption("Developed by siragsoft | Powered by Gemini & gTTS")
