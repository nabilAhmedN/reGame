import React from "react";
import { BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";
import logoDr from '../../../assets/images/logo.png'

const Footer = () => {
  

  return (
    <footer className="footer footer-center pt-9 bg-primary text-primary-content rounded-t-xl">
      <div>
        <img className="h-32 w-32" src={logoDr} alt="" />
        <p className="font-bold text-lg">
          Buy-Sell-Exchange Playstation/Xbox/PC Games
        </p>
        <p>Copyright © 2022 - All right reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a className="h-24" href="https://github.com/nabilAhmedN">
            <BsGithub className="text-2xl" />
          </a>
          <a href="https://web.facebook.com/nabilAhmedNahid2">
            <BsFacebook className="text-2xl" />
          </a>
          <a href="https://www.instagram.com/nabil_astro_b/">
            <BsInstagram className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
