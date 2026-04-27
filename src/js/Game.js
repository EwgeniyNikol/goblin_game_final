const GOBLIN_SHOW_TIME_MS = 1000;
const MAX_MISSES = 5;

export default class Game {
  constructor(board, goblin) {
    this.board = board;
    this.goblin = goblin;
    this.score = 0;
    this.misses = 0;
    this.activeCell = null;
    this.goblinTimer = null;
    this.isRunning = false;

    this.scoreEl = document.querySelector('.score');
    this.missesEl = document.querySelector('.misses');
    this.statusEl = document.querySelector('.status');
    this.startBtn = document.querySelector('.start-btn');

    this.startBtn.addEventListener('click', () => this.start());
    this.bindEvents();
  }

  updateUI() {
    this.scoreEl.textContent = this.score;
    this.missesEl.textContent = this.misses;
  }

  start() {
    this.reset();
    this.isRunning = true;
    this.startBtn.style.display = 'none';
    this.nextRound();
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.updateUI();
    this.statusEl.classList.remove('visible');
    this.goblin.hide();
    if (this.goblinTimer) clearTimeout(this.goblinTimer);
  }

  bindEvents() {
    this.board.cells.forEach((cell) => {
      cell.addEventListener('click', () => this.onCellClick(cell));
    });
  }

  onCellClick(cell) {
    if (!this.isRunning) return;
    if (cell === this.activeCell && this.goblin.element.parentElement) {
      this.score += 1;
      this.updateUI();
      this.goblin.hide();
      clearTimeout(this.goblinTimer);
      const excludedCell = this.activeCell;
      this.activeCell = null;
      this.nextRound(excludedCell);
    }
  }

  nextRound(excludeCell = null) {
    if (!this.isRunning) return;
    if (this.activeCell) {
      this.misses += 1;
      this.updateUI();
      if (this.misses >= MAX_MISSES) {
        this.gameOver();
        return;
      }
    }

    this.activeCell = this.board.getRandomCell(excludeCell || this.activeCell);
    this.goblin.showIn(this.activeCell);
    this.goblinTimer = setTimeout(() => this.nextRound(), GOBLIN_SHOW_TIME_MS);
  }

  gameOver() {
    this.isRunning = false;
    this.goblin.hide();
    this.statusEl.textContent = `Игра окончена! Счёт: ${this.score}`;
    this.statusEl.classList.add('visible');
    this.startBtn.textContent = 'Заново';
    this.startBtn.style.display = 'block';
  }
}
