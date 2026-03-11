import streamlit as st
import google.generativeai as genai
from gtts import gTTS
import io

# 1. إعدادات الصفحة والتصميم
st.set_page_config(page_title="Sovereign Script AI", page_icon="🎙️", layout="centered")

st.markdown("""
    <style>
    .stButton>button { width: 100%; border-radius: 20px; background-color: #FF4B4B; color: white; }
    .audio-box { background-color: #f0f2f6; padding: 20px; border-radius: 15px; margin-top: 20px; }
    </style>
    """, unsafe_allow_html=True)

# شعار البراند
st.markdown("""
    <div style="text-align: center; padding: 10px; background-color: #1e3a8a; border-radius: 15px; margin-bottom: 25px;">
        <h1 style="color: #fbbf24; margin: 0;">🎙️ SOVEREIGN VOICE</h1>
        <p style="color: white;">صوت ذكي لنصوصك الفيروسية</p>
    </div>
    """, unsafe_allow_html=True)

# 2. إعداد API
try:
    API_KEY = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=API_KEY)
except:
    st.error("⚠️ يرجى ضبط GEMINI_API_KEY في Secrets")
    st.stop()

# 3. واجهة المستخدم
topic = st.text_input("عن ماذا يتحدث الفيديو؟", placeholder="مثلاً: 3 أسرار لزيادة المتابعين...")

if st.button("توليد النص والصوت السحري ✨"):
    if topic:
        with st.spinner("شفري يكتب النص ويسجل الصوت..."):
            try:
                # توليد النص
                model = genai.GenerativeModel('gemini-1.5-pro')
                prompt = f"اكتب نص فيديو قصير ومثير جداً عن {topic}. اجعل النص قصيراً ليناسب 30 ثانية."
                response = model.generate_content(prompt)
                script_text = response.text
                
                st.success("تم التوليد بنجاح!")
                st.markdown(f"### 📝 النص المقترح:\n{script_text}")
                
                # تحويل النص إلى صوت
                tts = gTTS(text=script_text, lang='ar')
                audio_fp = io.BytesIO()
                tts.write_to_fp(audio_fp)
                
                # عرض مشغل الصوت
                st.markdown('<div class="audio-box">', unsafe_allow_html=True)
                st.write("### 🎧 استمع إلى الصوت:")
                st.audio(audio_fp, format='audio/mp3')
                
                # زر التحميل
                st.download_button(
                    label="تحميل ملف الصوت MP3 📥",
                    data=audio_fp.getvalue(),
                    file_name="viral_voice.mp3",
                    mime="audio/mp3"
                )
                st.markdown('</div>', unsafe_allow_html=True)
                
            except Exception as e:
                st.error(f"حدث خطأ: {e}")
    else:
        st.warning("يرجى كتابة عنوان للفيديو.")

st.markdown("---")
st.caption("Developed by siragsoft | Powered by Gemini & gTTS")
