import ReactDom from 'react-dom' //test 20221114
import { App } from './App'
import './common/common.css'
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then((registration) => {
      console.log('sw.js Registered')
      console.log(registration)
    })
    .catch((err) => {
      console.log('sw.js NOT registered', err)
    })
}

window.addEventListener('beforeinstallprompt',(event) =>{
  
  event.preventDefault();
  window.defferedPrompt=event;
  return false;
  
})


ReactDom.render(<App />, document.getElementById('root'))
