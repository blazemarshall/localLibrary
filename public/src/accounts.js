const { push } = require("../../test/fixtures/accounts.fixture");

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) =>
    a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let counter = 0;
  for (let book of books) {
    for (let borrow of book.borrows) {
      if (borrow.id === account.id) {
        counter++;
      }
    }
  }
  return counter;
}

function getBooksPossessedByAccount(account, books, authors) {
  const checkedOutBooks = books.filter((book) => {
    let firstEntry = book.borrows[0];
    return firstEntry.id === account.id && firstEntry.returned === false;
  });
  const checkedOutWithAuthor = checkedOutBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      ...book,
      author: author,
    };
  });
  return checkedOutWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
