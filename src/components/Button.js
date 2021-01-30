import { Container, Graphics, Text } from 'pixi.js';

export default class Button extends Container {
  constructor() {
    super();

    this.name = 'button';

    this.x = -100;
    this.y = 240;

    this.width = 50;

    this.interactive = true;
    this.buttonMode = true;

    this._init();
  }

  show() {
    this.alpha = 1;
  }

  hide() {
    this.alpha = 0;
  }

  /**
   * @private
   */
  _init() {
    const button = new Graphics();
    button.beginFill(0xe90000);
    button.drawRect(0, 0, 240, 70);
    button.endFill();

    const text = new Text('THROW BALL', {
      fontFamily: 'Ubuntu',
      fontSize: 20,
      fontStyle: 'bold',
      fill: 0xffffff,
    });
    text.anchor.set(0.5);
    text.x = button.width / 2;
    text.y = button.height / 2;

    button.addChild(text);
    this.addChild(button);
  }
}
