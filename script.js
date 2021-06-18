// Form Layout 
let text = `
<label for="title">Title</label>
<input class="a" type="text" name="title" id="title" required>
<br>
<label for="author">Author</label>
<input class="a" type="text" name="author" id="author" required>
<br>
<label for="pages">Pages</label>
<input class="a" type="number" name="pages" id="pages" required>
<br>
<label for="read">Read?</label>
<input type="checkbox" name="read" id="read" >
<br>
<input type="submit" value="Add">
`;
// Object constructor and library array
let library = [];
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};
const box = document.querySelector('.show');
let flag = 0;//For Removing Form after submission
let load = 'load'

// Need to work here 

// const newBook1 = new Book('Deep Work', 'Cal Newport', 300, true);
// const newBook2 = new Book('Shiva Trilogy 1', 'amish', 250, false);
// const newBook3 = new Book('Atomic Habits', 'James Clear', 350, false);
// library.push(newBook1);
// library.push(newBook2);
// library.push(newBook3);



pageReloading();
takeInput();



function takeInput() {
    const takeInput = document.getElementById("addBook");
    takeInput.addEventListener("click", addForm);
}

function addForm() {
    if (flag == 1)
        return;
    flag = 1;
    let elem = document.createElement("form");
    elem.innerHTML = text;
    elem.classList.add("newForm");
    let container = document.querySelector(".add")
    container.appendChild(elem);
    // form data to new object in library arrray
    elem.addEventListener("submit", formSubmit);
}

function formSubmit(e) {
    e.preventDefault();
    flag = 0;
    let form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.checked;
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
    box.innerHTML = ' ';
    fetchLocalStorage();
    const formDiv = document.querySelector(".add");
    formDiv.removeChild(formDiv.lastChild);

}


function pageReloading() {
    if (localStorage[library] != []) {
        library = JSON.parse(localStorage.getItem('library'));
        library.forEach((e, i) => addDiv(e, i));

    }
}

function fetchLocalStorage() {
    localStorage.setItem('library', JSON.stringify(library));
    JSON.parse(localStorage.getItem('library')).forEach((e, i) => addDiv(e, i))
}

function addDiv(obj, i) {
    let elem = document.createElement("ul");
    elem.innerHTML = `<span> Book Number ${i + 1} </span>
         <li> Name: ${obj.title} </li> 
        <li> Author: ${obj.author} </li>
        <li> Pages: ${obj.pages} </li>
        <li> Read: ${obj.read ? 'yes' : 'no'} </li>
        <button id="changeRead"> Change Read Status </button>
        <button id="delete"> Delete Book</button>
        `;
    document.querySelector('.show').appendChild(elem);
    elem.querySelector("#changeRead").addEventListener('click', function (e) {
        box.innerHTML = ' ';
        library[i].read = library[i].read ? false : true;
        fetchLocalStorage();

    });
    elem.querySelector("#delete").addEventListener('click', function (e) {
        box.innerHTML = ' ';
        library.splice(i, 1);
        fetchLocalStorage();
    });


}









