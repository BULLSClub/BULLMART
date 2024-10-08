import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import ProductSingle from "../components/common/Products/ProductSingle1";
import BullscMarket from "../engine/BullscMarket.json";
import NFT from "../engine/NFT.json";
import axios from "axios";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const Provider = "https://polygon-rpc.com/";
const bsctrpc = "https://bsc-dataseed1.ninicoin.io";

const privKey =
  "713b86cbd9689ccc2bd09bf4ca9030e4e3b4e484d7161b05dc45239ebdcaa0eb";

const Explore = () => {
  const [products, setshowProducts] = useState([]);
  const [Prods, setProds] = useState([]);
  const [loading, setLoading] = useState(0);
  const router = useRouter();
  const getprods = async () => {
    var hh = "0x7a69";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    const connected = await detectEthereumProvider();
    let provider;
    let web3;
    let contactAddr;
    if (connected.chainId == bsct) {
      provider = new ethers.providers.JsonRpcProvider(bsctrpc);
      web3 = new Web3(new Web3.providers.HttpProvider(bsctrpc));
      contactAddr = "";
    }
    web3 = new Web3(new Web3.providers.HttpProvider(Provider));
    console.log(Provider);
    contactAddr = "0xDBC3233788bab61C0A9D9b155539DE04fdA06EAd";
    provider = new ethers.providers.JsonRpcProvider(Provider);
    const signer = new ethers.Wallet(privKey);
    const account = signer.connect(provider);
    //const gasPrice = await provider.getFeeData();
    //var gaz=ethers.utils.formatUnits(gasPrice.gasPrice, "ether")
    console.log("---------");
    //console.log(gaz);
    // const uniswap = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    // ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)external payable returns (uint[] memory amounts)']
    // ,account);
    const products = new ethers.Contract(contactAddr, BullscMarket, account);
    console.log("****ok*****");
    // console.log(val.c[0]);
    const tx = await products.getAvailableNft();
    console.log(tx);

    // const decodedResult = web3.eth.abi.decode(['uint256', 'address',"uint256","address","bool","address","address","uint256","bool"], tx1);

    console.log(tx);
    return tx;
  };

  const getBaseUri = async (cnt, id) => {
    const provider = new ethers.providers.JsonRpcProvider(Provider);
    const signer = new ethers.Wallet(privKey);
    const account = signer.connect(provider);
    const NFTs = new ethers.Contract(cnt, NFT, account);
    console.log(cnt, id);
    const tx = await NFTs.tokenURI(id.toString());
    console.log(tx);
    return tx;
  };
  const getMetadata = async (baseURI) => {
    let s = await axios.get(
      baseURI.replace("ipfs://", "https://ipfs.io/ipfs/")
    );
    return s.data;
  };
  useEffect(() => {
    const effect = async () => {
      if (window.ethereum.selectedAddress) {
        console.log(window.ethereum.selectedAddress);
      } else {
        router.push("/wallet");
      }
      let x = await getprods();
      console.log(x);
      let s = [];
      const l = x.map(async (item) => {
        console.log(item);
        if (item[1] != "0x0000000000000000000000000000000000000000") {
          console.log(item[7].toString());
          const baseURI = await getBaseUri(item[1], item[2]);
          let r = await getMetadata(baseURI);

          const s = {
            id: r.name.split("#")[1],
            itemID: item[0].toString(),
            image: r.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
            wishlist: "",
            expiredate: r.data,
            contactAddr: item[1],
            title: r.name,
            stock: "1",
            token: item[3],
            isPayble: item[4],
            seller: item[5],
            price: (Number(item[7]) / 10 ** 18).toString(),
            category: "Art",
            tags: "Polygone | For Sell | For Collect | Trending |  Trending_Arts",
          };
          console.log(s);

          return s;
        }
      });
      let filesPromise = await Promise.all(l);
      console.log(filesPromise);

      console.log(filesPromise);

      setshowProducts(filesPromise);
      setProds(filesPromise);
    };
    effect();
  }, []);

  const productSearch = (keyword) => {
    if (keyword != "") {
      var productListFiltered = Prods.filter((item) => {
        var productTag = item.tags.toLowerCase();
        var searchkeyword = keyword.toLowerCase();
        return productTag.includes(searchkeyword);
      });
      setshowProducts(productListFiltered);
    } else {
      setshowProducts(productList);
    }
  };

  return (
    <div>
      <section className="explore-section padding-top padding-bottom">
        <div className="container">
          <div className="section-wrapper">
            <div className="explore-category mb-5">
              <div className="row g-2 justify-content-center">
                <div className="col-xl-2 col-md-3 col-6 ">
                  <div className="excat-item active" data-filter="">
                    <a>
                      <i className="icofont-cubes"></i>
                      Utility
                    </a>
                  </div>
                </div>
                <div className="col-xl-2 col-md-3 col-6 ">
                  <div className="excat-item" data-filter=".art">
                    <a>
                      <i className="icofont-drawing-tablet"></i> Art
                    </a>
                  </div>
                </div>
                <div className="col-xl-2 col-md-3 col-6 ">
                  <div className="excat-item" data-filter=".virtual">
                    <a>
                      <i className="icofont-diving-goggle"></i> Virtual World
                    </a>
                  </div>
                </div>
                <div className="col-xl-2 col-md-3 col-6 ">
                  <div className="excat-item" data-filter=".trade">
                    <a>
                      <i className="icofont-penalty-card"></i>
                      Cards
                    </a>
                  </div>
                </div>
                <div className="col-xl-2 col-md-3 col-6 ">
                  <div className="excat-item" data-filter=".collect">
                    <a>
                      <i className="icofont-cat-face"></i>
                      Collectibles
                    </a>
                  </div>
                </div>
                <div className="col-xl-2 col-md-3 col-6 ">
                  <div className="excat-item" data-filter=".sport">
                    <a>
                      <i className="icofont-runner-alt-1"></i>
                      Sports
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="section-wrapper">
            <div className="row gy-5 flex-row-reverse">
              <div className="col-lg-9">
                <div className="explore-wrapper explore-load">
                  <div className="row g-4">
                    {products?.map((item) => (
                      <div className="col-xl-4 col-md-6" key={item?.id}>
                        <ProductSingle data={item ? item : null} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <aside className="nft-filter">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <i className="icofont-atom"></i> Chain
                        </button>
                      </h2>

                      <div className="accordion-body">
                        <div className="form-check">
                          <label className="form-check-label">Polygon</label>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button"
                          type="button"
                         
                        
                        >
                          <i className="icofont-ui-browser"></i> Status
                        </button>
                      </h2>

                      <div className="accordion-body">
                        <div className="form-check">
                          <label className="form-check-label">For Sell</label>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <i className="icofont-library"></i> Collections
                        </button>
                      </h2>

                      <div className="accordion-body">
                        <div className="form-check">
                          <label className="form-check-label">BULLS COLLECTION</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
