const searchBook = () => {
    const searchField = document.getElementById('searchInput');
    const searchText = searchField.value;
    fetch( `https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => document.getElementById('total-search-result').innerText=(data.numFound));
    // spinner show
    Spinner('block')
    // clear data
    searchField.value = '';
    // search text
    if (searchText === '') {
        inputEmpty('block');
        Spinner('none')
    }
    else {
        // load data
        const url =` https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
            inputEmpty('none');
    }
}

// desplay search result
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    //  error-message message
    if (books.length === 0) {
        resultError('block');
        Spinner('none');
    }else{
        resultError('none')
    }
    // Total Search Result 
       document.getElementById('total-search-result').innerText = books.length; 
        

    // forEach books
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        let url = `../img/download.jpg`;
               if(typeof book.cover_i !== 'undefined'){
                   url = `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`;
               };

        div.innerHTML = `
            <div class="card-body h-25">
                <img src="${url}" class="card-img-top" alt="...">
                <h3 class="card-title">Book: ${book.title}</h3>
                <h4 class="card-title">Author: ${book.author_name}</h4>
                <h5 class="card-title">Publish: ${book.first_publish_year}</h5>
            </div>
        `;
        searchResult.appendChild(div);
        Spinner('none');
    });
    
};

// Input Empty
const inputEmpty = (inputDisplay)=>{
    document.getElementById('input-empty').style.display=inputDisplay;
}
// result search  error-message 
const resultError = displayStyle =>{
    document.getElementById('error-message').style.display =displayStyle;
}

// Spinner 
const Spinner = display=>{
    document.getElementById('spinner').style.display =display;
}