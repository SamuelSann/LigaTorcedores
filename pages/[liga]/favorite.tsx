import { SearchInput } from "@/components/SearchInput";
import styles from "../../styles/Home.module.css";
import { Banner } from "@/components/Banner";
import { Sidebar } from "@/components/Sidebar";
import { TimeItem } from "@/components/TimeItem";
import { getLiga, authorizeToken, getTeam} from "../../libs/useApi";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import { Liga } from "@/types/Liga";
import { useAppContext } from "@/contexts/app";
import { use, useEffect, useState } from "react";
import { getCookie, CookieValueTypes} from "cookies-next";
import { User } from "@/types/User";
import { useAuthContext } from "@/contexts/auth";
import { Campeonato } from "@/types/Campeonato";
import { Team } from "@/types/Team";


const Favorite = (data: Props) => {
  const {setToken, setUser} = useAuthContext();
  const { liga, setLiga } = useAppContext();
  useEffect(() => {
    setLiga(data.liga);
    if (data.token ) {
      setToken(data.token);
    }
    if (data.user) setUser(data.user);
  },[data.liga, data.token, data.user]); 
  

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSearch = (searchValue: string) => {
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.TopLeft}>
            <div className={styles.headerTitle}>Favoritos</div>
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
      <div className={styles.grid}>
{
  data.team && data.team.map((item, index) => (
    <TimeItem
    key = {index}
      data={{
        time_id: item.time.time_id, 
        escudo: item.time.escudo, 
        nome_popular: item.time.nome_popular,
        sigla:  item.time.sigla,
      }}
    />
  ))
}
      </div>
    </div>
)};

export default Favorite;
type Props = {
  liga: Liga;
  token: string;
  user: User | null;
  campeonato: Campeonato[];
  team: Team[];
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

  const team = await getTeam(14);
  if (team === null) {
    return {
      redirect: {
        destination: "/liga",
        permanent: false,
      },
    };
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
    team
  }
}
}
