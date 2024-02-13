import { useContext } from "react";
import { AppContext } from ".";
import { Liga } from "@/types/Liga";
import { Actions } from "./types";
import { useCallback } from 'react';

export const useAppContext = () => {
    const { state, dispatch } = useContext(AppContext);

    const setLiga = useCallback((liga: Liga) => {
        dispatch({
            type: Actions.SET_LIGA,
            payload: { liga }
        });
    }, [dispatch]); // Aqui você inclui as dependências necessárias

    return {
        ...state,
        setLiga
    };
};