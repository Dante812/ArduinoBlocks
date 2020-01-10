class GlobalHandler {
  /**
   * конструктор класу для роботи з глобальними змінними
   * та відправки даних на сервер
   * 
   * @param {string} inputVariablesId - id input елемента для передачі змінних
   * @param {string} inputElementsId - id input елемента для передачі елементів
   * @param {string} inputActionsId - id input елемента для передачі функцій
   * @param {string} inputSerialBeginId - id input елемента для передачі швидкості спілкування
   * @param {string} variablesSelectorClass - клас випадаючих списків для змінних
   * @param {string} elementsSelectorClass - клас випадаючих списків для елементів
   */
  constructor(inputVariablesId, inputElementsId, inputActionsId, inputSerialBeginId, variablesSelectorClass, elementsSelectorClass){
    // отримуємо сховані input для відправки даних на сервер
    this.inputVariables = document.getElementById(inputVariablesId);
    this.inputElements = document.getElementById(inputElementsId);
    this.inputActions = document.getElementById(inputActionsId);
    this.inputSerialBegin = document.getElementById(inputSerialBeginId);
    // знаходимо всі селектори в яких має відображатись список створених елементів
    this.selectorsListElements = document.querySelectorAll("."+elementsSelectorClass);
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
  /**
   * додаємо змінну в загальний хеш змінних
   * 
   * @param {string} variableType - тип змінної
   * @param {string} variableName - ім'я змінної
   * @param {string} variableValue - значення змінної
   * @returns {string}
   */
  addVariableInList(variableType, variableName, variableValue){
    let id = this.elementId+"var";
    this.variablesData.set(id,variableType+"_"+variableName+"_"+variableValue+";");
    this.elementId++;
    return id;
  }
  /**
   * видаляємо змінну з хешу змінних
   * 
   * @param {string} variableId - id змінної
   */
  deleteVariableFromList(variableId){
    this.variablesData.delete(variableId);
  }
  /**
   * додаємо елемент в хеш елементів
   * 
   * @param {string} elementPin - pin елементу
   * @param {string} elementType - тип елементу
   * @param {string} elementName - ім'я елементу
   * @returns {string} 
   */
  addElementInList(elementPin, elementType, elementName){
    let id = this.elementId+"elem";
    this.elementsData.set(id, elementPin+"_"+elementType+"_"+elementName+";");
    this.elementId++;
    return id;
  }
  /**
   * видаляємо елемент з хешу елементів
   * 
   * @param {string} elementId -id елементу
   */
  deleteElementFromList(elementId){
    this.elementsData.delete(elementId);
  }
  /**
   * додаємо функцію в хеш функцій
   * 
   * @param {string} action - функція
   * @returns {string}
   */
  addActionInList(action){
    let id = this.elementId+"act";
    this.actionsData.set(id, action);
    this.elementId++;
    return id;
  }
  /**
   * видаляємо функції з хешу функцій
   * 
   * @param {string} actionId - id функції
   */
  deleteActionFromList(actionId){
    this.actionsData.delete(actionId);
  }
  /**
   * перевіряємо чи існує дане ім'я
   * 
   * @param {string} name - ім'я компоненту
   * @returns {boolean} 
   */
  checkNameInList(name){
    if(this.namesData.has(name)){
      return true;
    }else{
      return false;
    }
  }
  /**
   * додаємо ім'я в хеш імен
   * 
   * @param {string} name - ім'я компоненту
   * @returns {boolean} 
   */
  addNameInList(name){
    if(this.checkNameInList(name)){
      return false;
    }else{
      this.namesData.set(name, name);
      return true;
    }
  }
  /**
   * видаляємо ім'я з хешу імен
   * 
   * @param {string} name - ім'я компоненту
   */
  deleteNameFromList(name){
    this.namesData.delete(name);
  }
  /**
   * додаємо змінну в випадаючий список
   * 
   * @param {string} value - ім'я змінної
   * @param {string} id - id змінної
   */
  addValueInSelector(value, id){
    let selectNumber = 0;
    id += "selector" + selectNumber;
    this.selectorsList.forEach(function(selector) {
    let option = selector.options[selector.options.length] = new Option(value, value);
      option.id = id;
      selectNumber++;
    });
  }
  /**
   * додаємо елемент в випадаючий список
   * 
   * @param {string} value - ім'я елементу
   * @param {string} id - id елементу
   */
  addElementInSelector(value, id){
    let selectNumber = 0;
    id += "elementSelector" + selectNumber;
    this.selectorsListElements.forEach(function(selector){
      let option = selector.options[selector.options.length] = new Option(value, value);
      option.id = id;
      selectNumber++;
    });
  }
  /**
   * видаляємо змінну з випадаючого списку
   * 
   * @param {string} id - id змінної
   */
  deleteValueFromSelector(id){
    let selectNumber = 0;
    id += "selector" + selectNumber;
    this.selectorsList.forEach(function(selector) {
      document.getElementById(id).remove();
      selectNumber++;
    });
  }
  /**
   * видаляємо елемент з випадаючого списку
   * 
   * @param {string} id - id елементу
   */
  deleteElementFromSelector(id){
    let selectNumber = 0;
    id += "elementSelector" + selectNumber;
    this.selectorsListElements.forEach(function(selector){
      document.getElementById(id).remove();
      selectNumber++;
    });
  }
  /**
   * зчитуємо значення Serial.begin
   */
  createSerialBegin(){
    this.serialBegin = document.getElementById("serialBeginSelect").value;
  }
  /**
   * генеруємо список змінних для відправлення на сервер
   * 
   * @returns {string}
   */
  createVariablesText(){
    let variablesText = "";
    this.variablesData.forEach(function(element){
      variablesText += element;
    });
    return variablesText;
  }
  /**
   * генеруємо список елементів для відправлення на сервер
   * 
   * @returns {string}
   */
  createElementsText(){
    let elementsText = "";
    this.elementsData.forEach(function(element){
      elementsText += element;
    });
    return elementsText;
  }
  /**
   * генеруємо список функцій для відправлення на сервер
   * 
   * @returns {string}
   */
  createActionsText(){
    let actionsText = "";
    this.actionsData.forEach(function(element){
      actionsText += element;
    });
    return actionsText;
  }
  /**
   * беремо Serial.begin для відправлення на сервер
   * 
   * @returns {string}
   */
  getSerialBegin(){
    this.createSerialBegin();
    return this.serialBegin;
  }
  /**
   * відправляємо дані на сервер
   */
  sendData(){
    this.inputVariables.value = this.createVariablesText();
    this.inputElements.value = this.createElementsText();
    this.inputActions.value = this.createActionsText();
    this.inputSerialBegin.value = this.getSerialBegin();
  }
}
// класс для обробки змінних
class VariablesHandler {
  /**
   * конструктор класу для проведення дій над змінними
   * 
   * @param {string} inputTypeVariableId - id input елемента форми для створення змінних (тип змінної)
   * @param {string} inputNameVariableId - id input елемента форми для створення змінних (ім'я змінної)
   * @param {string} inputValueVariableId - id input елемента форми для створення змінних (значення змінної)
   * @param {string} visualContainerForVariablesId - id контейнера для відображення змінних
   * @param {object} GlobalHandler - об`єкт GlobalHandler
   */
  constructor(inputTypeVariableId, inputNameVariableId, inputValueVariableId, visualContainerForVariablesId, GlobalHandler){
    this.inputTypeVariable = document.getElementById(inputTypeVariableId);
    this.inputNameVariable = document.getElementById(inputNameVariableId);
    this.inputValueVariable = document.getElementById(inputValueVariableId);
    this.containerForVariables = document.getElementById(visualContainerForVariablesId);
    this.globalHandler = GlobalHandler;
  }
  /**
   * перевіряємо поля вводу
   * 
   * @param {string} typeVariable - тип змінної
   * @param {string} nameVariable - ім'я змінної
   * @returns {boolean}
   */
  checkFields(typeVariable, nameVariable){
    if(typeVariable == "nonType" || nameVariable == ""){
      return false;
    }else{
      return true;
    }
  }
  /**
   * створюємо змінну
   */
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
  /**
   * видаляємо змінну
   * 
   * @param {string} id - id змінної
   * @param {string} name - ім'я змінної
   */
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
  /**
   * конструктор класу для проведення дій над елементами
   * 
   * @param {string} inputPinElementId - id input елемента форми для створення елементів (пін елементу)
   * @param {string} inputTypeElementId - id input елемента форми для створення елементів (тип елементу)
   * @param {string} inputNameElementId - id input елемента форми для створення елементів (ім'я елементу)
   * @param {string} visualContainerForElementsId - id контейнера для відображення елементів
   * @param {object} GlobalHandler - об'єкт GlobalHandler
   */
  constructor(inputPinElementId, inputTypeElementId, inputNameElementId, visualContainerForElementsId, GlobalHandler){
    this.inputPinElement = document.getElementById(inputPinElementId);
    this.inputTypeElement = document.getElementById(inputTypeElementId);
    this.inputNameElement = document.getElementById(inputNameElementId);
    this.containerForElements = document.getElementById(visualContainerForElementsId);
    this.globalHandler = GlobalHandler;
  }
  /**
   * перевіряємо поля вводу
   * 
   * @param {string} pinElement - пін елементу
   * @param {string} typeElement - тип елементу
   * @param {string} nameElement - ім'я елементу
   * @returns {boolean} 
   */
  checkFields(pinElement, typeElement, nameElement){
    if(pinElement == "nonPin" || typeElement == "nonType" || nameElement == ""){
      return false;
    }else{
      return true;
    }
  }
  /**
   * створюємо елемент
   */
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
        // добавляємо елемент в селектор
        this.globalHandler.addElementInSelector(nameElement, idElement);
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
  /**
   * видаляємо елемент
   * 
   * @param {string} id - id елементу 
   * @param {string} name - ім'я елементу
   */
  deleteElement(id, name){
    // видаляємо елемент з хешу елементів
    this.globalHandler.deleteElementFromList(id);
    // видаляємо ім'я елементу з хешу імен
    this.globalHandler.deleteNameFromList(name);
    // видаляємо візуальний елемент
    document.getElementById(id).remove();
  }
}
class ActionsHandler {
  /**
   * конструктор класу для проведення дій над функціями 
   * 
   * @param {string} visualContainerForActionId - id контейнеру для відображення функцій
   * @param {string} inputActionId - id випадаючого списку можливий функцій
   * @param {string} inputSerialValueId - id випадаючого списку в формі Serial.println
   * @param {string} inputSerialTextId - id текстового поля в формі Serial.println
   * @param {string} inputDelayTextId - id текстового поля в формі delay
   * @param {string} inputDigitalWriteValueId - id випадаючого списку з елементами в формі digitalWrite
   * @param {string} digitalStatusId - id випадаючого списку з станами в формі digitalWrite
   * @param {string} addButtonId - id кнопик додати функцію
   * @param {object} GlobalHandler - об'єкт GlobalHandler
   */
  constructor(visualContainerForActionId, inputActionId, inputSerialValueId, inputSerialTextId, inputDelayTextId, inputDigitalWriteValueId, digitalStatusId, addButtonId, GlobalHandler){
    this.containerForAction = document.getElementById(visualContainerForActionId);
    this.inputAction = document.getElementById(inputActionId);
    this.inputSerialValue = document.getElementById(inputSerialValueId);
    this.inputSerialText = document.getElementById(inputSerialTextId);
    this.inputDelayText = document.getElementById(inputDelayTextId);
    this.inputDigitalWriteValue = document.getElementById(inputDigitalWriteValueId);
    this.digitalStatus = document.getElementById(digitalStatusId);
    this.addButtonId = addButtonId;
    this.globalHandler = GlobalHandler;
  }
  // функція для виводу модальних вікон
  /**
   * показуємо модальне вікно
   */
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

      case "digitalWrite":
        $('#'+this.addButtonId).attr('data-target','#digitalWriteModal');
        break;
    }
  }
  /**
   * створюємо функцію Serial.println
   */
  addSerialPrintln(){
    // якщо користувач пише текст дані зберігаються сюди
    let serialPrintln = this.inputSerialText.value;
    // якщо користувач виводить перемінну дані зберігаюсться сюди
    let serialData = this.inputSerialValue.value;
    // змінна для збереження id елементу
    let elementId;
    // текст видалення для html елементу
    let deleteFunction;
    let actionElement;
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
      // текст видалення для html елементу
      deleteFunction = "actionsHandler.deleteAction(\""+elementId+"\")";
      // створюємо візуальний елемент
      let actionElement = "<div class='row' id='"+elementId+"'><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputAction' value='"+this.inputAction.value+"'></div><div class='form-group col-md-7'><input disabled type='text' class='form-control' name='inputValue' value='"+serialPrintln+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='"+deleteFunction+"'>DEL</button></div></div>";
      // додаєму візуальний елемент на сторінку
      this.containerForAction.insertAdjacentHTML("beforeEnd", actionElement);
    }else{
      // додаємо функцію в хеш функцій
      elementId = this.globalHandler.addActionInList("Serial.println("+serialData+");");
      // створюємо візуальний елемент
      // текст видалення для html елементу
      deleteFunction = "actionsHandler.deleteAction(\""+elementId+"\")";
      actionElement = "<div class='row' id='"+elementId+"'><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputAction' value='"+this.inputAction.value+"'></div><div class='form-group col-md-7'><input disabled type='text' class='form-control' name='inputValue' value='"+serialData+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='"+deleteFunction+"'>DEL</button></div></div>";
      // додаємо візуальний елемент на сторінку
      this.containerForAction.insertAdjacentHTML("beforeEnd", actionElement);
    }
  }
  /**
   * створюємо функцію delay
   */
  addDelay(){
    // зчитуємо дані які ввів користувач
    let delay = this.inputDelayText.value;
    // записуємо функцію в хеш функцій
    let elementId = this.globalHandler.addActionInList("delay("+delay+");");
    // створюємо графічний елемент
    // текст видалення для html елементу
    let deleteFunction = "actionsHandler.deleteAction(\""+elementId+"\")";
    let actionElement = "<div class='row' id='"+elementId+"'><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputAction' value='"+this.inputAction.value+"'></div><div class='form-group col-md-7'><input disabled type='text' class='form-control' name='inputValue' value='"+delay+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='"+deleteFunction+"'>DEL</button></div></div>";
    // додаємо візуальний елемент на сторінку
    this.containerForAction.insertAdjacentHTML("beforeEnd", actionElement);
  }
  /**
   * створюємо функцію digitalWrite
   */
  addDigitalWrite(){
    let digitalWrite = this.inputDigitalWriteValue.value;
    let status = this.digitalStatus.value;
    if (digitalWrite == ""){
      alert("Введіть ім'я піна");
    } else {
      let elementId = this.globalHandler.addActionInList("digitalWrite("+digitalWrite+", "+status+");");
      let deleteFunction = "actionsHandler.deleteAction(\""+elementId+"\")";
      let actionElement ="<div class='row' id='"+elementId+"'><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputAction' value='"+this.inputAction.value+"'></div><div class='form-group col-md-4'><input disabled type='text' class='form-control' name='inputValue' value='"+digitalWrite+"'></div><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputStatus' value='"+status+"'></div><div class='form-group col-md-1'><button class='btn btn-danger' onclick='"+deleteFunction+"'>DEL</button></div></div>";
      this.containerForAction.insertAdjacentHTML("beforeEnd", actionElement);
    }
  }
  /**
   * видаляємо функцію
   * 
   * @param {String} id - id функції 
   */
  deleteAction(id){
    // видалємо подію з хешу подій
    this.globalHandler.deleteActionFromList(id);
    // видаляємо візуальний елемент
    document.getElementById(id).remove();
  }
}

let globalHandler = new GlobalHandler("senderVariables", "senderElements", "senderActions", "senderSerialBegin", "variablesSelect", "elementsSelect");
let variablesHandler = new VariablesHandler("inputTypeVariable", "inputVariableName", "inputVariableValue", "containerForVariables", globalHandler);
let elementsHandler = new ElementsHandler("inputPIN", "inputElementType", "inputElementName", "containerForElements", globalHandler);
let actionsHandler = new ActionsHandler("actionsContainer", "inputAction", "inputSerialValue", "serialPrintln", "delay", "inputDigitalWriteValue", "digitalStatus", "addActionButton", globalHandler);


