import { AppProps } from "next/dist/shared/lib/router/router";
import { ReactNode } from "react";
import "./globals.css";

function MyApp({ Component, pageProps }: AppProps): ReactNode {
    return <Component {...pageProps} />;
}

export default MyApp;
