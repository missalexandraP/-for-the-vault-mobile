import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { getMyBookings } from '../api/bookings';
import { Package, Clock, CheckCircle2 } from 'lucide-react-native';

export default function OrdersScreen() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return COLORS.success;
      case 'pending': return COLORS.champagneGold;
      default: return COLORS.softSlate;
    }
  };

  const renderBooking = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.statusBadge}>
          <Clock size={14} color={getStatusColor(item.status)} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.dateText}>{new Date(item.start_date).toLocaleDateString()}</Text>
      </View>

      <View style={styles.cardBody}>
        <Image 
          source={{ uri: item.bag?.images?.[0]?.url || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=200' }} 
          style={styles.bagThumb} 
        />
        <View style={styles.bagInfo}>
          <Text style={styles.bagName}>{item.bag?.brand} {item.bag?.model}</Text>
          <Text style={styles.priceText}>Total: ${item.total_amount}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.champagneGold} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Package size={60} color={COLORS.softSlate} opacity={0.3} />
            <Text style={styles.emptyTitle}>No Reservations Yet</Text>
            <Text style={styles.emptySubtitle}>Your luxury journey begins when you reserve your first piece.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ivoryCream,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.ivoryCream,
  },
  listContent: {
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 12,
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  dateText: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.softSlate,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bagThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: COLORS.ivoryCream,
  },
  bagInfo: {
    marginLeft: 16,
    flex: 1,
  },
  bagName: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 16,
    color: COLORS.deepOnyx,
  },
  priceText: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.softSlate,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    paddingHorizontal: SPACING.xxl,
  },
  emptyTitle: {
    fontFamily: FONTS.heading,
    fontSize: 24,
    color: COLORS.deepOnyx,
    marginTop: 20,
  },
  emptySubtitle: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: COLORS.softSlate,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});
