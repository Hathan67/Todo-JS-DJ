let csrfToken = '';

document.addEventListener('DOMContentLoaded',function(){
    getSession();
})




function getCSRF() {
    fetch('http://localhost:8000/csrf', {
      // headers: {
          //     'Sec-Fetch-Site': 'same-site',
      //     'Access-Control-Allow-Origin':'*'
      
      //     // Other headers if needed`
      //   },
      credentials: 'include',
    })
    .then(response => {
      csrfToken = response.headers.get('X-CSRFToken');
      //   console.log(csrfToken);
      return csrfToken
    })
}

function getSession() {
    fetch('http://localhost:8000/session', {
        credentials:'include'
    })
    .then(response => response.json())
    .then(
        getCSRF()
    )
}

const formel = document.getElementById('myForm')

formel.addEventListener('submit',(event)=>{

    event.preventDefault();

    fetch('http://localhost:8000/new',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrfToken,
        },
        credentials:'include',
        body:JSON.stringify({'hello':'jello'})
    })
})


fetch("http://127.0.0.1:8000/getdata")
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