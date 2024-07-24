import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          marginTop: 150,
          marginBottom: 20,
        }}
      >
        <div className="text-muted-foreground items-center">
          Copyright &copy; Syed Owais Nawaz. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;