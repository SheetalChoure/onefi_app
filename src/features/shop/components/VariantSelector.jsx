import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Typography } from '../../../theme/typography';
import { Spacing } from '../../../theme/spacing';

export const VariantSelector = ({ variants, selectedVariant, onSelectVariant }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Variant</Text>
      <View style={styles.chipGroup}>
        {variants.map((v) => {
          const isSelected = selectedVariant?.id === v.id;
          return (
            <TouchableOpacity
              key={v.id}
              disabled={!v.inStock}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
                !v.inStock && styles.chipDisabled,
              ]}
              onPress={() => onSelectVariant(v)}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                  !v.inStock && styles.chipTextDisabled,
                ]}
              >
                {v.name} {!v.inStock ? '(Out of Stock)' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.lg },
  title: { ...Typography.bodyBold, color: Colors.textSecondary, marginBottom: Spacing.sm },
  chipGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  chipSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  chipDisabled: { backgroundColor: Colors.borderLight, borderColor: Colors.border },
  chipText: { ...Typography.caption, color: Colors.textSecondary },
  chipTextSelected: { ...Typography.captionBold, color: Colors.primary },
  chipTextDisabled: { color: Colors.textDisabled },
});