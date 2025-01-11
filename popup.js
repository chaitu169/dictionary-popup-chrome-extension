document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('selectedWord', (data) => {
      const word = data.selectedWord;
      const wordElement = document.getElementById("selectedWord");
      wordElement.innerText = `Word - ${word}`;
      if (word) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
          .then(response => response.json())
          .then(data => {
            const meaningElement = document.getElementById('wordMeaning');
            if (data[0] && data[0].meanings) {
              meaningElement.innerText = data[0].meanings[0].definitions[0].definition;
            } else {
              meaningElement.innerText = 'No meaning found.';
            }
          })
          .catch(error => {
            const meaningElement = document.getElementById('meaning');
            meaningElement.innerText = 'Error fetching meaning.';
          });
      }

      // Add event listener to the search button
      const searchButton = document.getElementById('searchButton');
      searchButton.addEventListener('click', () => {
        const query = encodeURIComponent(`${word} means`);
        const url = `https://www.google.com/search?q=${query}`;
        chrome.tabs.create({ url });
      });
    });
  });