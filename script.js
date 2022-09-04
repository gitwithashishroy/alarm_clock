let time , alarmTime ; 

let selectMenu = document.querySelectorAll("select"); 

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}


var audio = new Audio('./audio/alarm.mp3');
let ringing = false ; 

let clock = () => {
  let date = new Date();
  let hrs = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds() ; 
  let period = 'AM' ; 

  if(hrs >= 12){
    hrs = hrs - 12 ; 
    period = 'PM' ; 
  }
 
  hrs = hrs == 0 ? hrs = 12 : hrs ;  
  
  hrs = hrs < 10 ? "0" + hrs : hrs ; 
  min = min < 10 ? "0" + min : min ; 
  sec = sec < 10 ? "0" + sec : sec ;

  time = `${hrs} : ${min} : ${sec}  ${period}` ; 
  document.getElementById("clock").innerText = time ; 

  
  if(alarmTime == `${hrs} : ${min} : ${sec}  ${period}`){
    audio.play() ; 
    audio.loop = true; 
    console.log("alarm ringing");
    setTimeout(function(){
      audio.loop = false ; 
    },60000) ;
  }

  setTimeout(clock , 1000) ; 
};

clock() ;


function setAlarm(){
   
  let hrs = selectMenu[0].value ;  
  let min = selectMenu[1].value ;  
  let period = document.getElementById('period').value ; 

  let ul = document.getElementById('alarmlist') ; 
  let li = document.createElement('li') ; 
  li.setAttribute("class", "list") ; 
  li.innerText = `${hrs} : ${min}  ${period}`  ;  
  
  if(hrs != "Hour" && min != "Minute" ){
    ul.appendChild(li) ;  
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn");
    deleteButton.appendChild(document.createTextNode("Delete"));
    ul>li.appendChild(deleteButton).addEventListener("click", removeAlarm);
    alarmTime = `${hrs} : ${min} : 00  ${period}` ; 
    // let alarmcoming = document.getElementById('alarmcomingpara') ; 
    // alarmcoming.innerHTML = "Upcoming Alarm"; 
  }else {
    alert("please enter valid alarm time !") ; 
  };

} ; 
  
function removeAlarm(){
this.parentNode.remove();
}       


function stopAlarm(){
  audio.pause() ; 
  audio.loop = false ; 
  console.log("stopped alarm");
};






