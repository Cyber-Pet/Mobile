import React, { createContext, useEffect, useReducer } from 'react';
import { AsyncStorage } from 'react-native';
import api from '../services/api';
import jwtDecode from 'jwt-decode';
const UserContext = createContext();
const AuthProvider = ({ children }) => {
  const { Provider } = UserContext;
  const [userState, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          id: action.userId,
          name: action.userName,
          email: action.userEmail,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          usSignout: false,
          userToken: action.token,
          id: action.userId,
          name: action.userName,
          email: action.userEmail,
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
          errorMessages: action.messages,
        }
    }
  },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      name: null,
      id: null,
      email: null,
      errorMessages: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let decodedToken;
      try {
        userToken = await AsyncStorage.getItem('id_token');
        decodedToken = jwtDecode(userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, userName: decodedToken.unique_name, userEmail: decodedToken.email, userId: decodedToken.Id })
    }
    bootstrapAsync()
  }, [])

  const authService = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          const response = await api.post('/auth/login', data)
          await AsyncStorage.setItem('id_token', response.data.data.token);
          let decodedToken = jwtDecode(response.data.data.token);
          dispatch({ type: 'SIGN_IN', token: response.data.data.token, userName: decodedToken.unique_name, userEmail: decodedToken.email, userId: decodedToken.Id  });
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
    <Provider value={{ userState, authService }}>
      {children}
    </Provider>
  );
}

export { AuthProvider, UserContext };

