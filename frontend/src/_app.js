// src/_app.js
import Layout from './layout';

export default function MyApp({ Component, pageProps }) {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
