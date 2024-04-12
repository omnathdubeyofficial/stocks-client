import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import Table from "./Grid";
 

const ResponsiveTable = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth > 800 ? <Table /> : <CardList />;
};

export default ResponsiveTable;