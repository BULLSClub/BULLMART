import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "../public/assets/css/icofont.min.css";
import "../styles/globals.css";
import { useSSR } from "@nextui-org/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  trustWallet,
} from "@thirdweb-dev/react";

const activeChain = "polygon"

function MyApp({ Component, pageProps }) {
  const { isBrowser } = useSSR();
  return (
    isBrowser && (
      <div>
        <Head>
          <title>BULLMART Polygon NFT Marketplace</title>
          <meta
            name="description"
            content="BULLMART is NFT or Digital assets marketplace. It is suitable for selling NFTs, or non-fungible tokens, Digital Arts, Digital Music & All types of Digital Assets. You can create, sell & collect NFT’s or digital assets through The BULLSCLUB Ecosystem"
          />
          <link
            rel="icon"
            type="image/png"
            href="assets/images/favicon.png"
            size="35%"
          />
        </Head>
        <ThirdwebProvider
    activeChain={activeChain}
    clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID} 
    supportedWallets={[
      metamaskWallet({ recommended: true }),
      coinbaseWallet(),
      walletConnect(),
      localWallet(),
      trustWallet(),   
    ]} >
              <Header></Header>
              <Component {...pageProps} />
              <Footer></Footer>
              </ThirdwebProvider>
      </div>
    )
  );
}

export default MyApp;
