// ========NAME/TITLE OF THE COUNTDOWN TIMER=======
const countdownTimerTitle = 'countdown timer';
//============================
countdownTimerTitleEl = document.getElementById('countdown_timer_title');
countdownTimerTitleEl.innerHTML = `${countdownTimerTitle.toUpperCase()}`

// ============ USER INPUTS OF DATE AND RESETING FUNCTION ==========
const resetEl = document.getElementById('reset');
const resetBtn = document.getElementById('reset_button');

resetEl.addEventListener('click', () => {
    const dateEl = document.getElementById('date');
    const resetArea = document.getElementById('reset_area');
    const stoppageCont = document.getElementById('stoppage_cont');

    resetArea.classList.remove('hidden');
    resetEl.classList.add('hidden');
    dateEl.classList.add('hidden');
    stoppageCont.classList.remove('row');
    
});

resetBtn.addEventListener('click', reset);

function reset ( ) {
    
    const resetTimerArea = document.getElementById('reset_timer_area');
    const resetValue = resetTimerArea.value;
    
    // const stoppageEl = document.getElementById('stoppage_date');
    // stoppageEl.innerText = `Stoppage Date : `;

// ========= INVOKING THE FUNCTIONS ==========
    addTimeToLocalStorage(resetValue);
    setTimerFromLocalStorage(set = true);

};

//================ KICK STARTING THE TIMER FROM VALUES FROM THE LOCALSTORAGE =========
const setTimerFromLocalStorage = ( ) => {
    
    const resetValues = getTimeLocalStorage();
    for (let i = 0; i < resetValues.length; i++) {
        const resetValue = resetValues[i];
        countdownTimer(resetValue);
        
    };

    // ===== arranging the container well ========
    if (resetValues) {
        
        const setTImer = document.getElementById('set_timer');
        setTImer.innerText = `Reset Timer`;
        console.log('RESET TIMER');   
            
        const dateEl = document.getElementById('date');
        const resetArea = document.getElementById('reset_area');
        const stoppageCont = document.getElementById('stoppage_cont');

        resetArea.classList.add('hidden');
        resetEl.classList.remove('hidden');
        dateEl.classList.remove('hidden');
        stoppageCont.classList.add('row'); 
    
    }

    
    const reVal = JSON.stringify(resetValues);
    console.log(reVal);
    if(reVal == '[]') {
        console.log('Empty Local Storage');
        const setTImer = document.getElementById('set_timer');
        setTImer.innerText = `Set Timer`
        

        //=============
        const stoppageCont = document.getElementById('stoppage_cont');
        stoppageCont.classList.remove('row');
   };

     

};
setTimerFromLocalStorage(set = false);

function countdownTimer(resetValue){
    
    const stoppageDate = new Date(resetValue);
    const stoppage = JSON.stringify(stoppageDate)
    
    if(stoppage ===  'null'){
        console.log("Invalid Date !!! Please Enter Correct Date!!");
    }else{
        console.log(stoppage);
    }


    //========== RENDERING TIMER IN INTERVALS ================
    setInterval(() => {
        
        const currentDate = new Date();
        
        const totalSeconds = (stoppageDate - currentDate) / 1000;
        
        
        renderTimer(totalSeconds)
    }, 1000);

    function renderTimer (totalSeconds) {
        
        console.log(totalSeconds);

        if (totalSeconds < 0) {
            
            console.log('Invalid Date !!! Please Enter Correct Date!!');
                    

        } else if(totalSeconds > 0) {
                    
            const stoppageEl = document.getElementById('stoppage_date');
            stoppageEl.innerText = `Stoppage Date : ${resetValue.toUpperCase()}`;

            console.log('correct date');
                
            const days = Math.floor(totalSeconds / 3600 / 24 );
            const hours = Math.floor(totalSeconds / 3600) % 24;
            const minutes = Math.floor(totalSeconds / 60) % 60;
            const seconds = Math.floor(totalSeconds) %60;
            
            console.log(days,hours,minutes,seconds);

                
                
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hrs');
            const minutesEl = document.getElementById('mins');
            const secondsEl = document.getElementById('secs');
            
            daysEl.innerHTML = formatTime(days);
            hoursEl.innerHTML = formatTime(hours);
            minutesEl.innerHTML = formatTime(minutes);
            secondsEl.innerHTML = formatTime(seconds);
        };
        
    };


};
function formatTime(time){
    return time < 10 ? `0${time}` : time;
};


//  ============= local Storage =============
function getTimeLocalStorage(){
    const resetValues = JSON.parse(localStorage.getItem('resetValues'));
    return resetValues === null ? [] : resetValues;
};
function addTimeToLocalStorage (resetValue) {
    const resetValues = getTimeLocalStorage();
    localStorage.setItem('resetValues' ,JSON.stringify([...resetValues,resetValue]));
    if ([...resetValues].includes(resetValue)) {
        localStorage.setItem('resetValues' ,JSON.stringify([...resetValues]))
    }
};

function removeTimeFromLocalStorge(resetValue){
    const resetValues = getTimeLocalStorage();
    localStorage.setItem('resetValues', JSON.stringify( resetValues.filter((value) => value !== resetValue)));
};
















