import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import  from '../modules/cards';
import { Card } from 'react-native-paper';

export default function Menu() {
  return (
    <div>
      <h1>Menú</h1>
      <card/>
    </div>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});