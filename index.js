let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let date = document.getElementById("date");
let AmPm = document.getElementById("AmPm");
let option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let selecttime = document.getElementById("other-time-zones");
let otherTimeDisplay = document.getElementById("other-time");

function updateClock() {
  let currenTime = new Date();

  let hours = currenTime.getHours()
  let ampm = hours >= 12 ? 'PM' : 'AM';//geting Am And Pm
  hours = hours - 12;// to convert 12 Hours Format
  hrs.innerHTML = hours;
  min.innerHTML = (currenTime.getMinutes() < 10 ? "0" : "") + currenTime.getMinutes();
  sec.innerHTML = (currenTime.getSeconds() < 10 ? "0" : "") + currenTime.getSeconds();
  date.innerHTML = (currenTime.toLocaleDateString(undefined, option))

  AmPm.innerHTML = `${ampm}`;

  //using api
  const selectedTimezone = selecttime.value;
  fetch(`https://worldtimeapi.org/api/timezone/${selectedTimezone}`)
    .then(response => response.json())
    .then(data => {
      let otherTime = data.datetime.slice(11, 13);
      let othermin = data.datetime.slice(14, 19);
      let formatTime = otherTime > 12 ? otherTime - 12 : otherTime;
      let Ampm = otherTime >= 12 ? "PM" : "AM";
      otherTimeDisplay.innerHTML = `(${selectedTimezone})` + "     " + `${formatTime}:${othermin}` + " " + `${Ampm}`;
    })
    .catch(error => console.error(error));


}
function clearTime() {
  document.getElementById("other-time-zones").value = "Select Country";
  document.getElementById("other-time").innerHTML = "";
}
setInterval(updateClock, 1000);
updateClock();
