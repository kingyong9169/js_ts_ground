import SearchInput from "./components/search/SearchInput.js";
import SearchResult from "./components/search/SearchResult.js";
import ImageInfo from "./components/ImageInfo.js";
import Loading from "./components/Loading.js";
import ErrorMessage from "./components/ErrorMessage.js"
import api from "./api/api.js"

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword, isRandom) => {
        try {
          if(this.searchResult) {
            this.searchResult.remove();
            this.imageInfo.remove();
          }
          if(this.error) this.error.removeError();
          this.loading = new Loading($target);
          const { data } = isRandom ? await api.randomSearch() : await api.fetchCats(keyword);
          this.removeLoadingBoxes($target);
          this.newSearchResult($target);
          this.newImageInfo($target);
          this.setState(data);
        } catch(e) {
          this.removeLoadingBoxes($target);
          this.error = new ErrorMessage($target);
        }
      },
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  removeLoadingBoxes($target) {
    const $loadingBoxes = document.querySelectorAll('.loadingBox');
    $loadingBoxes.forEach(x => $target.removeChild(x));
  }

  newSearchResult($target) {
    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        try {
          if(this.error) this.error.removeError();
          this.loading = new Loading($target);
          const { data } = await api.fetchCatDetails(image.id);
          this.imageInfo.setState({
            visible: true,
            image: data,
          });
          this.removeLoadingBoxes($target);
        } catch(e) {
          this.removeLoadingBoxes($target);
          this.error = new ErrorMessage($target);
        }
      }
    });
  }

  newImageInfo($target) {
    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }
}
