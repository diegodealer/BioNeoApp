import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.backButton} onPress={onPress}>
    <Ionicons name="chevron-back" size={40} color="#fff" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
});

export default BackButton; 