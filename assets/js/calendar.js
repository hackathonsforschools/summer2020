const CALENDAR_ID = 'wrussell.co.uk_kd25len0s48hc948apg112rqd0@group.calendar.google.com'
const CALENDAR_KEY = 'AIzaSyCvFbAkqIoeJfGqoA_LssluJriHCX3PBmk'

const DATE_24HR_FORMAT = {
    hour: '2-digit',
    minute: '2-digit',
    omitZeroMinute: false,
    hour12: false
}

const DATE_RANGE_FORMAT = {
    month: 'short',
    day: 'numeric',
    separator: ' to ',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
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
        themeSystem: 'bootstrap',
        googleCalendarApiKey: CALENDAR_KEY,
        eventClick: displayEvent,
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
    document.getElementById('timezone').innerHTML = `All times are in your local timezone! (${Intl.DateTimeFormat().resolvedOptions().timeZone})`
    calendar.render()
})

function displayEvent(info) {
    info.jsEvent.preventDefault()

    const date = info.event._instance.range; 
    $('#event-title').text(info.event._def.title);
    $('#event-date').text(FullCalendar.formatRange(date.start, date.end, DATE_RANGE_FORMAT));
    $('#event-desc').text(info.event._def.extendedProps.description)
    $('#event-link').attr("href", info.event._def.url);
    $('#event-modal').modal('show')
}

function onLoadFailed(error) {
    calendarElement.innerHTML =
        `<div id="calendar-error">
      <h3>Could not load calendar</h3>
      <p>HTTP Error ${error.xhr.status}</p>
    </div>`
}
