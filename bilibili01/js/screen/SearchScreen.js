import React, { Component } from 'react';
import {
    FlatList, StyleSheet, View, Text, Image, TextInput,
} from 'react-native';


export default class SearchScreen extends React.Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height:45, width: "100%", marginBottom: 10, backgroundColor: '#1C86EE', alignContent: 'center', justifyContent: 'center' }}>
                    <TextInput inlineImageLeft='icon_search'
                        allowFontScaling={true}
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        style={styles.textInputStyle} />
                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create(
    {
        textInputStyle: {
            color: 'rgba(255,255,255, 0.7)',
            width: '85%',
            borderRadius: 20,
            backgroundColor: '#104E8B',
            height: 30,
            marginTop: 10,
            paddingTop: 0,
            paddingBottom: 0,
            position: "absolute", 
            right: "8%" 
        },
    });
