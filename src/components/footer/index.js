import React from 'react';
import { Container, Row } from 'react-bootstrap';
import style from './index.module.css';

const Footer = () => {
  return (
    <>
      {/*<div className="footer_panel">*/}
      {/*  <footer>*/}
      {/*    <h1>Footer</h1>*/}
      {/*  </footer>*/}
      {/*</div>*/}
      <div className={`${style.footer_section}`}>
        <ul className="p-0">
          <li>
            <a href="https://titledocs.ai/privacy-policy/" target="_blank">Privacy Policy</a><span>|</span>
          </li>
          <li>
            <a href="https://titledocs.ai/terms-of-services/" target="_blank">Terms of Use</a><span>|</span>
          </li>
          <li>Copyright © 2022. All rights reserved</li>
        </ul>
      </div>
    </>
  );
};
export default Footer;
