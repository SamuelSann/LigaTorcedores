import { Team } from "@/types/Team";
import styles from "./styles.module.css";
import { useAppContext } from "@/contexts/app";
type Props = {
  teams: Team[];
};
export const TeamTable = ({ teams }: Props) => {
  return (
    <table className={styles.teamTable}>
      <thead>
        <tr>
          <th className="sticky">CLASSIFICAÇÃO</th>
          <th>P</th>
          <th>J</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GP</th>
          <th>GC</th>
          <th>SG</th>
          <th>%</th>
          <th>ÚLT. JOGOS</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, index) => (
          <tr key={team.time.time_id}>
            <td className={styles.sticky}>
              <span className={styles.index}>{index + 1}</span>
              <span className={styles.teamName}>{team.time.nome_popular}</span>
            </td>
            <td className={styles.classificacao_pontos}>{team.pontos}</td>
            <td className={styles.classificacao_pontos}>{team.jogos}</td>
            <td className={styles.classificacao_pontos}>{team.vitorias}</td>
            <td className={styles.classificacao_pontos}>{team.empates}</td>
            <td className={styles.classificacao_pontos}>{team.derrotas}</td>
            <td className={styles.classificacao_pontos}>{team.gols_pro}</td>
            <td className={styles.classificacao_pontos}>{team.gols_contra}</td>
            <td className={styles.classificacao_pontos}>{team.saldo_gols}</td>
            <td className={styles.classificacao_pontos}>{team.aproveitamento}</td>
            <td>
              <div className={styles.ultimosJogosContainer}>
                {team.ultimos_jogos.map((resultado, i) => (
                  <span
                    key={i}
                    className={`${styles.ultimoJogo} ${
                      styles[`jogo${resultado.toUpperCase()}`]
                    }`}
                  ></span>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
