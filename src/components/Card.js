import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

/**
 * @component
 * Card component. Shows an image of the specified card prop along with the card's name, Pokédex number, and artist.
 * 
 * @param {*} props
 */
const Card = ({ card }) => {
    const [imgUrl, setImgUrl] = useState(card.imageUrlHiRes);
    let imgSD = card.imageUrl;

    // Used to load lower res image if hi res is unavailable, etc. using onError
    const loadImg = () => {
        return setImgUrl(card.imageUrl);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.card} onError={loadImg} source={{ uri: imgUrl }} />
            <Text style={styles.name}>{card.name}
                <Text style={styles.number}>
                    {" "}#{card.nationalPokedexNumber}
                    {"\n"}Set: {card.set}
                    {"\n"}Artist: {card.artist}
                </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'column'
    },
    card: {
        flex: 6,
        alignSelf: 'center',
        width: '90%',
        resizeMode: 'contain',
        paddingTop: 10
    },
    name: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 26,
        fontWeight: '600',
        textAlignVertical: 'center',
        paddingVertical: '5%',
        color: '#fff'
    },
    number: {
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 25
    }
});

export { Card };