import PopularList from "../data/Collection/Popular.json";
import CollectionSingle from "../components/common/Collection/Collection";
import { Row } from "react-bootstrap";
import BaseDappBanner from "../components/HomePage/BaseDappBanner";

var GetPopularList = PopularList;

const Collection = () => {
  return (
    <div>
      <section className="collection-section padding-top padding-bottom">
        <div className="container">
          
          <div className="section-header">
            <h3 className="header-title">Polygon Collections</h3>
          </div>


<div className="container">
<div className="section-header">
          <h4>"🌟Explosive Opportunity! 🚀"</h4>
          <p>💰 We Allocated a Whopping 100 Million $BULL on BASE-MAINNET, Locked in Our Mining Contract! 💎</p>
<h4>Club Polygon Collections play big rule with the Upcoming BULLTOWN! 🐂</h4>
🔥Burn to EARN and gain Exclusive Keys and Essential Rewarding Tools!

          </div>
          </div>
          <div className="section-wrapper">
            <div className="collection-wrapper collection-loadmore">
              <div className="row justify-content-center g-4">
                {GetPopularList.map((item) => (
                  <CollectionSingle item={item} key={item.id} />
                ))}
              </div>
            </div>

            <div className="container">
              

              <BaseDappBanner />
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collection;
