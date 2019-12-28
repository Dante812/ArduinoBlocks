// клас для створення і обробки змінних
class Handler {
    constructor(typeVariableId, nameVariableId, valueVariableId, containerId){
        // змінні для збереження id елементів на сторінці
        this.typeVariableId = typeVariableId;
        this.nameVariableId = nameVariableId;
        this.valueVariableId = valueVariableId;
        this.containerId = containerId;
        // отримуємо посилання на елемент в якому будуть розміщені змінні
        this.variablesCntainer = document.getElementById(containerId);
        // змінні для збереження значень переданих головною формою
        this.typeVariable = "";
        this.nameVariable = "";
        this.valueVariable = "";
        // змінна для генерування id елементів 
        this.variableId = 0;
        // створення масиву для збереження даних які будуть відправлені на сервер
        this.data = new Map();
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
        }else{
            // створюємо елемент для вставки
            this.element = "<div class='row' id='"+this.variableId+"'><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputVariableType' value='"+this.typeVariable+"'></div><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputVariableName' value='"+this.nameVariable+"'></div><div class='form-group col-md-3'><input disabled type='text' class='form-control' name='inputVariableValue' value='"+this.valueVariable+"'></div><div class='form-group col-md-3'><button class='btn btn-danger' onclick='handler.deleteRow("+this.variableId+")'>DELETE</button></div></div>";
            // збільшуємо загальний id 
            this.variableId++;
            // записуємо значення в асоціативний масив
            if(this.valueVariable == "" || this.valueVariable === null) {
                this.data.set(this.variableId,this.typeVariable+"_"+this.nameVariable+"_"+"\"\""+";\n");
            }else{
                this.data.set(this.variableId,this.typeVariable+"_"+this.nameVariable+"_"+this.valueVariable+";\n");
            }
            // вставляємо елемент в кінець контейнеру
            this.variablesCntainer.insertAdjacentHTML("beforeEnd", this.element);
        }
    }
    // видалення змінної
    deleteRow(i){
        // видаляємо змінну як візуальний елемент на сторінці
        document.getElementById(i).remove();
        // видаляємо дані з масиву які відповідають візуальному елементу
        this.data.delete(i);
    }
    // відправлення даних на обрбку (покищо бета (-_-) )
    sendData(){
        // очищаємо візуальне поле від попередніх значень
        document.getElementById("code").innerHTML = "";
        // заповнюємо візуальне поле вмістом масиву
        for (let key of this.data.keys()) {
            document.getElementById("code").insertAdjacentHTML("beforeEnd", key+" -> "+this.data.get(key) + "<br>");
        }
    }

}

var handler = new Handler("inputTypeVariable","inputVariableName","inputVariableValue","containerForVariables");