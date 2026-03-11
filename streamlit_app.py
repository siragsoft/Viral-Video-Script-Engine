import streamlit as st
import google.generativeai as genai
from gtts import gTTS
import io

# 1. إعدادات الصفحة
st.set_page_config(page_title="Sovereign Voice AI", page_icon="🎙️", layout="centered")

# شعار البراند
st.markdown("""
    <div style="text-align: center; padding: 15px; background-color: #1e3a8a; border-radius: 15px; margin-bottom: 25px;">
        <h1 style="color: #fbbf24; margin: 0;">🎙️ SOVEREIGN VOICE</h1>
        <p style="color: white;">النص والصوت الذكي في مكان واحد</p>
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
topic = st.text_input("عن ماذا يتحدث الفيديو؟", placeholder="مثلاً: نصائح للنجاح في 2026")

if st.button("توليد المحتوى الآن ✨"):
    if topic:
        with st.spinner("جاري البحث عن أفضل نموذج متاح وتوليد المحتوى..."):
            try:
                # خطوة ذكية: البحث عن النماذج المتاحة تلقائياً
                models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
                # اختيار أحدث نموذج متاح (غالباً يكون الأول في القائمة)
                selected_model_name = models[0] if models else 'gemini-pro'
                
                model = genai.GenerativeModel(selected_model_name)
                
                # توليد النص
                prompt = f"اكتب نص فيديو تيك توك قصير ومثير جداً عن {topic}. اجعل النص باللهجة البيضاء ومناسباً لـ 30 ثانية."
                response = model.generate_content(prompt)
                script_text = response.text
                
                st.success(f"تم التوليد باستخدام نموذج: {selected_model_name}")
                st.markdown(f"### 📝 النص المقترح:\n{script_text}")
                
                # تحويل النص إلى صوت (إزالة النجوم والرموز ليكون الصوت نقياً)
                clean_text = script_text.replace('*', '').replace('#', '')
                tts = gTTS(text=clean_text, lang='ar')
                audio_fp = io.BytesIO()
                tts.write_to_fp(audio_fp)
                
                # عرض الصوت
                st.write("---")
                st.write("### 🎧 استمع وحمّل الصوت:")
                st.audio(audio_fp, format='audio/mp3')
                
                st.download_button(
                    label="تحميل ملف الصوت MP3 📥",
                    data=audio_fp.getvalue(),
                    file_name="viral_voice.mp3",
                    mime="audio/mp3"
                )
                
            except Exception as e:
                st.error(f"عذراً، حدث خطأ: {e}")
    else:
        st.warning("يرجى كتابة عنوان للفيديو.")

st.markdown("---")
st.caption("Developed by siragsoft | Powered by Gemini & gTTS")
