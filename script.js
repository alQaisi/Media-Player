const audio=document.querySelector("audio")
const controlls=document.querySelectorAll("i");
const image=document.getElementById("image");
const title=document.getElementById("title");
const durationEL=document.getElementById("duration");
const currentTimeEL=document.getElementById("current-time");
const progress=document.getElementById('progress');
const progressContainer=document.getElementById("progress-container");
let current=0;
const musics=[
    {
        audio:"music/one.mp3",
        image:"url(img/one.jpeg)",
        title:"Electric Chill Machine"
    },
    {
        audio:"music/two.mp3",
        image:"url(img/two.jpeg)",
        title:"Seven Nation Army"
    },
    {
        audio:"music/three.mp3",
        image:"url(img/three.jpeg)",
        title:"Goodnight, Disco Queen"
    },
    {
        audio:"music/four.mp3",
        image:"url(img/four.jpeg)",
        title:"Front Row"
    }
];
const changeStatus=()=>{
    if(controlls[1].classList.contains('fa-pause-circle')){
        controlls[1].classList.replace("fa-pause-circle","fa-play-circle");
        controlls[1].setAttribute("title","play");
    }else{
        controlls[1].classList.replace("fa-play-circle","fa-pause-circle")
        controlls[1].setAttribute("title","pause");
    }
}
const musicStatus=()=>{
    if(controlls[1].classList.contains("fa-play-circle")){
        changeStatus();
        audio.play();
    }else{
        changeStatus();
        audio.pause();
    }
}
const changeMusic=(direction)=>{
    progress.style.width='0';
    controlls[1].classList.contains('fa-pause-circle')?changeStatus():undefined;
    if(direction==='next'){
        current!==musics.length-1?current++:current=0;
    }else{
        current!==0?current--:current=3;
    }
    audio.src=musics[current].audio;
    image.style.backgroundImage=musics[current].image;
    title.textContent=musics[current].title;
}
controlls[1].addEventListener('click',musicStatus);
controlls[0].addEventListener('click',changeMusic);
controlls[2].addEventListener('click',changeMusic.bind(this,'next'));
audio.addEventListener('timeupdate',()=>{
    const {currentTime,duration}=audio;
    let progressPercent=Math.round(currentTime/duration*100);
    const durationMinutes=Math.floor(duration/60);
    let durationSeconds=Math.floor(duration%60);
    progress.style.width=`${progressPercent}%`;
    if(durationSeconds<10)
        durationSeconds=`0${durationSeconds}`
    if(controlls[1].classList.contains("fa-pause-circle")){
        durationEL.textContent=durationMinutes+":"+durationSeconds;
    }
    if(duration){
        durationEL.textContent=`${durationMinutes}:${durationSeconds}`
    }else{
        currentTimeEL.textContent="0:00";
        durationEL.textContent="0:00";
    }
    const currentMinutes=Math.floor(currentTime/60);
    let currentSeconds=Math.floor(currentTime%60);
    progress.style.width=`${progressPercent}%`;
    if(currentSeconds<10)
        currentSeconds=`0${currentSeconds}`
    currentTimeEL.textContent=`${currentMinutes}:${currentSeconds}`;
})
audio.addEventListener('ended',()=>{
    changeMusic('next');
})
progressContainer.addEventListener('click',function(event){
    const width=this.clientWidth;
    const {offsetX}=event;
    const percentage=Math.round(offsetX/width*100);
    progress.style.width=`${percentage}%`;
    if(controlls[1].classList.contains("fa-play-circle"))
        musicStatus();
    const {duration}=audio;
    audio.currentTime=percentage*duration/100;
})