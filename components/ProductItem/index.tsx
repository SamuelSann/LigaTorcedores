import Link from "next/link";
import { Table } from "@/types/Table";
import styles from "./styles.module.css";
import { useAppContext } from "@/contexts/app";
type Props = {
  data: Table;
};
export const ProductItem = ({ data }: Props) => {
  const {liga} = useAppContext();
  return (
    <Link  legacyBehavior href={`/${liga?.slug}/tabela/${data.slug}`}>
      <a className={styles.container}>
        <div
          className={styles.head}
          style={{ backgroundColor: liga?.secondColor }}
        ></div>
        <div className={styles.info}>
          <div className={styles.img}>
            <img src={data.image} alt="" />
          </div>

          <div className={styles.catName}>{data.categoryName}</div>
          <div className={styles.name}>{data.name}</div>
        </div>
      </a>
    </Link>
  );
};
