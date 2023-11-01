import React, {useEffect, useState} from 'react';
import {AppState, AppStateStatus, Text, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';

function App(): JSX.Element {
  const [appState, setAppState] = useState<AppStateStatus>();

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', state => {
      setAppState(state);
    });

    return () => {
      appStateListener.remove();
    };
  }, []);

  const setItem = async () => {
    await SecureStore.setItemAsync('test', 'test string');
  };

  useEffect(() => {
    if (appState === 'background') {
      console.log('app into background');
      // App going into the background
      setItem();
    }
  }, [appState]);

  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

export default App;
