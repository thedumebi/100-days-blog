import React from "react";

function DeleteArticles(props) {
  function handleClick() {
    const articlesUrl = "http://localhost:9000/articles/";
    fetch(articlesUrl, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <button onClick={handleClick}>{props.single ? "Delete Article" : "Delete all articles"}</button>
    </div>
  );
}

export default DeleteArticles;
