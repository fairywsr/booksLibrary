
const input = document.getElementById('input');
const search = document.getElementById('search');
const container = document.querySelector('.container');
const sort = document.querySelector('#sort'); 
const increase = document.querySelector('.increase');
const decrease = document.querySelector('.decrease');
let first = []; // Array to store books
const one = 1; // Current page number

// calling api
async function getBooks() {
    try {
        const response = await fetch(`https://api.freeapi.app/api/v1/public/books?page=${one}&limit=12`);
        const api = await response.json();

        container.innerHTML = '';
        first = []; 
        // books from api
        api.data.data.forEach((obj) => {
            const book = obj.volumeInfo;
            first.push(book);
            let listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Title:</strong> ${book.title}<br>
                <strong>Authors:</strong> ${book.author?.join(', ') || 'N/A'}<br>
                <strong>Publisher:</strong> ${book.publisher || 'N/A'}<br>
                <strong>Published Date:</strong> ${book.publishedDate || 'N/A'}<br>
                <img src="${book.imageLinks?.thumbnail || ''}" alt="${book.title}">
            `;
            container.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching books:', error.message);
    }
}

// for next page
increase.addEventListener('click', () => {
    if (one < 10) {
        one += 1;
        getBooks();
    }
});

// for previous page
decrease.addEventListener('click', () => {
    if (one > 1) {
        one -= 1;
        getBooks();
    }
});

// Search functionlaity
search.addEventListener('click', () => {
    const value = input.value.toLowerCase().trim(); // get user value and search

    // it can applyall filter on options
    const foundBooks = first.filter((book) => book.title?.toLowerCase() === value);

    // Display results
    container.innerHTML = '';
    if (foundBooks.length > 0) {
        foundBooks.forEach((book) => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Title:</strong> ${book.title}<br>
                <strong>Authors:</strong> ${book.authors?.join(', ') || 'N/A'}<br>
                <strong>Publisher:</strong> ${book.publisher || 'N/A'}<br>
                <strong>Published Date:</strong> ${book.publishedDate || 'N/A'}<br>
                <img src="${book.imageLinks?.thumbnail || ''}" alt="${book.title}">
            `;
            container.appendChild(listItem);
        });
    } else {
        container.innerHTML = '<li> Book not found </li>';
    }
});

// sort function 
sort.addEventListener('change', () => {
    const sortBy = sort.value; 

    if (sortBy === 'title') {
      // title base value
        first.sort((a, b) => {
            const titleA = a.title?.toLowerCase() || '';
            const titleB = b.title?.toLowerCase() || '';
            return titleA.localeCompare(titleB);
        });
    } else if (sortBy === 'dateofrelase') {
        // publisher base values 
        first.sort((a, b) => {
            return new Date(a.publishedDate) - new Date(b.publishedDate); 
        });
    }

// after sorting
    container.innerHTML = '';
    first.forEach((book) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Title:</strong> ${book.title}<br>
            <strong>Authors:</strong> ${book.authors?.join(', ') }<br>
            <strong>Publisher:</strong> ${book.publisher }<br>
            <strong>Published Date:</strong> ${book.publishedDate }<br>
            <img src="${book.imageLinks?.thumbnail }" alt="${book.title}">
        `;
        container.appendChild(listItem);
    });
});

// onload calling function
getBooks();
 