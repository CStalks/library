const addBook      = document.querySelector(".addBook");
const displayBooks = document.querySelector(".displayBooks");
const modal        = document.querySelector("dialog");
const cancelButton = document.querySelector(".cancel");
const addButton    = document.querySelector(".add-button");
const author       = document.querySelector("#author");
const title        = document.querySelector("#title");
const pages        = document.querySelector("#pages");

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
        bookItem.dataset.index = `${bookCount}`;
        console.log(bookItem.dataset.index);
        bookItem.append(removeBook);

        displayBooks.append(bookItem);
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
   
    if(author.value && title.value && pages.value && status){
        addBookToLibrary(`${author.value},${title.value},${pages.value},${status.value}`);
        
        //reset the input values back to empty strings
        author.value = title.value = pages.value = '';
        modal.close();
    }
    console.log(myLibrary);
});

document.addEventListener("click", (e) => {
    if(e.target.className === 'read')
        if(e.target.innerText === 'Status: Read'){
            e.target.innerText = 'Status: Not Read';
            let value = +(e.target.parentNode.parentNode.dataset.index);
            myLibrary[value].status = 'Not Read';
        } else {
            e.target.innerText = 'Status: Read';
            let value = +(e.target.parentNode.parentNode.dataset.index);
            myLibrary[value].status = 'Read';
        }
});

document.addEventListener("click", (e) => {
    if(e.target.className === 'remove'){
        const index = +(e.target.parentNode.dataset.index);
        const parent = e.target.parentNode;
        console.log(parent);
        const displayBooks = document.querySelector(".displayBooks");
        console.log(displayBooks);

        myLibrary.splice(index, 1);
        displayBooks.removeChild(parent);

        console.log(myLibrary);
        //find the parent of that element and delete that child from its parent
    }
});