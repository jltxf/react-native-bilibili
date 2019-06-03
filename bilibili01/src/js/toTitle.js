/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, LogoTitle } from 'react-native';
import { reateStackNavigator, createAppContainer, createStackNavigator, TabNavigator } from 'react-navigation';

class HomeScreen extends React.Component { //写要显示的页面
  //在标题中添加一个按钮
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button
          onPress={
            navigation.getParam('increaseCount')
          } title="count +1"
          // color="#fff"
        />
      ),
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }
  state = {
    count: 0,
  };
  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>count+{this.state.count}</Text>
        <Button //给第一个页面HomeScreen增加按钮进行跳转
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Details Screen</Text>
      </View>
    );
  }
}



//将要跳转的页面放在函数里面
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen, //跳转的内容
    navigationOptions: {
      headerTitle: 'Home', //添加标题
    },
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});


const RootNavigator = createAppContainer(AppNavigator);//进行包裹(必须)
export default RootNavigator;
