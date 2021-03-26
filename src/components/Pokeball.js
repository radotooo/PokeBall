import { Container, Sprite, Text } from 'pixi.js';
import gsap from 'gsap';

const EVENTS = {
  OPEN_END: 'open_end',
  OPEN_START: 'open_start',
  CLOSE_END: 'close_end',
  CLOSE_START: 'close_start',
};

/**
 * Initializes a new instance of Pokeball
 * @class
 * @extends {PIXI.Container}
 */
export default class Pokeball extends Container {
  constructor() {
    super();

    this.name = 'pokeball';
    this.top = null;
    this.bottom = null;
    this.text = null;
    this.isOpened = false;
    this.randomPockemons = ['Pickachu', 'Eevee', 'Snorlax', 'Ditto'];

    this._init();
  }

  /**
   * @private
   */
  _init() {
    this._createBody();
    this._createText();
  }

  /**
   * @private
   */
  _createBody() {
    const top = new Sprite.from('ballTop');

    top.anchor.set(0.5);
    top.y = -100;
    this.top = top;
    const bottom = new Sprite.from('ballBottom');

    bottom.anchor.set(0.5);
    bottom.y = 100;
    this.bottom = bottom;

    this.addChild(this.top, this.bottom);
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

    this.text = text;
    this.addChild(this.text);
  }

  static get events() {
    return EVENTS;
  }

  /**
   * @public
   */
  async open() {
    this.isOpened = true;
    this.emit(Pokeball.events.OPEN_START);

    gsap.to(this.top, { y: -220, duration: 0.5 });
    gsap.to(this.bottom, { y: 200, duration: 0.5 });

    this.text.alpha = 1;
    await this._shuffle();
    this.emit(Pokeball.events.OPEN_END);
  }

  /**
   * @public
   */
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
      duration: 5,
      progress: 1,
      ease: 'circ.out',
    });
  }
}
