// ProductCard.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { formatINR } from '../../../utils/currencyFormatter';
import { Colors } from '../../../theme/colors';
import { Typography } from '../../../theme/typography';
import { Spacing } from '../../../theme/spacing';

export const ProductCard = ({ product, onSelect }) => {
  if (!product) return null;

  // Property normalized fallbacks across schema variants
  const imageSource = product.image || product.imageUrl || 'https://via.placeholder.com/150';
  const brandName = product.brand || product.category || 'Brand';
  const productName = product.title || product.name || 'Untitled Product';
  
  // Safe price calculations
  const priceValue = product.basePrice ?? product.price ?? 0;
  const emiValue = product.startingEmi ?? (priceValue ? Math.round(priceValue / 12) : 0);

  const handlePress = () => {
    if (typeof onSelect === 'function') {
      onSelect(product);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <Image
        source={{ uri: imageSource }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.details}>
        <Text style={styles.brand}>{brandName}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {productName}
        </Text>
        <Text style={styles.price}>{formatINR(priceValue)}</Text>

        <View style={styles.emiBadge}>
          <Text style={styles.emiText}>
            EMI from <Text style={styles.emiHighlight}>{formatINR(emiValue)}/mo</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: Spacing?.xs || 4,
    backgroundColor: Colors?.surface || '#FFFFFF',
    borderRadius: Spacing?.md || 12,
    padding: Spacing?.md || 12,
    borderWidth: 1,
    borderColor: Colors?.border || '#E5E5EA',
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 120,
    marginBottom: Spacing?.sm || 8,
  },
  details: { flex: 1 },
  brand: {
    ...(Typography?.badge || {}),
    color: Colors?.textMuted || '#8E8E93',
    textTransform: 'uppercase',
  },
  name: {
    ...(Typography?.bodyBold || {}),
    color: Colors?.textPrimary || '#1C1C1E',
    marginVertical: 2,
  },
  price: {
    ...(Typography?.h3 || {}),
    color: Colors?.textPrimary || '#1C1C1E',
    marginVertical: Spacing?.xs || 4,
  },
  emiBadge: {
    backgroundColor: Colors?.primaryLight || '#F0F4FF',
    paddingVertical: Spacing?.xs || 4,
    paddingHorizontal: Spacing?.sm || 8,
    borderRadius: Spacing?.xs || 4,
    alignSelf: 'flex-start',
  },
  emiText: {
    ...(Typography?.caption || {}),
    color: Colors?.primary || '#007AFF',
  },
  emiHighlight: {
    ...(Typography?.captionBold || {}),
  },
});