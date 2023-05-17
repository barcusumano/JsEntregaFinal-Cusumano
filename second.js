const ulRevisores = document.getElementById("teacher");


fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => {
        return res.json();
    })
    .then(data => {
    data.forEach(user => {
        const nombre = `<li class="tList">${user.name}</li>`;
        document.querySelector(`#teacher`).insertAdjacentHTML(`beforeEnd`, nombre);
    });
})
.catch(error => console.log(error));
