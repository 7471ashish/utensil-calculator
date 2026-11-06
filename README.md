# Utensil Weight & Rate Calculator (Native Android App)

A native Android mobile application designed for utensil shops and businesses.

## Features
- **Rate per 1 kg Block**: Enter the rate per kilogram (e.g., ₹750/kg).
- **Utensil Weight Block**: Enter the weight of the utensil.
- **Unit Selector**: Switch easily between **Grams (g)** and **Kilograms (kg)** with automatic conversion.
- **Instant Live Price**: Calculates the total price in real-time as you type.
- **Quick Presets**: Fast-tap `+250g`, `+500g`, `+1 kg`, and `Clear` buttons.
- **Detailed Formula**: Shows exactly how the price was computed (e.g. `₹750/kg × 450 g ÷ 1000 = ₹337.50`).

---

## How to Get the APK on Your Android Phone

### Option 1: Open in Android Studio (1-Click APK Build)
1. Open **Android Studio** on your computer.
2. Select **Open** and choose this folder (`c:\Users\bansa\Desktop\buisiness app`).
3. Once Android Studio finishes syncing, click from the top menu:
   **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
4. Android Studio will build the `.apk` file and show a popup: **"locate"**.
5. Click **"locate"** to open the folder containing `app-debug.apk`.
6. Send `app-debug.apk` to your phone via WhatsApp, USB, or Google Drive, tap it, and install!

### Option 2: Connect Phone Directly via USB
1. Enable **Developer Options** and **USB Debugging** on your Android phone.
2. Connect your phone to your computer via USB cable.
3. In Android Studio, select your phone from the device dropdown at the top and click the green **Play (Run)** button.
4. The app will install and open immediately on your phone!

### Option 3: Free Automatic Cloud Build (GitHub)
- A GitHub Actions workflow is included at `.github/workflows/build-apk.yml`.
- If you push this code to a GitHub repository, GitHub will automatically build the APK for you in under 2 minutes and give you a direct download link under the **Actions** tab.

