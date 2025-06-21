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
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b700ff',
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
    borderColor: '#9b59b6',
    borderRadius: 25,
    padding: 15,
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
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#9b59b6',
  },

  // Divider - Now clearly visible
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
    color: '#9b59b6',
    fontSize: 14,
    marginVertical: 5,
    fontWeight: 'bold',
  },

  // Dropbox Styles
  dropbox: {
    padding: 30,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#9b59b6',
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropboxIcon: {
    marginBottom: 15,
  },
  dropboxText: {
    color: '#9b59b6',
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
    color: '#555',
    fontSize: 12,
  },
});

export default styles;