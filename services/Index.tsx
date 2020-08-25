import React from 'react'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import { API_DOMAIN } from '../constants/Service'

interface RequestProps {
  slug: string,
  headers?: any,
  params?: any,
  withToken: boolean
}

export default (props: RequestProps) => {

  const Post = async () => {
    const token = await AsyncStorage.getItem('userToken');
    return await axios.get(API_DOMAIN + props.slug,
      {
        headers: {
          'AUTH-API-KEY': token,
        },
      }).then((response) => {
        const re = response.data.result;
        return re;
      }).catch((err) => {
        console.warn(`Error in ${props.slug}:`, err)
        return null;
      });
  }

  const Get = async () => {
    const token = await AsyncStorage.getItem('userToken');
  }
}
