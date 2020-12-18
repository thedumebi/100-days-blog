import React, { useState } from "react";
import CreateArea from "./CreateArea";

function Article(props) {
  const [edit, setEdit] = useState({ status: false, type: "" });
  function deleteArticle() {
    props.onDelete(props.id);
  }

  function editFullArticle() {
    setEdit({ status: true, type: "put" });
  }

  function editPartArticle() {
    setEdit({ status: true, type: "patch" });
  }

  return edit.status ? (
    <CreateArea
      type={edit.type}
      id={props.id}
      method={props.onPut}
      title={props.title}
      content={props.content}
    />
  ) : (
    <div className="article">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {!props.single && (
        <button
          onClick={() => {
            props.fetchOne(props.id);
          }}
        >
          Read more
        </button>
      )}
      {props.single && (
        <button onClick={editFullArticle}>Edit entire article</button>
      )}
      {props.single && (
        <button onClick={editPartArticle}>Edit part of Article</button>
      )}
      {props.single && <button onClick={deleteArticle}>Delete Article</button>}
    </div>
  );
}

export default Article;
