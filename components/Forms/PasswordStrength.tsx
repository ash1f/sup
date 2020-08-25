import React from 'react'
import {View, Text} from 'react-native'
import {pwdValidate} from '../../constants/Validation'

const levels = [
  'Weak',
  'Good',
  'Strong',
  'Unbreakable'
]

const colors  = [
  '#95a5a6',
  '#f1c40f',
  '#2ecc71',
  '#27ae60'
]

const PasswordStrength = (pwd: string) => { 
  const lvl = pwdValidate(pwd);
  return (
    <View>
      <Text style={{ fontSize: 18, marginVertical: 4, textAlign: "center", width: "100%",  color: colors[lvl]}}>{levels[lvl]}</Text>
    </View>
  )
}

export default PasswordStrength
