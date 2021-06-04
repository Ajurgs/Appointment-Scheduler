const profileFormHandler = async (event) => {
    event.preventDefault();
    
    // udpate the user
    const id = document.querySelector("#id").value.trim();
    const email = document.querySelector("#email-profile").value.trim();
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
    const phoneNumber = document.querySelector("#phone-profile").value.trim();
    const address = document.querySelector("#address").value.trim();
 
    if (email && firstName && lastName && phoneNumber && address) {
            const response = await fetch(`/api/user/${id}`, {
              method: "PUT",
              body: JSON.stringify({ email, firstName, lastName, phoneNumber, address }),
              headers: { "Content-Type": "application/json" },
            });
            document.location.replace("/");
          } else {
            alert("failed to update");
          }
  };


document
.querySelector('#profile-form')
.addEventListener('submit', profileFormHandler);