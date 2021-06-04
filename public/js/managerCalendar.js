
const formattedData = [];
async function getAppointments(){ 
    const temp = await fetch("/api/appointment/");
    await temp.json().then(data =>{
    data.map(event =>{
      formattedData.push({id:event.id,title:"test Title",start:event.start,end:event.end})
    })

    var calendarEl =  document.getElementById('calendar'); 
    var calendar = new FullCalendar.Calendar(calendarEl, { 
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      // plugins: [ 'interaction'],
      headerToolbar: {
        right: 'prev next today',
        center: 'title',
        left: 'timeGridDay listWeek dayGridMonth'}, 
      eventClick: function (info) {
        console.log(info.event);
      }, 
      timeZone: 'local', 
      initialView: 'dayGridMonth',
      events: formattedData
    });
    calendar.render();
  });
}
getAppointments();

  