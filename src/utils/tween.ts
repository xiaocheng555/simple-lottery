// 来源：https://www.cnblogs.com/brainworld/p/7240564.html

// pos: 进度（0-1）
// return: 当前进度对应的距离
const tween = {
  easeInQuad: function(pos: number) {
    return Math.pow(pos, 2);
  },

  easeOutQuad: function (pos: number) {
    return -(Math.pow((pos - 1), 2) - 1);
  },

  easeInOutQuad: function (pos: number) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2);
    return -0.5 * ((pos -= 2) * pos - 2);
  },

  easeInCubic: function (pos: number) {
    return Math.pow(pos, 3);
  },

  easeOutCubic: function (pos: number) {
    return (Math.pow((pos - 1), 3) + 1);
  },

  easeInOutCubic: function (pos: number) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
    return 0.5 * (Math.pow((pos - 2), 3) + 2);
  },

  easeInQuart: function (pos: number) {
    return Math.pow(pos, 4);
  },

  easeOutQuart: function (pos: number) {
    return -(Math.pow((pos - 1), 4) - 1)
  },

  easeInOutQuart: function (pos: number) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
  },

  easeInQuint: function (pos: number) {
    return Math.pow(pos, 5);
  },

  easeOutQuint: function (pos: number) {
    return (Math.pow((pos - 1), 5) + 1);
  },

  easeInOutQuint: function (pos: number) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 5);
    return 0.5 * (Math.pow((pos - 2), 5) + 2);
  },

  easeInSine: function (pos: number) {
    return -Math.cos(pos * (Math.PI / 2)) + 1;
  },

  easeOutSine: function (pos: number) {
    return Math.sin(pos * (Math.PI / 2));
  },

  easeInOutSine: function (pos: number) {
    return (-.5 * (Math.cos(Math.PI * pos) - 1));
  },

  easeInExpo: function (pos: number) {
    return (pos == 0) ? 0 : Math.pow(2, 10 * (pos - 1));
  },

  easeOutExpo: function (pos: number) {
    return (pos == 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
  },

  easeInOutExpo: function (pos: number) {
    if (pos == 0) return 0;
    if (pos == 1) return 1;
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
    return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
  },

  easeInCirc: function (pos: number) {
    return -(Math.sqrt(1 - (pos * pos)) - 1);
  },

  easeOutCirc: function (pos: number) {
    return Math.sqrt(1 - Math.pow((pos - 1), 2))
  },

  easeInOutCirc: function (pos: number) {
    if ((pos /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - pos * pos) - 1);
    return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
  },

  easeOutBounce: function (pos: number) {
    if ((pos) < (1 / 2.75)) {
      return (7.5625 * pos * pos);
    } else if (pos < (2 / 2.75)) {
      return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
    } else if (pos < (2.5 / 2.75)) {
      return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
    } else {
      return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
    }
  },

  easeInBack: function (pos: number) {
    var s = 1.70158;
    return (pos) * pos * ((s + 1) * pos - s);
  },

  easeOutBack: function (pos: number) {
    var s = 1.70158;
    return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
  },

  easeInOutBack: function (pos: number) {
    var s = 1.70158;
    if ((pos /= 0.5) < 1) return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
    return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
  },

  elastic: function (pos: number) {
    return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
  },

  swingFromTo: function (pos: number) {
    var s = 1.70158;
    return ((pos /= 0.5) < 1) ? 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
      0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
  },

  swingFrom: function (pos: number) {
    var s = 1.70158;
    return pos * pos * ((s + 1) * pos - s);
  },

  swingTo: function (pos: number) {
    var s = 1.70158;
    return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
  },

  bounce: function (pos: number) {
    if (pos < (1 / 2.75)) {
      return (7.5625 * pos * pos);
    } else if (pos < (2 / 2.75)) {
      return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
    } else if (pos < (2.5 / 2.75)) {
      return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
    } else {
      return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
    }
  },

  bouncePast: function (pos: number) {
    if (pos < (1 / 2.75)) {
      return (7.5625 * pos * pos);
    } else if (pos < (2 / 2.75)) {
      return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
    } else if (pos < (2.5 / 2.75)) {
      return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
    } else {
      return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
    }
  },

  easeFromTo: function (pos: number) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
  },

  easeFrom: function (pos: number) {
    return Math.pow(pos, 4);
  },

  easeTo: function (pos: number) {
    return Math.pow(pos, 0.25);
  },

  linear: function (pos: number) {
    return pos
  },

  sinusoidal: function (pos: number) {
    return (-Math.cos(pos * Math.PI) / 2) + 0.5;
  },

  reverse: function (pos: number) {
    return 1 - pos;
  },

  mirror: function (pos: number, transition: any) {
    transition = transition || tween.sinusoidal;
    if (pos < 0.5)
      return transition(pos * 2);
    else
      return transition(1 - (pos - 0.5) * 2);
  },

  flicker: function (pos: number) {
    var pos = pos + (Math.random() - 0.5) / 5;
    return tween.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
  },

  wobble: function (pos: number) {
    return (-Math.cos(pos * Math.PI * (9 * pos)) / 2) + 0.5;
  },

  pulse: function (pos: number, pulses: number) {
    return (-Math.cos((pos * ((pulses || 5) - .5) * 2) * Math.PI) / 2) + .5;
  },

  blink: function (pos: number, blinks: number) {
    return Math.round(pos * (blinks || 5)) % 2;
  },

  spring: function (pos: number) {
    return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
  },

  none: function (pos: number) {
    return 0
  },

  full: function (pos: number) {
    return 1
  }
}

export default tween