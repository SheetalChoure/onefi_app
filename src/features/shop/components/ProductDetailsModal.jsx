import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { VariantSelector } from './VariantSelector';
import { EmiPlanCard } from './EmiPlanCard';
import { formatINR } from '../../../utils/currencyFormatter';
import { Colors } from '../../../theme/colors';
import { Typography } from '../../../theme/typography';
import { Spacing } from '../../../theme/spacing';

export const ProductDetailsModal = ({ visible, product, onClose, onProceed }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmi, setSelectedEmi] = useState(null);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants.find((v) => v.inStock) || product.variants[0]);
      setSelectedEmi(product.emiPlans[0] || null);
    }
  }, [product]);

  if (!product) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{product.name}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              {product.highlights.map((h, i) => (
                <Text key={i} style={styles.bulletItem}>• {h}</Text>
              ))}
            </View>

            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Price:</Text>
              <Text style={styles.priceValue}>{formatINR(currentPrice)}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select EMI Plan</Text>
              {product.emiPlans.map((plan) => (
                <EmiPlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedEmi?.id === plan.id}
                  onSelect={setSelectedEmi}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, (!selectedVariant || !selectedEmi) && styles.buttonDisabled]}
              disabled={!selectedVariant || !selectedEmi}
              onPress={() => selectedVariant && selectedEmi && onProceed(selectedVariant, selectedEmi)}
            >
              <Text style={styles.buttonText}>
                Proceed with {selectedEmi ? formatINR(selectedEmi.monthlyInstallment) : ''}/mo
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'flex-end' },
  container: { backgroundColor: Colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '90%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  title: { ...Typography.h2, color: Colors.textPrimary },
  closeText: { ...Typography.h3, color: Colors.textMuted },
  body: { padding: Spacing.lg },
  section: { marginBottom: Spacing.lg },
  sectionTitle: { ...Typography.bodyBold, color: Colors.textSecondary, marginBottom: Spacing.sm },
  bulletItem: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.xs },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  priceLabel: { ...Typography.body, color: Colors.textMuted },
  priceValue: { ...Typography.h2, color: Colors.textPrimary },
  footer: { padding: Spacing.lg, borderTopWidth: 1, borderTopColor: Colors.borderLight },
  button: { backgroundColor: Colors.primary, paddingVertical: Spacing.md, borderRadius: Spacing.sm, alignItems: 'center' },
  buttonDisabled: { backgroundColor: Colors.textDisabled },
  buttonText: { ...Typography.bodyBold, color: Colors.surface },
});