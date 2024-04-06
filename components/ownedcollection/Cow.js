import React from 'react'
import { Button } from 'react-bootstrap';
import { ethers } from "ethers";
import { useEffect, useState } from 'react'
import axios from 'axios';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import VAULTABI from './VAULTABI.json';
import NFTABI from '../../engine/NFT.json';
import MARKETABI from '../../engine/BullscMarket.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Input, Col, Row, Spacer, Container, Text, Grid } from '@nextui-org/react';
import { mmnft, mmresell, mmnftcol, mmrpc } from '../../engine/configuration';
import { goenft, goeresell, goenftcol, goerpc } from '../../engine/configuration';
import { hhnft, hhresell, hhnftcol, hhrpc,BearNFT,CowsNFT,marketplaceAddress,bsctmarket, YellowCowsNFT } from '../../engine/configuration';
import { bsctnft, bsctresell, bsctnftcol, bsctrpc } from '../../engine/configuration';
import { useRouter } from 'next/router'
import detectEthereumProvider from '@metamask/detect-provider';
import Select, { components } from "react-select";

var web3 = null;
var account = null;
var marketcontract = null;
var vaultcontract = null;
var contract = null;







const NFTCONTRACT = "0xFc6D74b6c444b00f39544152553b306C24542d94";
const STAKINGCONTRACT = "0x238d94ed5780f5F058a2f6CfaF3aD975887a7308";
const MARKETCONTRACT = "0xDBC3233788bab61C0A9D9b155539DE04fdA06EAd";
const moralisapi = "https://deep-index.moralis.io/api/v2/";
const moralisapikey = "kDivwybEmEzIpTliB1KNyc9gEuE748bYd9qZeUiXVdQeUjpiGUoMWqAeHLchRH7k";
const nftpng = "https://dweb.link/ipfs/QmPeUUVv6VYtXcJiaffkD9S8V7xDmwzWaqJHwdEi4jUVuy/";






    

export default function Cow  ()  {




  const options = [
   
    { value: "0", label: "MATIC", icon: "matic-token-icon.webp" },
   
  ];

  const { Option } = components;
  const IconOption = props => (
    <Option {...props}>
      <img
        src={'/' + props.data.icon}
        style={{ width: 36 }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
  );

  const [user, getUser] = useState([])
  const [chain, getChainName] = useState("")
  const [nftcol, getNftCol] = useState([])
  const [nftcustom, getNftCustom] = useState([])
  const [nftresell, getNftResell] = useState([])
  const [ownerAddr,setOwnerAddr] = useState("");
  const [created, getCreated] = useState([])
  const[Comp,setComp] = useState(0)
  const [loading, setLoading] = useState(false)
  const [apicall, getNfts] = useState([])
  const [nftstk, getStk] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [open,setOpen] = useState(false);
  const [tokenID,setTokenID] = useState(0);
  const [address,setAddress] = useState("");
  const [resalePrice, updateresalePrice] = useState([])
  const [resaleToken, setResaleToke] = useState([])
  const [nfts, setNfts] = useState([])
  const [prod, setProds] = useState([])
  const [marketplaceadd, setMarketplaceadd] = useState("")
  const [rpc, getRpc] = useState([])


  const web3Modal = new Web3Modal({
    network: "polygon",
    theme: "dark",
    });





  const getSimpleHash = async(owner) =>{
    const options = {
      headers: {accept: 'application/json', 'X-API-KEY': 'bullsclub_sk_22165387-689b-4bdd-aea4-dd13179bfa51_2d5oq0c55iwiavd7'}
    };
    
    const rest= await axios.get('https://api.simplehash.com/api/v0/nfts/owners?chains=polygon&wallet_addresses='+owner+'&limit=50', options);
    console.log(rest.data.nfts);
    const simpleHashNFTs = rest.data.nfts.map((item) => {
      console.log(item);
      return{
                 id: item.token_id,
                 image: item.extra_metadata.image_original_url ? item.extra_metadata.image_original_url.replace("ipfs://","https://ipfs.io/ipfs/") : null,
                 wishlist: "0.352",
                 address:item.contract_address,
                 expiredate: "",
                 name: item.collection.name+" "+item.token_id,
                 stock: "1",
                 price: 0.1,
                 category: "Art",
                 tags: "Polygone | For Sell | For Collect | Trending |  Trending_Arts",
                 desc: item.description,
                 owners: [
                     {
                         id:"1",
                         name:"",
                         image:"assets/images/seller/collector-1.png",
                         verified: false,
                         prfileLink:"/"
                     }
                    
                 ]
                
             }
            }
    ) ;
    setProds(simpleHashNFTs);}
   const setMarketAdd = async() => { 
      var bsct = "0x38";
      var poly = "0x89";
      const connected = await detectEthereumProvider(); 
      if (connected.chainId == bsct) {
        setMarketplaceadd(bsctmarket);
      }
      if(connected.chainId == poly)
      {
        setMarketplaceadd(marketplaceAddress); 
      }
   }
    useEffect(() => {
      getChain();
      setMarketAdd();
      setRpc();

      if (window.ethereum.selectedAddress)
      {
        setOwnerAddr(window.ethereum.selectedAddress);
        getSimpleHash(window.ethereum.selectedAddress);
        console.log(window.ethereum.selectedAddress)
      }
      else
      {
        router.push("/wallet")

      }


  setLoading(true);
     }, [loading])
     console.log(prod)

    const router = useRouter()

    async function setRpc(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x38";
      var poly = "0x89";
      const connected = await detectEthereumProvider();
      console.log(connected.chainId);
      if (connected.chainId == hh) {
        var mainnet = hhrpc
      }
      else if (connected.chainId == goe) {
        var mainnet = goerpc
      }
      else if (connected.chainId == mm) {
        var mainnet = mmrpc
      }
      else if (connected.chainId == bsct) {
        var mainnet = bsctrpc
      }
      if(connected.chainId == poly)
      {
        var mainnet = "https://polygon.meowrpc.com";
      }
      console.log(mainnet);

      getRpc(mainnet);
      console.log(mainnet)
      setNftCol();
    }

    async function setNftCol(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x61";
      const connected = await detectEthereumProvider();
      if (connected.chainId == hh) {
        var nftcol = hhnftcol
      }
      else if (connected.chainId == goe) {
        var nftcol = goenftcol
      }
      else if (connected.chainId == mm) {
        var nftcol = mmnftcol
      }
      else if (connected.chainId == bsct) {
        var nftcol = bsctnftcol
      }
      getNftCol(nftcol);
      console.log(nftcol)
      setNftCustom();
    }

    async function setNftCustom(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x38";
      var polyChain = 137;
      const connected = await detectEthereumProvider();
      console.log(connected);
      if (connected.chainId == hh) {
        var nft = hhnft
      }
      else if (connected.chainId == goe) {
        var nft = goenft
      }
      else if (connected.chainId == mm) {
        var nft = mmnft
      }
      else if (connected.chainId == bsct) {
        var nft = [cryptoBearNFT,CryptoCowsClub07];
      }
      if(connected.chainId == polyChain)
      {
        var nft = [BearNFT ,CowsNFT, YellowCowsNFT];
      }
      getNftCustom(nft);
      console.log(nft)
      setNftResell();
    }

    async function setNftResell(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x61";
      const connected = await detectEthereumProvider();
      if (connected.chainId == hh) {
        var nftresell = hhresell
      }
      else if (connected.chainId == goe) {
        var nftresell = goeresell
      }
      else if (connected.chainId == mm) {
        var nftresell = mmresell
      }
      else if (connected.chainId == bsct) {
        var nftresell = bsctresell
      }
      getNftResell(nftresell);
      console.log(nftresell)
    }
    const sleep = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
    async function getChain(){
      var hh = "0x7a69";
      var goe = "0x5";
      var mm = "0x13881";
      var bsct = "0x61";
      const connected = await detectEthereumProvider();
      if (connected.chainId == hh) {
        var chainname = "HardHat"
      }
      else if (connected.chainId == goe) {
        var chainname = "Goerli Testnet"
      }
      else if (connected.chainId == mm) {
        var chainname = "Mumbai Testnet"
      }
      else if (connected.chainId == bsct) {
        var chainname = "BSC Testnet"
      }
      getChainName(chainname);
      return chainname;
    }

    async function connectUser() {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
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
      var address = window.ethereum.selectedAddress ? window.ethereum.selectedAddress : ""
      var network = rpc
      console.log(address)
      const provider = new ethers.providers.JsonRpcProvider(network)
      const key = simpleCrypto.decrypt(cipherEth)
      const wallet = new ethers.Wallet(key, provider);
      const itemArray = [];   
      for(var t = 0 ; t< nftcustom.length;t++)
      {
        console.log(nftcustom[t]);
        const contract = new ethers.Contract(nftcustom[t], NFTCollection, wallet)
        const tokens = await contract.walletOfOwner(address);
        console.log(tokens);
        for(var l = 0 ; l< tokens.length;l++)
        {
            const token = Number(tokens[l]);
            console.log(token);
            const rawUri = await contract.tokenURI(token);
            const cleanUri = rawUri.replace('ipfs://', 'https://ipfs.io/ipfs/');
            await sleep(1000);

            let value = await axios.get(cleanUri);
            let rawImg = value.data.image
              var name = value.data.name
              var desc = value.data.description
              let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')

              setNfts([...nfts,{
                name: name,
                img: image,
                tokenId: token,
                wallet: address,
                desc,
                address:nftcustom[t]
              }])
             


        }
      

      }
      console.log(itemArray);

    

    }








const handleClose = (value) => {
  setOpen(false);
};
  useEffect(() => {
    callApi()
  }, [])
  const transfer = (tokenID) => {

    setTokenID(tokenID);
    setOpen(true);
  }

  
  async function SellNFT(address,tokenID,price,Token) {
    console.log(rpc);
    const provider= new ethers.providers.JsonRpcProvider(rpc);
    var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const val= Number(0.025 * 1e18).toString(16);
    const pricing = Token == "0" ? (parseFloat(price)* 1e18).toString(16) : (parseFloat(price)* 10**18).toString()   ;
console.log(pricing)
    const fee = Number(0.0125 * 1e18).toString(16);
    const gazfees= await provider.getFeeData();
    console.log(gazfees.maxPriorityFeePerGas.toString())
    console.log(gazfees.maxFeePerGas.toString())

    console.log(address,tokenID.toString(),"0x"+pricing,Token == "0" ? true: false,Token == "0" ? "0x0000000000000000000000000000000000000000":Token)
const nftContract = await new web3.eth.Contract(MARKETABI, marketplaceadd);
//set up your Ethereum transaction
const transactionParameters = {
    to: marketplaceadd, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
//gasLimit: web3.utils.toHex(web3.utils.toWei('50','gwei')),  
//gasPrice: web3.utils.toHex(web3.utils.toWei('60','gwei')), 
    // maxPriorityFeePerGas: web3.utils.toHex(gazfees.maxPriorityFeePerGas.toString()),
    // maxFeePerGas: web3.utils.toHex(gazfees.maxFeePerGas.toString()),
    gas: ethers.BigNumber.from(300000).toHexString(),
    value:val,
    'data': nftContract.methods.createVaultItem(address,tokenID.toString(),"0x"+pricing,Token == "0" ? true: false,Token == "0" ? "0x0000000000000000000000000000000000000000":Token).encodeABI() //make call to NFT smart contract 
//Web3.utils.toBN(Web3.utils.toWei(val, "ether")).toString(16)
};
console.log(transactionParameters)
//sign transaction via Metamask
try {
    const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
    // console.log(txHash);
    return {
        success: true,
        status: "✅ Check out your transaction on Etherscan: " + txHash
    }
} catch (error) {
    return {
        success: false,
        status: "😥 Something went wrong: " + error.message
    }
}
  }


  async function callApi() {
    var provider = await web3Modal.connect();
    web3 = new Web3(provider);
    await provider.send('eth_requestAccounts');
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
		let config = {'X-API-Key': moralisapikey, 'accept': 'application/json'};
		const nfts = await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=polygon&format=decimal`), {headers: config})
    .then(output => {
        const { result } = output.data
        return result;
      })
    const apicall = await Promise.all(nfts.map(async i => {
      let item = {
        tokenId: i.token_id,
        holder: i.owner_of,
        wallet: account,
      }
      return item
    }))
    const stakednfts = await vaultcontract.methods.tokensOfOwner(account).call()
    .then(id => {
      return id;
    })
    const nftstk = await Promise.all(stakednfts.map(async i => {
      let stkid = {
        tokenId: i,
      }
      return stkid
    }))
      getNfts(apicall)
      getStk(nftstk)
      console.log(apicall);
      setLoadingState('loaded')
    } 
    if (loadingState === 'loaded' && !apicall.length) 
    return (
          <h1 className="text-3xl">Wallet Not Connected</h1>)
  async function enable() {
    contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({ from: account });
  }











































































  return (
   

    <div className="container col-lg-11">
<div className='nftportal mb-4'>
            <div className="container col-lg-11">
              <div className="row items px-3 pt-3">
                <div className="ml-3 mr-3" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4, 5fr)", columnGap: "20px" }}>
                  {apicall.map((nft, i) => {
                    var owner = nft.wallet.toLowerCase();
                      if (owner.indexOf(nft.holder) !== -1) {
                    async function stakeit() {
                      vaultcontract.methods.stake([nft.tokenId]).send({ from: account });
                    }
                    return (
                      <div className="card nft-card mt-4 mb-4" key={i} >
                        <div className="image-over">
                          <img className="card-img-top" src={nftpng + nft.tokenId + '.png'} alt="" />
                        </div>
                        <div className="card-caption col-12 p-0">
                          <div className="card-body">
                            <h5 className="mb-0">COW #{nft.tokenId}</h5>    
                            <div className="card-bottom d-flex justify-content-between">
                              <input key={i} type="hidden" id='stakeid' value={nft.tokenId} />
                             
                             

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
                          placeholder="Price"
                          value={resalePrice[i]}
                          onChange={(e) => {
                            let s = resalePrice
                            s[i] = e.target.value
                            
                            updateresalePrice(s);
                          }
                          }
                        />
                              <Button style={{ marginLeft: '2px', backgroundColor: "#012485" }}  onClick = {()=>{console.log(resalePrice[i]),SellNFT(nft.address,nft.id,resalePrice[i],resaleToken[i])}}>SELL</Button>
                             
                            
                              
                            </div>
                            <Select
                         styles={{zIndex:10000}}
        defaultValue={options[0]}
        options={options}
        components={{ Option: IconOption }}
        onChange={(e) => {
          let s = resaleToken
          s[i] = e.value
          setResaleToke(s)
        }
        }
      />
                          </div>
                          
                        </div>
                      </div>
                    )}})}
                   
                </div>
              </div>
            </div>
           
            </div>




            



















    </div>









  )
}


