import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div>
            <Header />
            <main className="p-4">
                <h1 className="text-2xl font-bold">Welcome to Tamtam</h1>
                <p>Start exploring our products and themes!</p>
            </main>
            <Footer />
        </div>
    );
}
