import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';


export const AuthContext = createContext();

export const AuthProvider = ({ children,...props }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                        return "Ok"
                    } catch (e) {
                        console.log(e);
                        return e
                    }
                },
                register: async (email,password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                        return "Ok"
                    } catch (e) {
                        console.log(e)   
                        return e                    
                    }
                },
                logout: async () => {
                    try {
                      await auth().signOut();
                    } catch (e) {
                      console.error(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>

    )
}


