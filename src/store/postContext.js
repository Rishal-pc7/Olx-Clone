import { createContext, useState } from "react";

export const postNames=createContext(null)
export const chatDetails=createContext(null)

export function ChatContext({children}){
    const [item,setItem]=useState([])
    return(
        <chatDetails.Provider value={{item,setItem}}>
            {children}
        </chatDetails.Provider>
    ) 
}
export default function Context({children}){
    const [item,setItem]=useState([])
    return(
        <postNames.Provider value={{item,setItem}}>
            {children}
        </postNames.Provider>
    ) 
}
