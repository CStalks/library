const addBook      = document.querySelector(".addBook");
const displayBooks = document.querySelector(".displayBooks");
const modal        = document.querySelector("dialog");
const cancelButton = document.querySelector(".cancel");
const addButton    = document.querySelector(".add-button");
const bookForm     = document.querySelector("#book-form");

let author         = document.querySelector("#author");
let title          = document.querySelector("#title");
let pages          = document.querySelector("#pages");

const myLibrary = [];
let  bookCount = 0;

function Book(author, title, numOfPages, status) {
    this.author     = author;
    this.title      = title;
    this.numOfPages = numOfPages;
    this.status     = status;
}

function addBookToLibrary(book){
    let tmpBook = book.trim().split(",");

    let bookItem = new Book(tmpBook[0],tmpBook[1],tmpBook[2], tmpBook[3]);
    myLibrary.push(bookItem);
    displayBook();
}

function displayBook(){
    while(bookCount < myLibrary.length){
        const bookItem = document.createElement('div');
        const author =  document.createElement('div');
        const title =  document.createElement('div');
        const numOfPages =  document.createElement('div');
        const isRead =  document.createElement('div');
        const button = document.createElement('button');

        bookItem.style.color = 'white';
        bookItem.style.background = 'black';
        bookItem.style.borderRadius = '1rem'
        author.textContent = 'Author: ' + myLibrary[bookCount].author;
        title.textContent = 'Title: ' + myLibrary[bookCount].title ;
        numOfPages.textContent = 'Pages: ' + myLibrary[bookCount].numOfPages;
        isRead.textContent = 'Status ' + myLibrary[bookCount].isRead;

        bookItem.append(author);
        bookItem.append(title);
        bookItem.append(numOfPages);
        bookItem.append(isRead);
        bookItem.append(button);

        displayBooks.append(bookItem);

        //make sure to subtract 1 from bookcount when user removes a book each time
        bookCount++; 
    }
}

addBook.addEventListener('click', () => {
    modal.showModal();
})

cancelButton.addEventListener("click", () => {
    author.value = title.value = pages.value = '';

    modal.close();
});

addButton.addEventListener("click", (e) => {
    e.preventDefault();
   
    if(author.value && title.value && pages.value){
        addBookToLibrary(`${author.value},${title.value},${pages.value}`);
        //reset the input values back to empty strings
        author.value = title.value = pages.value = '';
        modal.close();
    }
});