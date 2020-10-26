const currentPage = location.pathname
const menuItems = document.querySelectorAll(".itemLeftBar ul li a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

const modalOverlay = document.querySelector(".modal-overlay")
const criar = document.querySelector(".itemLeftBar.sectionMenuPlaylist ul li")
const close = document.querySelector(".close-modal")

criar.addEventListener("click", function(){
    modalOverlay.classList.add('active')
})

close.addEventListener("click", function(){
    modalOverlay.classList.remove('active')
})

