import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  useEffect(() => {
    const userToken = localStorage.getItem("library-user-token");
    setToken(userToken);
  }, []);

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>
        <Notification errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
          show={page === "login"}
          setPage={setPage}
        />
        <Authors show={page === "authors"} />

        <Books show={page === "books"} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notification errorMessage={errorMessage} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />

      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
