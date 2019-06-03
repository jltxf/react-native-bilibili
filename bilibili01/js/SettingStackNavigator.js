import React from 'react'
import {TextInput, StyleSheet} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import SettingScreen from './screen/SettingScreen';
import toViewScreen from './screen/toViewScreen';
export default createStackNavigator(
    {
        SettingScreen: {
            screen: SettingScreen,
            navigationOptions: {
                headerTitle: '分区', //添加标题
                headerLeftContainerStyle: {paddingTop: 20},

            },
        },
        toViewScreen: {
            screen: toViewScreen,
            navigationOptions: {
                headerLeftContainerStyle: {paddingTop: 20},
            }
        },
    },
    {

    }
    );