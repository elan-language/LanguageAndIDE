// node_modules/antlr4/dist/antlr4.web.mjs
var t = { 763: () => {
} };
var e = {};
function n(s2) {
  var i2 = e[s2];
  if (void 0 !== i2) return i2.exports;
  var r2 = e[s2] = { exports: {} };
  return t[s2](r2, r2.exports, n), r2.exports;
}
n.d = (t2, e2) => {
  for (var s2 in e2) n.o(e2, s2) && !n.o(t2, s2) && Object.defineProperty(t2, s2, { enumerable: true, get: e2[s2] });
}, n.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2);
var s = {};
n.d(s, { MG: () => $, fr: () => Lt, sR: () => Ae, Zo: () => ke, iH: () => Re, rt: () => Pt, jB: () => be, M8: () => le, $t: () => Ce, aq: () => me, pG: () => Ot, eP: () => Te, KU: () => xe, zW: () => Ie, IX: () => E, mY: () => _, a7: () => j, JG: () => Ut, ay: () => Xt, X2: () => ee, WU: () => de, Uw: () => ge, gw: () => pe, iX: () => Fe, re: () => se, Pg: () => Be, tD: () => ie, R$: () => te, Dj: () => Ft, m7: () => U, NZ: () => P, xo: () => b, ou: () => i, qC: () => ze, mD: () => d, Ay: () => Ye });
var i = class {
  constructor() {
    this.source = null, this.type = null, this.channel = null, this.start = null, this.stop = null, this.tokenIndex = null, this.line = null, this.column = null, this._text = null;
  }
  getTokenSource() {
    return this.source[0];
  }
  getInputStream() {
    return this.source[1];
  }
  get text() {
    return this._text;
  }
  set text(t2) {
    this._text = t2;
  }
};
function r(t2, e2) {
  if (!Array.isArray(t2) || !Array.isArray(e2)) return false;
  if (t2 === e2) return true;
  if (t2.length !== e2.length) return false;
  for (let n2 = 0; n2 < t2.length; n2++) if (!(t2[n2] === e2[n2] || t2[n2].equals && t2[n2].equals(e2[n2]))) return false;
  return true;
}
i.INVALID_TYPE = 0, i.EPSILON = -2, i.MIN_USER_TOKEN_TYPE = 1, i.EOF = -1, i.DEFAULT_CHANNEL = 0, i.HIDDEN_CHANNEL = 1;
var o = Math.round(Math.random() * Math.pow(2, 32));
function a(t2) {
  if (!t2) return 0;
  const e2 = typeof t2, n2 = "string" === e2 ? t2 : !("object" !== e2 || !t2.toString) && t2.toString();
  if (!n2) return 0;
  let s2, i2;
  const r2 = 3 & n2.length, a2 = n2.length - r2;
  let l2 = o;
  const h2 = 3432918353, c2 = 461845907;
  let u2 = 0;
  for (; u2 < a2; ) i2 = 255 & n2.charCodeAt(u2) | (255 & n2.charCodeAt(++u2)) << 8 | (255 & n2.charCodeAt(++u2)) << 16 | (255 & n2.charCodeAt(++u2)) << 24, ++u2, i2 = (65535 & i2) * h2 + (((i2 >>> 16) * h2 & 65535) << 16) & 4294967295, i2 = i2 << 15 | i2 >>> 17, i2 = (65535 & i2) * c2 + (((i2 >>> 16) * c2 & 65535) << 16) & 4294967295, l2 ^= i2, l2 = l2 << 13 | l2 >>> 19, s2 = 5 * (65535 & l2) + ((5 * (l2 >>> 16) & 65535) << 16) & 4294967295, l2 = 27492 + (65535 & s2) + ((58964 + (s2 >>> 16) & 65535) << 16);
  switch (i2 = 0, r2) {
    case 3:
      i2 ^= (255 & n2.charCodeAt(u2 + 2)) << 16;
    case 2:
      i2 ^= (255 & n2.charCodeAt(u2 + 1)) << 8;
    case 1:
      i2 ^= 255 & n2.charCodeAt(u2), i2 = (65535 & i2) * h2 + (((i2 >>> 16) * h2 & 65535) << 16) & 4294967295, i2 = i2 << 15 | i2 >>> 17, i2 = (65535 & i2) * c2 + (((i2 >>> 16) * c2 & 65535) << 16) & 4294967295, l2 ^= i2;
  }
  return l2 ^= n2.length, l2 ^= l2 >>> 16, l2 = 2246822507 * (65535 & l2) + ((2246822507 * (l2 >>> 16) & 65535) << 16) & 4294967295, l2 ^= l2 >>> 13, l2 = 3266489909 * (65535 & l2) + ((3266489909 * (l2 >>> 16) & 65535) << 16) & 4294967295, l2 ^= l2 >>> 16, l2 >>> 0;
}
var l = class _l {
  constructor() {
    this.count = 0, this.hash = 0;
  }
  update() {
    for (let t2 = 0; t2 < arguments.length; t2++) {
      const e2 = arguments[t2];
      if (null != e2) if (Array.isArray(e2)) this.update.apply(this, e2);
      else {
        let t3 = 0;
        switch (typeof e2) {
          case "undefined":
          case "function":
            continue;
          case "number":
          case "boolean":
            t3 = e2;
            break;
          case "string":
            t3 = a(e2);
            break;
          default:
            e2.updateHashCode ? e2.updateHashCode(this) : console.log("No updateHashCode for " + e2.toString());
            continue;
        }
        t3 *= 3432918353, t3 = t3 << 15 | t3 >>> 17, t3 *= 461845907, this.count = this.count + 1;
        let n2 = this.hash ^ t3;
        n2 = n2 << 13 | n2 >>> 19, n2 = 5 * n2 + 3864292196, this.hash = n2;
      }
    }
  }
  finish() {
    let t2 = this.hash ^ 4 * this.count;
    return t2 ^= t2 >>> 16, t2 *= 2246822507, t2 ^= t2 >>> 13, t2 *= 3266489909, t2 ^= t2 >>> 16, t2;
  }
  static hashStuff() {
    const t2 = new _l();
    return t2.update.apply(t2, arguments), t2.finish();
  }
};
function h(t2) {
  return t2 ? "string" == typeof t2 ? a(t2) : t2.hashCode() : -1;
}
function c(t2, e2) {
  return t2 && t2.equals ? t2.equals(e2) : t2 === e2;
}
function u(t2) {
  return null === t2 ? "null" : t2;
}
function d(t2) {
  return Array.isArray(t2) ? "[" + t2.map(u).join(", ") + "]" : "null";
}
var g = class {
  constructor(t2, e2) {
    this.buckets = new Array(16), this.threshold = Math.floor(12), this.itemCount = 0, this.hashFunction = t2 || h, this.equalsFunction = e2 || c;
  }
  get(t2) {
    if (null == t2) return t2;
    const e2 = this._getBucket(t2);
    if (!e2) return null;
    for (const n2 of e2) if (this.equalsFunction(n2, t2)) return n2;
    return null;
  }
  add(t2) {
    return this.getOrAdd(t2) === t2;
  }
  getOrAdd(t2) {
    this._expand();
    const e2 = this._getSlot(t2);
    let n2 = this.buckets[e2];
    if (!n2) return n2 = [t2], this.buckets[e2] = n2, this.itemCount++, t2;
    for (const e3 of n2) if (this.equalsFunction(e3, t2)) return e3;
    return n2.push(t2), this.itemCount++, t2;
  }
  has(t2) {
    return null != this.get(t2);
  }
  values() {
    return this.buckets.filter(((t2) => null != t2)).flat(1);
  }
  toString() {
    return d(this.values());
  }
  get length() {
    return this.itemCount;
  }
  _getSlot(t2) {
    return this.hashFunction(t2) & this.buckets.length - 1;
  }
  _getBucket(t2) {
    return this.buckets[this._getSlot(t2)];
  }
  _expand() {
    if (this.itemCount <= this.threshold) return;
    const t2 = this.buckets, e2 = 2 * this.buckets.length;
    this.buckets = new Array(e2), this.threshold = Math.floor(0.75 * e2);
    for (const e3 of t2) if (e3) for (const t3 of e3) {
      const e4 = this._getSlot(t3);
      let n2 = this.buckets[e4];
      n2 || (n2 = [], this.buckets[e4] = n2), n2.push(t3);
    }
  }
};
var p = class _p {
  hashCode() {
    const t2 = new l();
    return this.updateHashCode(t2), t2.finish();
  }
  evaluate(t2, e2) {
  }
  evalPrecedence(t2, e2) {
    return this;
  }
  static andContext(t2, e2) {
    if (null === t2 || t2 === _p.NONE) return e2;
    if (null === e2 || e2 === _p.NONE) return t2;
    const n2 = new f(t2, e2);
    return 1 === n2.opnds.length ? n2.opnds[0] : n2;
  }
  static orContext(t2, e2) {
    if (null === t2) return e2;
    if (null === e2) return t2;
    if (t2 === _p.NONE || e2 === _p.NONE) return _p.NONE;
    const n2 = new x(t2, e2);
    return 1 === n2.opnds.length ? n2.opnds[0] : n2;
  }
};
var f = class _f extends p {
  constructor(t2, e2) {
    super();
    const n2 = new g();
    t2 instanceof _f ? t2.opnds.map((function(t3) {
      n2.add(t3);
    })) : n2.add(t2), e2 instanceof _f ? e2.opnds.map((function(t3) {
      n2.add(t3);
    })) : n2.add(e2);
    const s2 = T(n2);
    if (s2.length > 0) {
      let t3 = null;
      s2.map((function(e3) {
        (null === t3 || e3.precedence < t3.precedence) && (t3 = e3);
      })), n2.add(t3);
    }
    this.opnds = Array.from(n2.values());
  }
  equals(t2) {
    return this === t2 || t2 instanceof _f && r(this.opnds, t2.opnds);
  }
  updateHashCode(t2) {
    t2.update(this.opnds, "AND");
  }
  evaluate(t2, e2) {
    for (let n2 = 0; n2 < this.opnds.length; n2++) if (!this.opnds[n2].evaluate(t2, e2)) return false;
    return true;
  }
  evalPrecedence(t2, e2) {
    let n2 = false;
    const s2 = [];
    for (let i3 = 0; i3 < this.opnds.length; i3++) {
      const r2 = this.opnds[i3], o2 = r2.evalPrecedence(t2, e2);
      if (n2 |= o2 !== r2, null === o2) return null;
      o2 !== p.NONE && s2.push(o2);
    }
    if (!n2) return this;
    if (0 === s2.length) return p.NONE;
    let i2 = null;
    return s2.map((function(t3) {
      i2 = null === i2 ? t3 : p.andContext(i2, t3);
    })), i2;
  }
  toString() {
    const t2 = this.opnds.map(((t3) => t3.toString()));
    return (t2.length > 3 ? t2.slice(3) : t2).join("&&");
  }
};
var x = class _x extends p {
  constructor(t2, e2) {
    super();
    const n2 = new g();
    t2 instanceof _x ? t2.opnds.map((function(t3) {
      n2.add(t3);
    })) : n2.add(t2), e2 instanceof _x ? e2.opnds.map((function(t3) {
      n2.add(t3);
    })) : n2.add(e2);
    const s2 = T(n2);
    if (s2.length > 0) {
      const t3 = s2.sort((function(t4, e4) {
        return t4.compareTo(e4);
      })), e3 = t3[t3.length - 1];
      n2.add(e3);
    }
    this.opnds = Array.from(n2.values());
  }
  equals(t2) {
    return this === t2 || t2 instanceof _x && r(this.opnds, t2.opnds);
  }
  updateHashCode(t2) {
    t2.update(this.opnds, "OR");
  }
  evaluate(t2, e2) {
    for (let n2 = 0; n2 < this.opnds.length; n2++) if (this.opnds[n2].evaluate(t2, e2)) return true;
    return false;
  }
  evalPrecedence(t2, e2) {
    let n2 = false;
    const s2 = [];
    for (let i2 = 0; i2 < this.opnds.length; i2++) {
      const r2 = this.opnds[i2], o2 = r2.evalPrecedence(t2, e2);
      if (n2 |= o2 !== r2, o2 === p.NONE) return p.NONE;
      null !== o2 && s2.push(o2);
    }
    if (!n2) return this;
    if (0 === s2.length) return null;
    return s2.map((function(t3) {
      return t3;
    })), null;
  }
  toString() {
    const t2 = this.opnds.map(((t3) => t3.toString()));
    return (t2.length > 3 ? t2.slice(3) : t2).join("||");
  }
};
function T(t2) {
  const e2 = [];
  return t2.values().map((function(t3) {
    t3 instanceof p.PrecedencePredicate && e2.push(t3);
  })), e2;
}
function S(t2, e2) {
  if (null === t2) {
    const t3 = { state: null, alt: null, context: null, semanticContext: null };
    return e2 && (t3.reachesIntoOuterContext = 0), t3;
  }
  {
    const n2 = {};
    return n2.state = t2.state || null, n2.alt = void 0 === t2.alt ? null : t2.alt, n2.context = t2.context || null, n2.semanticContext = t2.semanticContext || null, e2 && (n2.reachesIntoOuterContext = t2.reachesIntoOuterContext || 0, n2.precedenceFilterSuppressed = t2.precedenceFilterSuppressed || false), n2;
  }
}
var m = class _m {
  constructor(t2, e2) {
    this.checkContext(t2, e2), t2 = S(t2), e2 = S(e2, true), this.state = null !== t2.state ? t2.state : e2.state, this.alt = null !== t2.alt ? t2.alt : e2.alt, this.context = null !== t2.context ? t2.context : e2.context, this.semanticContext = null !== t2.semanticContext ? t2.semanticContext : null !== e2.semanticContext ? e2.semanticContext : p.NONE, this.reachesIntoOuterContext = e2.reachesIntoOuterContext, this.precedenceFilterSuppressed = e2.precedenceFilterSuppressed;
  }
  checkContext(t2, e2) {
    null !== t2.context && void 0 !== t2.context || null !== e2 && null !== e2.context && void 0 !== e2.context || (this.context = null);
  }
  hashCode() {
    const t2 = new l();
    return this.updateHashCode(t2), t2.finish();
  }
  updateHashCode(t2) {
    t2.update(this.state.stateNumber, this.alt, this.context, this.semanticContext);
  }
  equals(t2) {
    return this === t2 || t2 instanceof _m && this.state.stateNumber === t2.state.stateNumber && this.alt === t2.alt && (null === this.context ? null === t2.context : this.context.equals(t2.context)) && this.semanticContext.equals(t2.semanticContext) && this.precedenceFilterSuppressed === t2.precedenceFilterSuppressed;
  }
  hashCodeForConfigSet() {
    const t2 = new l();
    return t2.update(this.state.stateNumber, this.alt, this.semanticContext), t2.finish();
  }
  equalsForConfigSet(t2) {
    return this === t2 || t2 instanceof _m && this.state.stateNumber === t2.state.stateNumber && this.alt === t2.alt && this.semanticContext.equals(t2.semanticContext);
  }
  toString() {
    return "(" + this.state + "," + this.alt + (null !== this.context ? ",[" + this.context.toString() + "]" : "") + (this.semanticContext !== p.NONE ? "," + this.semanticContext.toString() : "") + (this.reachesIntoOuterContext > 0 ? ",up=" + this.reachesIntoOuterContext : "") + ")";
  }
};
var E = class _E {
  constructor(t2, e2) {
    this.start = t2, this.stop = e2;
  }
  clone() {
    return new _E(this.start, this.stop);
  }
  contains(t2) {
    return t2 >= this.start && t2 < this.stop;
  }
  toString() {
    return this.start === this.stop - 1 ? this.start.toString() : this.start.toString() + ".." + (this.stop - 1).toString();
  }
  get length() {
    return this.stop - this.start;
  }
};
E.INVALID_INTERVAL = new E(-1, -2);
var _ = class __ {
  constructor() {
    this.intervals = null, this.readOnly = false;
  }
  first(t2) {
    return null === this.intervals || 0 === this.intervals.length ? i.INVALID_TYPE : this.intervals[0].start;
  }
  addOne(t2) {
    this.addInterval(new E(t2, t2 + 1));
  }
  addRange(t2, e2) {
    this.addInterval(new E(t2, e2 + 1));
  }
  addInterval(t2) {
    if (null === this.intervals) this.intervals = [], this.intervals.push(t2.clone());
    else {
      for (let e2 = 0; e2 < this.intervals.length; e2++) {
        const n2 = this.intervals[e2];
        if (t2.stop < n2.start) return void this.intervals.splice(e2, 0, t2);
        if (t2.stop === n2.start) return void (this.intervals[e2] = new E(t2.start, n2.stop));
        if (t2.start <= n2.stop) return this.intervals[e2] = new E(Math.min(n2.start, t2.start), Math.max(n2.stop, t2.stop)), void this.reduce(e2);
      }
      this.intervals.push(t2.clone());
    }
  }
  addSet(t2) {
    return null !== t2.intervals && t2.intervals.forEach(((t3) => this.addInterval(t3)), this), this;
  }
  reduce(t2) {
    if (t2 < this.intervals.length - 1) {
      const e2 = this.intervals[t2], n2 = this.intervals[t2 + 1];
      e2.stop >= n2.stop ? (this.intervals.splice(t2 + 1, 1), this.reduce(t2)) : e2.stop >= n2.start && (this.intervals[t2] = new E(e2.start, n2.stop), this.intervals.splice(t2 + 1, 1));
    }
  }
  complement(t2, e2) {
    const n2 = new __();
    return n2.addInterval(new E(t2, e2 + 1)), null !== this.intervals && this.intervals.forEach(((t3) => n2.removeRange(t3))), n2;
  }
  contains(t2) {
    if (null === this.intervals) return false;
    for (let e2 = 0; e2 < this.intervals.length; e2++) if (this.intervals[e2].contains(t2)) return true;
    return false;
  }
  removeRange(t2) {
    if (t2.start === t2.stop - 1) this.removeOne(t2.start);
    else if (null !== this.intervals) {
      let e2 = 0;
      for (let n2 = 0; n2 < this.intervals.length; n2++) {
        const n3 = this.intervals[e2];
        if (t2.stop <= n3.start) return;
        if (t2.start > n3.start && t2.stop < n3.stop) {
          this.intervals[e2] = new E(n3.start, t2.start);
          const s2 = new E(t2.stop, n3.stop);
          return void this.intervals.splice(e2, 0, s2);
        }
        t2.start <= n3.start && t2.stop >= n3.stop ? (this.intervals.splice(e2, 1), e2 -= 1) : t2.start < n3.stop ? this.intervals[e2] = new E(n3.start, t2.start) : t2.stop < n3.stop && (this.intervals[e2] = new E(t2.stop, n3.stop)), e2 += 1;
      }
    }
  }
  removeOne(t2) {
    if (null !== this.intervals) for (let e2 = 0; e2 < this.intervals.length; e2++) {
      const n2 = this.intervals[e2];
      if (t2 < n2.start) return;
      if (t2 === n2.start && t2 === n2.stop - 1) return void this.intervals.splice(e2, 1);
      if (t2 === n2.start) return void (this.intervals[e2] = new E(n2.start + 1, n2.stop));
      if (t2 === n2.stop - 1) return void (this.intervals[e2] = new E(n2.start, n2.stop - 1));
      if (t2 < n2.stop - 1) {
        const s2 = new E(n2.start, t2);
        return n2.start = t2 + 1, void this.intervals.splice(e2, 0, s2);
      }
    }
  }
  toString(t2, e2, n2) {
    return t2 = t2 || null, e2 = e2 || null, n2 = n2 || false, null === this.intervals ? "{}" : null !== t2 || null !== e2 ? this.toTokenString(t2, e2) : n2 ? this.toCharString() : this.toIndexString();
  }
  toCharString() {
    const t2 = [];
    for (let e2 = 0; e2 < this.intervals.length; e2++) {
      const n2 = this.intervals[e2];
      n2.stop === n2.start + 1 ? n2.start === i.EOF ? t2.push("<EOF>") : t2.push("'" + String.fromCharCode(n2.start) + "'") : t2.push("'" + String.fromCharCode(n2.start) + "'..'" + String.fromCharCode(n2.stop - 1) + "'");
    }
    return t2.length > 1 ? "{" + t2.join(", ") + "}" : t2[0];
  }
  toIndexString() {
    const t2 = [];
    for (let e2 = 0; e2 < this.intervals.length; e2++) {
      const n2 = this.intervals[e2];
      n2.stop === n2.start + 1 ? n2.start === i.EOF ? t2.push("<EOF>") : t2.push(n2.start.toString()) : t2.push(n2.start.toString() + ".." + (n2.stop - 1).toString());
    }
    return t2.length > 1 ? "{" + t2.join(", ") + "}" : t2[0];
  }
  toTokenString(t2, e2) {
    const n2 = [];
    for (let s2 = 0; s2 < this.intervals.length; s2++) {
      const i2 = this.intervals[s2];
      for (let s3 = i2.start; s3 < i2.stop; s3++) n2.push(this.elementName(t2, e2, s3));
    }
    return n2.length > 1 ? "{" + n2.join(", ") + "}" : n2[0];
  }
  elementName(t2, e2, n2) {
    return n2 === i.EOF ? "<EOF>" : n2 === i.EPSILON ? "<EPSILON>" : t2[n2] || e2[n2];
  }
  get length() {
    return this.intervals.map(((t2) => t2.length)).reduce(((t2, e2) => t2 + e2));
  }
};
var C = class _C {
  constructor() {
    this.atn = null, this.stateNumber = _C.INVALID_STATE_NUMBER, this.stateType = null, this.ruleIndex = 0, this.epsilonOnlyTransitions = false, this.transitions = [], this.nextTokenWithinRule = null;
  }
  toString() {
    return this.stateNumber;
  }
  equals(t2) {
    return t2 instanceof _C && this.stateNumber === t2.stateNumber;
  }
  isNonGreedyExitState() {
    return false;
  }
  addTransition(t2, e2) {
    void 0 === e2 && (e2 = -1), 0 === this.transitions.length ? this.epsilonOnlyTransitions = t2.isEpsilon : this.epsilonOnlyTransitions !== t2.isEpsilon && (this.epsilonOnlyTransitions = false), -1 === e2 ? this.transitions.push(t2) : this.transitions.splice(e2, 1, t2);
  }
};
C.INVALID_TYPE = 0, C.BASIC = 1, C.RULE_START = 2, C.BLOCK_START = 3, C.PLUS_BLOCK_START = 4, C.STAR_BLOCK_START = 5, C.TOKEN_START = 6, C.RULE_STOP = 7, C.BLOCK_END = 8, C.STAR_LOOP_BACK = 9, C.STAR_LOOP_ENTRY = 10, C.PLUS_LOOP_BACK = 11, C.LOOP_END = 12, C.serializationNames = ["INVALID", "BASIC", "RULE_START", "BLOCK_START", "PLUS_BLOCK_START", "STAR_BLOCK_START", "TOKEN_START", "RULE_STOP", "BLOCK_END", "STAR_LOOP_BACK", "STAR_LOOP_ENTRY", "PLUS_LOOP_BACK", "LOOP_END"], C.INVALID_STATE_NUMBER = -1;
var A = class extends C {
  constructor() {
    return super(), this.stateType = C.RULE_STOP, this;
  }
};
var N = class {
  constructor(t2) {
    if (null == t2) throw "target cannot be null.";
    this.target = t2, this.isEpsilon = false, this.label = null;
  }
};
N.EPSILON = 1, N.RANGE = 2, N.RULE = 3, N.PREDICATE = 4, N.ATOM = 5, N.ACTION = 6, N.SET = 7, N.NOT_SET = 8, N.WILDCARD = 9, N.PRECEDENCE = 10, N.serializationNames = ["INVALID", "EPSILON", "RANGE", "RULE", "PREDICATE", "ATOM", "ACTION", "SET", "NOT_SET", "WILDCARD", "PRECEDENCE"], N.serializationTypes = { EpsilonTransition: N.EPSILON, RangeTransition: N.RANGE, RuleTransition: N.RULE, PredicateTransition: N.PREDICATE, AtomTransition: N.ATOM, ActionTransition: N.ACTION, SetTransition: N.SET, NotSetTransition: N.NOT_SET, WildcardTransition: N.WILDCARD, PrecedencePredicateTransition: N.PRECEDENCE };
var k = class extends N {
  constructor(t2, e2, n2, s2) {
    super(t2), this.ruleIndex = e2, this.precedence = n2, this.followState = s2, this.serializationType = N.RULE, this.isEpsilon = true;
  }
  matches(t2, e2, n2) {
    return false;
  }
};
var I = class extends N {
  constructor(t2, e2) {
    super(t2), this.serializationType = N.SET, null != e2 ? this.label = e2 : (this.label = new _(), this.label.addOne(i.INVALID_TYPE));
  }
  matches(t2, e2, n2) {
    return this.label.contains(t2);
  }
  toString() {
    return this.label.toString();
  }
};
var y = class extends I {
  constructor(t2, e2) {
    super(t2, e2), this.serializationType = N.NOT_SET;
  }
  matches(t2, e2, n2) {
    return t2 >= e2 && t2 <= n2 && !super.matches(t2, e2, n2);
  }
  toString() {
    return "~" + super.toString();
  }
};
var L = class extends N {
  constructor(t2) {
    super(t2), this.serializationType = N.WILDCARD;
  }
  matches(t2, e2, n2) {
    return t2 >= e2 && t2 <= n2;
  }
  toString() {
    return ".";
  }
};
var O = class extends N {
  constructor(t2) {
    super(t2);
  }
};
var R = class {
};
var w = class extends R {
};
var v = class extends w {
};
var P = class extends v {
  get ruleContext() {
    throw new Error("missing interface implementation");
  }
};
var b = class extends v {
};
var D = class extends b {
};
var F = { toStringTree: function(t2, e2, n2) {
  e2 = e2 || null, null !== (n2 = n2 || null) && (e2 = n2.ruleNames);
  let s2 = F.getNodeText(t2, e2);
  s2 = (function(t3) {
    return t3 = t3.replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  })(s2);
  const i2 = t2.getChildCount();
  if (0 === i2) return s2;
  let r2 = "(" + s2 + " ";
  i2 > 0 && (s2 = F.toStringTree(t2.getChild(0), e2), r2 = r2.concat(s2));
  for (let n3 = 1; n3 < i2; n3++) s2 = F.toStringTree(t2.getChild(n3), e2), r2 = r2.concat(" " + s2);
  return r2 = r2.concat(")"), r2;
}, getNodeText: function(t2, e2, n2) {
  if (e2 = e2 || null, null !== (n2 = n2 || null) && (e2 = n2.ruleNames), null !== e2) {
    if (t2 instanceof P) {
      const n3 = t2.ruleContext.getAltNumber();
      return 0 != n3 ? e2[t2.ruleIndex] + ":" + n3 : e2[t2.ruleIndex];
    }
    if (t2 instanceof D) return t2.toString();
    if (t2 instanceof b && null !== t2.symbol) return t2.symbol.text;
  }
  const s2 = t2.getPayload();
  return s2 instanceof i ? s2.text : t2.getPayload().toString();
}, getChildren: function(t2) {
  const e2 = [];
  for (let n2 = 0; n2 < t2.getChildCount(); n2++) e2.push(t2.getChild(n2));
  return e2;
}, getAncestors: function(t2) {
  let e2 = [];
  for (t2 = t2.getParent(); null !== t2; ) e2 = [t2].concat(e2), t2 = t2.getParent();
  return e2;
}, findAllTokenNodes: function(t2, e2) {
  return F.findAllNodes(t2, e2, true);
}, findAllRuleNodes: function(t2, e2) {
  return F.findAllNodes(t2, e2, false);
}, findAllNodes: function(t2, e2, n2) {
  const s2 = [];
  return F._findAllNodes(t2, e2, n2, s2), s2;
}, _findAllNodes: function(t2, e2, n2, s2) {
  n2 && t2 instanceof b ? t2.symbol.type === e2 && s2.push(t2) : !n2 && t2 instanceof P && t2.ruleIndex === e2 && s2.push(t2);
  for (let i2 = 0; i2 < t2.getChildCount(); i2++) F._findAllNodes(t2.getChild(i2), e2, n2, s2);
}, descendants: function(t2) {
  let e2 = [t2];
  for (let n2 = 0; n2 < t2.getChildCount(); n2++) e2 = e2.concat(F.descendants(t2.getChild(n2)));
  return e2;
} };
var M = F;
var U = class extends P {
  constructor(t2, e2) {
    super(), this.parentCtx = t2 || null, this.invokingState = e2 || -1;
  }
  depth() {
    let t2 = 0, e2 = this;
    for (; null !== e2; ) e2 = e2.parentCtx, t2 += 1;
    return t2;
  }
  isEmpty() {
    return -1 === this.invokingState;
  }
  getSourceInterval() {
    return E.INVALID_INTERVAL;
  }
  get ruleContext() {
    return this;
  }
  getPayload() {
    return this;
  }
  getText() {
    return 0 === this.getChildCount() ? "" : this.children.map((function(t2) {
      return t2.getText();
    })).join("");
  }
  getAltNumber() {
    return 0;
  }
  setAltNumber(t2) {
  }
  getChild(t2) {
    return null;
  }
  getChildCount() {
    return 0;
  }
  accept(t2) {
    return t2.visitChildren(this);
  }
  toStringTree(t2, e2) {
    return M.toStringTree(this, t2, e2);
  }
  toString(t2, e2) {
    t2 = t2 || null, e2 = e2 || null;
    let n2 = this, s2 = "[";
    for (; null !== n2 && n2 !== e2; ) {
      if (null === t2) n2.isEmpty() || (s2 += n2.invokingState);
      else {
        const e3 = n2.ruleIndex;
        s2 += e3 >= 0 && e3 < t2.length ? t2[e3] : "" + e3;
      }
      null === n2.parentCtx || null === t2 && n2.parentCtx.isEmpty() || (s2 += " "), n2 = n2.parentCtx;
    }
    return s2 += "]", s2;
  }
};
var B = class _B {
  constructor(t2) {
    this.cachedHashCode = t2;
  }
  isEmpty() {
    return this === _B.EMPTY;
  }
  hasEmptyPath() {
    return this.getReturnState(this.length - 1) === _B.EMPTY_RETURN_STATE;
  }
  hashCode() {
    return this.cachedHashCode;
  }
  updateHashCode(t2) {
    t2.update(this.cachedHashCode);
  }
};
B.EMPTY = null, B.EMPTY_RETURN_STATE = 2147483647, B.globalNodeCount = 1, B.id = B.globalNodeCount, B.trace_atn_sim = false;
var z = class _z extends B {
  constructor(t2, e2) {
    const n2 = new l();
    return n2.update(t2, e2), super(n2.finish()), this.parents = t2, this.returnStates = e2, this;
  }
  isEmpty() {
    return this.returnStates[0] === B.EMPTY_RETURN_STATE;
  }
  getParent(t2) {
    return this.parents[t2];
  }
  getReturnState(t2) {
    return this.returnStates[t2];
  }
  equals(t2) {
    return this === t2 || t2 instanceof _z && this.hashCode() === t2.hashCode() && r(this.returnStates, t2.returnStates) && r(this.parents, t2.parents);
  }
  toString() {
    if (this.isEmpty()) return "[]";
    {
      let t2 = "[";
      for (let e2 = 0; e2 < this.returnStates.length; e2++) e2 > 0 && (t2 += ", "), this.returnStates[e2] !== B.EMPTY_RETURN_STATE ? (t2 += this.returnStates[e2], null !== this.parents[e2] ? t2 = t2 + " " + this.parents[e2] : t2 += "null") : t2 += "$";
      return t2 + "]";
    }
  }
  get length() {
    return this.returnStates.length;
  }
};
var V = class _V extends B {
  constructor(t2, e2) {
    let n2 = 0;
    const s2 = new l();
    null !== t2 ? s2.update(t2, e2) : s2.update(1), n2 = s2.finish(), super(n2), this.parentCtx = t2, this.returnState = e2;
  }
  getParent(t2) {
    return this.parentCtx;
  }
  getReturnState(t2) {
    return this.returnState;
  }
  equals(t2) {
    return this === t2 || t2 instanceof _V && this.hashCode() === t2.hashCode() && this.returnState === t2.returnState && (null == this.parentCtx ? null == t2.parentCtx : this.parentCtx.equals(t2.parentCtx));
  }
  toString() {
    const t2 = null === this.parentCtx ? "" : this.parentCtx.toString();
    return 0 === t2.length ? this.returnState === B.EMPTY_RETURN_STATE ? "$" : "" + this.returnState : this.returnState + " " + t2;
  }
  get length() {
    return 1;
  }
  static create(t2, e2) {
    return e2 === B.EMPTY_RETURN_STATE && null === t2 ? B.EMPTY : new _V(t2, e2);
  }
};
var q = class extends V {
  constructor() {
    super(null, B.EMPTY_RETURN_STATE);
  }
  isEmpty() {
    return true;
  }
  getParent(t2) {
    return null;
  }
  getReturnState(t2) {
    return this.returnState;
  }
  equals(t2) {
    return this === t2;
  }
  toString() {
    return "$";
  }
};
B.EMPTY = new q();
var H = class {
  constructor(t2, e2) {
    this.buckets = new Array(16), this.threshold = Math.floor(12), this.itemCount = 0, this.hashFunction = t2 || h, this.equalsFunction = e2 || c;
  }
  set(t2, e2) {
    this._expand();
    const n2 = this._getSlot(t2);
    let s2 = this.buckets[n2];
    if (!s2) return s2 = [[t2, e2]], this.buckets[n2] = s2, this.itemCount++, e2;
    const i2 = s2.find(((e3) => this.equalsFunction(e3[0], t2)), this);
    if (i2) {
      const t3 = i2[1];
      return i2[1] = e2, t3;
    }
    return s2.push([t2, e2]), this.itemCount++, e2;
  }
  containsKey(t2) {
    const e2 = this._getBucket(t2);
    return !!e2 && !!e2.find(((e3) => this.equalsFunction(e3[0], t2)), this);
  }
  get(t2) {
    const e2 = this._getBucket(t2);
    if (!e2) return null;
    const n2 = e2.find(((e3) => this.equalsFunction(e3[0], t2)), this);
    return n2 ? n2[1] : null;
  }
  entries() {
    return this.buckets.filter(((t2) => null != t2)).flat(1);
  }
  getKeys() {
    return this.entries().map(((t2) => t2[0]));
  }
  getValues() {
    return this.entries().map(((t2) => t2[1]));
  }
  toString() {
    return "[" + this.entries().map(((t2) => "{" + t2[0] + ":" + t2[1] + "}")).join(", ") + "]";
  }
  get length() {
    return this.itemCount;
  }
  _getSlot(t2) {
    return this.hashFunction(t2) & this.buckets.length - 1;
  }
  _getBucket(t2) {
    return this.buckets[this._getSlot(t2)];
  }
  _expand() {
    if (this.itemCount <= this.threshold) return;
    const t2 = this.buckets, e2 = 2 * this.buckets.length;
    this.buckets = new Array(e2), this.threshold = Math.floor(0.75 * e2);
    for (const e3 of t2) if (e3) for (const t3 of e3) {
      const e4 = this._getSlot(t3[0]);
      let n2 = this.buckets[e4];
      n2 || (n2 = [], this.buckets[e4] = n2), n2.push(t3);
    }
  }
};
function K(t2, e2) {
  if (null == e2 && (e2 = U.EMPTY), null === e2.parentCtx || e2 === U.EMPTY) return B.EMPTY;
  const n2 = K(t2, e2.parentCtx), s2 = t2.states[e2.invokingState].transitions[0];
  return V.create(n2, s2.followState.stateNumber);
}
function Y(t2, e2, n2) {
  if (t2.isEmpty()) return t2;
  let s2 = n2.get(t2) || null;
  if (null !== s2) return s2;
  if (s2 = e2.get(t2), null !== s2) return n2.set(t2, s2), s2;
  let i2 = false, r2 = [];
  for (let s3 = 0; s3 < r2.length; s3++) {
    const o3 = Y(t2.getParent(s3), e2, n2);
    if (i2 || o3 !== t2.getParent(s3)) {
      if (!i2) {
        r2 = [];
        for (let e3 = 0; e3 < t2.length; e3++) r2[e3] = t2.getParent(e3);
        i2 = true;
      }
      r2[s3] = o3;
    }
  }
  if (!i2) return e2.add(t2), n2.set(t2, t2), t2;
  let o2 = null;
  return o2 = 0 === r2.length ? B.EMPTY : 1 === r2.length ? V.create(r2[0], t2.getReturnState(0)) : new z(r2, t2.returnStates), e2.add(o2), n2.set(o2, o2), n2.set(t2, o2), o2;
}
function G(t2, e2, n2, s2) {
  if (t2 === e2) return t2;
  if (t2 instanceof V && e2 instanceof V) return (function(t3, e3, n3, s3) {
    if (null !== s3) {
      let n4 = s3.get(t3, e3);
      if (null !== n4) return n4;
      if (n4 = s3.get(e3, t3), null !== n4) return n4;
    }
    const i2 = (function(t4, e4, n4) {
      if (n4) {
        if (t4 === B.EMPTY) return B.EMPTY;
        if (e4 === B.EMPTY) return B.EMPTY;
      } else {
        if (t4 === B.EMPTY && e4 === B.EMPTY) return B.EMPTY;
        if (t4 === B.EMPTY) {
          const t5 = [e4.returnState, B.EMPTY_RETURN_STATE], n5 = [e4.parentCtx, null];
          return new z(n5, t5);
        }
        if (e4 === B.EMPTY) {
          const e5 = [t4.returnState, B.EMPTY_RETURN_STATE], n5 = [t4.parentCtx, null];
          return new z(n5, e5);
        }
      }
      return null;
    })(t3, e3, n3);
    if (null !== i2) return null !== s3 && s3.set(t3, e3, i2), i2;
    if (t3.returnState === e3.returnState) {
      const i3 = G(t3.parentCtx, e3.parentCtx, n3, s3);
      if (i3 === t3.parentCtx) return t3;
      if (i3 === e3.parentCtx) return e3;
      const r2 = V.create(i3, t3.returnState);
      return null !== s3 && s3.set(t3, e3, r2), r2;
    }
    {
      let n4 = null;
      if ((t3 === e3 || null !== t3.parentCtx && t3.parentCtx === e3.parentCtx) && (n4 = t3.parentCtx), null !== n4) {
        const i4 = [t3.returnState, e3.returnState];
        t3.returnState > e3.returnState && (i4[0] = e3.returnState, i4[1] = t3.returnState);
        const r3 = new z([n4, n4], i4);
        return null !== s3 && s3.set(t3, e3, r3), r3;
      }
      const i3 = [t3.returnState, e3.returnState];
      let r2 = [t3.parentCtx, e3.parentCtx];
      t3.returnState > e3.returnState && (i3[0] = e3.returnState, i3[1] = t3.returnState, r2 = [e3.parentCtx, t3.parentCtx]);
      const o2 = new z(r2, i3);
      return null !== s3 && s3.set(t3, e3, o2), o2;
    }
  })(t2, e2, n2, s2);
  if (n2) {
    if (t2 instanceof q) return t2;
    if (e2 instanceof q) return e2;
  }
  return t2 instanceof V && (t2 = new z([t2.getParent()], [t2.returnState])), e2 instanceof V && (e2 = new z([e2.getParent()], [e2.returnState])), (function(t3, e3, n3, s3) {
    if (null !== s3) {
      let n4 = s3.get(t3, e3);
      if (null !== n4) return B.trace_atn_sim && console.log("mergeArrays a=" + t3 + ",b=" + e3 + " -> previous"), n4;
      if (n4 = s3.get(e3, t3), null !== n4) return B.trace_atn_sim && console.log("mergeArrays a=" + t3 + ",b=" + e3 + " -> previous"), n4;
    }
    let i2 = 0, r2 = 0, o2 = 0, a2 = new Array(t3.returnStates.length + e3.returnStates.length).fill(0), l2 = new Array(t3.returnStates.length + e3.returnStates.length).fill(null);
    for (; i2 < t3.returnStates.length && r2 < e3.returnStates.length; ) {
      const h3 = t3.parents[i2], c2 = e3.parents[r2];
      if (t3.returnStates[i2] === e3.returnStates[r2]) {
        const e4 = t3.returnStates[i2];
        e4 === B.EMPTY_RETURN_STATE && null === h3 && null === c2 || null !== h3 && null !== c2 && h3 === c2 ? (l2[o2] = h3, a2[o2] = e4) : (l2[o2] = G(h3, c2, n3, s3), a2[o2] = e4), i2 += 1, r2 += 1;
      } else t3.returnStates[i2] < e3.returnStates[r2] ? (l2[o2] = h3, a2[o2] = t3.returnStates[i2], i2 += 1) : (l2[o2] = c2, a2[o2] = e3.returnStates[r2], r2 += 1);
      o2 += 1;
    }
    if (i2 < t3.returnStates.length) for (let e4 = i2; e4 < t3.returnStates.length; e4++) l2[o2] = t3.parents[e4], a2[o2] = t3.returnStates[e4], o2 += 1;
    else for (let t4 = r2; t4 < e3.returnStates.length; t4++) l2[o2] = e3.parents[t4], a2[o2] = e3.returnStates[t4], o2 += 1;
    if (o2 < l2.length) {
      if (1 === o2) {
        const n4 = V.create(l2[0], a2[0]);
        return null !== s3 && s3.set(t3, e3, n4), n4;
      }
      l2 = l2.slice(0, o2), a2 = a2.slice(0, o2);
    }
    const h2 = new z(l2, a2);
    return h2.equals(t3) ? (null !== s3 && s3.set(t3, e3, t3), B.trace_atn_sim && console.log("mergeArrays a=" + t3 + ",b=" + e3 + " -> a"), t3) : h2.equals(e3) ? (null !== s3 && s3.set(t3, e3, e3), B.trace_atn_sim && console.log("mergeArrays a=" + t3 + ",b=" + e3 + " -> b"), e3) : ((function(t4) {
      const e4 = new H();
      for (let n4 = 0; n4 < t4.length; n4++) {
        const s4 = t4[n4];
        e4.containsKey(s4) || e4.set(s4, s4);
      }
      for (let n4 = 0; n4 < t4.length; n4++) t4[n4] = e4.get(t4[n4]);
    })(l2), null !== s3 && s3.set(t3, e3, h2), B.trace_atn_sim && console.log("mergeArrays a=" + t3 + ",b=" + e3 + " -> " + h2), h2);
  })(t2, e2, n2, s2);
}
var W = class _W {
  constructor() {
    this.data = new Uint32Array(1);
  }
  set(t2) {
    _W._checkIndex(t2), this._resize(t2), this.data[t2 >>> 5] |= 1 << t2 % 32;
  }
  get(t2) {
    _W._checkIndex(t2);
    const e2 = t2 >>> 5;
    return !(e2 >= this.data.length || !(this.data[e2] & 1 << t2 % 32));
  }
  clear(t2) {
    _W._checkIndex(t2);
    const e2 = t2 >>> 5;
    e2 < this.data.length && (this.data[e2] &= ~(1 << t2));
  }
  or(t2) {
    const e2 = Math.min(this.data.length, t2.data.length);
    for (let n2 = 0; n2 < e2; ++n2) this.data[n2] |= t2.data[n2];
    if (this.data.length < t2.data.length) {
      this._resize((t2.data.length << 5) - 1);
      const n2 = t2.data.length;
      for (let s2 = e2; s2 < n2; ++s2) this.data[s2] = t2.data[s2];
    }
  }
  values() {
    const t2 = new Array(this.length);
    let e2 = 0;
    const n2 = this.data.length;
    for (let s2 = 0; s2 < n2; ++s2) {
      let n3 = this.data[s2];
      for (; 0 !== n3; ) {
        const i2 = n3 & -n3;
        t2[e2++] = (s2 << 5) + _W._bitCount(i2 - 1), n3 ^= i2;
      }
    }
    return t2;
  }
  minValue() {
    for (let t2 = 0; t2 < this.data.length; ++t2) {
      let e2 = this.data[t2];
      if (0 !== e2) {
        let n2 = 0;
        for (; !(1 & e2); ) n2++, e2 >>= 1;
        return n2 + 32 * t2;
      }
    }
    return 0;
  }
  hashCode() {
    return l.hashStuff(this.values());
  }
  equals(t2) {
    return t2 instanceof _W && r(this.data, t2.data);
  }
  toString() {
    return "{" + this.values().join(", ") + "}";
  }
  get length() {
    return this.data.map(((t2) => _W._bitCount(t2))).reduce(((t2, e2) => t2 + e2), 0);
  }
  _resize(t2) {
    const e2 = t2 + 32 >>> 5;
    if (e2 <= this.data.length) return;
    const n2 = new Uint32Array(e2);
    n2.set(this.data), n2.fill(0, this.data.length), this.data = n2;
  }
  static _checkIndex(t2) {
    if (t2 < 0) throw new RangeError("index cannot be negative");
  }
  static _bitCount(t2) {
    return t2 = (t2 = (858993459 & (t2 -= t2 >> 1 & 1431655765)) + (t2 >> 2 & 858993459)) + (t2 >> 4) & 252645135, t2 += t2 >> 8, 0 + (t2 += t2 >> 16) & 63;
  }
};
var j = class _j {
  constructor(t2) {
    this.atn = t2;
  }
  getDecisionLookahead(t2) {
    if (null === t2) return null;
    const e2 = t2.transitions.length, n2 = [];
    for (let s2 = 0; s2 < e2; s2++) {
      n2[s2] = new _();
      const e3 = new g(), i2 = false;
      this._LOOK(t2.transition(s2).target, null, B.EMPTY, n2[s2], e3, new W(), i2, false), (0 === n2[s2].length || n2[s2].contains(_j.HIT_PRED)) && (n2[s2] = null);
    }
    return n2;
  }
  LOOK(t2, e2, n2) {
    const s2 = new _(), i2 = null !== (n2 = n2 || null) ? K(t2.atn, n2) : null;
    return this._LOOK(t2, e2, i2, s2, new g(), new W(), true, true), s2;
  }
  _LOOK(t2, e2, n2, s2, r2, o2, a2, l2) {
    const h2 = new m({ state: t2, alt: 0, context: n2 }, null);
    if (!r2.has(h2)) {
      if (r2.add(h2), t2 === e2) {
        if (null === n2) return void s2.addOne(i.EPSILON);
        if (n2.isEmpty() && l2) return void s2.addOne(i.EOF);
      }
      if (t2 instanceof A) {
        if (null === n2) return void s2.addOne(i.EPSILON);
        if (n2.isEmpty() && l2) return void s2.addOne(i.EOF);
        if (n2 !== B.EMPTY) {
          const i2 = o2.get(t2.ruleIndex);
          try {
            o2.clear(t2.ruleIndex);
            for (let t3 = 0; t3 < n2.length; t3++) {
              const i3 = this.atn.states[n2.getReturnState(t3)];
              this._LOOK(i3, e2, n2.getParent(t3), s2, r2, o2, a2, l2);
            }
          } finally {
            i2 && o2.set(t2.ruleIndex);
          }
          return;
        }
      }
      for (let h3 = 0; h3 < t2.transitions.length; h3++) {
        const c2 = t2.transitions[h3];
        if (c2.constructor === k) {
          if (o2.get(c2.target.ruleIndex)) continue;
          const t3 = V.create(n2, c2.followState.stateNumber);
          try {
            o2.set(c2.target.ruleIndex), this._LOOK(c2.target, e2, t3, s2, r2, o2, a2, l2);
          } finally {
            o2.clear(c2.target.ruleIndex);
          }
        } else if (c2 instanceof O) a2 ? this._LOOK(c2.target, e2, n2, s2, r2, o2, a2, l2) : s2.addOne(_j.HIT_PRED);
        else if (c2.isEpsilon) this._LOOK(c2.target, e2, n2, s2, r2, o2, a2, l2);
        else if (c2.constructor === L) s2.addRange(i.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
        else {
          let t3 = c2.label;
          null !== t3 && (c2 instanceof y && (t3 = t3.complement(i.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType)), s2.addSet(t3));
        }
      }
    }
  }
};
j.HIT_PRED = i.INVALID_TYPE;
var $ = class {
  constructor(t2, e2) {
    this.grammarType = t2, this.maxTokenType = e2, this.states = [], this.decisionToState = [], this.ruleToStartState = [], this.ruleToStopState = null, this.modeNameToStartState = {}, this.ruleToTokenType = null, this.lexerActions = null, this.modeToStartState = [];
  }
  nextTokensInContext(t2, e2) {
    return new j(this).LOOK(t2, null, e2);
  }
  nextTokensNoContext(t2) {
    return null !== t2.nextTokenWithinRule || (t2.nextTokenWithinRule = this.nextTokensInContext(t2, null), t2.nextTokenWithinRule.readOnly = true), t2.nextTokenWithinRule;
  }
  nextTokens(t2, e2) {
    return void 0 === e2 ? this.nextTokensNoContext(t2) : this.nextTokensInContext(t2, e2);
  }
  addState(t2) {
    null !== t2 && (t2.atn = this, t2.stateNumber = this.states.length), this.states.push(t2);
  }
  removeState(t2) {
    this.states[t2.stateNumber] = null;
  }
  defineDecisionState(t2) {
    return this.decisionToState.push(t2), t2.decision = this.decisionToState.length - 1, t2.decision;
  }
  getDecisionState(t2) {
    return 0 === this.decisionToState.length ? null : this.decisionToState[t2];
  }
  getExpectedTokens(t2, e2) {
    if (t2 < 0 || t2 >= this.states.length) throw "Invalid state number.";
    const n2 = this.states[t2];
    let s2 = this.nextTokens(n2);
    if (!s2.contains(i.EPSILON)) return s2;
    const r2 = new _();
    for (r2.addSet(s2), r2.removeOne(i.EPSILON); null !== e2 && e2.invokingState >= 0 && s2.contains(i.EPSILON); ) {
      const t3 = this.states[e2.invokingState].transitions[0];
      s2 = this.nextTokens(t3.followState), r2.addSet(s2), r2.removeOne(i.EPSILON), e2 = e2.parentCtx;
    }
    return s2.contains(i.EPSILON) && r2.addOne(i.EOF), r2;
  }
};
$.INVALID_ALT_NUMBER = 0;
var X = class extends C {
  constructor() {
    super(), this.stateType = C.BASIC;
  }
};
var J = class extends C {
  constructor() {
    return super(), this.decision = -1, this.nonGreedy = false, this;
  }
};
var Z = class extends J {
  constructor() {
    return super(), this.endState = null, this;
  }
};
var Q = class extends C {
  constructor() {
    return super(), this.stateType = C.BLOCK_END, this.startState = null, this;
  }
};
var tt = class extends C {
  constructor() {
    return super(), this.stateType = C.LOOP_END, this.loopBackState = null, this;
  }
};
var et = class extends C {
  constructor() {
    return super(), this.stateType = C.RULE_START, this.stopState = null, this.isPrecedenceRule = false, this;
  }
};
var nt = class extends J {
  constructor() {
    return super(), this.stateType = C.TOKEN_START, this;
  }
};
var st = class extends J {
  constructor() {
    return super(), this.stateType = C.PLUS_LOOP_BACK, this;
  }
};
var it = class extends C {
  constructor() {
    return super(), this.stateType = C.STAR_LOOP_BACK, this;
  }
};
var rt = class extends J {
  constructor() {
    return super(), this.stateType = C.STAR_LOOP_ENTRY, this.loopBackState = null, this.isPrecedenceDecision = null, this;
  }
};
var ot = class extends Z {
  constructor() {
    return super(), this.stateType = C.PLUS_BLOCK_START, this.loopBackState = null, this;
  }
};
var at = class extends Z {
  constructor() {
    return super(), this.stateType = C.STAR_BLOCK_START, this;
  }
};
var lt = class extends Z {
  constructor() {
    return super(), this.stateType = C.BLOCK_START, this;
  }
};
var ht = class extends N {
  constructor(t2, e2) {
    super(t2), this.label_ = e2, this.label = this.makeLabel(), this.serializationType = N.ATOM;
  }
  makeLabel() {
    const t2 = new _();
    return t2.addOne(this.label_), t2;
  }
  matches(t2, e2, n2) {
    return this.label_ === t2;
  }
  toString() {
    return this.label_;
  }
};
var ct = class extends N {
  constructor(t2, e2, n2) {
    super(t2), this.serializationType = N.RANGE, this.start = e2, this.stop = n2, this.label = this.makeLabel();
  }
  makeLabel() {
    const t2 = new _();
    return t2.addRange(this.start, this.stop), t2;
  }
  matches(t2, e2, n2) {
    return t2 >= this.start && t2 <= this.stop;
  }
  toString() {
    return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
  }
};
var ut = class extends N {
  constructor(t2, e2, n2, s2) {
    super(t2), this.serializationType = N.ACTION, this.ruleIndex = e2, this.actionIndex = void 0 === n2 ? -1 : n2, this.isCtxDependent = void 0 !== s2 && s2, this.isEpsilon = true;
  }
  matches(t2, e2, n2) {
    return false;
  }
  toString() {
    return "action_" + this.ruleIndex + ":" + this.actionIndex;
  }
};
var dt = class extends N {
  constructor(t2, e2) {
    super(t2), this.serializationType = N.EPSILON, this.isEpsilon = true, this.outermostPrecedenceReturn = e2;
  }
  matches(t2, e2, n2) {
    return false;
  }
  toString() {
    return "epsilon";
  }
};
var gt = class _gt extends p {
  constructor(t2, e2, n2) {
    super(), this.ruleIndex = void 0 === t2 ? -1 : t2, this.predIndex = void 0 === e2 ? -1 : e2, this.isCtxDependent = void 0 !== n2 && n2;
  }
  evaluate(t2, e2) {
    const n2 = this.isCtxDependent ? e2 : null;
    return t2.sempred(n2, this.ruleIndex, this.predIndex);
  }
  updateHashCode(t2) {
    t2.update(this.ruleIndex, this.predIndex, this.isCtxDependent);
  }
  equals(t2) {
    return this === t2 || t2 instanceof _gt && this.ruleIndex === t2.ruleIndex && this.predIndex === t2.predIndex && this.isCtxDependent === t2.isCtxDependent;
  }
  toString() {
    return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
  }
};
p.NONE = new gt();
var pt = class extends O {
  constructor(t2, e2, n2, s2) {
    super(t2), this.serializationType = N.PREDICATE, this.ruleIndex = e2, this.predIndex = n2, this.isCtxDependent = s2, this.isEpsilon = true;
  }
  matches(t2, e2, n2) {
    return false;
  }
  getPredicate() {
    return new gt(this.ruleIndex, this.predIndex, this.isCtxDependent);
  }
  toString() {
    return "pred_" + this.ruleIndex + ":" + this.predIndex;
  }
};
var ft = class _ft extends p {
  constructor(t2) {
    super(), this.precedence = void 0 === t2 ? 0 : t2;
  }
  evaluate(t2, e2) {
    return t2.precpred(e2, this.precedence);
  }
  evalPrecedence(t2, e2) {
    return t2.precpred(e2, this.precedence) ? p.NONE : null;
  }
  compareTo(t2) {
    return this.precedence - t2.precedence;
  }
  updateHashCode(t2) {
    t2.update(this.precedence);
  }
  equals(t2) {
    return this === t2 || t2 instanceof _ft && this.precedence === t2.precedence;
  }
  toString() {
    return "{" + this.precedence + ">=prec}?";
  }
};
p.PrecedencePredicate = ft;
var xt = class extends O {
  constructor(t2, e2) {
    super(t2), this.serializationType = N.PRECEDENCE, this.precedence = e2, this.isEpsilon = true;
  }
  matches(t2, e2, n2) {
    return false;
  }
  getPredicate() {
    return new ft(this.precedence);
  }
  toString() {
    return this.precedence + " >= _p";
  }
};
var Tt = class {
  constructor(t2) {
    void 0 === t2 && (t2 = null), this.readOnly = false, this.verifyATN = null === t2 || t2.verifyATN, this.generateRuleBypassTransitions = null !== t2 && t2.generateRuleBypassTransitions;
  }
};
Tt.defaultOptions = new Tt(), Tt.defaultOptions.readOnly = true;
var St = class {
  constructor(t2) {
    this.actionType = t2, this.isPositionDependent = false;
  }
  hashCode() {
    const t2 = new l();
    return this.updateHashCode(t2), t2.finish();
  }
  updateHashCode(t2) {
    t2.update(this.actionType);
  }
  equals(t2) {
    return this === t2;
  }
};
var mt = class extends St {
  constructor() {
    super(6);
  }
  execute(t2) {
    t2.skip();
  }
  toString() {
    return "skip";
  }
};
mt.INSTANCE = new mt();
var Et = class _Et extends St {
  constructor(t2) {
    super(0), this.channel = t2;
  }
  execute(t2) {
    t2._channel = this.channel;
  }
  updateHashCode(t2) {
    t2.update(this.actionType, this.channel);
  }
  equals(t2) {
    return this === t2 || t2 instanceof _Et && this.channel === t2.channel;
  }
  toString() {
    return "channel(" + this.channel + ")";
  }
};
var _t = class __t extends St {
  constructor(t2, e2) {
    super(1), this.ruleIndex = t2, this.actionIndex = e2, this.isPositionDependent = true;
  }
  execute(t2) {
    t2.action(null, this.ruleIndex, this.actionIndex);
  }
  updateHashCode(t2) {
    t2.update(this.actionType, this.ruleIndex, this.actionIndex);
  }
  equals(t2) {
    return this === t2 || t2 instanceof __t && this.ruleIndex === t2.ruleIndex && this.actionIndex === t2.actionIndex;
  }
};
var Ct = class extends St {
  constructor() {
    super(3);
  }
  execute(t2) {
    t2.more();
  }
  toString() {
    return "more";
  }
};
Ct.INSTANCE = new Ct();
var At = class _At extends St {
  constructor(t2) {
    super(7), this.type = t2;
  }
  execute(t2) {
    t2.type = this.type;
  }
  updateHashCode(t2) {
    t2.update(this.actionType, this.type);
  }
  equals(t2) {
    return this === t2 || t2 instanceof _At && this.type === t2.type;
  }
  toString() {
    return "type(" + this.type + ")";
  }
};
var Nt = class _Nt extends St {
  constructor(t2) {
    super(5), this.mode = t2;
  }
  execute(t2) {
    t2.pushMode(this.mode);
  }
  updateHashCode(t2) {
    t2.update(this.actionType, this.mode);
  }
  equals(t2) {
    return this === t2 || t2 instanceof _Nt && this.mode === t2.mode;
  }
  toString() {
    return "pushMode(" + this.mode + ")";
  }
};
var kt = class extends St {
  constructor() {
    super(4);
  }
  execute(t2) {
    t2.popMode();
  }
  toString() {
    return "popMode";
  }
};
kt.INSTANCE = new kt();
var It = class _It extends St {
  constructor(t2) {
    super(2), this.mode = t2;
  }
  execute(t2) {
    t2.setMode(this.mode);
  }
  updateHashCode(t2) {
    t2.update(this.actionType, this.mode);
  }
  equals(t2) {
    return this === t2 || t2 instanceof _It && this.mode === t2.mode;
  }
  toString() {
    return "mode(" + this.mode + ")";
  }
};
function yt(t2, e2) {
  const n2 = [];
  return n2[t2 - 1] = e2, n2.map((function(t3) {
    return e2;
  }));
}
var Lt = class {
  constructor(t2) {
    null == t2 && (t2 = Tt.defaultOptions), this.deserializationOptions = t2, this.stateFactories = null, this.actionFactories = null;
  }
  deserialize(t2) {
    const e2 = this.reset(t2);
    this.checkVersion(e2), e2 && this.skipUUID();
    const n2 = this.readATN();
    this.readStates(n2, e2), this.readRules(n2, e2), this.readModes(n2);
    const s2 = [];
    return this.readSets(n2, s2, this.readInt.bind(this)), e2 && this.readSets(n2, s2, this.readInt32.bind(this)), this.readEdges(n2, s2), this.readDecisions(n2), this.readLexerActions(n2, e2), this.markPrecedenceDecisions(n2), this.verifyATN(n2), this.deserializationOptions.generateRuleBypassTransitions && 1 === n2.grammarType && (this.generateRuleBypassTransitions(n2), this.verifyATN(n2)), n2;
  }
  reset(t2) {
    if (3 === (t2.charCodeAt ? t2.charCodeAt(0) : t2[0])) {
      const e2 = function(t3) {
        const e3 = t3.charCodeAt(0);
        return e3 > 1 ? e3 - 2 : e3 + 65534;
      }, n2 = t2.split("").map(e2);
      return n2[0] = t2.charCodeAt(0), this.data = n2, this.pos = 0, true;
    }
    return this.data = t2, this.pos = 0, false;
  }
  skipUUID() {
    let t2 = 0;
    for (; t2++ < 8; ) this.readInt();
  }
  checkVersion(t2) {
    const e2 = this.readInt();
    if (!t2 && 4 !== e2) throw "Could not deserialize ATN with version " + e2 + " (expected 4).";
  }
  readATN() {
    const t2 = this.readInt(), e2 = this.readInt();
    return new $(t2, e2);
  }
  readStates(t2, e2) {
    let n2, s2, i2;
    const r2 = [], o2 = [], a2 = this.readInt();
    for (let n3 = 0; n3 < a2; n3++) {
      const n4 = this.readInt();
      if (n4 === C.INVALID_TYPE) {
        t2.addState(null);
        continue;
      }
      let s3 = this.readInt();
      e2 && 65535 === s3 && (s3 = -1);
      const i3 = this.stateFactory(n4, s3);
      if (n4 === C.LOOP_END) {
        const t3 = this.readInt();
        r2.push([i3, t3]);
      } else if (i3 instanceof Z) {
        const t3 = this.readInt();
        o2.push([i3, t3]);
      }
      t2.addState(i3);
    }
    for (n2 = 0; n2 < r2.length; n2++) s2 = r2[n2], s2[0].loopBackState = t2.states[s2[1]];
    for (n2 = 0; n2 < o2.length; n2++) s2 = o2[n2], s2[0].endState = t2.states[s2[1]];
    let l2 = this.readInt();
    for (n2 = 0; n2 < l2; n2++) i2 = this.readInt(), t2.states[i2].nonGreedy = true;
    let h2 = this.readInt();
    for (n2 = 0; n2 < h2; n2++) i2 = this.readInt(), t2.states[i2].isPrecedenceRule = true;
  }
  readRules(t2, e2) {
    let n2;
    const s2 = this.readInt();
    for (0 === t2.grammarType && (t2.ruleToTokenType = yt(s2, 0)), t2.ruleToStartState = yt(s2, 0), n2 = 0; n2 < s2; n2++) {
      const s3 = this.readInt();
      if (t2.ruleToStartState[n2] = t2.states[s3], 0 === t2.grammarType) {
        let s4 = this.readInt();
        e2 && 65535 === s4 && (s4 = i.EOF), t2.ruleToTokenType[n2] = s4;
      }
    }
    for (t2.ruleToStopState = yt(s2, 0), n2 = 0; n2 < t2.states.length; n2++) {
      const e3 = t2.states[n2];
      e3 instanceof A && (t2.ruleToStopState[e3.ruleIndex] = e3, t2.ruleToStartState[e3.ruleIndex].stopState = e3);
    }
  }
  readModes(t2) {
    const e2 = this.readInt();
    for (let n2 = 0; n2 < e2; n2++) {
      let e3 = this.readInt();
      t2.modeToStartState.push(t2.states[e3]);
    }
  }
  readSets(t2, e2, n2) {
    const s2 = this.readInt();
    for (let t3 = 0; t3 < s2; t3++) {
      const t4 = new _();
      e2.push(t4);
      const s3 = this.readInt();
      0 !== this.readInt() && t4.addOne(-1);
      for (let e3 = 0; e3 < s3; e3++) {
        const e4 = n2(), s4 = n2();
        t4.addRange(e4, s4);
      }
    }
  }
  readEdges(t2, e2) {
    let n2, s2, i2, r2, o2;
    const a2 = this.readInt();
    for (n2 = 0; n2 < a2; n2++) {
      const n3 = this.readInt(), s3 = this.readInt(), i3 = this.readInt(), o3 = this.readInt(), a3 = this.readInt(), l2 = this.readInt();
      r2 = this.edgeFactory(t2, i3, n3, s3, o3, a3, l2, e2), t2.states[n3].addTransition(r2);
    }
    for (n2 = 0; n2 < t2.states.length; n2++) for (i2 = t2.states[n2], s2 = 0; s2 < i2.transitions.length; s2++) {
      const e3 = i2.transitions[s2];
      if (!(e3 instanceof k)) continue;
      let n3 = -1;
      t2.ruleToStartState[e3.target.ruleIndex].isPrecedenceRule && 0 === e3.precedence && (n3 = e3.target.ruleIndex), r2 = new dt(e3.followState, n3), t2.ruleToStopState[e3.target.ruleIndex].addTransition(r2);
    }
    for (n2 = 0; n2 < t2.states.length; n2++) {
      if (i2 = t2.states[n2], i2 instanceof Z) {
        if (null === i2.endState) throw "IllegalState";
        if (null !== i2.endState.startState) throw "IllegalState";
        i2.endState.startState = i2;
      }
      if (i2 instanceof st) for (s2 = 0; s2 < i2.transitions.length; s2++) o2 = i2.transitions[s2].target, o2 instanceof ot && (o2.loopBackState = i2);
      else if (i2 instanceof it) for (s2 = 0; s2 < i2.transitions.length; s2++) o2 = i2.transitions[s2].target, o2 instanceof rt && (o2.loopBackState = i2);
    }
  }
  readDecisions(t2) {
    const e2 = this.readInt();
    for (let n2 = 0; n2 < e2; n2++) {
      const e3 = this.readInt(), s2 = t2.states[e3];
      t2.decisionToState.push(s2), s2.decision = n2;
    }
  }
  readLexerActions(t2, e2) {
    if (0 === t2.grammarType) {
      const n2 = this.readInt();
      t2.lexerActions = yt(n2, null);
      for (let s2 = 0; s2 < n2; s2++) {
        const n3 = this.readInt();
        let i2 = this.readInt();
        e2 && 65535 === i2 && (i2 = -1);
        let r2 = this.readInt();
        e2 && 65535 === r2 && (r2 = -1), t2.lexerActions[s2] = this.lexerActionFactory(n3, i2, r2);
      }
    }
  }
  generateRuleBypassTransitions(t2) {
    let e2;
    const n2 = t2.ruleToStartState.length;
    for (e2 = 0; e2 < n2; e2++) t2.ruleToTokenType[e2] = t2.maxTokenType + e2 + 1;
    for (e2 = 0; e2 < n2; e2++) this.generateRuleBypassTransition(t2, e2);
  }
  generateRuleBypassTransition(t2, e2) {
    let n2, s2;
    const i2 = new lt();
    i2.ruleIndex = e2, t2.addState(i2);
    const r2 = new Q();
    r2.ruleIndex = e2, t2.addState(r2), i2.endState = r2, t2.defineDecisionState(i2), r2.startState = i2;
    let o2 = null, a2 = null;
    if (t2.ruleToStartState[e2].isPrecedenceRule) {
      for (a2 = null, n2 = 0; n2 < t2.states.length; n2++) if (s2 = t2.states[n2], this.stateIsEndStateFor(s2, e2)) {
        a2 = s2, o2 = s2.loopBackState.transitions[0];
        break;
      }
      if (null === o2) throw "Couldn't identify final state of the precedence rule prefix section.";
    } else a2 = t2.ruleToStopState[e2];
    for (n2 = 0; n2 < t2.states.length; n2++) {
      s2 = t2.states[n2];
      for (let t3 = 0; t3 < s2.transitions.length; t3++) {
        const e3 = s2.transitions[t3];
        e3 !== o2 && e3.target === a2 && (e3.target = r2);
      }
    }
    const l2 = t2.ruleToStartState[e2], h2 = l2.transitions.length;
    for (; h2 > 0; ) i2.addTransition(l2.transitions[h2 - 1]), l2.transitions = l2.transitions.slice(-1);
    t2.ruleToStartState[e2].addTransition(new dt(i2)), r2.addTransition(new dt(a2));
    const c2 = new X();
    t2.addState(c2), c2.addTransition(new ht(r2, t2.ruleToTokenType[e2])), i2.addTransition(new dt(c2));
  }
  stateIsEndStateFor(t2, e2) {
    if (t2.ruleIndex !== e2) return null;
    if (!(t2 instanceof rt)) return null;
    const n2 = t2.transitions[t2.transitions.length - 1].target;
    return n2 instanceof tt && n2.epsilonOnlyTransitions && n2.transitions[0].target instanceof A ? t2 : null;
  }
  markPrecedenceDecisions(t2) {
    for (let e2 = 0; e2 < t2.states.length; e2++) {
      const n2 = t2.states[e2];
      if (n2 instanceof rt && t2.ruleToStartState[n2.ruleIndex].isPrecedenceRule) {
        const t3 = n2.transitions[n2.transitions.length - 1].target;
        t3 instanceof tt && t3.epsilonOnlyTransitions && t3.transitions[0].target instanceof A && (n2.isPrecedenceDecision = true);
      }
    }
  }
  verifyATN(t2) {
    if (this.deserializationOptions.verifyATN) for (let e2 = 0; e2 < t2.states.length; e2++) {
      const n2 = t2.states[e2];
      if (null !== n2) if (this.checkCondition(n2.epsilonOnlyTransitions || n2.transitions.length <= 1), n2 instanceof ot) this.checkCondition(null !== n2.loopBackState);
      else if (n2 instanceof rt) if (this.checkCondition(null !== n2.loopBackState), this.checkCondition(2 === n2.transitions.length), n2.transitions[0].target instanceof at) this.checkCondition(n2.transitions[1].target instanceof tt), this.checkCondition(!n2.nonGreedy);
      else {
        if (!(n2.transitions[0].target instanceof tt)) throw "IllegalState";
        this.checkCondition(n2.transitions[1].target instanceof at), this.checkCondition(n2.nonGreedy);
      }
      else n2 instanceof it ? (this.checkCondition(1 === n2.transitions.length), this.checkCondition(n2.transitions[0].target instanceof rt)) : n2 instanceof tt ? this.checkCondition(null !== n2.loopBackState) : n2 instanceof et ? this.checkCondition(null !== n2.stopState) : n2 instanceof Z ? this.checkCondition(null !== n2.endState) : n2 instanceof Q ? this.checkCondition(null !== n2.startState) : n2 instanceof J ? this.checkCondition(n2.transitions.length <= 1 || n2.decision >= 0) : this.checkCondition(n2.transitions.length <= 1 || n2 instanceof A);
    }
  }
  checkCondition(t2, e2) {
    if (!t2) throw null == e2 && (e2 = "IllegalState"), e2;
  }
  readInt() {
    return this.data[this.pos++];
  }
  readInt32() {
    return this.readInt() | this.readInt() << 16;
  }
  edgeFactory(t2, e2, n2, s2, r2, o2, a2, l2) {
    const h2 = t2.states[s2];
    switch (e2) {
      case N.EPSILON:
        return new dt(h2);
      case N.RANGE:
        return new ct(h2, 0 !== a2 ? i.EOF : r2, o2);
      case N.RULE:
        return new k(t2.states[r2], o2, a2, h2);
      case N.PREDICATE:
        return new pt(h2, r2, o2, 0 !== a2);
      case N.PRECEDENCE:
        return new xt(h2, r2);
      case N.ATOM:
        return new ht(h2, 0 !== a2 ? i.EOF : r2);
      case N.ACTION:
        return new ut(h2, r2, o2, 0 !== a2);
      case N.SET:
        return new I(h2, l2[r2]);
      case N.NOT_SET:
        return new y(h2, l2[r2]);
      case N.WILDCARD:
        return new L(h2);
      default:
        throw "The specified transition type: " + e2 + " is not valid.";
    }
  }
  stateFactory(t2, e2) {
    if (null === this.stateFactories) {
      const t3 = [];
      t3[C.INVALID_TYPE] = null, t3[C.BASIC] = () => new X(), t3[C.RULE_START] = () => new et(), t3[C.BLOCK_START] = () => new lt(), t3[C.PLUS_BLOCK_START] = () => new ot(), t3[C.STAR_BLOCK_START] = () => new at(), t3[C.TOKEN_START] = () => new nt(), t3[C.RULE_STOP] = () => new A(), t3[C.BLOCK_END] = () => new Q(), t3[C.STAR_LOOP_BACK] = () => new it(), t3[C.STAR_LOOP_ENTRY] = () => new rt(), t3[C.PLUS_LOOP_BACK] = () => new st(), t3[C.LOOP_END] = () => new tt(), this.stateFactories = t3;
    }
    if (t2 > this.stateFactories.length || null === this.stateFactories[t2]) throw "The specified state type " + t2 + " is not valid.";
    {
      const n2 = this.stateFactories[t2]();
      if (null !== n2) return n2.ruleIndex = e2, n2;
    }
  }
  lexerActionFactory(t2, e2, n2) {
    if (null === this.actionFactories) {
      const t3 = [];
      t3[0] = (t4, e3) => new Et(t4), t3[1] = (t4, e3) => new _t(t4, e3), t3[2] = (t4, e3) => new It(t4), t3[3] = (t4, e3) => Ct.INSTANCE, t3[4] = (t4, e3) => kt.INSTANCE, t3[5] = (t4, e3) => new Nt(t4), t3[6] = (t4, e3) => mt.INSTANCE, t3[7] = (t4, e3) => new At(t4), this.actionFactories = t3;
    }
    if (t2 > this.actionFactories.length || null === this.actionFactories[t2]) throw "The specified lexer action type " + t2 + " is not valid.";
    return this.actionFactories[t2](e2, n2);
  }
};
var Ot = class {
  syntaxError(t2, e2, n2, s2, i2, r2) {
  }
  reportAmbiguity(t2, e2, n2, s2, i2, r2, o2) {
  }
  reportAttemptingFullContext(t2, e2, n2, s2, i2, r2) {
  }
  reportContextSensitivity(t2, e2, n2, s2, i2, r2) {
  }
};
var Rt = class extends Ot {
  constructor() {
    super();
  }
  syntaxError(t2, e2, n2, s2, i2, r2) {
    console.error("line " + n2 + ":" + s2 + " " + i2);
  }
};
Rt.INSTANCE = new Rt();
var wt = class extends Ot {
  constructor(t2) {
    if (super(), null === t2) throw "delegates";
    return this.delegates = t2, this;
  }
  syntaxError(t2, e2, n2, s2, i2, r2) {
    this.delegates.map(((o2) => o2.syntaxError(t2, e2, n2, s2, i2, r2)));
  }
  reportAmbiguity(t2, e2, n2, s2, i2, r2, o2) {
    this.delegates.map(((a2) => a2.reportAmbiguity(t2, e2, n2, s2, i2, r2, o2)));
  }
  reportAttemptingFullContext(t2, e2, n2, s2, i2, r2) {
    this.delegates.map(((o2) => o2.reportAttemptingFullContext(t2, e2, n2, s2, i2, r2)));
  }
  reportContextSensitivity(t2, e2, n2, s2, i2, r2) {
    this.delegates.map(((o2) => o2.reportContextSensitivity(t2, e2, n2, s2, i2, r2)));
  }
};
var vt = class {
  constructor() {
    this._listeners = [Rt.INSTANCE], this._interp = null, this._stateNumber = -1;
  }
  checkVersion(t2) {
    const e2 = "4.13.2";
    e2 !== t2 && console.log("ANTLR runtime and generated code versions disagree: " + e2 + "!=" + t2);
  }
  addErrorListener(t2) {
    this._listeners.push(t2);
  }
  removeErrorListeners() {
    this._listeners = [];
  }
  getLiteralNames() {
    return Object.getPrototypeOf(this).constructor.literalNames || [];
  }
  getSymbolicNames() {
    return Object.getPrototypeOf(this).constructor.symbolicNames || [];
  }
  getTokenNames() {
    if (!this.tokenNames) {
      const t2 = this.getLiteralNames(), e2 = this.getSymbolicNames(), n2 = t2.length > e2.length ? t2.length : e2.length;
      this.tokenNames = [];
      for (let s2 = 0; s2 < n2; s2++) this.tokenNames[s2] = t2[s2] || e2[s2] || "<INVALID";
    }
    return this.tokenNames;
  }
  getTokenTypeMap() {
    const t2 = this.getTokenNames();
    if (null === t2) throw "The current recognizer does not provide a list of token names.";
    let e2 = this.tokenTypeMapCache[t2];
    return void 0 === e2 && (e2 = t2.reduce((function(t3, e3, n2) {
      t3[e3] = n2;
    })), e2.EOF = i.EOF, this.tokenTypeMapCache[t2] = e2), e2;
  }
  getRuleIndexMap() {
    const t2 = this.ruleNames;
    if (null === t2) throw "The current recognizer does not provide a list of rule names.";
    let e2 = this.ruleIndexMapCache[t2];
    return void 0 === e2 && (e2 = t2.reduce((function(t3, e3, n2) {
      t3[e3] = n2;
    })), this.ruleIndexMapCache[t2] = e2), e2;
  }
  getTokenType(t2) {
    const e2 = this.getTokenTypeMap()[t2];
    return void 0 !== e2 ? e2 : i.INVALID_TYPE;
  }
  getErrorHeader(t2) {
    return "line " + t2.getOffendingToken().line + ":" + t2.getOffendingToken().column;
  }
  getTokenErrorDisplay(t2) {
    if (null === t2) return "<no token>";
    let e2 = t2.text;
    return null === e2 && (e2 = t2.type === i.EOF ? "<EOF>" : "<" + t2.type + ">"), e2 = e2.replace("\n", "\\n").replace("\r", "\\r").replace("	", "\\t"), "'" + e2 + "'";
  }
  getErrorListenerDispatch() {
    return console.warn("Calling deprecated method in Recognizer class: getErrorListenerDispatch()"), this.getErrorListener();
  }
  getErrorListener() {
    return new wt(this._listeners);
  }
  sempred(t2, e2, n2) {
    return true;
  }
  precpred(t2, e2) {
    return true;
  }
  get atn() {
    return this._interp.atn;
  }
  get state() {
    return this._stateNumber;
  }
  set state(t2) {
    this._stateNumber = t2;
  }
};
vt.tokenTypeMapCache = {}, vt.ruleIndexMapCache = {};
var Pt = class _Pt extends i {
  constructor(t2, e2, n2, s2, r2) {
    super(), this.source = void 0 !== t2 ? t2 : _Pt.EMPTY_SOURCE, this.type = void 0 !== e2 ? e2 : null, this.channel = void 0 !== n2 ? n2 : i.DEFAULT_CHANNEL, this.start = void 0 !== s2 ? s2 : -1, this.stop = void 0 !== r2 ? r2 : -1, this.tokenIndex = -1, null !== this.source[0] ? (this.line = t2[0].line, this.column = t2[0].column) : this.column = -1;
  }
  clone() {
    const t2 = new _Pt(this.source, this.type, this.channel, this.start, this.stop);
    return t2.tokenIndex = this.tokenIndex, t2.line = this.line, t2.column = this.column, t2.text = this.text, t2;
  }
  cloneWithType(t2) {
    const e2 = new _Pt(this.source, t2, this.channel, this.start, this.stop);
    return e2.tokenIndex = this.tokenIndex, e2.line = this.line, e2.column = this.column, t2 === i.EOF && (e2.text = ""), e2;
  }
  toString() {
    let t2 = this.text;
    return t2 = null !== t2 ? t2.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t") : "<no text>", "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + t2 + "',<" + this.type + ">" + (this.channel > 0 ? ",channel=" + this.channel : "") + "," + this.line + ":" + this.column + "]";
  }
  get text() {
    if (null !== this._text) return this._text;
    const t2 = this.getInputStream();
    if (null === t2) return null;
    const e2 = t2.size;
    return this.start < e2 && this.stop < e2 ? t2.getText(this.start, this.stop) : "<EOF>";
  }
  set text(t2) {
    this._text = t2;
  }
};
Pt.EMPTY_SOURCE = [null, null];
var bt = class {
};
var Dt = class extends bt {
  constructor(t2) {
    super(), this.copyText = void 0 !== t2 && t2;
  }
  create(t2, e2, n2, s2, i2, r2, o2, a2) {
    const l2 = new Pt(t2, e2, s2, i2, r2);
    return l2.line = o2, l2.column = a2, null !== n2 ? l2.text = n2 : this.copyText && null !== t2[1] && (l2.text = t2[1].getText(i2, r2)), l2;
  }
  createThin(t2, e2) {
    const n2 = new Pt(null, t2);
    return n2.text = e2, n2;
  }
};
Dt.DEFAULT = new Dt();
var Ft = class _Ft extends Error {
  constructor(t2) {
    super(t2.message), Error.captureStackTrace && Error.captureStackTrace(this, _Ft), this.message = t2.message, this.recognizer = t2.recognizer, this.input = t2.input, this.ctx = t2.ctx, this.offendingToken = null, this.offendingState = -1, null !== this.recognizer && (this.offendingState = this.recognizer.state);
  }
  getExpectedTokens() {
    return null !== this.recognizer ? this.recognizer.atn.getExpectedTokens(this.offendingState, this.ctx) : null;
  }
  toString() {
    return this.message;
  }
};
var Mt = class extends Ft {
  constructor(t2, e2, n2, s2) {
    super({ message: "", recognizer: t2, input: e2, ctx: null }), this.startIndex = n2, this.deadEndConfigs = s2;
  }
  toString() {
    let t2 = "";
    return this.startIndex >= 0 && this.startIndex < this.input.size && (t2 = this.input.getText(new E(this.startIndex, this.startIndex))), "LexerNoViableAltException" + t2;
  }
};
var Ut = class _Ut extends vt {
  constructor(t2) {
    super(), this._input = t2, this._factory = Dt.DEFAULT, this._tokenFactorySourcePair = [this, t2], this._interp = null, this._token = null, this._tokenStartCharIndex = -1, this._tokenStartLine = -1, this._tokenStartColumn = -1, this._hitEOF = false, this._channel = i.DEFAULT_CHANNEL, this._type = i.INVALID_TYPE, this._modeStack = [], this._mode = _Ut.DEFAULT_MODE, this._text = null;
  }
  reset() {
    null !== this._input && this._input.seek(0), this._token = null, this._type = i.INVALID_TYPE, this._channel = i.DEFAULT_CHANNEL, this._tokenStartCharIndex = -1, this._tokenStartColumn = -1, this._tokenStartLine = -1, this._text = null, this._hitEOF = false, this._mode = _Ut.DEFAULT_MODE, this._modeStack = [], this._interp.reset();
  }
  nextToken() {
    if (null === this._input) throw "nextToken requires a non-null input stream.";
    const t2 = this._input.mark();
    try {
      for (; ; ) {
        if (this._hitEOF) return this.emitEOF(), this._token;
        this._token = null, this._channel = i.DEFAULT_CHANNEL, this._tokenStartCharIndex = this._input.index, this._tokenStartColumn = this._interp.column, this._tokenStartLine = this._interp.line, this._text = null;
        let t3 = false;
        for (; ; ) {
          this._type = i.INVALID_TYPE;
          let e2 = _Ut.SKIP;
          try {
            e2 = this._interp.match(this._input, this._mode);
          } catch (t4) {
            if (!(t4 instanceof Ft)) throw console.log(t4.stack), t4;
            this.notifyListeners(t4), this.recover(t4);
          }
          if (this._input.LA(1) === i.EOF && (this._hitEOF = true), this._type === i.INVALID_TYPE && (this._type = e2), this._type === _Ut.SKIP) {
            t3 = true;
            break;
          }
          if (this._type !== _Ut.MORE) break;
        }
        if (!t3) return null === this._token && this.emit(), this._token;
      }
    } finally {
      this._input.release(t2);
    }
  }
  skip() {
    this._type = _Ut.SKIP;
  }
  more() {
    this._type = _Ut.MORE;
  }
  mode(t2) {
    console.warn("Calling deprecated method in Lexer class: mode(...)"), this.setMode(t2);
  }
  setMode(t2) {
    this._mode = t2;
  }
  getMode() {
    return this._mode;
  }
  getModeStack() {
    return this._modeStack;
  }
  pushMode(t2) {
    this._interp.debug && console.log("pushMode " + t2), this._modeStack.push(this._mode), this.setMode(t2);
  }
  popMode() {
    if (0 === this._modeStack.length) throw "Empty Stack";
    return this._interp.debug && console.log("popMode back to " + this._modeStack.slice(0, -1)), this.setMode(this._modeStack.pop()), this._mode;
  }
  emitToken(t2) {
    this._token = t2;
  }
  emit() {
    const t2 = this._factory.create(this._tokenFactorySourcePair, this._type, this._text, this._channel, this._tokenStartCharIndex, this.getCharIndex() - 1, this._tokenStartLine, this._tokenStartColumn);
    return this.emitToken(t2), t2;
  }
  emitEOF() {
    const t2 = this.column, e2 = this.line, n2 = this._factory.create(this._tokenFactorySourcePair, i.EOF, null, i.DEFAULT_CHANNEL, this._input.index, this._input.index - 1, e2, t2);
    return this.emitToken(n2), n2;
  }
  getCharIndex() {
    return this._input.index;
  }
  getAllTokens() {
    const t2 = [];
    let e2 = this.nextToken();
    for (; e2.type !== i.EOF; ) t2.push(e2), e2 = this.nextToken();
    return t2;
  }
  notifyListeners(t2) {
    const e2 = this._tokenStartCharIndex, n2 = this._input.index, s2 = this._input.getText(e2, n2), i2 = "token recognition error at: '" + this.getErrorDisplay(s2) + "'";
    this.getErrorListener().syntaxError(this, null, this._tokenStartLine, this._tokenStartColumn, i2, t2);
  }
  getErrorDisplay(t2) {
    const e2 = [];
    for (let n2 = 0; n2 < t2.length; n2++) e2.push(t2[n2]);
    return e2.join("");
  }
  getErrorDisplayForChar(t2) {
    return t2.charCodeAt(0) === i.EOF ? "<EOF>" : "\n" === t2 ? "\\n" : "	" === t2 ? "\\t" : "\r" === t2 ? "\\r" : t2;
  }
  getCharErrorDisplay(t2) {
    return "'" + this.getErrorDisplayForChar(t2) + "'";
  }
  recover(t2) {
    this._input.LA(1) !== i.EOF && (t2 instanceof Mt ? this._interp.consume(this._input) : this._input.consume());
  }
  get inputStream() {
    return this._input;
  }
  set inputStream(t2) {
    this._input = null, this._tokenFactorySourcePair = [this, this._input], this.reset(), this._input = t2, this._tokenFactorySourcePair = [this, this._input];
  }
  get sourceName() {
    return this._input.sourceName;
  }
  get type() {
    return this._type;
  }
  set type(t2) {
    this._type = t2;
  }
  get line() {
    return this._interp.line;
  }
  set line(t2) {
    this._interp.line = t2;
  }
  get column() {
    return this._interp.column;
  }
  set column(t2) {
    this._interp.column = t2;
  }
  get text() {
    return null !== this._text ? this._text : this._interp.getText(this._input);
  }
  set text(t2) {
    this._text = t2;
  }
};
function Bt(t2) {
  return t2.hashCodeForConfigSet();
}
function zt(t2, e2) {
  return t2 === e2 || null !== t2 && null !== e2 && t2.equalsForConfigSet(e2);
}
Ut.DEFAULT_MODE = 0, Ut.MORE = -2, Ut.SKIP = -3, Ut.DEFAULT_TOKEN_CHANNEL = i.DEFAULT_CHANNEL, Ut.HIDDEN = i.HIDDEN_CHANNEL, Ut.MIN_CHAR_VALUE = 0, Ut.MAX_CHAR_VALUE = 1114111;
var Vt = class _Vt {
  constructor(t2) {
    this.configLookup = new g(Bt, zt), this.fullCtx = void 0 === t2 || t2, this.readOnly = false, this.configs = [], this.uniqueAlt = 0, this.conflictingAlts = null, this.hasSemanticContext = false, this.dipsIntoOuterContext = false, this.cachedHashCode = -1;
  }
  add(t2, e2) {
    if (void 0 === e2 && (e2 = null), this.readOnly) throw "This set is readonly";
    t2.semanticContext !== p.NONE && (this.hasSemanticContext = true), t2.reachesIntoOuterContext > 0 && (this.dipsIntoOuterContext = true);
    const n2 = this.configLookup.getOrAdd(t2);
    if (n2 === t2) return this.cachedHashCode = -1, this.configs.push(t2), true;
    const s2 = !this.fullCtx, i2 = G(n2.context, t2.context, s2, e2);
    return n2.reachesIntoOuterContext = Math.max(n2.reachesIntoOuterContext, t2.reachesIntoOuterContext), t2.precedenceFilterSuppressed && (n2.precedenceFilterSuppressed = true), n2.context = i2, true;
  }
  getStates() {
    const t2 = new g();
    for (let e2 = 0; e2 < this.configs.length; e2++) t2.add(this.configs[e2].state);
    return t2;
  }
  getPredicates() {
    const t2 = [];
    for (let e2 = 0; e2 < this.configs.length; e2++) {
      const n2 = this.configs[e2].semanticContext;
      n2 !== p.NONE && t2.push(n2.semanticContext);
    }
    return t2;
  }
  optimizeConfigs(t2) {
    if (this.readOnly) throw "This set is readonly";
    if (0 !== this.configLookup.length) for (let e2 = 0; e2 < this.configs.length; e2++) {
      const n2 = this.configs[e2];
      n2.context = t2.getCachedContext(n2.context);
    }
  }
  addAll(t2) {
    for (let e2 = 0; e2 < t2.length; e2++) this.add(t2[e2]);
    return false;
  }
  equals(t2) {
    return this === t2 || t2 instanceof _Vt && r(this.configs, t2.configs) && this.fullCtx === t2.fullCtx && this.uniqueAlt === t2.uniqueAlt && this.conflictingAlts === t2.conflictingAlts && this.hasSemanticContext === t2.hasSemanticContext && this.dipsIntoOuterContext === t2.dipsIntoOuterContext;
  }
  hashCode() {
    const t2 = new l();
    return t2.update(this.configs), t2.finish();
  }
  updateHashCode(t2) {
    this.readOnly ? (-1 === this.cachedHashCode && (this.cachedHashCode = this.hashCode()), t2.update(this.cachedHashCode)) : t2.update(this.hashCode());
  }
  isEmpty() {
    return 0 === this.configs.length;
  }
  contains(t2) {
    if (null === this.configLookup) throw "This method is not implemented for readonly sets.";
    return this.configLookup.contains(t2);
  }
  containsFast(t2) {
    if (null === this.configLookup) throw "This method is not implemented for readonly sets.";
    return this.configLookup.containsFast(t2);
  }
  clear() {
    if (this.readOnly) throw "This set is readonly";
    this.configs = [], this.cachedHashCode = -1, this.configLookup = new g();
  }
  setReadonly(t2) {
    this.readOnly = t2, t2 && (this.configLookup = null);
  }
  toString() {
    return d(this.configs) + (this.hasSemanticContext ? ",hasSemanticContext=" + this.hasSemanticContext : "") + (this.uniqueAlt !== $.INVALID_ALT_NUMBER ? ",uniqueAlt=" + this.uniqueAlt : "") + (null !== this.conflictingAlts ? ",conflictingAlts=" + this.conflictingAlts : "") + (this.dipsIntoOuterContext ? ",dipsIntoOuterContext" : "");
  }
  get items() {
    return this.configs;
  }
  get length() {
    return this.configs.length;
  }
};
var qt = class _qt {
  constructor(t2, e2) {
    return null === t2 && (t2 = -1), null === e2 && (e2 = new Vt()), this.stateNumber = t2, this.configs = e2, this.edges = null, this.isAcceptState = false, this.prediction = 0, this.lexerActionExecutor = null, this.requiresFullContext = false, this.predicates = null, this;
  }
  getAltSet() {
    const t2 = new g();
    if (null !== this.configs) for (let e2 = 0; e2 < this.configs.length; e2++) {
      const n2 = this.configs[e2];
      t2.add(n2.alt);
    }
    return 0 === t2.length ? null : t2;
  }
  equals(t2) {
    return this === t2 || t2 instanceof _qt && this.configs.equals(t2.configs);
  }
  toString() {
    let t2 = this.stateNumber + ":" + this.configs;
    return this.isAcceptState && (t2 += "=>", null !== this.predicates ? t2 += this.predicates : t2 += this.prediction), t2;
  }
  hashCode() {
    const t2 = new l();
    return t2.update(this.configs), t2.finish();
  }
};
var Ht = class {
  constructor(t2, e2) {
    return this.atn = t2, this.sharedContextCache = e2, this;
  }
  getCachedContext(t2) {
    if (null === this.sharedContextCache) return t2;
    const e2 = new H();
    return Y(t2, this.sharedContextCache, e2);
  }
};
Ht.ERROR = new qt(2147483647, new Vt());
var Kt = class extends Vt {
  constructor() {
    super(), this.configLookup = new g();
  }
};
var Yt = class _Yt extends m {
  constructor(t2, e2) {
    super(t2, e2);
    const n2 = t2.lexerActionExecutor || null;
    return this.lexerActionExecutor = n2 || (null !== e2 ? e2.lexerActionExecutor : null), this.passedThroughNonGreedyDecision = null !== e2 && this.checkNonGreedyDecision(e2, this.state), this.hashCodeForConfigSet = _Yt.prototype.hashCode, this.equalsForConfigSet = _Yt.prototype.equals, this;
  }
  updateHashCode(t2) {
    t2.update(this.state.stateNumber, this.alt, this.context, this.semanticContext, this.passedThroughNonGreedyDecision, this.lexerActionExecutor);
  }
  equals(t2) {
    return this === t2 || t2 instanceof _Yt && this.passedThroughNonGreedyDecision === t2.passedThroughNonGreedyDecision && (this.lexerActionExecutor ? this.lexerActionExecutor.equals(t2.lexerActionExecutor) : !t2.lexerActionExecutor) && super.equals(t2);
  }
  checkNonGreedyDecision(t2, e2) {
    return t2.passedThroughNonGreedyDecision || e2 instanceof J && e2.nonGreedy;
  }
};
var Gt = class _Gt extends St {
  constructor(t2, e2) {
    super(e2.actionType), this.offset = t2, this.action = e2, this.isPositionDependent = true;
  }
  execute(t2) {
    this.action.execute(t2);
  }
  updateHashCode(t2) {
    t2.update(this.actionType, this.offset, this.action);
  }
  equals(t2) {
    return this === t2 || t2 instanceof _Gt && this.offset === t2.offset && this.action === t2.action;
  }
};
var Wt = class _Wt {
  constructor(t2) {
    return this.lexerActions = null === t2 ? [] : t2, this.cachedHashCode = l.hashStuff(t2), this;
  }
  fixOffsetBeforeMatch(t2) {
    let e2 = null;
    for (let n2 = 0; n2 < this.lexerActions.length; n2++) !this.lexerActions[n2].isPositionDependent || this.lexerActions[n2] instanceof Gt || (null === e2 && (e2 = this.lexerActions.concat([])), e2[n2] = new Gt(t2, this.lexerActions[n2]));
    return null === e2 ? this : new _Wt(e2);
  }
  execute(t2, e2, n2) {
    let s2 = false;
    const i2 = e2.index;
    try {
      for (let r2 = 0; r2 < this.lexerActions.length; r2++) {
        let o2 = this.lexerActions[r2];
        if (o2 instanceof Gt) {
          const t3 = o2.offset;
          e2.seek(n2 + t3), o2 = o2.action, s2 = n2 + t3 !== i2;
        } else o2.isPositionDependent && (e2.seek(i2), s2 = false);
        o2.execute(t2);
      }
    } finally {
      s2 && e2.seek(i2);
    }
  }
  hashCode() {
    return this.cachedHashCode;
  }
  updateHashCode(t2) {
    t2.update(this.cachedHashCode);
  }
  equals(t2) {
    if (this === t2) return true;
    if (t2 instanceof _Wt) {
      if (this.cachedHashCode != t2.cachedHashCode) return false;
      if (this.lexerActions.length != t2.lexerActions.length) return false;
      {
        const e2 = this.lexerActions.length;
        for (let n2 = 0; n2 < e2; ++n2) if (!this.lexerActions[n2].equals(t2.lexerActions[n2])) return false;
        return true;
      }
    }
    return false;
  }
  static append(t2, e2) {
    if (null === t2) return new _Wt([e2]);
    const n2 = t2.lexerActions.concat([e2]);
    return new _Wt(n2);
  }
};
function jt(t2) {
  t2.index = -1, t2.line = 0, t2.column = -1, t2.dfaState = null;
}
var $t = class {
  constructor() {
    jt(this);
  }
  reset() {
    jt(this);
  }
};
var Xt = class _Xt extends Ht {
  constructor(t2, e2, n2, s2) {
    super(e2, s2), this.decisionToDFA = n2, this.recog = t2, this.startIndex = -1, this.line = 1, this.column = 0, this.mode = Ut.DEFAULT_MODE, this.prevAccept = new $t();
  }
  copyState(t2) {
    this.column = t2.column, this.line = t2.line, this.mode = t2.mode, this.startIndex = t2.startIndex;
  }
  match(t2, e2) {
    this.mode = e2;
    const n2 = t2.mark();
    try {
      this.startIndex = t2.index, this.prevAccept.reset();
      const n3 = this.decisionToDFA[e2];
      return null === n3.s0 ? this.matchATN(t2) : this.execATN(t2, n3.s0);
    } finally {
      t2.release(n2);
    }
  }
  reset() {
    this.prevAccept.reset(), this.startIndex = -1, this.line = 1, this.column = 0, this.mode = Ut.DEFAULT_MODE;
  }
  matchATN(t2) {
    const e2 = this.atn.modeToStartState[this.mode];
    _Xt.debug && console.log("matchATN mode " + this.mode + " start: " + e2);
    const n2 = this.mode, s2 = this.computeStartState(t2, e2), i2 = s2.hasSemanticContext;
    s2.hasSemanticContext = false;
    const r2 = this.addDFAState(s2);
    i2 || (this.decisionToDFA[this.mode].s0 = r2);
    const o2 = this.execATN(t2, r2);
    return _Xt.debug && console.log("DFA after matchATN: " + this.decisionToDFA[n2].toLexerString()), o2;
  }
  execATN(t2, e2) {
    _Xt.debug && console.log("start state closure=" + e2.configs), e2.isAcceptState && this.captureSimState(this.prevAccept, t2, e2);
    let n2 = t2.LA(1), s2 = e2;
    for (; ; ) {
      _Xt.debug && console.log("execATN loop starting closure: " + s2.configs);
      let e3 = this.getExistingTargetState(s2, n2);
      if (null === e3 && (e3 = this.computeTargetState(t2, s2, n2)), e3 === Ht.ERROR) break;
      if (n2 !== i.EOF && this.consume(t2), e3.isAcceptState && (this.captureSimState(this.prevAccept, t2, e3), n2 === i.EOF)) break;
      n2 = t2.LA(1), s2 = e3;
    }
    return this.failOrAccept(this.prevAccept, t2, s2.configs, n2);
  }
  getExistingTargetState(t2, e2) {
    if (null === t2.edges || e2 < _Xt.MIN_DFA_EDGE || e2 > _Xt.MAX_DFA_EDGE) return null;
    let n2 = t2.edges[e2 - _Xt.MIN_DFA_EDGE];
    return void 0 === n2 && (n2 = null), _Xt.debug && null !== n2 && console.log("reuse state " + t2.stateNumber + " edge to " + n2.stateNumber), n2;
  }
  computeTargetState(t2, e2, n2) {
    const s2 = new Kt();
    return this.getReachableConfigSet(t2, e2.configs, s2, n2), 0 === s2.items.length ? (s2.hasSemanticContext || this.addDFAEdge(e2, n2, Ht.ERROR), Ht.ERROR) : this.addDFAEdge(e2, n2, null, s2);
  }
  failOrAccept(t2, e2, n2, s2) {
    if (null !== this.prevAccept.dfaState) {
      const n3 = t2.dfaState.lexerActionExecutor;
      return this.accept(e2, n3, this.startIndex, t2.index, t2.line, t2.column), t2.dfaState.prediction;
    }
    if (s2 === i.EOF && e2.index === this.startIndex) return i.EOF;
    throw new Mt(this.recog, e2, this.startIndex, n2);
  }
  getReachableConfigSet(t2, e2, n2, s2) {
    let r2 = $.INVALID_ALT_NUMBER;
    for (let o2 = 0; o2 < e2.items.length; o2++) {
      const a2 = e2.items[o2], l2 = a2.alt === r2;
      if (!l2 || !a2.passedThroughNonGreedyDecision) {
        _Xt.debug && console.log("testing %s at %s\n", this.getTokenName(s2), a2.toString(this.recog, true));
        for (let e3 = 0; e3 < a2.state.transitions.length; e3++) {
          const o3 = a2.state.transitions[e3], h2 = this.getReachableTarget(o3, s2);
          if (null !== h2) {
            let e4 = a2.lexerActionExecutor;
            null !== e4 && (e4 = e4.fixOffsetBeforeMatch(t2.index - this.startIndex));
            const o4 = s2 === i.EOF, c2 = new Yt({ state: h2, lexerActionExecutor: e4 }, a2);
            this.closure(t2, c2, n2, l2, true, o4) && (r2 = a2.alt);
          }
        }
      }
    }
  }
  accept(t2, e2, n2, s2, i2, r2) {
    _Xt.debug && console.log("ACTION %s\n", e2), t2.seek(s2), this.line = i2, this.column = r2, null !== e2 && null !== this.recog && e2.execute(this.recog, t2, n2);
  }
  getReachableTarget(t2, e2) {
    return t2.matches(e2, 0, Ut.MAX_CHAR_VALUE) ? t2.target : null;
  }
  computeStartState(t2, e2) {
    const n2 = B.EMPTY, s2 = new Kt();
    for (let i2 = 0; i2 < e2.transitions.length; i2++) {
      const r2 = e2.transitions[i2].target, o2 = new Yt({ state: r2, alt: i2 + 1, context: n2 }, null);
      this.closure(t2, o2, s2, false, false, false);
    }
    return s2;
  }
  closure(t2, e2, n2, s2, i2, r2) {
    let o2 = null;
    if (_Xt.debug && console.log("closure(" + e2.toString(this.recog, true) + ")"), e2.state instanceof A) {
      if (_Xt.debug && (null !== this.recog ? console.log("closure at %s rule stop %s\n", this.recog.ruleNames[e2.state.ruleIndex], e2) : console.log("closure at rule stop %s\n", e2)), null === e2.context || e2.context.hasEmptyPath()) {
        if (null === e2.context || e2.context.isEmpty()) return n2.add(e2), true;
        n2.add(new Yt({ state: e2.state, context: B.EMPTY }, e2)), s2 = true;
      }
      if (null !== e2.context && !e2.context.isEmpty()) {
        for (let a2 = 0; a2 < e2.context.length; a2++) if (e2.context.getReturnState(a2) !== B.EMPTY_RETURN_STATE) {
          const l2 = e2.context.getParent(a2), h2 = this.atn.states[e2.context.getReturnState(a2)];
          o2 = new Yt({ state: h2, context: l2 }, e2), s2 = this.closure(t2, o2, n2, s2, i2, r2);
        }
      }
      return s2;
    }
    e2.state.epsilonOnlyTransitions || s2 && e2.passedThroughNonGreedyDecision || n2.add(e2);
    for (let a2 = 0; a2 < e2.state.transitions.length; a2++) {
      const l2 = e2.state.transitions[a2];
      o2 = this.getEpsilonTarget(t2, e2, l2, n2, i2, r2), null !== o2 && (s2 = this.closure(t2, o2, n2, s2, i2, r2));
    }
    return s2;
  }
  getEpsilonTarget(t2, e2, n2, s2, r2, o2) {
    let a2 = null;
    if (n2.serializationType === N.RULE) {
      const t3 = V.create(e2.context, n2.followState.stateNumber);
      a2 = new Yt({ state: n2.target, context: t3 }, e2);
    } else {
      if (n2.serializationType === N.PRECEDENCE) throw "Precedence predicates are not supported in lexers.";
      if (n2.serializationType === N.PREDICATE) _Xt.debug && console.log("EVAL rule " + n2.ruleIndex + ":" + n2.predIndex), s2.hasSemanticContext = true, this.evaluatePredicate(t2, n2.ruleIndex, n2.predIndex, r2) && (a2 = new Yt({ state: n2.target }, e2));
      else if (n2.serializationType === N.ACTION) if (null === e2.context || e2.context.hasEmptyPath()) {
        const t3 = Wt.append(e2.lexerActionExecutor, this.atn.lexerActions[n2.actionIndex]);
        a2 = new Yt({ state: n2.target, lexerActionExecutor: t3 }, e2);
      } else a2 = new Yt({ state: n2.target }, e2);
      else n2.serializationType === N.EPSILON ? a2 = new Yt({ state: n2.target }, e2) : n2.serializationType !== N.ATOM && n2.serializationType !== N.RANGE && n2.serializationType !== N.SET || o2 && n2.matches(i.EOF, 0, Ut.MAX_CHAR_VALUE) && (a2 = new Yt({ state: n2.target }, e2));
    }
    return a2;
  }
  evaluatePredicate(t2, e2, n2, s2) {
    if (null === this.recog) return true;
    if (!s2) return this.recog.sempred(null, e2, n2);
    const i2 = this.column, r2 = this.line, o2 = t2.index, a2 = t2.mark();
    try {
      return this.consume(t2), this.recog.sempred(null, e2, n2);
    } finally {
      this.column = i2, this.line = r2, t2.seek(o2), t2.release(a2);
    }
  }
  captureSimState(t2, e2, n2) {
    t2.index = e2.index, t2.line = this.line, t2.column = this.column, t2.dfaState = n2;
  }
  addDFAEdge(t2, e2, n2, s2) {
    if (void 0 === n2 && (n2 = null), void 0 === s2 && (s2 = null), null === n2 && null !== s2) {
      const t3 = s2.hasSemanticContext;
      if (s2.hasSemanticContext = false, n2 = this.addDFAState(s2), t3) return n2;
    }
    return e2 < _Xt.MIN_DFA_EDGE || e2 > _Xt.MAX_DFA_EDGE || (_Xt.debug && console.log("EDGE " + t2 + " -> " + n2 + " upon " + e2), null === t2.edges && (t2.edges = []), t2.edges[e2 - _Xt.MIN_DFA_EDGE] = n2), n2;
  }
  addDFAState(t2) {
    const e2 = new qt(null, t2);
    let n2 = null;
    for (let e3 = 0; e3 < t2.items.length; e3++) {
      const s3 = t2.items[e3];
      if (s3.state instanceof A) {
        n2 = s3;
        break;
      }
    }
    null !== n2 && (e2.isAcceptState = true, e2.lexerActionExecutor = n2.lexerActionExecutor, e2.prediction = this.atn.ruleToTokenType[n2.state.ruleIndex]);
    const s2 = this.decisionToDFA[this.mode], i2 = s2.states.get(e2);
    if (null !== i2) return i2;
    const r2 = e2;
    return r2.stateNumber = s2.states.length, t2.setReadonly(true), r2.configs = t2, s2.states.add(r2), r2;
  }
  getDFA(t2) {
    return this.decisionToDFA[t2];
  }
  getText(t2) {
    return t2.getText(this.startIndex, t2.index - 1);
  }
  consume(t2) {
    t2.LA(1) === "\n".charCodeAt(0) ? (this.line += 1, this.column = 0) : this.column += 1, t2.consume();
  }
  getTokenName(t2) {
    return -1 === t2 ? "EOF" : "'" + String.fromCharCode(t2) + "'";
  }
};
Xt.debug = false, Xt.dfa_debug = false, Xt.MIN_DFA_EDGE = 0, Xt.MAX_DFA_EDGE = 127;
var Jt = class {
  constructor(t2, e2) {
    this.alt = e2, this.pred = t2;
  }
  toString() {
    return "(" + this.pred + ", " + this.alt + ")";
  }
};
var Zt = class {
  constructor() {
    this.data = {};
  }
  get(t2) {
    return this.data["k-" + t2] || null;
  }
  set(t2, e2) {
    this.data["k-" + t2] = e2;
  }
  values() {
    return Object.keys(this.data).filter(((t2) => t2.startsWith("k-"))).map(((t2) => this.data[t2]), this);
  }
};
var Qt = { SLL: 0, LL: 1, LL_EXACT_AMBIG_DETECTION: 2, hasSLLConflictTerminatingPrediction: function(t2, e2) {
  if (Qt.allConfigsInRuleStopStates(e2)) return true;
  if (t2 === Qt.SLL && e2.hasSemanticContext) {
    const t3 = new Vt();
    for (let n3 = 0; n3 < e2.items.length; n3++) {
      let s2 = e2.items[n3];
      s2 = new m({ semanticContext: p.NONE }, s2), t3.add(s2);
    }
    e2 = t3;
  }
  const n2 = Qt.getConflictingAltSubsets(e2);
  return Qt.hasConflictingAltSet(n2) && !Qt.hasStateAssociatedWithOneAlt(e2);
}, hasConfigInRuleStopState: function(t2) {
  for (let e2 = 0; e2 < t2.items.length; e2++) if (t2.items[e2].state instanceof A) return true;
  return false;
}, allConfigsInRuleStopStates: function(t2) {
  for (let e2 = 0; e2 < t2.items.length; e2++) if (!(t2.items[e2].state instanceof A)) return false;
  return true;
}, resolvesToJustOneViableAlt: function(t2) {
  return Qt.getSingleViableAlt(t2);
}, allSubsetsConflict: function(t2) {
  return !Qt.hasNonConflictingAltSet(t2);
}, hasNonConflictingAltSet: function(t2) {
  for (let e2 = 0; e2 < t2.length; e2++) if (1 === t2[e2].length) return true;
  return false;
}, hasConflictingAltSet: function(t2) {
  for (let e2 = 0; e2 < t2.length; e2++) if (t2[e2].length > 1) return true;
  return false;
}, allSubsetsEqual: function(t2) {
  let e2 = null;
  for (let n2 = 0; n2 < t2.length; n2++) {
    const s2 = t2[n2];
    if (null === e2) e2 = s2;
    else if (s2 !== e2) return false;
  }
  return true;
}, getUniqueAlt: function(t2) {
  const e2 = Qt.getAlts(t2);
  return 1 === e2.length ? e2.minValue() : $.INVALID_ALT_NUMBER;
}, getAlts: function(t2) {
  const e2 = new W();
  return t2.map((function(t3) {
    e2.or(t3);
  })), e2;
}, getConflictingAltSubsets: function(t2) {
  const e2 = new H();
  return e2.hashFunction = function(t3) {
    l.hashStuff(t3.state.stateNumber, t3.context);
  }, e2.equalsFunction = function(t3, e3) {
    return t3.state.stateNumber === e3.state.stateNumber && t3.context.equals(e3.context);
  }, t2.items.map((function(t3) {
    let n2 = e2.get(t3);
    null === n2 && (n2 = new W(), e2.set(t3, n2)), n2.set(t3.alt);
  })), e2.getValues();
}, getStateToAltMap: function(t2) {
  const e2 = new Zt();
  return t2.items.map((function(t3) {
    let n2 = e2.get(t3.state);
    null === n2 && (n2 = new W(), e2.set(t3.state, n2)), n2.set(t3.alt);
  })), e2;
}, hasStateAssociatedWithOneAlt: function(t2) {
  const e2 = Qt.getStateToAltMap(t2).values();
  for (let t3 = 0; t3 < e2.length; t3++) if (1 === e2[t3].length) return true;
  return false;
}, getSingleViableAlt: function(t2) {
  let e2 = null;
  for (let n2 = 0; n2 < t2.length; n2++) {
    const s2 = t2[n2].minValue();
    if (null === e2) e2 = s2;
    else if (e2 !== s2) return $.INVALID_ALT_NUMBER;
  }
  return e2;
} };
var te = Qt;
var ee = class extends Ft {
  constructor(t2, e2, n2, s2, i2, r2) {
    r2 = r2 || t2._ctx, s2 = s2 || t2.getCurrentToken(), n2 = n2 || t2.getCurrentToken(), e2 = e2 || t2.getInputStream(), super({ message: "", recognizer: t2, input: e2, ctx: r2 }), this.deadEndConfigs = i2, this.startToken = n2, this.offendingToken = s2;
  }
};
var ne = class {
  constructor(t2) {
    this.defaultMapCtor = t2 || H, this.cacheMap = new this.defaultMapCtor();
  }
  get(t2, e2) {
    const n2 = this.cacheMap.get(t2) || null;
    return null === n2 ? null : n2.get(e2) || null;
  }
  set(t2, e2, n2) {
    let s2 = this.cacheMap.get(t2) || null;
    null === s2 && (s2 = new this.defaultMapCtor(), this.cacheMap.set(t2, s2)), s2.set(e2, n2);
  }
};
var se = class extends Ht {
  constructor(t2, e2, n2, s2) {
    super(e2, s2), this.parser = t2, this.decisionToDFA = n2, this.predictionMode = te.LL, this._input = null, this._startIndex = 0, this._outerContext = null, this._dfa = null, this.mergeCache = null, this.debug = false, this.debug_closure = false, this.debug_add = false, this.trace_atn_sim = false, this.dfa_debug = false, this.retry_debug = false;
  }
  reset() {
  }
  adaptivePredict(t2, e2, n2) {
    (this.debug || this.trace_atn_sim) && console.log("adaptivePredict decision " + e2 + " exec LA(1)==" + this.getLookaheadName(t2) + " line " + t2.LT(1).line + ":" + t2.LT(1).column), this._input = t2, this._startIndex = t2.index, this._outerContext = n2;
    const s2 = this.decisionToDFA[e2];
    this._dfa = s2;
    const i2 = t2.mark(), r2 = t2.index;
    try {
      let e3;
      if (e3 = s2.precedenceDfa ? s2.getPrecedenceStartState(this.parser.getPrecedence()) : s2.s0, null === e3) {
        null === n2 && (n2 = U.EMPTY), this.debug && console.log("predictATN decision " + s2.decision + " exec LA(1)==" + this.getLookaheadName(t2) + ", outerContext=" + n2.toString(this.parser.ruleNames));
        const i4 = false;
        let r3 = this.computeStartState(s2.atnStartState, U.EMPTY, i4);
        s2.precedenceDfa ? (s2.s0.configs = r3, r3 = this.applyPrecedenceFilter(r3), e3 = this.addDFAState(s2, new qt(null, r3)), s2.setPrecedenceStartState(this.parser.getPrecedence(), e3)) : (e3 = this.addDFAState(s2, new qt(null, r3)), s2.s0 = e3);
      }
      const i3 = this.execATN(s2, e3, t2, r2, n2);
      return this.debug && console.log("DFA after predictATN: " + s2.toString(this.parser.literalNames, this.parser.symbolicNames)), i3;
    } finally {
      this._dfa = null, this.mergeCache = null, t2.seek(r2), t2.release(i2);
    }
  }
  execATN(t2, e2, n2, s2, r2) {
    let o2;
    (this.debug || this.trace_atn_sim) && console.log("execATN decision " + t2.decision + ", DFA state " + e2 + ", LA(1)==" + this.getLookaheadName(n2) + " line " + n2.LT(1).line + ":" + n2.LT(1).column);
    let a2 = e2;
    this.debug && console.log("s0 = " + e2);
    let l2 = n2.LA(1);
    for (; ; ) {
      let e3 = this.getExistingTargetState(a2, l2);
      if (null === e3 && (e3 = this.computeTargetState(t2, a2, l2)), e3 === Ht.ERROR) {
        const t3 = this.noViableAlt(n2, r2, a2.configs, s2);
        if (n2.seek(s2), o2 = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(a2.configs, r2), o2 !== $.INVALID_ALT_NUMBER) return o2;
        throw t3;
      }
      if (e3.requiresFullContext && this.predictionMode !== te.SLL) {
        let i2 = null;
        if (null !== e3.predicates) {
          this.debug && console.log("DFA state has preds in DFA sim LL failover");
          const t3 = n2.index;
          if (t3 !== s2 && n2.seek(s2), i2 = this.evalSemanticContext(e3.predicates, r2, true), 1 === i2.length) return this.debug && console.log("Full LL avoided"), i2.minValue();
          t3 !== s2 && n2.seek(t3);
        }
        this.dfa_debug && console.log("ctx sensitive state " + r2 + " in " + e3);
        const a3 = true, l3 = this.computeStartState(t2.atnStartState, r2, a3);
        return this.reportAttemptingFullContext(t2, i2, e3.configs, s2, n2.index), o2 = this.execATNWithFullContext(t2, e3, l3, n2, s2, r2), o2;
      }
      if (e3.isAcceptState) {
        if (null === e3.predicates) return e3.prediction;
        const i2 = n2.index;
        n2.seek(s2);
        const o3 = this.evalSemanticContext(e3.predicates, r2, true);
        if (0 === o3.length) throw this.noViableAlt(n2, r2, e3.configs, s2);
        return 1 === o3.length || this.reportAmbiguity(t2, e3, s2, i2, false, o3, e3.configs), o3.minValue();
      }
      a2 = e3, l2 !== i.EOF && (n2.consume(), l2 = n2.LA(1));
    }
  }
  getExistingTargetState(t2, e2) {
    const n2 = t2.edges;
    return null === n2 ? null : n2[e2 + 1] || null;
  }
  computeTargetState(t2, e2, n2) {
    const s2 = this.computeReachSet(e2.configs, n2, false);
    if (null === s2) return this.addDFAEdge(t2, e2, n2, Ht.ERROR), Ht.ERROR;
    let i2 = new qt(null, s2);
    const r2 = this.getUniqueAlt(s2);
    if (this.debug) {
      const t3 = te.getConflictingAltSubsets(s2);
      console.log("SLL altSubSets=" + d(t3) + ", configs=" + s2 + ", predict=" + r2 + ", allSubsetsConflict=" + te.allSubsetsConflict(t3) + ", conflictingAlts=" + this.getConflictingAlts(s2));
    }
    return r2 !== $.INVALID_ALT_NUMBER ? (i2.isAcceptState = true, i2.configs.uniqueAlt = r2, i2.prediction = r2) : te.hasSLLConflictTerminatingPrediction(this.predictionMode, s2) && (i2.configs.conflictingAlts = this.getConflictingAlts(s2), i2.requiresFullContext = true, i2.isAcceptState = true, i2.prediction = i2.configs.conflictingAlts.minValue()), i2.isAcceptState && i2.configs.hasSemanticContext && (this.predicateDFAState(i2, this.atn.getDecisionState(t2.decision)), null !== i2.predicates && (i2.prediction = $.INVALID_ALT_NUMBER)), i2 = this.addDFAEdge(t2, e2, n2, i2), i2;
  }
  predicateDFAState(t2, e2) {
    const n2 = e2.transitions.length, s2 = this.getConflictingAltsOrUniqueAlt(t2.configs), i2 = this.getPredsForAmbigAlts(s2, t2.configs, n2);
    null !== i2 ? (t2.predicates = this.getPredicatePredictions(s2, i2), t2.prediction = $.INVALID_ALT_NUMBER) : t2.prediction = s2.minValue();
  }
  execATNWithFullContext(t2, e2, n2, s2, r2, o2) {
    (this.debug || this.trace_atn_sim) && console.log("execATNWithFullContext " + n2);
    let a2, l2 = false, h2 = n2;
    s2.seek(r2);
    let c2 = s2.LA(1), u2 = -1;
    for (; ; ) {
      if (a2 = this.computeReachSet(h2, c2, true), null === a2) {
        const t4 = this.noViableAlt(s2, o2, h2, r2);
        s2.seek(r2);
        const e3 = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(h2, o2);
        if (e3 !== $.INVALID_ALT_NUMBER) return e3;
        throw t4;
      }
      const t3 = te.getConflictingAltSubsets(a2);
      if (this.debug && console.log("LL altSubSets=" + t3 + ", predict=" + te.getUniqueAlt(t3) + ", resolvesToJustOneViableAlt=" + te.resolvesToJustOneViableAlt(t3)), a2.uniqueAlt = this.getUniqueAlt(a2), a2.uniqueAlt !== $.INVALID_ALT_NUMBER) {
        u2 = a2.uniqueAlt;
        break;
      }
      if (this.predictionMode !== te.LL_EXACT_AMBIG_DETECTION) {
        if (u2 = te.resolvesToJustOneViableAlt(t3), u2 !== $.INVALID_ALT_NUMBER) break;
      } else if (te.allSubsetsConflict(t3) && te.allSubsetsEqual(t3)) {
        l2 = true, u2 = te.getSingleViableAlt(t3);
        break;
      }
      h2 = a2, c2 !== i.EOF && (s2.consume(), c2 = s2.LA(1));
    }
    return a2.uniqueAlt !== $.INVALID_ALT_NUMBER ? (this.reportContextSensitivity(t2, u2, a2, r2, s2.index), u2) : (this.reportAmbiguity(t2, e2, r2, s2.index, l2, null, a2), u2);
  }
  computeReachSet(t2, e2, n2) {
    this.debug && console.log("in computeReachSet, starting closure: " + t2), null === this.mergeCache && (this.mergeCache = new ne());
    const s2 = new Vt(n2);
    let r2 = null;
    for (let o3 = 0; o3 < t2.items.length; o3++) {
      const a2 = t2.items[o3];
      if (this.debug && console.log("testing " + this.getTokenName(e2) + " at " + a2), a2.state instanceof A) (n2 || e2 === i.EOF) && (null === r2 && (r2 = []), r2.push(a2), this.debug_add && console.log("added " + a2 + " to skippedStopStates"));
      else for (let t3 = 0; t3 < a2.state.transitions.length; t3++) {
        const n3 = a2.state.transitions[t3], i2 = this.getReachableTarget(n3, e2);
        if (null !== i2) {
          const t4 = new m({ state: i2 }, a2);
          s2.add(t4, this.mergeCache), this.debug_add && console.log("added " + t4 + " to intermediate");
        }
      }
    }
    let o2 = null;
    if (null === r2 && e2 !== i.EOF && (1 === s2.items.length || this.getUniqueAlt(s2) !== $.INVALID_ALT_NUMBER) && (o2 = s2), null === o2) {
      o2 = new Vt(n2);
      const t3 = new g(), r3 = e2 === i.EOF;
      for (let e3 = 0; e3 < s2.items.length; e3++) this.closure(s2.items[e3], o2, t3, false, n2, r3);
    }
    if (e2 === i.EOF && (o2 = this.removeAllConfigsNotInRuleStopState(o2, o2 === s2)), !(null === r2 || n2 && te.hasConfigInRuleStopState(o2))) for (let t3 = 0; t3 < r2.length; t3++) o2.add(r2[t3], this.mergeCache);
    return this.trace_atn_sim && console.log("computeReachSet " + t2 + " -> " + o2), 0 === o2.items.length ? null : o2;
  }
  removeAllConfigsNotInRuleStopState(t2, e2) {
    if (te.allConfigsInRuleStopStates(t2)) return t2;
    const n2 = new Vt(t2.fullCtx);
    for (let s2 = 0; s2 < t2.items.length; s2++) {
      const r2 = t2.items[s2];
      if (r2.state instanceof A) n2.add(r2, this.mergeCache);
      else if (e2 && r2.state.epsilonOnlyTransitions && this.atn.nextTokens(r2.state).contains(i.EPSILON)) {
        const t3 = this.atn.ruleToStopState[r2.state.ruleIndex];
        n2.add(new m({ state: t3 }, r2), this.mergeCache);
      }
    }
    return n2;
  }
  computeStartState(t2, e2, n2) {
    const s2 = K(this.atn, e2), i2 = new Vt(n2);
    this.trace_atn_sim && console.log("computeStartState from ATN state " + t2 + " initialContext=" + s2.toString(this.parser));
    for (let e3 = 0; e3 < t2.transitions.length; e3++) {
      const r2 = t2.transitions[e3].target, o2 = new m({ state: r2, alt: e3 + 1, context: s2 }, null), a2 = new g();
      this.closure(o2, i2, a2, true, n2, false);
    }
    return i2;
  }
  applyPrecedenceFilter(t2) {
    let e2;
    const n2 = [], s2 = new Vt(t2.fullCtx);
    for (let i2 = 0; i2 < t2.items.length; i2++) {
      if (e2 = t2.items[i2], 1 !== e2.alt) continue;
      const r2 = e2.semanticContext.evalPrecedence(this.parser, this._outerContext);
      null !== r2 && (n2[e2.state.stateNumber] = e2.context, r2 !== e2.semanticContext ? s2.add(new m({ semanticContext: r2 }, e2), this.mergeCache) : s2.add(e2, this.mergeCache));
    }
    for (let i2 = 0; i2 < t2.items.length; i2++) if (e2 = t2.items[i2], 1 !== e2.alt) {
      if (!e2.precedenceFilterSuppressed) {
        const t3 = n2[e2.state.stateNumber] || null;
        if (null !== t3 && t3.equals(e2.context)) continue;
      }
      s2.add(e2, this.mergeCache);
    }
    return s2;
  }
  getReachableTarget(t2, e2) {
    return t2.matches(e2, 0, this.atn.maxTokenType) ? t2.target : null;
  }
  getPredsForAmbigAlts(t2, e2, n2) {
    let s2 = [];
    for (let n3 = 0; n3 < e2.items.length; n3++) {
      const i3 = e2.items[n3];
      t2.get(i3.alt) && (s2[i3.alt] = p.orContext(s2[i3.alt] || null, i3.semanticContext));
    }
    let i2 = 0;
    for (let t3 = 1; t3 < n2 + 1; t3++) {
      const e3 = s2[t3] || null;
      null === e3 ? s2[t3] = p.NONE : e3 !== p.NONE && (i2 += 1);
    }
    return 0 === i2 && (s2 = null), this.debug && console.log("getPredsForAmbigAlts result " + d(s2)), s2;
  }
  getPredicatePredictions(t2, e2) {
    const n2 = [];
    let s2 = false;
    for (let i2 = 1; i2 < e2.length; i2++) {
      const r2 = e2[i2];
      null !== t2 && t2.get(i2) && n2.push(new Jt(r2, i2)), r2 !== p.NONE && (s2 = true);
    }
    return s2 ? n2 : null;
  }
  getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(t2, e2) {
    const n2 = this.splitAccordingToSemanticValidity(t2, e2), s2 = n2[0], i2 = n2[1];
    let r2 = this.getAltThatFinishedDecisionEntryRule(s2);
    return r2 !== $.INVALID_ALT_NUMBER || i2.items.length > 0 && (r2 = this.getAltThatFinishedDecisionEntryRule(i2), r2 !== $.INVALID_ALT_NUMBER) ? r2 : $.INVALID_ALT_NUMBER;
  }
  getAltThatFinishedDecisionEntryRule(t2) {
    const e2 = [];
    for (let n2 = 0; n2 < t2.items.length; n2++) {
      const s2 = t2.items[n2];
      (s2.reachesIntoOuterContext > 0 || s2.state instanceof A && s2.context.hasEmptyPath()) && e2.indexOf(s2.alt) < 0 && e2.push(s2.alt);
    }
    return 0 === e2.length ? $.INVALID_ALT_NUMBER : Math.min.apply(null, e2);
  }
  splitAccordingToSemanticValidity(t2, e2) {
    const n2 = new Vt(t2.fullCtx), s2 = new Vt(t2.fullCtx);
    for (let i2 = 0; i2 < t2.items.length; i2++) {
      const r2 = t2.items[i2];
      r2.semanticContext !== p.NONE ? r2.semanticContext.evaluate(this.parser, e2) ? n2.add(r2) : s2.add(r2) : n2.add(r2);
    }
    return [n2, s2];
  }
  evalSemanticContext(t2, e2, n2) {
    const s2 = new W();
    for (let i2 = 0; i2 < t2.length; i2++) {
      const r2 = t2[i2];
      if (r2.pred === p.NONE) {
        if (s2.set(r2.alt), !n2) break;
        continue;
      }
      const o2 = r2.pred.evaluate(this.parser, e2);
      if ((this.debug || this.dfa_debug) && console.log("eval pred " + r2 + "=" + o2), o2 && ((this.debug || this.dfa_debug) && console.log("PREDICT " + r2.alt), s2.set(r2.alt), !n2)) break;
    }
    return s2;
  }
  closure(t2, e2, n2, s2, i2, r2) {
    this.closureCheckingStopState(t2, e2, n2, s2, i2, 0, r2);
  }
  closureCheckingStopState(t2, e2, n2, s2, i2, r2, o2) {
    if ((this.trace_atn_sim || this.debug_closure) && console.log("closure(" + t2.toString(this.parser, true) + ")"), t2.state instanceof A) {
      if (!t2.context.isEmpty()) {
        for (let a2 = 0; a2 < t2.context.length; a2++) {
          if (t2.context.getReturnState(a2) === B.EMPTY_RETURN_STATE) {
            if (i2) {
              e2.add(new m({ state: t2.state, context: B.EMPTY }, t2), this.mergeCache);
              continue;
            }
            this.debug && console.log("FALLING off rule " + this.getRuleName(t2.state.ruleIndex)), this.closure_(t2, e2, n2, s2, i2, r2, o2);
            continue;
          }
          const l2 = this.atn.states[t2.context.getReturnState(a2)], h2 = t2.context.getParent(a2), c2 = { state: l2, alt: t2.alt, context: h2, semanticContext: t2.semanticContext }, u2 = new m(c2, null);
          u2.reachesIntoOuterContext = t2.reachesIntoOuterContext, this.closureCheckingStopState(u2, e2, n2, s2, i2, r2 - 1, o2);
        }
        return;
      }
      if (i2) return void e2.add(t2, this.mergeCache);
      this.debug && console.log("FALLING off rule " + this.getRuleName(t2.state.ruleIndex));
    }
    this.closure_(t2, e2, n2, s2, i2, r2, o2);
  }
  closure_(t2, e2, n2, s2, i2, r2, o2) {
    const a2 = t2.state;
    a2.epsilonOnlyTransitions || e2.add(t2, this.mergeCache);
    for (let l2 = 0; l2 < a2.transitions.length; l2++) {
      if (0 === l2 && this.canDropLoopEntryEdgeInLeftRecursiveRule(t2)) continue;
      const h2 = a2.transitions[l2], c2 = s2 && !(h2 instanceof ut), u2 = this.getEpsilonTarget(t2, h2, c2, 0 === r2, i2, o2);
      if (null !== u2) {
        let s3 = r2;
        if (t2.state instanceof A) {
          if (null !== this._dfa && this._dfa.precedenceDfa && h2.outermostPrecedenceReturn === this._dfa.atnStartState.ruleIndex && (u2.precedenceFilterSuppressed = true), u2.reachesIntoOuterContext += 1, n2.getOrAdd(u2) !== u2) continue;
          e2.dipsIntoOuterContext = true, s3 -= 1, this.debug && console.log("dips into outer ctx: " + u2);
        } else {
          if (!h2.isEpsilon && n2.getOrAdd(u2) !== u2) continue;
          h2 instanceof k && s3 >= 0 && (s3 += 1);
        }
        this.closureCheckingStopState(u2, e2, n2, c2, i2, s3, o2);
      }
    }
  }
  canDropLoopEntryEdgeInLeftRecursiveRule(t2) {
    const e2 = t2.state;
    if (e2.stateType !== C.STAR_LOOP_ENTRY) return false;
    if (e2.stateType !== C.STAR_LOOP_ENTRY || !e2.isPrecedenceDecision || t2.context.isEmpty() || t2.context.hasEmptyPath()) return false;
    const n2 = t2.context.length;
    for (let s3 = 0; s3 < n2; s3++) if (this.atn.states[t2.context.getReturnState(s3)].ruleIndex !== e2.ruleIndex) return false;
    const s2 = e2.transitions[0].target.endState.stateNumber, i2 = this.atn.states[s2];
    for (let s3 = 0; s3 < n2; s3++) {
      const n3 = t2.context.getReturnState(s3), r2 = this.atn.states[n3];
      if (1 !== r2.transitions.length || !r2.transitions[0].isEpsilon) return false;
      const o2 = r2.transitions[0].target;
      if (!(r2.stateType === C.BLOCK_END && o2 === e2 || r2 === i2 || o2 === i2 || o2.stateType === C.BLOCK_END && 1 === o2.transitions.length && o2.transitions[0].isEpsilon && o2.transitions[0].target === e2)) return false;
    }
    return true;
  }
  getRuleName(t2) {
    return null !== this.parser && t2 >= 0 ? this.parser.ruleNames[t2] : "<rule " + t2 + ">";
  }
  getEpsilonTarget(t2, e2, n2, s2, r2, o2) {
    switch (e2.serializationType) {
      case N.RULE:
        return this.ruleTransition(t2, e2);
      case N.PRECEDENCE:
        return this.precedenceTransition(t2, e2, n2, s2, r2);
      case N.PREDICATE:
        return this.predTransition(t2, e2, n2, s2, r2);
      case N.ACTION:
        return this.actionTransition(t2, e2);
      case N.EPSILON:
        return new m({ state: e2.target }, t2);
      case N.ATOM:
      case N.RANGE:
      case N.SET:
        return o2 && e2.matches(i.EOF, 0, 1) ? new m({ state: e2.target }, t2) : null;
      default:
        return null;
    }
  }
  actionTransition(t2, e2) {
    if (this.debug) {
      const t3 = -1 === e2.actionIndex ? 65535 : e2.actionIndex;
      console.log("ACTION edge " + e2.ruleIndex + ":" + t3);
    }
    return new m({ state: e2.target }, t2);
  }
  precedenceTransition(t2, e2, n2, s2, i2) {
    this.debug && (console.log("PRED (collectPredicates=" + n2 + ") " + e2.precedence + ">=_p, ctx dependent=true"), null !== this.parser && console.log("context surrounding pred is " + d(this.parser.getRuleInvocationStack())));
    let r2 = null;
    if (n2 && s2) if (i2) {
      const n3 = this._input.index;
      this._input.seek(this._startIndex);
      const s3 = e2.getPredicate().evaluate(this.parser, this._outerContext);
      this._input.seek(n3), s3 && (r2 = new m({ state: e2.target }, t2));
    } else {
      const n3 = p.andContext(t2.semanticContext, e2.getPredicate());
      r2 = new m({ state: e2.target, semanticContext: n3 }, t2);
    }
    else r2 = new m({ state: e2.target }, t2);
    return this.debug && console.log("config from pred transition=" + r2), r2;
  }
  predTransition(t2, e2, n2, s2, i2) {
    this.debug && (console.log("PRED (collectPredicates=" + n2 + ") " + e2.ruleIndex + ":" + e2.predIndex + ", ctx dependent=" + e2.isCtxDependent), null !== this.parser && console.log("context surrounding pred is " + d(this.parser.getRuleInvocationStack())));
    let r2 = null;
    if (n2 && (e2.isCtxDependent && s2 || !e2.isCtxDependent)) if (i2) {
      const n3 = this._input.index;
      this._input.seek(this._startIndex);
      const s3 = e2.getPredicate().evaluate(this.parser, this._outerContext);
      this._input.seek(n3), s3 && (r2 = new m({ state: e2.target }, t2));
    } else {
      const n3 = p.andContext(t2.semanticContext, e2.getPredicate());
      r2 = new m({ state: e2.target, semanticContext: n3 }, t2);
    }
    else r2 = new m({ state: e2.target }, t2);
    return this.debug && console.log("config from pred transition=" + r2), r2;
  }
  ruleTransition(t2, e2) {
    this.debug && console.log("CALL rule " + this.getRuleName(e2.target.ruleIndex) + ", ctx=" + t2.context);
    const n2 = e2.followState, s2 = V.create(t2.context, n2.stateNumber);
    return new m({ state: e2.target, context: s2 }, t2);
  }
  getConflictingAlts(t2) {
    const e2 = te.getConflictingAltSubsets(t2);
    return te.getAlts(e2);
  }
  getConflictingAltsOrUniqueAlt(t2) {
    let e2 = null;
    return t2.uniqueAlt !== $.INVALID_ALT_NUMBER ? (e2 = new W(), e2.set(t2.uniqueAlt)) : e2 = t2.conflictingAlts, e2;
  }
  getTokenName(t2) {
    if (t2 === i.EOF) return "EOF";
    if (null !== this.parser && null !== this.parser.literalNames) {
      if (!(t2 >= this.parser.literalNames.length && t2 >= this.parser.symbolicNames.length)) return (this.parser.literalNames[t2] || this.parser.symbolicNames[t2]) + "<" + t2 + ">";
      console.log(t2 + " ttype out of range: " + this.parser.literalNames), console.log("" + this.parser.getInputStream().getTokens());
    }
    return "" + t2;
  }
  getLookaheadName(t2) {
    return this.getTokenName(t2.LA(1));
  }
  dumpDeadEndConfigs(t2) {
    console.log("dead end configs: ");
    const e2 = t2.getDeadEndConfigs();
    for (let t3 = 0; t3 < e2.length; t3++) {
      const n2 = e2[t3];
      let s2 = "no edges";
      if (n2.state.transitions.length > 0) {
        const t4 = n2.state.transitions[0];
        t4 instanceof ht ? s2 = "Atom " + this.getTokenName(t4.label) : t4 instanceof I && (s2 = (t4 instanceof y ? "~" : "") + "Set " + t4.set);
      }
      console.error(n2.toString(this.parser, true) + ":" + s2);
    }
  }
  noViableAlt(t2, e2, n2, s2) {
    return new ee(this.parser, t2, t2.get(s2), t2.LT(1), n2, e2);
  }
  getUniqueAlt(t2) {
    let e2 = $.INVALID_ALT_NUMBER;
    for (let n2 = 0; n2 < t2.items.length; n2++) {
      const s2 = t2.items[n2];
      if (e2 === $.INVALID_ALT_NUMBER) e2 = s2.alt;
      else if (s2.alt !== e2) return $.INVALID_ALT_NUMBER;
    }
    return e2;
  }
  addDFAEdge(t2, e2, n2, s2) {
    if (this.debug && console.log("EDGE " + e2 + " -> " + s2 + " upon " + this.getTokenName(n2)), null === s2) return null;
    if (s2 = this.addDFAState(t2, s2), null === e2 || n2 < -1 || n2 > this.atn.maxTokenType) return s2;
    if (null === e2.edges && (e2.edges = []), e2.edges[n2 + 1] = s2, this.debug) {
      const e3 = null === this.parser ? null : this.parser.literalNames, n3 = null === this.parser ? null : this.parser.symbolicNames;
      console.log("DFA=\n" + t2.toString(e3, n3));
    }
    return s2;
  }
  addDFAState(t2, e2) {
    if (e2 === Ht.ERROR) return e2;
    const n2 = t2.states.get(e2);
    return null !== n2 ? (this.trace_atn_sim && console.log("addDFAState " + e2 + " exists"), n2) : (e2.stateNumber = t2.states.length, e2.configs.readOnly || (e2.configs.optimizeConfigs(this), e2.configs.setReadonly(true)), this.trace_atn_sim && console.log("addDFAState new " + e2), t2.states.add(e2), this.debug && console.log("adding new DFA state: " + e2), e2);
  }
  reportAttemptingFullContext(t2, e2, n2, s2, i2) {
    if (this.debug || this.retry_debug) {
      const e3 = new E(s2, i2 + 1);
      console.log("reportAttemptingFullContext decision=" + t2.decision + ":" + n2 + ", input=" + this.parser.getTokenStream().getText(e3));
    }
    null !== this.parser && this.parser.getErrorListener().reportAttemptingFullContext(this.parser, t2, s2, i2, e2, n2);
  }
  reportContextSensitivity(t2, e2, n2, s2, i2) {
    if (this.debug || this.retry_debug) {
      const e3 = new E(s2, i2 + 1);
      console.log("reportContextSensitivity decision=" + t2.decision + ":" + n2 + ", input=" + this.parser.getTokenStream().getText(e3));
    }
    null !== this.parser && this.parser.getErrorListener().reportContextSensitivity(this.parser, t2, s2, i2, e2, n2);
  }
  reportAmbiguity(t2, e2, n2, s2, i2, r2, o2) {
    if (this.debug || this.retry_debug) {
      const t3 = new E(n2, s2 + 1);
      console.log("reportAmbiguity " + r2 + ":" + o2 + ", input=" + this.parser.getTokenStream().getText(t3));
    }
    null !== this.parser && this.parser.getErrorListener().reportAmbiguity(this.parser, t2, n2, s2, i2, r2, o2);
  }
};
var ie = class {
  constructor() {
    this.cache = new H();
  }
  add(t2) {
    if (t2 === B.EMPTY) return B.EMPTY;
    const e2 = this.cache.get(t2) || null;
    return null !== e2 ? e2 : (this.cache.set(t2, t2), t2);
  }
  get(t2) {
    return this.cache.get(t2) || null;
  }
  get length() {
    return this.cache.length;
  }
};
var re = { ATN: $, ATNDeserializer: Lt, LexerATNSimulator: Xt, ParserATNSimulator: se, PredictionMode: te, PredictionContextCache: ie };
var oe = class {
  constructor(t2, e2, n2) {
    this.dfa = t2, this.literalNames = e2 || [], this.symbolicNames = n2 || [];
  }
  toString() {
    if (null === this.dfa.s0) return null;
    let t2 = "";
    const e2 = this.dfa.sortedStates();
    for (let n2 = 0; n2 < e2.length; n2++) {
      const s2 = e2[n2];
      if (null !== s2.edges) {
        const e3 = s2.edges.length;
        for (let n3 = 0; n3 < e3; n3++) {
          const e4 = s2.edges[n3] || null;
          null !== e4 && 2147483647 !== e4.stateNumber && (t2 = t2.concat(this.getStateString(s2)), t2 = t2.concat("-"), t2 = t2.concat(this.getEdgeLabel(n3)), t2 = t2.concat("->"), t2 = t2.concat(this.getStateString(e4)), t2 = t2.concat("\n"));
        }
      }
    }
    return 0 === t2.length ? null : t2;
  }
  getEdgeLabel(t2) {
    return 0 === t2 ? "EOF" : null !== this.literalNames || null !== this.symbolicNames ? this.literalNames[t2 - 1] || this.symbolicNames[t2 - 1] : String.fromCharCode(t2 - 1);
  }
  getStateString(t2) {
    const e2 = (t2.isAcceptState ? ":" : "") + "s" + t2.stateNumber + (t2.requiresFullContext ? "^" : "");
    return t2.isAcceptState ? null !== t2.predicates ? e2 + "=>" + d(t2.predicates) : e2 + "=>" + t2.prediction.toString() : e2;
  }
};
var ae = class extends oe {
  constructor(t2) {
    super(t2, null);
  }
  getEdgeLabel(t2) {
    return "'" + String.fromCharCode(t2) + "'";
  }
};
var le = class {
  constructor(t2, e2) {
    if (void 0 === e2 && (e2 = 0), this.atnStartState = t2, this.decision = e2, this._states = new g(), this.s0 = null, this.precedenceDfa = false, t2 instanceof rt && t2.isPrecedenceDecision) {
      this.precedenceDfa = true;
      const t3 = new qt(null, new Vt());
      t3.edges = [], t3.isAcceptState = false, t3.requiresFullContext = false, this.s0 = t3;
    }
  }
  getPrecedenceStartState(t2) {
    if (!this.precedenceDfa) throw "Only precedence DFAs may contain a precedence start state.";
    return t2 < 0 || t2 >= this.s0.edges.length ? null : this.s0.edges[t2] || null;
  }
  setPrecedenceStartState(t2, e2) {
    if (!this.precedenceDfa) throw "Only precedence DFAs may contain a precedence start state.";
    t2 < 0 || (this.s0.edges[t2] = e2);
  }
  setPrecedenceDfa(t2) {
    if (this.precedenceDfa !== t2) {
      if (this._states = new g(), t2) {
        const t3 = new qt(null, new Vt());
        t3.edges = [], t3.isAcceptState = false, t3.requiresFullContext = false, this.s0 = t3;
      } else this.s0 = null;
      this.precedenceDfa = t2;
    }
  }
  sortedStates() {
    return this._states.values().sort((function(t2, e2) {
      return t2.stateNumber - e2.stateNumber;
    }));
  }
  toString(t2, e2) {
    return t2 = t2 || null, e2 = e2 || null, null === this.s0 ? "" : new oe(this, t2, e2).toString();
  }
  toLexerString() {
    return null === this.s0 ? "" : new ae(this).toString();
  }
  get states() {
    return this._states;
  }
};
var he = { DFA: le, DFASerializer: oe, LexerDFASerializer: ae, PredPrediction: Jt };
var ce = { PredictionContext: B };
var ue = { Interval: E, IntervalSet: _ };
var de = class {
  visitTerminal(t2) {
  }
  visitErrorNode(t2) {
  }
  enterEveryRule(t2) {
  }
  exitEveryRule(t2) {
  }
};
var ge = class {
  visit(t2) {
    return Array.isArray(t2) ? t2.map((function(t3) {
      return t3.accept(this);
    }), this) : t2.accept(this);
  }
  visitChildren(t2) {
    return t2.children ? this.visit(t2.children) : null;
  }
  visitTerminal(t2) {
  }
  visitErrorNode(t2) {
  }
};
var pe = class {
  walk(t2, e2) {
    if (e2 instanceof D || void 0 !== e2.isErrorNode && e2.isErrorNode()) t2.visitErrorNode(e2);
    else if (e2 instanceof b) t2.visitTerminal(e2);
    else {
      this.enterRule(t2, e2);
      for (let n2 = 0; n2 < e2.getChildCount(); n2++) {
        const s2 = e2.getChild(n2);
        this.walk(t2, s2);
      }
      this.exitRule(t2, e2);
    }
  }
  enterRule(t2, e2) {
    const n2 = e2.ruleContext;
    t2.enterEveryRule(n2), n2.enterRule(t2);
  }
  exitRule(t2, e2) {
    const n2 = e2.ruleContext;
    n2.exitRule(t2), t2.exitEveryRule(n2);
  }
};
pe.DEFAULT = new pe();
var fe = { Trees: M, RuleNode: P, ErrorNode: D, TerminalNode: b, ParseTreeListener: de, ParseTreeVisitor: ge, ParseTreeWalker: pe };
var xe = class extends Ft {
  constructor(t2) {
    super({ message: "", recognizer: t2, input: t2.getInputStream(), ctx: t2._ctx }), this.offendingToken = t2.getCurrentToken();
  }
};
var Te = class extends Ft {
  constructor(t2, e2, n2) {
    super({ message: Se(e2, n2 || null), recognizer: t2, input: t2.getInputStream(), ctx: t2._ctx });
    const s2 = t2._interp.atn.states[t2.state].transitions[0];
    s2 instanceof pt ? (this.ruleIndex = s2.ruleIndex, this.predicateIndex = s2.predIndex) : (this.ruleIndex = 0, this.predicateIndex = 0), this.predicate = e2, this.offendingToken = t2.getCurrentToken();
  }
};
function Se(t2, e2) {
  return null !== e2 ? e2 : "failed predicate: {" + t2 + "}?";
}
var me = class extends Ot {
  constructor(t2) {
    super(), t2 = t2 || true, this.exactOnly = t2;
  }
  reportAmbiguity(t2, e2, n2, s2, i2, r2, o2) {
    if (this.exactOnly && !i2) return;
    const a2 = "reportAmbiguity d=" + this.getDecisionDescription(t2, e2) + ": ambigAlts=" + this.getConflictingAlts(r2, o2) + ", input='" + t2.getTokenStream().getText(new E(n2, s2)) + "'";
    t2.notifyErrorListeners(a2);
  }
  reportAttemptingFullContext(t2, e2, n2, s2, i2, r2) {
    const o2 = "reportAttemptingFullContext d=" + this.getDecisionDescription(t2, e2) + ", input='" + t2.getTokenStream().getText(new E(n2, s2)) + "'";
    t2.notifyErrorListeners(o2);
  }
  reportContextSensitivity(t2, e2, n2, s2, i2, r2) {
    const o2 = "reportContextSensitivity d=" + this.getDecisionDescription(t2, e2) + ", input='" + t2.getTokenStream().getText(new E(n2, s2)) + "'";
    t2.notifyErrorListeners(o2);
  }
  getDecisionDescription(t2, e2) {
    const n2 = e2.decision, s2 = e2.atnStartState.ruleIndex, i2 = t2.ruleNames;
    if (s2 < 0 || s2 >= i2.length) return "" + n2;
    const r2 = i2[s2] || null;
    return null === r2 || 0 === r2.length ? "" + n2 : `${n2} (${r2})`;
  }
  getConflictingAlts(t2, e2) {
    if (null !== t2) return t2;
    const n2 = new W();
    for (let t3 = 0; t3 < e2.items.length; t3++) n2.set(e2.items[t3].alt);
    return `{${n2.values().join(", ")}}`;
  }
};
var Ee = class _Ee extends Error {
  constructor() {
    super(), Error.captureStackTrace(this, _Ee);
  }
};
var _e = class {
  reset(t2) {
  }
  recoverInline(t2) {
  }
  recover(t2, e2) {
  }
  sync(t2) {
  }
  inErrorRecoveryMode(t2) {
  }
  reportError(t2) {
  }
};
var Ce = class extends _e {
  constructor() {
    super(), this.errorRecoveryMode = false, this.lastErrorIndex = -1, this.lastErrorStates = null, this.nextTokensContext = null, this.nextTokenState = 0;
  }
  reset(t2) {
    this.endErrorCondition(t2);
  }
  beginErrorCondition(t2) {
    this.errorRecoveryMode = true;
  }
  inErrorRecoveryMode(t2) {
    return this.errorRecoveryMode;
  }
  endErrorCondition(t2) {
    this.errorRecoveryMode = false, this.lastErrorStates = null, this.lastErrorIndex = -1;
  }
  reportMatch(t2) {
    this.endErrorCondition(t2);
  }
  reportError(t2, e2) {
    this.inErrorRecoveryMode(t2) || (this.beginErrorCondition(t2), e2 instanceof ee ? this.reportNoViableAlternative(t2, e2) : e2 instanceof xe ? this.reportInputMismatch(t2, e2) : e2 instanceof Te ? this.reportFailedPredicate(t2, e2) : (console.log("unknown recognition error type: " + e2.constructor.name), console.log(e2.stack), t2.notifyErrorListeners(e2.getOffendingToken(), e2.getMessage(), e2)));
  }
  recover(t2, e2) {
    this.lastErrorIndex === t2.getInputStream().index && null !== this.lastErrorStates && this.lastErrorStates.indexOf(t2.state) >= 0 && t2.consume(), this.lastErrorIndex = t2._input.index, null === this.lastErrorStates && (this.lastErrorStates = []), this.lastErrorStates.push(t2.state);
    const n2 = this.getErrorRecoverySet(t2);
    this.consumeUntil(t2, n2);
  }
  sync(t2) {
    if (this.inErrorRecoveryMode(t2)) return;
    const e2 = t2._interp.atn.states[t2.state], n2 = t2.getTokenStream().LA(1), s2 = t2.atn.nextTokens(e2);
    if (s2.contains(n2)) return this.nextTokensContext = null, void (this.nextTokenState = C.INVALID_STATE_NUMBER);
    if (s2.contains(i.EPSILON)) null === this.nextTokensContext && (this.nextTokensContext = t2._ctx, this.nextTokensState = t2._stateNumber);
    else switch (e2.stateType) {
      case C.BLOCK_START:
      case C.STAR_BLOCK_START:
      case C.PLUS_BLOCK_START:
      case C.STAR_LOOP_ENTRY:
        if (null !== this.singleTokenDeletion(t2)) return;
        throw new xe(t2);
      case C.PLUS_LOOP_BACK:
      case C.STAR_LOOP_BACK: {
        this.reportUnwantedToken(t2);
        const e3 = new _();
        e3.addSet(t2.getExpectedTokens());
        const n3 = e3.addSet(this.getErrorRecoverySet(t2));
        this.consumeUntil(t2, n3);
      }
    }
  }
  reportNoViableAlternative(t2, e2) {
    const n2 = t2.getTokenStream();
    let s2;
    s2 = null !== n2 ? e2.startToken.type === i.EOF ? "<EOF>" : n2.getText(new E(e2.startToken.tokenIndex, e2.offendingToken.tokenIndex)) : "<unknown input>";
    const r2 = "no viable alternative at input " + this.escapeWSAndQuote(s2);
    t2.notifyErrorListeners(r2, e2.offendingToken, e2);
  }
  reportInputMismatch(t2, e2) {
    const n2 = "mismatched input " + this.getTokenErrorDisplay(e2.offendingToken) + " expecting " + e2.getExpectedTokens().toString(t2.literalNames, t2.symbolicNames);
    t2.notifyErrorListeners(n2, e2.offendingToken, e2);
  }
  reportFailedPredicate(t2, e2) {
    const n2 = "rule " + t2.ruleNames[t2._ctx.ruleIndex] + " " + e2.message;
    t2.notifyErrorListeners(n2, e2.offendingToken, e2);
  }
  reportUnwantedToken(t2) {
    if (this.inErrorRecoveryMode(t2)) return;
    this.beginErrorCondition(t2);
    const e2 = t2.getCurrentToken(), n2 = "extraneous input " + this.getTokenErrorDisplay(e2) + " expecting " + this.getExpectedTokens(t2).toString(t2.literalNames, t2.symbolicNames);
    t2.notifyErrorListeners(n2, e2, null);
  }
  reportMissingToken(t2) {
    if (this.inErrorRecoveryMode(t2)) return;
    this.beginErrorCondition(t2);
    const e2 = t2.getCurrentToken(), n2 = "missing " + this.getExpectedTokens(t2).toString(t2.literalNames, t2.symbolicNames) + " at " + this.getTokenErrorDisplay(e2);
    t2.notifyErrorListeners(n2, e2, null);
  }
  recoverInline(t2) {
    const e2 = this.singleTokenDeletion(t2);
    if (null !== e2) return t2.consume(), e2;
    if (this.singleTokenInsertion(t2)) return this.getMissingSymbol(t2);
    throw new xe(t2);
  }
  singleTokenInsertion(t2) {
    const e2 = t2.getTokenStream().LA(1), n2 = t2._interp.atn, s2 = n2.states[t2.state].transitions[0].target;
    return !!n2.nextTokens(s2, t2._ctx).contains(e2) && (this.reportMissingToken(t2), true);
  }
  singleTokenDeletion(t2) {
    const e2 = t2.getTokenStream().LA(2);
    if (this.getExpectedTokens(t2).contains(e2)) {
      this.reportUnwantedToken(t2), t2.consume();
      const e3 = t2.getCurrentToken();
      return this.reportMatch(t2), e3;
    }
    return null;
  }
  getMissingSymbol(t2) {
    const e2 = t2.getCurrentToken(), n2 = this.getExpectedTokens(t2).first();
    let s2;
    s2 = n2 === i.EOF ? "<missing EOF>" : "<missing " + t2.literalNames[n2] + ">";
    let r2 = e2;
    const o2 = t2.getTokenStream().LT(-1);
    return r2.type === i.EOF && null !== o2 && (r2 = o2), t2.getTokenFactory().create(r2.source, n2, s2, i.DEFAULT_CHANNEL, -1, -1, r2.line, r2.column);
  }
  getExpectedTokens(t2) {
    return t2.getExpectedTokens();
  }
  getTokenErrorDisplay(t2) {
    if (null === t2) return "<no token>";
    let e2 = t2.text;
    return null === e2 && (e2 = t2.type === i.EOF ? "<EOF>" : "<" + t2.type + ">"), this.escapeWSAndQuote(e2);
  }
  escapeWSAndQuote(t2) {
    return "'" + (t2 = (t2 = (t2 = t2.replace(/\n/g, "\\n")).replace(/\r/g, "\\r")).replace(/\t/g, "\\t")) + "'";
  }
  getErrorRecoverySet(t2) {
    const e2 = t2._interp.atn;
    let n2 = t2._ctx;
    const s2 = new _();
    for (; null !== n2 && n2.invokingState >= 0; ) {
      const t3 = e2.states[n2.invokingState].transitions[0], i2 = e2.nextTokens(t3.followState);
      s2.addSet(i2), n2 = n2.parentCtx;
    }
    return s2.removeOne(i.EPSILON), s2;
  }
  consumeUntil(t2, e2) {
    let n2 = t2.getTokenStream().LA(1);
    for (; n2 !== i.EOF && !e2.contains(n2); ) t2.consume(), n2 = t2.getTokenStream().LA(1);
  }
};
var Ae = class extends Ce {
  constructor() {
    super();
  }
  recover(t2, e2) {
    let n2 = t2._ctx;
    for (; null !== n2; ) n2.exception = e2, n2 = n2.parentCtx;
    throw new Ee(e2);
  }
  recoverInline(t2) {
    this.recover(t2, new xe(t2));
  }
  sync(t2) {
  }
};
var Ne = { RecognitionException: Ft, NoViableAltException: ee, LexerNoViableAltException: Mt, InputMismatchException: xe, FailedPredicateException: Te, DiagnosticErrorListener: me, BailErrorStrategy: Ae, DefaultErrorStrategy: Ce, ErrorListener: Ot };
var ke = class {
  constructor(t2, e2) {
    if (this.name = "<empty>", this.strdata = t2, this.decodeToUnicodeCodePoints = e2 || false, this._index = 0, this.data = [], this.decodeToUnicodeCodePoints) for (let t3 = 0; t3 < this.strdata.length; ) {
      const e3 = this.strdata.codePointAt(t3);
      this.data.push(e3), t3 += e3 <= 65535 ? 1 : 2;
    }
    else {
      this.data = new Array(this.strdata.length);
      for (let t3 = 0; t3 < this.strdata.length; t3++) this.data[t3] = this.strdata.charCodeAt(t3);
    }
    this._size = this.data.length;
  }
  reset() {
    this._index = 0;
  }
  consume() {
    if (this._index >= this._size) throw "cannot consume EOF";
    this._index += 1;
  }
  LA(t2) {
    if (0 === t2) return 0;
    t2 < 0 && (t2 += 1);
    const e2 = this._index + t2 - 1;
    return e2 < 0 || e2 >= this._size ? i.EOF : this.data[e2];
  }
  LT(t2) {
    return this.LA(t2);
  }
  mark() {
    return -1;
  }
  release(t2) {
  }
  seek(t2) {
    t2 <= this._index ? this._index = t2 : this._index = Math.min(t2, this._size);
  }
  getText(t2, e2) {
    if (e2 >= this._size && (e2 = this._size - 1), t2 >= this._size) return "";
    if (this.decodeToUnicodeCodePoints) {
      let n2 = "";
      for (let s2 = t2; s2 <= e2; s2++) n2 += String.fromCodePoint(this.data[s2]);
      return n2;
    }
    return this.strdata.slice(t2, e2 + 1);
  }
  toString() {
    return this.strdata;
  }
  get index() {
    return this._index;
  }
  get size() {
    return this._size;
  }
};
var Ie = class extends ke {
  constructor(t2, e2) {
    super(t2, e2);
  }
};
var ye = n(763);
var Le = "undefined" != typeof process && null != process.versions && null != process.versions.node;
var Oe = class extends Ie {
  static fromPath(t2, e2, n2) {
    if (!Le) throw new Error("FileStream is only available when running in Node!");
    ye.readFile(t2, e2, (function(t3, e3) {
      let s2 = null;
      null !== e3 && (s2 = new ke(e3, true)), n2(t3, s2);
    }));
  }
  constructor(t2, e2, n2) {
    if (!Le) throw new Error("FileStream is only available when running in Node!");
    super(ye.readFileSync(t2, e2 || "utf-8"), n2), this.fileName = t2;
  }
};
var Re = { fromString: function(t2) {
  return new ke(t2, true);
}, fromBlob: function(t2, e2, n2, s2) {
  const i2 = new window.FileReader();
  i2.onload = function(t3) {
    const e3 = new ke(t3.target.result, true);
    n2(e3);
  }, i2.onerror = s2, i2.readAsText(t2, e2);
}, fromBuffer: function(t2, e2) {
  return new ke(t2.toString(e2), true);
}, fromPath: function(t2, e2, n2) {
  Oe.fromPath(t2, e2, n2);
}, fromPathSync: function(t2, e2) {
  return new Oe(t2, e2);
} };
var we = { arrayToString: d, stringToCharArray: function(t2) {
  let e2 = new Uint16Array(t2.length);
  for (let n2 = 0; n2 < t2.length; n2++) e2[n2] = t2.charCodeAt(n2);
  return e2;
} };
var ve = class {
};
var Pe = class extends ve {
  constructor(t2) {
    super(), this.tokenSource = t2, this.tokens = [], this.index = -1, this.fetchedEOF = false;
  }
  mark() {
    return 0;
  }
  release(t2) {
  }
  reset() {
    this.seek(0);
  }
  seek(t2) {
    this.lazyInit(), this.index = this.adjustSeekIndex(t2);
  }
  get size() {
    return this.tokens.length;
  }
  get(t2) {
    return this.lazyInit(), this.tokens[t2];
  }
  consume() {
    let t2 = false;
    if (t2 = this.index >= 0 && (this.fetchedEOF ? this.index < this.tokens.length - 1 : this.index < this.tokens.length), !t2 && this.LA(1) === i.EOF) throw "cannot consume EOF";
    this.sync(this.index + 1) && (this.index = this.adjustSeekIndex(this.index + 1));
  }
  sync(t2) {
    const e2 = t2 - this.tokens.length + 1;
    return !(e2 > 0) || this.fetch(e2) >= e2;
  }
  fetch(t2) {
    if (this.fetchedEOF) return 0;
    for (let e2 = 0; e2 < t2; e2++) {
      const t3 = this.tokenSource.nextToken();
      if (t3.tokenIndex = this.tokens.length, this.tokens.push(t3), t3.type === i.EOF) return this.fetchedEOF = true, e2 + 1;
    }
    return t2;
  }
  getTokens(t2, e2, n2) {
    if (void 0 === n2 && (n2 = null), t2 < 0 || e2 < 0) return null;
    this.lazyInit();
    const s2 = [];
    e2 >= this.tokens.length && (e2 = this.tokens.length - 1);
    for (let r2 = t2; r2 < e2; r2++) {
      const t3 = this.tokens[r2];
      if (t3.type === i.EOF) break;
      (null === n2 || n2.contains(t3.type)) && s2.push(t3);
    }
    return s2;
  }
  LA(t2) {
    return this.LT(t2).type;
  }
  LB(t2) {
    return this.index - t2 < 0 ? null : this.tokens[this.index - t2];
  }
  LT(t2) {
    if (this.lazyInit(), 0 === t2) return null;
    if (t2 < 0) return this.LB(-t2);
    const e2 = this.index + t2 - 1;
    return this.sync(e2), e2 >= this.tokens.length ? this.tokens[this.tokens.length - 1] : this.tokens[e2];
  }
  adjustSeekIndex(t2) {
    return t2;
  }
  lazyInit() {
    -1 === this.index && this.setup();
  }
  setup() {
    this.sync(0), this.index = this.adjustSeekIndex(0);
  }
  setTokenSource(t2) {
    this.tokenSource = t2, this.tokens = [], this.index = -1, this.fetchedEOF = false;
  }
  nextTokenOnChannel(t2, e2) {
    if (this.sync(t2), t2 >= this.tokens.length) return -1;
    let n2 = this.tokens[t2];
    for (; n2.channel !== e2; ) {
      if (n2.type === i.EOF) return -1;
      t2 += 1, this.sync(t2), n2 = this.tokens[t2];
    }
    return t2;
  }
  previousTokenOnChannel(t2, e2) {
    for (; t2 >= 0 && this.tokens[t2].channel !== e2; ) t2 -= 1;
    return t2;
  }
  getHiddenTokensToRight(t2, e2) {
    if (void 0 === e2 && (e2 = -1), this.lazyInit(), t2 < 0 || t2 >= this.tokens.length) throw t2 + " not in 0.." + this.tokens.length - 1;
    const n2 = this.nextTokenOnChannel(t2 + 1, Ut.DEFAULT_TOKEN_CHANNEL), s2 = t2 + 1, i2 = -1 === n2 ? this.tokens.length - 1 : n2;
    return this.filterForChannel(s2, i2, e2);
  }
  getHiddenTokensToLeft(t2, e2) {
    if (void 0 === e2 && (e2 = -1), this.lazyInit(), t2 < 0 || t2 >= this.tokens.length) throw t2 + " not in 0.." + this.tokens.length - 1;
    const n2 = this.previousTokenOnChannel(t2 - 1, Ut.DEFAULT_TOKEN_CHANNEL);
    if (n2 === t2 - 1) return null;
    const s2 = n2 + 1, i2 = t2 - 1;
    return this.filterForChannel(s2, i2, e2);
  }
  filterForChannel(t2, e2, n2) {
    const s2 = [];
    for (let i2 = t2; i2 < e2 + 1; i2++) {
      const t3 = this.tokens[i2];
      -1 === n2 ? t3.channel !== Ut.DEFAULT_TOKEN_CHANNEL && s2.push(t3) : t3.channel === n2 && s2.push(t3);
    }
    return 0 === s2.length ? null : s2;
  }
  getSourceName() {
    return this.tokenSource.getSourceName();
  }
  getText(t2) {
    this.lazyInit(), this.fill(), t2 || (t2 = new E(0, this.tokens.length - 1));
    let e2 = t2.start;
    e2 instanceof i && (e2 = e2.tokenIndex);
    let n2 = t2.stop;
    if (n2 instanceof i && (n2 = n2.tokenIndex), null === e2 || null === n2 || e2 < 0 || n2 < 0) return "";
    n2 >= this.tokens.length && (n2 = this.tokens.length - 1);
    let s2 = "";
    for (let t3 = e2; t3 < n2 + 1; t3++) {
      const e3 = this.tokens[t3];
      if (e3.type === i.EOF) break;
      s2 += e3.text;
    }
    return s2;
  }
  fill() {
    for (this.lazyInit(); 1e3 === this.fetch(1e3); ) ;
  }
};
Object.defineProperty(Pe, "size", { get: function() {
  return this.tokens.length;
} });
var be = class extends Pe {
  constructor(t2, e2) {
    super(t2), this.channel = void 0 === e2 ? i.DEFAULT_CHANNEL : e2;
  }
  adjustSeekIndex(t2) {
    return this.nextTokenOnChannel(t2, this.channel);
  }
  LB(t2) {
    if (0 === t2 || this.index - t2 < 0) return null;
    let e2 = this.index, n2 = 1;
    for (; n2 <= t2; ) e2 = this.previousTokenOnChannel(e2 - 1, this.channel), n2 += 1;
    return e2 < 0 ? null : this.tokens[e2];
  }
  LT(t2) {
    if (this.lazyInit(), 0 === t2) return null;
    if (t2 < 0) return this.LB(-t2);
    let e2 = this.index, n2 = 1;
    for (; n2 < t2; ) this.sync(e2 + 1) && (e2 = this.nextTokenOnChannel(e2 + 1, this.channel)), n2 += 1;
    return this.tokens[e2];
  }
  getNumberOfOnChannelTokens() {
    let t2 = 0;
    this.fill();
    for (let e2 = 0; e2 < this.tokens.length; e2++) {
      const n2 = this.tokens[e2];
      if (n2.channel === this.channel && (t2 += 1), n2.type === i.EOF) break;
    }
    return t2;
  }
};
var De = class extends de {
  constructor(t2) {
    super(), this.parser = t2;
  }
  enterEveryRule(t2) {
    console.log("enter   " + this.parser.ruleNames[t2.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
  }
  visitTerminal(t2) {
    console.log("consume " + t2.symbol + " rule " + this.parser.ruleNames[this.parser._ctx.ruleIndex]);
  }
  exitEveryRule(t2) {
    console.log("exit    " + this.parser.ruleNames[t2.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
  }
};
var Fe = class extends vt {
  constructor(t2) {
    super(), this._input = null, this._errHandler = new Ce(), this._precedenceStack = [], this._precedenceStack.push(0), this._ctx = null, this.buildParseTrees = true, this._tracer = null, this._parseListeners = null, this._syntaxErrors = 0, this.setInputStream(t2);
  }
  reset() {
    null !== this._input && this._input.seek(0), this._errHandler.reset(this), this._ctx = null, this._syntaxErrors = 0, this.setTrace(false), this._precedenceStack = [], this._precedenceStack.push(0), null !== this._interp && this._interp.reset();
  }
  match(t2) {
    let e2 = this.getCurrentToken();
    return e2.type === t2 ? (this._errHandler.reportMatch(this), this.consume()) : (e2 = this._errHandler.recoverInline(this), this.buildParseTrees && -1 === e2.tokenIndex && this._ctx.addErrorNode(e2)), e2;
  }
  matchWildcard() {
    let t2 = this.getCurrentToken();
    return t2.type > 0 ? (this._errHandler.reportMatch(this), this.consume()) : (t2 = this._errHandler.recoverInline(this), this.buildParseTrees && -1 === t2.tokenIndex && this._ctx.addErrorNode(t2)), t2;
  }
  getParseListeners() {
    return this._parseListeners || [];
  }
  addParseListener(t2) {
    if (null === t2) throw "listener";
    null === this._parseListeners && (this._parseListeners = []), this._parseListeners.push(t2);
  }
  removeParseListener(t2) {
    if (null !== this._parseListeners) {
      const e2 = this._parseListeners.indexOf(t2);
      e2 >= 0 && this._parseListeners.splice(e2, 1), 0 === this._parseListeners.length && (this._parseListeners = null);
    }
  }
  removeParseListeners() {
    this._parseListeners = null;
  }
  triggerEnterRuleEvent() {
    if (null !== this._parseListeners) {
      const t2 = this._ctx;
      this._parseListeners.forEach((function(e2) {
        e2.enterEveryRule(t2), t2.enterRule(e2);
      }));
    }
  }
  triggerExitRuleEvent() {
    if (null !== this._parseListeners) {
      const t2 = this._ctx;
      this._parseListeners.slice(0).reverse().forEach((function(e2) {
        t2.exitRule(e2), e2.exitEveryRule(t2);
      }));
    }
  }
  getTokenFactory() {
    return this._input.tokenSource._factory;
  }
  setTokenFactory(t2) {
    this._input.tokenSource._factory = t2;
  }
  getATNWithBypassAlts() {
    const t2 = this.getSerializedATN();
    if (null === t2) throw "The current parser does not support an ATN with bypass alternatives.";
    let e2 = this.bypassAltsAtnCache[t2];
    if (null === e2) {
      const n2 = new Tt();
      n2.generateRuleBypassTransitions = true, e2 = new Lt(n2).deserialize(t2), this.bypassAltsAtnCache[t2] = e2;
    }
    return e2;
  }
  getInputStream() {
    return this.getTokenStream();
  }
  setInputStream(t2) {
    this.setTokenStream(t2);
  }
  getTokenStream() {
    return this._input;
  }
  setTokenStream(t2) {
    this._input = null, this.reset(), this._input = t2;
  }
  get syntaxErrorsCount() {
    return this._syntaxErrors;
  }
  getCurrentToken() {
    return this._input.LT(1);
  }
  notifyErrorListeners(t2, e2, n2) {
    n2 = n2 || null, null === (e2 = e2 || null) && (e2 = this.getCurrentToken()), this._syntaxErrors += 1;
    const s2 = e2.line, i2 = e2.column;
    this.getErrorListener().syntaxError(this, e2, s2, i2, t2, n2);
  }
  consume() {
    const t2 = this.getCurrentToken();
    t2.type !== i.EOF && this.getInputStream().consume();
    const e2 = null !== this._parseListeners && this._parseListeners.length > 0;
    if (this.buildParseTrees || e2) {
      let n2;
      n2 = this._errHandler.inErrorRecoveryMode(this) ? this._ctx.addErrorNode(t2) : this._ctx.addTokenNode(t2), n2.invokingState = this.state, e2 && this._parseListeners.forEach((function(t3) {
        n2 instanceof D || void 0 !== n2.isErrorNode && n2.isErrorNode() ? t3.visitErrorNode(n2) : n2 instanceof b && t3.visitTerminal(n2);
      }));
    }
    return t2;
  }
  addContextToParseTree() {
    null !== this._ctx.parentCtx && this._ctx.parentCtx.addChild(this._ctx);
  }
  enterRule(t2, e2, n2) {
    this.state = e2, this._ctx = t2, this._ctx.start = this._input.LT(1), this.buildParseTrees && this.addContextToParseTree(), this.triggerEnterRuleEvent();
  }
  exitRule() {
    this._ctx.stop = this._input.LT(-1), this.triggerExitRuleEvent(), this.state = this._ctx.invokingState, this._ctx = this._ctx.parentCtx;
  }
  enterOuterAlt(t2, e2) {
    t2.setAltNumber(e2), this.buildParseTrees && this._ctx !== t2 && null !== this._ctx.parentCtx && (this._ctx.parentCtx.removeLastChild(), this._ctx.parentCtx.addChild(t2)), this._ctx = t2;
  }
  getPrecedence() {
    return 0 === this._precedenceStack.length ? -1 : this._precedenceStack[this._precedenceStack.length - 1];
  }
  enterRecursionRule(t2, e2, n2, s2) {
    this.state = e2, this._precedenceStack.push(s2), this._ctx = t2, this._ctx.start = this._input.LT(1), this.triggerEnterRuleEvent();
  }
  pushNewRecursionContext(t2, e2, n2) {
    const s2 = this._ctx;
    s2.parentCtx = t2, s2.invokingState = e2, s2.stop = this._input.LT(-1), this._ctx = t2, this._ctx.start = s2.start, this.buildParseTrees && this._ctx.addChild(s2), this.triggerEnterRuleEvent();
  }
  unrollRecursionContexts(t2) {
    this._precedenceStack.pop(), this._ctx.stop = this._input.LT(-1);
    const e2 = this._ctx, n2 = this.getParseListeners();
    if (null !== n2 && n2.length > 0) for (; this._ctx !== t2; ) this.triggerExitRuleEvent(), this._ctx = this._ctx.parentCtx;
    else this._ctx = t2;
    e2.parentCtx = t2, this.buildParseTrees && null !== t2 && t2.addChild(e2);
  }
  getInvokingContext(t2) {
    let e2 = this._ctx;
    for (; null !== e2; ) {
      if (e2.ruleIndex === t2) return e2;
      e2 = e2.parentCtx;
    }
    return null;
  }
  precpred(t2, e2) {
    return e2 >= this._precedenceStack[this._precedenceStack.length - 1];
  }
  inContext(t2) {
    return false;
  }
  isExpectedToken(t2) {
    const e2 = this._interp.atn;
    let n2 = this._ctx;
    const s2 = e2.states[this.state];
    let r2 = e2.nextTokens(s2);
    if (r2.contains(t2)) return true;
    if (!r2.contains(i.EPSILON)) return false;
    for (; null !== n2 && n2.invokingState >= 0 && r2.contains(i.EPSILON); ) {
      const s3 = e2.states[n2.invokingState].transitions[0];
      if (r2 = e2.nextTokens(s3.followState), r2.contains(t2)) return true;
      n2 = n2.parentCtx;
    }
    return !(!r2.contains(i.EPSILON) || t2 !== i.EOF);
  }
  getExpectedTokens() {
    return this._interp.atn.getExpectedTokens(this.state, this._ctx);
  }
  getExpectedTokensWithinCurrentRule() {
    const t2 = this._interp.atn, e2 = t2.states[this.state];
    return t2.nextTokens(e2);
  }
  getRuleIndex(t2) {
    const e2 = this.getRuleIndexMap()[t2];
    return null !== e2 ? e2 : -1;
  }
  getRuleInvocationStack(t2) {
    null === (t2 = t2 || null) && (t2 = this._ctx);
    const e2 = [];
    for (; null !== t2; ) {
      const n2 = t2.ruleIndex;
      n2 < 0 ? e2.push("n/a") : e2.push(this.ruleNames[n2]), t2 = t2.parentCtx;
    }
    return e2;
  }
  getDFAStrings() {
    return this._interp.decisionToDFA.toString();
  }
  dumpDFA() {
    let t2 = false;
    for (let e2 = 0; e2 < this._interp.decisionToDFA.length; e2++) {
      const n2 = this._interp.decisionToDFA[e2];
      n2.states.length > 0 && (t2 && console.log(), this.printer.println("Decision " + n2.decision + ":"), this.printer.print(n2.toString(this.literalNames, this.symbolicNames)), t2 = true);
    }
  }
  getSourceName() {
    return this._input.getSourceName();
  }
  setTrace(t2) {
    t2 ? (null !== this._tracer && this.removeParseListener(this._tracer), this._tracer = new De(this), this.addParseListener(this._tracer)) : (this.removeParseListener(this._tracer), this._tracer = null);
  }
};
Fe.bypassAltsAtnCache = {};
var Me = class extends b {
  constructor(t2) {
    super(), this.parentCtx = null, this.symbol = t2;
  }
  getChild(t2) {
    return null;
  }
  getSymbol() {
    return this.symbol;
  }
  getParent() {
    return this.parentCtx;
  }
  getPayload() {
    return this.symbol;
  }
  getSourceInterval() {
    if (null === this.symbol) return E.INVALID_INTERVAL;
    const t2 = this.symbol.tokenIndex;
    return new E(t2, t2);
  }
  getChildCount() {
    return 0;
  }
  accept(t2) {
    return t2.visitTerminal(this);
  }
  getText() {
    return this.symbol.text;
  }
  toString() {
    return this.symbol.type === i.EOF ? "<EOF>" : this.symbol.text;
  }
};
var Ue = class extends Me {
  constructor(t2) {
    super(t2);
  }
  isErrorNode() {
    return true;
  }
  accept(t2) {
    return t2.visitErrorNode(this);
  }
};
var Be = class extends U {
  constructor(t2, e2) {
    super(t2, e2), this.children = null, this.start = null, this.stop = null, this.exception = null;
  }
  copyFrom(t2) {
    this.parentCtx = t2.parentCtx, this.invokingState = t2.invokingState, this.children = null, this.start = t2.start, this.stop = t2.stop, t2.children && (this.children = [], t2.children.map((function(t3) {
      t3 instanceof Ue && (this.children.push(t3), t3.parentCtx = this);
    }), this));
  }
  enterRule(t2) {
  }
  exitRule(t2) {
  }
  addChild(t2) {
    return null === this.children && (this.children = []), this.children.push(t2), t2;
  }
  removeLastChild() {
    null !== this.children && this.children.pop();
  }
  addTokenNode(t2) {
    const e2 = new Me(t2);
    return this.addChild(e2), e2.parentCtx = this, e2;
  }
  addErrorNode(t2) {
    const e2 = new Ue(t2);
    return this.addChild(e2), e2.parentCtx = this, e2;
  }
  getChild(t2, e2) {
    if (e2 = e2 || null, null === this.children || t2 < 0 || t2 >= this.children.length) return null;
    if (null === e2) return this.children[t2];
    for (let n2 = 0; n2 < this.children.length; n2++) {
      const s2 = this.children[n2];
      if (s2 instanceof e2) {
        if (0 === t2) return s2;
        t2 -= 1;
      }
    }
    return null;
  }
  getToken(t2, e2) {
    if (null === this.children || e2 < 0 || e2 >= this.children.length) return null;
    for (let n2 = 0; n2 < this.children.length; n2++) {
      const s2 = this.children[n2];
      if (s2 instanceof b && s2.symbol.type === t2) {
        if (0 === e2) return s2;
        e2 -= 1;
      }
    }
    return null;
  }
  getTokens(t2) {
    if (null === this.children) return [];
    {
      const e2 = [];
      for (let n2 = 0; n2 < this.children.length; n2++) {
        const s2 = this.children[n2];
        s2 instanceof b && s2.symbol.type === t2 && e2.push(s2);
      }
      return e2;
    }
  }
  getTypedRuleContext(t2, e2) {
    return this.getChild(e2, t2);
  }
  getTypedRuleContexts(t2) {
    if (null === this.children) return [];
    {
      const e2 = [];
      for (let n2 = 0; n2 < this.children.length; n2++) {
        const s2 = this.children[n2];
        s2 instanceof t2 && e2.push(s2);
      }
      return e2;
    }
  }
  getChildCount() {
    return null === this.children ? 0 : this.children.length;
  }
  getSourceInterval() {
    return null === this.start || null === this.stop ? E.INVALID_INTERVAL : new E(this.start.tokenIndex, this.stop.tokenIndex);
  }
};
U.EMPTY = new Be();
var ze = class _ze {
  static DEFAULT_PROGRAM_NAME = "default";
  constructor(t2) {
    this.tokens = t2, this.programs = /* @__PURE__ */ new Map();
  }
  getTokenStream() {
    return this.tokens;
  }
  insertAfter(t2, e2) {
    let n2, s2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : _ze.DEFAULT_PROGRAM_NAME;
    n2 = "number" == typeof t2 ? t2 : t2.tokenIndex;
    let i2 = this.getProgram(s2), r2 = new He(this.tokens, n2, i2.length, e2);
    i2.push(r2);
  }
  insertBefore(t2, e2) {
    let n2, s2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : _ze.DEFAULT_PROGRAM_NAME;
    n2 = "number" == typeof t2 ? t2 : t2.tokenIndex;
    const i2 = this.getProgram(s2), r2 = new qe(this.tokens, n2, i2.length, e2);
    i2.push(r2);
  }
  replaceSingle(t2, e2) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : _ze.DEFAULT_PROGRAM_NAME;
    this.replace(t2, t2, e2, n2);
  }
  replace(t2, e2, n2) {
    let s2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : _ze.DEFAULT_PROGRAM_NAME;
    if ("number" != typeof t2 && (t2 = t2.tokenIndex), "number" != typeof e2 && (e2 = e2.tokenIndex), t2 > e2 || t2 < 0 || e2 < 0 || e2 >= this.tokens.size) throw new RangeError(`replace: range invalid: ${t2}..${e2}(size=${this.tokens.size})`);
    let i2 = this.getProgram(s2), r2 = new Ke(this.tokens, t2, e2, i2.length, n2);
    i2.push(r2);
  }
  delete(t2, e2) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : _ze.DEFAULT_PROGRAM_NAME;
    void 0 === e2 && (e2 = t2), this.replace(t2, e2, null, n2);
  }
  getProgram(t2) {
    let e2 = this.programs.get(t2);
    return null == e2 && (e2 = this.initializeProgram(t2)), e2;
  }
  initializeProgram(t2) {
    const e2 = [];
    return this.programs.set(t2, e2), e2;
  }
  getText(t2) {
    let e2, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : _ze.DEFAULT_PROGRAM_NAME;
    e2 = t2 instanceof E ? t2 : new E(0, this.tokens.size - 1), "string" == typeof t2 && (n2 = t2);
    const s2 = this.programs.get(n2);
    let r2 = e2.start, o2 = e2.stop;
    if (o2 > this.tokens.size - 1 && (o2 = this.tokens.size - 1), r2 < 0 && (r2 = 0), null == s2 || 0 === s2.length) return this.tokens.getText(new E(r2, o2));
    let a2 = [], l2 = this.reduceToSingleOperationPerIndex(s2), h2 = r2;
    for (; h2 <= o2 && h2 < this.tokens.size; ) {
      let t3 = l2.get(h2);
      l2.delete(h2);
      let e3 = this.tokens.get(h2);
      null == t3 ? (e3.type !== i.EOF && a2.push(String(e3.text)), h2++) : h2 = t3.execute(a2);
    }
    if (o2 === this.tokens.size - 1) for (const t3 of l2.values()) t3.index >= this.tokens.size - 1 && a2.push(t3.text.toString());
    return a2.join("");
  }
  reduceToSingleOperationPerIndex(t2) {
    for (let e3 = 0; e3 < t2.length; e3++) {
      let n2 = t2[e3];
      if (null == n2) continue;
      if (!(n2 instanceof Ke)) continue;
      let s2 = n2, i2 = this.getKindOfOps(t2, qe, e3);
      for (let e4 of i2) e4.index === s2.index ? (t2[e4.instructionIndex] = void 0, s2.text = e4.text.toString() + (null != s2.text ? s2.text.toString() : "")) : e4.index > s2.index && e4.index <= s2.lastIndex && (t2[e4.instructionIndex] = void 0);
      let r2 = this.getKindOfOps(t2, Ke, e3);
      for (let e4 of r2) {
        if (e4.index >= s2.index && e4.lastIndex <= s2.lastIndex) {
          t2[e4.instructionIndex] = void 0;
          continue;
        }
        let n3 = e4.lastIndex < s2.index || e4.index > s2.lastIndex;
        if (null != e4.text || null != s2.text || n3) {
          if (!n3) throw new Error(`replace op boundaries of ${s2} overlap with previous ${e4}`);
        } else t2[e4.instructionIndex] = void 0, s2.index = Math.min(e4.index, s2.index), s2.lastIndex = Math.max(e4.lastIndex, s2.lastIndex);
      }
    }
    for (let e3 = 0; e3 < t2.length; e3++) {
      let n2 = t2[e3];
      if (null == n2) continue;
      if (!(n2 instanceof qe)) continue;
      let s2 = n2, i2 = this.getKindOfOps(t2, qe, e3);
      for (let e4 of i2) e4.index === s2.index && (e4 instanceof He ? (s2.text = this.catOpText(e4.text, s2.text), t2[e4.instructionIndex] = void 0) : e4 instanceof qe && (s2.text = this.catOpText(s2.text, e4.text), t2[e4.instructionIndex] = void 0));
      let r2 = this.getKindOfOps(t2, Ke, e3);
      for (let n3 of r2) if (s2.index !== n3.index) {
        if (s2.index >= n3.index && s2.index <= n3.lastIndex) throw new Error(`insert op ${s2} within boundaries of previous ${n3}`);
      } else n3.text = this.catOpText(s2.text, n3.text), t2[e3] = void 0;
    }
    let e2 = /* @__PURE__ */ new Map();
    for (let n2 of t2) if (null != n2) {
      if (null != e2.get(n2.index)) throw new Error("should only be one op per index");
      e2.set(n2.index, n2);
    }
    return e2;
  }
  catOpText(t2, e2) {
    let n2 = "", s2 = "";
    return null != t2 && (n2 = t2.toString()), null != e2 && (s2 = e2.toString()), n2 + s2;
  }
  getKindOfOps(t2, e2, n2) {
    return t2.slice(0, n2).filter(((t3) => t3 && t3 instanceof e2));
  }
};
var Ve = class {
  constructor(t2, e2, n2, s2) {
    this.tokens = t2, this.instructionIndex = n2, this.index = e2, this.text = void 0 === s2 ? "" : s2;
  }
  toString() {
    let t2 = this.constructor.name;
    const e2 = t2.indexOf("$");
    return t2 = t2.substring(e2 + 1, t2.length), "<" + t2 + "@" + this.tokens.get(this.index) + ':"' + this.text + '">';
  }
};
var qe = class extends Ve {
  constructor(t2, e2, n2, s2) {
    super(t2, e2, n2, s2);
  }
  execute(t2) {
    return this.text && t2.push(this.text.toString()), this.tokens.get(this.index).type !== i.EOF && t2.push(String(this.tokens.get(this.index).text)), this.index + 1;
  }
};
var He = class extends qe {
  constructor(t2, e2, n2, s2) {
    super(t2, e2 + 1, n2, s2);
  }
};
var Ke = class extends Ve {
  constructor(t2, e2, n2, s2, i2) {
    super(t2, e2, s2, i2), this.lastIndex = n2;
  }
  execute(t2) {
    return this.text && t2.push(this.text.toString()), this.lastIndex + 1;
  }
  toString() {
    return null == this.text ? "<DeleteOp@" + this.tokens.get(this.index) + ".." + this.tokens.get(this.lastIndex) + ">" : "<ReplaceOp@" + this.tokens.get(this.index) + ".." + this.tokens.get(this.lastIndex) + ':"' + this.text + '">';
  }
};
var Ye = { atn: re, dfa: he, context: ce, misc: ue, tree: fe, error: Ne, Token: i, CommonToken: Pt, CharStreams: Re, CharStream: ke, InputStream: Ie, CommonTokenStream: be, Lexer: Ut, Parser: Fe, ParserRuleContext: Be, Interval: E, IntervalSet: _, LL1Analyzer: j, Utils: we, TokenStreamRewriter: ze };
var Ge = s.MG;
var We = s.fr;
var je = s.sR;
var $e = s.Zo;
var Xe = s.iH;
var Je = s.rt;
var Ze = s.jB;
var Qe = s.M8;
var tn = s.$t;
var en = s.aq;
var nn = s.pG;
var sn = s.eP;
var rn = s.KU;
var on = s.zW;
var an = s.IX;
var ln = s.mY;
var hn = s.a7;
var cn = s.JG;
var un = s.ay;
var dn = s.X2;
var gn = s.WU;
var pn = s.Uw;
var fn = s.gw;
var xn = s.iX;
var Tn = s.re;
var Sn = s.Pg;
var mn = s.tD;
var En = s.R$;
var _n = s.Dj;
var Cn = s.m7;
var An = s.NZ;
var Nn = s.xo;
var kn = s.ou;
var In = s.qC;
var yn = s.mD;
var Ln = s.Ay;

// src/generatedElan/ElanVisitor.js
var ElanVisitor = class extends Ln.tree.ParseTreeVisitor {
  // Visit a parse tree produced by ElanParser#file.
  visitFile(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#importStatement.
  visitImportStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#namespace.
  visitNamespace(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#main.
  visitMain(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#test.
  visitTest(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#statementBlock.
  visitStatementBlock(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#testStatements.
  visitTestStatements(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#assert.
  visitAssert(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#callStatement.
  visitCallStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#throwException.
  visitThrowException(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#printStatement.
  visitPrintStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#varDef.
  visitVarDef(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#assignment.
  visitAssignment(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#inlineAsignment.
  visitInlineAsignment(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#assignableValue.
  visitAssignableValue(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#procedureCall.
  visitProcedureCall(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#functionCall.
  visitFunctionCall(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#systemCall.
  visitSystemCall(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#input.
  visitInput(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#argument.
  visitArgument(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#argumentList.
  visitArgumentList(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#procedureDef.
  visitProcedureDef(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#procedureSignature.
  visitProcedureSignature(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#procedureParameterList.
  visitProcedureParameterList(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#parameterList.
  visitParameterList(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#parameter.
  visitParameter(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#procedureParameter.
  visitProcedureParameter(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#functionDef.
  visitFunctionDef(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#functionSignature.
  visitFunctionSignature(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#constantDef.
  visitConstantDef(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#enumDef.
  visitEnumDef(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#enumType.
  visitEnumType(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#enumValue.
  visitEnumValue(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#classDef.
  visitClassDef(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#mutableClass.
  visitMutableClass(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#abstractClass.
  visitAbstractClass(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#immutableClass.
  visitImmutableClass(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#abstractImmutableClass.
  visitAbstractImmutableClass(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#inherits.
  visitInherits(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#property.
  visitProperty(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#econstructor.
  visitEconstructor(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#newInstance.
  visitNewInstance(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#withClause.
  visitWithClause(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#proceduralControlFlow.
  visitProceduralControlFlow(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#if.
  visitIf(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#for.
  visitFor(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#each.
  visitEach(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#while.
  visitWhile(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#repeat.
  visitRepeat(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#try.
  visitTry(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#switch.
  visitSwitch(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#case.
  visitCase(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#caseDefault.
  visitCaseDefault(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#expression.
  visitExpression(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#bracketedExpression.
  visitBracketedExpression(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#ifExpression.
  visitIfExpression(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#elseExpression.
  visitElseExpression(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#lambda.
  visitLambda(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#index.
  visitIndex(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#range.
  visitRange(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#value.
  visitValue(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#scopeQualifier.
  visitScopeQualifier(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#literal.
  visitLiteral(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#literalValue.
  visitLiteralValue(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#dataStructureDefinition.
  visitDataStructureDefinition(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#literalDataStructure.
  visitLiteralDataStructure(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#tupleDefinition.
  visitTupleDefinition(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#literalTuple.
  visitLiteralTuple(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#deconstructedTuple.
  visitDeconstructedTuple(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#listDefinition.
  visitListDefinition(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#literalList.
  visitLiteralList(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#listDecomp.
  visitListDecomp(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#arrayDefinition.
  visitArrayDefinition(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#dictionaryDefinition.
  visitDictionaryDefinition(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#literalDictionary.
  visitLiteralDictionary(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#kvp.
  visitKvp(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#literalKvp.
  visitLiteralKvp(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#unaryOp.
  visitUnaryOp(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#binaryOp.
  visitBinaryOp(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#arithmeticOp.
  visitArithmeticOp(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#logicalOp.
  visitLogicalOp(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#conditionalOp.
  visitConditionalOp(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#type.
  visitType(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#dataStructureType.
  visitDataStructureType(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#genericSpecifier.
  visitGenericSpecifier(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#tupleType.
  visitTupleType(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#typeList.
  visitTypeList(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by ElanParser#funcType.
  visitFuncType(ctx) {
    return this.visitChildren(ctx);
  }
};

// src/generatedElan/ElanLexer.js
var serializedATN = [
  4,
  0,
  101,
  952,
  6,
  -1,
  2,
  0,
  7,
  0,
  2,
  1,
  7,
  1,
  2,
  2,
  7,
  2,
  2,
  3,
  7,
  3,
  2,
  4,
  7,
  4,
  2,
  5,
  7,
  5,
  2,
  6,
  7,
  6,
  2,
  7,
  7,
  7,
  2,
  8,
  7,
  8,
  2,
  9,
  7,
  9,
  2,
  10,
  7,
  10,
  2,
  11,
  7,
  11,
  2,
  12,
  7,
  12,
  2,
  13,
  7,
  13,
  2,
  14,
  7,
  14,
  2,
  15,
  7,
  15,
  2,
  16,
  7,
  16,
  2,
  17,
  7,
  17,
  2,
  18,
  7,
  18,
  2,
  19,
  7,
  19,
  2,
  20,
  7,
  20,
  2,
  21,
  7,
  21,
  2,
  22,
  7,
  22,
  2,
  23,
  7,
  23,
  2,
  24,
  7,
  24,
  2,
  25,
  7,
  25,
  2,
  26,
  7,
  26,
  2,
  27,
  7,
  27,
  2,
  28,
  7,
  28,
  2,
  29,
  7,
  29,
  2,
  30,
  7,
  30,
  2,
  31,
  7,
  31,
  2,
  32,
  7,
  32,
  2,
  33,
  7,
  33,
  2,
  34,
  7,
  34,
  2,
  35,
  7,
  35,
  2,
  36,
  7,
  36,
  2,
  37,
  7,
  37,
  2,
  38,
  7,
  38,
  2,
  39,
  7,
  39,
  2,
  40,
  7,
  40,
  2,
  41,
  7,
  41,
  2,
  42,
  7,
  42,
  2,
  43,
  7,
  43,
  2,
  44,
  7,
  44,
  2,
  45,
  7,
  45,
  2,
  46,
  7,
  46,
  2,
  47,
  7,
  47,
  2,
  48,
  7,
  48,
  2,
  49,
  7,
  49,
  2,
  50,
  7,
  50,
  2,
  51,
  7,
  51,
  2,
  52,
  7,
  52,
  2,
  53,
  7,
  53,
  2,
  54,
  7,
  54,
  2,
  55,
  7,
  55,
  2,
  56,
  7,
  56,
  2,
  57,
  7,
  57,
  2,
  58,
  7,
  58,
  2,
  59,
  7,
  59,
  2,
  60,
  7,
  60,
  2,
  61,
  7,
  61,
  2,
  62,
  7,
  62,
  2,
  63,
  7,
  63,
  2,
  64,
  7,
  64,
  2,
  65,
  7,
  65,
  2,
  66,
  7,
  66,
  2,
  67,
  7,
  67,
  2,
  68,
  7,
  68,
  2,
  69,
  7,
  69,
  2,
  70,
  7,
  70,
  2,
  71,
  7,
  71,
  2,
  72,
  7,
  72,
  2,
  73,
  7,
  73,
  2,
  74,
  7,
  74,
  2,
  75,
  7,
  75,
  2,
  76,
  7,
  76,
  2,
  77,
  7,
  77,
  2,
  78,
  7,
  78,
  2,
  79,
  7,
  79,
  2,
  80,
  7,
  80,
  2,
  81,
  7,
  81,
  2,
  82,
  7,
  82,
  2,
  83,
  7,
  83,
  2,
  84,
  7,
  84,
  2,
  85,
  7,
  85,
  2,
  86,
  7,
  86,
  2,
  87,
  7,
  87,
  2,
  88,
  7,
  88,
  2,
  89,
  7,
  89,
  2,
  90,
  7,
  90,
  2,
  91,
  7,
  91,
  2,
  92,
  7,
  92,
  2,
  93,
  7,
  93,
  2,
  94,
  7,
  94,
  2,
  95,
  7,
  95,
  2,
  96,
  7,
  96,
  2,
  97,
  7,
  97,
  2,
  98,
  7,
  98,
  2,
  99,
  7,
  99,
  2,
  100,
  7,
  100,
  2,
  101,
  7,
  101,
  2,
  102,
  7,
  102,
  2,
  103,
  7,
  103,
  2,
  104,
  7,
  104,
  2,
  105,
  7,
  105,
  2,
  106,
  7,
  106,
  2,
  107,
  7,
  107,
  2,
  108,
  7,
  108,
  2,
  109,
  7,
  109,
  2,
  110,
  7,
  110,
  2,
  111,
  7,
  111,
  2,
  112,
  7,
  112,
  2,
  113,
  7,
  113,
  2,
  114,
  7,
  114,
  2,
  115,
  7,
  115,
  2,
  116,
  7,
  116,
  2,
  117,
  7,
  117,
  2,
  118,
  7,
  118,
  2,
  119,
  7,
  119,
  2,
  120,
  7,
  120,
  2,
  121,
  7,
  121,
  2,
  122,
  7,
  122,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  4,
  1,
  254,
  8,
  1,
  11,
  1,
  12,
  1,
  255,
  1,
  2,
  3,
  2,
  259,
  8,
  2,
  1,
  2,
  5,
  2,
  262,
  8,
  2,
  10,
  2,
  12,
  2,
  265,
  9,
  2,
  1,
  2,
  1,
  2,
  5,
  2,
  269,
  8,
  2,
  10,
  2,
  12,
  2,
  272,
  9,
  2,
  1,
  2,
  1,
  2,
  1,
  3,
  1,
  3,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  14,
  1,
  14,
  1,
  14,
  1,
  14,
  1,
  14,
  1,
  14,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  16,
  1,
  16,
  1,
  16,
  1,
  16,
  1,
  17,
  1,
  17,
  1,
  17,
  1,
  17,
  1,
  17,
  1,
  18,
  1,
  18,
  1,
  18,
  1,
  18,
  1,
  18,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  19,
  1,
  20,
  1,
  20,
  1,
  20,
  1,
  20,
  1,
  20,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  22,
  1,
  22,
  1,
  22,
  1,
  22,
  1,
  22,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  23,
  1,
  24,
  1,
  24,
  1,
  24,
  1,
  24,
  1,
  24,
  1,
  24,
  1,
  24,
  1,
  25,
  1,
  25,
  1,
  25,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  31,
  1,
  31,
  1,
  31,
  1,
  31,
  1,
  31,
  1,
  31,
  1,
  31,
  1,
  32,
  1,
  32,
  1,
  32,
  1,
  32,
  1,
  33,
  1,
  33,
  1,
  33,
  1,
  33,
  1,
  33,
  1,
  33,
  1,
  33,
  1,
  33,
  1,
  34,
  1,
  34,
  1,
  34,
  1,
  34,
  1,
  34,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  36,
  1,
  36,
  1,
  36,
  1,
  36,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  40,
  1,
  40,
  1,
  40,
  1,
  41,
  1,
  41,
  1,
  41,
  1,
  41,
  1,
  42,
  1,
  42,
  1,
  42,
  1,
  42,
  1,
  42,
  1,
  42,
  1,
  42,
  1,
  42,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  50,
  1,
  50,
  1,
  50,
  1,
  50,
  1,
  51,
  1,
  51,
  1,
  51,
  1,
  51,
  1,
  51,
  1,
  52,
  1,
  52,
  1,
  52,
  1,
  52,
  1,
  52,
  1,
  52,
  1,
  52,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  54,
  1,
  54,
  1,
  54,
  1,
  54,
  1,
  54,
  1,
  55,
  1,
  55,
  1,
  55,
  1,
  55,
  1,
  55,
  1,
  56,
  1,
  56,
  1,
  56,
  1,
  56,
  1,
  56,
  1,
  56,
  1,
  57,
  1,
  57,
  1,
  57,
  1,
  58,
  1,
  58,
  1,
  58,
  1,
  58,
  1,
  59,
  1,
  59,
  1,
  59,
  1,
  59,
  1,
  60,
  1,
  60,
  1,
  60,
  1,
  60,
  1,
  60,
  1,
  61,
  1,
  61,
  1,
  61,
  1,
  61,
  1,
  61,
  1,
  61,
  1,
  62,
  1,
  62,
  1,
  62,
  1,
  62,
  1,
  62,
  1,
  63,
  1,
  63,
  1,
  63,
  1,
  63,
  1,
  64,
  1,
  64,
  1,
  64,
  1,
  64,
  1,
  64,
  1,
  64,
  1,
  64,
  1,
  64,
  1,
  64,
  3,
  64,
  635,
  8,
  64,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  3,
  65,
  659,
  8,
  65,
  1,
  66,
  1,
  66,
  1,
  66,
  1,
  66,
  1,
  66,
  1,
  66,
  1,
  67,
  1,
  67,
  1,
  67,
  1,
  67,
  1,
  67,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  69,
  1,
  69,
  1,
  69,
  1,
  69,
  1,
  69,
  1,
  70,
  1,
  70,
  1,
  71,
  1,
  71,
  1,
  71,
  1,
  72,
  1,
  72,
  1,
  73,
  1,
  73,
  1,
  74,
  1,
  74,
  1,
  75,
  1,
  75,
  1,
  76,
  1,
  76,
  1,
  77,
  1,
  77,
  1,
  78,
  1,
  78,
  1,
  78,
  1,
  79,
  1,
  79,
  1,
  80,
  1,
  80,
  1,
  81,
  1,
  81,
  1,
  82,
  1,
  82,
  1,
  83,
  1,
  83,
  1,
  84,
  1,
  84,
  1,
  85,
  1,
  85,
  1,
  86,
  1,
  86,
  1,
  87,
  1,
  87,
  1,
  88,
  1,
  88,
  1,
  89,
  1,
  89,
  1,
  89,
  1,
  90,
  1,
  90,
  1,
  90,
  1,
  91,
  1,
  91,
  5,
  91,
  736,
  8,
  91,
  10,
  91,
  12,
  91,
  739,
  9,
  91,
  1,
  91,
  1,
  91,
  1,
  92,
  1,
  92,
  1,
  93,
  1,
  93,
  1,
  94,
  1,
  94,
  5,
  94,
  749,
  8,
  94,
  10,
  94,
  12,
  94,
  752,
  9,
  94,
  1,
  95,
  1,
  95,
  1,
  95,
  1,
  95,
  3,
  95,
  758,
  8,
  95,
  1,
  96,
  1,
  96,
  1,
  96,
  3,
  96,
  763,
  8,
  96,
  1,
  96,
  1,
  96,
  1,
  96,
  3,
  96,
  768,
  8,
  96,
  1,
  97,
  1,
  97,
  1,
  97,
  5,
  97,
  773,
  8,
  97,
  10,
  97,
  12,
  97,
  776,
  9,
  97,
  1,
  97,
  1,
  97,
  1,
  98,
  4,
  98,
  781,
  8,
  98,
  11,
  98,
  12,
  98,
  782,
  1,
  98,
  1,
  98,
  1,
  99,
  1,
  99,
  1,
  100,
  1,
  100,
  1,
  101,
  1,
  101,
  1,
  101,
  3,
  101,
  794,
  8,
  101,
  1,
  101,
  1,
  101,
  1,
  102,
  1,
  102,
  1,
  102,
  3,
  102,
  801,
  8,
  102,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  1,
  103,
  3,
  103,
  825,
  8,
  103,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  1,
  104,
  3,
  104,
  852,
  8,
  104,
  1,
  105,
  1,
  105,
  1,
  105,
  3,
  105,
  857,
  8,
  105,
  1,
  106,
  1,
  106,
  3,
  106,
  861,
  8,
  106,
  1,
  107,
  1,
  107,
  1,
  108,
  1,
  108,
  3,
  108,
  867,
  8,
  108,
  1,
  108,
  5,
  108,
  870,
  8,
  108,
  10,
  108,
  12,
  108,
  873,
  9,
  108,
  1,
  109,
  1,
  109,
  5,
  109,
  877,
  8,
  109,
  10,
  109,
  12,
  109,
  880,
  9,
  109,
  1,
  110,
  1,
  110,
  5,
  110,
  884,
  8,
  110,
  10,
  110,
  12,
  110,
  887,
  9,
  110,
  1,
  111,
  1,
  111,
  1,
  111,
  1,
  111,
  3,
  111,
  893,
  8,
  111,
  1,
  112,
  1,
  112,
  1,
  112,
  3,
  112,
  898,
  8,
  112,
  1,
  113,
  1,
  113,
  3,
  113,
  902,
  8,
  113,
  1,
  114,
  1,
  114,
  1,
  115,
  1,
  115,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  1,
  116,
  3,
  116,
  928,
  8,
  116,
  1,
  117,
  3,
  117,
  931,
  8,
  117,
  1,
  118,
  1,
  118,
  1,
  119,
  1,
  119,
  1,
  120,
  1,
  120,
  1,
  121,
  3,
  121,
  940,
  8,
  121,
  1,
  121,
  1,
  121,
  3,
  121,
  944,
  8,
  121,
  1,
  122,
  4,
  122,
  947,
  8,
  122,
  11,
  122,
  12,
  122,
  948,
  1,
  122,
  1,
  122,
  0,
  0,
  123,
  1,
  1,
  3,
  2,
  5,
  3,
  7,
  4,
  9,
  5,
  11,
  6,
  13,
  7,
  15,
  8,
  17,
  9,
  19,
  10,
  21,
  11,
  23,
  12,
  25,
  13,
  27,
  14,
  29,
  15,
  31,
  16,
  33,
  17,
  35,
  18,
  37,
  19,
  39,
  20,
  41,
  21,
  43,
  22,
  45,
  23,
  47,
  24,
  49,
  25,
  51,
  26,
  53,
  27,
  55,
  28,
  57,
  29,
  59,
  30,
  61,
  31,
  63,
  32,
  65,
  33,
  67,
  34,
  69,
  35,
  71,
  36,
  73,
  37,
  75,
  38,
  77,
  39,
  79,
  40,
  81,
  41,
  83,
  42,
  85,
  43,
  87,
  44,
  89,
  45,
  91,
  46,
  93,
  47,
  95,
  48,
  97,
  49,
  99,
  50,
  101,
  51,
  103,
  52,
  105,
  53,
  107,
  54,
  109,
  55,
  111,
  56,
  113,
  57,
  115,
  58,
  117,
  59,
  119,
  60,
  121,
  61,
  123,
  62,
  125,
  63,
  127,
  64,
  129,
  65,
  131,
  66,
  133,
  67,
  135,
  68,
  137,
  69,
  139,
  70,
  141,
  71,
  143,
  72,
  145,
  73,
  147,
  74,
  149,
  75,
  151,
  76,
  153,
  77,
  155,
  78,
  157,
  79,
  159,
  80,
  161,
  81,
  163,
  82,
  165,
  83,
  167,
  84,
  169,
  85,
  171,
  86,
  173,
  87,
  175,
  88,
  177,
  89,
  179,
  90,
  181,
  91,
  183,
  92,
  185,
  93,
  187,
  94,
  189,
  95,
  191,
  96,
  193,
  97,
  195,
  98,
  197,
  99,
  199,
  0,
  201,
  0,
  203,
  0,
  205,
  0,
  207,
  0,
  209,
  0,
  211,
  0,
  213,
  0,
  215,
  0,
  217,
  0,
  219,
  0,
  221,
  0,
  223,
  0,
  225,
  0,
  227,
  0,
  229,
  0,
  231,
  0,
  233,
  0,
  235,
  0,
  237,
  0,
  239,
  0,
  241,
  0,
  243,
  100,
  245,
  101,
  1,
  0,
  10,
  2,
  0,
  10,
  10,
  12,
  13,
  1,
  0,
  48,
  57,
  5,
  0,
  10,
  10,
  13,
  13,
  39,
  39,
  92,
  92,
  133,
  133,
  2,
  0,
  34,
  34,
  133,
  133,
  3,
  0,
  10,
  10,
  13,
  13,
  133,
  133,
  2,
  0,
  69,
  69,
  101,
  101,
  2,
  0,
  9,
  9,
  11,
  12,
  2,
  0,
  32,
  32,
  160,
  160,
  3,
  0,
  48,
  57,
  65,
  70,
  97,
  102,
  2,
  0,
  9,
  9,
  32,
  32,
  979,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  3,
  1,
  0,
  0,
  0,
  0,
  5,
  1,
  0,
  0,
  0,
  0,
  7,
  1,
  0,
  0,
  0,
  0,
  9,
  1,
  0,
  0,
  0,
  0,
  11,
  1,
  0,
  0,
  0,
  0,
  13,
  1,
  0,
  0,
  0,
  0,
  15,
  1,
  0,
  0,
  0,
  0,
  17,
  1,
  0,
  0,
  0,
  0,
  19,
  1,
  0,
  0,
  0,
  0,
  21,
  1,
  0,
  0,
  0,
  0,
  23,
  1,
  0,
  0,
  0,
  0,
  25,
  1,
  0,
  0,
  0,
  0,
  27,
  1,
  0,
  0,
  0,
  0,
  29,
  1,
  0,
  0,
  0,
  0,
  31,
  1,
  0,
  0,
  0,
  0,
  33,
  1,
  0,
  0,
  0,
  0,
  35,
  1,
  0,
  0,
  0,
  0,
  37,
  1,
  0,
  0,
  0,
  0,
  39,
  1,
  0,
  0,
  0,
  0,
  41,
  1,
  0,
  0,
  0,
  0,
  43,
  1,
  0,
  0,
  0,
  0,
  45,
  1,
  0,
  0,
  0,
  0,
  47,
  1,
  0,
  0,
  0,
  0,
  49,
  1,
  0,
  0,
  0,
  0,
  51,
  1,
  0,
  0,
  0,
  0,
  53,
  1,
  0,
  0,
  0,
  0,
  55,
  1,
  0,
  0,
  0,
  0,
  57,
  1,
  0,
  0,
  0,
  0,
  59,
  1,
  0,
  0,
  0,
  0,
  61,
  1,
  0,
  0,
  0,
  0,
  63,
  1,
  0,
  0,
  0,
  0,
  65,
  1,
  0,
  0,
  0,
  0,
  67,
  1,
  0,
  0,
  0,
  0,
  69,
  1,
  0,
  0,
  0,
  0,
  71,
  1,
  0,
  0,
  0,
  0,
  73,
  1,
  0,
  0,
  0,
  0,
  75,
  1,
  0,
  0,
  0,
  0,
  77,
  1,
  0,
  0,
  0,
  0,
  79,
  1,
  0,
  0,
  0,
  0,
  81,
  1,
  0,
  0,
  0,
  0,
  83,
  1,
  0,
  0,
  0,
  0,
  85,
  1,
  0,
  0,
  0,
  0,
  87,
  1,
  0,
  0,
  0,
  0,
  89,
  1,
  0,
  0,
  0,
  0,
  91,
  1,
  0,
  0,
  0,
  0,
  93,
  1,
  0,
  0,
  0,
  0,
  95,
  1,
  0,
  0,
  0,
  0,
  97,
  1,
  0,
  0,
  0,
  0,
  99,
  1,
  0,
  0,
  0,
  0,
  101,
  1,
  0,
  0,
  0,
  0,
  103,
  1,
  0,
  0,
  0,
  0,
  105,
  1,
  0,
  0,
  0,
  0,
  107,
  1,
  0,
  0,
  0,
  0,
  109,
  1,
  0,
  0,
  0,
  0,
  111,
  1,
  0,
  0,
  0,
  0,
  113,
  1,
  0,
  0,
  0,
  0,
  115,
  1,
  0,
  0,
  0,
  0,
  117,
  1,
  0,
  0,
  0,
  0,
  119,
  1,
  0,
  0,
  0,
  0,
  121,
  1,
  0,
  0,
  0,
  0,
  123,
  1,
  0,
  0,
  0,
  0,
  125,
  1,
  0,
  0,
  0,
  0,
  127,
  1,
  0,
  0,
  0,
  0,
  129,
  1,
  0,
  0,
  0,
  0,
  131,
  1,
  0,
  0,
  0,
  0,
  133,
  1,
  0,
  0,
  0,
  0,
  135,
  1,
  0,
  0,
  0,
  0,
  137,
  1,
  0,
  0,
  0,
  0,
  139,
  1,
  0,
  0,
  0,
  0,
  141,
  1,
  0,
  0,
  0,
  0,
  143,
  1,
  0,
  0,
  0,
  0,
  145,
  1,
  0,
  0,
  0,
  0,
  147,
  1,
  0,
  0,
  0,
  0,
  149,
  1,
  0,
  0,
  0,
  0,
  151,
  1,
  0,
  0,
  0,
  0,
  153,
  1,
  0,
  0,
  0,
  0,
  155,
  1,
  0,
  0,
  0,
  0,
  157,
  1,
  0,
  0,
  0,
  0,
  159,
  1,
  0,
  0,
  0,
  0,
  161,
  1,
  0,
  0,
  0,
  0,
  163,
  1,
  0,
  0,
  0,
  0,
  165,
  1,
  0,
  0,
  0,
  0,
  167,
  1,
  0,
  0,
  0,
  0,
  169,
  1,
  0,
  0,
  0,
  0,
  171,
  1,
  0,
  0,
  0,
  0,
  173,
  1,
  0,
  0,
  0,
  0,
  175,
  1,
  0,
  0,
  0,
  0,
  177,
  1,
  0,
  0,
  0,
  0,
  179,
  1,
  0,
  0,
  0,
  0,
  181,
  1,
  0,
  0,
  0,
  0,
  183,
  1,
  0,
  0,
  0,
  0,
  185,
  1,
  0,
  0,
  0,
  0,
  187,
  1,
  0,
  0,
  0,
  0,
  189,
  1,
  0,
  0,
  0,
  0,
  191,
  1,
  0,
  0,
  0,
  0,
  193,
  1,
  0,
  0,
  0,
  0,
  195,
  1,
  0,
  0,
  0,
  0,
  197,
  1,
  0,
  0,
  0,
  0,
  243,
  1,
  0,
  0,
  0,
  0,
  245,
  1,
  0,
  0,
  0,
  1,
  247,
  1,
  0,
  0,
  0,
  3,
  253,
  1,
  0,
  0,
  0,
  5,
  258,
  1,
  0,
  0,
  0,
  7,
  275,
  1,
  0,
  0,
  0,
  9,
  277,
  1,
  0,
  0,
  0,
  11,
  286,
  1,
  0,
  0,
  0,
  13,
  290,
  1,
  0,
  0,
  0,
  15,
  293,
  1,
  0,
  0,
  0,
  17,
  300,
  1,
  0,
  0,
  0,
  19,
  305,
  1,
  0,
  0,
  0,
  21,
  310,
  1,
  0,
  0,
  0,
  23,
  316,
  1,
  0,
  0,
  0,
  25,
  322,
  1,
  0,
  0,
  0,
  27,
  331,
  1,
  0,
  0,
  0,
  29,
  343,
  1,
  0,
  0,
  0,
  31,
  349,
  1,
  0,
  0,
  0,
  33,
  357,
  1,
  0,
  0,
  0,
  35,
  361,
  1,
  0,
  0,
  0,
  37,
  366,
  1,
  0,
  0,
  0,
  39,
  371,
  1,
  0,
  0,
  0,
  41,
  375,
  1,
  0,
  0,
  0,
  43,
  380,
  1,
  0,
  0,
  0,
  45,
  384,
  1,
  0,
  0,
  0,
  47,
  389,
  1,
  0,
  0,
  0,
  49,
  398,
  1,
  0,
  0,
  0,
  51,
  405,
  1,
  0,
  0,
  0,
  53,
  408,
  1,
  0,
  0,
  0,
  55,
  418,
  1,
  0,
  0,
  0,
  57,
  425,
  1,
  0,
  0,
  0,
  59,
  428,
  1,
  0,
  0,
  0,
  61,
  437,
  1,
  0,
  0,
  0,
  63,
  443,
  1,
  0,
  0,
  0,
  65,
  450,
  1,
  0,
  0,
  0,
  67,
  454,
  1,
  0,
  0,
  0,
  69,
  462,
  1,
  0,
  0,
  0,
  71,
  467,
  1,
  0,
  0,
  0,
  73,
  471,
  1,
  0,
  0,
  0,
  75,
  475,
  1,
  0,
  0,
  0,
  77,
  479,
  1,
  0,
  0,
  0,
  79,
  482,
  1,
  0,
  0,
  0,
  81,
  485,
  1,
  0,
  0,
  0,
  83,
  488,
  1,
  0,
  0,
  0,
  85,
  492,
  1,
  0,
  0,
  0,
  87,
  500,
  1,
  0,
  0,
  0,
  89,
  508,
  1,
  0,
  0,
  0,
  91,
  514,
  1,
  0,
  0,
  0,
  93,
  522,
  1,
  0,
  0,
  0,
  95,
  532,
  1,
  0,
  0,
  0,
  97,
  541,
  1,
  0,
  0,
  0,
  99,
  548,
  1,
  0,
  0,
  0,
  101,
  555,
  1,
  0,
  0,
  0,
  103,
  559,
  1,
  0,
  0,
  0,
  105,
  564,
  1,
  0,
  0,
  0,
  107,
  571,
  1,
  0,
  0,
  0,
  109,
  578,
  1,
  0,
  0,
  0,
  111,
  583,
  1,
  0,
  0,
  0,
  113,
  588,
  1,
  0,
  0,
  0,
  115,
  594,
  1,
  0,
  0,
  0,
  117,
  597,
  1,
  0,
  0,
  0,
  119,
  601,
  1,
  0,
  0,
  0,
  121,
  605,
  1,
  0,
  0,
  0,
  123,
  610,
  1,
  0,
  0,
  0,
  125,
  616,
  1,
  0,
  0,
  0,
  127,
  621,
  1,
  0,
  0,
  0,
  129,
  634,
  1,
  0,
  0,
  0,
  131,
  658,
  1,
  0,
  0,
  0,
  133,
  660,
  1,
  0,
  0,
  0,
  135,
  666,
  1,
  0,
  0,
  0,
  137,
  671,
  1,
  0,
  0,
  0,
  139,
  682,
  1,
  0,
  0,
  0,
  141,
  687,
  1,
  0,
  0,
  0,
  143,
  689,
  1,
  0,
  0,
  0,
  145,
  692,
  1,
  0,
  0,
  0,
  147,
  694,
  1,
  0,
  0,
  0,
  149,
  696,
  1,
  0,
  0,
  0,
  151,
  698,
  1,
  0,
  0,
  0,
  153,
  700,
  1,
  0,
  0,
  0,
  155,
  702,
  1,
  0,
  0,
  0,
  157,
  704,
  1,
  0,
  0,
  0,
  159,
  707,
  1,
  0,
  0,
  0,
  161,
  709,
  1,
  0,
  0,
  0,
  163,
  711,
  1,
  0,
  0,
  0,
  165,
  713,
  1,
  0,
  0,
  0,
  167,
  715,
  1,
  0,
  0,
  0,
  169,
  717,
  1,
  0,
  0,
  0,
  171,
  719,
  1,
  0,
  0,
  0,
  173,
  721,
  1,
  0,
  0,
  0,
  175,
  723,
  1,
  0,
  0,
  0,
  177,
  725,
  1,
  0,
  0,
  0,
  179,
  727,
  1,
  0,
  0,
  0,
  181,
  730,
  1,
  0,
  0,
  0,
  183,
  733,
  1,
  0,
  0,
  0,
  185,
  742,
  1,
  0,
  0,
  0,
  187,
  744,
  1,
  0,
  0,
  0,
  189,
  746,
  1,
  0,
  0,
  0,
  191,
  753,
  1,
  0,
  0,
  0,
  193,
  767,
  1,
  0,
  0,
  0,
  195,
  769,
  1,
  0,
  0,
  0,
  197,
  780,
  1,
  0,
  0,
  0,
  199,
  786,
  1,
  0,
  0,
  0,
  201,
  788,
  1,
  0,
  0,
  0,
  203,
  790,
  1,
  0,
  0,
  0,
  205,
  800,
  1,
  0,
  0,
  0,
  207,
  824,
  1,
  0,
  0,
  0,
  209,
  851,
  1,
  0,
  0,
  0,
  211,
  856,
  1,
  0,
  0,
  0,
  213,
  860,
  1,
  0,
  0,
  0,
  215,
  862,
  1,
  0,
  0,
  0,
  217,
  866,
  1,
  0,
  0,
  0,
  219,
  874,
  1,
  0,
  0,
  0,
  221,
  881,
  1,
  0,
  0,
  0,
  223,
  892,
  1,
  0,
  0,
  0,
  225,
  897,
  1,
  0,
  0,
  0,
  227,
  901,
  1,
  0,
  0,
  0,
  229,
  903,
  1,
  0,
  0,
  0,
  231,
  905,
  1,
  0,
  0,
  0,
  233,
  927,
  1,
  0,
  0,
  0,
  235,
  930,
  1,
  0,
  0,
  0,
  237,
  932,
  1,
  0,
  0,
  0,
  239,
  934,
  1,
  0,
  0,
  0,
  241,
  936,
  1,
  0,
  0,
  0,
  243,
  943,
  1,
  0,
  0,
  0,
  245,
  946,
  1,
  0,
  0,
  0,
  247,
  248,
  5,
  70,
  0,
  0,
  248,
  249,
  5,
  117,
  0,
  0,
  249,
  250,
  5,
  110,
  0,
  0,
  250,
  251,
  5,
  99,
  0,
  0,
  251,
  2,
  1,
  0,
  0,
  0,
  252,
  254,
  7,
  0,
  0,
  0,
  253,
  252,
  1,
  0,
  0,
  0,
  254,
  255,
  1,
  0,
  0,
  0,
  255,
  253,
  1,
  0,
  0,
  0,
  255,
  256,
  1,
  0,
  0,
  0,
  256,
  4,
  1,
  0,
  0,
  0,
  257,
  259,
  3,
  3,
  1,
  0,
  258,
  257,
  1,
  0,
  0,
  0,
  258,
  259,
  1,
  0,
  0,
  0,
  259,
  263,
  1,
  0,
  0,
  0,
  260,
  262,
  3,
  213,
  106,
  0,
  261,
  260,
  1,
  0,
  0,
  0,
  262,
  265,
  1,
  0,
  0,
  0,
  263,
  261,
  1,
  0,
  0,
  0,
  263,
  264,
  1,
  0,
  0,
  0,
  264,
  266,
  1,
  0,
  0,
  0,
  265,
  263,
  1,
  0,
  0,
  0,
  266,
  270,
  3,
  7,
  3,
  0,
  267,
  269,
  3,
  199,
  99,
  0,
  268,
  267,
  1,
  0,
  0,
  0,
  269,
  272,
  1,
  0,
  0,
  0,
  270,
  268,
  1,
  0,
  0,
  0,
  270,
  271,
  1,
  0,
  0,
  0,
  271,
  273,
  1,
  0,
  0,
  0,
  272,
  270,
  1,
  0,
  0,
  0,
  273,
  274,
  6,
  2,
  0,
  0,
  274,
  6,
  1,
  0,
  0,
  0,
  275,
  276,
  5,
  35,
  0,
  0,
  276,
  8,
  1,
  0,
  0,
  0,
  277,
  278,
  5,
  97,
  0,
  0,
  278,
  279,
  5,
  98,
  0,
  0,
  279,
  280,
  5,
  115,
  0,
  0,
  280,
  281,
  5,
  116,
  0,
  0,
  281,
  282,
  5,
  114,
  0,
  0,
  282,
  283,
  5,
  97,
  0,
  0,
  283,
  284,
  5,
  99,
  0,
  0,
  284,
  285,
  5,
  116,
  0,
  0,
  285,
  10,
  1,
  0,
  0,
  0,
  286,
  287,
  5,
  97,
  0,
  0,
  287,
  288,
  5,
  110,
  0,
  0,
  288,
  289,
  5,
  100,
  0,
  0,
  289,
  12,
  1,
  0,
  0,
  0,
  290,
  291,
  5,
  97,
  0,
  0,
  291,
  292,
  5,
  115,
  0,
  0,
  292,
  14,
  1,
  0,
  0,
  0,
  293,
  294,
  5,
  97,
  0,
  0,
  294,
  295,
  5,
  115,
  0,
  0,
  295,
  296,
  5,
  115,
  0,
  0,
  296,
  297,
  5,
  101,
  0,
  0,
  297,
  298,
  5,
  114,
  0,
  0,
  298,
  299,
  5,
  116,
  0,
  0,
  299,
  16,
  1,
  0,
  0,
  0,
  300,
  301,
  5,
  99,
  0,
  0,
  301,
  302,
  5,
  97,
  0,
  0,
  302,
  303,
  5,
  108,
  0,
  0,
  303,
  304,
  5,
  108,
  0,
  0,
  304,
  18,
  1,
  0,
  0,
  0,
  305,
  306,
  5,
  99,
  0,
  0,
  306,
  307,
  5,
  97,
  0,
  0,
  307,
  308,
  5,
  115,
  0,
  0,
  308,
  309,
  5,
  101,
  0,
  0,
  309,
  20,
  1,
  0,
  0,
  0,
  310,
  311,
  5,
  99,
  0,
  0,
  311,
  312,
  5,
  97,
  0,
  0,
  312,
  313,
  5,
  116,
  0,
  0,
  313,
  314,
  5,
  99,
  0,
  0,
  314,
  315,
  5,
  104,
  0,
  0,
  315,
  22,
  1,
  0,
  0,
  0,
  316,
  317,
  5,
  99,
  0,
  0,
  317,
  318,
  5,
  108,
  0,
  0,
  318,
  319,
  5,
  97,
  0,
  0,
  319,
  320,
  5,
  115,
  0,
  0,
  320,
  321,
  5,
  115,
  0,
  0,
  321,
  24,
  1,
  0,
  0,
  0,
  322,
  323,
  5,
  99,
  0,
  0,
  323,
  324,
  5,
  111,
  0,
  0,
  324,
  325,
  5,
  110,
  0,
  0,
  325,
  326,
  5,
  115,
  0,
  0,
  326,
  327,
  5,
  116,
  0,
  0,
  327,
  328,
  5,
  97,
  0,
  0,
  328,
  329,
  5,
  110,
  0,
  0,
  329,
  330,
  5,
  116,
  0,
  0,
  330,
  26,
  1,
  0,
  0,
  0,
  331,
  332,
  5,
  99,
  0,
  0,
  332,
  333,
  5,
  111,
  0,
  0,
  333,
  334,
  5,
  110,
  0,
  0,
  334,
  335,
  5,
  115,
  0,
  0,
  335,
  336,
  5,
  116,
  0,
  0,
  336,
  337,
  5,
  114,
  0,
  0,
  337,
  338,
  5,
  117,
  0,
  0,
  338,
  339,
  5,
  99,
  0,
  0,
  339,
  340,
  5,
  116,
  0,
  0,
  340,
  341,
  5,
  111,
  0,
  0,
  341,
  342,
  5,
  114,
  0,
  0,
  342,
  28,
  1,
  0,
  0,
  0,
  343,
  344,
  5,
  99,
  0,
  0,
  344,
  345,
  5,
  117,
  0,
  0,
  345,
  346,
  5,
  114,
  0,
  0,
  346,
  347,
  5,
  114,
  0,
  0,
  347,
  348,
  5,
  121,
  0,
  0,
  348,
  30,
  1,
  0,
  0,
  0,
  349,
  350,
  5,
  100,
  0,
  0,
  350,
  351,
  5,
  101,
  0,
  0,
  351,
  352,
  5,
  102,
  0,
  0,
  352,
  353,
  5,
  97,
  0,
  0,
  353,
  354,
  5,
  117,
  0,
  0,
  354,
  355,
  5,
  108,
  0,
  0,
  355,
  356,
  5,
  116,
  0,
  0,
  356,
  32,
  1,
  0,
  0,
  0,
  357,
  358,
  5,
  100,
  0,
  0,
  358,
  359,
  5,
  105,
  0,
  0,
  359,
  360,
  5,
  118,
  0,
  0,
  360,
  34,
  1,
  0,
  0,
  0,
  361,
  362,
  5,
  101,
  0,
  0,
  362,
  363,
  5,
  97,
  0,
  0,
  363,
  364,
  5,
  99,
  0,
  0,
  364,
  365,
  5,
  104,
  0,
  0,
  365,
  36,
  1,
  0,
  0,
  0,
  366,
  367,
  5,
  101,
  0,
  0,
  367,
  368,
  5,
  108,
  0,
  0,
  368,
  369,
  5,
  115,
  0,
  0,
  369,
  370,
  5,
  101,
  0,
  0,
  370,
  38,
  1,
  0,
  0,
  0,
  371,
  372,
  5,
  101,
  0,
  0,
  372,
  373,
  5,
  110,
  0,
  0,
  373,
  374,
  5,
  100,
  0,
  0,
  374,
  40,
  1,
  0,
  0,
  0,
  375,
  376,
  5,
  101,
  0,
  0,
  376,
  377,
  5,
  110,
  0,
  0,
  377,
  378,
  5,
  117,
  0,
  0,
  378,
  379,
  5,
  109,
  0,
  0,
  379,
  42,
  1,
  0,
  0,
  0,
  380,
  381,
  5,
  102,
  0,
  0,
  381,
  382,
  5,
  111,
  0,
  0,
  382,
  383,
  5,
  114,
  0,
  0,
  383,
  44,
  1,
  0,
  0,
  0,
  384,
  385,
  5,
  102,
  0,
  0,
  385,
  386,
  5,
  114,
  0,
  0,
  386,
  387,
  5,
  111,
  0,
  0,
  387,
  388,
  5,
  109,
  0,
  0,
  388,
  46,
  1,
  0,
  0,
  0,
  389,
  390,
  5,
  102,
  0,
  0,
  390,
  391,
  5,
  117,
  0,
  0,
  391,
  392,
  5,
  110,
  0,
  0,
  392,
  393,
  5,
  99,
  0,
  0,
  393,
  394,
  5,
  116,
  0,
  0,
  394,
  395,
  5,
  105,
  0,
  0,
  395,
  396,
  5,
  111,
  0,
  0,
  396,
  397,
  5,
  110,
  0,
  0,
  397,
  48,
  1,
  0,
  0,
  0,
  398,
  399,
  5,
  103,
  0,
  0,
  399,
  400,
  5,
  108,
  0,
  0,
  400,
  401,
  5,
  111,
  0,
  0,
  401,
  402,
  5,
  98,
  0,
  0,
  402,
  403,
  5,
  97,
  0,
  0,
  403,
  404,
  5,
  108,
  0,
  0,
  404,
  50,
  1,
  0,
  0,
  0,
  405,
  406,
  5,
  105,
  0,
  0,
  406,
  407,
  5,
  102,
  0,
  0,
  407,
  52,
  1,
  0,
  0,
  0,
  408,
  409,
  5,
  105,
  0,
  0,
  409,
  410,
  5,
  109,
  0,
  0,
  410,
  411,
  5,
  109,
  0,
  0,
  411,
  412,
  5,
  117,
  0,
  0,
  412,
  413,
  5,
  116,
  0,
  0,
  413,
  414,
  5,
  97,
  0,
  0,
  414,
  415,
  5,
  98,
  0,
  0,
  415,
  416,
  5,
  108,
  0,
  0,
  416,
  417,
  5,
  101,
  0,
  0,
  417,
  54,
  1,
  0,
  0,
  0,
  418,
  419,
  5,
  105,
  0,
  0,
  419,
  420,
  5,
  109,
  0,
  0,
  420,
  421,
  5,
  112,
  0,
  0,
  421,
  422,
  5,
  111,
  0,
  0,
  422,
  423,
  5,
  114,
  0,
  0,
  423,
  424,
  5,
  116,
  0,
  0,
  424,
  56,
  1,
  0,
  0,
  0,
  425,
  426,
  5,
  105,
  0,
  0,
  426,
  427,
  5,
  110,
  0,
  0,
  427,
  58,
  1,
  0,
  0,
  0,
  428,
  429,
  5,
  105,
  0,
  0,
  429,
  430,
  5,
  110,
  0,
  0,
  430,
  431,
  5,
  104,
  0,
  0,
  431,
  432,
  5,
  101,
  0,
  0,
  432,
  433,
  5,
  114,
  0,
  0,
  433,
  434,
  5,
  105,
  0,
  0,
  434,
  435,
  5,
  116,
  0,
  0,
  435,
  436,
  5,
  115,
  0,
  0,
  436,
  60,
  1,
  0,
  0,
  0,
  437,
  438,
  5,
  105,
  0,
  0,
  438,
  439,
  5,
  110,
  0,
  0,
  439,
  440,
  5,
  112,
  0,
  0,
  440,
  441,
  5,
  117,
  0,
  0,
  441,
  442,
  5,
  116,
  0,
  0,
  442,
  62,
  1,
  0,
  0,
  0,
  443,
  444,
  5,
  108,
  0,
  0,
  444,
  445,
  5,
  97,
  0,
  0,
  445,
  446,
  5,
  109,
  0,
  0,
  446,
  447,
  5,
  98,
  0,
  0,
  447,
  448,
  5,
  100,
  0,
  0,
  448,
  449,
  5,
  97,
  0,
  0,
  449,
  64,
  1,
  0,
  0,
  0,
  450,
  451,
  5,
  108,
  0,
  0,
  451,
  452,
  5,
  101,
  0,
  0,
  452,
  453,
  5,
  116,
  0,
  0,
  453,
  66,
  1,
  0,
  0,
  0,
  454,
  455,
  5,
  108,
  0,
  0,
  455,
  456,
  5,
  105,
  0,
  0,
  456,
  457,
  5,
  98,
  0,
  0,
  457,
  458,
  5,
  114,
  0,
  0,
  458,
  459,
  5,
  97,
  0,
  0,
  459,
  460,
  5,
  114,
  0,
  0,
  460,
  461,
  5,
  121,
  0,
  0,
  461,
  68,
  1,
  0,
  0,
  0,
  462,
  463,
  5,
  109,
  0,
  0,
  463,
  464,
  5,
  97,
  0,
  0,
  464,
  465,
  5,
  105,
  0,
  0,
  465,
  466,
  5,
  110,
  0,
  0,
  466,
  70,
  1,
  0,
  0,
  0,
  467,
  468,
  5,
  109,
  0,
  0,
  468,
  469,
  5,
  111,
  0,
  0,
  469,
  470,
  5,
  100,
  0,
  0,
  470,
  72,
  1,
  0,
  0,
  0,
  471,
  472,
  5,
  110,
  0,
  0,
  472,
  473,
  5,
  101,
  0,
  0,
  473,
  474,
  5,
  119,
  0,
  0,
  474,
  74,
  1,
  0,
  0,
  0,
  475,
  476,
  5,
  110,
  0,
  0,
  476,
  477,
  5,
  111,
  0,
  0,
  477,
  478,
  5,
  116,
  0,
  0,
  478,
  76,
  1,
  0,
  0,
  0,
  479,
  480,
  5,
  111,
  0,
  0,
  480,
  481,
  5,
  102,
  0,
  0,
  481,
  78,
  1,
  0,
  0,
  0,
  482,
  483,
  5,
  105,
  0,
  0,
  483,
  484,
  5,
  115,
  0,
  0,
  484,
  80,
  1,
  0,
  0,
  0,
  485,
  486,
  5,
  111,
  0,
  0,
  486,
  487,
  5,
  114,
  0,
  0,
  487,
  82,
  1,
  0,
  0,
  0,
  488,
  489,
  5,
  111,
  0,
  0,
  489,
  490,
  5,
  117,
  0,
  0,
  490,
  491,
  5,
  116,
  0,
  0,
  491,
  84,
  1,
  0,
  0,
  0,
  492,
  493,
  5,
  112,
  0,
  0,
  493,
  494,
  5,
  97,
  0,
  0,
  494,
  495,
  5,
  99,
  0,
  0,
  495,
  496,
  5,
  107,
  0,
  0,
  496,
  497,
  5,
  97,
  0,
  0,
  497,
  498,
  5,
  103,
  0,
  0,
  498,
  499,
  5,
  101,
  0,
  0,
  499,
  86,
  1,
  0,
  0,
  0,
  500,
  501,
  5,
  112,
  0,
  0,
  501,
  502,
  5,
  97,
  0,
  0,
  502,
  503,
  5,
  114,
  0,
  0,
  503,
  504,
  5,
  116,
  0,
  0,
  504,
  505,
  5,
  105,
  0,
  0,
  505,
  506,
  5,
  97,
  0,
  0,
  506,
  507,
  5,
  108,
  0,
  0,
  507,
  88,
  1,
  0,
  0,
  0,
  508,
  509,
  5,
  112,
  0,
  0,
  509,
  510,
  5,
  114,
  0,
  0,
  510,
  511,
  5,
  105,
  0,
  0,
  511,
  512,
  5,
  110,
  0,
  0,
  512,
  513,
  5,
  116,
  0,
  0,
  513,
  90,
  1,
  0,
  0,
  0,
  514,
  515,
  5,
  112,
  0,
  0,
  515,
  516,
  5,
  114,
  0,
  0,
  516,
  517,
  5,
  105,
  0,
  0,
  517,
  518,
  5,
  118,
  0,
  0,
  518,
  519,
  5,
  97,
  0,
  0,
  519,
  520,
  5,
  116,
  0,
  0,
  520,
  521,
  5,
  101,
  0,
  0,
  521,
  92,
  1,
  0,
  0,
  0,
  522,
  523,
  5,
  112,
  0,
  0,
  523,
  524,
  5,
  114,
  0,
  0,
  524,
  525,
  5,
  111,
  0,
  0,
  525,
  526,
  5,
  99,
  0,
  0,
  526,
  527,
  5,
  101,
  0,
  0,
  527,
  528,
  5,
  100,
  0,
  0,
  528,
  529,
  5,
  117,
  0,
  0,
  529,
  530,
  5,
  114,
  0,
  0,
  530,
  531,
  5,
  101,
  0,
  0,
  531,
  94,
  1,
  0,
  0,
  0,
  532,
  533,
  5,
  112,
  0,
  0,
  533,
  534,
  5,
  114,
  0,
  0,
  534,
  535,
  5,
  111,
  0,
  0,
  535,
  536,
  5,
  112,
  0,
  0,
  536,
  537,
  5,
  101,
  0,
  0,
  537,
  538,
  5,
  114,
  0,
  0,
  538,
  539,
  5,
  116,
  0,
  0,
  539,
  540,
  5,
  121,
  0,
  0,
  540,
  96,
  1,
  0,
  0,
  0,
  541,
  542,
  5,
  114,
  0,
  0,
  542,
  543,
  5,
  101,
  0,
  0,
  543,
  544,
  5,
  112,
  0,
  0,
  544,
  545,
  5,
  101,
  0,
  0,
  545,
  546,
  5,
  97,
  0,
  0,
  546,
  547,
  5,
  116,
  0,
  0,
  547,
  98,
  1,
  0,
  0,
  0,
  548,
  549,
  5,
  114,
  0,
  0,
  549,
  550,
  5,
  101,
  0,
  0,
  550,
  551,
  5,
  116,
  0,
  0,
  551,
  552,
  5,
  117,
  0,
  0,
  552,
  553,
  5,
  114,
  0,
  0,
  553,
  554,
  5,
  110,
  0,
  0,
  554,
  100,
  1,
  0,
  0,
  0,
  555,
  556,
  5,
  115,
  0,
  0,
  556,
  557,
  5,
  101,
  0,
  0,
  557,
  558,
  5,
  116,
  0,
  0,
  558,
  102,
  1,
  0,
  0,
  0,
  559,
  560,
  5,
  115,
  0,
  0,
  560,
  561,
  5,
  116,
  0,
  0,
  561,
  562,
  5,
  101,
  0,
  0,
  562,
  563,
  5,
  112,
  0,
  0,
  563,
  104,
  1,
  0,
  0,
  0,
  564,
  565,
  5,
  115,
  0,
  0,
  565,
  566,
  5,
  119,
  0,
  0,
  566,
  567,
  5,
  105,
  0,
  0,
  567,
  568,
  5,
  116,
  0,
  0,
  568,
  569,
  5,
  99,
  0,
  0,
  569,
  570,
  5,
  104,
  0,
  0,
  570,
  106,
  1,
  0,
  0,
  0,
  571,
  572,
  5,
  115,
  0,
  0,
  572,
  573,
  5,
  121,
  0,
  0,
  573,
  574,
  5,
  115,
  0,
  0,
  574,
  575,
  5,
  116,
  0,
  0,
  575,
  576,
  5,
  101,
  0,
  0,
  576,
  577,
  5,
  109,
  0,
  0,
  577,
  108,
  1,
  0,
  0,
  0,
  578,
  579,
  5,
  116,
  0,
  0,
  579,
  580,
  5,
  101,
  0,
  0,
  580,
  581,
  5,
  115,
  0,
  0,
  581,
  582,
  5,
  116,
  0,
  0,
  582,
  110,
  1,
  0,
  0,
  0,
  583,
  584,
  5,
  116,
  0,
  0,
  584,
  585,
  5,
  104,
  0,
  0,
  585,
  586,
  5,
  105,
  0,
  0,
  586,
  587,
  5,
  115,
  0,
  0,
  587,
  112,
  1,
  0,
  0,
  0,
  588,
  589,
  5,
  116,
  0,
  0,
  589,
  590,
  5,
  104,
  0,
  0,
  590,
  591,
  5,
  114,
  0,
  0,
  591,
  592,
  5,
  111,
  0,
  0,
  592,
  593,
  5,
  119,
  0,
  0,
  593,
  114,
  1,
  0,
  0,
  0,
  594,
  595,
  5,
  116,
  0,
  0,
  595,
  596,
  5,
  111,
  0,
  0,
  596,
  116,
  1,
  0,
  0,
  0,
  597,
  598,
  5,
  116,
  0,
  0,
  598,
  599,
  5,
  114,
  0,
  0,
  599,
  600,
  5,
  121,
  0,
  0,
  600,
  118,
  1,
  0,
  0,
  0,
  601,
  602,
  5,
  118,
  0,
  0,
  602,
  603,
  5,
  97,
  0,
  0,
  603,
  604,
  5,
  114,
  0,
  0,
  604,
  120,
  1,
  0,
  0,
  0,
  605,
  606,
  5,
  119,
  0,
  0,
  606,
  607,
  5,
  104,
  0,
  0,
  607,
  608,
  5,
  101,
  0,
  0,
  608,
  609,
  5,
  110,
  0,
  0,
  609,
  122,
  1,
  0,
  0,
  0,
  610,
  611,
  5,
  119,
  0,
  0,
  611,
  612,
  5,
  104,
  0,
  0,
  612,
  613,
  5,
  105,
  0,
  0,
  613,
  614,
  5,
  108,
  0,
  0,
  614,
  615,
  5,
  101,
  0,
  0,
  615,
  124,
  1,
  0,
  0,
  0,
  616,
  617,
  5,
  119,
  0,
  0,
  617,
  618,
  5,
  105,
  0,
  0,
  618,
  619,
  5,
  116,
  0,
  0,
  619,
  620,
  5,
  104,
  0,
  0,
  620,
  126,
  1,
  0,
  0,
  0,
  621,
  622,
  5,
  120,
  0,
  0,
  622,
  623,
  5,
  111,
  0,
  0,
  623,
  624,
  5,
  114,
  0,
  0,
  624,
  128,
  1,
  0,
  0,
  0,
  625,
  626,
  5,
  116,
  0,
  0,
  626,
  627,
  5,
  114,
  0,
  0,
  627,
  628,
  5,
  117,
  0,
  0,
  628,
  635,
  5,
  101,
  0,
  0,
  629,
  630,
  5,
  102,
  0,
  0,
  630,
  631,
  5,
  97,
  0,
  0,
  631,
  632,
  5,
  108,
  0,
  0,
  632,
  633,
  5,
  115,
  0,
  0,
  633,
  635,
  5,
  101,
  0,
  0,
  634,
  625,
  1,
  0,
  0,
  0,
  634,
  629,
  1,
  0,
  0,
  0,
  635,
  130,
  1,
  0,
  0,
  0,
  636,
  637,
  5,
  73,
  0,
  0,
  637,
  638,
  5,
  110,
  0,
  0,
  638,
  659,
  5,
  116,
  0,
  0,
  639,
  640,
  5,
  70,
  0,
  0,
  640,
  641,
  5,
  108,
  0,
  0,
  641,
  642,
  5,
  111,
  0,
  0,
  642,
  643,
  5,
  97,
  0,
  0,
  643,
  659,
  5,
  116,
  0,
  0,
  644,
  645,
  5,
  67,
  0,
  0,
  645,
  646,
  5,
  104,
  0,
  0,
  646,
  647,
  5,
  97,
  0,
  0,
  647,
  659,
  5,
  114,
  0,
  0,
  648,
  649,
  5,
  83,
  0,
  0,
  649,
  650,
  5,
  116,
  0,
  0,
  650,
  651,
  5,
  114,
  0,
  0,
  651,
  652,
  5,
  105,
  0,
  0,
  652,
  653,
  5,
  110,
  0,
  0,
  653,
  659,
  5,
  103,
  0,
  0,
  654,
  655,
  5,
  66,
  0,
  0,
  655,
  656,
  5,
  111,
  0,
  0,
  656,
  657,
  5,
  111,
  0,
  0,
  657,
  659,
  5,
  108,
  0,
  0,
  658,
  636,
  1,
  0,
  0,
  0,
  658,
  639,
  1,
  0,
  0,
  0,
  658,
  644,
  1,
  0,
  0,
  0,
  658,
  648,
  1,
  0,
  0,
  0,
  658,
  654,
  1,
  0,
  0,
  0,
  659,
  132,
  1,
  0,
  0,
  0,
  660,
  661,
  5,
  65,
  0,
  0,
  661,
  662,
  5,
  114,
  0,
  0,
  662,
  663,
  5,
  114,
  0,
  0,
  663,
  664,
  5,
  97,
  0,
  0,
  664,
  665,
  5,
  121,
  0,
  0,
  665,
  134,
  1,
  0,
  0,
  0,
  666,
  667,
  5,
  76,
  0,
  0,
  667,
  668,
  5,
  105,
  0,
  0,
  668,
  669,
  5,
  115,
  0,
  0,
  669,
  670,
  5,
  116,
  0,
  0,
  670,
  136,
  1,
  0,
  0,
  0,
  671,
  672,
  5,
  68,
  0,
  0,
  672,
  673,
  5,
  105,
  0,
  0,
  673,
  674,
  5,
  99,
  0,
  0,
  674,
  675,
  5,
  116,
  0,
  0,
  675,
  676,
  5,
  105,
  0,
  0,
  676,
  677,
  5,
  111,
  0,
  0,
  677,
  678,
  5,
  110,
  0,
  0,
  678,
  679,
  5,
  97,
  0,
  0,
  679,
  680,
  5,
  114,
  0,
  0,
  680,
  681,
  5,
  121,
  0,
  0,
  681,
  138,
  1,
  0,
  0,
  0,
  682,
  683,
  5,
  73,
  0,
  0,
  683,
  684,
  5,
  116,
  0,
  0,
  684,
  685,
  5,
  101,
  0,
  0,
  685,
  686,
  5,
  114,
  0,
  0,
  686,
  140,
  1,
  0,
  0,
  0,
  687,
  688,
  5,
  61,
  0,
  0,
  688,
  142,
  1,
  0,
  0,
  0,
  689,
  690,
  5,
  45,
  0,
  0,
  690,
  691,
  5,
  62,
  0,
  0,
  691,
  144,
  1,
  0,
  0,
  0,
  692,
  693,
  5,
  123,
  0,
  0,
  693,
  146,
  1,
  0,
  0,
  0,
  694,
  695,
  5,
  125,
  0,
  0,
  695,
  148,
  1,
  0,
  0,
  0,
  696,
  697,
  5,
  91,
  0,
  0,
  697,
  150,
  1,
  0,
  0,
  0,
  698,
  699,
  5,
  93,
  0,
  0,
  699,
  152,
  1,
  0,
  0,
  0,
  700,
  701,
  5,
  40,
  0,
  0,
  701,
  154,
  1,
  0,
  0,
  0,
  702,
  703,
  5,
  41,
  0,
  0,
  703,
  156,
  1,
  0,
  0,
  0,
  704,
  705,
  5,
  46,
  0,
  0,
  705,
  706,
  5,
  46,
  0,
  0,
  706,
  158,
  1,
  0,
  0,
  0,
  707,
  708,
  5,
  46,
  0,
  0,
  708,
  160,
  1,
  0,
  0,
  0,
  709,
  710,
  5,
  44,
  0,
  0,
  710,
  162,
  1,
  0,
  0,
  0,
  711,
  712,
  5,
  58,
  0,
  0,
  712,
  164,
  1,
  0,
  0,
  0,
  713,
  714,
  5,
  43,
  0,
  0,
  714,
  166,
  1,
  0,
  0,
  0,
  715,
  716,
  5,
  45,
  0,
  0,
  716,
  168,
  1,
  0,
  0,
  0,
  717,
  718,
  5,
  42,
  0,
  0,
  718,
  170,
  1,
  0,
  0,
  0,
  719,
  720,
  5,
  47,
  0,
  0,
  720,
  172,
  1,
  0,
  0,
  0,
  721,
  722,
  5,
  94,
  0,
  0,
  722,
  174,
  1,
  0,
  0,
  0,
  723,
  724,
  5,
  60,
  0,
  0,
  724,
  176,
  1,
  0,
  0,
  0,
  725,
  726,
  5,
  62,
  0,
  0,
  726,
  178,
  1,
  0,
  0,
  0,
  727,
  728,
  5,
  60,
  0,
  0,
  728,
  729,
  5,
  61,
  0,
  0,
  729,
  180,
  1,
  0,
  0,
  0,
  730,
  731,
  5,
  62,
  0,
  0,
  731,
  732,
  5,
  61,
  0,
  0,
  732,
  182,
  1,
  0,
  0,
  0,
  733,
  737,
  3,
  79,
  39,
  0,
  734,
  736,
  3,
  213,
  106,
  0,
  735,
  734,
  1,
  0,
  0,
  0,
  736,
  739,
  1,
  0,
  0,
  0,
  737,
  735,
  1,
  0,
  0,
  0,
  737,
  738,
  1,
  0,
  0,
  0,
  738,
  740,
  1,
  0,
  0,
  0,
  739,
  737,
  1,
  0,
  0,
  0,
  740,
  741,
  3,
  75,
  37,
  0,
  741,
  184,
  1,
  0,
  0,
  0,
  742,
  743,
  3,
  221,
  110,
  0,
  743,
  186,
  1,
  0,
  0,
  0,
  744,
  745,
  3,
  219,
  109,
  0,
  745,
  188,
  1,
  0,
  0,
  0,
  746,
  750,
  7,
  1,
  0,
  0,
  747,
  749,
  7,
  1,
  0,
  0,
  748,
  747,
  1,
  0,
  0,
  0,
  749,
  752,
  1,
  0,
  0,
  0,
  750,
  748,
  1,
  0,
  0,
  0,
  750,
  751,
  1,
  0,
  0,
  0,
  751,
  190,
  1,
  0,
  0,
  0,
  752,
  750,
  1,
  0,
  0,
  0,
  753,
  754,
  3,
  189,
  94,
  0,
  754,
  755,
  3,
  159,
  79,
  0,
  755,
  757,
  3,
  189,
  94,
  0,
  756,
  758,
  3,
  203,
  101,
  0,
  757,
  756,
  1,
  0,
  0,
  0,
  757,
  758,
  1,
  0,
  0,
  0,
  758,
  192,
  1,
  0,
  0,
  0,
  759,
  762,
  5,
  39,
  0,
  0,
  760,
  763,
  8,
  2,
  0,
  0,
  761,
  763,
  3,
  205,
  102,
  0,
  762,
  760,
  1,
  0,
  0,
  0,
  762,
  761,
  1,
  0,
  0,
  0,
  763,
  764,
  1,
  0,
  0,
  0,
  764,
  768,
  5,
  39,
  0,
  0,
  765,
  766,
  5,
  39,
  0,
  0,
  766,
  768,
  5,
  39,
  0,
  0,
  767,
  759,
  1,
  0,
  0,
  0,
  767,
  765,
  1,
  0,
  0,
  0,
  768,
  194,
  1,
  0,
  0,
  0,
  769,
  774,
  5,
  34,
  0,
  0,
  770,
  773,
  8,
  3,
  0,
  0,
  771,
  773,
  3,
  205,
  102,
  0,
  772,
  770,
  1,
  0,
  0,
  0,
  772,
  771,
  1,
  0,
  0,
  0,
  773,
  776,
  1,
  0,
  0,
  0,
  774,
  772,
  1,
  0,
  0,
  0,
  774,
  775,
  1,
  0,
  0,
  0,
  775,
  777,
  1,
  0,
  0,
  0,
  776,
  774,
  1,
  0,
  0,
  0,
  777,
  778,
  5,
  34,
  0,
  0,
  778,
  196,
  1,
  0,
  0,
  0,
  779,
  781,
  3,
  213,
  106,
  0,
  780,
  779,
  1,
  0,
  0,
  0,
  781,
  782,
  1,
  0,
  0,
  0,
  782,
  780,
  1,
  0,
  0,
  0,
  782,
  783,
  1,
  0,
  0,
  0,
  783,
  784,
  1,
  0,
  0,
  0,
  784,
  785,
  6,
  98,
  0,
  0,
  785,
  198,
  1,
  0,
  0,
  0,
  786,
  787,
  8,
  4,
  0,
  0,
  787,
  200,
  1,
  0,
  0,
  0,
  788,
  789,
  7,
  4,
  0,
  0,
  789,
  202,
  1,
  0,
  0,
  0,
  790,
  793,
  7,
  5,
  0,
  0,
  791,
  794,
  3,
  165,
  82,
  0,
  792,
  794,
  3,
  167,
  83,
  0,
  793,
  791,
  1,
  0,
  0,
  0,
  793,
  792,
  1,
  0,
  0,
  0,
  793,
  794,
  1,
  0,
  0,
  0,
  794,
  795,
  1,
  0,
  0,
  0,
  795,
  796,
  3,
  189,
  94,
  0,
  796,
  204,
  1,
  0,
  0,
  0,
  797,
  801,
  3,
  207,
  103,
  0,
  798,
  801,
  3,
  209,
  104,
  0,
  799,
  801,
  3,
  233,
  116,
  0,
  800,
  797,
  1,
  0,
  0,
  0,
  800,
  798,
  1,
  0,
  0,
  0,
  800,
  799,
  1,
  0,
  0,
  0,
  801,
  206,
  1,
  0,
  0,
  0,
  802,
  803,
  5,
  92,
  0,
  0,
  803,
  825,
  5,
  39,
  0,
  0,
  804,
  805,
  5,
  92,
  0,
  0,
  805,
  825,
  5,
  34,
  0,
  0,
  806,
  807,
  5,
  92,
  0,
  0,
  807,
  825,
  5,
  92,
  0,
  0,
  808,
  809,
  5,
  92,
  0,
  0,
  809,
  825,
  5,
  48,
  0,
  0,
  810,
  811,
  5,
  92,
  0,
  0,
  811,
  825,
  5,
  97,
  0,
  0,
  812,
  813,
  5,
  92,
  0,
  0,
  813,
  825,
  5,
  98,
  0,
  0,
  814,
  815,
  5,
  92,
  0,
  0,
  815,
  825,
  5,
  102,
  0,
  0,
  816,
  817,
  5,
  92,
  0,
  0,
  817,
  825,
  5,
  110,
  0,
  0,
  818,
  819,
  5,
  92,
  0,
  0,
  819,
  825,
  5,
  114,
  0,
  0,
  820,
  821,
  5,
  92,
  0,
  0,
  821,
  825,
  5,
  116,
  0,
  0,
  822,
  823,
  5,
  92,
  0,
  0,
  823,
  825,
  5,
  118,
  0,
  0,
  824,
  802,
  1,
  0,
  0,
  0,
  824,
  804,
  1,
  0,
  0,
  0,
  824,
  806,
  1,
  0,
  0,
  0,
  824,
  808,
  1,
  0,
  0,
  0,
  824,
  810,
  1,
  0,
  0,
  0,
  824,
  812,
  1,
  0,
  0,
  0,
  824,
  814,
  1,
  0,
  0,
  0,
  824,
  816,
  1,
  0,
  0,
  0,
  824,
  818,
  1,
  0,
  0,
  0,
  824,
  820,
  1,
  0,
  0,
  0,
  824,
  822,
  1,
  0,
  0,
  0,
  825,
  208,
  1,
  0,
  0,
  0,
  826,
  827,
  5,
  92,
  0,
  0,
  827,
  828,
  5,
  120,
  0,
  0,
  828,
  829,
  1,
  0,
  0,
  0,
  829,
  852,
  3,
  235,
  117,
  0,
  830,
  831,
  5,
  92,
  0,
  0,
  831,
  832,
  5,
  120,
  0,
  0,
  832,
  833,
  1,
  0,
  0,
  0,
  833,
  834,
  3,
  235,
  117,
  0,
  834,
  835,
  3,
  235,
  117,
  0,
  835,
  852,
  1,
  0,
  0,
  0,
  836,
  837,
  5,
  92,
  0,
  0,
  837,
  838,
  5,
  120,
  0,
  0,
  838,
  839,
  1,
  0,
  0,
  0,
  839,
  840,
  3,
  235,
  117,
  0,
  840,
  841,
  3,
  235,
  117,
  0,
  841,
  842,
  3,
  235,
  117,
  0,
  842,
  852,
  1,
  0,
  0,
  0,
  843,
  844,
  5,
  92,
  0,
  0,
  844,
  845,
  5,
  120,
  0,
  0,
  845,
  846,
  1,
  0,
  0,
  0,
  846,
  847,
  3,
  235,
  117,
  0,
  847,
  848,
  3,
  235,
  117,
  0,
  848,
  849,
  3,
  235,
  117,
  0,
  849,
  850,
  3,
  235,
  117,
  0,
  850,
  852,
  1,
  0,
  0,
  0,
  851,
  826,
  1,
  0,
  0,
  0,
  851,
  830,
  1,
  0,
  0,
  0,
  851,
  836,
  1,
  0,
  0,
  0,
  851,
  843,
  1,
  0,
  0,
  0,
  852,
  210,
  1,
  0,
  0,
  0,
  853,
  854,
  5,
  13,
  0,
  0,
  854,
  857,
  5,
  10,
  0,
  0,
  855,
  857,
  7,
  4,
  0,
  0,
  856,
  853,
  1,
  0,
  0,
  0,
  856,
  855,
  1,
  0,
  0,
  0,
  857,
  212,
  1,
  0,
  0,
  0,
  858,
  861,
  3,
  215,
  107,
  0,
  859,
  861,
  7,
  6,
  0,
  0,
  860,
  858,
  1,
  0,
  0,
  0,
  860,
  859,
  1,
  0,
  0,
  0,
  861,
  214,
  1,
  0,
  0,
  0,
  862,
  863,
  7,
  7,
  0,
  0,
  863,
  216,
  1,
  0,
  0,
  0,
  864,
  867,
  3,
  239,
  119,
  0,
  865,
  867,
  3,
  237,
  118,
  0,
  866,
  864,
  1,
  0,
  0,
  0,
  866,
  865,
  1,
  0,
  0,
  0,
  867,
  871,
  1,
  0,
  0,
  0,
  868,
  870,
  3,
  223,
  111,
  0,
  869,
  868,
  1,
  0,
  0,
  0,
  870,
  873,
  1,
  0,
  0,
  0,
  871,
  869,
  1,
  0,
  0,
  0,
  871,
  872,
  1,
  0,
  0,
  0,
  872,
  218,
  1,
  0,
  0,
  0,
  873,
  871,
  1,
  0,
  0,
  0,
  874,
  878,
  3,
  239,
  119,
  0,
  875,
  877,
  3,
  223,
  111,
  0,
  876,
  875,
  1,
  0,
  0,
  0,
  877,
  880,
  1,
  0,
  0,
  0,
  878,
  876,
  1,
  0,
  0,
  0,
  878,
  879,
  1,
  0,
  0,
  0,
  879,
  220,
  1,
  0,
  0,
  0,
  880,
  878,
  1,
  0,
  0,
  0,
  881,
  885,
  3,
  237,
  118,
  0,
  882,
  884,
  3,
  223,
  111,
  0,
  883,
  882,
  1,
  0,
  0,
  0,
  884,
  887,
  1,
  0,
  0,
  0,
  885,
  883,
  1,
  0,
  0,
  0,
  885,
  886,
  1,
  0,
  0,
  0,
  886,
  222,
  1,
  0,
  0,
  0,
  887,
  885,
  1,
  0,
  0,
  0,
  888,
  893,
  3,
  237,
  118,
  0,
  889,
  893,
  3,
  239,
  119,
  0,
  890,
  893,
  3,
  227,
  113,
  0,
  891,
  893,
  5,
  95,
  0,
  0,
  892,
  888,
  1,
  0,
  0,
  0,
  892,
  889,
  1,
  0,
  0,
  0,
  892,
  890,
  1,
  0,
  0,
  0,
  892,
  891,
  1,
  0,
  0,
  0,
  893,
  224,
  1,
  0,
  0,
  0,
  894,
  898,
  3,
  237,
  118,
  0,
  895,
  898,
  3,
  239,
  119,
  0,
  896,
  898,
  3,
  233,
  116,
  0,
  897,
  894,
  1,
  0,
  0,
  0,
  897,
  895,
  1,
  0,
  0,
  0,
  897,
  896,
  1,
  0,
  0,
  0,
  898,
  226,
  1,
  0,
  0,
  0,
  899,
  902,
  3,
  241,
  120,
  0,
  900,
  902,
  3,
  233,
  116,
  0,
  901,
  899,
  1,
  0,
  0,
  0,
  901,
  900,
  1,
  0,
  0,
  0,
  902,
  228,
  1,
  0,
  0,
  0,
  903,
  904,
  3,
  233,
  116,
  0,
  904,
  230,
  1,
  0,
  0,
  0,
  905,
  906,
  3,
  233,
  116,
  0,
  906,
  232,
  1,
  0,
  0,
  0,
  907,
  908,
  5,
  92,
  0,
  0,
  908,
  909,
  5,
  117,
  0,
  0,
  909,
  910,
  1,
  0,
  0,
  0,
  910,
  911,
  3,
  235,
  117,
  0,
  911,
  912,
  3,
  235,
  117,
  0,
  912,
  913,
  3,
  235,
  117,
  0,
  913,
  914,
  3,
  235,
  117,
  0,
  914,
  928,
  1,
  0,
  0,
  0,
  915,
  916,
  5,
  92,
  0,
  0,
  916,
  917,
  5,
  85,
  0,
  0,
  917,
  918,
  1,
  0,
  0,
  0,
  918,
  919,
  3,
  235,
  117,
  0,
  919,
  920,
  3,
  235,
  117,
  0,
  920,
  921,
  3,
  235,
  117,
  0,
  921,
  922,
  3,
  235,
  117,
  0,
  922,
  923,
  3,
  235,
  117,
  0,
  923,
  924,
  3,
  235,
  117,
  0,
  924,
  925,
  3,
  235,
  117,
  0,
  925,
  926,
  3,
  235,
  117,
  0,
  926,
  928,
  1,
  0,
  0,
  0,
  927,
  907,
  1,
  0,
  0,
  0,
  927,
  915,
  1,
  0,
  0,
  0,
  928,
  234,
  1,
  0,
  0,
  0,
  929,
  931,
  7,
  8,
  0,
  0,
  930,
  929,
  1,
  0,
  0,
  0,
  931,
  236,
  1,
  0,
  0,
  0,
  932,
  933,
  2,
  65,
  90,
  0,
  933,
  238,
  1,
  0,
  0,
  0,
  934,
  935,
  2,
  97,
  122,
  0,
  935,
  240,
  1,
  0,
  0,
  0,
  936,
  937,
  2,
  48,
  57,
  0,
  937,
  242,
  1,
  0,
  0,
  0,
  938,
  940,
  5,
  13,
  0,
  0,
  939,
  938,
  1,
  0,
  0,
  0,
  939,
  940,
  1,
  0,
  0,
  0,
  940,
  941,
  1,
  0,
  0,
  0,
  941,
  944,
  5,
  10,
  0,
  0,
  942,
  944,
  5,
  13,
  0,
  0,
  943,
  939,
  1,
  0,
  0,
  0,
  943,
  942,
  1,
  0,
  0,
  0,
  944,
  244,
  1,
  0,
  0,
  0,
  945,
  947,
  7,
  9,
  0,
  0,
  946,
  945,
  1,
  0,
  0,
  0,
  947,
  948,
  1,
  0,
  0,
  0,
  948,
  946,
  1,
  0,
  0,
  0,
  948,
  949,
  1,
  0,
  0,
  0,
  949,
  950,
  1,
  0,
  0,
  0,
  950,
  951,
  6,
  122,
  0,
  0,
  951,
  246,
  1,
  0,
  0,
  0,
  33,
  0,
  255,
  258,
  263,
  270,
  634,
  658,
  737,
  750,
  757,
  762,
  767,
  772,
  774,
  782,
  793,
  800,
  824,
  851,
  856,
  860,
  866,
  871,
  878,
  885,
  892,
  897,
  901,
  927,
  930,
  939,
  943,
  948,
  1,
  6,
  0,
  0
];
var atn = new Ln.atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map((ds, index) => new Ln.dfa.DFA(ds, index));
var ElanLexer = class extends Ln.Lexer {
  static grammarFileName = "Elan.g4";
  static channelNames = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"];
  static modeNames = ["DEFAULT_MODE"];
  static literalNames = [
    null,
    "'Func'",
    null,
    null,
    "'#'",
    "'abstract'",
    "'and'",
    "'as'",
    "'assert'",
    "'call'",
    "'case'",
    "'catch'",
    "'class'",
    "'constant'",
    "'constructor'",
    "'curry'",
    "'default'",
    "'div'",
    "'each'",
    "'else'",
    "'end'",
    "'enum'",
    "'for'",
    "'from'",
    "'function'",
    "'global'",
    "'if'",
    "'immutable'",
    "'import'",
    "'in'",
    "'inherits'",
    "'input'",
    "'lambda'",
    "'let'",
    "'library'",
    "'main'",
    "'mod'",
    "'new'",
    "'not'",
    "'of'",
    "'is'",
    "'or'",
    "'out'",
    "'package'",
    "'partial'",
    "'print'",
    "'private'",
    "'procedure'",
    "'property'",
    "'repeat'",
    "'return'",
    "'set'",
    "'step'",
    "'switch'",
    "'system'",
    "'test'",
    "'this'",
    "'throw'",
    "'to'",
    "'try'",
    "'var'",
    "'when'",
    "'while'",
    "'with'",
    "'xor'",
    null,
    null,
    "'Array'",
    "'List'",
    "'Dictionary'",
    "'Iter'",
    "'='",
    "'->'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'('",
    "')'",
    "'..'",
    "'.'",
    "','",
    "':'",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'^'",
    "'<'",
    "'>'",
    "'<='",
    "'>='"
  ];
  static symbolicNames = [
    null,
    null,
    "NL",
    "SINGLE_LINE_COMMENT",
    "COMMENT_MARKER",
    "ABSTRACT",
    "AND",
    "AS",
    "ASSERT",
    "CALL",
    "CASE",
    "CATCH",
    "CLASS",
    "CONSTANT",
    "CONSTRUCTOR",
    "CURRY",
    "DEFAULT",
    "DIV",
    "EACH",
    "ELSE",
    "END",
    "ENUM",
    "FOR",
    "FROM",
    "FUNCTION",
    "GLOBAL",
    "IF",
    "IMMUTABLE",
    "IMPORT",
    "IN",
    "INHERITS",
    "INPUT",
    "LAMBDA",
    "LET",
    "LIBRARY",
    "MAIN",
    "MOD",
    "NEW",
    "NOT",
    "OF",
    "IS",
    "OR",
    "OUT",
    "PACKAGE",
    "PARTIAL",
    "PRINT",
    "PRIVATE",
    "PROCEDURE",
    "PROPERTY",
    "REPEAT",
    "RETURN",
    "SET",
    "STEP",
    "SWITCH",
    "SYSTEM",
    "TEST",
    "THIS",
    "THROW",
    "TO",
    "TRY",
    "VAR",
    "WHEN",
    "WHILE",
    "WITH",
    "XOR",
    "BOOL_VALUE",
    "VALUE_TYPE",
    "ARRAY",
    "LIST",
    "DICTIONARY",
    "ITERABLE",
    "EQUALS",
    "ARROW",
    "OPEN_BRACE",
    "CLOSE_BRACE",
    "OPEN_SQ_BRACKET",
    "CLOSE_SQ_BRACKET",
    "OPEN_BRACKET",
    "CLOSE_BRACKET",
    "DOUBLE_DOT",
    "DOT",
    "COMMA",
    "COLON",
    "PLUS",
    "MINUS",
    "MULT",
    "DIVIDE",
    "POWER",
    "LT",
    "GT",
    "LE",
    "GE",
    "IS_NOT",
    "TYPENAME",
    "IDENTIFIER",
    "LITERAL_INTEGER",
    "LITERAL_FLOAT",
    "LITERAL_CHAR",
    "LITERAL_STRING",
    "WHITESPACES",
    "NEWLINE",
    "WS"
  ];
  static ruleNames = [
    "T__0",
    "NL",
    "SINGLE_LINE_COMMENT",
    "COMMENT_MARKER",
    "ABSTRACT",
    "AND",
    "AS",
    "ASSERT",
    "CALL",
    "CASE",
    "CATCH",
    "CLASS",
    "CONSTANT",
    "CONSTRUCTOR",
    "CURRY",
    "DEFAULT",
    "DIV",
    "EACH",
    "ELSE",
    "END",
    "ENUM",
    "FOR",
    "FROM",
    "FUNCTION",
    "GLOBAL",
    "IF",
    "IMMUTABLE",
    "IMPORT",
    "IN",
    "INHERITS",
    "INPUT",
    "LAMBDA",
    "LET",
    "LIBRARY",
    "MAIN",
    "MOD",
    "NEW",
    "NOT",
    "OF",
    "IS",
    "OR",
    "OUT",
    "PACKAGE",
    "PARTIAL",
    "PRINT",
    "PRIVATE",
    "PROCEDURE",
    "PROPERTY",
    "REPEAT",
    "RETURN",
    "SET",
    "STEP",
    "SWITCH",
    "SYSTEM",
    "TEST",
    "THIS",
    "THROW",
    "TO",
    "TRY",
    "VAR",
    "WHEN",
    "WHILE",
    "WITH",
    "XOR",
    "BOOL_VALUE",
    "VALUE_TYPE",
    "ARRAY",
    "LIST",
    "DICTIONARY",
    "ITERABLE",
    "EQUALS",
    "ARROW",
    "OPEN_BRACE",
    "CLOSE_BRACE",
    "OPEN_SQ_BRACKET",
    "CLOSE_SQ_BRACKET",
    "OPEN_BRACKET",
    "CLOSE_BRACKET",
    "DOUBLE_DOT",
    "DOT",
    "COMMA",
    "COLON",
    "PLUS",
    "MINUS",
    "MULT",
    "DIVIDE",
    "POWER",
    "LT",
    "GT",
    "LE",
    "GE",
    "IS_NOT",
    "TYPENAME",
    "IDENTIFIER",
    "LITERAL_INTEGER",
    "LITERAL_FLOAT",
    "LITERAL_CHAR",
    "LITERAL_STRING",
    "WHITESPACES",
    "InputCharacter",
    "NewLineCharacter",
    "ExponentPart",
    "CommonCharacter",
    "SimpleEscapeSequence",
    "HexEscapeSequence",
    "NewLine",
    "Whitespace",
    "UnicodeClassZS",
    "IdentifierStartingUCorLC",
    "IdentifierStartingLC",
    "IdentifierStartingUC",
    "IdentifierPartCharacter",
    "LetterCharacter",
    "DecimalDigitCharacter",
    "ConnectingCharacter",
    "FormattingCharacter",
    "UnicodeEscapeSequence",
    "HexDigit",
    "UnicodeClassLU",
    "UnicodeClassLL",
    "UnicodeClassND",
    "NEWLINE",
    "WS"
  ];
  constructor(input) {
    super(input);
    this._interp = new Ln.atn.LexerATNSimulator(this, atn, decisionsToDFA, new Ln.atn.PredictionContextCache());
  }
};
ElanLexer.EOF = Ln.Token.EOF;
ElanLexer.T__0 = 1;
ElanLexer.NL = 2;
ElanLexer.SINGLE_LINE_COMMENT = 3;
ElanLexer.COMMENT_MARKER = 4;
ElanLexer.ABSTRACT = 5;
ElanLexer.AND = 6;
ElanLexer.AS = 7;
ElanLexer.ASSERT = 8;
ElanLexer.CALL = 9;
ElanLexer.CASE = 10;
ElanLexer.CATCH = 11;
ElanLexer.CLASS = 12;
ElanLexer.CONSTANT = 13;
ElanLexer.CONSTRUCTOR = 14;
ElanLexer.CURRY = 15;
ElanLexer.DEFAULT = 16;
ElanLexer.DIV = 17;
ElanLexer.EACH = 18;
ElanLexer.ELSE = 19;
ElanLexer.END = 20;
ElanLexer.ENUM = 21;
ElanLexer.FOR = 22;
ElanLexer.FROM = 23;
ElanLexer.FUNCTION = 24;
ElanLexer.GLOBAL = 25;
ElanLexer.IF = 26;
ElanLexer.IMMUTABLE = 27;
ElanLexer.IMPORT = 28;
ElanLexer.IN = 29;
ElanLexer.INHERITS = 30;
ElanLexer.INPUT = 31;
ElanLexer.LAMBDA = 32;
ElanLexer.LET = 33;
ElanLexer.LIBRARY = 34;
ElanLexer.MAIN = 35;
ElanLexer.MOD = 36;
ElanLexer.NEW = 37;
ElanLexer.NOT = 38;
ElanLexer.OF = 39;
ElanLexer.IS = 40;
ElanLexer.OR = 41;
ElanLexer.OUT = 42;
ElanLexer.PACKAGE = 43;
ElanLexer.PARTIAL = 44;
ElanLexer.PRINT = 45;
ElanLexer.PRIVATE = 46;
ElanLexer.PROCEDURE = 47;
ElanLexer.PROPERTY = 48;
ElanLexer.REPEAT = 49;
ElanLexer.RETURN = 50;
ElanLexer.SET = 51;
ElanLexer.STEP = 52;
ElanLexer.SWITCH = 53;
ElanLexer.SYSTEM = 54;
ElanLexer.TEST = 55;
ElanLexer.THIS = 56;
ElanLexer.THROW = 57;
ElanLexer.TO = 58;
ElanLexer.TRY = 59;
ElanLexer.VAR = 60;
ElanLexer.WHEN = 61;
ElanLexer.WHILE = 62;
ElanLexer.WITH = 63;
ElanLexer.XOR = 64;
ElanLexer.BOOL_VALUE = 65;
ElanLexer.VALUE_TYPE = 66;
ElanLexer.ARRAY = 67;
ElanLexer.LIST = 68;
ElanLexer.DICTIONARY = 69;
ElanLexer.ITERABLE = 70;
ElanLexer.EQUALS = 71;
ElanLexer.ARROW = 72;
ElanLexer.OPEN_BRACE = 73;
ElanLexer.CLOSE_BRACE = 74;
ElanLexer.OPEN_SQ_BRACKET = 75;
ElanLexer.CLOSE_SQ_BRACKET = 76;
ElanLexer.OPEN_BRACKET = 77;
ElanLexer.CLOSE_BRACKET = 78;
ElanLexer.DOUBLE_DOT = 79;
ElanLexer.DOT = 80;
ElanLexer.COMMA = 81;
ElanLexer.COLON = 82;
ElanLexer.PLUS = 83;
ElanLexer.MINUS = 84;
ElanLexer.MULT = 85;
ElanLexer.DIVIDE = 86;
ElanLexer.POWER = 87;
ElanLexer.LT = 88;
ElanLexer.GT = 89;
ElanLexer.LE = 90;
ElanLexer.GE = 91;
ElanLexer.IS_NOT = 92;
ElanLexer.TYPENAME = 93;
ElanLexer.IDENTIFIER = 94;
ElanLexer.LITERAL_INTEGER = 95;
ElanLexer.LITERAL_FLOAT = 96;
ElanLexer.LITERAL_CHAR = 97;
ElanLexer.LITERAL_STRING = 98;
ElanLexer.WHITESPACES = 99;
ElanLexer.NEWLINE = 100;
ElanLexer.WS = 101;

// src/generatedElan/ElanListener.js
var ElanListener = class extends Ln.tree.ParseTreeListener {
  // Enter a parse tree produced by ElanParser#file.
  enterFile(ctx) {
  }
  // Exit a parse tree produced by ElanParser#file.
  exitFile(ctx) {
  }
  // Enter a parse tree produced by ElanParser#importStatement.
  enterImportStatement(ctx) {
  }
  // Exit a parse tree produced by ElanParser#importStatement.
  exitImportStatement(ctx) {
  }
  // Enter a parse tree produced by ElanParser#namespace.
  enterNamespace(ctx) {
  }
  // Exit a parse tree produced by ElanParser#namespace.
  exitNamespace(ctx) {
  }
  // Enter a parse tree produced by ElanParser#main.
  enterMain(ctx) {
  }
  // Exit a parse tree produced by ElanParser#main.
  exitMain(ctx) {
  }
  // Enter a parse tree produced by ElanParser#test.
  enterTest(ctx) {
  }
  // Exit a parse tree produced by ElanParser#test.
  exitTest(ctx) {
  }
  // Enter a parse tree produced by ElanParser#statementBlock.
  enterStatementBlock(ctx) {
  }
  // Exit a parse tree produced by ElanParser#statementBlock.
  exitStatementBlock(ctx) {
  }
  // Enter a parse tree produced by ElanParser#testStatements.
  enterTestStatements(ctx) {
  }
  // Exit a parse tree produced by ElanParser#testStatements.
  exitTestStatements(ctx) {
  }
  // Enter a parse tree produced by ElanParser#assert.
  enterAssert(ctx) {
  }
  // Exit a parse tree produced by ElanParser#assert.
  exitAssert(ctx) {
  }
  // Enter a parse tree produced by ElanParser#callStatement.
  enterCallStatement(ctx) {
  }
  // Exit a parse tree produced by ElanParser#callStatement.
  exitCallStatement(ctx) {
  }
  // Enter a parse tree produced by ElanParser#throwException.
  enterThrowException(ctx) {
  }
  // Exit a parse tree produced by ElanParser#throwException.
  exitThrowException(ctx) {
  }
  // Enter a parse tree produced by ElanParser#printStatement.
  enterPrintStatement(ctx) {
  }
  // Exit a parse tree produced by ElanParser#printStatement.
  exitPrintStatement(ctx) {
  }
  // Enter a parse tree produced by ElanParser#varDef.
  enterVarDef(ctx) {
  }
  // Exit a parse tree produced by ElanParser#varDef.
  exitVarDef(ctx) {
  }
  // Enter a parse tree produced by ElanParser#assignment.
  enterAssignment(ctx) {
  }
  // Exit a parse tree produced by ElanParser#assignment.
  exitAssignment(ctx) {
  }
  // Enter a parse tree produced by ElanParser#inlineAsignment.
  enterInlineAsignment(ctx) {
  }
  // Exit a parse tree produced by ElanParser#inlineAsignment.
  exitInlineAsignment(ctx) {
  }
  // Enter a parse tree produced by ElanParser#assignableValue.
  enterAssignableValue(ctx) {
  }
  // Exit a parse tree produced by ElanParser#assignableValue.
  exitAssignableValue(ctx) {
  }
  // Enter a parse tree produced by ElanParser#procedureCall.
  enterProcedureCall(ctx) {
  }
  // Exit a parse tree produced by ElanParser#procedureCall.
  exitProcedureCall(ctx) {
  }
  // Enter a parse tree produced by ElanParser#functionCall.
  enterFunctionCall(ctx) {
  }
  // Exit a parse tree produced by ElanParser#functionCall.
  exitFunctionCall(ctx) {
  }
  // Enter a parse tree produced by ElanParser#systemCall.
  enterSystemCall(ctx) {
  }
  // Exit a parse tree produced by ElanParser#systemCall.
  exitSystemCall(ctx) {
  }
  // Enter a parse tree produced by ElanParser#input.
  enterInput(ctx) {
  }
  // Exit a parse tree produced by ElanParser#input.
  exitInput(ctx) {
  }
  // Enter a parse tree produced by ElanParser#argument.
  enterArgument(ctx) {
  }
  // Exit a parse tree produced by ElanParser#argument.
  exitArgument(ctx) {
  }
  // Enter a parse tree produced by ElanParser#argumentList.
  enterArgumentList(ctx) {
  }
  // Exit a parse tree produced by ElanParser#argumentList.
  exitArgumentList(ctx) {
  }
  // Enter a parse tree produced by ElanParser#procedureDef.
  enterProcedureDef(ctx) {
  }
  // Exit a parse tree produced by ElanParser#procedureDef.
  exitProcedureDef(ctx) {
  }
  // Enter a parse tree produced by ElanParser#procedureSignature.
  enterProcedureSignature(ctx) {
  }
  // Exit a parse tree produced by ElanParser#procedureSignature.
  exitProcedureSignature(ctx) {
  }
  // Enter a parse tree produced by ElanParser#procedureParameterList.
  enterProcedureParameterList(ctx) {
  }
  // Exit a parse tree produced by ElanParser#procedureParameterList.
  exitProcedureParameterList(ctx) {
  }
  // Enter a parse tree produced by ElanParser#parameterList.
  enterParameterList(ctx) {
  }
  // Exit a parse tree produced by ElanParser#parameterList.
  exitParameterList(ctx) {
  }
  // Enter a parse tree produced by ElanParser#parameter.
  enterParameter(ctx) {
  }
  // Exit a parse tree produced by ElanParser#parameter.
  exitParameter(ctx) {
  }
  // Enter a parse tree produced by ElanParser#procedureParameter.
  enterProcedureParameter(ctx) {
  }
  // Exit a parse tree produced by ElanParser#procedureParameter.
  exitProcedureParameter(ctx) {
  }
  // Enter a parse tree produced by ElanParser#functionDef.
  enterFunctionDef(ctx) {
  }
  // Exit a parse tree produced by ElanParser#functionDef.
  exitFunctionDef(ctx) {
  }
  // Enter a parse tree produced by ElanParser#functionSignature.
  enterFunctionSignature(ctx) {
  }
  // Exit a parse tree produced by ElanParser#functionSignature.
  exitFunctionSignature(ctx) {
  }
  // Enter a parse tree produced by ElanParser#constantDef.
  enterConstantDef(ctx) {
  }
  // Exit a parse tree produced by ElanParser#constantDef.
  exitConstantDef(ctx) {
  }
  // Enter a parse tree produced by ElanParser#enumDef.
  enterEnumDef(ctx) {
  }
  // Exit a parse tree produced by ElanParser#enumDef.
  exitEnumDef(ctx) {
  }
  // Enter a parse tree produced by ElanParser#enumType.
  enterEnumType(ctx) {
  }
  // Exit a parse tree produced by ElanParser#enumType.
  exitEnumType(ctx) {
  }
  // Enter a parse tree produced by ElanParser#enumValue.
  enterEnumValue(ctx) {
  }
  // Exit a parse tree produced by ElanParser#enumValue.
  exitEnumValue(ctx) {
  }
  // Enter a parse tree produced by ElanParser#classDef.
  enterClassDef(ctx) {
  }
  // Exit a parse tree produced by ElanParser#classDef.
  exitClassDef(ctx) {
  }
  // Enter a parse tree produced by ElanParser#mutableClass.
  enterMutableClass(ctx) {
  }
  // Exit a parse tree produced by ElanParser#mutableClass.
  exitMutableClass(ctx) {
  }
  // Enter a parse tree produced by ElanParser#abstractClass.
  enterAbstractClass(ctx) {
  }
  // Exit a parse tree produced by ElanParser#abstractClass.
  exitAbstractClass(ctx) {
  }
  // Enter a parse tree produced by ElanParser#immutableClass.
  enterImmutableClass(ctx) {
  }
  // Exit a parse tree produced by ElanParser#immutableClass.
  exitImmutableClass(ctx) {
  }
  // Enter a parse tree produced by ElanParser#abstractImmutableClass.
  enterAbstractImmutableClass(ctx) {
  }
  // Exit a parse tree produced by ElanParser#abstractImmutableClass.
  exitAbstractImmutableClass(ctx) {
  }
  // Enter a parse tree produced by ElanParser#inherits.
  enterInherits(ctx) {
  }
  // Exit a parse tree produced by ElanParser#inherits.
  exitInherits(ctx) {
  }
  // Enter a parse tree produced by ElanParser#property.
  enterProperty(ctx) {
  }
  // Exit a parse tree produced by ElanParser#property.
  exitProperty(ctx) {
  }
  // Enter a parse tree produced by ElanParser#econstructor.
  enterEconstructor(ctx) {
  }
  // Exit a parse tree produced by ElanParser#econstructor.
  exitEconstructor(ctx) {
  }
  // Enter a parse tree produced by ElanParser#newInstance.
  enterNewInstance(ctx) {
  }
  // Exit a parse tree produced by ElanParser#newInstance.
  exitNewInstance(ctx) {
  }
  // Enter a parse tree produced by ElanParser#withClause.
  enterWithClause(ctx) {
  }
  // Exit a parse tree produced by ElanParser#withClause.
  exitWithClause(ctx) {
  }
  // Enter a parse tree produced by ElanParser#proceduralControlFlow.
  enterProceduralControlFlow(ctx) {
  }
  // Exit a parse tree produced by ElanParser#proceduralControlFlow.
  exitProceduralControlFlow(ctx) {
  }
  // Enter a parse tree produced by ElanParser#if.
  enterIf(ctx) {
  }
  // Exit a parse tree produced by ElanParser#if.
  exitIf(ctx) {
  }
  // Enter a parse tree produced by ElanParser#for.
  enterFor(ctx) {
  }
  // Exit a parse tree produced by ElanParser#for.
  exitFor(ctx) {
  }
  // Enter a parse tree produced by ElanParser#each.
  enterEach(ctx) {
  }
  // Exit a parse tree produced by ElanParser#each.
  exitEach(ctx) {
  }
  // Enter a parse tree produced by ElanParser#while.
  enterWhile(ctx) {
  }
  // Exit a parse tree produced by ElanParser#while.
  exitWhile(ctx) {
  }
  // Enter a parse tree produced by ElanParser#repeat.
  enterRepeat(ctx) {
  }
  // Exit a parse tree produced by ElanParser#repeat.
  exitRepeat(ctx) {
  }
  // Enter a parse tree produced by ElanParser#try.
  enterTry(ctx) {
  }
  // Exit a parse tree produced by ElanParser#try.
  exitTry(ctx) {
  }
  // Enter a parse tree produced by ElanParser#switch.
  enterSwitch(ctx) {
  }
  // Exit a parse tree produced by ElanParser#switch.
  exitSwitch(ctx) {
  }
  // Enter a parse tree produced by ElanParser#case.
  enterCase(ctx) {
  }
  // Exit a parse tree produced by ElanParser#case.
  exitCase(ctx) {
  }
  // Enter a parse tree produced by ElanParser#caseDefault.
  enterCaseDefault(ctx) {
  }
  // Exit a parse tree produced by ElanParser#caseDefault.
  exitCaseDefault(ctx) {
  }
  // Enter a parse tree produced by ElanParser#expression.
  enterExpression(ctx) {
  }
  // Exit a parse tree produced by ElanParser#expression.
  exitExpression(ctx) {
  }
  // Enter a parse tree produced by ElanParser#bracketedExpression.
  enterBracketedExpression(ctx) {
  }
  // Exit a parse tree produced by ElanParser#bracketedExpression.
  exitBracketedExpression(ctx) {
  }
  // Enter a parse tree produced by ElanParser#ifExpression.
  enterIfExpression(ctx) {
  }
  // Exit a parse tree produced by ElanParser#ifExpression.
  exitIfExpression(ctx) {
  }
  // Enter a parse tree produced by ElanParser#elseExpression.
  enterElseExpression(ctx) {
  }
  // Exit a parse tree produced by ElanParser#elseExpression.
  exitElseExpression(ctx) {
  }
  // Enter a parse tree produced by ElanParser#lambda.
  enterLambda(ctx) {
  }
  // Exit a parse tree produced by ElanParser#lambda.
  exitLambda(ctx) {
  }
  // Enter a parse tree produced by ElanParser#index.
  enterIndex(ctx) {
  }
  // Exit a parse tree produced by ElanParser#index.
  exitIndex(ctx) {
  }
  // Enter a parse tree produced by ElanParser#range.
  enterRange(ctx) {
  }
  // Exit a parse tree produced by ElanParser#range.
  exitRange(ctx) {
  }
  // Enter a parse tree produced by ElanParser#value.
  enterValue(ctx) {
  }
  // Exit a parse tree produced by ElanParser#value.
  exitValue(ctx) {
  }
  // Enter a parse tree produced by ElanParser#scopeQualifier.
  enterScopeQualifier(ctx) {
  }
  // Exit a parse tree produced by ElanParser#scopeQualifier.
  exitScopeQualifier(ctx) {
  }
  // Enter a parse tree produced by ElanParser#literal.
  enterLiteral(ctx) {
  }
  // Exit a parse tree produced by ElanParser#literal.
  exitLiteral(ctx) {
  }
  // Enter a parse tree produced by ElanParser#literalValue.
  enterLiteralValue(ctx) {
  }
  // Exit a parse tree produced by ElanParser#literalValue.
  exitLiteralValue(ctx) {
  }
  // Enter a parse tree produced by ElanParser#dataStructureDefinition.
  enterDataStructureDefinition(ctx) {
  }
  // Exit a parse tree produced by ElanParser#dataStructureDefinition.
  exitDataStructureDefinition(ctx) {
  }
  // Enter a parse tree produced by ElanParser#literalDataStructure.
  enterLiteralDataStructure(ctx) {
  }
  // Exit a parse tree produced by ElanParser#literalDataStructure.
  exitLiteralDataStructure(ctx) {
  }
  // Enter a parse tree produced by ElanParser#tupleDefinition.
  enterTupleDefinition(ctx) {
  }
  // Exit a parse tree produced by ElanParser#tupleDefinition.
  exitTupleDefinition(ctx) {
  }
  // Enter a parse tree produced by ElanParser#literalTuple.
  enterLiteralTuple(ctx) {
  }
  // Exit a parse tree produced by ElanParser#literalTuple.
  exitLiteralTuple(ctx) {
  }
  // Enter a parse tree produced by ElanParser#deconstructedTuple.
  enterDeconstructedTuple(ctx) {
  }
  // Exit a parse tree produced by ElanParser#deconstructedTuple.
  exitDeconstructedTuple(ctx) {
  }
  // Enter a parse tree produced by ElanParser#listDefinition.
  enterListDefinition(ctx) {
  }
  // Exit a parse tree produced by ElanParser#listDefinition.
  exitListDefinition(ctx) {
  }
  // Enter a parse tree produced by ElanParser#literalList.
  enterLiteralList(ctx) {
  }
  // Exit a parse tree produced by ElanParser#literalList.
  exitLiteralList(ctx) {
  }
  // Enter a parse tree produced by ElanParser#listDecomp.
  enterListDecomp(ctx) {
  }
  // Exit a parse tree produced by ElanParser#listDecomp.
  exitListDecomp(ctx) {
  }
  // Enter a parse tree produced by ElanParser#arrayDefinition.
  enterArrayDefinition(ctx) {
  }
  // Exit a parse tree produced by ElanParser#arrayDefinition.
  exitArrayDefinition(ctx) {
  }
  // Enter a parse tree produced by ElanParser#dictionaryDefinition.
  enterDictionaryDefinition(ctx) {
  }
  // Exit a parse tree produced by ElanParser#dictionaryDefinition.
  exitDictionaryDefinition(ctx) {
  }
  // Enter a parse tree produced by ElanParser#literalDictionary.
  enterLiteralDictionary(ctx) {
  }
  // Exit a parse tree produced by ElanParser#literalDictionary.
  exitLiteralDictionary(ctx) {
  }
  // Enter a parse tree produced by ElanParser#kvp.
  enterKvp(ctx) {
  }
  // Exit a parse tree produced by ElanParser#kvp.
  exitKvp(ctx) {
  }
  // Enter a parse tree produced by ElanParser#literalKvp.
  enterLiteralKvp(ctx) {
  }
  // Exit a parse tree produced by ElanParser#literalKvp.
  exitLiteralKvp(ctx) {
  }
  // Enter a parse tree produced by ElanParser#unaryOp.
  enterUnaryOp(ctx) {
  }
  // Exit a parse tree produced by ElanParser#unaryOp.
  exitUnaryOp(ctx) {
  }
  // Enter a parse tree produced by ElanParser#binaryOp.
  enterBinaryOp(ctx) {
  }
  // Exit a parse tree produced by ElanParser#binaryOp.
  exitBinaryOp(ctx) {
  }
  // Enter a parse tree produced by ElanParser#arithmeticOp.
  enterArithmeticOp(ctx) {
  }
  // Exit a parse tree produced by ElanParser#arithmeticOp.
  exitArithmeticOp(ctx) {
  }
  // Enter a parse tree produced by ElanParser#logicalOp.
  enterLogicalOp(ctx) {
  }
  // Exit a parse tree produced by ElanParser#logicalOp.
  exitLogicalOp(ctx) {
  }
  // Enter a parse tree produced by ElanParser#conditionalOp.
  enterConditionalOp(ctx) {
  }
  // Exit a parse tree produced by ElanParser#conditionalOp.
  exitConditionalOp(ctx) {
  }
  // Enter a parse tree produced by ElanParser#type.
  enterType(ctx) {
  }
  // Exit a parse tree produced by ElanParser#type.
  exitType(ctx) {
  }
  // Enter a parse tree produced by ElanParser#dataStructureType.
  enterDataStructureType(ctx) {
  }
  // Exit a parse tree produced by ElanParser#dataStructureType.
  exitDataStructureType(ctx) {
  }
  // Enter a parse tree produced by ElanParser#genericSpecifier.
  enterGenericSpecifier(ctx) {
  }
  // Exit a parse tree produced by ElanParser#genericSpecifier.
  exitGenericSpecifier(ctx) {
  }
  // Enter a parse tree produced by ElanParser#tupleType.
  enterTupleType(ctx) {
  }
  // Exit a parse tree produced by ElanParser#tupleType.
  exitTupleType(ctx) {
  }
  // Enter a parse tree produced by ElanParser#typeList.
  enterTypeList(ctx) {
  }
  // Exit a parse tree produced by ElanParser#typeList.
  exitTypeList(ctx) {
  }
  // Enter a parse tree produced by ElanParser#funcType.
  enterFuncType(ctx) {
  }
  // Exit a parse tree produced by ElanParser#funcType.
  exitFuncType(ctx) {
  }
};

// src/generatedElan/ElanParser.js
var serializedATN2 = [
  4,
  1,
  101,
  984,
  2,
  0,
  7,
  0,
  2,
  1,
  7,
  1,
  2,
  2,
  7,
  2,
  2,
  3,
  7,
  3,
  2,
  4,
  7,
  4,
  2,
  5,
  7,
  5,
  2,
  6,
  7,
  6,
  2,
  7,
  7,
  7,
  2,
  8,
  7,
  8,
  2,
  9,
  7,
  9,
  2,
  10,
  7,
  10,
  2,
  11,
  7,
  11,
  2,
  12,
  7,
  12,
  2,
  13,
  7,
  13,
  2,
  14,
  7,
  14,
  2,
  15,
  7,
  15,
  2,
  16,
  7,
  16,
  2,
  17,
  7,
  17,
  2,
  18,
  7,
  18,
  2,
  19,
  7,
  19,
  2,
  20,
  7,
  20,
  2,
  21,
  7,
  21,
  2,
  22,
  7,
  22,
  2,
  23,
  7,
  23,
  2,
  24,
  7,
  24,
  2,
  25,
  7,
  25,
  2,
  26,
  7,
  26,
  2,
  27,
  7,
  27,
  2,
  28,
  7,
  28,
  2,
  29,
  7,
  29,
  2,
  30,
  7,
  30,
  2,
  31,
  7,
  31,
  2,
  32,
  7,
  32,
  2,
  33,
  7,
  33,
  2,
  34,
  7,
  34,
  2,
  35,
  7,
  35,
  2,
  36,
  7,
  36,
  2,
  37,
  7,
  37,
  2,
  38,
  7,
  38,
  2,
  39,
  7,
  39,
  2,
  40,
  7,
  40,
  2,
  41,
  7,
  41,
  2,
  42,
  7,
  42,
  2,
  43,
  7,
  43,
  2,
  44,
  7,
  44,
  2,
  45,
  7,
  45,
  2,
  46,
  7,
  46,
  2,
  47,
  7,
  47,
  2,
  48,
  7,
  48,
  2,
  49,
  7,
  49,
  2,
  50,
  7,
  50,
  2,
  51,
  7,
  51,
  2,
  52,
  7,
  52,
  2,
  53,
  7,
  53,
  2,
  54,
  7,
  54,
  2,
  55,
  7,
  55,
  2,
  56,
  7,
  56,
  2,
  57,
  7,
  57,
  2,
  58,
  7,
  58,
  2,
  59,
  7,
  59,
  2,
  60,
  7,
  60,
  2,
  61,
  7,
  61,
  2,
  62,
  7,
  62,
  2,
  63,
  7,
  63,
  2,
  64,
  7,
  64,
  2,
  65,
  7,
  65,
  2,
  66,
  7,
  66,
  2,
  67,
  7,
  67,
  2,
  68,
  7,
  68,
  2,
  69,
  7,
  69,
  2,
  70,
  7,
  70,
  2,
  71,
  7,
  71,
  2,
  72,
  7,
  72,
  2,
  73,
  7,
  73,
  2,
  74,
  7,
  74,
  2,
  75,
  7,
  75,
  2,
  76,
  7,
  76,
  2,
  77,
  7,
  77,
  2,
  78,
  7,
  78,
  2,
  79,
  7,
  79,
  2,
  80,
  7,
  80,
  2,
  81,
  7,
  81,
  2,
  82,
  7,
  82,
  2,
  83,
  7,
  83,
  2,
  84,
  7,
  84,
  2,
  85,
  7,
  85,
  2,
  86,
  7,
  86,
  2,
  87,
  7,
  87,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  5,
  0,
  185,
  8,
  0,
  10,
  0,
  12,
  0,
  188,
  9,
  0,
  1,
  0,
  5,
  0,
  191,
  8,
  0,
  10,
  0,
  12,
  0,
  194,
  9,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  1,
  2,
  1,
  2,
  5,
  2,
  204,
  8,
  2,
  10,
  2,
  12,
  2,
  207,
  9,
  2,
  1,
  3,
  1,
  3,
  1,
  3,
  1,
  3,
  1,
  3,
  1,
  3,
  1,
  3,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  5,
  5,
  230,
  8,
  5,
  10,
  5,
  12,
  5,
  233,
  9,
  5,
  1,
  6,
  1,
  6,
  1,
  6,
  5,
  6,
  238,
  8,
  6,
  10,
  6,
  12,
  6,
  241,
  9,
  6,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  7,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  1,
  8,
  3,
  8,
  256,
  8,
  8,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  9,
  1,
  10,
  1,
  10,
  1,
  10,
  3,
  10,
  265,
  8,
  10,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  1,
  14,
  3,
  14,
  286,
  8,
  14,
  1,
  14,
  1,
  14,
  3,
  14,
  290,
  8,
  14,
  1,
  14,
  1,
  14,
  3,
  14,
  294,
  8,
  14,
  1,
  15,
  3,
  15,
  297,
  8,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  3,
  15,
  302,
  8,
  15,
  1,
  15,
  1,
  15,
  1,
  16,
  3,
  16,
  307,
  8,
  16,
  1,
  16,
  1,
  16,
  1,
  16,
  3,
  16,
  312,
  8,
  16,
  1,
  16,
  1,
  16,
  1,
  17,
  1,
  17,
  1,
  17,
  1,
  17,
  1,
  17,
  3,
  17,
  321,
  8,
  17,
  1,
  17,
  1,
  17,
  1,
  18,
  1,
  18,
  3,
  18,
  327,
  8,
  18,
  1,
  19,
  1,
  19,
  3,
  19,
  331,
  8,
  19,
  1,
  20,
  1,
  20,
  1,
  20,
  5,
  20,
  336,
  8,
  20,
  10,
  20,
  12,
  20,
  339,
  9,
  20,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  21,
  1,
  22,
  1,
  22,
  1,
  22,
  3,
  22,
  352,
  8,
  22,
  1,
  22,
  1,
  22,
  1,
  23,
  1,
  23,
  1,
  23,
  5,
  23,
  359,
  8,
  23,
  10,
  23,
  12,
  23,
  362,
  9,
  23,
  1,
  24,
  1,
  24,
  1,
  24,
  5,
  24,
  367,
  8,
  24,
  10,
  24,
  12,
  24,
  370,
  9,
  24,
  1,
  25,
  1,
  25,
  1,
  25,
  1,
  26,
  3,
  26,
  376,
  8,
  26,
  1,
  26,
  1,
  26,
  1,
  26,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  3,
  27,
  389,
  8,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  27,
  1,
  28,
  1,
  28,
  1,
  28,
  3,
  28,
  398,
  8,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  1,
  29,
  3,
  29,
  411,
  8,
  29,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  5,
  30,
  420,
  8,
  30,
  10,
  30,
  12,
  30,
  423,
  9,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  30,
  1,
  31,
  1,
  31,
  1,
  32,
  1,
  32,
  1,
  32,
  1,
  32,
  1,
  33,
  1,
  33,
  1,
  33,
  1,
  33,
  3,
  33,
  439,
  8,
  33,
  1,
  34,
  1,
  34,
  1,
  34,
  1,
  34,
  3,
  34,
  445,
  8,
  34,
  1,
  34,
  1,
  34,
  1,
  34,
  1,
  34,
  1,
  34,
  5,
  34,
  452,
  8,
  34,
  10,
  34,
  12,
  34,
  455,
  9,
  34,
  1,
  34,
  1,
  34,
  1,
  34,
  1,
  34,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  3,
  35,
  466,
  8,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  5,
  35,
  479,
  8,
  35,
  10,
  35,
  12,
  35,
  482,
  9,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  35,
  1,
  36,
  1,
  36,
  1,
  36,
  1,
  36,
  1,
  36,
  3,
  36,
  493,
  8,
  36,
  1,
  36,
  1,
  36,
  1,
  36,
  1,
  36,
  5,
  36,
  499,
  8,
  36,
  10,
  36,
  12,
  36,
  502,
  9,
  36,
  1,
  36,
  1,
  36,
  1,
  36,
  1,
  36,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  3,
  37,
  514,
  8,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  5,
  37,
  523,
  8,
  37,
  10,
  37,
  12,
  37,
  526,
  9,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  37,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  38,
  5,
  38,
  536,
  8,
  38,
  10,
  38,
  12,
  38,
  539,
  9,
  38,
  1,
  39,
  3,
  39,
  542,
  8,
  39,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  39,
  1,
  40,
  1,
  40,
  1,
  40,
  1,
  40,
  3,
  40,
  552,
  8,
  40,
  1,
  40,
  1,
  40,
  1,
  40,
  1,
  40,
  1,
  40,
  1,
  40,
  1,
  41,
  1,
  41,
  1,
  41,
  1,
  41,
  3,
  41,
  564,
  8,
  41,
  1,
  41,
  1,
  41,
  3,
  41,
  568,
  8,
  41,
  1,
  41,
  1,
  41,
  3,
  41,
  572,
  8,
  41,
  1,
  42,
  1,
  42,
  1,
  42,
  1,
  42,
  1,
  42,
  5,
  42,
  579,
  8,
  42,
  10,
  42,
  12,
  42,
  582,
  9,
  42,
  1,
  42,
  1,
  42,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  43,
  1,
  43,
  3,
  43,
  593,
  8,
  43,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  5,
  44,
  605,
  8,
  44,
  10,
  44,
  12,
  44,
  608,
  9,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  3,
  44,
  613,
  8,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  3,
  45,
  628,
  8,
  45,
  1,
  45,
  3,
  45,
  631,
  8,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  45,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  46,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  47,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  48,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  49,
  1,
  50,
  1,
  50,
  1,
  50,
  1,
  50,
  4,
  50,
  680,
  8,
  50,
  11,
  50,
  12,
  50,
  681,
  1,
  50,
  1,
  50,
  1,
  50,
  1,
  50,
  1,
  50,
  1,
  51,
  1,
  51,
  1,
  51,
  3,
  51,
  692,
  8,
  51,
  1,
  51,
  1,
  51,
  1,
  51,
  1,
  52,
  1,
  52,
  1,
  52,
  1,
  52,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  3,
  53,
  711,
  8,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  1,
  53,
  5,
  53,
  734,
  8,
  53,
  10,
  53,
  12,
  53,
  737,
  9,
  53,
  1,
  54,
  1,
  54,
  1,
  54,
  1,
  54,
  1,
  55,
  1,
  55,
  1,
  55,
  1,
  56,
  1,
  56,
  1,
  56,
  1,
  57,
  1,
  57,
  1,
  57,
  1,
  57,
  1,
  57,
  1,
  58,
  1,
  58,
  1,
  58,
  1,
  58,
  1,
  58,
  1,
  58,
  1,
  58,
  3,
  58,
  761,
  8,
  58,
  1,
  58,
  1,
  58,
  1,
  59,
  1,
  59,
  1,
  59,
  1,
  59,
  1,
  59,
  1,
  59,
  1,
  59,
  1,
  59,
  1,
  59,
  3,
  59,
  774,
  8,
  59,
  1,
  60,
  1,
  60,
  3,
  60,
  778,
  8,
  60,
  1,
  60,
  1,
  60,
  1,
  60,
  1,
  60,
  1,
  60,
  3,
  60,
  785,
  8,
  60,
  1,
  61,
  1,
  61,
  1,
  61,
  1,
  61,
  1,
  61,
  1,
  61,
  3,
  61,
  793,
  8,
  61,
  1,
  61,
  1,
  61,
  1,
  62,
  1,
  62,
  3,
  62,
  799,
  8,
  62,
  1,
  63,
  1,
  63,
  1,
  63,
  1,
  63,
  1,
  63,
  3,
  63,
  806,
  8,
  63,
  1,
  64,
  1,
  64,
  1,
  64,
  1,
  64,
  3,
  64,
  812,
  8,
  64,
  1,
  65,
  1,
  65,
  1,
  65,
  1,
  65,
  3,
  65,
  818,
  8,
  65,
  1,
  66,
  1,
  66,
  1,
  66,
  1,
  66,
  1,
  66,
  1,
  66,
  5,
  66,
  826,
  8,
  66,
  10,
  66,
  12,
  66,
  829,
  9,
  66,
  1,
  66,
  1,
  66,
  1,
  67,
  1,
  67,
  1,
  67,
  1,
  67,
  1,
  67,
  1,
  67,
  5,
  67,
  839,
  8,
  67,
  10,
  67,
  12,
  67,
  842,
  9,
  67,
  1,
  67,
  1,
  67,
  1,
  68,
  1,
  68,
  1,
  68,
  1,
  68,
  4,
  68,
  850,
  8,
  68,
  11,
  68,
  12,
  68,
  851,
  1,
  68,
  1,
  68,
  1,
  69,
  1,
  69,
  1,
  69,
  1,
  69,
  5,
  69,
  860,
  8,
  69,
  10,
  69,
  12,
  69,
  863,
  9,
  69,
  1,
  69,
  1,
  69,
  1,
  70,
  1,
  70,
  1,
  70,
  1,
  70,
  5,
  70,
  871,
  8,
  70,
  10,
  70,
  12,
  70,
  874,
  9,
  70,
  1,
  70,
  1,
  70,
  1,
  71,
  1,
  71,
  1,
  71,
  1,
  71,
  1,
  71,
  1,
  71,
  1,
  72,
  1,
  72,
  1,
  72,
  1,
  72,
  3,
  72,
  888,
  8,
  72,
  1,
  72,
  1,
  72,
  1,
  73,
  1,
  73,
  1,
  73,
  1,
  73,
  5,
  73,
  896,
  8,
  73,
  10,
  73,
  12,
  73,
  899,
  9,
  73,
  1,
  73,
  1,
  73,
  1,
  74,
  1,
  74,
  1,
  74,
  1,
  74,
  5,
  74,
  907,
  8,
  74,
  10,
  74,
  12,
  74,
  910,
  9,
  74,
  1,
  74,
  1,
  74,
  1,
  75,
  1,
  75,
  1,
  75,
  1,
  75,
  1,
  76,
  1,
  76,
  1,
  76,
  1,
  76,
  1,
  77,
  1,
  77,
  1,
  78,
  1,
  78,
  1,
  78,
  3,
  78,
  927,
  8,
  78,
  1,
  79,
  1,
  79,
  1,
  80,
  1,
  80,
  1,
  81,
  1,
  81,
  1,
  82,
  1,
  82,
  1,
  82,
  1,
  82,
  1,
  82,
  1,
  82,
  3,
  82,
  941,
  8,
  82,
  1,
  83,
  1,
  83,
  1,
  83,
  1,
  84,
  1,
  84,
  1,
  84,
  1,
  84,
  1,
  84,
  5,
  84,
  951,
  8,
  84,
  10,
  84,
  12,
  84,
  954,
  9,
  84,
  1,
  84,
  1,
  84,
  1,
  85,
  1,
  85,
  1,
  85,
  1,
  85,
  4,
  85,
  962,
  8,
  85,
  11,
  85,
  12,
  85,
  963,
  1,
  85,
  1,
  85,
  1,
  86,
  1,
  86,
  1,
  86,
  5,
  86,
  971,
  8,
  86,
  10,
  86,
  12,
  86,
  974,
  9,
  86,
  1,
  87,
  1,
  87,
  1,
  87,
  1,
  87,
  1,
  87,
  1,
  87,
  1,
  87,
  1,
  87,
  1,
  87,
  0,
  1,
  106,
  88,
  0,
  2,
  4,
  6,
  8,
  10,
  12,
  14,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  30,
  32,
  34,
  36,
  38,
  40,
  42,
  44,
  46,
  48,
  50,
  52,
  54,
  56,
  58,
  60,
  62,
  64,
  66,
  68,
  70,
  72,
  74,
  76,
  78,
  80,
  82,
  84,
  86,
  88,
  90,
  92,
  94,
  96,
  98,
  100,
  102,
  104,
  106,
  108,
  110,
  112,
  114,
  116,
  118,
  120,
  122,
  124,
  126,
  128,
  130,
  132,
  134,
  136,
  138,
  140,
  142,
  144,
  146,
  148,
  150,
  152,
  154,
  156,
  158,
  160,
  162,
  164,
  166,
  168,
  170,
  172,
  174,
  0,
  7,
  1,
  0,
  93,
  94,
  2,
  0,
  94,
  94,
  98,
  98,
  2,
  0,
  38,
  38,
  84,
  84,
  3,
  0,
  17,
  17,
  36,
  36,
  83,
  87,
  3,
  0,
  6,
  6,
  41,
  41,
  64,
  64,
  2,
  0,
  40,
  40,
  88,
  92,
  1,
  0,
  67,
  70,
  1025,
  0,
  186,
  1,
  0,
  0,
  0,
  2,
  197,
  1,
  0,
  0,
  0,
  4,
  200,
  1,
  0,
  0,
  0,
  6,
  208,
  1,
  0,
  0,
  0,
  8,
  215,
  1,
  0,
  0,
  0,
  10,
  231,
  1,
  0,
  0,
  0,
  12,
  239,
  1,
  0,
  0,
  0,
  14,
  242,
  1,
  0,
  0,
  0,
  16,
  248,
  1,
  0,
  0,
  0,
  18,
  257,
  1,
  0,
  0,
  0,
  20,
  261,
  1,
  0,
  0,
  0,
  22,
  266,
  1,
  0,
  0,
  0,
  24,
  273,
  1,
  0,
  0,
  0,
  26,
  279,
  1,
  0,
  0,
  0,
  28,
  293,
  1,
  0,
  0,
  0,
  30,
  296,
  1,
  0,
  0,
  0,
  32,
  306,
  1,
  0,
  0,
  0,
  34,
  315,
  1,
  0,
  0,
  0,
  36,
  324,
  1,
  0,
  0,
  0,
  38,
  330,
  1,
  0,
  0,
  0,
  40,
  332,
  1,
  0,
  0,
  0,
  42,
  340,
  1,
  0,
  0,
  0,
  44,
  348,
  1,
  0,
  0,
  0,
  46,
  355,
  1,
  0,
  0,
  0,
  48,
  363,
  1,
  0,
  0,
  0,
  50,
  371,
  1,
  0,
  0,
  0,
  52,
  375,
  1,
  0,
  0,
  0,
  54,
  380,
  1,
  0,
  0,
  0,
  56,
  394,
  1,
  0,
  0,
  0,
  58,
  403,
  1,
  0,
  0,
  0,
  60,
  412,
  1,
  0,
  0,
  0,
  62,
  428,
  1,
  0,
  0,
  0,
  64,
  430,
  1,
  0,
  0,
  0,
  66,
  438,
  1,
  0,
  0,
  0,
  68,
  440,
  1,
  0,
  0,
  0,
  70,
  460,
  1,
  0,
  0,
  0,
  72,
  487,
  1,
  0,
  0,
  0,
  74,
  507,
  1,
  0,
  0,
  0,
  76,
  531,
  1,
  0,
  0,
  0,
  78,
  541,
  1,
  0,
  0,
  0,
  80,
  547,
  1,
  0,
  0,
  0,
  82,
  571,
  1,
  0,
  0,
  0,
  84,
  573,
  1,
  0,
  0,
  0,
  86,
  592,
  1,
  0,
  0,
  0,
  88,
  594,
  1,
  0,
  0,
  0,
  90,
  618,
  1,
  0,
  0,
  0,
  92,
  637,
  1,
  0,
  0,
  0,
  94,
  647,
  1,
  0,
  0,
  0,
  96,
  655,
  1,
  0,
  0,
  0,
  98,
  664,
  1,
  0,
  0,
  0,
  100,
  675,
  1,
  0,
  0,
  0,
  102,
  688,
  1,
  0,
  0,
  0,
  104,
  696,
  1,
  0,
  0,
  0,
  106,
  710,
  1,
  0,
  0,
  0,
  108,
  738,
  1,
  0,
  0,
  0,
  110,
  742,
  1,
  0,
  0,
  0,
  112,
  745,
  1,
  0,
  0,
  0,
  114,
  748,
  1,
  0,
  0,
  0,
  116,
  753,
  1,
  0,
  0,
  0,
  118,
  773,
  1,
  0,
  0,
  0,
  120,
  784,
  1,
  0,
  0,
  0,
  122,
  792,
  1,
  0,
  0,
  0,
  124,
  798,
  1,
  0,
  0,
  0,
  126,
  805,
  1,
  0,
  0,
  0,
  128,
  811,
  1,
  0,
  0,
  0,
  130,
  817,
  1,
  0,
  0,
  0,
  132,
  819,
  1,
  0,
  0,
  0,
  134,
  832,
  1,
  0,
  0,
  0,
  136,
  845,
  1,
  0,
  0,
  0,
  138,
  855,
  1,
  0,
  0,
  0,
  140,
  866,
  1,
  0,
  0,
  0,
  142,
  877,
  1,
  0,
  0,
  0,
  144,
  883,
  1,
  0,
  0,
  0,
  146,
  891,
  1,
  0,
  0,
  0,
  148,
  902,
  1,
  0,
  0,
  0,
  150,
  913,
  1,
  0,
  0,
  0,
  152,
  917,
  1,
  0,
  0,
  0,
  154,
  921,
  1,
  0,
  0,
  0,
  156,
  926,
  1,
  0,
  0,
  0,
  158,
  928,
  1,
  0,
  0,
  0,
  160,
  930,
  1,
  0,
  0,
  0,
  162,
  932,
  1,
  0,
  0,
  0,
  164,
  940,
  1,
  0,
  0,
  0,
  166,
  942,
  1,
  0,
  0,
  0,
  168,
  945,
  1,
  0,
  0,
  0,
  170,
  957,
  1,
  0,
  0,
  0,
  172,
  967,
  1,
  0,
  0,
  0,
  174,
  975,
  1,
  0,
  0,
  0,
  176,
  185,
  3,
  6,
  3,
  0,
  177,
  185,
  3,
  42,
  21,
  0,
  178,
  185,
  3,
  54,
  27,
  0,
  179,
  185,
  3,
  58,
  29,
  0,
  180,
  185,
  3,
  60,
  30,
  0,
  181,
  185,
  3,
  66,
  33,
  0,
  182,
  185,
  3,
  8,
  4,
  0,
  183,
  185,
  3,
  2,
  1,
  0,
  184,
  176,
  1,
  0,
  0,
  0,
  184,
  177,
  1,
  0,
  0,
  0,
  184,
  178,
  1,
  0,
  0,
  0,
  184,
  179,
  1,
  0,
  0,
  0,
  184,
  180,
  1,
  0,
  0,
  0,
  184,
  181,
  1,
  0,
  0,
  0,
  184,
  182,
  1,
  0,
  0,
  0,
  184,
  183,
  1,
  0,
  0,
  0,
  185,
  188,
  1,
  0,
  0,
  0,
  186,
  184,
  1,
  0,
  0,
  0,
  186,
  187,
  1,
  0,
  0,
  0,
  187,
  192,
  1,
  0,
  0,
  0,
  188,
  186,
  1,
  0,
  0,
  0,
  189,
  191,
  5,
  2,
  0,
  0,
  190,
  189,
  1,
  0,
  0,
  0,
  191,
  194,
  1,
  0,
  0,
  0,
  192,
  190,
  1,
  0,
  0,
  0,
  192,
  193,
  1,
  0,
  0,
  0,
  193,
  195,
  1,
  0,
  0,
  0,
  194,
  192,
  1,
  0,
  0,
  0,
  195,
  196,
  5,
  0,
  0,
  1,
  196,
  1,
  1,
  0,
  0,
  0,
  197,
  198,
  5,
  28,
  0,
  0,
  198,
  199,
  3,
  4,
  2,
  0,
  199,
  3,
  1,
  0,
  0,
  0,
  200,
  205,
  7,
  0,
  0,
  0,
  201,
  202,
  5,
  80,
  0,
  0,
  202,
  204,
  7,
  0,
  0,
  0,
  203,
  201,
  1,
  0,
  0,
  0,
  204,
  207,
  1,
  0,
  0,
  0,
  205,
  203,
  1,
  0,
  0,
  0,
  205,
  206,
  1,
  0,
  0,
  0,
  206,
  5,
  1,
  0,
  0,
  0,
  207,
  205,
  1,
  0,
  0,
  0,
  208,
  209,
  5,
  2,
  0,
  0,
  209,
  210,
  5,
  35,
  0,
  0,
  210,
  211,
  3,
  10,
  5,
  0,
  211,
  212,
  5,
  2,
  0,
  0,
  212,
  213,
  5,
  20,
  0,
  0,
  213,
  214,
  5,
  35,
  0,
  0,
  214,
  7,
  1,
  0,
  0,
  0,
  215,
  216,
  5,
  2,
  0,
  0,
  216,
  217,
  5,
  55,
  0,
  0,
  217,
  218,
  5,
  94,
  0,
  0,
  218,
  219,
  3,
  12,
  6,
  0,
  219,
  220,
  5,
  2,
  0,
  0,
  220,
  221,
  5,
  20,
  0,
  0,
  221,
  222,
  5,
  55,
  0,
  0,
  222,
  9,
  1,
  0,
  0,
  0,
  223,
  230,
  3,
  22,
  11,
  0,
  224,
  230,
  3,
  24,
  12,
  0,
  225,
  230,
  3,
  86,
  43,
  0,
  226,
  230,
  3,
  16,
  8,
  0,
  227,
  230,
  3,
  18,
  9,
  0,
  228,
  230,
  3,
  20,
  10,
  0,
  229,
  223,
  1,
  0,
  0,
  0,
  229,
  224,
  1,
  0,
  0,
  0,
  229,
  225,
  1,
  0,
  0,
  0,
  229,
  226,
  1,
  0,
  0,
  0,
  229,
  227,
  1,
  0,
  0,
  0,
  229,
  228,
  1,
  0,
  0,
  0,
  230,
  233,
  1,
  0,
  0,
  0,
  231,
  229,
  1,
  0,
  0,
  0,
  231,
  232,
  1,
  0,
  0,
  0,
  232,
  11,
  1,
  0,
  0,
  0,
  233,
  231,
  1,
  0,
  0,
  0,
  234,
  238,
  3,
  14,
  7,
  0,
  235,
  238,
  3,
  22,
  11,
  0,
  236,
  238,
  3,
  16,
  8,
  0,
  237,
  234,
  1,
  0,
  0,
  0,
  237,
  235,
  1,
  0,
  0,
  0,
  237,
  236,
  1,
  0,
  0,
  0,
  238,
  241,
  1,
  0,
  0,
  0,
  239,
  237,
  1,
  0,
  0,
  0,
  239,
  240,
  1,
  0,
  0,
  0,
  240,
  13,
  1,
  0,
  0,
  0,
  241,
  239,
  1,
  0,
  0,
  0,
  242,
  243,
  5,
  2,
  0,
  0,
  243,
  244,
  5,
  8,
  0,
  0,
  244,
  245,
  3,
  106,
  53,
  0,
  245,
  246,
  5,
  40,
  0,
  0,
  246,
  247,
  3,
  120,
  60,
  0,
  247,
  15,
  1,
  0,
  0,
  0,
  248,
  249,
  5,
  2,
  0,
  0,
  249,
  255,
  5,
  9,
  0,
  0,
  250,
  256,
  3,
  30,
  15,
  0,
  251,
  252,
  3,
  28,
  14,
  0,
  252,
  253,
  5,
  80,
  0,
  0,
  253,
  254,
  3,
  30,
  15,
  0,
  254,
  256,
  1,
  0,
  0,
  0,
  255,
  250,
  1,
  0,
  0,
  0,
  255,
  251,
  1,
  0,
  0,
  0,
  256,
  17,
  1,
  0,
  0,
  0,
  257,
  258,
  5,
  2,
  0,
  0,
  258,
  259,
  5,
  57,
  0,
  0,
  259,
  260,
  7,
  1,
  0,
  0,
  260,
  19,
  1,
  0,
  0,
  0,
  261,
  262,
  5,
  2,
  0,
  0,
  262,
  264,
  5,
  45,
  0,
  0,
  263,
  265,
  3,
  106,
  53,
  0,
  264,
  263,
  1,
  0,
  0,
  0,
  264,
  265,
  1,
  0,
  0,
  0,
  265,
  21,
  1,
  0,
  0,
  0,
  266,
  267,
  5,
  2,
  0,
  0,
  267,
  268,
  5,
  60,
  0,
  0,
  268,
  269,
  3,
  28,
  14,
  0,
  269,
  270,
  5,
  51,
  0,
  0,
  270,
  271,
  5,
  58,
  0,
  0,
  271,
  272,
  3,
  106,
  53,
  0,
  272,
  23,
  1,
  0,
  0,
  0,
  273,
  274,
  5,
  2,
  0,
  0,
  274,
  275,
  5,
  51,
  0,
  0,
  275,
  276,
  3,
  28,
  14,
  0,
  276,
  277,
  5,
  58,
  0,
  0,
  277,
  278,
  3,
  106,
  53,
  0,
  278,
  25,
  1,
  0,
  0,
  0,
  279,
  280,
  3,
  28,
  14,
  0,
  280,
  281,
  5,
  51,
  0,
  0,
  281,
  282,
  5,
  58,
  0,
  0,
  282,
  283,
  3,
  106,
  53,
  0,
  283,
  27,
  1,
  0,
  0,
  0,
  284,
  286,
  3,
  122,
  61,
  0,
  285,
  284,
  1,
  0,
  0,
  0,
  285,
  286,
  1,
  0,
  0,
  0,
  286,
  287,
  1,
  0,
  0,
  0,
  287,
  289,
  5,
  94,
  0,
  0,
  288,
  290,
  3,
  116,
  58,
  0,
  289,
  288,
  1,
  0,
  0,
  0,
  289,
  290,
  1,
  0,
  0,
  0,
  290,
  294,
  1,
  0,
  0,
  0,
  291,
  294,
  3,
  136,
  68,
  0,
  292,
  294,
  3,
  142,
  71,
  0,
  293,
  285,
  1,
  0,
  0,
  0,
  293,
  291,
  1,
  0,
  0,
  0,
  293,
  292,
  1,
  0,
  0,
  0,
  294,
  29,
  1,
  0,
  0,
  0,
  295,
  297,
  3,
  122,
  61,
  0,
  296,
  295,
  1,
  0,
  0,
  0,
  296,
  297,
  1,
  0,
  0,
  0,
  297,
  298,
  1,
  0,
  0,
  0,
  298,
  299,
  5,
  94,
  0,
  0,
  299,
  301,
  5,
  77,
  0,
  0,
  300,
  302,
  3,
  40,
  20,
  0,
  301,
  300,
  1,
  0,
  0,
  0,
  301,
  302,
  1,
  0,
  0,
  0,
  302,
  303,
  1,
  0,
  0,
  0,
  303,
  304,
  5,
  78,
  0,
  0,
  304,
  31,
  1,
  0,
  0,
  0,
  305,
  307,
  3,
  122,
  61,
  0,
  306,
  305,
  1,
  0,
  0,
  0,
  306,
  307,
  1,
  0,
  0,
  0,
  307,
  308,
  1,
  0,
  0,
  0,
  308,
  309,
  5,
  94,
  0,
  0,
  309,
  311,
  5,
  77,
  0,
  0,
  310,
  312,
  3,
  40,
  20,
  0,
  311,
  310,
  1,
  0,
  0,
  0,
  311,
  312,
  1,
  0,
  0,
  0,
  312,
  313,
  1,
  0,
  0,
  0,
  313,
  314,
  5,
  78,
  0,
  0,
  314,
  33,
  1,
  0,
  0,
  0,
  315,
  316,
  5,
  54,
  0,
  0,
  316,
  317,
  5,
  80,
  0,
  0,
  317,
  318,
  5,
  94,
  0,
  0,
  318,
  320,
  5,
  77,
  0,
  0,
  319,
  321,
  3,
  40,
  20,
  0,
  320,
  319,
  1,
  0,
  0,
  0,
  320,
  321,
  1,
  0,
  0,
  0,
  321,
  322,
  1,
  0,
  0,
  0,
  322,
  323,
  5,
  78,
  0,
  0,
  323,
  35,
  1,
  0,
  0,
  0,
  324,
  326,
  5,
  31,
  0,
  0,
  325,
  327,
  5,
  98,
  0,
  0,
  326,
  325,
  1,
  0,
  0,
  0,
  326,
  327,
  1,
  0,
  0,
  0,
  327,
  37,
  1,
  0,
  0,
  0,
  328,
  331,
  3,
  106,
  53,
  0,
  329,
  331,
  3,
  114,
  57,
  0,
  330,
  328,
  1,
  0,
  0,
  0,
  330,
  329,
  1,
  0,
  0,
  0,
  331,
  39,
  1,
  0,
  0,
  0,
  332,
  337,
  3,
  38,
  19,
  0,
  333,
  334,
  5,
  81,
  0,
  0,
  334,
  336,
  3,
  38,
  19,
  0,
  335,
  333,
  1,
  0,
  0,
  0,
  336,
  339,
  1,
  0,
  0,
  0,
  337,
  335,
  1,
  0,
  0,
  0,
  337,
  338,
  1,
  0,
  0,
  0,
  338,
  41,
  1,
  0,
  0,
  0,
  339,
  337,
  1,
  0,
  0,
  0,
  340,
  341,
  5,
  2,
  0,
  0,
  341,
  342,
  5,
  47,
  0,
  0,
  342,
  343,
  3,
  44,
  22,
  0,
  343,
  344,
  3,
  10,
  5,
  0,
  344,
  345,
  5,
  2,
  0,
  0,
  345,
  346,
  5,
  20,
  0,
  0,
  346,
  347,
  5,
  47,
  0,
  0,
  347,
  43,
  1,
  0,
  0,
  0,
  348,
  349,
  5,
  94,
  0,
  0,
  349,
  351,
  5,
  77,
  0,
  0,
  350,
  352,
  3,
  46,
  23,
  0,
  351,
  350,
  1,
  0,
  0,
  0,
  351,
  352,
  1,
  0,
  0,
  0,
  352,
  353,
  1,
  0,
  0,
  0,
  353,
  354,
  5,
  78,
  0,
  0,
  354,
  45,
  1,
  0,
  0,
  0,
  355,
  360,
  3,
  52,
  26,
  0,
  356,
  357,
  5,
  81,
  0,
  0,
  357,
  359,
  3,
  52,
  26,
  0,
  358,
  356,
  1,
  0,
  0,
  0,
  359,
  362,
  1,
  0,
  0,
  0,
  360,
  358,
  1,
  0,
  0,
  0,
  360,
  361,
  1,
  0,
  0,
  0,
  361,
  47,
  1,
  0,
  0,
  0,
  362,
  360,
  1,
  0,
  0,
  0,
  363,
  368,
  3,
  50,
  25,
  0,
  364,
  365,
  5,
  81,
  0,
  0,
  365,
  367,
  3,
  50,
  25,
  0,
  366,
  364,
  1,
  0,
  0,
  0,
  367,
  370,
  1,
  0,
  0,
  0,
  368,
  366,
  1,
  0,
  0,
  0,
  368,
  369,
  1,
  0,
  0,
  0,
  369,
  49,
  1,
  0,
  0,
  0,
  370,
  368,
  1,
  0,
  0,
  0,
  371,
  372,
  5,
  94,
  0,
  0,
  372,
  373,
  3,
  164,
  82,
  0,
  373,
  51,
  1,
  0,
  0,
  0,
  374,
  376,
  5,
  42,
  0,
  0,
  375,
  374,
  1,
  0,
  0,
  0,
  375,
  376,
  1,
  0,
  0,
  0,
  376,
  377,
  1,
  0,
  0,
  0,
  377,
  378,
  5,
  94,
  0,
  0,
  378,
  379,
  3,
  164,
  82,
  0,
  379,
  53,
  1,
  0,
  0,
  0,
  380,
  381,
  5,
  2,
  0,
  0,
  381,
  382,
  5,
  24,
  0,
  0,
  382,
  383,
  3,
  56,
  28,
  0,
  383,
  384,
  3,
  10,
  5,
  0,
  384,
  385,
  5,
  2,
  0,
  0,
  385,
  388,
  5,
  50,
  0,
  0,
  386,
  389,
  3,
  106,
  53,
  0,
  387,
  389,
  5,
  16,
  0,
  0,
  388,
  386,
  1,
  0,
  0,
  0,
  388,
  387,
  1,
  0,
  0,
  0,
  389,
  390,
  1,
  0,
  0,
  0,
  390,
  391,
  5,
  2,
  0,
  0,
  391,
  392,
  5,
  20,
  0,
  0,
  392,
  393,
  5,
  24,
  0,
  0,
  393,
  55,
  1,
  0,
  0,
  0,
  394,
  395,
  5,
  94,
  0,
  0,
  395,
  397,
  5,
  77,
  0,
  0,
  396,
  398,
  3,
  48,
  24,
  0,
  397,
  396,
  1,
  0,
  0,
  0,
  397,
  398,
  1,
  0,
  0,
  0,
  398,
  399,
  1,
  0,
  0,
  0,
  399,
  400,
  5,
  78,
  0,
  0,
  400,
  401,
  5,
  7,
  0,
  0,
  401,
  402,
  3,
  164,
  82,
  0,
  402,
  57,
  1,
  0,
  0,
  0,
  403,
  404,
  5,
  2,
  0,
  0,
  404,
  405,
  5,
  13,
  0,
  0,
  405,
  406,
  5,
  94,
  0,
  0,
  406,
  407,
  5,
  51,
  0,
  0,
  407,
  410,
  5,
  58,
  0,
  0,
  408,
  411,
  3,
  124,
  62,
  0,
  409,
  411,
  3,
  82,
  41,
  0,
  410,
  408,
  1,
  0,
  0,
  0,
  410,
  409,
  1,
  0,
  0,
  0,
  411,
  59,
  1,
  0,
  0,
  0,
  412,
  413,
  5,
  2,
  0,
  0,
  413,
  414,
  5,
  21,
  0,
  0,
  414,
  415,
  3,
  62,
  31,
  0,
  415,
  416,
  5,
  2,
  0,
  0,
  416,
  421,
  5,
  94,
  0,
  0,
  417,
  418,
  5,
  81,
  0,
  0,
  418,
  420,
  5,
  94,
  0,
  0,
  419,
  417,
  1,
  0,
  0,
  0,
  420,
  423,
  1,
  0,
  0,
  0,
  421,
  419,
  1,
  0,
  0,
  0,
  421,
  422,
  1,
  0,
  0,
  0,
  422,
  424,
  1,
  0,
  0,
  0,
  423,
  421,
  1,
  0,
  0,
  0,
  424,
  425,
  5,
  2,
  0,
  0,
  425,
  426,
  5,
  20,
  0,
  0,
  426,
  427,
  5,
  21,
  0,
  0,
  427,
  61,
  1,
  0,
  0,
  0,
  428,
  429,
  5,
  93,
  0,
  0,
  429,
  63,
  1,
  0,
  0,
  0,
  430,
  431,
  3,
  62,
  31,
  0,
  431,
  432,
  5,
  80,
  0,
  0,
  432,
  433,
  5,
  94,
  0,
  0,
  433,
  65,
  1,
  0,
  0,
  0,
  434,
  439,
  3,
  68,
  34,
  0,
  435,
  439,
  3,
  70,
  35,
  0,
  436,
  439,
  3,
  72,
  36,
  0,
  437,
  439,
  3,
  74,
  37,
  0,
  438,
  434,
  1,
  0,
  0,
  0,
  438,
  435,
  1,
  0,
  0,
  0,
  438,
  436,
  1,
  0,
  0,
  0,
  438,
  437,
  1,
  0,
  0,
  0,
  439,
  67,
  1,
  0,
  0,
  0,
  440,
  441,
  5,
  2,
  0,
  0,
  441,
  442,
  5,
  12,
  0,
  0,
  442,
  444,
  5,
  93,
  0,
  0,
  443,
  445,
  3,
  76,
  38,
  0,
  444,
  443,
  1,
  0,
  0,
  0,
  444,
  445,
  1,
  0,
  0,
  0,
  445,
  446,
  1,
  0,
  0,
  0,
  446,
  453,
  3,
  80,
  40,
  0,
  447,
  448,
  5,
  2,
  0,
  0,
  448,
  452,
  3,
  78,
  39,
  0,
  449,
  452,
  3,
  54,
  27,
  0,
  450,
  452,
  3,
  42,
  21,
  0,
  451,
  447,
  1,
  0,
  0,
  0,
  451,
  449,
  1,
  0,
  0,
  0,
  451,
  450,
  1,
  0,
  0,
  0,
  452,
  455,
  1,
  0,
  0,
  0,
  453,
  451,
  1,
  0,
  0,
  0,
  453,
  454,
  1,
  0,
  0,
  0,
  454,
  456,
  1,
  0,
  0,
  0,
  455,
  453,
  1,
  0,
  0,
  0,
  456,
  457,
  5,
  2,
  0,
  0,
  457,
  458,
  5,
  20,
  0,
  0,
  458,
  459,
  5,
  12,
  0,
  0,
  459,
  69,
  1,
  0,
  0,
  0,
  460,
  461,
  5,
  2,
  0,
  0,
  461,
  462,
  5,
  5,
  0,
  0,
  462,
  463,
  5,
  12,
  0,
  0,
  463,
  465,
  5,
  93,
  0,
  0,
  464,
  466,
  3,
  76,
  38,
  0,
  465,
  464,
  1,
  0,
  0,
  0,
  465,
  466,
  1,
  0,
  0,
  0,
  466,
  480,
  1,
  0,
  0,
  0,
  467,
  468,
  5,
  2,
  0,
  0,
  468,
  469,
  5,
  5,
  0,
  0,
  469,
  479,
  3,
  78,
  39,
  0,
  470,
  471,
  5,
  2,
  0,
  0,
  471,
  472,
  5,
  5,
  0,
  0,
  472,
  473,
  5,
  24,
  0,
  0,
  473,
  479,
  3,
  56,
  28,
  0,
  474,
  475,
  5,
  2,
  0,
  0,
  475,
  476,
  5,
  5,
  0,
  0,
  476,
  477,
  5,
  47,
  0,
  0,
  477,
  479,
  3,
  44,
  22,
  0,
  478,
  467,
  1,
  0,
  0,
  0,
  478,
  470,
  1,
  0,
  0,
  0,
  478,
  474,
  1,
  0,
  0,
  0,
  479,
  482,
  1,
  0,
  0,
  0,
  480,
  478,
  1,
  0,
  0,
  0,
  480,
  481,
  1,
  0,
  0,
  0,
  481,
  483,
  1,
  0,
  0,
  0,
  482,
  480,
  1,
  0,
  0,
  0,
  483,
  484,
  5,
  2,
  0,
  0,
  484,
  485,
  5,
  20,
  0,
  0,
  485,
  486,
  5,
  12,
  0,
  0,
  486,
  71,
  1,
  0,
  0,
  0,
  487,
  488,
  5,
  2,
  0,
  0,
  488,
  489,
  5,
  27,
  0,
  0,
  489,
  490,
  5,
  12,
  0,
  0,
  490,
  492,
  5,
  93,
  0,
  0,
  491,
  493,
  3,
  76,
  38,
  0,
  492,
  491,
  1,
  0,
  0,
  0,
  492,
  493,
  1,
  0,
  0,
  0,
  493,
  494,
  1,
  0,
  0,
  0,
  494,
  500,
  3,
  80,
  40,
  0,
  495,
  496,
  5,
  2,
  0,
  0,
  496,
  499,
  3,
  78,
  39,
  0,
  497,
  499,
  3,
  54,
  27,
  0,
  498,
  495,
  1,
  0,
  0,
  0,
  498,
  497,
  1,
  0,
  0,
  0,
  499,
  502,
  1,
  0,
  0,
  0,
  500,
  498,
  1,
  0,
  0,
  0,
  500,
  501,
  1,
  0,
  0,
  0,
  501,
  503,
  1,
  0,
  0,
  0,
  502,
  500,
  1,
  0,
  0,
  0,
  503,
  504,
  5,
  2,
  0,
  0,
  504,
  505,
  5,
  20,
  0,
  0,
  505,
  506,
  5,
  12,
  0,
  0,
  506,
  73,
  1,
  0,
  0,
  0,
  507,
  508,
  5,
  2,
  0,
  0,
  508,
  509,
  5,
  5,
  0,
  0,
  509,
  510,
  5,
  27,
  0,
  0,
  510,
  511,
  5,
  12,
  0,
  0,
  511,
  513,
  5,
  93,
  0,
  0,
  512,
  514,
  3,
  76,
  38,
  0,
  513,
  512,
  1,
  0,
  0,
  0,
  513,
  514,
  1,
  0,
  0,
  0,
  514,
  524,
  1,
  0,
  0,
  0,
  515,
  516,
  5,
  2,
  0,
  0,
  516,
  517,
  5,
  5,
  0,
  0,
  517,
  523,
  3,
  78,
  39,
  0,
  518,
  519,
  5,
  2,
  0,
  0,
  519,
  520,
  5,
  5,
  0,
  0,
  520,
  521,
  5,
  24,
  0,
  0,
  521,
  523,
  3,
  56,
  28,
  0,
  522,
  515,
  1,
  0,
  0,
  0,
  522,
  518,
  1,
  0,
  0,
  0,
  523,
  526,
  1,
  0,
  0,
  0,
  524,
  522,
  1,
  0,
  0,
  0,
  524,
  525,
  1,
  0,
  0,
  0,
  525,
  527,
  1,
  0,
  0,
  0,
  526,
  524,
  1,
  0,
  0,
  0,
  527,
  528,
  5,
  2,
  0,
  0,
  528,
  529,
  5,
  20,
  0,
  0,
  529,
  530,
  5,
  12,
  0,
  0,
  530,
  75,
  1,
  0,
  0,
  0,
  531,
  532,
  5,
  30,
  0,
  0,
  532,
  537,
  3,
  164,
  82,
  0,
  533,
  534,
  5,
  81,
  0,
  0,
  534,
  536,
  3,
  164,
  82,
  0,
  535,
  533,
  1,
  0,
  0,
  0,
  536,
  539,
  1,
  0,
  0,
  0,
  537,
  535,
  1,
  0,
  0,
  0,
  537,
  538,
  1,
  0,
  0,
  0,
  538,
  77,
  1,
  0,
  0,
  0,
  539,
  537,
  1,
  0,
  0,
  0,
  540,
  542,
  5,
  46,
  0,
  0,
  541,
  540,
  1,
  0,
  0,
  0,
  541,
  542,
  1,
  0,
  0,
  0,
  542,
  543,
  1,
  0,
  0,
  0,
  543,
  544,
  5,
  48,
  0,
  0,
  544,
  545,
  5,
  94,
  0,
  0,
  545,
  546,
  3,
  164,
  82,
  0,
  546,
  79,
  1,
  0,
  0,
  0,
  547,
  548,
  5,
  2,
  0,
  0,
  548,
  549,
  5,
  14,
  0,
  0,
  549,
  551,
  5,
  77,
  0,
  0,
  550,
  552,
  3,
  48,
  24,
  0,
  551,
  550,
  1,
  0,
  0,
  0,
  551,
  552,
  1,
  0,
  0,
  0,
  552,
  553,
  1,
  0,
  0,
  0,
  553,
  554,
  5,
  78,
  0,
  0,
  554,
  555,
  3,
  10,
  5,
  0,
  555,
  556,
  5,
  2,
  0,
  0,
  556,
  557,
  5,
  20,
  0,
  0,
  557,
  558,
  5,
  14,
  0,
  0,
  558,
  81,
  1,
  0,
  0,
  0,
  559,
  560,
  5,
  37,
  0,
  0,
  560,
  561,
  3,
  164,
  82,
  0,
  561,
  563,
  5,
  77,
  0,
  0,
  562,
  564,
  3,
  40,
  20,
  0,
  563,
  562,
  1,
  0,
  0,
  0,
  563,
  564,
  1,
  0,
  0,
  0,
  564,
  565,
  1,
  0,
  0,
  0,
  565,
  567,
  5,
  78,
  0,
  0,
  566,
  568,
  3,
  84,
  42,
  0,
  567,
  566,
  1,
  0,
  0,
  0,
  567,
  568,
  1,
  0,
  0,
  0,
  568,
  572,
  1,
  0,
  0,
  0,
  569,
  570,
  5,
  94,
  0,
  0,
  570,
  572,
  3,
  84,
  42,
  0,
  571,
  559,
  1,
  0,
  0,
  0,
  571,
  569,
  1,
  0,
  0,
  0,
  572,
  83,
  1,
  0,
  0,
  0,
  573,
  574,
  5,
  63,
  0,
  0,
  574,
  575,
  5,
  73,
  0,
  0,
  575,
  580,
  3,
  26,
  13,
  0,
  576,
  577,
  5,
  81,
  0,
  0,
  577,
  579,
  3,
  26,
  13,
  0,
  578,
  576,
  1,
  0,
  0,
  0,
  579,
  582,
  1,
  0,
  0,
  0,
  580,
  578,
  1,
  0,
  0,
  0,
  580,
  581,
  1,
  0,
  0,
  0,
  581,
  583,
  1,
  0,
  0,
  0,
  582,
  580,
  1,
  0,
  0,
  0,
  583,
  584,
  5,
  74,
  0,
  0,
  584,
  85,
  1,
  0,
  0,
  0,
  585,
  593,
  3,
  88,
  44,
  0,
  586,
  593,
  3,
  90,
  45,
  0,
  587,
  593,
  3,
  92,
  46,
  0,
  588,
  593,
  3,
  94,
  47,
  0,
  589,
  593,
  3,
  96,
  48,
  0,
  590,
  593,
  3,
  98,
  49,
  0,
  591,
  593,
  3,
  100,
  50,
  0,
  592,
  585,
  1,
  0,
  0,
  0,
  592,
  586,
  1,
  0,
  0,
  0,
  592,
  587,
  1,
  0,
  0,
  0,
  592,
  588,
  1,
  0,
  0,
  0,
  592,
  589,
  1,
  0,
  0,
  0,
  592,
  590,
  1,
  0,
  0,
  0,
  592,
  591,
  1,
  0,
  0,
  0,
  593,
  87,
  1,
  0,
  0,
  0,
  594,
  595,
  5,
  2,
  0,
  0,
  595,
  596,
  5,
  26,
  0,
  0,
  596,
  597,
  3,
  106,
  53,
  0,
  597,
  606,
  3,
  10,
  5,
  0,
  598,
  599,
  5,
  2,
  0,
  0,
  599,
  600,
  5,
  19,
  0,
  0,
  600,
  601,
  5,
  26,
  0,
  0,
  601,
  602,
  3,
  106,
  53,
  0,
  602,
  603,
  3,
  10,
  5,
  0,
  603,
  605,
  1,
  0,
  0,
  0,
  604,
  598,
  1,
  0,
  0,
  0,
  605,
  608,
  1,
  0,
  0,
  0,
  606,
  604,
  1,
  0,
  0,
  0,
  606,
  607,
  1,
  0,
  0,
  0,
  607,
  612,
  1,
  0,
  0,
  0,
  608,
  606,
  1,
  0,
  0,
  0,
  609,
  610,
  5,
  2,
  0,
  0,
  610,
  611,
  5,
  19,
  0,
  0,
  611,
  613,
  3,
  10,
  5,
  0,
  612,
  609,
  1,
  0,
  0,
  0,
  612,
  613,
  1,
  0,
  0,
  0,
  613,
  614,
  1,
  0,
  0,
  0,
  614,
  615,
  5,
  2,
  0,
  0,
  615,
  616,
  5,
  20,
  0,
  0,
  616,
  617,
  5,
  26,
  0,
  0,
  617,
  89,
  1,
  0,
  0,
  0,
  618,
  619,
  5,
  2,
  0,
  0,
  619,
  620,
  5,
  22,
  0,
  0,
  620,
  621,
  5,
  94,
  0,
  0,
  621,
  622,
  5,
  23,
  0,
  0,
  622,
  623,
  3,
  106,
  53,
  0,
  623,
  624,
  5,
  58,
  0,
  0,
  624,
  630,
  3,
  106,
  53,
  0,
  625,
  627,
  5,
  52,
  0,
  0,
  626,
  628,
  5,
  84,
  0,
  0,
  627,
  626,
  1,
  0,
  0,
  0,
  627,
  628,
  1,
  0,
  0,
  0,
  628,
  629,
  1,
  0,
  0,
  0,
  629,
  631,
  5,
  95,
  0,
  0,
  630,
  625,
  1,
  0,
  0,
  0,
  630,
  631,
  1,
  0,
  0,
  0,
  631,
  632,
  1,
  0,
  0,
  0,
  632,
  633,
  3,
  10,
  5,
  0,
  633,
  634,
  5,
  2,
  0,
  0,
  634,
  635,
  5,
  20,
  0,
  0,
  635,
  636,
  5,
  22,
  0,
  0,
  636,
  91,
  1,
  0,
  0,
  0,
  637,
  638,
  5,
  2,
  0,
  0,
  638,
  639,
  5,
  18,
  0,
  0,
  639,
  640,
  5,
  94,
  0,
  0,
  640,
  641,
  5,
  29,
  0,
  0,
  641,
  642,
  3,
  106,
  53,
  0,
  642,
  643,
  3,
  10,
  5,
  0,
  643,
  644,
  5,
  2,
  0,
  0,
  644,
  645,
  5,
  20,
  0,
  0,
  645,
  646,
  5,
  18,
  0,
  0,
  646,
  93,
  1,
  0,
  0,
  0,
  647,
  648,
  5,
  2,
  0,
  0,
  648,
  649,
  5,
  62,
  0,
  0,
  649,
  650,
  3,
  106,
  53,
  0,
  650,
  651,
  3,
  10,
  5,
  0,
  651,
  652,
  5,
  2,
  0,
  0,
  652,
  653,
  5,
  20,
  0,
  0,
  653,
  654,
  5,
  62,
  0,
  0,
  654,
  95,
  1,
  0,
  0,
  0,
  655,
  656,
  5,
  2,
  0,
  0,
  656,
  657,
  5,
  49,
  0,
  0,
  657,
  658,
  3,
  10,
  5,
  0,
  658,
  659,
  5,
  2,
  0,
  0,
  659,
  660,
  5,
  20,
  0,
  0,
  660,
  661,
  5,
  49,
  0,
  0,
  661,
  662,
  5,
  61,
  0,
  0,
  662,
  663,
  3,
  106,
  53,
  0,
  663,
  97,
  1,
  0,
  0,
  0,
  664,
  665,
  5,
  2,
  0,
  0,
  665,
  666,
  5,
  59,
  0,
  0,
  666,
  667,
  3,
  10,
  5,
  0,
  667,
  668,
  5,
  2,
  0,
  0,
  668,
  669,
  5,
  11,
  0,
  0,
  669,
  670,
  5,
  94,
  0,
  0,
  670,
  671,
  3,
  10,
  5,
  0,
  671,
  672,
  5,
  2,
  0,
  0,
  672,
  673,
  5,
  20,
  0,
  0,
  673,
  674,
  5,
  59,
  0,
  0,
  674,
  99,
  1,
  0,
  0,
  0,
  675,
  676,
  5,
  2,
  0,
  0,
  676,
  677,
  5,
  53,
  0,
  0,
  677,
  679,
  3,
  106,
  53,
  0,
  678,
  680,
  3,
  102,
  51,
  0,
  679,
  678,
  1,
  0,
  0,
  0,
  680,
  681,
  1,
  0,
  0,
  0,
  681,
  679,
  1,
  0,
  0,
  0,
  681,
  682,
  1,
  0,
  0,
  0,
  682,
  683,
  1,
  0,
  0,
  0,
  683,
  684,
  3,
  104,
  52,
  0,
  684,
  685,
  5,
  2,
  0,
  0,
  685,
  686,
  5,
  20,
  0,
  0,
  686,
  687,
  5,
  53,
  0,
  0,
  687,
  101,
  1,
  0,
  0,
  0,
  688,
  689,
  5,
  2,
  0,
  0,
  689,
  691,
  5,
  10,
  0,
  0,
  690,
  692,
  5,
  84,
  0,
  0,
  691,
  690,
  1,
  0,
  0,
  0,
  691,
  692,
  1,
  0,
  0,
  0,
  692,
  693,
  1,
  0,
  0,
  0,
  693,
  694,
  3,
  126,
  63,
  0,
  694,
  695,
  3,
  10,
  5,
  0,
  695,
  103,
  1,
  0,
  0,
  0,
  696,
  697,
  5,
  2,
  0,
  0,
  697,
  698,
  5,
  16,
  0,
  0,
  698,
  699,
  3,
  10,
  5,
  0,
  699,
  105,
  1,
  0,
  0,
  0,
  700,
  701,
  6,
  53,
  -1,
  0,
  701,
  711,
  3,
  108,
  54,
  0,
  702,
  711,
  3,
  32,
  16,
  0,
  703,
  711,
  3,
  120,
  60,
  0,
  704,
  705,
  3,
  154,
  77,
  0,
  705,
  706,
  3,
  106,
  53,
  8,
  706,
  711,
  1,
  0,
  0,
  0,
  707,
  711,
  3,
  82,
  41,
  0,
  708,
  711,
  3,
  36,
  18,
  0,
  709,
  711,
  3,
  34,
  17,
  0,
  710,
  700,
  1,
  0,
  0,
  0,
  710,
  702,
  1,
  0,
  0,
  0,
  710,
  703,
  1,
  0,
  0,
  0,
  710,
  704,
  1,
  0,
  0,
  0,
  710,
  707,
  1,
  0,
  0,
  0,
  710,
  708,
  1,
  0,
  0,
  0,
  710,
  709,
  1,
  0,
  0,
  0,
  711,
  735,
  1,
  0,
  0,
  0,
  712,
  713,
  10,
  7,
  0,
  0,
  713,
  714,
  5,
  87,
  0,
  0,
  714,
  734,
  3,
  106,
  53,
  8,
  715,
  716,
  10,
  6,
  0,
  0,
  716,
  717,
  3,
  156,
  78,
  0,
  717,
  718,
  3,
  106,
  53,
  7,
  718,
  734,
  1,
  0,
  0,
  0,
  719,
  720,
  10,
  11,
  0,
  0,
  720,
  734,
  3,
  116,
  58,
  0,
  721,
  722,
  10,
  10,
  0,
  0,
  722,
  723,
  5,
  80,
  0,
  0,
  723,
  734,
  3,
  32,
  16,
  0,
  724,
  725,
  10,
  9,
  0,
  0,
  725,
  726,
  5,
  80,
  0,
  0,
  726,
  734,
  5,
  94,
  0,
  0,
  727,
  728,
  10,
  4,
  0,
  0,
  728,
  729,
  3,
  110,
  55,
  0,
  729,
  730,
  3,
  112,
  56,
  0,
  730,
  734,
  1,
  0,
  0,
  0,
  731,
  732,
  10,
  3,
  0,
  0,
  732,
  734,
  3,
  84,
  42,
  0,
  733,
  712,
  1,
  0,
  0,
  0,
  733,
  715,
  1,
  0,
  0,
  0,
  733,
  719,
  1,
  0,
  0,
  0,
  733,
  721,
  1,
  0,
  0,
  0,
  733,
  724,
  1,
  0,
  0,
  0,
  733,
  727,
  1,
  0,
  0,
  0,
  733,
  731,
  1,
  0,
  0,
  0,
  734,
  737,
  1,
  0,
  0,
  0,
  735,
  733,
  1,
  0,
  0,
  0,
  735,
  736,
  1,
  0,
  0,
  0,
  736,
  107,
  1,
  0,
  0,
  0,
  737,
  735,
  1,
  0,
  0,
  0,
  738,
  739,
  5,
  77,
  0,
  0,
  739,
  740,
  3,
  106,
  53,
  0,
  740,
  741,
  5,
  78,
  0,
  0,
  741,
  109,
  1,
  0,
  0,
  0,
  742,
  743,
  5,
  26,
  0,
  0,
  743,
  744,
  3,
  106,
  53,
  0,
  744,
  111,
  1,
  0,
  0,
  0,
  745,
  746,
  5,
  19,
  0,
  0,
  746,
  747,
  3,
  106,
  53,
  0,
  747,
  113,
  1,
  0,
  0,
  0,
  748,
  749,
  5,
  32,
  0,
  0,
  749,
  750,
  3,
  40,
  20,
  0,
  750,
  751,
  5,
  72,
  0,
  0,
  751,
  752,
  3,
  106,
  53,
  0,
  752,
  115,
  1,
  0,
  0,
  0,
  753,
  760,
  5,
  75,
  0,
  0,
  754,
  761,
  3,
  106,
  53,
  0,
  755,
  756,
  3,
  106,
  53,
  0,
  756,
  757,
  5,
  81,
  0,
  0,
  757,
  758,
  3,
  106,
  53,
  0,
  758,
  761,
  1,
  0,
  0,
  0,
  759,
  761,
  3,
  118,
  59,
  0,
  760,
  754,
  1,
  0,
  0,
  0,
  760,
  755,
  1,
  0,
  0,
  0,
  760,
  759,
  1,
  0,
  0,
  0,
  761,
  762,
  1,
  0,
  0,
  0,
  762,
  763,
  5,
  76,
  0,
  0,
  763,
  117,
  1,
  0,
  0,
  0,
  764,
  765,
  3,
  106,
  53,
  0,
  765,
  766,
  5,
  79,
  0,
  0,
  766,
  767,
  3,
  106,
  53,
  0,
  767,
  774,
  1,
  0,
  0,
  0,
  768,
  769,
  3,
  106,
  53,
  0,
  769,
  770,
  5,
  79,
  0,
  0,
  770,
  774,
  1,
  0,
  0,
  0,
  771,
  772,
  5,
  79,
  0,
  0,
  772,
  774,
  3,
  106,
  53,
  0,
  773,
  764,
  1,
  0,
  0,
  0,
  773,
  768,
  1,
  0,
  0,
  0,
  773,
  771,
  1,
  0,
  0,
  0,
  774,
  119,
  1,
  0,
  0,
  0,
  775,
  785,
  3,
  124,
  62,
  0,
  776,
  778,
  3,
  122,
  61,
  0,
  777,
  776,
  1,
  0,
  0,
  0,
  777,
  778,
  1,
  0,
  0,
  0,
  778,
  779,
  1,
  0,
  0,
  0,
  779,
  785,
  5,
  94,
  0,
  0,
  780,
  785,
  3,
  128,
  64,
  0,
  781,
  785,
  5,
  56,
  0,
  0,
  782,
  783,
  5,
  16,
  0,
  0,
  783,
  785,
  3,
  164,
  82,
  0,
  784,
  775,
  1,
  0,
  0,
  0,
  784,
  777,
  1,
  0,
  0,
  0,
  784,
  780,
  1,
  0,
  0,
  0,
  784,
  781,
  1,
  0,
  0,
  0,
  784,
  782,
  1,
  0,
  0,
  0,
  785,
  121,
  1,
  0,
  0,
  0,
  786,
  793,
  5,
  48,
  0,
  0,
  787,
  793,
  5,
  25,
  0,
  0,
  788,
  793,
  5,
  34,
  0,
  0,
  789,
  790,
  5,
  43,
  0,
  0,
  790,
  791,
  5,
  80,
  0,
  0,
  791,
  793,
  3,
  4,
  2,
  0,
  792,
  786,
  1,
  0,
  0,
  0,
  792,
  787,
  1,
  0,
  0,
  0,
  792,
  788,
  1,
  0,
  0,
  0,
  792,
  789,
  1,
  0,
  0,
  0,
  793,
  794,
  1,
  0,
  0,
  0,
  794,
  795,
  5,
  80,
  0,
  0,
  795,
  123,
  1,
  0,
  0,
  0,
  796,
  799,
  3,
  126,
  63,
  0,
  797,
  799,
  3,
  130,
  65,
  0,
  798,
  796,
  1,
  0,
  0,
  0,
  798,
  797,
  1,
  0,
  0,
  0,
  799,
  125,
  1,
  0,
  0,
  0,
  800,
  806,
  5,
  65,
  0,
  0,
  801,
  806,
  5,
  95,
  0,
  0,
  802,
  806,
  5,
  96,
  0,
  0,
  803,
  806,
  5,
  97,
  0,
  0,
  804,
  806,
  3,
  64,
  32,
  0,
  805,
  800,
  1,
  0,
  0,
  0,
  805,
  801,
  1,
  0,
  0,
  0,
  805,
  802,
  1,
  0,
  0,
  0,
  805,
  803,
  1,
  0,
  0,
  0,
  805,
  804,
  1,
  0,
  0,
  0,
  806,
  127,
  1,
  0,
  0,
  0,
  807,
  812,
  3,
  138,
  69,
  0,
  808,
  812,
  3,
  144,
  72,
  0,
  809,
  812,
  3,
  132,
  66,
  0,
  810,
  812,
  3,
  146,
  73,
  0,
  811,
  807,
  1,
  0,
  0,
  0,
  811,
  808,
  1,
  0,
  0,
  0,
  811,
  809,
  1,
  0,
  0,
  0,
  811,
  810,
  1,
  0,
  0,
  0,
  812,
  129,
  1,
  0,
  0,
  0,
  813,
  818,
  5,
  98,
  0,
  0,
  814,
  818,
  3,
  134,
  67,
  0,
  815,
  818,
  3,
  140,
  70,
  0,
  816,
  818,
  3,
  148,
  74,
  0,
  817,
  813,
  1,
  0,
  0,
  0,
  817,
  814,
  1,
  0,
  0,
  0,
  817,
  815,
  1,
  0,
  0,
  0,
  817,
  816,
  1,
  0,
  0,
  0,
  818,
  131,
  1,
  0,
  0,
  0,
  819,
  820,
  5,
  77,
  0,
  0,
  820,
  821,
  3,
  106,
  53,
  0,
  821,
  822,
  5,
  81,
  0,
  0,
  822,
  827,
  3,
  106,
  53,
  0,
  823,
  824,
  5,
  81,
  0,
  0,
  824,
  826,
  3,
  106,
  53,
  0,
  825,
  823,
  1,
  0,
  0,
  0,
  826,
  829,
  1,
  0,
  0,
  0,
  827,
  825,
  1,
  0,
  0,
  0,
  827,
  828,
  1,
  0,
  0,
  0,
  828,
  830,
  1,
  0,
  0,
  0,
  829,
  827,
  1,
  0,
  0,
  0,
  830,
  831,
  5,
  78,
  0,
  0,
  831,
  133,
  1,
  0,
  0,
  0,
  832,
  833,
  5,
  77,
  0,
  0,
  833,
  834,
  3,
  124,
  62,
  0,
  834,
  835,
  5,
  81,
  0,
  0,
  835,
  840,
  3,
  124,
  62,
  0,
  836,
  837,
  5,
  81,
  0,
  0,
  837,
  839,
  3,
  124,
  62,
  0,
  838,
  836,
  1,
  0,
  0,
  0,
  839,
  842,
  1,
  0,
  0,
  0,
  840,
  838,
  1,
  0,
  0,
  0,
  840,
  841,
  1,
  0,
  0,
  0,
  841,
  843,
  1,
  0,
  0,
  0,
  842,
  840,
  1,
  0,
  0,
  0,
  843,
  844,
  5,
  78,
  0,
  0,
  844,
  135,
  1,
  0,
  0,
  0,
  845,
  846,
  5,
  77,
  0,
  0,
  846,
  849,
  5,
  94,
  0,
  0,
  847,
  848,
  5,
  81,
  0,
  0,
  848,
  850,
  5,
  94,
  0,
  0,
  849,
  847,
  1,
  0,
  0,
  0,
  850,
  851,
  1,
  0,
  0,
  0,
  851,
  849,
  1,
  0,
  0,
  0,
  851,
  852,
  1,
  0,
  0,
  0,
  852,
  853,
  1,
  0,
  0,
  0,
  853,
  854,
  5,
  78,
  0,
  0,
  854,
  137,
  1,
  0,
  0,
  0,
  855,
  856,
  5,
  73,
  0,
  0,
  856,
  861,
  3,
  106,
  53,
  0,
  857,
  858,
  5,
  81,
  0,
  0,
  858,
  860,
  3,
  106,
  53,
  0,
  859,
  857,
  1,
  0,
  0,
  0,
  860,
  863,
  1,
  0,
  0,
  0,
  861,
  859,
  1,
  0,
  0,
  0,
  861,
  862,
  1,
  0,
  0,
  0,
  862,
  864,
  1,
  0,
  0,
  0,
  863,
  861,
  1,
  0,
  0,
  0,
  864,
  865,
  5,
  74,
  0,
  0,
  865,
  139,
  1,
  0,
  0,
  0,
  866,
  867,
  5,
  73,
  0,
  0,
  867,
  872,
  3,
  124,
  62,
  0,
  868,
  869,
  5,
  81,
  0,
  0,
  869,
  871,
  3,
  124,
  62,
  0,
  870,
  868,
  1,
  0,
  0,
  0,
  871,
  874,
  1,
  0,
  0,
  0,
  872,
  870,
  1,
  0,
  0,
  0,
  872,
  873,
  1,
  0,
  0,
  0,
  873,
  875,
  1,
  0,
  0,
  0,
  874,
  872,
  1,
  0,
  0,
  0,
  875,
  876,
  5,
  74,
  0,
  0,
  876,
  141,
  1,
  0,
  0,
  0,
  877,
  878,
  5,
  73,
  0,
  0,
  878,
  879,
  5,
  94,
  0,
  0,
  879,
  880,
  5,
  82,
  0,
  0,
  880,
  881,
  5,
  94,
  0,
  0,
  881,
  882,
  5,
  74,
  0,
  0,
  882,
  143,
  1,
  0,
  0,
  0,
  883,
  884,
  5,
  67,
  0,
  0,
  884,
  885,
  3,
  168,
  84,
  0,
  885,
  887,
  5,
  77,
  0,
  0,
  886,
  888,
  5,
  95,
  0,
  0,
  887,
  886,
  1,
  0,
  0,
  0,
  887,
  888,
  1,
  0,
  0,
  0,
  888,
  889,
  1,
  0,
  0,
  0,
  889,
  890,
  5,
  78,
  0,
  0,
  890,
  145,
  1,
  0,
  0,
  0,
  891,
  892,
  5,
  73,
  0,
  0,
  892,
  897,
  3,
  150,
  75,
  0,
  893,
  894,
  5,
  81,
  0,
  0,
  894,
  896,
  3,
  150,
  75,
  0,
  895,
  893,
  1,
  0,
  0,
  0,
  896,
  899,
  1,
  0,
  0,
  0,
  897,
  895,
  1,
  0,
  0,
  0,
  897,
  898,
  1,
  0,
  0,
  0,
  898,
  900,
  1,
  0,
  0,
  0,
  899,
  897,
  1,
  0,
  0,
  0,
  900,
  901,
  5,
  74,
  0,
  0,
  901,
  147,
  1,
  0,
  0,
  0,
  902,
  903,
  5,
  73,
  0,
  0,
  903,
  908,
  3,
  152,
  76,
  0,
  904,
  905,
  5,
  81,
  0,
  0,
  905,
  907,
  3,
  152,
  76,
  0,
  906,
  904,
  1,
  0,
  0,
  0,
  907,
  910,
  1,
  0,
  0,
  0,
  908,
  906,
  1,
  0,
  0,
  0,
  908,
  909,
  1,
  0,
  0,
  0,
  909,
  911,
  1,
  0,
  0,
  0,
  910,
  908,
  1,
  0,
  0,
  0,
  911,
  912,
  5,
  74,
  0,
  0,
  912,
  149,
  1,
  0,
  0,
  0,
  913,
  914,
  3,
  106,
  53,
  0,
  914,
  915,
  5,
  82,
  0,
  0,
  915,
  916,
  3,
  106,
  53,
  0,
  916,
  151,
  1,
  0,
  0,
  0,
  917,
  918,
  3,
  124,
  62,
  0,
  918,
  919,
  5,
  82,
  0,
  0,
  919,
  920,
  3,
  124,
  62,
  0,
  920,
  153,
  1,
  0,
  0,
  0,
  921,
  922,
  7,
  2,
  0,
  0,
  922,
  155,
  1,
  0,
  0,
  0,
  923,
  927,
  3,
  158,
  79,
  0,
  924,
  927,
  3,
  160,
  80,
  0,
  925,
  927,
  3,
  162,
  81,
  0,
  926,
  923,
  1,
  0,
  0,
  0,
  926,
  924,
  1,
  0,
  0,
  0,
  926,
  925,
  1,
  0,
  0,
  0,
  927,
  157,
  1,
  0,
  0,
  0,
  928,
  929,
  7,
  3,
  0,
  0,
  929,
  159,
  1,
  0,
  0,
  0,
  930,
  931,
  7,
  4,
  0,
  0,
  931,
  161,
  1,
  0,
  0,
  0,
  932,
  933,
  7,
  5,
  0,
  0,
  933,
  163,
  1,
  0,
  0,
  0,
  934,
  941,
  5,
  66,
  0,
  0,
  935,
  941,
  5,
  93,
  0,
  0,
  936,
  937,
  5,
  93,
  0,
  0,
  937,
  941,
  3,
  168,
  84,
  0,
  938,
  941,
  3,
  170,
  85,
  0,
  939,
  941,
  3,
  174,
  87,
  0,
  940,
  934,
  1,
  0,
  0,
  0,
  940,
  935,
  1,
  0,
  0,
  0,
  940,
  936,
  1,
  0,
  0,
  0,
  940,
  938,
  1,
  0,
  0,
  0,
  940,
  939,
  1,
  0,
  0,
  0,
  941,
  165,
  1,
  0,
  0,
  0,
  942,
  943,
  7,
  6,
  0,
  0,
  943,
  944,
  3,
  168,
  84,
  0,
  944,
  167,
  1,
  0,
  0,
  0,
  945,
  946,
  5,
  88,
  0,
  0,
  946,
  947,
  5,
  39,
  0,
  0,
  947,
  952,
  3,
  164,
  82,
  0,
  948,
  949,
  5,
  81,
  0,
  0,
  949,
  951,
  3,
  164,
  82,
  0,
  950,
  948,
  1,
  0,
  0,
  0,
  951,
  954,
  1,
  0,
  0,
  0,
  952,
  950,
  1,
  0,
  0,
  0,
  952,
  953,
  1,
  0,
  0,
  0,
  953,
  955,
  1,
  0,
  0,
  0,
  954,
  952,
  1,
  0,
  0,
  0,
  955,
  956,
  5,
  89,
  0,
  0,
  956,
  169,
  1,
  0,
  0,
  0,
  957,
  958,
  5,
  77,
  0,
  0,
  958,
  961,
  3,
  164,
  82,
  0,
  959,
  960,
  5,
  81,
  0,
  0,
  960,
  962,
  3,
  164,
  82,
  0,
  961,
  959,
  1,
  0,
  0,
  0,
  962,
  963,
  1,
  0,
  0,
  0,
  963,
  961,
  1,
  0,
  0,
  0,
  963,
  964,
  1,
  0,
  0,
  0,
  964,
  965,
  1,
  0,
  0,
  0,
  965,
  966,
  5,
  78,
  0,
  0,
  966,
  171,
  1,
  0,
  0,
  0,
  967,
  972,
  3,
  164,
  82,
  0,
  968,
  969,
  5,
  81,
  0,
  0,
  969,
  971,
  3,
  164,
  82,
  0,
  970,
  968,
  1,
  0,
  0,
  0,
  971,
  974,
  1,
  0,
  0,
  0,
  972,
  970,
  1,
  0,
  0,
  0,
  972,
  973,
  1,
  0,
  0,
  0,
  973,
  173,
  1,
  0,
  0,
  0,
  974,
  972,
  1,
  0,
  0,
  0,
  975,
  976,
  5,
  1,
  0,
  0,
  976,
  977,
  5,
  88,
  0,
  0,
  977,
  978,
  5,
  39,
  0,
  0,
  978,
  979,
  3,
  172,
  86,
  0,
  979,
  980,
  5,
  72,
  0,
  0,
  980,
  981,
  3,
  164,
  82,
  0,
  981,
  982,
  5,
  89,
  0,
  0,
  982,
  175,
  1,
  0,
  0,
  0,
  81,
  184,
  186,
  192,
  205,
  229,
  231,
  237,
  239,
  255,
  264,
  285,
  289,
  293,
  296,
  301,
  306,
  311,
  320,
  326,
  330,
  337,
  351,
  360,
  368,
  375,
  388,
  397,
  410,
  421,
  438,
  444,
  451,
  453,
  465,
  478,
  480,
  492,
  498,
  500,
  513,
  522,
  524,
  537,
  541,
  551,
  563,
  567,
  571,
  580,
  592,
  606,
  612,
  627,
  630,
  681,
  691,
  710,
  733,
  735,
  760,
  773,
  777,
  784,
  792,
  798,
  805,
  811,
  817,
  827,
  840,
  851,
  861,
  872,
  887,
  897,
  908,
  926,
  940,
  952,
  963,
  972
];
var atn2 = new Ln.atn.ATNDeserializer().deserialize(serializedATN2);
var decisionsToDFA2 = atn2.decisionToState.map((ds, index) => new Ln.dfa.DFA(ds, index));
var sharedContextCache = new Ln.atn.PredictionContextCache();
var ElanParser = class _ElanParser extends Ln.Parser {
  static grammarFileName = "Elan.g4";
  static literalNames = [
    null,
    "'Func'",
    null,
    null,
    "'#'",
    "'abstract'",
    "'and'",
    "'as'",
    "'assert'",
    "'call'",
    "'case'",
    "'catch'",
    "'class'",
    "'constant'",
    "'constructor'",
    "'curry'",
    "'default'",
    "'div'",
    "'each'",
    "'else'",
    "'end'",
    "'enum'",
    "'for'",
    "'from'",
    "'function'",
    "'global'",
    "'if'",
    "'immutable'",
    "'import'",
    "'in'",
    "'inherits'",
    "'input'",
    "'lambda'",
    "'let'",
    "'library'",
    "'main'",
    "'mod'",
    "'new'",
    "'not'",
    "'of'",
    "'is'",
    "'or'",
    "'out'",
    "'package'",
    "'partial'",
    "'print'",
    "'private'",
    "'procedure'",
    "'property'",
    "'repeat'",
    "'return'",
    "'set'",
    "'step'",
    "'switch'",
    "'system'",
    "'test'",
    "'this'",
    "'throw'",
    "'to'",
    "'try'",
    "'var'",
    "'when'",
    "'while'",
    "'with'",
    "'xor'",
    null,
    null,
    "'Array'",
    "'List'",
    "'Dictionary'",
    "'Iter'",
    "'='",
    "'->'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'('",
    "')'",
    "'..'",
    "'.'",
    "','",
    "':'",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'^'",
    "'<'",
    "'>'",
    "'<='",
    "'>='"
  ];
  static symbolicNames = [
    null,
    null,
    "NL",
    "SINGLE_LINE_COMMENT",
    "COMMENT_MARKER",
    "ABSTRACT",
    "AND",
    "AS",
    "ASSERT",
    "CALL",
    "CASE",
    "CATCH",
    "CLASS",
    "CONSTANT",
    "CONSTRUCTOR",
    "CURRY",
    "DEFAULT",
    "DIV",
    "EACH",
    "ELSE",
    "END",
    "ENUM",
    "FOR",
    "FROM",
    "FUNCTION",
    "GLOBAL",
    "IF",
    "IMMUTABLE",
    "IMPORT",
    "IN",
    "INHERITS",
    "INPUT",
    "LAMBDA",
    "LET",
    "LIBRARY",
    "MAIN",
    "MOD",
    "NEW",
    "NOT",
    "OF",
    "IS",
    "OR",
    "OUT",
    "PACKAGE",
    "PARTIAL",
    "PRINT",
    "PRIVATE",
    "PROCEDURE",
    "PROPERTY",
    "REPEAT",
    "RETURN",
    "SET",
    "STEP",
    "SWITCH",
    "SYSTEM",
    "TEST",
    "THIS",
    "THROW",
    "TO",
    "TRY",
    "VAR",
    "WHEN",
    "WHILE",
    "WITH",
    "XOR",
    "BOOL_VALUE",
    "VALUE_TYPE",
    "ARRAY",
    "LIST",
    "DICTIONARY",
    "ITERABLE",
    "EQUALS",
    "ARROW",
    "OPEN_BRACE",
    "CLOSE_BRACE",
    "OPEN_SQ_BRACKET",
    "CLOSE_SQ_BRACKET",
    "OPEN_BRACKET",
    "CLOSE_BRACKET",
    "DOUBLE_DOT",
    "DOT",
    "COMMA",
    "COLON",
    "PLUS",
    "MINUS",
    "MULT",
    "DIVIDE",
    "POWER",
    "LT",
    "GT",
    "LE",
    "GE",
    "IS_NOT",
    "TYPENAME",
    "IDENTIFIER",
    "LITERAL_INTEGER",
    "LITERAL_FLOAT",
    "LITERAL_CHAR",
    "LITERAL_STRING",
    "WHITESPACES",
    "NEWLINE",
    "WS"
  ];
  static ruleNames = [
    "file",
    "importStatement",
    "namespace",
    "main",
    "test",
    "statementBlock",
    "testStatements",
    "assert",
    "callStatement",
    "throwException",
    "printStatement",
    "varDef",
    "assignment",
    "inlineAsignment",
    "assignableValue",
    "procedureCall",
    "functionCall",
    "systemCall",
    "input",
    "argument",
    "argumentList",
    "procedureDef",
    "procedureSignature",
    "procedureParameterList",
    "parameterList",
    "parameter",
    "procedureParameter",
    "functionDef",
    "functionSignature",
    "constantDef",
    "enumDef",
    "enumType",
    "enumValue",
    "classDef",
    "mutableClass",
    "abstractClass",
    "immutableClass",
    "abstractImmutableClass",
    "inherits",
    "property",
    "econstructor",
    "newInstance",
    "withClause",
    "proceduralControlFlow",
    "if",
    "for",
    "each",
    "while",
    "repeat",
    "try",
    "switch",
    "case",
    "caseDefault",
    "expression",
    "bracketedExpression",
    "ifExpression",
    "elseExpression",
    "lambda",
    "index",
    "range",
    "value",
    "scopeQualifier",
    "literal",
    "literalValue",
    "dataStructureDefinition",
    "literalDataStructure",
    "tupleDefinition",
    "literalTuple",
    "deconstructedTuple",
    "listDefinition",
    "literalList",
    "listDecomp",
    "arrayDefinition",
    "dictionaryDefinition",
    "literalDictionary",
    "kvp",
    "literalKvp",
    "unaryOp",
    "binaryOp",
    "arithmeticOp",
    "logicalOp",
    "conditionalOp",
    "type",
    "dataStructureType",
    "genericSpecifier",
    "tupleType",
    "typeList",
    "funcType"
  ];
  constructor(input) {
    super(input);
    this._interp = new Ln.atn.ParserATNSimulator(this, atn2, decisionsToDFA2, sharedContextCache);
    this.ruleNames = _ElanParser.ruleNames;
    this.literalNames = _ElanParser.literalNames;
    this.symbolicNames = _ElanParser.symbolicNames;
  }
  sempred(localctx, ruleIndex, predIndex) {
    switch (ruleIndex) {
      case 53:
        return this.expression_sempred(localctx, predIndex);
      default:
        throw "No predicate with index:" + ruleIndex;
    }
  }
  expression_sempred(localctx, predIndex) {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 7);
      case 1:
        return this.precpred(this._ctx, 6);
      case 2:
        return this.precpred(this._ctx, 11);
      case 3:
        return this.precpred(this._ctx, 10);
      case 4:
        return this.precpred(this._ctx, 9);
      case 5:
        return this.precpred(this._ctx, 4);
      case 6:
        return this.precpred(this._ctx, 3);
      default:
        throw "No predicate with index:" + predIndex;
    }
  }
  file() {
    let localctx = new FileContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, _ElanParser.RULE_file);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 186;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 184;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 0, this._ctx);
          switch (la_) {
            case 1:
              this.state = 176;
              this.main();
              break;
            case 2:
              this.state = 177;
              this.procedureDef();
              break;
            case 3:
              this.state = 178;
              this.functionDef();
              break;
            case 4:
              this.state = 179;
              this.constantDef();
              break;
            case 5:
              this.state = 180;
              this.enumDef();
              break;
            case 6:
              this.state = 181;
              this.classDef();
              break;
            case 7:
              this.state = 182;
              this.test();
              break;
            case 8:
              this.state = 183;
              this.importStatement();
              break;
          }
        }
        this.state = 188;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
      }
      this.state = 192;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 2) {
        this.state = 189;
        this.match(_ElanParser.NL);
        this.state = 194;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 195;
      this.match(_ElanParser.EOF);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  importStatement() {
    let localctx = new ImportStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, _ElanParser.RULE_importStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 197;
      this.match(_ElanParser.IMPORT);
      this.state = 198;
      this.namespace();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  namespace() {
    let localctx = new NamespaceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, _ElanParser.RULE_namespace);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 200;
      _la = this._input.LA(1);
      if (!(_la === 93 || _la === 94)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
      this.state = 205;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 201;
          this.match(_ElanParser.DOT);
          this.state = 202;
          _la = this._input.LA(1);
          if (!(_la === 93 || _la === 94)) {
            this._errHandler.recoverInline(this);
          } else {
            this._errHandler.reportMatch(this);
            this.consume();
          }
        }
        this.state = 207;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  main() {
    let localctx = new MainContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, _ElanParser.RULE_main);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 208;
      this.match(_ElanParser.NL);
      this.state = 209;
      this.match(_ElanParser.MAIN);
      this.state = 210;
      this.statementBlock();
      this.state = 211;
      this.match(_ElanParser.NL);
      this.state = 212;
      this.match(_ElanParser.END);
      this.state = 213;
      this.match(_ElanParser.MAIN);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  test() {
    let localctx = new TestContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, _ElanParser.RULE_test);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 215;
      this.match(_ElanParser.NL);
      this.state = 216;
      this.match(_ElanParser.TEST);
      this.state = 217;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 218;
      this.testStatements();
      this.state = 219;
      this.match(_ElanParser.NL);
      this.state = 220;
      this.match(_ElanParser.END);
      this.state = 221;
      this.match(_ElanParser.TEST);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  statementBlock() {
    let localctx = new StatementBlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, _ElanParser.RULE_statementBlock);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 231;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 229;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 4, this._ctx);
          switch (la_) {
            case 1:
              this.state = 223;
              this.varDef();
              break;
            case 2:
              this.state = 224;
              this.assignment();
              break;
            case 3:
              this.state = 225;
              this.proceduralControlFlow();
              break;
            case 4:
              this.state = 226;
              this.callStatement();
              break;
            case 5:
              this.state = 227;
              this.throwException();
              break;
            case 6:
              this.state = 228;
              this.printStatement();
              break;
          }
        }
        this.state = 233;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  testStatements() {
    let localctx = new TestStatementsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, _ElanParser.RULE_testStatements);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 239;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 237;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 6, this._ctx);
          switch (la_) {
            case 1:
              this.state = 234;
              this.assert();
              break;
            case 2:
              this.state = 235;
              this.varDef();
              break;
            case 3:
              this.state = 236;
              this.callStatement();
              break;
          }
        }
        this.state = 241;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  assert() {
    let localctx = new AssertContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, _ElanParser.RULE_assert);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 242;
      this.match(_ElanParser.NL);
      this.state = 243;
      this.match(_ElanParser.ASSERT);
      this.state = 244;
      this.expression(0);
      this.state = 245;
      this.match(_ElanParser.IS);
      this.state = 246;
      this.value();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  callStatement() {
    let localctx = new CallStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, _ElanParser.RULE_callStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 248;
      this.match(_ElanParser.NL);
      this.state = 249;
      this.match(_ElanParser.CALL);
      this.state = 255;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 8, this._ctx);
      switch (la_) {
        case 1:
          this.state = 250;
          this.procedureCall();
          break;
        case 2:
          this.state = 251;
          this.assignableValue();
          this.state = 252;
          this.match(_ElanParser.DOT);
          this.state = 253;
          this.procedureCall();
          break;
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  throwException() {
    let localctx = new ThrowExceptionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, _ElanParser.RULE_throwException);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 257;
      this.match(_ElanParser.NL);
      this.state = 258;
      this.match(_ElanParser.THROW);
      this.state = 259;
      _la = this._input.LA(1);
      if (!(_la === 94 || _la === 98)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  printStatement() {
    let localctx = new PrintStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, _ElanParser.RULE_printStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 261;
      this.match(_ElanParser.NL);
      this.state = 262;
      this.match(_ElanParser.PRINT);
      this.state = 264;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la & ~31) === 0 && (1 << _la & 2181103616) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2152743449) !== 0 || (_la - 67 & ~31) === 0 && (1 << _la - 67 & 4227990593) !== 0) {
        this.state = 263;
        this.expression(0);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  varDef() {
    let localctx = new VarDefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, _ElanParser.RULE_varDef);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 266;
      this.match(_ElanParser.NL);
      this.state = 267;
      this.match(_ElanParser.VAR);
      this.state = 268;
      this.assignableValue();
      this.state = 269;
      this.match(_ElanParser.SET);
      this.state = 270;
      this.match(_ElanParser.TO);
      this.state = 271;
      this.expression(0);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  assignment() {
    let localctx = new AssignmentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, _ElanParser.RULE_assignment);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 273;
      this.match(_ElanParser.NL);
      this.state = 274;
      this.match(_ElanParser.SET);
      this.state = 275;
      this.assignableValue();
      this.state = 276;
      this.match(_ElanParser.TO);
      this.state = 277;
      this.expression(0);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  inlineAsignment() {
    let localctx = new InlineAsignmentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, _ElanParser.RULE_inlineAsignment);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 279;
      this.assignableValue();
      this.state = 280;
      this.match(_ElanParser.SET);
      this.state = 281;
      this.match(_ElanParser.TO);
      this.state = 282;
      this.expression(0);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  assignableValue() {
    let localctx = new AssignableValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, _ElanParser.RULE_assignableValue);
    var _la = 0;
    try {
      this.state = 293;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 25:
        case 34:
        case 43:
        case 48:
        case 94:
          this.enterOuterAlt(localctx, 1);
          this.state = 285;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          if ((_la - 25 & ~31) === 0 && (1 << _la - 25 & 8651265) !== 0) {
            this.state = 284;
            this.scopeQualifier();
          }
          this.state = 287;
          this.match(_ElanParser.IDENTIFIER);
          this.state = 289;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          if (_la === 75) {
            this.state = 288;
            this.index();
          }
          break;
        case 77:
          this.enterOuterAlt(localctx, 2);
          this.state = 291;
          this.deconstructedTuple();
          break;
        case 73:
          this.enterOuterAlt(localctx, 3);
          this.state = 292;
          this.listDecomp();
          break;
        default:
          throw new Ln.error.NoViableAltException(this);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  procedureCall() {
    let localctx = new ProcedureCallContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, _ElanParser.RULE_procedureCall);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 296;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la - 25 & ~31) === 0 && (1 << _la - 25 & 8651265) !== 0) {
        this.state = 295;
        this.scopeQualifier();
      }
      this.state = 298;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 299;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 301;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la - 16 & ~31) === 0 && (1 << _la - 16 & 140870145) !== 0 || (_la - 48 & ~31) === 0 && (1 << _la - 48 & 571081025) !== 0 || (_la - 84 & ~31) === 0 && (1 << _la - 84 & 32257) !== 0) {
        this.state = 300;
        this.argumentList();
      }
      this.state = 303;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  functionCall() {
    let localctx = new FunctionCallContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, _ElanParser.RULE_functionCall);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 306;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la - 25 & ~31) === 0 && (1 << _la - 25 & 8651265) !== 0) {
        this.state = 305;
        this.scopeQualifier();
      }
      this.state = 308;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 309;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 311;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la - 16 & ~31) === 0 && (1 << _la - 16 & 140870145) !== 0 || (_la - 48 & ~31) === 0 && (1 << _la - 48 & 571081025) !== 0 || (_la - 84 & ~31) === 0 && (1 << _la - 84 & 32257) !== 0) {
        this.state = 310;
        this.argumentList();
      }
      this.state = 313;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  systemCall() {
    let localctx = new SystemCallContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, _ElanParser.RULE_systemCall);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 315;
      this.match(_ElanParser.SYSTEM);
      this.state = 316;
      this.match(_ElanParser.DOT);
      this.state = 317;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 318;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 320;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la - 16 & ~31) === 0 && (1 << _la - 16 & 140870145) !== 0 || (_la - 48 & ~31) === 0 && (1 << _la - 48 & 571081025) !== 0 || (_la - 84 & ~31) === 0 && (1 << _la - 84 & 32257) !== 0) {
        this.state = 319;
        this.argumentList();
      }
      this.state = 322;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  input() {
    let localctx = new InputContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, _ElanParser.RULE_input);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 324;
      this.match(_ElanParser.INPUT);
      this.state = 326;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 18, this._ctx);
      if (la_ === 1) {
        this.state = 325;
        this.match(_ElanParser.LITERAL_STRING);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  argument() {
    let localctx = new ArgumentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, _ElanParser.RULE_argument);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 330;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 16:
        case 25:
        case 31:
        case 34:
        case 37:
        case 38:
        case 43:
        case 48:
        case 54:
        case 56:
        case 65:
        case 67:
        case 73:
        case 77:
        case 84:
        case 93:
        case 94:
        case 95:
        case 96:
        case 97:
        case 98:
          this.state = 328;
          this.expression(0);
          break;
        case 32:
          this.state = 329;
          this.lambda();
          break;
        default:
          throw new Ln.error.NoViableAltException(this);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  argumentList() {
    let localctx = new ArgumentListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, _ElanParser.RULE_argumentList);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 332;
      this.argument();
      this.state = 337;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 333;
        this.match(_ElanParser.COMMA);
        this.state = 334;
        this.argument();
        this.state = 339;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  procedureDef() {
    let localctx = new ProcedureDefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, _ElanParser.RULE_procedureDef);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 340;
      this.match(_ElanParser.NL);
      this.state = 341;
      this.match(_ElanParser.PROCEDURE);
      this.state = 342;
      this.procedureSignature();
      this.state = 343;
      this.statementBlock();
      this.state = 344;
      this.match(_ElanParser.NL);
      this.state = 345;
      this.match(_ElanParser.END);
      this.state = 346;
      this.match(_ElanParser.PROCEDURE);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  procedureSignature() {
    let localctx = new ProcedureSignatureContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, _ElanParser.RULE_procedureSignature);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 348;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 349;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 351;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 42 || _la === 94) {
        this.state = 350;
        this.procedureParameterList();
      }
      this.state = 353;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  procedureParameterList() {
    let localctx = new ProcedureParameterListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, _ElanParser.RULE_procedureParameterList);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 355;
      this.procedureParameter();
      this.state = 360;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 356;
        this.match(_ElanParser.COMMA);
        this.state = 357;
        this.procedureParameter();
        this.state = 362;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  parameterList() {
    let localctx = new ParameterListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, _ElanParser.RULE_parameterList);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 363;
      this.parameter();
      this.state = 368;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 364;
        this.match(_ElanParser.COMMA);
        this.state = 365;
        this.parameter();
        this.state = 370;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  parameter() {
    let localctx = new ParameterContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, _ElanParser.RULE_parameter);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 371;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 372;
      this.type();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  procedureParameter() {
    let localctx = new ProcedureParameterContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, _ElanParser.RULE_procedureParameter);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 375;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 42) {
        this.state = 374;
        this.match(_ElanParser.OUT);
      }
      this.state = 377;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 378;
      this.type();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  functionDef() {
    let localctx = new FunctionDefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, _ElanParser.RULE_functionDef);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 380;
      this.match(_ElanParser.NL);
      this.state = 381;
      this.match(_ElanParser.FUNCTION);
      this.state = 382;
      this.functionSignature();
      this.state = 383;
      this.statementBlock();
      this.state = 384;
      this.match(_ElanParser.NL);
      this.state = 385;
      this.match(_ElanParser.RETURN);
      this.state = 388;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 25, this._ctx);
      switch (la_) {
        case 1:
          this.state = 386;
          this.expression(0);
          break;
        case 2:
          this.state = 387;
          this.match(_ElanParser.DEFAULT);
          break;
      }
      this.state = 390;
      this.match(_ElanParser.NL);
      this.state = 391;
      this.match(_ElanParser.END);
      this.state = 392;
      this.match(_ElanParser.FUNCTION);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  functionSignature() {
    let localctx = new FunctionSignatureContext(this, this._ctx, this.state);
    this.enterRule(localctx, 56, _ElanParser.RULE_functionSignature);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 394;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 395;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 397;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 94) {
        this.state = 396;
        this.parameterList();
      }
      this.state = 399;
      this.match(_ElanParser.CLOSE_BRACKET);
      this.state = 400;
      this.match(_ElanParser.AS);
      this.state = 401;
      this.type();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  constantDef() {
    let localctx = new ConstantDefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, _ElanParser.RULE_constantDef);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 403;
      this.match(_ElanParser.NL);
      this.state = 404;
      this.match(_ElanParser.CONSTANT);
      this.state = 405;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 406;
      this.match(_ElanParser.SET);
      this.state = 407;
      this.match(_ElanParser.TO);
      this.state = 410;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 65:
        case 73:
        case 77:
        case 93:
        case 95:
        case 96:
        case 97:
        case 98:
          this.state = 408;
          this.literal();
          break;
        case 37:
        case 94:
          this.state = 409;
          this.newInstance();
          break;
        default:
          throw new Ln.error.NoViableAltException(this);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  enumDef() {
    let localctx = new EnumDefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 60, _ElanParser.RULE_enumDef);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 412;
      this.match(_ElanParser.NL);
      this.state = 413;
      this.match(_ElanParser.ENUM);
      this.state = 414;
      this.enumType();
      this.state = 415;
      this.match(_ElanParser.NL);
      this.state = 416;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 421;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 417;
        this.match(_ElanParser.COMMA);
        this.state = 418;
        this.match(_ElanParser.IDENTIFIER);
        this.state = 423;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 424;
      this.match(_ElanParser.NL);
      this.state = 425;
      this.match(_ElanParser.END);
      this.state = 426;
      this.match(_ElanParser.ENUM);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  enumType() {
    let localctx = new EnumTypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 62, _ElanParser.RULE_enumType);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 428;
      this.match(_ElanParser.TYPENAME);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  enumValue() {
    let localctx = new EnumValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 64, _ElanParser.RULE_enumValue);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 430;
      this.enumType();
      this.state = 431;
      this.match(_ElanParser.DOT);
      this.state = 432;
      this.match(_ElanParser.IDENTIFIER);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  classDef() {
    let localctx = new ClassDefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 66, _ElanParser.RULE_classDef);
    try {
      this.state = 438;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 29, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 434;
          this.mutableClass();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 435;
          this.abstractClass();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 436;
          this.immutableClass();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 437;
          this.abstractImmutableClass();
          break;
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  mutableClass() {
    let localctx = new MutableClassContext(this, this._ctx, this.state);
    this.enterRule(localctx, 68, _ElanParser.RULE_mutableClass);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 440;
      this.match(_ElanParser.NL);
      this.state = 441;
      this.match(_ElanParser.CLASS);
      this.state = 442;
      this.match(_ElanParser.TYPENAME);
      this.state = 444;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 30) {
        this.state = 443;
        this.inherits();
      }
      this.state = 446;
      this.econstructor();
      this.state = 453;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 451;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 31, this._ctx);
          switch (la_) {
            case 1:
              this.state = 447;
              this.match(_ElanParser.NL);
              this.state = 448;
              this.property();
              break;
            case 2:
              this.state = 449;
              this.functionDef();
              break;
            case 3:
              this.state = 450;
              this.procedureDef();
              break;
          }
        }
        this.state = 455;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
      }
      this.state = 456;
      this.match(_ElanParser.NL);
      this.state = 457;
      this.match(_ElanParser.END);
      this.state = 458;
      this.match(_ElanParser.CLASS);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  abstractClass() {
    let localctx = new AbstractClassContext(this, this._ctx, this.state);
    this.enterRule(localctx, 70, _ElanParser.RULE_abstractClass);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 460;
      this.match(_ElanParser.NL);
      this.state = 461;
      this.match(_ElanParser.ABSTRACT);
      this.state = 462;
      this.match(_ElanParser.CLASS);
      this.state = 463;
      this.match(_ElanParser.TYPENAME);
      this.state = 465;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 30) {
        this.state = 464;
        this.inherits();
      }
      this.state = 480;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 35, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 478;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 34, this._ctx);
          switch (la_) {
            case 1:
              this.state = 467;
              this.match(_ElanParser.NL);
              this.state = 468;
              this.match(_ElanParser.ABSTRACT);
              this.state = 469;
              this.property();
              break;
            case 2:
              this.state = 470;
              this.match(_ElanParser.NL);
              this.state = 471;
              this.match(_ElanParser.ABSTRACT);
              this.state = 472;
              this.match(_ElanParser.FUNCTION);
              this.state = 473;
              this.functionSignature();
              break;
            case 3:
              this.state = 474;
              this.match(_ElanParser.NL);
              this.state = 475;
              this.match(_ElanParser.ABSTRACT);
              this.state = 476;
              this.match(_ElanParser.PROCEDURE);
              this.state = 477;
              this.procedureSignature();
              break;
          }
        }
        this.state = 482;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 35, this._ctx);
      }
      this.state = 483;
      this.match(_ElanParser.NL);
      this.state = 484;
      this.match(_ElanParser.END);
      this.state = 485;
      this.match(_ElanParser.CLASS);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  immutableClass() {
    let localctx = new ImmutableClassContext(this, this._ctx, this.state);
    this.enterRule(localctx, 72, _ElanParser.RULE_immutableClass);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 487;
      this.match(_ElanParser.NL);
      this.state = 488;
      this.match(_ElanParser.IMMUTABLE);
      this.state = 489;
      this.match(_ElanParser.CLASS);
      this.state = 490;
      this.match(_ElanParser.TYPENAME);
      this.state = 492;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 30) {
        this.state = 491;
        this.inherits();
      }
      this.state = 494;
      this.econstructor();
      this.state = 500;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 498;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 37, this._ctx);
          switch (la_) {
            case 1:
              this.state = 495;
              this.match(_ElanParser.NL);
              this.state = 496;
              this.property();
              break;
            case 2:
              this.state = 497;
              this.functionDef();
              break;
          }
        }
        this.state = 502;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
      }
      this.state = 503;
      this.match(_ElanParser.NL);
      this.state = 504;
      this.match(_ElanParser.END);
      this.state = 505;
      this.match(_ElanParser.CLASS);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  abstractImmutableClass() {
    let localctx = new AbstractImmutableClassContext(this, this._ctx, this.state);
    this.enterRule(localctx, 74, _ElanParser.RULE_abstractImmutableClass);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 507;
      this.match(_ElanParser.NL);
      this.state = 508;
      this.match(_ElanParser.ABSTRACT);
      this.state = 509;
      this.match(_ElanParser.IMMUTABLE);
      this.state = 510;
      this.match(_ElanParser.CLASS);
      this.state = 511;
      this.match(_ElanParser.TYPENAME);
      this.state = 513;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 30) {
        this.state = 512;
        this.inherits();
      }
      this.state = 524;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 522;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 40, this._ctx);
          switch (la_) {
            case 1:
              this.state = 515;
              this.match(_ElanParser.NL);
              this.state = 516;
              this.match(_ElanParser.ABSTRACT);
              this.state = 517;
              this.property();
              break;
            case 2:
              this.state = 518;
              this.match(_ElanParser.NL);
              this.state = 519;
              this.match(_ElanParser.ABSTRACT);
              this.state = 520;
              this.match(_ElanParser.FUNCTION);
              this.state = 521;
              this.functionSignature();
              break;
          }
        }
        this.state = 526;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
      }
      this.state = 527;
      this.match(_ElanParser.NL);
      this.state = 528;
      this.match(_ElanParser.END);
      this.state = 529;
      this.match(_ElanParser.CLASS);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  inherits() {
    let localctx = new InheritsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 76, _ElanParser.RULE_inherits);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 531;
      this.match(_ElanParser.INHERITS);
      this.state = 532;
      this.type();
      this.state = 537;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 533;
        this.match(_ElanParser.COMMA);
        this.state = 534;
        this.type();
        this.state = 539;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  property() {
    let localctx = new PropertyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 78, _ElanParser.RULE_property);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 541;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 46) {
        this.state = 540;
        this.match(_ElanParser.PRIVATE);
      }
      this.state = 543;
      this.match(_ElanParser.PROPERTY);
      this.state = 544;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 545;
      this.type();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  econstructor() {
    let localctx = new EconstructorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 80, _ElanParser.RULE_econstructor);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 547;
      this.match(_ElanParser.NL);
      this.state = 548;
      this.match(_ElanParser.CONSTRUCTOR);
      this.state = 549;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 551;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 94) {
        this.state = 550;
        this.parameterList();
      }
      this.state = 553;
      this.match(_ElanParser.CLOSE_BRACKET);
      this.state = 554;
      this.statementBlock();
      this.state = 555;
      this.match(_ElanParser.NL);
      this.state = 556;
      this.match(_ElanParser.END);
      this.state = 557;
      this.match(_ElanParser.CONSTRUCTOR);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  newInstance() {
    let localctx = new NewInstanceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 82, _ElanParser.RULE_newInstance);
    var _la = 0;
    try {
      this.state = 571;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 37:
          this.enterOuterAlt(localctx, 1);
          this.state = 559;
          this.match(_ElanParser.NEW);
          this.state = 560;
          this.type();
          this.state = 561;
          this.match(_ElanParser.OPEN_BRACKET);
          this.state = 563;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          if ((_la - 16 & ~31) === 0 && (1 << _la - 16 & 140870145) !== 0 || (_la - 48 & ~31) === 0 && (1 << _la - 48 & 571081025) !== 0 || (_la - 84 & ~31) === 0 && (1 << _la - 84 & 32257) !== 0) {
            this.state = 562;
            this.argumentList();
          }
          this.state = 565;
          this.match(_ElanParser.CLOSE_BRACKET);
          this.state = 567;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 46, this._ctx);
          if (la_ === 1) {
            this.state = 566;
            this.withClause();
          }
          break;
        case 94:
          this.enterOuterAlt(localctx, 2);
          this.state = 569;
          this.match(_ElanParser.IDENTIFIER);
          this.state = 570;
          this.withClause();
          break;
        default:
          throw new Ln.error.NoViableAltException(this);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  withClause() {
    let localctx = new WithClauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 84, _ElanParser.RULE_withClause);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 573;
      this.match(_ElanParser.WITH);
      this.state = 574;
      this.match(_ElanParser.OPEN_BRACE);
      this.state = 575;
      this.inlineAsignment();
      this.state = 580;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 576;
        this.match(_ElanParser.COMMA);
        this.state = 577;
        this.inlineAsignment();
        this.state = 582;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 583;
      this.match(_ElanParser.CLOSE_BRACE);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  proceduralControlFlow() {
    let localctx = new ProceduralControlFlowContext(this, this._ctx, this.state);
    this.enterRule(localctx, 86, _ElanParser.RULE_proceduralControlFlow);
    try {
      this.state = 592;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 49, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 585;
          this.if_();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 586;
          this.for_();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 587;
          this.each();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 588;
          this.while_();
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          this.state = 589;
          this.repeat();
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          this.state = 590;
          this.try_();
          break;
        case 7:
          this.enterOuterAlt(localctx, 7);
          this.state = 591;
          this.switch_();
          break;
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  if_() {
    let localctx = new IfContext(this, this._ctx, this.state);
    this.enterRule(localctx, 88, _ElanParser.RULE_if);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 594;
      this.match(_ElanParser.NL);
      this.state = 595;
      this.match(_ElanParser.IF);
      this.state = 596;
      this.expression(0);
      this.state = 597;
      this.statementBlock();
      this.state = 606;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 50, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 598;
          this.match(_ElanParser.NL);
          this.state = 599;
          this.match(_ElanParser.ELSE);
          this.state = 600;
          this.match(_ElanParser.IF);
          this.state = 601;
          this.expression(0);
          this.state = 602;
          this.statementBlock();
        }
        this.state = 608;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 50, this._ctx);
      }
      this.state = 612;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 51, this._ctx);
      if (la_ === 1) {
        this.state = 609;
        this.match(_ElanParser.NL);
        this.state = 610;
        this.match(_ElanParser.ELSE);
        this.state = 611;
        this.statementBlock();
      }
      this.state = 614;
      this.match(_ElanParser.NL);
      this.state = 615;
      this.match(_ElanParser.END);
      this.state = 616;
      this.match(_ElanParser.IF);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  for_() {
    let localctx = new ForContext(this, this._ctx, this.state);
    this.enterRule(localctx, 90, _ElanParser.RULE_for);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 618;
      this.match(_ElanParser.NL);
      this.state = 619;
      this.match(_ElanParser.FOR);
      this.state = 620;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 621;
      this.match(_ElanParser.FROM);
      this.state = 622;
      this.expression(0);
      this.state = 623;
      this.match(_ElanParser.TO);
      this.state = 624;
      this.expression(0);
      this.state = 630;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 52) {
        this.state = 625;
        this.match(_ElanParser.STEP);
        this.state = 627;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 84) {
          this.state = 626;
          this.match(_ElanParser.MINUS);
        }
        this.state = 629;
        this.match(_ElanParser.LITERAL_INTEGER);
      }
      this.state = 632;
      this.statementBlock();
      this.state = 633;
      this.match(_ElanParser.NL);
      this.state = 634;
      this.match(_ElanParser.END);
      this.state = 635;
      this.match(_ElanParser.FOR);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  each() {
    let localctx = new EachContext(this, this._ctx, this.state);
    this.enterRule(localctx, 92, _ElanParser.RULE_each);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 637;
      this.match(_ElanParser.NL);
      this.state = 638;
      this.match(_ElanParser.EACH);
      this.state = 639;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 640;
      this.match(_ElanParser.IN);
      this.state = 641;
      this.expression(0);
      this.state = 642;
      this.statementBlock();
      this.state = 643;
      this.match(_ElanParser.NL);
      this.state = 644;
      this.match(_ElanParser.END);
      this.state = 645;
      this.match(_ElanParser.EACH);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  while_() {
    let localctx = new WhileContext(this, this._ctx, this.state);
    this.enterRule(localctx, 94, _ElanParser.RULE_while);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 647;
      this.match(_ElanParser.NL);
      this.state = 648;
      this.match(_ElanParser.WHILE);
      this.state = 649;
      this.expression(0);
      this.state = 650;
      this.statementBlock();
      this.state = 651;
      this.match(_ElanParser.NL);
      this.state = 652;
      this.match(_ElanParser.END);
      this.state = 653;
      this.match(_ElanParser.WHILE);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  repeat() {
    let localctx = new RepeatContext(this, this._ctx, this.state);
    this.enterRule(localctx, 96, _ElanParser.RULE_repeat);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 655;
      this.match(_ElanParser.NL);
      this.state = 656;
      this.match(_ElanParser.REPEAT);
      this.state = 657;
      this.statementBlock();
      this.state = 658;
      this.match(_ElanParser.NL);
      this.state = 659;
      this.match(_ElanParser.END);
      this.state = 660;
      this.match(_ElanParser.REPEAT);
      this.state = 661;
      this.match(_ElanParser.WHEN);
      this.state = 662;
      this.expression(0);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  try_() {
    let localctx = new TryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 98, _ElanParser.RULE_try);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 664;
      this.match(_ElanParser.NL);
      this.state = 665;
      this.match(_ElanParser.TRY);
      this.state = 666;
      this.statementBlock();
      this.state = 667;
      this.match(_ElanParser.NL);
      this.state = 668;
      this.match(_ElanParser.CATCH);
      this.state = 669;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 670;
      this.statementBlock();
      this.state = 671;
      this.match(_ElanParser.NL);
      this.state = 672;
      this.match(_ElanParser.END);
      this.state = 673;
      this.match(_ElanParser.TRY);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  switch_() {
    let localctx = new SwitchContext(this, this._ctx, this.state);
    this.enterRule(localctx, 100, _ElanParser.RULE_switch);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 675;
      this.match(_ElanParser.NL);
      this.state = 676;
      this.match(_ElanParser.SWITCH);
      this.state = 677;
      this.expression(0);
      this.state = 679;
      this._errHandler.sync(this);
      var _alt = 1;
      do {
        switch (_alt) {
          case 1:
            this.state = 678;
            this.case_();
            break;
          default:
            throw new Ln.error.NoViableAltException(this);
        }
        this.state = 681;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 54, this._ctx);
      } while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER);
      this.state = 683;
      this.caseDefault();
      this.state = 684;
      this.match(_ElanParser.NL);
      this.state = 685;
      this.match(_ElanParser.END);
      this.state = 686;
      this.match(_ElanParser.SWITCH);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  case_() {
    let localctx = new CaseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 102, _ElanParser.RULE_case);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 688;
      this.match(_ElanParser.NL);
      this.state = 689;
      this.match(_ElanParser.CASE);
      this.state = 691;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 84) {
        this.state = 690;
        this.match(_ElanParser.MINUS);
      }
      this.state = 693;
      this.literalValue();
      this.state = 694;
      this.statementBlock();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  caseDefault() {
    let localctx = new CaseDefaultContext(this, this._ctx, this.state);
    this.enterRule(localctx, 104, _ElanParser.RULE_caseDefault);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 696;
      this.match(_ElanParser.NL);
      this.state = 697;
      this.match(_ElanParser.DEFAULT);
      this.state = 698;
      this.statementBlock();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  expression(_p) {
    if (_p === void 0) {
      _p = 0;
    }
    const _parentctx = this._ctx;
    const _parentState = this.state;
    let localctx = new ExpressionContext(this, this._ctx, _parentState);
    let _prevctx = localctx;
    const _startState = 106;
    this.enterRecursionRule(localctx, 106, _ElanParser.RULE_expression, _p);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 710;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 56, this._ctx);
      switch (la_) {
        case 1:
          this.state = 701;
          this.bracketedExpression();
          break;
        case 2:
          this.state = 702;
          this.functionCall();
          break;
        case 3:
          this.state = 703;
          this.value();
          break;
        case 4:
          this.state = 704;
          this.unaryOp();
          this.state = 705;
          this.expression(8);
          break;
        case 5:
          this.state = 707;
          this.newInstance();
          break;
        case 6:
          this.state = 708;
          this.input();
          break;
        case 7:
          this.state = 709;
          this.systemCall();
          break;
      }
      this._ctx.stop = this._input.LT(-1);
      this.state = 735;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 58, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          if (this._parseListeners !== null) {
            this.triggerExitRuleEvent();
          }
          _prevctx = localctx;
          this.state = 733;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 57, this._ctx);
          switch (la_) {
            case 1:
              localctx = new ExpressionContext(this, _parentctx, _parentState);
              this.pushNewRecursionContext(localctx, _startState, _ElanParser.RULE_expression);
              this.state = 712;
              if (!this.precpred(this._ctx, 7)) {
                throw new Ln.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
              }
              this.state = 713;
              this.match(_ElanParser.POWER);
              this.state = 714;
              this.expression(8);
              break;
            case 2:
              localctx = new ExpressionContext(this, _parentctx, _parentState);
              this.pushNewRecursionContext(localctx, _startState, _ElanParser.RULE_expression);
              this.state = 715;
              if (!this.precpred(this._ctx, 6)) {
                throw new Ln.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
              }
              this.state = 716;
              this.binaryOp();
              this.state = 717;
              this.expression(7);
              break;
            case 3:
              localctx = new ExpressionContext(this, _parentctx, _parentState);
              this.pushNewRecursionContext(localctx, _startState, _ElanParser.RULE_expression);
              this.state = 719;
              if (!this.precpred(this._ctx, 11)) {
                throw new Ln.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
              }
              this.state = 720;
              this.index();
              break;
            case 4:
              localctx = new ExpressionContext(this, _parentctx, _parentState);
              this.pushNewRecursionContext(localctx, _startState, _ElanParser.RULE_expression);
              this.state = 721;
              if (!this.precpred(this._ctx, 10)) {
                throw new Ln.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
              }
              this.state = 722;
              this.match(_ElanParser.DOT);
              this.state = 723;
              this.functionCall();
              break;
            case 5:
              localctx = new ExpressionContext(this, _parentctx, _parentState);
              this.pushNewRecursionContext(localctx, _startState, _ElanParser.RULE_expression);
              this.state = 724;
              if (!this.precpred(this._ctx, 9)) {
                throw new Ln.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
              }
              this.state = 725;
              this.match(_ElanParser.DOT);
              this.state = 726;
              this.match(_ElanParser.IDENTIFIER);
              break;
            case 6:
              localctx = new ExpressionContext(this, _parentctx, _parentState);
              this.pushNewRecursionContext(localctx, _startState, _ElanParser.RULE_expression);
              this.state = 727;
              if (!this.precpred(this._ctx, 4)) {
                throw new Ln.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
              }
              this.state = 728;
              this.ifExpression();
              this.state = 729;
              this.elseExpression();
              break;
            case 7:
              localctx = new ExpressionContext(this, _parentctx, _parentState);
              this.pushNewRecursionContext(localctx, _startState, _ElanParser.RULE_expression);
              this.state = 731;
              if (!this.precpred(this._ctx, 3)) {
                throw new Ln.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
              }
              this.state = 732;
              this.withClause();
              break;
          }
        }
        this.state = 737;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 58, this._ctx);
      }
    } catch (error) {
      if (error instanceof Ln.error.RecognitionException) {
        localctx.exception = error;
        this._errHandler.reportError(this, error);
        this._errHandler.recover(this, error);
      } else {
        throw error;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return localctx;
  }
  bracketedExpression() {
    let localctx = new BracketedExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 108, _ElanParser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 738;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 739;
      this.expression(0);
      this.state = 740;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  ifExpression() {
    let localctx = new IfExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 110, _ElanParser.RULE_ifExpression);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 742;
      this.match(_ElanParser.IF);
      this.state = 743;
      this.expression(0);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  elseExpression() {
    let localctx = new ElseExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 112, _ElanParser.RULE_elseExpression);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 745;
      this.match(_ElanParser.ELSE);
      this.state = 746;
      this.expression(0);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  lambda() {
    let localctx = new LambdaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 114, _ElanParser.RULE_lambda);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 748;
      this.match(_ElanParser.LAMBDA);
      this.state = 749;
      this.argumentList();
      this.state = 750;
      this.match(_ElanParser.ARROW);
      this.state = 751;
      this.expression(0);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  index() {
    let localctx = new IndexContext(this, this._ctx, this.state);
    this.enterRule(localctx, 116, _ElanParser.RULE_index);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 753;
      this.match(_ElanParser.OPEN_SQ_BRACKET);
      this.state = 760;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 59, this._ctx);
      switch (la_) {
        case 1:
          this.state = 754;
          this.expression(0);
          break;
        case 2:
          this.state = 755;
          this.expression(0);
          this.state = 756;
          this.match(_ElanParser.COMMA);
          this.state = 757;
          this.expression(0);
          break;
        case 3:
          this.state = 759;
          this.range();
          break;
      }
      this.state = 762;
      this.match(_ElanParser.CLOSE_SQ_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  range() {
    let localctx = new RangeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 118, _ElanParser.RULE_range);
    try {
      this.state = 773;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 60, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 764;
          this.expression(0);
          this.state = 765;
          this.match(_ElanParser.DOUBLE_DOT);
          this.state = 766;
          this.expression(0);
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 768;
          this.expression(0);
          this.state = 769;
          this.match(_ElanParser.DOUBLE_DOT);
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 771;
          this.match(_ElanParser.DOUBLE_DOT);
          this.state = 772;
          this.expression(0);
          break;
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  value() {
    let localctx = new ValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 120, _ElanParser.RULE_value);
    var _la = 0;
    try {
      this.state = 784;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 62, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 775;
          this.literal();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 777;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          if ((_la - 25 & ~31) === 0 && (1 << _la - 25 & 8651265) !== 0) {
            this.state = 776;
            this.scopeQualifier();
          }
          this.state = 779;
          this.match(_ElanParser.IDENTIFIER);
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 780;
          this.dataStructureDefinition();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 781;
          this.match(_ElanParser.THIS);
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          this.state = 782;
          this.match(_ElanParser.DEFAULT);
          this.state = 783;
          this.type();
          break;
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  scopeQualifier() {
    let localctx = new ScopeQualifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 122, _ElanParser.RULE_scopeQualifier);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 792;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 48:
          this.state = 786;
          this.match(_ElanParser.PROPERTY);
          break;
        case 25:
          this.state = 787;
          this.match(_ElanParser.GLOBAL);
          break;
        case 34:
          this.state = 788;
          this.match(_ElanParser.LIBRARY);
          break;
        case 43:
          this.state = 789;
          this.match(_ElanParser.PACKAGE);
          this.state = 790;
          this.match(_ElanParser.DOT);
          this.state = 791;
          this.namespace();
          break;
        default:
          throw new Ln.error.NoViableAltException(this);
      }
      this.state = 794;
      this.match(_ElanParser.DOT);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  literal() {
    let localctx = new LiteralContext(this, this._ctx, this.state);
    this.enterRule(localctx, 124, _ElanParser.RULE_literal);
    try {
      this.state = 798;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 65:
        case 93:
        case 95:
        case 96:
        case 97:
          this.enterOuterAlt(localctx, 1);
          this.state = 796;
          this.literalValue();
          break;
        case 73:
        case 77:
        case 98:
          this.enterOuterAlt(localctx, 2);
          this.state = 797;
          this.literalDataStructure();
          break;
        default:
          throw new Ln.error.NoViableAltException(this);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  literalValue() {
    let localctx = new LiteralValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 126, _ElanParser.RULE_literalValue);
    try {
      this.state = 805;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 65:
          this.enterOuterAlt(localctx, 1);
          this.state = 800;
          this.match(_ElanParser.BOOL_VALUE);
          break;
        case 95:
          this.enterOuterAlt(localctx, 2);
          this.state = 801;
          this.match(_ElanParser.LITERAL_INTEGER);
          break;
        case 96:
          this.enterOuterAlt(localctx, 3);
          this.state = 802;
          this.match(_ElanParser.LITERAL_FLOAT);
          break;
        case 97:
          this.enterOuterAlt(localctx, 4);
          this.state = 803;
          this.match(_ElanParser.LITERAL_CHAR);
          break;
        case 93:
          this.enterOuterAlt(localctx, 5);
          this.state = 804;
          this.enumValue();
          break;
        default:
          throw new Ln.error.NoViableAltException(this);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  dataStructureDefinition() {
    let localctx = new DataStructureDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 128, _ElanParser.RULE_dataStructureDefinition);
    try {
      this.state = 811;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 66, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 807;
          this.listDefinition();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 808;
          this.arrayDefinition();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 809;
          this.tupleDefinition();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 810;
          this.dictionaryDefinition();
          break;
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  literalDataStructure() {
    let localctx = new LiteralDataStructureContext(this, this._ctx, this.state);
    this.enterRule(localctx, 130, _ElanParser.RULE_literalDataStructure);
    try {
      this.state = 817;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 67, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 813;
          this.match(_ElanParser.LITERAL_STRING);
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 814;
          this.literalTuple();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 815;
          this.literalList();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 816;
          this.literalDictionary();
          break;
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  tupleDefinition() {
    let localctx = new TupleDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 132, _ElanParser.RULE_tupleDefinition);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 819;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 820;
      this.expression(0);
      this.state = 821;
      this.match(_ElanParser.COMMA);
      this.state = 822;
      this.expression(0);
      this.state = 827;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 823;
        this.match(_ElanParser.COMMA);
        this.state = 824;
        this.expression(0);
        this.state = 829;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 830;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  literalTuple() {
    let localctx = new LiteralTupleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 134, _ElanParser.RULE_literalTuple);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 832;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 833;
      this.literal();
      this.state = 834;
      this.match(_ElanParser.COMMA);
      this.state = 835;
      this.literal();
      this.state = 840;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 836;
        this.match(_ElanParser.COMMA);
        this.state = 837;
        this.literal();
        this.state = 842;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 843;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  deconstructedTuple() {
    let localctx = new DeconstructedTupleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 136, _ElanParser.RULE_deconstructedTuple);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 845;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 846;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 849;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        this.state = 847;
        this.match(_ElanParser.COMMA);
        this.state = 848;
        this.match(_ElanParser.IDENTIFIER);
        this.state = 851;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while (_la === 81);
      this.state = 853;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  listDefinition() {
    let localctx = new ListDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 138, _ElanParser.RULE_listDefinition);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 855;
      this.match(_ElanParser.OPEN_BRACE);
      this.state = 856;
      this.expression(0);
      this.state = 861;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 857;
        this.match(_ElanParser.COMMA);
        this.state = 858;
        this.expression(0);
        this.state = 863;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 864;
      this.match(_ElanParser.CLOSE_BRACE);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  literalList() {
    let localctx = new LiteralListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 140, _ElanParser.RULE_literalList);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 866;
      this.match(_ElanParser.OPEN_BRACE);
      this.state = 867;
      this.literal();
      this.state = 872;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 868;
        this.match(_ElanParser.COMMA);
        this.state = 869;
        this.literal();
        this.state = 874;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 875;
      this.match(_ElanParser.CLOSE_BRACE);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  listDecomp() {
    let localctx = new ListDecompContext(this, this._ctx, this.state);
    this.enterRule(localctx, 142, _ElanParser.RULE_listDecomp);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 877;
      this.match(_ElanParser.OPEN_BRACE);
      this.state = 878;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 879;
      this.match(_ElanParser.COLON);
      this.state = 880;
      this.match(_ElanParser.IDENTIFIER);
      this.state = 881;
      this.match(_ElanParser.CLOSE_BRACE);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  arrayDefinition() {
    let localctx = new ArrayDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 144, _ElanParser.RULE_arrayDefinition);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 883;
      this.match(_ElanParser.ARRAY);
      this.state = 884;
      this.genericSpecifier();
      this.state = 885;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 887;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 95) {
        this.state = 886;
        this.match(_ElanParser.LITERAL_INTEGER);
      }
      this.state = 889;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  dictionaryDefinition() {
    let localctx = new DictionaryDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 146, _ElanParser.RULE_dictionaryDefinition);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 891;
      this.match(_ElanParser.OPEN_BRACE);
      this.state = 892;
      this.kvp();
      this.state = 897;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 893;
        this.match(_ElanParser.COMMA);
        this.state = 894;
        this.kvp();
        this.state = 899;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 900;
      this.match(_ElanParser.CLOSE_BRACE);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  literalDictionary() {
    let localctx = new LiteralDictionaryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 148, _ElanParser.RULE_literalDictionary);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 902;
      this.match(_ElanParser.OPEN_BRACE);
      this.state = 903;
      this.literalKvp();
      this.state = 908;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 904;
        this.match(_ElanParser.COMMA);
        this.state = 905;
        this.literalKvp();
        this.state = 910;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 911;
      this.match(_ElanParser.CLOSE_BRACE);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  kvp() {
    let localctx = new KvpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 150, _ElanParser.RULE_kvp);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 913;
      this.expression(0);
      this.state = 914;
      this.match(_ElanParser.COLON);
      this.state = 915;
      this.expression(0);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  literalKvp() {
    let localctx = new LiteralKvpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 152, _ElanParser.RULE_literalKvp);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 917;
      this.literal();
      this.state = 918;
      this.match(_ElanParser.COLON);
      this.state = 919;
      this.literal();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  unaryOp() {
    let localctx = new UnaryOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 154, _ElanParser.RULE_unaryOp);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 921;
      _la = this._input.LA(1);
      if (!(_la === 38 || _la === 84)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  binaryOp() {
    let localctx = new BinaryOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 156, _ElanParser.RULE_binaryOp);
    try {
      this.state = 926;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 17:
        case 36:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
          this.enterOuterAlt(localctx, 1);
          this.state = 923;
          this.arithmeticOp();
          break;
        case 6:
        case 41:
        case 64:
          this.enterOuterAlt(localctx, 2);
          this.state = 924;
          this.logicalOp();
          break;
        case 40:
        case 88:
        case 89:
        case 90:
        case 91:
        case 92:
          this.enterOuterAlt(localctx, 3);
          this.state = 925;
          this.conditionalOp();
          break;
        default:
          throw new Ln.error.NoViableAltException(this);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  arithmeticOp() {
    let localctx = new ArithmeticOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 158, _ElanParser.RULE_arithmeticOp);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 928;
      _la = this._input.LA(1);
      if (!(_la === 17 || _la === 36 || (_la - 83 & ~31) === 0 && (1 << _la - 83 & 31) !== 0)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  logicalOp() {
    let localctx = new LogicalOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 160, _ElanParser.RULE_logicalOp);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 930;
      _la = this._input.LA(1);
      if (!(_la === 6 || _la === 41 || _la === 64)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  conditionalOp() {
    let localctx = new ConditionalOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 162, _ElanParser.RULE_conditionalOp);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 932;
      _la = this._input.LA(1);
      if (!(_la === 40 || (_la - 88 & ~31) === 0 && (1 << _la - 88 & 31) !== 0)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  type() {
    let localctx = new TypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 164, _ElanParser.RULE_type);
    try {
      this.state = 940;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 77, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 934;
          this.match(_ElanParser.VALUE_TYPE);
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 935;
          this.match(_ElanParser.TYPENAME);
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 936;
          this.match(_ElanParser.TYPENAME);
          this.state = 937;
          this.genericSpecifier();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 938;
          this.tupleType();
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          this.state = 939;
          this.funcType();
          break;
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  dataStructureType() {
    let localctx = new DataStructureTypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 166, _ElanParser.RULE_dataStructureType);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 942;
      _la = this._input.LA(1);
      if (!((_la - 67 & ~31) === 0 && (1 << _la - 67 & 15) !== 0)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
      this.state = 943;
      this.genericSpecifier();
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  genericSpecifier() {
    let localctx = new GenericSpecifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 168, _ElanParser.RULE_genericSpecifier);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 945;
      this.match(_ElanParser.LT);
      this.state = 946;
      this.match(_ElanParser.OF);
      this.state = 947;
      this.type();
      this.state = 952;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 948;
        this.match(_ElanParser.COMMA);
        this.state = 949;
        this.type();
        this.state = 954;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 955;
      this.match(_ElanParser.GT);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  tupleType() {
    let localctx = new TupleTypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 170, _ElanParser.RULE_tupleType);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 957;
      this.match(_ElanParser.OPEN_BRACKET);
      this.state = 958;
      this.type();
      this.state = 961;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        this.state = 959;
        this.match(_ElanParser.COMMA);
        this.state = 960;
        this.type();
        this.state = 963;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while (_la === 81);
      this.state = 965;
      this.match(_ElanParser.CLOSE_BRACKET);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  typeList() {
    let localctx = new TypeListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 172, _ElanParser.RULE_typeList);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 967;
      this.type();
      this.state = 972;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 81) {
        this.state = 968;
        this.match(_ElanParser.COMMA);
        this.state = 969;
        this.type();
        this.state = 974;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  funcType() {
    let localctx = new FuncTypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 174, _ElanParser.RULE_funcType);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 975;
      this.match(_ElanParser.T__0);
      this.state = 976;
      this.match(_ElanParser.LT);
      this.state = 977;
      this.match(_ElanParser.OF);
      this.state = 978;
      this.typeList();
      this.state = 979;
      this.match(_ElanParser.ARROW);
      this.state = 980;
      this.type();
      this.state = 981;
      this.match(_ElanParser.GT);
    } catch (re2) {
      if (re2 instanceof Ln.error.RecognitionException) {
        localctx.exception = re2;
        this._errHandler.reportError(this, re2);
        this._errHandler.recover(this, re2);
      } else {
        throw re2;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
};
ElanParser.EOF = Ln.Token.EOF;
ElanParser.T__0 = 1;
ElanParser.NL = 2;
ElanParser.SINGLE_LINE_COMMENT = 3;
ElanParser.COMMENT_MARKER = 4;
ElanParser.ABSTRACT = 5;
ElanParser.AND = 6;
ElanParser.AS = 7;
ElanParser.ASSERT = 8;
ElanParser.CALL = 9;
ElanParser.CASE = 10;
ElanParser.CATCH = 11;
ElanParser.CLASS = 12;
ElanParser.CONSTANT = 13;
ElanParser.CONSTRUCTOR = 14;
ElanParser.CURRY = 15;
ElanParser.DEFAULT = 16;
ElanParser.DIV = 17;
ElanParser.EACH = 18;
ElanParser.ELSE = 19;
ElanParser.END = 20;
ElanParser.ENUM = 21;
ElanParser.FOR = 22;
ElanParser.FROM = 23;
ElanParser.FUNCTION = 24;
ElanParser.GLOBAL = 25;
ElanParser.IF = 26;
ElanParser.IMMUTABLE = 27;
ElanParser.IMPORT = 28;
ElanParser.IN = 29;
ElanParser.INHERITS = 30;
ElanParser.INPUT = 31;
ElanParser.LAMBDA = 32;
ElanParser.LET = 33;
ElanParser.LIBRARY = 34;
ElanParser.MAIN = 35;
ElanParser.MOD = 36;
ElanParser.NEW = 37;
ElanParser.NOT = 38;
ElanParser.OF = 39;
ElanParser.IS = 40;
ElanParser.OR = 41;
ElanParser.OUT = 42;
ElanParser.PACKAGE = 43;
ElanParser.PARTIAL = 44;
ElanParser.PRINT = 45;
ElanParser.PRIVATE = 46;
ElanParser.PROCEDURE = 47;
ElanParser.PROPERTY = 48;
ElanParser.REPEAT = 49;
ElanParser.RETURN = 50;
ElanParser.SET = 51;
ElanParser.STEP = 52;
ElanParser.SWITCH = 53;
ElanParser.SYSTEM = 54;
ElanParser.TEST = 55;
ElanParser.THIS = 56;
ElanParser.THROW = 57;
ElanParser.TO = 58;
ElanParser.TRY = 59;
ElanParser.VAR = 60;
ElanParser.WHEN = 61;
ElanParser.WHILE = 62;
ElanParser.WITH = 63;
ElanParser.XOR = 64;
ElanParser.BOOL_VALUE = 65;
ElanParser.VALUE_TYPE = 66;
ElanParser.ARRAY = 67;
ElanParser.LIST = 68;
ElanParser.DICTIONARY = 69;
ElanParser.ITERABLE = 70;
ElanParser.EQUALS = 71;
ElanParser.ARROW = 72;
ElanParser.OPEN_BRACE = 73;
ElanParser.CLOSE_BRACE = 74;
ElanParser.OPEN_SQ_BRACKET = 75;
ElanParser.CLOSE_SQ_BRACKET = 76;
ElanParser.OPEN_BRACKET = 77;
ElanParser.CLOSE_BRACKET = 78;
ElanParser.DOUBLE_DOT = 79;
ElanParser.DOT = 80;
ElanParser.COMMA = 81;
ElanParser.COLON = 82;
ElanParser.PLUS = 83;
ElanParser.MINUS = 84;
ElanParser.MULT = 85;
ElanParser.DIVIDE = 86;
ElanParser.POWER = 87;
ElanParser.LT = 88;
ElanParser.GT = 89;
ElanParser.LE = 90;
ElanParser.GE = 91;
ElanParser.IS_NOT = 92;
ElanParser.TYPENAME = 93;
ElanParser.IDENTIFIER = 94;
ElanParser.LITERAL_INTEGER = 95;
ElanParser.LITERAL_FLOAT = 96;
ElanParser.LITERAL_CHAR = 97;
ElanParser.LITERAL_STRING = 98;
ElanParser.WHITESPACES = 99;
ElanParser.NEWLINE = 100;
ElanParser.WS = 101;
ElanParser.RULE_file = 0;
ElanParser.RULE_importStatement = 1;
ElanParser.RULE_namespace = 2;
ElanParser.RULE_main = 3;
ElanParser.RULE_test = 4;
ElanParser.RULE_statementBlock = 5;
ElanParser.RULE_testStatements = 6;
ElanParser.RULE_assert = 7;
ElanParser.RULE_callStatement = 8;
ElanParser.RULE_throwException = 9;
ElanParser.RULE_printStatement = 10;
ElanParser.RULE_varDef = 11;
ElanParser.RULE_assignment = 12;
ElanParser.RULE_inlineAsignment = 13;
ElanParser.RULE_assignableValue = 14;
ElanParser.RULE_procedureCall = 15;
ElanParser.RULE_functionCall = 16;
ElanParser.RULE_systemCall = 17;
ElanParser.RULE_input = 18;
ElanParser.RULE_argument = 19;
ElanParser.RULE_argumentList = 20;
ElanParser.RULE_procedureDef = 21;
ElanParser.RULE_procedureSignature = 22;
ElanParser.RULE_procedureParameterList = 23;
ElanParser.RULE_parameterList = 24;
ElanParser.RULE_parameter = 25;
ElanParser.RULE_procedureParameter = 26;
ElanParser.RULE_functionDef = 27;
ElanParser.RULE_functionSignature = 28;
ElanParser.RULE_constantDef = 29;
ElanParser.RULE_enumDef = 30;
ElanParser.RULE_enumType = 31;
ElanParser.RULE_enumValue = 32;
ElanParser.RULE_classDef = 33;
ElanParser.RULE_mutableClass = 34;
ElanParser.RULE_abstractClass = 35;
ElanParser.RULE_immutableClass = 36;
ElanParser.RULE_abstractImmutableClass = 37;
ElanParser.RULE_inherits = 38;
ElanParser.RULE_property = 39;
ElanParser.RULE_econstructor = 40;
ElanParser.RULE_newInstance = 41;
ElanParser.RULE_withClause = 42;
ElanParser.RULE_proceduralControlFlow = 43;
ElanParser.RULE_if = 44;
ElanParser.RULE_for = 45;
ElanParser.RULE_each = 46;
ElanParser.RULE_while = 47;
ElanParser.RULE_repeat = 48;
ElanParser.RULE_try = 49;
ElanParser.RULE_switch = 50;
ElanParser.RULE_case = 51;
ElanParser.RULE_caseDefault = 52;
ElanParser.RULE_expression = 53;
ElanParser.RULE_bracketedExpression = 54;
ElanParser.RULE_ifExpression = 55;
ElanParser.RULE_elseExpression = 56;
ElanParser.RULE_lambda = 57;
ElanParser.RULE_index = 58;
ElanParser.RULE_range = 59;
ElanParser.RULE_value = 60;
ElanParser.RULE_scopeQualifier = 61;
ElanParser.RULE_literal = 62;
ElanParser.RULE_literalValue = 63;
ElanParser.RULE_dataStructureDefinition = 64;
ElanParser.RULE_literalDataStructure = 65;
ElanParser.RULE_tupleDefinition = 66;
ElanParser.RULE_literalTuple = 67;
ElanParser.RULE_deconstructedTuple = 68;
ElanParser.RULE_listDefinition = 69;
ElanParser.RULE_literalList = 70;
ElanParser.RULE_listDecomp = 71;
ElanParser.RULE_arrayDefinition = 72;
ElanParser.RULE_dictionaryDefinition = 73;
ElanParser.RULE_literalDictionary = 74;
ElanParser.RULE_kvp = 75;
ElanParser.RULE_literalKvp = 76;
ElanParser.RULE_unaryOp = 77;
ElanParser.RULE_binaryOp = 78;
ElanParser.RULE_arithmeticOp = 79;
ElanParser.RULE_logicalOp = 80;
ElanParser.RULE_conditionalOp = 81;
ElanParser.RULE_type = 82;
ElanParser.RULE_dataStructureType = 83;
ElanParser.RULE_genericSpecifier = 84;
ElanParser.RULE_tupleType = 85;
ElanParser.RULE_typeList = 86;
ElanParser.RULE_funcType = 87;
var FileContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_file;
  }
  EOF() {
    return this.getToken(ElanParser.EOF, 0);
  }
  main = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(MainContext);
    } else {
      return this.getTypedRuleContext(MainContext, i2);
    }
  };
  procedureDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ProcedureDefContext);
    } else {
      return this.getTypedRuleContext(ProcedureDefContext, i2);
    }
  };
  functionDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(FunctionDefContext);
    } else {
      return this.getTypedRuleContext(FunctionDefContext, i2);
    }
  };
  constantDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ConstantDefContext);
    } else {
      return this.getTypedRuleContext(ConstantDefContext, i2);
    }
  };
  enumDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(EnumDefContext);
    } else {
      return this.getTypedRuleContext(EnumDefContext, i2);
    }
  };
  classDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ClassDefContext);
    } else {
      return this.getTypedRuleContext(ClassDefContext, i2);
    }
  };
  test = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(TestContext);
    } else {
      return this.getTypedRuleContext(TestContext, i2);
    }
  };
  importStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ImportStatementContext);
    } else {
      return this.getTypedRuleContext(ImportStatementContext, i2);
    }
  };
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterFile(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitFile(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitFile(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ImportStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_importStatement;
  }
  IMPORT() {
    return this.getToken(ElanParser.IMPORT, 0);
  }
  namespace() {
    return this.getTypedRuleContext(NamespaceContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterImportStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitImportStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitImportStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var NamespaceContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_namespace;
  }
  TYPENAME = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.TYPENAME);
    } else {
      return this.getToken(ElanParser.TYPENAME, i2);
    }
  };
  IDENTIFIER = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.IDENTIFIER);
    } else {
      return this.getToken(ElanParser.IDENTIFIER, i2);
    }
  };
  DOT = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.DOT);
    } else {
      return this.getToken(ElanParser.DOT, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterNamespace(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitNamespace(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitNamespace(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var MainContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_main;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  MAIN = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.MAIN);
    } else {
      return this.getToken(ElanParser.MAIN, i2);
    }
  };
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterMain(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitMain(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitMain(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TestContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_test;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  TEST = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.TEST);
    } else {
      return this.getToken(ElanParser.TEST, i2);
    }
  };
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  testStatements() {
    return this.getTypedRuleContext(TestStatementsContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterTest(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitTest(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitTest(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var StatementBlockContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_statementBlock;
  }
  varDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(VarDefContext);
    } else {
      return this.getTypedRuleContext(VarDefContext, i2);
    }
  };
  assignment = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(AssignmentContext);
    } else {
      return this.getTypedRuleContext(AssignmentContext, i2);
    }
  };
  proceduralControlFlow = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ProceduralControlFlowContext);
    } else {
      return this.getTypedRuleContext(ProceduralControlFlowContext, i2);
    }
  };
  callStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(CallStatementContext);
    } else {
      return this.getTypedRuleContext(CallStatementContext, i2);
    }
  };
  throwException = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ThrowExceptionContext);
    } else {
      return this.getTypedRuleContext(ThrowExceptionContext, i2);
    }
  };
  printStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(PrintStatementContext);
    } else {
      return this.getTypedRuleContext(PrintStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterStatementBlock(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitStatementBlock(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitStatementBlock(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TestStatementsContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_testStatements;
  }
  assert = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(AssertContext);
    } else {
      return this.getTypedRuleContext(AssertContext, i2);
    }
  };
  varDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(VarDefContext);
    } else {
      return this.getTypedRuleContext(VarDefContext, i2);
    }
  };
  callStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(CallStatementContext);
    } else {
      return this.getTypedRuleContext(CallStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterTestStatements(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitTestStatements(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitTestStatements(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AssertContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_assert;
  }
  NL() {
    return this.getToken(ElanParser.NL, 0);
  }
  ASSERT() {
    return this.getToken(ElanParser.ASSERT, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  IS() {
    return this.getToken(ElanParser.IS, 0);
  }
  value() {
    return this.getTypedRuleContext(ValueContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterAssert(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitAssert(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitAssert(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CallStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_callStatement;
  }
  NL() {
    return this.getToken(ElanParser.NL, 0);
  }
  CALL() {
    return this.getToken(ElanParser.CALL, 0);
  }
  procedureCall() {
    return this.getTypedRuleContext(ProcedureCallContext, 0);
  }
  assignableValue() {
    return this.getTypedRuleContext(AssignableValueContext, 0);
  }
  DOT() {
    return this.getToken(ElanParser.DOT, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterCallStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitCallStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitCallStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ThrowExceptionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_throwException;
  }
  NL() {
    return this.getToken(ElanParser.NL, 0);
  }
  THROW() {
    return this.getToken(ElanParser.THROW, 0);
  }
  LITERAL_STRING() {
    return this.getToken(ElanParser.LITERAL_STRING, 0);
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterThrowException(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitThrowException(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitThrowException(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var PrintStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_printStatement;
  }
  NL() {
    return this.getToken(ElanParser.NL, 0);
  }
  PRINT() {
    return this.getToken(ElanParser.PRINT, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterPrintStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitPrintStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitPrintStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var VarDefContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_varDef;
  }
  NL() {
    return this.getToken(ElanParser.NL, 0);
  }
  VAR() {
    return this.getToken(ElanParser.VAR, 0);
  }
  assignableValue() {
    return this.getTypedRuleContext(AssignableValueContext, 0);
  }
  SET() {
    return this.getToken(ElanParser.SET, 0);
  }
  TO() {
    return this.getToken(ElanParser.TO, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterVarDef(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitVarDef(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitVarDef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AssignmentContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_assignment;
  }
  NL() {
    return this.getToken(ElanParser.NL, 0);
  }
  SET() {
    return this.getToken(ElanParser.SET, 0);
  }
  assignableValue() {
    return this.getTypedRuleContext(AssignableValueContext, 0);
  }
  TO() {
    return this.getToken(ElanParser.TO, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterAssignment(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitAssignment(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitAssignment(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var InlineAsignmentContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_inlineAsignment;
  }
  assignableValue() {
    return this.getTypedRuleContext(AssignableValueContext, 0);
  }
  SET() {
    return this.getToken(ElanParser.SET, 0);
  }
  TO() {
    return this.getToken(ElanParser.TO, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterInlineAsignment(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitInlineAsignment(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitInlineAsignment(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AssignableValueContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_assignableValue;
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  scopeQualifier() {
    return this.getTypedRuleContext(ScopeQualifierContext, 0);
  }
  index() {
    return this.getTypedRuleContext(IndexContext, 0);
  }
  deconstructedTuple() {
    return this.getTypedRuleContext(DeconstructedTupleContext, 0);
  }
  listDecomp() {
    return this.getTypedRuleContext(ListDecompContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterAssignableValue(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitAssignableValue(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitAssignableValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureCallContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_procedureCall;
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  scopeQualifier() {
    return this.getTypedRuleContext(ScopeQualifierContext, 0);
  }
  argumentList() {
    return this.getTypedRuleContext(ArgumentListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterProcedureCall(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitProcedureCall(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitProcedureCall(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionCallContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_functionCall;
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  scopeQualifier() {
    return this.getTypedRuleContext(ScopeQualifierContext, 0);
  }
  argumentList() {
    return this.getTypedRuleContext(ArgumentListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterFunctionCall(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitFunctionCall(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitFunctionCall(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var SystemCallContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_systemCall;
  }
  SYSTEM() {
    return this.getToken(ElanParser.SYSTEM, 0);
  }
  DOT() {
    return this.getToken(ElanParser.DOT, 0);
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  argumentList() {
    return this.getTypedRuleContext(ArgumentListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterSystemCall(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitSystemCall(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitSystemCall(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var InputContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_input;
  }
  INPUT() {
    return this.getToken(ElanParser.INPUT, 0);
  }
  LITERAL_STRING() {
    return this.getToken(ElanParser.LITERAL_STRING, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterInput(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitInput(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitInput(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ArgumentContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_argument;
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  lambda() {
    return this.getTypedRuleContext(LambdaContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterArgument(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitArgument(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitArgument(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ArgumentListContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_argumentList;
  }
  argument = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ArgumentContext);
    } else {
      return this.getTypedRuleContext(ArgumentContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterArgumentList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitArgumentList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitArgumentList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureDefContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_procedureDef;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  PROCEDURE = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.PROCEDURE);
    } else {
      return this.getToken(ElanParser.PROCEDURE, i2);
    }
  };
  procedureSignature() {
    return this.getTypedRuleContext(ProcedureSignatureContext, 0);
  }
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterProcedureDef(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitProcedureDef(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitProcedureDef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureSignatureContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_procedureSignature;
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  procedureParameterList() {
    return this.getTypedRuleContext(ProcedureParameterListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterProcedureSignature(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitProcedureSignature(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitProcedureSignature(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureParameterListContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_procedureParameterList;
  }
  procedureParameter = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ProcedureParameterContext);
    } else {
      return this.getTypedRuleContext(ProcedureParameterContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterProcedureParameterList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitProcedureParameterList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitProcedureParameterList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ParameterListContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_parameterList;
  }
  parameter = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ParameterContext);
    } else {
      return this.getTypedRuleContext(ParameterContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterParameterList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitParameterList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitParameterList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ParameterContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_parameter;
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterParameter(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitParameter(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitParameter(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureParameterContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_procedureParameter;
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  OUT() {
    return this.getToken(ElanParser.OUT, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterProcedureParameter(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitProcedureParameter(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitProcedureParameter(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionDefContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_functionDef;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  FUNCTION = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.FUNCTION);
    } else {
      return this.getToken(ElanParser.FUNCTION, i2);
    }
  };
  functionSignature() {
    return this.getTypedRuleContext(FunctionSignatureContext, 0);
  }
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  RETURN() {
    return this.getToken(ElanParser.RETURN, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  DEFAULT() {
    return this.getToken(ElanParser.DEFAULT, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterFunctionDef(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitFunctionDef(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitFunctionDef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionSignatureContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_functionSignature;
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  AS() {
    return this.getToken(ElanParser.AS, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  parameterList() {
    return this.getTypedRuleContext(ParameterListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterFunctionSignature(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitFunctionSignature(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitFunctionSignature(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConstantDefContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_constantDef;
  }
  NL() {
    return this.getToken(ElanParser.NL, 0);
  }
  CONSTANT() {
    return this.getToken(ElanParser.CONSTANT, 0);
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  SET() {
    return this.getToken(ElanParser.SET, 0);
  }
  TO() {
    return this.getToken(ElanParser.TO, 0);
  }
  literal() {
    return this.getTypedRuleContext(LiteralContext, 0);
  }
  newInstance() {
    return this.getTypedRuleContext(NewInstanceContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterConstantDef(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitConstantDef(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitConstantDef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var EnumDefContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_enumDef;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  ENUM = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.ENUM);
    } else {
      return this.getToken(ElanParser.ENUM, i2);
    }
  };
  enumType() {
    return this.getTypedRuleContext(EnumTypeContext, 0);
  }
  IDENTIFIER = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.IDENTIFIER);
    } else {
      return this.getToken(ElanParser.IDENTIFIER, i2);
    }
  };
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterEnumDef(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitEnumDef(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitEnumDef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var EnumTypeContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_enumType;
  }
  TYPENAME() {
    return this.getToken(ElanParser.TYPENAME, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterEnumType(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitEnumType(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitEnumType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var EnumValueContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_enumValue;
  }
  enumType() {
    return this.getTypedRuleContext(EnumTypeContext, 0);
  }
  DOT() {
    return this.getToken(ElanParser.DOT, 0);
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterEnumValue(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitEnumValue(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitEnumValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ClassDefContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_classDef;
  }
  mutableClass() {
    return this.getTypedRuleContext(MutableClassContext, 0);
  }
  abstractClass() {
    return this.getTypedRuleContext(AbstractClassContext, 0);
  }
  immutableClass() {
    return this.getTypedRuleContext(ImmutableClassContext, 0);
  }
  abstractImmutableClass() {
    return this.getTypedRuleContext(AbstractImmutableClassContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterClassDef(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitClassDef(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitClassDef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var MutableClassContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_mutableClass;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  CLASS = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.CLASS);
    } else {
      return this.getToken(ElanParser.CLASS, i2);
    }
  };
  TYPENAME() {
    return this.getToken(ElanParser.TYPENAME, 0);
  }
  econstructor() {
    return this.getTypedRuleContext(EconstructorContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  inherits() {
    return this.getTypedRuleContext(InheritsContext, 0);
  }
  property = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(PropertyContext);
    } else {
      return this.getTypedRuleContext(PropertyContext, i2);
    }
  };
  functionDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(FunctionDefContext);
    } else {
      return this.getTypedRuleContext(FunctionDefContext, i2);
    }
  };
  procedureDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ProcedureDefContext);
    } else {
      return this.getTypedRuleContext(ProcedureDefContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterMutableClass(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitMutableClass(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitMutableClass(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AbstractClassContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_abstractClass;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  ABSTRACT = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.ABSTRACT);
    } else {
      return this.getToken(ElanParser.ABSTRACT, i2);
    }
  };
  CLASS = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.CLASS);
    } else {
      return this.getToken(ElanParser.CLASS, i2);
    }
  };
  TYPENAME() {
    return this.getToken(ElanParser.TYPENAME, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  inherits() {
    return this.getTypedRuleContext(InheritsContext, 0);
  }
  property = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(PropertyContext);
    } else {
      return this.getTypedRuleContext(PropertyContext, i2);
    }
  };
  FUNCTION = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.FUNCTION);
    } else {
      return this.getToken(ElanParser.FUNCTION, i2);
    }
  };
  functionSignature = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(FunctionSignatureContext);
    } else {
      return this.getTypedRuleContext(FunctionSignatureContext, i2);
    }
  };
  PROCEDURE = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.PROCEDURE);
    } else {
      return this.getToken(ElanParser.PROCEDURE, i2);
    }
  };
  procedureSignature = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ProcedureSignatureContext);
    } else {
      return this.getTypedRuleContext(ProcedureSignatureContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterAbstractClass(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitAbstractClass(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitAbstractClass(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ImmutableClassContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_immutableClass;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  IMMUTABLE() {
    return this.getToken(ElanParser.IMMUTABLE, 0);
  }
  CLASS = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.CLASS);
    } else {
      return this.getToken(ElanParser.CLASS, i2);
    }
  };
  TYPENAME() {
    return this.getToken(ElanParser.TYPENAME, 0);
  }
  econstructor() {
    return this.getTypedRuleContext(EconstructorContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  inherits() {
    return this.getTypedRuleContext(InheritsContext, 0);
  }
  property = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(PropertyContext);
    } else {
      return this.getTypedRuleContext(PropertyContext, i2);
    }
  };
  functionDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(FunctionDefContext);
    } else {
      return this.getTypedRuleContext(FunctionDefContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterImmutableClass(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitImmutableClass(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitImmutableClass(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AbstractImmutableClassContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_abstractImmutableClass;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  ABSTRACT = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.ABSTRACT);
    } else {
      return this.getToken(ElanParser.ABSTRACT, i2);
    }
  };
  IMMUTABLE() {
    return this.getToken(ElanParser.IMMUTABLE, 0);
  }
  CLASS = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.CLASS);
    } else {
      return this.getToken(ElanParser.CLASS, i2);
    }
  };
  TYPENAME() {
    return this.getToken(ElanParser.TYPENAME, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  inherits() {
    return this.getTypedRuleContext(InheritsContext, 0);
  }
  property = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(PropertyContext);
    } else {
      return this.getTypedRuleContext(PropertyContext, i2);
    }
  };
  FUNCTION = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.FUNCTION);
    } else {
      return this.getToken(ElanParser.FUNCTION, i2);
    }
  };
  functionSignature = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(FunctionSignatureContext);
    } else {
      return this.getTypedRuleContext(FunctionSignatureContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterAbstractImmutableClass(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitAbstractImmutableClass(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitAbstractImmutableClass(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var InheritsContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_inherits;
  }
  INHERITS() {
    return this.getToken(ElanParser.INHERITS, 0);
  }
  type = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(TypeContext);
    } else {
      return this.getTypedRuleContext(TypeContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterInherits(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitInherits(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitInherits(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var PropertyContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_property;
  }
  PROPERTY() {
    return this.getToken(ElanParser.PROPERTY, 0);
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  PRIVATE() {
    return this.getToken(ElanParser.PRIVATE, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterProperty(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitProperty(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitProperty(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var EconstructorContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_econstructor;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  CONSTRUCTOR = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.CONSTRUCTOR);
    } else {
      return this.getToken(ElanParser.CONSTRUCTOR, i2);
    }
  };
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  parameterList() {
    return this.getTypedRuleContext(ParameterListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterEconstructor(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitEconstructor(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitEconstructor(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var NewInstanceContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_newInstance;
  }
  NEW() {
    return this.getToken(ElanParser.NEW, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  argumentList() {
    return this.getTypedRuleContext(ArgumentListContext, 0);
  }
  withClause() {
    return this.getTypedRuleContext(WithClauseContext, 0);
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterNewInstance(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitNewInstance(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitNewInstance(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var WithClauseContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_withClause;
  }
  WITH() {
    return this.getToken(ElanParser.WITH, 0);
  }
  OPEN_BRACE() {
    return this.getToken(ElanParser.OPEN_BRACE, 0);
  }
  inlineAsignment = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(InlineAsignmentContext);
    } else {
      return this.getTypedRuleContext(InlineAsignmentContext, i2);
    }
  };
  CLOSE_BRACE() {
    return this.getToken(ElanParser.CLOSE_BRACE, 0);
  }
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterWithClause(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitWithClause(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitWithClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProceduralControlFlowContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_proceduralControlFlow;
  }
  if_() {
    return this.getTypedRuleContext(IfContext, 0);
  }
  for_() {
    return this.getTypedRuleContext(ForContext, 0);
  }
  each() {
    return this.getTypedRuleContext(EachContext, 0);
  }
  while_() {
    return this.getTypedRuleContext(WhileContext, 0);
  }
  repeat() {
    return this.getTypedRuleContext(RepeatContext, 0);
  }
  try_() {
    return this.getTypedRuleContext(TryContext, 0);
  }
  switch_() {
    return this.getTypedRuleContext(SwitchContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterProceduralControlFlow(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitProceduralControlFlow(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitProceduralControlFlow(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var IfContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_if;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  IF = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.IF);
    } else {
      return this.getToken(ElanParser.IF, i2);
    }
  };
  expression = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i2);
    }
  };
  statementBlock = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(StatementBlockContext);
    } else {
      return this.getTypedRuleContext(StatementBlockContext, i2);
    }
  };
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  ELSE = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.ELSE);
    } else {
      return this.getToken(ElanParser.ELSE, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterIf(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitIf(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitIf(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ForContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_for;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  FOR = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.FOR);
    } else {
      return this.getToken(ElanParser.FOR, i2);
    }
  };
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  FROM() {
    return this.getToken(ElanParser.FROM, 0);
  }
  expression = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i2);
    }
  };
  TO() {
    return this.getToken(ElanParser.TO, 0);
  }
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  STEP() {
    return this.getToken(ElanParser.STEP, 0);
  }
  LITERAL_INTEGER() {
    return this.getToken(ElanParser.LITERAL_INTEGER, 0);
  }
  MINUS() {
    return this.getToken(ElanParser.MINUS, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterFor(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitFor(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitFor(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var EachContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_each;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  EACH = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.EACH);
    } else {
      return this.getToken(ElanParser.EACH, i2);
    }
  };
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  IN() {
    return this.getToken(ElanParser.IN, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterEach(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitEach(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitEach(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var WhileContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_while;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  WHILE = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.WHILE);
    } else {
      return this.getToken(ElanParser.WHILE, i2);
    }
  };
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterWhile(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitWhile(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitWhile(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var RepeatContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_repeat;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  REPEAT = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.REPEAT);
    } else {
      return this.getToken(ElanParser.REPEAT, i2);
    }
  };
  WHEN() {
    return this.getToken(ElanParser.WHEN, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterRepeat(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitRepeat(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitRepeat(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TryContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_try;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  TRY = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.TRY);
    } else {
      return this.getToken(ElanParser.TRY, i2);
    }
  };
  statementBlock = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(StatementBlockContext);
    } else {
      return this.getTypedRuleContext(StatementBlockContext, i2);
    }
  };
  CATCH() {
    return this.getToken(ElanParser.CATCH, 0);
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterTry(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitTry(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitTry(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var SwitchContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_switch;
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.NL);
    } else {
      return this.getToken(ElanParser.NL, i2);
    }
  };
  SWITCH = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.SWITCH);
    } else {
      return this.getToken(ElanParser.SWITCH, i2);
    }
  };
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  caseDefault() {
    return this.getTypedRuleContext(CaseDefaultContext, 0);
  }
  END() {
    return this.getToken(ElanParser.END, 0);
  }
  case_ = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(CaseContext);
    } else {
      return this.getTypedRuleContext(CaseContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterSwitch(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitSwitch(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitSwitch(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CaseContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_case;
  }
  NL() {
    return this.getToken(ElanParser.NL, 0);
  }
  CASE() {
    return this.getToken(ElanParser.CASE, 0);
  }
  literalValue() {
    return this.getTypedRuleContext(LiteralValueContext, 0);
  }
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  MINUS() {
    return this.getToken(ElanParser.MINUS, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterCase(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitCase(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitCase(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CaseDefaultContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_caseDefault;
  }
  NL() {
    return this.getToken(ElanParser.NL, 0);
  }
  DEFAULT() {
    return this.getToken(ElanParser.DEFAULT, 0);
  }
  statementBlock() {
    return this.getTypedRuleContext(StatementBlockContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterCaseDefault(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitCaseDefault(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitCaseDefault(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ExpressionContext = class _ExpressionContext extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_expression;
  }
  bracketedExpression() {
    return this.getTypedRuleContext(BracketedExpressionContext, 0);
  }
  functionCall() {
    return this.getTypedRuleContext(FunctionCallContext, 0);
  }
  value() {
    return this.getTypedRuleContext(ValueContext, 0);
  }
  unaryOp() {
    return this.getTypedRuleContext(UnaryOpContext, 0);
  }
  expression = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(_ExpressionContext);
    } else {
      return this.getTypedRuleContext(_ExpressionContext, i2);
    }
  };
  newInstance() {
    return this.getTypedRuleContext(NewInstanceContext, 0);
  }
  input() {
    return this.getTypedRuleContext(InputContext, 0);
  }
  systemCall() {
    return this.getTypedRuleContext(SystemCallContext, 0);
  }
  POWER() {
    return this.getToken(ElanParser.POWER, 0);
  }
  binaryOp() {
    return this.getTypedRuleContext(BinaryOpContext, 0);
  }
  index() {
    return this.getTypedRuleContext(IndexContext, 0);
  }
  DOT() {
    return this.getToken(ElanParser.DOT, 0);
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  ifExpression() {
    return this.getTypedRuleContext(IfExpressionContext, 0);
  }
  elseExpression() {
    return this.getTypedRuleContext(ElseExpressionContext, 0);
  }
  withClause() {
    return this.getTypedRuleContext(WithClauseContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var BracketedExpressionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_bracketedExpression;
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterBracketedExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitBracketedExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitBracketedExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var IfExpressionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_ifExpression;
  }
  IF() {
    return this.getToken(ElanParser.IF, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterIfExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitIfExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitIfExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ElseExpressionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_elseExpression;
  }
  ELSE() {
    return this.getToken(ElanParser.ELSE, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterElseExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitElseExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitElseExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LambdaContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_lambda;
  }
  LAMBDA() {
    return this.getToken(ElanParser.LAMBDA, 0);
  }
  argumentList() {
    return this.getTypedRuleContext(ArgumentListContext, 0);
  }
  ARROW() {
    return this.getToken(ElanParser.ARROW, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterLambda(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitLambda(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitLambda(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var IndexContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_index;
  }
  OPEN_SQ_BRACKET() {
    return this.getToken(ElanParser.OPEN_SQ_BRACKET, 0);
  }
  CLOSE_SQ_BRACKET() {
    return this.getToken(ElanParser.CLOSE_SQ_BRACKET, 0);
  }
  expression = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i2);
    }
  };
  COMMA() {
    return this.getToken(ElanParser.COMMA, 0);
  }
  range() {
    return this.getTypedRuleContext(RangeContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterIndex(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitIndex(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitIndex(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var RangeContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_range;
  }
  expression = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i2);
    }
  };
  DOUBLE_DOT() {
    return this.getToken(ElanParser.DOUBLE_DOT, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterRange(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitRange(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitRange(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ValueContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_value;
  }
  literal() {
    return this.getTypedRuleContext(LiteralContext, 0);
  }
  IDENTIFIER() {
    return this.getToken(ElanParser.IDENTIFIER, 0);
  }
  scopeQualifier() {
    return this.getTypedRuleContext(ScopeQualifierContext, 0);
  }
  dataStructureDefinition() {
    return this.getTypedRuleContext(DataStructureDefinitionContext, 0);
  }
  THIS() {
    return this.getToken(ElanParser.THIS, 0);
  }
  DEFAULT() {
    return this.getToken(ElanParser.DEFAULT, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterValue(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitValue(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ScopeQualifierContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_scopeQualifier;
  }
  DOT = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.DOT);
    } else {
      return this.getToken(ElanParser.DOT, i2);
    }
  };
  PROPERTY() {
    return this.getToken(ElanParser.PROPERTY, 0);
  }
  GLOBAL() {
    return this.getToken(ElanParser.GLOBAL, 0);
  }
  LIBRARY() {
    return this.getToken(ElanParser.LIBRARY, 0);
  }
  PACKAGE() {
    return this.getToken(ElanParser.PACKAGE, 0);
  }
  namespace() {
    return this.getTypedRuleContext(NamespaceContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterScopeQualifier(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitScopeQualifier(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitScopeQualifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LiteralContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_literal;
  }
  literalValue() {
    return this.getTypedRuleContext(LiteralValueContext, 0);
  }
  literalDataStructure() {
    return this.getTypedRuleContext(LiteralDataStructureContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterLiteral(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitLiteral(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitLiteral(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LiteralValueContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_literalValue;
  }
  BOOL_VALUE() {
    return this.getToken(ElanParser.BOOL_VALUE, 0);
  }
  LITERAL_INTEGER() {
    return this.getToken(ElanParser.LITERAL_INTEGER, 0);
  }
  LITERAL_FLOAT() {
    return this.getToken(ElanParser.LITERAL_FLOAT, 0);
  }
  LITERAL_CHAR() {
    return this.getToken(ElanParser.LITERAL_CHAR, 0);
  }
  enumValue() {
    return this.getTypedRuleContext(EnumValueContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterLiteralValue(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitLiteralValue(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitLiteralValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var DataStructureDefinitionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_dataStructureDefinition;
  }
  listDefinition() {
    return this.getTypedRuleContext(ListDefinitionContext, 0);
  }
  arrayDefinition() {
    return this.getTypedRuleContext(ArrayDefinitionContext, 0);
  }
  tupleDefinition() {
    return this.getTypedRuleContext(TupleDefinitionContext, 0);
  }
  dictionaryDefinition() {
    return this.getTypedRuleContext(DictionaryDefinitionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterDataStructureDefinition(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitDataStructureDefinition(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitDataStructureDefinition(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LiteralDataStructureContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_literalDataStructure;
  }
  LITERAL_STRING() {
    return this.getToken(ElanParser.LITERAL_STRING, 0);
  }
  literalTuple() {
    return this.getTypedRuleContext(LiteralTupleContext, 0);
  }
  literalList() {
    return this.getTypedRuleContext(LiteralListContext, 0);
  }
  literalDictionary() {
    return this.getTypedRuleContext(LiteralDictionaryContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterLiteralDataStructure(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitLiteralDataStructure(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitLiteralDataStructure(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TupleDefinitionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_tupleDefinition;
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  expression = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterTupleDefinition(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitTupleDefinition(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitTupleDefinition(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LiteralTupleContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_literalTuple;
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  literal = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(LiteralContext);
    } else {
      return this.getTypedRuleContext(LiteralContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterLiteralTuple(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitLiteralTuple(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitLiteralTuple(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var DeconstructedTupleContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_deconstructedTuple;
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  IDENTIFIER = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.IDENTIFIER);
    } else {
      return this.getToken(ElanParser.IDENTIFIER, i2);
    }
  };
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterDeconstructedTuple(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitDeconstructedTuple(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitDeconstructedTuple(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ListDefinitionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_listDefinition;
  }
  OPEN_BRACE() {
    return this.getToken(ElanParser.OPEN_BRACE, 0);
  }
  CLOSE_BRACE() {
    return this.getToken(ElanParser.CLOSE_BRACE, 0);
  }
  expression = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterListDefinition(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitListDefinition(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitListDefinition(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LiteralListContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_literalList;
  }
  OPEN_BRACE() {
    return this.getToken(ElanParser.OPEN_BRACE, 0);
  }
  CLOSE_BRACE() {
    return this.getToken(ElanParser.CLOSE_BRACE, 0);
  }
  literal = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(LiteralContext);
    } else {
      return this.getTypedRuleContext(LiteralContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterLiteralList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitLiteralList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitLiteralList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ListDecompContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_listDecomp;
  }
  OPEN_BRACE() {
    return this.getToken(ElanParser.OPEN_BRACE, 0);
  }
  IDENTIFIER = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.IDENTIFIER);
    } else {
      return this.getToken(ElanParser.IDENTIFIER, i2);
    }
  };
  COLON() {
    return this.getToken(ElanParser.COLON, 0);
  }
  CLOSE_BRACE() {
    return this.getToken(ElanParser.CLOSE_BRACE, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterListDecomp(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitListDecomp(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitListDecomp(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ArrayDefinitionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_arrayDefinition;
  }
  ARRAY() {
    return this.getToken(ElanParser.ARRAY, 0);
  }
  genericSpecifier() {
    return this.getTypedRuleContext(GenericSpecifierContext, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  LITERAL_INTEGER() {
    return this.getToken(ElanParser.LITERAL_INTEGER, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterArrayDefinition(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitArrayDefinition(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitArrayDefinition(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var DictionaryDefinitionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_dictionaryDefinition;
  }
  OPEN_BRACE() {
    return this.getToken(ElanParser.OPEN_BRACE, 0);
  }
  CLOSE_BRACE() {
    return this.getToken(ElanParser.CLOSE_BRACE, 0);
  }
  kvp = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(KvpContext);
    } else {
      return this.getTypedRuleContext(KvpContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterDictionaryDefinition(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitDictionaryDefinition(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitDictionaryDefinition(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LiteralDictionaryContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_literalDictionary;
  }
  OPEN_BRACE() {
    return this.getToken(ElanParser.OPEN_BRACE, 0);
  }
  CLOSE_BRACE() {
    return this.getToken(ElanParser.CLOSE_BRACE, 0);
  }
  literalKvp = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(LiteralKvpContext);
    } else {
      return this.getTypedRuleContext(LiteralKvpContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterLiteralDictionary(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitLiteralDictionary(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitLiteralDictionary(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var KvpContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_kvp;
  }
  expression = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i2);
    }
  };
  COLON() {
    return this.getToken(ElanParser.COLON, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterKvp(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitKvp(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitKvp(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LiteralKvpContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_literalKvp;
  }
  literal = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(LiteralContext);
    } else {
      return this.getTypedRuleContext(LiteralContext, i2);
    }
  };
  COLON() {
    return this.getToken(ElanParser.COLON, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterLiteralKvp(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitLiteralKvp(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitLiteralKvp(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var UnaryOpContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_unaryOp;
  }
  MINUS() {
    return this.getToken(ElanParser.MINUS, 0);
  }
  NOT() {
    return this.getToken(ElanParser.NOT, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterUnaryOp(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitUnaryOp(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitUnaryOp(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var BinaryOpContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_binaryOp;
  }
  arithmeticOp() {
    return this.getTypedRuleContext(ArithmeticOpContext, 0);
  }
  logicalOp() {
    return this.getTypedRuleContext(LogicalOpContext, 0);
  }
  conditionalOp() {
    return this.getTypedRuleContext(ConditionalOpContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterBinaryOp(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitBinaryOp(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitBinaryOp(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ArithmeticOpContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_arithmeticOp;
  }
  POWER() {
    return this.getToken(ElanParser.POWER, 0);
  }
  MULT() {
    return this.getToken(ElanParser.MULT, 0);
  }
  DIVIDE() {
    return this.getToken(ElanParser.DIVIDE, 0);
  }
  MOD() {
    return this.getToken(ElanParser.MOD, 0);
  }
  DIV() {
    return this.getToken(ElanParser.DIV, 0);
  }
  PLUS() {
    return this.getToken(ElanParser.PLUS, 0);
  }
  MINUS() {
    return this.getToken(ElanParser.MINUS, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterArithmeticOp(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitArithmeticOp(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitArithmeticOp(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LogicalOpContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_logicalOp;
  }
  AND() {
    return this.getToken(ElanParser.AND, 0);
  }
  OR() {
    return this.getToken(ElanParser.OR, 0);
  }
  XOR() {
    return this.getToken(ElanParser.XOR, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterLogicalOp(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitLogicalOp(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitLogicalOp(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConditionalOpContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_conditionalOp;
  }
  GT() {
    return this.getToken(ElanParser.GT, 0);
  }
  LT() {
    return this.getToken(ElanParser.LT, 0);
  }
  GE() {
    return this.getToken(ElanParser.GE, 0);
  }
  LE() {
    return this.getToken(ElanParser.LE, 0);
  }
  IS() {
    return this.getToken(ElanParser.IS, 0);
  }
  IS_NOT() {
    return this.getToken(ElanParser.IS_NOT, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterConditionalOp(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitConditionalOp(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitConditionalOp(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TypeContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_type;
  }
  VALUE_TYPE() {
    return this.getToken(ElanParser.VALUE_TYPE, 0);
  }
  TYPENAME() {
    return this.getToken(ElanParser.TYPENAME, 0);
  }
  genericSpecifier() {
    return this.getTypedRuleContext(GenericSpecifierContext, 0);
  }
  tupleType() {
    return this.getTypedRuleContext(TupleTypeContext, 0);
  }
  funcType() {
    return this.getTypedRuleContext(FuncTypeContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterType(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitType(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var DataStructureTypeContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_dataStructureType;
  }
  genericSpecifier() {
    return this.getTypedRuleContext(GenericSpecifierContext, 0);
  }
  ARRAY() {
    return this.getToken(ElanParser.ARRAY, 0);
  }
  LIST() {
    return this.getToken(ElanParser.LIST, 0);
  }
  DICTIONARY() {
    return this.getToken(ElanParser.DICTIONARY, 0);
  }
  ITERABLE() {
    return this.getToken(ElanParser.ITERABLE, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterDataStructureType(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitDataStructureType(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitDataStructureType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var GenericSpecifierContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_genericSpecifier;
  }
  LT() {
    return this.getToken(ElanParser.LT, 0);
  }
  OF() {
    return this.getToken(ElanParser.OF, 0);
  }
  type = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(TypeContext);
    } else {
      return this.getTypedRuleContext(TypeContext, i2);
    }
  };
  GT() {
    return this.getToken(ElanParser.GT, 0);
  }
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterGenericSpecifier(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitGenericSpecifier(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitGenericSpecifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TupleTypeContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_tupleType;
  }
  OPEN_BRACKET() {
    return this.getToken(ElanParser.OPEN_BRACKET, 0);
  }
  type = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(TypeContext);
    } else {
      return this.getTypedRuleContext(TypeContext, i2);
    }
  };
  CLOSE_BRACKET() {
    return this.getToken(ElanParser.CLOSE_BRACKET, 0);
  }
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterTupleType(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitTupleType(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitTupleType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TypeListContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_typeList;
  }
  type = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(TypeContext);
    } else {
      return this.getTypedRuleContext(TypeContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(ElanParser.COMMA);
    } else {
      return this.getToken(ElanParser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterTypeList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitTypeList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitTypeList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FuncTypeContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ElanParser.RULE_funcType;
  }
  LT() {
    return this.getToken(ElanParser.LT, 0);
  }
  OF() {
    return this.getToken(ElanParser.OF, 0);
  }
  typeList() {
    return this.getTypedRuleContext(TypeListContext, 0);
  }
  ARROW() {
    return this.getToken(ElanParser.ARROW, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  GT() {
    return this.getToken(ElanParser.GT, 0);
  }
  enterRule(listener) {
    if (listener instanceof ElanListener) {
      listener.enterFuncType(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof ElanListener) {
      listener.exitFuncType(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof ElanVisitor) {
      return visitor.visitFuncType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
ElanParser.FileContext = FileContext;
ElanParser.ImportStatementContext = ImportStatementContext;
ElanParser.NamespaceContext = NamespaceContext;
ElanParser.MainContext = MainContext;
ElanParser.TestContext = TestContext;
ElanParser.StatementBlockContext = StatementBlockContext;
ElanParser.TestStatementsContext = TestStatementsContext;
ElanParser.AssertContext = AssertContext;
ElanParser.CallStatementContext = CallStatementContext;
ElanParser.ThrowExceptionContext = ThrowExceptionContext;
ElanParser.PrintStatementContext = PrintStatementContext;
ElanParser.VarDefContext = VarDefContext;
ElanParser.AssignmentContext = AssignmentContext;
ElanParser.InlineAsignmentContext = InlineAsignmentContext;
ElanParser.AssignableValueContext = AssignableValueContext;
ElanParser.ProcedureCallContext = ProcedureCallContext;
ElanParser.FunctionCallContext = FunctionCallContext;
ElanParser.SystemCallContext = SystemCallContext;
ElanParser.InputContext = InputContext;
ElanParser.ArgumentContext = ArgumentContext;
ElanParser.ArgumentListContext = ArgumentListContext;
ElanParser.ProcedureDefContext = ProcedureDefContext;
ElanParser.ProcedureSignatureContext = ProcedureSignatureContext;
ElanParser.ProcedureParameterListContext = ProcedureParameterListContext;
ElanParser.ParameterListContext = ParameterListContext;
ElanParser.ParameterContext = ParameterContext;
ElanParser.ProcedureParameterContext = ProcedureParameterContext;
ElanParser.FunctionDefContext = FunctionDefContext;
ElanParser.FunctionSignatureContext = FunctionSignatureContext;
ElanParser.ConstantDefContext = ConstantDefContext;
ElanParser.EnumDefContext = EnumDefContext;
ElanParser.EnumTypeContext = EnumTypeContext;
ElanParser.EnumValueContext = EnumValueContext;
ElanParser.ClassDefContext = ClassDefContext;
ElanParser.MutableClassContext = MutableClassContext;
ElanParser.AbstractClassContext = AbstractClassContext;
ElanParser.ImmutableClassContext = ImmutableClassContext;
ElanParser.AbstractImmutableClassContext = AbstractImmutableClassContext;
ElanParser.InheritsContext = InheritsContext;
ElanParser.PropertyContext = PropertyContext;
ElanParser.EconstructorContext = EconstructorContext;
ElanParser.NewInstanceContext = NewInstanceContext;
ElanParser.WithClauseContext = WithClauseContext;
ElanParser.ProceduralControlFlowContext = ProceduralControlFlowContext;
ElanParser.IfContext = IfContext;
ElanParser.ForContext = ForContext;
ElanParser.EachContext = EachContext;
ElanParser.WhileContext = WhileContext;
ElanParser.RepeatContext = RepeatContext;
ElanParser.TryContext = TryContext;
ElanParser.SwitchContext = SwitchContext;
ElanParser.CaseContext = CaseContext;
ElanParser.CaseDefaultContext = CaseDefaultContext;
ElanParser.ExpressionContext = ExpressionContext;
ElanParser.BracketedExpressionContext = BracketedExpressionContext;
ElanParser.IfExpressionContext = IfExpressionContext;
ElanParser.ElseExpressionContext = ElseExpressionContext;
ElanParser.LambdaContext = LambdaContext;
ElanParser.IndexContext = IndexContext;
ElanParser.RangeContext = RangeContext;
ElanParser.ValueContext = ValueContext;
ElanParser.ScopeQualifierContext = ScopeQualifierContext;
ElanParser.LiteralContext = LiteralContext;
ElanParser.LiteralValueContext = LiteralValueContext;
ElanParser.DataStructureDefinitionContext = DataStructureDefinitionContext;
ElanParser.LiteralDataStructureContext = LiteralDataStructureContext;
ElanParser.TupleDefinitionContext = TupleDefinitionContext;
ElanParser.LiteralTupleContext = LiteralTupleContext;
ElanParser.DeconstructedTupleContext = DeconstructedTupleContext;
ElanParser.ListDefinitionContext = ListDefinitionContext;
ElanParser.LiteralListContext = LiteralListContext;
ElanParser.ListDecompContext = ListDecompContext;
ElanParser.ArrayDefinitionContext = ArrayDefinitionContext;
ElanParser.DictionaryDefinitionContext = DictionaryDefinitionContext;
ElanParser.LiteralDictionaryContext = LiteralDictionaryContext;
ElanParser.KvpContext = KvpContext;
ElanParser.LiteralKvpContext = LiteralKvpContext;
ElanParser.UnaryOpContext = UnaryOpContext;
ElanParser.BinaryOpContext = BinaryOpContext;
ElanParser.ArithmeticOpContext = ArithmeticOpContext;
ElanParser.LogicalOpContext = LogicalOpContext;
ElanParser.ConditionalOpContext = ConditionalOpContext;
ElanParser.TypeContext = TypeContext;
ElanParser.DataStructureTypeContext = DataStructureTypeContext;
ElanParser.GenericSpecifierContext = GenericSpecifierContext;
ElanParser.TupleTypeContext = TupleTypeContext;
ElanParser.TypeListContext = TypeListContext;
ElanParser.FuncTypeContext = FuncTypeContext;

// src/elan-elan-visitor.js
function getParser(input) {
  const chars = new $e(input);
  const lexer = new ElanLexer(chars);
  const tokens = new Ze(lexer);
  const parser = new ElanParser(tokens);
  return parser;
}
function parseExpression(input) {
  const parser = getParser(input);
  const tree = parser.expression();
  return tree;
}
function parseLiteralValue(input) {
  const parser = getParser(input);
  const tree = parser.literalValue();
  return tree;
}
function parseType(input) {
  const parser = getParser(input);
  const tree = parser.type();
  return tree;
}
var ElanElanVisitor = class extends ElanVisitor {
  visitExpression(ctx) {
    return this.visitChildren(ctx);
  }
};
export {
  ElanElanVisitor,
  parseExpression,
  parseLiteralValue,
  parseType
};
