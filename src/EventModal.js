import React, { useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

function EventModal({event_date,setShowEventCounter,title}) {

 const [remaining_times,setRemainingTimes]=useState(
     {days:'0',
     hours:'0',
      mins:'0',
      secs:'0'})   

 useEffect(()=>{
 
let counter=setInterval(()=>{
    
let cr_date=new Date();
let ev_date=new Date(event_date);
const diff=ev_date.getTime()-cr_date.getTime();
let sms=1000;
let mms=60*1000;
let hms=mms*60;
let dms=hms*24;

let days=Math.floor(diff/dms);
let hours=Math.floor((diff%dms)/hms);
let mins=Math.floor(((diff%dms)%hms)/mms);
let secs=Math.floor((((diff%dms)%hms)%mms)/sms)


setRemainingTimes({days,hours,mins,secs});


},1000);
  
  return ()=>{
      clearInterval(counter);
  }

 },[event_date]);

 let {days,hours,mins,secs}=remaining_times;

  return (
    ReactDOM.createPortal(
    <div id="event_modal"> 
    <p style={{margin:'30px 0','fontSize':'2rem'}}>COUNTDOWN TO {title.toUpperCase()}</p>
   
    <div className='event-date-container'>
    <div className='event-date-container__counter'>
        <div className="box">
        <div className='timer'>{days<10?`0${days}`:days}   </div>
        <div className='indicator'>Days</div>
        </div><span>&nbsp;:&nbsp;</span>
        <div className="box">
        <div className='timer'>{hours<10?`0${hours}`:hours}</div>
        <div className='indicator'>Hours</div>
        </div><span>&nbsp;:&nbsp;</span>
        <div className="box">
        <div className='timer'>{mins<10?`0${mins}`:mins}   </div>
        <div className='indicator'>Mins</div>
        </div><span>&nbsp;:&nbsp;</span>
        <div className="box">
        <div className='timer'>{secs<10?`0${secs}`:secs}   </div>
        <div className='indicator'>Secs</div>
        </div>
    </div>
   
    </div>
    <button onClick={()=>setShowEventCounter(false)}>Close</button>
    </div>,document.querySelector('#modal'))
  )
}

export default EventModal;