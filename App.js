import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { addFavorite, clearStorage, favIncludes, loadFavorites } from './src/util/favorites';

import { Card } from './src/components/Card';
import { Footer } from './src/components/Footer';
import { NavBar } from './src/components/NavBar';
import { Pokedex } from './src/components/Pokedex';
import { Settings } from './src/components/Settings';

export default function App() {
  // State
  const [favorites, setFavorites] = useState([]);
  const [refresh, setRefresh] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [cardSetCode, setCardSetCode] = useState(null);
  const [maxPage, setMaxPage] = useState(0);
  const [appView, setAppView] = useState('pokedex');  // 'cards', 'settings', 'favorites'
  const [lastView, setLastView] = useState('pokedex');
  const [currCard, setCurrCard] = useState({ item: null, isFav: null });

  // wait until mounted, then set favorites
  useEffect(() => {
    const loadFavs = async () => {
      try {
        let favs = await loadFavorites();
        if (favs != 0) {
          setFavorites(favs);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadFavs();
  }, []);

  /**
   * Function to set current page, for traversing pages in Footer.
   * 
   * @param {boolean} direction - down/up, 0/1, false/true
   */
  const changePage = (direction) => {
    // direction: 
    if (!direction) {
      if (currPage != 1) {
        setCurrPage(currPage - 1);
        setRefresh(Math.random().toString());
      }
      else return;
    }
    else {
      setCurrPage(currPage + 1);
      setRefresh(Math.random().toString());
    }
  }
  /**
   * Wrapper to combine addFavorite, refresh favorites (state), and force refresh.
   * @param {Object} pokemon 
   */
  const addFav = async (pokemon) => {
    let favs = await addFavorite(pokemon);
    setRefresh(Math.random().toString())
    setFavorites(favs);
  }

  /**
   * Wrapper to combine clearStorage with a reset of favorites (state) and force refresh.
   */
  const wipe = async () => {
    if (await clearStorage()) {
      setFavorites([]);
      setRefresh(Math.random().toString());
    }
  }
  /**
   * Wrapper to toggle favorites screen
   */
  const toggleFavorites = () => {
    setLastView(appView == 'favorites' ? 'pokedex' : 'favorites');
    setAppView(appView == 'favorites' ? 'pokedex' : 'favorites');
    setRefresh(Math.random().toString());
  }

  /**
   * Wrapper to toggle settings screen
   */
  const toggleSettings = () => {
    if (appView == 'card') {
      setAppView(lastView);
      setRefresh(Math.random().toString());
    }
    else {
      setAppView(appView == 'settings' ? lastView : 'settings');
      setRefresh(Math.random().toString());
    }
  }
  /**
   * Wrapper to openCard (toggle card screen). Takes
   * 
   * @param {Object} item 
   * @param {boolean} isFavorite 
   */
  const openCard = (item, isFavorite) => {
    setLastView(appView);
    setAppView('card');
    setCurrCard({ item: item, isFav: isFavorite });
    setRefresh(Math.random().toString());
  }

  // Conditional rendering for 'settings' screen
  if (appView == 'settings') {
    return (
      <View style={styles.container}>
        <NavBar clearStorage={wipe} appView={appView} toggleFavorites={toggleFavorites} toggleSettings={toggleSettings} rotomDex={favIncludes(favorites, null, 'Rotom')}/>
        <Settings cardSetCode={cardSetCode} setCurrPage={setCurrPage} setCardSetCode={setCardSetCode} clearStorage={wipe} setRefresh={() => setRefresh()} />
        <Footer currPage={currPage} maxPage={maxPage} pageDown={() => changePage(0)} pageUp={() => changePage(1)}
          appView={appView} />
      </View>
    );
  }

  // Conditional rendering for 'card' screen
  if (appView == 'card') {
    return (
      <View style={styles.container}>
        <NavBar clearStorage={wipe} appView={appView} toggleFavorites={toggleFavorites} toggleSettings={toggleSettings} rotomDex={favIncludes(favorites, null, 'Rotom')}/>
        <Card card={currCard.item} isFav={currCard.isFav} />
        <Footer currPage={currPage} maxPage={maxPage} pageDown={() => changePage(0)} pageUp={() => changePage(1)}
          appView={appView} />
      </View>
    );
  }

  // Conditional rendering for either 'pokedex' or 'favorites' screens
  else {
    return (
      <View style={styles.container}>
        <NavBar clearStorage={wipe} appView={appView} toggleFavorites={toggleFavorites} toggleSettings={toggleSettings} rotomDex={favIncludes(favorites, null, 'Rotom')}/>
        <Pokedex key={refresh} currPage={currPage} setMaxPage={setMaxPage} cardSetCode={cardSetCode} favorites={favorites} addFav={addFav}
          showFavorites={appView == 'favorites'} openCard={openCard} />
        <Footer currPage={currPage} maxPage={maxPage} pageDown={() => changePage(0)} pageUp={() => changePage(1)}
          appView={appView} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
