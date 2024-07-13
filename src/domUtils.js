import { handleDelete } from "./index.js";

export function createEntryDiv(formObject, index) {
  const entryDiv = document.createElement("div");
  entryDiv.className = "entry";
  entryDiv.innerHTML = `<span style="display: inline;"><strong>Name:</strong> ${formObject.task_name}</span>
        <span style="display: inline;"><strong>Desc:</strong> ${formObject.task_desc}</span> <br />
        <span><strong>Created:</strong> ${formObject.created_date}</span>
        <span><strong>Priority:</strong> ${formObject.priority}</span>
        <span><strong>Due:</strong> ${formObject.due_date}</span>
        <br /><button class="delete-btn" data-index="${index}">Delete</button>
      `;

  const deleteBtn = entryDiv.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    handleDelete(index);
  });

  return entryDiv;
}

export function appendToRightPane(entryDiv) {
  const rightPane = document.getElementById("rightPane");
  rightPane.appendChild(entryDiv);
}
