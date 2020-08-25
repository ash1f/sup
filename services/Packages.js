import axios from 'axios';
import { API_DOMAIN } from '../constants/Service'
import {AsyncStorage} from 'react-native'

export const GetAllPackages = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return await axios.get(API_DOMAIN + 'startup_community_api/package/all',
    {
      headers: {
        'AUTH-API-KEY': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then((response) => {
      const re = response.data.result;
      return re;
    }).catch((err) => {
      console.warn("Error in GetAllPackages :", err);
      return [];
    });
}

export const GetPackage = async (package_id) => {
  const token = await AsyncStorage.getItem('userToken');
  return await axios.get(API_DOMAIN + 'startup_community_api/package?package_id=' + package_id ? package_id : null,
    {
      headers: {
        'AUTH-API-KEY': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then((response) => {
      const re = response.data;
      return re;
    }).catch((err) => {
      console.warn("Error in GetPackage -> Id : " + package_id + " : ", err);
      return null;
    });
}

export const RequestPackage = async (id) => { 
  const token = await AsyncStorage.getItem('userToken');

  if(!id) return false;
  let p = new FormData()
  p.append("packages", id + "");

  return await axios.post(API_DOMAIN + 'startup_community_api/package/request',
    p,
    {
      headers: {
        'AUTH-API-KEY': token,
      },
    }).then((response) => {
      const re = response.data;
      return re;
    }).catch((err) => {
      console.warn("Error in RequestPackage :", err);
      return false;
    });
}

