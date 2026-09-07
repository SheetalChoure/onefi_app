import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatINR } from '../../../utils/currencyFormatter';
import { Colors } from '../../../theme/colors';
import { Typography } from '../../../theme/typography';
import { Spacing } from '../../../theme/spacing';

export const EmiPlanCard = ({ plan, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onSelect(plan)}
    >
      <View style={styles.header}>
        <Text style={styles.tenure}>{plan.tenureMonths} Months</Text>
        {plan.isNoCost && (
          <View style={styles.noCostBadge}>
            <Text style={styles.noCostText}>NO COST EMI</Text>
          </View>
        )}
      </View>
      <Text style={styles.amount}>
        {formatINR(plan.monthlyInstallment)}
        <Text style={styles.perMonth}>/mo</Text>
      </Text>
      <Text style={styles.meta}>
        Interest: {plan.interestRate}% | Processing Fee: {formatINR(plan.processingFee)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.sm,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.surfaceSecondary,
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tenure: { ...Typography.bodyBold, color: Colors.textPrimary },
  noCostBadge: {
    backgroundColor: Colors.badgeBg,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: Spacing.xs,
  },
  noCostText: { ...Typography.badge, color: Colors.badgeText },
  amount: { ...Typography.h3, color: Colors.primary, marginTop: Spacing.xs },
  perMonth: { ...Typography.caption, color: Colors.textMuted },
  meta: { ...Typography.caption, color: Colors.textMuted, marginTop: Spacing.xs },
});