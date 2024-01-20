// console.log(fetch("http://127.0.0.1:8000/"))
fetch("http://127.0.0.1:8000/")
    .then(response => response.json())
    .then(msg => inserData(JSON.parse(msg.data)))


const table = document.getElementById("to-do-table")
const table_H = table.querySelector("thead")
const table_R = table.querySelector("tbody")

function inserData(msg) {

    const msg_data = Object.keys(msg[0].fields)
    console.log(msg[0].fields);

    for (let i = 0; i < msg.length; i++){
        var tr = document.createElement('tr');

        msg_data.forEach((key) =>{
            if (key != "created"){
            var td = document.createElement('td');
            td.innerHTML = msg[i].fields[key];
            tr.appendChild(td)
        }
        });
        table_R.appendChild(tr);
     }
}


