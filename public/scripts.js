const currentPage = location.pathname
const menuItems = document.querySelectorAll(".itemLeftBar ul li a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

//modal create playlist
const modalOverlay = document.querySelector(".modal-overlay")
const criar = document.querySelector(".itemLeftBar.sectionMenuPlaylist ul li")
const close = document.querySelector(".close-modal")
const cancelar = document.querySelector(".modal-overlay .buttons .buttonCancelar")

criar.addEventListener("click", function(){
    modalOverlay.classList.add('active')
})

close.addEventListener("click", function(){
    modalOverlay.classList.remove('active')
})

cancelar.addEventListener("click", function(){
    modalOverlay.classList.remove('active')
})


//redirect playlist id
const cards = document.querySelectorAll(".card")

for (let card of cards){
    card.addEventListener("click", function(){
        const ID = card.getAttribute("id")
        location.href=`/playlist/${ID}`
    })
}


const menuPlaylist = document.querySelector('.main .buttons #more')
const modalMenu = document.querySelector('.modal-overlay-playlist')
const body = document.querySelector('body')

menuPlaylist.addEventListener("click", function(){
    modalMenu.classList.add('active')
})

modalMenu.addEventListener("click", function(){
    modalMenu.classList.remove('active') 
})

const modalDetails = document.querySelector('.modalOverlayDetails')
const details = document.querySelector('#edit')

 details.addEventListener("click", function() {
    modalDetails.classList.add('active')
 })

//  modalDetails.addEventListener("click", function() {
//      modalDetails.classList.remove('active')
//  })