// класс який відповідає за глобальні змінні
// такі як id або масиви даних для відправки
// а також методи такі як видалити елемент і тд
class GlobalHandler {
    // оголошоємо конструктор який приймає id схованих елементів форми для відправки
    // значень на сервер та клас селекторів які в собі зберігають змінні
    constructor(inputVariablesId, inputElementsId, inputActionsId, inputSerialBeginId, variablesSelectorClass){
        // отримуємо сховані input для відправки даних на сервер
        this.inputVariables = document.getElementById(inputVariablesId);
        this.inputElements = document.getElementById(inputElementsId);
        this.inputActions = document.getElementById(inputActionsId);
        this.inputSerialBegin = document.getElementById(inputSerialBeginId);
        // знаходимо всі селектори в яких має відображатись список створених змінних
        this.selectorsList = document.querySelectorAll("."+variablesSelectorClass);
        // змінна для збереження id
        this.elementId = 0;
        // хеш для збереження змінних
        this.variablesData = new Map();
        // хеш для збереження елементів
        this.elementsData = new Map();
        // хеш для збереження команд
        this.actionsData = new Map();
        // хеш для збереження імен змінних
        this.namesData = new Map();
        // змінна для збереження значення Serial.begin яке буде відправлене на сервер
        this.serialBegin = 0;
    }
    // оголошуємо функції для роботи з даними

    // функція для додавання змінної в хеш для змінних
    // повертає id створеної змінної
    addVariableInList(variableType, variableName, variableValue){
        let id = this.elementId+"var";
        this.variablesData.set(id,variableType+"_"+variableName+"_"+variableValue+";");
        this.elementId++;
        return id;
    }
    // функція для видалення змінної з хешу змінних
    deleteVariableFromList(variableId){
        this.variablesData.delete(variableId);
    }
    // функція для додавання елементу в хеш елементів
    // повертає id створеного елементу
    addElementInList(elementPin, elementType, elementName){
        let id = this.elementId+"elem";
        this.elementsData.set(id, elementPin+"_"+elementType+"_"+elementName+";");
        this.elementId++;
        return id;
    }
    // функція для видалення елементу з хешу елементів
    deleteElementFromList(elementId){
        this.elementsData.delete(elementId);
    }
    // функція для додавання команди в хеш команд
    // повертає id створеної команди
    addActionInList(action){
        let id = this.elementId+"act";
        this.actionsData.set(id, action);
        this.elementId++;
        return id;
    }
    // функція для видалення команди з хешу команд
    deleteActionFromList(actionId){
        this.actionsData.delete(actionId);
    }
    // функція для перевірки чи існує задане ім'я
    // якщо існує поверне true якщо ні false
    checkNameInList(name){
        if(this.namesData.has(name)){
            return true;
        }else{
            return false;
        }
    }
    // функція для добавлення імені в хеш імен
    // якщо таке ім'я існує функція повертає false 
    // і нічого не додає в хеш імен
    addNameInList(name){
        if(this.checkNameInList(name)){
            return false;
        }else{
            this.namesData.set(name, name);
            return true;
        }
    }
    // функція яка замінює ім'я в хеші імен
    // якщо дане ім'я існувало тоді воно заміняється
    // і функція повертає false
    // якщо не існувало тоді воно створюється і повертає true
    replaceNameInList(name){
        if(this.checkNameInList(name)){
            this.deleteNameFromList(name);
            this.addNameInList(name);
            return false;
        }else{
            this.addNameInList(name);
            return true;
        }
    }
    // функція для видалення імені з хешу імен
    deleteNameFromList(name){
        this.namesData.delete(name);
    }
    // функція для добавлення значення в селектор
    addValueInSelector(value, id){
        // формуємо унікальний id для кожного елементу кожного селектору
        let selectNumber = 0;
        id += "selector" + selectNumber;
        this.selectorsList.forEach(function(selector) {
            let option = selector.options[selector.options.length] = new Option(value, value);
            option.id = id;
            selectNumber++;
        });
    }
    // функція для видалення значення з селектору
    deleteValueFromSelector(id){
        let selectNumber = 0;
        id += "selector" + selectNumber;
        this.selectorsList.forEach(function(selector) {
            document.getElementById(id).remove();
            selectNumber++;
        });
    }
    // функція для створення Serial.begin
    // ПЕРЕРОБИТИ!!!
    createSerialBegin(){
        this.serialBegin = document.getElementById("serialBeginSelect").value;
    }
    // функція для створення тексту змінних який буде відправлено на сервер
    // повертає готовий рядок з змінних які знаходяться в хеші
    createVariablesText(){
        let variablesText = "";
        this.variablesData.forEach(function(element){
            variablesText += element;
        });
        return variablesText;
    }
    // функція для створення тексту елементів який буде відправлено на сервер
    // повертає готовий рядок з елементів які знаходяться в хеші
    createElementsText(){
        let elementsText = "";
        this.elementsData.forEach(function(element){
            elementsText += element;
        });
        return elementsText;
    }
    // функція для створення тексту функцій який буде відправлено на сервер
    // повертає готовий рядок з функцій які знаходяться в хеші
    createActionsText(){
        let actionsText = "";
        this.actionsData.forEach(function(element){
            actionsText += element;
        });
        return actionsText;
    }
    // функція для отримання Serial.begin
    getSerialBegin(){
        this.createSerialBegin();
        return this.serialBegin;
    }
    // функція для відправки даних
    sendData(){
        this.inputVariables.value = this.createVariablesText();
        this.inputElements.value = this.createElementsText();
        this.inputActions.value = this.createActionsText();
        this.inputSerialBegin.value = this.getSerialBegin();
    }
}
// класс для обробки змінних
class VariablesHandler {
    constructor(inputTypeVariableId, inputNameVariableId, inputValueVariableId, visualContainerForVariablesId, GlobalHandler){
        this.inputTypeVariable = document.getElementById(inputTypeVariableId);
        this.inputNameVariable = document.getElementById(inputNameVariableId);
        this.inputValueVariable = document.getElementById(inputValueVariableId);
        this.containerForVariables = document.getElementById(visualContainerForVariablesId);
        this.globalHandler = GlobalHandler;
    }
    // функція для перевірки чи не пусті поля для вводу
    // якщо пусте хочаб одне з них повертає false
    // якщо всі поля заповнені повертає true
    checkFields(typeVariable, nameVariable){
        if(typeVariable == "nonType" || nameVariable == ""){
            return false;
        }else{
            return true;
        }
    }
    // функція для створення змінної
    addVariable(){
        // id створеної змінної
        let idVariable;
        // зчитуємо поля з форми створення змінної
        let typeVariable = this.inputTypeVariable.value;
        let nameVariable = this.inputNameVariable.value;
        let valueVariable = this.inputValueVariable.value;
        // перевіряємо чи всі потрібні поля заповнені
        if (this.checkFields(typeVariable, nameVariable)){
            // перевіряємо ім'я змінної якщо все ок тоді записуємо ім'я змінної в хеш імен
            if (this.globalHandler.addNameInList(nameVariable)){
                // тоді добавляємо змінну в глобальний хеш
                // та запам'ятовуємо її id
                idVariable = this.globalHandler.addVariableInList(typeVariable,nameVariable,valueVariable);
                // добавляємо змінну в селектор
                this.globalHandler.addValueInSelector(nameVariable, idVariable);
                // ТУТ КРИВО
                // створюємо текст який буде відповідати за видалення змінної
                let deleteFunction = "variablesHandler.deleteVariable(\""+idVariable+"\", \""+nameVariable+"\")";
                // створюємо графічний елемент для вставки
                // ТУТ КРИВО
                let UIelement = "<div class='row' id='"+idVariable+"'><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputVariableType' value='"+typeVariable+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputVariableName' value='"+nameVariable+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputVariableValue' value='"+valueVariable+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='"+deleteFunction+"'>DEL</button></div></div>";
                // вставляємо елемент в його контейнер
                this.containerForVariables.insertAdjacentHTML("beforeEnd", UIelement);
                // повертаємо id створеної змінної
                return idVariable;
            }else{
                alert("EQ names");
            }
             
        }else{
            alert("fields problem");
        }
    }
    // ТУТ КРИВО
    // TODO переробити функцію deleteNameForList так щоб вона приймала id
    deleteVariable(id, name){
        // видаляємо змінну з хешу змінних
        this.globalHandler.deleteVariableFromList(id);
        // видаляємо ім'я змінної з хешу імен
        this.globalHandler.deleteNameFromList(name);
        // видаляємо змінну з селекторів
        this.globalHandler.deleteValueFromSelector(id);
        // видаляємо візуальну змінну
        document.getElementById(id).remove();
    }
}
class ElementsHandler {
    constructor(inputPinElementId, inputTypeElementId, inputNameElementId, visualContainerForElementsId, GlobalHandler){
        this.inputPinElement = document.getElementById(inputPinElementId);
        this.inputTypeElement = document.getElementById(inputTypeElementId);
        this.inputNameElement = document.getElementById(inputNameElementId);
        this.containerForElements = document.getElementById(visualContainerForElementsId);
        this.globalHandler = GlobalHandler;
    }
    checkFields(pinElement, typeElement, nameElement){
        if(pinElement == "nonPin" || typeElement == "nonType" || nameElement == ""){
            return false;
        }else{
            return true;
        }
    }
    addElement(){
        // id створеного елемента
        let idElement;
        // зчитуємо поля з форми створення елементу
        let pinElement = this.inputPinElement.value;
        let typeElement = this.inputTypeElement.value;
        let nameElement = this.inputNameElement.value;
        // перевіряємо чи всі поля заповнені
        if(this.checkFields(pinElement, typeElement, nameElement)){
            if(this.globalHandler.addNameInList(nameElement)){
                // якщо так тоді додаємо елемент в хеш та запам'ятовуємо його id
                idElement = this.globalHandler.addElementInList(pinElement, typeElement, nameElement);
                // ТУТ КРИВО
                // створюємо текст який буде відповідати за видалення
                let deleteFunction = "elementsHandler.deleteElement(\""+idElement+"\", \""+nameElement+"\")";
                // ТУТ КРИВО
                // створюємо візуальний елемент
                let UIelement = "<div class='row' id='"+idElement+"'><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputPIN' value='"+pinElement+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputElementType' value='"+typeElement+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputElementName' value='"+nameElement+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='"+deleteFunction+"'>DEL</button></div></div>";
                // вставляємо його в контейнер
                this.containerForElements.insertAdjacentHTML("beforeend", UIelement);
                // повертаємо id створеної змінної
                return idElement;
            }else{
                alert("EQ names");
            }
        }else{
            // повертаємо else
            alert("fields problem");
        }
    }
    // ТУТ КРИВО
    deleteElement(id, name){
        // видаляємо елемент з хешу елементів
        this.globalHandler.deleteElementFromList(id);
        // видаляємо ім'я елементу з хешу імен
        this.globalHandler.deleteNameFromList(name);
        // видаляємо візуальний елемент
        document.getElementById(id).remove();
    }
}
// чекаю патча від Ростіка щоб доробити
class ActionsHandler {
    constructor(visualContainerForActionId, inputActionId, inputSerialValueId, inputSerialTextId, inputDelayTextId, addButtonId, GlobalHandler){
        this.containerForAction = document.getElementById(visualContainerForActionId);
        this.inputAction = document.getElementById(inputActionId);
        this.inputSerialValue = document.getElementById(inputSerialValueId);
        this.inputSerialText = document.getElementById(inputSerialTextId);
        this.inputDelayText = document.getElementById(inputDelayTextId);
        this.addButtonId = addButtonId;
        this.globalHandler = GlobalHandler;
    }
    // функція для виводу модальних вікон
    showModalAction() {
        switch(this.inputAction.value){
            case "none":
                alert("choose action");
                $('#'+this.addButtonId).attr('data-target','#');
                break;
    
            case "Serial.println":
                $('#'+this.addButtonId).attr('data-target','#serialPrintlnModal');
                break;
    
            case "delay":
                $('#'+this.addButtonId).attr('data-target','#delayModal');
                break;
        }
    }

    addSerialPrintln(){
        // якщо користувач пише текст дані зберігаються сюди
        let serialPrintln = this.inputSerialText.value;
        // якщо користувач виводить перемінну дані зберігаюсться сюди
        let serialData = this.inputSerialValue.value;
        // змінна для збереження id елементу
        let elementId;
        // текст видалення для html елементу
        let deleteFunction = "actionsHandler.deleteAction(\""+elementId+"\")";
        // перевірка полів
        // TODO треба перенести в окремий метод
        if ((serialData == "none") && (serialPrintln == "")) {
            alert("нічого не заповнено");
        } else if((serialData != "none") && (serialPrintln != "")){
            alert("заповнено два поля");
        }else if (serialData == "none") {
            // додавання функції
            // додаємо функцію в хеш функцій
            elementId = this.globalHandler.addActionInList("Serial.println(\""+serialPrintln+"\");");
            // створюємо візуальний елемент
            let actionElement = "<div class='row' id='"+elementId+"'><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputAction' value='"+this.inputAction.value+"'></div><div class='form-group col-md-7'><input disabled type='text' class='form-control' name='inputValue' value='"+serialPrintln+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='"+deleteFunction+"'>DEL</button></div></div>";
            // додаєму візуальний елемент на сторінку
            this.containerForAction.insertAdjacentHTML("beforeEnd", actionElement);
        }else{
            // додаємо функцію в хеш функцій
            elementId = this.globalHandler.addActionInList("Serial.println("+serialData+");");
            // створюємо візуальний елемент
            actionElement = "<div class='row' id='"+elementId+"'><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputAction' value='"+this.inputAction.value+"'></div><div class='form-group col-md-7'><input disabled type='text' class='form-control' name='inputValue' value='"+serialData+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='"+deleteFunction+"'>DEL</button></div></div>";
            // додаємо візуальний елемент на сторінку
            this.containerForAction.insertAdjacentHTML("beforeEnd", actionElement);
        }

    }
    addDelay(){
        // зчитуємо дані які ввів користувач
        let delay = this.inputDelayText.value;
        // записуємо функцію в хеш функцій
        let elementId = this.globalHandler.addActionInList("delay("+delay+");");
        // створюємо графічний елемент
        let actionElement = "<div class='row' id='"+elementId+"'><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputAction' value='"+this.inputAction.value+"'></div><div class='form-group col-md-7'><input disabled type='text' class='form-control' name='inputValue' value='"+delay+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='"+deleteFunction+"'>DEL</button></div></div>";
        // додаємо візуальний елемент на сторінку
        this.containerForAction.insertAdjacentHTML("beforeEnd", actionElement);
    }
    deleteAction(id){
        // видалємо подію з хешу подій
        this.globalHandler.deleteActionFromList(id);
        // видаляємо візуальний елемент
        document.getElementById(id).remove();
    }
}

let globalHandler = new GlobalHandler("senderVariables", "senderElements", "senderActions", "senderSerialBegin", "variablesSelect");
let variablesHandler = new VariablesHandler("inputTypeVariable", "inputVariableName", "inputVariableValue", "containerForVariables", globalHandler);
let elementsHandler = new ElementsHandler("inputPIN", "inputElementType", "inputElementName", "containerForElements", globalHandler);
let actionsHandler = new ActionsHandler("actionsContainer", "inputAction", "inputSerialValue", "serialPrintln", "delay", "addActionButton", globalHandler);


