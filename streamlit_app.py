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
        
        # وظيفة ذكية للبحث عن أي نموذج متاح ومناسب
        available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        if not available_models:
            st.error("لم يتم العثور على أي نماذج تدعم توليد المحتوى في هذا الحساب.")
        else:
            # نختار أول نموذج متاح (غالباً سيكون هو الصحيح)
            model_name = available_models[0]
            model = genai.GenerativeModel(model_name)

            # 3. مدخلات المستخدم
            topic = st.text_input("عن ماذا يتحدث الفيديو؟", placeholder="مثلاً: نصائح للاستثمار في الذهب")
            
            if st.button("توليد النص السحري ✨"):
                if topic:
                    with st.spinner(f"جاري العمل باستخدام {model_name}..."):
                        try:
                            prompt = f"اكتب نص فيديو تيك توك فيروسي وممتع عن: {topic}. اجعل البداية قوية جداً لجذب الانتباه."
                            response = model.generate_content(prompt)
                            
                            if response.text:
                                st.success("تم التوليد بنجاح!")
                                st.markdown(f"### 📝 النص المقترح:\n{response.text}")
                        except Exception as e:
                            st.error(f"خطأ في التوليد: {e}")
                else:
                    st.error("رجاءً اكتب فكرة أولاً!")
    except Exception as e:
        st.error(f"خطأ في إعداد المكتبة أو المفتاح: {e}")
