import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  
  // Header Styles
  header: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingTop: 60, // Increased top padding (from 40 to 60)
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#e0a8ff',
    textAlign: 'center',
  },

  // Centered Content
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },

  // Input Section
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0a8ff',
    borderRadius: 25,
    padding: 18,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#1a1a1a',
    marginRight: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 15,
    borderRadius: 25,
    borderWidth: 2, // Added border
    borderColor: '#e0a8ff', // Pink border
    backgroundColor: 'transparent', // Removed pink background
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonIcon: {
    color: '#000000', // Black icons
    fontSize: 20,
  },

  // Divider
  divider: {
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerText: {
    color: '#555',
    fontSize: 16,
    letterSpacing: 2,
  },
  dividerLabel: {
    color: '#e0a8ff',
    fontSize: 14,
    marginVertical: 5,
    fontWeight: 'bold',
  },

  // Dropbox Styles
  dropbox: {
    padding: 35,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e0a8ff',
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropboxIcon: {
    marginBottom: 15,
    color: '#e0a8ff',
  },
  dropboxText: {
    color: '#e0a8ff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  fileTypesText: {
    color: '#777',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },

  // Footer Styles
  footer: {
    marginTop: 'auto',
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 12,
  },
  downloadingText: {
    color: '#e0a8ff',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default styles;