// src/_app.js
import { AuthProvider } from '@/context/AuthContext';
import Layout from './layout';

export default function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
}
