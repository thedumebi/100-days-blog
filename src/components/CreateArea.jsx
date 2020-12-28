import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateArea(props) {
  const [isExtended, setExtended] = useState(false);
  const [article, setArticle] = useState({
    title:
      props.type === "put" ? null : props.type === "patch" ? props.title : "",
    content:
      props.type === "put" ? null : props.type === "patch" ? props.content : "",
  });
  const history = useHistory();

  function handleChange(event) {
    const { name, value } = event.target;
    setArticle((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function addArticle(event) {
    console.log(article);
    const articlesUrl = "http://localhost:9000/articles/";
    fetch(articlesUrl, {
      method: "POST",
      body: JSON.stringify(article),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("Success: ", data))
      .catch((err) => console.error("Error: ", err));
    setArticle({
      title: "",
      content: "",
    });
    history.push("/articles");
  }

  function putArticle(event) {
    props.method(props.id, article);
    setArticle({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function patchArticle(event) {
    props.method(props.id, article);
    setArticle({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function extend() {
    setExtended(true);
  }

  return (
    <form className="create-article">
      {isExtended && (
        <input
          onChange={handleChange}
          name="title"
          value={article.title}
          placeholder={props.type ? props.title : "Title of post"}
        />
      )}
      <textarea
        onClick={extend}
        onChange={handleChange}
        name="content"
        placeholder="What is it about?"
        rows={isExtended ? 3 : 1}
        value={article.content}
      >
        {props.content}
      </textarea>
      <button
        type="button"
        onClick={
          props.type === "put"
            ? putArticle
            : props.type === "patch"
            ? patchArticle
            : addArticle
        }
      >
        {props.type === "put"
          ? "Edit Entire Article"
          : props.type === "patch"
          ? "Edit part of article"
          : "Add"}
      </button>
    </form>
  );
}

export default CreateArea;
