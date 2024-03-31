import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import BullscMarket from "../engine/BullscMarket.json";
import NFTCollection from "../engine/NFT.json";
import NFT from "../engine/NFT.json";
import { useRouter } from "next/router";
import {
  CowsNFT,
  BearBSCNFT,
  BulBSCNFT,
  BullsNFT,
  BearNFT,
  PolarBearNFT,
  YellowCowsNFT,
} from "../engine/configuration";
import { polyChain } from "../engine/chainchange";
import {
  Card,
  Button,
  Input,
  Col,
  Row,
  Spacer,
  Container,
  Text,
  Grid,
} from "@nextui-org/react";
import axios from "axios";
import "sf-font";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { marketplaceAddress, bsctmarket } from "../engine/configuration";
import { bsctresell, bsctnftcol, bsctrpc } from "../engine/configuration";
import { cipherEth, simpleCrypto } from "../engine/configuration";
import Select, { components } from "react-select";

export default function Sell() {
  const options = [
    // { value: "-", label: "choose", icon: "arrow.svg" },
    { value: "0", label: "MATIC", icon: "matic-token-icon.webp" },
  ];
  const { Option } = components;

  const [user, getUser] = useState([]);
  const [chain, getChainName] = useState("");
  const [rpc, getRpc] = useState([]);
  const [nftcol, getNftCol] = useState([]);
  const [nftcustom, getNftCustom] = useState([]);
  const [nftresell, getNftResell] = useState([]);
  const [ownerAddr, setOwnerAddr] = useState("");
  const [created, getCreated] = useState([]);
  const [resalePrice, updateresalePrice] = useState([]);
  const [resaleToken, setResaleToke] = useState([0]);
  const [nfts, setNfts] = useState([]);
  const [prod, setProds] = useState([]);
  const [marketplaceadd, setMarketplaceadd] = useState("");
  const [Comp, setComp] = useState(0);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);
  const IconOption = (props) => (
    <Option {...props}>
      <img
        src={"/" + props.data.icon}
        style={{ width: 36 }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
  );
  const getMetadata = async (baseURI) => {
    let s = await axios.get(
      baseURI.replace("ipfs://", "https://ipfs.io/ipfs/")
    );
    return s.data;
  };
  const getSimpleHash = async (owner) => {
    const options = {
      headers: {
        accept: "application/json",
        "X-API-KEY":
          "bullsclub_sk_22165387-689b-4bdd-aea4-dd13179bfa51_2d5oq0c55iwiavd7",
      },
    };

    const rest = await axios.get(
      "https://api.simplehash.com/api/v0/nfts/owners?chains=polygon&wallet_addresses=" +
        owner +
        "&limit=50",
      options
    );
    // console.log(rest.data.nfts);
    const simpleHashNFTs = rest.data.nfts.map((item) => {
      // console.log(item);
      return {
        id: item.token_id,
        image: item.extra_metadata.image_original_url
          ? item.extra_metadata.image_original_url.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            )
          : null,

        address: item.contract_address,
        expiredate: "",
        name: item.collection.name + " " + item.token_id,
        stock: "1",
        price: 0.1,
        category: "Art",
        tags: "Polygone | For Sell | For Collect | Trending |  Trending_Arts",
        desc: item.description,
        owners: [
          {
            id: "1",
            name: "",
            image: "assets/images/seller/collector-1.png",
            verified: false,
            prfileLink: "/",
          },
        ],
      };
    });
    setProds(simpleHashNFTs);
  };
  const setMarketAdd = async () => {
    var bsct = "0x38";
    var poly = "0x89";
    const connected = await detectEthereumProvider();

    if (connected.chainId == bsct) {
      setMarketplaceadd(bsctmarket);
    }
    if (connected.chainId == poly) {
      setMarketplaceadd(marketplaceAddress);
    }
  };
  useEffect(() => {
    getChain();
    setMarketAdd();
    setRpc();

    if (window.ethereum.selectedAddress) {
      setOwnerAddr(window.ethereum.selectedAddress);
      getSimpleHash(window.ethereum.selectedAddress);

      console.log(window.ethereum.selectedAddress);
    } else {
      router.push("/wallet");
    }

    setLoading(true);
  }, [loading]);
  console.log(prod);

  const router = useRouter();

  async function setRpc() {
    var bsct = "0x38";
    var poly = "0x89";
    const connected = await detectEthereumProvider();
    console.log(connected.chainId);
    if (connected.chainId == bsct) {
      var mainnet = bsctrpc;
    }
    if (connected.chainId == poly) {
      var mainnet = "https://polygon.meowrpc.com";
    }
    console.log(mainnet);

    getRpc(mainnet);
    console.log(mainnet);
    setNftCol();
  }

  async function setNftCol() {
    var bsct = "0x38";
    const connected = await detectEthereumProvider();
    if (connected.chainId == bsct) {
      var nftcol = bsctnftcol;
    }
    getNftCol(nftcol);
    console.log(nftcol);
    setNftCustom();
  }

  async function setNftCustom() {
    var bsct = "0x38";
    var polyChain = 137;
    const connected = await detectEthereumProvider();
    console.log(connected);
    if (connected.chainId == bsct) {
      var nft = [BearBSCNFT, BulBSCNFT];
    }
    if (connected.chainId == polyChain) {
      var nft = [BearNFT, CowsNFT, BullsNFT, PolarBearNFT, YellowCowsNFT];
    }
    getNftCustom(nft);
    console.log(nft);
    setNftResell();
  }

  async function setNftResell() {
    var bsct = "0x38";
    const connected = await detectEthereumProvider();
    if (connected.chainId == bsct) {
      var nftresell = bsctresell;
    }
    getNftResell(nftresell);
    console.log(nftresell);
  }
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function getChain() {
    var bsct = "0x38";
    const connected = await detectEthereumProvider();
    if (connected.chainId == bsct) {
      var chainname = "BSC";
    }
    getChainName(chainname);
    return chainname;
  }

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

  async function getWalletNFTs() {
    var address = window.ethereum.selectedAddress
      ? window.ethereum.selectedAddress
      : "";
    var network = rpc;
    console.log(address);
    const provider = new ethers.providers.JsonRpcProvider(network);
    const key = simpleCrypto.decrypt(cipherEth);
    const wallet = new ethers.Wallet(key, provider);
    const itemArray = [];
    for (var t = 0; t < nftcustom.length; t++) {
      console.log(nftcustom[t]);
      const contract = new ethers.Contract(nftcustom[t], NFTCollection, wallet);
      const tokens = await contract.walletOfOwner(address);
      console.log(tokens);
      for (var l = 0; l < tokens.length; l++) {
        const token = Number(tokens[l]);
        console.log(token);
        const rawUri = await contract.tokenURI(token);
        const cleanUri = rawUri.replace("ipfs://", "https://ipfs.io/ipfs/");
        await sleep(1000);

        let value = await axios.get(cleanUri);
        let rawImg = value.data.image;
        var name = value.data.name;
        var desc = value.data.description;
        let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");

        setNfts([
          ...nfts,
          {
            name: name,
            img: image,
            tokenId: token,
            wallet: address,
            desc,
            address: nftcustom[t],
          },
        ]);
      }
    }
    console.log(itemArray);
  }

  async function SellNFT(address, tokenID, price, Token) {
    console.log(Token);
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const val = Number(0.025 * 1e18).toString(16);
    const pricing =
      Token == "0"
        ? (parseFloat(price) * 1e18).toString(16)
        : (parseFloat(price) * 10 ** 18).toString();
    console.log(pricing);
    const fee = Number(0.025 * 1e18).toString(16);
    const gazfees = await provider.getFeeData();
    console.log(gazfees.maxPriorityFeePerGas.toString());
    console.log(gazfees.maxFeePerGas.toString());

    console.log(
      address,
      tokenID?.toString(),
      "0x" + pricing,
      Token == "0" ? true : false,
      Token == "0" ? "0x0000000000000000000000000000000000000000" : Token
    );
    const nftContract = await new web3.eth.Contract(
      BullscMarket,
      marketplaceadd
    );
    //set up your Ethereum transaction
    const transactionParameters = {
      to: marketplaceadd, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      //gasLimit: web3.utils.toHex(web3.utils.toWei('50','gwei')),
      //gasPrice: web3.utils.toHex(web3.utils.toWei('60','gwei')),
      // maxPriorityFeePerGas: web3.utils.toHex(gazfees.maxPriorityFeePerGas.toString()),
      // maxFeePerGas: web3.utils.toHex(gazfees.maxFeePerGas.toString()),
      gas: ethers.BigNumber.from(500000).toHexString(),
      value: val,
      data: nftContract.methods
        .createVaultItem(
          address,
          tokenID.toString(),
          "0x" + pricing,
          Token == "0" ? true : false,
          Token == "0" ? "0x0000000000000000000000000000000000000000" : Token
        )
        .encodeABI(), //make call to NFT smart contract
      //Web3.utils.toBN(Web3.utils.toWei(val, "ether")).toString(16)
    };
    console.log(transactionParameters);
    //sign transaction via Metamask
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      // console.log(txHash);
      return {
        success: true,
        status: "✅ Check out your transaction on Etherscan: " + txHash,
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
  }
  async function Approve(address, tokenID) {
    console.log(tokenID);
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const gazfees = await provider.getFeeData();
    console.log(gazfees.maxPriorityFeePerGas.toString());
    console.log(gazfees.maxFeePerGas.toString());

    const nftContract = await new web3.eth.Contract(NFT, address);
    //set up your Ethereum transaction
    const transactionParameters = {
      to: address, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      //gasLimit: web3.utils.toHex(web3.utils.toWei('50','gwei')),
      //gasPrice: web3.utils.toHex(web3.utils.toWei('60','gwei')),
      maxPriorityFeePerGas: web3.utils.toHex(
        gazfees.maxPriorityFeePerGas.toString()
      ),
      maxFeePerGas: web3.utils.toHex(gazfees.maxFeePerGas.toString()),
      gas: ethers.BigNumber.from(500000).toHexString(),
      data: nftContract.methods.approve(marketplaceadd, tokenID).encodeABI(), //make call to NFT smart contract
      //Web3.utils.toBN(Web3.utils.toWei(val, "ether")).toString(16)
    };
    console.log(transactionParameters);
    //sign transaction via Metamask
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      // console.log(txHash);
      return {
        success: true,
        status: "✅ Check out your transaction on Etherscan: " + txHash,
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
  }

  async function getWalletNFTs1() {
    var address = window.ethereum.selectedAddress
      ? window.ethereum.selectedAddress
      : "";
    var network = rpc;
    console.log(address);
    const provider = new ethers.providers.JsonRpcProvider(network);
    const key = simpleCrypto.decrypt(cipherEth);
    const wallet = new ethers.Wallet(key, provider);
    const itemArray = [];
    for (var t = 0; t < nftcustom.length; t++) {
      const contract = new ethers.Contract(nftcustom[t], NFTCollection, wallet);

      contract.totalSupply().then(async (result) => {
        for (let i = 0; i < result; i++) {
          var token = i + 1;
          const owner = await contract.ownerOf(token);

          if (owner.toLowerCase() == address.toLowerCase()) {
            console.log("ok");
            const rawUri = await contract.tokenURI(token);

            const Uri = Promise.resolve(rawUri);
            const getUri = Uri.then((value) => {
              var cleanUri = value.replace("ipfs://", "https://ipfs.io/ipfs/");
              let metadata = axios.get(cleanUri).catch(function (error) {
                console.log(error.toJSON());
              });
              return metadata;
            });
            getUri.then((value) => {
              let rawImg = value.data.image;
              var name = value.data.name;
              var desc = value.data.description;
              let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");
              Promise.resolve(owner).then((value) => {
                let ownerW = value;
                let meta = {
                  name: name,
                  img: image,
                  tokenId: token,
                  wallet: ownerW,
                  desc,
                };
                console.log(meta);
                itemArray.push(meta);
              });
            });
          }
        }
      });
    }
    await new Promise((r) => setTimeout(r, 2000));
    setNfts(itemArray);
    setLoadingState("loaded");
  }

  async function getCreatedNFTs() {
    var address = nftcustom;
    var network = rpc;
    const provider = new ethers.providers.JsonRpcProvider(network);
    const key = simpleCrypto.decrypt(cipherEth);
    const wallet = new ethers.Wallet(key, provider);
    const contract = new ethers.Contract(address, NFT, wallet);
    const itemArray = [];
    contract._tokenIds().then((result) => {
      for (let i = 0; i < result; i++) {
        var token = i + 1;
        const owner = contract.ownerOf(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const rawUri = contract.tokenURI(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const Uri = Promise.resolve(rawUri);
        const getUri = Uri.then((value) => {
          var cleanUri = value.replace("ipfs://", "https://ipfs.io/ipfs/");
          let metadata = axios.get(cleanUri).catch(function (error) {
            console.log(error.toJSON());
          });
          return metadata;
        });
        getUri.then((value) => {
          let rawImg = value.data.image;
          var name = value.data.name;
          var desc = value.data.description;
          let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");
          Promise.resolve(owner).then((value) => {
            let ownerW = value;
            let meta = {
              name: name,
              img: image,
              tokenId: token,
              wallet: ownerW,
              desc,
            };
            console.log(meta);
            itemArray.push(meta);
          });
        });
      }
    });
    await new Promise((r) => setTimeout(r, 2000));
    getCreated(itemArray);
    setLoadingState("loaded");
  }

  async function refreshNFTs() {
    setRpc();
    getWalletNFTs();
    getChain();
  }

  async function connectWallet() {
    connectUser();
    setRpc();
    getChain();
  }

  if (loadingState && !prod.length)
    return (
      <Container>
        <Row>
          <Col>
            <Text h3>No NFTs Found, Connect Wallet</Text>
            <Button
              size="sm"
              color="gradient"
              onPress={refreshNFTs}
              style={{ fontSize: "20px" }}
            >
              Refresh
            </Button>
          </Col>
        </Row>
        <Spacer></Spacer>
      </Container>
    );
  if (loading && prod.length)
    return (
      <div>
        <Container md>
          <Row>
            <Col css={{ size: "$50", paddingLeft: "$10", paddingTop: "$4" }}>
              <Card css={{ p: "$9", backgroundColor: "$blue200" }}>
                <Row>
                  <Text h4 css={{ marginRight: "$3" }}>
                    Select Blockchain
                  </Text>
                  <Button
                    size="sm"
                    onPress={polyChain}
                    css={{ marginRight: "$2" }}
                  >
                    <img src="polygonwhite.png" width={"100px"} />
                  </Button>
                </Row>
                <Card css={{ p: "$4", marginTop: "$3" }}>
                  <Text h3>
                    Wallet
                    <Text h5 css={{ color: "#39FF14" }}>
                      {user}
                    </Text>
                  </Text>
                  <Text h6>
                    Must Approve 1st, sign the transaction and wait for network
                    to process
                  </Text>
                  <Text h6>
                    it could take few moments to process a transaction on the
                    blockchain
                  </Text>

                  <Text h6>Add your price,Then list for sale</Text>
                  <Text h6>Listing Fee :0.025 MATIC</Text>
                  <Row>
                    <Button
                      size="sm"
                      color="gradient"
                      onPress={connectWallet}
                      style={{ fontSize: "20px", marginRight: "4px" }}
                    >
                      Connect
                    </Button>
                    <Button
                      size="sm"
                      color="gradient"
                      onPress={refreshNFTs}
                      style={{ fontSize: "20px" }}
                    >
                      Refresh
                    </Button>
                  </Row>
                </Card>
              </Card>
            </Col>
          </Row>
          <Row>
            <Grid.Container gap={3}>
              {prod.map((nft, i) => {
                return (
                  <Grid key={i}>
                    <a>
                      <Card
                        isHoverable
                        key={i}
                        css={{ mw: "250px", marginRight: "$1" }}
                        variant="bordered"
                      >
                        <Card.Image src={nft.image} />
                        <Card.Body key={i}>
                          <Col>
                            <Button
                              size="sm"
                              color="gradient"
                              style={{ fontSize: "20px" }}
                              onClick={() => {
                                console.log(resalePrice[0]),
                                  Approve(nft.address, nft.id);
                              }}
                            >
                              Approve to sell
                            </Button>
                            <h3
                              style={{
                                color: "#9D00FF",
                                fontFamily: "SF Pro Display",
                              }}
                            ></h3>
                            <Text h5>
                              {nft.name} Token-{nft.id}
                            </Text>

                            <Input
                              size="sm"
                              css={{
                                marginTop: "$2",
                                maxWidth: "120px",
                                marginBottom: "$2",
                                border: "$blue500",
                              }}
                              style={{
                                color: "black",
                                fontFamily: "SF Pro Display",
                                fontWeight: "bolder",
                                fontSize: "15px",
                              }}
                              placeholder="Set your price"
                              value={resalePrice[0]}
                              onChange={(e) => {
                                let s = resalePrice;
                                s[i] = e.target.value;

                                updateresalePrice(s);
                              }}
                            />

                            <Button
                              size="sm"
                              color="gradient"
                              style={{ fontSize: "20px" }}
                              onClick={() => {
                                // console.log("sssss", i),
                                SellNFT(
                                  nft.address,
                                  nft.id,
                                  resalePrice[0],
                                  resaleToken[0]
                                );
                              }}
                            >
                              Relist for Sale
                            </Button>

                            <Spacer />

                            {/* <Select
                              styles={{ zIndex: 1001 }}
                              defaultValue={options[0]}
                              options={options}
                              components={{ Option: IconOption }}
                              onChange={(e) => {
                                let s = resaleToken;
                                s[i] = e.value;
                                console.log(s);
                                setResaleToke(s);
                              }}
                            /> */}
                            <div className="d-flex gap-2 align-items-center m-1">
                              <Text>MATIC</Text>
                              <img
                                src="/matic-token-icon.webp"
                                style={{ width: 36 }}
                                alt="MATIC"
                              />
                            </div>

                            <Spacer></Spacer>
                          </Col>
                          <Col>
                            <Spacer></Spacer>
                          </Col>
                        </Card.Body>
                      </Card>
                    </a>
                  </Grid>
                );
              })}
            </Grid.Container>
          </Row>
        </Container>
        <Spacer></Spacer>
      </div>
    );
}
