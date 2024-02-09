import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const books = result.data.allBooks;

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const genres = [...new Set(books.flatMap((book) => book.genres))];

  const filteredBooks =
    selectedGenres.length > 0
      ? books.filter((book) =>
          selectedGenres.every((genre) => book.genres.includes(genre))
        )
      : books;

  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={selectedGenres.includes(genre) ? "selected" : ""}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenres([])}>Clear selection</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
