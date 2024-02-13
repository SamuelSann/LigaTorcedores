export type Campeonato = {
    campeonato_id: number;
    nome: string;
    slug: string;
    nome_popular: string;
    edicao_atual: {
        edicao_id: number;
        temporada: string;
        nome: string;
        nome_popular: string;
        slug: string;
    };
    tipo: string;
    logo: string;
};
