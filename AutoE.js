// ==UserScript==
// @name         AutoE
// @version      1
// @description  none
// @author       CtRaX
// @match        *://dynast.io/*
// @match        *://nightly.dynast.io/*
// @grant        none
// ==/UserScript==


(function () {

    window.ePerSecond = 500

    window.autoEKey = " ";
    window.useRightClick = false;

    ! function () {
        var e, a, r, s, c, n, t, o, f, i, b, k;
        let u = (...e) => new Uint8Array(...e),
            y = (...e) => new Uint16Array(...e);

        function l() {
            this.t = y(16), this.o = y(288)
        }

        function h(e, a) {
            this.i = e, this.k = 0, this.u = 0, this.l = 0, this.h = a, this.M = 0, this.q = new l, this.S = new l
        }

        function w(e, a, r, s) {
            var c, n;
            for (c = 0; r > c; ++c) e[c] = 0;
            for (c = 0; 30 - r > c; ++c) e[c + r] = c / r | 0;
            for (n = s, c = 0; 30 > c; ++c) a[c] = n, n += 1 << e[c]
        }

        function M(e, a, r, s) {
            var c, n;
            for (c = 0; 16 > c; ++c) e.t[c] = 0;
            for (c = 0; s > c; ++c) e.t[a[r + c]]++;
            for (e.t[0] = 0, n = 0, c = 0; 16 > c; ++c) k[c] = n, n += e.t[c];
            for (c = 0; s > c; ++c) a[r + c] && (e.o[k[a[r + c]]++] = c)
        }

        function q(e) {
            e.l-- || (e.u = e.i[e.k++], e.l = 7);
            var a = 1 & e.u;
            return e.u >>>= 1, a
        }

        function S(e, a, r) {
            if (!a) return r;
            for (; 24 > e.l;) e.u |= e.i[e.k++] << e.l, e.l += 8;
            var s = e.u & 65535 >>> 16 - a;
            return e.u >>>= a, e.l -= a, s + r
        }

        function j(e, a) {
            for (var r, s, c, n; 24 > e.l;) e.u |= e.i[e.k++] << e.l, e.l += 8;
            r = 0, s = 0, c = 0, n = e.u;
            do {
                s = 2 * s + (1 & n), n >>>= 1, ++c, r += a.t[c], s -= a.t[c]
            } while (s >= 0);
            return e.u = n, e.l -= c, a.o[r + s]
        }

        function d(e, a, r) {
            var s, c, n, t, o, k, u = S(e, 5, 257),
                y = S(e, 5, 1),
                l = S(e, 4, 4);
            for (s = 0; 19 > s; ++s) b[s] = 0;
            for (s = 0; l > s; ++s) t = S(e, 3, 0), b[f[s]] = t;
            for (M(i, b, 0, 19), c = 0; u + y > c;) switch (o = j(e, i)) {
            case 16:
                for (k = b[c - 1], n = S(e, 2, 3); n; --n) b[c++] = k;
                break;
            case 17:
                for (n = S(e, 3, 3); n; --n) b[c++] = 0;
                break;
            case 18:
                for (n = S(e, 7, 11); n; --n) b[c++] = 0;
                break;
            default:
                b[c++] = o
            }
            M(a, b, 0, u), M(r, b, u, y)
        }

        function g(a, r, s) {
            for (var f, i, b, k, u;;) {
                if (256 === (f = j(a, r))) return e;
                if (256 > f) a.h[a.M++] = f;
                else
                    for (i = S(a, c[f -= 257], n[f]), b = j(a, s), u = k = a.M - S(a, t[b], o[b]); k + i > u; ++u) a.h[a.M++] = a.h[u]
            }
        }

        function P(r) {
            for (var s, c; r.l > 8;) r.k--, r.l -= 8;
            if ((s = 256 * (s = r.i[r.k + 1]) + r.i[r.k]) !== (65535 & ~(256 * r.i[r.k + 3] + r.i[r.k + 2]))) return a;
            for (r.k += 4, c = s; c; --c) r.h[r.M++] = r.i[r.k++];
            return r.l = 0, e
        }

        function Z(c, n) {
            var t, o, f = new h(c, n);
            do {
                switch (t = q(f), S(f, 2, 0)) {
                case 0:
                    o = P(f);
                    break;
                case 1:
                    o = g(f, r, s);
                    break;
                case 2:
                    d(f, f.q, f.S), o = g(f, f.q, f.S);
                    break;
                default:
                    o = a
                }
                if (o !== e) throw Error("Data error")
            } while (!t);
            return f.M < f.h.length ? "function" == typeof f.h.slice ? f.h.slice(0, f.M) : f.h.subarray(0, f.M) : f.h
        }

        function R(e, a = 0) {
            var r, s, c, n, t, o, f = e.replace(/[^A-Za-z0-9+/]/g, ""),
                i = f.length,
                b = a ? Math.ceil((3 * i + 1 >> 2) / a) * a : 3 * i + 1 >> 2,
                k = u(b);
            for (c = 0, n = 0, t = 0; i > t; t++)
                if (s = 3 & t, c |= ((o = f.charCodeAt(t)) > 64 && 91 > o ? o - 65 : o > 96 && 123 > o ? o - 71 : o > 47 && 58 > o ? o + 4 : 43 === o ? 62 : 47 === o ? 63 : 0) << 6 * (3 - s), 3 === s || i - t == 1) {
                    for (r = 0; 3 > r && b > n; r++, n++) k[n] = c >>> (16 >>> r & 24) & 255;
                    c = 0
                } return k
        }
        e = 0, a = -3, r = new l, s = new l, c = u(30), n = y(30), t = u(30), o = y(30), f = u([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), i = new l, b = u(320), k = y(16), ((e, a) => {
                var r;
                for (r = 0; 7 > r; ++r) e.t[r] = 0;
                for (e.t[7] = 24, e.t[8] = 152, e.t[9] = 112, r = 0; 24 > r; ++r) e.o[r] = 256 + r;
                for (r = 0; 144 > r; ++r) e.o[24 + r] = r;
                for (r = 0; 8 > r; ++r) e.o[168 + r] = 280 + r;
                for (r = 0; 112 > r; ++r) e.o[176 + r] = 144 + r;
                for (r = 0; 5 > r; ++r) a.t[r] = 0;
                for (a.t[5] = 32, r = 0; 32 > r; ++r) a.o[r] = r
            })(r, s), w(c, n, 4, 3), w(t, o, 2, 1), c[28] = 0, n[28] = 258,
            function (e, a = {}) {
                let r = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : a;
                let s = r;
                let c = "undefined" != typeof require ? require : null,
                    n = R("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"),
                    t = !!n[0],
                    o = t ? n[1] | n[2] << 8 | n[3] << 16 | n[4] << 24 : n.length,
                    f = t ? u(o) : u(n.buffer, 5, n.length - 5);
                t && Z(u(n.buffer, 5, n.length - 5), f);
                let i = 0,
                    b = {},
                    k = [];
                let y = [],
                    l = [],
                    h = [];
                let w = 0,
                    M = null,
                    q = null,
                    S = [],
                    j = null;
                a._$EXPORTS = {}, c && (a.require = c);
                let d = new Float64Array(1),
                    g = u(d.buffer);

                function P() {
                    let e = 0,
                        a = 0,
                        r = 0;
                    for (; r = f[i++], e |= (127 & r) << a, 0 != (128 & r);) a += 7;
                    return e
                }

                function p() {
                    return f[i++] | f[i++] << 8 | f[i++] << 16 | f[i++] << 24
                }

                function L() {
                    let e = P();
                    let a = "";
                    for (let r = 0; e > r; r++) a += String.fromCharCode(P());
                    return a
                }

                function m(e, a) {
                    let r = b;
                    return function c() {
                        let n = w,
                            t = {};
                        w = e;
                        let o = b;
                        b = t, b[e] = {};
                        let f = h[e],
                            u = f.length;
                        for (let e = 0; u > e; e++) {
                            let a = f[e];
                            let s = r[a];
                            t[a] = s
                        }
                        let y = k,
                            l = i,
                            d = M,
                            g = q,
                            P = s,
                            Z = S;
                        let R = null,
                            p = null;
                        k = [], S = [], i = a, M = c, q = arguments, s = this;
                        try {
                            R = C()
                        } catch (e) {
                            if (S.length) {
                                let a = S.pop();
                                i = a, j = e, R = C()
                            } else p = e
                        }
                        if (S = Z, i = l, k = y, M = d, b = o, w = n, q = g, s = P, p) throw p;
                        return R
                    }
                }

                function C() {
                    for (;;) {
                        let e = f[i++];
                        switch (e) {
                        case 27:
                            b[w][P()] = q;
                            break;
                        case 0:
                            k[f[i++]] = P();
                            break;
                        case 39:
                            k[f[i++]] = f[i++] ? ++b[P()][P()] : b[P()][P()]++;
                            break;
                        case 74:
                            k[f[i++]] = (g[0] = f[i++], g[1] = f[i++], g[2] = f[i++], g[3] = f[i++], g[4] = f[i++], g[5] = f[i++], g[6] = f[i++], g[7] = f[i++], d[0]);
                            break;
                        case 8: {
                            let e = P(),
                                a = P();
                            b[w][a] = q[e];
                            break
                        }
                        case 65:
                            k[f[i++]] = k[f[i++]];
                            break;
                        case 86:
                            k[f[i++]] = m(P(), p());
                            break;
                        case 33:
                            k[f[i++]] = y[P()];
                            break;
                        case 18:
                            k[f[i++]] = RegExp(y[P()], y[P()]);
                            break;
                        case 19:
                            k[f[i++]] = !k[f[i++]];
                            break;
                        case 82:
                            k[f[i++]] = void k[f[i++]];
                            break;
                        case 5:
                            k[f[i++]] = ~k[f[i++]];
                            break;
                        case 50:
                            k[f[i++]] = -k[f[i++]];
                            break;
                        case 83:
                            k[f[i++]] = typeof k[f[i++]];
                            break;
                        case 37:
                            k[f[i++]] = k[f[i++]] + k[f[i++]];
                            break;
                        case 51:
                            k[f[i++]] = k[f[i++]] / k[f[i++]];
                            break;
                        case 25:
                            k[f[i++]] = k[f[i++]] - k[f[i++]];
                            break;
                        case 54:
                            k[f[i++]] = k[f[i++]] ^ k[f[i++]];
                            break;
                        case 47:
                            k[f[i++]] = k[f[i++]] | k[f[i++]];
                            break;
                        case 64:
                            k[f[i++]] = k[f[i++]] >>> k[f[i++]];
                            break;
                        case 41:
                            k[f[i++]] = k[f[i++]] % k[f[i++]];
                            break;
                        case 2:
                            k[f[i++]] = k[f[i++]] != k[f[i++]];
                            break;
                        case 61:
                        case 57:
                            k[f[i++]] = k[f[i++]] == k[f[i++]];
                            break;
                        case 63:
                            k[f[i++]] = k[f[i++]] & k[f[i++]];
                            break;
                        case 72:
                            k[f[i++]] = k[f[i++]] << k[f[i++]];
                            break;
                        case 24:
                            k[f[i++]] = k[f[i++]] >> k[f[i++]];
                            break;
                        case 48:
                            k[f[i++]] = k[f[i++]] * k[f[i++]];
                            break;
                        case 14:
                            k[f[i++]] = k[f[i++]] <= k[f[i++]];
                            break;
                        case 30:
                            k[f[i++]] = k[f[i++]] < k[f[i++]];
                            break;
                        case 53:
                            k[f[i++]] = k[f[i++]] > k[f[i++]];
                            break;
                        case 70:
                            l.push(k[f[i++]]);
                            break;
                        case 32: {
                            let e = P(),
                                a = Array(e);
                            for (let r = 0; e > r; r++) a[e - r - 1] = l.pop();
                            let s = f[i++],
                                c = f[i++];
                            k[s] = k[c].apply(r, a);
                            break
                        }
                        case 80: {
                            let e = P(),
                                a = Array(e);
                            for (let r = 0; e > r; r++) a[e - r - 1] = l.pop();
                            let r = f[i++],
                                s = f[i++];
                            k[s] = Reflect.construct(k[r], a);
                            break
                        }
                        case 60:
                            k[f[i++]] = k[f[i++]][k[f[i++]]] = k[f[i++]];
                            break;
                        case 40:
                            k[f[i++]] = k[f[i++]][k[f[i++]]] |= k[f[i++]];
                            break;
                        case 79:
                            k[f[i++]] = r;
                            break;
                        case 22:
                            k[f[i++]] = k[f[i++]][k[f[i++]]];
                            break;
                        case 69: {
                            let e = P(),
                                a = Array(e);
                            for (let r = 0; e > r; r++) a[e - r - 1] = l.pop();
                            let r = f[i++],
                                s = f[i++],
                                c = f[i++],
                                n = k[s],
                                t = k[c];
                            k[r] = n[t].apply(n, a);
                            break
                        }
                        case 34:
                            throw k[f[i++]];
                        case 87: {
                            let e = f[i++],
                                s = !!f[i++],
                                c = P(),
                                n = y[c];
                            if (n in a) {
                                k[e] = a[n];
                                break
                            }
                            if (s && !(n in r)) throw new ReferenceError(n + " is not defined");
                            k[e] = r[n];
                            break
                        }
                        case 66: {
                            let e = P(),
                                a = Array(e);
                            for (let r = 0; e > r; r++) a[e - r - 1] = l.pop();
                            k[f[i++]] = a
                        }
                        break;
                        case 56: {
                            let e = {},
                                a = P(),
                                r = f[i++];
                            for (let r = 0; a > r; r++) {
                                let a = l.pop(),
                                    r = l.pop();
                                switch (l.pop()) {
                                case 0:
                                    e[r] = a;
                                    break;
                                case 1:
                                    Object.defineProperty(e, r, {
                                        get: a
                                    });
                                    break;
                                case 2:
                                    Object.defineProperty(e, r, {
                                        set: a
                                    })
                                }
                            }
                            k[r] = e;
                            break
                        }
                        case 67:
                            k[f[i++]] = null;
                            break;
                        case 20:
                            k[f[i++]] = b[P()][P()];
                            break;
                        case 36:
                            k[f[i++]] = b[P()][P()] = k[f[i++]];
                            break;
                        case 46:
                            k[f[i++]] = b[P()][P()] %= k[f[i++]];
                            break;
                        case 49:
                            k[f[i++]] = b[P()][P()] += k[f[i++]];
                            break;
                        case 10:
                            b[P()][P()] = k[f[i++]];
                            break;
                        case 44: {
                            let e = f[i++],
                                a = p();
                            k[e] || (i = a);
                            break
                        }
                        case 71: {
                            let e = f[i++],
                                a = p();
                            k[e] && (i = a);
                            break
                        }
                        case 31: {
                            let e = p();
                            i = e;
                            break
                        }
                        case 84:
                        case 23:
                            return k[0];
                        case 55:
                            S.push(p());
                            break;
                        case 4:
                            S.pop();
                            break;
                        case 38:
                            b[w][P()] = j;
                            break;
                        default:
                            throw "u" + e
                        }
                    }
                }(() => {
                    for (i = 0;;) {
                        let e = f[i++];
                        if (88 === e) y.push(L());
                        else {
                            if (52 !== e) return void i--; {
                                let e = P(),
                                    a = P(),
                                    r = [];
                                for (let e = 0; a > e; e++) r.push(P());
                                h[e] = r
                            }
                        }
                    }
                })(), m(0, i).call(this)
            }(0, {})
    }();
})();