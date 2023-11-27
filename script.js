console.log("MUSIS PiLLS");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let forward = document.getElementById('forward')
let backward = document.getElementById('backward')
let repeat = document.getElementById('repeat')

let songs = [
    {songName: "BACHKE BACHKE", filePath: "songs/1.mp3", coverPath: "covers/f1.jpg"},
    {songName: "ADMIRIN YOU", filePath: "songs/2.mp3", coverPath: "covers/f2.jpg"},
    {songName: "52 BAR", filePath: "songs/3.mp3", coverPath: "covers/ft.jpg"},
    {songName: "ON TOP", filePath: "songs/4.mp3", coverPath: "covers/f5.jpg"},
    {songName: "P.O.V", filePath: "songs/5.mp3", coverPath: "covers/f6.jpg"},
    {songName: "TRY ME", filePath: "songs/6.mp3", coverPath: "covers/f3.jpg"},
    {songName: "W.Y.T.H", filePath: "songs/7.mp3", coverPath: "covers/f4.jpg"},
    {songName: "YEAH NAAH", filePath: "songs/8.mp3", coverPath: "covers/fr.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
Play.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        Play.classList.remove('fa-circle-play');
        Play.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        Play.classList.remove('fa-circle-pause');
        Play.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('forward').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

})

document.getElementById('backward').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

})


