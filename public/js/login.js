const login = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();
  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/account");
    } else {
      alert("Failed to log in");
    }
  }
};

document.querySelector("#login-form").addEventListener("submit",login);