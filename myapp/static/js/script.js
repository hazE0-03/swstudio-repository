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
    });
    tbody.appendChild(newRow);
};

// 行を削除する関数
const deleteRow = (tbody) => {
    if (tbody.lastElementChild) {
        tbody.removeChild(tbody.lastElementChild);
    }
};

const calculateMoney = () => {
    const getTotalFromTable = (tbodyId, inputIdPrefix) => {
        const tbody = document.getElementById(tbodyId);
        let total = 0;
        tbody.querySelectorAll(`input[id^="${inputIdPrefix}"]`).forEach(input => {
            total += parseInt(input.value) || 0;
        });
        return total;
    };

    const historyTotal = getTotalFromTable('history-tbody', 'history-money');
    const itemTotal = getTotalFromTable('item-tbody', 'item-price');
    const weaponTotal = getTotalFromTable('weapon-tbody', 'weapon-price');
    const armorTotal = getTotalFromTable('armor-tbody', 'armor-price');
    const accessoryTotal = getTotalFromTable('accessory-tbody', 'accessory-price');
    const addAccessoryTotal = getTotalFromTable('addAccessory-tbody', 'accessory-price');

    const total = historyTotal - itemTotal - weaponTotal - armorTotal - accessoryTotal - addAccessoryTotal;
    return total;
};


// 合計を計算する関数
const calculateSum = (inputIdBase, tbody) => {
    let total = 0;
    const inputElements = tbody.querySelectorAll(`input[id^="${inputIdBase}-"]`); // idが`{inputIdBase}-`で始まる入力欄を取得
    inputElements.forEach(input => {
        total += parseInt(input.value) || 0; // 入力値を合計に加算（数値に変換できない場合は0を加算）
    });
    return total;
};

// 表に入力された数字の合計を表示する関数
const displayTotal = (outputId, inputIdBase, tbody) => {
    const outputElement = document.getElementById(outputId);
    if (outputElement) {
        outputElement.value = calculateSum(inputIdBase, tbody); // 合計を表示する要素に合計値をセット
    }
};

// 行を追加した後に合計を表示する関数
const addRowWithSumCalc = (tbody, template, sumCalcElements) => {
    addRow(tbody, template);
    const newRow = tbody.lastElementChild; // 追加された最後の行を取得
    sumCalcElements.forEach(({ inputIdBase, outputId, totalPointId, initialValue }) => {
        const inputElements = newRow.querySelectorAll(`input[id^="${inputIdBase}-"]`); // 新しい行内の対象の入力欄を取得
        inputElements.forEach(input => {
            input.addEventListener("input", () => {
                // 合計を計算して表示
                const total = calculateSum(inputIdBase, tbody);
                const outputElement = document.getElementById(outputId);
                outputElement.value = total;
                const totalPointElement = document.getElementById(totalPointId);
                totalPointElement.value = total + initialValue

                const totalXp = document.getElementById("total-xp");
                const usedXp = document.getElementById("used-xp");
                const remainingXp = document.getElementById("remaining-xp")
                remainingXp.value = parseInt(totalXp.value) - parseInt(usedXp.value);

            });
        });
    });
};

// 行を削除した後に合計を再計算する関数
const deleteRowWithSumCalc = (tbody, sumCalcElements) => {
    if (tbody.lastElementChild) {
        deleteRow(tbody);
        // 行を削除した後に合計を再計算
        sumCalcElements.forEach(({ inputIdBase, outputId, totalPointId, initialValue }) => {
            const total = calculateSum(inputIdBase, tbody);
            const outputElement = document.getElementById(outputId);
            outputElement.value = total;
            const totalPointElement = document.getElementById(totalPointId);
            totalPointElement.value = total + initialValue

            const totalXp = document.getElementById("total-xp");
            const usedXp = document.getElementById("used-xp");
            const remainingXp = document.getElementById("remaining-xp")
            remainingXp.value = parseInt(totalXp.value) - parseInt(usedXp.value);
        });
    }
};

const AddRowWithSpentCalc = (tbody, template, inputIdBase, totalPointId) => {
    addRow(tbody, template);
    const newRow = tbody.lastElementChild;
    const inputElements = newRow.querySelectorAll(`input[id^="${inputIdBase}-"]`);
    inputElements.forEach(input => {
        input.addEventListener("input", () => {
            const totalSpentPoint = calculateSum(inputIdBase, tbody);
            const totalPoint = parseInt(document.getElementById(totalPointId).value);
            document.getElementById(totalPointId).value = totalPoint - totalSpentPoint;
        });
    });
};

const DeleteRowWithSpentCalc = (tbody, inputIdBase, totalPointId) => {
    if (tbody.lastElementChild) {
        deleteRow(tbody);
        const totalSpentPoint = calculateSum(inputIdBase, tbody);
        const totalPoint = parseInt(document.getElementById(totalPointId).value);
        document.getElementById(totalPointId).value = totalPoint - totalSpentPoint;
    }
};


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
    { addButtonId: "add-secret-skill-button", deleteButtonId: "delete-secret-skill-button", tbodyId: "secret-skill-tbody", templateId: "secret-skill-template" },
    { addButtonId: "add-weapon-button", deleteButtonId: "delete-weapon-button", tbodyId: "weapon-tbody", templateId: "weapon-template" },
    { addButtonId: "add-accessory-button", deleteButtonId: "delete-accessory-button", tbodyId: "add-accessory-tbody", templateId: "accessory-template" },
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
const histoyTbodyElement = document.getElementById("history-tbody");
const historyTemplateElement = document.getElementById("history-template");
const historySumCalcElements = [
    { inputIdBase: "history-xp", outputId: "history-sum-xp", totalPointId: "total-xp", initialValue: 3000 },
    { inputIdBase: "history-money", outputId: "history-sum-money", totalPointId: "total-money", initialValue: 1200 },
    { inputIdBase: "history-honor", outputId: "history-sum-honor", totalPointId: "total-honor", initialValue: 0 }
];
addHistoryButton.addEventListener("click", () => addRowWithSumCalc(histoyTbodyElement, historyTemplateElement, historySumCalcElements));
deleteHistoryButton.addEventListener("click", () => deleteRowWithSumCalc(histoyTbodyElement, historySumCalcElements));


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

const manualAddDeleteRowWithSpentCalcElements = [
    { addButtonId: "add-item-button", deleteButtonId: "delete-item-button", tbodyId: "item-tbody", templateId: "item-template", inputIdBase: "item-money", totalPointId: "total-money" },
    { addButtonId: "add-honor-button", deleteButtonId: "delete-honor-button", tbodyId: "honor-tbody", templateId: "honor-template", inputIdBase: "honor-point", totalPointId: "total-honor" }
]

manualAddDeleteRowWithSpentCalcElements.forEach(({ addButtonId, deleteButtonId, tbodyId, templateId, inputIdBase: inputIdBaseValue, totalPointId }) => {
    const addButton = document.getElementById(addButtonId);
    const deleteButton = document.getElementById(deleteButtonId);
    const tbodyElement = document.getElementById(tbodyId);
    const templateElement = document.getElementById(templateId);

    addButton.addEventListener("click", () => AddRowWithSpentCalc(tbodyElement, templateElement, inputIdBaseValue, totalPointId));
    deleteButton.addEventListener("click", () => DeleteRowWithSpentCalc(tbodyElement, inputIdBaseValue, totalPointId));
});

const addButton = document.getElementById("add-item-button")
const tbody = document.getElementById("item-tbody")
const template = document.getElementById("item-template")
const inputBase = "item-money"
const outputId = document.getElementById("item-sum-money")
addButton.addEventListener("click", () => {
    addRow(tbody, template)
    const newRow = tbody.lastElementChild; // 追加された最後の行を取得
    sumCalcElements.forEach(({ inputIdBase, outputId, totalPointId, initialValue }) => {
        const inputElements = newRow.querySelectorAll(`input[id^="${inputIdBase}-"]`); // 新しい行内の対象の入力欄を取得
        inputElements.forEach(input => {
            input.addEventListener("input", () => {
                // 合計を計算して表示
                const total = calculateSum(inputIdBase, tbody);
                const outputElement = document.getElementById(outputId);
                outputElement.value = total;
                const totalPointElement = document.getElementById(totalPointId);
                totalPointElement.value = total + initialValue

            });
        });
    });
});