import OwnerList from "./OwnerList";
import Timer from './TimerTwo';
import Link from 'next/link';
const ProductSingle = ({data,countdown=false,style}) => {
    console.log("🚀 ~ file: ProductSingle.js:6 ~ ProductSingle ~ data:", data);
    return (
        <div className="nft-item" style={style}>
            <div className="nft-inner">
                <div className="nft-item-top d-flex justify-content-between align-items-center">
                    <div className="author-part">
                        <ul className="author-list d-flex">
                            {
                                data.owners.map((item) =>(
                                    <OwnerList data={item} key={item.id} />
                                ))
                            }
                        </ul>
                    </div>
                    <div className="more-part">
                        <div className=" dropstart">
                            <a className=" dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"
                                data-bs-offset="25,0">
                                <i className="icofont-flikr"></i>
                            </a>
                            <ul className="dropdown-menu"> 
                            <li><a className="dropdown-item" href="https://www.facebook.com/sharer/sharer.php?u=https://marketplace.bullsclub.space/" target="_blank"><span><i
                                    className="icofont-facebook"></i></span> FaceBook</a></li>
<li><a className="dropdown-item" href="https://twitter.com/intent/tweet?url=https://marketplace.bullsclub.space/ " target="_blank"><span><i
                                    className="icofont-twitter"></i></span> Twitter</a></li>
<li><a className="dropdown-item" href="https://www.linkedin.com/shareArticle?mini=true&url=https://marketplace.bullsclub.space/" target="_blank"><span><i
                                    className="icofont-linkedin"></i></span>Linkedin</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="nft-item-bottom">
                    <div className="nft-thumb">
                        <img src={`${data.image}`} alt="nft-img" />
                            {countdown == true ? (<Timer data={data}/>): '' }
                            <span className="badge rounded-pill position-absolute"><i
                                className="icofont-heart"></i>
                                </span>
                    </div>
                    <div className="nft-content">
                        <div className="content-title">
                            <h5>
                            <Link
                  href={{
                    pathname: "/itemdetails",
                    query: {
                      seller: JSON.stringify(data?.owners),
                    },
                  }}
                >
                  <a>{`${data.title}`}</a>
                </Link>
                            </h5>
                        </div>
                        <div
                            className="nft-status d-flex flex-wrap justify-content-between align-items-center ">
                            <span className="nft-view">
                                <Link href="">
                                <a><i
                                className="icofont-eye-alt"></i> </a> 
                                </Link>
                                </span>
                            <div className="nft-stock"> {`${data.stock}`} in Stock</div>
                        </div>
                        <div className="price-like d-flex justify-content-between align-items-center">
                            <div className="nft-price d-flex align-items-center">
                                <span className="currency-img">
                                    <img src='/assets/images/currency/currency-2.png'
                                        alt="currency img" />
                                        <img src='/assets/images/currency/currency-1.png'
                                        alt="currency img" />
                                </span>
                            </div>
                            <Link href="/portal">
                            <a className="nft-bid">SELL</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSingle;