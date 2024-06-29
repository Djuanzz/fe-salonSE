import React from "react";

const Footer: React.FC = () => {
  return (
    <div>
      {/* --- FOOTER */}
      <footer className="footer bg-neutral text-neutral-content p-10">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current">
            <path d="M4 3h-2v-2h2v2zm2 0h4v-2h-4v2zm10-2v2h-8v-2h8zm2 0h2v2h-2v-2zm4 4v19h-24v-19h24zm-22 2h2v-2h-2v2zm20-2h-2v2h2v-2zm-20 4v13h20v-13h-20z"></path>
          </svg>
          <p>
            KMSalon
            <br />
            Providing reliable hair cut service since 2023
          </p>
        </aside>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
