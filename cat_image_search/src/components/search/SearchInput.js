import DarkMode from "../DarkMode.js";

export default class SearchInput {
  keyWords = [];
  constructor({ $target, onSearch }) {
    this.onSearch = onSearch;
    const $inputBox = document.createElement('header');
    $inputBox.className = 'inputBox';

    this.$searchInput = document.createElement("input");
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.className = "searchInput";
    this.$searchInput.setAttribute('type', "text");
    this.$searchInput.setAttribute('autofocus', true);

    this.$randomButton = document.createElement('button');
    this.$randomButton.setAttribute("type", "button");
    this.$randomButton.setAttribute("aria-label", "랜덤 검색"); // Todo: 접근성 생각해보기 aria-pressed, aria-has-popup
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

    this.setEvent();
    this.getKeyWords();
  }

  setEvent() {
    this.$searchInput.addEventListener("click", e => {
      e.preventDefault();
      e.target.value = "";
    });

    this.$searchInput.addEventListener("keyup", async e => {
      if (e.keyCode === 13) {
        const key = e.target.value;
        await this.onSearch(key, false); // Todo: 메소드 분리
        await this.setKeyWords(key);
        await this.getKeyWords();
      }
    });

    this.$randomButton.addEventListener('click', () => this.onSearch(null, true));

    this.$keyWords.addEventListener('click', async e => {
      const key = e.target.innerHTML;
      await this.onSearch(key, false); // Todo: 메소드 분리
      await this.setKeyWords(key);
      await this.getKeyWords();
    });
  }

  getLastInputInfo = async (keyword) => {
    await this.onSearch(keyword, false);
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
        $keyWord.setAttribute('type', "button");
        $keyWord.className = "keyWord";
        $keyWord.innerHTML = this.keyWords[i];
        this.$keyWords.appendChild($keyWord);
      }
    }
  }

  render() { }
}
