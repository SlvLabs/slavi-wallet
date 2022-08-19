## Build

### Run with debug
```shell
# dev-environment
ENVFILE=.env.development react-native run-android
ENVFILE=.env.development react-native run-ios

# prod-environment
ENVFILE=.env.production react-native run-android
ENVFILE=.env.production react-native run-ios
```

### Build android
```shell
#./gradlew clean
# dev-environment
cd android && ENVFILE=.env.development ./gradlew assembleRelease

# prod-production
cd android && ENVFILE=.env.production ./gradlew assembleRelease
```

### Build ios
TODO
