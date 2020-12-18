import React from "react";
import CreateArea from "./CreateArea";

function Article(props) {
  function deleteArticle() {
    props.onDelete(props.id)
  }

  function editFullArticle() {
    <CreateArea type= "put" id={props.id} method={props.onPut}/>
  }

  function editPartArticle() {
    <CreateArea type = "patch" id={props.id} method={props.onPatch}/>
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {props.single && <button onClick={editFullArticle}>Edit entire article</button>}
      {props.single && <button onClick={editPartArticle}>Edit part of Article</button>}
      {props.single && <button onClick={deleteArticle}>Delete Article</button>}
    </div>
  );
}

export default Article;
