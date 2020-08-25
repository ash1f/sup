import axios from 'axios';
import { API_DOMAIN } from '../constants/Service'
import {AsyncStorage} from 'react-native'

export const GetAllCategoriesList = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return await axios.get(API_DOMAIN + 'startup_community_api/category/all',
    {
      headers: {
        'AUTH-API-KEY': token,
      },
    }).then((response) => {
      const re = response.data.result;
      return re;
    }).catch((err) => {
      console.warn("Error in GetAllCategoriesList :", err);
      return [];
    });
}

export const SubmitProposal = async ({title = "", description="", category_id="", document="", owner=""}) => {
  let p = new FormData()
  p.append("title", title);
  p.append("description", description);
  p.append("category_id", category_id);
  p.append("document", document);
  p.append("owner", owner);
  const token = await AsyncStorage.getItem('userToken');

  return await axios.post(API_DOMAIN + 'startup_community_api/package/request',
    p,
    {
      headers: {
        'AUTH-API-KEY': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then((response) => {
      const re = response.data;
      return re;
    }).catch((err) => {
      console.warn("Error in RequestPackage :", err);
      return false;
    });
}



