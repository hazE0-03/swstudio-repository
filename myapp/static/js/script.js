// 行を追加する関数
const addRow = (tbody, template) => {
    const newRow = template.content.cloneNode(true);
    const rowCount = tbody.children.length + 1; // 新しい行の番号
    const templateElements = Array.from(template.content.querySelectorAll('input[name], select[name]'));
    newRow.querySelectorAll('input, select').forEach((element, index) => {
        const templateName = templateElements[index].getAttribute('name');
        const templateId = templateElements[index].getAttribute('id'); // 新しい行のidに使用する
        element.name = `${templateName}-${rowCount}`;
        element.id = `${templateId}-${rowCount}`; // 新しい行のid属性を設定
        console.log("New Input ID:", element.id); // 新しい行のinput要素のIDをコンソールに出力
    });
    tbody.appendChild(newRow);
};

// 行を削除する関数
const deleteRow = (tbody) => {
    if (tbody.lastElementChild) {
        tbody.removeChild(tbody.lastElementChild);
    }
};

const calcTotal = (inputIdBase, hiddenIdBase, totalElement, tbody) => {
    // 最後の行の要素を取得する
    const newRow = tbody.lastElementChild;
    // input要素とhidden要素を取得する
    const inputElement = newRow.querySelector(`input[id^="${inputIdBase}"]`);
    const hiddenElement = newRow.querySelector(`input[id^="${hiddenIdBase}"]`);
    hiddenElement.value = '0';
    inputElement.addEventListener('input', () => {
        // 入力値が数値として有効かどうかをチェックする
        const inputValue = parseInt(inputElement.value) || 0;
        const hiddenValue = parseInt(hiddenElement.value) || 0;
        const totalValue = parseInt(totalElement.value) || 0;
        // 以前の値から今の値を引いて、その結果を合計に追加する
        totalElement.value = totalValue - inputValue + hiddenValue;
        // hiddenElementの値を更新する
        hiddenElement.value = inputElement.value;
    });
};

const subtractFromTotal = (tbody, totalElement, hiddenIdBase) => {
    // 最後の行の要素を取得する
    const newRow = tbody.lastElementChild;
    // input要素とhidden要素を取得する
    const hiddenElement = newRow.querySelector(`input[id^="${hiddenIdBase}"]`);
    const hiddenValue = parseInt(hiddenElement.value) || 0;
    const totalValue = parseInt(totalElement.value) || 0;
    totalElement.value = totalValue + hiddenValue
};

const addDeleteRowWithCalcTotalElements = [
    { addButtonId: "add-secret-skill-button", deleteButtonId: "delete-secret-skill-button", tbodyId: "secret-skill-tbody", templateId: "secret-skill-template", totalId: "total-honor", inputIdBase: "secret-skill-honor", hiddenIdBase: "secret-skill-honor-hidden" },
    { addButtonId: "add-honor-button", deleteButtonId: "delete-honor-button", tbodyId: "honor-tbody", templateId: "honor-template", totalId: "total-honor", inputIdBase: "honor-point", hiddenIdBase: "honor-point-hidden" },
    { addButtonId: "add-accessory-button", deleteButtonId: "delete-accessory-button", tbodyId: "accessory-tbody", templateId: "accessory-template", totalId: "total-money", inputIdBase: "accessory-price", hiddenIdBase: "accessory-price-hidden" }
];

addDeleteRowWithCalcTotalElements.forEach(({ addButtonId, deleteButtonId, tbodyId, templateId, totalId, inputIdBase, hiddenIdBase }) => {
    const tbody = document.getElementById(tbodyId);
    const template = document.getElementById(templateId);
    const totalElement = document.getElementById(totalId);
    const addButton = document.getElementById(addButtonId);
    const deleteButton = document.getElementById(deleteButtonId);
    addButton.addEventListener('click', () => {
        addRow(tbody, template);
        calcTotal(inputIdBase, hiddenIdBase, totalElement, tbody);
    });
    deleteButton.addEventListener('click', () => {
        subtractFromTotal(tbody, totalElement, hiddenIdBase);
        deleteRow(tbody);
    });
});

const calcPrice = (unitPriceElement, quantityElement, priceElement, hiddenElement, totalElement) => {
    const unitPriceValue = parseInt(unitPriceElement.value) || 0;
    const quantityValue = parseInt(quantityElement.value) || 0;
    const totalValue = parseInt(totalElement.value) || 0;
    const hiddenValue = parseInt(hiddenElement.value) || 0;
    
    const priceValue = unitPriceValue * quantityValue;
    priceElement.value = priceValue;
    totalElement.value = totalValue - priceValue + hiddenValue;
    hiddenElement.value = priceValue;
};

const addEventCalcPrice = (tbody, unitPriceIdBase, quantityIdBase, priceIdBase, hiddenIdBase, totalElement) => {
    const newRow = tbody.lastElementChild;
    const unitPriceElement = newRow.querySelector(`input[id^="${unitPriceIdBase}"]`);
    const quantityElement = newRow.querySelector(`input[id^="${quantityIdBase}"]`);
    const priceElement = newRow.querySelector(`input[id^="${priceIdBase}"]`);
    const hiddenElement = newRow.querySelector(`input[id^="${hiddenIdBase}"]`);
    unitPriceElement.addEventListener('input', () => calcPrice(unitPriceElement, quantityElement, priceElement, hiddenElement, totalElement));
    quantityElement.addEventListener('input', () => calcPrice(unitPriceElement, quantityElement, priceElement, hiddenElement, totalElement));
};

const addDeleteRowWithCalcTotalAndPriceElements = [
    { addButtonId: "add-item-button", deleteButtonId: "delete-item-button", tbodyId: "item-tbody", templateId: "item-template", totalId: "total-money", inputIdBase: "item-price", hiddenIdBase: "item-price-hidden", unitPriceIdBase: "item-unit-price", quantityIdBase: "item-quantity", priceIdBase: "item-price" }
];

addDeleteRowWithCalcTotalAndPriceElements.forEach(({ addButtonId, deleteButtonId, tbodyId, templateId, totalId, inputIdBase, hiddenIdBase, unitPriceIdBase, quantityIdBase, priceIdBase }) => {
    const tbody = document.getElementById(tbodyId);
    const template = document.getElementById(templateId);
    const totalElement = document.getElementById(totalId);
    const addButton = document.getElementById(addButtonId);
    const deleteButton = document.getElementById(deleteButtonId);
    addButton.addEventListener('click', () => {
        addRow(tbody, template);
        addEventCalcPrice(tbody, unitPriceIdBase, quantityIdBase, priceIdBase, hiddenIdBase, totalElement);
    });
    deleteButton.addEventListener('click', () => {
        subtractFromTotal(tbody, totalElement, hiddenIdBase);
        deleteRow(tbody);
    });
});

// 行を追加した後に合計を表示する関数
const calcSumAndTotal = (tbody, inputIdBase, hiddenIdBase, sumId, totalId) => {
    const inputElement = document.getElementById(`${inputIdBase}-${tbody.children.length}`);
    const hiddenElement = document.getElementById(`${hiddenIdBase}-${tbody.children.length}`);
    const sumElement = document.getElementById(sumId);
    const totalElement = document.getElementById(totalId);
    inputElement.addEventListener('input', ()  => {
        const inputValue = parseInt(inputElement.value) || 0;
        const hiddenValue = parseInt(hiddenElement.value) || 0;
        const sumValue = parseInt(sumElement.value) || 0;
        const totalValue = parseInt(totalElement.value) || 0;
        sumElement.value = sumValue + inputValue - hiddenValue;
        totalElement.value = totalValue + inputValue - hiddenValue;
        hiddenElement.value = inputValue
    });
};


// 行を削除した後に合計を再計算する関数
const subtractFromSumAndTotal = (tbody, hiddenIdBase, sumId, totalId) => {
    const hiddenElement = document.getElementById(`${hiddenIdBase}-${tbody.children.length}`);
    const sumElement = document.getElementById(sumId);
    const totalElement = document.getElementById(totalId);
    const hiddenValue = parseInt(hiddenElement.value) || 0;
    const sumValue = parseInt(sumElement.value) || 0;
    const totalValue = parseInt(totalElement.value) || 0;
    sumElement.value = sumValue - hiddenValue
    totalElement.value = totalValue - hiddenValue
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
// カードを非表示にする処理
hideCardElements.forEach(({ inputNumberId, cardId }) => {
    const inputNumber = document.getElementById(inputNumberId);
    const cardElement = document.getElementById(cardId);

    const handleHideCard = () => {
        if (parseInt(inputNumber.value) < 1) {
            cardElement.style.display = "none";
        } else {
            cardElement.style.display = "block";
        }
    };

    inputNumber.addEventListener("input", handleHideCard);
    handleHideCard();
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
// 自動的に行を追加および削除するテーブルの処理
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
    { addButtonId: "add-weapon-button", deleteButtonId: "delete-weapon-button", tbodyId: "weapon-tbody", templateId: "weapon-template" },
    { addButtonId: "add-language-button", deleteButtonId: "delete-language-button", tbodyId: "manual-language-tbody", templateId: "manual-language-template" }
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

// ボタンで行を追加および削除した後に、指定のカラムの合計を表示するテーブルの処理
const addHistoryButton = document.getElementById("add-history-button");
const deleteHistoryButton = document.getElementById("delete-history-button");
const historyTbodyElement = document.getElementById("history-tbody");
const historyTemplateElement = document.getElementById("history-template");
const calcSumElements = [
    { inputIdBase: "history-xp", hiddenIdBase: "history-xp-hidden", sumId: "history-sum-xp", totalId: "total-xp"},
    { inputIdBase: "history-money", hiddenIdBase: "history-money-hidden", sumId: "history-sum-money", totalId: "total-money"},
    { inputIdBase: "history-honor", hiddenIdBase: "history-honor-hidden", sumId: "history-sum-honor", totalId: "total-honor"}
];
addHistoryButton.addEventListener("click", () => {
    const tbody = historyTbodyElement;
    const template = historyTemplateElement;
    addRow(tbody, template);
    calcSumElements.forEach(({ inputIdBase, hiddenIdBase, sumId, totalId}) => {
    calcSumAndTotal(tbody, inputIdBase, hiddenIdBase, sumId, totalId);
    });
});
deleteHistoryButton.addEventListener("click", () => {
    const tbody = historyTbodyElement;
    calcSumElements.forEach(({ hiddenIdBase, sumId, totalId}) => {
    subtractFromSumAndTotal(tbody, hiddenIdBase, sumId, totalId);
    });
    deleteRow(tbody);
});


const updateUsedXpElements = [
    {
        xpTableListA: [0, 1000, 2000, 3500, 5000, 7000, 9500, 12500, 16500, 21500, 27500, 35000, 44000, 54500, 66500, 80000],
        inputLvElementsA: ["fighter-lv", "grappler-lv", "battledancer-lv", "sorcerer-lv", "conjurer-lv", "priest-lv", "magitech-lv", "fairytamer-lv", "druid-lv", "demonruler-lv"],
        xpTableListB: [0, 500, 1500, 2500, 4000, 5500, 7500, 10000, 13000, 17000, 22000, 28000, 35500, 44500, 55000, 67000],
        inputLvElementsB: ["fencer-lv", "shooter-lv", "enhancer-lv", "bard-lv", "rider-lv", "alchemist-lv", "geomancer-lv", "warleader-lv", "scout-lv", "ranger-lv", "sage-lv"]
    }
];
updateUsedXpElements.forEach(({ xpTableListA, inputLvElementsA, xpTableListB, inputLvElementsB }) => {
    inputLvElementsA.concat(inputLvElementsB).forEach(inputLvId => {
        const inputLvElement = document.getElementById(inputLvId);
        inputLvElement.addEventListener("input", () => {
            const totalXp = document.getElementById("total-xp");
            const usedXp = document.getElementById("used-xp");
            const remainingXp = document.getElementById("remaining-xp")
            let sum = 0;
            for (const inputLvIdA of inputLvElementsA) {
                const inputLvElementA = document.getElementById(inputLvIdA);
                const inputLvValueA = parseInt(inputLvElementA.value);
                if (!isNaN(inputLvValueA)) {
                    const usedXpByLvA = xpTableListA[inputLvValueA];
                    sum += usedXpByLvA;
                }
            }
            for (const inputLvIdB of inputLvElementsB) {
                const inputLvElementB = document.getElementById(inputLvIdB);
                const inputLvValueB = parseInt(inputLvElementB.value);
                if (!isNaN(inputLvValueB)) {
                    const usedXpByLvB = xpTableListB[inputLvValueB];
                    sum += usedXpByLvB;
                }
            }
            usedXp.value = sum;
            remainingXp.value = parseInt(totalXp.value) - sum;
        });
    });
});