import React from "react";

const Leaf = ({ attributes, children, leaf }) => {
  return <span {...attributes}>{children}</span>;
};

export default Leaf;
