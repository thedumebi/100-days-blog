import React, { useState } from "react";

function CreateArea(props) {
  const [article, setArticle] = useState({
    title: "",
    content: "",
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

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title of post"
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="What is it about?"
        />
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
            : "Create new article"}
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
