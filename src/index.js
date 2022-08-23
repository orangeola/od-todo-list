import './style.css';

console.log("test");

const projectArray = (() => {
    const objArray = [];
    function returnArray(){
        return objArray;
    }
    function addTopic(project){
        objArray.push(project);
    }
    function deleteTopic(index){
        objArray.splice(index, 1);
    }
    function updateDOM(){
        const elements = document.getElementsByClassName('topic');
        for(let i = 0; i < objArray.length; i++){
            let j = i;
            while(j < elements.length){
                if(objArray[i].name !== elements[j].innerText){
                    elements[j].remove();
                }
                else if(objArray[i].name == elements[j].innerText){
                    j = elements.length;
                }
                else {
                    j++;
                }
            }
        }
        while(elements.length > objArray.length){
            elements[objArray.length].remove();
        }
    }
    return {returnArray, addTopic, deleteTopic, updateDOM}    
})();

const topicHandler = (() => {
    function addProjectDOM(name){
        const temp = document.createElement("div");
        temp.setAttribute('class','topic');
        temp.innerText = name;
        document.getElementById("sideBar").appendChild(temp);
    };
    function addProjectJS(name){
        const newProj = {
            name: name,
            toDoList: []
        }
        projectArray.addTopic(newProj);
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
        const temp = projectArray.returnArray();
        for(let i = 0; i < temp.length; i++){
            if(temp[i].name === name){
                projectArray.deleteTopic(i);
            }
        }
    }
    function delProject(name){
        delProjectDOM(name);
        delProjectJS(name);
    }
    return {addProject, delProject, addProjectDOM}    
})();

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

topicHandler.addProjectDOM("donotbelong");
topicHandler.addProject("pott");
topicHandler.addProjectDOM("donotbelong");
topicHandler.addProject("lloogie");
topicHandler.addProjectDOM("donotbelong");
topicHandler.addProjectDOM("donotbelong");
topicHandler.addProjectDOM("donotbelong");

projectArray.updateDOM();

//delProject("pott");
topicHandler.delProject("lloogie");

console.log(projectArray.returnArray())