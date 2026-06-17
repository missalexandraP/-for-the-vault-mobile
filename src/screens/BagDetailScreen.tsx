import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { CheckCircle2, ChevronLeft, Heart, Share2 } from 'lucide-react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

export default function BagDetailScreen({ route, navigation }: any) {
  const { bag } = route.params || {
    bag: {
      id: '1',
      brand: 'Chanel',
      model: 'Classic Flap',
      price: 450,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600',
      description: 'A timeless and iconic handbag, the Chanel Classic Flap features a quilted leather design, gold-tone hardware, and a chain-link strap.',
      dimensions: '10" x 6" x 2.5"',
      tier: 'Iconic'
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Actions */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <ChevronLeft color={COLORS.deepOnyx} size={24} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Share2 color={COLORS.deepOnyx} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]}>
              <Heart color={COLORS.deepOnyx} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bag Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: bag.image }} style={styles.image} resizeMode="contain" />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.authBadge}>
            <CheckCircle2 color={COLORS.champagneGold} size={20} fill={COLORS.ivoryCream} />
            <Text style={styles.authText}>AUTHENTICITY GUARANTEED</Text>
          </View>

          <Text style={styles.title}>{bag.brand} {bag.model}</Text>
          <Text style={styles.price}>${bag.price} / 4 Days</Text>

          <Text style={styles.description}>
            {bag.description || 'A timeless and iconic handbag, the Chanel Classic Flap features a quilted leather design, gold-tone hardware, and a chain-link strap.'}
          </Text>

          <View style={styles.specsContainer}>
            <Text style={styles.specLabel}>DIMENSIONS</Text>
            <Text style={styles.specValue}>{bag.dimensions || '10" x 6" x 2.5"'}</Text>
          </View>
          
          <View style={styles.specsContainer}>
            <Text style={styles.specLabel}>TIER</Text>
            <Text style={styles.specValue}>{bag.tier}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <SafeAreaView style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Calendar', { bagId: bag.id, bag })}
        >
          <Text style={styles.buttonText}>RESERVE NOW</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ivoryCream,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  content: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  authBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  authText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
    color: COLORS.deepOnyx,
    letterSpacing: 1,
    marginLeft: 8,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 32,
    color: COLORS.deepOnyx,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  price: {
    fontFamily: FONTS.body,
    fontSize: 22,
    color: COLORS.deepOnyx,
    marginBottom: SPACING.lg,
  },
  description: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: COLORS.softSlate,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  specsContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  specLabel: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 12,
    color: COLORS.deepOnyx,
    letterSpacing: 2,
    marginBottom: 4,
  },
  specValue: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: COLORS.softSlate,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.ivoryCream,
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  button: {
    backgroundColor: COLORS.champagneGold,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 16,
    color: COLORS.pureWhite,
    letterSpacing: 2,
  },
});
