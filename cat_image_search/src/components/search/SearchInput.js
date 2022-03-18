import DarkMode from "../DarkMode.js";

export default class SearchInput {
  keyWords = [];
  constructor({ $target, onSearch }) {
    const $inputBox = document.createElement('header');
    $inputBox.className = 'inputBox';

    this.$searchInput = document.createElement("input");
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.className = "searchInput";
    this.$searchInput.setAttribute('type', "text");
    this.$searchInput.setAttribute('autofocus', true);

    this.$randomButton = document.createElement('button');
    this.$randomButton.className ='randomBtn';
    this.$randomButton.innerHTML = '랜덤 검색';

    this.$darkMode = new DarkMode($target);

    const $keyWords = document.createElement("div");
    $keyWords.className = "keyWords";
    this.$keyWords = $keyWords;

    $inputBox.appendChild(this.$searchInput);
    $inputBox.appendChild(this.$randomButton);
    $inputBox.appendChild(this.$keyWords);
    $target.appendChild($inputBox);

    this.setEvent(onSearch);
    this.getKeyWords();
  }

  setEvent(onSearch) {
    this.$searchInput.addEventListener("mouseup", e => {
      e.preventDefault();
      e.target.value = "";
    });

    this.$searchInput.addEventListener("keyup", async e => {
      if (e.keyCode === 13) {
        const key = e.target.value;
        await onSearch(key, false);
        await this.setKeyWords(key);
        await this.getKeyWords();
      }
    });

    this.$randomButton.addEventListener('click', () => onSearch(null, true));

    this.$keyWords.addEventListener('click', async e => {
      const key = e.target.innerHTML;
      await onSearch(key, false);
      await this.setKeyWords(key);
      await this.getKeyWords();
    });
  }

  setKeyWords(key) {
    if(this.keyWords.length === 5) this.keyWords.shift();
    this.keyWords.push(key);
    localStorage.setItem('keywords', JSON.stringify(this.keyWords));
  }

  getKeyWords() {
    const remove = this.$keyWords.querySelectorAll('.keyWord');
    for(let i = 0 ; i < remove.length ; i++)
      this.$keyWords.removeChild(remove[i]);
    const keyWords = JSON.parse(localStorage.getItem("keywords"));
    if(keyWords) {
      this.keyWords = keyWords;
      for(let i = 0 ; i < this.keyWords.length ; i++) {
        const $keyWord = document.createElement("button");
        $keyWord.className = "keyWord";
        $keyWord.innerHTML = this.keyWords[i];
        this.$keyWords.appendChild($keyWord);
      }
    }
  }

  render() { }
}
