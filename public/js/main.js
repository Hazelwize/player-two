const updateButton = document.querySelectorAll('.updateBtn')
const deleteButton = document.querySelectorAll('.deleteBtn')
const logoutBtn = document.querySelector('.logoutBtn')
//userIconClicked
const userIcon = document.getElementById('userIcon')
const hiddenMenu = document.getElementById('menuSection')

Array.from(updateButton).forEach(e => e.addEventListener('click', updateHours))
Array.from(deleteButton).forEach(e => e.addEventListener('click', deleteGame))
logoutBtn.addEventListener('click', logoutUser)
userIcon.addEventListener('click', menuAnimation);

function menuAnimation(){
    hiddenMenu.classList.toggle('hidden')
    userIcon.classList.toggle('userIconClicked')
}


async function logoutUser(){
    try{
        const response = await fetch('/user/logout',{
            method: 'post',
        })
        const data = response.json()
        console.log(data)
        window.location.replace("/")
    }
    catch(err){
        console.log(err)
    }
}
async function updateHours(){
    const gameName = this.parentNode.dataset.name
    const hours = this.previousElementSibling.value
    try{
        const response = await fetch('/user/updateHours',{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'gameToUpdate': gameName,
                'updatedHours': hours,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload(true)
    }
    catch(err){
        console.log(err)
    }
}

async function deleteGame(){
    const gameName = this.parentNode.parentNode.dataset.name
    try{
        const response = await fetch('/user/delete-game',{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'gameToDelete': gameName,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload(true)
    }
    catch(err){
        console.log(err)
    }
}