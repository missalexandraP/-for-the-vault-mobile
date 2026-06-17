import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold 
} from '@expo-google-fonts/playfair-display';
import { 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_600SemiBold 
} from '@expo-google-fonts/inter';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/store/AuthContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="dark" />
        <AppNavigator />
      </View>
    </AuthProvider>
  );
}
