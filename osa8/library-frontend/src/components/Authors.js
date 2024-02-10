import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const queryData = useQuery(ALL_AUTHORS, {
    fetchPolicy: "no-cache",
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [name, setName] = useState(null);
  const [year, setYear] = useState("");

  if (queryData.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const authors = queryData.data.allAuthors;

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const submit = (event) => {
    event.preventDefault();

    const yearInt = parseInt(year);

    console.log("editing author birthyear...");

    editAuthor({ variables: { name: name.value, setBornTo: yearInt } });

    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <Select defaultValue={name} onChange={setName} options={options} />
        <div>
          birthyear
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
