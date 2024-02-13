import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Script from "next/script"; // Importar o Script do Next.js
import styles from "../../../styles/Tabela.module.css";
import { TeamTable } from "@/components/Table";
import { Sidebar } from "@/components/Sidebar";
import { Banner } from "@/components/Banner";
import { useAppContext } from "@/contexts/app";
import { useApi } from "../../../libs/useApi";
import { Liga } from "@/types/Liga";
import { Table } from "@/types/Table";
import { Team } from "@/types/Team";

type Props = {
  liga: Liga;
  team: Team[];
};

const Tabela = (data: Props) => {
  const { setLiga } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setLiga(data.liga);
    console.log("Dados da team:", data.team);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.TopLeft}>
            <div className={styles.headerTitle}>Tabela</div>
          </div>
          <div className={styles.TopRight}>
            <div
              className={styles.menuButton}
              onClick={() => setSidebarOpen(true)}
            >
              <div
                className={styles.menuButtonLine}
                style={{ backgroundColor: data.liga?.mainColor }}
              ></div>
              <div
                className={styles.menuButtonLine}
                style={{ backgroundColor: data.liga?.mainColor }}
              ></div>
              <div
                className={styles.menuButtonLine}
                style={{ backgroundColor: data.liga?.mainColor }}
              ></div>
            </div>
            <Sidebar
              liga={data.liga}
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      </header>
      <Banner />
      <div className={styles.grid}>
        <div className={styles.tableContainer}>
          <TeamTable teams={data.team} />
        </div>
      </div>
    </div>
  );
};

export default Tabela;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { liga: ligaSlug, slug } = context.query;

  const api = useApi();

  // Obtém a tabela
  const team = await api.getTable(14);
  if (team === null) {
    return {
      redirect: {
        destination: "/liga",
        permanent: false,
      },
    };
  }

  //Get Liga
  const liga = await api.getLiga(ligaSlug as string);
  if (!liga) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      team,
      liga,
    },
  };
};