// .then(function(res){
//     res.json()
// })

// .then((res) => {
//     res.json()
// })

// .then(changeResponse)

// function changeResponse(res){
//     return res.json()
// }

const BASE_URL = `https://api.imgflip.com/get_memes`


function fetchMemes(){
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
        data.data.memes.forEach(renderMeme)
    })
}


function renderMeme(meme){
    const memeContainer = document.getElementById("meme-list")
    const liTag = document.createElement('li')

    const imageTag = document.createElement('img')
    imageTag.src = meme.url 

    const pTag = document.createElement('p')
    pTag.innerText = meme.name 

    liTag.append(imageTag, pTag)

    memeContainer.appendChild(liTag)

}

fetchMemes()