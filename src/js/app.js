import Board from './Board.js';
import Goblin from './Goblin.js';
import Game from './Game.js';
import '../css/style.css';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.game-container');
  if (!container) {
    throw new Error('Элемент .game-container не найден в DOM');
  }

  const board = new Board(container);
  const goblin = new Goblin();
  const game = new Game(board, goblin);
  return game;
});
