import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright <span>&#169;</span> {currentYear}</p>
    </footer>
  );
}

export default Footer;
