import React, { createContext, useState, useEffect } from 'react';
import cookie from 'react-cookies'


export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [jwt, setJWT] = useState('');
    const [user, setUser] = useState();

    useEffect(() => {
        if (cookie.load('jwt') && cookie.load('user')) {
            setJWT(cookie.load('jwt'))
            setUser(cookie.load('user'))
        }
    }, [])

    const addLocal = (jwt, user) => {
        const expires = new Date()
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
        cookie.save('jwt', jwt, { expires, maxAge: 1000, })
        cookie.save('user', JSON.stringify(user), { expires, maxAge: 1000 })

        setJWT(jwt);
        setUser(user);
    }

    const changeProfile = (name) => {
        const expires = new Date()
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
        user.fullname = name;
        cookie.save('user', JSON.stringify(user), { expires, maxAge: 1000 })
        setUser({ fullname: name });
    }

    const logOut = () => {
        cookie.remove('jwt')
        cookie.remove('user')

        setJWT();
        setUser();
    }


    return (
        <AuthContext.Provider
            value={{
                jwt,
                user,
                addLocal,
                logOut,
                changeProfile
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;