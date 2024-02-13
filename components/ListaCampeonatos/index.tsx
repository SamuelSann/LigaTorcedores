import { useApi } from "../../libs/useApi";
import { use, useEffect, useState } from "react";
import { Campeonato } from "@/types/Campeonato";

export const ListaCampeonatos = () => {
    const api = useApi();
    const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);

    useEffect(() => {
        const buscarCampeonatos = async () => {
            const lista = await api.listarCampeonatos();
            if (lista) {
                setCampeonatos(lista);
            }
        };

        buscarCampeonatos();
    }, []); // Dependências do useEffect

    return (
        <div>
            {campeonatos.map(campeonato => (
                <div key={campeonato.campeonato_id}>
                    {campeonato.nome} (ID: {campeonato.campeonato_id})
                </div>
            ))}
        </div>
    );
};
