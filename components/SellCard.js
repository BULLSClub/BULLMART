import { Spacer } from "@nextui-org/react";
import SellCardList from "../data/Other/SellCard.json";

var GetSellCardList = SellCardList
const SellCard = () => {
    return(
        <div>
            <Spacer />
            <section className="process-section padding-bottom">  
        <div className="container">
            <Spacer />
            <div class="section-header justify-content-center">
    <h4>Exchange 500+ Tokens</h4>
    <p class="text-center">Save exchange ID for future support</p>
</div>
<div class="section-header justify-content-center">
    <iframe id="simpleswap-frame" name="SimpleSwap Widget" width="750px" height="392px" src="https://simpleswap.io/widget/34a5646a-c181-46f8-aae5-b58476082826" frameborder="0"></iframe>
</div>

        <div className="section-header justify-content-center">
                <div className="header-title">
                    <h3>Get Started Creating And Selling Your NFTs</h3>
                </div>
            </div>
            <div className="section-wrapper">
                <div className="nft-sell-wrapper">
                    <div className="row justify-content-center g-4">
                        {
                            GetSellCardList.map((item) => (
                                <div className="col-md-6" key={item.id}>
                                    <div className="nft-item style-3">
                                        <div className="nft-inner text-center">
                                            <div className="nft-thumb"> 
                                                <img /* eslint-disable-line */src={`${item.image}`} alt="nft-img" />
                                            </div>
                                            <div className="nft-content">
                                                <div className="author-details">
                                                    <h5>{`${item.title}`}</h5>
                                                    <p>{`${item.text}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        <Spacer />
       
            </section>
        </div>
    )
}

export default SellCard;