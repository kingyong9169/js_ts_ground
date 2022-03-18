export default class ErrorMessage {
    constructor($target) {
        const $errorMessage = document.createElement('span');
        $errorMessage.className = 'errorMessage';
        this.$errorMessage = $errorMessage;
        $errorMessage.innerHTML = '예기지 못한 오류가 발생했습니다. 다시 검색해주세요.'
        $target.appendChild($errorMessage);

        this.render();
    }

    removeError() {
        this.$errorMessage.remove();
    }

    render() { }
}