
const formattedData = [];
async function getAppointments(){ 
  const userId = document.querySelector('#userId').value;

    const temp = await fetch(`/api/appointment/requester/${userId}`);
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
      // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      editable: true,
      selectable: true,

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


  