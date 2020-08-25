import React from 'react';
import { Icon } from 'react-native-eva-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Icon
      name={props.name}
      height={26}
      width={26}
      style={{ marginBottom: -3 }}
      fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
