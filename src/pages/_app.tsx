import Layout from "@/components/Layout";
import AuthGuard from "@/components/AuthGuard";
import { AuthProvider } from '@/context/AuthContext';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <AuthGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthGuard>
      </AuthProvider>
    </SessionProvider>
  );
}