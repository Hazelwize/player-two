const updateButton = document.querySelectorAll('.updateBtn')
const deleteButton = document.querySelectorAll('.deleteBtn')

Array.from(updateButton).forEach(e => e.addEventListener('click', updateHours))
Array.from(deleteButton).forEach(e => e.addEventListener('click', deleteGame))


console.log(updateButton)


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