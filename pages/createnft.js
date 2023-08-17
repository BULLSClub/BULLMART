import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

import {
  DefaultNFTPolygon,
  polygonRpc,
  bsctrpc
} from "../engine/configuration";
import NFTcreate from "../engine/NFTcreate";
import Web3 from "web3";
// import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const { ethers, Wallet } = require("ethers");
const axios = require("axios");


const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNTEyMDQ4ZS0xOWFlLTQ4ZmYtOGFiOS0xZGQxNDljMGRiMjQiLCJlbWFpbCI6ImNvbnRhY3QuZWxlYXJuaW5nMjAyMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMWQ0YjNhN2FjMDBiZWYwMDU5ZmMiLCJzY29wZWRLZXlTZWNyZXQiOiIzMzdlMTM5OTUwMjUwYjBmOWM1OGIzOTJkYTkxZjUzM2U1NWViZmNmNDQ3ZThiMWFkMDFiOTg5MTRkYWQ5ZTljIiwiaWF0IjoxNjc1MTY1MTUwfQ.Of1UvNC2NF3oBh0Qkr7aA7rVNJCl6oN6W08TeOYmEVI`;
export const createToken = async (baseURI) => {
  //error handling
  var hh = "0x7a69";
  var goe = "0x5";
  var mm = "0x13881";
  var bsct = "0x61";

  const connected = await detectEthereumProvider();
  let provider;
  let web3;
  if (connected.chainId == bsct) {
    provider = new ethers.providers.JsonRpcProvider(bsctrpc);
    web3 = new Web3(new Web3.providers.HttpProvider(bsctrpc));
  }

  provider = new ethers.providers.JsonRpcProvider(polygonRpc);
  web3 = new Web3(new Web3.providers.HttpProvider(polygonRpc));

  const gasPrice = await provider.getFeeData();

  const nftContract = await new web3.eth.Contract(NFTcreate, DefaultNFTPolygon);
  const val = (parseFloat(0.0175) * 1e18).toString(16);

  console.log(baseURI);
  const transactionParameters = {
    to: DefaultNFTPolygon, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    //gasLimit: web3.utils.toHex(web3.utils.toWei('50','gwei')),
    //gasPrice: web3.utils.toHex(web3.utils.toWei('60','gwei')),
    // maxPriorityFeePerGas: web3.utils.toHex(
    //   Number(gasPrice.maxPriorityFeePerGas) * 25
    // ),
    // maxFeePerGas: null,
    gas: ethers.BigNumber.from(500000).toHexString(),
    data: nftContract.methods.createToken(baseURI).encodeABI(), //make call to NFT smart contract
    value: val
    // 'data': nftContract.methods.transferFrom(amount).encodeABI()
    //make call to NFT smart contract
    //Web3.utils.toBN(Web3.utils.toWei(val, "ether")).toString(16)
  };
  console.log(transactionParameters);
  //sign transaction via Metamask
  try {
    const txHash = await window?.ethereum?.request({
      method: "eth_sendTransaction",
      params: [transactionParameters]
    });
    // console.log(txHash);
    window.crypto_cb = function () {
      console.log(txHash);
      return txHash;
    };
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    };
  }
};
const CreateNft = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  const [titreNFT, settitreNFT] = useState("");
  const [descriptionNFT, setdescriptionNFT] = useState("");
  // useEffect(() => {
  //   if (window?.ethereum?.selectedAddress) {
  //     console.log("new", window.ethereum.selectedAddress);
  //   } else {
  //     router.push("/Wallet");
  //   }
  // }, []);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmission = async () => {
    if (selectedFile && selectedFile.size <= 150 * 1024 * 1024) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "File name"
      });
      formData.append("pinataMetadata", metadata);
      const options = JSON.stringify({
        cidVersion: 0
      });
      formData.append("pinataOptions", options);
      console.log(formData);
      try {
        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": formData._boundary,
              Authorization: JWT
            }
          }
        );
        let metadataNFT = {
          name: titreNFT,
          image: "ipfs://" + res.data.IpfsHash,
          description: descriptionNFT,
          attributes: []
        };
        var config = {
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          headers: {
            "Content-Type": "application/json",
            Authorization: JWT
          },
          data: metadataNFT
        };
        const result = await axios(config);
        console.log(result);
        await createToken("ipfs://" + result.data.IpfsHash);
      } catch (error) {
        console.log(error);
      }
      alert ("NFT proccesing 🐮! be patient");
      router.push("portal");
    } else {
      // Handle error for exceeding file size limit
      alert("File size exceeds the limit of 150MB.");
    }
  };
  return (
    <div>
      <section className="create-nft-section padding-bottom padding-top">
        <div className="container">
          <div className="section-wrapper">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="create-nft py-5 px-4">
                  <div className="create-nft-form">
                    <h3>CONNECT to POLYGON</h3>
                    <h5>Upload 3D items, Music, Video or Art and more</h5>
                    <div className="upload-item mb-30">
                      <p>
                        PNG,JPG,JPEG,SVG,WEBP,AVI,HTML,GLP,Mp3 & Mp4 (Max-150mb)
                      </p>
                      <div className="custom-upload">
                        <div className="file-btn">
                          <i className="icofont-upload-alt"></i>
                          Upload a file
                        </div>
                        <input type="file" onChange={changeHandler} />
                      </div>
                      <div>
                        {selectedFile && (
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            className=""
                            alt="image"
                          />
                        )}
                      </div>
                    </div>
                    <div className="form-floating item-name-field mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="itemNameInput"
                        placeholder="Item Name"
                        value={titreNFT}
                        onChange={(ev) => settitreNFT(ev.target.value)}
                      />
                      <label>Item Name</label>
                    </div>
                    <div className="form-floating item-desc-field mb-30">
                      <textarea
                        className="form-control"
                        placeholder="Item Description"
                        id="itemDesc"
                        value={descriptionNFT}
                        onChange={(ev) => setdescriptionNFT(ev.target.value)}
                      ></textarea>
                      <label>Item Description</label>
                    </div>
                    <div className="item-category-field mb-30">
                      <h4>Upload for Catergories</h4>
                      <ul className="item-cat-list d-flex flex-wrap">
                        <li className="item-cat-btn active">
                          <span>
                            <i className="icofont-paint-brush"></i>
                          </span>
                          Art
                        </li>
                        <li className="item-cat-btn">
                          <span>
                            <i className="icofont-music-alt"></i>
                          </span>
                          Music
                        </li>
                        <li className="item-cat-btn">
                          <span>
                            <i className="icofont-video-cam"></i>
                          </span>
                          Video
                        </li>
                        <li className="item-cat-btn">
                          <span>
                            <i className="icofont-ticket"></i>
                          </span>
                          Ticket
                        </li>

                        <li className="item-cat-btn">
                          <span>
                            <i className="icofont-web"></i>
                          </span>
                          Domain
                        </li>
                        <li className="item-cat-btn">
                          <span>
                            <i className="icofont-ui-game"></i>
                          </span>
                          Collectibles
                        </li>
                        <li className="item-cat-btn">
                          <span>
                            <i className="icofont-file-pdf"></i>
                          </span>
                          Article
                        </li>
                        <li className="item-cat-btn">
                          <span>
                            <i className="icofont-abacus-alt"></i>
                          </span>
                          Multiverse
                        </li>
                        <li className="item-cat-btn">
                          <span>
                            <i className="icofont-box"></i>
                          </span>{" "}
                          Utility
                        </li>
                      </ul>
                    </div>

                    <div className="item-price-field mb-3">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <select
                              className="form-select"
                              id="selectCrypto"
                              aria-label="Floating label select"
                            >
                              <option>MATIC</option>
                              <option value="1">BNB</option>
                              <option value="3">BULLS</option>
                            </select>
                            <label>Select Currency</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="itemPriceInput"
                              placeholder="Item Price"
                            />
                            <label>Item Price</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item-price-field mb-5">
                      <div className="row g-3 justify-content-center">
                        <div className="col-md-6 col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="royalityInput"
                              placeholder="Royalities"
                            />
                            <label>Royalities</label>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="sizeInput"
                              placeholder="150"
                            />
                            <label>Size</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h6>
                      By Creating an Item, Your NFT will Mint on the Polygon
                      Blockchain where it will live for ever. "Minting Fee
                      0.0175 Matic, plus network fee"{" "}
                    </h6>
                    <h6>
                      The information added above for the metadata creation.
                    </h6>
                    <h6>
                      List your Newely Minted NFT for Sale from your Profile, Or
                      from your W3B Wallet at any 3rd party Marketplace
                    </h6>
                    <h6></h6>
                    <div
                      className="submit-btn-field text-center"
                      onClick={() => handleSubmission()}
                    >
                      <button>Create Item</button>
                    </div>
                  </div>
                  <div className="text-center mt-5">
                    <a
                      href="https://opensea.io/collection/clubsnfts-2"
                      target="_blank"
                    >
                      <a className="default-btn move-right">
                        <span>Minted NFTs @Opensea</span>
                      </a>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateNft;