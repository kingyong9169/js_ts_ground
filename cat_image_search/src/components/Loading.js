export default class Loading {
    constructor($target) {
        const $loadingBox = document.createElement('div');
        $loadingBox.className = 'loadingBox';
        this.$loadingBox = $loadingBox;
        $target.appendChild($loadingBox);

        this.template = '<div>로딩 중...</div>';
        this.render();
    }

    render() {
        this.$loadingBox.innerHTML = this.template;
    }
}