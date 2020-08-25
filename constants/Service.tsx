import { AsyncStorage} from 'react-native';
export const API_DOMAIN  = "http://ec2-52-1-216-9.compute-1.amazonaws.com/";

export const storeAS = async (key:string, value:string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Error in ASYNC STORAGE set() :",  error)
  }
};

export const retrieveAS = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.warn("Error in ASYNC STORAGE get() :",  error)
  }
};
