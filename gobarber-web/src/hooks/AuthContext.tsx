import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface RequestData {
  user: object;
  token: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<RequestData>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as RequestData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    console.log('acessing api');
    const response = await api.post<RequestData>('sessions', {
      email,
      password,
    });
    console.log('acessing api 2');
    console.log(response.data);

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ user: data.user, signIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );

  const signOut = useCallback(() => {
    const token = localStorage.removeItem('@GoBarber:token');
    const user = localStorage.removeItem('@GoBarber:user');

    setData({} as RequestData);
  }, []);
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default AuthContext;
