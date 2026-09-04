# 📱 دليل تحويل التطبيق إلى APK وتثبيته على الهاتف

## المتطلبات الأساسية ⚙️

قبل البدء، تأكد من تثبيت البرامج التالية على جهازك:

### 1. **Node.js و npm**
   - حمّل من: https://nodejs.org/
   - تأكد من التثبيت: اكتب في الـ Terminal/CMD
     ```
     node --version
     npm --version
     ```

### 2. **Java JDK**
   - حمّل من: https://www.oracle.com/java/technologies/downloads/
   - تأكد من التثبيت:
     ```
     java -version
     ```

### 3. **Android SDK**
   - حمّل Android Studio من: https://developer.android.com/studio
   - بعد التثبيت، ستحصل على Android SDK تلقائياً

### 4. **Cordova CLI**
   - اكتب في Terminal/CMD:
     ```
     npm install -g cordova
     ```

---

## خطوات التثبيت والتحويل إلى APK 🚀

### الخطوة 1: نسخ ملفات المشروع

```bash
# 1. افتح Terminal أو Command Prompt
# 2. اذهب إلى المجلد الذي تريد حفظ المشروع فيه
cd C:\Users\YourName\Desktop  # أو أي مجلد تختاره

# 3. انسخ ملفات المشروع
git clone https://github.com/sroahm1987-netizen/school-management-app.git
cd school-management-app
```

### الخطوة 2: تثبيت المكتبات

```bash
# تثبيت المكتبات المطلوبة
npm install
```

### الخطوة 3: إضافة منصة Android

```bash
# إضافة Android إلى المشروع
cordova platform add android
```

### الخطوة 4: بناء التطبيق APK

```bash
# بناء ملف APK للاختبار (Debug)
cordova build android

# أو للإصدار النهائي (Release)
cordova build android --release
```

### الخطوة 5: تحديد موقع ملف APK

بعد انتهاء البناء، سيكون ملف APK في أحد المسارات التالية:

**للاختبار:**
```
school-management-app/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

**للإصدار النهائي:**
```
school-management-app/platforms/android/app/build/outputs/apk/release/app-release.apk
```

---

## تثبيت التطبيق على هاتفك 📲

### الطريقة 1: استخدام USB (الأسهل)

#### على الكمبيوتر:
1. صل الهاتف بالكمبيوتر عبر كابل USB
2. اختر "نقل الملفات" من خيارات الاتصال
3. اكتب في Terminal:
   ```bash
   cordova run android
   ```
   أو انسخ ملف APK يدوياً إلى الهاتف

#### على الهاتف:
1. انتقل إلى إعدادات > الأمان
2. فعّل "مصادر غير معروفة" (Unknown Sources)
3. افتح مدير الملفات
4. ابحث عن ملف APK
5. اضغط عليه وثبّته

### الطريقة 2: نقل الملف مباشرة

1. انسخ ملف `app-debug.apk` من الكمبيوتر
2. ضعه في مجلد يسهل الوصول إليه على الهاتف (مثل Downloads)
3. افتحه من الهاتف وثبّته

### الطريقة 3: إرسال عبر البريد الإلكتروني

1. أرسل ملف APK لنفسك عبر البريد
2. اختبر المرفق من الهاتف
3. اضغط على "تثبيت"

---

## حل المشاكل الشائعة 🔧

### المشكلة 1: Android SDK لم يتم العثور عليه
**الحل:**
```bash
# قم بتعيين مسار Android SDK
# على Windows:
set ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk

# على Mac/Linux:
export ANDROID_HOME=~/Library/Android/Sdk
```

### المشكلة 2: Java لم يتم العثور عليه
**الحل:**
```bash
# قم بتعيين مسار Java
# على Windows:
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_291

# على Mac/Linux:
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_291.jdk/Contents/Home
```

### المشكلة 3: فشل البناء
**الحل:**
```bash
# امسح الملفات المؤقتة وحاول مرة أخرى
cordova clean android
cordova build android
```

### المشكلة 4: التطبيق لا يثبت على الهاتف
- تأكد من تفعيل "مصادر غير معروفة" في الإعدادات
- حاول تثبيت APK بدون توقيع
- استخدم ملف Debug APK بدلاً من Release

---

## التخصيص قبل الإصدار 🎨

### تغيير اسم التطبيق:
في ملف `config.xml`:
```xml
<name>اسم تطبيقك الجديد</name>
```

### تغيير رقم الإصدار:
في ملف `config.xml`:
```xml
<widget id="com.yourcompany.appname" version="1.0.0">
```

### إضافة أيقونة التطبيق:
1. ضع صورة أيقونة في `res/android/`
2. عدّل مسارات الأيقونات في `config.xml`

### إضافة شاشة البداية (Splash Screen):
```xml
<platform name="android">
    <splash src="res/screen/android/splash-port-hdpi.png" density="port-hdpi" />
</platform>
```

---

## أوامر مفيدة أخرى 💡

```bash
# عرض الأجهزة المتصلة
cordova run android --device

# بناء بدون تثبيت
cordova build android

# تنظيف المشروع
cordova clean

# عرض تفاصيل البناء
cordova build android --verbose
```

---

## الخطوات السريعة (ملخص) ⚡

```bash
# 1. استنساخ المشروع
git clone https://github.com/sroahm1987-netizen/school-management-app.git
cd school-management-app

# 2. تثبيت المكتبات
npm install

# 3. إضافة Android
cordova platform add android

# 4. بناء التطبيق
cordova build android

# 5. تثبيت على الهاتف
cordova run android
```

---

## معلومات مهمة ℹ️

- ✅ التطبيق يعمل بدون إنترنت
- ✅ البيانات تُحفظ محلياً على الهاتف
- ✅ لا توجد تكاليف تشغيل
- ✅ يمكن تعديل الكود وإعادة البناء

---

## الدعم والمساعدة 🤝

إذا واجهت مشكلة:
1. تحقق من تثبيت جميع المتطلبات
2. اقرأ رسائل الخطأ بعناية
3. جرّب الحلول المذكورة أعلاه
4. ابحث على Stack Overflow أو GitHub Issues

---

**تم تطويره بحب ❤️ للتعليم والتطوير**