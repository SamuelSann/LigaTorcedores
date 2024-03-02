import { SearchInput } from "@/components/SearchInput";
import styles from "../../styles/Home.module.css";
import { Banner } from "@/components/Banner";
import { Sidebar } from "@/components/Sidebar";
import { CampeonatoItem } from "@/components/CampeonatoItem";
import { getLiga, authorizeToken, getCampeonato, getListCampeonatos } from "../../libs/useApi";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import { Liga } from "@/types/Liga";
import { useAppContext } from "@/contexts/app";
import { use, useEffect, useState } from "react";
import { getCookie, CookieValueTypes} from "cookies-next";
import { User } from "@/types/User";
import { useAuthContext } from "@/contexts/auth";
import { Table } from "@/types/Table";
import { Campeonato } from "@/types/Campeonato";


const Home = (data: Props) => {
  const {setToken, setUser} = useAuthContext();
  const { liga, setLiga } = useAppContext();
  useEffect(() => {
    setLiga(data.liga);
    if (data.token ) {
      setToken(data.token);
    }
    if (data.user) setUser(data.user);
    console.log(data.campeonato);
  },[data.liga, data.token, data.user]); 
  

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSearch = (searchValue: string) => {
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.TopLeft}>
            <div className={styles.headerTitle}>Liga Dos Torcedores</div>
          </div>
          <div className={styles.TopRight}>
            <div 
            className={styles.menuButton}
            onClick={() => setSidebarOpen(true)}
            >
              <div
                className={styles.menuButtonLine}
                style={{ backgroundColor: liga?.mainColor }}
              ></div>
              <div
                className={styles.menuButtonLine}
                style={{ backgroundColor: liga?.mainColor }}
              ></div>
              <div
                className={styles.menuButtonLine}
                style={{ backgroundColor: liga?.mainColor }}
              ></div>
            </div>
            <Sidebar 
              liga={data.liga}
              open= {sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>
      <Banner />
      <div className={styles.grid}>
      {
      data.campeonato && data.campeonato.map((item, index) => (
    <CampeonatoItem
      key={index}
      data={{
        id: item.campeonato_id, // Ou qualquer outro ID único
        image: item.logo, // Você pode querer usar uma imagem relacionada ao item aqui
        categoryName: item.tipo,
        name: item.nome_popular, // Usando o nome do campeonato aqui
        slug: item.slug
      }}
    />
  ))
}
      </div>
    </div>
)};

export default Home;
type Props = {
  liga: Liga;
  token: string;
  user: User | null;
  campeonato: Campeonato[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { liga: ligaSlug } = context.query;
 

  //Get Liga
  const liga = await getLiga(ligaSlug as string);
  if (!liga) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const camps = await getListCampeonatos();
  if (!camps) {
    return {
      redirect: {
        destination: '/liga',
        permanent: false,
      },
    };
  }

  const campeonatoDataList = [];

  for (const campeonatoId of camps) {
    const campeonatoData = await getCampeonato(campeonatoId);
    if (campeonatoData) {
      campeonatoDataList.push(campeonatoData);
    }
  }

//Get logged user
let token = getCookie('token', context) as CookieValueTypes | null;
if(!token) token = null;

let user = null;
if (token) {
  const userResponse = await authorizeToken(token);
 if (userResponse !== false) {
   user = userResponse;
  }
}

return {
  props: {
    liga,
    user,
    token,
    campeonato: campeonatoDataList,
  }
}
}
