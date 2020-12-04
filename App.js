import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//  Local Imports:
import { NavBar } from './src/components/NavBar';
import { Pokedex } from './src/components/Pokemon';

export default function App() {

  return (
    <View style={styles.container}>
      <NavBar />
      <Pokedex />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
