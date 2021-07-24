let myLeads = [];

const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const leadList = document.getElementById("lead-list");
const ulEl = document.getElementById("ul-el");
const deleteLeads = document.getElementById("delete-btn");
let tabBtn = document.getElementById("save-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
});

function renderLeads(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
          <li class="wrap">
              <a href="${leads[i]}" target="_blank">${leads[i]}</a>    
          </li>
      `;
  }

  ulEl.innerHTML = listItems;
}

deleteLeads.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value.length) {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  }
});
