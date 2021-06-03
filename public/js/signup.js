
const signupFormHandler = async (event) => {
  event.preventDefault();

  const password = document.querySelector("#password-signup").value.trim();
  console.log("Password: " + password);
  

  const passwordConfirm = document.querySelector('#passConfirm').value.trim();
  console.log("Password Confirm: " + passwordConfirm);

  // if the passwords match
  if (password === passwordConfirm) {
    if (password.length < 8) {
      alert("Password needs to be at least 8 characters in length");
    } else {


      // create the user
      const email = document.querySelector("#email-signup").value.trim();

      const firstName = document.querySelector("#firstName").value.trim();
      const lastName = document.querySelector("#lastName").value.trim();
      if (email && password) {
        const response = await fetch("/api/user/", {
          method: "POST",
          body: JSON.stringify({ email, password, firstName, lastName }),
          headers: { "Content-Type": "application/json" },
        });
        document.location.replace("/");
      } else {
        alert("failed to sign up");
      }
    }
  } else {
    alert("Passwords don't match");
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
