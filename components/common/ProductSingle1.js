import OwnerList from "./OwnerList";
import Link from "next/link";
import { useState } from "react";

const ProductSingle = ({ data, countdown = false, style }) => {
  // console.log(data)
  const [da, setDA] = useState(data);
  return (
    <>
      {da && (
        <div className="nft-item" style={style}>
          <div className="nft-inner">
            <div className="nft-item-top d-flex justify-content-between align-items-center">
              <div className="more-part">
                <div className=" dropstart">
                  <a
                    className=" dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-offset="25,0"
                  >
                    <i className="icofont-flikr"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="mailto:support@bullsclub.space"
                        target="_blank"
                      >
                        <span>
                          <i className="icofont-warning"></i>
                        </span>{" "}
                        Report{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="https://www.facebook.com/sharer/sharer.php?u=https://marketplace.bullsclub.space/"
                        target="_blank"
                      >
                        <span>
                          <i className="icofont-facebook"></i>
                        </span>{" "}
                        FaceBook
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="https://twitter.com/intent/tweet?url=https://marketplace.bullsclub.space/ "
                        target="_blank"
                      >
                        <span>
                          <i className="icofont-twitter"></i>
                        </span>{" "}
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="https://www.linkedin.com/shareArticle?mini=true&url=https://marketplace.bullsclub.space/"
                        target="_blank"
                      >
                        <span>
                          <i className="icofont-linkedin"></i>
                        </span>
                        Linkedin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="nft-item-bottom">
              <div className="nft-thumb">
                <img src={`${da.image}`} alt="nft-img" />

                <span className="badge rounded-pill position-absolute">
                  <i className="icofont-heart"></i>
                  {`${da.wishlist}`}
                </span>
              </div>
              <div className="nft-content">
                <div className="content-title">
                  <h5>
                    <Link
                      href={{
                        pathname: "/itemdetails",
                        query: da, // the data
                      }}
                    >
                      {`${da.title}`}
                    </Link>
                  </h5>
                </div>
                <div className="nft-status d-flex flex-wrap justify-content-between align-items-center ">
                  <span className="nft-view">
                    <a>
                      <i className="icofont-eye-alt"></i>{" "}
                    </a>
                  </span>
                  <div className="nft-stock"> {`${da.stock}`} in Stock</div>
                </div>
                <div className="price-like d-flex justify-content-between align-items-center">
                  <div className="nft-price d-flex align-items-center">
                    <span className="currency-img">
                      <img
                        src="/assets/images/currency/currency-3.png"
                        alt="currency img"
                      />
                    </span>
                    <p>{`${da.price}`} MATIC</p>
                  </div>
                  <Link
                    href={{
                      pathname: "/itemdetails",
                      query: da, // the data
                    }}
                    className="nft-bid"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSingle;
