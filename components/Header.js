import Link from "next/link";
import { useEffect, useState, React } from "react";
import { useRouter } from "next/router";
import ConnectChain from "../engine/connectchain";
import { Button, Col, Row, Container } from "@nextui-org/react";
import { ethers } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Profil from "../engine/Profil";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import AuthorCard from "./common/AuthorCard";
import NFTS from "../engine/NFTS.json";
import UDdis from "./UDdisconect";




const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [wallet, setWallet] = useState("");

  // const key = "owner";
  // const owner = [...new Map(NFTS.map((item) => [item[key], item])).values()];
  console.log("NFT", NFTS);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = NFTS.filter((nft) => {
      return (
        nft.addr.toLowerCase().includes(value) ||
        nft.baseURI.toLowerCase().includes(value) ||
        nft.owner.toLowerCase().includes(value) ||
        nft.tokenID.toString().includes(value)
      );
    });
    setSearchResults(results);
  };
  const renderSearchResults = () => {
    if (searchResults.length === 0 && searchTerm !== "") {
      return <div>No search results</div>;
    }
    return (
      <ul>
        {searchResults.map((nft) => (
          <AuthorCard key={nft.address} address={nft.address} item={nft} />
        ))}
      </ul>
    );
  };

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
              <Link href="http://bullsclub.space/">

                <img
                  /* eslint-disable-line */ src="/assets/images/logo/logo.png"
                  alt="logo"
                ></img>

              </Link>
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
                      <Link
                        href="/createnft"
                        className={
                          router.pathname == "/createnft"
                            ? "drop-down-item active"
                            : "drop-down-item"
                        }>
                        
                          Create NFT
                        
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/portal"
                        className={
                          router.pathname == "/portal"
                            ? "drop-down-item active"
                            : "drop-down-item"
                        }>
                        
                          Sell NFT
                        
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/explore"
                        className={
                          router.pathname == "/explore "
                            ? "drop-down-item active"
                            : "drop-down-item"
                        }>
                        
                          Market
                        
                      </Link>
                    </li>
                    
                    <li>
                      <Link
                        href="/collection"
                        className={
                          router.pathname == "/collection"
                            ? "drop-down-item active"
                            : "drop-down-item"
                        }>
                        
                          Collections
                        
                      </Link>
                    </li>

                    

                    <li>
                      <Link href="https://explorer.bullsclub.space/">
                        Explorer
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/allauthors"
                        className={
                          router.pathname == "/collection"
                            ? "drop-down-item active"
                            : "drop-down-item"
                        }>
                        
                          Collectors
                        
                      </Link>
                    </li>
                    
                  </ul>
                </li>
                <li className="header__nav-item">
                  <a
                    className="header__nav-link"
                    href="https://bullsclub.space/crypto-blog/"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-bs-offset="0,10"
                  >
                    BLOG
                  </a>
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
                        href="https://multisender.bullsclub.space"
                        target="blank"
                      >
                        <a
                          className={
                            router.pathname == ""
                              ? "drop-down-item active"
                              : "drop-down-item"
                          }
                        >
                          BEB20 Multisender
                        </a>
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:support@bullsclub.space"
                        target="blank"
                      >
                        <a
                          className={
                            router.pathname == ""
                              ? "drop-down-item active"
                              : "drop-down-item"
                          }
                        >
                          Contact
                        </a>
                      </a>
                    </li>


                    <li>
                      <a
                        href="https://airdrop.bullsclub.space"
                        target="blank"
                      >
                        <a
                          className={
                            router.pathname == ""
                              ? "drop-down-item active"
                              : "drop-down-item"
                          }
                        >
                          Airdrop
                        </a>
                      </a>
                    </li>
                    <li>
                      <Link href="https://bullsclub.space/bullsclub-polygon-bnb-nft-utility-vault/" target="blank">
                        BULLSCLUB
                      </Link>
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
              <ConnectChain />
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
                      <Link
                        href="/portal"
                        className={
                          router.pathname == "/author"
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }>

                        <span className="me-1">
                          <i className="icofont-coins"></i>
                        </span>Sell NFT
                      </Link>
                    </li>
                         <li>
                            <UDdis />
                          </li>
                  </ul>
                </div>
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



            <div>
      <button className="menu-trigger header__btn" id="menu05">
        <div className="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          {/* Removed the <ul> element since it's not necessary */}
        </div>
        <ul className="dropdown-menu dropdown-menu-light active" aria-labelledby="dropdownMenuButton1">
          <li><Link className="dropdown-item" href="/">Home</Link></li>
          <li><Link className="dropdown-item" href="/createnft">Create NFT</Link></li>
          <li><Link className="dropdown-item" href="/portal">Sell NFT</Link></li>
          <li><Link className="dropdown-item" href="/explore">Market</Link></li>
          <li><Link className="dropdown-item" href="/collection">Collection</Link></li>
        </ul>
      </button>
    </div>
        </div>
    </div>







            
          
       
      </header>
    </div>
  );
};

export default Header;
