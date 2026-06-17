import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { ChevronDown, Filter } from 'lucide-react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { getBags } from '../api/inventory';

// Tiers based on business plan
const TIER_COLORS: Record<string, string> = {
  'Iconic': '#D4AF37', // Gold
  'Premium': '#1A1A1A', // Deep Onyx
  'Contemporary': '#707070', // Soft Slate
};

const FilterButton = ({ label }: { label: string }) => (
  <TouchableOpacity style={styles.filterButton}>
    <Text style={styles.filterButtonText}>{label}</Text>
    <ChevronDown size={14} color={COLORS.softSlate} />
  </TouchableOpacity>
);

export default function BrowseScreen({ navigation }: any) {
  const [bags, setBags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await getBags();
      
      // Map backend data to frontend format
      const formattedBags = data.items.map((item: any) => ({
        id: item.id,
        brand: item.brand,
        model: item.model,
        tier: item.rental_price_per_day > 150 ? 'Iconic' : item.rental_price_per_day > 80 ? 'Premium' : 'Contemporary',
        price: item.rental_price_per_day * 4, // 4-day rental period
        image: item.images && item.images.length > 0 
          ? item.images[0].url 
          : 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400', // Placeholder
        description: item.description,
        dimensions: item.size_info || 'Standard size',
      }));

      setBags(formattedBags);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Booking', { 
        screen: 'BagDetail', 
        params: { bagId: item.id, bag: item } 
      })}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={[styles.tierBadge, { backgroundColor: TIER_COLORS[item.tier] || COLORS.deepOnyx }]}>
          <Text style={styles.tierText}>{item.tier}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.cardInfo}>
        <Text style={styles.brandName}>{item.brand}</Text>
        <Text style={styles.bagName}>{item.model}</Text>
        <Text style={styles.price}>
          <Text style={styles.priceValue}>${item.price}</Text> / 4 days
        </Text>
      </View>
    </TouchableOpacity>
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
      <View style={styles.header}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          <FilterButton label="Brand" />
          <FilterButton label="Color" />
          <FilterButton label="Size" />
          <FilterButton label="Price" />
        </ScrollView>
      </View>

      <FlatList
        data={bags}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: COLORS.ivoryCream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.ivoryCream,
    borderBottomWidth: 0,
    paddingVertical: SPACING.md,
  },
  filterContainer: {
    flexGrow: 0,
  },
  filterContent: {
    paddingHorizontal: SPACING.md,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(26, 26, 26, 0.1)',
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: COLORS.pureWhite,
  },
  filterButtonText: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.deepOnyx,
    marginRight: 4,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  card: {
    width: '48%',
    backgroundColor: COLORS.pureWhite,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: COLORS.deepOnyx,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 0.9,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tierBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tierText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 10,
    color: COLORS.pureWhite,
    textTransform: 'uppercase',
  },
  cardInfo: {
    padding: 12,
  },
  brandName: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.softSlate,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bagName: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 15,
    color: COLORS.deepOnyx,
    marginTop: 2,
  },
  price: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: COLORS.softSlate,
    marginTop: 6,
  },
  priceValue: {
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.deepOnyx,
    fontSize: 15,
  },
});
