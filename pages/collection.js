import PopularList from "../data/Collection/Popular.json";
import CollectionSingle from "../components/common/Collection";
import { Row } from "react-bootstrap";
var GetPopularList = PopularList;

const Collection = () => {
  return (
    <div>
      <section className="collection-section padding-top padding-bottom">
        <div className="container">
          <h2>Mint Live till supply Last</h2>
          <div className="section-header">
            <h3 className="header-title">All BC Collections</h3>
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
              <Row>
                <iframe
                  src="https://umbria.network/widgetv2/?ref=BrmtlnsSflLb3dim"
                  width="500"
                  height="400"
                  scrolling="no"
                ></iframe>
              </Row>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collection;
