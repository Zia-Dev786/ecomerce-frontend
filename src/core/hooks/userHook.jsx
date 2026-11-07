import { createContext, useState } from "react";

export let userContext = createContext()


export function UserProvider({ children }) {
    let [user, setUser] = useState(() => {
        let userdata = localStorage.getItem('user')
        if (userdata) {
            // to json
            // console.log(userdata)
            return JSON.parse(userdata)
        } else {
            return null
        }

    })

    return <userContext.Provider value={{ user, setUser }}>
        {children}
    </userContext.Provider>
}