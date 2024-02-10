import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [books, setBooks] = useState([]);

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    fetchPolicy: "no-cache",
  });

  const allBooks = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (!loading && !error && data) {
      setBooks(data.allBooks);
    }
  }, [loading, error, data]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!props.show) {
    return null;
  }

  const genres = [
    ...new Set(allBooks.data.allBooks.flatMap((book) => book.genres)),
  ];

  const handleGenreChange = (chosen_genre) => {
    setSelectedGenre(chosen_genre);
  };

  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreChange(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleGenreChange(null)}>all genres</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books ? (
            books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          ) : (
            <p>No books found</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
