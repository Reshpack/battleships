export default function Gameboard(rows = 10, cols = 10) {
    const gameboard = Array.from({ length: rows }, () => Array(cols).fill(null));
    const hitCoordinate = [];
    const missedAttacks = [];
  
    function isPathClear(shipLength, x, y, direction) {
      for (let i = 0; i < shipLength; i++) {
        if (direction === 'horizontal') {
          if (y + i >= cols || gameboard[x][y + i] !== null) return false;
        } else {
          if (x + i >= rows || gameboard[x + i][y] !== null) return false;
        }
      }
      return true;
    }
  
    function placeShip(ship, [x, y], direction = 'horizontal') {
      const shipLength = ship.length;
  
      // if target coordinate out of board or path has ship or ship length is too long for the board
      if (
        x < 0 || x >= rows || y < 0 || y >= cols ||
        (direction === 'horizontal' && y + shipLength > cols) ||
        (direction === 'vertical' && x + shipLength > rows) ||
        !isPathClear(shipLength, x, y, direction)
      ) return false;
  
      for (let i = 0; i < shipLength; i++) {
        if (direction === 'horizontal') {
          gameboard[x][y + i] = ship;
        } else {
          gameboard[x + i][y] = ship;
        }
      }
  
      return true;
    }
  
    function isHitBefore([x, y]) {
      return hitCoordinate.some(([hx, hy]) => hx === x && hy === y);
    }
  
    function isAllShipsSunk() {
      return gameboard.flat().every(cell => cell === null || cell === 'missed' || (cell instanceof Object && cell.isSunk()));
    }
  
    function receiveAttack([x, y]) {
      if (isHitBefore([x, y])) return 'hit before';
      if (typeof x !== 'number' || typeof y !== 'number') return 'NaN';
  
      hitCoordinate.push([x, y]);
  
      if (gameboard[x][y] === null) {
        gameboard[x][y] = 'missed';
        missedAttacks.push([x, y]);
        return 'missed';
      } else if (gameboard[x][y] instanceof Object) {
        gameboard[x][y].hit();
        return 'hit';
      }
    }
  
    return {
      gameboard,
      getMissedAttacks: () => missedAttacks,
      isHitBefore,
      isAllShipsSunk,
      placeShip,
      receiveAttack,
    };
  }