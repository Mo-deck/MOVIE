const authSwitch = document.querySelector("#authSwitch")
const authButton = document.querySelector("#authButton")
const switchForm = document.querySelector("#switchForm")
const formTitle = document.querySelector("#form-title")
const username = document.querySelector("#username")
const Email = document.querySelector("#Email")
const Password = document.querySelector("#Password")
const ConfirmPassword = document.querySelector("#confirmPassword")

let signIn = true

document.body.addEventListener("click", (e)=>{
    if(e.target.id != "switchForm")
     return;
     signIn = !signIn
    if(!signIn){

        authButton.textContent ='Sign up'
        formTitle.textContent = 'Sign up'
        username.style.display = "block"
        confirmPassword.style.display = "block"
        authSwitch.innerHTML = `
        Already have an account? <a href="#"
        id="switchForm">Sign in </a>`
    }else{

        authButton.textContent ='Sign in'
        formTitle.textContent = 'Sign in'
        username.style.display = "none"
        confirmPassword.style.display = "none"
        username.value =''
        confirmPassword.value = ''
        authSwitch.innerHTML = `
        Already have an account? <a href="#"
        id="switchForm">Sign in </a>`
    }
})
