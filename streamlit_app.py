import streamlit as st
import google.generativeai as genai
from gtts import gTTS
import io
import re

# 1. إعدادات الصفحة
st.set_page_config(page_title="Sovereign AI Studio", page_icon="🎬", layout="centered")

# تنسيق CSS
st.markdown("""
    <style>
    .stButton>button { width: 100%; border-radius: 20px; background-color: #FF4B4B; color: white; height: 3em; font-weight: bold; border: none; }
    .audio-box { background-color: #f0f2f6; padding: 20px; border-radius: 15px; border: 1px solid #d1d5db; margin-top: 10px; }
    .script-box { background-color: #ffffff; padding: 15px; border-radius: 10px; border-right: 5px solid #1e3a8a; margin-bottom: 20px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1); color: #1e293b; }
    </style>
    """, unsafe_allow_html=True)

# العنوان
st.markdown("""
    <div style="text-align: center; padding: 20px; background-color: #1e3a8a; border-radius: 15px; margin-bottom: 25px;">
        <h1 style="color: #fbbf24; margin: 0; font-family: 'Arial Black';">🎬 SOVEREIGN STUDIO</h1>
        <p style="color: white; font-size: 1.1em;">نصوص، أصوات، وصور بضغطة زر</p>
    </div>
    """, unsafe_allow_html=True)

# 2. إعداد مفتاح الـ API
try:
    API_KEY = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=API_KEY)
except:
    st.error("⚠️ خطأ: يرجى إضافة GEMINI_API_KEY في إعدادات Secrets.")
    st.stop()

# 3. واجهة المدخلات
topic = st.text_input("ما هي فكرة الفيديو القادم؟", placeholder="مثلاً: أسرار النجاح في البرمجة")

# 4. زر التشغيل والعمليات
if st.button("توليد المشروع الكامل ✨"):
    if topic:
        with st.spinner("شفري يجهز لك المحتوى..."):
            try:
                # اختيار الموديل
                model_list = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
                working_model = model_list[0] if model_list else 'gemini-pro'
                model = genai.GenerativeModel(working_model)
                
                # البرومبت
                prompt = f"اكتب نص فيديو تيك توك قصير عن: {topic}. ضع الكلام الذي سيُقال صوتياً فقط بين [START] و [END]. واقترح 3 كلمات مفتاحية بالإنجليزية للصور بعد كلمة Keywords:"
                
                response = model.generate_content(prompt)
                full_text = response.text
                
                # عرض النص
                st.markdown("### 📝 سيناريو الفيديو")
                st.markdown(f'<div class="script-box">{full_text}</div>', unsafe_allow_html=True)

                # استخراج الصوت
                voice_match = re.search(r'\[START\](.*?)\[END\]', full_text, re.DOTALL)
                voice_text = voice_match.group(1).strip() if voice_match else full_text
                voice_text = re.sub(r'[*#_]', '', voice_text)
                voice_text = re.sub(r'\(.*?\)', '', voice_text)

                if voice_text:
                    tts = gTTS(text=voice_text, lang='ar')
                    audio_fp = io.BytesIO()
                    tts.write_to_fp(audio_fp)
                    
                    st.markdown('<div class="audio-box">', unsafe_allow_html=True)
                    st.write("### 🎧 الصوت الصافي المستخرج:")
                    st.audio(audio_fp, format='audio/mp3')
                    st.download_button(label="تحميل الصوت MP3 📥", data=audio_fp.getvalue(), file_name="voice.mp3")
                    st.markdown('</div>', unsafe_allow_html=True)

                # عرض الصور
                st.write("---")
                st.markdown("### 🖼️ صور ملهمة:")
                kw_match = re.search(r'Keywords:(.*)', full_text, re.IGNORECASE)
                if kw_match:
                    keywords = kw_match.group(1).split(',')
                    cols = st.columns(len(keywords[:3]))
                    for i, kw in enumerate(keywords[:3]):
                        clean_kw = kw.strip().replace(" ", "+")
                        img_url = f"https://source.unsplash.com/featured/800x600?{clean_kw}"
                        with cols[i]:
                            st.image(img_url, caption=f"صورة لـ: {kw.strip()}", use_container_width=True)

            except Exception as e:
                st.error(f"حدث خطأ: {e}")
    else:
        st.warning("يرجى كتابة موضوع أولاً.")

# 5. تذييل الصفحة (تأكد أن هذا السطر في نهاية الملف تماماً)
st.markdown("---")
st.caption("تم التطوير بواسطة siragsoft | الإصدار المتقدم 3.1")
