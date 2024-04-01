import Banner from "../components/HomePage/Banner";
import Category from "../components/HomePage/Category";
import TopCollectors from "../components/HomePage/TopCollectors";
import PopularCollection from "../components/HomePage/PopularCollection";
import SellCard from "../components/HomePage/SellCard";
import Web3Domain from "../components/HomePage/Web3Domain";
import LiveAuction from "../components/HomePage/LiveAuction";
import BaseDappBanner from "../components/HomePage/BaseDappBanner";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <SellCard />
      <Web3Domain />
      <LiveAuction />
      <PopularCollection />
      <TopCollectors />
      <BaseDappBanner />
    </div>
  );
};

export default Home;
