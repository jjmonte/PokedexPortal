// HELPER FUNCTIONS FOR INTERACTING WITH POKEMON TCG API

/**
 * Prepares a HTTP GET request, which is used in Pokedex's useEffect method (once component mounts, sends request).
 * Uses default data of: Base set and page size of 25 items.
 * 
 * @returns {string} prepared request
 *  */
const prepareGet = (pageNumber, pageSize, entryNumber, cardSet) => {

    let number = '';
    let setCode = '';
    let page = '';
    let defaultGet = '';
    let size = '&pageSize=25';

    if (pageNumber) {
        page = '&page=' + pageNumber;
    }
    if (pageSize) {
        size = '&pageSize=' + pageSize
    }
    if (entryNumber) {
        number = '&nationalPokedexNumber=' + entryNumber;
    }
    if (cardSet) {
        setCode = '&setCode=' + cardSet;
    }
    // by default, card set is Base, change with dropdown
    if (!cardSet) {
        defaultGet = '&setCode=base1'
    }

    return 'https://api.pokemontcg.io/v1/cards?supertype=pokemon' + size + page + number + setCode + defaultGet;
};

const populateSets = async () => {
    try {
        let response = await fetch(
            'https://api.pokemontcg.io/v1/sets'
        );
        let json = await response.json();
        return json.sets;
    } catch (error) {
        console.error(error);
    }
}

export { prepareGet, populateSets };