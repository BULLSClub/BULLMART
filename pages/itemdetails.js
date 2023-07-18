import Link from "next/link";
import TimerTwo from "../components/common/TimerTwo";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import {ethers} from "ethers";
import Web3 from 'web3';
import BullscMarket from "../engine/BullscMarket.json"
import PageHeader from "../components/PageHaeder";









const rpc = "https://polygon-rpc.com/";
const bsctrpc = "https://bsc-dataseed2.defibit.io";
const  marketplaceAddress = "0xDBC3233788bab61C0A9D9b155539DE04fdA06EAd";
const bsctmarket = "0xE2A39dF45d56A436934D8EaCbcF8465E16221f6e";





const PageHeaderText =
{
    "linkText":"ItemDetails",
    "heading":"Item details"
};


const ItemInfo =
{
    "id": 1,
        "image": "assets/images/nft-item/item-details.gif",
        "description": "This is the second batch of Cybertino Genesis NFTs for early adopters and is 1 of 5. This Genesis NFT will be interactive: hold and wait for future exclusive benefits and early access to new drops!",
        "wishlist": "1.3",
        "expiredate": "2022-06-26",
        "title": "Dodo je Aliener Walk",
        "stock": "12",
        "price": "2.29",
        "size": "1000 x 1000 px.VIDEO (19.85MB)",
        "createdBy": "@alex joe",
        "listedBy": "@alex joe",
        "owners": [
            {
                "id":"1",
                "name":"Alex joe",
                "contactAddress":"0x1dDB2C0897daF134545641545462E71fdD2dbDC0eB3a9Ec",
                "token":"0005515456416",
                "blockchain":"Ethereum (ETH)",
                "image":"assets/images/seller/collector-3.gif",
                "verified": true,
                "prfileLink":"/"
            },{
                "id":"2",
                "name":"Alex joe",
                "contactAddress":"0x1dDB2C0897daF134545641545462E71fdD2dbDC0eB3a9Ec",
                "token":"0005515456416",
                "blockchain":"Ethereum (ETH)",
                "image":"assets/images/seller/collector-3.gif",
                "verified": true,
                "prfileLink":"/"
            }
        ],
        "history": [
            {

            }
        ]
};




const ItemDetails = () => {
    const router = useRouter();
    const query = router.query;
    console.log(router)
    const [TokenLabel,setTokenLabel] = useState("");
    console.log(query.isPayble);
   const buyToken = async() =>{
        console.log(rpc);
        const provider= new ethers.providers.JsonRpcProvider(rpc);
        var web3 = new Web3(new Web3.providers.HttpProvider(rpc));
  
        const gazfees= await provider.getFeeData();
        console.log(gazfees.maxPriorityFeePerGas.toString())
        console.log(gazfees.maxFeePerGas.toString())
        const val = query.price;
  const nftContract = await new web3.eth.Contract(BullscMarket, marketplaceAddress);
   //set up your Ethereum transaction
    const transactionParameters = {
        to: marketplaceAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
    //gasLimit: web3.utils.toHex(web3.utils.toWei('50','gwei')),  
    //gasPrice: web3.utils.toHex(web3.utils.toWei('60','gwei')), 
        // maxPriorityFeePerGas: web3.utils.toHex(gazfees.maxPriorityFeePerGas.toString()),
        // maxFeePerGas: web3.utils.toHex(gazfees.maxFeePerGas.toString()),
        gas: ethers.BigNumber.from(300000).toHexString(),
        'data': nftContract.methods.BULLSCMarketSaleToken(query.contactAddr,query.itemID).encodeABI(), //make call to NFT smart contract 
    value : query.isPayble ? Web3.utils.toBN(Web3.utils.toWei(val, "ether")).toString(16) : 0
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
    const Tokens = [
        { value: "-", label: "Choose", icon: "" },
        { value: "0", label: "MATIC", icon: "matic-token-icon.webp" },
       
      ];
    const getTokenFromAddr = () => {
        console.log(query);

        const x = Tokens.filter((key) => key.value.toLowerCase() == query?.token?.toString().toLowerCase())
        console.log(x);
        setTokenLabel(x[0]?.label);
        
    }
    useEffect(() => {
        getTokenFromAddr(query.token);
       }, [TokenLabel])
    return (
        <div>
        
        <div className="item-details-section padding-top padding-bottom">
        <div className="container">
            <div className="item-details-wrapper">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="item-desc-part">
                            <div className="item-desc-inner">
                                <div className="item-desc-thumb">
                                    <img src={`${query.image}`} alt="item-img" />
                                </div>
                                <div className="item-desc-content">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button className="nav-link active" id="nav-details-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-details" type="button" role="tab"
                                                aria-controls="nav-details" aria-selected="true">Details</button>
                                            <button className="nav-link" id="nav-bids-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-bids" type="button" role="tab"
                                                aria-controls="nav-bids" aria-selected="false">Bids</button>
                                            
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="details-tab tab-pane fade show active" id="nav-details"
                                            role="tabpanel" aria-labelledby="nav-details-tab">

                                            <div className="author-profile d-flex flex-wrap align-items-center gap-15">
                                                <div className="author-p-thumb">
                                                <Link href={"/author/"+query.seller}>
                                                    <a><img
                                                            src="assets/images/seller/collector-2.png"
                                                            alt="author-img " /></a>
                                                </Link>
                                                </div>
                                                <div className="author-p-info">
                                                    <p className="mb-0">Owner</p>
                                                    <h6>
                                                        <Link href={"/author/"+query.seller}><a>{`${query.seller}`}</a></Link>
                                                        
                                                    </h6>
                                                </div>
                                            </div>
                                            <ul className="other-info-list">
                                                <li className="item-other-info">
                                                    <div className="item-info-title">
                                                        <h6>Contract Address</h6>
                                                    </div>
                                                    <div className="item-info-details">
                                                        <div id="cryptoCode" className="crypto-page">
                                                            <input id="cryptoLink"
                                                                value={`${query.contactAddr}`}
                                                                readOnly />
                                                            <div id="cryptoCopy" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" title="Copy Address">
                                                                <span className="copy-icon">
                                                                    <i className="icofont-ui-copy" aria-hidden="true"
                                                                        data-copytarget="#cryptoLink"></i>
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </li>
                                                <li className="item-other-info">
                                                    <div className="item-info-title">
                                                        <h6>Token ID</h6>
                                                    </div>
                                                    <div className="item-info-details">
                                                        <p>{`${query.id}`}</p>
                                                    </div>

                                                </li>
                                                <li className="item-other-info">
                                                    <div className="item-info-title">
                                                        <h6>Blockchain</h6>
                                                    </div>
                                                    <div className="item-info-details">
                                                        <p>{`${"Polygon"}`}</p>
                                                    </div>
                                                </li>

                                               
                                            </ul>
                                        </div>
                                        <div className="bids-tab tab-pane fade" id="nav-bids" role="tabpanel"
                                            aria-labelledby="nav-bids-tab">
                                            <span><i className="icofont-law-order"></i></span>
                                            <p>No active bids yet. Be the first to make a bid!</p>
                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="item-buy-part">
                            <div className="nft-item-title">
                                <h3>{query.title}</h3>
                                <div className="share-btn">
                                    <div className=" dropstart">
                                        <a className=" dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false" data-bs-offset="25,0">
                                            <i className="icofont-share-alt"></i>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="https://twitter.com/intent/tweet?url=https://marketplace.bullsclub.space/ " target="_blank"><span>
                                                        <i className="icofont-twitter"></i>
                                                    </span> Twitter </a>
                                            </li>
                                            <li><a className="dropdown-item" href="https://www.facebook.com/sharer/sharer.php?u=https://marketplace.bullsclub.space/" target="_blank"><span><i
                                                            className="icofont-facebook"></i></span> FaceBook</a></li>
                                            <li><a className="dropdown-item" href="mailto:?subject=Check out BULLSCLUB Marketplace!&body=https://marketplace.bullsclub.space/" target="blank"><span><i
                                                            className="icofont-envelope"></i></span> Email</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                            <div className="item-price">
                                <h4>Price</h4>
                                
                                <p><span><i className="icofont-coins"></i> {`${query.price}`} {query?.isPayble == "true" ? " MATIC" : TokenLabel}</span></p>
                            </div>
                            <div className="buying-btns d-flex flex-wrap">
                                <div className="default-btn move-right" onClick={() => buyToken()}><span>Buy Now</span> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}

export default ItemDetails;
