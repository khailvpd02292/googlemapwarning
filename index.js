/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './components/Login'
import Warning from './components/Warning'
import AppNavigator from './components/AppNavigator'
AppRegistry.registerComponent(appName, () => App);

