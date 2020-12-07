import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { faCircle, faCog, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'

import Constants from 'expo-constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StatusBar } from 'expo-status-bar';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';

/**
 * @component
 * Sticky Header component. Shown on all pages of app, with varying controls/buttons/decorations shown.
 * 
 * Cog icon on left will open settings. When settings or card screen is displaying, the left icon changes
 * to and 'X' to close the currently open screen and return to the previous view.
 * 
 * Note: Rotom
 * 
 * @param {*} props
 */
const NavBar = ({ appView, toggleFavorites, toggleSettings, rotomDex }) => {
    if (!rotomDex) {
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                <View style={styles.statusBarContainer} />

                <View style={styles.navBarUpper}>
                    {/* Pokedex Lens decoration */}
                    <View style={{ flex: 1 }}>
                        <Image style={{ width: 60, height: 60, margin: 5 }} source={require('../../assets/pokedex.png')} />
                    </View>
                    {/* Circle decoration */}
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesomeIcon style={styles.iconDecor} icon={faCircle} size={14} color={'#e36049'} />
                        <FontAwesomeIcon style={styles.iconDecor} icon={faCircle} size={14} color={'#e3d949'} />
                        <FontAwesomeIcon style={styles.iconDecor} icon={faCircle} size={14} color={'#6ae349'} />
                    </View>
                    {/* Dummy component to trick flex */}
                    <View style={{ flex: 1 }} >
                        <Text style={styles.pageNumber}></Text>
                    </View>
                </View>

                {/* Navigation Icons 
                    Some icons are rendered 
                    with transparent color + disabled=true*/}
                <View zIndex={2} style={styles.navBar}>
                    <TouchableOpacity onPress={toggleSettings} style={styles.icon}>
                        <FontAwesomeIcon size={20}
                            icon={(appView == 'settings' || appView == 'card') ? faTimes : faCog} color={'#fff'} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Pokédex</Text>
                    
                    <TouchableOpacity disabled={appView == 'card' || appView == 'settings'} onPress={toggleFavorites} style={styles.icon}>
                        <FontAwesomeIcon size={20} icon={appView == 'favorites' ? faHeart : faHeartEmpty}
                            color={(appView == 'card' || appView == 'settings') ? '#ffffff00' : '#fff'} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    // ITS ROTO-DEX !!!
    else {
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                <View style={styles.statusBarContainer} />

                <View pointerEvents={'none'} style={styles.navBarUpper}>
                    <Image style={styles.rotom} source={require('../../assets/rotom.png')} />
                </View>

                {/* Navigation Icons 
                    Some icons are rendered 
                    with transparent color + disabled=true*/}
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={toggleSettings} style={styles.icon}>
                        <FontAwesomeIcon size={20}
                            icon={(appView == 'settings' || appView == 'card') ? faTimes : faCog} color={'#fff'} />
                    </TouchableOpacity>

                    <TouchableOpacity disabled={appView == 'card' || appView == 'settings'} onPress={toggleFavorites} style={styles.icon}>
                        <FontAwesomeIcon size={20} icon={appView == 'favorites' ? faHeart : faHeartEmpty}
                            color={(appView == 'card' || appView == 'settings') ? '#ffffff00' : '#fff'} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignContent: "center",
        position: Platform.OS === 'web' ? 'fixed' : 'relative',
        zIndex: 2,
        flexDirection: 'column'
    },
    statusBarContainer: {
        height: Constants.statusBarHeight,
        backgroundColor: '#cc0000',
    },
    navBarUpper: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: "#cc0000",
        paddingHorizontal: 18,
        maxHeight: 54,
        paddingTop: 18,
        paddingBottom: 2,
        zIndex: 3,
        alignItems: 'center',
    },
    iconDecor: {
        paddingHorizontal: Platform.OS === 'web' ? 8 : 16
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: "#cc0000",
        padding: 12,
        paddingVertical: 18,
        borderBottomWidth: 5,
        borderBottomColor: '#801c1385'
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        color: 'white',
        textAlign: 'left',
        ...Platform.select({
            web: {
                fontFamily: 'Arial',
            },
            ios: {
                fontFamily: 'HelveticaNeue',
            },
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
    pageNumber: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    icon: {
        paddingHorizontal: 25,
        marginHorizontal: 25,
        marginTop: 5
    },
    rotom: {
        flex: 1,
        zIndex: -1,
        resizeMode: 'contain',
        margin: 50,
        marginBottom: 10
    }
})

export { NavBar };