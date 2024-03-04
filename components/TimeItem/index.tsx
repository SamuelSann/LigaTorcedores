import Link from "next/link";
import { Time } from "@/types/Time";
import styles from "./styles.module.css";
import { useAppContext } from "@/contexts/app";
type Props = {
  data: Time;
};
export const TimeItem = ({ data }: Props) => {
  const {liga} = useAppContext();
  return (
    <Link  legacyBehavior href={`/${liga?.slug}}`}>
      <a className={styles.container}>
        <div
          className={styles.head}
          style={{ backgroundColor: liga?.secondColor }}
        ></div>
        <div className={styles.info}>
          <div className={styles.img}>
            <img src={data.escudo} alt="" />
          </div>

          <div className={styles.name}>{data.nome_popular}</div>
        </div>
      </a>
    </Link>
  );
};
