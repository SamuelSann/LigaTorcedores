import { Liga } from "@/types/Liga";
import { ReactNode, createContext, useContext, useState } from "react";

type appContextType = {
     liga: Liga | null;
     setLiga:(newLiga: Liga) => void;
     
}

const defaultValues: appContextType = {
    liga: null,
    setLiga:() => null
}

const appContext = createContext<appContextType>(defaultValues);

export const useAppContext = () =>{
    return useContext(appContext); 
}
type Props ={
    children: ReactNode;
}
export const AppContextProvider = ({children} : Props) =>{
    const [liga, setLiga] = useState<Liga | null>(null);
    return(
        <appContext.Provider value={{ liga, setLiga }}>
            {children}
        </appContext.Provider>
    );
}