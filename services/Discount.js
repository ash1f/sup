import axios from 'axios';
import { API_DOMAIN } from '../constants/Service'
import {AsyncStorage} from 'react-native'

export const GetAllDiscounts = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return await axios.get(API_DOMAIN + 'startup_community_api/discount/all',
    {
      headers: {
        'AUTH-API-KEY': token,
      },
    }).then((response) => {
      const re = response.data.result;
      return re;
    }).catch((err) => {
      console.warn("Error in GetAllDiscounts :", err);
      return [];
    });
}
