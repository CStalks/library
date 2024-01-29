const addBook      = document.querySelector(".addBook");
const displayBooks = document.querySelector(".displayBooks");
const modal        = document.querySelector("dialog");
const cancelButton = document.querySelector(".cancel");
const addButton    = document.querySelector(".add-button");
const author       = document.querySelector("#author");
const title        = document.querySelector("#title");
const pages        = document.querySelector("#pages");

const myLibrary    = [];
let   bookCount    = 0;

function Book(author, title, numOfPages, status, index) {
    this.author     = author;
    this.title      = title;
    this.numOfPages = numOfPages;
    this.status     = status;
    this.index      = index;
}

addBook.addEventListener('click', () => {
    modal.showModal();
});

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
});

function addBookToLibrary(book){
    let tmpBook = book.trim().split(",");

    //set the array index to be the book object index value
    let index = +(myLibrary.length);
    let bookItem = new Book(tmpBook[0],tmpBook[1],tmpBook[2], tmpBook[3], index);

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
        bookItem.append(removeBook);
        
        //make the dataset index attribute of the bookItem to be the same as
        //the value of the index property of the object
        bookItem.dataset.index = `${myLibrary[bookCount].index}`;

        displayBooks.append(bookItem);
        bookCount++; 
    }
}

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
        let updateParentDataset = 0;
        const arrIndex = +(e.target.parentNode.dataset.index);
        const bookItem = e.target.parentNode;

        //removes the book data from the array
        myLibrary.splice(arrIndex, 1);
        bookItem.parentNode.removeChild(bookItem);
        const bookItems = document.querySelectorAll(".displayBooks > div");

        //update each array value index property value
        for(let i = 0; i < myLibrary.length; i++){
            myLibrary[i].index = i;
        }
        //update the dataset index value of each node to associate with 
        //the current value it is inside the array
        bookItems.forEach(item => {
            item.dataset.index = updateParentDataset++;
        });
        bookCount--;
    }
});