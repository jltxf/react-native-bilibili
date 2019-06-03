/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import UserScreen from './src/js/screen/UserScreen'
import HomeStackNavigator from './src/js/HomeStackNavigator';

export default class App extends Component {
  render() {
    return (
	    // <UserScreen/>
		<HomeStackNavigator/>
    );
  }
}