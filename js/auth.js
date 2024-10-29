const authSwitch = document.querySelector("#authSwitch")
const authButton = document.querySelector("#authButton")
const switchForm = document.querySelector("#switchForm")
const formTitle = document.querySelector("#form-title")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirmPassword")

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


const authForm = document.querySelector("#authForm");

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    username: signIn ? undefined :
    username.value,
    email: email.value,
    password: password.value
  };

 
 localStorage.setItem('users', JSON.stringify(user))

  if (confirmPassword.value !== password.value) {
    alert("Password did not match!");
  }

});
