const userIcon = document.getElementById('userIcon')
const hiddenMenu = document.getElementById('menuSection')

userIcon.addEventListener('click', menuAnimation);

function menuAnimation(){
    hiddenMenu.classList.toggle('popUp')
    userIcon.classList.toggle('slideLeft')
}

