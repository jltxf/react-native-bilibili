import React, {Component} from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
// import HomeScreen from './screen/HomeScreen';
import HomeStackNavigator from '../js/HomeStackNavigator';
import SettingStackNavigator from './SettingStackNavigator';
import HomeScreen from './screen/HomeScreen';


const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '首页',
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('../res/images/toBar/ic_home_unselected.png')}
                    style={{ width: 30, height: 30 }}
                    color={tintColor} />
            ),
            tabBarOnPress: () => {
                route(navigation)
            }
        }),
    },
    Setting: {
        screen: SettingStackNavigator,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '分区',
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('../res/images/toBar/ic_category_unselected.png')}
                    style={{ width: 30, height: 30 }}
                    color={tintColor}
                />
            ),
            tabBarOnPress: () => {
                route(navigation)
            }
        }),
    },
});

/**
 * Tab 点击跳转调用的公共方法
  */
 const route = (navigation) => {
    if (!navigation.isFocused()) {
        navigation.navigate(navigation.state.routeName, {
            title: navigation.state.routeName
        })
    }
};
//export default TabNavigator;
//export default createAppContainer(TabNavigator);

const Pages = createAppContainer(TabNavigator);
export default Pages;
