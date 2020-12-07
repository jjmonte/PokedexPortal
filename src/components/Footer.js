import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

/**
 * @component
 * Sticky Footer component. Shown on all screens of app, with varying controls/buttons/data shown.
 * 
 * On pokédex screen, footer displays page changing icons and page numbers. On the 'card', 'settings', and 'favorites'
 * screens, footer displays screen title.
 * 
 * @param {*} props
 */
const Footer = ({ currPage, maxPage, pageDown, pageUp, appView }) => {

    if (appView == 'card' || appView == 'settings') {
        var footContent = appView == 'settings' ? 'Settings' : 'Card';
        var arrowColor = '#00000000';
        maxPage = -1;
    } else {
        arrowColor = '#ffffff50';
    }

    if (appView == 'favorites') {
        maxPage = -1;
        var footContent = 'Favorites';
        var arrowColor = '#00000000';
    }

    if (maxPage == -1) {
        maxPage = 0;
        currPage = 0;
    }

    if (appView == 'pokedex') {
        var footContent = 'Page ' + currPage + ' / ' + maxPage;
    }

    else if (appView == 'cards') {
        var footContent = 'Card ' + currPage + ' / ' + maxPage;
    }

    return (
        /*  Page Navigation Icons 
            Some icons are rendered 
            with transparent color + disabled=true
        */
        <View style={styles.container}>
            <View style={styles.navBar}>

                {/* Page Left */}
                <TouchableOpacity disabled={currPage <= 1} onPress={pageDown} style={styles.icon}>
                    <FontAwesomeIcon size={20} icon={faArrowCircleLeft} color={currPage <= 1 ? arrowColor : '#fff'} />
                </TouchableOpacity>

                {/* Page Number / Max Page */}
                <Text style={styles.pageNumber}>{footContent}</Text>

                {/* Page Right */}
                <TouchableOpacity disabled={currPage == maxPage} onPress={pageUp} style={styles.icon}>
                    <FontAwesomeIcon size={20} icon={faArrowCircleRight} color={currPage == maxPage ? arrowColor : '#ffffff'} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignContent: "center",
        position: Platform.OS === 'web' ? 'fixed' : 'relative',
        zIndex: 2,
        flexDirection: 'column',
        ...Platform.select({
            web: {
                bottom: 0
            }
        }),
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#cc0000",
        padding: 18,
        borderTopWidth: 5,
        borderTopColor: '#801c1385'
    },
    pageNumber: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    icon: {
        paddingHorizontal: 50
    }
})

export { Footer };