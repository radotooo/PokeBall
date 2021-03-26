import { Container, Graphics, Text } from 'pixi.js';
import gsap from 'gsap/all';

/**
 * Initializes a new instance of Button
 * @class
 * @extends {PIXI.Container}
 */
export default class Button extends Container {
  /**
   * @param {Number} x The button x coordinate value
   * @param {Number} y The button y coordinate value
   */
  constructor(x, y) {
    super();

    this.name = 'button';

    this.x = x;
    this.y = y;
    this.interactive = true;
    this.buttonMode = true;

    this._init();
  }

  /**
   * @private
   */
  _init() {
    this._createBackground();
    this._createText();
  }

  /**
   * @private
   */
  _createBackground() {
    const bg = new Graphics();

    bg.beginFill(0xe90000);
    bg.drawRect(0, 0, 240, 70);
    bg.endFill();

    this._bg = bg;
    this.addChild(this._bg);
  }

  /**
   * @private
   */
  _createText() {
    const text = new Text('THROW BALL', {
      fontFamily: 'Ubuntu',
      fontSize: 20,
      fontStyle: 'bold',
      fill: 0xffffff,
    });

    text.anchor.set(0.5);
    text.x = this._bg.width / 2;
    text.y = this._bg.height / 2;

    this._bg.addChild(text);
  }

  /**
   * @public
   */
  show() {
    gsap.to(this, { alpha: 1, duration: 0.1 });
  }

  /**
   * @public
   */
  hide() {
    gsap.to(this, { alpha: 0, duration: 0.1 });
  }
}
