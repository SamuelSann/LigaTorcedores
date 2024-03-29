import { Liga } from "@/types/Liga";
import { User } from "@/types/User";
import { Table } from "@/types/Table";
import { Campeonato } from "@/types/Campeonato";
import { Time } from "@/types/Time";


export const getLiga = async (ligaSlug: string): Promise<boolean | Liga> => {
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
};
export const authorizeToken = async (token: string): Promise<User | false> => {
    if (!token) return false;
    return {
        name: 'Teste',
        email: 'teste@gmail.com',
        time: 'Chapecoense'
    }
};

export const getTeam = async (campeonatoId: number): Promise<Table[] | null> => {
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
};

export const getCampeonato = async (campeonatoId: number): Promise<Table[] | null> => {
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
};

export const getTime = async (timeId: number): Promise<Time[] | null> => {
    try {
        const response = await fetch(`https://api.api-futebol.com.br/v1/times/${timeId}`, {
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
};

export const getListCampeonatos = async (): Promise<number[] | null> => {
    try {
      const response = await fetch(`https://api.api-futebol.com.br/v1/campeonatos`, {
        headers: {
          'Authorization': `Bearer test_6befac6b43a6bfca31ec330838c96d`
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar lista de campeonatos');
      }
      const campeonatos = await response.json() as Campeonato[];
      return campeonatos.map(campeonato => campeonato.campeonato_id);
    } catch (error) {
      console.error(error);
      return null;
    }
  };
