import React from "react";
import Articles from "./Articles";
import { Switch, Route, useParams } from "react-router-dom";
import CreateArea from "./CreateArea";

function App() {
  let {articleId} = useParams();
  console.log(articleId);
  return (
    <div>
      <Switch>
        <Route path="/articles">
          <Articles />
        </Route>
        <Route path={`/articles/:articleId`}>
        <Articles />
      </Route>
        <Route exact path="/create">
          <CreateArea />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
