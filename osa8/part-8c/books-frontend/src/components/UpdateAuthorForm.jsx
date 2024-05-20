import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
    }
  }
`;

function UpdateAuthorForm() {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [message, setMessage] = useState(null);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onCompleted: () => {
      setMessage(`Author updated: ${name} and born is successfully set up!`);
    },
  });

  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setName('');
    setBorn('');
  };

  return (
    <div>
        <h3>Update author</h3>
      <form onSubmit={handleSubmit}>
        <div>
        <select value={name} onChange={({ target }) => setName(target.value)} required>
    <option value="">Select author</option>
    {data.allAuthors.map(author => (
      <option key={author.name} value={author.name}>
        {author.name}
      </option>
    ))}
  </select>        </div>
        <div>
          <input value={born} onChange={({ target }) => setBorn(target.value)} required placeholder='Born'/>
        </div>
        <button type="submit">update author</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateAuthorForm;