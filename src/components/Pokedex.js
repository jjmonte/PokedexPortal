import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { favIncludes } from '../util/favorites';
import { prepareGet } from '../util/api';

/**
 * List item component, renders as a single pokemon displaying it's: Pokedex number, name, and HP.
 * Each item can be favorited/unfavorited with long press. Regular press loads card.
 * 
 * @param {Object} props item, selected?, isFav?, addFav()
 */
const Pokemon = ({ item, selected, isFav, addFav, openCard }) => {
    return (
        <TouchableOpacity onPress={(item, isFav) => openCard(item, isFav)} onLongPress={(item) => addFav(item)}>
            <View style={[styles.pokeContainer, isFav ? { backgroundColor: 'pink' } : { backgroundColor: '#fff' }]}>
                <Text style={styles.pokeData}>#{item.nationalPokedexNumber}</Text>
                <Text style={styles.pokeData}>{item.name}</Text>
                <Text style={styles.pokeData}>HP: {item.hp}</Text>
            </View>
        </TouchableOpacity>
    )
}

/**
 * FlatList component, renders list of pokemon
 * 
 * @param {Object} props item, selected?, isFav?, addFav()
 */
const Pokedex = ({ showFavorites, currPage, setMaxPage, cardSetCode, favorites, addFav, openCard }) => {
    // State
    const [entries, setEntries] = useState([]);
    const [err, setErr] = useState(null);
    const isRendered = useRef(false);

    // Wait until component mounts, then send GET req.
    useEffect(() => {
        const loadApi = async () => {
            try {
                let response = await fetch(
                    prepareGet(currPage, null, null, cardSetCode)
                );
                let json = await response.json();

                // Set max page and check if error loading from API...
                if (!isRendered.current) {
                    let maxPage = Math.ceil(response.headers.get('Total-Count') / response.headers.get('Page-Size'));
                    setMaxPage(maxPage);
                    setErr(maxPage);

                    // Sort by Pokedex Number...
                    json.cards.sort((a, b) => (a.nationalPokedexNumber > b.nationalPokedexNumber) ? 1 : -1);

                    return setEntries(json.cards);
                }
            } catch (error) {
                console.error(error);
            }
        };

        // Show either ONLY favorites or load from api and highlight favorites
        if (showFavorites) {
            setEntries(favorites);
            return () => isRendered.current = true;
        }
        else {
            loadApi();
            return () => isRendered.current = true;
        }

    }, [entries]);

    // To render each pokémon
    const renderItem = ({ item }) => {
        return (
            <Pokemon
                item={item}
                addFav={() => addFav(item)}
                isFav={favIncludes(favorites, item.id)}
                openCard={() => openCard(item, favIncludes(favorites, item.id))}
            />
        )
    }

    // If no pokémon have loaded yet :(
    const renderListEmpty = () => {
        if (showFavorites && favorites == 0) {
            return (
                <View style={styles.pokeContainer}>
                    <Text style={styles.pokeData}>You have no favorites!</Text>
                </View>
            )
        }
        if (err == -1) {
            return (
                <View style={styles.pokeContainer}>
                    <Text style={styles.pokeData}>Error loading Pokémon!</Text>
                </View>
            )
        }
        else return (
            <View style={styles.pokeContainer}>
                <Text style={styles.pokeData}>Loading Pokémon...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.listBox}>
                <FlatList
                    data={entries}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={entries}
                    ListEmptyComponent={renderListEmpty}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pokeContainer: {
        flex: 1,
        borderBottomColor: '#383838',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-between'
    },
    listBox: {
        marginTop: Platform.OS === 'web' ? 110 : 0,
        marginBottom: Platform.OS === 'web' ? 62 : 0,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    pokeData: {
        fontSize: 16,
        fontFamily: 'System',
        fontWeight: '500',
        color: 'black',
        padding: 16,
        flex: 1,
        textAlign: 'center'
    },
    // footer: {

    // }
});

export { Pokedex };