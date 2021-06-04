
const formattedData = [];
async function getAppointments(){ 
  const empId = document.querySelector('#userId').value;
  console.log(empId);
    const temp = await fetch(`/api/appointment/attending/${empId}`);
    await temp.json().then(data =>{
    data.map(event =>{
      formattedData.push({id:event.id,title:event.title,start:event.start,end:event.end})
    })

    var calendarEl =  document.getElementById('calendar'); 
    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
      right: 'prev next today',
      center: 'title',
      left: 'timeGridDay listWeek dayGridMonth'},
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      themeSystem: 'bootstrap',
      eventClick: function (info) {
        console.log(info.event);
      }, 
      timeZone: 'local', 
      initialView: 'listWeek',
      events: formattedData
    });
    calendar.render();
  });
}
getAppointments();


  