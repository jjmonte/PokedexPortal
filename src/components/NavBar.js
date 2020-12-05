import React, { useState } from 'react';
import { Text, Image, TextInput, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faBookOpen, faCircle } from '@fortawesome/free-solid-svg-icons'

// Navigation Bar at top of app on all screen view, displays basic controls for current view

const NavBar = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.statusBarContainer} />
            <View style={styles.navBarUpper}>

                <View style={{ flex: 1 }}>
                    <Image style={{ width: 60, height: 60, margin: 5 }} source={require('../../assets/pokedex.png')} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <FontAwesomeIcon style={styles.iconDecor} icon={faCircle} size={14} color={'#e36049'} />
                    <FontAwesomeIcon style={styles.iconDecor} icon={faCircle} size={14} color={'#e3d949'} />
                    <FontAwesomeIcon style={styles.iconDecor} icon={faCircle} size={14} color={'#6ae349'} />
                </View>

                <View style={{ flex: 1 }} >
                    <Text style={styles.pageNumber}></Text>
                </View>

            </View>
            <View style={styles.navBar}>
                <TouchableOpacity style={[styles.icon, {flexDirection: 'row'}]}>
                    <FontAwesomeIcon icon={faHeart} color={'#fff'} />
                    {/* <Text style={{fontWeight: 'bold', lineHeight: 19, fontSize: 18, color: '#fff'}}>'s</Text> */}
                    </TouchableOpacity>
                <Text style={styles.title}>Pokédex</Text>
                <TouchableOpacity style={styles.icon}><FontAwesomeIcon icon={faBookOpen} color={'#fff'} /></TouchableOpacity>
            </View>
        </View>
    )
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
        // minHeight: 60,
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
        
        borderBottomWidth: 5,
        borderBottomColor: '#801c1385'
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        color: 'white',
        textAlign: 'left',
    },
    pageNumber: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    icon: {
        paddingHorizontal: 50
    }
})

export { NavBar };