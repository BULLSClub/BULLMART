import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "../public/assets/css/icofont.min.css";
import "../styles/globals.css";
import { useSSR } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThirdwebProvider, paperWallet } from "@thirdweb-dev/react";

import { Provider } from "react-redux";
import { createStore } from "redux";
import cartReducer from "../pages/reducers/cartReducer";

import Header from "../components/Header";
import Footer from "../components/Footer";

const activeChain = "polygon";
const store = createStore(cartReducer);

function MyApp({ Component, pageProps }) {
  const { isBrowser } = useSSR();
  return (
    isBrowser && (
      <div>
        <Head>
          <title>BULLSCLUB Marketplace</title>
          <meta
            name="description"
            content="BULLSClub is NFT or Digital assets marketplace. It is suitable for selling NFTs, or non-fungible tokens, Digital Arts, Digital Music & All types of Digital Assets. You can create, sell & collect NFT’s or digital assets through The BULLSCLUB Ecosystem"
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
            paperWallet({
              paperClientId: "adc009f0-3363-451c-8469-68cc1536d050",
            }),
          ]}
        >
          <NextUIProvider>
            <Provider store={store}>
              <Header></Header>

              <Component {...pageProps} />
              <Footer></Footer>
            </Provider>
          </NextUIProvider>
        </ThirdwebProvider>
      </div>
    )
  );
}

export default MyApp;
