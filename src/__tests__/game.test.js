import Board from '../js/Board.js';
import Goblin from '../js/Goblin.js';
import Game from '../js/Game.js';

describe('Goblin Game Final', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="game-container"></div>
      <div class="scoreboard">
        <b class="score">0</b>
        <b class="misses">0</b>
      </div>
      <div class="status"></div>
      <button class="start-btn">Начать игру</button>
    `;
    container = document.querySelector('.game-container');
  });

  test('Board создаёт 16 ячеек', () => {
    const board = new Board(container);
    expect(board.cells.length).toBe(16);
  });

  test('Goblin создаёт элемент с классом goblin', () => {
    const goblin = new Goblin();
    expect(goblin.element.classList.contains('goblin')).toBe(true);
  });

  test('Game не запускается без нажатия кнопки', () => {
    const board = new Board(container);
    const goblin = new Goblin();
    const game = new Game(board, goblin);
    expect(game.isRunning).toBe(false);
  });

  test('Game.start() запускает игру', () => {
    const board = new Board(container);
    const goblin = new Goblin();
    const game = new Game(board, goblin);
    game.start();
    expect(game.isRunning).toBe(true);
  });
});
