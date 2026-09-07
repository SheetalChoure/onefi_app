import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Typography } from '../../../theme/typography';
import { Spacing } from '../../../theme/spacing';

export const ShopTabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === 'TOP_BRANDS' && styles.activeTab]}
        onPress={() => onTabChange('TOP_BRANDS')}
      >
        <Text style={[styles.tabText, activeTab === 'TOP_BRANDS' && styles.activeTabText]}>
          Top Brands
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabItem, activeTab === 'NEARBY_STORES' && styles.activeTab]}
        onPress={() => onTabChange('NEARBY_STORES')}
      >
        <Text style={[styles.tabText, activeTab === 'NEARBY_STORES' && styles.activeTabText]}>
          Nearby Stores
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabItem, activeTab === 'MARKETPLACE' && styles.activeTab]}
        onPress={() => onTabChange('MARKETPLACE')}
      >
        <Text style={[styles.tabText, activeTab === 'MARKETPLACE' && styles.activeTabText]}>
          1Fi Marketplace
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabItem: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    ...Typography.captionBold,
    color: Colors.textMuted,
  },
  activeTabText: {
    color: Colors.primary,
  },
});