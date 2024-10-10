let csrfToken = "";

document.addEventListener("DOMContentLoaded", getSession);

async function getCSRF() {
  const response = await fetch("http://localhost:8000/csrf", {
    credentials: "include",
  });
  csrfToken = response.headers.get("X-CSRFToken");
  return csrfToken;
}

async function getSession() {
  const response = await fetch("http://localhost:8000/session", {
    credentials: "include",
  });
  const data = await response.json();
  await getCSRF();
}

const form = document.getElementById("myForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  // const searchParams = new URLSearchParams(newform).toString();

  const jsonString = JSON.stringify(Object.fromEntries(formData));

  // console.log(searchParams.toString());
  try {
    const response = await fetch("http://localhost:8000/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: jsonString,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});

async function fetchData() {
  try {
    const response = await fetch("http://127.0.0.1:8000/getdata");
    const data = await response.json();
    inserData(JSON.parse(data.data));
  } catch (error) {
    console.error(error);
  }
}

fetchData();

const table = document.getElementById("to-do-table");
const tableHead = table.querySelector("thead");
const tableBody = table.querySelector("tbody");

function inserData(data) {
  const headers = Object.keys(data[0].fields);
  data.forEach((item) => {
    const row = document.createElement("tr");

    // console.log(item);

    headers.forEach((header) => {
      if (header !== "created") {
        const cell = document.createElement("td");
        if (header === "status") {
          const select = document.createElement("select");

          select.classList = "tododd";
          const options = ["To Do", "Doing", "Done"];
          options.forEach((option) => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            if (option === item.fields[header]) {
              opt.selected = true;
            }
            select.appendChild(opt);
          });
          select.addEventListener("change", (event) => updateStatus(item.pk,event));
          cell.appendChild(select);
        } else {
          cell.textContent = item.fields[header];
        }
        row.appendChild(cell);
      }
    });
    tableBody.appendChild(row);
  });
}


async function updateStatus(ID, event){

    const Status = event.target.value

    if(Status === "Done"){

        const url = `http://localhost:8000/delete/${ID}`

        try {
            const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            credentials: "include",
            });
            const data = await response.json();
            console.log(data.Status);
        } catch (error) {
            console.error(error);
        }
    }

    else {
        const url = `http://localhost:8000/update/${ID}/${Status}`
    
        try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
              },
              credentials: "include",
            });
            const data = await response.json();
            console.log(data.Status);
          } catch (error) {
            console.error(error);
          }

    }

}