import React from "react";

const MyLeaf = ({ attributes, children, leaf }) => {
  return <span {...attributes}>{children}</span>;
};

export default MyLeaf;
