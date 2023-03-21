import './style.css';
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore"; 
import {db, app} from "../src/firebase/config"

const projectArray = (() => {
    let objArray = [];
    let currentSelected = null;
    function returnCurrent(){
        for(let i = 0; i < objArray.length; i++){
            if(objArray[i].name === currentSelected){
                return i;
            }
        }
        return null;
    }
    function returnArray(){
        return objArray;
    }
    function addProjectDOM(name){
        const temp = document.createElement("div");
        temp.setAttribute('class','topic');
        temp.innerText = name;
        currentSelected = name;
        updateToDo();
        temp.addEventListener('click', ()=>{
            let removeAt = document.getElementById('clicked');
            if(removeAt){
                console.log("here");
                removeAt.removeAttribute('id', 'clicked');
            }
            temp.setAttribute('id','clicked');
            currentSelected = name;
            updateToDo();
        });
        let removeAt = document.getElementById('clicked');
        if(removeAt === null){
            temp.setAttribute('id','clicked'); 
        } else {
            removeAt.removeAttribute('id', 'clicked');
            temp.setAttribute('id','clicked'); 
        }
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
        updateStorage();
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
                updateToDo();
            }
            else if(index < temp.length){
                currentSelected = temp[index].innerText;
                temp[index].setAttribute('id','clicked'); 
                updateToDo();
            }
            else {
                currentSelected = temp[index-1].innerText;
                temp[index-1].setAttribute('id','clicked'); 
                updateToDo();
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
            updateStorage();
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
        updateToDo();
        updateStorage();
    }
    function updateToDo(){
        //clear main
        main.innerHTML = "";
        //locate currentselected topic in array
        let currentTopic = null;
        for(let i = 0; i < objArray.length; i++){
            if(objArray[i].name === currentSelected){
                currentTopic = objArray[i];
            }
        }
        //look into array at currentselected topic
        //for each todo, create a div with a certain id
        //fill div with all the information
        if(currentTopic !== null){
            for(let i = 0; i < currentTopic.toDoList.length; i++){
                let tempTDObject = document.createElement("div");
                tempTDObject.setAttribute("class", "toDoObject");
                let tempTitle = document.createElement("p");
                tempTitle.innerText = "Title: " + currentTopic.toDoList[i].title;
                let tempDesc = document.createElement("p");
                tempDesc.innerText = "Description: " + currentTopic.toDoList[i].description;
                let tempDue = document.createElement("p");
                tempDue.innerText = "Due Date: " + currentTopic.toDoList[i].dueDate;
                let tempPrio = document.createElement("p");
                tempPrio.innerText = "Priority: " + currentTopic.toDoList[i].priority;

                let remove = document.createElement("button");
                remove.innerText = "Delete";
                remove.addEventListener('click', () => {
                    const tempCurrent = projectArray.returnCurrent();
                    for(let i = 0; i < objArray[tempCurrent].toDoList.length; i++){
                        if(objArray[tempCurrent].toDoList[i].title === tempTitle.innerText){
                            objArray[tempCurrent].toDoList.splice(i, 1);
                            console.log(projectArray.returnArray());
                        }
                    }
                    tempTDObject.remove();
                });

                tempTDObject.appendChild(tempTitle)
                tempTDObject.appendChild(tempDesc)
                tempTDObject.appendChild(tempDue)
                tempTDObject.appendChild(tempPrio)
                tempTDObject.appendChild(remove)
                document.getElementById("main").appendChild(tempTDObject);
            }
        } 
    }
    function updateAll(){
        for(let i = 0; i < objArray.length; i++){
            addProjectDOM(objArray[i].name);
            if(i === objArray.length - 1){
                updateToDo()
            }
        }
    }
    async function onLoad(){
        const docRef = doc(db, "todolist", "task");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().data !== undefined) {
        objArray = docSnap.data().data;
        } else {
            objArray = [];
        }
        updateAll();
    }
    async function updateStorage(){
        await setDoc(doc(db, "todolist", "task"), {
            data: objArray
            });
    }
    return {addProject, delProject, returnArray, addToDo, returnCurrent, onLoad}    
})();

const content = document.createElement("div");
content.setAttribute('id','content');

const main = document.createElement("div");
main.setAttribute('id','main');

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
        if(projectArray.returnCurrent() !== null){
            const temp = projectArray.returnArray();
            const tempCurrent = projectArray.returnCurrent();
            for(let i = 0; i < temp[tempCurrent].toDoList.length; i++){
                if(temp[tempCurrent].toDoList[i].title === toDoName.value){
                    return false;
                }
            }
            let newToDo = {
                title: toDoName.value,
                description: toDoDes.value,
                dueDate: toDoDate.value,
                priority: toDoPriority.value
            }
            projectArray.addToDo(newToDo);
            formDivContainer.remove();
            console.log(projectArray.returnArray());
            return false;
        } else {
            alert("Please create a topic first.")
            return false;
        }
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

projectArray.onLoad();