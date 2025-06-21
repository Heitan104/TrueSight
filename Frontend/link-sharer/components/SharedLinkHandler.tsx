import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

// Define the expected shape of a shared file
type SharedFile = {
  weblink?: string;
  filePath?: string;
  fileName?: string;
  mimeType?: string;
  contentUri?: string;
};

const SharedLinkHandler = () => {
  const [sharedLink, setSharedLink] = useState('');

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (files: SharedFile[]) => {
        if (files.length > 0) {
          const link = files[0]?.weblink || '';
          setSharedLink(link);
          Alert.alert('Received Link', link);
        }
      },
      (error: Error) => {
        console.error('Sharing error:', error);
      },
      'com.heitan104.linksharer' // <- Replace this with your actual Android package name (e.g., com.kpanesar.truesight)
    );

    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shared Link:</Text>
      <Text style={styles.link}>{sharedLink || 'No link received yet.'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  link: { marginTop: 10, color: '#9b59b6', fontSize: 16 },
});

export default SharedLinkHandler;
