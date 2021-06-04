const { json } = require("sequelize/types");

async function updateAppointment(event){
    event.preventDefault();
    const apptId = document.querySelector("#id").value;
    const title = document.querySelector("#title").value.trim();
    const location = document.querySelector("#location").value.trim();
    const attendingId = document.querySelector("#employee").value;
    await fetch("/api/appointment/?",apptId,{
        method:"PUT",
        body: JSON.stringify({title,location,attendingId}),
        headers:{"Content-Type":"application/json"},
    })

    document.location.replace("/account");
}

document.querySelector("#appointment-form").addEventListener("submit",updateAppointment);