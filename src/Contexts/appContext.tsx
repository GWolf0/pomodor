import React, { createContext, useEffect, useState } from "react";
import PomodoroApp, { PomodoroAppInstanceDef } from "../Objects/pomodoroApp";

interface AppContextDef{
    appInstance:PomodoroAppInstanceDef|null,
    setAppInstance:React.Dispatch<React.SetStateAction<PomodoroAppInstanceDef|null>>
}

const defaultContextState:AppContextDef={appInstance:null,setAppInstance:()=>null}
const appContext:React.Context<AppContextDef>=createContext<AppContextDef>(defaultContextState);

interface AppContextProviderPropsDef{
    children:React.ReactNode,
}
function AppContextProvider({children}:AppContextProviderPropsDef){
    const [appInstance,setAppInstance]=useState<PomodoroAppInstanceDef|null>(null);

    useEffect(()=>{
        setAppInstance(PomodoroApp.getInstance());
    },[]);

    return (
        <appContext.Provider value={{appInstance,setAppInstance}}>
            {appInstance&&children}
        </appContext.Provider>
    )
}

export {appContext}
export default AppContextProvider;
