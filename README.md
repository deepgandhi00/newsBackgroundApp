<!-- Title -->
<h1 align="center">
  React Native News App
</h1>

<p>
    The app is built using MVVM Architecture and Dependency Injection
</p>

<!-- Body -->

```sh
git clone https://github.com/deepgandhi00/newsBackgroundApp.git
cd backgroundApp
npx react-native run-android
```

## Library Used

- react-navigation
- axios
- inversifyjs
- reduxjs/toolkit
- inversify-react
- react-native-sqlite-storage
- react-native-background-actions

## Folder Structure

- application (contains application level configurations)
  - di (contains dependency injection related files)
  - navigation (contains navigation related files and stack navigator configuration)
  - utils (contains common styles, constants, colors and background task helper)
- domain (contain entities and enums for application)
- infrastructure (contain infrastructure level configuration files)
  - clients (contains different clients for getting data)
    - http (http client)
    - sqlLite (SQLite client)
  - repository (contains all repositories definitions and their respective multiple implementations)
- presentation (contains screens and components)
  - hooks (contains business logics for particular screen or component similar to segmentation of view model)
  - components (contains common components)
  - screens (contains different screens and hooks and components for particular screen)
