const requestUrl = 'http://jsonplaceholder.typicode.com/posts';

const postsWrapper = document.getElementById("posts-wrapper"),
      btnCriet = document.getElementById("btnCriet"),
      btnUpdeit = document.getElementById("btnUpdeit");

let btnsDelete;
let posts =[];

const createTemplate = data => {
    return template = `
        <div class="wraper-post" data-id="${data.id}">
            <div class="id"> ID: ${data.id}</div>
            <div class="title"> title: ${data.title}</div>
            <div class="body"> title: ${data.body}</div>
            <button class="btnDelete" data-id="${data.id}">Удалить</button>
        </div>
    `
};

const getPosts = url => {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            posts = json;
            posts.filter(item =>{
                return item.id >= 50 && item.id <= 60
            }).forEach(post => {
                postsWrapper.innerHTML += createTemplate(post)
            });
            btnsDelete = document.querySelectorAll('.btnDelete');
        })
        .then(() => {
            for(elem of btnsDelete) {
                elem.addEventListener('click', e => {
                    const idElem = e.target.dataset.id;
                    deletePost(requestUrl, idElem);
                })
            } 
        })
}

const deletePost = (url, id) => {
    fetch(url + "/" + id, {
        method: 'DELETE'
      })
}

getPosts(requestUrl)

const createPost = url => {
    let inputTitle = document.getElementById("title").value,
        inputBody = document.getElementById("body").value,
        inputUserId = document.getElementById("userId").value

    let createObject = {
        title: inputTitle,
        body: inputBody,
        userId: inputUserId
    }

    fetch(url, {
    method: 'POST',
    body: JSON.stringify(createObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
}

btnCriet.addEventListener('click', e => {
    e.preventDefault();
    createPost(requestUrl)
})

const updeitPost = url =>{
    let inputTitleUpdeit = document.getElementById("titleUpdeit").value,
        inputBodyUpdeit = document.getElementById("bodyUpdeit").value,
        inputUserIdUpdeit = document.getElementById("userIdUpdeit").value,
        inputidPost = document.getElementById("idPost").value

    let updeitObject = {
        id: inputidPost,
        title: inputTitleUpdeit,
        body: inputBodyUpdeit,
        userId: inputUserIdUpdeit,
    }
    
    fetch(url + '/' + inputidPost, {
    method: 'PUT',
    body: JSON.stringify(updeitObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
}

btnUpdeit.addEventListener('click', e => {
    e.preventDefault();
    updeitPost(requestUrl)
});


var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=c3bf4747d8a6471dba4a9a30cb50664f';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log(response.json());
    })
