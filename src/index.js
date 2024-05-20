import './styles/main.scss'
import './styles/title.css'

import backgroundImage from './assets/stars.png'; // Adjust the path to your image

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.backgroundImage = `url(${backgroundImage})`;
});