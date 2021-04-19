const connection = require('./connection');

const getNewAuthor = ({id, firstName, middleName, lastName}) => {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join(' ');
  return {
    id,
    firstName,
    middleName,
    lastName,
    fullName,
  }
}

const serialize = (authors) => {
  return {
    id: authors.id,
    firstName: authors.first_name,
    middleName: authors.middle_name,
    lastName: authors.last_name,
  }
}

const findById = async (id) => {
  const [authors] = await connection.execute(
    'SELECT first_name, middle_name, last_name FROM authors WHERE id = ?',
    [id]
  );

  if (authors.length === 0) return null;

  const { firstName, middleName, lastName } = authors.map(serialize)[0];

  return getNewAuthor({
    id,
    firstName,
    middleName,
    lastName
  })
}

const findByName = async (first_name, middle_name, last_name) => {
  const [authors] = await connection.execute(
    `SELECT first_name, middle_name, last_name FROM authors WHERE first_name = ?`,
    [first_name]
  );
  if (authors
    .some(author => (
      author.first_name + author.middle_name + author.last_name
    ) === (
      first_name + middle_name + last_name
    ))) return false;
 
  const [ firstName, middleName, lastName ] = authors.map(serialize)[0];

  const fullName = [firstName, middleName, lastName].filter((name) => name).join(' ');

  return getNewAuthor({
    firstName,
    middleName,
    lastName,
    fullName
  })
}

const gerAll = async () => {
  const [authors] = await connection.execute(
    'SELECT id, first_name, middle_name, last_name FROM authors'
  );
  return authors.map(serialize).map(getNewAuthor);
}

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;

  return true;
};

const create = async (firstName, middleName, lastName) => {

connection.execute(
  'INSERT INTO model_example.authors (first_name, middle_name, last_name, full_name) VALUES (?, ?, ?)',
  [firstName, middleName, lastName]
)};

module.exports = {
  gerAll,
  findById,
  isValid,
  create,
  findByName
}

