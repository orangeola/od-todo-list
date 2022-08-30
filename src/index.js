import './style.css';

console.log("test");

const projectArray = (() => {
    const objArray = [];
    let currentSelected = null;
    function returnArray(){
        return objArray;
    }
    function updateDOM(){
        main.innerText = currentSelected;
    }
    function addProjectDOM(name){
        const temp = document.createElement("div");
        temp.setAttribute('class','topic');
        temp.innerText = name;
        currentSelected = name;
        updateDOM();
        temp.addEventListener('click', ()=>{
            currentSelected = name;
            updateDOM();
        });
        document.getElementById("sideBar").appendChild(temp);

    };
    function addProjectJS(name){
        const newProj = {
            name: name,
            toDoList: []
        }
        objArray.push(newProj);
    }
    function addProject(name){
        addProjectDOM(name);
        addProjectJS(name);
    }
    function delProjectDOM(name){
        const temp = document.getElementsByClassName('topic');
        for(let i = 0; i < temp.length; i++){
            if(temp[i].innerText === name){
                temp[i].remove();
            }
        }
    };
    function delProjectJS(name){
        const temp = returnArray();
        for(let i = 0; i < temp.length; i++){
            if(temp[i].name === name){
                objArray.splice(i, 1);
            }
        }
    }
    function delProject(){
        if(currentSelected !== null){
            delProjectDOM(currentSelected);
            delProjectJS(currentSelected);
        }
    }
    return {addProject, delProject, returnArray}    
})();

const content = document.createElement("div");
content.setAttribute('id','content');

const main = document.createElement("div");
main.setAttribute('id','main');
main.innerText = "Moeny";

//header
const header = document.createElement("div");
header.setAttribute('id','header');
header.innerText = "To Do List"
//add topic button
const addTopicButton = document.createElement("button");
addTopicButton.setAttribute('class','addButton');
addTopicButton.innerText = "Add Topic";
addTopicButton.addEventListener('click', formPopUp);
header.appendChild(addTopicButton);
//add todo button
const addToDoButton = document.createElement("button");
addToDoButton.setAttribute('class','addButton');
addToDoButton.innerText = "Add To Do";
header.appendChild(addToDoButton);
//add delete topic button
const deleteTopicButton = document.createElement("button");
deleteTopicButton.setAttribute('class','addButton');
deleteTopicButton.innerText = "Delete Topic";
deleteTopicButton.addEventListener('click', projectArray.delProject);
header.appendChild(deleteTopicButton);

function formPopUp() {
    //pop up form
    const formDivContainer = document.createElement("div");
    formDivContainer.setAttribute('id','formContainer');
    const formDiv = document.createElement("div");
    formDiv.setAttribute('id','formPopUp');
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.onsubmit = ()=>{
        const temp = projectArray.returnArray();
        for(let i = 0; i < temp.length; i++){
            if(temp[i].name === topicName.value){
                return false;
            }
        }
        projectArray.addProject(topicName.value);
        formDivContainer.remove();
        console.log(projectArray.returnArray());
        return false;
    }
    //input topic name
    const topicName = document.createElement("input");
    topicName.setAttribute("type", "text");
    topicName.setAttribute("name", "topicName");
    topicName.setAttribute("placeholder", "Chores");
    topicName.required = true;
    //submit
    const s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    //close button
    const close = document.createElement("button");
    close.setAttribute('id','close');
    close.innerText = "Close";
    close.setAttribute("type", "button");
    close.addEventListener('click', () => {
        formDivContainer.remove();
    });
    //append everything
    form.appendChild(topicName);
    form.appendChild(s);
    form.appendChild(close);
    formDiv.appendChild(form);
    formDivContainer.appendChild(formDiv);
    document.body.prepend(formDivContainer);
}

//sidebar
const sideBar = document.createElement("div");
sideBar.setAttribute('id','sideBar');

content.appendChild(sideBar);
content.appendChild(main);
document.body.appendChild(header);
document.body.appendChild(content);

const home = document.createElement("div");
home.setAttribute('id','home');
home.setAttribute('class','topicS');
home.innerText = "home";
document.getElementById("sideBar").appendChild(home);

const today = document.createElement("div");
today.setAttribute('id','today');
today.setAttribute('class','topicS');
today.innerText = "today";
document.getElementById("sideBar").appendChild(today);

const week = document.createElement("div");
week.setAttribute('id','week');
week.setAttribute('class','topicS');
week.innerText = "week";
document.getElementById("sideBar").appendChild(week);