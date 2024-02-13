import { useContext } from "react";
import { AppContext } from ".";
import { User } from "@/types/User"; 
import { Actions } from "./types";
import { setCookie } from "cookies-next";
import { useCallback } from 'react';

export const useAuthContext = () => {
    const { state, dispatch } = useContext(AppContext);

    const setToken = useCallback((token: string) => {
        setCookie('token', token);
        dispatch({
            type: Actions.SET_TOKEN,
            payload: { token }
        });
    }, [dispatch]); // Dependências de useCallback

    const setUser = useCallback((user: User | null) => {
        dispatch({
            type: Actions.SET_USER,
            payload: { user }
        });
    }, [dispatch]); // Dependências de useCallback

    // Retorne o estado e os métodos que você deseja expor
    return {
        ...state, // Este spread operator irá expor todos os estados atuais
        setToken,
        setUser
        // Você pode adicionar mais métodos ou estados aqui se necessário
    };
};