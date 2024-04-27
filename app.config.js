module.exports = {
  "expo": {
    "name": "Western Sci Rendezvous",
    "slug": "WesternUSciRenApp",
    "version": "1.1.3",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
    },
    "updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/85799fd0-0a62-4093-ae54-1ab282c3cf75"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "app.westernuscirenapp",
      "buildNumber": "1.1.3",
      "config": {
        "googleMapsApiKey": "AIzaSyAhhfrvIcc4WgJnb5IS2IQW91PDfY1zu78"
      },
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app needs access to your location to provide you event location and navigation to the event location from your location."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#BBDEBF"
      },
      "package": "app.westernuscirenapp",
      "googleServicesFile": process.env.googleServices,
      "versionCode": 23,
      "config": {
        "googleMaps": {
          "apiKey" : "AIzaSyAhhfrvIcc4WgJnb5IS2IQW91PDfY1zu78"
        }
      },
      "permissions": [
        "RECEIVE_BOOT_COMPLETED"
      ]
    },
    "web": {
      "favicon": "./assets/icon.png"
    },
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/icon.png",
          "color": "#ffffff"
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "85799fd0-0a62-4093-ae54-1ab282c3cf75"
      }
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
