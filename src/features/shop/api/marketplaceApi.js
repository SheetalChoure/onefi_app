import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useMarketplace } from '../hooks/useMarketplace';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { Colors } from '../../../theme/colors';
import { Typography } from '../../../theme/typography';
import { Spacing } from '../../../theme/spacing';
import { formatINR } from '../../../utils/currencyFormatter';

export const MARKETPLACE_PRODUCTS = [
  {
    id: 'prod-iphone-15-pro',
    title: 'iPhone 15 Pro',
    subtitle: 'Titanium design, A17 Pro chip, Action button',
    category: 'Smartphones',
    basePrice: 999,
    originalPrice: 1099,
    rating: 4.9,
    reviewsCount: 1240,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    colorOptions: [
      { id: 'titanium', label: 'Natural Titanium', code: '#8A8682' },
      { id: 'blue', label: 'Blue Titanium', code: '#2B3340' },
      { id: 'white', label: 'White Titanium', code: '#F2F1EC' },
      { id: 'black', label: 'Black Titanium', code: '#3C3B3D' },
    ],
    storageOptions: [
      { id: '128gb', label: '128GB', priceMultiplier: 1 },
      { id: '256gb', label: '256GB', priceMultiplier: 1.1 },
      { id: '512gb', label: '512GB', priceMultiplier: 1.25 },
      { id: '1tb', label: '1TB', priceMultiplier: 1.45 },
    ],
    specs: [
      { label: 'Display', value: '6.1-inch Super Retina XDR OLED' },
      { label: 'Chip', value: 'A17 Pro with 6-core GPU' },
      { label: 'Camera', value: '48MP Main | 12MP Ultra Wide | 3x Telephoto' },
      { label: 'Battery Life', value: 'Up to 23 hours video playback' },
      { label: 'Connector', value: 'USB-C (USB 3 support)' },
    ],
    features: [
      'Forged in Grade 5 Titanium for lightweight strength',
      'Customizable Action Button for instant shortcuts',
      'Pro-class GPU brings console-quality mobile games to life',
    ],
  },
  {
    id: 'prod-macbook-pro-16',
    title: 'MacBook Pro 16"',
    subtitle: 'M3 Max chip, 36GB Unified Memory, Liquid Retina XDR',
    category: 'Laptops',
    basePrice: 2499,
    originalPrice: 2699,
    rating: 4.95,
    reviewsCount: 842,
    badge: 'Pro Performance',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    colorOptions: [
      { id: 'space-black', label: 'Space Black', code: '#2E2F31' },
      { id: 'silver', label: 'Silver', code: '#E2E3E5' },
    ],
    storageOptions: [
      { id: '512gb', label: '512GB SSD', priceMultiplier: 1 },
      { id: '1tb', label: '1TB SSD', priceMultiplier: 1.15 },
      { id: '2tb', label: '2TB SSD', priceMultiplier: 1.35 },
    ],
    specs: [
      { label: 'Processor', value: 'Apple M3 Max (14-core CPU, 30-core GPU)' },
      { label: 'Display', value: '16.2" Liquid Retina XDR (3456 x 2234)' },
      { label: 'Memory', value: '36GB Unified Memory' },
      { label: 'Ports', value: '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3' },
      { label: 'Battery Life', value: 'Up to 22 hours' },
    ],
    features: [
      'Extreme dynamic range with 1,000 nits sustained XDR brightness',
      'Hardware-accelerated ray tracing for realistic render performance',
      'Studio-quality six-speaker sound system with Spatial Audio',
    ],
  },
  {
    id: 'prod-sony-wh1000xm5',
    title: 'Sony WH-1000XM5',
    subtitle: 'Industry-leading noise canceling wireless headphones',
    category: 'Audio',
    basePrice: 399,
    originalPrice: 449,
    rating: 4.8,
    reviewsCount: 3120,
    badge: 'Editor’s Choice',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    colorOptions: [
      { id: 'black', label: 'Black', code: '#1A1A1A' },
      { id: 'silver', label: 'Silver', code: '#D1D1D1' },
      { id: 'midnight-blue', label: 'Midnight Blue', code: '#1E2838' },
    ],
    storageOptions: [
      { id: 'standard', label: 'Standard Edition', priceMultiplier: 1 },
    ],
    specs: [
      { label: 'Driver Unit', value: '30mm carbon fiber dome' },
      { label: 'Noise Cancellation', value: 'Dual Processors (V1 + QN1)' },
      { label: 'Microphones', value: '8 beamforming mics with AI noise isolation' },
      { label: 'Battery Life', value: '30 hours (ANC On) / 40 hours (ANC Off)' },
      { label: 'Weight', value: '250 grams' },
    ],
    features: [
      'Auto NC Optimizer automatically adjusts cancellation based on environment',
      'Speak-to-Chat automatically pauses music when you begin talking',
      'Ultra-fast charging: 3 mins gives 3 hours of playback',
    ],
  },
  {
    id: 'prod-ipad-pro-129',
    title: 'iPad Pro 12.9"',
    subtitle: 'M2 chip, Liquid Retina XDR display, Apple Pencil Hover',
    category: 'Tablets',
    basePrice: 1099,
    originalPrice: 1199,
    rating: 4.85,
    reviewsCount: 950,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    colorOptions: [
      { id: 'space-gray', label: 'Space Gray', code: '#53555B' },
      { id: 'silver', label: 'Silver', code: '#E2E3E5' },
    ],
    storageOptions: [
      { id: '128gb', label: '128GB', priceMultiplier: 1 },
      { id: '256gb', label: '256GB', priceMultiplier: 1.1 },
      { id: '512gb', label: '512GB', priceMultiplier: 1.25 },
      { id: '1tb', label: '1TB (16GB RAM)', priceMultiplier: 1.5 },
    ],
    specs: [
      { label: 'Display', value: '12.9" mini-LED Liquid Retina XDR' },
      { label: 'Processor', value: 'Apple M2 8-core CPU' },
      { label: 'Camera', value: '12MP Wide & 10MP Ultra Wide with LiDAR' },
      { label: 'Cellular', value: 'Wi-Fi 6E + Optional 5G' },
    ],
    features: [
      'ProMotion technology with 120Hz adaptive refresh rate',
      'Pencil Hover senses tip up to 12mm above screen',
      'Thunderbolt / USB 4 port for connecting external 6K displays',
    ],
  },
  {
    id: 'prod-apple-watch-ultra',
    title: 'Apple Watch Ultra 2',
    subtitle: 'Rugged titanium case, precision dual-frequency GPS',
    category: 'Wearables',
    basePrice: 799,
    originalPrice: 849,
    rating: 4.9,
    reviewsCount: 630,
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
    colorOptions: [
      { id: 'titanium-natural', label: 'Natural Titanium', code: '#B0B2B5' },
    ],
    storageOptions: [
      { id: '64gb', label: '64GB GPS + Cellular', priceMultiplier: 1 },
    ],
    specs: [
      { label: 'Case Size', value: '49mm Aerospace-grade Titanium' },
      { label: 'Display', value: 'Always-On Retina, up to 3000 nits peak' },
      { label: 'Water Resistance', value: '100m (EN13319 dive rated)' },
      { label: 'Battery Life', value: 'Up to 36 hours (72 hours in Low Power Mode)' },
    ],
    features: [
      'Customizable Action button in high-contrast international orange',
      'Precision Dual-Frequency GPS for tracking density and distance',
      'Depth gauge with water temperature sensor for diving',
    ],
  },
  {
    id: 'prod-samsung-s24-ultra',
    title: 'Samsung Galaxy S24 Ultra',
    subtitle: 'Galaxy AI, Titanium Frame, 200MP Camera System',
    category: 'Smartphones',
    basePrice: 1299,
    originalPrice: 1399,
    rating: 4.75,
    reviewsCount: 1540,
    badge: 'Top Android',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
    colorOptions: [
      { id: 'titanium-gray', label: 'Titanium Gray', code: '#6D6E72' },
      { id: 'titanium-black', label: 'Titanium Black', code: '#2C2B29' },
      { id: 'titanium-violet', label: 'Titanium Violet', code: '#4B4254' },
      { id: 'titanium-yellow', label: 'Titanium Yellow', code: '#E5DAAE' },
    ],
    storageOptions: [
      { id: '256gb', label: '256GB', priceMultiplier: 1 },
      { id: '512gb', label: '512GB', priceMultiplier: 1.15 },
      { id: '1tb', label: '1TB', priceMultiplier: 1.35 },
    ],
    specs: [
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X, QHD+' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3 for Galaxy' },
      { label: 'Camera', value: '200MP Main | 50MP Periscope | 12MP Ultra Wide' },
      { label: 'S-Pen', value: 'Integrated built-in stylus' },
    ],
    features: [
      'Live Translate and Circle to Search powered by Galaxy AI',
      'Corning Gorilla Armor reduces reflections by up to 75%',
      'ProVisual Engine boosts low-light nightography photography',
    ],
  },
  {
    id: 'prod-dji-mavic-3-pro',
    title: 'DJI Mavic 3 Pro',
    subtitle: 'Triple-camera flagship drone with Hasselblad optics',
    category: 'Cameras',
    basePrice: 2199,
    originalPrice: 2399,
    rating: 4.91,
    reviewsCount: 410,
    badge: 'Professional',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800',
    colorOptions: [
      { id: 'dark-gray', label: 'Matte Gray', code: '#424549' },
    ],
    storageOptions: [
      { id: 'fly-more', label: 'Fly More Combo (8GB)', priceMultiplier: 1 },
      { id: 'cine-combo', label: 'Cine Premium (1TB SSD)', priceMultiplier: 1.8 },
    ],
    specs: [
      { label: 'Primary Camera', value: '4/3 CMOS Hasselblad 20MP' },
      { label: 'Tele Cameras', value: '70mm Medium Tele & 166mm Tele' },
      { label: 'Flight Time', value: 'Up to 43 minutes' },
      { label: 'Transmission', value: 'DJI O3+ 15km HD Video' },
    ],
    features: [
      'Omnidirectional obstacle sensing with APAS 5.0 trajectory calculation',
      'Supports 5.1K Apple ProRes encoding across all three cameras',
      'Waypoints Flight & Cruise Control for repeatable automated paths',
    ],
  },
  {
    id: 'prod-dell-xps-15',
    title: 'Dell XPS 15',
    subtitle: '13th Gen Intel i9, RTX 4070, 3.5K OLED Touch',
    category: 'Laptops',
    basePrice: 1899,
    originalPrice: 2099,
    rating: 4.7,
    reviewsCount: 780,
    badge: 'Creator Gear',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
    colorOptions: [
      { id: 'platinum-silver', label: 'Platinum Silver', code: '#C5C6C8' },
    ],
    storageOptions: [
      { id: '512gb', label: '512GB SSD', priceMultiplier: 1 },
      { id: '1tb', label: '1TB SSD', priceMultiplier: 1.12 },
      { id: '2tb', label: '2TB SSD', priceMultiplier: 1.28 },
    ],
    specs: [
      { label: 'Display', value: '15.6" 3.5K (3456 x 2160) OLED Touch' },
      { label: 'CPU', value: 'Intel Core i9-13900H (14-Core)' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 4070 8GB GDDR6' },
      { label: 'RAM', value: '32GB DDR5-4800MHz' },
    ],
    features: [
      'Precision CNC machined aluminum chassis with carbon fiber palm rest',
      'Quad-speaker sound design tuned by Waves MaxxAudio Pro',
      '100% DCI-P3 color coverage for studio-accurate color work',
    ],
  },
];

export const fetchMarketplaceProducts = async () => {
  return MARKETPLACE_PRODUCTS;
};

export const MarketplaceScreen = ({ onSelectProduct }) => {
  const { products, loading, error, selectedProduct, setSelectedProduct, refetch } = useMarketplace();

  const handleProductPress = (product) => {
    if (onSelectProduct) {
      onSelectProduct(product.id);
    } else {
      setSelectedProduct(product);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const listData = products && products.length > 0 ? products : MARKETPLACE_PRODUCTS;

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard product={item} onSelect={() => handleProductPress(item)} />
        )}
        contentContainerStyle={styles.listPadding}
      />

      <ProductDetailsModal
        visible={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onProceed={(variant, plan) => {
          const product = selectedProduct;
          setSelectedProduct(null);
          Alert.alert(
            'Checkout',
            `Proceeding for ${product?.title || product?.name} (${variant?.name || 'Standard'}) with EMI of ${formatINR(
              plan?.monthlyInstallment || 0
            )}/mo`
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.lg },
  listPadding: { padding: Spacing.xs },
  errorText: { ...Typography.body, color: Colors.textMuted, marginBottom: Spacing.md },
  retryButton: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: Spacing.xs },
  retryText: { ...Typography.bodyBold, color: Colors.surface },
});
