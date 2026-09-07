import React from 'react';
import { StatusBar } from 'react-native';
import { ShopScreen } from './features/shop/screens/ShopScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ShopScreen />
    </>
  );
}