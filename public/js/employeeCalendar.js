
const formattedData = [];
async function getAppointments(){ 
  const empId = document.querySelector('#userId');
  console.log(empId);
    const temp = await fetch(`/api/appointment/attending/${empId}`);
    await temp.json().then(data =>{
    data.map(event =>{
      formattedData.push({id:event.id,title:"test Title",start:event.start,end:event.end})
    })

    var calendarEl =  document.getElementById('calendar'); 
    var calendar = new FullCalendar.Calendar(calendarEl, { 
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      // plugins: [ 'interaction'], 
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


document
.querySelector('#profile-form')
.addEventListener('submit', profileFormHandler);

document
.querySelector('#search-user-form')
.addEventListener('submit', userSearchFormHandler);

  