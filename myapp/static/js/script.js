// 行を追加する関数
const addRow = (tbody, template) => {
    const newRow = template.content.cloneNode(true);
    const templateElements = Array.from(template.content.querySelectorAll('input[name], select[name]'));
    newRow.querySelectorAll('input, select').forEach((element, index) => {
        const templateName = templateElements[index].getAttribute('name');
        element.name = `${templateName}-${tbody.children.length + 1}`;
    });
    tbody.appendChild(newRow);
};

// 行を削除する関数
const deleteRow = (tbody) => {
    if (tbody.lastElementChild) {
        tbody.removeChild(tbody.lastElementChild);
    }
};

// カードを非表示にする要素
const hideCardElements = [
    { inputNumberId: "enhancer-lv", cardId: "enhancer-skill-card" },
    { inputNumberId: "bard-lv", cardId: "bard-skill-card" },
    { inputNumberId: "rider-lv", cardId: "rider-skill-card" },
    { inputNumberId: "alchemist-lv", cardId: "alchemist-skill-card" },
    { inputNumberId: "geomancer-lv", cardId: "geomancer-skill-card" },
    { inputNumberId: "warleader-lv", cardId: "warleader-skill-card" }
];

const defaultValueInputElements = [
    { inputNumberId: "fighter-lv" },
    { inputNumberId: "grappler-lv" },
    { inputNumberId: "battledancer-lv" },
    { inputNumberId: "fensor-lv" },
    { inputNumberId: "shooter-lv" },
    { inputNumberId: "sorsurer-lv" },
    { inputNumberId: "conjurer-lv" },
    { inputNumberId: "priest-lv" },
    { inputNumberId: "magitech-lv" },
    { inputNumberId: "fairytamer-lv" },
    { inputNumberId: "druid-lv" },
    { inputNumberId: "demonruler-lv" },
    { inputNumberId: "enhancer-lv" },
    { inputNumberId: "bard-lv" },
    { inputNumberId: "rider-lv" },
    { inputNumberId: "alchemist-lv" },
    { inputNumberId: "geomancer-lv" },
    { inputNumberId: "warleader-lv" },
    { inputNumberId: "scout-lv" },
    { inputNumberId: "ranger-lv" },
    { inputNumberId: "sage-lv" },
]

// ページの読み込みが完了したときの処理
document.addEventListener("DOMContentLoaded", () => {
    // カードを非表示にする要素の処理
    hideCardElements.forEach(({ inputNumberId, cardId }) => {
        const inputNumber = document.getElementById(inputNumberId);
        const cardElement = document.getElementById(cardId);

        // カードを非表示にする処理
        const handleHideCard = () => {
            if (parseInt(inputNumber.value) < 1) {
                cardElement.style.display = "none";
            } else {
                cardElement.style.display = "block";
            }
        };

        inputNumber.addEventListener("input", handleHideCard);
        handleHideCard(); // ページ読み込み時に実行
    });

    // ページの読み込み時に初期値をインプットさせる処理
    defaultValueInputElements.forEach(({ inputNumberId }) => {
        const inputNumber = document.getElementById(inputNumberId);
        inputNumber.dispatchEvent(new Event("input"));
    });
});

// 自動的に行を追加および削除するテーブルの要素
const autoAddDeleteRowElements = [
    { inputNumberId: "enhancer-lv", tbodyId: "enhancer-skill-tbody", templateId: "enhancer-skill-template" },
    { inputNumberId: "bard-lv", tbodyId: "bard-skill-tbody", templateId: "bard-skill-template" },
    { inputNumberId: "rider-lv", tbodyId: "rider-skill-tbody", templateId: "rider-skill-template" },
    { inputNumberId: "alchemist-lv", tbodyId: "alchemist-skill-tbody", templateId: "alchemist-skill-template" },
    { inputNumberId: "geomancer-lv", tbodyId: "geomancer-skill-tbody", templateId: "geomancer-skill-template" },
    { inputNumberId: "warleader-lv", tbodyId: "warleader-skill-tbody", templateId: "warleader-skill-template" },
    { inputNumberId: "sage-lv", tbodyId: "auto-language-tbody", templateId: "auto-language-template" }
];
// 行を自動的に追加および削除するテーブルの処理
autoAddDeleteRowElements.forEach(({ inputNumberId, tbodyId, templateId }) => {
    const inputNumber = document.getElementById(inputNumberId);
    const tbodyElement = document.getElementById(tbodyId);
    const templateElement = document.getElementById(templateId);

    const handleInput = () => {
        const inputValue = parseInt(inputNumber.value);
        const currentRowCount = tbodyElement.children.length;
        const targetRowCount = Math.max(inputValue, 0);

        if (targetRowCount > currentRowCount) {
            for (let i = currentRowCount; i < targetRowCount; i++) {
                addRow(tbodyElement, templateElement);
            }
        } else if (targetRowCount < currentRowCount) {
            while (tbodyElement.children.length > targetRowCount) {
                deleteRow(tbodyElement);
            }
        }
    };

    inputNumber.addEventListener("input", handleInput);
});

// ボタンで行を追加および削除するテーブルの要素
const manualAddDeleteRowElements = [
    { addButtonId: "add-secret-skill-button", deleteButtonId: "delete-secret-skill-button", tbodyId: "secret-skill-tbody", templateId: "secret-skill-template" },
    { addButtonId: "add-weapon-button", deleteButtonId: "delete-weapon-button", tbodyId: "weapon-tbody", templateId: "weapon-template" },
    { addButtonId: "add-accessory-button", deleteButtonId: "delete-accessory-button", tbodyId: "add-accessory-tbody", templateId: "accessory-template" },
    { addButtonId: "add-item-button", deleteButtonId: "delete-item-button", tbodyId: "item-tbody", templateId: "item-template" },
    { addButtonId: "add-honor-button", deleteButtonId: "delete-honor-button", tbodyId: "honor-tbody", templateId: "honor-template" },
    { addButtonId: "add-language-button", deleteButtonId: "delete-language-button", tbodyId: "manual-language-tbody", templateId: "manual-language-template" },
    { addButtonId: "add-history-button", deleteButtonId: "delete-history-button", tbodyId: "history-tbody", templateId: "history-template" }
];
// ボタンで行を追加および削除するテーブルの処理
manualAddDeleteRowElements.forEach(({ addButtonId, deleteButtonId, tbodyId, templateId }) => {
    const addButton = document.getElementById(addButtonId);
    const deleteButton = document.getElementById(deleteButtonId);
    const tbodyElement = document.getElementById(tbodyId);
    const templateElement = document.getElementById(templateId);

    addButton.addEventListener("click", () => addRow(tbodyElement, templateElement));
    deleteButton.addEventListener("click", () => deleteRow(tbodyElement));
});