import React, { createContext, useState } from 'react'

export const searchKeyContext = createContext("")
export const adminprofileupdatestatusContext = createContext("")
export const userprofileupdatestatusContext = createContext("")


function ContextShare({ children }) {
    const [searchkey, setSearchKey] = useState("")
    const [adminprofileupdatestatus, setAdminprofileupdatestatus] = useState({})
    const [userprofileupdatestatus, setUserprofileupdatestatus] = useState({})


    return (
        <userprofileupdatestatusContext.Provider value={{ userprofileupdatestatus, setUserprofileupdatestatus }}>
        <adminprofileupdatestatusContext.Provider value={{ adminprofileupdatestatus, setAdminprofileupdatestatus }}>

            <searchKeyContext.Provider value={{ searchkey, setSearchKey }}>
                {
                    children
                }

            </searchKeyContext.Provider>
        </adminprofileupdatestatusContext.Provider>
        </userprofileupdatestatusContext.Provider>
    )
}

export default ContextShare