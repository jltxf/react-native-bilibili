import React, {Component} from 'react';
import { TextInput, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './screen/HomeScreen';
import VideoViewScreen from './screen/VideoViewScreen';
import SearchScreen from './screen/SearchScreen';
// import SettingScreen from './screen/SettingScreen';
// import toViewScreen from './screen/toViewScreen';
import Pages from './Pages';

const styles = StyleSheet.create(
    {
        textInputStyle: {
            color: 'rgba(255,255,255, 0.7)',
            width: 200,
            borderRadius: 20,
            backgroundColor: 'rgba(255,255,255, 0.7)',
            height: 30,
            marginTop: 10,
            paddingTop: 0,
            paddingBottom: 0
        },
    });

const HomeStack = createStackNavigator(
    {
        Pages: {
            screen: Pages,
            navigationOptions: {
                headerTitle: (
                    <TextInput inlineImageLeft='icon_search'
                        onKeyPress={() => {
                            this.props.navigation.navigate('VideoViewScreen')
                        }}
                        allowFontScaling={true}
                        placeholder={' 关键词'}
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        style={styles.textInputStyle} />
                ),
                headerStyle: { backgroundColor: '#ff1f11', setHeight: 80 },
                headerTitleContainerStyle: { paddingEnd: 0, justifyContent: 'center', flex: 1, },
                headerTitleStyle: { flex: 1, textAlign: 'center' },

            },
        },
        VideoViewScreen: {
            screen: VideoViewScreen,
            navigationOptions: {
                headerLeftContainerStyle: { paddingTop: 20 },
            }
        },
        SearchScreen: {
            screen: SearchScreen,
            navigationOptions: {
                headerLeftContainerStyle: { paddingTop: 20 },
            }
        },
    },
  
);

const HomeStackNavigator = createAppContainer(HomeStack);
export default HomeStackNavigator;