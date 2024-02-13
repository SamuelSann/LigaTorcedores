export type Team = {
    aproveitamento: number;
    derrotas: number;
    empates: number;
    gols_contra: number;
    gols_pro: number;
    jogos: number;
    pontos: number;
    posicao: number;
    saldo_gols: number;
    time: {
        escudo: string;
        nome_popular: string;
        sigla: string;
        time_id: number;
    };
    ultimos_jogos: string[];
    variacao_posicao: number;
    vitorias: number;
};