import styles from "../../styles/Forget.module.css";
import Head from "next/head";
import { useApi } from "../../libs/useApi";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import { Liga } from "@/types/Liga";
import { useAppContext } from "@/contexts/app";
import { use, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const Forget = (data: Props) => {
  const { liga, setLiga} = useAppContext();

  useEffect(() => {
    setLiga(data.liga);
  });

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    router.push(`/${data.liga.slug}/forget-success`)
  };

  return (
    <div className={styles.container}>
      <Head>
        <title> Esqueci a senha | {data.liga.name}</title>
      </Head>

      <Header
        color={data.liga.mainColor}
        backHref={`/${data.liga.slug}`}
      />
      <div className={styles.header}>{data.liga.name}</div>
      <div className={styles.title}>Esqueceu sua Senha?</div>
      <div 
      className={styles.subtitle}
      style={{borderBottomColor: data.liga.mainColor}}>
        Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir  a sua senha.
      </div>
      <div className={styles.line}></div>
      <div className={styles.formArea}>
        <div className={styles.inputArea}>
          <InputField
            color={data.liga.mainColor}
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className={styles.inputArea}>
          <Button
            color={data.liga.mainColor}
            label="Enviar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Forget;
type Props = {
  liga: Liga;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { liga: ligaSlug } = context.query;
  console.log("Liga: ", ligaSlug);
  const api = useApi();

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
      liga,
    },
  };
};
