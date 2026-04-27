const BOARD_SIZE = 4;
const CELL_COUNT = BOARD_SIZE ** 2;

export default class Board {
  constructor(container) {
    this.container = container;
    this.cells = [];
    this.create();
  }

  create() {
    this.container.innerHTML = '';
    for (let i = 0; i < CELL_COUNT; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      this.container.append(cell);
      this.cells.push(cell);
    }
  }

  getRandomCell(excludeCell = null) {
    let cell;
    do {
      cell = this.cells[Math.floor(Math.random() * this.cells.length)];
    } while (cell === excludeCell && this.cells.length > 1);
    return cell;
  }
}
