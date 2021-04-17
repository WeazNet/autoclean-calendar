import React from 'react';
import Navigation from './Navigation/Navigation'
import { LogBox } from 'react-native'
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs(true); 

export default class App extends React.Component {
  render() {
    return (
        <>
        <Navigation/>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        </>
    )
  }
}
