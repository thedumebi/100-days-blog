import React from "react";

function SingleArticle(props) {
  return (
    <button
      onClick={() => {
        props.fetchOne(props.title);
      }}
    >
      Read more
    </button>
  );
}

export default SingleArticle;
