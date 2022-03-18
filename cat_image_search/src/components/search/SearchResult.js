export default class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;
  
    constructor({ $target, initialData, onClick }) {
      this.$searchResult = document.createElement("ul");
      this.$searchResult.className = "SearchResult";
      $target.appendChild(this.$searchResult);
  
      this.data = initialData;
      this.onClick = onClick;
  
      this.render();
      this.setEvent();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    setEvent() {
    }
  
    remove() {
      this.$searchResult.remove();
    }
  
    render() {
      if(this.data.length) {
        this.$searchResult.innerHTML = this.data
          .map(
            cat => `
              <li class="item">
                <img src=${cat.url} alt=${cat.name} />
              </li>
            `
          )
          .join("");
  
        this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
          $item.addEventListener("click", (e) => {
            e.preventDefault();
            this.onClick(this.data[index]);
          });
          // $item.addEventListener("mouseover", (e) => {
          //   e.preventDefault();
          //   this.onClick(this.data[index]);
          // });
        });
      } else {
        this.$searchResult.innerHTML = '<p>검색 결과가 없습니다.</p>'
      }
    }
  }
  