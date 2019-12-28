
// змінні для збереження id інпутів
var typeVariableId = "inputTypeVariable";
var nameVariableId = "inputVariableName";
var valueVariableId = "inputVariableValue";
// змінні для збереження id контейнерів для зберігання результатів
var containerId = "containerForVariables";
// змінні для збереження даних з форми
var typeVariable = "none";
var nameVariable = "none";
var valueVariable = "none";
// змінна для збереження елементу контейнеру в якому результати
var variablesCntainer = document.getElementById(containerId);
// змінна для генерування id елементів 
var variableId = 0;
// створення масиву для збереження даних які будуть відправлені на сервер
var data = new Map();

// функція для додавання змінної
function addVariable() {
    // беремо всі значення з головної форми
    typeVariable = document.getElementById(typeVariableId).value;
    nameVariable = document.getElementById(nameVariableId).value;
    valueVariable = document.getElementById(valueVariableId).value;
    // перевіряємо чи не пусті поля для вводу
    if(typeVariable == "nonType" || nameVariable == "" || valueVariable == "") {
        alert("pls enter all fields");
    }else{
        // генеруємо id
        var id = variableId;
        // збільшуємо загальний id 
        variableId++;
        // створюємо елемент для вставки
        var element = "<div class='row' id='"+id+"'><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputVariableType' value='"+typeVariable+"'></div><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputVariableName' value='"+nameVariable+"'></div><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputVariableValue' value='"+valueVariable+"'></div><div class='form-group col-md-3'><button class='btn btn-danger' onclick='deleteRow("+id+")'>DELETE</button></div></div>";
        // записуємо значення в асоціативний масив
        data.set(id,typeVariable+"_"+nameVariable+"_"+valueVariable+";\n");
        // вставляємо елемент в кінець контейнеру
        variablesCntainer.insertAdjacentHTML("beforeEnd", element);
    }
}
// функція для видалення змінної
function deleteRow(id){
    // видаляємо змінну як візуальний елемент на сторінці
    document.getElementById(id).remove();
    // видаляємо дані з масиву які відповідають візуальному елементу
    data.delete(id);
}
// функція для відправки даних(на даний момент всього лише для перевірки роботи)
function sendData(){
    // очищаємо візуальне поле від попередніх значень
    document.getElementById("code").innerHTML = "";
    // заповнюємо візуальне поле вмістом масиву
    for (let key of data.keys()) {
        document.getElementById("code").insertAdjacentHTML("beforeEnd", key+" -> "+data.get(key) + "<br>");
    }
}
