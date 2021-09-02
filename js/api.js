
document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText === '') {
        // please write something to display
    }
    else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // if (books.length == 0) {
        
    // }
    books.forEach(book => {
        // console.log(book);
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        
            <div class="card-body col-6 m-4">
                <img class="card-img-top" src="${imgUrl}">
                <h4 class="card-title">Book: ${book.title}</h4>
                <h5 class="card-title">Author name: ${book.author_name[0]}</h5>
                <p class="card-text">First published: ${book.first_publish_year}</p>
            </div>
        
        `;
        searchResult.appendChild(div);
    })
}