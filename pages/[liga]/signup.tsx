import styles from "../../styles/SignUp.module.css";
import Head from "next/head";
import { getLiga } from "../../libs/useApi";
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

const SignUp = (data: Props) => {
  const { liga, setLiga } = useAppContext();

  useEffect(() => {
    setLiga(data.liga);
  });

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {

  };

  const handleSignUp = () => {
    router.push(`/${data.liga.slug}/signup`)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title> Cadastro | {data.liga.name}</title>
      </Head>

      <Header
        color={data.liga.mainColor}
        backHref={`/${data.liga.slug}/login`}
      />
      <div className={styles.header}>{data.liga.name}</div>
      <div 
      className={styles.subtitle}
      style={{borderBottomColor: data.liga.mainColor}}
      >Preencha os campos para criar o seu cadastro.
      </div>
      <div className={styles.line}></div>
      <div className={styles.formArea}>
      <div className={styles.inputArea}>
          <InputField
            color={data.liga.mainColor}
            placeholder="Digite seu nome"
            value={name}
            onChange={setName}
          />
        </div>
        <div className={styles.inputArea}>
          <InputField
            color={data.liga.mainColor}
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className={styles.inputArea}>
          <InputField
            color={data.liga.mainColor}
            placeholder="Digite sua senha"
            value={password}
            onChange={setPassword}
              password
          />
        </div>
        <div className={styles.inputArea}>
          <Button
            color={data.liga.mainColor}
            label="Cadastrar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>
      <div 
      className={styles.forgetArea}
      >
        Já tem cadastro? <Link 
        className={styles.Link}
        style={{color:data.liga.mainColor}} 
        href={`/${data.liga.slug}/login`}>Fazer Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
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
