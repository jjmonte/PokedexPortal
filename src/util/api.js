// FUNCTIONS FOR INTERACTING WITH POKEMON TCG API

// const cardSets = populateSets();

const populateSets = async () => {
    try {
        let response = await fetch(
            'https://api.pokemontcg.io/v1/sets'
        );
        let json = await response.json();
        console.log(json.sets)
        return json.sets;
    } catch (error) {
        console.error(error);
    }
}

// Prepares a HTTP GET request, which is used in Pokedex's useEffect method (once component mounts, sends request) 
const prepareGet = (pageNumber, entryNumber, cardSet) => {

    var number = '';
    var set = '';
    var page = '';
    var defaultGet = '';

    if (pageNumber) {
        page = '&page=' + pageNumber;
    }
    if (entryNumber) {
        number = '&nationalPokedexNumber=' + entryNumber;
    }
    if (cardSet) {
        set = '&set=' + cardSet;
    }
    // by default, card set is Base, change with dropdown
    if (!cardSet) {
        defaultGet = '&set=base'
    }

    return 'https://api.pokemontcg.io/v1/cards?supertype=pokemon' + page + number + set + defaultGet;

    // try {
    //     let response = await fetch(
    //         'https://api.pokemontcg.io/v1/cards?supertype=pokemon' + page + number + set + defaultGet
    //     );
    //     let json = await response.json();
    //     console.log(json.cards);
    //     return json.cards;
    // } catch (error) {
    //     console.error(error);
    // }
};


export { prepareGet, populateSets };