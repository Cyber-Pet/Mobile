import React, { createContext, useEffect, useReducer } from 'react';
import { AsyncStorage } from 'react-native';
import api from '../services/api';
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const { Provider } = AuthContext;
  const [authState, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          usSignout: false,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
      case 'ERROR':
        return {
          isSignout: true,
          userToken: null,
          errorMessages: action.messages
        }
    }
  },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      errorMessages: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('id_token');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }
    bootstrapAsync()
  }, [])

  const authService = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          const response = await api.post('/auth/login', data)
          await AsyncStorage.setItem('id_token', response.data.data.token);
          dispatch({ type: 'SIGN_IN', token: response.data.data.token });
        } catch (error) {
          dispatch({ type: 'ERROR', messages: error.response.data.errors });
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem('id_token');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <Provider value={{ authState, authService }}>
      {children}
    </Provider>
  );
}

export { AuthProvider, AuthContext };
