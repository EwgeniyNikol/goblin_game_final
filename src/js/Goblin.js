import goblinImg from '../img/goblin.png';

export default class Goblin {
  constructor() {
    this.element = document.createElement('img');
    this.element.src = goblinImg;
    this.element.classList.add('goblin');
    this.element.alt = 'goblin';
  }

  showIn(cell) {
    cell.append(this.element);
  }

  hide() {
    if (this.element.parentElement) {
      this.element.remove();
    }
  }
}
