/**
 * Various functions for loading and modifying the locally stored 'favorites' array
 * using AsyncStorage.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Determines if the favorites array includes a pokemon
 * of the specified pokeID. 
 * 
 * @param {Object[]} favorites 
 * @param {string|number} pokeID
 * 
 * @returns {boolean} found ?
 */
const favIncludes = (favorites, pokeID, name) => {
    let found = false;
    if (name) {
        // loop through favorites until finding object matching pokeID
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].name.substring(0, 5) === name) {
                found = true;
                break;
            }
        }
    }
    else {
        // loop through favorites until finding object matching pokeID
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id === pokeID) {
                found = true;
                break;
            }
        }
    }
    return found;
}

/**
 * Stores a specified favorites array into local storage via AsyncStorage, overwriting previous data.
 * 
 * @param {Object[]} favorites
 * 
 * @returns {boolean} stored (if array is stored or not)
 */
const storeFavorites = async (favorites) => {
    let stored = false;
    try {
        const jsonValue = JSON.stringify(favorites);
        await AsyncStorage.setItem('@myFavorites', jsonValue);
        return stored = true;
    } catch (error) {
        console.log('Error storing favorites!');
        console.error(error);
        return false;
    }
}

/**
 * Loads the favorites array with key = @myFavorites from local storage. 
 * If not found (or if an error), returns empty array, to be used as favorites.
 * 
 * @returns {Object[]} favorites
 */
const loadFavorites = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@myFavorites');
        if (jsonValue != null) {
            let favorites = JSON.parse(jsonValue);
            // Sort by Pokedex Number and return
            return favorites.sort((a, b) => (a.nationalPokedexNumber > b.nationalPokedexNumber) ? 1 : -1);
        } else {
            return [];
        };
    } catch (error) {
        console.log('Error getting favorites!');
        console.error(error);
    }
}

/** 
 * Adds a specified pokemon to favorites array in local storage.
 * If the specified pokemon is already present in the array, removes it.
 * 
 * @param {*} pokemon Object
 * 
 * @returns {Object[]} Updated favorites array, from local storage.
 */
const addFavorite = async (pokemon) => {
    try {
        // load favorites array from local storage
        let favorites = await loadFavorites();

        // if pokemon exists in favorites array, remove it and return updatedFavorites
        if (await favIncludes(favorites, pokemon.id)) {
            return await removeFavorite(pokemon.id)
        }
        // if not, push pokemon
        else {
            favorites.push(pokemon);

            if (await storeFavorites(favorites)) {
                let updatedFavorites = await loadFavorites();
                return updatedFavorites;
            }
        }
    }
    catch (error) {
        console.log('Error adding favorite!');
        console.error(error);
    }
}

/**
 * Removes a favorited card from favorites array and stores updated array
 * 
 * @param {*} pokeID 
 * 
 * @returns {Object[]} Updated favorites array, from local storage.
 */
const removeFavorite = async (pokeID) => {
    // Already confirmed via addFavorite that pokeID is present in favorites, so just filter it out
    try {
        let favorites = await loadFavorites();
        favorites = favorites.filter(x => x.id !== pokeID);
        if (await storeFavorites(favorites)) {
            let updatedFavorites = await loadFavorites();
            return updatedFavorites;
        }
    } catch (error) {
        console.log('Error removing favorite!');
        console.error(error);
    }

}

/**
 * Clears all locally stored favorites by storing an empty array.
 * 
 * @returns {boolean} clear ?
 */
const clearStorage = async () => {
    let clear = false;
    try {
        // load favorites array from local storage
        let favorites = await loadFavorites();
        if (favorites == 0) {
            // storage was already clear
            return clear;
        }
        else {
            return await storeFavorites([]);
        }
    } catch (error) {
        console.log('Error clearing favorites.');
        console.error(error);
    }
}

export { storeFavorites, loadFavorites, addFavorite, favIncludes, clearStorage };

// ⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⣠⣤⣶⣶
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⢰⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣀⣀⣾⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⡏⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
// ⣿⣿⣿⣿⣿⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
// ⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿
// ⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿
