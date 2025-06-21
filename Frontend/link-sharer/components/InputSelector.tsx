import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import styles from './styles';

const InputSelector = () => {
  const [videoLink, setVideoLink] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Create directory if it doesn't exist
  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'toAnalyze/');
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'toAnalyze/', { intermediates: true });
    }
  };

  const pickFile = async () => {
    try {
      await ensureDirExists();
      
      // Request permissions (modern Expo way)
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your media library to analyze videos');
        return;
      }

      const res = await DocumentPicker.getDocumentAsync({
        type: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/3gpp'],
        copyToCacheDirectory: false,
      });

      if (res.type === 'success') {
        const sourceUri = res.uri;
        const fileName = res.name || `video_${Date.now()}.mp4`;
        const destUri = `${FileSystem.documentDirectory}toAnalyze/${fileName}`;
        
        setIsDownloading(true);
        await FileSystem.copyAsync({
          from: sourceUri,
          to: destUri,
        });
        
        setFileName(fileName);
        Alert.alert('Success', `Video saved for analysis`);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to save video');
    } finally {
      setIsDownloading(false);
    }
  };

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setVideoLink(text);
  };

  const handleSubmit = () => {
    console.log('Submitted link:', videoLink);
    // Add your analysis logic here
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

        {/* Divider line */}
        <View style={styles.divider}>
          <Text style={styles.dividerLabel}>–––––––––––– OR ––––––––––––</Text>
        </View>

        {/* Dropbox area with file types */}
        <TouchableOpacity 
          style={styles.dropbox}
          onPress={pickFile}
          disabled={isDownloading}
        >
          <MaterialIcons 
            name={isDownloading ? "hourglass-empty" : "cloud-upload"} 
            size={48} 
            color="#9b59b6" 
            style={styles.dropboxIcon} 
          />
          <Text style={styles.dropboxText}>
            {fileName || "Select video file to analyze"}
          </Text>
          <Text style={styles.fileTypesText}>
            Supported: MP4, MOV, AVI, 3GP
          </Text>
          {isDownloading && <Text style={styles.downloadingText}>Saving file...</Text>}
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