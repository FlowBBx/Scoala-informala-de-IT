let state = {
    list: []
}

//Functia de sortare ascendent
function sortasc() {
    state.list.sort(sortList)
    use()
}
function sortList (a,b) {
    if (a.name<b.name){
        return -1
    } else if (a.name>b.name){
        return 1
    } else {
        return 0
    }
}
//Functia de sortare ascendent

//Functia de sortare descendent
function sortdesc () {
    state.list.sort(sortlist)
    use ()
}
function sortlist (a,b) {
    if(a.name>b.name) {
        return -1
    } else if (a.name<b.name) {
        return 1
    } else {
        return 0
    }  
}

//Functia de sortare descendent
//Functia de listare

function use () {
    let table = document.querySelector("#list tbody");
    let str= "";
        for (let elements of state.list) {
            if(elements.buyed === true) {
                str += `
                <tr class="strike">
                    <th>${elements.name}</th>
                    <th>${elements.action}</th>
                </tr>
                `
            } else {
                str += `
            <tr>
                <th>${elements.name}</th>
                <th>${elements.action}</th>
            </tr>
            `
            }
             
    }
    table.innerHTML = str; 
    document.querySelector("form").reset();
}   

//Functia de listare
// /Functia de adaugare
function container_Shop () {
        let us = document.querySelector(".hidden")
        us.classList.add("unhidden")
        let name = document.querySelector("#docs").value
        if (name === "") {
            alert("Please enter something to buy")
            return 
        } else {
            state.list.push({
                name:name,
                action: `<button onclick="mark(${state.list.length})">Mark as buyed</button>`,
                buyed: false
            })
        }
        
        use();
}
// /Functia de adaugare


function mark(event) {
    for(let elem of state.list) {
        if(state.list.indexOf(elem) === event) {
            elem.buyed = true;
        }
    }
    use();
}