import React, { useState } from "react";

function CreateArea(props) {
  const [isExtended, setExtended] = useState(false);
  const [article, setArticle] = useState({
    title: props.type === "put" ? null : props.title,
    content: props.type === "put" ? null : props.content,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setArticle((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function submitArticle(event) {
    props.onAdd(article);
    setArticle({
      title: "",
      content: "",
    });
    event.preventDefault();
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
        onClick={
          props.type === "put"
            ? putArticle
            : props.type === "patch"
            ? patchArticle
            : submitArticle
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
