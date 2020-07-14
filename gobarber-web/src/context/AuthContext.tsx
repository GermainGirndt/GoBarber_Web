import React, { createContext, useCallback, useState } from 'react';

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

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

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
};

export default AuthContext;
