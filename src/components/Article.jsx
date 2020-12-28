import React, { useState } from "react";
import CreateArea from "./CreateArea";
import { useRouteMatch, Link } from "react-router-dom";

function Article(props) {
  let {url} = useRouteMatch();
  const [edit, setEdit] = useState({ status: false, type: "", method: "" });
  
  function deleteArticle() {
    props.onDelete(props.id);
  }

  function editFullArticle() {
    setEdit({ status: true, type: "put", method: props.onPut });
  }

  function editPartArticle() {
    setEdit({ status: true, type: "patch", method: props.onPatch });
  }

  return edit.status ? (
    <CreateArea
      type={edit.type}
      id={props.id}
      method={edit.method}
      title={props.title}
      content={props.content}
    />
  ) : (
    <div className="article" style={props.single ? {width:"auto"} : null}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {!props.single && (
        <Link
          to={`${url}/${props.id}`}
          onClick={() => {
            props.fetchOne(props.id);
          }}
        >
          Read more
        </Link>
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
