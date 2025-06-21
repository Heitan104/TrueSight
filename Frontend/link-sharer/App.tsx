import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

// Input Components
import InputSelector from './components/InputSelector';
import Menu from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
        <InputSelector />
    </PaperProvider>
  );
}
