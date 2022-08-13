import './style.css';

console.log("test");

const content = document.createElement("div");
content.setAttribute('id','content');

const main = document.createElement("div");
main.setAttribute('id','main');
main.innerText = "Moeny";

const header = document.createElement("div");
header.setAttribute('id','header');
header.innerText = "To Do List"

const sideBar = document.createElement("div");
sideBar.setAttribute('id','sideBar');
sideBar.innerText = "Inbox";

document.body.appendChild(header);

content.appendChild(sideBar);
content.appendChild(main);

document.body.appendChild(content);