# Notes App 📝

A sleek and simple note-taking application built with [Expo](https://expo.dev/) and React Native. "Every big idea starts with a small note. Capture your thoughts before they disappear."

## 🚀 Features

- **Expo Router:** Utilizes file-based routing for seamless navigation.
- **Custom Splash Screen:** A beautiful, themed splash screen to welcome users.
- **Theming:** Built-in support for Light and Dark modes (`useTheme` hook & `ThemeContext`).
- **Custom Typography:** Uses the Roboto font family for a clean and modern look.
- **TypeScript:** Fully typed for better developer experience and reliability.

## 📂 Project Structure

```text
src/
├── app/
│   ├── index.tsx          # Initial Splash screen
│   ├── _layout.tsx        # Root application layout
│   └── notes-feature/     # Main notes feature module
├── constants/
│   ├── fonts.ts           # Typography definitions
│   ├── fontSizes.ts       # Font size constants
│   └── ThemeContext.tsx   # Theme provider for the app
├── hook/
│   └── useTheme.ts        # Custom hook for accessing the current theme
├── interface/             # TypeScript interfaces and types
└── styles/
    └── SplashScreen.styles.ts # Splash screen specific styling
```

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)
- [Expo Go](https://expo.dev/go) app on your mobile device (optional, for testing).

### 2. Install Dependencies

Clone the repository and install the required dependencies:

```bash
npm install
# or
bun install
```

### 3. Start the Application

Run the development server:

```bash
npx expo start
```

This will start the Metro bundler. From there, you can open the app on:
- An iOS Simulator (press `i`)
- An Android Emulator (press `a`)
- A physical device using the **Expo Go** app by scanning the QR code in the terminal.

## 📦 Scripts

- `npm start`: Starts the Expo development server.
- `npm run android`: Runs the app on Android.
- `npm run ios`: Runs the app on iOS.
- `npm run web`: Starts the app in web mode.
- `npm run lint`: Runs ESLint to check for code issues.

## 🎨 Technologies Used

- **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling:** React Native StyleSheet
- **Language:** TypeScript
