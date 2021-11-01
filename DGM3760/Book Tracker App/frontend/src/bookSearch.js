export class BookSearch {

  constructor(searchFormSelector, resultsContainerSelector, loadingElementSelector) {
    this.searchForm = document.querySelector(searchFormSelector);
    this.resultsContainer = document.querySelector(resultsContainerSelector);
    this.loadingElement = document.querySelector(loadingElementSelector);
  }

  configureFormListener() {
    this.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    this.startLoading();
    this.resultsContainer.innerHTML = '';
    const { title, author_name} = extractFormData(this.searchForm);
    fetch(`http://openlibrary.org/search.json?q=`)
      .then(response => response.json())
      .then(({ results }) => {
        this.stopLoading();
        return results
          .join('');
      })
      .then(books => this.resultsContainer.innerHTML = books)
      .catch(() => this.stopLoading());
    });
  }

  startLoading() {
    this.loadingElement.classList.add('loading');
  }

  stopLoading() {
    this.loadingElement.classList.remove('loading');
  }
}