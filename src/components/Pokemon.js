import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';

import React, { useState, useEffect } from 'react';
import { Text, FlatList, ScrollView, View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { prepareGet } from '../util/api';
// import { storeFavorites, loadFavorites} from '../util/favorites';

import { NavBar } from './NavBar';

// favorites.includes(item.id) ? {backgroundColor: 'pink'} : {backgroundColor: '#D6FFFA'}


const Pokemon = ({ item, selected }) => {
    if (selected == item.id) {

    }
    return (
        <TouchableOpacity onPress={() => { console.log('make favorite!') }}>
            <View style={[styles.pokeContainer]}>

                <Text style={styles.pokeData}>#{item.nationalPokedexNumber}</Text>
                <Text style={styles.pokeData}>{item.name}</Text>
                <Text style={styles.pokeData}>HP: {item.hp}</Text>

            </View>
        </TouchableOpacity>
    )
}

const Pokedex = ({ currPage, setMaxPage, maxPage }) => {
    // State
    const [entries, setEntries] = useState([]);
    const [err, setErr] = useState(null);

    // Wait until component mounts, then send GET req.
    useEffect(() => {
        const loadApi = async () => {
            console.log(currPage);
            try {
                let response = await fetch(
                    prepareGet(currPage)
                );
                let json = await response.json();

                // Set max page and check if error loading from API...
                let maxPage = await response.headers.get('Total-Count') % response.headers.get('Page-Size') - 1;
                setMaxPage(maxPage);
                setErr(maxPage);

                // Sort by Pokedex Number...
                json.cards.sort((a, b) => (a.nationalPokedexNumber > b.nationalPokedexNumber) ? 1 : -1)
                return setEntries(json.cards);
            } catch (error) {
                console.error(error);
            }

        };
        loadApi();
    }, []);

    // To render each of our friends..
    const renderItem = ({ item }) => {
        console.log()
        return (
            <Pokemon
                item={item}
            />
        )
    }

    // If no pokémon have loaded yet :(
    const renderListEmpty = () => {
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
                    extraData={currPage}
                    ListEmptyComponent={renderListEmpty}
                // ListFooterComponent={renderFooter}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6FFFA',
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
        backgroundColor: '#D6FFFA',
    },
    pokeData: {
        fontSize: 16,
        fontFamily: 'Menlo',
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