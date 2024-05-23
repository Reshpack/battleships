import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';


test('Ship initializes with correct length and hit count', () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.getHitCount()).toBe(0);
});

test('Ship hit method increments hit count', () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.getHitCount()).toBe(1);
    ship.hit();
    expect(ship.getHitCount()).toBe(2);
    ship.hit();
    expect(ship.getHitCount()).toBe(3);
    // Further hits should not increase hit count
    ship.hit();
    expect(ship.getHitCount()).toBe(3);
});

test('Ship isSunk method works correctly', () => {
    const ship = Ship(2);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

//Gameboard tests

test('Gameboard initializes correctly', () => {
    const gameboard = Gameboard(10, 10);
    expect(gameboard.gameboard.length).toBe(10);
    expect(gameboard.gameboard[0].length).toBe(10);
  });
  
  test('Place ship on the gameboard', () => {
    const gameboard = Gameboard(10, 10);
    const ship = Ship(3);
    expect(gameboard.placeShip(ship, [0, 0], 'horizontal')).toBe(true);
    expect(gameboard.gameboard[0][0]).toBe(ship);
    expect(gameboard.gameboard[0][1]).toBe(ship);
    expect(gameboard.gameboard[0][2]).toBe(ship);
  });
  
  test('Place ship out of bounds', () => {
    const gameboard = Gameboard(10, 10);
    const ship = Ship(3);
    expect(gameboard.placeShip(ship, [0, 8], 'horizontal')).toBe(false);
    expect(gameboard.placeShip(ship, [8, 0], 'vertical')).toBe(false);
  });
  
  test('Receive attack and hit ship', () => {
    const gameboard = Gameboard(10, 10);
    const ship = Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.receiveAttack([0, 0])).toBe('hit');
    expect(ship.getHitCount()).toBe(1);
  });
  
  test('Receive attack and miss', () => {
    const gameboard = Gameboard(10, 10);
    expect(gameboard.receiveAttack([0, 0])).toBe('missed');
    expect(gameboard.getMissedAttacks().length).toBe(1);
  });
  
  test('All ships sunk', () => {
    const gameboard = Gameboard(10, 10);
    const ship = Ship(1);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.isAllShipsSunk()).toBe(true);
  });

// Player tests
test('Player initializes correctly', () => {
    const player = Player('Alice');
    expect(player.name).toBe('Alice');
    expect(player.type).toBe('player');
    expect(player.gameboard).toBeDefined();
  });
  
  test('Computer makes valid moves', () => {
    const computer = Player('AI', 'computer');
    const opponentGameboard = Gameboard();
  
    const ship = Ship(2);
    opponentGameboard.placeShip(ship, [0, 0], 'horizontal');
  
    let moveResult = computer.makeMove(opponentGameboard);
    expect(['hit', 'missed']).toContain(moveResult);
  
    moveResult = computer.makeMove(opponentGameboard);
    expect(['hit', 'missed']).toContain(moveResult);
  });
  
  test('Player makes specified moves', () => {
    const player = Player('Alice');
    const opponentGameboard = Gameboard();
  
    const ship = Ship(2);
    opponentGameboard.placeShip(ship, [0, 0], 'horizontal');
  
    let moveResult = player.makeMove(opponentGameboard, [0, 0]);
    expect(moveResult).toBe('hit');
  
    moveResult = player.makeMove(opponentGameboard, [1, 1]);
    expect(moveResult).toBe('missed');
  });