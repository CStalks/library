const addBook      = document.querySelector(".addBook");
const displayBooks = document.querySelector(".displayBooks");
const modal        = document.querySelector("dialog");
const cancelButton = document.querySelector(".cancel");
const addButton    = document.querySelector(".add-button");
const author       = document.querySelector("#author");
const title        = document.querySelector("#title");
const pages        = document.querySelector("#pages");

let toggleBookStatus;
let removeBookButton;

const myLibrary    = [];
let bookCount      = 0;

function Book(author, title, numOfPages, status) {
    this.author = author;
    this.title  = title;
    this.numOfPages  = numOfPages;
    this.status = status;
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
        const readStatus =  document.createElement('div');
        const changeBookStatus = document.createElement('button');
        const removeBook = document.createElement('button');

        author.innerText = 'Author: ' + myLibrary[bookCount].author;
        title.innerText = 'Title: ' + myLibrary[bookCount].title ;
        numOfPages.innerText = 'Pages: ' + myLibrary[bookCount].numOfPages;
        changeBookStatus.innerText = 'Status: ' + myLibrary[bookCount].status;
        removeBook.innerText = 'Remove';

        changeBookStatus.classList.add('read');
        removeBook.classList.add('remove');
        bookItem.classList.add('card');

        bookItem.append(author);
        bookItem.append(title);
        bookItem.append(numOfPages);
       
        readStatus.append(changeBookStatus);
        bookItem.append(readStatus);
        removeBook.dataset.index = `${bookCount}`;
        bookItem.append(removeBook);


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
    let status = document.querySelector("input[name='status']:checked");
   
    if(author.value && title.value && pages.value && status.value){
        addBookToLibrary(`${author.value},${title.value},${pages.value},${status.value}`);
        
        //reset the input values back to empty strings
        author.value = title.value = pages.value = '';
        modal.close();
    }
});

document.addEventListener("click", (e) => {
    if(e.target.className === 'read'){
        (e.target.innerText === 'Status: Read') ?
        e.target.innerText = 'Status: Not Read' : 
        e.target.innerText = 'Status: Read';
    }
});

document.addEventListener("click", (e) => {
    if(e.target.className === 'remove'){
       //get the data attribute key value
       //call splice on the array with that by changing it to a number
    }
});