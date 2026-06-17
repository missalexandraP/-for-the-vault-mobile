import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLORS, FONTS, SPACING } from '../constants/theme';

export default function CalendarScreen({ route, navigation }: any) {
  const { bag } = route.params;
  const [selectedRange, setSelectedRange] = useState<any>({});
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const onDayPress = (day: any) => {
    if (!startDate || (startDate && Object.keys(selectedRange).length >= 4)) {
      // Start new selection
      setStartDate(day.dateString);
      
      // Auto-select 4 day range (business rule)
      const range: any = {};
      const date = new Date(day.dateString);
      let endDs = "";
      for (let i = 0; i < 4; i++) {
        const d = new Date(date);
        d.setDate(date.getDate() + i);
        const ds = d.toISOString().split('T')[0];
        if (i === 3) endDs = ds;
        range[ds] = {
          selected: true,
          color: COLORS.champagneGold,
          startingDay: i === 0,
          endingDay: i === 3,
          textColor: COLORS.pureWhite
        };
      }
      setSelectedRange(range);
      setEndDate(endDs);
    }
  };

  const subtotal = bag.price;
  const insurance = 45;
  const delivery = 25;
  const deposit = bag.deposit_amount || 0;
  const total = subtotal + insurance + delivery + deposit;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Select Dates</Text>
          <Text style={styles.subtitle}>All rentals are for a fixed 4-day period.</Text>
          
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={selectedRange}
              markingType={'period'}
              theme={{
                selectedDayBackgroundColor: COLORS.champagneGold,
                selectedDayTextColor: COLORS.pureWhite,
                todayTextColor: COLORS.champagneGold,
                arrowColor: COLORS.deepOnyx,
                monthTextColor: COLORS.deepOnyx,
                textDayFontFamily: FONTS.body,
                textMonthFontFamily: FONTS.heading,
                textDayHeaderFontFamily: FONTS.bodyMedium,
              }}
            />
          </View>

          <View style={styles.bagSummary}>
            <Image source={{ uri: bag.image }} style={styles.bagThumb} />
            <View>
              <Text style={styles.bagName}>{bag.brand} {bag.model}</Text>
              <Text style={styles.bagPrice}>${bag.price} per period</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Rental Fee (4 Days)</Text>
            <Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Insurance (Mandatory)</Text>
            <Text style={styles.priceValue}>${insurance.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>White Glove Delivery</Text>
            <Text style={styles.priceValue}>${delivery.toFixed(2)}</Text>
          </View>

          {deposit > 0 && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Security Deposit (Refundable)</Text>
              <Text style={styles.priceValue}>${deposit.toFixed(2)}</Text>
            </View>
          )}

          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, !startDate && styles.buttonDisabled]}
          onPress={() => navigation.navigate('Checkout', { bag, total, startDate, endDate })}
          disabled={!startDate}
        >
          <Text style={styles.buttonText}>PROCEED TO CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ivoryCream,
  },
  content: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontFamily: FONTS.heading,
    fontSize: 24,
    color: COLORS.deepOnyx,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.softSlate,
    marginBottom: SPACING.lg,
  },
  calendarContainer: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: 12,
    padding: 8,
    marginBottom: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  bagSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  bagThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: COLORS.pureWhite,
    marginRight: 16,
  },
  bagName: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 16,
    color: COLORS.deepOnyx,
  },
  bagPrice: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.softSlate,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: SPACING.lg,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.softSlate,
  },
  priceValue: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 14,
    color: COLORS.deepOnyx,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  totalLabel: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 18,
    color: COLORS.deepOnyx,
  },
  totalValue: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 18,
    color: COLORS.deepOnyx,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.ivoryCream,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  button: {
    backgroundColor: COLORS.deepOnyx,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.softSlate,
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 14,
    color: COLORS.pureWhite,
    letterSpacing: 1,
  },
});
