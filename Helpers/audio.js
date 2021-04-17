import React from 'react'
import {default as Sound} from 'react-native-sound'
var RNSound = require('react-native').NativeModules.RNSound;
var IsAndroid = RNSound.IsAndroid;

Sound.setCategory('Ambient', true);

const buttonPress = new Sound(require('../assets/plop.mp3'), error => console.log(error));
export const playButtonPress = () => {
  buttonPress.play((success) => buttonPress.reset());
}