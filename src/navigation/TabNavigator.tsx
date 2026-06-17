import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShoppingBag, User, Search } from 'lucide-react-native';
import BrowseScreen from '../screens/BrowseScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.champagneGold,
        tabBarInactiveTintColor: COLORS.softSlate,
        tabBarStyle: {
          backgroundColor: COLORS.deepOnyx,
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerStyle: {
          backgroundColor: COLORS.ivoryCream,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontFamily: 'PlayfairDisplay_700Bold',
          fontSize: 20,
          color: COLORS.deepOnyx,
        },
      }}
    >
      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
          headerTitle: 'THE VAULT',
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />,
          headerTitle: 'MY SELECTIONS',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          headerTitle: 'ACCOUNT',
        }}
      />
    </Tab.Navigator>
  );
}
