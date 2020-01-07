// змінна для генерування ID елементів на сторінці
let elementId = 0;
// хеш для збереження перемінних для відправки на сервер
let data = new Map();
// хеш для збереження елементів для відправки на сервер
let elementsData = new Map();
// масив для збереження імен змінних
let names = new Map();
// функція для відправлення даних на обрбку
function sendData(){
    // очищаємо візуальне поле від попередніх значень
    document.getElementById("code").innerHTML = "";
    //
    let variablesText = "";
    let elementsText = "";
    let serialBegin = "";
    for (let key of data.keys()) {
        document.getElementById("code").insertAdjacentHTML("beforeEnd", key+" -> "+data.get(key) + "<br>");
        variablesText += data.get(key);
        
    }
    for (let key of elementsData.keys()) {
        document.getElementById("code").insertAdjacentHTML("beforeEnd", key+" -> "+elementsData.get(key) + "<br>");
        elementsText += elementsData.get(key);
    }
    serialBegin = "Serial.begin(" + document.getElementById("serialBeginSelect").value + ");";
    // поставити всі елементи в перемінну
    console.log(serialBegin);
    document.getElementById("senderVariables").value = variablesText;
    document.getElementById("senderElements").value = elementsText;
    document.getElementById("senderSerialBegin").value = serialBegin;
}
// видалення змінної
function deleteRow(i){
    // видаляємо змінну як візуальний елемент на сторінці
    document.getElementById(i).remove();
    // видаляємо дані з масиву які відповідають візуальному елементу
    data.delete(i);
    // 
    deleteOption(i);
    deleteOption(i+"a");
}

// змінна з селектором
let select = document.getElementById("inputDigitalReadValue");
let select2 = document.getElementById("inputSerialValue");
select.options[select.options.length] = new Option("none", "none");
select2.options[select2.options.length] = new Option("none", "none");
// функція для добавлення елементу
function addOption (select, text, value, id){
    id += "opt";
    let option = select.options[select.options.length] = new Option(text, value);
    option.id = id;
}
// функція для видалення елементу зі списку по id
function deleteOption (idOption) {
    idOption += "opt";
    document.getElementById(idOption).remove();
}
// функція для очищення списку
function clearSelect(select) {
    select.options.length = 0;
}

// клас для створення і обробки змінних
class HandlerValue {
    constructor(typeVariableId, nameVariableId, valueVariableId, containerId){
        // змінні для збереження id елементів на сторінці
        this.typeVariableId = typeVariableId;
        this.nameVariableId = nameVariableId;
        this.valueVariableId = valueVariableId;
        this.containerId = containerId;
        // отримуємо посилання на елемент в якому будуть розміщені змінні
        this.variablesContainer = document.getElementById(containerId);
        // змінні для збереження значень переданих головною формою
        this.typeVariable = "";
        this.nameVariable = "";
        this.valueVariable = "";
        // створення масиву для збереження даних які будуть відправлені на сервер
        
        // змінна для збереження нового елементу змінної який буде створюватись
        this.element;
    }
    // функція для добавлення змінної в контейнер
    addVariable() {
        // беремо всі значення з головної форми
        this.typeVariable = document.getElementById(this.typeVariableId).value;
        this.nameVariable = document.getElementById(this.nameVariableId).value;
        this.valueVariable = document.getElementById(this.valueVariableId).value;
        // перевіряємо чи не пусті поля для вводу
        if(this.typeVariable == "nonType" || this.nameVariable == "") {
            alert("pls enter all fields");
            // перевіряємо чи імена не повторюються
        }else if(names.has(this.nameVariable)) {
            alert("equlas names");
            // перевіряємо чи перший елемент не цифра
        }else{
            names.set(this.nameVariable,"");
            // створюємо елемент для вставки
            this.element = "<div class='row' id='"+elementId+"'><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputVariableType' value='"+this.typeVariable+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputVariableName' value='"+this.nameVariable+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputVariableValue' value='"+this.valueVariable+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='deleteRow("+elementId+")'>DEL</button></div></div>";
            //
            addOption(select, this.nameVariable, this.nameVariable, elementId);
            addOption(select2, this.nameVariable, this.nameVariable, elementId+"a");
            // записуємо значення в асоціативний масив
            if(this.valueVariable == "" || this.valueVariable === null) {
                data.set(elementId,this.typeVariable+"_"+this.nameVariable+"_"+"\"\""+";\n");
            }else{
                data.set(elementId,this.typeVariable+"_"+this.nameVariable+"_"+this.valueVariable+";\n");
            }
            // вставляємо елемент в кінець контейнеру
            this.variablesContainer.insertAdjacentHTML("beforeEnd", this.element);
            // збільшуємо загальний id 
            elementId++;
        }
    }
}

class HandlerElement {
    constructor(elementPinId, typeElementId, elemetnNameId, containerId){
        // змінні для збереження id елементів на сторінці
        this.elementPinId = elementPinId;
        this.typeElementId = typeElementId;
        this.elemetnNameId = elemetnNameId;
        this.containerId = containerId;
        // отримуємо посилання на елемент в якому будуть розміщені змінні
        this.elementsContainer = document.getElementById(containerId);
        // змінні для збереження значень переданих головною формою
        this.elementPin = "";
        this.typeElement = "";
        this.elementName = "";
        // змінна для збереження нового елементу змінної який буде створюватись
        this.UIelement;
    }
    // функція для добавлення змінної в контейнер
    addElement() {
        // беремо всі значення з головної форми
        this.elementPin = document.getElementById(this.elementPinId).value;
        this.typeElement = document.getElementById(this.typeElementId).value;
        this.elementName = document.getElementById(this.elemetnNameId).value;
        // перевіряємо чи не пусті поля для вводу
        if(this.elementPin == "nonPin" || this.typeElement == "nonType" || this.elementName == "") {
            alert("pls enter all fields");
            // перевіряємо чи імена не повторюються
        }else if(names.has(this.elementName)) {
            alert("equlas names");
        }else{
            names.set(this.elementName,"");
            // створюємо елемент для вставки
            this.UIelement = "<div class='row' id='"+elementId+"'><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputPIN' value='"+this.elementPin+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputElementType' value='"+this.typeElement+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputElementName' value='"+this.elementName+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='deleteRow("+elementId+")'>DEL</button></div></div>";
            // записуємо елемент в селектор вибору змінних
            addOption(select, this.elementName, this.elementName, elementId);
            addOption(select2, this.elementName, this.elementName, elementId+"a");
            // записуємо значення в асоціативний масив
            elementsData.set(elementId,this.elementPin+"_"+this.typeElement+"_"+this.elementName+";\n");
            // вставляємо елемент в кінець контейнеру
            this.elementsContainer.insertAdjacentHTML("beforeEnd", this.UIelement);
            // збільшуємо загальний id 
            elementId++;
        }
    }
}
var handlerValue = new HandlerValue("inputTypeVariable", "inputVariableName", "inputVariableValue", "containerForVariables");
var handlerElement = new HandlerElement("inputPIN", "inputElementType", "inputElementName", "containerForElements");

//
function showModalAction() {
    var action = document.getElementById("inputAction").value;
    switch(action){
        case "none":
            alert("choose action");
            break;

        case "Serial.println":
            $('button').attr('data-target','#serialPrintlnModal');
            break;

        case "delay":
            $('button').attr('data-target','#delayModal');
            break;

        case "digitalRead":
            $('button').attr('data-target','#digitalReadModal');
            break;

        case "digitalWrite":
            $('button').attr('data-target','#digitalWriteModal');
            break;

        case "analogRead":
            $('button').attr('data-target','#analogReadModal');
            break;

        case "analogWrite":
            $('button').attr('data-target','#analogWriteModal');
            break;
    }
}

function addSerialPrintln(){
    let serialPrintln = document.getElementById("serialPrintln").value;
    let action = document.getElementById("inputAction").value;
    let data = document.getElementById("inputSerialValue").value;
    if ((data == "none") && (serialPrintln == "")) {
        console.log("нічого не заповнено");
    } else if((data != "none") && (serialPrintln != "")){
        console.log("заповнено два поля");
    } else if(data != "none"){
        console.log(action+"("+data+");");
    }else {
        console.log(action+"("+serialPrintln+");");
    }
}

function addDelay(){
    let action = document.getElementById("inputAction").value;
    let delay = document.getElementById("delay").value;
    console.log(action+"("+delay+");");
}

function addDigitalRead(){
    let action = document.getElementById("inputAction").value;
    let digitalRead = document.getElementById("inputDigitalReadValue").value;
    console.log(action+"("+digitalRead+");");
}