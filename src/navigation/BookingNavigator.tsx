import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BagDetailScreen from '../screens/BagDetailScreen';
import CalendarScreen from '../screens/CalendarScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createNativeStackNavigator();

export default function BookingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="BagDetail" 
        component={BagDetailScreen}
        options={{ title: 'Product Detail' }}
      />
      <Stack.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{ title: 'Select Dates' }}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{ title: 'Review Order' }}
      />
    </Stack.Navigator>
  );
}
