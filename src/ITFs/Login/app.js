const sign_in_btn = document.querySelector('#sign-in-btn')
const sign_up_btn = document.querySelector('#sign-up-btn')
const container_itss = document.querySelector('.container_itss')

sign_up_btn.addEventListener('click', () => {
  container_itss.classList.add('sign-up-mode')
})

sign_in_btn.addEventListener('click', () => {
  container_itss.classList.remove('sign-up-mode')
})
