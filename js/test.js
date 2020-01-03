let select = document.getElementById("test");
// функція для добавлення елементу
function addOption (select, text, value, id){
    select.options[select.options.length] = new Option(text, value);
    select.id = id;
}
// функція для видалення елементу зі списку по id
function deleteOption (idOption) {
    remove(document.getElementById(idOption));
}
// функція для очищення списку
function clearSelect(select) {
    select.options.length = 0;
}
