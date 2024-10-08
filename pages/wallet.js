import { checkProperties } from "ethers/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../engine/Supabase";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  trustWallet,
  rainbowWallet,
} from "@thirdweb-dev/react";
import Web3 from "web3";


const insertUserWallet = async (wallet) => {
  const { data, error } = await supabase.from("User").upsert(
    {
      wallet: wallet,
    },
    { onConflict: "wallet" }
  );
  console.log(data);
  console.log(error);
};

const Wallet = () => {
  const router = useRouter();
  const handleSignInSuccess = () => {
    router.push("/"); 
  };
  const [web3, setWeb3] = useState(null);
  const [userWalletAddress, setUserWalletAddress] = useState("");


  const connectMetamask = async () => {
    if (window.ethereum) {
      console.log(window.ethereum);

      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Write a message in the text-field above.",
        address: addressArray[0],
      };
      localStorage.setItem("data", JSON.stringify(obj));
      await insertUserWallet(addressArray[0]);
      console.log(obj);
      router.push("/");
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  useEffect(() => {
    if (window.ethereum && window.ethereum?.selectedAddress) {
      // router.push("/");
    }
  }, []);
  return (
    <section className="wallet-section padding-top padding-bottom">
      <div className="container">
        <div className="wallet-inner">
          <div className="wallet-title text-center">
            <h3 className="mb-3">Connect with Metamask</h3>
            
          </div>

          <ul
            className="nav justify-content-center nav-pills wallet-tab-list"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <div
                className="nav-link wallet-tab active"
                id="wallet-tab-1"
                data-bs-toggle="pill"
                data-bs-target="#pills-wallet-1"
                role="tab"
                aria-controls="pills-wallet-1"
                aria-selected="true"
              >
                <img src="assets/images/wallet/metamask.svg" alt="Metamask" />
                <span>Metamask</span>
              </div>
            </li>

          
          </ul>

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-wallet-1"
              role="tabpanel"
              aria-labelledby="wallet-tab-1"
            >
              <div className="wallet-content">
                <div className="wallet-img">
                  <img
                    src="assets/images/wallet/metamask.svg"
                    alt="Wallet Name"
                  />
                </div>
                <div className="wallet-desc">
                  <h5>Connect Your MetaMask Wallet</h5>
                  <div
                    className="default-btn small-btn move-right"
                    onClick={async () => {
                      await connectMetamask();
                    }}
                  >
                    <span>Sign In</span>{" "}
                  </div>
                  <a
                    href="https://metamask.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn how to use Metamask wallet
                  </a>
                  <h6>
                    If you wish to disconnect after connecting, you must do from
                    metamask for security
                  </h6>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wallet;
