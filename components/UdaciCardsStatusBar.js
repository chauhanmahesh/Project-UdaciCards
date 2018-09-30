import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {blue} from '../utils/colors';
import {Constants} from 'expo';

export default function UdaciCardsStatusBar(props) {
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={blue} barStyle='light-content'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: blue,
        height: Constants.statusBarHeight
    }
})