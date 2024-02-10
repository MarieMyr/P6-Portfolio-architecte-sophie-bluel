const btnConnect = document.getElementById("btnConnect")
        
const email = document.getElementById("email")
const password = document.getElementById("password")



// Stockage du token
function saveToLocalStorage (tk) {
    localStorage.setItem("loginToken", tk)
}

// Fonction de connexion

async function loginUser(event) {
event.preventDefault()

let user = {
        email: email.value,
        password: password.value,
}
const UserConnextion = JSON.stringify(user)

try {
    const reponse = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: UserConnextion
    })

const responseData = await reponse.json()

    if (responseData) {
    saveToLocalStorage(responseData.token)
    window.location.href = "index.html"
    }

} catch (error) {
    console.log(error)
}
   
}
btnConnect.addEventListener("click", loginUser)