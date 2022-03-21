export default class DarkMode {
    constructor($target) {
        const $label = document.createElement('label');
        $label.setAttribute("for", "darkMode");
        $label.className = 'darkMode';
        this.$label = $label;
        $target.appendChild($label);

        const $checkBox = document.createElement('input');
        const $text = document.createTextNode('다크모드');
        $checkBox.setAttribute("id", "darkMode");
        $checkBox.setAttribute("type", "checkbox");
        this.$checkBox = $checkBox;
        $label.appendChild($checkBox);
        $label.appendChild($text);
        this.setEvent();
    }

    setEvent() {
        const $themeMode = window.matchMedia("(prefers-color-scheme:dark)").matches;
        if($themeMode && !this.$checkBox.checked) {
            this.$checkBox.checked = true;
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        }

        this.$checkBox.addEventListener("change", e => {
            e.preventDefault();
            if(e.target.checked) {
                document.body.classList.add("dark");
                document.body.classList.remove("light");
            } else {
                document.body.classList.remove("dark");
                document.body.classList.add("light");
            }
        });
    }
}