import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { populateSets } from '../util/api';

/**
 * @component
 * Settings component. Features a picker component allowing user to change card sets and clear local storage.
 * 
 * @param {*} props
 */
const Settings = ({ cardSetCode, setCardSetCode, clearStorage, setRefresh, setCurrPage }) => {
    const [currSet, setCurrSet] = useState(null);
    const [cardSets, setCardSets] = useState([]);
    const [currLogo, setCurrLogo] = useState(null);

    // On Did Mount, populates card sets from API + updates state with current set's logo and name
    useEffect(() => {
        const loadCardSets = async () => {
            try {
                let sets = await populateSets();
                if (sets != 0) {
                    setCardSets(sets);
                    setCurrSet(sets.find(x => x.code == cardSetCode).name);
                    setCurrLogo(sets.find(x => x.code == cardSetCode).logoUrl);
                }
            } catch (error) {
                console.log(error);
            }
        }
        loadCardSets();
    }, []);

    // Maps array of card sets to Picker Items
    let pickerSets = cardSets.map((set, index) => {
        return (
            <Picker.Item style={styles.pickerItem} label={set.name} value={set.code} key={index} />
        )
    });

    // Updates cardSet in parent and own state
    const updateSet = (value) => {
        setCardSetCode(value);
        setCurrSet(cardSets.find(x => x.code == value).name);
        setCurrLogo(cardSets.find(x => x.code == value).logoUrl)
        setCurrPage(1);
        setRefresh(Math.random().toString());
    }

    return (
        <View style={styles.container}>
            {/* Picker component */}
            <View style={styles.pickerContainer}>
                <Text style={styles.setLabel}>
                    <Text style={{ fontWeight: "600" }}>Current Card Set:</Text>
                    {"\n"}{currSet}
                </Text>
                <Image style={styles.logo} source={{ uri: currLogo }}></Image>
                <Picker onValueChange={(value) => updateSet(value)} style={styles.picker} itemStyle={styles.pickerItem} selectedValue={cardSetCode}>
                    {pickerSets}
                </Picker>
            </View>
            {/* Clear Storage Button */}
            <TouchableOpacity style={styles.clearButton} onPress={clearStorage}><Text style={styles.buttonText}>Clear All Favorites</Text></TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    setLabel: {
        padding: 25,
        paddingBottom: 0,
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 30
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        marginTop: 15,
        marginBottom: 25
    },
    pickerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    picker: {
        width: '80%',
        borderColor: '#383838',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#e3e3e3'

    },
    clearButton: {
        padding: 15,
        marginBottom: '30%',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#cc0000',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})

export { Settings };