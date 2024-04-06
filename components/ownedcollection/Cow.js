import React from 'react'
import { Button } from 'react-bootstrap';
import { ethers } from "ethers";
import { useEffect, useState } from 'react'
import axios from 'axios';
import Web3 from 'web3';
import NFTABI from '../../engine/NFT.json';
import Dialog from '@mui/material/Dialog';
import 'bootstrap/dist/css/bootstrap.min.css';

var web3 = null;
var account = null;
var marketcontract = null;
var contract = null;






const NFTCONTRACT = "0xFc6D74b6c444b00f39544152553b306C24542d94";
const MARKETCONTRACT = "0xDBC3233788bab61C0A9D9b155539DE04fdA06EAd";
const moralisapi = "https://deep-index.moralis.io/api/v2/";
const moralisapikey = "kDivwybEmEzIpTliB1KNyc9gEuE748bYd9qZeUiXVdQeUjpiGUoMWqAeHLchRH7k";
const nftpng = "https://dweb.link/ipfs/QmPeUUVv6VYtXcJiaffkD9S8V7xDmwzWaqJHwdEi4jUVuy/";





const Cow = () => {














  return (
   

    <div className="container col-lg-11">







cow



















    </div>









  )
}

export default Cow
