import styles from "../../styles/Login.module.css";
import Head from "next/head";
import { useApi } from "../../libs/useApi";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import { Liga } from "@/types/Liga";
import { useAppContext } from "@/contexts/AppContext";
import { use, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthContext } from "@/contexts/auth";

const Login = (data: Props) => {
  const { setToken, setUser} = useAuthContext();

  const { liga, setLiga } = useAppContext();

  useEffect(() => {
    setLiga(data.liga);
  });

  
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    setToken('1234');
    setUser({
      name: 'Samuel',
      email: 'samuel51@gmail.com'
    });
    router.push(`/${data.liga.slug}`);
  };

  //const {setToken, setUser} = useAuthContext();
  const handleSignUp = () => {
    router.push(`/${data.liga.slug}/signup`)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title> Login Liga</title>
      </Head>

      <Header
        color={data.liga.mainColor}
        backHref={`/${data.liga.slug}`}
      />
      <div className={styles.header}>{data.liga.name}</div>
      <div 
      className={styles.subtitle}
      style={{borderBottomColor: data.liga.mainColor}}
      >Use suas credenciais para realizar o login.
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
            label="Entrar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>
      <div 
      className={styles.forgetArea}
      style={{borderBottomColor: data.liga.mainColor}}
      >
        Esqueceu sua senha? <Link 
        className={styles.Link}
        style={{color:data.liga.mainColor}} 
        href={`/${data.liga.slug}/forget`}>Clique aqui</Link>
      </div>
      <div className={styles.line}></div>
      <div className={styles.signupArea}>
      <Button
            color={data.liga.mainColor}
            label="Quero me Cadastrar"
            onClick={handleSignUp}
          />
      </div>
    </div>
  );
};

export default Login;
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
