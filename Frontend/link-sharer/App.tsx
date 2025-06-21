import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

// Input Components
import InputSelector from './components/InputSelector';


export default function App() {
  return (
    <PaperProvider>
        <InputSelector />
    </PaperProvider>
  );
}
