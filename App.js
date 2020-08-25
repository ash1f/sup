import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppContextProvider from './Provider'
import { retrieveAS } from './constants/Service';
import { userkey } from './constants/AppConfig'
import Authenticate from './navigation/AppNavigator';

const AppReady = ({ login }) => {
  const Layout = Authenticate(login);
  return (
    <AppContextProvider>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Layout />
      </View>
    </AppContextProvider>
  )
};

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [user, setUser] = useState(null)
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={() => loadResourcesAsync(setUser)}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return <AppReady login={user ? true : false} />
  }
}


async function loadResourcesAsync(setUser) {
  await Promise.all([
    cacheImages([
      //require('./assets/images/robot-depng'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);

  await retrieveAS(userkey).then((user) => {
    if (user)
      setUser(user);
    else
      setUser(null);

    return;
  })

  return;
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
