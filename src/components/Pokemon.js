import React, { useState, useEffect } from 'react';
import { Text, FlatList, ScrollView, View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { prepareGet } from '../util/api';

import { NavBar } from './NavBar';

const Pokemon = ({ item }) => {
    return (
        <View style={styles.pokeContainer}>
            <Text style={styles.pokeData}>#{item.nationalPokedexNumber}</Text>
            <Text style={styles.pokeData}>{item.name}</Text>
            <Text style={styles.pokeData}>HP: {item.hp}</Text>
        </View>
    )
}

const Pokedex = () => {
    // State
    const [entries, setEntries] = useState([]);

    // Wait until component mounts, then send GET req.
    useEffect(() => {
        const loadApi = async () => {
            try {
                let response = await fetch(
                    prepareGet()
                );
                let json = await response.json();
                console.log(json.cards);
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
    // If no pokémon have loaded yet
    const renderListEmpty = () => {
        return (
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
    },
    pokeContainer: {
        flex: 1,
        borderBottomColor: '#383838',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    listBox: {
        marginTop: Platform.OS === 'web' ? 110 : 0,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'yellow',
    },
    pokeData: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        padding: 16,
        flex: 1,
        textAlign: 'center'
    },
});

export { Pokedex };