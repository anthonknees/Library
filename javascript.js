let myLibrary = [
  new Book("The Maze Runner", "James Dashner", "372", true, '602'),
  new Book("The Socrch Trias", "James Dashner", "361", true, '420'),
];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
  const bookEntry = new Book(title, author, pages, read, crypto.randomUUID());
  myLibrary.push(bookEntry);
}

addBookToLibrary("TestBook","TestAuthor", 20, true, '201512');

function deleteChildElements(parent){
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
}

console.table(myLibrary);

function refreshBooks() {
  const contentContainer = document.querySelector(".content-container");
  deleteChildElements(contentContainer);

  myLibrary.map(book => {
    const card = document.createElement("div")
    card.classList.add("card");
  
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    let read = document.createElement("button");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-card-btn");

    const deleteContent = document.createElement("i");
    deleteContent.classList.add("fa-solid", "fa-x");

    deleteButton.appendChild(deleteContent);

    read.classList.add("btn", "status-btn")

    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;

    deleteButton.addEventListener("click", () => {
      myLibrary = myLibrary.filter(b => b.id !== book.id);
      refreshBooks();
    })

    if (book.read == true){
      read.textContent = "Finished";
      read.classList.add("finished");
    }
    else {
      read.textContent = "Unfinished";
      read.classList.add("unfinished");
    }
  
    read.addEventListener("click", () => {
        book.toggleReadStatus();
        read.textContent = book.read ? "Finished" : "Unfinished"; 
        if (book.read){
          read.classList.remove("unfinished");
          read.classList.add("finished");
        }
        else {
 
          read.classList.remove("finished");
          read.classList.add("unfinished");
        }
    })

    card.append(deleteButton ,title, author, pages, read);
    contentContainer.append(card);
  })
  
}

const addBookButton = document.querySelector(".add-book");
const modal = document.querySelector(".addbook");
const submitBookBtn = document.querySelector(".submit-btn");
const bookAddForm = document.querySelector(".book-add-form");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const finishedInput = document.querySelector("#finished");

addBookButton.addEventListener("click", () => {
  modal.showModal();
})

const cancel = document.querySelector(".cancel-btn");
cancel.addEventListener("click", () => {
  modal.close();
})

bookAddForm.addEventListener("submit", (event) => {
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, finishedInput.checked);
  refreshBooks();
  bookAddForm.reset();
  modal.close()
})


refreshBooks();

