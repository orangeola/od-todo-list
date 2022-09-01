import './style.css';

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
        let newProj = {
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
        let index = null;
        for(let i = 0; i < temp.length; i++){
            if(temp[i].innerText === name){
                temp[i].remove();
                index = i;
            }
        }
        if(index !== null){
            if(temp.length === 0){
                currentSelected = null;
                updateDOM();
            }
            else if(index < temp.length){
                currentSelected = temp[index].innerText;
                updateDOM();
            }
            else {
                currentSelected = temp[index-1].innerText;
                updateDOM();
            }
        }
        console.log(objArray);
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
            delProjectJS(currentSelected);
            delProjectDOM(currentSelected);
        }
    }
    function addToDoJS(name, newObj){
        for(let i = 0; i < objArray.length; i++){
            if(objArray[i].name === name){
                objArray[i].toDoList.push(newObj);
            }
        }
    }
    function addToDo(newObj){
        addToDoJS(currentSelected, newObj);
        //function that updates current page based on currentSelected
    }
    return {addProject, delProject, returnArray, addToDo}    
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
addToDoButton.addEventListener('click', formToDoPopUp);
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
    formDivContainer.setAttribute('class','formContainer');
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
    form.appendChild(document.createElement('br'));
    form.appendChild(s);
    form.appendChild(close);
    formDiv.appendChild(form);
    formDivContainer.appendChild(formDiv);
    document.body.prepend(formDivContainer);
}

function formToDoPopUp() {
    //pop up form
    const formDivContainer = document.createElement("div");
    formDivContainer.setAttribute('class','formContainer');
    const formDiv = document.createElement("div");
    formDiv.setAttribute('id','formToDoPopUp');
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.onsubmit = ()=>{
        //call addtodolist function with all variables from
        //inputs filled
        let newToDo = {
            title: toDoName.value,
            description: toDoDes.value,
            dueDate: toDoDate.value,
            priority: toDoPriority.value
        }
        projectArray.addToDo(newToDo);
        formDivContainer.remove();
        console.log(projectArray.returnArray());
        /*
        alert(toDoName.value);
        alert(toDoDes.value);
        alert(toDoDate.value);
        alert(toDoPriority.value);
        */
        return false;
    }   
    //input to-do name
    const toDoName = document.createElement("input");
    toDoName.setAttribute("type", "text");
    toDoName.setAttribute("name", "toDoName");
    toDoName.setAttribute("placeholder", "Title");
    toDoName.required = true;
    //input description
    const toDoDes = document.createElement("input");
    toDoDes.setAttribute("type", "text");
    toDoDes.setAttribute("name", "toDoDes");
    toDoDes.setAttribute("placeholder", "Description");
    toDoDes.required = true;
    //input date
    const toDoDate = document.createElement("input");
    toDoDate.setAttribute("type", "date");
    toDoDate.setAttribute("name", "toDoDate");
    toDoDate.required = true;
    //input priority
    const toDoPriority = document.createElement("input");
    toDoPriority.setAttribute("type", "number");
    toDoPriority.setAttribute("name", "toDoPriority");
    toDoPriority.setAttribute("min", 0);
    toDoPriority.setAttribute("max", 5);
    toDoPriority.required = true;
    //submit
    const s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    //close button
    const close = document.createElement("button");
    close.innerText = "Close";
    close.setAttribute("type", "button");
    close.addEventListener('click', () => {
        formDivContainer.remove();
    });
    //append everything
    form.appendChild(toDoName);
    form.appendChild(document.createElement('br'));
    form.appendChild(toDoDes);
    form.appendChild(document.createElement('br'));
    form.appendChild(toDoDate);
    form.appendChild(document.createElement('br'));
    form.appendChild(toDoPriority);
    form.appendChild(document.createElement('br'));
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