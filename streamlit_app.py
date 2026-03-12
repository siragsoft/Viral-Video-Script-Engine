import streamlit as st
import google.generativeai as genai
from gtts import gTTS
import io
import re

# 1. إعدادات الصفحة والتنسيق الجمالي
st.set_page_config(page_title="Sovereign Voice AI", page_icon="🎙️", layout="centered")

st.markdown("""
    <style>
    .stButton>button { width: 100%; border-radius: 20px; background-color: #FF4B4B; color: white; height: 3em; font-weight: bold;}
    .audio-box { background-color: #f0f2f6; padding: 20px; border-radius: 15px; border: 1px solid #d1d5db; margin-top: 20px; }
    .script-box { background-color: #ffffff; padding: 15px; border-radius: 10px; border-right: 5px solid #1e3a8a; margin-bottom: 20px; }
    </style>
    """, unsafe_allow_html=True)

# شعار التطبيق
st.markdown("""
    <div style="text-align: center; padding: 15px; background-color: #1e3a8a; border-radius: 15px; margin-bottom: 25px;">
        <h1 style="color: #fbbf24; margin: 0;">🎙️ SOVEREIGN VOICE</h1>
        <p style="color: white; font-size: 1.1em;">توليد نصوص وأصوات صافية للمونتاج</p>
    </div>
    """, unsafe_allow_html=True)

# 2. جلب المفتاح من الإعدادات السرية
try:
    API_KEY = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=API_KEY)
except:
    st.error("⚠️ خطأ: تأكد من إضافة GEMINI_API_KEY في Secrets على Streamlit Cloud.")
    st.stop()

# 3. واجهة المستخدم
topic = st.text_input("ما هو موضوع الفيديو؟", placeholder="مثلاً: 5 نصائح لتنظيم الوقت")

if st.button("توليد النص والصوت الصافي ✨"):
    if topic:
        with st.spinner("شفري يقوم بتنقية النص وتحويله لصوت..."):
            try:
                # اكتشاف الموديل المتاح
                model_list = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
                working_model = model_list[0] if model_list else 'gemini-pro'
                model = genai.GenerativeModel(working_model)
                
                # البرومبت المطور لاستخراج الصوت الصافي
                prompt = f"""
                اكتب نص فيديو تيك توك قصير عن: {topic}.
                مهم جداً: ضع الكلام الذي سيُقال صوتياً فقط (Voice-over) بين علامتي [START] و [END].
                أي ملاحظات إخراجية أو عناوين فرعية ضعها خارج هذه العلامات.
                """
                
                response = model.generate_content(prompt)
                full_text = response.text
                
                # عرض النص الكامل للمستخدم
                st.markdown("### 📝 السيناريو المقترح:")
                st.markdown(f'<div class="script-box">{full_text}</div>', unsafe_allow_html=True)

                # --- عملية استخراج وتنظيف الصوت ---
                # 1. البحث عن النص بين العلامات
                voice_match = re.search(r'\[START\](.*?)\[END\]', full_text, re.DOTALL)
                if voice_match:
                    voice_text = voice_match.group(1).strip()
                else:
                    voice_text = full_text # إذا فشل الموديل نأخذ النص كاملاً
                
                # 2. تنظيف النص من النجوم، المربعات، وأي ملاحظات بين أقواس
                voice_text = re.sub(r'[*#_]', '', voice_text)  # حذف علامات التنسيق
                voice_text = re.sub(r'\(.*?\)', '', voice_text) # حذف ملاحظات مثل (موسيقى حماسية)
                voice_text = voice_text.replace('[START]', '').replace('[END]', '') # التأكد من حذف العلامات نفسها
                
                # 4. توليد الصوت gTTS
                if voice_text:
                    tts = gTTS(text=voice_text, lang='ar')
                    audio_fp = io.BytesIO()
                    tts.write_to_fp(audio_fp)
                    
                    # عرض قسم الصوت
                    st.markdown('<div class="audio-box">', unsafe_allow_html=True)
                    st.write("### 🎧 الصوت الصافي المستخرج:")
                    st.audio(audio_fp, format='audio/mp3')
                    
                    st.download_button(
                        label="تحميل ملف الصوت الصافي MP3 📥",
                        data=audio_fp.getvalue(),
                        file_name="clean_voice_over.mp3",
                        mime="audio/mp3"
                    )
                    st.markdown('</div>', unsafe_allow_html=True)
                    
                    with st.expander("رؤية النص الذي تم إرساله للمحرك الصوتي"):
                        st.write(voice_text)
                
            except Exception as e:
                st.error(f"حدث خطأ: {e}")
    else:
        st.warning("يرجى كتابة موضوع أولاً.")

st.markdown("---")
st.caption("تم التطوير بواسطة siragsoft | نسخة الصوت الصافي 2.0")
