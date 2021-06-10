let list = document.querySelectorAll('li')
list[0].addEventListener('click',()=>{
    window.location.href = "http://localhost:8000";
})

list[1].addEventListener('click',()=>{
    window.location.href = "http://localhost:8000/create";
})

list[2].addEventListener('click',()=>{
    window.location.href = "http://localhost:8000/show";
})