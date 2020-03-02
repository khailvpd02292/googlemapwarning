import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from './components/Home';
import TitleWarning from './components/TitleWarning';

const NaviBottomNav = createBottomTabNavigator({
  HomeNavNaviScreen: {
    screen: Home,
    navigationOptions: () => ({
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="home" size={24} color="#900" />
      )
    })
  },
  TitleWarningNavNaviScreen: {
    screen: TitleWarning,
    navigationOptions: () => ({
      tabBarLabel: 'Title',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="warning" size={24} color="#900" />
      )
    })

  }
},
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#d32f2f',
      inactiveTintColor: '#9E9E9E',
      style: {
        backgroundColor: '#FAFAFA',
        height: 45,
        marginBottom: 5
      },
      labelStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  },
  {
    initialRouteName: 'HomeNavNaviScreen',

  })


const ContainerApp = createAppContainer(NaviBottomNav);


export class App extends Component {
  render() {
    return (
      <ContainerApp />
    )
  }
}

export default App


