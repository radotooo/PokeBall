import { Container, Sprite, Text } from 'pixi.js';
import gsap from 'gsap';

const EVENTS = {
  OPEN_END: 'open_end',
  OPEN_START: 'open_start',
  CLOSE_END: 'close_end',
  CLOSE_START: 'close_start',
};

export default class Pokeball extends Container {
  constructor() {
    super();

    this.name = 'pokeball';

    this.text = this._createText();
    this.top = this._createSprite(0, -100, 0.5, 'ballTop');
    this.bottom = this._createSprite(0, 100, 0.5, 'ballBottom');
    this.isOpened = false;

    this._init();
  }

  static get events() {
    return EVENTS;
  }

  async open() {
    this.isOpened = true;
    this.emit(Pokeball.events.OPEN_START);

    gsap.to(this.top, { y: -220, duration: 0.5 });
    gsap.to(this.bottom, { y: 200, duration: 0.5 });

    this.text.alpha = 1;
    await this._shuffle();
    this.emit(Pokeball.events.OPEN_END);
  }

  close() {
    this.isOpened = false;
    this.text.alpha = 0;
    this.emit(Pokeball.events.CLOSE_START);

    gsap.to(this.top, { y: -100, duration: 0.5 });
    gsap.to(this.bottom, { y: 100, duration: 0.5 });
    this.emit(Pokeball.events.CLOSE_END);
  }

  /**
   * @private
   */
  _createSprite(x, y, anchor, texture) {
    const sprite = new Sprite.from(texture);
    sprite.anchor.set(anchor);
    sprite.x = x;
    sprite.y = y;

    return sprite;
  }

  /**
   * @private
   */
  _createText() {
    const text = new Text('temp', {
      fontSize: 200,
      fontStyle: 'bold',
      fill: 0xffffff,
    });
    text.anchor.set(0.5);
    text.alpha = 0;

    return text;
  }

  /**
   * @private
   */
  _setRandomText() {
    this.text.text = this.randomPockemons[
      Math.floor(Math.random() * this.randomPockemons.length)
    ];
  }

  /**
   * @description Shuffle pokemons in random order
   * @private
   */
  async _shuffle() {
    let prev = 0;

    const dummy = { value: 0 };
    const steps = gsap.to(dummy, {
      duration: 1,
      ease: 'steps(100)',
      value: 100,
      paused: true,
      onUpdate: () => {
        if (dummy.value !== prev) this._setRandomText();
        prev = dummy.value;
      },
    });

    await gsap.to(steps, {
      duration: 2,
      progress: 1,
      ease: 'circ.out',
    });
  }

  /**
   * @private
   */
  _init() {
    this.randomPockemons = ['Pickachu', 'Eevee', 'Snorlax', 'Ditto'];
    this.addChild(this.top, this.bottom, this.text);
  }
}
