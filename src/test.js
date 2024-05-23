import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';

import {describe, expect, it} from "vitest";


describe('Ship', () => {
  it('initializes with correct length and hit count', () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.getHitCount()).toBe(0);
  });

  it('hit method increments hit count', () => {
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

  it('isSunk method works correctly', () => {
    const ship = Ship(2);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  it('with length 0 is considered sunk', () => {
    const ship = Ship(0);
    expect(ship.isSunk()).toBe(true);
    expect(ship.getHitCount()).toBe(0);
    ship.hit();
    expect(ship.getHitCount()).toBe(0);
  });
});

//Gameboard tests

describe('Gameboard', () => {
  it('initializes with correct dimensions', () => {
    const gameboard = new Gameboard(10, 10);
    expect(gameboard.gameboard.length).toBe(10);
    expect(gameboard.gameboard[0].length).toBe(10);
  });

  it('places ship horizontally', () => {
    const gameboard = new Gameboard(10, 10);
    const ship = { length: 3 };
    const result = gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(result).toBe(true);
  });

  it('places ship vertically', () => {
    const gameboard = new Gameboard(10, 10);
    const ship = { length: 3 };
    const result = gameboard.placeShip(ship, [0, 0], 'vertical');
    expect(result).toBe(true);
  });

  it('returns false if ship placement is out of bounds', () => {
    const gameboard = new Gameboard(10, 10);
    const ship = { length: 3 };
    const result = gameboard.placeShip(ship, [9, 9], 'horizontal');
    expect(result).toBe(false);
  });

  it('returns false if ship placement overlaps with existing ship', () => {
    const gameboard = new Gameboard(10, 10);
    const ship1 = { length: 3 };
    const ship2 = { length: 2 };
    gameboard.placeShip(ship1, [0, 0], 'horizontal');
    const result = gameboard.placeShip(ship2, [0, 1], 'horizontal');
    expect(result).toBe(false);
  });

  it('registers hit on ship', () => {
    const gameboard = new Gameboard(10, 10);
    const ship = { length: 3, hit: () => {} }; 
    const hitMock = () => { ship.hitCalled = true; }; 
    ship.hit = hitMock; 
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    const result = gameboard.receiveAttack([0, 0]);
    expect(result).toBe('hit');
    expect(ship.hitCalled).toBe(true); 
  });

  it('registers missed attack', () => {
    const gameboard = new Gameboard(10, 10);
    const result = gameboard.receiveAttack([0, 0]);
    expect(result).toBe('missed');
  });

  it('returns "hit before" if coordinate has been hit before', () => {
    const gameboard = new Gameboard(10, 10);
    gameboard.receiveAttack([0, 0]);
    const result = gameboard.receiveAttack([0, 0]);
    expect(result).toBe('hit before');
  });

  it('returns "NaN" if attack coordinates are not numbers', () => {
    const gameboard = new Gameboard(10, 10);
    const result = gameboard.receiveAttack(['a', 'b']);
    expect(result).toBe('NaN');
  });

  it('checks if all ships are sunk', () => {
    const gameboard = new Gameboard(10, 10);
    const ship = { length: 1, isSunk: () => true };
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    const result = gameboard.isAllShipsSunk();
    expect(result).toBe(true);
  });

  it('returns missed attacks', () => {
    const gameboard = new Gameboard(10, 10);
    gameboard.receiveAttack([0, 0]);
    const result = gameboard.getMissedAttacks();
    expect(result).toEqual([[0, 0]]);
  });
});