import streamlit as st
import google.generativeai as genai
from gtts import gTTS
import io
import re

# 1. إعدادات الصفحة والتنسيق
st.set_page_config(page_title="Sovereign AI Studio", page_icon="🎬", layout="centered")

st.markdown("""
    <style>
    .stButton>button { width: 100%; border-radius: 20px; background-color: #FF4B4B; color: white; height: 3em; font-weight: bold; border: none; }
    .stButton>button:hover { background-color: #ff3333; border: none; }
    .audio-box { background-color: #f0f2f6; padding: 20px; border-radius: 15px; border: 1px solid #d1d5db; margin-top: 10px; }
    .script-box { background-color: #ffffff; padding: 15px; border-radius: 10px; border-right: 5px solid #1e3a8a; margin-bottom: 20px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1); }
    .image-card { border-radius: 10px; margin-bottom: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    </style>
    """, unsafe_allow_html=True)

# شعار التطبيق الاحترافي
st.markdown("""
    <div style="text-align: center; padding: 20px; background-color: #1e3a8a; border-radius: 15px; margin-bottom: 25px;">
        <h1 style="color: #fbbf24; margin: 0; font-family: 'Arial Black';">🎬 SOVEREIGN STUDIO</h1>
        <p style="color: white; font-size: 1.1em; letter-spacing: 1px;">النص + الصوت + الصور المقترحة</p>
    </div>
    """, unsafe_allow_html=True)

# 2. التحقق من المفتاح السري
try:
    API_KEY = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=API_KEY)
except:
    st.error("⚠️ خطأ: يرجى إضافة GEMINI_API_KEY في ملف Secrets.")
    st.stop()

# 3. واجهة المستخدم
topic = st.text_input("ما هي فكرة الفيديو القادم؟", placeholder="مثلاً: حقائق غريبة عن الفضاء")

if st.button("توليد المشروع الكامل ✨"):
    if topic:
        with st.spinner("شفري يحلل، يكتب، ويصمم لك الفيديو..."):
            try:
                # اكتشاف الموديل المتاح
                model_list = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
                working_model = model_list[0] if model_list else 'gemini-pro'
                model = genai.GenerativeModel(working_model)
                
                # البرومبت المطور لجلب النص والكلمات المفتاحية للصور
                prompt = f"""
                اكتب نص فيديو تيك توك قصير ومثير عن: {topic}.
                1. ضع الكلام الذي سيُقال صوتياً فقط بين [START] و [END].
                2. اقترح 3 كلمات مفتاحية بالإنجليزية للبحث عن صور مناسبة للمشاهد وضعها بعد كلمة Keywords:
                """
                
                response = model.generate_content(prompt)
                full_text = response.text
                
                # --- عرض النتائج ---
                st.markdown("### 📝 سيناريو الفيديو")
                st.markdown(f'<div class="script-box">{full_text}</div>', unsafe_allow_html=True)

                # --- استخراج وتنظيف الصوت ---
                voice_match = re.search(r'\[START\](.*?)\[END\]', full_text, re.DOTALL)
                voice_text = voice_match.group(1).strip() if voice_match else re.sub(r'[*#_]', '', full_text)
                voice_text = re.sub(r'\(.*?\)', '', voice_text).replace('[START]', '').replace('[END]', '')

                # توليد الصوت
                tts = gTTS(text=voice_text, lang='ar')
                audio_fp = io.BytesIO()
                tts.write_to_fp(audio_fp)
                
                st.markdown('<div class="audio-box">', unsafe_allow_html=True)
                st.write("### 🎧 الصوت الصافي المستخرج:")
                st.audio(audio_fp, format='audio/mp3')
                st.download_button(label="تحميل الصوت MP3 📥", data=audio_fp.getvalue(), file_name="script_voice.mp3")
                st.markdown('</div>', unsafe_allow_html=True)

                # --- ميزة البحث عن الصور المقترحة ---
                st.write("---")
                st.markdown("### 🖼️ صور مقترحة للمونتاج:")
                
                # استخراج الكلمات المفتاحية من النص (البحث عن سطر Keywords)
                kw_match = re.search(r'Keywords:(.*)', full_text, re.IGNORECASE)
                if kw_match:
                    keywords = kw_match.group(1).split(',')
                    cols = st.columns(len(keywords[:3])) # عرض 3 صور كحد أقصى
                    for i, kw in enumerate(keywords[:3]):
                        clean_kw = kw.strip().replace(" ", "+")
                        # استخدام Unsplash كخدمة صور سريعة ومجانية للمطورين
                        img_url = f"https://source.unsplash.com/featured/?{clean_kw}"
                        with cols[i]:
                            st.image(img_url, caption=f"صورة لـ: {kw.strip()}", use_container_width=True)
                else:
                    st.info("لم يتم العثور على كلمات مفتاحية للصور، جرب كتابة موضوع أوضح.")

            except Exception as e:
                st.error(f"حدث خطأ: {e}")
    else:
        st.warning("يرجى كتابة عنوان للفيديو.")

st.markdown("---")
st.caption("تم التطوير بواسطة siragsoft | الإصدار المتقدم 3.0")if st.button("توليد النص والصوت الصافي ✨"):
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
