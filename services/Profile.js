import axios from 'axios';
import { API_DOMAIN } from '../constants/Service'
import { AsyncStorage } from 'react-native'

export const SaveProfile = async ({ customer_id = "", name = "", company = "" }) => {
  const token = await AsyncStorage.getItem('userToken');
  if (!customer_id && !name) return false;

  let p = new FormData()
  p.append("customer_id", parseInt(customer_id));
  p.append("full_name", name);
  p.append("company", company);

  return await axios.post(API_DOMAIN + 'startup_community_api/account/save_profile',
    p,
    {
      headers: {
        'AUTH-API-KEY': token,
      },
    }).then((response) => {
      const re = response.data;
      return re.status;
    }).catch((err) => {
      console.warn("Error in SaveProfile :", err);
      return false;
    });
}
export const SaveProfilePicture = async (file, customer_id) => {
  const token = await AsyncStorage.getItem('userToken');
  if (!file && !customer_id) return false;

  let p = new FormData()
  p.append("file", file)
  p.append("customer_id", parseInt(customer_id));


  console.log({p});

  return await axios.post(API_DOMAIN + 'startup_community_api/account/save_profile_pic',
    p,
    {
      headers: {
        'content-type': 'multipart/form-data',
        'AUTH-API-KEY': token,
      },
    }).then((response) => {
      const re = response.data;
      console.log({re});
      return re.status;
    }).catch((err) => {
      console.warn("Error in SaveProfilePicture :", err);
      return false;
    });
}


