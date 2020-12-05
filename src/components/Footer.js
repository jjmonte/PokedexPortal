import React, { useState } from 'react';
import { Text, Image, TextInput, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

// Sticky FOOTER Component, for viewing/changing page

const Footer = ({ currPage, maxPage, pageDown, pageUp }) => {

    if (maxPage == -1) {
        maxPage = 0;
        currPage = 0;
    }

    var footContent = 'Page ' + currPage + ' / ' + maxPage;

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>

                {/* Page Left */}
                <TouchableOpacity disabled={currPage <= 1} onPress={pageDown} style={styles.icon}>
                    <FontAwesomeIcon size={20} icon={faArrowCircleLeft} color={currPage <= 1 ? '#ffffff50' : '#ffffff'} />
                </TouchableOpacity>

                {/* Page Number / Max Page */}
                    <Text style={styles.pageNumber}>{footContent}</Text>
                

                {/* Page Right */}
                <TouchableOpacity disabled={currPage == maxPage} onPress={pageUp} style={styles.icon}>
                    <FontAwesomeIcon size={20} icon={faArrowCircleRight} color={currPage == maxPage ? '#ffffff50' : '#ffffff'} />
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
        })
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
        padding: 5
    },
    icon: {
        paddingHorizontal: 50
    }
})

export { Footer };