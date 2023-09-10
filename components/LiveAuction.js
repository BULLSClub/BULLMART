import Products from '../data/Product/Trending.json';
import ProductSingle from "./common/ProductSingle";
import Link from 'next/link';

var productList = Products;
const TrendingNow = () => {
    return(
        <div>
            <section className="artwork-section">
            <div className="container">
                <div className="section-header">
                    <h3 className="header-title">Live Now</h3>
                    
                    <div className="header-content">
                    <div className="header-content">
                    <Link href="/explore" className="default-btn style-2 small-btn move-right">
                        <span>View All
                                <i className="icofont-circled-right"></i></span>

                    </Link>        
                    </div>
                    </div>
                </div>
                
                <div className="section-wrapper">
                    <div className="row justify-content-center g-4">
                        {
                            productList.map((item) => (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-9" key={item.id}>
                                    <ProductSingle data={item} />
                                </div>
                            ))
                        }  
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default TrendingNow;