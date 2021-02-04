const currentPage = location.pathname
const menuItems = document.querySelectorAll(".itemLeftBar ul li a.selected")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

//modal create playlist
const modalOverlay = document.querySelector(".modalPageCreatePlaylist")
const criar = document.querySelector(".itemLeftBar.sectionMenuPlaylist ul li")
const close = document.querySelector(".close-modal")
const cancelar = document.querySelector(".modalPageCreatePlaylist .buttons .buttonCancelar")

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

const modalOverlayDetails = document.querySelector('.modalOverlayDetails')
const details = document.querySelector('#edit')
const closeModalDetails = document.querySelector('#closeModalDetails')

 details.addEventListener("click", function() {
    modalOverlayDetails.classList.add('active')
 })

 closeModalDetails.addEventListener("click", function() {
    modalOverlayDetails.classList.remove('active')
 })


//Playlist details 
const inputVisible = document.querySelectorAll(".inputVisible")
const borderInputVisible = document.querySelectorAll(".visible")

inputVisible.forEach(function (element){
    element.addEventListener("focus", function() {
        element.previousElementSibling.classList.add('active')
    })

    element.addEventListener("blur", function() {
        element.previousElementSibling.classList.remove('active')
    })
})

// Modal Delete Playlist 
const modalOverlayDeletePlaylist = document.querySelector(".modalPageDeletePlaylist")
const buttonDelete = document.querySelector("#delete")
const buttonCancelDelete = document.querySelector(".buttonCancelDelete")

buttonDelete.addEventListener("click", function(){
    modalOverlayDeletePlaylist.classList.add('active')
})

buttonCancelDelete.addEventListener("click", function(){
    modalOverlayDeletePlaylist.classList.remove('active')
})


const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 1,
    files:[],
    handleFileInput(event){
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event){
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }
    },
    getAllFiles() {
        const DataTransfer = new Clipboard("").ClipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image){
        const div = document.createElement('div')
        div.classList.add('photo')

        div.appendChild(image)

        return div
    }
}