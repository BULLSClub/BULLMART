import React, { Component } from "react";
// import ABI from "../../../";

import { Button } from "@nextui-org/react";
import Footer from "../../../components/Footer";

//Model??// fix
// import AdviceCard from "../../../components/AdviceCard";

// import { useContract, useContractWrite } from "@thirdweb-dev/react";

import { renderPaperCheckoutLink } from "@paperxyz/js-client-sdk";

const ADDRESS = "0xFc6D74b6c444b00f39544152553b306C24542d94";
const apikey = "TWRGVKG991VTZ6E5T8JAAKPMMQ7GYY1TKS";
const endpoint = "https://api.polygonscan.com/api/";
const nftpng =
  "https://dweb.link/ipfs/QmPeUUVv6VYtXcJiaffkD9S8V7xDmwzWaqJHwdEi4jUVuy/";

class CowPoly extends Component {
  constructor() {
    super();
    this.state = {
      balance: [],
      nftdata: [],
    };
  }
  async componentDidMount() {
    try {
      // Fetch balance data
      const balanceResponse = await fetch(
        `${endpoint}?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`
      );
      const balanceData = await balanceResponse.json();
      this.setState({
        balance: balanceData,
      });
      console.log(balanceData);

      // Fetch NFT data
      const nftResponse = await fetch(
        `${endpoint}?module=account&action=tokennfttx&contractaddress=${ADDRESS}&page=1&offset=100&tag=latest&apikey=${apikey}`
      );
      const nftData = await nftResponse.json();
      this.setState({
        nftdata: nftData.result,
      });
      console.log(nftData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    const { balance } = this.state;
    const { nftdata } = this.state;

    const openCheckout = () =>
      renderPaperCheckoutLink({
        checkoutLinkUrl:
          "https://withpaper.com/checkout/68091c44-499a-4f27-8592-484e1b9145a9",
      });

    return (
      <div className="App">
        <Button className="button-53" onClick={openCheckout}>
          Cow
        </Button>

        <div className="container">
          <div className="row">
            <div className="row items mt-3">
              <div
                className="ml-3 mr-3"
                style={{
                  display: "inline-grid",
                  gridTemplateColumns: "repeat(4, 5fr)",
                  columnGap: "10px",
                }}
              >
                {nftdata.map((result) => {
                  return (
                    <div>
                      <div className="card">
                        <div className="image-over">
                          <img
                            className="card-img-top"
                            src={nftpng + result.tokenID + ".png"}
                            alt=""
                          />
                        </div>
                        <div className="card-caption col-12 p-0">
                          <div className="card-body">
                            <h5 className="mb-0">COW #{result.tokenID}</h5>
                            <h6 className="mb-0 mt-2">
                              Owner:
                              <p
                                style={{
                                  color: "#39FF14",
                                  fontWeight: "bold",
                                  textShadow: "1px 1px 2px #000000",
                                }}
                              >
                                {result.to.slice(0, 4) +
                                  "..." +
                                  result.to.slice(-2)}
                              </p>
                            </h6>
                            <div className="card-bottom d-flex justify-content-between"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default CowPoly;
