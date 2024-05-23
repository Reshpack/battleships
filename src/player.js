import Gameboard from './gameboard';

export default function Player(name, type = 'player') {
  const gameboard = Gameboard();

  function randomCoordinate() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }

  function makeMove(opponentGameboard, coordinate = null) {
    if (type === 'computer') {
      // Computer makes a random move
      let move;
      do {
        move = randomCoordinate();
      } while (opponentGameboard.isHitBefore(move));
      return opponentGameboard.receiveAttack(move);
    } else if (type === 'player' && coordinate) {
      // Real player makes a specified move
      return opponentGameboard.receiveAttack(coordinate);
    }
    return null;
  }

  return {
    name,
    type,
    gameboard,
    makeMove,
  };
}