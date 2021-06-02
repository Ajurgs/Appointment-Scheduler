const { Json } = require("sequelize/types/lib/utils");

const signup = async (event) => {
  event.preventDefault();
  const password = document.querySelector("#password-signup").value.trim();
  const passwordConfirm = document
    .querySelector("#password-confirm")
    .value.trim();

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
        const response = await fetch("/api/users/", {
          method: "POST",
          body: JSON.stringify({ email, password, firstName, lastName }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        alert("failed to sign up");
      }
    }
  } else {
    alert("Passwords don't match");
  }
};
