import React from 'react'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import copy from "copy-to-clipboard";  
import BullscMarket from "../engine/BullscMarket.json"
import NFT from "../engine/NFT.json"
import NFTS from "../engine/NFTS.json"
import {supabase} from "../engine/Supabase";
import AdviceCard from "../components/AdviceCard";
import Bear from '../components/ownedcollection/Bear';
import Cow from '../components/ownedcollection/Cow';
import Yellowcow from '../components/ownedcollection/Yellowcow';
import Web3Domain from "../components/HomePage/Web3Domain";
import ProductSingle from "../components/common/Products/ProductSingle";
import PopularList from '../data/Product/Products.json'
import User from '../data/User/Users.json'
import Products from '../data/Product/Products.json';
import Link from 'next/link';


var GetPopularList = PopularList.slice(0,3);
var productList = Products;
var featuredProduct = Products.slice(0,9);

const URLsupa = "https://gaiijbybqpongleztxsz.supabase.co/storage/v1/object/public/avatars/"
const Provider = "https://polygon-rpc.com/";
const privKey = "713b86cbd9689ccc2bd09bf4ca9030e4e3b4e484d7161b05dc45239ebdcaa0eb";

const axios = require('axios')


const AuthorInfo = {
  name: "Tamer",
  profileImage: "/bulls.png",
  cover: "/assets/images/profile/cover.jpg",
  userName: "@Tamer11",
};



const author = () => {

  const router = useRouter()
  const { address } = router.query
  const [Prods, setProds] = useState([]);
  const [image, setImages] = useState();
  const [userConnected,setUserConnected] = useState({});
  const [loading, setLoading] = useState(false);








  const getSimpleHash = async(owner) =>{
    const options = {
      headers: {accept: 'application/json', 'X-API-KEY': 'bullsclub_sk_22165387-689b-4bdd-aea4-dd13179bfa51_2d5oq0c55iwiavd7'}
    };   
    const rest= await axios.get('https://api.simplehash.com/api/v0/nfts/owners?chains=polygon&wallet_addresses='+owner+'&limit=50', options);
    console.log(rest.data)
    const simpleHashNFTs = rest.data.nfts.map((item) => {
      return{
                 id: item.token_id,
                 image: item.extra_metadata.image_original_url
          ? item.extra_metadata.image_original_url.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            )
          : null,

        address: item.contract_address,
        expiredate: "",
                 seller: item.owners[item.owners.length-1],
                 title: item.collection.name+" "+item.token_id,
                 stock: "1",
                 desc: item.description,
                 owners: [
                    {
                      id: "1",
                      name: "",
                      image: "/assets/images/seller/collector-1.png",
                      verified: false,
                      prfileLink: "/"
                    }
                  ]
             }
            }
    ) ;
    setProds(simpleHashNFTs);
    setLoading(true)
   }






   useEffect(() => {
    setUserConnected(JSON.parse(localStorage.getItem("data")))  
    if (window.ethereum.selectedAddress)
    {
      console.log(window.ethereum.selectedAddress)
    }
    else
    {
      router.push("/wallet")
    }
console.log(address);
getSimpleHash(address);
}, [loading])









  return (
    <div>
     <section className="profile-section padding-top padding-bottom">
        <div className="container">
            <div className="section-wrapper">
                <div className="member-profile">
                    <div className="profile-item">
                        <div className="profile-cover">
                            <AdviceCard />
                            <img src={AuthorInfo.cover} alt="cover-pic" />
                           
                        </div>





                        <div className="profile-information">
                            <div className="profile-pic">
                                <img src={AuthorInfo.profileImage} alt="DP" />

                            </div>
                            <div className="profile-name">
                                <h4>BULL</h4>
                            </div>
                            <ul className="profile-contact">
                                <li className="crypto-copy">
                                    <div id="cryptoCode" className="crypto-page">
                                         <input
                                id="cryptoLink"
                                value={userConnected.address}
                                readOnly
                              />
                                       <div
                                id="cryptoCopy"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Copy Address"
                                onClick={() => {
                                  copy(userConnected.address);
                                  alert("text copied");
                                }}
                              >
                                            <span className="copy-icon">
                                                <i className="icofont-ui-copy" aria-hidden="true"
                                                    data-copytarget="#cryptoLink"></i>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="profile-details">
                        <nav className="profile-nav">
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-allNft-tab" data-bs-toggle="tab"
                                    data-bs-target="#allNft" type="button" role="tab" aria-controls="allNft"
                                    aria-selected="true"></button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">                       
                            <div className="tab-pane activity-page fade show active" id="allNft" role="tabpanel">
                                <div>
                                    <div className="row">
                                        <div className="col-xl-9">
                                            <article>
                                                <div className="activity-tab">
                                                    <ul className="nav nav-pills mb-30 px-2" id="pills-tab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="pills-favorites-tab"
                                                                data-bs-toggle="pill" data-bs-target="#pills-favorites"
                                                                type="button" role="tab" aria-controls="pills-favorites"
                                                                aria-selected="false"><i className="icofont-license"></i>
                                                               Club NFT</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link active" id="pills-burn-tab"
                                                                data-bs-toggle="pill" data-bs-target="#pills-burn"
                                                                type="button" role="tab" aria-controls="pills-burn"
                                                                aria-selected="false"><i className="icofont-fire"></i>
                                                                WEB3Domain</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <Link href="/portal">
                                                            <button className="nav-link " id="pills-mentions-tab"
                                                                data-bs-toggle="pill" data-bs-target="#pills-mentions"
                                                                type="button" role="tab" aria-controls="pills-mentions"
                                                                aria-selected="true"><i className="icofont-flash"></i>
                                                                OWNED NFTs</button></Link>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content activity-content" id="pills-tabContent">                                       
                                                        <div className="tab-pane fade" id="pills-favorites" role="tabpanel"
                                                            aria-labelledby="pills-favorites-tab">
                                                            <div className="row justify-content-center g-4">
                                                                
                                                                <Bear />
                                                                <Yellowcow />
                                                                <Cow />
                                                            </div>
                                                        </div>



                                                        <div className="tab-pane fade burn-section show active onsale-loadmore"
                                                            id="pills-burn" role="tabpanel"
                                                            aria-labelledby="pills-burn-tab">

                                                            <div className="row justify-content-center g-4">
                                                           <Web3Domain />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </article>
                                        </div>

                                        
                                        <div className="col-xl-3">
                                            <aside className="mt-5 mt-xl-0">
                                                <div className="profile-widget search-widget">
                                                    <div className="widget-inner">
                                                       
                                                      
                                                    </div>
                                                </div>
                                                <div className="widget widget-instagram">
                                                    <div className="widget-header">
                                                        <h5 className="title">Featured NFT</h5>
                                                    </div>







                                                    <ul className="widget-wrapper d-flex flex-wrap justify-content-center">
                                                    {
                                                            featuredProduct.map((item) => (
                                                                <li key={item.id}>
                                                                    <a><img loading="lazy"
                                                                            src={`${item.image}`}
                                                                            alt="nft-img" /></a>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>




                                                </div>
                                            </aside>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            
                            
                          
                            
                          
                            
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
 


  )
}







export default author