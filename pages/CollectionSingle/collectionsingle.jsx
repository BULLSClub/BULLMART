
import Products from '../../data/Product/Products.json';
import ProductSingle from "../../components/common/Products/ProductSingle";


import Footer from '../../components/Footer/Footersocial'




var productList = Products.slice(0,12);


const CollectionSingle = () => {
    


    


    return (
        <div>
       
        
            <section className="collecion-single padding-bottom padding-top">
            <div className="container">
                <div className="section-header">
                   
                    <div className="header-content">
                        <ul className="filter-group d-flex flex-wrap align-items-center">
                            <li className="li collection-filter">
                              
                            </li>
                           
                        </ul>
                    </div>
                </div>
                <div className="collection-single-wrapper">
                    <div className="row g-4">
                        
                        {
                            productList.map((item) => (
                                <div className="col-xl-3 col-lg-4 col-md-6" key={item.id}>
                                <ProductSingle data={item} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section><Footer />
        </div>
    )
}

export default CollectionSingle;