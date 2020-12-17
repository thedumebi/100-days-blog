import React, { useEffect, useState } from "react";
import Article from "./Article";
import DeleteArticles from "./DeleteArticles";
import SingleArticle from "./SingleArticle";
import CreateArea from "./CreateArea";
import queryString from "querystring";

function Articles() {
  const [appState, setAppState] = useState({
    loading: true,
    single: false,
    articles: null,
  });

  useEffect(() => {
    // setAppState({ loading: true });
    const articlesUrl = "http://localhost:9000/articles/";
    fetch(articlesUrl)
      .then((res) => res.json())
      .then((res) => {
        setAppState({ loading: false, single: false, articles: res });
      });
  }, [appState]);

  function addArticle(newArticle) {
    console.log(newArticle);
    const articlesUrl = "http://localhost:9000/articles/";
    fetch(articlesUrl, {
      method: "POST",
      body: queryString.stringify(newArticle),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => console.log("Success: ", data))
      .catch((err) => console.error("Error: ", err));
  }

  function fetchOneArticle(title) {
    setAppState({ loading: true });
    const articleUrl = `http://localhost:9000/articles/${title}`;
    fetch(articleUrl)
      .then((res) => res.json())
      .then((res) => {
        setAppState({ loading: false, single: true, articles: [res] });
      });

    return <Article title={articles.title} content={articles.content} />;
  }

  const { loading, single, articles } = appState;

  return (
    <div>
      {loading ? (
        <p style={{ textAlign: "center" }}>
          Hold on, fetching data may take some time.
        </p>
      ) : articles.length === 0 ? (
        <p style={{ textAlign: "center" }}>No articles yet.</p>
      ) : (
        articles.map((article) => {
          return (
            <div>
              <Article
                key={article._id}
                id={article._id}
                title={article.title}
                content={
                  single
                    ? article.content
                    : article.content.substring(0, 100) + " ..."
                }
              />
              {!single && (
                <SingleArticle
                  fetchOne={fetchOneArticle}
                  title={article.title}
                  single={single}
                />
              )}
            </div>
          );
        })
      )}
      <CreateArea onAdd={addArticle} />
      <DeleteArticles single={single} />
    </div>
  );
}

export default Articles;
