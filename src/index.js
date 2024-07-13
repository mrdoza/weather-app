import "./style.css";
import { format } from "date-fns";
import { createEntryDiv, appendToRightPane } from "./domUtils";

const dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];

function storeDataToLocalStorage(dataArray) {
  localStorage.setItem("dataArray", JSON.stringify(dataArray));
}

function checkLocalStorageAndAddItems() {
  if (dataArray.length > 0) {
    dataArray.forEach((item, index) => {
      const entryDiv = createEntryDiv(item, index);
      appendToRightPane(entryDiv);
    });
  }
}

export function handleDelete(index) {
  dataArray.splice(index, 1);
  storeDataToLocalStorage(dataArray);
  updateRightPane();
}

function updateRightPane() {
  const rightPane = document.getElementById("rightPane");
  rightPane.innerHTML = "";
  dataArray.forEach((item, index) => {
    const entryDiv = createEntryDiv(item, index);
    appendToRightPane(entryDiv);
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  checkLocalStorageAndAddItems();

  const form = document.getElementById("myForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    const priority = document.querySelector(
      'input[name="priority"]:checked'
    ).value;
    formObject["priority"] = priority;

    const formattedDate = format(new Date(formObject.due_date), "MM/dd/yyyy");
    formObject.due_date = formattedDate;
    formObject["created_date"] = format(new Date(), "MM/dd/yyyy");

    dataArray.push(formObject);

    storeDataToLocalStorage(dataArray);

    const entryDiv = createEntryDiv(formObject);
    appendToRightPane(entryDiv);
    form.reset();
  });
});
