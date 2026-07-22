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

// src/generatedElan2/Elan2Visitor.js
var Elan2Visitor = class extends Ln.tree.ParseTreeVisitor {
  // Visit a parse tree produced by Elan2Parser#file.
  visitFile(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#global.
  visitGlobal(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#main.
  visitMain(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#function.
  visitFunction(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#test.
  visitTest(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#procedure.
  visitProcedure(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#concreteClass.
  visitConcreteClass(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#abstractClass.
  visitAbstractClass(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#commentGlobal.
  visitCommentGlobal(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#ordinaryStatement.
  visitOrdinaryStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#ifStatement.
  visitIfStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#whileLoop.
  visitWhileLoop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#forLoop.
  visitForLoop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#tryStatement.
  visitTryStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#commentStatement.
  visitCommentStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#constructorMember.
  visitConstructorMember(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#functionMethod.
  visitFunctionMethod(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#procedureMethod.
  visitProcedureMethod(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#copyMethod.
  visitCopyMethod(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#commentMember.
  visitCommentMember(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#mainTop.
  visitMainTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#mainBottom.
  visitMainBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#functionTop.
  visitFunctionTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#functionBottom.
  visitFunctionBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#testTop.
  visitTestTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#testBottom.
  visitTestBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#procedureTop.
  visitProcedureTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#procedureBottom.
  visitProcedureBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#concreteClassTop.
  visitConcreteClassTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#concreteClassBottom.
  visitConcreteClassBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#abstractClassTop.
  visitAbstractClassTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#abstractClassBottom.
  visitAbstractClassBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#constant.
  visitConstant(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#enum.
  visitEnum(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#assert.
  visitAssert(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#letStatement.
  visitLetStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#print.
  visitPrint(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#variableDefinition.
  visitVariableDefinition(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#assignment.
  visitAssignment(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#inputStatement.
  visitInputStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#procedureCall.
  visitProcedureCall(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#throwStatement.
  visitThrowStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#returnStatement.
  visitReturnStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#elseIfClause.
  visitElseIfClause(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#elseClause.
  visitElseClause(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#catchStatement.
  visitCatchStatement(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#ifStatementTop.
  visitIfStatementTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#ifStatementBottom.
  visitIfStatementBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#whileLoopTop.
  visitWhileLoopTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#whileLoopBottom.
  visitWhileLoopBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#forLoopTop.
  visitForLoopTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#forLoopBottom.
  visitForLoopBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#tryStatementTop.
  visitTryStatementTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#tryStatementBottom.
  visitTryStatementBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#constructorTop.
  visitConstructorTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#constructorBottom.
  visitConstructorBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#property.
  visitProperty(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#functionMethodTop.
  visitFunctionMethodTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#functionMethodBottom.
  visitFunctionMethodBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#procedureMethodTop.
  visitProcedureMethodTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#procedureMethodBottom.
  visitProcedureMethodBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#copyMethodTop.
  visitCopyMethodTop(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#copyMethodBottom.
  visitCopyMethodBottom(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#abstractFunction.
  visitAbstractFunction(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#abstractProcedure.
  visitAbstractProcedure(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#identifier.
  visitIdentifier(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#assignable.
  visitAssignable(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#methodName.
  visitMethodName(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#testName.
  visitTestName(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#typeName.
  visitTypeName(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#constantValue.
  visitConstantValue(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#argList.
  visitArgList(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#argument.
  visitArgument(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#paramsList.
  visitParamsList(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#type.
  visitType(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#enumValuesList.
  visitEnumValuesList(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#assertActual.
  visitAssertActual(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#litValue.
  visitLitValue(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#litInt.
  visitLitInt(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#litFloat.
  visitLitFloat(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#enumValue.
  visitEnumValue(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#litString.
  visitLitString(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#thisInstance.
  visitThisInstance(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#index.
  visitIndex(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#identifierWithOptIndexes.
  visitIdentifierWithOptIndexes(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#propertyRef.
  visitPropertyRef(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#term.
  visitTerm(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#chainable.
  visitChainable(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#bracketedExpression.
  visitBracketedExpression(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#unaryExpression.
  visitUnaryExpression(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#binaryExpression.
  visitBinaryExpression(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#tuple.
  visitTuple(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#methodCall.
  visitMethodCall(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#binaryOperator.
  visitBinaryOperator(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#ifExpression.
  visitIfExpression(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#newInstance.
  visitNewInstance(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#paramDef.
  visitParamDef(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#typeGeneric.
  visitTypeGeneric(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#typeTuple.
  visitTypeTuple(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#lambda.
  visitLambda(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#list.
  visitList(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#interpolatedString.
  visitInterpolatedString(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#expression.
  visitExpression(ctx) {
    return this.visitChildren(ctx);
  }
  // Visit a parse tree produced by Elan2Parser#power.
  visitPower(ctx) {
    return this.visitChildren(ctx);
  }
};

// src/generatedElan2/Elan2Lexer.js
var serializedATN = [
  4,
  0,
  97,
  874,
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
  1,
  0,
  1,
  1,
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
  16,
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
  19,
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
  25,
  1,
  25,
  1,
  25,
  1,
  25,
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
  1,
  38,
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
  39,
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
  54,
  1,
  54,
  5,
  54,
  550,
  8,
  54,
  10,
  54,
  12,
  54,
  553,
  9,
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
  55,
  1,
  55,
  1,
  55,
  1,
  55,
  3,
  55,
  564,
  8,
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
  63,
  4,
  63,
  588,
  8,
  63,
  11,
  63,
  12,
  63,
  589,
  1,
  63,
  1,
  63,
  1,
  64,
  4,
  64,
  595,
  8,
  64,
  11,
  64,
  12,
  64,
  596,
  1,
  65,
  1,
  65,
  1,
  66,
  1,
  66,
  1,
  67,
  1,
  67,
  1,
  68,
  1,
  68,
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
  81,
  1,
  82,
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
  1,
  85,
  1,
  85,
  1,
  85,
  5,
  85,
  650,
  8,
  85,
  10,
  85,
  12,
  85,
  653,
  9,
  85,
  1,
  86,
  1,
  86,
  5,
  86,
  657,
  8,
  86,
  10,
  86,
  12,
  86,
  660,
  9,
  86,
  1,
  87,
  1,
  87,
  5,
  87,
  664,
  8,
  87,
  10,
  87,
  12,
  87,
  667,
  9,
  87,
  1,
  88,
  1,
  88,
  4,
  88,
  671,
  8,
  88,
  11,
  88,
  12,
  88,
  672,
  1,
  89,
  1,
  89,
  4,
  89,
  677,
  8,
  89,
  11,
  89,
  12,
  89,
  678,
  1,
  90,
  1,
  90,
  5,
  90,
  683,
  8,
  90,
  10,
  90,
  12,
  90,
  686,
  9,
  90,
  1,
  91,
  1,
  91,
  1,
  91,
  1,
  91,
  3,
  91,
  692,
  8,
  91,
  1,
  92,
  1,
  92,
  1,
  92,
  1,
  92,
  5,
  92,
  698,
  8,
  92,
  10,
  92,
  12,
  92,
  701,
  9,
  92,
  1,
  92,
  1,
  92,
  1,
  93,
  1,
  93,
  1,
  93,
  5,
  93,
  708,
  8,
  93,
  10,
  93,
  12,
  93,
  711,
  9,
  93,
  1,
  93,
  1,
  93,
  1,
  94,
  4,
  94,
  716,
  8,
  94,
  11,
  94,
  12,
  94,
  717,
  1,
  94,
  1,
  94,
  1,
  95,
  4,
  95,
  723,
  8,
  95,
  11,
  95,
  12,
  95,
  724,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  97,
  1,
  97,
  1,
  98,
  1,
  98,
  1,
  99,
  1,
  99,
  1,
  99,
  3,
  99,
  744,
  8,
  99,
  1,
  99,
  1,
  99,
  1,
  100,
  1,
  100,
  1,
  100,
  3,
  100,
  751,
  8,
  100,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  1,
  101,
  3,
  101,
  775,
  8,
  101,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  3,
  102,
  802,
  8,
  102,
  1,
  103,
  1,
  103,
  1,
  103,
  3,
  103,
  807,
  8,
  103,
  1,
  104,
  1,
  104,
  3,
  104,
  811,
  8,
  104,
  1,
  105,
  1,
  105,
  1,
  106,
  1,
  106,
  3,
  106,
  817,
  8,
  106,
  1,
  106,
  5,
  106,
  820,
  8,
  106,
  10,
  106,
  12,
  106,
  823,
  9,
  106,
  1,
  107,
  1,
  107,
  1,
  107,
  1,
  107,
  3,
  107,
  829,
  8,
  107,
  1,
  108,
  1,
  108,
  1,
  108,
  3,
  108,
  834,
  8,
  108,
  1,
  109,
  1,
  109,
  3,
  109,
  838,
  8,
  109,
  1,
  110,
  1,
  110,
  1,
  111,
  1,
  111,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  1,
  112,
  3,
  112,
  864,
  8,
  112,
  1,
  113,
  3,
  113,
  867,
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
  0,
  0,
  117,
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
  0,
  197,
  0,
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
  1,
  0,
  11,
  2,
  0,
  10,
  10,
  13,
  13,
  2,
  0,
  9,
  9,
  32,
  32,
  2,
  0,
  10,
  10,
  12,
  13,
  1,
  0,
  48,
  49,
  3,
  0,
  48,
  57,
  65,
  70,
  97,
  102,
  1,
  0,
  48,
  57,
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
  1,
  0,
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
  898,
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
  1,
  235,
  1,
  0,
  0,
  0,
  3,
  244,
  1,
  0,
  0,
  0,
  5,
  248,
  1,
  0,
  0,
  0,
  7,
  251,
  1,
  0,
  0,
  0,
  9,
  258,
  1,
  0,
  0,
  0,
  11,
  265,
  1,
  0,
  0,
  0,
  13,
  268,
  1,
  0,
  0,
  0,
  15,
  273,
  1,
  0,
  0,
  0,
  17,
  279,
  1,
  0,
  0,
  0,
  19,
  285,
  1,
  0,
  0,
  0,
  21,
  294,
  1,
  0,
  0,
  0,
  23,
  306,
  1,
  0,
  0,
  0,
  25,
  311,
  1,
  0,
  0,
  0,
  27,
  315,
  1,
  0,
  0,
  0,
  29,
  320,
  1,
  0,
  0,
  0,
  31,
  325,
  1,
  0,
  0,
  0,
  33,
  329,
  1,
  0,
  0,
  0,
  35,
  334,
  1,
  0,
  0,
  0,
  37,
  344,
  1,
  0,
  0,
  0,
  39,
  348,
  1,
  0,
  0,
  0,
  41,
  353,
  1,
  0,
  0,
  0,
  43,
  362,
  1,
  0,
  0,
  0,
  45,
  365,
  1,
  0,
  0,
  0,
  47,
  368,
  1,
  0,
  0,
  0,
  49,
  377,
  1,
  0,
  0,
  0,
  51,
  383,
  1,
  0,
  0,
  0,
  53,
  390,
  1,
  0,
  0,
  0,
  55,
  394,
  1,
  0,
  0,
  0,
  57,
  399,
  1,
  0,
  0,
  0,
  59,
  403,
  1,
  0,
  0,
  0,
  61,
  407,
  1,
  0,
  0,
  0,
  63,
  411,
  1,
  0,
  0,
  0,
  65,
  414,
  1,
  0,
  0,
  0,
  67,
  417,
  1,
  0,
  0,
  0,
  69,
  423,
  1,
  0,
  0,
  0,
  71,
  431,
  1,
  0,
  0,
  0,
  73,
  441,
  1,
  0,
  0,
  0,
  75,
  450,
  1,
  0,
  0,
  0,
  77,
  457,
  1,
  0,
  0,
  0,
  79,
  465,
  1,
  0,
  0,
  0,
  81,
  469,
  1,
  0,
  0,
  0,
  83,
  474,
  1,
  0,
  0,
  0,
  85,
  479,
  1,
  0,
  0,
  0,
  87,
  484,
  1,
  0,
  0,
  0,
  89,
  489,
  1,
  0,
  0,
  0,
  91,
  495,
  1,
  0,
  0,
  0,
  93,
  498,
  1,
  0,
  0,
  0,
  95,
  502,
  1,
  0,
  0,
  0,
  97,
  511,
  1,
  0,
  0,
  0,
  99,
  517,
  1,
  0,
  0,
  0,
  101,
  521,
  1,
  0,
  0,
  0,
  103,
  527,
  1,
  0,
  0,
  0,
  105,
  535,
  1,
  0,
  0,
  0,
  107,
  542,
  1,
  0,
  0,
  0,
  109,
  547,
  1,
  0,
  0,
  0,
  111,
  563,
  1,
  0,
  0,
  0,
  113,
  565,
  1,
  0,
  0,
  0,
  115,
  568,
  1,
  0,
  0,
  0,
  117,
  573,
  1,
  0,
  0,
  0,
  119,
  576,
  1,
  0,
  0,
  0,
  121,
  578,
  1,
  0,
  0,
  0,
  123,
  581,
  1,
  0,
  0,
  0,
  125,
  584,
  1,
  0,
  0,
  0,
  127,
  587,
  1,
  0,
  0,
  0,
  129,
  594,
  1,
  0,
  0,
  0,
  131,
  598,
  1,
  0,
  0,
  0,
  133,
  600,
  1,
  0,
  0,
  0,
  135,
  602,
  1,
  0,
  0,
  0,
  137,
  604,
  1,
  0,
  0,
  0,
  139,
  606,
  1,
  0,
  0,
  0,
  141,
  608,
  1,
  0,
  0,
  0,
  143,
  610,
  1,
  0,
  0,
  0,
  145,
  612,
  1,
  0,
  0,
  0,
  147,
  614,
  1,
  0,
  0,
  0,
  149,
  616,
  1,
  0,
  0,
  0,
  151,
  618,
  1,
  0,
  0,
  0,
  153,
  620,
  1,
  0,
  0,
  0,
  155,
  622,
  1,
  0,
  0,
  0,
  157,
  624,
  1,
  0,
  0,
  0,
  159,
  626,
  1,
  0,
  0,
  0,
  161,
  628,
  1,
  0,
  0,
  0,
  163,
  630,
  1,
  0,
  0,
  0,
  165,
  633,
  1,
  0,
  0,
  0,
  167,
  636,
  1,
  0,
  0,
  0,
  169,
  638,
  1,
  0,
  0,
  0,
  171,
  642,
  1,
  0,
  0,
  0,
  173,
  654,
  1,
  0,
  0,
  0,
  175,
  661,
  1,
  0,
  0,
  0,
  177,
  668,
  1,
  0,
  0,
  0,
  179,
  674,
  1,
  0,
  0,
  0,
  181,
  680,
  1,
  0,
  0,
  0,
  183,
  687,
  1,
  0,
  0,
  0,
  185,
  693,
  1,
  0,
  0,
  0,
  187,
  704,
  1,
  0,
  0,
  0,
  189,
  715,
  1,
  0,
  0,
  0,
  191,
  722,
  1,
  0,
  0,
  0,
  193,
  726,
  1,
  0,
  0,
  0,
  195,
  736,
  1,
  0,
  0,
  0,
  197,
  738,
  1,
  0,
  0,
  0,
  199,
  740,
  1,
  0,
  0,
  0,
  201,
  750,
  1,
  0,
  0,
  0,
  203,
  774,
  1,
  0,
  0,
  0,
  205,
  801,
  1,
  0,
  0,
  0,
  207,
  806,
  1,
  0,
  0,
  0,
  209,
  810,
  1,
  0,
  0,
  0,
  211,
  812,
  1,
  0,
  0,
  0,
  213,
  816,
  1,
  0,
  0,
  0,
  215,
  828,
  1,
  0,
  0,
  0,
  217,
  833,
  1,
  0,
  0,
  0,
  219,
  837,
  1,
  0,
  0,
  0,
  221,
  839,
  1,
  0,
  0,
  0,
  223,
  841,
  1,
  0,
  0,
  0,
  225,
  863,
  1,
  0,
  0,
  0,
  227,
  866,
  1,
  0,
  0,
  0,
  229,
  868,
  1,
  0,
  0,
  0,
  231,
  870,
  1,
  0,
  0,
  0,
  233,
  872,
  1,
  0,
  0,
  0,
  235,
  236,
  5,
  97,
  0,
  0,
  236,
  237,
  5,
  98,
  0,
  0,
  237,
  238,
  5,
  115,
  0,
  0,
  238,
  239,
  5,
  116,
  0,
  0,
  239,
  240,
  5,
  114,
  0,
  0,
  240,
  241,
  5,
  97,
  0,
  0,
  241,
  242,
  5,
  99,
  0,
  0,
  242,
  243,
  5,
  116,
  0,
  0,
  243,
  2,
  1,
  0,
  0,
  0,
  244,
  245,
  5,
  97,
  0,
  0,
  245,
  246,
  5,
  110,
  0,
  0,
  246,
  247,
  5,
  100,
  0,
  0,
  247,
  4,
  1,
  0,
  0,
  0,
  248,
  249,
  5,
  97,
  0,
  0,
  249,
  250,
  5,
  115,
  0,
  0,
  250,
  6,
  1,
  0,
  0,
  0,
  251,
  252,
  5,
  97,
  0,
  0,
  252,
  253,
  5,
  115,
  0,
  0,
  253,
  254,
  5,
  115,
  0,
  0,
  254,
  255,
  5,
  101,
  0,
  0,
  255,
  256,
  5,
  114,
  0,
  0,
  256,
  257,
  5,
  116,
  0,
  0,
  257,
  8,
  1,
  0,
  0,
  0,
  258,
  259,
  5,
  97,
  0,
  0,
  259,
  260,
  5,
  115,
  0,
  0,
  260,
  261,
  5,
  115,
  0,
  0,
  261,
  262,
  5,
  105,
  0,
  0,
  262,
  263,
  5,
  103,
  0,
  0,
  263,
  264,
  5,
  110,
  0,
  0,
  264,
  10,
  1,
  0,
  0,
  0,
  265,
  266,
  5,
  98,
  0,
  0,
  266,
  267,
  5,
  101,
  0,
  0,
  267,
  12,
  1,
  0,
  0,
  0,
  268,
  269,
  5,
  99,
  0,
  0,
  269,
  270,
  5,
  97,
  0,
  0,
  270,
  271,
  5,
  108,
  0,
  0,
  271,
  272,
  5,
  108,
  0,
  0,
  272,
  14,
  1,
  0,
  0,
  0,
  273,
  274,
  5,
  99,
  0,
  0,
  274,
  275,
  5,
  97,
  0,
  0,
  275,
  276,
  5,
  116,
  0,
  0,
  276,
  277,
  5,
  99,
  0,
  0,
  277,
  278,
  5,
  104,
  0,
  0,
  278,
  16,
  1,
  0,
  0,
  0,
  279,
  280,
  5,
  99,
  0,
  0,
  280,
  281,
  5,
  108,
  0,
  0,
  281,
  282,
  5,
  97,
  0,
  0,
  282,
  283,
  5,
  115,
  0,
  0,
  283,
  284,
  5,
  115,
  0,
  0,
  284,
  18,
  1,
  0,
  0,
  0,
  285,
  286,
  5,
  99,
  0,
  0,
  286,
  287,
  5,
  111,
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
  115,
  0,
  0,
  289,
  290,
  5,
  116,
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
  110,
  0,
  0,
  292,
  293,
  5,
  116,
  0,
  0,
  293,
  20,
  1,
  0,
  0,
  0,
  294,
  295,
  5,
  99,
  0,
  0,
  295,
  296,
  5,
  111,
  0,
  0,
  296,
  297,
  5,
  110,
  0,
  0,
  297,
  298,
  5,
  115,
  0,
  0,
  298,
  299,
  5,
  116,
  0,
  0,
  299,
  300,
  5,
  114,
  0,
  0,
  300,
  301,
  5,
  117,
  0,
  0,
  301,
  302,
  5,
  99,
  0,
  0,
  302,
  303,
  5,
  116,
  0,
  0,
  303,
  304,
  5,
  111,
  0,
  0,
  304,
  305,
  5,
  114,
  0,
  0,
  305,
  22,
  1,
  0,
  0,
  0,
  306,
  307,
  5,
  99,
  0,
  0,
  307,
  308,
  5,
  111,
  0,
  0,
  308,
  309,
  5,
  112,
  0,
  0,
  309,
  310,
  5,
  121,
  0,
  0,
  310,
  24,
  1,
  0,
  0,
  0,
  311,
  312,
  5,
  100,
  0,
  0,
  312,
  313,
  5,
  105,
  0,
  0,
  313,
  314,
  5,
  118,
  0,
  0,
  314,
  26,
  1,
  0,
  0,
  0,
  315,
  316,
  5,
  101,
  0,
  0,
  316,
  317,
  5,
  108,
  0,
  0,
  317,
  318,
  5,
  105,
  0,
  0,
  318,
  319,
  5,
  102,
  0,
  0,
  319,
  28,
  1,
  0,
  0,
  0,
  320,
  321,
  5,
  101,
  0,
  0,
  321,
  322,
  5,
  108,
  0,
  0,
  322,
  323,
  5,
  115,
  0,
  0,
  323,
  324,
  5,
  101,
  0,
  0,
  324,
  30,
  1,
  0,
  0,
  0,
  325,
  326,
  5,
  101,
  0,
  0,
  326,
  327,
  5,
  110,
  0,
  0,
  327,
  328,
  5,
  100,
  0,
  0,
  328,
  32,
  1,
  0,
  0,
  0,
  329,
  330,
  5,
  101,
  0,
  0,
  330,
  331,
  5,
  110,
  0,
  0,
  331,
  332,
  5,
  117,
  0,
  0,
  332,
  333,
  5,
  109,
  0,
  0,
  333,
  34,
  1,
  0,
  0,
  0,
  334,
  335,
  5,
  101,
  0,
  0,
  335,
  336,
  5,
  118,
  0,
  0,
  336,
  337,
  5,
  97,
  0,
  0,
  337,
  338,
  5,
  108,
  0,
  0,
  338,
  339,
  5,
  117,
  0,
  0,
  339,
  340,
  5,
  97,
  0,
  0,
  340,
  341,
  5,
  116,
  0,
  0,
  341,
  342,
  5,
  101,
  0,
  0,
  342,
  343,
  5,
  115,
  0,
  0,
  343,
  36,
  1,
  0,
  0,
  0,
  344,
  345,
  5,
  102,
  0,
  0,
  345,
  346,
  5,
  111,
  0,
  0,
  346,
  347,
  5,
  114,
  0,
  0,
  347,
  38,
  1,
  0,
  0,
  0,
  348,
  349,
  5,
  102,
  0,
  0,
  349,
  350,
  5,
  114,
  0,
  0,
  350,
  351,
  5,
  111,
  0,
  0,
  351,
  352,
  5,
  109,
  0,
  0,
  352,
  40,
  1,
  0,
  0,
  0,
  353,
  354,
  5,
  102,
  0,
  0,
  354,
  355,
  5,
  117,
  0,
  0,
  355,
  356,
  5,
  110,
  0,
  0,
  356,
  357,
  5,
  99,
  0,
  0,
  357,
  358,
  5,
  116,
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
  111,
  0,
  0,
  360,
  361,
  5,
  110,
  0,
  0,
  361,
  42,
  1,
  0,
  0,
  0,
  362,
  363,
  5,
  105,
  0,
  0,
  363,
  364,
  5,
  102,
  0,
  0,
  364,
  44,
  1,
  0,
  0,
  0,
  365,
  366,
  5,
  105,
  0,
  0,
  366,
  367,
  5,
  110,
  0,
  0,
  367,
  46,
  1,
  0,
  0,
  0,
  368,
  369,
  5,
  105,
  0,
  0,
  369,
  370,
  5,
  110,
  0,
  0,
  370,
  371,
  5,
  104,
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
  114,
  0,
  0,
  373,
  374,
  5,
  105,
  0,
  0,
  374,
  375,
  5,
  116,
  0,
  0,
  375,
  376,
  5,
  115,
  0,
  0,
  376,
  48,
  1,
  0,
  0,
  0,
  377,
  378,
  5,
  105,
  0,
  0,
  378,
  379,
  5,
  110,
  0,
  0,
  379,
  380,
  5,
  112,
  0,
  0,
  380,
  381,
  5,
  117,
  0,
  0,
  381,
  382,
  5,
  116,
  0,
  0,
  382,
  50,
  1,
  0,
  0,
  0,
  383,
  384,
  5,
  108,
  0,
  0,
  384,
  385,
  5,
  97,
  0,
  0,
  385,
  386,
  5,
  109,
  0,
  0,
  386,
  387,
  5,
  98,
  0,
  0,
  387,
  388,
  5,
  100,
  0,
  0,
  388,
  389,
  5,
  97,
  0,
  0,
  389,
  52,
  1,
  0,
  0,
  0,
  390,
  391,
  5,
  108,
  0,
  0,
  391,
  392,
  5,
  101,
  0,
  0,
  392,
  393,
  5,
  116,
  0,
  0,
  393,
  54,
  1,
  0,
  0,
  0,
  394,
  395,
  5,
  109,
  0,
  0,
  395,
  396,
  5,
  97,
  0,
  0,
  396,
  397,
  5,
  105,
  0,
  0,
  397,
  398,
  5,
  110,
  0,
  0,
  398,
  56,
  1,
  0,
  0,
  0,
  399,
  400,
  5,
  109,
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
  100,
  0,
  0,
  402,
  58,
  1,
  0,
  0,
  0,
  403,
  404,
  5,
  110,
  0,
  0,
  404,
  405,
  5,
  101,
  0,
  0,
  405,
  406,
  5,
  119,
  0,
  0,
  406,
  60,
  1,
  0,
  0,
  0,
  407,
  408,
  5,
  110,
  0,
  0,
  408,
  409,
  5,
  111,
  0,
  0,
  409,
  410,
  5,
  116,
  0,
  0,
  410,
  62,
  1,
  0,
  0,
  0,
  411,
  412,
  5,
  111,
  0,
  0,
  412,
  413,
  5,
  102,
  0,
  0,
  413,
  64,
  1,
  0,
  0,
  0,
  414,
  415,
  5,
  111,
  0,
  0,
  415,
  416,
  5,
  114,
  0,
  0,
  416,
  66,
  1,
  0,
  0,
  0,
  417,
  418,
  5,
  112,
  0,
  0,
  418,
  419,
  5,
  114,
  0,
  0,
  419,
  420,
  5,
  105,
  0,
  0,
  420,
  421,
  5,
  110,
  0,
  0,
  421,
  422,
  5,
  116,
  0,
  0,
  422,
  68,
  1,
  0,
  0,
  0,
  423,
  424,
  5,
  112,
  0,
  0,
  424,
  425,
  5,
  114,
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
  118,
  0,
  0,
  427,
  428,
  5,
  97,
  0,
  0,
  428,
  429,
  5,
  116,
  0,
  0,
  429,
  430,
  5,
  101,
  0,
  0,
  430,
  70,
  1,
  0,
  0,
  0,
  431,
  432,
  5,
  112,
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
  111,
  0,
  0,
  434,
  435,
  5,
  99,
  0,
  0,
  435,
  436,
  5,
  101,
  0,
  0,
  436,
  437,
  5,
  100,
  0,
  0,
  437,
  438,
  5,
  117,
  0,
  0,
  438,
  439,
  5,
  114,
  0,
  0,
  439,
  440,
  5,
  101,
  0,
  0,
  440,
  72,
  1,
  0,
  0,
  0,
  441,
  442,
  5,
  112,
  0,
  0,
  442,
  443,
  5,
  114,
  0,
  0,
  443,
  444,
  5,
  111,
  0,
  0,
  444,
  445,
  5,
  112,
  0,
  0,
  445,
  446,
  5,
  101,
  0,
  0,
  446,
  447,
  5,
  114,
  0,
  0,
  447,
  448,
  5,
  116,
  0,
  0,
  448,
  449,
  5,
  121,
  0,
  0,
  449,
  74,
  1,
  0,
  0,
  0,
  450,
  451,
  5,
  114,
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
  454,
  5,
  117,
  0,
  0,
  454,
  455,
  5,
  114,
  0,
  0,
  455,
  456,
  5,
  110,
  0,
  0,
  456,
  76,
  1,
  0,
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
  101,
  0,
  0,
  459,
  460,
  5,
  116,
  0,
  0,
  460,
  461,
  5,
  117,
  0,
  0,
  461,
  462,
  5,
  114,
  0,
  0,
  462,
  463,
  5,
  110,
  0,
  0,
  463,
  464,
  5,
  115,
  0,
  0,
  464,
  78,
  1,
  0,
  0,
  0,
  465,
  466,
  5,
  115,
  0,
  0,
  466,
  467,
  5,
  101,
  0,
  0,
  467,
  468,
  5,
  116,
  0,
  0,
  468,
  80,
  1,
  0,
  0,
  0,
  469,
  470,
  5,
  115,
  0,
  0,
  470,
  471,
  5,
  116,
  0,
  0,
  471,
  472,
  5,
  101,
  0,
  0,
  472,
  473,
  5,
  112,
  0,
  0,
  473,
  82,
  1,
  0,
  0,
  0,
  474,
  475,
  5,
  116,
  0,
  0,
  475,
  476,
  5,
  101,
  0,
  0,
  476,
  477,
  5,
  115,
  0,
  0,
  477,
  478,
  5,
  116,
  0,
  0,
  478,
  84,
  1,
  0,
  0,
  0,
  479,
  480,
  5,
  116,
  0,
  0,
  480,
  481,
  5,
  104,
  0,
  0,
  481,
  482,
  5,
  101,
  0,
  0,
  482,
  483,
  5,
  110,
  0,
  0,
  483,
  86,
  1,
  0,
  0,
  0,
  484,
  485,
  5,
  116,
  0,
  0,
  485,
  486,
  5,
  104,
  0,
  0,
  486,
  487,
  5,
  105,
  0,
  0,
  487,
  488,
  5,
  115,
  0,
  0,
  488,
  88,
  1,
  0,
  0,
  0,
  489,
  490,
  5,
  116,
  0,
  0,
  490,
  491,
  5,
  104,
  0,
  0,
  491,
  492,
  5,
  114,
  0,
  0,
  492,
  493,
  5,
  111,
  0,
  0,
  493,
  494,
  5,
  119,
  0,
  0,
  494,
  90,
  1,
  0,
  0,
  0,
  495,
  496,
  5,
  116,
  0,
  0,
  496,
  497,
  5,
  111,
  0,
  0,
  497,
  92,
  1,
  0,
  0,
  0,
  498,
  499,
  5,
  116,
  0,
  0,
  499,
  500,
  5,
  114,
  0,
  0,
  500,
  501,
  5,
  121,
  0,
  0,
  501,
  94,
  1,
  0,
  0,
  0,
  502,
  503,
  5,
  118,
  0,
  0,
  503,
  504,
  5,
  97,
  0,
  0,
  504,
  505,
  5,
  114,
  0,
  0,
  505,
  506,
  5,
  105,
  0,
  0,
  506,
  507,
  5,
  97,
  0,
  0,
  507,
  508,
  5,
  98,
  0,
  0,
  508,
  509,
  5,
  108,
  0,
  0,
  509,
  510,
  5,
  101,
  0,
  0,
  510,
  96,
  1,
  0,
  0,
  0,
  511,
  512,
  5,
  119,
  0,
  0,
  512,
  513,
  5,
  104,
  0,
  0,
  513,
  514,
  5,
  105,
  0,
  0,
  514,
  515,
  5,
  108,
  0,
  0,
  515,
  516,
  5,
  101,
  0,
  0,
  516,
  98,
  1,
  0,
  0,
  0,
  517,
  518,
  5,
  73,
  0,
  0,
  518,
  519,
  5,
  110,
  0,
  0,
  519,
  520,
  5,
  116,
  0,
  0,
  520,
  100,
  1,
  0,
  0,
  0,
  521,
  522,
  5,
  70,
  0,
  0,
  522,
  523,
  5,
  108,
  0,
  0,
  523,
  524,
  5,
  111,
  0,
  0,
  524,
  525,
  5,
  97,
  0,
  0,
  525,
  526,
  5,
  116,
  0,
  0,
  526,
  102,
  1,
  0,
  0,
  0,
  527,
  528,
  5,
  66,
  0,
  0,
  528,
  529,
  5,
  111,
  0,
  0,
  529,
  530,
  5,
  111,
  0,
  0,
  530,
  531,
  5,
  108,
  0,
  0,
  531,
  532,
  5,
  101,
  0,
  0,
  532,
  533,
  5,
  97,
  0,
  0,
  533,
  534,
  5,
  110,
  0,
  0,
  534,
  104,
  1,
  0,
  0,
  0,
  535,
  536,
  5,
  83,
  0,
  0,
  536,
  537,
  5,
  116,
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
  105,
  0,
  0,
  539,
  540,
  5,
  110,
  0,
  0,
  540,
  541,
  5,
  103,
  0,
  0,
  541,
  106,
  1,
  0,
  0,
  0,
  542,
  543,
  5,
  76,
  0,
  0,
  543,
  544,
  5,
  105,
  0,
  0,
  544,
  545,
  5,
  115,
  0,
  0,
  545,
  546,
  5,
  116,
  0,
  0,
  546,
  108,
  1,
  0,
  0,
  0,
  547,
  551,
  5,
  35,
  0,
  0,
  548,
  550,
  8,
  0,
  0,
  0,
  549,
  548,
  1,
  0,
  0,
  0,
  550,
  553,
  1,
  0,
  0,
  0,
  551,
  549,
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
  110,
  1,
  0,
  0,
  0,
  553,
  551,
  1,
  0,
  0,
  0,
  554,
  555,
  5,
  116,
  0,
  0,
  555,
  556,
  5,
  114,
  0,
  0,
  556,
  557,
  5,
  117,
  0,
  0,
  557,
  564,
  5,
  101,
  0,
  0,
  558,
  559,
  5,
  102,
  0,
  0,
  559,
  560,
  5,
  97,
  0,
  0,
  560,
  561,
  5,
  108,
  0,
  0,
  561,
  562,
  5,
  115,
  0,
  0,
  562,
  564,
  5,
  101,
  0,
  0,
  563,
  554,
  1,
  0,
  0,
  0,
  563,
  558,
  1,
  0,
  0,
  0,
  564,
  112,
  1,
  0,
  0,
  0,
  565,
  566,
  5,
  105,
  0,
  0,
  566,
  567,
  5,
  115,
  0,
  0,
  567,
  114,
  1,
  0,
  0,
  0,
  568,
  569,
  5,
  105,
  0,
  0,
  569,
  570,
  5,
  115,
  0,
  0,
  570,
  571,
  5,
  110,
  0,
  0,
  571,
  572,
  5,
  116,
  0,
  0,
  572,
  116,
  1,
  0,
  0,
  0,
  573,
  574,
  5,
  61,
  0,
  0,
  574,
  575,
  5,
  62,
  0,
  0,
  575,
  118,
  1,
  0,
  0,
  0,
  576,
  577,
  5,
  94,
  0,
  0,
  577,
  120,
  1,
  0,
  0,
  0,
  578,
  579,
  5,
  48,
  0,
  0,
  579,
  580,
  5,
  98,
  0,
  0,
  580,
  122,
  1,
  0,
  0,
  0,
  581,
  582,
  5,
  48,
  0,
  0,
  582,
  583,
  5,
  120,
  0,
  0,
  583,
  124,
  1,
  0,
  0,
  0,
  584,
  585,
  5,
  36,
  0,
  0,
  585,
  126,
  1,
  0,
  0,
  0,
  586,
  588,
  7,
  1,
  0,
  0,
  587,
  586,
  1,
  0,
  0,
  0,
  588,
  589,
  1,
  0,
  0,
  0,
  589,
  587,
  1,
  0,
  0,
  0,
  589,
  590,
  1,
  0,
  0,
  0,
  590,
  591,
  1,
  0,
  0,
  0,
  591,
  592,
  6,
  63,
  0,
  0,
  592,
  128,
  1,
  0,
  0,
  0,
  593,
  595,
  7,
  2,
  0,
  0,
  594,
  593,
  1,
  0,
  0,
  0,
  595,
  596,
  1,
  0,
  0,
  0,
  596,
  594,
  1,
  0,
  0,
  0,
  596,
  597,
  1,
  0,
  0,
  0,
  597,
  130,
  1,
  0,
  0,
  0,
  598,
  599,
  5,
  61,
  0,
  0,
  599,
  132,
  1,
  0,
  0,
  0,
  600,
  601,
  5,
  123,
  0,
  0,
  601,
  134,
  1,
  0,
  0,
  0,
  602,
  603,
  5,
  125,
  0,
  0,
  603,
  136,
  1,
  0,
  0,
  0,
  604,
  605,
  5,
  91,
  0,
  0,
  605,
  138,
  1,
  0,
  0,
  0,
  606,
  607,
  5,
  93,
  0,
  0,
  607,
  140,
  1,
  0,
  0,
  0,
  608,
  609,
  5,
  40,
  0,
  0,
  609,
  142,
  1,
  0,
  0,
  0,
  610,
  611,
  5,
  41,
  0,
  0,
  611,
  144,
  1,
  0,
  0,
  0,
  612,
  613,
  5,
  46,
  0,
  0,
  613,
  146,
  1,
  0,
  0,
  0,
  614,
  615,
  5,
  44,
  0,
  0,
  615,
  148,
  1,
  0,
  0,
  0,
  616,
  617,
  5,
  58,
  0,
  0,
  617,
  150,
  1,
  0,
  0,
  0,
  618,
  619,
  5,
  43,
  0,
  0,
  619,
  152,
  1,
  0,
  0,
  0,
  620,
  621,
  5,
  45,
  0,
  0,
  621,
  154,
  1,
  0,
  0,
  0,
  622,
  623,
  5,
  42,
  0,
  0,
  623,
  156,
  1,
  0,
  0,
  0,
  624,
  625,
  5,
  47,
  0,
  0,
  625,
  158,
  1,
  0,
  0,
  0,
  626,
  627,
  5,
  60,
  0,
  0,
  627,
  160,
  1,
  0,
  0,
  0,
  628,
  629,
  5,
  62,
  0,
  0,
  629,
  162,
  1,
  0,
  0,
  0,
  630,
  631,
  5,
  60,
  0,
  0,
  631,
  632,
  5,
  61,
  0,
  0,
  632,
  164,
  1,
  0,
  0,
  0,
  633,
  634,
  5,
  62,
  0,
  0,
  634,
  635,
  5,
  61,
  0,
  0,
  635,
  166,
  1,
  0,
  0,
  0,
  636,
  637,
  5,
  34,
  0,
  0,
  637,
  168,
  1,
  0,
  0,
  0,
  638,
  639,
  5,
  105,
  0,
  0,
  639,
  640,
  5,
  102,
  0,
  0,
  640,
  641,
  5,
  95,
  0,
  0,
  641,
  170,
  1,
  0,
  0,
  0,
  642,
  643,
  5,
  116,
  0,
  0,
  643,
  644,
  5,
  101,
  0,
  0,
  644,
  645,
  5,
  115,
  0,
  0,
  645,
  646,
  5,
  116,
  0,
  0,
  646,
  647,
  5,
  95,
  0,
  0,
  647,
  651,
  1,
  0,
  0,
  0,
  648,
  650,
  3,
  215,
  107,
  0,
  649,
  648,
  1,
  0,
  0,
  0,
  650,
  653,
  1,
  0,
  0,
  0,
  651,
  649,
  1,
  0,
  0,
  0,
  651,
  652,
  1,
  0,
  0,
  0,
  652,
  172,
  1,
  0,
  0,
  0,
  653,
  651,
  1,
  0,
  0,
  0,
  654,
  658,
  3,
  231,
  115,
  0,
  655,
  657,
  3,
  215,
  107,
  0,
  656,
  655,
  1,
  0,
  0,
  0,
  657,
  660,
  1,
  0,
  0,
  0,
  658,
  656,
  1,
  0,
  0,
  0,
  658,
  659,
  1,
  0,
  0,
  0,
  659,
  174,
  1,
  0,
  0,
  0,
  660,
  658,
  1,
  0,
  0,
  0,
  661,
  665,
  3,
  229,
  114,
  0,
  662,
  664,
  3,
  215,
  107,
  0,
  663,
  662,
  1,
  0,
  0,
  0,
  664,
  667,
  1,
  0,
  0,
  0,
  665,
  663,
  1,
  0,
  0,
  0,
  665,
  666,
  1,
  0,
  0,
  0,
  666,
  176,
  1,
  0,
  0,
  0,
  667,
  665,
  1,
  0,
  0,
  0,
  668,
  670,
  3,
  121,
  60,
  0,
  669,
  671,
  7,
  3,
  0,
  0,
  670,
  669,
  1,
  0,
  0,
  0,
  671,
  672,
  1,
  0,
  0,
  0,
  672,
  670,
  1,
  0,
  0,
  0,
  672,
  673,
  1,
  0,
  0,
  0,
  673,
  178,
  1,
  0,
  0,
  0,
  674,
  676,
  3,
  123,
  61,
  0,
  675,
  677,
  7,
  4,
  0,
  0,
  676,
  675,
  1,
  0,
  0,
  0,
  677,
  678,
  1,
  0,
  0,
  0,
  678,
  676,
  1,
  0,
  0,
  0,
  678,
  679,
  1,
  0,
  0,
  0,
  679,
  180,
  1,
  0,
  0,
  0,
  680,
  684,
  7,
  5,
  0,
  0,
  681,
  683,
  7,
  5,
  0,
  0,
  682,
  681,
  1,
  0,
  0,
  0,
  683,
  686,
  1,
  0,
  0,
  0,
  684,
  682,
  1,
  0,
  0,
  0,
  684,
  685,
  1,
  0,
  0,
  0,
  685,
  182,
  1,
  0,
  0,
  0,
  686,
  684,
  1,
  0,
  0,
  0,
  687,
  688,
  3,
  181,
  90,
  0,
  688,
  689,
  3,
  145,
  72,
  0,
  689,
  691,
  3,
  181,
  90,
  0,
  690,
  692,
  3,
  199,
  99,
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
  184,
  1,
  0,
  0,
  0,
  693,
  694,
  3,
  125,
  62,
  0,
  694,
  699,
  5,
  34,
  0,
  0,
  695,
  698,
  8,
  6,
  0,
  0,
  696,
  698,
  3,
  201,
  100,
  0,
  697,
  695,
  1,
  0,
  0,
  0,
  697,
  696,
  1,
  0,
  0,
  0,
  698,
  701,
  1,
  0,
  0,
  0,
  699,
  697,
  1,
  0,
  0,
  0,
  699,
  700,
  1,
  0,
  0,
  0,
  700,
  702,
  1,
  0,
  0,
  0,
  701,
  699,
  1,
  0,
  0,
  0,
  702,
  703,
  5,
  34,
  0,
  0,
  703,
  186,
  1,
  0,
  0,
  0,
  704,
  709,
  5,
  34,
  0,
  0,
  705,
  708,
  8,
  6,
  0,
  0,
  706,
  708,
  3,
  201,
  100,
  0,
  707,
  705,
  1,
  0,
  0,
  0,
  707,
  706,
  1,
  0,
  0,
  0,
  708,
  711,
  1,
  0,
  0,
  0,
  709,
  707,
  1,
  0,
  0,
  0,
  709,
  710,
  1,
  0,
  0,
  0,
  710,
  712,
  1,
  0,
  0,
  0,
  711,
  709,
  1,
  0,
  0,
  0,
  712,
  713,
  5,
  34,
  0,
  0,
  713,
  188,
  1,
  0,
  0,
  0,
  714,
  716,
  3,
  209,
  104,
  0,
  715,
  714,
  1,
  0,
  0,
  0,
  716,
  717,
  1,
  0,
  0,
  0,
  717,
  715,
  1,
  0,
  0,
  0,
  717,
  718,
  1,
  0,
  0,
  0,
  718,
  719,
  1,
  0,
  0,
  0,
  719,
  720,
  6,
  94,
  0,
  0,
  720,
  190,
  1,
  0,
  0,
  0,
  721,
  723,
  3,
  201,
  100,
  0,
  722,
  721,
  1,
  0,
  0,
  0,
  723,
  724,
  1,
  0,
  0,
  0,
  724,
  722,
  1,
  0,
  0,
  0,
  724,
  725,
  1,
  0,
  0,
  0,
  725,
  192,
  1,
  0,
  0,
  0,
  726,
  727,
  5,
  91,
  0,
  0,
  727,
  728,
  5,
  103,
  0,
  0,
  728,
  729,
  5,
  104,
  0,
  0,
  729,
  730,
  5,
  111,
  0,
  0,
  730,
  731,
  5,
  115,
  0,
  0,
  731,
  732,
  5,
  116,
  0,
  0,
  732,
  733,
  5,
  101,
  0,
  0,
  733,
  734,
  5,
  100,
  0,
  0,
  734,
  735,
  5,
  93,
  0,
  0,
  735,
  194,
  1,
  0,
  0,
  0,
  736,
  737,
  8,
  7,
  0,
  0,
  737,
  196,
  1,
  0,
  0,
  0,
  738,
  739,
  7,
  7,
  0,
  0,
  739,
  198,
  1,
  0,
  0,
  0,
  740,
  743,
  7,
  8,
  0,
  0,
  741,
  744,
  3,
  151,
  75,
  0,
  742,
  744,
  3,
  153,
  76,
  0,
  743,
  741,
  1,
  0,
  0,
  0,
  743,
  742,
  1,
  0,
  0,
  0,
  743,
  744,
  1,
  0,
  0,
  0,
  744,
  745,
  1,
  0,
  0,
  0,
  745,
  746,
  3,
  181,
  90,
  0,
  746,
  200,
  1,
  0,
  0,
  0,
  747,
  751,
  3,
  203,
  101,
  0,
  748,
  751,
  3,
  205,
  102,
  0,
  749,
  751,
  3,
  225,
  112,
  0,
  750,
  747,
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
  749,
  1,
  0,
  0,
  0,
  751,
  202,
  1,
  0,
  0,
  0,
  752,
  753,
  5,
  92,
  0,
  0,
  753,
  775,
  5,
  39,
  0,
  0,
  754,
  755,
  5,
  92,
  0,
  0,
  755,
  775,
  5,
  34,
  0,
  0,
  756,
  757,
  5,
  92,
  0,
  0,
  757,
  775,
  5,
  92,
  0,
  0,
  758,
  759,
  5,
  92,
  0,
  0,
  759,
  775,
  5,
  48,
  0,
  0,
  760,
  761,
  5,
  92,
  0,
  0,
  761,
  775,
  5,
  97,
  0,
  0,
  762,
  763,
  5,
  92,
  0,
  0,
  763,
  775,
  5,
  98,
  0,
  0,
  764,
  765,
  5,
  92,
  0,
  0,
  765,
  775,
  5,
  102,
  0,
  0,
  766,
  767,
  5,
  92,
  0,
  0,
  767,
  775,
  5,
  110,
  0,
  0,
  768,
  769,
  5,
  92,
  0,
  0,
  769,
  775,
  5,
  114,
  0,
  0,
  770,
  771,
  5,
  92,
  0,
  0,
  771,
  775,
  5,
  116,
  0,
  0,
  772,
  773,
  5,
  92,
  0,
  0,
  773,
  775,
  5,
  118,
  0,
  0,
  774,
  752,
  1,
  0,
  0,
  0,
  774,
  754,
  1,
  0,
  0,
  0,
  774,
  756,
  1,
  0,
  0,
  0,
  774,
  758,
  1,
  0,
  0,
  0,
  774,
  760,
  1,
  0,
  0,
  0,
  774,
  762,
  1,
  0,
  0,
  0,
  774,
  764,
  1,
  0,
  0,
  0,
  774,
  766,
  1,
  0,
  0,
  0,
  774,
  768,
  1,
  0,
  0,
  0,
  774,
  770,
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
  775,
  204,
  1,
  0,
  0,
  0,
  776,
  777,
  5,
  92,
  0,
  0,
  777,
  778,
  5,
  120,
  0,
  0,
  778,
  779,
  1,
  0,
  0,
  0,
  779,
  802,
  3,
  227,
  113,
  0,
  780,
  781,
  5,
  92,
  0,
  0,
  781,
  782,
  5,
  120,
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
  3,
  227,
  113,
  0,
  784,
  785,
  3,
  227,
  113,
  0,
  785,
  802,
  1,
  0,
  0,
  0,
  786,
  787,
  5,
  92,
  0,
  0,
  787,
  788,
  5,
  120,
  0,
  0,
  788,
  789,
  1,
  0,
  0,
  0,
  789,
  790,
  3,
  227,
  113,
  0,
  790,
  791,
  3,
  227,
  113,
  0,
  791,
  792,
  3,
  227,
  113,
  0,
  792,
  802,
  1,
  0,
  0,
  0,
  793,
  794,
  5,
  92,
  0,
  0,
  794,
  795,
  5,
  120,
  0,
  0,
  795,
  796,
  1,
  0,
  0,
  0,
  796,
  797,
  3,
  227,
  113,
  0,
  797,
  798,
  3,
  227,
  113,
  0,
  798,
  799,
  3,
  227,
  113,
  0,
  799,
  800,
  3,
  227,
  113,
  0,
  800,
  802,
  1,
  0,
  0,
  0,
  801,
  776,
  1,
  0,
  0,
  0,
  801,
  780,
  1,
  0,
  0,
  0,
  801,
  786,
  1,
  0,
  0,
  0,
  801,
  793,
  1,
  0,
  0,
  0,
  802,
  206,
  1,
  0,
  0,
  0,
  803,
  804,
  5,
  13,
  0,
  0,
  804,
  807,
  5,
  10,
  0,
  0,
  805,
  807,
  7,
  7,
  0,
  0,
  806,
  803,
  1,
  0,
  0,
  0,
  806,
  805,
  1,
  0,
  0,
  0,
  807,
  208,
  1,
  0,
  0,
  0,
  808,
  811,
  3,
  211,
  105,
  0,
  809,
  811,
  7,
  9,
  0,
  0,
  810,
  808,
  1,
  0,
  0,
  0,
  810,
  809,
  1,
  0,
  0,
  0,
  811,
  210,
  1,
  0,
  0,
  0,
  812,
  813,
  7,
  10,
  0,
  0,
  813,
  212,
  1,
  0,
  0,
  0,
  814,
  817,
  3,
  231,
  115,
  0,
  815,
  817,
  3,
  229,
  114,
  0,
  816,
  814,
  1,
  0,
  0,
  0,
  816,
  815,
  1,
  0,
  0,
  0,
  817,
  821,
  1,
  0,
  0,
  0,
  818,
  820,
  3,
  215,
  107,
  0,
  819,
  818,
  1,
  0,
  0,
  0,
  820,
  823,
  1,
  0,
  0,
  0,
  821,
  819,
  1,
  0,
  0,
  0,
  821,
  822,
  1,
  0,
  0,
  0,
  822,
  214,
  1,
  0,
  0,
  0,
  823,
  821,
  1,
  0,
  0,
  0,
  824,
  829,
  3,
  229,
  114,
  0,
  825,
  829,
  3,
  231,
  115,
  0,
  826,
  829,
  3,
  219,
  109,
  0,
  827,
  829,
  5,
  95,
  0,
  0,
  828,
  824,
  1,
  0,
  0,
  0,
  828,
  825,
  1,
  0,
  0,
  0,
  828,
  826,
  1,
  0,
  0,
  0,
  828,
  827,
  1,
  0,
  0,
  0,
  829,
  216,
  1,
  0,
  0,
  0,
  830,
  834,
  3,
  229,
  114,
  0,
  831,
  834,
  3,
  231,
  115,
  0,
  832,
  834,
  3,
  225,
  112,
  0,
  833,
  830,
  1,
  0,
  0,
  0,
  833,
  831,
  1,
  0,
  0,
  0,
  833,
  832,
  1,
  0,
  0,
  0,
  834,
  218,
  1,
  0,
  0,
  0,
  835,
  838,
  3,
  233,
  116,
  0,
  836,
  838,
  3,
  225,
  112,
  0,
  837,
  835,
  1,
  0,
  0,
  0,
  837,
  836,
  1,
  0,
  0,
  0,
  838,
  220,
  1,
  0,
  0,
  0,
  839,
  840,
  3,
  225,
  112,
  0,
  840,
  222,
  1,
  0,
  0,
  0,
  841,
  842,
  3,
  225,
  112,
  0,
  842,
  224,
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
  117,
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
  227,
  113,
  0,
  847,
  848,
  3,
  227,
  113,
  0,
  848,
  849,
  3,
  227,
  113,
  0,
  849,
  850,
  3,
  227,
  113,
  0,
  850,
  864,
  1,
  0,
  0,
  0,
  851,
  852,
  5,
  92,
  0,
  0,
  852,
  853,
  5,
  85,
  0,
  0,
  853,
  854,
  1,
  0,
  0,
  0,
  854,
  855,
  3,
  227,
  113,
  0,
  855,
  856,
  3,
  227,
  113,
  0,
  856,
  857,
  3,
  227,
  113,
  0,
  857,
  858,
  3,
  227,
  113,
  0,
  858,
  859,
  3,
  227,
  113,
  0,
  859,
  860,
  3,
  227,
  113,
  0,
  860,
  861,
  3,
  227,
  113,
  0,
  861,
  862,
  3,
  227,
  113,
  0,
  862,
  864,
  1,
  0,
  0,
  0,
  863,
  843,
  1,
  0,
  0,
  0,
  863,
  851,
  1,
  0,
  0,
  0,
  864,
  226,
  1,
  0,
  0,
  0,
  865,
  867,
  7,
  4,
  0,
  0,
  866,
  865,
  1,
  0,
  0,
  0,
  867,
  228,
  1,
  0,
  0,
  0,
  868,
  869,
  2,
  65,
  90,
  0,
  869,
  230,
  1,
  0,
  0,
  0,
  870,
  871,
  2,
  97,
  122,
  0,
  871,
  232,
  1,
  0,
  0,
  0,
  872,
  873,
  2,
  48,
  57,
  0,
  873,
  234,
  1,
  0,
  0,
  0,
  31,
  0,
  551,
  563,
  589,
  596,
  651,
  658,
  665,
  672,
  678,
  684,
  691,
  697,
  699,
  707,
  709,
  717,
  724,
  743,
  750,
  774,
  801,
  806,
  810,
  816,
  821,
  828,
  833,
  837,
  863,
  866,
  1,
  6,
  0,
  0
];
var atn = new Ln.atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map((ds, index) => new Ln.dfa.DFA(ds, index));
var Elan2Lexer = class extends Ln.Lexer {
  static grammarFileName = "Elan2.g4";
  static channelNames = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"];
  static modeNames = ["DEFAULT_MODE"];
  static literalNames = [
    null,
    "'abstract'",
    "'and'",
    "'as'",
    "'assert'",
    "'assign'",
    "'be'",
    "'call'",
    "'catch'",
    "'class'",
    "'constant'",
    "'constructor'",
    "'copy'",
    "'div'",
    "'elif'",
    "'else'",
    "'end'",
    "'enum'",
    "'evaluates'",
    "'for'",
    "'from'",
    "'function'",
    "'if'",
    "'in'",
    "'inherits'",
    "'input'",
    "'lambda'",
    "'let'",
    "'main'",
    "'mod'",
    "'new'",
    "'not'",
    "'of'",
    "'or'",
    "'print'",
    "'private'",
    "'procedure'",
    "'property'",
    "'return'",
    "'returns'",
    "'set'",
    "'step'",
    "'test'",
    "'then'",
    "'this'",
    "'throw'",
    "'to'",
    "'try'",
    "'variable'",
    "'while'",
    "'Int'",
    "'Float'",
    "'Boolean'",
    "'String'",
    "'List'",
    null,
    null,
    "'is'",
    "'isnt'",
    "'=>'",
    "'^'",
    "'0b'",
    "'0x'",
    "'$'",
    null,
    null,
    "'='",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'('",
    "')'",
    "'.'",
    "','",
    "':'",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'<'",
    "'>'",
    "'<='",
    "'>='",
    `'"'`,
    "'if_'",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "'[ghosted]'"
  ];
  static symbolicNames = [
    null,
    "ABSTRACT",
    "AND",
    "AS",
    "ASSERT",
    "ASSIGN",
    "BE",
    "CALL",
    "CATCH",
    "CLASS",
    "CONSTANT",
    "CONSTRUCTOR",
    "COPY",
    "DIV",
    "ELIF",
    "ELSE",
    "END",
    "ENUM",
    "EVALUATES",
    "FOR",
    "FROM",
    "FUNCTION",
    "IF",
    "IN",
    "INHERITS",
    "INPUT",
    "LAMBDA",
    "LET",
    "MAIN",
    "MOD",
    "NEW",
    "NOT",
    "OF",
    "OR",
    "PRINT",
    "PRIVATE",
    "PROCEDURE",
    "PROPERTY",
    "RETURN",
    "RETURNS",
    "SET",
    "STEP",
    "TEST",
    "THEN",
    "THIS",
    "THROW",
    "TO",
    "TRY",
    "VARIABLE",
    "WHILE",
    "INT_NAME",
    "FLOAT_NAME",
    "BOOL_NAME",
    "STRING_NAME",
    "LIST_NAME",
    "COMMENT",
    "LIT_BOOLEAN",
    "EQUAL",
    "NOT_EQUAL",
    "ARROW",
    "POWER",
    "BINARY_PREFIX",
    "HEX_PREFIX",
    "INTERPOLATED_STRING_PREFIX",
    "WS",
    "NL",
    "SINGLE_EQUALS",
    "OPEN_BRACE",
    "CLOSE_BRACE",
    "OPEN_SQ_BRACKET",
    "CLOSE_SQ_BRACKET",
    "OPEN_BRACKET",
    "CLOSE_BRACKET",
    "DOT",
    "COMMA",
    "COLON",
    "PLUS",
    "MINUS",
    "MULT",
    "DIVIDE",
    "LT",
    "GT",
    "LE",
    "GE",
    "DOUBLE_QUOTES",
    "IF_",
    "NAME_STARTING_TEST_",
    "NAME_STARTING_LC",
    "NAME_STARTING_UC",
    "LITERAL_BINARY",
    "LITERAL_HEX",
    "LITERAL_INTEGER",
    "LITERAL_FLOAT",
    "INTERPOLATED_STRING",
    "LITERAL_STRING",
    "WHITESPACES",
    "TEXT",
    "GHOSTED"
  ];
  static ruleNames = [
    "ABSTRACT",
    "AND",
    "AS",
    "ASSERT",
    "ASSIGN",
    "BE",
    "CALL",
    "CATCH",
    "CLASS",
    "CONSTANT",
    "CONSTRUCTOR",
    "COPY",
    "DIV",
    "ELIF",
    "ELSE",
    "END",
    "ENUM",
    "EVALUATES",
    "FOR",
    "FROM",
    "FUNCTION",
    "IF",
    "IN",
    "INHERITS",
    "INPUT",
    "LAMBDA",
    "LET",
    "MAIN",
    "MOD",
    "NEW",
    "NOT",
    "OF",
    "OR",
    "PRINT",
    "PRIVATE",
    "PROCEDURE",
    "PROPERTY",
    "RETURN",
    "RETURNS",
    "SET",
    "STEP",
    "TEST",
    "THEN",
    "THIS",
    "THROW",
    "TO",
    "TRY",
    "VARIABLE",
    "WHILE",
    "INT_NAME",
    "FLOAT_NAME",
    "BOOL_NAME",
    "STRING_NAME",
    "LIST_NAME",
    "COMMENT",
    "LIT_BOOLEAN",
    "EQUAL",
    "NOT_EQUAL",
    "ARROW",
    "POWER",
    "BINARY_PREFIX",
    "HEX_PREFIX",
    "INTERPOLATED_STRING_PREFIX",
    "WS",
    "NL",
    "SINGLE_EQUALS",
    "OPEN_BRACE",
    "CLOSE_BRACE",
    "OPEN_SQ_BRACKET",
    "CLOSE_SQ_BRACKET",
    "OPEN_BRACKET",
    "CLOSE_BRACKET",
    "DOT",
    "COMMA",
    "COLON",
    "PLUS",
    "MINUS",
    "MULT",
    "DIVIDE",
    "LT",
    "GT",
    "LE",
    "GE",
    "DOUBLE_QUOTES",
    "IF_",
    "NAME_STARTING_TEST_",
    "NAME_STARTING_LC",
    "NAME_STARTING_UC",
    "LITERAL_BINARY",
    "LITERAL_HEX",
    "LITERAL_INTEGER",
    "LITERAL_FLOAT",
    "INTERPOLATED_STRING",
    "LITERAL_STRING",
    "WHITESPACES",
    "TEXT",
    "GHOSTED",
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
    "IdentifierPartCharacter",
    "LetterCharacter",
    "DecimalDigitCharacter",
    "ConnectingCharacter",
    "FormattingCharacter",
    "UnicodeEscapeSequence",
    "HexDigit",
    "UnicodeClassLU",
    "UnicodeClassLL",
    "UnicodeClassND"
  ];
  constructor(input) {
    super(input);
    this._interp = new Ln.atn.LexerATNSimulator(this, atn, decisionsToDFA, new Ln.atn.PredictionContextCache());
  }
};
Elan2Lexer.EOF = Ln.Token.EOF;
Elan2Lexer.ABSTRACT = 1;
Elan2Lexer.AND = 2;
Elan2Lexer.AS = 3;
Elan2Lexer.ASSERT = 4;
Elan2Lexer.ASSIGN = 5;
Elan2Lexer.BE = 6;
Elan2Lexer.CALL = 7;
Elan2Lexer.CATCH = 8;
Elan2Lexer.CLASS = 9;
Elan2Lexer.CONSTANT = 10;
Elan2Lexer.CONSTRUCTOR = 11;
Elan2Lexer.COPY = 12;
Elan2Lexer.DIV = 13;
Elan2Lexer.ELIF = 14;
Elan2Lexer.ELSE = 15;
Elan2Lexer.END = 16;
Elan2Lexer.ENUM = 17;
Elan2Lexer.EVALUATES = 18;
Elan2Lexer.FOR = 19;
Elan2Lexer.FROM = 20;
Elan2Lexer.FUNCTION = 21;
Elan2Lexer.IF = 22;
Elan2Lexer.IN = 23;
Elan2Lexer.INHERITS = 24;
Elan2Lexer.INPUT = 25;
Elan2Lexer.LAMBDA = 26;
Elan2Lexer.LET = 27;
Elan2Lexer.MAIN = 28;
Elan2Lexer.MOD = 29;
Elan2Lexer.NEW = 30;
Elan2Lexer.NOT = 31;
Elan2Lexer.OF = 32;
Elan2Lexer.OR = 33;
Elan2Lexer.PRINT = 34;
Elan2Lexer.PRIVATE = 35;
Elan2Lexer.PROCEDURE = 36;
Elan2Lexer.PROPERTY = 37;
Elan2Lexer.RETURN = 38;
Elan2Lexer.RETURNS = 39;
Elan2Lexer.SET = 40;
Elan2Lexer.STEP = 41;
Elan2Lexer.TEST = 42;
Elan2Lexer.THEN = 43;
Elan2Lexer.THIS = 44;
Elan2Lexer.THROW = 45;
Elan2Lexer.TO = 46;
Elan2Lexer.TRY = 47;
Elan2Lexer.VARIABLE = 48;
Elan2Lexer.WHILE = 49;
Elan2Lexer.INT_NAME = 50;
Elan2Lexer.FLOAT_NAME = 51;
Elan2Lexer.BOOL_NAME = 52;
Elan2Lexer.STRING_NAME = 53;
Elan2Lexer.LIST_NAME = 54;
Elan2Lexer.COMMENT = 55;
Elan2Lexer.LIT_BOOLEAN = 56;
Elan2Lexer.EQUAL = 57;
Elan2Lexer.NOT_EQUAL = 58;
Elan2Lexer.ARROW = 59;
Elan2Lexer.POWER = 60;
Elan2Lexer.BINARY_PREFIX = 61;
Elan2Lexer.HEX_PREFIX = 62;
Elan2Lexer.INTERPOLATED_STRING_PREFIX = 63;
Elan2Lexer.WS = 64;
Elan2Lexer.NL = 65;
Elan2Lexer.SINGLE_EQUALS = 66;
Elan2Lexer.OPEN_BRACE = 67;
Elan2Lexer.CLOSE_BRACE = 68;
Elan2Lexer.OPEN_SQ_BRACKET = 69;
Elan2Lexer.CLOSE_SQ_BRACKET = 70;
Elan2Lexer.OPEN_BRACKET = 71;
Elan2Lexer.CLOSE_BRACKET = 72;
Elan2Lexer.DOT = 73;
Elan2Lexer.COMMA = 74;
Elan2Lexer.COLON = 75;
Elan2Lexer.PLUS = 76;
Elan2Lexer.MINUS = 77;
Elan2Lexer.MULT = 78;
Elan2Lexer.DIVIDE = 79;
Elan2Lexer.LT = 80;
Elan2Lexer.GT = 81;
Elan2Lexer.LE = 82;
Elan2Lexer.GE = 83;
Elan2Lexer.DOUBLE_QUOTES = 84;
Elan2Lexer.IF_ = 85;
Elan2Lexer.NAME_STARTING_TEST_ = 86;
Elan2Lexer.NAME_STARTING_LC = 87;
Elan2Lexer.NAME_STARTING_UC = 88;
Elan2Lexer.LITERAL_BINARY = 89;
Elan2Lexer.LITERAL_HEX = 90;
Elan2Lexer.LITERAL_INTEGER = 91;
Elan2Lexer.LITERAL_FLOAT = 92;
Elan2Lexer.INTERPOLATED_STRING = 93;
Elan2Lexer.LITERAL_STRING = 94;
Elan2Lexer.WHITESPACES = 95;
Elan2Lexer.TEXT = 96;
Elan2Lexer.GHOSTED = 97;

// src/generatedElan2/Elan2Listener.js
var Elan2Listener = class extends Ln.tree.ParseTreeListener {
  // Enter a parse tree produced by Elan2Parser#file.
  enterFile(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#file.
  exitFile(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#global.
  enterGlobal(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#global.
  exitGlobal(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#main.
  enterMain(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#main.
  exitMain(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#function.
  enterFunction(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#function.
  exitFunction(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#test.
  enterTest(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#test.
  exitTest(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#procedure.
  enterProcedure(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#procedure.
  exitProcedure(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#concreteClass.
  enterConcreteClass(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#concreteClass.
  exitConcreteClass(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#abstractClass.
  enterAbstractClass(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#abstractClass.
  exitAbstractClass(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#commentGlobal.
  enterCommentGlobal(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#commentGlobal.
  exitCommentGlobal(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#ordinaryStatement.
  enterOrdinaryStatement(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#ordinaryStatement.
  exitOrdinaryStatement(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#ifStatement.
  enterIfStatement(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#ifStatement.
  exitIfStatement(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#whileLoop.
  enterWhileLoop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#whileLoop.
  exitWhileLoop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#forLoop.
  enterForLoop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#forLoop.
  exitForLoop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#tryStatement.
  enterTryStatement(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#tryStatement.
  exitTryStatement(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#commentStatement.
  enterCommentStatement(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#commentStatement.
  exitCommentStatement(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#constructorMember.
  enterConstructorMember(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#constructorMember.
  exitConstructorMember(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#functionMethod.
  enterFunctionMethod(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#functionMethod.
  exitFunctionMethod(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#procedureMethod.
  enterProcedureMethod(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#procedureMethod.
  exitProcedureMethod(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#copyMethod.
  enterCopyMethod(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#copyMethod.
  exitCopyMethod(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#commentMember.
  enterCommentMember(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#commentMember.
  exitCommentMember(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#mainTop.
  enterMainTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#mainTop.
  exitMainTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#mainBottom.
  enterMainBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#mainBottom.
  exitMainBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#functionTop.
  enterFunctionTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#functionTop.
  exitFunctionTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#functionBottom.
  enterFunctionBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#functionBottom.
  exitFunctionBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#testTop.
  enterTestTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#testTop.
  exitTestTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#testBottom.
  enterTestBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#testBottom.
  exitTestBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#procedureTop.
  enterProcedureTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#procedureTop.
  exitProcedureTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#procedureBottom.
  enterProcedureBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#procedureBottom.
  exitProcedureBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#concreteClassTop.
  enterConcreteClassTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#concreteClassTop.
  exitConcreteClassTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#concreteClassBottom.
  enterConcreteClassBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#concreteClassBottom.
  exitConcreteClassBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#abstractClassTop.
  enterAbstractClassTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#abstractClassTop.
  exitAbstractClassTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#abstractClassBottom.
  enterAbstractClassBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#abstractClassBottom.
  exitAbstractClassBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#constant.
  enterConstant(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#constant.
  exitConstant(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#enum.
  enterEnum(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#enum.
  exitEnum(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#assert.
  enterAssert(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#assert.
  exitAssert(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#letStatement.
  enterLetStatement(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#letStatement.
  exitLetStatement(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#print.
  enterPrint(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#print.
  exitPrint(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#variableDefinition.
  enterVariableDefinition(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#variableDefinition.
  exitVariableDefinition(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#assignment.
  enterAssignment(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#assignment.
  exitAssignment(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#inputStatement.
  enterInputStatement(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#inputStatement.
  exitInputStatement(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#procedureCall.
  enterProcedureCall(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#procedureCall.
  exitProcedureCall(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#throwStatement.
  enterThrowStatement(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#throwStatement.
  exitThrowStatement(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#returnStatement.
  enterReturnStatement(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#returnStatement.
  exitReturnStatement(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#elseIfClause.
  enterElseIfClause(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#elseIfClause.
  exitElseIfClause(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#elseClause.
  enterElseClause(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#elseClause.
  exitElseClause(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#catchStatement.
  enterCatchStatement(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#catchStatement.
  exitCatchStatement(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#ifStatementTop.
  enterIfStatementTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#ifStatementTop.
  exitIfStatementTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#ifStatementBottom.
  enterIfStatementBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#ifStatementBottom.
  exitIfStatementBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#whileLoopTop.
  enterWhileLoopTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#whileLoopTop.
  exitWhileLoopTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#whileLoopBottom.
  enterWhileLoopBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#whileLoopBottom.
  exitWhileLoopBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#forLoopTop.
  enterForLoopTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#forLoopTop.
  exitForLoopTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#forLoopBottom.
  enterForLoopBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#forLoopBottom.
  exitForLoopBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#tryStatementTop.
  enterTryStatementTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#tryStatementTop.
  exitTryStatementTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#tryStatementBottom.
  enterTryStatementBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#tryStatementBottom.
  exitTryStatementBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#constructorTop.
  enterConstructorTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#constructorTop.
  exitConstructorTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#constructorBottom.
  enterConstructorBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#constructorBottom.
  exitConstructorBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#property.
  enterProperty(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#property.
  exitProperty(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#functionMethodTop.
  enterFunctionMethodTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#functionMethodTop.
  exitFunctionMethodTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#functionMethodBottom.
  enterFunctionMethodBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#functionMethodBottom.
  exitFunctionMethodBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#procedureMethodTop.
  enterProcedureMethodTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#procedureMethodTop.
  exitProcedureMethodTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#procedureMethodBottom.
  enterProcedureMethodBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#procedureMethodBottom.
  exitProcedureMethodBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#copyMethodTop.
  enterCopyMethodTop(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#copyMethodTop.
  exitCopyMethodTop(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#copyMethodBottom.
  enterCopyMethodBottom(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#copyMethodBottom.
  exitCopyMethodBottom(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#abstractFunction.
  enterAbstractFunction(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#abstractFunction.
  exitAbstractFunction(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#abstractProcedure.
  enterAbstractProcedure(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#abstractProcedure.
  exitAbstractProcedure(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#identifier.
  enterIdentifier(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#identifier.
  exitIdentifier(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#assignable.
  enterAssignable(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#assignable.
  exitAssignable(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#methodName.
  enterMethodName(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#methodName.
  exitMethodName(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#testName.
  enterTestName(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#testName.
  exitTestName(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#typeName.
  enterTypeName(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#typeName.
  exitTypeName(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#constantValue.
  enterConstantValue(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#constantValue.
  exitConstantValue(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#argList.
  enterArgList(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#argList.
  exitArgList(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#argument.
  enterArgument(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#argument.
  exitArgument(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#paramsList.
  enterParamsList(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#paramsList.
  exitParamsList(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#type.
  enterType(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#type.
  exitType(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#enumValuesList.
  enterEnumValuesList(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#enumValuesList.
  exitEnumValuesList(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#assertActual.
  enterAssertActual(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#assertActual.
  exitAssertActual(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#litValue.
  enterLitValue(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#litValue.
  exitLitValue(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#litInt.
  enterLitInt(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#litInt.
  exitLitInt(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#litFloat.
  enterLitFloat(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#litFloat.
  exitLitFloat(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#enumValue.
  enterEnumValue(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#enumValue.
  exitEnumValue(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#litString.
  enterLitString(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#litString.
  exitLitString(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#thisInstance.
  enterThisInstance(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#thisInstance.
  exitThisInstance(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#index.
  enterIndex(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#index.
  exitIndex(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#identifierWithOptIndexes.
  enterIdentifierWithOptIndexes(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#identifierWithOptIndexes.
  exitIdentifierWithOptIndexes(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#propertyRef.
  enterPropertyRef(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#propertyRef.
  exitPropertyRef(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#term.
  enterTerm(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#term.
  exitTerm(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#chainable.
  enterChainable(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#chainable.
  exitChainable(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#bracketedExpression.
  enterBracketedExpression(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#bracketedExpression.
  exitBracketedExpression(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#unaryExpression.
  enterUnaryExpression(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#unaryExpression.
  exitUnaryExpression(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#binaryExpression.
  enterBinaryExpression(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#binaryExpression.
  exitBinaryExpression(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#tuple.
  enterTuple(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#tuple.
  exitTuple(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#methodCall.
  enterMethodCall(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#methodCall.
  exitMethodCall(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#binaryOperator.
  enterBinaryOperator(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#binaryOperator.
  exitBinaryOperator(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#ifExpression.
  enterIfExpression(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#ifExpression.
  exitIfExpression(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#newInstance.
  enterNewInstance(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#newInstance.
  exitNewInstance(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#paramDef.
  enterParamDef(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#paramDef.
  exitParamDef(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#typeGeneric.
  enterTypeGeneric(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#typeGeneric.
  exitTypeGeneric(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#typeTuple.
  enterTypeTuple(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#typeTuple.
  exitTypeTuple(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#lambda.
  enterLambda(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#lambda.
  exitLambda(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#list.
  enterList(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#list.
  exitList(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#interpolatedString.
  enterInterpolatedString(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#interpolatedString.
  exitInterpolatedString(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#expression.
  enterExpression(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#expression.
  exitExpression(ctx) {
  }
  // Enter a parse tree produced by Elan2Parser#power.
  enterPower(ctx) {
  }
  // Exit a parse tree produced by Elan2Parser#power.
  exitPower(ctx) {
  }
};

// src/generatedElan2/Elan2Parser.js
var serializedATN2 = [
  4,
  1,
  97,
  976,
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
  1,
  0,
  3,
  0,
  210,
  8,
  0,
  1,
  0,
  5,
  0,
  213,
  8,
  0,
  10,
  0,
  12,
  0,
  216,
  9,
  0,
  1,
  0,
  5,
  0,
  219,
  8,
  0,
  10,
  0,
  12,
  0,
  222,
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
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  1,
  235,
  8,
  1,
  1,
  2,
  3,
  2,
  238,
  8,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  5,
  2,
  243,
  8,
  2,
  10,
  2,
  12,
  2,
  246,
  9,
  2,
  1,
  2,
  1,
  2,
  1,
  2,
  1,
  3,
  3,
  3,
  252,
  8,
  3,
  1,
  3,
  1,
  3,
  1,
  3,
  1,
  3,
  5,
  3,
  258,
  8,
  3,
  10,
  3,
  12,
  3,
  261,
  9,
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
  3,
  4,
  268,
  8,
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
  5,
  4,
  276,
  8,
  4,
  10,
  4,
  12,
  4,
  279,
  9,
  4,
  1,
  4,
  1,
  4,
  1,
  4,
  1,
  5,
  3,
  5,
  285,
  8,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  5,
  5,
  290,
  8,
  5,
  10,
  5,
  12,
  5,
  293,
  9,
  5,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  6,
  3,
  6,
  299,
  8,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  5,
  6,
  309,
  8,
  6,
  10,
  6,
  12,
  6,
  312,
  9,
  6,
  1,
  6,
  1,
  6,
  1,
  6,
  1,
  7,
  3,
  7,
  318,
  8,
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
  7,
  1,
  7,
  1,
  7,
  5,
  7,
  329,
  8,
  7,
  10,
  7,
  12,
  7,
  332,
  9,
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
  9,
  3,
  9,
  351,
  8,
  9,
  1,
  10,
  3,
  10,
  354,
  8,
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
  5,
  10,
  361,
  8,
  10,
  10,
  10,
  12,
  10,
  364,
  9,
  10,
  1,
  10,
  1,
  10,
  1,
  10,
  1,
  11,
  3,
  11,
  370,
  8,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  5,
  11,
  375,
  8,
  11,
  10,
  11,
  12,
  11,
  378,
  9,
  11,
  1,
  11,
  1,
  11,
  1,
  11,
  1,
  12,
  3,
  12,
  384,
  8,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  5,
  12,
  389,
  8,
  12,
  10,
  12,
  12,
  12,
  392,
  9,
  12,
  1,
  12,
  1,
  12,
  1,
  12,
  1,
  13,
  3,
  13,
  398,
  8,
  13,
  1,
  13,
  1,
  13,
  1,
  13,
  5,
  13,
  403,
  8,
  13,
  10,
  13,
  12,
  13,
  406,
  9,
  13,
  1,
  13,
  1,
  13,
  5,
  13,
  410,
  8,
  13,
  10,
  13,
  12,
  13,
  413,
  9,
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
  15,
  3,
  15,
  422,
  8,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  5,
  15,
  427,
  8,
  15,
  10,
  15,
  12,
  15,
  430,
  9,
  15,
  1,
  15,
  1,
  15,
  1,
  15,
  1,
  16,
  3,
  16,
  436,
  8,
  16,
  1,
  16,
  3,
  16,
  439,
  8,
  16,
  1,
  16,
  1,
  16,
  1,
  16,
  1,
  16,
  5,
  16,
  445,
  8,
  16,
  10,
  16,
  12,
  16,
  448,
  9,
  16,
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
  3,
  17,
  455,
  8,
  17,
  1,
  17,
  3,
  17,
  458,
  8,
  17,
  1,
  17,
  1,
  17,
  1,
  17,
  5,
  17,
  463,
  8,
  17,
  10,
  17,
  12,
  17,
  466,
  9,
  17,
  1,
  17,
  1,
  17,
  1,
  17,
  1,
  18,
  3,
  18,
  472,
  8,
  18,
  1,
  18,
  3,
  18,
  475,
  8,
  18,
  1,
  18,
  1,
  18,
  1,
  18,
  5,
  18,
  480,
  8,
  18,
  10,
  18,
  12,
  18,
  483,
  9,
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
  3,
  19,
  490,
  8,
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
  3,
  22,
  503,
  8,
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
  3,
  26,
  522,
  8,
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
  28,
  1,
  28,
  1,
  28,
  1,
  28,
  3,
  28,
  533,
  8,
  28,
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
  3,
  30,
  543,
  8,
  30,
  1,
  31,
  1,
  31,
  1,
  31,
  1,
  32,
  3,
  32,
  549,
  8,
  32,
  1,
  32,
  1,
  32,
  1,
  32,
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
  3,
  33,
  559,
  8,
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
  3,
  34,
  567,
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
  1,
  34,
  1,
  34,
  1,
  35,
  3,
  35,
  577,
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
  36,
  3,
  36,
  586,
  8,
  36,
  1,
  36,
  1,
  36,
  1,
  36,
  3,
  36,
  591,
  8,
  36,
  1,
  36,
  1,
  36,
  1,
  36,
  1,
  37,
  3,
  37,
  597,
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
  1,
  38,
  3,
  38,
  607,
  8,
  38,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  38,
  1,
  39,
  3,
  39,
  616,
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
  39,
  1,
  40,
  3,
  40,
  629,
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
  41,
  3,
  41,
  636,
  8,
  41,
  1,
  41,
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
  43,
  3,
  43,
  648,
  8,
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
  3,
  44,
  656,
  8,
  44,
  1,
  44,
  1,
  44,
  1,
  44,
  1,
  45,
  3,
  45,
  662,
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
  50,
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
  3,
  54,
  699,
  8,
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
  3,
  56,
  707,
  8,
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
  56,
  1,
  57,
  1,
  57,
  1,
  58,
  1,
  58,
  1,
  59,
  1,
  59,
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
  63,
  3,
  63,
  735,
  8,
  63,
  1,
  63,
  1,
  63,
  1,
  63,
  1,
  64,
  3,
  64,
  741,
  8,
  64,
  1,
  64,
  1,
  64,
  1,
  64,
  1,
  65,
  1,
  65,
  1,
  66,
  1,
  66,
  3,
  66,
  750,
  8,
  66,
  1,
  67,
  1,
  67,
  1,
  68,
  1,
  68,
  1,
  69,
  1,
  69,
  1,
  70,
  1,
  70,
  3,
  70,
  760,
  8,
  70,
  1,
  71,
  1,
  71,
  1,
  71,
  5,
  71,
  765,
  8,
  71,
  10,
  71,
  12,
  71,
  768,
  9,
  71,
  1,
  72,
  1,
  72,
  3,
  72,
  772,
  8,
  72,
  1,
  73,
  1,
  73,
  1,
  73,
  5,
  73,
  777,
  8,
  73,
  10,
  73,
  12,
  73,
  780,
  9,
  73,
  1,
  74,
  1,
  74,
  1,
  74,
  3,
  74,
  785,
  8,
  74,
  1,
  75,
  1,
  75,
  1,
  75,
  5,
  75,
  790,
  8,
  75,
  10,
  75,
  12,
  75,
  793,
  9,
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
  77,
  1,
  77,
  1,
  77,
  3,
  77,
  802,
  8,
  77,
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
  83,
  1,
  83,
  1,
  84,
  1,
  84,
  5,
  84,
  822,
  8,
  84,
  10,
  84,
  12,
  84,
  825,
  9,
  84,
  1,
  85,
  1,
  85,
  1,
  85,
  1,
  85,
  1,
  86,
  1,
  86,
  3,
  86,
  833,
  8,
  86,
  1,
  86,
  1,
  86,
  5,
  86,
  837,
  8,
  86,
  10,
  86,
  12,
  86,
  840,
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
  3,
  87,
  848,
  8,
  87,
  1,
  87,
  5,
  87,
  851,
  8,
  87,
  10,
  87,
  12,
  87,
  854,
  9,
  87,
  1,
  88,
  1,
  88,
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
  90,
  1,
  91,
  1,
  91,
  1,
  91,
  1,
  91,
  1,
  91,
  1,
  91,
  5,
  91,
  873,
  8,
  91,
  10,
  91,
  12,
  91,
  876,
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
  92,
  3,
  92,
  883,
  8,
  92,
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
  1,
  94,
  1,
  94,
  1,
  94,
  1,
  94,
  1,
  94,
  1,
  94,
  1,
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
  902,
  8,
  95,
  1,
  95,
  1,
  95,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  96,
  1,
  97,
  1,
  97,
  1,
  97,
  1,
  97,
  1,
  97,
  1,
  97,
  5,
  97,
  916,
  8,
  97,
  10,
  97,
  12,
  97,
  919,
  9,
  97,
  1,
  97,
  1,
  97,
  1,
  98,
  1,
  98,
  1,
  98,
  1,
  98,
  4,
  98,
  927,
  8,
  98,
  11,
  98,
  12,
  98,
  928,
  1,
  98,
  1,
  98,
  1,
  99,
  1,
  99,
  1,
  99,
  3,
  99,
  936,
  8,
  99,
  1,
  99,
  1,
  99,
  1,
  99,
  1,
  100,
  1,
  100,
  1,
  100,
  1,
  100,
  5,
  100,
  945,
  8,
  100,
  10,
  100,
  12,
  100,
  948,
  9,
  100,
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
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  3,
  102,
  961,
  8,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  1,
  102,
  5,
  102,
  967,
  8,
  102,
  10,
  102,
  12,
  102,
  970,
  9,
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
  0,
  1,
  204,
  104,
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
  176,
  178,
  180,
  182,
  184,
  186,
  188,
  190,
  192,
  194,
  196,
  198,
  200,
  202,
  204,
  206,
  0,
  5,
  2,
  0,
  50,
  54,
  88,
  88,
  1,
  0,
  89,
  91,
  1,
  0,
  93,
  94,
  2,
  0,
  31,
  31,
  77,
  77,
  5,
  0,
  2,
  2,
  29,
  29,
  33,
  33,
  57,
  58,
  76,
  83,
  998,
  0,
  209,
  1,
  0,
  0,
  0,
  2,
  234,
  1,
  0,
  0,
  0,
  4,
  237,
  1,
  0,
  0,
  0,
  6,
  251,
  1,
  0,
  0,
  0,
  8,
  267,
  1,
  0,
  0,
  0,
  10,
  284,
  1,
  0,
  0,
  0,
  12,
  298,
  1,
  0,
  0,
  0,
  14,
  317,
  1,
  0,
  0,
  0,
  16,
  336,
  1,
  0,
  0,
  0,
  18,
  350,
  1,
  0,
  0,
  0,
  20,
  353,
  1,
  0,
  0,
  0,
  22,
  369,
  1,
  0,
  0,
  0,
  24,
  383,
  1,
  0,
  0,
  0,
  26,
  397,
  1,
  0,
  0,
  0,
  28,
  417,
  1,
  0,
  0,
  0,
  30,
  421,
  1,
  0,
  0,
  0,
  32,
  435,
  1,
  0,
  0,
  0,
  34,
  454,
  1,
  0,
  0,
  0,
  36,
  471,
  1,
  0,
  0,
  0,
  38,
  489,
  1,
  0,
  0,
  0,
  40,
  493,
  1,
  0,
  0,
  0,
  42,
  495,
  1,
  0,
  0,
  0,
  44,
  498,
  1,
  0,
  0,
  0,
  46,
  508,
  1,
  0,
  0,
  0,
  48,
  511,
  1,
  0,
  0,
  0,
  50,
  514,
  1,
  0,
  0,
  0,
  52,
  517,
  1,
  0,
  0,
  0,
  54,
  525,
  1,
  0,
  0,
  0,
  56,
  528,
  1,
  0,
  0,
  0,
  58,
  534,
  1,
  0,
  0,
  0,
  60,
  537,
  1,
  0,
  0,
  0,
  62,
  544,
  1,
  0,
  0,
  0,
  64,
  548,
  1,
  0,
  0,
  0,
  66,
  558,
  1,
  0,
  0,
  0,
  68,
  566,
  1,
  0,
  0,
  0,
  70,
  576,
  1,
  0,
  0,
  0,
  72,
  585,
  1,
  0,
  0,
  0,
  74,
  596,
  1,
  0,
  0,
  0,
  76,
  606,
  1,
  0,
  0,
  0,
  78,
  615,
  1,
  0,
  0,
  0,
  80,
  628,
  1,
  0,
  0,
  0,
  82,
  635,
  1,
  0,
  0,
  0,
  84,
  642,
  1,
  0,
  0,
  0,
  86,
  647,
  1,
  0,
  0,
  0,
  88,
  655,
  1,
  0,
  0,
  0,
  90,
  661,
  1,
  0,
  0,
  0,
  92,
  669,
  1,
  0,
  0,
  0,
  94,
  673,
  1,
  0,
  0,
  0,
  96,
  676,
  1,
  0,
  0,
  0,
  98,
  679,
  1,
  0,
  0,
  0,
  100,
  682,
  1,
  0,
  0,
  0,
  102,
  687,
  1,
  0,
  0,
  0,
  104,
  690,
  1,
  0,
  0,
  0,
  106,
  692,
  1,
  0,
  0,
  0,
  108,
  695,
  1,
  0,
  0,
  0,
  110,
  702,
  1,
  0,
  0,
  0,
  112,
  706,
  1,
  0,
  0,
  0,
  114,
  714,
  1,
  0,
  0,
  0,
  116,
  716,
  1,
  0,
  0,
  0,
  118,
  718,
  1,
  0,
  0,
  0,
  120,
  720,
  1,
  0,
  0,
  0,
  122,
  722,
  1,
  0,
  0,
  0,
  124,
  730,
  1,
  0,
  0,
  0,
  126,
  734,
  1,
  0,
  0,
  0,
  128,
  740,
  1,
  0,
  0,
  0,
  130,
  745,
  1,
  0,
  0,
  0,
  132,
  749,
  1,
  0,
  0,
  0,
  134,
  751,
  1,
  0,
  0,
  0,
  136,
  753,
  1,
  0,
  0,
  0,
  138,
  755,
  1,
  0,
  0,
  0,
  140,
  759,
  1,
  0,
  0,
  0,
  142,
  761,
  1,
  0,
  0,
  0,
  144,
  771,
  1,
  0,
  0,
  0,
  146,
  773,
  1,
  0,
  0,
  0,
  148,
  784,
  1,
  0,
  0,
  0,
  150,
  786,
  1,
  0,
  0,
  0,
  152,
  794,
  1,
  0,
  0,
  0,
  154,
  801,
  1,
  0,
  0,
  0,
  156,
  803,
  1,
  0,
  0,
  0,
  158,
  805,
  1,
  0,
  0,
  0,
  160,
  807,
  1,
  0,
  0,
  0,
  162,
  811,
  1,
  0,
  0,
  0,
  164,
  813,
  1,
  0,
  0,
  0,
  166,
  815,
  1,
  0,
  0,
  0,
  168,
  819,
  1,
  0,
  0,
  0,
  170,
  826,
  1,
  0,
  0,
  0,
  172,
  832,
  1,
  0,
  0,
  0,
  174,
  847,
  1,
  0,
  0,
  0,
  176,
  855,
  1,
  0,
  0,
  0,
  178,
  859,
  1,
  0,
  0,
  0,
  180,
  862,
  1,
  0,
  0,
  0,
  182,
  866,
  1,
  0,
  0,
  0,
  184,
  879,
  1,
  0,
  0,
  0,
  186,
  886,
  1,
  0,
  0,
  0,
  188,
  888,
  1,
  0,
  0,
  0,
  190,
  897,
  1,
  0,
  0,
  0,
  192,
  905,
  1,
  0,
  0,
  0,
  194,
  909,
  1,
  0,
  0,
  0,
  196,
  922,
  1,
  0,
  0,
  0,
  198,
  932,
  1,
  0,
  0,
  0,
  200,
  940,
  1,
  0,
  0,
  0,
  202,
  951,
  1,
  0,
  0,
  0,
  204,
  960,
  1,
  0,
  0,
  0,
  206,
  971,
  1,
  0,
  0,
  0,
  208,
  210,
  5,
  55,
  0,
  0,
  209,
  208,
  1,
  0,
  0,
  0,
  209,
  210,
  1,
  0,
  0,
  0,
  210,
  214,
  1,
  0,
  0,
  0,
  211,
  213,
  3,
  2,
  1,
  0,
  212,
  211,
  1,
  0,
  0,
  0,
  213,
  216,
  1,
  0,
  0,
  0,
  214,
  212,
  1,
  0,
  0,
  0,
  214,
  215,
  1,
  0,
  0,
  0,
  215,
  220,
  1,
  0,
  0,
  0,
  216,
  214,
  1,
  0,
  0,
  0,
  217,
  219,
  5,
  65,
  0,
  0,
  218,
  217,
  1,
  0,
  0,
  0,
  219,
  222,
  1,
  0,
  0,
  0,
  220,
  218,
  1,
  0,
  0,
  0,
  220,
  221,
  1,
  0,
  0,
  0,
  221,
  223,
  1,
  0,
  0,
  0,
  222,
  220,
  1,
  0,
  0,
  0,
  223,
  224,
  5,
  0,
  0,
  1,
  224,
  1,
  1,
  0,
  0,
  0,
  225,
  235,
  3,
  4,
  2,
  0,
  226,
  235,
  3,
  6,
  3,
  0,
  227,
  235,
  3,
  8,
  4,
  0,
  228,
  235,
  3,
  10,
  5,
  0,
  229,
  235,
  3,
  64,
  32,
  0,
  230,
  235,
  3,
  66,
  33,
  0,
  231,
  235,
  3,
  12,
  6,
  0,
  232,
  235,
  3,
  14,
  7,
  0,
  233,
  235,
  3,
  16,
  8,
  0,
  234,
  225,
  1,
  0,
  0,
  0,
  234,
  226,
  1,
  0,
  0,
  0,
  234,
  227,
  1,
  0,
  0,
  0,
  234,
  228,
  1,
  0,
  0,
  0,
  234,
  229,
  1,
  0,
  0,
  0,
  234,
  230,
  1,
  0,
  0,
  0,
  234,
  231,
  1,
  0,
  0,
  0,
  234,
  232,
  1,
  0,
  0,
  0,
  234,
  233,
  1,
  0,
  0,
  0,
  235,
  3,
  1,
  0,
  0,
  0,
  236,
  238,
  5,
  97,
  0,
  0,
  237,
  236,
  1,
  0,
  0,
  0,
  237,
  238,
  1,
  0,
  0,
  0,
  238,
  239,
  1,
  0,
  0,
  0,
  239,
  240,
  3,
  40,
  20,
  0,
  240,
  244,
  5,
  65,
  0,
  0,
  241,
  243,
  3,
  18,
  9,
  0,
  242,
  241,
  1,
  0,
  0,
  0,
  243,
  246,
  1,
  0,
  0,
  0,
  244,
  242,
  1,
  0,
  0,
  0,
  244,
  245,
  1,
  0,
  0,
  0,
  245,
  247,
  1,
  0,
  0,
  0,
  246,
  244,
  1,
  0,
  0,
  0,
  247,
  248,
  3,
  42,
  21,
  0,
  248,
  249,
  5,
  65,
  0,
  0,
  249,
  5,
  1,
  0,
  0,
  0,
  250,
  252,
  5,
  97,
  0,
  0,
  251,
  250,
  1,
  0,
  0,
  0,
  251,
  252,
  1,
  0,
  0,
  0,
  252,
  253,
  1,
  0,
  0,
  0,
  253,
  254,
  3,
  44,
  22,
  0,
  254,
  259,
  5,
  65,
  0,
  0,
  255,
  258,
  3,
  70,
  35,
  0,
  256,
  258,
  3,
  18,
  9,
  0,
  257,
  255,
  1,
  0,
  0,
  0,
  257,
  256,
  1,
  0,
  0,
  0,
  258,
  261,
  1,
  0,
  0,
  0,
  259,
  257,
  1,
  0,
  0,
  0,
  259,
  260,
  1,
  0,
  0,
  0,
  260,
  262,
  1,
  0,
  0,
  0,
  261,
  259,
  1,
  0,
  0,
  0,
  262,
  263,
  3,
  84,
  42,
  0,
  263,
  264,
  3,
  46,
  23,
  0,
  264,
  265,
  5,
  65,
  0,
  0,
  265,
  7,
  1,
  0,
  0,
  0,
  266,
  268,
  5,
  97,
  0,
  0,
  267,
  266,
  1,
  0,
  0,
  0,
  267,
  268,
  1,
  0,
  0,
  0,
  268,
  269,
  1,
  0,
  0,
  0,
  269,
  270,
  3,
  48,
  24,
  0,
  270,
  277,
  5,
  65,
  0,
  0,
  271,
  276,
  3,
  68,
  34,
  0,
  272,
  276,
  3,
  70,
  35,
  0,
  273,
  276,
  3,
  74,
  37,
  0,
  274,
  276,
  3,
  28,
  14,
  0,
  275,
  271,
  1,
  0,
  0,
  0,
  275,
  272,
  1,
  0,
  0,
  0,
  275,
  273,
  1,
  0,
  0,
  0,
  275,
  274,
  1,
  0,
  0,
  0,
  276,
  279,
  1,
  0,
  0,
  0,
  277,
  275,
  1,
  0,
  0,
  0,
  277,
  278,
  1,
  0,
  0,
  0,
  278,
  280,
  1,
  0,
  0,
  0,
  279,
  277,
  1,
  0,
  0,
  0,
  280,
  281,
  3,
  50,
  25,
  0,
  281,
  282,
  5,
  65,
  0,
  0,
  282,
  9,
  1,
  0,
  0,
  0,
  283,
  285,
  5,
  97,
  0,
  0,
  284,
  283,
  1,
  0,
  0,
  0,
  284,
  285,
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
  3,
  52,
  26,
  0,
  287,
  291,
  5,
  65,
  0,
  0,
  288,
  290,
  3,
  18,
  9,
  0,
  289,
  288,
  1,
  0,
  0,
  0,
  290,
  293,
  1,
  0,
  0,
  0,
  291,
  289,
  1,
  0,
  0,
  0,
  291,
  292,
  1,
  0,
  0,
  0,
  292,
  294,
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
  294,
  295,
  3,
  54,
  27,
  0,
  295,
  296,
  5,
  65,
  0,
  0,
  296,
  11,
  1,
  0,
  0,
  0,
  297,
  299,
  5,
  97,
  0,
  0,
  298,
  297,
  1,
  0,
  0,
  0,
  298,
  299,
  1,
  0,
  0,
  0,
  299,
  300,
  1,
  0,
  0,
  0,
  300,
  301,
  3,
  56,
  28,
  0,
  301,
  310,
  5,
  65,
  0,
  0,
  302,
  309,
  3,
  30,
  15,
  0,
  303,
  309,
  3,
  112,
  56,
  0,
  304,
  309,
  3,
  32,
  16,
  0,
  305,
  309,
  3,
  34,
  17,
  0,
  306,
  309,
  3,
  36,
  18,
  0,
  307,
  309,
  3,
  38,
  19,
  0,
  308,
  302,
  1,
  0,
  0,
  0,
  308,
  303,
  1,
  0,
  0,
  0,
  308,
  304,
  1,
  0,
  0,
  0,
  308,
  305,
  1,
  0,
  0,
  0,
  308,
  306,
  1,
  0,
  0,
  0,
  308,
  307,
  1,
  0,
  0,
  0,
  309,
  312,
  1,
  0,
  0,
  0,
  310,
  308,
  1,
  0,
  0,
  0,
  310,
  311,
  1,
  0,
  0,
  0,
  311,
  313,
  1,
  0,
  0,
  0,
  312,
  310,
  1,
  0,
  0,
  0,
  313,
  314,
  3,
  58,
  29,
  0,
  314,
  315,
  5,
  65,
  0,
  0,
  315,
  13,
  1,
  0,
  0,
  0,
  316,
  318,
  5,
  97,
  0,
  0,
  317,
  316,
  1,
  0,
  0,
  0,
  317,
  318,
  1,
  0,
  0,
  0,
  318,
  319,
  1,
  0,
  0,
  0,
  319,
  320,
  3,
  60,
  30,
  0,
  320,
  330,
  5,
  65,
  0,
  0,
  321,
  329,
  3,
  112,
  56,
  0,
  322,
  329,
  3,
  32,
  16,
  0,
  323,
  329,
  3,
  34,
  17,
  0,
  324,
  329,
  3,
  36,
  18,
  0,
  325,
  329,
  3,
  126,
  63,
  0,
  326,
  329,
  3,
  128,
  64,
  0,
  327,
  329,
  3,
  38,
  19,
  0,
  328,
  321,
  1,
  0,
  0,
  0,
  328,
  322,
  1,
  0,
  0,
  0,
  328,
  323,
  1,
  0,
  0,
  0,
  328,
  324,
  1,
  0,
  0,
  0,
  328,
  325,
  1,
  0,
  0,
  0,
  328,
  326,
  1,
  0,
  0,
  0,
  328,
  327,
  1,
  0,
  0,
  0,
  329,
  332,
  1,
  0,
  0,
  0,
  330,
  328,
  1,
  0,
  0,
  0,
  330,
  331,
  1,
  0,
  0,
  0,
  331,
  333,
  1,
  0,
  0,
  0,
  332,
  330,
  1,
  0,
  0,
  0,
  333,
  334,
  3,
  62,
  31,
  0,
  334,
  335,
  5,
  65,
  0,
  0,
  335,
  15,
  1,
  0,
  0,
  0,
  336,
  337,
  5,
  55,
  0,
  0,
  337,
  338,
  5,
  65,
  0,
  0,
  338,
  17,
  1,
  0,
  0,
  0,
  339,
  351,
  3,
  72,
  36,
  0,
  340,
  351,
  3,
  74,
  37,
  0,
  341,
  351,
  3,
  76,
  38,
  0,
  342,
  351,
  3,
  78,
  39,
  0,
  343,
  351,
  3,
  20,
  10,
  0,
  344,
  351,
  3,
  22,
  11,
  0,
  345,
  351,
  3,
  24,
  12,
  0,
  346,
  351,
  3,
  80,
  40,
  0,
  347,
  351,
  3,
  26,
  13,
  0,
  348,
  351,
  3,
  82,
  41,
  0,
  349,
  351,
  3,
  28,
  14,
  0,
  350,
  339,
  1,
  0,
  0,
  0,
  350,
  340,
  1,
  0,
  0,
  0,
  350,
  341,
  1,
  0,
  0,
  0,
  350,
  342,
  1,
  0,
  0,
  0,
  350,
  343,
  1,
  0,
  0,
  0,
  350,
  344,
  1,
  0,
  0,
  0,
  350,
  345,
  1,
  0,
  0,
  0,
  350,
  346,
  1,
  0,
  0,
  0,
  350,
  347,
  1,
  0,
  0,
  0,
  350,
  348,
  1,
  0,
  0,
  0,
  350,
  349,
  1,
  0,
  0,
  0,
  351,
  19,
  1,
  0,
  0,
  0,
  352,
  354,
  5,
  97,
  0,
  0,
  353,
  352,
  1,
  0,
  0,
  0,
  353,
  354,
  1,
  0,
  0,
  0,
  354,
  355,
  1,
  0,
  0,
  0,
  355,
  356,
  3,
  92,
  46,
  0,
  356,
  362,
  5,
  65,
  0,
  0,
  357,
  361,
  3,
  86,
  43,
  0,
  358,
  361,
  3,
  88,
  44,
  0,
  359,
  361,
  3,
  18,
  9,
  0,
  360,
  357,
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
  359,
  1,
  0,
  0,
  0,
  361,
  364,
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
  362,
  363,
  1,
  0,
  0,
  0,
  363,
  365,
  1,
  0,
  0,
  0,
  364,
  362,
  1,
  0,
  0,
  0,
  365,
  366,
  3,
  94,
  47,
  0,
  366,
  367,
  5,
  65,
  0,
  0,
  367,
  21,
  1,
  0,
  0,
  0,
  368,
  370,
  5,
  97,
  0,
  0,
  369,
  368,
  1,
  0,
  0,
  0,
  369,
  370,
  1,
  0,
  0,
  0,
  370,
  371,
  1,
  0,
  0,
  0,
  371,
  372,
  3,
  96,
  48,
  0,
  372,
  376,
  5,
  65,
  0,
  0,
  373,
  375,
  3,
  18,
  9,
  0,
  374,
  373,
  1,
  0,
  0,
  0,
  375,
  378,
  1,
  0,
  0,
  0,
  376,
  374,
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
  379,
  1,
  0,
  0,
  0,
  378,
  376,
  1,
  0,
  0,
  0,
  379,
  380,
  3,
  98,
  49,
  0,
  380,
  381,
  5,
  65,
  0,
  0,
  381,
  23,
  1,
  0,
  0,
  0,
  382,
  384,
  5,
  97,
  0,
  0,
  383,
  382,
  1,
  0,
  0,
  0,
  383,
  384,
  1,
  0,
  0,
  0,
  384,
  385,
  1,
  0,
  0,
  0,
  385,
  386,
  3,
  100,
  50,
  0,
  386,
  390,
  5,
  65,
  0,
  0,
  387,
  389,
  3,
  18,
  9,
  0,
  388,
  387,
  1,
  0,
  0,
  0,
  389,
  392,
  1,
  0,
  0,
  0,
  390,
  388,
  1,
  0,
  0,
  0,
  390,
  391,
  1,
  0,
  0,
  0,
  391,
  393,
  1,
  0,
  0,
  0,
  392,
  390,
  1,
  0,
  0,
  0,
  393,
  394,
  3,
  102,
  51,
  0,
  394,
  395,
  5,
  65,
  0,
  0,
  395,
  25,
  1,
  0,
  0,
  0,
  396,
  398,
  5,
  97,
  0,
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
  3,
  104,
  52,
  0,
  400,
  404,
  5,
  65,
  0,
  0,
  401,
  403,
  3,
  18,
  9,
  0,
  402,
  401,
  1,
  0,
  0,
  0,
  403,
  406,
  1,
  0,
  0,
  0,
  404,
  402,
  1,
  0,
  0,
  0,
  404,
  405,
  1,
  0,
  0,
  0,
  405,
  407,
  1,
  0,
  0,
  0,
  406,
  404,
  1,
  0,
  0,
  0,
  407,
  411,
  3,
  90,
  45,
  0,
  408,
  410,
  3,
  18,
  9,
  0,
  409,
  408,
  1,
  0,
  0,
  0,
  410,
  413,
  1,
  0,
  0,
  0,
  411,
  409,
  1,
  0,
  0,
  0,
  411,
  412,
  1,
  0,
  0,
  0,
  412,
  414,
  1,
  0,
  0,
  0,
  413,
  411,
  1,
  0,
  0,
  0,
  414,
  415,
  3,
  106,
  53,
  0,
  415,
  416,
  5,
  65,
  0,
  0,
  416,
  27,
  1,
  0,
  0,
  0,
  417,
  418,
  5,
  55,
  0,
  0,
  418,
  419,
  5,
  65,
  0,
  0,
  419,
  29,
  1,
  0,
  0,
  0,
  420,
  422,
  5,
  97,
  0,
  0,
  421,
  420,
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
  423,
  1,
  0,
  0,
  0,
  423,
  424,
  3,
  108,
  54,
  0,
  424,
  428,
  5,
  65,
  0,
  0,
  425,
  427,
  3,
  18,
  9,
  0,
  426,
  425,
  1,
  0,
  0,
  0,
  427,
  430,
  1,
  0,
  0,
  0,
  428,
  426,
  1,
  0,
  0,
  0,
  428,
  429,
  1,
  0,
  0,
  0,
  429,
  431,
  1,
  0,
  0,
  0,
  430,
  428,
  1,
  0,
  0,
  0,
  431,
  432,
  3,
  110,
  55,
  0,
  432,
  433,
  5,
  65,
  0,
  0,
  433,
  31,
  1,
  0,
  0,
  0,
  434,
  436,
  5,
  97,
  0,
  0,
  435,
  434,
  1,
  0,
  0,
  0,
  435,
  436,
  1,
  0,
  0,
  0,
  436,
  438,
  1,
  0,
  0,
  0,
  437,
  439,
  5,
  35,
  0,
  0,
  438,
  437,
  1,
  0,
  0,
  0,
  438,
  439,
  1,
  0,
  0,
  0,
  439,
  440,
  1,
  0,
  0,
  0,
  440,
  441,
  3,
  114,
  57,
  0,
  441,
  446,
  5,
  65,
  0,
  0,
  442,
  445,
  3,
  70,
  35,
  0,
  443,
  445,
  3,
  18,
  9,
  0,
  444,
  442,
  1,
  0,
  0,
  0,
  444,
  443,
  1,
  0,
  0,
  0,
  445,
  448,
  1,
  0,
  0,
  0,
  446,
  444,
  1,
  0,
  0,
  0,
  446,
  447,
  1,
  0,
  0,
  0,
  447,
  449,
  1,
  0,
  0,
  0,
  448,
  446,
  1,
  0,
  0,
  0,
  449,
  450,
  3,
  84,
  42,
  0,
  450,
  451,
  3,
  116,
  58,
  0,
  451,
  452,
  5,
  65,
  0,
  0,
  452,
  33,
  1,
  0,
  0,
  0,
  453,
  455,
  5,
  97,
  0,
  0,
  454,
  453,
  1,
  0,
  0,
  0,
  454,
  455,
  1,
  0,
  0,
  0,
  455,
  457,
  1,
  0,
  0,
  0,
  456,
  458,
  5,
  35,
  0,
  0,
  457,
  456,
  1,
  0,
  0,
  0,
  457,
  458,
  1,
  0,
  0,
  0,
  458,
  459,
  1,
  0,
  0,
  0,
  459,
  460,
  3,
  118,
  59,
  0,
  460,
  464,
  5,
  65,
  0,
  0,
  461,
  463,
  3,
  18,
  9,
  0,
  462,
  461,
  1,
  0,
  0,
  0,
  463,
  466,
  1,
  0,
  0,
  0,
  464,
  462,
  1,
  0,
  0,
  0,
  464,
  465,
  1,
  0,
  0,
  0,
  465,
  467,
  1,
  0,
  0,
  0,
  466,
  464,
  1,
  0,
  0,
  0,
  467,
  468,
  3,
  120,
  60,
  0,
  468,
  469,
  5,
  65,
  0,
  0,
  469,
  35,
  1,
  0,
  0,
  0,
  470,
  472,
  5,
  97,
  0,
  0,
  471,
  470,
  1,
  0,
  0,
  0,
  471,
  472,
  1,
  0,
  0,
  0,
  472,
  474,
  1,
  0,
  0,
  0,
  473,
  475,
  5,
  35,
  0,
  0,
  474,
  473,
  1,
  0,
  0,
  0,
  474,
  475,
  1,
  0,
  0,
  0,
  475,
  476,
  1,
  0,
  0,
  0,
  476,
  477,
  3,
  122,
  61,
  0,
  477,
  481,
  5,
  65,
  0,
  0,
  478,
  480,
  3,
  18,
  9,
  0,
  479,
  478,
  1,
  0,
  0,
  0,
  480,
  483,
  1,
  0,
  0,
  0,
  481,
  479,
  1,
  0,
  0,
  0,
  481,
  482,
  1,
  0,
  0,
  0,
  482,
  484,
  1,
  0,
  0,
  0,
  483,
  481,
  1,
  0,
  0,
  0,
  484,
  485,
  3,
  84,
  42,
  0,
  485,
  486,
  3,
  124,
  62,
  0,
  486,
  487,
  5,
  65,
  0,
  0,
  487,
  37,
  1,
  0,
  0,
  0,
  488,
  490,
  5,
  55,
  0,
  0,
  489,
  488,
  1,
  0,
  0,
  0,
  489,
  490,
  1,
  0,
  0,
  0,
  490,
  491,
  1,
  0,
  0,
  0,
  491,
  492,
  5,
  65,
  0,
  0,
  492,
  39,
  1,
  0,
  0,
  0,
  493,
  494,
  5,
  28,
  0,
  0,
  494,
  41,
  1,
  0,
  0,
  0,
  495,
  496,
  5,
  16,
  0,
  0,
  496,
  497,
  5,
  28,
  0,
  0,
  497,
  43,
  1,
  0,
  0,
  0,
  498,
  499,
  5,
  21,
  0,
  0,
  499,
  500,
  3,
  134,
  67,
  0,
  500,
  502,
  5,
  71,
  0,
  0,
  501,
  503,
  3,
  146,
  73,
  0,
  502,
  501,
  1,
  0,
  0,
  0,
  502,
  503,
  1,
  0,
  0,
  0,
  503,
  504,
  1,
  0,
  0,
  0,
  504,
  505,
  5,
  72,
  0,
  0,
  505,
  506,
  5,
  39,
  0,
  0,
  506,
  507,
  3,
  148,
  74,
  0,
  507,
  45,
  1,
  0,
  0,
  0,
  508,
  509,
  5,
  16,
  0,
  0,
  509,
  510,
  5,
  21,
  0,
  0,
  510,
  47,
  1,
  0,
  0,
  0,
  511,
  512,
  5,
  42,
  0,
  0,
  512,
  513,
  3,
  136,
  68,
  0,
  513,
  49,
  1,
  0,
  0,
  0,
  514,
  515,
  5,
  16,
  0,
  0,
  515,
  516,
  5,
  42,
  0,
  0,
  516,
  51,
  1,
  0,
  0,
  0,
  517,
  518,
  5,
  36,
  0,
  0,
  518,
  519,
  3,
  134,
  67,
  0,
  519,
  521,
  5,
  71,
  0,
  0,
  520,
  522,
  3,
  146,
  73,
  0,
  521,
  520,
  1,
  0,
  0,
  0,
  521,
  522,
  1,
  0,
  0,
  0,
  522,
  523,
  1,
  0,
  0,
  0,
  523,
  524,
  5,
  72,
  0,
  0,
  524,
  53,
  1,
  0,
  0,
  0,
  525,
  526,
  5,
  16,
  0,
  0,
  526,
  527,
  5,
  36,
  0,
  0,
  527,
  55,
  1,
  0,
  0,
  0,
  528,
  529,
  5,
  9,
  0,
  0,
  529,
  532,
  3,
  138,
  69,
  0,
  530,
  531,
  5,
  24,
  0,
  0,
  531,
  533,
  3,
  138,
  69,
  0,
  532,
  530,
  1,
  0,
  0,
  0,
  532,
  533,
  1,
  0,
  0,
  0,
  533,
  57,
  1,
  0,
  0,
  0,
  534,
  535,
  5,
  16,
  0,
  0,
  535,
  536,
  5,
  9,
  0,
  0,
  536,
  59,
  1,
  0,
  0,
  0,
  537,
  538,
  5,
  1,
  0,
  0,
  538,
  539,
  5,
  9,
  0,
  0,
  539,
  542,
  3,
  138,
  69,
  0,
  540,
  541,
  5,
  24,
  0,
  0,
  541,
  543,
  3,
  138,
  69,
  0,
  542,
  540,
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
  61,
  1,
  0,
  0,
  0,
  544,
  545,
  5,
  16,
  0,
  0,
  545,
  546,
  5,
  9,
  0,
  0,
  546,
  63,
  1,
  0,
  0,
  0,
  547,
  549,
  5,
  97,
  0,
  0,
  548,
  547,
  1,
  0,
  0,
  0,
  548,
  549,
  1,
  0,
  0,
  0,
  549,
  550,
  1,
  0,
  0,
  0,
  550,
  551,
  5,
  10,
  0,
  0,
  551,
  552,
  3,
  130,
  65,
  0,
  552,
  553,
  5,
  40,
  0,
  0,
  553,
  554,
  5,
  46,
  0,
  0,
  554,
  555,
  3,
  140,
  70,
  0,
  555,
  556,
  5,
  65,
  0,
  0,
  556,
  65,
  1,
  0,
  0,
  0,
  557,
  559,
  5,
  97,
  0,
  0,
  558,
  557,
  1,
  0,
  0,
  0,
  558,
  559,
  1,
  0,
  0,
  0,
  559,
  560,
  1,
  0,
  0,
  0,
  560,
  561,
  5,
  17,
  0,
  0,
  561,
  562,
  3,
  138,
  69,
  0,
  562,
  563,
  3,
  150,
  75,
  0,
  563,
  564,
  5,
  65,
  0,
  0,
  564,
  67,
  1,
  0,
  0,
  0,
  565,
  567,
  5,
  97,
  0,
  0,
  566,
  565,
  1,
  0,
  0,
  0,
  566,
  567,
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
  569,
  5,
  4,
  0,
  0,
  569,
  570,
  3,
  152,
  76,
  0,
  570,
  571,
  5,
  18,
  0,
  0,
  571,
  572,
  5,
  46,
  0,
  0,
  572,
  573,
  3,
  204,
  102,
  0,
  573,
  574,
  5,
  65,
  0,
  0,
  574,
  69,
  1,
  0,
  0,
  0,
  575,
  577,
  5,
  97,
  0,
  0,
  576,
  575,
  1,
  0,
  0,
  0,
  576,
  577,
  1,
  0,
  0,
  0,
  577,
  578,
  1,
  0,
  0,
  0,
  578,
  579,
  5,
  27,
  0,
  0,
  579,
  580,
  3,
  130,
  65,
  0,
  580,
  581,
  5,
  6,
  0,
  0,
  581,
  582,
  3,
  204,
  102,
  0,
  582,
  583,
  5,
  65,
  0,
  0,
  583,
  71,
  1,
  0,
  0,
  0,
  584,
  586,
  5,
  97,
  0,
  0,
  585,
  584,
  1,
  0,
  0,
  0,
  585,
  586,
  1,
  0,
  0,
  0,
  586,
  587,
  1,
  0,
  0,
  0,
  587,
  588,
  5,
  34,
  0,
  0,
  588,
  590,
  5,
  71,
  0,
  0,
  589,
  591,
  3,
  204,
  102,
  0,
  590,
  589,
  1,
  0,
  0,
  0,
  590,
  591,
  1,
  0,
  0,
  0,
  591,
  592,
  1,
  0,
  0,
  0,
  592,
  593,
  5,
  72,
  0,
  0,
  593,
  594,
  5,
  65,
  0,
  0,
  594,
  73,
  1,
  0,
  0,
  0,
  595,
  597,
  5,
  97,
  0,
  0,
  596,
  595,
  1,
  0,
  0,
  0,
  596,
  597,
  1,
  0,
  0,
  0,
  597,
  598,
  1,
  0,
  0,
  0,
  598,
  599,
  5,
  48,
  0,
  0,
  599,
  600,
  3,
  130,
  65,
  0,
  600,
  601,
  5,
  40,
  0,
  0,
  601,
  602,
  5,
  46,
  0,
  0,
  602,
  603,
  3,
  204,
  102,
  0,
  603,
  604,
  5,
  65,
  0,
  0,
  604,
  75,
  1,
  0,
  0,
  0,
  605,
  607,
  5,
  97,
  0,
  0,
  606,
  605,
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
  608,
  1,
  0,
  0,
  0,
  608,
  609,
  5,
  5,
  0,
  0,
  609,
  610,
  3,
  132,
  66,
  0,
  610,
  611,
  5,
  46,
  0,
  0,
  611,
  612,
  3,
  204,
  102,
  0,
  612,
  613,
  5,
  65,
  0,
  0,
  613,
  77,
  1,
  0,
  0,
  0,
  614,
  616,
  5,
  97,
  0,
  0,
  615,
  614,
  1,
  0,
  0,
  0,
  615,
  616,
  1,
  0,
  0,
  0,
  616,
  617,
  1,
  0,
  0,
  0,
  617,
  618,
  5,
  25,
  0,
  0,
  618,
  619,
  3,
  130,
  65,
  0,
  619,
  620,
  5,
  40,
  0,
  0,
  620,
  621,
  5,
  46,
  0,
  0,
  621,
  622,
  3,
  134,
  67,
  0,
  622,
  623,
  5,
  71,
  0,
  0,
  623,
  624,
  3,
  204,
  102,
  0,
  624,
  625,
  5,
  72,
  0,
  0,
  625,
  626,
  5,
  65,
  0,
  0,
  626,
  79,
  1,
  0,
  0,
  0,
  627,
  629,
  5,
  97,
  0,
  0,
  628,
  627,
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
  630,
  1,
  0,
  0,
  0,
  630,
  631,
  5,
  7,
  0,
  0,
  631,
  632,
  3,
  172,
  86,
  0,
  632,
  633,
  5,
  65,
  0,
  0,
  633,
  81,
  1,
  0,
  0,
  0,
  634,
  636,
  5,
  97,
  0,
  0,
  635,
  634,
  1,
  0,
  0,
  0,
  635,
  636,
  1,
  0,
  0,
  0,
  636,
  637,
  1,
  0,
  0,
  0,
  637,
  638,
  5,
  45,
  0,
  0,
  638,
  639,
  3,
  138,
  69,
  0,
  639,
  640,
  3,
  162,
  81,
  0,
  640,
  641,
  5,
  65,
  0,
  0,
  641,
  83,
  1,
  0,
  0,
  0,
  642,
  643,
  5,
  38,
  0,
  0,
  643,
  644,
  3,
  204,
  102,
  0,
  644,
  645,
  5,
  65,
  0,
  0,
  645,
  85,
  1,
  0,
  0,
  0,
  646,
  648,
  5,
  97,
  0,
  0,
  647,
  646,
  1,
  0,
  0,
  0,
  647,
  648,
  1,
  0,
  0,
  0,
  648,
  649,
  1,
  0,
  0,
  0,
  649,
  650,
  5,
  14,
  0,
  0,
  650,
  651,
  3,
  204,
  102,
  0,
  651,
  652,
  5,
  43,
  0,
  0,
  652,
  653,
  5,
  65,
  0,
  0,
  653,
  87,
  1,
  0,
  0,
  0,
  654,
  656,
  5,
  97,
  0,
  0,
  655,
  654,
  1,
  0,
  0,
  0,
  655,
  656,
  1,
  0,
  0,
  0,
  656,
  657,
  1,
  0,
  0,
  0,
  657,
  658,
  5,
  15,
  0,
  0,
  658,
  659,
  5,
  65,
  0,
  0,
  659,
  89,
  1,
  0,
  0,
  0,
  660,
  662,
  5,
  97,
  0,
  0,
  661,
  660,
  1,
  0,
  0,
  0,
  661,
  662,
  1,
  0,
  0,
  0,
  662,
  663,
  1,
  0,
  0,
  0,
  663,
  664,
  5,
  8,
  0,
  0,
  664,
  665,
  3,
  130,
  65,
  0,
  665,
  666,
  5,
  3,
  0,
  0,
  666,
  667,
  3,
  138,
  69,
  0,
  667,
  668,
  5,
  65,
  0,
  0,
  668,
  91,
  1,
  0,
  0,
  0,
  669,
  670,
  5,
  22,
  0,
  0,
  670,
  671,
  3,
  204,
  102,
  0,
  671,
  672,
  5,
  43,
  0,
  0,
  672,
  93,
  1,
  0,
  0,
  0,
  673,
  674,
  5,
  16,
  0,
  0,
  674,
  675,
  5,
  22,
  0,
  0,
  675,
  95,
  1,
  0,
  0,
  0,
  676,
  677,
  5,
  49,
  0,
  0,
  677,
  678,
  3,
  204,
  102,
  0,
  678,
  97,
  1,
  0,
  0,
  0,
  679,
  680,
  5,
  16,
  0,
  0,
  680,
  681,
  5,
  49,
  0,
  0,
  681,
  99,
  1,
  0,
  0,
  0,
  682,
  683,
  5,
  19,
  0,
  0,
  683,
  684,
  3,
  130,
  65,
  0,
  684,
  685,
  5,
  23,
  0,
  0,
  685,
  686,
  3,
  204,
  102,
  0,
  686,
  101,
  1,
  0,
  0,
  0,
  687,
  688,
  5,
  16,
  0,
  0,
  688,
  689,
  5,
  19,
  0,
  0,
  689,
  103,
  1,
  0,
  0,
  0,
  690,
  691,
  5,
  47,
  0,
  0,
  691,
  105,
  1,
  0,
  0,
  0,
  692,
  693,
  5,
  16,
  0,
  0,
  693,
  694,
  5,
  47,
  0,
  0,
  694,
  107,
  1,
  0,
  0,
  0,
  695,
  696,
  5,
  11,
  0,
  0,
  696,
  698,
  5,
  71,
  0,
  0,
  697,
  699,
  3,
  146,
  73,
  0,
  698,
  697,
  1,
  0,
  0,
  0,
  698,
  699,
  1,
  0,
  0,
  0,
  699,
  700,
  1,
  0,
  0,
  0,
  700,
  701,
  5,
  72,
  0,
  0,
  701,
  109,
  1,
  0,
  0,
  0,
  702,
  703,
  5,
  16,
  0,
  0,
  703,
  704,
  5,
  11,
  0,
  0,
  704,
  111,
  1,
  0,
  0,
  0,
  705,
  707,
  5,
  35,
  0,
  0,
  706,
  705,
  1,
  0,
  0,
  0,
  706,
  707,
  1,
  0,
  0,
  0,
  707,
  708,
  1,
  0,
  0,
  0,
  708,
  709,
  5,
  37,
  0,
  0,
  709,
  710,
  3,
  130,
  65,
  0,
  710,
  711,
  5,
  3,
  0,
  0,
  711,
  712,
  3,
  148,
  74,
  0,
  712,
  713,
  5,
  65,
  0,
  0,
  713,
  113,
  1,
  0,
  0,
  0,
  714,
  715,
  3,
  44,
  22,
  0,
  715,
  115,
  1,
  0,
  0,
  0,
  716,
  717,
  3,
  46,
  23,
  0,
  717,
  117,
  1,
  0,
  0,
  0,
  718,
  719,
  3,
  52,
  26,
  0,
  719,
  119,
  1,
  0,
  0,
  0,
  720,
  721,
  3,
  54,
  27,
  0,
  721,
  121,
  1,
  0,
  0,
  0,
  722,
  723,
  5,
  12,
  0,
  0,
  723,
  724,
  3,
  134,
  67,
  0,
  724,
  725,
  5,
  71,
  0,
  0,
  725,
  726,
  3,
  146,
  73,
  0,
  726,
  727,
  5,
  72,
  0,
  0,
  727,
  728,
  5,
  39,
  0,
  0,
  728,
  729,
  3,
  148,
  74,
  0,
  729,
  123,
  1,
  0,
  0,
  0,
  730,
  731,
  5,
  16,
  0,
  0,
  731,
  732,
  5,
  12,
  0,
  0,
  732,
  125,
  1,
  0,
  0,
  0,
  733,
  735,
  5,
  97,
  0,
  0,
  734,
  733,
  1,
  0,
  0,
  0,
  734,
  735,
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
  737,
  5,
  1,
  0,
  0,
  737,
  738,
  3,
  44,
  22,
  0,
  738,
  127,
  1,
  0,
  0,
  0,
  739,
  741,
  5,
  97,
  0,
  0,
  740,
  739,
  1,
  0,
  0,
  0,
  740,
  741,
  1,
  0,
  0,
  0,
  741,
  742,
  1,
  0,
  0,
  0,
  742,
  743,
  5,
  1,
  0,
  0,
  743,
  744,
  3,
  52,
  26,
  0,
  744,
  129,
  1,
  0,
  0,
  0,
  745,
  746,
  5,
  87,
  0,
  0,
  746,
  131,
  1,
  0,
  0,
  0,
  747,
  750,
  3,
  168,
  84,
  0,
  748,
  750,
  3,
  170,
  85,
  0,
  749,
  747,
  1,
  0,
  0,
  0,
  749,
  748,
  1,
  0,
  0,
  0,
  750,
  133,
  1,
  0,
  0,
  0,
  751,
  752,
  5,
  87,
  0,
  0,
  752,
  135,
  1,
  0,
  0,
  0,
  753,
  754,
  5,
  86,
  0,
  0,
  754,
  137,
  1,
  0,
  0,
  0,
  755,
  756,
  7,
  0,
  0,
  0,
  756,
  139,
  1,
  0,
  0,
  0,
  757,
  760,
  3,
  154,
  77,
  0,
  758,
  760,
  3,
  130,
  65,
  0,
  759,
  757,
  1,
  0,
  0,
  0,
  759,
  758,
  1,
  0,
  0,
  0,
  760,
  141,
  1,
  0,
  0,
  0,
  761,
  766,
  3,
  144,
  72,
  0,
  762,
  763,
  5,
  74,
  0,
  0,
  763,
  765,
  3,
  144,
  72,
  0,
  764,
  762,
  1,
  0,
  0,
  0,
  765,
  768,
  1,
  0,
  0,
  0,
  766,
  764,
  1,
  0,
  0,
  0,
  766,
  767,
  1,
  0,
  0,
  0,
  767,
  143,
  1,
  0,
  0,
  0,
  768,
  766,
  1,
  0,
  0,
  0,
  769,
  772,
  3,
  198,
  99,
  0,
  770,
  772,
  3,
  204,
  102,
  0,
  771,
  769,
  1,
  0,
  0,
  0,
  771,
  770,
  1,
  0,
  0,
  0,
  772,
  145,
  1,
  0,
  0,
  0,
  773,
  778,
  3,
  192,
  96,
  0,
  774,
  775,
  5,
  74,
  0,
  0,
  775,
  777,
  3,
  192,
  96,
  0,
  776,
  774,
  1,
  0,
  0,
  0,
  777,
  780,
  1,
  0,
  0,
  0,
  778,
  776,
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
  147,
  1,
  0,
  0,
  0,
  780,
  778,
  1,
  0,
  0,
  0,
  781,
  785,
  3,
  196,
  98,
  0,
  782,
  785,
  3,
  138,
  69,
  0,
  783,
  785,
  3,
  194,
  97,
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
  784,
  783,
  1,
  0,
  0,
  0,
  785,
  149,
  1,
  0,
  0,
  0,
  786,
  791,
  3,
  130,
  65,
  0,
  787,
  788,
  5,
  74,
  0,
  0,
  788,
  790,
  3,
  130,
  65,
  0,
  789,
  787,
  1,
  0,
  0,
  0,
  790,
  793,
  1,
  0,
  0,
  0,
  791,
  789,
  1,
  0,
  0,
  0,
  791,
  792,
  1,
  0,
  0,
  0,
  792,
  151,
  1,
  0,
  0,
  0,
  793,
  791,
  1,
  0,
  0,
  0,
  794,
  795,
  3,
  204,
  102,
  0,
  795,
  153,
  1,
  0,
  0,
  0,
  796,
  802,
  5,
  56,
  0,
  0,
  797,
  802,
  3,
  156,
  78,
  0,
  798,
  802,
  3,
  158,
  79,
  0,
  799,
  802,
  3,
  162,
  81,
  0,
  800,
  802,
  3,
  160,
  80,
  0,
  801,
  796,
  1,
  0,
  0,
  0,
  801,
  797,
  1,
  0,
  0,
  0,
  801,
  798,
  1,
  0,
  0,
  0,
  801,
  799,
  1,
  0,
  0,
  0,
  801,
  800,
  1,
  0,
  0,
  0,
  802,
  155,
  1,
  0,
  0,
  0,
  803,
  804,
  7,
  1,
  0,
  0,
  804,
  157,
  1,
  0,
  0,
  0,
  805,
  806,
  5,
  92,
  0,
  0,
  806,
  159,
  1,
  0,
  0,
  0,
  807,
  808,
  3,
  138,
  69,
  0,
  808,
  809,
  5,
  73,
  0,
  0,
  809,
  810,
  3,
  130,
  65,
  0,
  810,
  161,
  1,
  0,
  0,
  0,
  811,
  812,
  7,
  2,
  0,
  0,
  812,
  163,
  1,
  0,
  0,
  0,
  813,
  814,
  5,
  44,
  0,
  0,
  814,
  165,
  1,
  0,
  0,
  0,
  815,
  816,
  5,
  69,
  0,
  0,
  816,
  817,
  3,
  204,
  102,
  0,
  817,
  818,
  5,
  70,
  0,
  0,
  818,
  167,
  1,
  0,
  0,
  0,
  819,
  823,
  3,
  130,
  65,
  0,
  820,
  822,
  3,
  166,
  83,
  0,
  821,
  820,
  1,
  0,
  0,
  0,
  822,
  825,
  1,
  0,
  0,
  0,
  823,
  821,
  1,
  0,
  0,
  0,
  823,
  824,
  1,
  0,
  0,
  0,
  824,
  169,
  1,
  0,
  0,
  0,
  825,
  823,
  1,
  0,
  0,
  0,
  826,
  827,
  3,
  164,
  82,
  0,
  827,
  828,
  5,
  73,
  0,
  0,
  828,
  829,
  3,
  168,
  84,
  0,
  829,
  171,
  1,
  0,
  0,
  0,
  830,
  833,
  3,
  164,
  82,
  0,
  831,
  833,
  3,
  174,
  87,
  0,
  832,
  830,
  1,
  0,
  0,
  0,
  832,
  831,
  1,
  0,
  0,
  0,
  833,
  838,
  1,
  0,
  0,
  0,
  834,
  835,
  5,
  73,
  0,
  0,
  835,
  837,
  3,
  174,
  87,
  0,
  836,
  834,
  1,
  0,
  0,
  0,
  837,
  840,
  1,
  0,
  0,
  0,
  838,
  836,
  1,
  0,
  0,
  0,
  838,
  839,
  1,
  0,
  0,
  0,
  839,
  173,
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
  841,
  848,
  3,
  130,
  65,
  0,
  842,
  848,
  3,
  184,
  92,
  0,
  843,
  848,
  3,
  176,
  88,
  0,
  844,
  848,
  3,
  182,
  91,
  0,
  845,
  848,
  3,
  154,
  77,
  0,
  846,
  848,
  3,
  200,
  100,
  0,
  847,
  841,
  1,
  0,
  0,
  0,
  847,
  842,
  1,
  0,
  0,
  0,
  847,
  843,
  1,
  0,
  0,
  0,
  847,
  844,
  1,
  0,
  0,
  0,
  847,
  845,
  1,
  0,
  0,
  0,
  847,
  846,
  1,
  0,
  0,
  0,
  848,
  852,
  1,
  0,
  0,
  0,
  849,
  851,
  3,
  166,
  83,
  0,
  850,
  849,
  1,
  0,
  0,
  0,
  851,
  854,
  1,
  0,
  0,
  0,
  852,
  850,
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
  175,
  1,
  0,
  0,
  0,
  854,
  852,
  1,
  0,
  0,
  0,
  855,
  856,
  5,
  71,
  0,
  0,
  856,
  857,
  3,
  204,
  102,
  0,
  857,
  858,
  5,
  72,
  0,
  0,
  858,
  177,
  1,
  0,
  0,
  0,
  859,
  860,
  7,
  3,
  0,
  0,
  860,
  861,
  3,
  172,
  86,
  0,
  861,
  179,
  1,
  0,
  0,
  0,
  862,
  863,
  3,
  172,
  86,
  0,
  863,
  864,
  3,
  186,
  93,
  0,
  864,
  865,
  3,
  204,
  102,
  0,
  865,
  181,
  1,
  0,
  0,
  0,
  866,
  867,
  5,
  71,
  0,
  0,
  867,
  868,
  3,
  204,
  102,
  0,
  868,
  869,
  5,
  74,
  0,
  0,
  869,
  874,
  3,
  204,
  102,
  0,
  870,
  871,
  5,
  74,
  0,
  0,
  871,
  873,
  3,
  204,
  102,
  0,
  872,
  870,
  1,
  0,
  0,
  0,
  873,
  876,
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
  874,
  875,
  1,
  0,
  0,
  0,
  875,
  877,
  1,
  0,
  0,
  0,
  876,
  874,
  1,
  0,
  0,
  0,
  877,
  878,
  5,
  72,
  0,
  0,
  878,
  183,
  1,
  0,
  0,
  0,
  879,
  880,
  3,
  134,
  67,
  0,
  880,
  882,
  5,
  71,
  0,
  0,
  881,
  883,
  3,
  142,
  71,
  0,
  882,
  881,
  1,
  0,
  0,
  0,
  882,
  883,
  1,
  0,
  0,
  0,
  883,
  884,
  1,
  0,
  0,
  0,
  884,
  885,
  5,
  72,
  0,
  0,
  885,
  185,
  1,
  0,
  0,
  0,
  886,
  887,
  7,
  4,
  0,
  0,
  887,
  187,
  1,
  0,
  0,
  0,
  888,
  889,
  5,
  85,
  0,
  0,
  889,
  890,
  5,
  71,
  0,
  0,
  890,
  891,
  3,
  204,
  102,
  0,
  891,
  892,
  5,
  74,
  0,
  0,
  892,
  893,
  3,
  204,
  102,
  0,
  893,
  894,
  5,
  74,
  0,
  0,
  894,
  895,
  3,
  204,
  102,
  0,
  895,
  896,
  5,
  72,
  0,
  0,
  896,
  189,
  1,
  0,
  0,
  0,
  897,
  898,
  5,
  30,
  0,
  0,
  898,
  899,
  3,
  148,
  74,
  0,
  899,
  901,
  5,
  71,
  0,
  0,
  900,
  902,
  3,
  142,
  71,
  0,
  901,
  900,
  1,
  0,
  0,
  0,
  901,
  902,
  1,
  0,
  0,
  0,
  902,
  903,
  1,
  0,
  0,
  0,
  903,
  904,
  5,
  72,
  0,
  0,
  904,
  191,
  1,
  0,
  0,
  0,
  905,
  906,
  3,
  130,
  65,
  0,
  906,
  907,
  5,
  3,
  0,
  0,
  907,
  908,
  3,
  148,
  74,
  0,
  908,
  193,
  1,
  0,
  0,
  0,
  909,
  910,
  3,
  138,
  69,
  0,
  910,
  911,
  5,
  80,
  0,
  0,
  911,
  912,
  5,
  32,
  0,
  0,
  912,
  917,
  3,
  148,
  74,
  0,
  913,
  914,
  5,
  74,
  0,
  0,
  914,
  916,
  3,
  148,
  74,
  0,
  915,
  913,
  1,
  0,
  0,
  0,
  916,
  919,
  1,
  0,
  0,
  0,
  917,
  915,
  1,
  0,
  0,
  0,
  917,
  918,
  1,
  0,
  0,
  0,
  918,
  920,
  1,
  0,
  0,
  0,
  919,
  917,
  1,
  0,
  0,
  0,
  920,
  921,
  5,
  81,
  0,
  0,
  921,
  195,
  1,
  0,
  0,
  0,
  922,
  923,
  5,
  71,
  0,
  0,
  923,
  926,
  3,
  148,
  74,
  0,
  924,
  925,
  5,
  74,
  0,
  0,
  925,
  927,
  3,
  148,
  74,
  0,
  926,
  924,
  1,
  0,
  0,
  0,
  927,
  928,
  1,
  0,
  0,
  0,
  928,
  926,
  1,
  0,
  0,
  0,
  928,
  929,
  1,
  0,
  0,
  0,
  929,
  930,
  1,
  0,
  0,
  0,
  930,
  931,
  5,
  72,
  0,
  0,
  931,
  197,
  1,
  0,
  0,
  0,
  932,
  935,
  5,
  26,
  0,
  0,
  933,
  936,
  3,
  146,
  73,
  0,
  934,
  936,
  3,
  142,
  71,
  0,
  935,
  933,
  1,
  0,
  0,
  0,
  935,
  934,
  1,
  0,
  0,
  0,
  936,
  937,
  1,
  0,
  0,
  0,
  937,
  938,
  5,
  59,
  0,
  0,
  938,
  939,
  3,
  204,
  102,
  0,
  939,
  199,
  1,
  0,
  0,
  0,
  940,
  941,
  5,
  69,
  0,
  0,
  941,
  946,
  3,
  204,
  102,
  0,
  942,
  943,
  5,
  74,
  0,
  0,
  943,
  945,
  3,
  204,
  102,
  0,
  944,
  942,
  1,
  0,
  0,
  0,
  945,
  948,
  1,
  0,
  0,
  0,
  946,
  944,
  1,
  0,
  0,
  0,
  946,
  947,
  1,
  0,
  0,
  0,
  947,
  949,
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
  949,
  950,
  5,
  70,
  0,
  0,
  950,
  201,
  1,
  0,
  0,
  0,
  951,
  952,
  5,
  63,
  0,
  0,
  952,
  953,
  5,
  94,
  0,
  0,
  953,
  203,
  1,
  0,
  0,
  0,
  954,
  955,
  6,
  102,
  -1,
  0,
  955,
  961,
  3,
  190,
  95,
  0,
  956,
  961,
  3,
  188,
  94,
  0,
  957,
  961,
  3,
  178,
  89,
  0,
  958,
  961,
  3,
  172,
  86,
  0,
  959,
  961,
  3,
  206,
  103,
  0,
  960,
  954,
  1,
  0,
  0,
  0,
  960,
  956,
  1,
  0,
  0,
  0,
  960,
  957,
  1,
  0,
  0,
  0,
  960,
  958,
  1,
  0,
  0,
  0,
  960,
  959,
  1,
  0,
  0,
  0,
  961,
  968,
  1,
  0,
  0,
  0,
  962,
  963,
  10,
  2,
  0,
  0,
  963,
  964,
  3,
  186,
  93,
  0,
  964,
  965,
  3,
  204,
  102,
  3,
  965,
  967,
  1,
  0,
  0,
  0,
  966,
  962,
  1,
  0,
  0,
  0,
  967,
  970,
  1,
  0,
  0,
  0,
  968,
  966,
  1,
  0,
  0,
  0,
  968,
  969,
  1,
  0,
  0,
  0,
  969,
  205,
  1,
  0,
  0,
  0,
  970,
  968,
  1,
  0,
  0,
  0,
  971,
  972,
  3,
  172,
  86,
  0,
  972,
  973,
  5,
  60,
  0,
  0,
  973,
  974,
  3,
  172,
  86,
  0,
  974,
  207,
  1,
  0,
  0,
  0,
  88,
  209,
  214,
  220,
  234,
  237,
  244,
  251,
  257,
  259,
  267,
  275,
  277,
  284,
  291,
  298,
  308,
  310,
  317,
  328,
  330,
  350,
  353,
  360,
  362,
  369,
  376,
  383,
  390,
  397,
  404,
  411,
  421,
  428,
  435,
  438,
  444,
  446,
  454,
  457,
  464,
  471,
  474,
  481,
  489,
  502,
  521,
  532,
  542,
  548,
  558,
  566,
  576,
  585,
  590,
  596,
  606,
  615,
  628,
  635,
  647,
  655,
  661,
  698,
  706,
  734,
  740,
  749,
  759,
  766,
  771,
  778,
  784,
  791,
  801,
  823,
  832,
  838,
  847,
  852,
  874,
  882,
  901,
  917,
  928,
  935,
  946,
  960,
  968
];
var atn2 = new Ln.atn.ATNDeserializer().deserialize(serializedATN2);
var decisionsToDFA2 = atn2.decisionToState.map((ds, index) => new Ln.dfa.DFA(ds, index));
var sharedContextCache = new Ln.atn.PredictionContextCache();
var Elan2Parser = class _Elan2Parser extends Ln.Parser {
  static grammarFileName = "Elan2.g4";
  static literalNames = [
    null,
    "'abstract'",
    "'and'",
    "'as'",
    "'assert'",
    "'assign'",
    "'be'",
    "'call'",
    "'catch'",
    "'class'",
    "'constant'",
    "'constructor'",
    "'copy'",
    "'div'",
    "'elif'",
    "'else'",
    "'end'",
    "'enum'",
    "'evaluates'",
    "'for'",
    "'from'",
    "'function'",
    "'if'",
    "'in'",
    "'inherits'",
    "'input'",
    "'lambda'",
    "'let'",
    "'main'",
    "'mod'",
    "'new'",
    "'not'",
    "'of'",
    "'or'",
    "'print'",
    "'private'",
    "'procedure'",
    "'property'",
    "'return'",
    "'returns'",
    "'set'",
    "'step'",
    "'test'",
    "'then'",
    "'this'",
    "'throw'",
    "'to'",
    "'try'",
    "'variable'",
    "'while'",
    "'Int'",
    "'Float'",
    "'Boolean'",
    "'String'",
    "'List'",
    null,
    null,
    "'is'",
    "'isnt'",
    "'=>'",
    "'^'",
    "'0b'",
    "'0x'",
    "'$'",
    null,
    null,
    "'='",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'('",
    "')'",
    "'.'",
    "','",
    "':'",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'<'",
    "'>'",
    "'<='",
    "'>='",
    `'"'`,
    "'if_'",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "'[ghosted]'"
  ];
  static symbolicNames = [
    null,
    "ABSTRACT",
    "AND",
    "AS",
    "ASSERT",
    "ASSIGN",
    "BE",
    "CALL",
    "CATCH",
    "CLASS",
    "CONSTANT",
    "CONSTRUCTOR",
    "COPY",
    "DIV",
    "ELIF",
    "ELSE",
    "END",
    "ENUM",
    "EVALUATES",
    "FOR",
    "FROM",
    "FUNCTION",
    "IF",
    "IN",
    "INHERITS",
    "INPUT",
    "LAMBDA",
    "LET",
    "MAIN",
    "MOD",
    "NEW",
    "NOT",
    "OF",
    "OR",
    "PRINT",
    "PRIVATE",
    "PROCEDURE",
    "PROPERTY",
    "RETURN",
    "RETURNS",
    "SET",
    "STEP",
    "TEST",
    "THEN",
    "THIS",
    "THROW",
    "TO",
    "TRY",
    "VARIABLE",
    "WHILE",
    "INT_NAME",
    "FLOAT_NAME",
    "BOOL_NAME",
    "STRING_NAME",
    "LIST_NAME",
    "COMMENT",
    "LIT_BOOLEAN",
    "EQUAL",
    "NOT_EQUAL",
    "ARROW",
    "POWER",
    "BINARY_PREFIX",
    "HEX_PREFIX",
    "INTERPOLATED_STRING_PREFIX",
    "WS",
    "NL",
    "SINGLE_EQUALS",
    "OPEN_BRACE",
    "CLOSE_BRACE",
    "OPEN_SQ_BRACKET",
    "CLOSE_SQ_BRACKET",
    "OPEN_BRACKET",
    "CLOSE_BRACKET",
    "DOT",
    "COMMA",
    "COLON",
    "PLUS",
    "MINUS",
    "MULT",
    "DIVIDE",
    "LT",
    "GT",
    "LE",
    "GE",
    "DOUBLE_QUOTES",
    "IF_",
    "NAME_STARTING_TEST_",
    "NAME_STARTING_LC",
    "NAME_STARTING_UC",
    "LITERAL_BINARY",
    "LITERAL_HEX",
    "LITERAL_INTEGER",
    "LITERAL_FLOAT",
    "INTERPOLATED_STRING",
    "LITERAL_STRING",
    "WHITESPACES",
    "TEXT",
    "GHOSTED"
  ];
  static ruleNames = [
    "file",
    "global",
    "main",
    "function",
    "test",
    "procedure",
    "concreteClass",
    "abstractClass",
    "commentGlobal",
    "ordinaryStatement",
    "ifStatement",
    "whileLoop",
    "forLoop",
    "tryStatement",
    "commentStatement",
    "constructorMember",
    "functionMethod",
    "procedureMethod",
    "copyMethod",
    "commentMember",
    "mainTop",
    "mainBottom",
    "functionTop",
    "functionBottom",
    "testTop",
    "testBottom",
    "procedureTop",
    "procedureBottom",
    "concreteClassTop",
    "concreteClassBottom",
    "abstractClassTop",
    "abstractClassBottom",
    "constant",
    "enum",
    "assert",
    "letStatement",
    "print",
    "variableDefinition",
    "assignment",
    "inputStatement",
    "procedureCall",
    "throwStatement",
    "returnStatement",
    "elseIfClause",
    "elseClause",
    "catchStatement",
    "ifStatementTop",
    "ifStatementBottom",
    "whileLoopTop",
    "whileLoopBottom",
    "forLoopTop",
    "forLoopBottom",
    "tryStatementTop",
    "tryStatementBottom",
    "constructorTop",
    "constructorBottom",
    "property",
    "functionMethodTop",
    "functionMethodBottom",
    "procedureMethodTop",
    "procedureMethodBottom",
    "copyMethodTop",
    "copyMethodBottom",
    "abstractFunction",
    "abstractProcedure",
    "identifier",
    "assignable",
    "methodName",
    "testName",
    "typeName",
    "constantValue",
    "argList",
    "argument",
    "paramsList",
    "type",
    "enumValuesList",
    "assertActual",
    "litValue",
    "litInt",
    "litFloat",
    "enumValue",
    "litString",
    "thisInstance",
    "index",
    "identifierWithOptIndexes",
    "propertyRef",
    "term",
    "chainable",
    "bracketedExpression",
    "unaryExpression",
    "binaryExpression",
    "tuple",
    "methodCall",
    "binaryOperator",
    "ifExpression",
    "newInstance",
    "paramDef",
    "typeGeneric",
    "typeTuple",
    "lambda",
    "list",
    "interpolatedString",
    "expression",
    "power"
  ];
  constructor(input) {
    super(input);
    this._interp = new Ln.atn.ParserATNSimulator(this, atn2, decisionsToDFA2, sharedContextCache);
    this.ruleNames = _Elan2Parser.ruleNames;
    this.literalNames = _Elan2Parser.literalNames;
    this.symbolicNames = _Elan2Parser.symbolicNames;
  }
  sempred(localctx, ruleIndex, predIndex) {
    switch (ruleIndex) {
      case 102:
        return this.expression_sempred(localctx, predIndex);
      default:
        throw "No predicate with index:" + ruleIndex;
    }
  }
  expression_sempred(localctx, predIndex) {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 2);
      default:
        throw "No predicate with index:" + predIndex;
    }
  }
  file() {
    let localctx = new FileContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, _Elan2Parser.RULE_file);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 209;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 0, this._ctx);
      if (la_ === 1) {
        this.state = 208;
        this.match(_Elan2Parser.COMMENT);
      }
      this.state = 214;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 270665218) !== 0 || (_la - 36 & ~31) === 0 && (1 << _la - 36 & 524353) !== 0 || _la === 97) {
        this.state = 211;
        this.global();
        this.state = 216;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 220;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 65) {
        this.state = 217;
        this.match(_Elan2Parser.NL);
        this.state = 222;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 223;
      this.match(_Elan2Parser.EOF);
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
  global() {
    let localctx = new GlobalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, _Elan2Parser.RULE_global);
    try {
      this.state = 234;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 3, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 225;
          this.main();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 226;
          this.function_();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 227;
          this.test();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 228;
          this.procedure();
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          this.state = 229;
          this.constant();
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          this.state = 230;
          this.enum_();
          break;
        case 7:
          this.enterOuterAlt(localctx, 7);
          this.state = 231;
          this.concreteClass();
          break;
        case 8:
          this.enterOuterAlt(localctx, 8);
          this.state = 232;
          this.abstractClass();
          break;
        case 9:
          this.enterOuterAlt(localctx, 9);
          this.state = 233;
          this.commentGlobal();
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
  main() {
    let localctx = new MainContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, _Elan2Parser.RULE_main);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 237;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 236;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 239;
      this.mainTop();
      this.state = 240;
      this.match(_Elan2Parser.NL);
      this.state = 244;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 38273184) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 241;
        this.ordinaryStatement();
        this.state = 246;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 247;
      this.mainBottom();
      this.state = 248;
      this.match(_Elan2Parser.NL);
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
  function_() {
    let localctx = new FunctionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, _Elan2Parser.RULE_function);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 251;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 250;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 253;
      this.functionTop();
      this.state = 254;
      this.match(_Elan2Parser.NL);
      this.state = 259;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 172490912) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 257;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input, 7, this._ctx);
        switch (la_) {
          case 1:
            this.state = 255;
            this.letStatement();
            break;
          case 2:
            this.state = 256;
            this.ordinaryStatement();
            break;
        }
        this.state = 261;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 262;
      this.returnStatement();
      this.state = 263;
      this.functionBottom();
      this.state = 264;
      this.match(_Elan2Parser.NL);
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
    this.enterRule(localctx, 8, _Elan2Parser.RULE_test);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 267;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 266;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 269;
      this.testTop();
      this.state = 270;
      this.match(_Elan2Parser.NL);
      this.state = 277;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 4 || _la === 27 || _la === 48 || _la === 55 || _la === 97) {
        this.state = 275;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input, 10, this._ctx);
        switch (la_) {
          case 1:
            this.state = 271;
            this.assert();
            break;
          case 2:
            this.state = 272;
            this.letStatement();
            break;
          case 3:
            this.state = 273;
            this.variableDefinition();
            break;
          case 4:
            this.state = 274;
            this.commentStatement();
            break;
        }
        this.state = 279;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 280;
      this.testBottom();
      this.state = 281;
      this.match(_Elan2Parser.NL);
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
  procedure() {
    let localctx = new ProcedureContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, _Elan2Parser.RULE_procedure);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 284;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 283;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 286;
      this.procedureTop();
      this.state = 287;
      this.match(_Elan2Parser.NL);
      this.state = 291;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 38273184) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 288;
        this.ordinaryStatement();
        this.state = 293;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 294;
      this.procedureBottom();
      this.state = 295;
      this.match(_Elan2Parser.NL);
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
  concreteClass() {
    let localctx = new ConcreteClassContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, _Elan2Parser.RULE_concreteClass);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 298;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 297;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 300;
      this.concreteClassTop();
      this.state = 301;
      this.match(_Elan2Parser.NL);
      this.state = 310;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 2103296) !== 0 || (_la - 35 & ~31) === 0 && (1 << _la - 35 & 1074790407) !== 0 || _la === 97) {
        this.state = 308;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input, 15, this._ctx);
        switch (la_) {
          case 1:
            this.state = 302;
            this.constructorMember();
            break;
          case 2:
            this.state = 303;
            this.property();
            break;
          case 3:
            this.state = 304;
            this.functionMethod();
            break;
          case 4:
            this.state = 305;
            this.procedureMethod();
            break;
          case 5:
            this.state = 306;
            this.copyMethod();
            break;
          case 6:
            this.state = 307;
            this.commentMember();
            break;
        }
        this.state = 312;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 313;
      this.concreteClassBottom();
      this.state = 314;
      this.match(_Elan2Parser.NL);
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
    this.enterRule(localctx, 14, _Elan2Parser.RULE_abstractClass);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 317;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 316;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 319;
      this.abstractClassTop();
      this.state = 320;
      this.match(_Elan2Parser.NL);
      this.state = 330;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 2101250) !== 0 || (_la - 35 & ~31) === 0 && (1 << _la - 35 & 1074790407) !== 0 || _la === 97) {
        this.state = 328;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input, 18, this._ctx);
        switch (la_) {
          case 1:
            this.state = 321;
            this.property();
            break;
          case 2:
            this.state = 322;
            this.functionMethod();
            break;
          case 3:
            this.state = 323;
            this.procedureMethod();
            break;
          case 4:
            this.state = 324;
            this.copyMethod();
            break;
          case 5:
            this.state = 325;
            this.abstractFunction();
            break;
          case 6:
            this.state = 326;
            this.abstractProcedure();
            break;
          case 7:
            this.state = 327;
            this.commentMember();
            break;
        }
        this.state = 332;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 333;
      this.abstractClassBottom();
      this.state = 334;
      this.match(_Elan2Parser.NL);
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
  commentGlobal() {
    let localctx = new CommentGlobalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, _Elan2Parser.RULE_commentGlobal);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 336;
      this.match(_Elan2Parser.COMMENT);
      this.state = 337;
      this.match(_Elan2Parser.NL);
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
  ordinaryStatement() {
    let localctx = new OrdinaryStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, _Elan2Parser.RULE_ordinaryStatement);
    try {
      this.state = 350;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 20, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 339;
          this.print();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 340;
          this.variableDefinition();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 341;
          this.assignment();
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 342;
          this.inputStatement();
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          this.state = 343;
          this.ifStatement();
          break;
        case 6:
          this.enterOuterAlt(localctx, 6);
          this.state = 344;
          this.whileLoop();
          break;
        case 7:
          this.enterOuterAlt(localctx, 7);
          this.state = 345;
          this.forLoop();
          break;
        case 8:
          this.enterOuterAlt(localctx, 8);
          this.state = 346;
          this.procedureCall();
          break;
        case 9:
          this.enterOuterAlt(localctx, 9);
          this.state = 347;
          this.tryStatement();
          break;
        case 10:
          this.enterOuterAlt(localctx, 10);
          this.state = 348;
          this.throwStatement();
          break;
        case 11:
          this.enterOuterAlt(localctx, 11);
          this.state = 349;
          this.commentStatement();
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
  ifStatement() {
    let localctx = new IfStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, _Elan2Parser.RULE_ifStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 353;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 352;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 355;
      this.ifStatementTop();
      this.state = 356;
      this.match(_Elan2Parser.NL);
      this.state = 362;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 38322336) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 360;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input, 22, this._ctx);
        switch (la_) {
          case 1:
            this.state = 357;
            this.elseIfClause();
            break;
          case 2:
            this.state = 358;
            this.elseClause();
            break;
          case 3:
            this.state = 359;
            this.ordinaryStatement();
            break;
        }
        this.state = 364;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 365;
      this.ifStatementBottom();
      this.state = 366;
      this.match(_Elan2Parser.NL);
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
  whileLoop() {
    let localctx = new WhileLoopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, _Elan2Parser.RULE_whileLoop);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 369;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 368;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 371;
      this.whileLoopTop();
      this.state = 372;
      this.match(_Elan2Parser.NL);
      this.state = 376;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 38273184) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 373;
        this.ordinaryStatement();
        this.state = 378;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 379;
      this.whileLoopBottom();
      this.state = 380;
      this.match(_Elan2Parser.NL);
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
  forLoop() {
    let localctx = new ForLoopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, _Elan2Parser.RULE_forLoop);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 383;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 382;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 385;
      this.forLoopTop();
      this.state = 386;
      this.match(_Elan2Parser.NL);
      this.state = 390;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 38273184) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 387;
        this.ordinaryStatement();
        this.state = 392;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 393;
      this.forLoopBottom();
      this.state = 394;
      this.match(_Elan2Parser.NL);
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
  tryStatement() {
    let localctx = new TryStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, _Elan2Parser.RULE_tryStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 397;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 396;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 399;
      this.tryStatementTop();
      this.state = 400;
      this.match(_Elan2Parser.NL);
      this.state = 404;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 401;
          this.ordinaryStatement();
        }
        this.state = 406;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
      }
      this.state = 407;
      this.catchStatement();
      this.state = 411;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 38273184) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 408;
        this.ordinaryStatement();
        this.state = 413;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 414;
      this.tryStatementBottom();
      this.state = 415;
      this.match(_Elan2Parser.NL);
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
  commentStatement() {
    let localctx = new CommentStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, _Elan2Parser.RULE_commentStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 417;
      this.match(_Elan2Parser.COMMENT);
      this.state = 418;
      this.match(_Elan2Parser.NL);
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
  constructorMember() {
    let localctx = new ConstructorMemberContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, _Elan2Parser.RULE_constructorMember);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 421;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 420;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 423;
      this.constructorTop();
      this.state = 424;
      this.match(_Elan2Parser.NL);
      this.state = 428;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 38273184) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 425;
        this.ordinaryStatement();
        this.state = 430;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 431;
      this.constructorBottom();
      this.state = 432;
      this.match(_Elan2Parser.NL);
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
  functionMethod() {
    let localctx = new FunctionMethodContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, _Elan2Parser.RULE_functionMethod);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 435;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 434;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 438;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 35) {
        this.state = 437;
        this.match(_Elan2Parser.PRIVATE);
      }
      this.state = 440;
      this.functionMethodTop();
      this.state = 441;
      this.match(_Elan2Parser.NL);
      this.state = 446;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 172490912) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 444;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input, 35, this._ctx);
        switch (la_) {
          case 1:
            this.state = 442;
            this.letStatement();
            break;
          case 2:
            this.state = 443;
            this.ordinaryStatement();
            break;
        }
        this.state = 448;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 449;
      this.returnStatement();
      this.state = 450;
      this.functionMethodBottom();
      this.state = 451;
      this.match(_Elan2Parser.NL);
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
  procedureMethod() {
    let localctx = new ProcedureMethodContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, _Elan2Parser.RULE_procedureMethod);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 454;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 453;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 457;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 35) {
        this.state = 456;
        this.match(_Elan2Parser.PRIVATE);
      }
      this.state = 459;
      this.procedureMethodTop();
      this.state = 460;
      this.match(_Elan2Parser.NL);
      this.state = 464;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 38273184) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 461;
        this.ordinaryStatement();
        this.state = 466;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 467;
      this.procedureMethodBottom();
      this.state = 468;
      this.match(_Elan2Parser.NL);
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
  copyMethod() {
    let localctx = new CopyMethodContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, _Elan2Parser.RULE_copyMethod);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 471;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 470;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 474;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 35) {
        this.state = 473;
        this.match(_Elan2Parser.PRIVATE);
      }
      this.state = 476;
      this.copyMethodTop();
      this.state = 477;
      this.match(_Elan2Parser.NL);
      this.state = 481;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while ((_la & ~31) === 0 && (1 << _la & 38273184) !== 0 || (_la - 34 & ~31) === 0 && (1 << _la - 34 & 2156545) !== 0 || _la === 97) {
        this.state = 478;
        this.ordinaryStatement();
        this.state = 483;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 484;
      this.returnStatement();
      this.state = 485;
      this.copyMethodBottom();
      this.state = 486;
      this.match(_Elan2Parser.NL);
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
  commentMember() {
    let localctx = new CommentMemberContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, _Elan2Parser.RULE_commentMember);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 489;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 55) {
        this.state = 488;
        this.match(_Elan2Parser.COMMENT);
      }
      this.state = 491;
      this.match(_Elan2Parser.NL);
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
  mainTop() {
    let localctx = new MainTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, _Elan2Parser.RULE_mainTop);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 493;
      this.match(_Elan2Parser.MAIN);
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
  mainBottom() {
    let localctx = new MainBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, _Elan2Parser.RULE_mainBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 495;
      this.match(_Elan2Parser.END);
      this.state = 496;
      this.match(_Elan2Parser.MAIN);
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
  functionTop() {
    let localctx = new FunctionTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, _Elan2Parser.RULE_functionTop);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 498;
      this.match(_Elan2Parser.FUNCTION);
      this.state = 499;
      this.methodName();
      this.state = 500;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 502;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 87) {
        this.state = 501;
        this.paramsList();
      }
      this.state = 504;
      this.match(_Elan2Parser.CLOSE_BRACKET);
      this.state = 505;
      this.match(_Elan2Parser.RETURNS);
      this.state = 506;
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
  functionBottom() {
    let localctx = new FunctionBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, _Elan2Parser.RULE_functionBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 508;
      this.match(_Elan2Parser.END);
      this.state = 509;
      this.match(_Elan2Parser.FUNCTION);
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
  testTop() {
    let localctx = new TestTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, _Elan2Parser.RULE_testTop);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 511;
      this.match(_Elan2Parser.TEST);
      this.state = 512;
      this.testName();
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
  testBottom() {
    let localctx = new TestBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, _Elan2Parser.RULE_testBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 514;
      this.match(_Elan2Parser.END);
      this.state = 515;
      this.match(_Elan2Parser.TEST);
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
  procedureTop() {
    let localctx = new ProcedureTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, _Elan2Parser.RULE_procedureTop);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 517;
      this.match(_Elan2Parser.PROCEDURE);
      this.state = 518;
      this.methodName();
      this.state = 519;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 521;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 87) {
        this.state = 520;
        this.paramsList();
      }
      this.state = 523;
      this.match(_Elan2Parser.CLOSE_BRACKET);
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
  procedureBottom() {
    let localctx = new ProcedureBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, _Elan2Parser.RULE_procedureBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 525;
      this.match(_Elan2Parser.END);
      this.state = 526;
      this.match(_Elan2Parser.PROCEDURE);
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
  concreteClassTop() {
    let localctx = new ConcreteClassTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 56, _Elan2Parser.RULE_concreteClassTop);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 528;
      this.match(_Elan2Parser.CLASS);
      this.state = 529;
      this.typeName();
      this.state = 532;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 24) {
        this.state = 530;
        this.match(_Elan2Parser.INHERITS);
        this.state = 531;
        this.typeName();
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
  concreteClassBottom() {
    let localctx = new ConcreteClassBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, _Elan2Parser.RULE_concreteClassBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 534;
      this.match(_Elan2Parser.END);
      this.state = 535;
      this.match(_Elan2Parser.CLASS);
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
  abstractClassTop() {
    let localctx = new AbstractClassTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 60, _Elan2Parser.RULE_abstractClassTop);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 537;
      this.match(_Elan2Parser.ABSTRACT);
      this.state = 538;
      this.match(_Elan2Parser.CLASS);
      this.state = 539;
      this.typeName();
      this.state = 542;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 24) {
        this.state = 540;
        this.match(_Elan2Parser.INHERITS);
        this.state = 541;
        this.typeName();
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
  abstractClassBottom() {
    let localctx = new AbstractClassBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 62, _Elan2Parser.RULE_abstractClassBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 544;
      this.match(_Elan2Parser.END);
      this.state = 545;
      this.match(_Elan2Parser.CLASS);
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
  constant() {
    let localctx = new ConstantContext(this, this._ctx, this.state);
    this.enterRule(localctx, 64, _Elan2Parser.RULE_constant);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 548;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 547;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 550;
      this.match(_Elan2Parser.CONSTANT);
      this.state = 551;
      this.identifier();
      this.state = 552;
      this.match(_Elan2Parser.SET);
      this.state = 553;
      this.match(_Elan2Parser.TO);
      this.state = 554;
      this.constantValue();
      this.state = 555;
      this.match(_Elan2Parser.NL);
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
  enum_() {
    let localctx = new EnumContext(this, this._ctx, this.state);
    this.enterRule(localctx, 66, _Elan2Parser.RULE_enum);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 558;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 557;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 560;
      this.match(_Elan2Parser.ENUM);
      this.state = 561;
      this.typeName();
      this.state = 562;
      this.enumValuesList();
      this.state = 563;
      this.match(_Elan2Parser.NL);
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
    this.enterRule(localctx, 68, _Elan2Parser.RULE_assert);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 566;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 565;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 568;
      this.match(_Elan2Parser.ASSERT);
      this.state = 569;
      this.assertActual();
      this.state = 570;
      this.match(_Elan2Parser.EVALUATES);
      this.state = 571;
      this.match(_Elan2Parser.TO);
      this.state = 572;
      this.expression(0);
      this.state = 573;
      this.match(_Elan2Parser.NL);
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
  letStatement() {
    let localctx = new LetStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 70, _Elan2Parser.RULE_letStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 576;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 575;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 578;
      this.match(_Elan2Parser.LET);
      this.state = 579;
      this.identifier();
      this.state = 580;
      this.match(_Elan2Parser.BE);
      this.state = 581;
      this.expression(0);
      this.state = 582;
      this.match(_Elan2Parser.NL);
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
  print() {
    let localctx = new PrintContext(this, this._ctx, this.state);
    this.enterRule(localctx, 72, _Elan2Parser.RULE_print);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 585;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 584;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 587;
      this.match(_Elan2Parser.PRINT);
      this.state = 588;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 590;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la - 30 & ~31) === 0 && (1 << _la - 30 & 99631107) !== 0 || (_la - 69 & ~31) === 0 && (1 << _la - 69 & 66912517) !== 0) {
        this.state = 589;
        this.expression(0);
      }
      this.state = 592;
      this.match(_Elan2Parser.CLOSE_BRACKET);
      this.state = 593;
      this.match(_Elan2Parser.NL);
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
  variableDefinition() {
    let localctx = new VariableDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 74, _Elan2Parser.RULE_variableDefinition);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 596;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 595;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 598;
      this.match(_Elan2Parser.VARIABLE);
      this.state = 599;
      this.identifier();
      this.state = 600;
      this.match(_Elan2Parser.SET);
      this.state = 601;
      this.match(_Elan2Parser.TO);
      this.state = 602;
      this.expression(0);
      this.state = 603;
      this.match(_Elan2Parser.NL);
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
    this.enterRule(localctx, 76, _Elan2Parser.RULE_assignment);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 606;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 605;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 608;
      this.match(_Elan2Parser.ASSIGN);
      this.state = 609;
      this.assignable();
      this.state = 610;
      this.match(_Elan2Parser.TO);
      this.state = 611;
      this.expression(0);
      this.state = 612;
      this.match(_Elan2Parser.NL);
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
  inputStatement() {
    let localctx = new InputStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 78, _Elan2Parser.RULE_inputStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 615;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 614;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 617;
      this.match(_Elan2Parser.INPUT);
      this.state = 618;
      this.identifier();
      this.state = 619;
      this.match(_Elan2Parser.SET);
      this.state = 620;
      this.match(_Elan2Parser.TO);
      this.state = 621;
      this.methodName();
      this.state = 622;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 623;
      this.expression(0);
      this.state = 624;
      this.match(_Elan2Parser.CLOSE_BRACKET);
      this.state = 625;
      this.match(_Elan2Parser.NL);
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
    this.enterRule(localctx, 80, _Elan2Parser.RULE_procedureCall);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 628;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 627;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 630;
      this.match(_Elan2Parser.CALL);
      this.state = 631;
      this.term();
      this.state = 632;
      this.match(_Elan2Parser.NL);
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
  throwStatement() {
    let localctx = new ThrowStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 82, _Elan2Parser.RULE_throwStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 635;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 634;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 637;
      this.match(_Elan2Parser.THROW);
      this.state = 638;
      this.typeName();
      this.state = 639;
      this.litString();
      this.state = 640;
      this.match(_Elan2Parser.NL);
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
  returnStatement() {
    let localctx = new ReturnStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 84, _Elan2Parser.RULE_returnStatement);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 642;
      this.match(_Elan2Parser.RETURN);
      this.state = 643;
      this.expression(0);
      this.state = 644;
      this.match(_Elan2Parser.NL);
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
  elseIfClause() {
    let localctx = new ElseIfClauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 86, _Elan2Parser.RULE_elseIfClause);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 647;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 646;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 649;
      this.match(_Elan2Parser.ELIF);
      this.state = 650;
      this.expression(0);
      this.state = 651;
      this.match(_Elan2Parser.THEN);
      this.state = 652;
      this.match(_Elan2Parser.NL);
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
  elseClause() {
    let localctx = new ElseClauseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 88, _Elan2Parser.RULE_elseClause);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 655;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 654;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 657;
      this.match(_Elan2Parser.ELSE);
      this.state = 658;
      this.match(_Elan2Parser.NL);
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
  catchStatement() {
    let localctx = new CatchStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 90, _Elan2Parser.RULE_catchStatement);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 661;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 660;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 663;
      this.match(_Elan2Parser.CATCH);
      this.state = 664;
      this.identifier();
      this.state = 665;
      this.match(_Elan2Parser.AS);
      this.state = 666;
      this.typeName();
      this.state = 667;
      this.match(_Elan2Parser.NL);
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
  ifStatementTop() {
    let localctx = new IfStatementTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 92, _Elan2Parser.RULE_ifStatementTop);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 669;
      this.match(_Elan2Parser.IF);
      this.state = 670;
      this.expression(0);
      this.state = 671;
      this.match(_Elan2Parser.THEN);
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
  ifStatementBottom() {
    let localctx = new IfStatementBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 94, _Elan2Parser.RULE_ifStatementBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 673;
      this.match(_Elan2Parser.END);
      this.state = 674;
      this.match(_Elan2Parser.IF);
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
  whileLoopTop() {
    let localctx = new WhileLoopTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 96, _Elan2Parser.RULE_whileLoopTop);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 676;
      this.match(_Elan2Parser.WHILE);
      this.state = 677;
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
  whileLoopBottom() {
    let localctx = new WhileLoopBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 98, _Elan2Parser.RULE_whileLoopBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 679;
      this.match(_Elan2Parser.END);
      this.state = 680;
      this.match(_Elan2Parser.WHILE);
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
  forLoopTop() {
    let localctx = new ForLoopTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 100, _Elan2Parser.RULE_forLoopTop);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 682;
      this.match(_Elan2Parser.FOR);
      this.state = 683;
      this.identifier();
      this.state = 684;
      this.match(_Elan2Parser.IN);
      this.state = 685;
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
  forLoopBottom() {
    let localctx = new ForLoopBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 102, _Elan2Parser.RULE_forLoopBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 687;
      this.match(_Elan2Parser.END);
      this.state = 688;
      this.match(_Elan2Parser.FOR);
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
  tryStatementTop() {
    let localctx = new TryStatementTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 104, _Elan2Parser.RULE_tryStatementTop);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 690;
      this.match(_Elan2Parser.TRY);
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
  tryStatementBottom() {
    let localctx = new TryStatementBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 106, _Elan2Parser.RULE_tryStatementBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 692;
      this.match(_Elan2Parser.END);
      this.state = 693;
      this.match(_Elan2Parser.TRY);
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
  constructorTop() {
    let localctx = new ConstructorTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 108, _Elan2Parser.RULE_constructorTop);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 695;
      this.match(_Elan2Parser.CONSTRUCTOR);
      this.state = 696;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 698;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 87) {
        this.state = 697;
        this.paramsList();
      }
      this.state = 700;
      this.match(_Elan2Parser.CLOSE_BRACKET);
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
  constructorBottom() {
    let localctx = new ConstructorBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 110, _Elan2Parser.RULE_constructorBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 702;
      this.match(_Elan2Parser.END);
      this.state = 703;
      this.match(_Elan2Parser.CONSTRUCTOR);
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
    this.enterRule(localctx, 112, _Elan2Parser.RULE_property);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 706;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 35) {
        this.state = 705;
        this.match(_Elan2Parser.PRIVATE);
      }
      this.state = 708;
      this.match(_Elan2Parser.PROPERTY);
      this.state = 709;
      this.identifier();
      this.state = 710;
      this.match(_Elan2Parser.AS);
      this.state = 711;
      this.type();
      this.state = 712;
      this.match(_Elan2Parser.NL);
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
  functionMethodTop() {
    let localctx = new FunctionMethodTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 114, _Elan2Parser.RULE_functionMethodTop);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 714;
      this.functionTop();
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
  functionMethodBottom() {
    let localctx = new FunctionMethodBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 116, _Elan2Parser.RULE_functionMethodBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 716;
      this.functionBottom();
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
  procedureMethodTop() {
    let localctx = new ProcedureMethodTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 118, _Elan2Parser.RULE_procedureMethodTop);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 718;
      this.procedureTop();
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
  procedureMethodBottom() {
    let localctx = new ProcedureMethodBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 120, _Elan2Parser.RULE_procedureMethodBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 720;
      this.procedureBottom();
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
  copyMethodTop() {
    let localctx = new CopyMethodTopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 122, _Elan2Parser.RULE_copyMethodTop);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 722;
      this.match(_Elan2Parser.COPY);
      this.state = 723;
      this.methodName();
      this.state = 724;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 725;
      this.paramsList();
      this.state = 726;
      this.match(_Elan2Parser.CLOSE_BRACKET);
      this.state = 727;
      this.match(_Elan2Parser.RETURNS);
      this.state = 728;
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
  copyMethodBottom() {
    let localctx = new CopyMethodBottomContext(this, this._ctx, this.state);
    this.enterRule(localctx, 124, _Elan2Parser.RULE_copyMethodBottom);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 730;
      this.match(_Elan2Parser.END);
      this.state = 731;
      this.match(_Elan2Parser.COPY);
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
  abstractFunction() {
    let localctx = new AbstractFunctionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 126, _Elan2Parser.RULE_abstractFunction);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 734;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 733;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 736;
      this.match(_Elan2Parser.ABSTRACT);
      this.state = 737;
      this.functionTop();
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
  abstractProcedure() {
    let localctx = new AbstractProcedureContext(this, this._ctx, this.state);
    this.enterRule(localctx, 128, _Elan2Parser.RULE_abstractProcedure);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 740;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === 97) {
        this.state = 739;
        this.match(_Elan2Parser.GHOSTED);
      }
      this.state = 742;
      this.match(_Elan2Parser.ABSTRACT);
      this.state = 743;
      this.procedureTop();
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
  identifier() {
    let localctx = new IdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 130, _Elan2Parser.RULE_identifier);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 745;
      this.match(_Elan2Parser.NAME_STARTING_LC);
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
  assignable() {
    let localctx = new AssignableContext(this, this._ctx, this.state);
    this.enterRule(localctx, 132, _Elan2Parser.RULE_assignable);
    try {
      this.state = 749;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 87:
          this.enterOuterAlt(localctx, 1);
          this.state = 747;
          this.identifierWithOptIndexes();
          break;
        case 44:
          this.enterOuterAlt(localctx, 2);
          this.state = 748;
          this.propertyRef();
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
  methodName() {
    let localctx = new MethodNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 134, _Elan2Parser.RULE_methodName);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 751;
      this.match(_Elan2Parser.NAME_STARTING_LC);
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
  testName() {
    let localctx = new TestNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 136, _Elan2Parser.RULE_testName);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 753;
      this.match(_Elan2Parser.NAME_STARTING_TEST_);
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
  typeName() {
    let localctx = new TypeNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 138, _Elan2Parser.RULE_typeName);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 755;
      _la = this._input.LA(1);
      if (!((_la - 50 & ~31) === 0 && (1 << _la - 50 & 31) !== 0 || _la === 88)) {
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
  constantValue() {
    let localctx = new ConstantValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 140, _Elan2Parser.RULE_constantValue);
    try {
      this.state = 759;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 56:
        case 88:
        case 89:
        case 90:
        case 91:
        case 92:
        case 93:
        case 94:
          this.enterOuterAlt(localctx, 1);
          this.state = 757;
          this.litValue();
          break;
        case 87:
          this.enterOuterAlt(localctx, 2);
          this.state = 758;
          this.identifier();
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
  argList() {
    let localctx = new ArgListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 142, _Elan2Parser.RULE_argList);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 761;
      this.argument();
      this.state = 766;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 74) {
        this.state = 762;
        this.match(_Elan2Parser.COMMA);
        this.state = 763;
        this.argument();
        this.state = 768;
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
  argument() {
    let localctx = new ArgumentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 144, _Elan2Parser.RULE_argument);
    try {
      this.state = 771;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 26:
          this.enterOuterAlt(localctx, 1);
          this.state = 769;
          this.lambda();
          break;
        case 30:
        case 31:
        case 44:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 56:
        case 69:
        case 71:
        case 77:
        case 85:
        case 87:
        case 88:
        case 89:
        case 90:
        case 91:
        case 92:
        case 93:
        case 94:
          this.enterOuterAlt(localctx, 2);
          this.state = 770;
          this.expression(0);
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
  paramsList() {
    let localctx = new ParamsListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 146, _Elan2Parser.RULE_paramsList);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 773;
      this.paramDef();
      this.state = 778;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 74) {
        this.state = 774;
        this.match(_Elan2Parser.COMMA);
        this.state = 775;
        this.paramDef();
        this.state = 780;
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
  type() {
    let localctx = new TypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 148, _Elan2Parser.RULE_type);
    try {
      this.state = 784;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 71, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 781;
          this.typeTuple();
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 782;
          this.typeName();
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 783;
          this.typeGeneric();
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
  enumValuesList() {
    let localctx = new EnumValuesListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 150, _Elan2Parser.RULE_enumValuesList);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 786;
      this.identifier();
      this.state = 791;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 74) {
        this.state = 787;
        this.match(_Elan2Parser.COMMA);
        this.state = 788;
        this.identifier();
        this.state = 793;
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
  assertActual() {
    let localctx = new AssertActualContext(this, this._ctx, this.state);
    this.enterRule(localctx, 152, _Elan2Parser.RULE_assertActual);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 794;
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
  litValue() {
    let localctx = new LitValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 154, _Elan2Parser.RULE_litValue);
    try {
      this.state = 801;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 56:
          this.enterOuterAlt(localctx, 1);
          this.state = 796;
          this.match(_Elan2Parser.LIT_BOOLEAN);
          break;
        case 89:
        case 90:
        case 91:
          this.enterOuterAlt(localctx, 2);
          this.state = 797;
          this.litInt();
          break;
        case 92:
          this.enterOuterAlt(localctx, 3);
          this.state = 798;
          this.litFloat();
          break;
        case 93:
        case 94:
          this.enterOuterAlt(localctx, 4);
          this.state = 799;
          this.litString();
          break;
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 88:
          this.enterOuterAlt(localctx, 5);
          this.state = 800;
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
  litInt() {
    let localctx = new LitIntContext(this, this._ctx, this.state);
    this.enterRule(localctx, 156, _Elan2Parser.RULE_litInt);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 803;
      _la = this._input.LA(1);
      if (!((_la - 89 & ~31) === 0 && (1 << _la - 89 & 7) !== 0)) {
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
  litFloat() {
    let localctx = new LitFloatContext(this, this._ctx, this.state);
    this.enterRule(localctx, 158, _Elan2Parser.RULE_litFloat);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 805;
      this.match(_Elan2Parser.LITERAL_FLOAT);
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
    this.enterRule(localctx, 160, _Elan2Parser.RULE_enumValue);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 807;
      this.typeName();
      this.state = 808;
      this.match(_Elan2Parser.DOT);
      this.state = 809;
      this.identifier();
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
  litString() {
    let localctx = new LitStringContext(this, this._ctx, this.state);
    this.enterRule(localctx, 162, _Elan2Parser.RULE_litString);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 811;
      _la = this._input.LA(1);
      if (!(_la === 93 || _la === 94)) {
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
  thisInstance() {
    let localctx = new ThisInstanceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 164, _Elan2Parser.RULE_thisInstance);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 813;
      this.match(_Elan2Parser.THIS);
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
    this.enterRule(localctx, 166, _Elan2Parser.RULE_index);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 815;
      this.match(_Elan2Parser.OPEN_SQ_BRACKET);
      this.state = 816;
      this.expression(0);
      this.state = 817;
      this.match(_Elan2Parser.CLOSE_SQ_BRACKET);
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
  identifierWithOptIndexes() {
    let localctx = new IdentifierWithOptIndexesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 168, _Elan2Parser.RULE_identifierWithOptIndexes);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 819;
      this.identifier();
      this.state = 823;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 69) {
        this.state = 820;
        this.index();
        this.state = 825;
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
  propertyRef() {
    let localctx = new PropertyRefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 170, _Elan2Parser.RULE_propertyRef);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 826;
      this.thisInstance();
      this.state = 827;
      this.match(_Elan2Parser.DOT);
      this.state = 828;
      this.identifierWithOptIndexes();
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
  term() {
    let localctx = new TermContext(this, this._ctx, this.state);
    this.enterRule(localctx, 172, _Elan2Parser.RULE_term);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 832;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 44:
          this.state = 830;
          this.thisInstance();
          break;
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 56:
        case 69:
        case 71:
        case 87:
        case 88:
        case 89:
        case 90:
        case 91:
        case 92:
        case 93:
        case 94:
          this.state = 831;
          this.chainable();
          break;
        default:
          throw new Ln.error.NoViableAltException(this);
      }
      this.state = 838;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 76, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 834;
          this.match(_Elan2Parser.DOT);
          this.state = 835;
          this.chainable();
        }
        this.state = 840;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 76, this._ctx);
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
  chainable() {
    let localctx = new ChainableContext(this, this._ctx, this.state);
    this.enterRule(localctx, 174, _Elan2Parser.RULE_chainable);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 847;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 77, this._ctx);
      switch (la_) {
        case 1:
          this.state = 841;
          this.identifier();
          break;
        case 2:
          this.state = 842;
          this.methodCall();
          break;
        case 3:
          this.state = 843;
          this.bracketedExpression();
          break;
        case 4:
          this.state = 844;
          this.tuple();
          break;
        case 5:
          this.state = 845;
          this.litValue();
          break;
        case 6:
          this.state = 846;
          this.list();
          break;
      }
      this.state = 852;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 78, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          this.state = 849;
          this.index();
        }
        this.state = 854;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 78, this._ctx);
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
  bracketedExpression() {
    let localctx = new BracketedExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 176, _Elan2Parser.RULE_bracketedExpression);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 855;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 856;
      this.expression(0);
      this.state = 857;
      this.match(_Elan2Parser.CLOSE_BRACKET);
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
  unaryExpression() {
    let localctx = new UnaryExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 178, _Elan2Parser.RULE_unaryExpression);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 859;
      _la = this._input.LA(1);
      if (!(_la === 31 || _la === 77)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
      this.state = 860;
      this.term();
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
  binaryExpression() {
    let localctx = new BinaryExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 180, _Elan2Parser.RULE_binaryExpression);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 862;
      this.term();
      this.state = 863;
      this.binaryOperator();
      this.state = 864;
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
  tuple() {
    let localctx = new TupleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 182, _Elan2Parser.RULE_tuple);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 866;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 867;
      this.expression(0);
      this.state = 868;
      this.match(_Elan2Parser.COMMA);
      this.state = 869;
      this.expression(0);
      this.state = 874;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 74) {
        this.state = 870;
        this.match(_Elan2Parser.COMMA);
        this.state = 871;
        this.expression(0);
        this.state = 876;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 877;
      this.match(_Elan2Parser.CLOSE_BRACKET);
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
  methodCall() {
    let localctx = new MethodCallContext(this, this._ctx, this.state);
    this.enterRule(localctx, 184, _Elan2Parser.RULE_methodCall);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 879;
      this.methodName();
      this.state = 880;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 882;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la - 26 & ~31) === 0 && (1 << _la - 26 & 1594097713) !== 0 || (_la - 69 & ~31) === 0 && (1 << _la - 69 & 66912517) !== 0) {
        this.state = 881;
        this.argList();
      }
      this.state = 884;
      this.match(_Elan2Parser.CLOSE_BRACKET);
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
  binaryOperator() {
    let localctx = new BinaryOperatorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 186, _Elan2Parser.RULE_binaryOperator);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 886;
      _la = this._input.LA(1);
      if (!((_la - 2 & ~31) === 0 && (1 << _la - 2 & 2281701377) !== 0 || (_la - 57 & ~31) === 0 && (1 << _la - 57 & 133693443) !== 0)) {
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
  ifExpression() {
    let localctx = new IfExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 188, _Elan2Parser.RULE_ifExpression);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 888;
      this.match(_Elan2Parser.IF_);
      this.state = 889;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 890;
      this.expression(0);
      this.state = 891;
      this.match(_Elan2Parser.COMMA);
      this.state = 892;
      this.expression(0);
      this.state = 893;
      this.match(_Elan2Parser.COMMA);
      this.state = 894;
      this.expression(0);
      this.state = 895;
      this.match(_Elan2Parser.CLOSE_BRACKET);
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
    this.enterRule(localctx, 190, _Elan2Parser.RULE_newInstance);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 897;
      this.match(_Elan2Parser.NEW);
      this.state = 898;
      this.type();
      this.state = 899;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 901;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if ((_la - 26 & ~31) === 0 && (1 << _la - 26 & 1594097713) !== 0 || (_la - 69 & ~31) === 0 && (1 << _la - 69 & 66912517) !== 0) {
        this.state = 900;
        this.argList();
      }
      this.state = 903;
      this.match(_Elan2Parser.CLOSE_BRACKET);
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
  paramDef() {
    let localctx = new ParamDefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 192, _Elan2Parser.RULE_paramDef);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 905;
      this.identifier();
      this.state = 906;
      this.match(_Elan2Parser.AS);
      this.state = 907;
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
  typeGeneric() {
    let localctx = new TypeGenericContext(this, this._ctx, this.state);
    this.enterRule(localctx, 194, _Elan2Parser.RULE_typeGeneric);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 909;
      this.typeName();
      this.state = 910;
      this.match(_Elan2Parser.LT);
      this.state = 911;
      this.match(_Elan2Parser.OF);
      this.state = 912;
      this.type();
      this.state = 917;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 74) {
        this.state = 913;
        this.match(_Elan2Parser.COMMA);
        this.state = 914;
        this.type();
        this.state = 919;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 920;
      this.match(_Elan2Parser.GT);
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
  typeTuple() {
    let localctx = new TypeTupleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 196, _Elan2Parser.RULE_typeTuple);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 922;
      this.match(_Elan2Parser.OPEN_BRACKET);
      this.state = 923;
      this.type();
      this.state = 926;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        this.state = 924;
        this.match(_Elan2Parser.COMMA);
        this.state = 925;
        this.type();
        this.state = 928;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while (_la === 74);
      this.state = 930;
      this.match(_Elan2Parser.CLOSE_BRACKET);
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
    this.enterRule(localctx, 198, _Elan2Parser.RULE_lambda);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 932;
      this.match(_Elan2Parser.LAMBDA);
      this.state = 935;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 84, this._ctx);
      switch (la_) {
        case 1:
          this.state = 933;
          this.paramsList();
          break;
        case 2:
          this.state = 934;
          this.argList();
          break;
      }
      this.state = 937;
      this.match(_Elan2Parser.ARROW);
      this.state = 938;
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
  list() {
    let localctx = new ListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 200, _Elan2Parser.RULE_list);
    var _la = 0;
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 940;
      this.match(_Elan2Parser.OPEN_SQ_BRACKET);
      this.state = 941;
      this.expression(0);
      this.state = 946;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      while (_la === 74) {
        this.state = 942;
        this.match(_Elan2Parser.COMMA);
        this.state = 943;
        this.expression(0);
        this.state = 948;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      }
      this.state = 949;
      this.match(_Elan2Parser.CLOSE_SQ_BRACKET);
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
  interpolatedString() {
    let localctx = new InterpolatedStringContext(this, this._ctx, this.state);
    this.enterRule(localctx, 202, _Elan2Parser.RULE_interpolatedString);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 951;
      this.match(_Elan2Parser.INTERPOLATED_STRING_PREFIX);
      this.state = 952;
      this.match(_Elan2Parser.LITERAL_STRING);
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
    const _startState = 204;
    this.enterRecursionRule(localctx, 204, _Elan2Parser.RULE_expression, _p);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 960;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 86, this._ctx);
      switch (la_) {
        case 1:
          this.state = 955;
          this.newInstance();
          break;
        case 2:
          this.state = 956;
          this.ifExpression();
          break;
        case 3:
          this.state = 957;
          this.unaryExpression();
          break;
        case 4:
          this.state = 958;
          this.term();
          break;
        case 5:
          this.state = 959;
          this.power();
          break;
      }
      this._ctx.stop = this._input.LT(-1);
      this.state = 968;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 87, this._ctx);
      while (_alt != 2 && _alt != Ln.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          if (this._parseListeners !== null) {
            this.triggerExitRuleEvent();
          }
          _prevctx = localctx;
          localctx = new ExpressionContext(this, _parentctx, _parentState);
          this.pushNewRecursionContext(localctx, _startState, _Elan2Parser.RULE_expression);
          this.state = 962;
          if (!this.precpred(this._ctx, 2)) {
            throw new Ln.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
          }
          this.state = 963;
          this.binaryOperator();
          this.state = 964;
          this.expression(3);
        }
        this.state = 970;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 87, this._ctx);
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
  power() {
    let localctx = new PowerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 206, _Elan2Parser.RULE_power);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 971;
      this.term();
      this.state = 972;
      this.match(_Elan2Parser.POWER);
      this.state = 973;
      this.term();
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
Elan2Parser.EOF = Ln.Token.EOF;
Elan2Parser.ABSTRACT = 1;
Elan2Parser.AND = 2;
Elan2Parser.AS = 3;
Elan2Parser.ASSERT = 4;
Elan2Parser.ASSIGN = 5;
Elan2Parser.BE = 6;
Elan2Parser.CALL = 7;
Elan2Parser.CATCH = 8;
Elan2Parser.CLASS = 9;
Elan2Parser.CONSTANT = 10;
Elan2Parser.CONSTRUCTOR = 11;
Elan2Parser.COPY = 12;
Elan2Parser.DIV = 13;
Elan2Parser.ELIF = 14;
Elan2Parser.ELSE = 15;
Elan2Parser.END = 16;
Elan2Parser.ENUM = 17;
Elan2Parser.EVALUATES = 18;
Elan2Parser.FOR = 19;
Elan2Parser.FROM = 20;
Elan2Parser.FUNCTION = 21;
Elan2Parser.IF = 22;
Elan2Parser.IN = 23;
Elan2Parser.INHERITS = 24;
Elan2Parser.INPUT = 25;
Elan2Parser.LAMBDA = 26;
Elan2Parser.LET = 27;
Elan2Parser.MAIN = 28;
Elan2Parser.MOD = 29;
Elan2Parser.NEW = 30;
Elan2Parser.NOT = 31;
Elan2Parser.OF = 32;
Elan2Parser.OR = 33;
Elan2Parser.PRINT = 34;
Elan2Parser.PRIVATE = 35;
Elan2Parser.PROCEDURE = 36;
Elan2Parser.PROPERTY = 37;
Elan2Parser.RETURN = 38;
Elan2Parser.RETURNS = 39;
Elan2Parser.SET = 40;
Elan2Parser.STEP = 41;
Elan2Parser.TEST = 42;
Elan2Parser.THEN = 43;
Elan2Parser.THIS = 44;
Elan2Parser.THROW = 45;
Elan2Parser.TO = 46;
Elan2Parser.TRY = 47;
Elan2Parser.VARIABLE = 48;
Elan2Parser.WHILE = 49;
Elan2Parser.INT_NAME = 50;
Elan2Parser.FLOAT_NAME = 51;
Elan2Parser.BOOL_NAME = 52;
Elan2Parser.STRING_NAME = 53;
Elan2Parser.LIST_NAME = 54;
Elan2Parser.COMMENT = 55;
Elan2Parser.LIT_BOOLEAN = 56;
Elan2Parser.EQUAL = 57;
Elan2Parser.NOT_EQUAL = 58;
Elan2Parser.ARROW = 59;
Elan2Parser.POWER = 60;
Elan2Parser.BINARY_PREFIX = 61;
Elan2Parser.HEX_PREFIX = 62;
Elan2Parser.INTERPOLATED_STRING_PREFIX = 63;
Elan2Parser.WS = 64;
Elan2Parser.NL = 65;
Elan2Parser.SINGLE_EQUALS = 66;
Elan2Parser.OPEN_BRACE = 67;
Elan2Parser.CLOSE_BRACE = 68;
Elan2Parser.OPEN_SQ_BRACKET = 69;
Elan2Parser.CLOSE_SQ_BRACKET = 70;
Elan2Parser.OPEN_BRACKET = 71;
Elan2Parser.CLOSE_BRACKET = 72;
Elan2Parser.DOT = 73;
Elan2Parser.COMMA = 74;
Elan2Parser.COLON = 75;
Elan2Parser.PLUS = 76;
Elan2Parser.MINUS = 77;
Elan2Parser.MULT = 78;
Elan2Parser.DIVIDE = 79;
Elan2Parser.LT = 80;
Elan2Parser.GT = 81;
Elan2Parser.LE = 82;
Elan2Parser.GE = 83;
Elan2Parser.DOUBLE_QUOTES = 84;
Elan2Parser.IF_ = 85;
Elan2Parser.NAME_STARTING_TEST_ = 86;
Elan2Parser.NAME_STARTING_LC = 87;
Elan2Parser.NAME_STARTING_UC = 88;
Elan2Parser.LITERAL_BINARY = 89;
Elan2Parser.LITERAL_HEX = 90;
Elan2Parser.LITERAL_INTEGER = 91;
Elan2Parser.LITERAL_FLOAT = 92;
Elan2Parser.INTERPOLATED_STRING = 93;
Elan2Parser.LITERAL_STRING = 94;
Elan2Parser.WHITESPACES = 95;
Elan2Parser.TEXT = 96;
Elan2Parser.GHOSTED = 97;
Elan2Parser.RULE_file = 0;
Elan2Parser.RULE_global = 1;
Elan2Parser.RULE_main = 2;
Elan2Parser.RULE_function = 3;
Elan2Parser.RULE_test = 4;
Elan2Parser.RULE_procedure = 5;
Elan2Parser.RULE_concreteClass = 6;
Elan2Parser.RULE_abstractClass = 7;
Elan2Parser.RULE_commentGlobal = 8;
Elan2Parser.RULE_ordinaryStatement = 9;
Elan2Parser.RULE_ifStatement = 10;
Elan2Parser.RULE_whileLoop = 11;
Elan2Parser.RULE_forLoop = 12;
Elan2Parser.RULE_tryStatement = 13;
Elan2Parser.RULE_commentStatement = 14;
Elan2Parser.RULE_constructorMember = 15;
Elan2Parser.RULE_functionMethod = 16;
Elan2Parser.RULE_procedureMethod = 17;
Elan2Parser.RULE_copyMethod = 18;
Elan2Parser.RULE_commentMember = 19;
Elan2Parser.RULE_mainTop = 20;
Elan2Parser.RULE_mainBottom = 21;
Elan2Parser.RULE_functionTop = 22;
Elan2Parser.RULE_functionBottom = 23;
Elan2Parser.RULE_testTop = 24;
Elan2Parser.RULE_testBottom = 25;
Elan2Parser.RULE_procedureTop = 26;
Elan2Parser.RULE_procedureBottom = 27;
Elan2Parser.RULE_concreteClassTop = 28;
Elan2Parser.RULE_concreteClassBottom = 29;
Elan2Parser.RULE_abstractClassTop = 30;
Elan2Parser.RULE_abstractClassBottom = 31;
Elan2Parser.RULE_constant = 32;
Elan2Parser.RULE_enum = 33;
Elan2Parser.RULE_assert = 34;
Elan2Parser.RULE_letStatement = 35;
Elan2Parser.RULE_print = 36;
Elan2Parser.RULE_variableDefinition = 37;
Elan2Parser.RULE_assignment = 38;
Elan2Parser.RULE_inputStatement = 39;
Elan2Parser.RULE_procedureCall = 40;
Elan2Parser.RULE_throwStatement = 41;
Elan2Parser.RULE_returnStatement = 42;
Elan2Parser.RULE_elseIfClause = 43;
Elan2Parser.RULE_elseClause = 44;
Elan2Parser.RULE_catchStatement = 45;
Elan2Parser.RULE_ifStatementTop = 46;
Elan2Parser.RULE_ifStatementBottom = 47;
Elan2Parser.RULE_whileLoopTop = 48;
Elan2Parser.RULE_whileLoopBottom = 49;
Elan2Parser.RULE_forLoopTop = 50;
Elan2Parser.RULE_forLoopBottom = 51;
Elan2Parser.RULE_tryStatementTop = 52;
Elan2Parser.RULE_tryStatementBottom = 53;
Elan2Parser.RULE_constructorTop = 54;
Elan2Parser.RULE_constructorBottom = 55;
Elan2Parser.RULE_property = 56;
Elan2Parser.RULE_functionMethodTop = 57;
Elan2Parser.RULE_functionMethodBottom = 58;
Elan2Parser.RULE_procedureMethodTop = 59;
Elan2Parser.RULE_procedureMethodBottom = 60;
Elan2Parser.RULE_copyMethodTop = 61;
Elan2Parser.RULE_copyMethodBottom = 62;
Elan2Parser.RULE_abstractFunction = 63;
Elan2Parser.RULE_abstractProcedure = 64;
Elan2Parser.RULE_identifier = 65;
Elan2Parser.RULE_assignable = 66;
Elan2Parser.RULE_methodName = 67;
Elan2Parser.RULE_testName = 68;
Elan2Parser.RULE_typeName = 69;
Elan2Parser.RULE_constantValue = 70;
Elan2Parser.RULE_argList = 71;
Elan2Parser.RULE_argument = 72;
Elan2Parser.RULE_paramsList = 73;
Elan2Parser.RULE_type = 74;
Elan2Parser.RULE_enumValuesList = 75;
Elan2Parser.RULE_assertActual = 76;
Elan2Parser.RULE_litValue = 77;
Elan2Parser.RULE_litInt = 78;
Elan2Parser.RULE_litFloat = 79;
Elan2Parser.RULE_enumValue = 80;
Elan2Parser.RULE_litString = 81;
Elan2Parser.RULE_thisInstance = 82;
Elan2Parser.RULE_index = 83;
Elan2Parser.RULE_identifierWithOptIndexes = 84;
Elan2Parser.RULE_propertyRef = 85;
Elan2Parser.RULE_term = 86;
Elan2Parser.RULE_chainable = 87;
Elan2Parser.RULE_bracketedExpression = 88;
Elan2Parser.RULE_unaryExpression = 89;
Elan2Parser.RULE_binaryExpression = 90;
Elan2Parser.RULE_tuple = 91;
Elan2Parser.RULE_methodCall = 92;
Elan2Parser.RULE_binaryOperator = 93;
Elan2Parser.RULE_ifExpression = 94;
Elan2Parser.RULE_newInstance = 95;
Elan2Parser.RULE_paramDef = 96;
Elan2Parser.RULE_typeGeneric = 97;
Elan2Parser.RULE_typeTuple = 98;
Elan2Parser.RULE_lambda = 99;
Elan2Parser.RULE_list = 100;
Elan2Parser.RULE_interpolatedString = 101;
Elan2Parser.RULE_expression = 102;
Elan2Parser.RULE_power = 103;
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
    this.ruleIndex = Elan2Parser.RULE_file;
  }
  EOF() {
    return this.getToken(Elan2Parser.EOF, 0);
  }
  COMMENT() {
    return this.getToken(Elan2Parser.COMMENT, 0);
  }
  global = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(GlobalContext);
    } else {
      return this.getTypedRuleContext(GlobalContext, i2);
    }
  };
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterFile(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitFile(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitFile(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var GlobalContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_global;
  }
  main() {
    return this.getTypedRuleContext(MainContext, 0);
  }
  function_() {
    return this.getTypedRuleContext(FunctionContext, 0);
  }
  test() {
    return this.getTypedRuleContext(TestContext, 0);
  }
  procedure() {
    return this.getTypedRuleContext(ProcedureContext, 0);
  }
  constant() {
    return this.getTypedRuleContext(ConstantContext, 0);
  }
  enum_() {
    return this.getTypedRuleContext(EnumContext, 0);
  }
  concreteClass() {
    return this.getTypedRuleContext(ConcreteClassContext, 0);
  }
  abstractClass() {
    return this.getTypedRuleContext(AbstractClassContext, 0);
  }
  commentGlobal() {
    return this.getTypedRuleContext(CommentGlobalContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterGlobal(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitGlobal(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitGlobal(this);
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
    this.ruleIndex = Elan2Parser.RULE_main;
  }
  mainTop() {
    return this.getTypedRuleContext(MainTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  mainBottom() {
    return this.getTypedRuleContext(MainBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterMain(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitMain(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitMain(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_function;
  }
  functionTop() {
    return this.getTypedRuleContext(FunctionTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  returnStatement() {
    return this.getTypedRuleContext(ReturnStatementContext, 0);
  }
  functionBottom() {
    return this.getTypedRuleContext(FunctionBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  letStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(LetStatementContext);
    } else {
      return this.getTypedRuleContext(LetStatementContext, i2);
    }
  };
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterFunction(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitFunction(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitFunction(this);
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
    this.ruleIndex = Elan2Parser.RULE_test;
  }
  testTop() {
    return this.getTypedRuleContext(TestTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  testBottom() {
    return this.getTypedRuleContext(TestBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
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
  letStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(LetStatementContext);
    } else {
      return this.getTypedRuleContext(LetStatementContext, i2);
    }
  };
  variableDefinition = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(VariableDefinitionContext);
    } else {
      return this.getTypedRuleContext(VariableDefinitionContext, i2);
    }
  };
  commentStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(CommentStatementContext);
    } else {
      return this.getTypedRuleContext(CommentStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTest(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTest(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTest(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_procedure;
  }
  procedureTop() {
    return this.getTypedRuleContext(ProcedureTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  procedureBottom() {
    return this.getTypedRuleContext(ProcedureBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterProcedure(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitProcedure(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitProcedure(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConcreteClassContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_concreteClass;
  }
  concreteClassTop() {
    return this.getTypedRuleContext(ConcreteClassTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  concreteClassBottom() {
    return this.getTypedRuleContext(ConcreteClassBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  constructorMember = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ConstructorMemberContext);
    } else {
      return this.getTypedRuleContext(ConstructorMemberContext, i2);
    }
  };
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
  functionMethod = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(FunctionMethodContext);
    } else {
      return this.getTypedRuleContext(FunctionMethodContext, i2);
    }
  };
  procedureMethod = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ProcedureMethodContext);
    } else {
      return this.getTypedRuleContext(ProcedureMethodContext, i2);
    }
  };
  copyMethod = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(CopyMethodContext);
    } else {
      return this.getTypedRuleContext(CopyMethodContext, i2);
    }
  };
  commentMember = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(CommentMemberContext);
    } else {
      return this.getTypedRuleContext(CommentMemberContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterConcreteClass(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitConcreteClass(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitConcreteClass(this);
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
    this.ruleIndex = Elan2Parser.RULE_abstractClass;
  }
  abstractClassTop() {
    return this.getTypedRuleContext(AbstractClassTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  abstractClassBottom() {
    return this.getTypedRuleContext(AbstractClassBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
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
  functionMethod = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(FunctionMethodContext);
    } else {
      return this.getTypedRuleContext(FunctionMethodContext, i2);
    }
  };
  procedureMethod = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ProcedureMethodContext);
    } else {
      return this.getTypedRuleContext(ProcedureMethodContext, i2);
    }
  };
  copyMethod = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(CopyMethodContext);
    } else {
      return this.getTypedRuleContext(CopyMethodContext, i2);
    }
  };
  abstractFunction = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(AbstractFunctionContext);
    } else {
      return this.getTypedRuleContext(AbstractFunctionContext, i2);
    }
  };
  abstractProcedure = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(AbstractProcedureContext);
    } else {
      return this.getTypedRuleContext(AbstractProcedureContext, i2);
    }
  };
  commentMember = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(CommentMemberContext);
    } else {
      return this.getTypedRuleContext(CommentMemberContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterAbstractClass(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitAbstractClass(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitAbstractClass(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CommentGlobalContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_commentGlobal;
  }
  COMMENT() {
    return this.getToken(Elan2Parser.COMMENT, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterCommentGlobal(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitCommentGlobal(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitCommentGlobal(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var OrdinaryStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_ordinaryStatement;
  }
  print() {
    return this.getTypedRuleContext(PrintContext, 0);
  }
  variableDefinition() {
    return this.getTypedRuleContext(VariableDefinitionContext, 0);
  }
  assignment() {
    return this.getTypedRuleContext(AssignmentContext, 0);
  }
  inputStatement() {
    return this.getTypedRuleContext(InputStatementContext, 0);
  }
  ifStatement() {
    return this.getTypedRuleContext(IfStatementContext, 0);
  }
  whileLoop() {
    return this.getTypedRuleContext(WhileLoopContext, 0);
  }
  forLoop() {
    return this.getTypedRuleContext(ForLoopContext, 0);
  }
  procedureCall() {
    return this.getTypedRuleContext(ProcedureCallContext, 0);
  }
  tryStatement() {
    return this.getTypedRuleContext(TryStatementContext, 0);
  }
  throwStatement() {
    return this.getTypedRuleContext(ThrowStatementContext, 0);
  }
  commentStatement() {
    return this.getTypedRuleContext(CommentStatementContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterOrdinaryStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitOrdinaryStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitOrdinaryStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var IfStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_ifStatement;
  }
  ifStatementTop() {
    return this.getTypedRuleContext(IfStatementTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  ifStatementBottom() {
    return this.getTypedRuleContext(IfStatementBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  elseIfClause = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ElseIfClauseContext);
    } else {
      return this.getTypedRuleContext(ElseIfClauseContext, i2);
    }
  };
  elseClause = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ElseClauseContext);
    } else {
      return this.getTypedRuleContext(ElseClauseContext, i2);
    }
  };
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterIfStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitIfStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitIfStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var WhileLoopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_whileLoop;
  }
  whileLoopTop() {
    return this.getTypedRuleContext(WhileLoopTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  whileLoopBottom() {
    return this.getTypedRuleContext(WhileLoopBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterWhileLoop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitWhileLoop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitWhileLoop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ForLoopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_forLoop;
  }
  forLoopTop() {
    return this.getTypedRuleContext(ForLoopTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  forLoopBottom() {
    return this.getTypedRuleContext(ForLoopBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterForLoop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitForLoop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitForLoop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TryStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_tryStatement;
  }
  tryStatementTop() {
    return this.getTypedRuleContext(TryStatementTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  catchStatement() {
    return this.getTypedRuleContext(CatchStatementContext, 0);
  }
  tryStatementBottom() {
    return this.getTypedRuleContext(TryStatementBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTryStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTryStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTryStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CommentStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_commentStatement;
  }
  COMMENT() {
    return this.getToken(Elan2Parser.COMMENT, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterCommentStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitCommentStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitCommentStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConstructorMemberContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_constructorMember;
  }
  constructorTop() {
    return this.getTypedRuleContext(ConstructorTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  constructorBottom() {
    return this.getTypedRuleContext(ConstructorBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterConstructorMember(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitConstructorMember(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitConstructorMember(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionMethodContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_functionMethod;
  }
  functionMethodTop() {
    return this.getTypedRuleContext(FunctionMethodTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  returnStatement() {
    return this.getTypedRuleContext(ReturnStatementContext, 0);
  }
  functionMethodBottom() {
    return this.getTypedRuleContext(FunctionMethodBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  PRIVATE() {
    return this.getToken(Elan2Parser.PRIVATE, 0);
  }
  letStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(LetStatementContext);
    } else {
      return this.getTypedRuleContext(LetStatementContext, i2);
    }
  };
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterFunctionMethod(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitFunctionMethod(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitFunctionMethod(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureMethodContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_procedureMethod;
  }
  procedureMethodTop() {
    return this.getTypedRuleContext(ProcedureMethodTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  procedureMethodBottom() {
    return this.getTypedRuleContext(ProcedureMethodBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  PRIVATE() {
    return this.getToken(Elan2Parser.PRIVATE, 0);
  }
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterProcedureMethod(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitProcedureMethod(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitProcedureMethod(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CopyMethodContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_copyMethod;
  }
  copyMethodTop() {
    return this.getTypedRuleContext(CopyMethodTopContext, 0);
  }
  NL = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.NL);
    } else {
      return this.getToken(Elan2Parser.NL, i2);
    }
  };
  returnStatement() {
    return this.getTypedRuleContext(ReturnStatementContext, 0);
  }
  copyMethodBottom() {
    return this.getTypedRuleContext(CopyMethodBottomContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  PRIVATE() {
    return this.getToken(Elan2Parser.PRIVATE, 0);
  }
  ordinaryStatement = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(OrdinaryStatementContext);
    } else {
      return this.getTypedRuleContext(OrdinaryStatementContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterCopyMethod(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitCopyMethod(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitCopyMethod(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CommentMemberContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_commentMember;
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  COMMENT() {
    return this.getToken(Elan2Parser.COMMENT, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterCommentMember(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitCommentMember(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitCommentMember(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var MainTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_mainTop;
  }
  MAIN() {
    return this.getToken(Elan2Parser.MAIN, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterMainTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitMainTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitMainTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var MainBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_mainBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  MAIN() {
    return this.getToken(Elan2Parser.MAIN, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterMainBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitMainBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitMainBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_functionTop;
  }
  FUNCTION() {
    return this.getToken(Elan2Parser.FUNCTION, 0);
  }
  methodName() {
    return this.getTypedRuleContext(MethodNameContext, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  RETURNS() {
    return this.getToken(Elan2Parser.RETURNS, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  paramsList() {
    return this.getTypedRuleContext(ParamsListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterFunctionTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitFunctionTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitFunctionTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_functionBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  FUNCTION() {
    return this.getToken(Elan2Parser.FUNCTION, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterFunctionBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitFunctionBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitFunctionBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TestTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_testTop;
  }
  TEST() {
    return this.getToken(Elan2Parser.TEST, 0);
  }
  testName() {
    return this.getTypedRuleContext(TestNameContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTestTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTestTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTestTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TestBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_testBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  TEST() {
    return this.getToken(Elan2Parser.TEST, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTestBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTestBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTestBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_procedureTop;
  }
  PROCEDURE() {
    return this.getToken(Elan2Parser.PROCEDURE, 0);
  }
  methodName() {
    return this.getTypedRuleContext(MethodNameContext, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  paramsList() {
    return this.getTypedRuleContext(ParamsListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterProcedureTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitProcedureTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitProcedureTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_procedureBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  PROCEDURE() {
    return this.getToken(Elan2Parser.PROCEDURE, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterProcedureBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitProcedureBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitProcedureBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConcreteClassTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_concreteClassTop;
  }
  CLASS() {
    return this.getToken(Elan2Parser.CLASS, 0);
  }
  typeName = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(TypeNameContext);
    } else {
      return this.getTypedRuleContext(TypeNameContext, i2);
    }
  };
  INHERITS() {
    return this.getToken(Elan2Parser.INHERITS, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterConcreteClassTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitConcreteClassTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitConcreteClassTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConcreteClassBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_concreteClassBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  CLASS() {
    return this.getToken(Elan2Parser.CLASS, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterConcreteClassBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitConcreteClassBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitConcreteClassBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AbstractClassTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_abstractClassTop;
  }
  ABSTRACT() {
    return this.getToken(Elan2Parser.ABSTRACT, 0);
  }
  CLASS() {
    return this.getToken(Elan2Parser.CLASS, 0);
  }
  typeName = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(TypeNameContext);
    } else {
      return this.getTypedRuleContext(TypeNameContext, i2);
    }
  };
  INHERITS() {
    return this.getToken(Elan2Parser.INHERITS, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterAbstractClassTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitAbstractClassTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitAbstractClassTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AbstractClassBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_abstractClassBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  CLASS() {
    return this.getToken(Elan2Parser.CLASS, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterAbstractClassBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitAbstractClassBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitAbstractClassBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConstantContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_constant;
  }
  CONSTANT() {
    return this.getToken(Elan2Parser.CONSTANT, 0);
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  SET() {
    return this.getToken(Elan2Parser.SET, 0);
  }
  TO() {
    return this.getToken(Elan2Parser.TO, 0);
  }
  constantValue() {
    return this.getTypedRuleContext(ConstantValueContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterConstant(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitConstant(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitConstant(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var EnumContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_enum;
  }
  ENUM() {
    return this.getToken(Elan2Parser.ENUM, 0);
  }
  typeName() {
    return this.getTypedRuleContext(TypeNameContext, 0);
  }
  enumValuesList() {
    return this.getTypedRuleContext(EnumValuesListContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterEnum(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitEnum(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitEnum(this);
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
    this.ruleIndex = Elan2Parser.RULE_assert;
  }
  ASSERT() {
    return this.getToken(Elan2Parser.ASSERT, 0);
  }
  assertActual() {
    return this.getTypedRuleContext(AssertActualContext, 0);
  }
  EVALUATES() {
    return this.getToken(Elan2Parser.EVALUATES, 0);
  }
  TO() {
    return this.getToken(Elan2Parser.TO, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterAssert(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitAssert(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitAssert(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LetStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_letStatement;
  }
  LET() {
    return this.getToken(Elan2Parser.LET, 0);
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  BE() {
    return this.getToken(Elan2Parser.BE, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterLetStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitLetStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitLetStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var PrintContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_print;
  }
  PRINT() {
    return this.getToken(Elan2Parser.PRINT, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterPrint(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitPrint(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitPrint(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var VariableDefinitionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_variableDefinition;
  }
  VARIABLE() {
    return this.getToken(Elan2Parser.VARIABLE, 0);
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  SET() {
    return this.getToken(Elan2Parser.SET, 0);
  }
  TO() {
    return this.getToken(Elan2Parser.TO, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterVariableDefinition(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitVariableDefinition(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitVariableDefinition(this);
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
    this.ruleIndex = Elan2Parser.RULE_assignment;
  }
  ASSIGN() {
    return this.getToken(Elan2Parser.ASSIGN, 0);
  }
  assignable() {
    return this.getTypedRuleContext(AssignableContext, 0);
  }
  TO() {
    return this.getToken(Elan2Parser.TO, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterAssignment(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitAssignment(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitAssignment(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var InputStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_inputStatement;
  }
  INPUT() {
    return this.getToken(Elan2Parser.INPUT, 0);
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  SET() {
    return this.getToken(Elan2Parser.SET, 0);
  }
  TO() {
    return this.getToken(Elan2Parser.TO, 0);
  }
  methodName() {
    return this.getTypedRuleContext(MethodNameContext, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterInputStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitInputStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitInputStatement(this);
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
    this.ruleIndex = Elan2Parser.RULE_procedureCall;
  }
  CALL() {
    return this.getToken(Elan2Parser.CALL, 0);
  }
  term() {
    return this.getTypedRuleContext(TermContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterProcedureCall(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitProcedureCall(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitProcedureCall(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ThrowStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_throwStatement;
  }
  THROW() {
    return this.getToken(Elan2Parser.THROW, 0);
  }
  typeName() {
    return this.getTypedRuleContext(TypeNameContext, 0);
  }
  litString() {
    return this.getTypedRuleContext(LitStringContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterThrowStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitThrowStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitThrowStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ReturnStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_returnStatement;
  }
  RETURN() {
    return this.getToken(Elan2Parser.RETURN, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterReturnStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitReturnStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitReturnStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ElseIfClauseContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_elseIfClause;
  }
  ELIF() {
    return this.getToken(Elan2Parser.ELIF, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  THEN() {
    return this.getToken(Elan2Parser.THEN, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterElseIfClause(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitElseIfClause(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitElseIfClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ElseClauseContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_elseClause;
  }
  ELSE() {
    return this.getToken(Elan2Parser.ELSE, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterElseClause(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitElseClause(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitElseClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CatchStatementContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_catchStatement;
  }
  CATCH() {
    return this.getToken(Elan2Parser.CATCH, 0);
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  AS() {
    return this.getToken(Elan2Parser.AS, 0);
  }
  typeName() {
    return this.getTypedRuleContext(TypeNameContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterCatchStatement(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitCatchStatement(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitCatchStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var IfStatementTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_ifStatementTop;
  }
  IF() {
    return this.getToken(Elan2Parser.IF, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  THEN() {
    return this.getToken(Elan2Parser.THEN, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterIfStatementTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitIfStatementTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitIfStatementTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var IfStatementBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_ifStatementBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  IF() {
    return this.getToken(Elan2Parser.IF, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterIfStatementBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitIfStatementBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitIfStatementBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var WhileLoopTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_whileLoopTop;
  }
  WHILE() {
    return this.getToken(Elan2Parser.WHILE, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterWhileLoopTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitWhileLoopTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitWhileLoopTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var WhileLoopBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_whileLoopBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  WHILE() {
    return this.getToken(Elan2Parser.WHILE, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterWhileLoopBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitWhileLoopBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitWhileLoopBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ForLoopTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_forLoopTop;
  }
  FOR() {
    return this.getToken(Elan2Parser.FOR, 0);
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  IN() {
    return this.getToken(Elan2Parser.IN, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterForLoopTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitForLoopTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitForLoopTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ForLoopBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_forLoopBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  FOR() {
    return this.getToken(Elan2Parser.FOR, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterForLoopBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitForLoopBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitForLoopBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TryStatementTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_tryStatementTop;
  }
  TRY() {
    return this.getToken(Elan2Parser.TRY, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTryStatementTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTryStatementTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTryStatementTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TryStatementBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_tryStatementBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  TRY() {
    return this.getToken(Elan2Parser.TRY, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTryStatementBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTryStatementBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTryStatementBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConstructorTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_constructorTop;
  }
  CONSTRUCTOR() {
    return this.getToken(Elan2Parser.CONSTRUCTOR, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  paramsList() {
    return this.getTypedRuleContext(ParamsListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterConstructorTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitConstructorTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitConstructorTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConstructorBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_constructorBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  CONSTRUCTOR() {
    return this.getToken(Elan2Parser.CONSTRUCTOR, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterConstructorBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitConstructorBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitConstructorBottom(this);
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
    this.ruleIndex = Elan2Parser.RULE_property;
  }
  PROPERTY() {
    return this.getToken(Elan2Parser.PROPERTY, 0);
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  AS() {
    return this.getToken(Elan2Parser.AS, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  NL() {
    return this.getToken(Elan2Parser.NL, 0);
  }
  PRIVATE() {
    return this.getToken(Elan2Parser.PRIVATE, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterProperty(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitProperty(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitProperty(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionMethodTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_functionMethodTop;
  }
  functionTop() {
    return this.getTypedRuleContext(FunctionTopContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterFunctionMethodTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitFunctionMethodTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitFunctionMethodTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var FunctionMethodBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_functionMethodBottom;
  }
  functionBottom() {
    return this.getTypedRuleContext(FunctionBottomContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterFunctionMethodBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitFunctionMethodBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitFunctionMethodBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureMethodTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_procedureMethodTop;
  }
  procedureTop() {
    return this.getTypedRuleContext(ProcedureTopContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterProcedureMethodTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitProcedureMethodTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitProcedureMethodTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ProcedureMethodBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_procedureMethodBottom;
  }
  procedureBottom() {
    return this.getTypedRuleContext(ProcedureBottomContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterProcedureMethodBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitProcedureMethodBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitProcedureMethodBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CopyMethodTopContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_copyMethodTop;
  }
  COPY() {
    return this.getToken(Elan2Parser.COPY, 0);
  }
  methodName() {
    return this.getTypedRuleContext(MethodNameContext, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
  }
  paramsList() {
    return this.getTypedRuleContext(ParamsListContext, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  RETURNS() {
    return this.getToken(Elan2Parser.RETURNS, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterCopyMethodTop(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitCopyMethodTop(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitCopyMethodTop(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var CopyMethodBottomContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_copyMethodBottom;
  }
  END() {
    return this.getToken(Elan2Parser.END, 0);
  }
  COPY() {
    return this.getToken(Elan2Parser.COPY, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterCopyMethodBottom(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitCopyMethodBottom(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitCopyMethodBottom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AbstractFunctionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_abstractFunction;
  }
  ABSTRACT() {
    return this.getToken(Elan2Parser.ABSTRACT, 0);
  }
  functionTop() {
    return this.getTypedRuleContext(FunctionTopContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterAbstractFunction(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitAbstractFunction(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitAbstractFunction(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AbstractProcedureContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_abstractProcedure;
  }
  ABSTRACT() {
    return this.getToken(Elan2Parser.ABSTRACT, 0);
  }
  procedureTop() {
    return this.getTypedRuleContext(ProcedureTopContext, 0);
  }
  GHOSTED() {
    return this.getToken(Elan2Parser.GHOSTED, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterAbstractProcedure(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitAbstractProcedure(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitAbstractProcedure(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var IdentifierContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_identifier;
  }
  NAME_STARTING_LC() {
    return this.getToken(Elan2Parser.NAME_STARTING_LC, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterIdentifier(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitIdentifier(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitIdentifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AssignableContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_assignable;
  }
  identifierWithOptIndexes() {
    return this.getTypedRuleContext(IdentifierWithOptIndexesContext, 0);
  }
  propertyRef() {
    return this.getTypedRuleContext(PropertyRefContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterAssignable(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitAssignable(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitAssignable(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var MethodNameContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_methodName;
  }
  NAME_STARTING_LC() {
    return this.getToken(Elan2Parser.NAME_STARTING_LC, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterMethodName(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitMethodName(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitMethodName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TestNameContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_testName;
  }
  NAME_STARTING_TEST_() {
    return this.getToken(Elan2Parser.NAME_STARTING_TEST_, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTestName(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTestName(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTestName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TypeNameContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_typeName;
  }
  INT_NAME() {
    return this.getToken(Elan2Parser.INT_NAME, 0);
  }
  FLOAT_NAME() {
    return this.getToken(Elan2Parser.FLOAT_NAME, 0);
  }
  BOOL_NAME() {
    return this.getToken(Elan2Parser.BOOL_NAME, 0);
  }
  STRING_NAME() {
    return this.getToken(Elan2Parser.STRING_NAME, 0);
  }
  LIST_NAME() {
    return this.getToken(Elan2Parser.LIST_NAME, 0);
  }
  NAME_STARTING_UC() {
    return this.getToken(Elan2Parser.NAME_STARTING_UC, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTypeName(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTypeName(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ConstantValueContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_constantValue;
  }
  litValue() {
    return this.getTypedRuleContext(LitValueContext, 0);
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterConstantValue(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitConstantValue(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitConstantValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ArgListContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_argList;
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
      return this.getTokens(Elan2Parser.COMMA);
    } else {
      return this.getToken(Elan2Parser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterArgList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitArgList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitArgList(this);
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
    this.ruleIndex = Elan2Parser.RULE_argument;
  }
  lambda() {
    return this.getTypedRuleContext(LambdaContext, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterArgument(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitArgument(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitArgument(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ParamsListContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_paramsList;
  }
  paramDef = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ParamDefContext);
    } else {
      return this.getTypedRuleContext(ParamDefContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.COMMA);
    } else {
      return this.getToken(Elan2Parser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterParamsList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitParamsList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitParamsList(this);
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
    this.ruleIndex = Elan2Parser.RULE_type;
  }
  typeTuple() {
    return this.getTypedRuleContext(TypeTupleContext, 0);
  }
  typeName() {
    return this.getTypedRuleContext(TypeNameContext, 0);
  }
  typeGeneric() {
    return this.getTypedRuleContext(TypeGenericContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterType(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitType(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var EnumValuesListContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_enumValuesList;
  }
  identifier = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(IdentifierContext);
    } else {
      return this.getTypedRuleContext(IdentifierContext, i2);
    }
  };
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.COMMA);
    } else {
      return this.getToken(Elan2Parser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterEnumValuesList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitEnumValuesList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitEnumValuesList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var AssertActualContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_assertActual;
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterAssertActual(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitAssertActual(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitAssertActual(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LitValueContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_litValue;
  }
  LIT_BOOLEAN() {
    return this.getToken(Elan2Parser.LIT_BOOLEAN, 0);
  }
  litInt() {
    return this.getTypedRuleContext(LitIntContext, 0);
  }
  litFloat() {
    return this.getTypedRuleContext(LitFloatContext, 0);
  }
  litString() {
    return this.getTypedRuleContext(LitStringContext, 0);
  }
  enumValue() {
    return this.getTypedRuleContext(EnumValueContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterLitValue(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitLitValue(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitLitValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LitIntContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_litInt;
  }
  LITERAL_INTEGER() {
    return this.getToken(Elan2Parser.LITERAL_INTEGER, 0);
  }
  LITERAL_BINARY() {
    return this.getToken(Elan2Parser.LITERAL_BINARY, 0);
  }
  LITERAL_HEX() {
    return this.getToken(Elan2Parser.LITERAL_HEX, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterLitInt(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitLitInt(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitLitInt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LitFloatContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_litFloat;
  }
  LITERAL_FLOAT() {
    return this.getToken(Elan2Parser.LITERAL_FLOAT, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterLitFloat(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitLitFloat(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitLitFloat(this);
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
    this.ruleIndex = Elan2Parser.RULE_enumValue;
  }
  typeName() {
    return this.getTypedRuleContext(TypeNameContext, 0);
  }
  DOT() {
    return this.getToken(Elan2Parser.DOT, 0);
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterEnumValue(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitEnumValue(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitEnumValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var LitStringContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_litString;
  }
  LITERAL_STRING() {
    return this.getToken(Elan2Parser.LITERAL_STRING, 0);
  }
  INTERPOLATED_STRING() {
    return this.getToken(Elan2Parser.INTERPOLATED_STRING, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterLitString(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitLitString(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitLitString(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ThisInstanceContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_thisInstance;
  }
  THIS() {
    return this.getToken(Elan2Parser.THIS, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterThisInstance(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitThisInstance(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitThisInstance(this);
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
    this.ruleIndex = Elan2Parser.RULE_index;
  }
  OPEN_SQ_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_SQ_BRACKET, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  CLOSE_SQ_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_SQ_BRACKET, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterIndex(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitIndex(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitIndex(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var IdentifierWithOptIndexesContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_identifierWithOptIndexes;
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  index = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(IndexContext);
    } else {
      return this.getTypedRuleContext(IndexContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterIdentifierWithOptIndexes(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitIdentifierWithOptIndexes(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitIdentifierWithOptIndexes(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var PropertyRefContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_propertyRef;
  }
  thisInstance() {
    return this.getTypedRuleContext(ThisInstanceContext, 0);
  }
  DOT() {
    return this.getToken(Elan2Parser.DOT, 0);
  }
  identifierWithOptIndexes() {
    return this.getTypedRuleContext(IdentifierWithOptIndexesContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterPropertyRef(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitPropertyRef(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitPropertyRef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TermContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_term;
  }
  thisInstance() {
    return this.getTypedRuleContext(ThisInstanceContext, 0);
  }
  chainable = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(ChainableContext);
    } else {
      return this.getTypedRuleContext(ChainableContext, i2);
    }
  };
  DOT = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.DOT);
    } else {
      return this.getToken(Elan2Parser.DOT, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTerm(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTerm(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTerm(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ChainableContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_chainable;
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  methodCall() {
    return this.getTypedRuleContext(MethodCallContext, 0);
  }
  bracketedExpression() {
    return this.getTypedRuleContext(BracketedExpressionContext, 0);
  }
  tuple() {
    return this.getTypedRuleContext(TupleContext, 0);
  }
  litValue() {
    return this.getTypedRuleContext(LitValueContext, 0);
  }
  list() {
    return this.getTypedRuleContext(ListContext, 0);
  }
  index = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(IndexContext);
    } else {
      return this.getTypedRuleContext(IndexContext, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterChainable(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitChainable(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitChainable(this);
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
    this.ruleIndex = Elan2Parser.RULE_bracketedExpression;
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterBracketedExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitBracketedExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitBracketedExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var UnaryExpressionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_unaryExpression;
  }
  term() {
    return this.getTypedRuleContext(TermContext, 0);
  }
  MINUS() {
    return this.getToken(Elan2Parser.MINUS, 0);
  }
  NOT() {
    return this.getToken(Elan2Parser.NOT, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterUnaryExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitUnaryExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitUnaryExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var BinaryExpressionContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_binaryExpression;
  }
  term() {
    return this.getTypedRuleContext(TermContext, 0);
  }
  binaryOperator() {
    return this.getTypedRuleContext(BinaryOperatorContext, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterBinaryExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitBinaryExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitBinaryExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TupleContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_tuple;
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
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
      return this.getTokens(Elan2Parser.COMMA);
    } else {
      return this.getToken(Elan2Parser.COMMA, i2);
    }
  };
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTuple(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTuple(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTuple(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var MethodCallContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_methodCall;
  }
  methodName() {
    return this.getTypedRuleContext(MethodNameContext, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  argList() {
    return this.getTypedRuleContext(ArgListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterMethodCall(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitMethodCall(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitMethodCall(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var BinaryOperatorContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_binaryOperator;
  }
  EQUAL() {
    return this.getToken(Elan2Parser.EQUAL, 0);
  }
  NOT_EQUAL() {
    return this.getToken(Elan2Parser.NOT_EQUAL, 0);
  }
  GT() {
    return this.getToken(Elan2Parser.GT, 0);
  }
  LT() {
    return this.getToken(Elan2Parser.LT, 0);
  }
  GE() {
    return this.getToken(Elan2Parser.GE, 0);
  }
  LE() {
    return this.getToken(Elan2Parser.LE, 0);
  }
  MULT() {
    return this.getToken(Elan2Parser.MULT, 0);
  }
  DIVIDE() {
    return this.getToken(Elan2Parser.DIVIDE, 0);
  }
  PLUS() {
    return this.getToken(Elan2Parser.PLUS, 0);
  }
  MINUS() {
    return this.getToken(Elan2Parser.MINUS, 0);
  }
  AND() {
    return this.getToken(Elan2Parser.AND, 0);
  }
  OR() {
    return this.getToken(Elan2Parser.OR, 0);
  }
  MOD() {
    return this.getToken(Elan2Parser.MOD, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterBinaryOperator(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitBinaryOperator(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitBinaryOperator(this);
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
    this.ruleIndex = Elan2Parser.RULE_ifExpression;
  }
  IF_() {
    return this.getToken(Elan2Parser.IF_, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
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
      return this.getTokens(Elan2Parser.COMMA);
    } else {
      return this.getToken(Elan2Parser.COMMA, i2);
    }
  };
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterIfExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitIfExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitIfExpression(this);
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
    this.ruleIndex = Elan2Parser.RULE_newInstance;
  }
  NEW() {
    return this.getToken(Elan2Parser.NEW, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
  }
  CLOSE_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  argList() {
    return this.getTypedRuleContext(ArgListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterNewInstance(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitNewInstance(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitNewInstance(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ParamDefContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_paramDef;
  }
  identifier() {
    return this.getTypedRuleContext(IdentifierContext, 0);
  }
  AS() {
    return this.getToken(Elan2Parser.AS, 0);
  }
  type() {
    return this.getTypedRuleContext(TypeContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterParamDef(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitParamDef(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitParamDef(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TypeGenericContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_typeGeneric;
  }
  typeName() {
    return this.getTypedRuleContext(TypeNameContext, 0);
  }
  LT() {
    return this.getToken(Elan2Parser.LT, 0);
  }
  OF() {
    return this.getToken(Elan2Parser.OF, 0);
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
    return this.getToken(Elan2Parser.GT, 0);
  }
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.COMMA);
    } else {
      return this.getToken(Elan2Parser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTypeGeneric(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTypeGeneric(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTypeGeneric(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var TypeTupleContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_typeTuple;
  }
  OPEN_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_BRACKET, 0);
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
    return this.getToken(Elan2Parser.CLOSE_BRACKET, 0);
  }
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.COMMA);
    } else {
      return this.getToken(Elan2Parser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterTypeTuple(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitTypeTuple(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitTypeTuple(this);
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
    this.ruleIndex = Elan2Parser.RULE_lambda;
  }
  LAMBDA() {
    return this.getToken(Elan2Parser.LAMBDA, 0);
  }
  ARROW() {
    return this.getToken(Elan2Parser.ARROW, 0);
  }
  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }
  paramsList() {
    return this.getTypedRuleContext(ParamsListContext, 0);
  }
  argList() {
    return this.getTypedRuleContext(ArgListContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterLambda(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitLambda(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitLambda(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var ListContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_list;
  }
  OPEN_SQ_BRACKET() {
    return this.getToken(Elan2Parser.OPEN_SQ_BRACKET, 0);
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
  CLOSE_SQ_BRACKET() {
    return this.getToken(Elan2Parser.CLOSE_SQ_BRACKET, 0);
  }
  COMMA = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTokens(Elan2Parser.COMMA);
    } else {
      return this.getToken(Elan2Parser.COMMA, i2);
    }
  };
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterList(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitList(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var InterpolatedStringContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_interpolatedString;
  }
  INTERPOLATED_STRING_PREFIX() {
    return this.getToken(Elan2Parser.INTERPOLATED_STRING_PREFIX, 0);
  }
  LITERAL_STRING() {
    return this.getToken(Elan2Parser.LITERAL_STRING, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterInterpolatedString(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitInterpolatedString(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitInterpolatedString(this);
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
    this.ruleIndex = Elan2Parser.RULE_expression;
  }
  newInstance() {
    return this.getTypedRuleContext(NewInstanceContext, 0);
  }
  ifExpression() {
    return this.getTypedRuleContext(IfExpressionContext, 0);
  }
  unaryExpression() {
    return this.getTypedRuleContext(UnaryExpressionContext, 0);
  }
  term() {
    return this.getTypedRuleContext(TermContext, 0);
  }
  power() {
    return this.getTypedRuleContext(PowerContext, 0);
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
  binaryOperator() {
    return this.getTypedRuleContext(BinaryOperatorContext, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterExpression(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitExpression(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
var PowerContext = class extends Ln.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === void 0) {
      parent = null;
    }
    if (invokingState === void 0 || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = Elan2Parser.RULE_power;
  }
  term = function(i2) {
    if (i2 === void 0) {
      i2 = null;
    }
    if (i2 === null) {
      return this.getTypedRuleContexts(TermContext);
    } else {
      return this.getTypedRuleContext(TermContext, i2);
    }
  };
  POWER() {
    return this.getToken(Elan2Parser.POWER, 0);
  }
  enterRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.enterPower(this);
    }
  }
  exitRule(listener) {
    if (listener instanceof Elan2Listener) {
      listener.exitPower(this);
    }
  }
  accept(visitor) {
    if (visitor instanceof Elan2Visitor) {
      return visitor.visitPower(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
};
Elan2Parser.FileContext = FileContext;
Elan2Parser.GlobalContext = GlobalContext;
Elan2Parser.MainContext = MainContext;
Elan2Parser.FunctionContext = FunctionContext;
Elan2Parser.TestContext = TestContext;
Elan2Parser.ProcedureContext = ProcedureContext;
Elan2Parser.ConcreteClassContext = ConcreteClassContext;
Elan2Parser.AbstractClassContext = AbstractClassContext;
Elan2Parser.CommentGlobalContext = CommentGlobalContext;
Elan2Parser.OrdinaryStatementContext = OrdinaryStatementContext;
Elan2Parser.IfStatementContext = IfStatementContext;
Elan2Parser.WhileLoopContext = WhileLoopContext;
Elan2Parser.ForLoopContext = ForLoopContext;
Elan2Parser.TryStatementContext = TryStatementContext;
Elan2Parser.CommentStatementContext = CommentStatementContext;
Elan2Parser.ConstructorMemberContext = ConstructorMemberContext;
Elan2Parser.FunctionMethodContext = FunctionMethodContext;
Elan2Parser.ProcedureMethodContext = ProcedureMethodContext;
Elan2Parser.CopyMethodContext = CopyMethodContext;
Elan2Parser.CommentMemberContext = CommentMemberContext;
Elan2Parser.MainTopContext = MainTopContext;
Elan2Parser.MainBottomContext = MainBottomContext;
Elan2Parser.FunctionTopContext = FunctionTopContext;
Elan2Parser.FunctionBottomContext = FunctionBottomContext;
Elan2Parser.TestTopContext = TestTopContext;
Elan2Parser.TestBottomContext = TestBottomContext;
Elan2Parser.ProcedureTopContext = ProcedureTopContext;
Elan2Parser.ProcedureBottomContext = ProcedureBottomContext;
Elan2Parser.ConcreteClassTopContext = ConcreteClassTopContext;
Elan2Parser.ConcreteClassBottomContext = ConcreteClassBottomContext;
Elan2Parser.AbstractClassTopContext = AbstractClassTopContext;
Elan2Parser.AbstractClassBottomContext = AbstractClassBottomContext;
Elan2Parser.ConstantContext = ConstantContext;
Elan2Parser.EnumContext = EnumContext;
Elan2Parser.AssertContext = AssertContext;
Elan2Parser.LetStatementContext = LetStatementContext;
Elan2Parser.PrintContext = PrintContext;
Elan2Parser.VariableDefinitionContext = VariableDefinitionContext;
Elan2Parser.AssignmentContext = AssignmentContext;
Elan2Parser.InputStatementContext = InputStatementContext;
Elan2Parser.ProcedureCallContext = ProcedureCallContext;
Elan2Parser.ThrowStatementContext = ThrowStatementContext;
Elan2Parser.ReturnStatementContext = ReturnStatementContext;
Elan2Parser.ElseIfClauseContext = ElseIfClauseContext;
Elan2Parser.ElseClauseContext = ElseClauseContext;
Elan2Parser.CatchStatementContext = CatchStatementContext;
Elan2Parser.IfStatementTopContext = IfStatementTopContext;
Elan2Parser.IfStatementBottomContext = IfStatementBottomContext;
Elan2Parser.WhileLoopTopContext = WhileLoopTopContext;
Elan2Parser.WhileLoopBottomContext = WhileLoopBottomContext;
Elan2Parser.ForLoopTopContext = ForLoopTopContext;
Elan2Parser.ForLoopBottomContext = ForLoopBottomContext;
Elan2Parser.TryStatementTopContext = TryStatementTopContext;
Elan2Parser.TryStatementBottomContext = TryStatementBottomContext;
Elan2Parser.ConstructorTopContext = ConstructorTopContext;
Elan2Parser.ConstructorBottomContext = ConstructorBottomContext;
Elan2Parser.PropertyContext = PropertyContext;
Elan2Parser.FunctionMethodTopContext = FunctionMethodTopContext;
Elan2Parser.FunctionMethodBottomContext = FunctionMethodBottomContext;
Elan2Parser.ProcedureMethodTopContext = ProcedureMethodTopContext;
Elan2Parser.ProcedureMethodBottomContext = ProcedureMethodBottomContext;
Elan2Parser.CopyMethodTopContext = CopyMethodTopContext;
Elan2Parser.CopyMethodBottomContext = CopyMethodBottomContext;
Elan2Parser.AbstractFunctionContext = AbstractFunctionContext;
Elan2Parser.AbstractProcedureContext = AbstractProcedureContext;
Elan2Parser.IdentifierContext = IdentifierContext;
Elan2Parser.AssignableContext = AssignableContext;
Elan2Parser.MethodNameContext = MethodNameContext;
Elan2Parser.TestNameContext = TestNameContext;
Elan2Parser.TypeNameContext = TypeNameContext;
Elan2Parser.ConstantValueContext = ConstantValueContext;
Elan2Parser.ArgListContext = ArgListContext;
Elan2Parser.ArgumentContext = ArgumentContext;
Elan2Parser.ParamsListContext = ParamsListContext;
Elan2Parser.TypeContext = TypeContext;
Elan2Parser.EnumValuesListContext = EnumValuesListContext;
Elan2Parser.AssertActualContext = AssertActualContext;
Elan2Parser.LitValueContext = LitValueContext;
Elan2Parser.LitIntContext = LitIntContext;
Elan2Parser.LitFloatContext = LitFloatContext;
Elan2Parser.EnumValueContext = EnumValueContext;
Elan2Parser.LitStringContext = LitStringContext;
Elan2Parser.ThisInstanceContext = ThisInstanceContext;
Elan2Parser.IndexContext = IndexContext;
Elan2Parser.IdentifierWithOptIndexesContext = IdentifierWithOptIndexesContext;
Elan2Parser.PropertyRefContext = PropertyRefContext;
Elan2Parser.TermContext = TermContext;
Elan2Parser.ChainableContext = ChainableContext;
Elan2Parser.BracketedExpressionContext = BracketedExpressionContext;
Elan2Parser.UnaryExpressionContext = UnaryExpressionContext;
Elan2Parser.BinaryExpressionContext = BinaryExpressionContext;
Elan2Parser.TupleContext = TupleContext;
Elan2Parser.MethodCallContext = MethodCallContext;
Elan2Parser.BinaryOperatorContext = BinaryOperatorContext;
Elan2Parser.IfExpressionContext = IfExpressionContext;
Elan2Parser.NewInstanceContext = NewInstanceContext;
Elan2Parser.ParamDefContext = ParamDefContext;
Elan2Parser.TypeGenericContext = TypeGenericContext;
Elan2Parser.TypeTupleContext = TypeTupleContext;
Elan2Parser.LambdaContext = LambdaContext;
Elan2Parser.ListContext = ListContext;
Elan2Parser.InterpolatedStringContext = InterpolatedStringContext;
Elan2Parser.ExpressionContext = ExpressionContext;
Elan2Parser.PowerContext = PowerContext;

// src/elan-elan-visitor.js
function getParser(input) {
  const chars = new $e(input);
  const lexer = new Elan2Lexer(chars);
  const tokens = new Ze(lexer);
  const parser = new Elan2Parser(tokens);
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
var ElanElanVisitor = class extends Elan2Visitor {
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
