import React, { useState } from "react";

function CreateArea(props) {
  const [article, setArticle] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setArticle((prevValue) => {
      return {...prevValue, [name]: value};
    });
  }

  function submitArticle(event) {
    props.onAdd(article);
    setArticle({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input onChange={handleChange} name="title" placeholder="Title of post" />
        <textarea onChange={handleChange} name="content" placeholder="What is it about?" />
        <button onClick={submitArticle}>Create new article</button>
      </form>
    </div>
  );
}

export default CreateArea;