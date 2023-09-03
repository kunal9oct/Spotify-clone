console.log("Welcome to Spotify")

// Initialize the Variables
let songIndex = 0;

// audioElement.play();
let audioElement = new Audio('audios/1.mp3')

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
   {songName:"Way Down We Go", filepath:"audios/1.mp3", coverPath: "images/cover1.jpg"},
   {songName:"Chaudhary - Mane Khan", filepath:"audios/2.mp3", coverPath: "images/cover2.png"},
   {songName:"Dil NaDiya - Krrish", filepath:"audios/3.mp3", coverPath: "images/cover3.jpg"},
   {songName:"Suno Suno Saanware Ki", filepath:"audios/4.mp3", coverPath: "images/cover4.jpg"},
   {songName:"Heeriye - Arijit Singh", filepath:"audios/5.mp3", coverPath: "images/cover5.jpg"},
]

songItems.forEach((element, i)=>{
	element.getElementsByTagName("img")[0].src = songs[i].coverPath;
	element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
	if(audioElement.paused || audioElement.currentTime<=0){
		audioElement.play();
		masterPlay.classList.remove('fa-play-circle');
		masterPlay.classList.add('fa-pause-circle');
		gif.style.opacity = 1;
	}
	else{
		audioElement.pause();
		masterPlay.classList.remove('fa-pause-circle');
		masterPlay.classList.add('fa-play-circle');
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
	audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
	Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
       element.classList.remove('fa-pause-circle');
       element.classList.add('fa-play-circle');
	})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
     element.addEventListener('click', (e)=>{
     makeAllPlays();
     songIndex = parseInt(e.target.id);
     e.target.classList.remove('fa-play-circle');
     e.target.classList.add('fa-pause-circle');
     audioElement.src = songs[songIndex].filepath;
     masterSongName.innerText = songs[songIndex].songName;
     audioElement.currentTime = 0;
     audioElement.play();
     gif.style.opacity = 1;
     masterPlay.classList.remove('fa-play-circle');
     masterPlay.classList.add('fa-pause-circle');
     })
})

document.getElementById('next').addEventListener('click', ()=>{
   if(songIndex>=4){
      songIndex = 0;
   }
   else{
      songIndex += 1;
   }
   audioElement.src = 'audios/3.mp3';
   masterSongName.innerText = songs[songIndex].songName;
   audioElement.currentTime = 0;
   audioElement.play();
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
   if(songIndex<=0){
      songIndex = 0;
   }
   else{
      songIndex -= 1;
   }
   audioElement.src = 'audios/2.mp3';
   masterSongName.innerText = songs[songIndex].songName;
   audioElement.currentTime = 0;
   audioElement.play();
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
})