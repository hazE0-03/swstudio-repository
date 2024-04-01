const addRow = (tbody, template) => {
    const newRow = template.content.cloneNode(true);
    const templateElements = Array.from(template.content.querySelectorAll('input[name], select[name]'));
    newRow.querySelectorAll('input, select').forEach((element, index) => {
        const templateName = templateElements[index].getAttribute('name');
        element.name = `${templateName}-${tbody.children.length + 1}`;
    });

    tbody.appendChild(newRow);
};
const deleteRow = (tbody) => {
    if (tbody.lastElementChild) {
        tbody.removeChild(tbody.lastElementChild);
    }
};

const elements = [
    { addButtonId: "add-secret-skill-button", deleteButtonId: "delete-secret-skill-button", tbodyId: "secret-skill-tbody", templateId: "secret-skill-template" },
    { addButtonId: "add-weapon-button", deleteButtonId: "delete-weapon-button", tbodyId: "weapon-tbody", templateId: "weapon-template" },
    { addButtonId: "add-accessory-button", deleteButtonId: "delete-accessory-button", tbodyId: "add-accessory-tbody", templateId: "accessory-template" },
    { addButtonId: "add-item-button", deleteButtonId: "delete-item-button", tbodyId: "item-tbody", templateId: "item-template" },
    { addButtonId: "add-honor-button", deleteButtonId: "delete-honor-button", tbodyId: "honor-tbody", templateId: "honor-template" },
    { addButtonId: "add-language-button", deleteButtonId: "delete-language-button", tbodyId: "manual-language-tbody", templateId: "manual-language-template" },
    { addButtonId: "add-history-button", deleteButtonId: "delete-history-button", tbodyId: "history-tbody", templateId: "history-template" }
];

elements.forEach(({ addButtonId, deleteButtonId, tbodyId, templateId }) => {
    const addButton = document.getElementById(addButtonId);
    const deleteButton = document.getElementById(deleteButtonId);
    const tbodyElement = document.getElementById(tbodyId);
    const templateElement = document.getElementById(templateId);

    addButton.addEventListener("click", () => addRow(tbodyElement, templateElement));
    deleteButton.addEventListener("click", () => deleteRow(tbodyElement));
});

