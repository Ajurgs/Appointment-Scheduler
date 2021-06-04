

async function createAppt (event){
    event.preventDefault();
    const dateTime = new Date(document.querySelector("#dateTime").value);
    const location = document.querySelector("#location").value.trim();
    const requesterId = document.querySelector("#id").value;
    const end = moment(dateTime).add(1,"hours").format();
    const start = moment(dateTime).format();
    let appointment = {start,end,location,requesterId};
    console.log(appointment);
    await fetch("/api/appointment",{
        method:"POST",
        body:JSON.stringify(appointment),
        headers: {
            "Content-Type": "application/json",
          }
    })
    document.location.replace('/account');
}


document.querySelector("#new-appointment").addEventListener("submit",createAppt)