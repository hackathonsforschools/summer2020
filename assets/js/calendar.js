const CALENDAR_ID = 'wrussell.co.uk_kd25len0s48hc948apg112rqd0@group.calendar.google.com'
const CALENDAR_KEY = 'AIzaSyBplGV41n0rSD_NK612JhLTxePXXeyo0iE'

const DATE_24HR_FORMAT = {
    hour: '2-digit',
    minute: '2-digit',
    omitZeroMinute: false,
    hour12: false
}

let calendar
let calendarElement

document.addEventListener('DOMContentLoaded', () => {
    calendarElement = document.querySelector('#calendar')

    calendar = new FullCalendar.Calendar(calendarElement, {
        plugins: ['dayGrid', 'googleCalendar', 'list', 'timeGrid'],
        defaultView: 'listYear',
        header: { center: '' },
        titleFormat: { year: 'numeric', day: 'numeric' },
        buttonText: {  list: 'All', today: 'Today' },
        firstDay: 1,
        height: 1000,
        googleCalendarApiKey: CALENDAR_KEY,
        events: {
            googleCalendarId: CALENDAR_ID,
            failure: onLoadFailed
        },
        eventTimeFormat: DATE_24HR_FORMAT,
        views: {            
            // all upcoming events view
            listYear: {
                listDayFormat: { year: 'numeric', month: 'short', day: '2-digit', omitCommas: true },
                listDayAltFormat: { weekday: 'long' }
            }
        }
    })
    calendar.render()
})

function onLoadFailed(error) {
    calendarElement.innerHTML =
        `<div id="calendar-error">
      <h3>Could not load calendar</h3>
      <p>HTTP Error ${error.xhr.status}</p>
    </div>`
}