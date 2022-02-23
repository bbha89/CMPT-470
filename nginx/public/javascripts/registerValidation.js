function validate(password, password2){
	if (password !== password2) {
		alert("Password does not match");
		return false;
	}
	console.log("successfully registered")
	return true;
}