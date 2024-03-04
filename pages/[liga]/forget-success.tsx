import styles from "../../styles/ForgetSuccess.module.css";
import Head from "next/head";
import { getLiga } from "../../libs/useApi";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import { Liga } from "@/types/Liga";
import { useAppContext } from "@/contexts/app";
import { use, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const ForgetSuccess = (data: Props) => {
  const { liga, setLiga } = useAppContext();

  useEffect(() => {
    setLiga(data.liga);
  });

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    router.push(`/${data.liga.slug}/login`)
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
      <div className={styles.iconeArea}>
        <Icon icon='mailSent' color={data.liga.mainColor} width={99} height={81} />
      </div>
      <div className={styles.title}>Verifique Seu e-mail</div>
      <div className={styles.subtitle}>
        Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir  a sua senha.
      </div>

      <div className={styles.formArea}>

        <div className={styles.inputArea}>
          <Button
            color={data.liga.mainColor}
            label="Fazer Login"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetSuccess;
type Props = {
  liga: Liga;
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
  return {
    props: {
      liga,
    },
  };
};
