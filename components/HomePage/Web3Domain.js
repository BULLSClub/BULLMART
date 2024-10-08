import React from 'react';
import News from "../common/News";
import NewsList from "../../data/Domains/Domains.json";
import QRCodeDisplay from '../Qrcodegenerator/QRCodeDisplay';
import { Spacer } from '@nextui-org/react';

const LatestNewsList = NewsList.slice(0, 3);

const Web3Domain = () => {
  return (
    <div>
      <section className="blog-section pb-120">
        <div className="container">
          <div className="section-header">
            <h3 className="header-title"> WEB3 Domains</h3>
            <h3 className="header-title"> Own your Domain forever</h3>
            <div className="header-content"></div>
          </div>
          <div className="section-wrapper">
            <div className="blog-wrapper">
              <div className="row justify-content-center g-4">
                {LatestNewsList.map((item) => (
                  <News data={item} key={item.id} />
                ))}
              </div>
            </div>
            <div className="text-center mt-5">
              <QRCodeDisplay />
            </div>
            <div className="text-center mt-5">
              <h5> Get your W3B site as a sharable QR code</h5>
              <h5> Free to use BULLS QR generator</h5>
              <Spacer />
              <a
                href="https://eternaldigitalassets.io/quickbuild?ref=mmm0mjf"
                target="_blank" rel="noopener noreferrer">
                <span className="default-btn move-left small-btn">BUILD YOUR W3BSITE</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Web3Domain;
