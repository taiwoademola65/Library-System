let books = JSON.parse(localStorage.getItem('savedBooks')) || [];
let borrows = JSON.parse(localStorage.getItem('savedBorrows')) || [];
const addBook = () => {
    let titleInput = bookTitle.value;
    let authorInput = bookAuthor.value;
    let pubDateInput = bookPubDate.value;
    // console.log(titleInput);
    // console.log(authorInput);
    // console.log(pubDateInput);

    if (titleInput === '' || authorInput === '' || pubDateInput === '') {
        alert('Please fill out all fields before adding a book.')
        // return;
    } else {
        let newBook = {
            id: Date.now().toString(),
            title: titleInput,
            author: authorInput,
            published: pubDateInput,
        }
        books.push(newBook)

        localStorage.setItem('savedBooks', JSON.stringify(books));
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPubDate.value = '';
    }
    displayBooks();
}

const displayBooks = () => {
    let booksTable = document.getElementById('booksTableBody');
    booksTable.innerHTML = '';

    // borrowBookSelect.innerHTML = '';
    borrowBookSelect.innerHTML = `<option value="" disabled selected>Choose a book</option>`;

    for (let i = 0; i < books.length; i++) {
        let currentBook = books[i];
        booksTable.innerHTML += `<tr>
                            <td><strong>${currentBook.title}</strong></td>
                            <td>${currentBook.author}</td>
                            <td>${currentBook.published}</td>
                            </tr>`;
        borrowBookSelect.innerHTML += `<option value="${currentBook.title}">${currentBook.title}</option>`;
    }

}

const addBorrow = () => {
    let borrowerName = borrowerInput.value;
    let selectedBook = borrowBookSelect.value;
    let startDate = borrowDate.value;
    let endDate = returnDate.value;

    if (borrowerName === '' || selectedBook === '' || startDate === '' || endDate === '') {
        alert('Please fill out all borrowing fields.')
        return;
    }

    let newBorrow = {
        borrower: borrowerName,
        bookTitle: selectedBook,
        dateOut: startDate,
        dateIn: endDate

    }
    borrows.push(newBorrow)

    localStorage.setItem('savedBorrows', JSON.stringify(borrows))

    borrowForm.reset();

    displayBorrow();
}

const displayBorrow = () => {
    let borrowTable = document.getElementById('borrowTableBody')
    borrowTable.innerHTML = ''

    for (let i = 0; i < borrows.length; i++) {
        let currentBorrow = borrows[i];

        borrowTable.innerHTML += `<tr>
                            <td><strong>${currentBorrow.borrower}</strong></td>
                            <td><strong>${currentBorrow.bookTitle}</strong></td>
                            <td><span class="badge bg-secondary">${currentBorrow.dateOut}</span></td>
                            <td><span class="badge bg-danger">${currentBorrow.dateIn}</span></td>
                            
                            </tr>`;
    }

}

displayBooks();
displayBorrow();