import { Liga } from "@/types/Liga";
import { Dispatch, ReactNode } from "react";

export type DataType = {
    liga: Liga | null;
}

export type ActionType = {
    type: Actions;
    payload?: any;
}

export type ContextType = {
    state: DataType;
    dispatch: Dispatch<ActionType>;
}

export type ProviderType = {
    children : ReactNode
}

export enum Actions {
    SET_LIGA
}