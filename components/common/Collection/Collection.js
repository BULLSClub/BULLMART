import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper';
import Link from 'next/link';

SwiperCore.use([Autoplay]);
const CollectionSingle = ({item}) => {
    return (
        <div className="col-lg-4 col-md-6">
                <div className="nft-inner">
                            <div>
                            <Swiper
                            spaceBetween={10}
                            slidesPerView={3}
                            autoplay={true}
                            className="thumb-list swiper-wrapper" >
                            { item.products.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <div className="single-thumb"><img
                                                src={`${product.image}`}
                                                alt="cat-image" />
                                        </div>
                                    </SwiperSlide>
                                )) }
                            </Swiper> 
                        </div>
                    </div>
                    <div className="nft-content">
                        <div className="collection-title">
                            <h5>
                                <a>{`${item.title}`}</a>
                            </h5>
                            <p>Collection has {`${item.items}`} items</p>
                        </div>
                        <div className="meta-info"></div>
              <Link href={`${item.link}`} className="default-btn move-right small-btn">
                  <span>Check Collection</span>
              </Link>
              <spacer></spacer>
              <div>
              <a href={`${item.idd}`} target='blank'>
                <a className="default-btn move-right small-btn">
                  
                </a>
              </a>
                    </div>
                </div>
            
        </div>
    );
}

export default CollectionSingle;