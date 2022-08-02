// Require google from googleapis package.
import { google } from'googleapis';

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
  '585457191776-7p0k0lj23jg5bole92j44tvp2jfldcbc.apps.googleusercontent.com',
  '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'
)

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
oAuth2Client.setCredentials({
  refresh_token: '1//0441Vww7JFRzsCgYIARAAGAQSNwF-L9IrJcy--ymSrHu59pSePOVoU_r-B9EnkM_okCrF29OHKeDHfHCrh784q2PHFaszuM6n2bw',
})

// Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

// Create a new event start date instance for temp uses in our calendar.
const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)

// Create a new event end date instance for temp uses in our calendar.
const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 4)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// Create a dummy event for temp uses in our calendar
const event = {
  summary: `Meeting with Shiv`,
  location: `Where noone can go but everyone can go`,
  description: `Meet with shiv to talk about the new client project and how to integrate the calendar for booking.`,
  colorId: 1,
  start: {
    dateTime: eventStartTime,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  end: {
    dateTime: eventEndTime,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
}

// Check if we a busy and have an event on our calendar for the same time.
calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      items: [{ id: 'primary' }],
    },
  },
  (err, res) => {
    // Check for errors in our query and log them if they exist.
    if (err) return console.error('Free Busy Query Error: ', err)

    // Create an array of all events on our calendar during that time.
    const eventArr = res.data.calendars.primary.busy

    // Check if event array is empty which means we are not busy
    if (eventArr.length === 0)
      // If we are not busy create a new calendar event.
      return calendar.events.insert(
        { calendarId: 'primary', resource: event },
        err => {
          // Check for errors and log them if they exist.
          if (err) return console.error('Error Creating Calender Event:', err)
          // Else log that the event was created.
          return console.log('Calendar event successfully created.')
        }
      )

    // If event array is not empty log that we are busy.
    return console.log(`Sorry I'm busy...`)
  }
)