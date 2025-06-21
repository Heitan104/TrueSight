import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as Clipboard from 'expo-clipboard';

import styles from './styles';

const InputSelector = () => {
  const [videoLink, setVideoLink] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/3gpp'],
      });

      if (res.type === 'success') {
        setFileName((res as { name: string }).name);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setVideoLink(text);
  };

  const handleSubmit = () => {
    console.log('Submitted link:', videoLink);
  };

  return (
    <View style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>TrueSight</Text>
      </View>

      {/* Centered content area */}
      <View style={styles.contentCenter}>
        {/* Input row with buttons on right */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Paste TikTok URL"
            placeholderTextColor="#777"
            value={videoLink}
            onChangeText={setVideoLink}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={pasteFromClipboard}
            >
              <MaterialIcons name="content-paste" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={handleSubmit}
            >
              <MaterialIcons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider line - now clearly visible */}
        <View style={styles.divider}>
          <Text style={styles.dividerLabel}>-------------------- OR -------------------- </Text>
        </View>

        {/* Dropbox area with file types */}
        <TouchableOpacity 
          style={styles.dropbox}
          onPress={pickFile}
        >
          <MaterialIcons 
            name="cloud-upload" 
            size={48} 
            color="#9b59b6" 
            style={styles.dropboxIcon} 
          />
          <Text style={styles.dropboxText}>
            {fileName || "Drag & drop video file here"}
          </Text>
          <Text style={styles.fileTypesText}>
            Supported: MP4, MOV, AVI, 3GP
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer at bottom */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 TrueSight • Built with 💡</Text>
      </View>
    </View>
  );
};

export default InputSelector;