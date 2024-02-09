import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const me_result = useQuery(ME);
  const books_result = useQuery(ALL_BOOKS);

  if (me_result.loading || books_result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const favoriteGenre = me_result.data.me.favoriteGenre;
  console.log(favoriteGenre);

  const filteredBooks = books_result.data.allBooks.filter((book) => {
    return book.genres.includes(favoriteGenre);
  });

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favorite genre</p>

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

export default Recommend;
