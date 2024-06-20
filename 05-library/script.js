// Class Representing a Book
class Book {
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
};

// Class Representing the Library
class Library {
   
    // Array to store the books
    #books = []
    get books(){
        return this.#books;
    }

    constructor(){
        this.addBook(new Book("Animal Farm", "George Orwell", "122", false));
    }

    // Adds a book to the library
    addBook(newBook){
        this.books.push(newBook);
    }

    // Removes a book from the library
    deleteBook(index){
        this.books.splice(index, 1);
    }

    // Toggles the read status of a book
    toggleIsRead(index){
        this.books[index].isRead = !this.books[index].isRead;
    }
}

// Class Encapsulating the logic for the Modal containing the form
class BookDialogManager{
    constructor(libraryUI){
        this.libraryUI = libraryUI

        // Get DOM elements
        this.dialogElement = document.getElementById('book-dialog');
        this.formElement = document.getElementById('book-form');

        // Setup Event Listeners
        this.setupEventListeners();
    }

    // Handle opening the modal
    handleOpenDialog(){
        this.dialogElement.showModal();
    }

    // Handle closing the modal
    handleCloseDialog(){
        this.dialogElement.close();
        this.formElement.reset();
    }

    // Handle form submission
    handleSubmitForm(e){
        e.preventDefault();

        // Get form input values
        const bookTitle = this.formElement.elements['title'].value;
        const bookAuthor = this.formElement.elements['author'].value;
        const bookPages = this.formElement.elements['pages'].value;
        const bookRead = this.formElement.elements['read'].checked;
        
        // Create a new Book 
        const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

        // Add book the the library and to the UI
        this.libraryUI.library.addBook(newBook);
        this.libraryUI.addBookToUI(newBook, this.libraryUI.library.books.length - 1);

        // Close the dialog
        this.handleCloseDialog();
    }

    // Setup Event Listeners
    setupEventListeners(){
        document.querySelector('.add-book').addEventListener('click', () => this.handleOpenDialog());
        this.formElement.elements['close'].addEventListener('click', () => this.handleCloseDialog());
        this.formElement.addEventListener('submit', (e) => this.handleSubmitForm(e));
    }
}

// Class encapsulating the UI logic
class LibraryUI {
    constructor(library){
        // Initialize the library and libraryElement
        this.library = library;
        this.libraryElement = document.getElementById("entries");
        this.dialogManger = new BookDialogManager(this);
        this.init();
    }

    // Initialize the UI by adding books and setting up event listeners
    init(){
        this.library.books.forEach((book, index) => this.addBookToUI(book, index));
        this.setupEventListeners();
    }

    // Add a single book to the UI
    addBookToUI(book, index){
        // Create a new table row for the book and append it to the library element
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("data-index", index);
        tableRow.innerHTML = `
            <td>${index+1}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>
                <input type="checkbox" ${book.isRead ? 'checked' : ''}>
                <label style="display: none;" for="read1">Read</label>
            </td>
             <td>
                 <button class="remove-button">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="50px" height="50px">
                        <g fill="#f5f5f5" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                            <g transform="scale(5.12,5.12)">
                                <path d="M21,2c-1.64545,0 -3,1.35455 -3,3v2h-10c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h1v36c0,1.654 1.346,3 3,3h26c1.654,0 3,-1.346 3,-3v-36h1c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-10v-2c0,-1.64545 -1.35455,-3 -3,-3zM21,4h8c0.55455,0 1,0.44545 1,1v2h-10v-2c0,-0.55455 0.44545,-1 1,-1zM19,14c0.552,0 1,0.448 1,1v25c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-25c0,-0.552 0.448,-1 1,-1zM25,14c0.552,0 1,0.448 1,1v25c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-25c0,-0.552 0.448,-1 1,-1zM31,14c0.553,0 1,0.448 1,1v25c0,0.553 -0.447,1 -1,1c-0.553,0 -1,-0.447 -1,-1v-25c0,-0.552 0.447,-1 1,-1z"></path>
                            </g>
                        </g>
                    </svg>
                </button>
            </td>
        `;
        this.libraryElement.appendChild(tableRow);
    };

    // Update the index column in the UI after removing a book
    updateIndexColumn(){
        this.libraryElement.querySelectorAll('tr').forEach((row, index) => {
            row.setAttribute('data-index', index);
            row.querySelector('.index-col').textContent = index + 1;
        });
    };

    // Remove a book from the UI based on its index
    removeBookFromUI(index){
        document.querySelector(`tr[data-index="${index}"]`).remove();
        this.updateIndexColumn();
    };

    // Handle click events on book elements (remove button and read status checkbox)
    handleBookClick(e) {
        if (e.target.closest('.remove-button')) {
            // Delete the book from the library and remove it from the UI
            const index = e.target.closest("tr").dataset.index;
            this.library.deleteBook(index);
            this.removeBookFromUI(index);
        }else if (e.target.type === "checkbox"){
            // Toggle the read status of the book
            const index = e.target.closest("tr").dataset.index;
            this.library.toggleIsRead(index);
            console.log(this.library.books)
        };
    };

    // Setup event listeners
    setupEventListeners(){
        this.libraryElement.addEventListener("click", (e) => this.handleBookClick(e));
    };

}
    

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    const library = new Library();
    const libManager = new LibraryUI(library);
});

