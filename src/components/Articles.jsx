import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Article from "./Article";
import queryString from "querystring";

function Articles() {
  const [appState, setAppState] = useState({
    loading: false,
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
  }, [appState.loading]);

  function deleteArticles(id) {
    const articlesUrl = single
      ? "http://localhost:9000/articles/" + id
      : "http://localhost:9000/articles/";
    fetch(articlesUrl, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setAppState({ loading: true });
  }

  function fetchOneArticle(id) {
    const articleUrl = `http://localhost:9000/articles/${id}`;
    fetch(articleUrl)
      .then((res) => res.json())
      .then((res) => {
        setAppState({ loading: false, single: true, articles: [res] });
      });
    // setAppState({ loading: true });
  }

  function putArticles(id, article) {
    const articlesUrl = `http://localhost:9000/articles/${id}`;
    fetch(articlesUrl, {
      method: "PUT",
      body: queryString.stringify(article),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setAppState({ loading: true });
  }

  function patchArticles(id, article) {
    const articlesUrl = `http://localhost:9000/articles/${id}`;
    fetch(articlesUrl, {
      method: "PATCH",
      body: queryString.stringify(article),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setAppState({ loading: true });
  }

  const { loading, single, articles } = appState;

  return (
    <div>
      <Header />
      {loading ? (
        <p style={{ textAlign: "center" }}>
          Hold on, fetching data may take some time.
        </p>
      ) : !articles || articles.length === 0 ? (
        <p style={{ textAlign: "center" }}>No articles yet.</p>
      ) : (
        <div className="container">
          {articles.map((article) => {
            return (
              <Article
                key={article._id}
                id={article._id}
                onPut={putArticles}
                onPatch={patchArticles}
                onDelete={deleteArticles}
                fetchOne={fetchOneArticle}
                single={single}
                title={article.title}
                content={
                  single
                    ? article.content
                    : article.content.substring(0, 100) + " ..."
                }
              />
            );
          })}
          {!single && (
            <form className="delete-article">
              <button onClick={deleteArticles}>Delete all article</button>
            </form>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Articles;
