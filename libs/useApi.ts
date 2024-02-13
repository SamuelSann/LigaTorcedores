import { Liga } from "@/types/Liga";
import { User } from "@/types/User";
import { Table } from "@/types/Table";
import { Campeonato } from "@/types/Campeonato";

export const useApi = () => ({
    getLiga: (ligaSlug: string): boolean | Liga => {
        switch (ligaSlug) {
            case 'liga':
                return {
                    slug: 'liga',
                    name: 'Liga',
                    mainColor: 'blue',
                    secondColor: '#fefefe'
                }
            default: return false
        }


    },
    authorizeToken: async (token: string): Promise<User | false> => {
        if(!token) return false;
        return {
            name: 'Samuel',
            email: 'samuel@gmail.com',
        }
    },

    getTable: async (campeonatoId: number): Promise<Table[] | null> => {
        try {
            const response = await fetch(`https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/tabela`, {
                headers: {
                    'Authorization': `Bearer test_6befac6b43a6bfca31ec330838c96d`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da tabela');
            }    
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    getCampeonato: async (campeonatoId: number): Promise<Table[] | null> => {
        try {
            const response = await fetch(`https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}`, {
                headers: {
                    'Authorization': `Bearer test_6befac6b43a6bfca31ec330838c96d`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da tabela');
            }    
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    listarCampeonatos: async (): Promise<Campeonato[] | null> => {
        try {
            const response = await fetch(`https://api.api-futebol.com.br/v1/campeonatos`, {
                headers: {
                    'Authorization': `Bearer test_6befac6b43a6bfca31ec330838c96d`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar lista de campeonatos');
            }
            return await response.json() as Campeonato[];
        } catch (error) {
            console.error(error);
            return null;
        }
    },  
});