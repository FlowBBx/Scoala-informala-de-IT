let state = {
    list: [
    ],
    xEdit:null,
}

let reqField = document.querySelectorAll('.req-field');
function validateFormData() {
    let isInvalid = false;
    for(let item of reqField) {
        if(item.value === '') {
            alert('Va tugam sa completati toate campurile ! ');
            isInvalid = true;
        }
    }

    return isInvalid;
}
function date() {
    let tab = document.querySelector("#list");
    let str = "";
    for (let i = 0; i< state.list.length; i++) {
        let elements = state.list[i];
        str +=`
    <div class="modify">
        <div> Nume:&nbsp${elements.Nume}</div>
        <div> Numar:&nbsp${elements.Numar}</div>
        <div>
            <button onclick="del(${i})" class="delete" > Delete </button>
            <button onclick="edit(${i})" class="theEdit" > Edit </button>
        </div>
    </div>
    `;
    } 
    tab.innerHTML = str;
}
function save (){
    let isInvalid = validateFormData(); 
    if (!isInvalid) {
        let nume = document.querySelector("[name='Nume']").value.trim();
        let numar = document.querySelector("[name='Numar']").value.trim();
        if (confirm(`Esti sigur ca doresti sa modifici contactul?`)) 
    
    if (state.xEdit===null) {
        state.list.push ({
            Nume: nume,
            Numar: numar 
        })
    }
    else {
        state.list[state.xEdit] = {
            Nume: nume,
            Numar: numar 
        }
    }
    date()
    }
}
function edit(x) {
    let editing = state.list[x];
    document.querySelector("[name='Nume']").value = editing.Nume;
    document.querySelector("[name='Numar']").value = editing.Numar;
    state.xEdit = x;
}

function del (x) {
    if (confirm(`Esti sigur ca vrei sa stergi contactul: ${state.list[x].Nume} ?` ))
    state.list.splice(x, 1);
    date();
}

function add (event) {
    event.preventDefault ();
    let isInvalid = validateFormData(); 
    if(!isInvalid) {
        let nume = document.querySelector("[name='Nume']").value.trim();
        let numar = document.querySelector("[name='Numar']").value.trim();
        state.list.push({
            Nume: nume ,
            Numar: numar,
        });
        date()
    }
}

// functii pentru erori 
function preventAlldigits (input, event) {
    if(event.key >= "0" && event.key <="9") {}
    else {
        event.preventDefault()
        alert("Te rugam sa introduci cifre !")
    } 
}

function validation (input) {
    let valid = true;
    for (let val of input.value) {
        if (val < "0" || val > "9") {
            valid = false; 
        }
    valid = valid && input.value.length === 10
    }
    error (input, valid)
}

function error (input,valid) {
    let span = document.querySelector("#von")
    if (valid) {
        input.classList.remove("border")
        span.innerHTML = "";
    } else {
        input.classList.add("border")
        span.innerHTML = "Introduceti 10 numere";
    }
}
