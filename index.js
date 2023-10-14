function getAndUpdate() {
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    date = document.getElementById('date').value;
    time = document.getElementById('time').value;

    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc, date, time]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc, date, time]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }

    $('.form-group').children('input').val('');
    $('.form-group').children('textarea').val('');

    update();
}

function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
            <th scope="row">${index + 1}</th>
            <td id = "titletext">${element[0]}</td>
            <td id = "desctext">${element[1]}</td> 
            <td id="datetext">${element[2]}</td>
            <td id="timetext">${element[3]}</td>
            <td><button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td> 
            </tr>`;
    });
    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex) {
    console.log("Deleted task ", itemIndex + 1);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);

    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}
const search = () => {
    let filter = document.getElementById('searchtext').value.toUpperCase();
    let tr = document.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            let textvalue = td.textContent || td.innerHTML;
            if (textvalue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }

}
function clearStorage() {
    if (confirm("Do you really want to clear the list?")) {
        console.log('Clearing the storage')
        localStorage.clear();
        update()
    }
}