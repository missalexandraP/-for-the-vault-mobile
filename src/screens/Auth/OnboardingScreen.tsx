import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../../constants/theme';

export default function OnboardingScreen({ navigation }: any) {
  const [invitationCode, setInvitationCode] = useState('');

  const handleEnter = () => {
    if (invitationCode.trim()) {
      // For now just navigate to Login
      navigation.navigate('Login');
    } else {
      alert('Please enter a valid invitation code');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Background image could be used here */}
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandTitle}>THE VAULT</Text>
          <Text style={styles.tagline}>Access the inaccessible.</Text>

          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.form}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter Invitation Code"
              placeholderTextColor={COLORS.softSlate}
              value={invitationCode}
              onChangeText={setInvitationCode}
              autoCapitalize="characters"
              autoCorrect={false}
            />

            <TouchableOpacity 
              style={styles.button}
              onPress={handleEnter}
            >
              <Text style={styles.buttonText}>ENTER</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ivoryCream,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  welcomeText: {
    fontFamily: FONTS.body,
    fontSize: 18,
    color: COLORS.deepOnyx,
    marginBottom: SPACING.sm,
  },
  brandTitle: {
    fontFamily: FONTS.heading,
    fontSize: 48,
    color: COLORS.deepOnyx,
    letterSpacing: 4,
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: COLORS.softSlate,
    marginBottom: SPACING.xxl,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.champagneGold,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    fontFamily: FONTS.body,
    fontSize: 16,
    color: COLORS.deepOnyx,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.champagneGold,
    borderRadius: 30, // Rounded button as per mockup
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.deepOnyx,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 18,
    color: COLORS.pureWhite,
    letterSpacing: 2,
  },
});
