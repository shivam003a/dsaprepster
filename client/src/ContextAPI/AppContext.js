import React, { createContext, useState } from 'react';

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
    const [changed, setChanged] = useState(null)
    const [loading, setLoading] = useState(false)
    const [logged, setLogged] = useState(false)
    const [id, setId] = useState("")

    const value = {
        changed,
        setChanged,
        loading,
        setLoading,
        logged,
        setLogged,
        id,
        setId
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}