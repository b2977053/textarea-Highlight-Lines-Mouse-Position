
const myTextarea = document.querySelector('textarea');
const myHighlighter = document.querySelector('.highlighter');
function getActualLineHeight(element) {
    let highlighter = myHighlighter;
    highlighter.innerHTML = ''; 
    const maxIndex = 10;
    let lines = [];
    for (let index = 1; index <= maxIndex; index++) {
        const line = '中文字';
        lines.push(line);
    }

    highlighter.innerHTML = lines.join('\n'); // 將行連接到 highlighter 上

    // 測量測量元素的高度，然後除以行數 (maxIndex) 以獲得行高
    let lineHeight = highlighter.offsetHeight / highlighter.textContent.split('\n').length;
    
    highlighter.innerHTML = ''; 

    // 返回計算出的行高
    console.log(lineHeight);
    return lineHeight;
}
var myTextarea_lineHeight = getActualLineHeight(myTextarea);

document.addEventListener('DOMContentLoaded', function () {
    let textarea = myTextarea;
    let highlighter = myHighlighter;
    textarea.addEventListener('mousemove', function (e) {
        let lineHeight = getLineHeight(textarea); // 獲取行高

        const lineIndex = Math.floor((e.offsetY - textarea.scrollTop) / lineHeight); // 計算行索引
        highlightLine(lineIndex);
    });
    function getLineHeight(textarea) {
        let lineHeight = getComputedStyle(textarea).lineHeight;
        lineHeight = parseInt(lineHeight, 10); // 獲取行高

        if (isNaN(lineHeight))
            lineHeight = myTextarea_lineHeight;

        return lineHeight;
    }

    function highlightLine(lineIndex) {
        const lines = textarea.value.split('\n');
        highlighter.innerHTML = ''; // 清空 highlighter 內容

        if (lineIndex >= lines.length)
            lineIndex = -1;

        for (let index = 0; index <= lineIndex; index++) {
            const line = lines[index];
            if (index !== lineIndex) {
                const regularLine = document.createElement('span');
                regularLine.textContent = line;
                highlighter.appendChild(regularLine);
                highlighter.appendChild(document.createElement('br'));
            } else if (index === lineIndex) {
                const highlightedLine = document.createElement('span');
                highlightedLine.className = 'highlight-line';
                highlightedLine.textContent = line;
                highlighter.appendChild(highlightedLine);
            }

        }
    }
});