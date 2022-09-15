// const logoutBtn = document.getElementById('logoutBtn')
const userIcon = document.getElementById('userIcon')
const hiddenMenu = document.getElementById('menuSection')

// logoutBtn.addEventListener('click', logoutUser)
userIcon.addEventListener('click', menuAnimation);

function menuAnimation(){
    hiddenMenu.classList.toggle('popUp')
    userIcon.classList.toggle('slideLeft')
}


// async function logoutUser(){
//     try{
//         const response = await fetch('/user/logout',{
//             method: 'post',
//         })
//         const data = response.json()
//         console.log(data)
//         window.location.replace("/")
//     }
//     catch(err){
//         console.log(err)
//     }
// }

