import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { ShieldCheck, CreditCard, CheckCircle } from 'lucide-react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { useAuth } from '../store/AuthContext';
import { createBooking } from '../api/bookings';
import { createPaymentIntent } from '../api/payments';

export default function CheckoutScreen({ route, navigation }: any) {
  const { bag, total, startDate, endDate } = route.params;
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Identity, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.is_verified) {
      setStep(2);
    }
  }, [user]);

  const handleVerify = () => {
    setLoading(true);
    // In a real app, this would open a verification SDK (like Stripe Identity or Persona)
    // For this prototype, we simulate the submission
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Verification Submitted",
        "Your identity verification is being processed. In this demo, we've auto-approved you.",
        [{ text: "Continue", onPress: () => setStep(2) }]
      );
    }, 2000);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create the booking
      const booking = await createBooking({
        bag_id: bag.id,
        start_date: startDate,
        end_date: endDate || startDate // Backend should handle the 4-day rule too
      });

      // 2. Create the payment intent
      const paymentIntent = await createPaymentIntent(booking.id);

      // 3. (Simulate) Confirm Stripe payment using client_secret
      // In real app: await stripe.confirmPayment(paymentIntent.client_secret, ...)
      
      console.log('Payment Intent Created:', paymentIntent);

      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 1500);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Booking Failed', error.response?.data?.detail || 'Could not complete your reservation.');
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <View style={styles.successContainer}>
        <CheckCircle size={80} color={COLORS.success} />
        <Text style={styles.successTitle}>Reservation Confirmed</Text>
        <Text style={styles.successSubtitle}>
          Your {bag.brand} {bag.model} is reserved for {startDate}. 
          Our white-glove courier will contact you shortly.
        </Text>
        <TouchableOpacity 
          style={[styles.button, { width: '80%', marginTop: 40 }]}
          onPress={() => navigation.navigate('Main', { screen: 'Browse' })}
        >
          <Text style={styles.buttonText}>BACK TO BROWSE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressItem, step >= 1 && styles.progressActive]}>
          <Text style={styles.progressText}>Identity</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={[styles.progressItem, step >= 2 && styles.progressActive]}>
          <Text style={styles.progressText}>Payment</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 ? (
          <View>
            <View style={styles.iconCircle}>
              <ShieldCheck size={40} color={COLORS.champagneGold} />
            </View>
            <Text style={styles.title}>Identity Verification</Text>
            <Text style={styles.description}>
              To maintain the exclusivity and security of The Vault, we require a one-time identity verification.
            </Text>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>• Government Issued ID</Text>
              <Text style={styles.infoText}>• Live Selfie Match</Text>
              <Text style={styles.infoText}>• Secure Encryption</Text>
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleVerify}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>START VERIFICATION</Text>}
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.iconCircle}>
              <CreditCard size={40} color={COLORS.champagneGold} />
            </View>
            <Text style={styles.title}>Secure Payment</Text>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTotal}>Total Amount: ${total.toFixed(2)}</Text>
              <Text style={styles.summaryDetail}>Includes refundable deposit</Text>
            </View>
            
            {/* Stripe Card Element Placeholder */}
            <View style={styles.cardPlaceholder}>
              <Text style={styles.cardText}>Card Details (Stripe Element)</Text>
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={handlePayment}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>PAY & RESERVE</Text>}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ivoryCream,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
  progressItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  progressActive: {
    backgroundColor: COLORS.deepOnyx,
  },
  progressText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
    color: COLORS.softSlate,
  },
  progressLine: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 8,
  },
  content: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    alignSelf: 'center',
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    color: COLORS.deepOnyx,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: COLORS.softSlate,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  infoBox: {
    width: '100%',
    backgroundColor: COLORS.pureWhite,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.xxl,
  },
  infoText: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.deepOnyx,
    marginBottom: 8,
  },
  button: {
    backgroundColor: COLORS.deepOnyx,
    width: '100%',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 14,
    color: COLORS.pureWhite,
    letterSpacing: 1,
  },
  cardPlaceholder: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.pureWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: SPACING.xl,
  },
  cardText: {
    color: COLORS.softSlate,
    fontFamily: FONTS.body,
  },
  summaryBox: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 20,
    color: COLORS.deepOnyx,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    backgroundColor: COLORS.ivoryCream,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  successTitle: {
    fontFamily: FONTS.heading,
    fontSize: 32,
    color: COLORS.deepOnyx,
    marginTop: 24,
    textAlign: 'center',
  },
  summaryContainer: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  summaryTotal: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 22,
    color: COLORS.deepOnyx,
  },
  summaryDetail: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.softSlate,
    marginTop: 4,
  },
});
