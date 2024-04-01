import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <div>
      <footer className="footer-section">
        <div
          className="footer-top"
          style={{ backgroundImage: "url('assets/images/footer/bg.jpg')" }}
        >
          <div className="footer-newsletter">
            <div className="container">
              <div className="row g-4 align-items-center justify-content-center">
                <div className="col-lg-6">
                  <div className="social-part ps-lg-5">
                    <div className="ft-header">
                      <h4>Join the Community</h4>
                    </div>
                    <ul className="social-list d-flex flex-wrap align-items-center mb-0">
                      <li className="social-link">
                        <a
                          href="https://twitter.com/BULLSClub11"
                          target="blank"
                        >
                          <i className="icofont-twitter"></i>
                        </a>
                      </li>
                      <li className="social-link">
                        <a
                          href="https://www.facebook.com/bullsclub.space"
                          target="blank"
                        >
                          <i className="icofont-facebook"></i>
                        </a>
                      </li>
                      <li className="social-link">
                        <a
                          href="https://www.linkedin.com/company/bullsclub/"
                          target="blank"
                        >
                          <i className="icofont-linkedin"></i>
                        </a>
                      </li>
                      <li className="social-link">
                        <a
                          href="https://www.instagram.com/bullsclub11/"
                          target="blank"
                        >
                          <i className="icofont-instagram"></i>
                        </a>
                      </li>
                      <li className="social-link">
                        <a
                          href="https://www.youtube.com/channel/UC0B86iP_JiBexQYxTtRxcnA"
                          target="blank"
                        >
                          <i className="icofont-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-links padding-top padding-bottom">
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                  <div className="footer-link-item">
                  <h4>Company</h4>
                    <ul className="footer-link-list">
                    <li>
                        <Link href="/FAQ/terms" className="footer-link">
                          Terms
                        </Link>
                      </li>

                      <li>
                        {" "}
                        <a
                          href="/FAQ/Privacy"
                          className="footer-link"
                          target="blank"
                        >
                          Privacy
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a
                          href="/FAQ/Aggrement"
                          target="blank"
                          className="footer-link"
                        >
                          Agreement{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link href="/FAQ/help" className="footer-link">
                          {" "}
                          FAQ{" "}
                        </Link>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                <div className="footer-link-item">
                    <h5>BULLMART</h5>
                    <ul className="footer-link-list">
                      <li>
                        <Link href="/portal" className="footer-link">
                          Sell
                        </Link>
                      </li>
                      <li>
                        <Link href="/explore" className="footer-link">
                          Market
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <a
                          href="mailto:support@bullsclub.space"
                          target="blank"
                          className="footer-link"
                        >
                          {" "}
                          Support{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a
                          href="mailto:hr@bullsclub.space"
                          target="blank"
                          className="footer-link"
                        >
                          {" "}
                          Join us{" "}
                        </a>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                <div className="footer-link-item">
                    <h4>Comunity</h4>
                    <ul className="footer-link-list">
                      <li>
                        <a
                          href="https://bullsclub.space/crypto-blog/"
                          target="blank"
                          className="footer-link"
                        >
                          Blog
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections"
                          target="blank"
                          className="footer-link"
                        >
                          Collections
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a
                          href="mailto:info@bullsclub.space"
                          target="blank"
                          className="footer-link"
                        >
                          {" "}
                          Suggestion{" "}
                        </a>{" "}
                      </li>
                      <li>
                        <a
                          href="https://spotvirtual.com/@bullsclub-93f62e312e392bb1/@bulls-conference/@patio"
                          target="blank"
                          className="footer-link"
                        >
                          Spot
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-link-item">
                    <h4>MEMBERS</h4>
                    <ul className="footer-link-list">
                      
                      <li>
                        <a
                          href="mailto:info@bullsclub.space"
                          target="blank"
                          className="footer-link"    >
                          Suggest Feature
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:hr@bullsclub.space"
                          target="blank"
                          className="footer-link"  >
                          Join the team
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:support@bullsclub.space"
                          target="blank"
                          className="footer-link"  >
                          Support
                        </a>
                      </li> 
                      <li>
                        <a
                          href="https://airdrop.bullsclub.space" 
                          className="footer-link"  >
                          Airdrop
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p className="text-center py-4 mb-0">
              All rights reserved &copy; BULLSCLUB LLC
            </p>
          </div>
        </div>
      </footer>
      <a href="#" className="scrollToTop">
        <i className="icofont-swoosh-up"></i>
      </a>
    </div>
  );
};

export default Footer;
