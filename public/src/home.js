function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// Saved for later
function getBooksBorrowedCount(books) {
  let counter = 0;
  for (let book of books) {
    for (let i = 0; i < book.borrows.length; i++)
      if (book.borrows[i].returned === false) {
        counter++;
      }
  }
  return counter;
}
//saved
function _helperSorted(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  const sorted = _helperSorted(count);
  return sorted
    .map((name) => ({
      name,
      count: count[name],
    }))
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, book) => {
    acc[book.id] = book.borrows.length;
    return acc;
  }, {});
  const keys = Object.keys(groupById);
  let sorted = keys.sort((keyA, keyB) => {
    if (groupById[keyA] > groupById[keyB]) {
      return -1;
    } else if (groupById[keyB] > groupById[keyA]) {
      return 1;
    }
    return 0;
  });
  let newArr = sorted.map((id) => {
    let book = books.find((book) => book.id === id);
    let count = groupById[id];
    return { name: book.title, count: count };
  });
  return newArr.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let authorArr = [];
  for (let i = 0; i < authors.length; i++) {
    for (let j = 0; j < books.length; j++) {
      if (authors[i].id === books[j].authorId) {
        let author = {
          name: authors[i].name.first + " " + authors[i].name.last,
          count: books[j].borrows.length,
        };
        authorArr.push(author);
      }
    }
  }
  return authorArr
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
