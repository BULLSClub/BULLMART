import { checkProperties } from "ethers/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../engine/Supabase";
import LoginUD from "../components/LoginUD";
import Web3 from "web3";

import { Spacer } from "@nextui-org/react";
import ConnectPaper from "../components/ConnectPaper";
import Login from "../components/login";














const insertUserWallet = async (wallet) => {
  const { data, error } = await supabase.from("User").upsert(
    {
      wallet: wallet
    },
    { onConflict: "wallet" }
  );
  console.log(data);
  console.log(error);
};

const Wallet = () => {
  const router = useRouter();
  const [web3, setWeb3] = useState(null);
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const connectMetamask = async () => {
    if (window.ethereum) {
      console.log(window.ethereum);
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const obj = {
        status: "Write a message in the text-field above.",
        address: addressArray[0]
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
        )
      };
    }
  };
  useEffect(() => {
    if (window.ethereum && window.ethereum?.selectedAddress) {
      router.push("/");
    }
  }, []);
  return (
    <section className="wallet-section padding-top padding-bottom">
      <div className="container">
        <div className="wallet-inner">
          <div className="wallet-title text-center">
            <h3 className="mb-3">Connect your W3B wallet</h3>
            <p className="m-auto mb-5">
              Connect with one of available providers
            </p>
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
                <img src="assets/images/wallet/thirdweb.png" alt="thirdweb" />
                <span>Thirdweb</span>
              </div>
            </li>
            <li className="nav-item" role="presentation">
              <div
                className="nav-link wallet-tab"
                id="wallet-tab-2"
                data-bs-toggle="pill"
                data-bs-target="#pills-wallet-2"
                role="tab"
                aria-controls="pills-wallet-2"
                aria-selected="false"
              >
                <img src="assets/images/wallet/1.png" alt="ud" />
                <span>Unstoppable</span>
              </div>
            </li>
            <li className="nav-item" role="presentation">
              <div
                className="nav-link wallet-tab"
                id="wallet-tab-3"
                data-bs-toggle="pill"
                data-bs-target="#pills-wallet-3"
                role="tab"
                aria-controls="pills-wallet-3"
                aria-selected="false"
              >
                <img src="assets/images/wallet/255.png" alt="ud" />
                <span>PaperWallet</span>
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
                    src="assets/images/wallet/thirdweb.png"
                    alt="Wallet Name"
                  />
                </div>
                <div className="wallet-desc">
                  <h5>Connect with Thirdweb</h5>
                  <Login />
                  <a
                    href="https://thirdweb.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more about Thirdweb
                  </a>
                  <Spacer />
                  <h6>Connect with Metamask, Coinbase, Or WalletConnect</h6>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-wallet-2"
              role="tabpanel"
              aria-labelledby="wallet-tab-2"
            >
              <div className="wallet-content">
                <div className="wallet-img">
                  <img
                    src="assets/images/wallet/ud22.png"
                    alt="Wallet Name"
                  />
                </div>
                <div className="wallet-desc">
                  <h5>Connect Your Unstoppable Domain</h5>
                  <LoginUD />
                
                  <Spacer></Spacer>
                  <a
                    href="https://unstoppabledomains.com/?ref=e904125842e0429"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more about Unstoppable Domains
                  </a>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-wallet-3"
              role="tabpanel"
              aria-labelledby="wallet-tab-3"
            >
              <div className="wallet-content">
                <div className="wallet-img">
                  <img src="assets/images/wallet/333.png" alt="Wallet Name" width="225"
  height="125"/>
                </div>
                <div className="wallet-desc">
                  <h5>Connect With Email Paper wallet</h5>

                  <ConnectPaper />
                  <Spacer></Spacer>
                  <a
                    href="https://withpaper.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more about PaperWallet
                  </a>
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
