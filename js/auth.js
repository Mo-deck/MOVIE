const authSwitch = document.querySelector("#authSwitch")
const authButton = document.querySelector("#authButton")
const switchForm = document.querySelector("#switchForm")
const formTitle = document.querySelector("#form-title")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirmPassword")

let signIn = true;

document.body.addEventListener("click", (e)=>{
    if(e.target.id != "switchForm")
     return;
    switchAuthForm()
})
const authForm = document.querySelector("#authForm");

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    username: signIn ? undefined : username.value,
    email: email.value,
    password: password.value
  };

  if(signIn){
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
        (user)=> user.email === email.value  && user.password === password.value 
    );

    if(existingUser){
        localStorage.setItem("onlineUser", JSON.stringify(existingUser))
        window.location.href = '../html/movies.html'
    }else{
        alert("Invalid credentials")
        return;
    }

  }else{
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // codekan waa users soo laalabanayo sida lo xakamenayo
    const existingUser = users.find(
        (user)=> user.username === username.value  && user.email === email.value
    );
    if(existingUser){
      alert(`User ${existingUser.username} already exists`)
      return;
    }
    if (confirmPassword.value !== password.value) {
        alert("Password did not match!");
        return;
      }

  users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    alert("Registered Successfully!")
    switchAuthForm();
  }

});

function switchAuthForm(){
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
        username.value ="";
        confirmPassword.value = "";
        email.value = '';
        password.value = '';
        authSwitch.innerHTML = `
        Already have an account? <a href="#"
        id="switchForm">Sign in </a>`
    }
}
