import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Row, Container } from "@nextui-org/react";
import { ethers } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Profil from "../engine/Profil";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import AuthorCard from "./common/AuthorCard";
import NFTS from "../engine/NFTS.json";
import HomeRadio from "./Radio";
import { ConnectWallet, useAddress, darkTheme } from "@thirdweb-dev/react";
import Image from "next/image";
import ConnectChain from "../engine/connectchain";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [wallet, setWallet] = useState("");

  // const key = "owner";
  // const owner = [...new Map(NFTS.map((item) => [item[key], item])).values()];
  console.log("NFT", NFTS);

  async function connectUser() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      await window.ethereum.send("eth_requestAccounts");
      var accounts = await web3.eth.getAccounts();
      var account = accounts[0];
    }
    getUser(account);
  }

  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
    }
    setWallet(
      window.ethereum.selectedAddress ? window.ethereum.selectedAddress : ""
    );
  }, []);

  async function onDisconnect() {
    console.log("Killing the wallet connection", provider);

    // TODO: Which providers have close method?
    if (provider.close) {
      await provider.close();

      // If the cached provider is not cleared,
      // WalletConnect will default to the existing session
      // and does not allow to re-scan the QR code with a new wallet.
      // Depending on your use case you may want or want not his behavir.
      await web3Modal.clearCachedProvider();
      provider = null;
    }

    selectedAccount = null;

    // Set the UI back to the initial state
    document.querySelector("#prepare").style.display = "block";
    document.querySelector("#connected").style.display = "none";
  }
  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
    }
  }, []);
  const router = useRouter();

  return (
    <div className="test">
      <header className="header">
        <div className="container-fluid">
          <div className="header__content">
            <div className="header__logo">
            <a href="http://bullsclub.space/" target="blank">
                <Image
                  src="/assets/images/logo/logo.png"
                  width={170}
                  height={90}
                  alt="logo"
                ></Image>
              </a>
            </div>
            <form action="#" className="header__search">
              <HomeRadio />
              BULLFM
            </form>
           
            <div className="header__logo">
            <a href="https://polygon.technology/" target="blank">
                <Image
                  src="/polygonwhite.png"
                  width={130}
                  height={40}
                  alt="logo"
                ></Image>
              </a>
            </div>

            <div className="header__menu ms-auto">
              <ul className="header__nav mb-0">
                <li className="header__nav-item">
                  <Link className={router.pathname == "/"} href="/">
                    HOME
                  </Link>
                  <ul className="dropdown-menu header__nav-menu"></ul>
                </li>
                <li className="header__nav-item">
                  <a
                    className="header__nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-bs-offset="0,10"
                  >
                    NFTs
                  </a>

                  <ul className="dropdown-menu header__nav-menu">
                    <li>
                      <Link href="/createnft">
                        
                           <span className="me-1">
                          <i className="icofont-fix-tools"></i>
                        </span>
                          Create NFT
                       
                      </Link>
                    </li>
                    <li>
                    <Link href="/portal">
                        <span className="me-1">
                        <i className="icofont-coins"></i>
                      </span>
                          Sell NFT
                        
                      </Link>
                    </li>
                    <li>
                      <Link href="/explore">
                        <span className="me-1">
                        <i className="icofont-prestashop"></i>
                      </span>{" "}
                          Market
                       
                      </Link>
                    </li>

                    <li>
                      <Link href="/collection">
                       <span className="me-1">
                        <i className="icofont-files-stack"></i>
                      </span>
                        Collections
                       
                      </Link>
                    </li>
                   
                  </ul>
                </li>
               

                <li className="header__nav-item">
                  <a
                    className="header__nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-bs-offset="0,10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z" />
                    </svg>
                  </a>

                  <ul className="dropdown-menu header__nav-menu">
                    <li>
                    <a
                        href="https://bullzar.bullsclub.space"
                        target="blank"
                      >
                        <a
                          className={
                            router.pathname == ""
                              ? "drop-down-item active"
                              : "drop-down-item"
                          }
                        >
                         <span className="me-1">
                          <i className="icofont-megaphone-alt"></i>
                        </span>
                        BULLZAR
                        </a>
                      </a>
                    </li>
                    <li>
                    <a
                        href="https://bullswap.bullsclub.space"
                        target="blank"
                      >
                        <a
                          className={
                            router.pathname == ""
                              ? "drop-down-item active"
                              : "drop-down-item"
                          }
                        >
                         <span className="me-1">
                          <i className="icofont-money-bag"></i>
                        </span>
                        BULL TOKEN
                        </a>
                      </a>
                    </li>
                    <li>
                      <a href="https://bullsclub.space" target="blank">
                        <a><span className="me-1">
                          <i className="icofont-bull"></i>
                        </span>
                        BULLSCLUB</a>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="header__actions">
              <div className="header__action header__action--search">
                <button className="header__action-btn" type="button">
                  <i className="icofont-search-1"></i>
                </button>
              </div>
              <div className="header__action header__action--profile">
                <div className="dropdown">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-offset="-100,10"
                  >
                    <span>
                      <i className="icofont-user"></i>
                    </span>{" "}
                    <span className="d-none d-md-inline"></span>
                  </a>
                  <ul className="dropdown-menu">




                    <li>
                      <Profil wallet={wallet} />
                    </li>




                    <li>
                    </li>
                  </ul>
                </div>

                <ConnectChain />
              </div>
              <div className="wallet-btn">
                <Link href="/wallet">
                  
                    <span>
                      <i className="icofont-wallet" data-blast="color"></i>
                    </span>
                    <span className="d-none d-md-inline">
                      {wallet != ""
                        ? wallet.slice(0, 4) + "...." + wallet.slice(-2)
                        : "🐻"}
                    </span>
                 
                </Link>
              </div>
            </div>






            <button className="menu-trigger header__btn" id="menu05">
            <div
                  className="btn btn-secondary dropdown-toggle"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></div>
                <ul
                  className="dropdown-menu dropdown-menu-light active"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link className="dropdown-item" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/createnft">
                      Create NFT
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/portal">
                      Sell NFT
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/explore">
                      Market
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/collection">
                      Collection
                    </Link>
                  </li>
                </ul>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
