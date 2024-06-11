import Head from 'next/head'
import Header from '../components/Header'
import MainSection from '../components/Home'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>CoreAccess</title>
        <meta name="description" content="Revolutionizing Event Ticketing with Web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <MainSection />
      <Footer />
    </div>
  )
}
