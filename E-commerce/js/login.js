function validate(){
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var error_message = document.getElementById("error_message");
  
  error_message.style.padding = "10px";
  
  var text;
  if(name.length < 5){
    text = "Please Enter valid Name";
    error_message.innerHTML = text;
    return false;
  }
  
  if(isNaN(phone) || phone.length != 10){
    text = "Please Enter valid Phone Number";
    error_message.innerHTML = text;
    return false;
  }
  if(email.indexOf("@") == -1 || email.length < 6){
    text = "Please Enter valid Email";
    error_message.innerHTML = text;
    return false;
  }

  if(password === "" && confirmPassword === ""){
    text = "Please Enter Password";
    error_message.innerHTML = text;
    return false;
  }
  if (!(password === confirmPassword)){
    text = "Your Passwords Must Match";
    error_message.innerHTML = text;
    return false;
  }
  text = "Sign Up Successful";
    error_message.innerHTML = text;
    return true;

  localStorage.setItem('Email', email);
  localStorage.setItem('Password', password)
}


function login() {
  //get stored email and password
  var storedEmail = localStorage.getItem('email');
  var storedPassword = localStorage.getItem('password');

  var userEmail = document.getElementById('user-email').value;
  var userPassword = document.getElementById('user-password').value;
  var error_msg = document.getElementById("error_msg");
  
  error_msg.style.padding = "10px";
  
  var text;

  if (userEmail === storedEmail && userPassword === storedPassword){
    text = "Login Details Matched";
    error_msg.innerHTML = text;
    return true;
  }
  text = 'Login Not A Match';
    error_msg.innerHTML = text;
    return false;
}