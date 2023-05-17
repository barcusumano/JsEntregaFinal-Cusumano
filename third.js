const logIn = document.getElementById ("btnLogin");

const authorisedUser = "Ana";
const authorisedPass = "123";

logIn.addEventListener ("click", ()=>{
    Swal.fire ({
        title: "Login",
        html: ` <input type="text" id="user" class="swal2-input" placeholder="username">
                <input type="text" id="password" class="swal2-input" placeholder="password">`,
        confirmButtonText: "Send",
        showCancelButton: true,
        cancelButtonText: "Exit",
    }) .then((result) =>{
        if(result.isConfirmed){
            const user= document.getElementById("user").value;
            const password = document.getElementById("password").value;
            Swal.fire({
                title: "Not an active user",
                icon: "error",
                confirmButtonText: "Ok",
            })
            if(user === authorisedUser && password === authorisedPass){
                 window.location.href = "index.html";
             }
        }
    })
})