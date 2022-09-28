import React, { useEffect, useMemo, useState } from 'react';
import DmwLoginContext from './DmwLoginContext'

const DmwLoginProvider = ({ children }) => {

    const [isLogin,setIsLogin] = useState(true)


    const login = () => {
        setIsLogin(true)
    }

    const logOut = () => {
        setIsLogin(false)
    }


    
    useEffect(() => {
        console.log("using dmwlogin provider")

    }, [])

    useEffect(() => {
        console.log("someone call login")
    }, [isLogin])




    return (

        <DmwLoginContext.Provider value={{ isLogin,setIsLogin,login,logOut }}>
            {children}
        </DmwLoginContext.Provider>
    )
}

function useDmwLogin() {
    const context = React.useContext(DmwLoginContext);
    if (context === undefined) {
        throw new Error('useDmwLogin must be used within a DmwLoginProvider');
    }
    return context;
}


export { DmwLoginProvider ,useDmwLogin} 