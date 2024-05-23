import './styles/main.scss'
import './styles/responsive.scss'


const gameBoardCont = document.querySelector('#gameboard-container')
const optionCont = document.querySelector('.option-container');
const flipBtn = document.querySelector('#flip-button');
flipBtn.addEventListener('click', flip)

// Options
let angle = 0;
function flip() {
const optionShips = Array.from(optionCont.children);
    angle = angle === 0 ? 90 : 0;
    optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`);
};

// Creating Boards
const width = 10;

function createBoard(user) {
    const gameBoardContainer = document.createElement('div');
    gameBoardContainer.classList.add('game-board');
    //gameBoardContainer.style.backgroundColor = 'pink'; see if theres a hover option createBoard(color, user)  createBoard('yellow')
    gameBoardContainer.id = user;

    for (let i = 0; i < width * width; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = i;
        gameBoardContainer.append(block);
    }

    gameBoardCont.append(gameBoardContainer);

}

createBoard('player')
createBoard('computer')