
// Create a canvas object (let canvas) from the HTML canvas element
let canvas = document.getElementById('canvas');
// Create a 2d drawing object (let ctx) for the canvas object
let ctx = canvas.getContext("2d");
// Calculate the clock radius, using the height of the canvas
let radius = canvas.height / 2;
// Remap the (0,0) position (of the drawing object) to the center of the canvas
ctx.translate(radius, radius);
// Reduce the clock radius (to 90%) to draw the clock well inside the canvas
radius = radius * 0.90;
// Create a function to draw the clock
// drawClock();
// drawClock will be called for each 1 second
setInterval(drawClock, 1000);

function drawClock() {
    // Create a drawFace() function for drawing the clock face
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    let grad;

    // Draw the white circle
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = '#f4f4f4';
    ctx.fill();

    // Create a radial gradient (95% and 105% of original clock radius)
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);

    // Create 3 color stops, corresponding with the inner, middle, and outer edge of the arc
    // The color stops create a 3D effect
    grad.addColorStop(0, 'black');
    grad.addColorStop(0.5, 'black');
    grad.addColorStop(1, 'lightgray');

    // Define the gradient as the stroke style of the drawing object
    ctx.strokeStyle = grad;

    // Define the line width of the drawing object (10% of radius)
    ctx.lineWidth = radius*0.1;

    // Draw the circle
    ctx.stroke();

    // Draw the clock center
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
}


function drawNumbers(ctx, radius) {
    let ang;
    let num;

    // Set the font size (of the drawing object) to 15% of the radius
    ctx.font = radius * 0.15 + "px arial";

    // Set the text alignment to the middle and the center of the print position
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // Calculate the print position (for 12 numbers) to 85% of the radius, rotated (PI/6) for each number
    for(num = 1; num < 13; num++){
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){

    // Use Date to get hour, minute, second
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    // Calculate the angle of the hour hand, and draw it a length (50% of radius), and a width (7% of radius)
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}


// Stopwatch JavaScript

let second = 0;
let minutes = 0;
let hour = 0;
let myTime;

let stopBtn = document.getElementById('stopBtn');
let resetBtn = document.getElementById('resetBtn');

let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click',()=>{
    stopBtn.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
    myTime = setInterval(myStopwatchFunc,1000);

 
})


function myStopwatchFunc(){
    second++;
    if(second==60){
        second=0;
        minutes++;
    }
    if(minutes==60){
        minutes=0;
        hour++;
    }
    if(hour==12){
        hour=0;
    }
    let secondZero = '';
    if(second<10){
        secondZero = 0; 
    }else{
        secondZero = '';
    }
    let minutesZero = '';
    if(minutes<10){
        minutesZero = 0; 
    }else{
        minutesZero = '';
    }
    let hourZero = '';
    if(hour<10){
        hourZero = 0; 
    }else{
        hourZero = '';
    }
    
    document.getElementById('stopwatchTime').innerText=`${hourZero}${hour}:${minutesZero}${minutes}:${secondZero}${second}`;
} 


stopBtn.addEventListener('click',()=>{
    clearInterval(myTime);
    stopBtn.classList.add('hidden');
})

resetBtn.addEventListener('click',()=>{
    clearInterval(myTime);
    document.getElementById('stopwatchTime').innerText = "00:00:00";
    second=0;
    minutes=0;
    hour=0;
    stopBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
})


// Timer JavaScript

let timerDeleteBtn;
let timerResetBtn;
let timerStopBtn;
let timerAddTimeBtn;

let initialHour;
let initialMinutes;
let initialSecond;

let timerhour=0;
let timerminutes=0;
let timersecond=0;

let timerMyTime;

timerDeleteBtn = document.getElementById('timerDeleteBtn');
timerStopBtn = document.getElementById('timerStopBtn');
timerAddTimeBtn = document.getElementById('timerAddTimeBtn');
timerResetBtn = document.getElementById('timerResetBtn');

let timerStartBtn = document.getElementById('timerStartBtn');
timerStartBtn.addEventListener('click',(e)=>{
    timerAddTimeBtn.classList.remove('hidden');
    timerResetBtn.classList.add('hidden');
    timerhour = document.getElementById('timerHour').value;
    timerminutes = document.getElementById('timerMinutes').value;
    timersecond = document.getElementById('timerSecond').value;

    if(timerhour < 0 || timerminutes < 0 || timersecond < 0){
        let timerError = document.getElementById('timerError');
        timerError.style.display = 'block';
        timerError.innerText = "Please enter positive number.";
        setTimeout(()=>{
            timerError.innerText='';
        },5000)
        timerStartBtn.classList.remove('hidden');
        timerAddTimeBtn.classList.add('hidden');
    }else if(timerhour == 0 && timerminutes == 0 && timersecond == 0){
        let timerError = document.getElementById('timerError');
        timerError.style.display = 'block';
        timerError.innerText = "Please enter one of the second,minutes or hour.";
        setTimeout(()=>{
            timerError.innerText='';
        },5000)
        timerStartBtn.classList.remove('hidden');
        timerAddTimeBtn.classList.add('hidden');
    }else if(timerhour != '' || timerminutes!='' || timersecond!=''){
        timerDeleteBtn.classList.remove('hidden');
        timerStopBtn.classList.remove('hidden');
        
        if(timersecond == ''){
            timersecond = 0;
        }
        if(timerminutes == ''){
            timerminutes = 0;
        }
        if(timerhour == ''){
            timerhour = 0;
        }

        while(timersecond>60 || timerminutes>60){
            if(timerminutes>60){
                timerminutes=timerminutes-60;
                timerhour++;
            }else if(timersecond>60){
                timersecond=timersecond-60;
                timerminutes++;
            }    
        }
        
        
        initialhour=timerhour;
        initialMinutes=timerminutes;
        initialSecond=timersecond;
        timerMyTime = setInterval(myTimerFunc,1000);
        
        timerStartBtn.classList.add('hidden');
    }else{
        let timerError = document.getElementById('timerError');
        timerError.style.display = 'block';
        timerError.innerText = "Please enter one of the second,minutes or hour.";
        setTimeout(()=>{
            timerError.innerText='';
        },5000)
        timerStartBtn.classList.remove('hidden');
        timerAddTimeBtn.classList.add('hidden');
    }

    e.preventDefault();
})

function myTimerFunc(){
    
    
    
    if(timerhour==0 && timerminutes==0 && timersecond==0){
        clearInterval(timerMyTime);
        document.getElementById('timerHour').value = '';
        document.getElementById('timerMinutes').value = '';
        document.getElementById('timerSecond').value = '';
        timerDeleteBtn.classList.add('hidden');
        timerAddTimeBtn.classList.add('hidden');
        timerStopBtn.classList.add('hidden');
        timerStartBtn.classList.remove('hidden');
    }else if( timerminutes==0 && timersecond==0){
        timerminutes=59;
        timersecond=59;
        timerhour--;
    }else if(timersecond==0){
        timersecond=59;
        timerminutes--;
    }

    document.getElementById('timerHour').value = timerhour;
    document.getElementById('timerMinutes').value = timerminutes;
    document.getElementById('timerSecond').value = timersecond;
    timersecond--;
    
}

timerResetBtn.addEventListener('click',(e)=>{
    document.getElementById('timerHour').value = initialHour;
    document.getElementById('timerMinutes').value = initialMinutes;
    document.getElementById('timerSecond').value = initialSecond;
    
    timerStopBtn.classList.add('hidden');
    timerAddTimeBtn.classList.add('hidden');
    timerStartBtn.classList.remove('hidden');
    timerDeleteBtn.classList.remove('hidden');

    e.preventDefault();
})

timerStopBtn.addEventListener('click',(e)=>{
    clearInterval(timerMyTime);
    timerStopBtn.classList.add('hidden');
    timerResetBtn.classList.remove('hidden');
    timerAddTimeBtn.classList.add('hidden');
    timerStartBtn.classList.remove('hidden');
    
    e.preventDefault();
})

timerAddTimeBtn.addEventListener('click',(e)=>{
    if(timerminutes==59){
        timerminutes=0;
        timerhour++;
    }else{
        timerminutes++;
    }


    e.preventDefault();

})

timerDeleteBtn.addEventListener('click',(e)=>{
    clearInterval(timerMyTime);
    
    timerhour = 0;
    timerminutes=0;
    timersecond=0;
    document.getElementById('timerHour').value = '';
    document.getElementById('timerMinutes').value = '';
    document.getElementById('timerSecond').value = '';
    timerResetBtn.classList.add('hidden');
    timerDeleteBtn.classList.add('hidden');
    timerStopBtn.classList.add('hidden');
    timerAddTimeBtn.classList.add('hidden');
    timerStartBtn.classList.remove('hidden');

    e.preventDefault();
})


// Alarm JavaScript
let alarmHour = 0;
let alarmMinute = 0;
let alarmSecond = "00";
let alarmYear = 0;
let alarmMonth = 0;
let alarmDay = 0;

let alarmSaveBtn = document.getElementById('alarmSaveBtn');
alarmSaveBtn.addEventListener('click',(e)=>{
    
    addAlarm();

    e.preventDefault();
})

function addAlarm(indexBtn=''){
    
    

    alarmYear = document.getElementById('alarmYear').value;
    alarmMonth = document.getElementById('alarmMonth').value;
    alarmDay = document.getElementById('alarmDay').value;
    alarmHour = document.getElementById('alarmHour').value;
    alarmMinute = document.getElementById('alarmMinutes').value;
    // alarmSecond = document.getElementById('alarmSecond').value;
    let d = new Date();
    let currentYear = d.getFullYear();
    let currentMonth = d.getMonth() + 1;
    let currentDay = d.getDate();
    let currentHour = d.getHours();
    let currentMinutes = d.getMinutes();
    // console.log(alarmYear,currentYear,alarmMonth,currentMonth,alarmDay,currentDay,alarmHour,currentHour,alarmMinute,currentMinutes);
    
    if(alarmYear < currentYear || alarmMonth < currentMonth || alarmDay < currentDay || alarmHour < 0 || alarmMinute < 0 || alarmHour > 23 || alarmMinute > 59  || alarmDay > 31 || alarmMonth > 11 || alarmYear > currentYear+5){
        let alarmError = document.getElementById('alarmError');
        alarmError.style.display = "block";
        alarmError.innerText = "Please Enter valid date and time.";
        setTimeout(()=>{
           alarmError.innerText="";
        },5000);
    }else if(alarmYear==currentYear && alarmMonth==currentMonth && alarmDay==currentDay && alarmHour<=currentHour && alarmMinute<=currentMinutes){
        let alarmError = document.getElementById('alarmError');
        alarmError.style.display = "block";
        alarmError.innerText = "Please Enter valid date and time.";
        setTimeout(()=>{
           alarmError.innerText="";
        },5000);
    }else if(alarmHour == 0 && alarmMinute == 0  && alarmYear == 0 && alarmMonth == 0 && alarmDay == 0){
        let alarmError = document.getElementById('alarmError');
        alarmError.style.display = "block";
        alarmError.innerText = "Please enter some imputs";
        setTimeout(()=>{
           alarmError.innerText="";
        },5000);
    }else if(alarmHour=='' && alarmMinute=='' ){
        let alarmError = document.getElementById('alarmError');
        alarmError.style.display = "block";
        alarmError.innerText = "Please enter some time.";
        setTimeout(()=>{
           alarmError.innerText="";
        },5000);
    }else if(alarmDay=='' && alarmMonth=='' && alarmYear==''){
        let alarmError = document.getElementById('alarmError');
        alarmError.style.display = "block";
        alarmError.innerText = "Please enter date.";
        setTimeout(()=>{
           alarmError.innerText="";
        },5000);
    }else{
        // alarmHour!='' || alarmMinute!=''
        // Retraive data from the localStorage 
        let alarmCheck = localStorage.getItem('Alarm');
        // if data is null then create new array
        if(alarmCheck == null){
            alarmCheckObj = [];
        }else{
            // else convert string into array by using json
            alarmCheckObj = JSON.parse(alarmCheck);
        }
        
        if(alarmHour==''){
            alarmHour = "00";
        }else if(alarmMinute == ''){
            alarmMinute = "00";
        }

        let hourZero = '';
        let minuteZero = '';
        let dayZero = '';
        let monthZero = '';
        if(alarmHour.length<2){
            hourZero = 0;
        }
        if(alarmMinute.length<2){
            minuteZero = 0;
        }
        if(alarmDay.length<2){
            dayZero=0;
        }
        if(alarmMonth.length<2){
            monthZero=0;
        }


        let alarmType = (alarmHour<12)? "AM" : "PM";

        let string = {
            alarmYear: `${alarmYear}`,
            alarmMonth:`${monthZero}${alarmMonth}`,
            alarmDay: `${dayZero}${alarmDay}`,
            alarmHour: `${hourZero}${alarmHour}`,
            alarmMinute: `${minuteZero}${alarmMinute}`,
            alarmSecond,alarmType
        }

        let str = `${alarmYear}-${monthZero}${alarmMonth}-${dayZero}${alarmDay} ${hourZero}${alarmHour}:${minuteZero}${alarmMinute}:${alarmSecond}`;


        // console.log(str);
        
        if(indexBtn==''){
            // add object into array using push method
            alarmCheckObj.push(string);
        }else{
            alarmCheckObj.splice(indexBtn,1,string);
        }
        
        
        // add Array of Object into localStorage by converting ArrayOfObject into string using json
        localStorage.setItem('Alarm',JSON.stringify(alarmCheckObj));
        
        let alarmIndex = localStorage.getItem('Alarm');
        if(alarmIndex == null){
            alarmIndexObj = [];
        }else{
            // else convert string into array by using json
            alarmIndexObj = JSON.parse(alarmIndex);
        }
        let index = alarmIndexObj.length - 1;
        setAlarm(index,str);
        showAlarms();

        // let statusId = 'status' + index;
        // let status = document.getElementById(statusId);
        // status.innerText="Active";

        let stopId = 'stop' + index;
        let stop = document.getElementById(stopId);
        stop.classList.remove('hidden');

        let onId = 'on' + index;
        let on = document.getElementById(onId);
        on.classList.add('hidden');
        
    }

    // console.log(alarmHour,alarmMinute,alarmType);
    let alarmForm = document.getElementById('alarmForm');
    alarmForm.reset();
}

let alarmTimeOur = [];
function setAlarm(index,string){

    // console.log(string);
    let alarmDate = new Date(string);
    // console.log(alarmDate);
    let now = new Date();
    
    let timeToAlarm = alarmDate - now;
    console.log(timeToAlarm);

    if(timeToAlarm>=0){
        alarmTimeOur[index] = setTimeout(()=>{
            // console.log(index);
            // let statusId = 'status' + index;
            // let status = document.getElementById(statusId);
            // status.innerText = "Active";
            ringBell(index);
        },timeToAlarm);
    }else{
        let alarmError = document.getElementById('alarmError');
       alarmError.style.display = "block";
       alarmError.innerText = "Please enter valide date and time.";
       setTimeout(()=>{
           alarmError.innerText="";
       },5000);
    }
    
}

// let audio = new Audio('');
let myAudio = document.getElementById('myAudio');

function ringBell(index){
    let offId = 'off' + index;
    // console.log(index);
    let off = document.getElementById(offId);
    let stopId = 'stop' + index;
    let stop = document.getElementById(stopId);
    off.classList.remove('hidden');
    stop.classList.add('hidden');
    myAudio.currentTime = 0;
    myAudio.play();
}

showAlarms();

function showAlarms(){
    // Retraive data from the localStorage 
    let alarms= document.getElementById('alarms');
    alarms.innerHTML="";
    let alarmCheck = localStorage.getItem('Alarm');
    // if data is null then create new array
    if(alarmCheck == null){
        alarmCheckObj = [];
    }else{
        // else convert string into array by using json
        alarmCheckObj = JSON.parse(alarmCheck);
        
        let alarmString;
        Array.from(alarmCheckObj).forEach((element,index)=>{
            let minuteZero = '';
            if(element.alarmMinute.length<2){
                minuteZero = 0;
            }
            let hourZero = '';
            if(element.alarmHour.length<2){
                hourZero = 0;
            }
            alarmString = `
            <div id="alarm${index}" class="row">
                <div class="col-md-6 text-left timerInput">
                    <h5 class="timerInput">${index+1}) ${hourZero}${element.alarmHour}:${minuteZero}${element.alarmMinute} <sub>${element.alarmType}</sub></h5>
                </div>
                <div class="col-md-6">
                    <button type="submit" class="btn btn-success"
                    id="on${index}" onclick="onAlarm(this.id)" data-target="${index}">Set</button>
                    <button type="submit" class="btn btn-warning mx-1 hidden"
                    id="off${index}" onclick="OffAlarm(this.id)" data-target="${index}">Off</button>
                    <button type="submit" class="btn btn-warning mx-1 hidden"
                    id="stop${index}" onclick="stopAlarm(this.id)" data-target="${index}">Stop</button>
                    <button type="submit" class="btn btn-primary mx-1"
                    id="edit${index}" onclick="editAlarm(this.id)" data-target="${index}">Edit</button>
                    <button type="submit" class="btn btn-danger"
                    id="${index}" onclick="deleteAlarm(this.id)">Delete</button>
                </div>
            </div>
            <hr>
            `;
            alarms.innerHTML += alarmString;
        });
    }
}

function stopAlarm(id){
    let stopBtn = document.getElementById(id);
    let index = stopBtn.getAttribute('data-target');
    clearInterval(alarmTimeOur[index]);
    // let statusId = 'status' + index;
    // let status = document.getElementById(statusId);
    // status.innerText="Inactive";
    stopBtn.classList.add('hidden');
    let onId = 'on'+index;
    let on = document.getElementById(onId);
    on.classList.remove('hidden'); 
}

function deleteAlarm(index){
    // let statusId = 'status' + index;
    // let status = document.getElementById(statusId);
    // status.innerText="";
    let deleteAlarm = localStorage.getItem('Alarm');
    if(deleteAlarm == null){
        alarmObj = [];
    }else{
        alarmObj = JSON.parse(deleteAlarm);
    }

    // delete note when user click delete button using note index number
    alarmObj.splice(index,1);
   

    // again update localStorage
    localStorage.setItem('Alarm',JSON.stringify(alarmObj));
    showAlarms();

}

function editAlarm(id){
    let alamEditBtn = document.getElementById('alamEditBtn');
    alamEditBtn.classList.remove('hidden');

    let alarmSaveBtn = document.getElementById('alarmSaveBtn');
    alarmSaveBtn.classList.add('hidden');
    let editBtn = document.getElementById(id);
    let editIndex = editBtn.getAttribute('data-target');
    let editAlarm = localStorage.getItem('Alarm');
    clearTimeout(alarmTimeOur[editIndex]);
    alamEditBtn.setAttribute('data-target',editIndex);
    if(editAlarm == null){
        alarmObj = [];
    }else{
        alarmObj = JSON.parse(editAlarm);
    }

    document.getElementById('alarmYear').value=alarmObj[editIndex].alarmYear;
    document.getElementById('alarmMonth').value=alarmObj[editIndex].alarmMonth;
    document.getElementById('alarmDay').value=alarmObj[editIndex].alarmDay;
    document.getElementById('alarmHour').value=alarmObj[editIndex].alarmHour;
    document.getElementById('alarmMinutes').value=alarmObj[editIndex].alarmMinute;

    // let statusId = 'status' + editIndex;
    // let status = document.getElementById(statusId);
    // status.innerText="Inactive";
    // console.log(alarmObj,editIndex);
}

let alamEditBtn = document.getElementById('alamEditBtn');
alamEditBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let index = alamEditBtn.getAttribute('data-target');
    addAlarm(index);

    alamEditBtn.classList.add('hidden');
    let alarmSaveBtn = document.getElementById('alarmSaveBtn');
    alarmSaveBtn.classList.remove('hidden');

})

function OffAlarm(id){
    myAudio.pause();
    
    let off = document.getElementById(id);
    let index = off.getAttribute('data-target');
    // let statusId = 'status' + index;
    // let status = document.getElementById(statusId);
    // status.innerText="Inactive";
    // console.log(index);
    off.classList.add('hidden');
    let setBtnId = 'on'+index;
    let on = document.getElementById(setBtnId);
    on.classList.remove('hidden');
    
}

function onAlarm(id){

    
    let on = document.getElementById(id);
    let index = on.getAttribute('data-target');
    // let statusId = 'status' + index;
    // let status = document.getElementById(statusId);
    // status.innerText="Active";
        
    let alarmIndex = localStorage.getItem('Alarm');
    if(alarmIndex == null){
        alarmIndexObj = [];
    }else{
        // else convert string into array by using json
        alarmIndexObj = JSON.parse(alarmIndex);
    }

    let str = {};
    
    
    let d = new Date();
    let day = d.getDate();
    let dayZero = '';
    if(day<10){
        dayZero = 0;
    }
    let hour = d.getHours();
    let alarmType = (hour<12)?"AM":"PM";
    let string;
    if(hour < alarmIndexObj[index].alarmHour){
        string = `${alarmIndexObj[index].alarmYear}-${alarmIndexObj[index].alarmMonth}-${dayZero}${day} ${alarmIndexObj[index].alarmHour}:${alarmIndexObj[index].alarmMinute}:${alarmIndexObj[index].alarmSecond}`;
        str = {
            alarmYear: alarmIndexObj[index].alarmYear,
            alarmMonth: alarmIndexObj[index].alarmMonth,
            alarmDay: `${dayZero}${day}`,
            alarmHour: alarmIndexObj[index].alarmHour,
            alarmMinute: alarmIndexObj[index].alarmMinute,
            alarmSecond: alarmIndexObj[index].alarmSecond,
            alarmType
        }
        alarmIndexObj.splice(index,1,str);
    }else{
        string = `${alarmIndexObj[index].alarmYear}-${alarmIndexObj[index].alarmMonth}-${dayZero}${day+1} ${alarmIndexObj[index].alarmHour}:${alarmIndexObj[index].alarmMinute}:${alarmIndexObj[index].alarmSecond}`;
        str = {
            alarmYear: alarmIndexObj[index].alarmYear,
            alarmMonth: alarmIndexObj[index].alarmMonth,
            alarmDay: `${dayZero}${day+1}`,
            alarmHour: alarmIndexObj[index].alarmHour,
            alarmMinute: alarmIndexObj[index].alarmMinute,
            alarmSecond: alarmIndexObj[index].alarmSecond,
            alarmType
        }
        alarmIndexObj.splice(index,1,str);
    } 

    localStorage.setItem('Alarm',JSON.stringify(alarmIndexObj));


    setAlarm(index,string);

    let stopId = 'stop'+index;
    let stopBtn = document.getElementById(stopId);
    stopBtn.classList.remove('hidden');
    on.classList.add('hidden');
    let offId = 'off' + index;
    let off = document.getElementById(offId);
    off.classList.add('hidden');
    dayZero='';
}

// for digital clock
let digitalClock = document.getElementById('digitalClock');
let time;
function showDigitalTime(){
    let dt = new Date();
    time = dt.toLocaleTimeString();
    digitalClock.innerHTML = time;
    setTimeout(showDigitalTime,1000)
}
showDigitalTime();
// console.log(time);