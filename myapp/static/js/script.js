function addRow(tbody, template) {
    // テンプレートから行をクローン
    const newRow = template.content.cloneNode(true);
    tbody.appendChild(newRow);
}

function deleteRow(tbody) {
    // 最後の行を削除
    if (tbody.lastElementChild) {
        tbody.removeChild(tbody.lastElementChild);
    }
}

const addSecretSkillButton = document.getElementById("add-secret-skill-button");
const deleteSecretSkillButton = document.getElementById("delete-secret-skill-button");
const secretSkillTbody = document.getElementById("secret-skill-tbody");
const secretSkillTemplate = document.getElementById("secret-skill-template");

addSecretSkillButton.addEventListener("click", function () {
    addRow(secretSkillTbody, secretSkillTemplate);
});

deleteSecretSkillButton.addEventListener("click", function () {
    deleteRow(secretSkillTbody);
});