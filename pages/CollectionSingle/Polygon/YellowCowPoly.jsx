import React, { Component } from "react";
// import ABI from "../../../engine/API/NFT.json";
import Footer from "../../../components/Footer";
//Model??// fix
// import AdviceCard from "../../../components/AdviceCard";
// import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { Button } from "@nextui-org/react";

import { renderPaperCheckoutLink } from "@paperxyz/js-client-sdk";

const ADDRESS = "0x899310114B573E768747ea866c0edC51F39C15Cb";
const apikey = "TWRGVKG991VTZ6E5T8JAAKPMMQ7GYY1TKS";
const endpoint = "https://api.polygonscan.com/api/";
const nftpng =
  "https://black-legal-fowl-39.mypinata.cloud/ipfs/QmaEhHLdXoTNG6vzZGuhcugpp2LCcTu2tbXaeA6fnPcWGV/";

class YellowPoly extends Component {
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
          "https://withpaper.com/checkout/984a0b38-afce-4985-8fcb-a75592051039",
      });

    return (
      <div className="App">
        <Button className="button-53" onClick={openCheckout}>
          Yellowcow
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
                {nftdata.map((result, index) => {
                  return (
                    <div key={index} className="card">
                      <div className="image-over">
                        <img
                          className="card-img-top"
                          src={nftpng + result.tokenID + ".png"}
                          alt=""
                        />
                      </div>
                      <div className="card-caption col-12 p-0">
                        <div className="card-body">
                          <h5 className="mb-0">YELLOW COW #{result.tokenID}</h5>
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

export default YellowPoly;
