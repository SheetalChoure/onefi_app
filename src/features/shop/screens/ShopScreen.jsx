import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import { ShopTabNavigation } from '../components/ShopTabNavigation';
import { TopBrandsScreen } from './TopBrandsScreen';
import { NearbyStoresScreen } from './NearbyStoresScreen';
import { MarketplaceScreen, MARKETPLACE_PRODUCTS } from './MarketplaceScreen';
import { Colors } from '../../../theme/colors';


const { width } = Dimensions.get('window');

const ProductDetailView = ({ product, onBack }) => {
  const colorOptions = product.colorOptions || [];
  const storageOptions = product.storageOptions || [{ id: 'std', label: 'Standard', priceMultiplier: 1 }];

  const [selectedColor, setSelectedColor] = useState(colorOptions[0] || null);
  const [selectedStorage, setSelectedStorage] = useState(storageOptions[0] || null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const multiplier = selectedStorage?.priceMultiplier || 1;
  const currentPrice = Math.round(product.basePrice * multiplier);
  const originalPrice = product.originalPrice 
    ? Math.round(product.originalPrice * multiplier) 
    : Math.round(currentPrice * 1.1);
  const emiMonthly = Math.round(currentPrice / 12);

  return (
    <View style={styles.detailContainer}>
      {/* Header Bar */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>{product.category || 'Product Details'}</Text>
        <TouchableOpacity onPress={() => setIsWishlisted(!isWishlisted)}>
          <Text style={styles.wishlistIcon}>{isWishlisted ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Badges */}
        {product.badge && (
          <View style={styles.badgeRow}>
            <Text style={styles.tagBadge}>{product.badge}</Text>
          </View>
        )}

        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Title, Subtitle, Rating */}
        <View style={styles.section}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.subtitle}>{product.subtitle}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.stars}>★ {product.rating}</Text>
            <Text style={styles.ratingText}>({product.reviewsCount} reviews)</Text>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${currentPrice}</Text>
          <Text style={styles.originalPrice}>${originalPrice}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>Save ${originalPrice - currentPrice}</Text>
          </View>
        </View>

        {/* EMI Financing Box */}
        <View style={styles.emiCard}>
          <Text style={styles.emiTitle}>💳 Monthly Payment Plan</Text>
          <Text style={styles.emiText}>
            Pay as low as <Text style={styles.boldText}>${emiMonthly}/mo</Text> for 12 months with 0% APR.
          </Text>
        </View>

        {/* Dynamic Specifications */}
        {product.specs && product.specs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Specifications</Text>
            <View style={styles.specsContainer}>
              {product.specs.map((spec, index) => (
                <View key={index} style={styles.specRow}>
                  <Text style={styles.specLabel}>{spec.label}:</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Dynamic Color Selection */}
        {colorOptions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Color: <Text style={styles.selectedOptionText}>{selectedColor?.label}</Text>
            </Text>
            <View style={styles.optionRow}>
              {colorOptions.map((color) => {
                const isSelected = selectedColor?.id === color.id;
                return (
                  <TouchableOpacity
                    key={color.id}
                    style={[styles.colorSwatchBorder, isSelected && styles.activeColorBorder]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <View style={[styles.colorSwatch, { backgroundColor: color.code }]} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Dynamic Storage Selection */}
        {storageOptions.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Configuration: <Text style={styles.selectedOptionText}>{selectedStorage?.label}</Text>
            </Text>
            <View style={styles.gridRow}>
              {storageOptions.map((storage) => {
                const isSelected = selectedStorage?.id === storage.id;
                return (
                  <TouchableOpacity
                    key={storage.id}
                    style={[styles.storageCard, isSelected && styles.activeStorageCard]}
                    onPress={() => setSelectedStorage(storage)}
                  >
                    <Text style={[styles.storageText, isSelected && styles.activeStorageText]}>
                      {storage.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Bulleted Feature Highlights */}
        {product.features && product.features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            {product.features.map((feature, index) => (
              <Text key={index} style={styles.featureItem}>
                • {feature}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomTotalLabel}>Total Price</Text>
          <Text style={styles.bottomTotalPrice}>${currentPrice}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ShopScreen = () => {
  const [activeTab, setActiveTab] = useState('MARKETPLACE');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const selectedProduct = MARKETPLACE_PRODUCTS.find(
    (item) => item.id === selectedProductId
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedProduct ? (
        <ProductDetailView
          product={selectedProduct}
          onBack={() => setSelectedProductId(null)}
        />
      ) : (
        <>
          <ShopTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <View style={styles.content}>
            {activeTab === 'TOP_BRANDS' && <TopBrandsScreen />}
            {activeTab === 'NEARBY_STORES' && <NearbyStoresScreen />}
            {activeTab === 'MARKETPLACE' && (
              <MarketplaceScreen
                onSelectProduct={(id) => setSelectedProductId(id)}
              />
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors?.background || '#FAFAFA' },
  content: { flex: 1 },
  detailContainer: { flex: 1, backgroundColor: '#FAFAFA' },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#FFF',
  },
  detailHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  backButton: { paddingVertical: 4, paddingRight: 8 },
  backButtonText: { fontSize: 14, color: '#007AFF', fontWeight: '600' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  badgeRow: { flexDirection: 'row', marginBottom: 8 },
  tagBadge: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  wishlistIcon: { fontSize: 22 },
  imageContainer: { alignItems: 'center', marginVertical: 15, height: 240 },
  productImage: { width: width * 0.7, height: '100%' },
  section: { marginVertical: 10 },
  title: { fontSize: 24, fontWeight: '800', color: '#111' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4, lineHeight: 20 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  stars: { color: '#FFB800', fontSize: 14, fontWeight: '700', marginRight: 6 },
  ratingText: { fontSize: 13, color: '#777' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  currentPrice: { fontSize: 28, fontWeight: '800', color: '#000', marginRight: 10 },
  originalPrice: { fontSize: 18, color: '#999', textDecorationLine: 'line-through', marginRight: 10 },
  discountBadge: { backgroundColor: '#FFEBEE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  discountText: { color: '#C62828', fontSize: 12, fontWeight: '700' },
  emiCard: { backgroundColor: '#F0F4FF', padding: 14, borderRadius: 12, marginVertical: 10 },
  emiTitle: { fontSize: 14, fontWeight: '700', color: '#1A237E', marginBottom: 4 },
  emiText: { fontSize: 13, color: '#37474F' },
  boldText: { fontWeight: '700' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 10 },
  selectedOptionText: { fontWeight: '700', color: '#007AFF' },
  specsContainer: { backgroundColor: '#FFF', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#EAEAEA' },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  specLabel: { fontSize: 13, color: '#666', fontWeight: '600' },
  specValue: { fontSize: 13, color: '#111', fontWeight: '500', flexShrink: 1, textAlign: 'right' },
  optionRow: { flexDirection: 'row', gap: 12 },
  colorSwatchBorder: { width: 42, height: 42, borderRadius: 21, borderWidth: 2, borderColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
  activeColorBorder: { borderColor: '#007AFF' },
  colorSwatch: { width: 32, height: 32, borderRadius: 16 },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  storageCard: { flex: 1, minWidth: '45%', paddingVertical: 14, borderWidth: 1, borderColor: '#DDD', borderRadius: 10, alignItems: 'center', backgroundColor: '#FFF' },
  activeStorageCard: { borderColor: '#007AFF', backgroundColor: '#F0F7FF' },
  storageText: { fontSize: 14, fontWeight: '600', color: '#444' },
  activeStorageText: { color: '#007AFF', fontWeight: '700' },
  featureItem: { fontSize: 13, color: '#444', lineHeight: 20, marginBottom: 6 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 15, borderTopWidth: 1, borderColor: '#EEE', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bottomTotalLabel: { fontSize: 12, color: '#777' },
  bottomTotalPrice: { fontSize: 20, fontWeight: '800', color: '#000' },
  addToCartBtn: { backgroundColor: '#007AFF', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12 },
  addToCartText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});



