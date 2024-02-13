import Script from 'next/script';
import { Provider as AppContextProvider } from "@/contexts/app";
import { Provider as AuthContextProvider } from "@/contexts/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Script
          src="https://cdn.api-futebol.com.br/widgets/v1/apifutebol-tabela.js"
          strategy="lazyOnload"
        />
        <Component {...pageProps} />
      </AppContextProvider>
    </AuthContextProvider>
  );
}
