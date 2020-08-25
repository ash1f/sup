import React from "react";
import {Platform} from 'react-native'
import ToastStylesIOS from './ToastStyles.ios';
import ToastStylesANDROID from './ToastStyles.android';

export default ToastStyles = () => Platform.OS === "ios" ? ToastStylesIOS : ToastStylesANDROID;