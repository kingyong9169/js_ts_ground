export default class ImageInfo {
    $imageInfo = null;
    data = null;
  
    constructor({ $target, data }) {
      const $imageInfo = document.createElement("div");
      $imageInfo.className = "ImageInfo";
      this.$imageInfo = $imageInfo;
      $target.appendChild($imageInfo);
  
      this.data = data;
      this.setEvent();
      this.render();
    }
  
    setEvent() {
      this.$imageInfo.addEventListener('click', (e) => {
        const className = e.target.className;
        if(className === "ImageInfo" || className === "close")
          this.fadeOut(this.$imageInfo);
      });
  
      window.onkeyup = (e) => {
        const key = e.keyCode ? e.keyCode : e.which;
        if(key === 27){
          if(this.$imageInfo.style.display === 'block')
            this.fadeOut(this.$imageInfo);
        }
      }
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    fadeIn(element) {
      element.style.display = 'block';
    }
  
    fadeOut(element) {
      element.classList.add("fade");
      if(!element.style.opacity) element.style.display = 'none';
    }
  
    remove() {
      this.$imageInfo.remove();
    }
  
    render() {
      if (this.data.visible) {
        this.$imageInfo.classList.remove("fade");
        const { name, url, temperament, origin } = this.data.image;
  
        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <button class="close">x</button>
            </div>
            <img src="${url}" alt="${name}"/>
            <div class="description">
              <p>성격: ${temperament}</p>
              <p>태생: ${origin}</p>
            </div>
          </div>`;
        this.fadeIn(this.$imageInfo);
      } else {
        this.$imageInfo.style.display = "none";
      }
    }
  }
  