const searchSong = () => {
    const songInput = document.getElementById("song-input").value;
    const url = `https://api.lyrics.ovh/suggest/${songInput}`

    fetch(url)
    .then(res => res.json())
    .then(data => songResults(data.data)
    )}


function songResults(songs){
const songContainer = document.getElementById("song-container");
songContainer.innerText = "";
const lyricsArea = document.getElementById("lyrics-area");
lyricsArea.innerText= "";
const errorMsg = document.getElementById("error-msg");
errorMsg.innerText= "";
songs.forEach(song => {
    const songResult = document.createElement("div");
    songResult.className = "single-result row align-items-center my-3 p-3"
    songResult.innerHTML= `
        <div class="col-md-9">
           <h3 class="lyrics-name">${song.title}</h3>
           <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls src="${song.preview}"></audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick= "getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    `;
    songContainer.appendChild(songResult);
})};


const getLyrics = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const res = await fetch(url)
    const data = await res.json()
    const lyrics = data.lyrics;
    if(lyrics === undefined){
        const lyricsArea = document.getElementById("lyrics-area");
        lyricsArea.innerText= " ";
        const showError = document.getElementById("error-msg");
        showError.innerText = 'Oops! Failed to load lyrics, Please try again later!!!';
    }
    else{
        const errorMsg = document.getElementById("error-msg");
        errorMsg.innerText= "";
        displayLyrics(data.lyrics);
    }
}

function displayLyrics(lyrics){
        const lyricsArea = document.getElementById("lyrics-area");
        lyricsArea.innerText = lyrics;
        
}