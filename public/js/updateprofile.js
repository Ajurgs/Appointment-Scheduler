
const profileFormHandler = async (event) => {
  event.preventDefault();
  
  // udpate the user
  const id = document.querySelector("#id").value.trim();
  const email = document.querySelector("#email-profile").value.trim();
  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();
  const phoneNumber = document.querySelector("#phone-profile").value.trim();
  const roleId = document.querySelector("#userRole").value.trim();
  
  if (email && firstName && lastName && phoneNumber && roleId) {
          const response = await fetch(`/api/user/${id}`, {
            method: "PUT",
            body: JSON.stringify({ email, firstName, lastName, phoneNumber, roleId }),
            headers: { "Content-Type": "application/json" },
          });
          document.location.replace("/");
        } else {
          alert("failed to update");
        }
};


const userSearchFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector("#email-search").value.trim();
    console.log("Email: " + email);
    
    // search for the user
    if (email) {
      const response = await fetch(`/api/user/email/${email}`)
      .then(response => response.json()).then(userData => {

        document.querySelector("#firstName").value = userData.firstName;
        document.querySelector("#lastName").value = userData.lastName;
        document.querySelector("#email-profile").value = userData.email;
        document.querySelector("#id").value = userData.id;
      });
    } else {
      alert("Can't find a user with that email.");
    }
}
  
  document
    .querySelector('#profile-form')
    .addEventListener('submit', profileFormHandler);

    document
    .querySelector('#search-user-form')
    .addEventListener('submit', userSearchFormHandler);
  