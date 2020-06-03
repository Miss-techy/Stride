function validate(){
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
   var password = document.getElementById("confirm").value;
  var confirmPassword = document.getElementById("confirm-password").value;
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
  if(password == "" && confirmPassword == ""){
    text = "Please Enter Password";
    error_message.innerHTML = text;
    return false;
  }

  if(password.length < 8){
    text = "Please Enter 8 or More Character";
    error_message.innerHTML = text;
    return false;
  }

  if(!(password === confirmPassword)){
    text = "Your Passwords Must Match";
    error_message.innerHTML = text;
    return false;
  }

  alert("Form Submitted Successfully!");
  return true;
}