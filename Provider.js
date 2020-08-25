import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export const AppContext = React.createContext({
  errors: "",
  token: "",
  getToken: () => null,
  saveToken: (token) => null,
  removeToken: () => null
});

const AppContextProvider = ({children}) => {
    const [token, setToken] = useState('')
    const [errors, setErrors] = useState([])

     const saveToken = async (token) => {
      try {
        const resp = await AsyncStorage.setItem('userToken', token);
        return resp;
      }
      catch (error) {
        setErrors(error)
      }
    }
    const removeToken = async () => {
      try {
        const resp = await AsyncStorage.removeItem('userToken');
        return resp
      }
      catch (error) {
        setErrors(error)
      }
    }
    const getToken = async () => {
      try {
        const resp = await AsyncStorage.getItem('userToken');
        return resp;
      }
      catch (error) {
        setErrors(error)
      }
    }



  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then(token => setToken(token))
      .catch(error => setErrors(error))
  }, [])

    return (
      <AppContext.Provider value={{ token, errors, getToken, saveToken, removeToken}}>
        {children}
      </AppContext.Provider>
    );
}

export default AppContextProvider;