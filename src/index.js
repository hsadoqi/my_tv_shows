const BASE_URL = `https://api.imgflip.com/get_memes`

// fetches data
function fetchMemes(){
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
        data.data.memes.forEach(renderMeme)
    })

}

// renders a single meme to the page
function renderMeme(meme){
    const memeContainer = document.getElementById("meme-list")
    const liTag = document.createElement('li')

    const aTag = document.createElement('a')
    aTag.href = '#'
    aTag.innerText = meme.name 


    aTag.addEventListener("click", () => {
        memeContainer.innerHTML = ""
        const imageTag = document.createElement('img')
        imageTag.src = meme.url 

        const allMemesBtn = document.createElement('button')
        allMemesBtn.innerText = "All Memes"
    
        allMemesBtn.addEventListener("click", () => {
            memeContainer.innerHTML = ''
            fetchMemes()
        })
    
        memeContainer.append(allMemesBtn, imageTag)
    })

    liTag.appendChild(aTag)

    memeContainer.appendChild(liTag)
}



function init(){
    const commentForm = document.getElementById('comment-form')
    const commentInput = document.getElementById('comment-input')

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault()
        renderComment(commentInput.value)
        postComment(commentInput.value)
        e.target.reset()
    })

    const logInBtn = document.getElementById('log-in')

    logInBtn.addEventListener("click", logInPage)
    fetchMemes()
    fetchComments()
}

function fetchComments(){
    fetch(`http://localhost:3000/comments`)
    .then(res => res.json())
    .then(comments => comments.forEach(comment => {
        renderComment(comment.content)
    }))
}

function renderComment(comment){
    const commentList = document.getElementById('comment-list')
    const li = document.createElement('li')
    li.innerText = comment
    commentList.append(li)
}


function postComment(comment){
    fetch(`http://localhost:3000/comments`, {
        method: "POST", 
        headers: {
            "Content-type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            content: comment
        })
    })
}


function logInPage(){
    const mainContainer = document.getElementById("main")
    mainContainer.innerHTML = ""

    const logInForm = document.createElement('form')
    logInForm.innerHTML += `
    <label>Username</label>
    <input type="text">
    <label>Password</label>
    <input type="text">
    <input type="submit">`

    logInForm.addEventListener("submit", logInUser)
    mainContainer.append(logInForm)
}

function logInUser(e){
    e.preventDefault()
    const username = e.target.children[1].value
    const password = e.target.children[3].value

    fetch(`http://localhost:3000/users?name=${username}&password=${password}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.length === 0){
            alert('try again buddy')
        } else {
            console.log(`Welcome ${data[0].name}!`)
        }
    })
}

init()







// const pTag = document.createElement('p')
// pTag.innerText = meme.name 