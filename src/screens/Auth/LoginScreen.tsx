import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { useAuth } from '../../store/AuthContext';
import { login as apiLogin } from '../../api/auth';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState('test@thevault.com');
  const [password, setPassword] = useState('test123!');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      await login(data.access_token);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Failed', error.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Vault</Text>
      <Text style={styles.subtitle}>ACCESS THE INACCESSIBLE</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.pureWhite} />
          ) : (
            <Text style={styles.buttonText}>SIGN IN</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        onPress={() => navigation.navigate('Register')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Don't have an account? Request Access</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ivoryCream,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 48,
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
