import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator,
  Alert,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { register } from '../../api/auth';
import { useAuth } from '../../store/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.full_name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await register(formData);
      // Auto-login after registration or navigate to login
      Alert.alert(
        "Account Created",
        "Your account has been successfully created. Please sign in.",
        [{ text: "OK", onPress: () => navigation.navigate('Login') }]
      );
    } catch (error: any) {
      console.error(error);
      Alert.alert('Registration Failed', error.response?.data?.detail || 'Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Join The Vault</Text>
        <Text style={styles.subtitle}>REQUEST YOUR EXCLUSIVE ACCESS</Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.full_name}
            onChangeText={(text) => setFormData({ ...formData, full_name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />
          
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.pureWhite} />
            ) : (
              <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            )}
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          style={styles.link}
        >
          <Text style={styles.linkText}>Already have access? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ivoryCream,
  },
  scrollContent: {
    alignItems: 'center',
    padding: SPACING.xl,
    paddingTop: 100,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 32,
    color: COLORS.deepOnyx,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
    color: COLORS.champagneGold,
    letterSpacing: 3,
    marginBottom: SPACING.xxl,
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.pureWhite,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: SPACING.md,
    fontFamily: FONTS.body,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.deepOnyx,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: SPACING.md,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.pureWhite,
    fontSize: 16,
    letterSpacing: 1,
  },
  link: {
    marginTop: SPACING.xl,
  },
  linkText: {
    fontFamily: FONTS.body,
    color: COLORS.softSlate,
    fontSize: 14,
  },
});
