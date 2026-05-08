/**
 * TypingAnimation — pure JS typing effect
 * Cycles through an array of strings with type/delete animation.
 */
class TypingAnimation {
  constructor(element, lines, opts = {}) {
    this.el = element;
    this.lines = lines;
    this.typeSpeed = opts.typeSpeed || 80;
    this.deleteSpeed = opts.deleteSpeed || 40;
    this.pauseTime = opts.pauseTime || 1800;
    this.lineIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.cursor = null;
    this._createCursor();
    this._tick();
  }

  _createCursor() {
    this.cursor = document.createElement('span');
    this.cursor.className = 'cursor';
    this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
  }

  setLines(newLines) {
    this.lines = newLines;
    this.lineIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.el.textContent = '';
  }

  _tick() {
    if (!this.lines.length) return;
    const current = this.lines[this.lineIndex];

    if (this.isDeleting) {
      this.charIndex--;
      this.el.textContent = current.substring(0, this.charIndex);
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.lineIndex = (this.lineIndex + 1) % this.lines.length;
        setTimeout(() => this._tick(), 400);
        return;
      }
      setTimeout(() => this._tick(), this.deleteSpeed);
    } else {
      this.charIndex++;
      this.el.textContent = current.substring(0, this.charIndex);
      if (this.charIndex === current.length) {
        setTimeout(() => {
          this.isDeleting = true;
          this._tick();
        }, this.pauseTime);
        return;
      }
      setTimeout(() => this._tick(), this.typeSpeed);
    }
  }
}
