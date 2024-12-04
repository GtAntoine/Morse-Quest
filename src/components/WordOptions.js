export class WordOptions {
  constructor(container) {
    this.container = container;
    this.options = [];
    this.onSelect = null;
  }

  render(words, onSelect) {
    this.container.innerHTML = '';
    this.onSelect = onSelect;
    
    // Determine if we're in easy mode (4 letters) or normal mode (words)
    const isEasyMode = words.every(word => word.length === 1);
    this.container.className = `word-options ${isEasyMode ? 'easy-mode' : 'normal-mode'}`;
    
    words.forEach(word => {
      const button = document.createElement('button');
      button.className = 'word-option';
      button.textContent = word;
      button.addEventListener('click', () => this.handleSelect(word));
      this.container.appendChild(button);
    });
  }

  handleSelect(word) {
    if (this.onSelect) {
      this.onSelect(word);
    }
  }

  hide() {
    this.container.style.display = 'none';
  }

  show() {
    this.container.style.display = 'block';
  }
}