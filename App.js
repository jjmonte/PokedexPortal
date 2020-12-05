import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//  Local Imports:
import { NavBar } from './src/components/NavBar';
import { Pokedex } from './src/components/Pokemon';
import { Footer } from './src/components/Footer';

import { prepareGet } from './src/util/api';

export default function App() {
  // State
  const [currPage, setCurrPage] = useState(1);
  const [id, setId] = useState(null);
  const [maxPage, setMaxPage] = useState(0);

  const changePage = (direction) => {
    // direction: down/up, 0/1, false/true
    if (!direction) {
      if (currPage != 1) {
        setCurrPage(currPage - 1);
        setId(Math.random().toString());
        console.log(currPage);
      }
      else return;
    }
    else {
      setCurrPage(currPage + 1);
      setId(Math.random().toString());
      console.log(currPage);
    }
  }
 
  return (
    <View style={styles.container}>
      <NavBar />
      <Pokedex key={id} currPage={currPage} setMaxPage={setMaxPage} />
      <Footer currPage={currPage} maxPage={maxPage} pageDown={() => changePage(0)} pageUp={() => changePage(1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
