const authSwitch = document.querySelector("#authSwitch")
const authButton = document.querySelector("#authButton")
const switchForm = document.querySelector("#switchForm")
const formTitle = document.querySelector("#form-title")
const username = document.querySelector("#username")
const Email = document.querySelector("#Email")
const Password = document.querySelector("#Password")
const ConfirmPassword = document.querySelector("#confirmPassword")

switchForm.addEventListener("click", ()=>{
    authButton.textContent ='Sign up'
    formTitle.textContent = 'Sign up'
    username.style.display = "block"
    confirmPassword.style.display = "block"
    authSwitch.innerHTML = `
    Already have an account? <a href="#"
    id="switchForm">Sign in </a>
    `
})
