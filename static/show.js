let table = document.querySelector(".table");
let url = "http://localhost:8000/getData";

fetch(url)
  .then((req) => {
    return req.json();
  })
  .then((data) => {
    // console.log(data);
    if (data.length == 0) {
      table.style.textAlign = "center";
      table.style.padding = "10px";
      table.innerHTML =
        "Nothing to show. Go to Create Note page to add some notes";
      return;
    }
    data.forEach((item, index) => {
      let tr = document.createElement("tr");
      tr.innerHTML = ` <td>${index + 1}</td>
        <td>${item.date}</td>
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td><button id="${
          item._id
        }" class="deleteBtn">Delete</button></td>
        `;
      table.appendChild(tr);

      let deleteBtn = document.getElementById(`${item._id}`);
      deleteBtn.addEventListener("click", () => {
        let confirmation = confirm("Do you want delete this note");
        if (confirmation) {
          let deleteUrl = `http://localhost:8000/show/${item._id}`;
          let params = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
          fetch(deleteUrl, params)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              window.location.reload();
            });
        }
      });
    });
  });
