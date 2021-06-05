function goToSignup(event){
    event.preventDefault();
    document.location.replace("/signup");
}


document.querySelector("#signup-btn").addEventListener("click",goToSignup);