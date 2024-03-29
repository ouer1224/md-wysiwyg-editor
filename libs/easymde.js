/**
 * easymde v2.11.0
 * Copyright Jeroen Akkerman
 * @link https://github.com/ionaru/easy-markdown-editor
 * @license MIT
 */
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).EasyMDE = e()
    }
}((function() {
    return function e(t, n, r) {
        function i(a, l) {
            if (!n[a]) {
                if (!t[a]) {
                    var s = "function" == typeof require && require;
                    if (!l && s) return s(a, !0);
                    if (o) return o(a, !0);
                    var c = new Error("Cannot find module '" + a + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = n[a] = {
                    exports: {}
                };
                t[a][0].call(u.exports, (function(e) {
                    return i(t[a][1][e] || e)
                }), u, u.exports, e, t, n, r)
            }
            return n[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
        return i
    }({
        1: [function(e, t, n) {}, {}],
        2: [function(e, t, n) {
            "use strict";
            var r = e("typo-js");

            function i(e) {
                "function" == typeof(e = e || {}).codeMirrorInstance && "function" == typeof e.codeMirrorInstance.defineMode ? (String.prototype.includes || (String.prototype.includes = function() {
                    return -1 !== String.prototype.indexOf.apply(this, arguments)
                }), e.codeMirrorInstance.defineMode("spell-checker", (function(t) {
                    if (!i.aff_loading) {
                        i.aff_loading = !0;
                        var n = new XMLHttpRequest;
                        n.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff", !0), n.onload = function() {
                            4 === n.readyState && 200 === n.status && (i.aff_data = n.responseText, i.num_loaded++, 2 == i.num_loaded && (i.typo = new r("en_US", i.aff_data, i.dic_data, {
                                platform: "any"
                            })))
                        }, n.send(null)
                    }
                    if (!i.dic_loading) {
                        i.dic_loading = !0;
                        var o = new XMLHttpRequest;
                        o.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic", !0), o.onload = function() {
                            4 === o.readyState && 200 === o.status && (i.dic_data = o.responseText, i.num_loaded++, 2 == i.num_loaded && (i.typo = new r("en_US", i.aff_data, i.dic_data, {
                                platform: "any"
                            })))
                        }, o.send(null)
                    }
                    var a = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ',
                        l = {
                            token: function(e) {
                                var t = e.peek(),
                                    n = "";
                                if (a.includes(t)) return e.next(), null;
                                for (; null != (t = e.peek()) && !a.includes(t);) n += t, e.next();
                                return i.typo && !i.typo.check(n) ? "spell-error" : null
                            }
                        },
                        s = e.codeMirrorInstance.getMode(t, t.backdrop || "text/plain");
                    return e.codeMirrorInstance.overlayMode(s, l, !0)
                }))) : console.log("CodeMirror Spell Checker: You must provide an instance of CodeMirror via the option `codeMirrorInstance`")
            }
            i.num_loaded = 0, i.aff_loading = !1, i.dic_loading = !1, i.aff_data = "", i.dic_data = "", i.typo, t.exports = i
        }, {
            "typo-js": 15
        }],
        3: [function(e, t, n) {
            (function(e) {
                "use strict";
                e.defineOption("fullScreen", !1, (function(t, n, r) {
                    r == e.Init && (r = !1), !r != !n && (n ? function(e) {
                        var t = e.getWrapperElement();
                        e.state.fullScreenRestore = {
                            scrollTop: window.pageYOffset,
                            scrollLeft: window.pageXOffset,
                            width: t.style.width,
                            height: t.style.height
                        }, t.style.width = "", t.style.height = "auto", t.className += " CodeMirror-fullscreen", document.documentElement.style.overflow = "hidden", e.refresh()
                    }(t) : function(e) {
                        var t = e.getWrapperElement();
                        t.className = t.className.replace(/\s*CodeMirror-fullscreen\b/, ""), document.documentElement.style.overflow = "";
                        var n = e.state.fullScreenRestore;
                        t.style.width = n.width, t.style.height = n.height, window.scrollTo(n.scrollLeft, n.scrollTop), e.refresh()
                    }(t))
                }))
            })("object" == typeof n && "object" == typeof t ? e("../../lib/codemirror") : CodeMirror)
        }, {
            "../../lib/codemirror": 9
        }],
        4: [function(e, t, n) {
            (function(e) {
                function t(e) {
                    e.state.placeholder && (e.state.placeholder.parentNode.removeChild(e.state.placeholder), e.state.placeholder = null)
                }

                function n(e) {
                    t(e);
                    var n = e.state.placeholder = document.createElement("pre");
                    n.style.cssText = "height: 0; overflow: visible", n.style.direction = e.getOption("direction"), n.className = "CodeMirror-placeholder CodeMirror-line-like";
                    var r = e.getOption("placeholder");
                    "string" == typeof r && (r = document.createTextNode(r)), n.appendChild(r), e.display.lineSpace.insertBefore(n, e.display.lineSpace.firstChild)
                }

                function r(e) {
                    o(e) && n(e)
                }

                function i(e) {
                    var r = e.getWrapperElement(),
                        i = o(e);
                    r.className = r.className.replace(" CodeMirror-empty", "") + (i ? " CodeMirror-empty" : ""), i ? n(e) : t(e)
                }

                function o(e) {
                    return 1 === e.lineCount() && "" === e.getLine(0)
                }
                e.defineOption("placeholder", "", (function(n, o, a) {
                    var l = a && a != e.Init;
                    if (o && !l) n.on("blur", r), n.on("change", i), n.on("swapDoc", i), i(n);
                    else if (!o && l) {
                        n.off("blur", r), n.off("change", i), n.off("swapDoc", i), t(n);
                        var s = n.getWrapperElement();
                        s.className = s.className.replace(" CodeMirror-empty", "")
                    }
                    o && !n.hasFocus() && r(n)
                }))
            })("object" == typeof n && "object" == typeof t ? e("../../lib/codemirror") : CodeMirror)
        }, {
            "../../lib/codemirror": 9
        }],
        5: [function(e, t, n) {
            (function(e) {
                "use strict";
                var t = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,
                    n = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,
                    r = /[*+-]\s/;

                function i(e, n) {
                    var r = n.line,
                        i = 0,
                        o = 0,
                        a = t.exec(e.getLine(r)),
                        l = a[1];
                    do {
                        var s = r + (i += 1),
                            c = e.getLine(s),
                            u = t.exec(c);
                        if (u) {
                            var d = u[1],
                                h = parseInt(a[3], 10) + i - o,
                                f = parseInt(u[3], 10),
                                p = f;
                            if (l !== d || isNaN(f)) {
                                if (l.length > d.length) return;
                                if (l.length < d.length && 1 === i) return;
                                o += 1
                            } else h === f && (p = f + 1), h > f && (p = h + 1), e.replaceRange(c.replace(t, d + p + u[4] + u[5]), {
                                line: s,
                                ch: 0
                            }, {
                                line: s,
                                ch: c.length
                            })
                        }
                    } while (u)
                }
                e.commands.newlineAndIndentContinueMarkdownList = function(o) {
                    if (o.getOption("disableInput")) return e.Pass;
                    for (var a = o.listSelections(), l = [], s = 0; s < a.length; s++) {
                        var c = a[s].head,
                            u = o.getStateAfter(c.line),
                            d = e.innerMode(o.getMode(), u);
                        if ("markdown" !== d.mode.name) return void o.execCommand("newlineAndIndent");
                        var h = !1 !== (u = d.state).list,
                            f = 0 !== u.quote,
                            p = o.getLine(c.line),
                            m = t.exec(p),
                            g = /^\s*$/.test(p.slice(0, c.ch));
                        if (!a[s].empty() || !h && !f || !m || g) return void o.execCommand("newlineAndIndent");
                        if (n.test(p)) {
                            var v = f && />\s*$/.test(p),
                                x = !/>\s*$/.test(p);
                            (v || x) && o.replaceRange("", {
                                line: c.line,
                                ch: 0
                            }, {
                                line: c.line,
                                ch: c.ch + 1
                            }), l[s] = "\n"
                        } else {
                            var y = m[1],
                                b = m[5],
                                k = !(r.test(m[2]) || m[2].indexOf(">") >= 0),
                                w = k ? parseInt(m[3], 10) + 1 + m[4] : m[2].replace("x", " ");
                            l[s] = "\n" + y + w + b, k && i(o, c)
                        }
                    }
                    o.replaceSelections(l)
                }
            })("object" == typeof n && "object" == typeof t ? e("../../lib/codemirror") : CodeMirror)
        }, {
            "../../lib/codemirror": 9
        }],
        6: [function(e, t, n) {
            (function(e) {
                "use strict";
                e.overlayMode = function(t, n, r) {
                    return {
                        startState: function() {
                            return {
                                base: e.startState(t),
                                overlay: e.startState(n),
                                basePos: 0,
                                baseCur: null,
                                overlayPos: 0,
                                overlayCur: null,
                                streamSeen: null
                            }
                        },
                        copyState: function(r) {
                            return {
                                base: e.copyState(t, r.base),
                                overlay: e.copyState(n, r.overlay),
                                basePos: r.basePos,
                                baseCur: null,
                                overlayPos: r.overlayPos,
                                overlayCur: null
                            }
                        },
                        token: function(e, i) {
                            return (e != i.streamSeen || Math.min(i.basePos, i.overlayPos) < e.start) && (i.streamSeen = e, i.basePos = i.overlayPos = e.start), e.start == i.basePos && (i.baseCur = t.token(e, i.base), i.basePos = e.pos), e.start == i.overlayPos && (e.pos = e.start, i.overlayCur = n.token(e, i.overlay), i.overlayPos = e.pos), e.pos = Math.min(i.basePos, i.overlayPos), null == i.overlayCur ? i.baseCur : null != i.baseCur && i.overlay.combineTokens || r && null == i.overlay.combineTokens ? i.baseCur + " " + i.overlayCur : i.overlayCur
                        },
                        indent: t.indent && function(e, n, r) {
                            return t.indent(e.base, n, r)
                        },
                        electricChars: t.electricChars,
                        innerMode: function(e) {
                            return {
                                state: e.base,
                                mode: t
                            }
                        },
                        blankLine: function(e) {
                            var i, o;
                            return t.blankLine && (i = t.blankLine(e.base)), n.blankLine && (o = n.blankLine(e.overlay)), null == o ? i : r && null != i ? i + " " + o : o
                        }
                    }
                }
            })("object" == typeof n && "object" == typeof t ? e("../../lib/codemirror") : CodeMirror)
        }, {
            "../../lib/codemirror": 9
        }],
        7: [function(e, t, n) {
            (function(e) {
                "use strict";
                var t, n, r = e.Pos;

                function i(e, t) {
                    for (var n = function(e) {
                            var t = e.flags;
                            return null != t ? t : (e.ignoreCase ? "i" : "") + (e.global ? "g" : "") + (e.multiline ? "m" : "")
                        }(e), r = n, i = 0; i < t.length; i++) - 1 == r.indexOf(t.charAt(i)) && (r += t.charAt(i));
                    return n == r ? e : new RegExp(e.source, r)
                }

                function o(e) {
                    return /\\s|\\n|\n|\\W|\\D|\[\^/.test(e.source)
                }

                function a(e, t, n) {
                    t = i(t, "g");
                    for (var o = n.line, a = n.ch, l = e.lastLine(); o <= l; o++, a = 0) {
                        t.lastIndex = a;
                        var s = e.getLine(o),
                            c = t.exec(s);
                        if (c) return {
                            from: r(o, c.index),
                            to: r(o, c.index + c[0].length),
                            match: c
                        }
                    }
                }

                function l(e, t, n) {
                    if (!o(t)) return a(e, t, n);
                    t = i(t, "gm");
                    for (var l, s = 1, c = n.line, u = e.lastLine(); c <= u;) {
                        for (var d = 0; d < s && !(c > u); d++) {
                            var h = e.getLine(c++);
                            l = null == l ? h : l + "\n" + h
                        }
                        s *= 2, t.lastIndex = n.ch;
                        var f = t.exec(l);
                        if (f) {
                            var p = l.slice(0, f.index).split("\n"),
                                m = f[0].split("\n"),
                                g = n.line + p.length - 1,
                                v = p[p.length - 1].length;
                            return {
                                from: r(g, v),
                                to: r(g + m.length - 1, 1 == m.length ? v + m[0].length : m[m.length - 1].length),
                                match: f
                            }
                        }
                    }
                }

                function s(e, t, n) {
                    for (var r, i = 0; i <= e.length;) {
                        t.lastIndex = i;
                        var o = t.exec(e);
                        if (!o) break;
                        var a = o.index + o[0].length;
                        if (a > e.length - n) break;
                        (!r || a > r.index + r[0].length) && (r = o), i = o.index + 1
                    }
                    return r
                }

                function c(e, t, n) {
                    t = i(t, "g");
                    for (var o = n.line, a = n.ch, l = e.firstLine(); o >= l; o--, a = -1) {
                        var c = e.getLine(o),
                            u = s(c, t, a < 0 ? 0 : c.length - a);
                        if (u) return {
                            from: r(o, u.index),
                            to: r(o, u.index + u[0].length),
                            match: u
                        }
                    }
                }

                function u(e, t, n) {
                    if (!o(t)) return c(e, t, n);
                    t = i(t, "gm");
                    for (var a, l = 1, u = e.getLine(n.line).length - n.ch, d = n.line, h = e.firstLine(); d >= h;) {
                        for (var f = 0; f < l && d >= h; f++) {
                            var p = e.getLine(d--);
                            a = null == a ? p : p + "\n" + a
                        }
                        l *= 2;
                        var m = s(a, t, u);
                        if (m) {
                            var g = a.slice(0, m.index).split("\n"),
                                v = m[0].split("\n"),
                                x = d + g.length,
                                y = g[g.length - 1].length;
                            return {
                                from: r(x, y),
                                to: r(x + v.length - 1, 1 == v.length ? y + v[0].length : v[v.length - 1].length),
                                match: m
                            }
                        }
                    }
                }

                function d(e, t, n, r) {
                    if (e.length == t.length) return n;
                    for (var i = 0, o = n + Math.max(0, e.length - t.length);;) {
                        if (i == o) return i;
                        var a = i + o >> 1,
                            l = r(e.slice(0, a)).length;
                        if (l == n) return a;
                        l > n ? o = a : i = a + 1
                    }
                }

                function h(e, i, o, a) {
                    if (!i.length) return null;
                    var l = a ? t : n,
                        s = l(i).split(/\r|\n\r?/);
                    e: for (var c = o.line, u = o.ch, h = e.lastLine() + 1 - s.length; c <= h; c++, u = 0) {
                        var f = e.getLine(c).slice(u),
                            p = l(f);
                        if (1 == s.length) {
                            var m = p.indexOf(s[0]);
                            if (-1 == m) continue e;
                            return o = d(f, p, m, l) + u, {
                                from: r(c, d(f, p, m, l) + u),
                                to: r(c, d(f, p, m + s[0].length, l) + u)
                            }
                        }
                        var g = p.length - s[0].length;
                        if (p.slice(g) == s[0]) {
                            for (var v = 1; v < s.length - 1; v++)
                                if (l(e.getLine(c + v)) != s[v]) continue e;
                            var x = e.getLine(c + s.length - 1),
                                y = l(x),
                                b = s[s.length - 1];
                            if (y.slice(0, b.length) == b) return {
                                from: r(c, d(f, p, g, l) + u),
                                to: r(c + s.length - 1, d(x, y, b.length, l))
                            }
                        }
                    }
                }

                function f(e, i, o, a) {
                    if (!i.length) return null;
                    var l = a ? t : n,
                        s = l(i).split(/\r|\n\r?/);
                    e: for (var c = o.line, u = o.ch, h = e.firstLine() - 1 + s.length; c >= h; c--, u = -1) {
                        var f = e.getLine(c);
                        u > -1 && (f = f.slice(0, u));
                        var p = l(f);
                        if (1 == s.length) {
                            var m = p.lastIndexOf(s[0]);
                            if (-1 == m) continue e;
                            return {
                                from: r(c, d(f, p, m, l)),
                                to: r(c, d(f, p, m + s[0].length, l))
                            }
                        }
                        var g = s[s.length - 1];
                        if (p.slice(0, g.length) == g) {
                            var v = 1;
                            for (o = c - s.length + 1; v < s.length - 1; v++)
                                if (l(e.getLine(o + v)) != s[v]) continue e;
                            var x = e.getLine(c + 1 - s.length),
                                y = l(x);
                            if (y.slice(y.length - s[0].length) == s[0]) return {
                                from: r(c + 1 - s.length, d(x, y, x.length - s[0].length, l)),
                                to: r(c, d(f, p, g.length, l))
                            }
                        }
                    }
                }

                function p(e, t, n, o) {
                    var s;
                    this.atOccurrence = !1, this.doc = e, n = n ? e.clipPos(n) : r(0, 0), this.pos = {
                        from: n,
                        to: n
                    }, "object" == typeof o ? s = o.caseFold : (s = o, o = null), "string" == typeof t ? (null == s && (s = !1), this.matches = function(n, r) {
                        return (n ? f : h)(e, t, r, s)
                    }) : (t = i(t, "gm"), o && !1 === o.multiline ? this.matches = function(n, r) {
                        return (n ? c : a)(e, t, r)
                    } : this.matches = function(n, r) {
                        return (n ? u : l)(e, t, r)
                    })
                }
                String.prototype.normalize ? (t = function(e) {
                    return e.normalize("NFD").toLowerCase()
                }, n = function(e) {
                    return e.normalize("NFD")
                }) : (t = function(e) {
                    return e.toLowerCase()
                }, n = function(e) {
                    return e
                }), p.prototype = {
                    findNext: function() {
                        return this.find(!1)
                    },
                    findPrevious: function() {
                        return this.find(!0)
                    },
                    find: function(t) {
                        for (var n = this.matches(t, this.doc.clipPos(t ? this.pos.from : this.pos.to)); n && 0 == e.cmpPos(n.from, n.to);) t ? n.from.ch ? n.from = r(n.from.line, n.from.ch - 1) : n = n.from.line == this.doc.firstLine() ? null : this.matches(t, this.doc.clipPos(r(n.from.line - 1))) : n.to.ch < this.doc.getLine(n.to.line).length ? n.to = r(n.to.line, n.to.ch + 1) : n = n.to.line == this.doc.lastLine() ? null : this.matches(t, r(n.to.line + 1, 0));
                        if (n) return this.pos = n, this.atOccurrence = !0, this.pos.match || !0;
                        var i = r(t ? this.doc.firstLine() : this.doc.lastLine() + 1, 0);
                        return this.pos = {
                            from: i,
                            to: i
                        }, this.atOccurrence = !1
                    },
                    from: function() {
                        if (this.atOccurrence) return this.pos.from
                    },
                    to: function() {
                        if (this.atOccurrence) return this.pos.to
                    },
                    replace: function(t, n) {
                        if (this.atOccurrence) {
                            var i = e.splitLines(t);
                            this.doc.replaceRange(i, this.pos.from, this.pos.to, n), this.pos.to = r(this.pos.from.line + i.length - 1, i[i.length - 1].length + (1 == i.length ? this.pos.from.ch : 0))
                        }
                    }
                }, e.defineExtension("getSearchCursor", (function(e, t, n) {
                    return new p(this.doc, e, t, n)
                })), e.defineDocExtension("getSearchCursor", (function(e, t, n) {
                    return new p(this, e, t, n)
                })), e.defineExtension("selectMatches", (function(t, n) {
                    for (var r = [], i = this.getSearchCursor(t, this.getCursor("from"), n); i.findNext() && !(e.cmpPos(i.to(), this.getCursor("to")) > 0);) r.push({
                        anchor: i.from(),
                        head: i.to()
                    });
                    r.length && this.setSelections(r, 0)
                }))
            })("object" == typeof n && "object" == typeof t ? e("../../lib/codemirror") : CodeMirror)
        }, {
            "../../lib/codemirror": 9
        }],
        8: [function(e, t, n) {
            (function(e) {
                "use strict";

                function t(e) {
                    e.state.markedSelection && e.operation((function() {
                        ! function(e) {
                            if (!e.somethingSelected()) return a(e);
                            if (e.listSelections().length > 1) return l(e);
                            var t = e.getCursor("start"),
                                n = e.getCursor("end"),
                                r = e.state.markedSelection;
                            if (!r.length) return o(e, t, n);
                            var s = r[0].find(),
                                c = r[r.length - 1].find();
                            if (!s || !c || n.line - t.line <= 8 || i(t, c.to) >= 0 || i(n, s.from) <= 0) return l(e);
                            for (; i(t, s.from) > 0;) r.shift().clear(), s = r[0].find();
                            for (i(t, s.from) < 0 && (s.to.line - t.line < 8 ? (r.shift().clear(), o(e, t, s.to, 0)) : o(e, t, s.from, 0)); i(n, c.to) < 0;) r.pop().clear(), c = r[r.length - 1].find();
                            i(n, c.to) > 0 && (n.line - c.from.line < 8 ? (r.pop().clear(), o(e, c.from, n)) : o(e, c.to, n))
                        }(e)
                    }))
                }

                function n(e) {
                    e.state.markedSelection && e.state.markedSelection.length && e.operation((function() {
                        a(e)
                    }))
                }
                e.defineOption("styleSelectedText", !1, (function(r, i, o) {
                    var s = o && o != e.Init;
                    i && !s ? (r.state.markedSelection = [], r.state.markedSelectionStyle = "string" == typeof i ? i : "CodeMirror-selectedtext", l(r), r.on("cursorActivity", t), r.on("change", n)) : !i && s && (r.off("cursorActivity", t), r.off("change", n), a(r), r.state.markedSelection = r.state.markedSelectionStyle = null)
                }));
                var r = e.Pos,
                    i = e.cmpPos;

                function o(e, t, n, o) {
                    if (0 != i(t, n))
                        for (var a = e.state.markedSelection, l = e.state.markedSelectionStyle, s = t.line;;) {
                            var c = s == t.line ? t : r(s, 0),
                                u = s + 8,
                                d = u >= n.line,
                                h = d ? n : r(u, 0),
                                f = e.markText(c, h, {
                                    className: l
                                });
                            if (null == o ? a.push(f) : a.splice(o++, 0, f), d) break;
                            s = u
                        }
                }

                function a(e) {
                    for (var t = e.state.markedSelection, n = 0; n < t.length; ++n) t[n].clear();
                    t.length = 0
                }

                function l(e) {
                    a(e);
                    for (var t = e.listSelections(), n = 0; n < t.length; n++) o(e, t[n].from(), t[n].to())
                }
            })("object" == typeof n && "object" == typeof t ? e("../../lib/codemirror") : CodeMirror)
        }, {
            "../../lib/codemirror": 9
        }],
        9: [function(e, t, n) {
            ! function(e, r) {
                "object" == typeof n && void 0 !== t ? t.exports = r() : (e = e || self).CodeMirror = r()
            }(this, (function() {
                "use strict";
                var e = navigator.userAgent,
                    t = navigator.platform,
                    n = /gecko\/\d/i.test(e),
                    r = /MSIE \d/.test(e),
                    i = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
                    o = /Edge\/(\d+)/.exec(e),
                    a = r || i || o,
                    l = a && (r ? document.documentMode || 6 : +(o || i)[1]),
                    s = !o && /WebKit\//.test(e),
                    c = s && /Qt\/\d+\.\d+/.test(e),
                    u = !o && /Chrome\//.test(e),
                    d = /Opera\//.test(e),
                    h = /Apple Computer/.test(navigator.vendor),
                    f = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
                    p = /PhantomJS/.test(e),
                    m = !o && /AppleWebKit/.test(e) && /Mobile\/\w+/.test(e),
                    g = /Android/.test(e),
                    v = m || g || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
                    x = m || /Mac/.test(t),
                    y = /\bCrOS\b/.test(e),
                    b = /win/i.test(t),
                    k = d && e.match(/Version\/(\d*\.\d*)/);
                k && (k = Number(k[1])), k && k >= 15 && (d = !1, s = !0);
                var w = x && (c || d && (null == k || k < 12.11)),
                    C = n || a && l >= 9;

                function S(e) {
                    return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
                }
                var L, T = function(e, t) {
                    var n = e.className,
                        r = S(t).exec(n);
                    if (r) {
                        var i = n.slice(r.index + r[0].length);
                        e.className = n.slice(0, r.index) + (i ? r[1] + i : "")
                    }
                };

                function M(e) {
                    for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
                    return e
                }

                function A(e, t) {
                    return M(e).appendChild(t)
                }

                function N(e, t, n, r) {
                    var i = document.createElement(e);
                    if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t) i.appendChild(document.createTextNode(t));
                    else if (t)
                        for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
                    return i
                }

                function D(e, t, n, r) {
                    var i = N(e, t, n, r);
                    return i.setAttribute("role", "presentation"), i
                }

                function F(e, t) {
                    if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
                    do {
                        if (11 == t.nodeType && (t = t.host), t == e) return !0
                    } while (t = t.parentNode)
                }

                function E() {
                    var e;
                    try {
                        e = document.activeElement
                    } catch (t) {
                        e = document.body || null
                    }
                    for (; e && e.shadowRoot && e.shadowRoot.activeElement;) e = e.shadowRoot.activeElement;
                    return e
                }

                function O(e, t) {
                    var n = e.className;
                    S(t).test(n) || (e.className += (n ? " " : "") + t)
                }

                function I(e, t) {
                    for (var n = e.split(" "), r = 0; r < n.length; r++) n[r] && !S(n[r]).test(t) && (t += " " + n[r]);
                    return t
                }
                L = document.createRange ? function(e, t, n, r) {
                    var i = document.createRange();
                    return i.setEnd(r || e, n), i.setStart(e, t), i
                } : function(e, t, n) {
                    var r = document.body.createTextRange();
                    try {
                        r.moveToElementText(e.parentNode)
                    } catch (e) {
                        return r
                    }
                    return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r
                };
                var z = function(e) {
                    e.select()
                };

                function H(e) {
                    var t = Array.prototype.slice.call(arguments, 1);
                    return function() {
                        return e.apply(null, t)
                    }
                }

                function R(e, t, n) {
                    for (var r in t || (t = {}), e) !e.hasOwnProperty(r) || !1 === n && t.hasOwnProperty(r) || (t[r] = e[r]);
                    return t
                }

                function P(e, t, n, r, i) {
                    null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
                    for (var o = r || 0, a = i || 0;;) {
                        var l = e.indexOf("\t", o);
                        if (l < 0 || l >= t) return a + (t - o);
                        a += l - o, a += n - a % n, o = l + 1
                    }
                }
                m ? z = function(e) {
                    e.selectionStart = 0, e.selectionEnd = e.value.length
                } : a && (z = function(e) {
                    try {
                        e.select()
                    } catch (e) {}
                });
                var _ = function() {
                    this.id = null, this.f = null, this.time = 0, this.handler = H(this.onTimeout, this)
                };

                function W(e, t) {
                    for (var n = 0; n < e.length; ++n)
                        if (e[n] == t) return n;
                    return -1
                }
                _.prototype.onTimeout = function(e) {
                    e.id = 0, e.time <= +new Date ? e.f() : setTimeout(e.handler, e.time - +new Date)
                }, _.prototype.set = function(e, t) {
                    this.f = t;
                    var n = +new Date + e;
                    (!this.id || n < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = n)
                };
                var B = {
                        toString: function() {
                            return "CodeMirror.Pass"
                        }
                    },
                    j = {
                        scroll: !1
                    },
                    q = {
                        origin: "*mouse"
                    },
                    U = {
                        origin: "+move"
                    };

                function $(e, t, n) {
                    for (var r = 0, i = 0;;) {
                        var o = e.indexOf("\t", r); - 1 == o && (o = e.length);
                        var a = o - r;
                        if (o == e.length || i + a >= t) return r + Math.min(a, t - i);
                        if (i += o - r, r = o + 1, (i += n - i % n) >= t) return r
                    }
                }
                var G = [""];

                function V(e) {
                    for (; G.length <= e;) G.push(X(G) + " ");
                    return G[e]
                }

                function X(e) {
                    return e[e.length - 1]
                }

                function K(e, t) {
                    for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r);
                    return n
                }

                function Z() {}

                function Y(e, t) {
                    var n;
                    return Object.create ? n = Object.create(e) : (Z.prototype = e, n = new Z), t && R(t, n), n
                }
                var Q = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;

                function J(e) {
                    return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Q.test(e))
                }

                function ee(e, t) {
                    return t ? !!(t.source.indexOf("\\w") > -1 && J(e)) || t.test(e) : J(e)
                }

                function te(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t) && e[t]) return !1;
                    return !0
                }
                var ne = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;

                function re(e) {
                    return e.charCodeAt(0) >= 768 && ne.test(e)
                }

                function ie(e, t, n) {
                    for (;
                        (n < 0 ? t > 0 : t < e.length) && re(e.charAt(t));) t += n;
                    return t
                }

                function oe(e, t, n) {
                    for (var r = t > n ? -1 : 1;;) {
                        if (t == n) return t;
                        var i = (t + n) / 2,
                            o = r < 0 ? Math.ceil(i) : Math.floor(i);
                        if (o == t) return e(o) ? t : n;
                        e(o) ? n = o : t = o + r
                    }
                }
                var ae = null;

                function le(e, t, n) {
                    var r;
                    ae = null;
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i];
                        if (o.from < t && o.to > t) return i;
                        o.to == t && (o.from != o.to && "before" == n ? r = i : ae = i), o.from == t && (o.from != o.to && "before" != n ? r = i : ae = i)
                    }
                    return null != r ? r : ae
                }
                var se = function() {
                    var e = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                        t = /[stwN]/,
                        n = /[LRr]/,
                        r = /[Lb1n]/,
                        i = /[1n]/;

                    function o(e, t, n) {
                        this.level = e, this.from = t, this.to = n
                    }
                    return function(a, l) {
                        var s = "ltr" == l ? "L" : "R";
                        if (0 == a.length || "ltr" == l && !e.test(a)) return !1;
                        for (var c, u = a.length, d = [], h = 0; h < u; ++h) d.push((c = a.charCodeAt(h)) <= 247 ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(c) : 1424 <= c && c <= 1524 ? "R" : 1536 <= c && c <= 1785 ? "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(c - 1536) : 1774 <= c && c <= 2220 ? "r" : 8192 <= c && c <= 8203 ? "w" : 8204 == c ? "b" : "L");
                        for (var f = 0, p = s; f < u; ++f) {
                            var m = d[f];
                            "m" == m ? d[f] = p : p = m
                        }
                        for (var g = 0, v = s; g < u; ++g) {
                            var x = d[g];
                            "1" == x && "r" == v ? d[g] = "n" : n.test(x) && (v = x, "r" == x && (d[g] = "R"))
                        }
                        for (var y = 1, b = d[0]; y < u - 1; ++y) {
                            var k = d[y];
                            "+" == k && "1" == b && "1" == d[y + 1] ? d[y] = "1" : "," != k || b != d[y + 1] || "1" != b && "n" != b || (d[y] = b), b = k
                        }
                        for (var w = 0; w < u; ++w) {
                            var C = d[w];
                            if ("," == C) d[w] = "N";
                            else if ("%" == C) {
                                var S = void 0;
                                for (S = w + 1; S < u && "%" == d[S]; ++S);
                                for (var L = w && "!" == d[w - 1] || S < u && "1" == d[S] ? "1" : "N", T = w; T < S; ++T) d[T] = L;
                                w = S - 1
                            }
                        }
                        for (var M = 0, A = s; M < u; ++M) {
                            var N = d[M];
                            "L" == A && "1" == N ? d[M] = "L" : n.test(N) && (A = N)
                        }
                        for (var D = 0; D < u; ++D)
                            if (t.test(d[D])) {
                                var F = void 0;
                                for (F = D + 1; F < u && t.test(d[F]); ++F);
                                for (var E = "L" == (D ? d[D - 1] : s), O = E == ("L" == (F < u ? d[F] : s)) ? E ? "L" : "R" : s, I = D; I < F; ++I) d[I] = O;
                                D = F - 1
                            }
                        for (var z, H = [], R = 0; R < u;)
                            if (r.test(d[R])) {
                                var P = R;
                                for (++R; R < u && r.test(d[R]); ++R);
                                H.push(new o(0, P, R))
                            } else {
                                var _ = R,
                                    W = H.length,
                                    B = "rtl" == l ? 1 : 0;
                                for (++R; R < u && "L" != d[R]; ++R);
                                for (var j = _; j < R;)
                                    if (i.test(d[j])) {
                                        _ < j && (H.splice(W, 0, new o(1, _, j)), W += B);
                                        var q = j;
                                        for (++j; j < R && i.test(d[j]); ++j);
                                        H.splice(W, 0, new o(2, q, j)), W += B, _ = j
                                    } else ++j;
                                _ < R && H.splice(W, 0, new o(1, _, R))
                            }
                        return "ltr" == l && (1 == H[0].level && (z = a.match(/^\s+/)) && (H[0].from = z[0].length, H.unshift(new o(0, 0, z[0].length))), 1 == X(H).level && (z = a.match(/\s+$/)) && (X(H).to -= z[0].length, H.push(new o(0, u - z[0].length, u)))), "rtl" == l ? H.reverse() : H
                    }
                }();

                function ce(e, t) {
                    var n = e.order;
                    return null == n && (n = e.order = se(e.text, t)), n
                }
                var ue = [],
                    de = function(e, t, n) {
                        if (e.addEventListener) e.addEventListener(t, n, !1);
                        else if (e.attachEvent) e.attachEvent("on" + t, n);
                        else {
                            var r = e._handlers || (e._handlers = {});
                            r[t] = (r[t] || ue).concat(n)
                        }
                    };

                function he(e, t) {
                    return e._handlers && e._handlers[t] || ue
                }

                function fe(e, t, n) {
                    if (e.removeEventListener) e.removeEventListener(t, n, !1);
                    else if (e.detachEvent) e.detachEvent("on" + t, n);
                    else {
                        var r = e._handlers,
                            i = r && r[t];
                        if (i) {
                            var o = W(i, n);
                            o > -1 && (r[t] = i.slice(0, o).concat(i.slice(o + 1)))
                        }
                    }
                }

                function pe(e, t) {
                    var n = he(e, t);
                    if (n.length)
                        for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r)
                }

                function me(e, t, n) {
                    return "string" == typeof t && (t = {
                        type: t,
                        preventDefault: function() {
                            this.defaultPrevented = !0
                        }
                    }), pe(e, n || t.type, e, t), ke(t) || t.codemirrorIgnore
                }

                function ge(e) {
                    var t = e._handlers && e._handlers.cursorActivity;
                    if (t)
                        for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r) - 1 == W(n, t[r]) && n.push(t[r])
                }

                function ve(e, t) {
                    return he(e, t).length > 0
                }

                function xe(e) {
                    e.prototype.on = function(e, t) {
                        de(this, e, t)
                    }, e.prototype.off = function(e, t) {
                        fe(this, e, t)
                    }
                }

                function ye(e) {
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                }

                function be(e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }

                function ke(e) {
                    return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
                }

                function we(e) {
                    ye(e), be(e)
                }

                function Ce(e) {
                    return e.target || e.srcElement
                }

                function Se(e) {
                    var t = e.which;
                    return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), x && e.ctrlKey && 1 == t && (t = 3), t
                }
                var Le, Te, Me = function() {
                    if (a && l < 9) return !1;
                    var e = N("div");
                    return "draggable" in e || "dragDrop" in e
                }();

                function Ae(e) {
                    if (null == Le) {
                        var t = N("span", "​");
                        A(e, N("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Le = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(a && l < 8))
                    }
                    var n = Le ? N("span", "​") : N("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
                    return n.setAttribute("cm-text", ""), n
                }

                function Ne(e) {
                    if (null != Te) return Te;
                    var t = A(e, document.createTextNode("AخA")),
                        n = L(t, 0, 1).getBoundingClientRect(),
                        r = L(t, 1, 2).getBoundingClientRect();
                    return M(e), !(!n || n.left == n.right) && (Te = r.right - n.right < 3)
                }
                var De, Fe = 3 != "\n\nb".split(/\n/).length ? function(e) {
                        for (var t = 0, n = [], r = e.length; t <= r;) {
                            var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
                            var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                                a = o.indexOf("\r"); - 1 != a ? (n.push(o.slice(0, a)), t += a + 1) : (n.push(o), t = i + 1)
                        }
                        return n
                    } : function(e) {
                        return e.split(/\r\n?|\n/)
                    },
                    Ee = window.getSelection ? function(e) {
                        try {
                            return e.selectionStart != e.selectionEnd
                        } catch (e) {
                            return !1
                        }
                    } : function(e) {
                        var t;
                        try {
                            t = e.ownerDocument.selection.createRange()
                        } catch (e) {}
                        return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
                    },
                    Oe = "oncopy" in (De = N("div")) || (De.setAttribute("oncopy", "return;"), "function" == typeof De.oncopy),
                    Ie = null;
                var ze = {},
                    He = {};

                function Re(e, t) {
                    arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), ze[e] = t
                }

                function Pe(e) {
                    if ("string" == typeof e && He.hasOwnProperty(e)) e = He[e];
                    else if (e && "string" == typeof e.name && He.hasOwnProperty(e.name)) {
                        var t = He[e.name];
                        "string" == typeof t && (t = {
                            name: t
                        }), (e = Y(t, e)).name = t.name
                    } else {
                        if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return Pe("application/xml");
                        if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return Pe("application/json")
                    }
                    return "string" == typeof e ? {
                        name: e
                    } : e || {
                        name: "null"
                    }
                }

                function _e(e, t) {
                    t = Pe(t);
                    var n = ze[t.name];
                    if (!n) return _e(e, "text/plain");
                    var r = n(e, t);
                    if (We.hasOwnProperty(t.name)) {
                        var i = We[t.name];
                        for (var o in i) i.hasOwnProperty(o) && (r.hasOwnProperty(o) && (r["_" + o] = r[o]), r[o] = i[o])
                    }
                    if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps)
                        for (var a in t.modeProps) r[a] = t.modeProps[a];
                    return r
                }
                var We = {};

                function Be(e, t) {
                    R(t, We.hasOwnProperty(e) ? We[e] : We[e] = {})
                }

                function je(e, t) {
                    if (!0 === t) return t;
                    if (e.copyState) return e.copyState(t);
                    var n = {};
                    for (var r in t) {
                        var i = t[r];
                        i instanceof Array && (i = i.concat([])), n[r] = i
                    }
                    return n
                }

                function qe(e, t) {
                    for (var n; e.innerMode && (n = e.innerMode(t)) && n.mode != e;) t = n.state, e = n.mode;
                    return n || {
                        mode: e,
                        state: t
                    }
                }

                function Ue(e, t, n) {
                    return !e.startState || e.startState(t, n)
                }
                var $e = function(e, t, n) {
                    this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = n
                };

                function Ge(e, t) {
                    if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
                    for (var n = e; !n.lines;)
                        for (var r = 0;; ++r) {
                            var i = n.children[r],
                                o = i.chunkSize();
                            if (t < o) {
                                n = i;
                                break
                            }
                            t -= o
                        }
                    return n.lines[t]
                }

                function Ve(e, t, n) {
                    var r = [],
                        i = t.line;
                    return e.iter(t.line, n.line + 1, (function(e) {
                        var o = e.text;
                        i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i
                    })), r
                }

                function Xe(e, t, n) {
                    var r = [];
                    return e.iter(t, n, (function(e) {
                        r.push(e.text)
                    })), r
                }

                function Ke(e, t) {
                    var n = t - e.height;
                    if (n)
                        for (var r = e; r; r = r.parent) r.height += n
                }

                function Ze(e) {
                    if (null == e.parent) return null;
                    for (var t = e.parent, n = W(t.lines, e), r = t.parent; r; t = r, r = r.parent)
                        for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
                    return n + t.first
                }

                function Ye(e, t) {
                    var n = e.first;
                    e: do {
                        for (var r = 0; r < e.children.length; ++r) {
                            var i = e.children[r],
                                o = i.height;
                            if (t < o) {
                                e = i;
                                continue e
                            }
                            t -= o, n += i.chunkSize()
                        }
                        return n
                    } while (!e.lines);
                    for (var a = 0; a < e.lines.length; ++a) {
                        var l = e.lines[a].height;
                        if (t < l) break;
                        t -= l
                    }
                    return n + a
                }

                function Qe(e, t) {
                    return t >= e.first && t < e.first + e.size
                }

                function Je(e, t) {
                    return String(e.lineNumberFormatter(t + e.firstLineNumber))
                }

                function et(e, t, n) {
                    if (void 0 === n && (n = null), !(this instanceof et)) return new et(e, t, n);
                    this.line = e, this.ch = t, this.sticky = n
                }

                function tt(e, t) {
                    return e.line - t.line || e.ch - t.ch
                }

                function nt(e, t) {
                    return e.sticky == t.sticky && 0 == tt(e, t)
                }

                function rt(e) {
                    return et(e.line, e.ch)
                }

                function it(e, t) {
                    return tt(e, t) < 0 ? t : e
                }

                function ot(e, t) {
                    return tt(e, t) < 0 ? e : t
                }

                function at(e, t) {
                    return Math.max(e.first, Math.min(t, e.first + e.size - 1))
                }

                function lt(e, t) {
                    if (t.line < e.first) return et(e.first, 0);
                    var n = e.first + e.size - 1;
                    return t.line > n ? et(n, Ge(e, n).text.length) : function(e, t) {
                        var n = e.ch;
                        return null == n || n > t ? et(e.line, t) : n < 0 ? et(e.line, 0) : e
                    }(t, Ge(e, t.line).text.length)
                }

                function st(e, t) {
                    for (var n = [], r = 0; r < t.length; r++) n[r] = lt(e, t[r]);
                    return n
                }
                $e.prototype.eol = function() {
                    return this.pos >= this.string.length
                }, $e.prototype.sol = function() {
                    return this.pos == this.lineStart
                }, $e.prototype.peek = function() {
                    return this.string.charAt(this.pos) || void 0
                }, $e.prototype.next = function() {
                    if (this.pos < this.string.length) return this.string.charAt(this.pos++)
                }, $e.prototype.eat = function(e) {
                    var t = this.string.charAt(this.pos);
                    if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t
                }, $e.prototype.eatWhile = function(e) {
                    for (var t = this.pos; this.eat(e););
                    return this.pos > t
                }, $e.prototype.eatSpace = function() {
                    for (var e = this.pos;
                        /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
                    return this.pos > e
                }, $e.prototype.skipToEnd = function() {
                    this.pos = this.string.length
                }, $e.prototype.skipTo = function(e) {
                    var t = this.string.indexOf(e, this.pos);
                    if (t > -1) return this.pos = t, !0
                }, $e.prototype.backUp = function(e) {
                    this.pos -= e
                }, $e.prototype.column = function() {
                    return this.lastColumnPos < this.start && (this.lastColumnValue = P(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? P(this.string, this.lineStart, this.tabSize) : 0)
                }, $e.prototype.indentation = function() {
                    return P(this.string, null, this.tabSize) - (this.lineStart ? P(this.string, this.lineStart, this.tabSize) : 0)
                }, $e.prototype.match = function(e, t, n) {
                    if ("string" != typeof e) {
                        var r = this.string.slice(this.pos).match(e);
                        return r && r.index > 0 ? null : (r && !1 !== t && (this.pos += r[0].length), r)
                    }
                    var i = function(e) {
                        return n ? e.toLowerCase() : e
                    };
                    if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0
                }, $e.prototype.current = function() {
                    return this.string.slice(this.start, this.pos)
                }, $e.prototype.hideFirstChars = function(e, t) {
                    this.lineStart += e;
                    try {
                        return t()
                    } finally {
                        this.lineStart -= e
                    }
                }, $e.prototype.lookAhead = function(e) {
                    var t = this.lineOracle;
                    return t && t.lookAhead(e)
                }, $e.prototype.baseToken = function() {
                    var e = this.lineOracle;
                    return e && e.baseToken(this.pos)
                };
                var ct = function(e, t) {
                        this.state = e, this.lookAhead = t
                    },
                    ut = function(e, t, n, r) {
                        this.state = t, this.doc = e, this.line = n, this.maxLookAhead = r || 0, this.baseTokens = null, this.baseTokenPos = 1
                    };

                function dt(e, t, n, r) {
                    var i = [e.state.modeGen],
                        o = {};
                    bt(e, t.text, e.doc.mode, n, (function(e, t) {
                        return i.push(e, t)
                    }), o, r);
                    for (var a = n.state, l = function(r) {
                            n.baseTokens = i;
                            var l = e.state.overlays[r],
                                s = 1,
                                c = 0;
                            n.state = !0, bt(e, t.text, l.mode, n, (function(e, t) {
                                for (var n = s; c < e;) {
                                    var r = i[s];
                                    r > e && i.splice(s, 1, e, i[s + 1], r), s += 2, c = Math.min(e, r)
                                }
                                if (t)
                                    if (l.opaque) i.splice(n, s - n, e, "overlay " + t), s = n + 2;
                                    else
                                        for (; n < s; n += 2) {
                                            var o = i[n + 1];
                                            i[n + 1] = (o ? o + " " : "") + "overlay " + t
                                        }
                            }), o), n.state = a, n.baseTokens = null, n.baseTokenPos = 1
                        }, s = 0; s < e.state.overlays.length; ++s) l(s);
                    return {
                        styles: i,
                        classes: o.bgClass || o.textClass ? o : null
                    }
                }

                function ht(e, t, n) {
                    if (!t.styles || t.styles[0] != e.state.modeGen) {
                        var r = ft(e, Ze(t)),
                            i = t.text.length > e.options.maxHighlightLength && je(e.doc.mode, r.state),
                            o = dt(e, t, r);
                        i && (r.state = i), t.stateAfter = r.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier))
                    }
                    return t.styles
                }

                function ft(e, t, n) {
                    var r = e.doc,
                        i = e.display;
                    if (!r.mode.startState) return new ut(r, !0, t);
                    var o = function(e, t, n) {
                            for (var r, i, o = e.doc, a = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), l = t; l > a; --l) {
                                if (l <= o.first) return o.first;
                                var s = Ge(o, l - 1),
                                    c = s.stateAfter;
                                if (c && (!n || l + (c instanceof ct ? c.lookAhead : 0) <= o.modeFrontier)) return l;
                                var u = P(s.text, null, e.options.tabSize);
                                (null == i || r > u) && (i = l - 1, r = u)
                            }
                            return i
                        }(e, t, n),
                        a = o > r.first && Ge(r, o - 1).stateAfter,
                        l = a ? ut.fromSaved(r, a, o) : new ut(r, Ue(r.mode), o);
                    return r.iter(o, t, (function(n) {
                        pt(e, n.text, l);
                        var r = l.line;
                        n.stateAfter = r == t - 1 || r % 5 == 0 || r >= i.viewFrom && r < i.viewTo ? l.save() : null, l.nextLine()
                    })), n && (r.modeFrontier = l.line), l
                }

                function pt(e, t, n, r) {
                    var i = e.doc.mode,
                        o = new $e(t, e.options.tabSize, n);
                    for (o.start = o.pos = r || 0, "" == t && mt(i, n.state); !o.eol();) gt(i, o, n.state), o.start = o.pos
                }

                function mt(e, t) {
                    if (e.blankLine) return e.blankLine(t);
                    if (e.innerMode) {
                        var n = qe(e, t);
                        return n.mode.blankLine ? n.mode.blankLine(n.state) : void 0
                    }
                }

                function gt(e, t, n, r) {
                    for (var i = 0; i < 10; i++) {
                        r && (r[0] = qe(e, n).mode);
                        var o = e.token(t, n);
                        if (t.pos > t.start) return o
                    }
                    throw new Error("Mode " + e.name + " failed to advance stream.")
                }
                ut.prototype.lookAhead = function(e) {
                    var t = this.doc.getLine(this.line + e);
                    return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
                }, ut.prototype.baseToken = function(e) {
                    if (!this.baseTokens) return null;
                    for (; this.baseTokens[this.baseTokenPos] <= e;) this.baseTokenPos += 2;
                    var t = this.baseTokens[this.baseTokenPos + 1];
                    return {
                        type: t && t.replace(/( |^)overlay .*/, ""),
                        size: this.baseTokens[this.baseTokenPos] - e
                    }
                }, ut.prototype.nextLine = function() {
                    this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
                }, ut.fromSaved = function(e, t, n) {
                    return t instanceof ct ? new ut(e, je(e.mode, t.state), n, t.lookAhead) : new ut(e, je(e.mode, t), n)
                }, ut.prototype.save = function(e) {
                    var t = !1 !== e ? je(this.doc.mode, this.state) : this.state;
                    return this.maxLookAhead > 0 ? new ct(t, this.maxLookAhead) : t
                };
                var vt = function(e, t, n) {
                    this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = n
                };

                function xt(e, t, n, r) {
                    var i, o, a = e.doc,
                        l = a.mode,
                        s = Ge(a, (t = lt(a, t)).line),
                        c = ft(e, t.line, n),
                        u = new $e(s.text, e.options.tabSize, c);
                    for (r && (o = []);
                        (r || u.pos < t.ch) && !u.eol();) u.start = u.pos, i = gt(l, u, c.state), r && o.push(new vt(u, i, je(a.mode, c.state)));
                    return r ? o : new vt(u, i, c.state)
                }

                function yt(e, t) {
                    if (e)
                        for (;;) {
                            var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                            if (!n) break;
                            e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                            var r = n[1] ? "bgClass" : "textClass";
                            null == t[r] ? t[r] = n[2] : new RegExp("(?:^|\\s)" + n[2] + "(?:$|\\s)").test(t[r]) || (t[r] += " " + n[2])
                        }
                    return e
                }

                function bt(e, t, n, r, i, o, a) {
                    var l = n.flattenSpans;
                    null == l && (l = e.options.flattenSpans);
                    var s, c = 0,
                        u = null,
                        d = new $e(t, e.options.tabSize, r),
                        h = e.options.addModeClass && [null];
                    for ("" == t && yt(mt(n, r.state), o); !d.eol();) {
                        if (d.pos > e.options.maxHighlightLength ? (l = !1, a && pt(e, t, r, d.pos), d.pos = t.length, s = null) : s = yt(gt(n, d, r.state, h), o), h) {
                            var f = h[0].name;
                            f && (s = "m-" + (s ? f + " " + s : f))
                        }
                        if (!l || u != s) {
                            for (; c < d.start;) i(c = Math.min(d.start, c + 5e3), u);
                            u = s
                        }
                        d.start = d.pos
                    }
                    for (; c < d.pos;) {
                        var p = Math.min(d.pos, c + 5e3);
                        i(p, u), c = p
                    }
                }
                var kt = !1,
                    wt = !1;

                function Ct(e, t, n) {
                    this.marker = e, this.from = t, this.to = n
                }

                function St(e, t) {
                    if (e)
                        for (var n = 0; n < e.length; ++n) {
                            var r = e[n];
                            if (r.marker == t) return r
                        }
                }

                function Lt(e, t) {
                    for (var n, r = 0; r < e.length; ++r) e[r] != t && (n || (n = [])).push(e[r]);
                    return n
                }

                function Tt(e, t) {
                    if (t.full) return null;
                    var n = Qe(e, t.from.line) && Ge(e, t.from.line).markedSpans,
                        r = Qe(e, t.to.line) && Ge(e, t.to.line).markedSpans;
                    if (!n && !r) return null;
                    var i = t.from.ch,
                        o = t.to.ch,
                        a = 0 == tt(t.from, t.to),
                        l = function(e, t, n) {
                            var r;
                            if (e)
                                for (var i = 0; i < e.length; ++i) {
                                    var o = e[i],
                                        a = o.marker;
                                    if (null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t) || o.from == t && "bookmark" == a.type && (!n || !o.marker.insertLeft)) {
                                        var l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                                        (r || (r = [])).push(new Ct(a, o.from, l ? null : o.to))
                                    }
                                }
                            return r
                        }(n, i, a),
                        s = function(e, t, n) {
                            var r;
                            if (e)
                                for (var i = 0; i < e.length; ++i) {
                                    var o = e[i],
                                        a = o.marker;
                                    if (null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t) || o.from == t && "bookmark" == a.type && (!n || o.marker.insertLeft)) {
                                        var l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                                        (r || (r = [])).push(new Ct(a, l ? null : o.from - t, null == o.to ? null : o.to - t))
                                    }
                                }
                            return r
                        }(r, o, a),
                        c = 1 == t.text.length,
                        u = X(t.text).length + (c ? i : 0);
                    if (l)
                        for (var d = 0; d < l.length; ++d) {
                            var h = l[d];
                            if (null == h.to) {
                                var f = St(s, h.marker);
                                f ? c && (h.to = null == f.to ? null : f.to + u) : h.to = i
                            }
                        }
                    if (s)
                        for (var p = 0; p < s.length; ++p) {
                            var m = s[p];
                            if (null != m.to && (m.to += u), null == m.from) St(l, m.marker) || (m.from = u, c && (l || (l = [])).push(m));
                            else m.from += u, c && (l || (l = [])).push(m)
                        }
                    l && (l = Mt(l)), s && s != l && (s = Mt(s));
                    var g = [l];
                    if (!c) {
                        var v, x = t.text.length - 2;
                        if (x > 0 && l)
                            for (var y = 0; y < l.length; ++y) null == l[y].to && (v || (v = [])).push(new Ct(l[y].marker, null, null));
                        for (var b = 0; b < x; ++b) g.push(v);
                        g.push(s)
                    }
                    return g
                }

                function Mt(e) {
                    for (var t = 0; t < e.length; ++t) {
                        var n = e[t];
                        null != n.from && n.from == n.to && !1 !== n.marker.clearWhenEmpty && e.splice(t--, 1)
                    }
                    return e.length ? e : null
                }

                function At(e) {
                    var t = e.markedSpans;
                    if (t) {
                        for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
                        e.markedSpans = null
                    }
                }

                function Nt(e, t) {
                    if (t) {
                        for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
                        e.markedSpans = t
                    }
                }

                function Dt(e) {
                    return e.inclusiveLeft ? -1 : 0
                }

                function Ft(e) {
                    return e.inclusiveRight ? 1 : 0
                }

                function Et(e, t) {
                    var n = e.lines.length - t.lines.length;
                    if (0 != n) return n;
                    var r = e.find(),
                        i = t.find(),
                        o = tt(r.from, i.from) || Dt(e) - Dt(t);
                    if (o) return -o;
                    var a = tt(r.to, i.to) || Ft(e) - Ft(t);
                    return a || t.id - e.id
                }

                function Ot(e, t) {
                    var n, r = wt && e.markedSpans;
                    if (r)
                        for (var i = void 0, o = 0; o < r.length; ++o)(i = r[o]).marker.collapsed && null == (t ? i.from : i.to) && (!n || Et(n, i.marker) < 0) && (n = i.marker);
                    return n
                }

                function It(e) {
                    return Ot(e, !0)
                }

                function zt(e) {
                    return Ot(e, !1)
                }

                function Ht(e, t) {
                    var n, r = wt && e.markedSpans;
                    if (r)
                        for (var i = 0; i < r.length; ++i) {
                            var o = r[i];
                            o.marker.collapsed && (null == o.from || o.from < t) && (null == o.to || o.to > t) && (!n || Et(n, o.marker) < 0) && (n = o.marker)
                        }
                    return n
                }

                function Rt(e, t, n, r, i) {
                    var o = Ge(e, t),
                        a = wt && o.markedSpans;
                    if (a)
                        for (var l = 0; l < a.length; ++l) {
                            var s = a[l];
                            if (s.marker.collapsed) {
                                var c = s.marker.find(0),
                                    u = tt(c.from, n) || Dt(s.marker) - Dt(i),
                                    d = tt(c.to, r) || Ft(s.marker) - Ft(i);
                                if (!(u >= 0 && d <= 0 || u <= 0 && d >= 0) && (u <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? tt(c.to, n) >= 0 : tt(c.to, n) > 0) || u >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? tt(c.from, r) <= 0 : tt(c.from, r) < 0))) return !0
                            }
                        }
                }

                function Pt(e) {
                    for (var t; t = It(e);) e = t.find(-1, !0).line;
                    return e
                }

                function _t(e, t) {
                    var n = Ge(e, t),
                        r = Pt(n);
                    return n == r ? t : Ze(r)
                }

                function Wt(e, t) {
                    if (t > e.lastLine()) return t;
                    var n, r = Ge(e, t);
                    if (!Bt(e, r)) return t;
                    for (; n = zt(r);) r = n.find(1, !0).line;
                    return Ze(r) + 1
                }

                function Bt(e, t) {
                    var n = wt && t.markedSpans;
                    if (n)
                        for (var r = void 0, i = 0; i < n.length; ++i)
                            if ((r = n[i]).marker.collapsed) {
                                if (null == r.from) return !0;
                                if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && jt(e, t, r)) return !0
                            }
                }

                function jt(e, t, n) {
                    if (null == n.to) {
                        var r = n.marker.find(1, !0);
                        return jt(e, r.line, St(r.line.markedSpans, n.marker))
                    }
                    if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
                    for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
                        if ((i = t.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && jt(e, t, i)) return !0
                }

                function qt(e) {
                    for (var t = 0, n = (e = Pt(e)).parent, r = 0; r < n.lines.length; ++r) {
                        var i = n.lines[r];
                        if (i == e) break;
                        t += i.height
                    }
                    for (var o = n.parent; o; o = (n = o).parent)
                        for (var a = 0; a < o.children.length; ++a) {
                            var l = o.children[a];
                            if (l == n) break;
                            t += l.height
                        }
                    return t
                }

                function Ut(e) {
                    if (0 == e.height) return 0;
                    for (var t, n = e.text.length, r = e; t = It(r);) {
                        var i = t.find(0, !0);
                        r = i.from.line, n += i.from.ch - i.to.ch
                    }
                    for (r = e; t = zt(r);) {
                        var o = t.find(0, !0);
                        n -= r.text.length - o.from.ch, n += (r = o.to.line).text.length - o.to.ch
                    }
                    return n
                }

                function $t(e) {
                    var t = e.display,
                        n = e.doc;
                    t.maxLine = Ge(n, n.first), t.maxLineLength = Ut(t.maxLine), t.maxLineChanged = !0, n.iter((function(e) {
                        var n = Ut(e);
                        n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e)
                    }))
                }
                var Gt = function(e, t, n) {
                    this.text = e, Nt(this, t), this.height = n ? n(this) : 1
                };

                function Vt(e) {
                    e.parent = null, At(e)
                }
                Gt.prototype.lineNo = function() {
                    return Ze(this)
                }, xe(Gt);
                var Xt = {},
                    Kt = {};

                function Zt(e, t) {
                    if (!e || /^\s*$/.test(e)) return null;
                    var n = t.addModeClass ? Kt : Xt;
                    return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"))
                }

                function Yt(e, t) {
                    var n = D("span", null, null, s ? "padding-right: .1px" : null),
                        r = {
                            pre: D("pre", [n], "CodeMirror-line"),
                            content: n,
                            col: 0,
                            pos: 0,
                            cm: e,
                            trailingSpace: !1,
                            splitSpaces: e.getOption("lineWrapping")
                        };
                    t.measure = {};
                    for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
                        var o = i ? t.rest[i - 1] : t.line,
                            a = void 0;
                        r.pos = 0, r.addToken = Jt, Ne(e.display.measure) && (a = ce(o, e.doc.direction)) && (r.addToken = en(r.addToken, a)), r.map = [], nn(o, r, ht(e, o, t != e.display.externalMeasured && Ze(o))), o.styleClasses && (o.styleClasses.bgClass && (r.bgClass = I(o.styleClasses.bgClass, r.bgClass || "")), o.styleClasses.textClass && (r.textClass = I(o.styleClasses.textClass, r.textClass || ""))), 0 == r.map.length && r.map.push(0, 0, r.content.appendChild(Ae(e.display.measure))), 0 == i ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}))
                    }
                    if (s) {
                        var l = r.content.lastChild;
                        (/\bcm-tab\b/.test(l.className) || l.querySelector && l.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack")
                    }
                    return pe(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = I(r.pre.className, r.textClass || "")), r
                }

                function Qt(e) {
                    var t = N("span", "•", "cm-invalidchar");
                    return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
                }

                function Jt(e, t, n, r, i, o, s) {
                    if (t) {
                        var c, u = e.splitSpaces ? function(e, t) {
                                if (e.length > 1 && !/  /.test(e)) return e;
                                for (var n = t, r = "", i = 0; i < e.length; i++) {
                                    var o = e.charAt(i);
                                    " " != o || !n || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = " "), r += o, n = " " == o
                                }
                                return r
                            }(t, e.trailingSpace) : t,
                            d = e.cm.state.specialChars,
                            h = !1;
                        if (d.test(t)) {
                            c = document.createDocumentFragment();
                            for (var f = 0;;) {
                                d.lastIndex = f;
                                var p = d.exec(t),
                                    m = p ? p.index - f : t.length - f;
                                if (m) {
                                    var g = document.createTextNode(u.slice(f, f + m));
                                    a && l < 9 ? c.appendChild(N("span", [g])) : c.appendChild(g), e.map.push(e.pos, e.pos + m, g), e.col += m, e.pos += m
                                }
                                if (!p) break;
                                f += m + 1;
                                var v = void 0;
                                if ("\t" == p[0]) {
                                    var x = e.cm.options.tabSize,
                                        y = x - e.col % x;
                                    (v = c.appendChild(N("span", V(y), "cm-tab"))).setAttribute("role", "presentation"), v.setAttribute("cm-text", "\t"), e.col += y
                                } else "\r" == p[0] || "\n" == p[0] ? ((v = c.appendChild(N("span", "\r" == p[0] ? "␍" : "␤", "cm-invalidchar"))).setAttribute("cm-text", p[0]), e.col += 1) : ((v = e.cm.options.specialCharPlaceholder(p[0])).setAttribute("cm-text", p[0]), a && l < 9 ? c.appendChild(N("span", [v])) : c.appendChild(v), e.col += 1);
                                e.map.push(e.pos, e.pos + 1, v), e.pos++
                            }
                        } else e.col += t.length, c = document.createTextNode(u), e.map.push(e.pos, e.pos + t.length, c), a && l < 9 && (h = !0), e.pos += t.length;
                        if (e.trailingSpace = 32 == u.charCodeAt(t.length - 1), n || r || i || h || o) {
                            var b = n || "";
                            r && (b += r), i && (b += i);
                            var k = N("span", [c], b, o);
                            if (s)
                                for (var w in s) s.hasOwnProperty(w) && "style" != w && "class" != w && k.setAttribute(w, s[w]);
                            return e.content.appendChild(k)
                        }
                        e.content.appendChild(c)
                    }
                }

                function en(e, t) {
                    return function(n, r, i, o, a, l, s) {
                        i = i ? i + " cm-force-border" : "cm-force-border";
                        for (var c = n.pos, u = c + r.length;;) {
                            for (var d = void 0, h = 0; h < t.length && !((d = t[h]).to > c && d.from <= c); h++);
                            if (d.to >= u) return e(n, r, i, o, a, l, s);
                            e(n, r.slice(0, d.to - c), i, o, null, l, s), o = null, r = r.slice(d.to - c), c = d.to
                        }
                    }
                }

                function tn(e, t, n, r) {
                    var i = !r && n.widgetNode;
                    i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1
                }

                function nn(e, t, n) {
                    var r = e.markedSpans,
                        i = e.text,
                        o = 0;
                    if (r)
                        for (var a, l, s, c, u, d, h, f = i.length, p = 0, m = 1, g = "", v = 0;;) {
                            if (v == p) {
                                s = c = u = l = "", h = null, d = null, v = 1 / 0;
                                for (var x = [], y = void 0, b = 0; b < r.length; ++b) {
                                    var k = r[b],
                                        w = k.marker;
                                    if ("bookmark" == w.type && k.from == p && w.widgetNode) x.push(w);
                                    else if (k.from <= p && (null == k.to || k.to > p || w.collapsed && k.to == p && k.from == p)) {
                                        if (null != k.to && k.to != p && v > k.to && (v = k.to, c = ""), w.className && (s += " " + w.className), w.css && (l = (l ? l + ";" : "") + w.css), w.startStyle && k.from == p && (u += " " + w.startStyle), w.endStyle && k.to == v && (y || (y = [])).push(w.endStyle, k.to), w.title && ((h || (h = {})).title = w.title), w.attributes)
                                            for (var C in w.attributes)(h || (h = {}))[C] = w.attributes[C];
                                        w.collapsed && (!d || Et(d.marker, w) < 0) && (d = k)
                                    } else k.from > p && v > k.from && (v = k.from)
                                }
                                if (y)
                                    for (var S = 0; S < y.length; S += 2) y[S + 1] == v && (c += " " + y[S]);
                                if (!d || d.from == p)
                                    for (var L = 0; L < x.length; ++L) tn(t, 0, x[L]);
                                if (d && (d.from || 0) == p) {
                                    if (tn(t, (null == d.to ? f + 1 : d.to) - p, d.marker, null == d.from), null == d.to) return;
                                    d.to == p && (d = !1)
                                }
                            }
                            if (p >= f) break;
                            for (var T = Math.min(f, v);;) {
                                if (g) {
                                    var M = p + g.length;
                                    if (!d) {
                                        var A = M > T ? g.slice(0, T - p) : g;
                                        t.addToken(t, A, a ? a + s : s, u, p + A.length == v ? c : "", l, h)
                                    }
                                    if (M >= T) {
                                        g = g.slice(T - p), p = T;
                                        break
                                    }
                                    p = M, u = ""
                                }
                                g = i.slice(o, o = n[m++]), a = Zt(n[m++], t.cm.options)
                            }
                        } else
                            for (var N = 1; N < n.length; N += 2) t.addToken(t, i.slice(o, o = n[N]), Zt(n[N + 1], t.cm.options))
                }

                function rn(e, t, n) {
                    this.line = t, this.rest = function(e) {
                        for (var t, n; t = zt(e);) e = t.find(1, !0).line, (n || (n = [])).push(e);
                        return n
                    }(t), this.size = this.rest ? Ze(X(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = Bt(e, t)
                }

                function on(e, t, n) {
                    for (var r, i = [], o = t; o < n; o = r) {
                        var a = new rn(e.doc, Ge(e.doc, o), o);
                        r = o + a.size, i.push(a)
                    }
                    return i
                }
                var an = null;
                var ln = null;

                function sn(e, t) {
                    var n = he(e, t);
                    if (n.length) {
                        var r, i = Array.prototype.slice.call(arguments, 2);
                        an ? r = an.delayedCallbacks : ln ? r = ln : (r = ln = [], setTimeout(cn, 0));
                        for (var o = function(e) {
                                r.push((function() {
                                    return n[e].apply(null, i)
                                }))
                            }, a = 0; a < n.length; ++a) o(a)
                    }
                }

                function cn() {
                    var e = ln;
                    ln = null;
                    for (var t = 0; t < e.length; ++t) e[t]()
                }

                function un(e, t, n, r) {
                    for (var i = 0; i < t.changes.length; i++) {
                        var o = t.changes[i];
                        "text" == o ? fn(e, t) : "gutter" == o ? mn(e, t, n, r) : "class" == o ? pn(e, t) : "widget" == o && gn(e, t, r)
                    }
                    t.changes = null
                }

                function dn(e) {
                    return e.node == e.text && (e.node = N("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), a && l < 8 && (e.node.style.zIndex = 2)), e.node
                }

                function hn(e, t) {
                    var n = e.display.externalMeasured;
                    return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : Yt(e, t)
                }

                function fn(e, t) {
                    var n = t.text.className,
                        r = hn(e, t);
                    t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, pn(e, t)) : n && (t.text.className = n)
                }

                function pn(e, t) {
                    ! function(e, t) {
                        var n = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
                        if (n && (n += " CodeMirror-linebackground"), t.background) n ? t.background.className = n : (t.background.parentNode.removeChild(t.background), t.background = null);
                        else if (n) {
                            var r = dn(t);
                            t.background = r.insertBefore(N("div", null, n), r.firstChild), e.display.input.setUneditable(t.background)
                        }
                    }(e, t), t.line.wrapClass ? dn(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
                    var n = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
                    t.text.className = n || ""
                }

                function mn(e, t, n, r) {
                    if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
                        var i = dn(t);
                        t.gutterBackground = N("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text)
                    }
                    var o = t.line.gutterMarkers;
                    if (e.options.lineNumbers || o) {
                        var a = dn(t),
                            l = t.gutter = N("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
                        if (e.display.input.setUneditable(l), a.insertBefore(l, t.text), t.line.gutterClass && (l.className += " " + t.line.gutterClass), !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = l.appendChild(N("div", Je(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), o)
                            for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
                                var c = e.display.gutterSpecs[s].className,
                                    u = o.hasOwnProperty(c) && o[c];
                                u && l.appendChild(N("div", [u], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[c] + "px; width: " + r.gutterWidth[c] + "px"))
                            }
                    }
                }

                function gn(e, t, n) {
                    t.alignable && (t.alignable = null);
                    for (var r = S("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o) o = i.nextSibling, r.test(i.className) && t.node.removeChild(i);
                    xn(e, t, n)
                }

                function vn(e, t, n, r) {
                    var i = hn(e, t);
                    return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), pn(e, t), mn(e, t, n, r), xn(e, t, r), t.node
                }

                function xn(e, t, n) {
                    if (yn(e, t.line, t, n, !0), t.rest)
                        for (var r = 0; r < t.rest.length; r++) yn(e, t.rest[r], t, n, !1)
                }

                function yn(e, t, n, r, i) {
                    if (t.widgets)
                        for (var o = dn(n), a = 0, l = t.widgets; a < l.length; ++a) {
                            var s = l[a],
                                c = N("div", [s.node], "CodeMirror-linewidget" + (s.className ? " " + s.className : ""));
                            s.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), bn(s, c, n, r), e.display.input.setUneditable(c), i && s.above ? o.insertBefore(c, n.gutter || n.text) : o.appendChild(c), sn(s, "redraw")
                        }
                }

                function bn(e, t, n, r) {
                    if (e.noHScroll) {
                        (n.alignable || (n.alignable = [])).push(t);
                        var i = r.wrapperWidth;
                        t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px"
                    }
                    e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"))
                }

                function kn(e) {
                    if (null != e.height) return e.height;
                    var t = e.doc.cm;
                    if (!t) return 0;
                    if (!F(document.body, e.node)) {
                        var n = "position: relative;";
                        e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), A(t.display.measure, N("div", [e.node], null, n))
                    }
                    return e.height = e.node.parentNode.offsetHeight
                }

                function wn(e, t) {
                    for (var n = Ce(t); n != e.wrapper; n = n.parentNode)
                        if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover) return !0
                }

                function Cn(e) {
                    return e.lineSpace.offsetTop
                }

                function Sn(e) {
                    return e.mover.offsetHeight - e.lineSpace.offsetHeight
                }

                function Ln(e) {
                    if (e.cachedPaddingH) return e.cachedPaddingH;
                    var t = A(e.measure, N("pre", "x", "CodeMirror-line-like")),
                        n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
                        r = {
                            left: parseInt(n.paddingLeft),
                            right: parseInt(n.paddingRight)
                        };
                    return isNaN(r.left) || isNaN(r.right) || (e.cachedPaddingH = r), r
                }

                function Tn(e) {
                    return 50 - e.display.nativeBarWidth
                }

                function Mn(e) {
                    return e.display.scroller.clientWidth - Tn(e) - e.display.barWidth
                }

                function An(e) {
                    return e.display.scroller.clientHeight - Tn(e) - e.display.barHeight
                }

                function Nn(e, t, n) {
                    if (e.line == t) return {
                        map: e.measure.map,
                        cache: e.measure.cache
                    };
                    for (var r = 0; r < e.rest.length; r++)
                        if (e.rest[r] == t) return {
                            map: e.measure.maps[r],
                            cache: e.measure.caches[r]
                        };
                    for (var i = 0; i < e.rest.length; i++)
                        if (Ze(e.rest[i]) > n) return {
                            map: e.measure.maps[i],
                            cache: e.measure.caches[i],
                            before: !0
                        }
                }

                function Dn(e, t, n, r) {
                    return On(e, En(e, t), n, r)
                }

                function Fn(e, t) {
                    if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[ur(e, t)];
                    var n = e.display.externalMeasured;
                    return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0
                }

                function En(e, t) {
                    var n = Ze(t),
                        r = Fn(e, n);
                    r && !r.text ? r = null : r && r.changes && (un(e, r, n, or(e)), e.curOp.forceUpdate = !0), r || (r = function(e, t) {
                        var n = Ze(t = Pt(t)),
                            r = e.display.externalMeasured = new rn(e.doc, t, n);
                        r.lineN = n;
                        var i = r.built = Yt(e, r);
                        return r.text = i.pre, A(e.display.lineMeasure, i.pre), r
                    }(e, t));
                    var i = Nn(r, t, n);
                    return {
                        line: t,
                        view: r,
                        rect: null,
                        map: i.map,
                        cache: i.cache,
                        before: i.before,
                        hasHeights: !1
                    }
                }

                function On(e, t, n, r, i) {
                    t.before && (n = -1);
                    var o, s = n + (r || "");
                    return t.cache.hasOwnProperty(s) ? o = t.cache[s] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (! function(e, t, n) {
                        var r = e.options.lineWrapping,
                            i = r && Mn(e);
                        if (!t.measure.heights || r && t.measure.width != i) {
                            var o = t.measure.heights = [];
                            if (r) {
                                t.measure.width = i;
                                for (var a = t.text.firstChild.getClientRects(), l = 0; l < a.length - 1; l++) {
                                    var s = a[l],
                                        c = a[l + 1];
                                    Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - n.top)
                                }
                            }
                            o.push(n.bottom - n.top)
                        }
                    }(e, t.view, t.rect), t.hasHeights = !0), (o = function(e, t, n, r) {
                        var i, o = Hn(t.map, n, r),
                            s = o.node,
                            c = o.start,
                            u = o.end,
                            d = o.collapse;
                        if (3 == s.nodeType) {
                            for (var h = 0; h < 4; h++) {
                                for (; c && re(t.line.text.charAt(o.coverStart + c));) --c;
                                for (; o.coverStart + u < o.coverEnd && re(t.line.text.charAt(o.coverStart + u));) ++u;
                                if ((i = a && l < 9 && 0 == c && u == o.coverEnd - o.coverStart ? s.parentNode.getBoundingClientRect() : Rn(L(s, c, u).getClientRects(), r)).left || i.right || 0 == c) break;
                                u = c, c -= 1, d = "right"
                            }
                            a && l < 11 && (i = function(e, t) {
                                if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || ! function(e) {
                                        if (null != Ie) return Ie;
                                        var t = A(e, N("span", "x")),
                                            n = t.getBoundingClientRect(),
                                            r = L(t, 0, 1).getBoundingClientRect();
                                        return Ie = Math.abs(n.left - r.left) > 1
                                    }(e)) return t;
                                var n = screen.logicalXDPI / screen.deviceXDPI,
                                    r = screen.logicalYDPI / screen.deviceYDPI;
                                return {
                                    left: t.left * n,
                                    right: t.right * n,
                                    top: t.top * r,
                                    bottom: t.bottom * r
                                }
                            }(e.display.measure, i))
                        } else {
                            var f;
                            c > 0 && (d = r = "right"), i = e.options.lineWrapping && (f = s.getClientRects()).length > 1 ? f["right" == r ? f.length - 1 : 0] : s.getBoundingClientRect()
                        }
                        if (a && l < 9 && !c && (!i || !i.left && !i.right)) {
                            var p = s.parentNode.getClientRects()[0];
                            i = p ? {
                                left: p.left,
                                right: p.left + ir(e.display),
                                top: p.top,
                                bottom: p.bottom
                            } : zn
                        }
                        for (var m = i.top - t.rect.top, g = i.bottom - t.rect.top, v = (m + g) / 2, x = t.view.measure.heights, y = 0; y < x.length - 1 && !(v < x[y]); y++);
                        var b = y ? x[y - 1] : 0,
                            k = x[y],
                            w = {
                                left: ("right" == d ? i.right : i.left) - t.rect.left,
                                right: ("left" == d ? i.left : i.right) - t.rect.left,
                                top: b,
                                bottom: k
                            };
                        i.left || i.right || (w.bogus = !0);
                        e.options.singleCursorHeightPerLine || (w.rtop = m, w.rbottom = g);
                        return w
                    }(e, t, n, r)).bogus || (t.cache[s] = o)), {
                        left: o.left,
                        right: o.right,
                        top: i ? o.rtop : o.top,
                        bottom: i ? o.rbottom : o.bottom
                    }
                }
                var In, zn = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                };

                function Hn(e, t, n) {
                    for (var r, i, o, a, l, s, c = 0; c < e.length; c += 3)
                        if (l = e[c], s = e[c + 1], t < l ? (i = 0, o = 1, a = "left") : t < s ? o = (i = t - l) + 1 : (c == e.length - 3 || t == s && e[c + 3] > t) && (i = (o = s - l) - 1, t >= s && (a = "right")), null != i) {
                            if (r = e[c + 2], l == s && n == (r.insertLeft ? "left" : "right") && (a = n), "left" == n && 0 == i)
                                for (; c && e[c - 2] == e[c - 3] && e[c - 1].insertLeft;) r = e[2 + (c -= 3)], a = "left";
                            if ("right" == n && i == s - l)
                                for (; c < e.length - 3 && e[c + 3] == e[c + 4] && !e[c + 5].insertLeft;) r = e[(c += 3) + 2], a = "right";
                            break
                        }
                    return {
                        node: r,
                        start: i,
                        end: o,
                        collapse: a,
                        coverStart: l,
                        coverEnd: s
                    }
                }

                function Rn(e, t) {
                    var n = zn;
                    if ("left" == t)
                        for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++);
                    else
                        for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--);
                    return n
                }

                function Pn(e) {
                    if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
                        for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
                }

                function _n(e) {
                    e.display.externalMeasure = null, M(e.display.lineMeasure);
                    for (var t = 0; t < e.display.view.length; t++) Pn(e.display.view[t])
                }

                function Wn(e) {
                    _n(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
                }

                function Bn() {
                    return u && g ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft
                }

                function jn() {
                    return u && g ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop
                }

                function qn(e) {
                    var t = 0;
                    if (e.widgets)
                        for (var n = 0; n < e.widgets.length; ++n) e.widgets[n].above && (t += kn(e.widgets[n]));
                    return t
                }

                function Un(e, t, n, r, i) {
                    if (!i) {
                        var o = qn(t);
                        n.top += o, n.bottom += o
                    }
                    if ("line" == r) return n;
                    r || (r = "local");
                    var a = qt(t);
                    if ("local" == r ? a += Cn(e.display) : a -= e.display.viewOffset, "page" == r || "window" == r) {
                        var l = e.display.lineSpace.getBoundingClientRect();
                        a += l.top + ("window" == r ? 0 : jn());
                        var s = l.left + ("window" == r ? 0 : Bn());
                        n.left += s, n.right += s
                    }
                    return n.top += a, n.bottom += a, n
                }

                function $n(e, t, n) {
                    if ("div" == n) return t;
                    var r = t.left,
                        i = t.top;
                    if ("page" == n) r -= Bn(), i -= jn();
                    else if ("local" == n || !n) {
                        var o = e.display.sizer.getBoundingClientRect();
                        r += o.left, i += o.top
                    }
                    var a = e.display.lineSpace.getBoundingClientRect();
                    return {
                        left: r - a.left,
                        top: i - a.top
                    }
                }

                function Gn(e, t, n, r, i) {
                    return r || (r = Ge(e.doc, t.line)), Un(e, r, Dn(e, r, t.ch, i), n)
                }

                function Vn(e, t, n, r, i, o) {
                    function a(t, a) {
                        var l = On(e, i, t, a ? "right" : "left", o);
                        return a ? l.left = l.right : l.right = l.left, Un(e, r, l, n)
                    }
                    r = r || Ge(e.doc, t.line), i || (i = En(e, r));
                    var l = ce(r, e.doc.direction),
                        s = t.ch,
                        c = t.sticky;
                    if (s >= r.text.length ? (s = r.text.length, c = "before") : s <= 0 && (s = 0, c = "after"), !l) return a("before" == c ? s - 1 : s, "before" == c);

                    function u(e, t, n) {
                        return a(n ? e - 1 : e, 1 == l[t].level != n)
                    }
                    var d = le(l, s, c),
                        h = ae,
                        f = u(s, d, "before" == c);
                    return null != h && (f.other = u(s, h, "before" != c)), f
                }

                function Xn(e, t) {
                    var n = 0;
                    t = lt(e.doc, t), e.options.lineWrapping || (n = ir(e.display) * t.ch);
                    var r = Ge(e.doc, t.line),
                        i = qt(r) + Cn(e.display);
                    return {
                        left: n,
                        right: n,
                        top: i,
                        bottom: i + r.height
                    }
                }

                function Kn(e, t, n, r, i) {
                    var o = et(e, t, n);
                    return o.xRel = i, r && (o.outside = r), o
                }

                function Zn(e, t, n) {
                    var r = e.doc;
                    if ((n += e.display.viewOffset) < 0) return Kn(r.first, 0, null, -1, -1);
                    var i = Ye(r, n),
                        o = r.first + r.size - 1;
                    if (i > o) return Kn(r.first + r.size - 1, Ge(r, o).text.length, null, 1, 1);
                    t < 0 && (t = 0);
                    for (var a = Ge(r, i);;) {
                        var l = er(e, a, i, t, n),
                            s = Ht(a, l.ch + (l.xRel > 0 || l.outside > 0 ? 1 : 0));
                        if (!s) return l;
                        var c = s.find(1);
                        if (c.line == i) return c;
                        a = Ge(r, i = c.line)
                    }
                }

                function Yn(e, t, n, r) {
                    r -= qn(t);
                    var i = t.text.length,
                        o = oe((function(t) {
                            return On(e, n, t - 1).bottom <= r
                        }), i, 0);
                    return {
                        begin: o,
                        end: i = oe((function(t) {
                            return On(e, n, t).top > r
                        }), o, i)
                    }
                }

                function Qn(e, t, n, r) {
                    return n || (n = En(e, t)), Yn(e, t, n, Un(e, t, On(e, n, r), "line").top)
                }

                function Jn(e, t, n, r) {
                    return !(e.bottom <= n) && (e.top > n || (r ? e.left : e.right) > t)
                }

                function er(e, t, n, r, i) {
                    i -= qt(t);
                    var o = En(e, t),
                        a = qn(t),
                        l = 0,
                        s = t.text.length,
                        c = !0,
                        u = ce(t, e.doc.direction);
                    if (u) {
                        var d = (e.options.lineWrapping ? nr : tr)(e, t, n, o, u, r, i);
                        l = (c = 1 != d.level) ? d.from : d.to - 1, s = c ? d.to : d.from - 1
                    }
                    var h, f, p = null,
                        m = null,
                        g = oe((function(t) {
                            var n = On(e, o, t);
                            return n.top += a, n.bottom += a, !!Jn(n, r, i, !1) && (n.top <= i && n.left <= r && (p = t, m = n), !0)
                        }), l, s),
                        v = !1;
                    if (m) {
                        var x = r - m.left < m.right - r,
                            y = x == c;
                        g = p + (y ? 0 : 1), f = y ? "after" : "before", h = x ? m.left : m.right
                    } else {
                        c || g != s && g != l || g++, f = 0 == g ? "after" : g == t.text.length ? "before" : On(e, o, g - (c ? 1 : 0)).bottom + a <= i == c ? "after" : "before";
                        var b = Vn(e, et(n, g, f), "line", t, o);
                        h = b.left, v = i < b.top ? -1 : i >= b.bottom ? 1 : 0
                    }
                    return Kn(n, g = ie(t.text, g, 1), f, v, r - h)
                }

                function tr(e, t, n, r, i, o, a) {
                    var l = oe((function(l) {
                            var s = i[l],
                                c = 1 != s.level;
                            return Jn(Vn(e, et(n, c ? s.to : s.from, c ? "before" : "after"), "line", t, r), o, a, !0)
                        }), 0, i.length - 1),
                        s = i[l];
                    if (l > 0) {
                        var c = 1 != s.level,
                            u = Vn(e, et(n, c ? s.from : s.to, c ? "after" : "before"), "line", t, r);
                        Jn(u, o, a, !0) && u.top > a && (s = i[l - 1])
                    }
                    return s
                }

                function nr(e, t, n, r, i, o, a) {
                    var l = Yn(e, t, r, a),
                        s = l.begin,
                        c = l.end;
                    /\s/.test(t.text.charAt(c - 1)) && c--;
                    for (var u = null, d = null, h = 0; h < i.length; h++) {
                        var f = i[h];
                        if (!(f.from >= c || f.to <= s)) {
                            var p = On(e, r, 1 != f.level ? Math.min(c, f.to) - 1 : Math.max(s, f.from)).right,
                                m = p < o ? o - p + 1e9 : p - o;
                            (!u || d > m) && (u = f, d = m)
                        }
                    }
                    return u || (u = i[i.length - 1]), u.from < s && (u = {
                        from: s,
                        to: u.to,
                        level: u.level
                    }), u.to > c && (u = {
                        from: u.from,
                        to: c,
                        level: u.level
                    }), u
                }

                function rr(e) {
                    if (null != e.cachedTextHeight) return e.cachedTextHeight;
                    if (null == In) {
                        In = N("pre", null, "CodeMirror-line-like");
                        for (var t = 0; t < 49; ++t) In.appendChild(document.createTextNode("x")), In.appendChild(N("br"));
                        In.appendChild(document.createTextNode("x"))
                    }
                    A(e.measure, In);
                    var n = In.offsetHeight / 50;
                    return n > 3 && (e.cachedTextHeight = n), M(e.measure), n || 1
                }

                function ir(e) {
                    if (null != e.cachedCharWidth) return e.cachedCharWidth;
                    var t = N("span", "xxxxxxxxxx"),
                        n = N("pre", [t], "CodeMirror-line-like");
                    A(e.measure, n);
                    var r = t.getBoundingClientRect(),
                        i = (r.right - r.left) / 10;
                    return i > 2 && (e.cachedCharWidth = i), i || 10
                }

                function or(e) {
                    for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, ++a) {
                        var l = e.display.gutterSpecs[a].className;
                        n[l] = o.offsetLeft + o.clientLeft + i, r[l] = o.clientWidth
                    }
                    return {
                        fixedPos: ar(t),
                        gutterTotalWidth: t.gutters.offsetWidth,
                        gutterLeft: n,
                        gutterWidth: r,
                        wrapperWidth: t.wrapper.clientWidth
                    }
                }

                function ar(e) {
                    return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
                }

                function lr(e) {
                    var t = rr(e.display),
                        n = e.options.lineWrapping,
                        r = n && Math.max(5, e.display.scroller.clientWidth / ir(e.display) - 3);
                    return function(i) {
                        if (Bt(e.doc, i)) return 0;
                        var o = 0;
                        if (i.widgets)
                            for (var a = 0; a < i.widgets.length; a++) i.widgets[a].height && (o += i.widgets[a].height);
                        return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t
                    }
                }

                function sr(e) {
                    var t = e.doc,
                        n = lr(e);
                    t.iter((function(e) {
                        var t = n(e);
                        t != e.height && Ke(e, t)
                    }))
                }

                function cr(e, t, n, r) {
                    var i = e.display;
                    if (!n && "true" == Ce(t).getAttribute("cm-not-content")) return null;
                    var o, a, l = i.lineSpace.getBoundingClientRect();
                    try {
                        o = t.clientX - l.left, a = t.clientY - l.top
                    } catch (e) {
                        return null
                    }
                    var s, c = Zn(e, o, a);
                    if (r && c.xRel > 0 && (s = Ge(e.doc, c.line).text).length == c.ch) {
                        var u = P(s, s.length, e.options.tabSize) - s.length;
                        c = et(c.line, Math.max(0, Math.round((o - Ln(e.display).left) / ir(e.display)) - u))
                    }
                    return c
                }

                function ur(e, t) {
                    if (t >= e.display.viewTo) return null;
                    if ((t -= e.display.viewFrom) < 0) return null;
                    for (var n = e.display.view, r = 0; r < n.length; r++)
                        if ((t -= n[r].size) < 0) return r
                }

                function dr(e, t, n, r) {
                    null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0);
                    var i = e.display;
                    if (r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) wt && _t(e.doc, t) < i.viewTo && fr(e);
                    else if (n <= i.viewFrom) wt && Wt(e.doc, n + r) > i.viewFrom ? fr(e) : (i.viewFrom += r, i.viewTo += r);
                    else if (t <= i.viewFrom && n >= i.viewTo) fr(e);
                    else if (t <= i.viewFrom) {
                        var o = pr(e, n, n + r, 1);
                        o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : fr(e)
                    } else if (n >= i.viewTo) {
                        var a = pr(e, t, t, -1);
                        a ? (i.view = i.view.slice(0, a.index), i.viewTo = a.lineN) : fr(e)
                    } else {
                        var l = pr(e, t, t, -1),
                            s = pr(e, n, n + r, 1);
                        l && s ? (i.view = i.view.slice(0, l.index).concat(on(e, l.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += r) : fr(e)
                    }
                    var c = i.externalMeasured;
                    c && (n < c.lineN ? c.lineN += r : t < c.lineN + c.size && (i.externalMeasured = null))
                }

                function hr(e, t, n) {
                    e.curOp.viewChanged = !0;
                    var r = e.display,
                        i = e.display.externalMeasured;
                    if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
                        var o = r.view[ur(e, t)];
                        if (null != o.node) {
                            var a = o.changes || (o.changes = []); - 1 == W(a, n) && a.push(n)
                        }
                    }
                }

                function fr(e) {
                    e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
                }

                function pr(e, t, n, r) {
                    var i, o = ur(e, t),
                        a = e.display.view;
                    if (!wt || n == e.doc.first + e.doc.size) return {
                        index: o,
                        lineN: n
                    };
                    for (var l = e.display.viewFrom, s = 0; s < o; s++) l += a[s].size;
                    if (l != t) {
                        if (r > 0) {
                            if (o == a.length - 1) return null;
                            i = l + a[o].size - t, o++
                        } else i = l - t;
                        t += i, n += i
                    }
                    for (; _t(e.doc, n) != n;) {
                        if (o == (r < 0 ? 0 : a.length - 1)) return null;
                        n += r * a[o - (r < 0 ? 1 : 0)].size, o += r
                    }
                    return {
                        index: o,
                        lineN: n
                    }
                }

                function mr(e) {
                    for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.hidden || i.node && !i.changes || ++n
                    }
                    return n
                }

                function gr(e) {
                    e.display.input.showSelection(e.display.input.prepareSelection())
                }

                function vr(e, t) {
                    void 0 === t && (t = !0);
                    for (var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), a = 0; a < n.sel.ranges.length; a++)
                        if (t || a != n.sel.primIndex) {
                            var l = n.sel.ranges[a];
                            if (!(l.from().line >= e.display.viewTo || l.to().line < e.display.viewFrom)) {
                                var s = l.empty();
                                (s || e.options.showCursorWhenSelecting) && xr(e, l.head, i), s || br(e, l, o)
                            }
                        }
                    return r
                }

                function xr(e, t, n) {
                    var r = Vn(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
                        i = n.appendChild(N("div", " ", "CodeMirror-cursor"));
                    if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", r.other) {
                        var o = n.appendChild(N("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
                        o.style.display = "", o.style.left = r.other.left + "px", o.style.top = r.other.top + "px", o.style.height = .85 * (r.other.bottom - r.other.top) + "px"
                    }
                }

                function yr(e, t) {
                    return e.top - t.top || e.left - t.left
                }

                function br(e, t, n) {
                    var r = e.display,
                        i = e.doc,
                        o = document.createDocumentFragment(),
                        a = Ln(e.display),
                        l = a.left,
                        s = Math.max(r.sizerWidth, Mn(e) - r.sizer.offsetLeft) - a.right,
                        c = "ltr" == i.direction;

                    function u(e, t, n, r) {
                        t < 0 && (t = 0), t = Math.round(t), r = Math.round(r), o.appendChild(N("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == n ? s - e : n) + "px;\n                             height: " + (r - t) + "px"))
                    }

                    function d(t, n, r) {
                        var o, a, d = Ge(i, t),
                            h = d.text.length;

                        function f(n, r) {
                            return Gn(e, et(t, n), "div", d, r)
                        }

                        function p(t, n, r) {
                            var i = Qn(e, d, null, t),
                                o = "ltr" == n == ("after" == r) ? "left" : "right";
                            return f("after" == r ? i.begin : i.end - (/\s/.test(d.text.charAt(i.end - 1)) ? 2 : 1), o)[o]
                        }
                        var m = ce(d, i.direction);
                        return function(e, t, n, r) {
                            if (!e) return r(t, n, "ltr", 0);
                            for (var i = !1, o = 0; o < e.length; ++o) {
                                var a = e[o];
                                (a.from < n && a.to > t || t == n && a.to == t) && (r(Math.max(a.from, t), Math.min(a.to, n), 1 == a.level ? "rtl" : "ltr", o), i = !0)
                            }
                            i || r(t, n, "ltr")
                        }(m, n || 0, null == r ? h : r, (function(e, t, i, d) {
                            var g = "ltr" == i,
                                v = f(e, g ? "left" : "right"),
                                x = f(t - 1, g ? "right" : "left"),
                                y = null == n && 0 == e,
                                b = null == r && t == h,
                                k = 0 == d,
                                w = !m || d == m.length - 1;
                            if (x.top - v.top <= 3) {
                                var C = (c ? b : y) && w,
                                    S = (c ? y : b) && k ? l : (g ? v : x).left,
                                    L = C ? s : (g ? x : v).right;
                                u(S, v.top, L - S, v.bottom)
                            } else {
                                var T, M, A, N;
                                g ? (T = c && y && k ? l : v.left, M = c ? s : p(e, i, "before"), A = c ? l : p(t, i, "after"), N = c && b && w ? s : x.right) : (T = c ? p(e, i, "before") : l, M = !c && y && k ? s : v.right, A = !c && b && w ? l : x.left, N = c ? p(t, i, "after") : s), u(T, v.top, M - T, v.bottom), v.bottom < x.top && u(l, v.bottom, null, x.top), u(A, x.top, N - A, x.bottom)
                            }(!o || yr(v, o) < 0) && (o = v), yr(x, o) < 0 && (o = x), (!a || yr(v, a) < 0) && (a = v), yr(x, a) < 0 && (a = x)
                        })), {
                            start: o,
                            end: a
                        }
                    }
                    var h = t.from(),
                        f = t.to();
                    if (h.line == f.line) d(h.line, h.ch, f.ch);
                    else {
                        var p = Ge(i, h.line),
                            m = Ge(i, f.line),
                            g = Pt(p) == Pt(m),
                            v = d(h.line, h.ch, g ? p.text.length + 1 : null).end,
                            x = d(f.line, g ? 0 : null, f.ch).start;
                        g && (v.top < x.top - 2 ? (u(v.right, v.top, null, v.bottom), u(l, x.top, x.left, x.bottom)) : u(v.right, v.top, x.left - v.right, v.bottom)), v.bottom < x.top && u(l, v.bottom, null, x.top)
                    }
                    n.appendChild(o)
                }

                function kr(e) {
                    if (e.state.focused) {
                        var t = e.display;
                        clearInterval(t.blinker);
                        var n = !0;
                        t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval((function() {
                            return t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden"
                        }), e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
                    }
                }

                function wr(e) {
                    e.state.focused || (e.display.input.focus(), Sr(e))
                }

                function Cr(e) {
                    e.state.delayingBlurEvent = !0, setTimeout((function() {
                        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, Lr(e))
                    }), 100)
                }

                function Sr(e, t) {
                    e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (pe(e, "focus", e, t), e.state.focused = !0, O(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), s && setTimeout((function() {
                        return e.display.input.reset(!0)
                    }), 20)), e.display.input.receivedFocus()), kr(e))
                }

                function Lr(e, t) {
                    e.state.delayingBlurEvent || (e.state.focused && (pe(e, "blur", e, t), e.state.focused = !1, T(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout((function() {
                        e.state.focused || (e.display.shift = !1)
                    }), 150))
                }

                function Tr(e) {
                    for (var t = e.display, n = t.lineDiv.offsetTop, r = 0; r < t.view.length; r++) {
                        var i = t.view[r],
                            o = e.options.lineWrapping,
                            s = void 0,
                            c = 0;
                        if (!i.hidden) {
                            if (a && l < 8) {
                                var u = i.node.offsetTop + i.node.offsetHeight;
                                s = u - n, n = u
                            } else {
                                var d = i.node.getBoundingClientRect();
                                s = d.bottom - d.top, !o && i.text.firstChild && (c = i.text.firstChild.getBoundingClientRect().right - d.left - 1)
                            }
                            var h = i.line.height - s;
                            if ((h > .005 || h < -.005) && (Ke(i.line, s), Mr(i.line), i.rest))
                                for (var f = 0; f < i.rest.length; f++) Mr(i.rest[f]);
                            if (c > e.display.sizerWidth) {
                                var p = Math.ceil(c / ir(e.display));
                                p > e.display.maxLineLength && (e.display.maxLineLength = p, e.display.maxLine = i.line, e.display.maxLineChanged = !0)
                            }
                        }
                    }
                }

                function Mr(e) {
                    if (e.widgets)
                        for (var t = 0; t < e.widgets.length; ++t) {
                            var n = e.widgets[t],
                                r = n.node.parentNode;
                            r && (n.height = r.offsetHeight)
                        }
                }

                function Ar(e, t, n) {
                    var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
                    r = Math.floor(r - Cn(e));
                    var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight,
                        o = Ye(t, r),
                        a = Ye(t, i);
                    if (n && n.ensure) {
                        var l = n.ensure.from.line,
                            s = n.ensure.to.line;
                        l < o ? (o = l, a = Ye(t, qt(Ge(t, l)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= a && (o = Ye(t, qt(Ge(t, s)) - e.wrapper.clientHeight), a = s)
                    }
                    return {
                        from: o,
                        to: Math.max(a, o + 1)
                    }
                }

                function Nr(e, t) {
                    var n = e.display,
                        r = rr(e.display);
                    t.top < 0 && (t.top = 0);
                    var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : n.scroller.scrollTop,
                        o = An(e),
                        a = {};
                    t.bottom - t.top > o && (t.bottom = t.top + o);
                    var l = e.doc.height + Sn(n),
                        s = t.top < r,
                        c = t.bottom > l - r;
                    if (t.top < i) a.scrollTop = s ? 0 : t.top;
                    else if (t.bottom > i + o) {
                        var u = Math.min(t.top, (c ? l : t.bottom) - o);
                        u != i && (a.scrollTop = u)
                    }
                    var d = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : n.scroller.scrollLeft,
                        h = Mn(e) - (e.options.fixedGutter ? n.gutters.offsetWidth : 0),
                        f = t.right - t.left > h;
                    return f && (t.right = t.left + h), t.left < 10 ? a.scrollLeft = 0 : t.left < d ? a.scrollLeft = Math.max(0, t.left - (f ? 0 : 10)) : t.right > h + d - 3 && (a.scrollLeft = t.right + (f ? 0 : 10) - h), a
                }

                function Dr(e, t) {
                    null != t && (Or(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t)
                }

                function Fr(e) {
                    Or(e);
                    var t = e.getCursor();
                    e.curOp.scrollToPos = {
                        from: t,
                        to: t,
                        margin: e.options.cursorScrollMargin
                    }
                }

                function Er(e, t, n) {
                    null == t && null == n || Or(e), null != t && (e.curOp.scrollLeft = t), null != n && (e.curOp.scrollTop = n)
                }

                function Or(e) {
                    var t = e.curOp.scrollToPos;
                    t && (e.curOp.scrollToPos = null, Ir(e, Xn(e, t.from), Xn(e, t.to), t.margin))
                }

                function Ir(e, t, n, r) {
                    var i = Nr(e, {
                        left: Math.min(t.left, n.left),
                        top: Math.min(t.top, n.top) - r,
                        right: Math.max(t.right, n.right),
                        bottom: Math.max(t.bottom, n.bottom) + r
                    });
                    Er(e, i.scrollLeft, i.scrollTop)
                }

                function zr(e, t) {
                    Math.abs(e.doc.scrollTop - t) < 2 || (n || si(e, {
                        top: t
                    }), Hr(e, t, !0), n && si(e), ri(e, 100))
                }

                function Hr(e, t, n) {
                    t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), (e.display.scroller.scrollTop != t || n) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t))
                }

                function Rr(e, t, n, r) {
                    t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r || (e.doc.scrollLeft = t, di(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
                }

                function Pr(e) {
                    var t = e.display,
                        n = t.gutters.offsetWidth,
                        r = Math.round(e.doc.height + Sn(e.display));
                    return {
                        clientHeight: t.scroller.clientHeight,
                        viewHeight: t.wrapper.clientHeight,
                        scrollWidth: t.scroller.scrollWidth,
                        clientWidth: t.scroller.clientWidth,
                        viewWidth: t.wrapper.clientWidth,
                        barLeft: e.options.fixedGutter ? n : 0,
                        docHeight: r,
                        scrollHeight: r + Tn(e) + t.barHeight,
                        nativeBarWidth: t.nativeBarWidth,
                        gutterWidth: n
                    }
                }
                var _r = function(e, t, n) {
                    this.cm = n;
                    var r = this.vert = N("div", [N("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
                        i = this.horiz = N("div", [N("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
                    r.tabIndex = i.tabIndex = -1, e(r), e(i), de(r, "scroll", (function() {
                        r.clientHeight && t(r.scrollTop, "vertical")
                    })), de(i, "scroll", (function() {
                        i.clientWidth && t(i.scrollLeft, "horizontal")
                    })), this.checkedZeroWidth = !1, a && l < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
                };
                _r.prototype.update = function(e) {
                    var t = e.scrollWidth > e.clientWidth + 1,
                        n = e.scrollHeight > e.clientHeight + 1,
                        r = e.nativeBarWidth;
                    if (n) {
                        this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
                        var i = e.viewHeight - (t ? r : 0);
                        this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
                    } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
                    if (t) {
                        this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
                        var o = e.viewWidth - e.barLeft - (n ? r : 0);
                        this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px"
                    } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
                    return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == r && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
                        right: n ? r : 0,
                        bottom: t ? r : 0
                    }
                }, _r.prototype.setScrollLeft = function(e) {
                    this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
                }, _r.prototype.setScrollTop = function(e) {
                    this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
                }, _r.prototype.zeroWidthHack = function() {
                    var e = x && !f ? "12px" : "18px";
                    this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new _, this.disableVert = new _
                }, _r.prototype.enableZeroWidthBar = function(e, t, n) {
                    e.style.pointerEvents = "auto", t.set(1e3, (function r() {
                        var i = e.getBoundingClientRect();
                        ("vert" == n ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, r)
                    }))
                }, _r.prototype.clear = function() {
                    var e = this.horiz.parentNode;
                    e.removeChild(this.horiz), e.removeChild(this.vert)
                };
                var Wr = function() {};

                function Br(e, t) {
                    t || (t = Pr(e));
                    var n = e.display.barWidth,
                        r = e.display.barHeight;
                    jr(e, t);
                    for (var i = 0; i < 4 && n != e.display.barWidth || r != e.display.barHeight; i++) n != e.display.barWidth && e.options.lineWrapping && Tr(e), jr(e, Pr(e)), n = e.display.barWidth, r = e.display.barHeight
                }

                function jr(e, t) {
                    var n = e.display,
                        r = n.scrollbars.update(t);
                    n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = ""
                }
                Wr.prototype.update = function() {
                    return {
                        bottom: 0,
                        right: 0
                    }
                }, Wr.prototype.setScrollLeft = function() {}, Wr.prototype.setScrollTop = function() {}, Wr.prototype.clear = function() {};
                var qr = {
                    native: _r,
                    null: Wr
                };

                function Ur(e) {
                    e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && T(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new qr[e.options.scrollbarStyle]((function(t) {
                        e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), de(t, "mousedown", (function() {
                            e.state.focused && setTimeout((function() {
                                return e.display.input.focus()
                            }), 0)
                        })), t.setAttribute("cm-not-content", "true")
                    }), (function(t, n) {
                        "horizontal" == n ? Rr(e, t) : zr(e, t)
                    }), e), e.display.scrollbars.addClass && O(e.display.wrapper, e.display.scrollbars.addClass)
                }
                var $r = 0;

                function Gr(e) {
                    var t;
                    e.curOp = {
                        cm: e,
                        viewChanged: !1,
                        startHeight: e.doc.height,
                        forceUpdate: !1,
                        updateInput: 0,
                        typing: !1,
                        changeObjs: null,
                        cursorActivityHandlers: null,
                        cursorActivityCalled: 0,
                        selectionChanged: !1,
                        updateMaxLine: !1,
                        scrollLeft: null,
                        scrollTop: null,
                        scrollToPos: null,
                        focus: !1,
                        id: ++$r
                    }, t = e.curOp, an ? an.ops.push(t) : t.ownsGroup = an = {
                        ops: [t],
                        delayedCallbacks: []
                    }
                }

                function Vr(e) {
                    var t = e.curOp;
                    t && function(e, t) {
                        var n = e.ownsGroup;
                        if (n) try {
                            ! function(e) {
                                var t = e.delayedCallbacks,
                                    n = 0;
                                do {
                                    for (; n < t.length; n++) t[n].call(null);
                                    for (var r = 0; r < e.ops.length; r++) {
                                        var i = e.ops[r];
                                        if (i.cursorActivityHandlers)
                                            for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
                                    }
                                } while (n < t.length)
                            }(n)
                        } finally {
                            an = null, t(n)
                        }
                    }(t, (function(e) {
                        for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
                        ! function(e) {
                            for (var t = e.ops, n = 0; n < t.length; n++) Xr(t[n]);
                            for (var r = 0; r < t.length; r++) Kr(t[r]);
                            for (var i = 0; i < t.length; i++) Zr(t[i]);
                            for (var o = 0; o < t.length; o++) Yr(t[o]);
                            for (var a = 0; a < t.length; a++) Qr(t[a])
                        }(e)
                    }))
                }

                function Xr(e) {
                    var t = e.cm,
                        n = t.display;
                    ! function(e) {
                        var t = e.display;
                        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Tn(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Tn(e) + "px", t.scrollbarsClipped = !0)
                    }(t), e.updateMaxLine && $t(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new oi(t, e.mustUpdate && {
                        top: e.scrollTop,
                        ensure: e.scrollToPos
                    }, e.forceUpdate)
                }

                function Kr(e) {
                    e.updatedDisplay = e.mustUpdate && ai(e.cm, e.update)
                }

                function Zr(e) {
                    var t = e.cm,
                        n = t.display;
                    e.updatedDisplay && Tr(t), e.barMeasure = Pr(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Dn(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Tn(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Mn(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection())
                }

                function Yr(e) {
                    var t = e.cm;
                    null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && Rr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
                    var n = e.focus && e.focus == E();
                    e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && Br(t, e.barMeasure), e.updatedDisplay && ui(t, e.barMeasure), e.selectionChanged && kr(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), n && wr(e.cm)
                }

                function Qr(e) {
                    var t = e.cm,
                        n = t.display,
                        r = t.doc;
                    (e.updatedDisplay && li(t, e.update), null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null), null != e.scrollTop && Hr(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && Rr(t, e.scrollLeft, !0, !0), e.scrollToPos) && function(e, t) {
                        if (!me(e, "scrollCursorIntoView")) {
                            var n = e.display,
                                r = n.sizer.getBoundingClientRect(),
                                i = null;
                            if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !p) {
                                var o = N("div", "​", null, "position: absolute;\n                         top: " + (t.top - n.viewOffset - Cn(e.display)) + "px;\n                         height: " + (t.bottom - t.top + Tn(e) + n.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
                                e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o)
                            }
                        }
                    }(t, function(e, t, n, r) {
                        var i;
                        null == r && (r = 0), e.options.lineWrapping || t != n || (n = "before" == (t = t.ch ? et(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t).sticky ? et(t.line, t.ch + 1, "before") : t);
                        for (var o = 0; o < 5; o++) {
                            var a = !1,
                                l = Vn(e, t),
                                s = n && n != t ? Vn(e, n) : l,
                                c = Nr(e, i = {
                                    left: Math.min(l.left, s.left),
                                    top: Math.min(l.top, s.top) - r,
                                    right: Math.max(l.left, s.left),
                                    bottom: Math.max(l.bottom, s.bottom) + r
                                }),
                                u = e.doc.scrollTop,
                                d = e.doc.scrollLeft;
                            if (null != c.scrollTop && (zr(e, c.scrollTop), Math.abs(e.doc.scrollTop - u) > 1 && (a = !0)), null != c.scrollLeft && (Rr(e, c.scrollLeft), Math.abs(e.doc.scrollLeft - d) > 1 && (a = !0)), !a) break
                        }
                        return i
                    }(t, lt(r, e.scrollToPos.from), lt(r, e.scrollToPos.to), e.scrollToPos.margin));
                    var i = e.maybeHiddenMarkers,
                        o = e.maybeUnhiddenMarkers;
                    if (i)
                        for (var a = 0; a < i.length; ++a) i[a].lines.length || pe(i[a], "hide");
                    if (o)
                        for (var l = 0; l < o.length; ++l) o[l].lines.length && pe(o[l], "unhide");
                    n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && pe(t, "changes", t, e.changeObjs), e.update && e.update.finish()
                }

                function Jr(e, t) {
                    if (e.curOp) return t();
                    Gr(e);
                    try {
                        return t()
                    } finally {
                        Vr(e)
                    }
                }

                function ei(e, t) {
                    return function() {
                        if (e.curOp) return t.apply(e, arguments);
                        Gr(e);
                        try {
                            return t.apply(e, arguments)
                        } finally {
                            Vr(e)
                        }
                    }
                }

                function ti(e) {
                    return function() {
                        if (this.curOp) return e.apply(this, arguments);
                        Gr(this);
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            Vr(this)
                        }
                    }
                }

                function ni(e) {
                    return function() {
                        var t = this.cm;
                        if (!t || t.curOp) return e.apply(this, arguments);
                        Gr(t);
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            Vr(t)
                        }
                    }
                }

                function ri(e, t) {
                    e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, H(ii, e))
                }

                function ii(e) {
                    var t = e.doc;
                    if (!(t.highlightFrontier >= e.display.viewTo)) {
                        var n = +new Date + e.options.workTime,
                            r = ft(e, t.highlightFrontier),
                            i = [];
                        t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), (function(o) {
                            if (r.line >= e.display.viewFrom) {
                                var a = o.styles,
                                    l = o.text.length > e.options.maxHighlightLength ? je(t.mode, r.state) : null,
                                    s = dt(e, o, r, !0);
                                l && (r.state = l), o.styles = s.styles;
                                var c = o.styleClasses,
                                    u = s.classes;
                                u ? o.styleClasses = u : c && (o.styleClasses = null);
                                for (var d = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), h = 0; !d && h < a.length; ++h) d = a[h] != o.styles[h];
                                d && i.push(r.line), o.stateAfter = r.save(), r.nextLine()
                            } else o.text.length <= e.options.maxHighlightLength && pt(e, o.text, r), o.stateAfter = r.line % 5 == 0 ? r.save() : null, r.nextLine();
                            if (+new Date > n) return ri(e, e.options.workDelay), !0
                        })), t.highlightFrontier = r.line, t.modeFrontier = Math.max(t.modeFrontier, r.line), i.length && Jr(e, (function() {
                            for (var t = 0; t < i.length; t++) hr(e, i[t], "text")
                        }))
                    }
                }
                var oi = function(e, t, n) {
                    var r = e.display;
                    this.viewport = t, this.visible = Ar(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = Mn(e), this.force = n, this.dims = or(e), this.events = []
                };

                function ai(e, t) {
                    var n = e.display,
                        r = e.doc;
                    if (t.editorIsHidden) return fr(e), !1;
                    if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == mr(e)) return !1;
                    hi(e) && (fr(e), t.dims = or(e));
                    var i = r.first + r.size,
                        o = Math.max(t.visible.from - e.options.viewportMargin, r.first),
                        a = Math.min(i, t.visible.to + e.options.viewportMargin);
                    n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)), n.viewTo > a && n.viewTo - a < 20 && (a = Math.min(i, n.viewTo)), wt && (o = _t(e.doc, o), a = Wt(e.doc, a));
                    var l = o != n.viewFrom || a != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
                    ! function(e, t, n) {
                        var r = e.display;
                        0 == r.view.length || t >= r.viewTo || n <= r.viewFrom ? (r.view = on(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = on(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(ur(e, t))), r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(on(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, ur(e, n)))), r.viewTo = n
                    }(e, o, a), n.viewOffset = qt(Ge(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
                    var c = mr(e);
                    if (!l && 0 == c && !t.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)) return !1;
                    var u = function(e) {
                        if (e.hasFocus()) return null;
                        var t = E();
                        if (!t || !F(e.display.lineDiv, t)) return null;
                        var n = {
                            activeElt: t
                        };
                        if (window.getSelection) {
                            var r = window.getSelection();
                            r.anchorNode && r.extend && F(e.display.lineDiv, r.anchorNode) && (n.anchorNode = r.anchorNode, n.anchorOffset = r.anchorOffset, n.focusNode = r.focusNode, n.focusOffset = r.focusOffset)
                        }
                        return n
                    }(e);
                    return c > 4 && (n.lineDiv.style.display = "none"),
                        function(e, t, n) {
                            var r = e.display,
                                i = e.options.lineNumbers,
                                o = r.lineDiv,
                                a = o.firstChild;

                            function l(t) {
                                var n = t.nextSibling;
                                return s && x && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), n
                            }
                            for (var c = r.view, u = r.viewFrom, d = 0; d < c.length; d++) {
                                var h = c[d];
                                if (h.hidden);
                                else if (h.node && h.node.parentNode == o) {
                                    for (; a != h.node;) a = l(a);
                                    var f = i && null != t && t <= u && h.lineNumber;
                                    h.changes && (W(h.changes, "gutter") > -1 && (f = !1), un(e, h, u, n)), f && (M(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(Je(e.options, u)))), a = h.node.nextSibling
                                } else {
                                    var p = vn(e, h, u, n);
                                    o.insertBefore(p, a)
                                }
                                u += h.size
                            }
                            for (; a;) a = l(a)
                        }(e, n.updateLineNumbers, t.dims), c > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view,
                        function(e) {
                            if (e && e.activeElt && e.activeElt != E() && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && F(document.body, e.anchorNode) && F(document.body, e.focusNode))) {
                                var t = window.getSelection(),
                                    n = document.createRange();
                                n.setEnd(e.anchorNode, e.anchorOffset), n.collapse(!1), t.removeAllRanges(), t.addRange(n), t.extend(e.focusNode, e.focusOffset)
                            }
                        }(u), M(n.cursorDiv), M(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, l && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, ri(e, 400)), n.updateLineNumbers = null, !0
                }

                function li(e, t) {
                    for (var n = t.viewport, r = !0;; r = !1) {
                        if (r && e.options.lineWrapping && t.oldDisplayWidth != Mn(e)) r && (t.visible = Ar(e.display, e.doc, n));
                        else if (n && null != n.top && (n = {
                                top: Math.min(e.doc.height + Sn(e.display) - An(e), n.top)
                            }), t.visible = Ar(e.display, e.doc, n), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo) break;
                        if (!ai(e, t)) break;
                        Tr(e);
                        var i = Pr(e);
                        gr(e), Br(e, i), ui(e, i), t.force = !1
                    }
                    t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
                }

                function si(e, t) {
                    var n = new oi(e, t);
                    if (ai(e, n)) {
                        Tr(e), li(e, n);
                        var r = Pr(e);
                        gr(e), Br(e, r), ui(e, r), n.finish()
                    }
                }

                function ci(e) {
                    var t = e.gutters.offsetWidth;
                    e.sizer.style.marginLeft = t + "px"
                }

                function ui(e, t) {
                    e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Tn(e) + "px"
                }

                function di(e) {
                    var t = e.display,
                        n = t.view;
                    if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
                        for (var r = ar(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", a = 0; a < n.length; a++)
                            if (!n[a].hidden) {
                                e.options.fixedGutter && (n[a].gutter && (n[a].gutter.style.left = o), n[a].gutterBackground && (n[a].gutterBackground.style.left = o));
                                var l = n[a].alignable;
                                if (l)
                                    for (var s = 0; s < l.length; s++) l[s].style.left = o
                            }
                        e.options.fixedGutter && (t.gutters.style.left = r + i + "px")
                    }
                }

                function hi(e) {
                    if (!e.options.lineNumbers) return !1;
                    var t = e.doc,
                        n = Je(e.options, t.first + t.size - 1),
                        r = e.display;
                    if (n.length != r.lineNumChars) {
                        var i = r.measure.appendChild(N("div", [N("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                            o = i.firstChild.offsetWidth,
                            a = i.offsetWidth - o;
                        return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - a) + 1, r.lineNumWidth = r.lineNumInnerWidth + a, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", ci(e.display), !0
                    }
                    return !1
                }

                function fi(e, t) {
                    for (var n = [], r = !1, i = 0; i < e.length; i++) {
                        var o = e[i],
                            a = null;
                        if ("string" != typeof o && (a = o.style, o = o.className), "CodeMirror-linenumbers" == o) {
                            if (!t) continue;
                            r = !0
                        }
                        n.push({
                            className: o,
                            style: a
                        })
                    }
                    return t && !r && n.push({
                        className: "CodeMirror-linenumbers",
                        style: null
                    }), n
                }

                function pi(e) {
                    var t = e.gutters,
                        n = e.gutterSpecs;
                    M(t), e.lineGutter = null;
                    for (var r = 0; r < n.length; ++r) {
                        var i = n[r],
                            o = i.className,
                            a = i.style,
                            l = t.appendChild(N("div", null, "CodeMirror-gutter " + o));
                        a && (l.style.cssText = a), "CodeMirror-linenumbers" == o && (e.lineGutter = l, l.style.width = (e.lineNumWidth || 1) + "px")
                    }
                    t.style.display = n.length ? "" : "none", ci(e)
                }

                function mi(e) {
                    pi(e.display), dr(e), di(e)
                }

                function gi(e, t, r, i) {
                    var o = this;
                    this.input = r, o.scrollbarFiller = N("div", null, "CodeMirror-scrollbar-filler"), o.scrollbarFiller.setAttribute("cm-not-content", "true"), o.gutterFiller = N("div", null, "CodeMirror-gutter-filler"), o.gutterFiller.setAttribute("cm-not-content", "true"), o.lineDiv = D("div", null, "CodeMirror-code"), o.selectionDiv = N("div", null, null, "position: relative; z-index: 1"), o.cursorDiv = N("div", null, "CodeMirror-cursors"), o.measure = N("div", null, "CodeMirror-measure"), o.lineMeasure = N("div", null, "CodeMirror-measure"), o.lineSpace = D("div", [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, "position: relative; outline: none");
                    var c = D("div", [o.lineSpace], "CodeMirror-lines");
                    o.mover = N("div", [c], null, "position: relative"), o.sizer = N("div", [o.mover], "CodeMirror-sizer"), o.sizerWidth = null, o.heightForcer = N("div", null, null, "position: absolute; height: 50px; width: 1px;"), o.gutters = N("div", null, "CodeMirror-gutters"), o.lineGutter = null, o.scroller = N("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll"), o.scroller.setAttribute("tabIndex", "-1"), o.wrapper = N("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror"), a && l < 8 && (o.gutters.style.zIndex = -1, o.scroller.style.paddingRight = 0), s || n && v || (o.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)), o.viewFrom = o.viewTo = t.first, o.reportedViewFrom = o.reportedViewTo = t.first, o.view = [], o.renderedView = null, o.externalMeasured = null, o.viewOffset = 0, o.lastWrapHeight = o.lastWrapWidth = 0, o.updateLineNumbers = null, o.nativeBarWidth = o.barHeight = o.barWidth = 0, o.scrollbarsClipped = !1, o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null, o.alignWidgets = !1, o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null, o.maxLine = null, o.maxLineLength = 0, o.maxLineChanged = !1, o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null, o.shift = !1, o.selForContextMenu = null, o.activeTouch = null, o.gutterSpecs = fi(i.gutters, i.lineNumbers), pi(o), r.init(o)
                }
                oi.prototype.signal = function(e, t) {
                    ve(e, t) && this.events.push(arguments)
                }, oi.prototype.finish = function() {
                    for (var e = 0; e < this.events.length; e++) pe.apply(null, this.events[e])
                };
                var vi = 0,
                    xi = null;

                function yi(e) {
                    var t = e.wheelDeltaX,
                        n = e.wheelDeltaY;
                    return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta), {
                        x: t,
                        y: n
                    }
                }

                function bi(e) {
                    var t = yi(e);
                    return t.x *= xi, t.y *= xi, t
                }

                function ki(e, t) {
                    var r = yi(t),
                        i = r.x,
                        o = r.y,
                        a = e.display,
                        l = a.scroller,
                        c = l.scrollWidth > l.clientWidth,
                        u = l.scrollHeight > l.clientHeight;
                    if (i && c || o && u) {
                        if (o && x && s) e: for (var h = t.target, f = a.view; h != l; h = h.parentNode)
                            for (var p = 0; p < f.length; p++)
                                if (f[p].node == h) {
                                    e.display.currentWheelTarget = h;
                                    break e
                                }
                        if (i && !n && !d && null != xi) return o && u && zr(e, Math.max(0, l.scrollTop + o * xi)), Rr(e, Math.max(0, l.scrollLeft + i * xi)), (!o || o && u) && ye(t), void(a.wheelStartX = null);
                        if (o && null != xi) {
                            var m = o * xi,
                                g = e.doc.scrollTop,
                                v = g + a.wrapper.clientHeight;
                            m < 0 ? g = Math.max(0, g + m - 50) : v = Math.min(e.doc.height, v + m + 50), si(e, {
                                top: g,
                                bottom: v
                            })
                        }
                        vi < 20 && (null == a.wheelStartX ? (a.wheelStartX = l.scrollLeft, a.wheelStartY = l.scrollTop, a.wheelDX = i, a.wheelDY = o, setTimeout((function() {
                            if (null != a.wheelStartX) {
                                var e = l.scrollLeft - a.wheelStartX,
                                    t = l.scrollTop - a.wheelStartY,
                                    n = t && a.wheelDY && t / a.wheelDY || e && a.wheelDX && e / a.wheelDX;
                                a.wheelStartX = a.wheelStartY = null, n && (xi = (xi * vi + n) / (vi + 1), ++vi)
                            }
                        }), 200)) : (a.wheelDX += i, a.wheelDY += o))
                    }
                }
                a ? xi = -.53 : n ? xi = 15 : u ? xi = -.7 : h && (xi = -1 / 3);
                var wi = function(e, t) {
                    this.ranges = e, this.primIndex = t
                };
                wi.prototype.primary = function() {
                    return this.ranges[this.primIndex]
                }, wi.prototype.equals = function(e) {
                    if (e == this) return !0;
                    if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
                    for (var t = 0; t < this.ranges.length; t++) {
                        var n = this.ranges[t],
                            r = e.ranges[t];
                        if (!nt(n.anchor, r.anchor) || !nt(n.head, r.head)) return !1
                    }
                    return !0
                }, wi.prototype.deepCopy = function() {
                    for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new Ci(rt(this.ranges[t].anchor), rt(this.ranges[t].head));
                    return new wi(e, this.primIndex)
                }, wi.prototype.somethingSelected = function() {
                    for (var e = 0; e < this.ranges.length; e++)
                        if (!this.ranges[e].empty()) return !0;
                    return !1
                }, wi.prototype.contains = function(e, t) {
                    t || (t = e);
                    for (var n = 0; n < this.ranges.length; n++) {
                        var r = this.ranges[n];
                        if (tt(t, r.from()) >= 0 && tt(e, r.to()) <= 0) return n
                    }
                    return -1
                };
                var Ci = function(e, t) {
                    this.anchor = e, this.head = t
                };

                function Si(e, t, n) {
                    var r = e && e.options.selectionsMayTouch,
                        i = t[n];
                    t.sort((function(e, t) {
                        return tt(e.from(), t.from())
                    })), n = W(t, i);
                    for (var o = 1; o < t.length; o++) {
                        var a = t[o],
                            l = t[o - 1],
                            s = tt(l.to(), a.from());
                        if (r && !a.empty() ? s > 0 : s >= 0) {
                            var c = ot(l.from(), a.from()),
                                u = it(l.to(), a.to()),
                                d = l.empty() ? a.from() == a.head : l.from() == l.head;
                            o <= n && --n, t.splice(--o, 2, new Ci(d ? u : c, d ? c : u))
                        }
                    }
                    return new wi(t, n)
                }

                function Li(e, t) {
                    return new wi([new Ci(e, t || e)], 0)
                }

                function Ti(e) {
                    return e.text ? et(e.from.line + e.text.length - 1, X(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
                }

                function Mi(e, t) {
                    if (tt(e, t.from) < 0) return e;
                    if (tt(e, t.to) <= 0) return Ti(t);
                    var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                        r = e.ch;
                    return e.line == t.to.line && (r += Ti(t).ch - t.to.ch), et(n, r)
                }

                function Ai(e, t) {
                    for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
                        var i = e.sel.ranges[r];
                        n.push(new Ci(Mi(i.anchor, t), Mi(i.head, t)))
                    }
                    return Si(e.cm, n, e.sel.primIndex)
                }

                function Ni(e, t, n) {
                    return e.line == t.line ? et(n.line, e.ch - t.ch + n.ch) : et(n.line + (e.line - t.line), e.ch)
                }

                function Di(e) {
                    e.doc.mode = _e(e.options, e.doc.modeOption), Fi(e)
                }

                function Fi(e) {
                    e.doc.iter((function(e) {
                        e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
                    })), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, ri(e, 100), e.state.modeGen++, e.curOp && dr(e)
                }

                function Ei(e, t) {
                    return 0 == t.from.ch && 0 == t.to.ch && "" == X(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
                }

                function Oi(e, t, n, r) {
                    function i(e) {
                        return n ? n[e] : null
                    }

                    function o(e, n, i) {
                        ! function(e, t, n, r) {
                            e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), At(e), Nt(e, n);
                            var i = r ? r(e) : 1;
                            i != e.height && Ke(e, i)
                        }(e, n, i, r), sn(e, "change", e, t)
                    }

                    function a(e, t) {
                        for (var n = [], o = e; o < t; ++o) n.push(new Gt(c[o], i(o), r));
                        return n
                    }
                    var l = t.from,
                        s = t.to,
                        c = t.text,
                        u = Ge(e, l.line),
                        d = Ge(e, s.line),
                        h = X(c),
                        f = i(c.length - 1),
                        p = s.line - l.line;
                    if (t.full) e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length);
                    else if (Ei(e, t)) {
                        var m = a(0, c.length - 1);
                        o(d, d.text, f), p && e.remove(l.line, p), m.length && e.insert(l.line, m)
                    } else if (u == d)
                        if (1 == c.length) o(u, u.text.slice(0, l.ch) + h + u.text.slice(s.ch), f);
                        else {
                            var g = a(1, c.length - 1);
                            g.push(new Gt(h + u.text.slice(s.ch), f, r)), o(u, u.text.slice(0, l.ch) + c[0], i(0)), e.insert(l.line + 1, g)
                        }
                    else if (1 == c.length) o(u, u.text.slice(0, l.ch) + c[0] + d.text.slice(s.ch), i(0)), e.remove(l.line + 1, p);
                    else {
                        o(u, u.text.slice(0, l.ch) + c[0], i(0)), o(d, h + d.text.slice(s.ch), f);
                        var v = a(1, c.length - 1);
                        p > 1 && e.remove(l.line + 1, p - 1), e.insert(l.line + 1, v)
                    }
                    sn(e, "change", e, t)
                }

                function Ii(e, t, n) {
                    ! function e(r, i, o) {
                        if (r.linked)
                            for (var a = 0; a < r.linked.length; ++a) {
                                var l = r.linked[a];
                                if (l.doc != i) {
                                    var s = o && l.sharedHist;
                                    n && !s || (t(l.doc, s), e(l.doc, r, s))
                                }
                            }
                    }(e, null, !0)
                }

                function zi(e, t) {
                    if (t.cm) throw new Error("This document is already in use.");
                    e.doc = t, t.cm = e, sr(e), Di(e), Hi(e), e.options.lineWrapping || $t(e), e.options.mode = t.modeOption, dr(e)
                }

                function Hi(e) {
                    ("rtl" == e.doc.direction ? O : T)(e.display.lineDiv, "CodeMirror-rtl")
                }

                function Ri(e) {
                    this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
                }

                function Pi(e, t) {
                    var n = {
                        from: rt(t.from),
                        to: Ti(t),
                        text: Ve(e, t.from, t.to)
                    };
                    return qi(e, n, t.from.line, t.to.line + 1), Ii(e, (function(e) {
                        return qi(e, n, t.from.line, t.to.line + 1)
                    }), !0), n
                }

                function _i(e) {
                    for (; e.length;) {
                        if (!X(e).ranges) break;
                        e.pop()
                    }
                }

                function Wi(e, t, n, r) {
                    var i = e.history;
                    i.undone.length = 0;
                    var o, a, l = +new Date;
                    if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && i.lastModTime > l - (e.cm ? e.cm.options.historyEventDelay : 500) || "*" == t.origin.charAt(0))) && (o = function(e, t) {
                            return t ? (_i(e.done), X(e.done)) : e.done.length && !X(e.done).ranges ? X(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), X(e.done)) : void 0
                        }(i, i.lastOp == r))) a = X(o.changes), 0 == tt(t.from, t.to) && 0 == tt(t.from, a.to) ? a.to = Ti(t) : o.changes.push(Pi(e, t));
                    else {
                        var s = X(i.done);
                        for (s && s.ranges || ji(e.sel, i.done), o = {
                                changes: [Pi(e, t)],
                                generation: i.generation
                            }, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
                    }
                    i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = l, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, a || pe(e, "historyAdded")
                }

                function Bi(e, t, n, r) {
                    var i = e.history,
                        o = r && r.origin;
                    n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || function(e, t, n, r) {
                        var i = t.charAt(0);
                        return "*" == i || "+" == i && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
                    }(e, o, X(i.done), t)) ? i.done[i.done.length - 1] = t : ji(t, i.done), i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastSelOp = n, r && !1 !== r.clearRedo && _i(i.undone)
                }

                function ji(e, t) {
                    var n = X(t);
                    n && n.ranges && n.equals(e) || t.push(e)
                }

                function qi(e, t, n, r) {
                    var i = t["spans_" + e.id],
                        o = 0;
                    e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), (function(n) {
                        n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o
                    }))
                }

                function Ui(e) {
                    if (!e) return null;
                    for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
                    return t ? t.length ? t : null : e
                }

                function $i(e, t) {
                    var n = function(e, t) {
                            var n = t["spans_" + e.id];
                            if (!n) return null;
                            for (var r = [], i = 0; i < t.text.length; ++i) r.push(Ui(n[i]));
                            return r
                        }(e, t),
                        r = Tt(e, t);
                    if (!n) return r;
                    if (!r) return n;
                    for (var i = 0; i < n.length; ++i) {
                        var o = n[i],
                            a = r[i];
                        if (o && a) e: for (var l = 0; l < a.length; ++l) {
                            for (var s = a[l], c = 0; c < o.length; ++c)
                                if (o[c].marker == s.marker) continue e;
                            o.push(s)
                        } else a && (n[i] = a)
                    }
                    return n
                }

                function Gi(e, t, n) {
                    for (var r = [], i = 0; i < e.length; ++i) {
                        var o = e[i];
                        if (o.ranges) r.push(n ? wi.prototype.deepCopy.call(o) : o);
                        else {
                            var a = o.changes,
                                l = [];
                            r.push({
                                changes: l
                            });
                            for (var s = 0; s < a.length; ++s) {
                                var c = a[s],
                                    u = void 0;
                                if (l.push({
                                        from: c.from,
                                        to: c.to,
                                        text: c.text
                                    }), t)
                                    for (var d in c)(u = d.match(/^spans_(\d+)$/)) && W(t, Number(u[1])) > -1 && (X(l)[d] = c[d], delete c[d])
                            }
                        }
                    }
                    return r
                }

                function Vi(e, t, n, r) {
                    if (r) {
                        var i = e.anchor;
                        if (n) {
                            var o = tt(t, i) < 0;
                            o != tt(n, i) < 0 ? (i = t, t = n) : o != tt(t, n) < 0 && (t = n)
                        }
                        return new Ci(i, t)
                    }
                    return new Ci(n || t, t)
                }

                function Xi(e, t, n, r, i) {
                    null == i && (i = e.cm && (e.cm.display.shift || e.extend)), Ji(e, new wi([Vi(e.sel.primary(), t, n, i)], 0), r)
                }

                function Ki(e, t, n) {
                    for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) r[o] = Vi(e.sel.ranges[o], t[o], null, i);
                    Ji(e, Si(e.cm, r, e.sel.primIndex), n)
                }

                function Zi(e, t, n, r) {
                    var i = e.sel.ranges.slice(0);
                    i[t] = n, Ji(e, Si(e.cm, i, e.sel.primIndex), r)
                }

                function Yi(e, t, n, r) {
                    Ji(e, Li(t, n), r)
                }

                function Qi(e, t, n) {
                    var r = e.history.done,
                        i = X(r);
                    i && i.ranges ? (r[r.length - 1] = t, eo(e, t, n)) : Ji(e, t, n)
                }

                function Ji(e, t, n) {
                    eo(e, t, n), Bi(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n)
                }

                function eo(e, t, n) {
                    (ve(e, "beforeSelectionChange") || e.cm && ve(e.cm, "beforeSelectionChange")) && (t = function(e, t, n) {
                        var r = {
                            ranges: t.ranges,
                            update: function(t) {
                                this.ranges = [];
                                for (var n = 0; n < t.length; n++) this.ranges[n] = new Ci(lt(e, t[n].anchor), lt(e, t[n].head))
                            },
                            origin: n && n.origin
                        };
                        return pe(e, "beforeSelectionChange", e, r), e.cm && pe(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? Si(e.cm, r.ranges, r.ranges.length - 1) : t
                    }(e, t, n));
                    var r = n && n.bias || (tt(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
                    to(e, ro(e, t, r, !0)), n && !1 === n.scroll || !e.cm || Fr(e.cm)
                }

                function to(e, t) {
                    t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, ge(e.cm)), sn(e, "cursorActivity", e))
                }

                function no(e) {
                    to(e, ro(e, e.sel, null, !1))
                }

                function ro(e, t, n, r) {
                    for (var i, o = 0; o < t.ranges.length; o++) {
                        var a = t.ranges[o],
                            l = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                            s = oo(e, a.anchor, l && l.anchor, n, r),
                            c = oo(e, a.head, l && l.head, n, r);
                        (i || s != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new Ci(s, c))
                    }
                    return i ? Si(e.cm, i, t.primIndex) : t
                }

                function io(e, t, n, r, i) {
                    var o = Ge(e, t.line);
                    if (o.markedSpans)
                        for (var a = 0; a < o.markedSpans.length; ++a) {
                            var l = o.markedSpans[a],
                                s = l.marker,
                                c = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft,
                                u = "selectRight" in s ? !s.selectRight : s.inclusiveRight;
                            if ((null == l.from || (c ? l.from <= t.ch : l.from < t.ch)) && (null == l.to || (u ? l.to >= t.ch : l.to > t.ch))) {
                                if (i && (pe(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                                    if (o.markedSpans) {
                                        --a;
                                        continue
                                    }
                                    break
                                }
                                if (!s.atomic) continue;
                                if (n) {
                                    var d = s.find(r < 0 ? 1 : -1),
                                        h = void 0;
                                    if ((r < 0 ? u : c) && (d = ao(e, d, -r, d && d.line == t.line ? o : null)), d && d.line == t.line && (h = tt(d, n)) && (r < 0 ? h < 0 : h > 0)) return io(e, d, t, r, i)
                                }
                                var f = s.find(r < 0 ? -1 : 1);
                                return (r < 0 ? c : u) && (f = ao(e, f, r, f.line == t.line ? o : null)), f ? io(e, f, t, r, i) : null
                            }
                        }
                    return t
                }

                function oo(e, t, n, r, i) {
                    var o = r || 1,
                        a = io(e, t, n, o, i) || !i && io(e, t, n, o, !0) || io(e, t, n, -o, i) || !i && io(e, t, n, -o, !0);
                    return a || (e.cantEdit = !0, et(e.first, 0))
                }

                function ao(e, t, n, r) {
                    return n < 0 && 0 == t.ch ? t.line > e.first ? lt(e, et(t.line - 1)) : null : n > 0 && t.ch == (r || Ge(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? et(t.line + 1, 0) : null : new et(t.line, t.ch + n)
                }

                function lo(e) {
                    e.setSelection(et(e.firstLine(), 0), et(e.lastLine()), j)
                }

                function so(e, t, n) {
                    var r = {
                        canceled: !1,
                        from: t.from,
                        to: t.to,
                        text: t.text,
                        origin: t.origin,
                        cancel: function() {
                            return r.canceled = !0
                        }
                    };
                    return n && (r.update = function(t, n, i, o) {
                        t && (r.from = lt(e, t)), n && (r.to = lt(e, n)), i && (r.text = i), void 0 !== o && (r.origin = o)
                    }), pe(e, "beforeChange", e, r), e.cm && pe(e.cm, "beforeChange", e.cm, r), r.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : {
                        from: r.from,
                        to: r.to,
                        text: r.text,
                        origin: r.origin
                    }
                }

                function co(e, t, n) {
                    if (e.cm) {
                        if (!e.cm.curOp) return ei(e.cm, co)(e, t, n);
                        if (e.cm.state.suppressEdits) return
                    }
                    if (!(ve(e, "beforeChange") || e.cm && ve(e.cm, "beforeChange")) || (t = so(e, t, !0))) {
                        var r = kt && !n && function(e, t, n) {
                            var r = null;
                            if (e.iter(t.line, n.line + 1, (function(e) {
                                    if (e.markedSpans)
                                        for (var t = 0; t < e.markedSpans.length; ++t) {
                                            var n = e.markedSpans[t].marker;
                                            !n.readOnly || r && -1 != W(r, n) || (r || (r = [])).push(n)
                                        }
                                })), !r) return null;
                            for (var i = [{
                                    from: t,
                                    to: n
                                }], o = 0; o < r.length; ++o)
                                for (var a = r[o], l = a.find(0), s = 0; s < i.length; ++s) {
                                    var c = i[s];
                                    if (!(tt(c.to, l.from) < 0 || tt(c.from, l.to) > 0)) {
                                        var u = [s, 1],
                                            d = tt(c.from, l.from),
                                            h = tt(c.to, l.to);
                                        (d < 0 || !a.inclusiveLeft && !d) && u.push({
                                            from: c.from,
                                            to: l.from
                                        }), (h > 0 || !a.inclusiveRight && !h) && u.push({
                                            from: l.to,
                                            to: c.to
                                        }), i.splice.apply(i, u), s += u.length - 3
                                    }
                                }
                            return i
                        }(e, t.from, t.to);
                        if (r)
                            for (var i = r.length - 1; i >= 0; --i) uo(e, {
                                from: r[i].from,
                                to: r[i].to,
                                text: i ? [""] : t.text,
                                origin: t.origin
                            });
                        else uo(e, t)
                    }
                }

                function uo(e, t) {
                    if (1 != t.text.length || "" != t.text[0] || 0 != tt(t.from, t.to)) {
                        var n = Ai(e, t);
                        Wi(e, t, n, e.cm ? e.cm.curOp.id : NaN), po(e, t, n, Tt(e, t));
                        var r = [];
                        Ii(e, (function(e, n) {
                            n || -1 != W(r, e.history) || (xo(e.history, t), r.push(e.history)), po(e, t, null, Tt(e, t))
                        }))
                    }
                }

                function ho(e, t, n) {
                    var r = e.cm && e.cm.state.suppressEdits;
                    if (!r || n) {
                        for (var i, o = e.history, a = e.sel, l = "undo" == t ? o.done : o.undone, s = "undo" == t ? o.undone : o.done, c = 0; c < l.length && (i = l[c], n ? !i.ranges || i.equals(e.sel) : i.ranges); c++);
                        if (c != l.length) {
                            for (o.lastOrigin = o.lastSelOrigin = null;;) {
                                if (!(i = l.pop()).ranges) {
                                    if (r) return void l.push(i);
                                    break
                                }
                                if (ji(i, s), n && !i.equals(e.sel)) return void Ji(e, i, {
                                    clearRedo: !1
                                });
                                a = i
                            }
                            var u = [];
                            ji(a, s), s.push({
                                changes: u,
                                generation: o.generation
                            }), o.generation = i.generation || ++o.maxGeneration;
                            for (var d = ve(e, "beforeChange") || e.cm && ve(e.cm, "beforeChange"), h = function(n) {
                                    var r = i.changes[n];
                                    if (r.origin = t, d && !so(e, r, !1)) return l.length = 0, {};
                                    u.push(Pi(e, r));
                                    var o = n ? Ai(e, r) : X(l);
                                    po(e, r, o, $i(e, r)), !n && e.cm && e.cm.scrollIntoView({
                                        from: r.from,
                                        to: Ti(r)
                                    });
                                    var a = [];
                                    Ii(e, (function(e, t) {
                                        t || -1 != W(a, e.history) || (xo(e.history, r), a.push(e.history)), po(e, r, null, $i(e, r))
                                    }))
                                }, f = i.changes.length - 1; f >= 0; --f) {
                                var p = h(f);
                                if (p) return p.v
                            }
                        }
                    }
                }

                function fo(e, t) {
                    if (0 != t && (e.first += t, e.sel = new wi(K(e.sel.ranges, (function(e) {
                            return new Ci(et(e.anchor.line + t, e.anchor.ch), et(e.head.line + t, e.head.ch))
                        })), e.sel.primIndex), e.cm)) {
                        dr(e.cm, e.first, e.first - t, t);
                        for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) hr(e.cm, r, "gutter")
                    }
                }

                function po(e, t, n, r) {
                    if (e.cm && !e.cm.curOp) return ei(e.cm, po)(e, t, n, r);
                    if (t.to.line < e.first) fo(e, t.text.length - 1 - (t.to.line - t.from.line));
                    else if (!(t.from.line > e.lastLine())) {
                        if (t.from.line < e.first) {
                            var i = t.text.length - 1 - (e.first - t.from.line);
                            fo(e, i), t = {
                                from: et(e.first, 0),
                                to: et(t.to.line + i, t.to.ch),
                                text: [X(t.text)],
                                origin: t.origin
                            }
                        }
                        var o = e.lastLine();
                        t.to.line > o && (t = {
                            from: t.from,
                            to: et(o, Ge(e, o).text.length),
                            text: [t.text[0]],
                            origin: t.origin
                        }), t.removed = Ve(e, t.from, t.to), n || (n = Ai(e, t)), e.cm ? function(e, t, n) {
                            var r = e.doc,
                                i = e.display,
                                o = t.from,
                                a = t.to,
                                l = !1,
                                s = o.line;
                            e.options.lineWrapping || (s = Ze(Pt(Ge(r, o.line))), r.iter(s, a.line + 1, (function(e) {
                                if (e == i.maxLine) return l = !0, !0
                            })));
                            r.sel.contains(t.from, t.to) > -1 && ge(e);
                            Oi(r, t, n, lr(e)), e.options.lineWrapping || (r.iter(s, o.line + t.text.length, (function(e) {
                                var t = Ut(e);
                                t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, l = !1)
                            })), l && (e.curOp.updateMaxLine = !0));
                            (function(e, t) {
                                if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
                                    for (var n = e.first, r = t - 1; r > n; r--) {
                                        var i = Ge(e, r).stateAfter;
                                        if (i && (!(i instanceof ct) || r + i.lookAhead < t)) {
                                            n = r + 1;
                                            break
                                        }
                                    }
                                    e.highlightFrontier = Math.min(e.highlightFrontier, n)
                                }
                            })(r, o.line), ri(e, 400);
                            var c = t.text.length - (a.line - o.line) - 1;
                            t.full ? dr(e) : o.line != a.line || 1 != t.text.length || Ei(e.doc, t) ? dr(e, o.line, a.line + 1, c) : hr(e, o.line, "text");
                            var u = ve(e, "changes"),
                                d = ve(e, "change");
                            if (d || u) {
                                var h = {
                                    from: o,
                                    to: a,
                                    text: t.text,
                                    removed: t.removed,
                                    origin: t.origin
                                };
                                d && sn(e, "change", e, h), u && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(h)
                            }
                            e.display.selForContextMenu = null
                        }(e.cm, t, r) : Oi(e, t, r), eo(e, n, j), e.cantEdit && oo(e, et(e.firstLine(), 0)) && (e.cantEdit = !1)
                    }
                }

                function mo(e, t, n, r, i) {
                    var o;
                    r || (r = n), tt(r, n) < 0 && (n = (o = [r, n])[0], r = o[1]), "string" == typeof t && (t = e.splitLines(t)), co(e, {
                        from: n,
                        to: r,
                        text: t,
                        origin: i
                    })
                }

                function go(e, t, n, r) {
                    n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0)
                }

                function vo(e, t, n, r) {
                    for (var i = 0; i < e.length; ++i) {
                        var o = e[i],
                            a = !0;
                        if (o.ranges) {
                            o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                            for (var l = 0; l < o.ranges.length; l++) go(o.ranges[l].anchor, t, n, r), go(o.ranges[l].head, t, n, r)
                        } else {
                            for (var s = 0; s < o.changes.length; ++s) {
                                var c = o.changes[s];
                                if (n < c.from.line) c.from = et(c.from.line + r, c.from.ch), c.to = et(c.to.line + r, c.to.ch);
                                else if (t <= c.to.line) {
                                    a = !1;
                                    break
                                }
                            }
                            a || (e.splice(0, i + 1), i = 0)
                        }
                    }
                }

                function xo(e, t) {
                    var n = t.from.line,
                        r = t.to.line,
                        i = t.text.length - (r - n) - 1;
                    vo(e.done, n, r, i), vo(e.undone, n, r, i)
                }

                function yo(e, t, n, r) {
                    var i = t,
                        o = t;
                    return "number" == typeof t ? o = Ge(e, at(e, t)) : i = Ze(t), null == i ? null : (r(o, i) && e.cm && hr(e.cm, i, n), o)
                }

                function bo(e) {
                    this.lines = e, this.parent = null;
                    for (var t = 0, n = 0; n < e.length; ++n) e[n].parent = this, t += e[n].height;
                    this.height = t
                }

                function ko(e) {
                    this.children = e;
                    for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
                        var i = e[r];
                        t += i.chunkSize(), n += i.height, i.parent = this
                    }
                    this.size = t, this.height = n, this.parent = null
                }
                Ci.prototype.from = function() {
                    return ot(this.anchor, this.head)
                }, Ci.prototype.to = function() {
                    return it(this.anchor, this.head)
                }, Ci.prototype.empty = function() {
                    return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
                }, bo.prototype = {
                    chunkSize: function() {
                        return this.lines.length
                    },
                    removeInner: function(e, t) {
                        for (var n = e, r = e + t; n < r; ++n) {
                            var i = this.lines[n];
                            this.height -= i.height, Vt(i), sn(i, "delete")
                        }
                        this.lines.splice(e, t)
                    },
                    collapse: function(e) {
                        e.push.apply(e, this.lines)
                    },
                    insertInner: function(e, t, n) {
                        this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                        for (var r = 0; r < t.length; ++r) t[r].parent = this
                    },
                    iterN: function(e, t, n) {
                        for (var r = e + t; e < r; ++e)
                            if (n(this.lines[e])) return !0
                    }
                }, ko.prototype = {
                    chunkSize: function() {
                        return this.size
                    },
                    removeInner: function(e, t) {
                        this.size -= t;
                        for (var n = 0; n < this.children.length; ++n) {
                            var r = this.children[n],
                                i = r.chunkSize();
                            if (e < i) {
                                var o = Math.min(t, i - e),
                                    a = r.height;
                                if (r.removeInner(e, o), this.height -= a - r.height, i == o && (this.children.splice(n--, 1), r.parent = null), 0 == (t -= o)) break;
                                e = 0
                            } else e -= i
                        }
                        if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof bo))) {
                            var l = [];
                            this.collapse(l), this.children = [new bo(l)], this.children[0].parent = this
                        }
                    },
                    collapse: function(e) {
                        for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
                    },
                    insertInner: function(e, t, n) {
                        this.size += t.length, this.height += n;
                        for (var r = 0; r < this.children.length; ++r) {
                            var i = this.children[r],
                                o = i.chunkSize();
                            if (e <= o) {
                                if (i.insertInner(e, t, n), i.lines && i.lines.length > 50) {
                                    for (var a = i.lines.length % 25 + 25, l = a; l < i.lines.length;) {
                                        var s = new bo(i.lines.slice(l, l += 25));
                                        i.height -= s.height, this.children.splice(++r, 0, s), s.parent = this
                                    }
                                    i.lines = i.lines.slice(0, a), this.maybeSpill()
                                }
                                break
                            }
                            e -= o
                        }
                    },
                    maybeSpill: function() {
                        if (!(this.children.length <= 10)) {
                            var e = this;
                            do {
                                var t = new ko(e.children.splice(e.children.length - 5, 5));
                                if (e.parent) {
                                    e.size -= t.size, e.height -= t.height;
                                    var n = W(e.parent.children, e);
                                    e.parent.children.splice(n + 1, 0, t)
                                } else {
                                    var r = new ko(e.children);
                                    r.parent = e, e.children = [r, t], e = r
                                }
                                t.parent = e.parent
                            } while (e.children.length > 10);
                            e.parent.maybeSpill()
                        }
                    },
                    iterN: function(e, t, n) {
                        for (var r = 0; r < this.children.length; ++r) {
                            var i = this.children[r],
                                o = i.chunkSize();
                            if (e < o) {
                                var a = Math.min(t, o - e);
                                if (i.iterN(e, a, n)) return !0;
                                if (0 == (t -= a)) break;
                                e = 0
                            } else e -= o
                        }
                    }
                };
                var wo = function(e, t, n) {
                    if (n)
                        for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
                    this.doc = e, this.node = t
                };

                function Co(e, t, n) {
                    qt(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Dr(e, n)
                }
                wo.prototype.clear = function() {
                    var e = this.doc.cm,
                        t = this.line.widgets,
                        n = this.line,
                        r = Ze(n);
                    if (null != r && t) {
                        for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
                        t.length || (n.widgets = null);
                        var o = kn(this);
                        Ke(n, Math.max(0, n.height - o)), e && (Jr(e, (function() {
                            Co(e, n, -o), hr(e, r, "widget")
                        })), sn(e, "lineWidgetCleared", e, this, r))
                    }
                }, wo.prototype.changed = function() {
                    var e = this,
                        t = this.height,
                        n = this.doc.cm,
                        r = this.line;
                    this.height = null;
                    var i = kn(this) - t;
                    i && (Bt(this.doc, r) || Ke(r, r.height + i), n && Jr(n, (function() {
                        n.curOp.forceUpdate = !0, Co(n, r, i), sn(n, "lineWidgetChanged", n, e, Ze(r))
                    })))
                }, xe(wo);
                var So = 0,
                    Lo = function(e, t) {
                        this.lines = [], this.type = t, this.doc = e, this.id = ++So
                    };

                function To(e, t, n, r, i) {
                    if (r && r.shared) return function(e, t, n, r, i) {
                        (r = R(r)).shared = !1;
                        var o = [To(e, t, n, r, i)],
                            a = o[0],
                            l = r.widgetNode;
                        return Ii(e, (function(e) {
                            l && (r.widgetNode = l.cloneNode(!0)), o.push(To(e, lt(e, t), lt(e, n), r, i));
                            for (var s = 0; s < e.linked.length; ++s)
                                if (e.linked[s].isParent) return;
                            a = X(o)
                        })), new Mo(o, a)
                    }(e, t, n, r, i);
                    if (e.cm && !e.cm.curOp) return ei(e.cm, To)(e, t, n, r, i);
                    var o = new Lo(e, i),
                        a = tt(t, n);
                    if (r && R(r, o, !1), a > 0 || 0 == a && !1 !== o.clearWhenEmpty) return o;
                    if (o.replacedWith && (o.collapsed = !0, o.widgetNode = D("span", [o.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
                        if (Rt(e, t.line, t, n, o) || t.line != n.line && Rt(e, n.line, t, n, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
                        wt = !0
                    }
                    o.addToHistory && Wi(e, {
                        from: t,
                        to: n,
                        origin: "markText"
                    }, e.sel, NaN);
                    var l, s = t.line,
                        c = e.cm;
                    if (e.iter(s, n.line + 1, (function(e) {
                            c && o.collapsed && !c.options.lineWrapping && Pt(e) == c.display.maxLine && (l = !0), o.collapsed && s != t.line && Ke(e, 0),
                                function(e, t) {
                                    e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
                                }(e, new Ct(o, s == t.line ? t.ch : null, s == n.line ? n.ch : null)), ++s
                        })), o.collapsed && e.iter(t.line, n.line + 1, (function(t) {
                            Bt(e, t) && Ke(t, 0)
                        })), o.clearOnEnter && de(o, "beforeCursorEnter", (function() {
                            return o.clear()
                        })), o.readOnly && (kt = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++So, o.atomic = !0), c) {
                        if (l && (c.curOp.updateMaxLine = !0), o.collapsed) dr(c, t.line, n.line + 1);
                        else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title)
                            for (var u = t.line; u <= n.line; u++) hr(c, u, "text");
                        o.atomic && no(c.doc), sn(c, "markerAdded", c, o)
                    }
                    return o
                }
                Lo.prototype.clear = function() {
                    if (!this.explicitlyCleared) {
                        var e = this.doc.cm,
                            t = e && !e.curOp;
                        if (t && Gr(e), ve(this, "clear")) {
                            var n = this.find();
                            n && sn(this, "clear", n.from, n.to)
                        }
                        for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
                            var a = this.lines[o],
                                l = St(a.markedSpans, this);
                            e && !this.collapsed ? hr(e, Ze(a), "text") : e && (null != l.to && (i = Ze(a)), null != l.from && (r = Ze(a))), a.markedSpans = Lt(a.markedSpans, l), null == l.from && this.collapsed && !Bt(this.doc, a) && e && Ke(a, rr(e.display))
                        }
                        if (e && this.collapsed && !e.options.lineWrapping)
                            for (var s = 0; s < this.lines.length; ++s) {
                                var c = Pt(this.lines[s]),
                                    u = Ut(c);
                                u > e.display.maxLineLength && (e.display.maxLine = c, e.display.maxLineLength = u, e.display.maxLineChanged = !0)
                            }
                        null != r && e && this.collapsed && dr(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && no(e.doc)), e && sn(e, "markerCleared", e, this, r, i), t && Vr(e), this.parent && this.parent.clear()
                    }
                }, Lo.prototype.find = function(e, t) {
                    var n, r;
                    null == e && "bookmark" == this.type && (e = 1);
                    for (var i = 0; i < this.lines.length; ++i) {
                        var o = this.lines[i],
                            a = St(o.markedSpans, this);
                        if (null != a.from && (n = et(t ? o : Ze(o), a.from), -1 == e)) return n;
                        if (null != a.to && (r = et(t ? o : Ze(o), a.to), 1 == e)) return r
                    }
                    return n && {
                        from: n,
                        to: r
                    }
                }, Lo.prototype.changed = function() {
                    var e = this,
                        t = this.find(-1, !0),
                        n = this,
                        r = this.doc.cm;
                    t && r && Jr(r, (function() {
                        var i = t.line,
                            o = Ze(t.line),
                            a = Fn(r, o);
                        if (a && (Pn(a), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, !Bt(n.doc, i) && null != n.height) {
                            var l = n.height;
                            n.height = null;
                            var s = kn(n) - l;
                            s && Ke(i, i.height + s)
                        }
                        sn(r, "markerChanged", r, e)
                    }))
                }, Lo.prototype.attachLine = function(e) {
                    if (!this.lines.length && this.doc.cm) {
                        var t = this.doc.cm.curOp;
                        t.maybeHiddenMarkers && -1 != W(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
                    }
                    this.lines.push(e)
                }, Lo.prototype.detachLine = function(e) {
                    if (this.lines.splice(W(this.lines, e), 1), !this.lines.length && this.doc.cm) {
                        var t = this.doc.cm.curOp;
                        (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
                    }
                }, xe(Lo);
                var Mo = function(e, t) {
                    this.markers = e, this.primary = t;
                    for (var n = 0; n < e.length; ++n) e[n].parent = this
                };

                function Ao(e) {
                    return e.findMarks(et(e.first, 0), e.clipPos(et(e.lastLine())), (function(e) {
                        return e.parent
                    }))
                }

                function No(e) {
                    for (var t = function(t) {
                            var n = e[t],
                                r = [n.primary.doc];
                            Ii(n.primary.doc, (function(e) {
                                return r.push(e)
                            }));
                            for (var i = 0; i < n.markers.length; i++) {
                                var o = n.markers[i]; - 1 == W(r, o.doc) && (o.parent = null, n.markers.splice(i--, 1))
                            }
                        }, n = 0; n < e.length; n++) t(n)
                }
                Mo.prototype.clear = function() {
                    if (!this.explicitlyCleared) {
                        this.explicitlyCleared = !0;
                        for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
                        sn(this, "clear")
                    }
                }, Mo.prototype.find = function(e, t) {
                    return this.primary.find(e, t)
                }, xe(Mo);
                var Do = 0,
                    Fo = function(e, t, n, r, i) {
                        if (!(this instanceof Fo)) return new Fo(e, t, n, r, i);
                        null == n && (n = 0), ko.call(this, [new bo([new Gt("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = n;
                        var o = et(n, 0);
                        this.sel = Li(o), this.history = new Ri(null), this.id = ++Do, this.modeOption = t, this.lineSep = r, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Oi(this, {
                            from: o,
                            to: o,
                            text: e
                        }), Ji(this, Li(o), j)
                    };
                Fo.prototype = Y(ko.prototype, {
                    constructor: Fo,
                    iter: function(e, t, n) {
                        n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
                    },
                    insert: function(e, t) {
                        for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height;
                        this.insertInner(e - this.first, t, n)
                    },
                    remove: function(e, t) {
                        this.removeInner(e - this.first, t)
                    },
                    getValue: function(e) {
                        var t = Xe(this, this.first, this.first + this.size);
                        return !1 === e ? t : t.join(e || this.lineSeparator())
                    },
                    /* Patch: The below comment-out fixes the scroll-to-top-after-setvalue problem */
                    // https://github.com/codemirror/CodeMirror/blob/master/src/model/Doc.js (line 78)
                    setValue: ni((function(e) {
                        var t = et(this.first, 0),
                            n = this.first + this.size - 1;
                        co(this, {
                            from: t,
                            to: et(n, Ge(this, n).text.length),
                            text: this.splitLines(e),
                            origin: "setValue",
                            full: !0
                        }, !0), /*this.cm && Er(this.cm, 0, 0),*/ Ji(this, Li(t), j)
                    })),
                    replaceRange: function(e, t, n, r) {
                        mo(this, e, t = lt(this, t), n = n ? lt(this, n) : t, r)
                    },
                    getRange: function(e, t, n) {
                        var r = Ve(this, lt(this, e), lt(this, t));
                        return !1 === n ? r : r.join(n || this.lineSeparator())
                    },
                    getLine: function(e) {
                        var t = this.getLineHandle(e);
                        return t && t.text
                    },
                    getLineHandle: function(e) {
                        if (Qe(this, e)) return Ge(this, e)
                    },
                    getLineNumber: function(e) {
                        return Ze(e)
                    },
                    getLineHandleVisualStart: function(e) {
                        return "number" == typeof e && (e = Ge(this, e)), Pt(e)
                    },
                    lineCount: function() {
                        return this.size
                    },
                    firstLine: function() {
                        return this.first
                    },
                    lastLine: function() {
                        return this.first + this.size - 1
                    },
                    clipPos: function(e) {
                        return lt(this, e)
                    },
                    getCursor: function(e) {
                        var t = this.sel.primary();
                        return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from()
                    },
                    listSelections: function() {
                        return this.sel.ranges
                    },
                    somethingSelected: function() {
                        return this.sel.somethingSelected()
                    },
                    setCursor: ni((function(e, t, n) {
                        Yi(this, lt(this, "number" == typeof e ? et(e, t || 0) : e), null, n)
                    })),
                    setSelection: ni((function(e, t, n) {
                        Yi(this, lt(this, e), lt(this, t || e), n)
                    })),
                    extendSelection: ni((function(e, t, n) {
                        Xi(this, lt(this, e), t && lt(this, t), n)
                    })),
                    extendSelections: ni((function(e, t) {
                        Ki(this, st(this, e), t)
                    })),
                    extendSelectionsBy: ni((function(e, t) {
                        Ki(this, st(this, K(this.sel.ranges, e)), t)
                    })),
                    setSelections: ni((function(e, t, n) {
                        if (e.length) {
                            for (var r = [], i = 0; i < e.length; i++) r[i] = new Ci(lt(this, e[i].anchor), lt(this, e[i].head));
                            null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Ji(this, Si(this.cm, r, t), n)
                        }
                    })),
                    addSelection: ni((function(e, t, n) {
                        var r = this.sel.ranges.slice(0);
                        r.push(new Ci(lt(this, e), lt(this, t || e))), Ji(this, Si(this.cm, r, r.length - 1), n)
                    })),
                    getSelection: function(e) {
                        for (var t, n = this.sel.ranges, r = 0; r < n.length; r++) {
                            var i = Ve(this, n[r].from(), n[r].to());
                            t = t ? t.concat(i) : i
                        }
                        return !1 === e ? t : t.join(e || this.lineSeparator())
                    },
                    getSelections: function(e) {
                        for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
                            var i = Ve(this, n[r].from(), n[r].to());
                            !1 !== e && (i = i.join(e || this.lineSeparator())), t[r] = i
                        }
                        return t
                    },
                    replaceSelection: function(e, t, n) {
                        for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
                        this.replaceSelections(r, t, n || "+input")
                    },
                    replaceSelections: ni((function(e, t, n) {
                        for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                            var a = i.ranges[o];
                            r[o] = {
                                from: a.from(),
                                to: a.to(),
                                text: this.splitLines(e[o]),
                                origin: n
                            }
                        }
                        for (var l = t && "end" != t && function(e, t, n) {
                                for (var r = [], i = et(e.first, 0), o = i, a = 0; a < t.length; a++) {
                                    var l = t[a],
                                        s = Ni(l.from, i, o),
                                        c = Ni(Ti(l), i, o);
                                    if (i = l.to, o = c, "around" == n) {
                                        var u = e.sel.ranges[a],
                                            d = tt(u.head, u.anchor) < 0;
                                        r[a] = new Ci(d ? c : s, d ? s : c)
                                    } else r[a] = new Ci(s, s)
                                }
                                return new wi(r, e.sel.primIndex)
                            }(this, r, t), s = r.length - 1; s >= 0; s--) co(this, r[s]);
                        l ? Qi(this, l) : this.cm && Fr(this.cm)
                    })),
                    undo: ni((function() {
                        ho(this, "undo")
                    })),
                    redo: ni((function() {
                        ho(this, "redo")
                    })),
                    undoSelection: ni((function() {
                        ho(this, "undo", !0)
                    })),
                    redoSelection: ni((function() {
                        ho(this, "redo", !0)
                    })),
                    setExtending: function(e) {
                        this.extend = e
                    },
                    getExtending: function() {
                        return this.extend
                    },
                    historySize: function() {
                        for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++t;
                        for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++n;
                        return {
                            undo: t,
                            redo: n
                        }
                    },
                    clearHistory: function() {
                        var e = this;
                        this.history = new Ri(this.history.maxGeneration), Ii(this, (function(t) {
                            return t.history = e.history
                        }), !0)
                    },
                    markClean: function() {
                        this.cleanGeneration = this.changeGeneration(!0)
                    },
                    changeGeneration: function(e) {
                        return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
                    },
                    isClean: function(e) {
                        return this.history.generation == (e || this.cleanGeneration)
                    },
                    getHistory: function() {
                        return {
                            done: Gi(this.history.done),
                            undone: Gi(this.history.undone)
                        }
                    },
                    setHistory: function(e) {
                        var t = this.history = new Ri(this.history.maxGeneration);
                        t.done = Gi(e.done.slice(0), null, !0), t.undone = Gi(e.undone.slice(0), null, !0)
                    },
                    setGutterMarker: ni((function(e, t, n) {
                        return yo(this, e, "gutter", (function(e) {
                            var r = e.gutterMarkers || (e.gutterMarkers = {});
                            return r[t] = n, !n && te(r) && (e.gutterMarkers = null), !0
                        }))
                    })),
                    clearGutter: ni((function(e) {
                        var t = this;
                        this.iter((function(n) {
                            n.gutterMarkers && n.gutterMarkers[e] && yo(t, n, "gutter", (function() {
                                return n.gutterMarkers[e] = null, te(n.gutterMarkers) && (n.gutterMarkers = null), !0
                            }))
                        }))
                    })),
                    lineInfo: function(e) {
                        var t;
                        if ("number" == typeof e) {
                            if (!Qe(this, e)) return null;
                            if (t = e, !(e = Ge(this, e))) return null
                        } else if (null == (t = Ze(e))) return null;
                        return {
                            line: t,
                            handle: e,
                            text: e.text,
                            gutterMarkers: e.gutterMarkers,
                            textClass: e.textClass,
                            bgClass: e.bgClass,
                            wrapClass: e.wrapClass,
                            widgets: e.widgets
                        }
                    },
                    addLineClass: ni((function(e, t, n) {
                        return yo(this, e, "gutter" == t ? "gutter" : "class", (function(e) {
                            var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
                            if (e[r]) {
                                if (S(n).test(e[r])) return !1;
                                e[r] += " " + n
                            } else e[r] = n;
                            return !0
                        }))
                    })),
                    removeLineClass: ni((function(e, t, n) {
                        return yo(this, e, "gutter" == t ? "gutter" : "class", (function(e) {
                            var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass",
                                i = e[r];
                            if (!i) return !1;
                            if (null == n) e[r] = null;
                            else {
                                var o = i.match(S(n));
                                if (!o) return !1;
                                var a = o.index + o[0].length;
                                e[r] = i.slice(0, o.index) + (o.index && a != i.length ? " " : "") + i.slice(a) || null
                            }
                            return !0
                        }))
                    })),
                    addLineWidget: ni((function(e, t, n) {
                        return function(e, t, n, r) {
                            var i = new wo(e, n, r),
                                o = e.cm;
                            return o && i.noHScroll && (o.display.alignWidgets = !0), yo(e, t, "widget", (function(t) {
                                var n = t.widgets || (t.widgets = []);
                                if (null == i.insertAt ? n.push(i) : n.splice(Math.min(n.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !Bt(e, t)) {
                                    var r = qt(t) < e.scrollTop;
                                    Ke(t, t.height + kn(i)), r && Dr(o, i.height), o.curOp.forceUpdate = !0
                                }
                                return !0
                            })), o && sn(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : Ze(t)), i
                        }(this, e, t, n)
                    })),
                    removeLineWidget: function(e) {
                        e.clear()
                    },
                    markText: function(e, t, n) {
                        return To(this, lt(this, e), lt(this, t), n, n && n.type || "range")
                    },
                    setBookmark: function(e, t) {
                        var n = {
                            replacedWith: t && (null == t.nodeType ? t.widget : t),
                            insertLeft: t && t.insertLeft,
                            clearWhenEmpty: !1,
                            shared: t && t.shared,
                            handleMouseEvents: t && t.handleMouseEvents
                        };
                        return To(this, e = lt(this, e), e, n, "bookmark")
                    },
                    findMarksAt: function(e) {
                        var t = [],
                            n = Ge(this, (e = lt(this, e)).line).markedSpans;
                        if (n)
                            for (var r = 0; r < n.length; ++r) {
                                var i = n[r];
                                (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                            }
                        return t
                    },
                    findMarks: function(e, t, n) {
                        e = lt(this, e), t = lt(this, t);
                        var r = [],
                            i = e.line;
                        return this.iter(e.line, t.line + 1, (function(o) {
                            var a = o.markedSpans;
                            if (a)
                                for (var l = 0; l < a.length; l++) {
                                    var s = a[l];
                                    null != s.to && i == e.line && e.ch >= s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from >= t.ch || n && !n(s.marker) || r.push(s.marker.parent || s.marker)
                                }++i
                        })), r
                    },
                    getAllMarks: function() {
                        var e = [];
                        return this.iter((function(t) {
                            var n = t.markedSpans;
                            if (n)
                                for (var r = 0; r < n.length; ++r) null != n[r].from && e.push(n[r].marker)
                        })), e
                    },
                    posFromIndex: function(e) {
                        var t, n = this.first,
                            r = this.lineSeparator().length;
                        return this.iter((function(i) {
                            var o = i.text.length + r;
                            if (o > e) return t = e, !0;
                            e -= o, ++n
                        })), lt(this, et(n, t))
                    },
                    indexFromPos: function(e) {
                        var t = (e = lt(this, e)).ch;
                        if (e.line < this.first || e.ch < 0) return 0;
                        var n = this.lineSeparator().length;
                        return this.iter(this.first, e.line, (function(e) {
                            t += e.text.length + n
                        })), t
                    },
                    copy: function(e) {
                        var t = new Fo(Xe(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
                        return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
                    },
                    linkedDoc: function(e) {
                        e || (e = {});
                        var t = this.first,
                            n = this.first + this.size;
                        null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
                        var r = new Fo(Xe(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction);
                        return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({
                                doc: r,
                                sharedHist: e.sharedHist
                            }), r.linked = [{
                                doc: this,
                                isParent: !0,
                                sharedHist: e.sharedHist
                            }],
                            function(e, t) {
                                for (var n = 0; n < t.length; n++) {
                                    var r = t[n],
                                        i = r.find(),
                                        o = e.clipPos(i.from),
                                        a = e.clipPos(i.to);
                                    if (tt(o, a)) {
                                        var l = To(e, o, a, r.primary, r.primary.type);
                                        r.markers.push(l), l.parent = r
                                    }
                                }
                            }(r, Ao(this)), r
                    },
                    unlinkDoc: function(e) {
                        if (e instanceof Ma && (e = e.doc), this.linked)
                            for (var t = 0; t < this.linked.length; ++t) {
                                if (this.linked[t].doc == e) {
                                    this.linked.splice(t, 1), e.unlinkDoc(this), No(Ao(this));
                                    break
                                }
                            }
                        if (e.history == this.history) {
                            var n = [e.id];
                            Ii(e, (function(e) {
                                return n.push(e.id)
                            }), !0), e.history = new Ri(null), e.history.done = Gi(this.history.done, n), e.history.undone = Gi(this.history.undone, n)
                        }
                    },
                    iterLinkedDocs: function(e) {
                        Ii(this, e)
                    },
                    getMode: function() {
                        return this.mode
                    },
                    getEditor: function() {
                        return this.cm
                    },
                    splitLines: function(e) {
                        return this.lineSep ? e.split(this.lineSep) : Fe(e)
                    },
                    lineSeparator: function() {
                        return this.lineSep || "\n"
                    },
                    setDirection: ni((function(e) {
                        var t;
                        ("rtl" != e && (e = "ltr"), e != this.direction) && (this.direction = e, this.iter((function(e) {
                            return e.order = null
                        })), this.cm && Jr(t = this.cm, (function() {
                            Hi(t), dr(t)
                        })))
                    }))
                }), Fo.prototype.eachLine = Fo.prototype.iter;
                var Eo = 0;

                function Oo(e) {
                    var t = this;
                    if (Io(t), !me(t, e) && !wn(t.display, e)) {
                        ye(e), a && (Eo = +new Date);
                        var n = cr(t, e, !0),
                            r = e.dataTransfer.files;
                        if (n && !t.isReadOnly())
                            if (r && r.length && window.FileReader && window.File)
                                for (var i = r.length, o = Array(i), l = 0, s = function() {
                                        ++l == i && ei(t, (function() {
                                            var e = {
                                                from: n = lt(t.doc, n),
                                                to: n,
                                                text: t.doc.splitLines(o.filter((function(e) {
                                                    return null != e
                                                })).join(t.doc.lineSeparator())),
                                                origin: "paste"
                                            };
                                            co(t.doc, e), Qi(t.doc, Li(lt(t.doc, n), lt(t.doc, Ti(e))))
                                        }))()
                                    }, c = function(e, n) {
                                        if (t.options.allowDropFileTypes && -1 == W(t.options.allowDropFileTypes, e.type)) s();
                                        else {
                                            var r = new FileReader;
                                            r.onerror = function() {
                                                return s()
                                            }, r.onload = function() {
                                                var e = r.result;
                                                /[\x00-\x08\x0e-\x1f]{2}/.test(e) || (o[n] = e), s()
                                            }, r.readAsText(e)
                                        }
                                    }, u = 0; u < r.length; u++) c(r[u], u);
                            else {
                                if (t.state.draggingText && t.doc.sel.contains(n) > -1) return t.state.draggingText(e), void setTimeout((function() {
                                    return t.display.input.focus()
                                }), 20);
                                try {
                                    var d = e.dataTransfer.getData("Text");
                                    if (d) {
                                        var h;
                                        if (t.state.draggingText && !t.state.draggingText.copy && (h = t.listSelections()), eo(t.doc, Li(n, n)), h)
                                            for (var f = 0; f < h.length; ++f) mo(t.doc, "", h[f].anchor, h[f].head, "drag");
                                        t.replaceSelection(d, "around", "paste"), t.display.input.focus()
                                    }
                                } catch (e) {}
                            }
                    }
                }

                function Io(e) {
                    e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
                }

                function zo(e) {
                    if (document.getElementsByClassName) {
                        for (var t = document.getElementsByClassName("CodeMirror"), n = [], r = 0; r < t.length; r++) {
                            var i = t[r].CodeMirror;
                            i && n.push(i)
                        }
                        n.length && n[0].operation((function() {
                            for (var t = 0; t < n.length; t++) e(n[t])
                        }))
                    }
                }
                var Ho = !1;

                function Ro() {
                    var e;
                    Ho || (de(window, "resize", (function() {
                        null == e && (e = setTimeout((function() {
                            e = null, zo(Po)
                        }), 100))
                    })), de(window, "blur", (function() {
                        return zo(Lr)
                    })), Ho = !0)
                }

                function Po(e) {
                    var t = e.display;
                    t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize()
                }
                for (var _o = {
                        3: "Pause",
                        8: "Backspace",
                        9: "Tab",
                        13: "Enter",
                        16: "Shift",
                        17: "Ctrl",
                        18: "Alt",
                        19: "Pause",
                        20: "CapsLock",
                        27: "Esc",
                        32: "Space",
                        33: "PageUp",
                        34: "PageDown",
                        35: "End",
                        36: "Home",
                        37: "Left",
                        38: "Up",
                        39: "Right",
                        40: "Down",
                        44: "PrintScrn",
                        45: "Insert",
                        46: "Delete",
                        59: ";",
                        61: "=",
                        91: "Mod",
                        92: "Mod",
                        93: "Mod",
                        106: "*",
                        107: "=",
                        109: "-",
                        110: ".",
                        111: "/",
                        145: "ScrollLock",
                        173: "-",
                        186: ";",
                        187: "=",
                        188: ",",
                        189: "-",
                        190: ".",
                        191: "/",
                        192: "`",
                        219: "[",
                        220: "\\",
                        221: "]",
                        222: "'",
                        63232: "Up",
                        63233: "Down",
                        63234: "Left",
                        63235: "Right",
                        63272: "Delete",
                        63273: "Home",
                        63275: "End",
                        63276: "PageUp",
                        63277: "PageDown",
                        63302: "Insert"
                    }, Wo = 0; Wo < 10; Wo++) _o[Wo + 48] = _o[Wo + 96] = String(Wo);
                for (var Bo = 65; Bo <= 90; Bo++) _o[Bo] = String.fromCharCode(Bo);
                for (var jo = 1; jo <= 12; jo++) _o[jo + 111] = _o[jo + 63235] = "F" + jo;
                var qo = {};

                function Uo(e) {
                    var t, n, r, i, o = e.split(/-(?!$)/);
                    e = o[o.length - 1];
                    for (var a = 0; a < o.length - 1; a++) {
                        var l = o[a];
                        if (/^(cmd|meta|m)$/i.test(l)) i = !0;
                        else if (/^a(lt)?$/i.test(l)) t = !0;
                        else if (/^(c|ctrl|control)$/i.test(l)) n = !0;
                        else {
                            if (!/^s(hift)?$/i.test(l)) throw new Error("Unrecognized modifier name: " + l);
                            r = !0
                        }
                    }
                    return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), r && (e = "Shift-" + e), e
                }

                function $o(e) {
                    var t = {};
                    for (var n in e)
                        if (e.hasOwnProperty(n)) {
                            var r = e[n];
                            if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;
                            if ("..." == r) {
                                delete e[n];
                                continue
                            }
                            for (var i = K(n.split(" "), Uo), o = 0; o < i.length; o++) {
                                var a = void 0,
                                    l = void 0;
                                o == i.length - 1 ? (l = i.join(" "), a = r) : (l = i.slice(0, o + 1).join(" "), a = "...");
                                var s = t[l];
                                if (s) {
                                    if (s != a) throw new Error("Inconsistent bindings for " + l)
                                } else t[l] = a
                            }
                            delete e[n]
                        }
                    for (var c in t) e[c] = t[c];
                    return e
                }

                function Go(e, t, n, r) {
                    var i = (t = Zo(t)).call ? t.call(e, r) : t[e];
                    if (!1 === i) return "nothing";
                    if ("..." === i) return "multi";
                    if (null != i && n(i)) return "handled";
                    if (t.fallthrough) {
                        if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return Go(e, t.fallthrough, n, r);
                        for (var o = 0; o < t.fallthrough.length; o++) {
                            var a = Go(e, t.fallthrough[o], n, r);
                            if (a) return a
                        }
                    }
                }

                function Vo(e) {
                    var t = "string" == typeof e ? e : _o[e.keyCode];
                    return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
                }

                function Xo(e, t, n) {
                    var r = e;
                    return t.altKey && "Alt" != r && (e = "Alt-" + e), (w ? t.metaKey : t.ctrlKey) && "Ctrl" != r && (e = "Ctrl-" + e), (w ? t.ctrlKey : t.metaKey) && "Cmd" != r && (e = "Cmd-" + e), !n && t.shiftKey && "Shift" != r && (e = "Shift-" + e), e
                }

                function Ko(e, t) {
                    if (d && 34 == e.keyCode && e.char) return !1;
                    var n = _o[e.keyCode];
                    return null != n && !e.altGraphKey && (3 == e.keyCode && e.code && (n = e.code), Xo(n, e, t))
                }

                function Zo(e) {
                    return "string" == typeof e ? qo[e] : e
                }

                function Yo(e, t) {
                    for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
                        for (var o = t(n[i]); r.length && tt(o.from, X(r).to) <= 0;) {
                            var a = r.pop();
                            if (tt(a.from, o.from) < 0) {
                                o.from = a.from;
                                break
                            }
                        }
                        r.push(o)
                    }
                    Jr(e, (function() {
                        for (var t = r.length - 1; t >= 0; t--) mo(e.doc, "", r[t].from, r[t].to, "+delete");
                        Fr(e)
                    }))
                }

                function Qo(e, t, n) {
                    var r = ie(e.text, t + n, n);
                    return r < 0 || r > e.text.length ? null : r
                }

                function Jo(e, t, n) {
                    var r = Qo(e, t.ch, n);
                    return null == r ? null : new et(t.line, r, n < 0 ? "after" : "before")
                }

                function ea(e, t, n, r, i) {
                    if (e) {
                        "rtl" == t.doc.direction && (i = -i);
                        var o = ce(n, t.doc.direction);
                        if (o) {
                            var a, l = i < 0 ? X(o) : o[0],
                                s = i < 0 == (1 == l.level) ? "after" : "before";
                            if (l.level > 0 || "rtl" == t.doc.direction) {
                                var c = En(t, n);
                                a = i < 0 ? n.text.length - 1 : 0;
                                var u = On(t, c, a).top;
                                a = oe((function(e) {
                                    return On(t, c, e).top == u
                                }), i < 0 == (1 == l.level) ? l.from : l.to - 1, a), "before" == s && (a = Qo(n, a, 1))
                            } else a = i < 0 ? l.to : l.from;
                            return new et(r, a, s)
                        }
                    }
                    return new et(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after")
                }
                qo.basic = {
                    Left: "goCharLeft",
                    Right: "goCharRight",
                    Up: "goLineUp",
                    Down: "goLineDown",
                    End: "goLineEnd",
                    Home: "goLineStartSmart",
                    PageUp: "goPageUp",
                    PageDown: "goPageDown",
                    Delete: "delCharAfter",
                    Backspace: "delCharBefore",
                    "Shift-Backspace": "delCharBefore",
                    Tab: "defaultTab",
                    "Shift-Tab": "indentAuto",
                    Enter: "newlineAndIndent",
                    Insert: "toggleOverwrite",
                    Esc: "singleSelection"
                }, qo.pcDefault = {
                    "Ctrl-A": "selectAll",
                    "Ctrl-D": "deleteLine",
                    "Ctrl-Z": "undo",
                    "Shift-Ctrl-Z": "redo",
                    "Ctrl-Y": "redo",
                    "Ctrl-Home": "goDocStart",
                    "Ctrl-End": "goDocEnd",
                    "Ctrl-Up": "goLineUp",
                    "Ctrl-Down": "goLineDown",
                    "Ctrl-Left": "goGroupLeft",
                    "Ctrl-Right": "goGroupRight",
                    "Alt-Left": "goLineStart",
                    "Alt-Right": "goLineEnd",
                    "Ctrl-Backspace": "delGroupBefore",
                    "Ctrl-Delete": "delGroupAfter",
                    "Ctrl-S": "save",
                    "Ctrl-F": "find",
                    "Ctrl-G": "findNext",
                    "Shift-Ctrl-G": "findPrev",
                    "Shift-Ctrl-F": "replace",
                    "Shift-Ctrl-R": "replaceAll",
                    "Ctrl-[": "indentLess",
                    "Ctrl-]": "indentMore",
                    "Ctrl-U": "undoSelection",
                    "Shift-Ctrl-U": "redoSelection",
                    "Alt-U": "redoSelection",
                    fallthrough: "basic"
                }, qo.emacsy = {
                    "Ctrl-F": "goCharRight",
                    "Ctrl-B": "goCharLeft",
                    "Ctrl-P": "goLineUp",
                    "Ctrl-N": "goLineDown",
                    "Alt-F": "goWordRight",
                    "Alt-B": "goWordLeft",
                    "Ctrl-A": "goLineStart",
                    "Ctrl-E": "goLineEnd",
                    "Ctrl-V": "goPageDown",
                    "Shift-Ctrl-V": "goPageUp",
                    "Ctrl-D": "delCharAfter",
                    "Ctrl-H": "delCharBefore",
                    "Alt-D": "delWordAfter",
                    "Alt-Backspace": "delWordBefore",
                    "Ctrl-K": "killLine",
                    "Ctrl-T": "transposeChars",
                    "Ctrl-O": "openLine"
                }, qo.macDefault = {
                    "Cmd-A": "selectAll",
                    "Cmd-D": "deleteLine",
                    "Cmd-Z": "undo",
                    "Shift-Cmd-Z": "redo",
                    "Cmd-Y": "redo",
                    "Cmd-Home": "goDocStart",
                    "Cmd-Up": "goDocStart",
                    "Cmd-End": "goDocEnd",
                    "Cmd-Down": "goDocEnd",
                    "Alt-Left": "goGroupLeft",
                    "Alt-Right": "goGroupRight",
                    "Cmd-Left": "goLineLeft",
                    "Cmd-Right": "goLineRight",
                    "Alt-Backspace": "delGroupBefore",
                    "Ctrl-Alt-Backspace": "delGroupAfter",
                    "Alt-Delete": "delGroupAfter",
                    "Cmd-S": "save",
                    "Cmd-F": "find",
                    "Cmd-G": "findNext",
                    "Shift-Cmd-G": "findPrev",
                    "Cmd-Alt-F": "replace",
                    "Shift-Cmd-Alt-F": "replaceAll",
                    "Cmd-[": "indentLess",
                    "Cmd-]": "indentMore",
                    "Cmd-Backspace": "delWrappedLineLeft",
                    "Cmd-Delete": "delWrappedLineRight",
                    "Cmd-U": "undoSelection",
                    "Shift-Cmd-U": "redoSelection",
                    "Ctrl-Up": "goDocStart",
                    "Ctrl-Down": "goDocEnd",
                    fallthrough: ["basic", "emacsy"]
                }, qo.default = x ? qo.macDefault : qo.pcDefault;
                var ta = {
                    selectAll: lo,
                    singleSelection: function(e) {
                        return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), j)
                    },
                    killLine: function(e) {
                        return Yo(e, (function(t) {
                            if (t.empty()) {
                                var n = Ge(e.doc, t.head.line).text.length;
                                return t.head.ch == n && t.head.line < e.lastLine() ? {
                                    from: t.head,
                                    to: et(t.head.line + 1, 0)
                                } : {
                                    from: t.head,
                                    to: et(t.head.line, n)
                                }
                            }
                            return {
                                from: t.from(),
                                to: t.to()
                            }
                        }))
                    },
                    deleteLine: function(e) {
                        return Yo(e, (function(t) {
                            return {
                                from: et(t.from().line, 0),
                                to: lt(e.doc, et(t.to().line + 1, 0))
                            }
                        }))
                    },
                    delLineLeft: function(e) {
                        return Yo(e, (function(e) {
                            return {
                                from: et(e.from().line, 0),
                                to: e.from()
                            }
                        }))
                    },
                    delWrappedLineLeft: function(e) {
                        return Yo(e, (function(t) {
                            var n = e.charCoords(t.head, "div").top + 5;
                            return {
                                from: e.coordsChar({
                                    left: 0,
                                    top: n
                                }, "div"),
                                to: t.from()
                            }
                        }))
                    },
                    delWrappedLineRight: function(e) {
                        return Yo(e, (function(t) {
                            var n = e.charCoords(t.head, "div").top + 5,
                                r = e.coordsChar({
                                    left: e.display.lineDiv.offsetWidth + 100,
                                    top: n
                                }, "div");
                            return {
                                from: t.from(),
                                to: r
                            }
                        }))
                    },
                    undo: function(e) {
                        return e.undo()
                    },
                    redo: function(e) {
                        return e.redo()
                    },
                    undoSelection: function(e) {
                        return e.undoSelection()
                    },
                    redoSelection: function(e) {
                        return e.redoSelection()
                    },
                    goDocStart: function(e) {
                        return e.extendSelection(et(e.firstLine(), 0))
                    },
                    goDocEnd: function(e) {
                        return e.extendSelection(et(e.lastLine()))
                    },
                    goLineStart: function(e) {
                        return e.extendSelectionsBy((function(t) {
                            return na(e, t.head.line)
                        }), {
                            origin: "+move",
                            bias: 1
                        })
                    },
                    goLineStartSmart: function(e) {
                        return e.extendSelectionsBy((function(t) {
                            return ra(e, t.head)
                        }), {
                            origin: "+move",
                            bias: 1
                        })
                    },
                    goLineEnd: function(e) {
                        return e.extendSelectionsBy((function(t) {
                            return function(e, t) {
                                var n = Ge(e.doc, t),
                                    r = function(e) {
                                        for (var t; t = zt(e);) e = t.find(1, !0).line;
                                        return e
                                    }(n);
                                r != n && (t = Ze(r));
                                return ea(!0, e, n, t, -1)
                            }(e, t.head.line)
                        }), {
                            origin: "+move",
                            bias: -1
                        })
                    },
                    goLineRight: function(e) {
                        return e.extendSelectionsBy((function(t) {
                            var n = e.cursorCoords(t.head, "div").top + 5;
                            return e.coordsChar({
                                left: e.display.lineDiv.offsetWidth + 100,
                                top: n
                            }, "div")
                        }), U)
                    },
                    goLineLeft: function(e) {
                        return e.extendSelectionsBy((function(t) {
                            var n = e.cursorCoords(t.head, "div").top + 5;
                            return e.coordsChar({
                                left: 0,
                                top: n
                            }, "div")
                        }), U)
                    },
                    goLineLeftSmart: function(e) {
                        return e.extendSelectionsBy((function(t) {
                            var n = e.cursorCoords(t.head, "div").top + 5,
                                r = e.coordsChar({
                                    left: 0,
                                    top: n
                                }, "div");
                            return r.ch < e.getLine(r.line).search(/\S/) ? ra(e, t.head) : r
                        }), U)
                    },
                    goLineUp: function(e) {
                        return e.moveV(-1, "line")
                    },
                    goLineDown: function(e) {
                        return e.moveV(1, "line")
                    },
                    goPageUp: function(e) {
                        return e.moveV(-1, "page")
                    },
                    goPageDown: function(e) {
                        return e.moveV(1, "page")
                    },
                    goCharLeft: function(e) {
                        return e.moveH(-1, "char")
                    },
                    goCharRight: function(e) {
                        return e.moveH(1, "char")
                    },
                    goColumnLeft: function(e) {
                        return e.moveH(-1, "column")
                    },
                    goColumnRight: function(e) {
                        return e.moveH(1, "column")
                    },
                    goWordLeft: function(e) {
                        return e.moveH(-1, "word")
                    },
                    goGroupRight: function(e) {
                        return e.moveH(1, "group")
                    },
                    goGroupLeft: function(e) {
                        return e.moveH(-1, "group")
                    },
                    goWordRight: function(e) {
                        return e.moveH(1, "word")
                    },
                    delCharBefore: function(e) {
                        return e.deleteH(-1, "char")
                    },
                    delCharAfter: function(e) {
                        return e.deleteH(1, "char")
                    },
                    delWordBefore: function(e) {
                        return e.deleteH(-1, "word")
                    },
                    delWordAfter: function(e) {
                        return e.deleteH(1, "word")
                    },
                    delGroupBefore: function(e) {
                        return e.deleteH(-1, "group")
                    },
                    delGroupAfter: function(e) {
                        return e.deleteH(1, "group")
                    },
                    indentAuto: function(e) {
                        return e.indentSelection("smart")
                    },
                    indentMore: function(e) {
                        return e.indentSelection("add")
                    },
                    indentLess: function(e) {
                        return e.indentSelection("subtract")
                    },
                    insertTab: function(e) {
                        return e.replaceSelection("\t")
                    },
                    insertSoftTab: function(e) {
                        for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
                            var o = n[i].from(),
                                a = P(e.getLine(o.line), o.ch, r);
                            t.push(V(r - a % r))
                        }
                        e.replaceSelections(t)
                    },
                    defaultTab: function(e) {
                        e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
                    },
                    transposeChars: function(e) {
                        return Jr(e, (function() {
                            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
                                if (t[r].empty()) {
                                    var i = t[r].head,
                                        o = Ge(e.doc, i.line).text;
                                    if (o)
                                        if (i.ch == o.length && (i = new et(i.line, i.ch - 1)), i.ch > 0) i = new et(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), et(i.line, i.ch - 2), i, "+transpose");
                                        else if (i.line > e.doc.first) {
                                        var a = Ge(e.doc, i.line - 1).text;
                                        a && (i = new et(i.line, 1), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), et(i.line - 1, a.length - 1), i, "+transpose"))
                                    }
                                    n.push(new Ci(i, i))
                                }
                            e.setSelections(n)
                        }))
                    },
                    newlineAndIndent: function(e) {
                        return Jr(e, (function() {
                            for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--) e.replaceRange(e.doc.lineSeparator(), t[n].anchor, t[n].head, "+input");
                            t = e.listSelections();
                            for (var r = 0; r < t.length; r++) e.indentLine(t[r].from().line, null, !0);
                            Fr(e)
                        }))
                    },
                    openLine: function(e) {
                        return e.replaceSelection("\n", "start")
                    },
                    toggleOverwrite: function(e) {
                        return e.toggleOverwrite()
                    }
                };

                function na(e, t) {
                    var n = Ge(e.doc, t),
                        r = Pt(n);
                    return r != n && (t = Ze(r)), ea(!0, e, r, t, 1)
                }

                function ra(e, t) {
                    var n = na(e, t.line),
                        r = Ge(e.doc, n.line),
                        i = ce(r, e.doc.direction);
                    if (!i || 0 == i[0].level) {
                        var o = Math.max(n.ch, r.text.search(/\S/)),
                            a = t.line == n.line && t.ch <= o && t.ch;
                        return et(n.line, a ? 0 : o, n.sticky)
                    }
                    return n
                }

                function ia(e, t, n) {
                    if ("string" == typeof t && !(t = ta[t])) return !1;
                    e.display.input.ensurePolled();
                    var r = e.display.shift,
                        i = !1;
                    try {
                        e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != B
                    } finally {
                        e.display.shift = r, e.state.suppressEdits = !1
                    }
                    return i
                }
                var oa = new _;

                function aa(e, t, n, r) {
                    var i = e.state.keySeq;
                    if (i) {
                        if (Vo(t)) return "handled";
                        if (/\'$/.test(t) ? e.state.keySeq = null : oa.set(50, (function() {
                                e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
                            })), la(e, i + " " + t, n, r)) return !0
                    }
                    return la(e, t, n, r)
                }

                function la(e, t, n, r) {
                    var i = function(e, t, n) {
                        for (var r = 0; r < e.state.keyMaps.length; r++) {
                            var i = Go(t, e.state.keyMaps[r], n, e);
                            if (i) return i
                        }
                        return e.options.extraKeys && Go(t, e.options.extraKeys, n, e) || Go(t, e.options.keyMap, n, e)
                    }(e, t, r);
                    return "multi" == i && (e.state.keySeq = t), "handled" == i && sn(e, "keyHandled", e, t, n), "handled" != i && "multi" != i || (ye(n), kr(e)), !!i
                }

                function sa(e, t) {
                    var n = Ko(t, !0);
                    return !!n && (t.shiftKey && !e.state.keySeq ? aa(e, "Shift-" + n, t, (function(t) {
                        return ia(e, t, !0)
                    })) || aa(e, n, t, (function(t) {
                        if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return ia(e, t)
                    })) : aa(e, n, t, (function(t) {
                        return ia(e, t)
                    })))
                }
                var ca = null;

                function ua(e) {
                    var t = this;
                    if (!(e.target && e.target != t.display.input.getField() || (t.curOp.focus = E(), me(t, e)))) {
                        a && l < 11 && 27 == e.keyCode && (e.returnValue = !1);
                        var r = e.keyCode;
                        t.display.shift = 16 == r || e.shiftKey;
                        var i = sa(t, e);
                        d && (ca = i ? r : null, i || 88 != r || Oe || !(x ? e.metaKey : e.ctrlKey) || t.replaceSelection("", null, "cut")), n && !x && !i && 46 == r && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), 18 != r || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || function(e) {
                            var t = e.display.lineDiv;

                            function n(e) {
                                18 != e.keyCode && e.altKey || (T(t, "CodeMirror-crosshair"), fe(document, "keyup", n), fe(document, "mouseover", n))
                            }
                            O(t, "CodeMirror-crosshair"), de(document, "keyup", n), de(document, "mouseover", n)
                        }(t)
                    }
                }

                function da(e) {
                    16 == e.keyCode && (this.doc.sel.shift = !1), me(this, e)
                }

                function ha(e) {
                    var t = this;
                    if (!(e.target && e.target != t.display.input.getField() || wn(t.display, e) || me(t, e) || e.ctrlKey && !e.altKey || x && e.metaKey)) {
                        var n = e.keyCode,
                            r = e.charCode;
                        if (d && n == ca) return ca = null, void ye(e);
                        if (!d || e.which && !(e.which < 10) || !sa(t, e)) {
                            var i = String.fromCharCode(null == r ? n : r);
                            "\b" != i && (function(e, t, n) {
                                return aa(e, "'" + n + "'", t, (function(t) {
                                    return ia(e, t, !0)
                                }))
                            }(t, e, i) || t.display.input.onKeyPress(e))
                        }
                    }
                }
                var fa, pa, ma = function(e, t, n) {
                    this.time = e, this.pos = t, this.button = n
                };

                function ga(e) {
                    var t = this,
                        n = t.display;
                    if (!(me(t, e) || n.activeTouch && n.input.supportsTouch()))
                        if (n.input.ensurePolled(), n.shift = e.shiftKey, wn(n, e)) s || (n.scroller.draggable = !1, setTimeout((function() {
                            return n.scroller.draggable = !0
                        }), 100));
                        else if (!ya(t, e)) {
                        var r = cr(t, e),
                            i = Se(e),
                            o = r ? function(e, t) {
                                var n = +new Date;
                                return pa && pa.compare(n, e, t) ? (fa = pa = null, "triple") : fa && fa.compare(n, e, t) ? (pa = new ma(n, e, t), fa = null, "double") : (fa = new ma(n, e, t), pa = null, "single")
                            }(r, i) : "single";
                        window.focus(), 1 == i && t.state.selectingText && t.state.selectingText(e), r && function(e, t, n, r, i) {
                            var o = "Click";
                            "double" == r ? o = "Double" + o : "triple" == r && (o = "Triple" + o);
                            return aa(e, Xo(o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o, i), i, (function(t) {
                                if ("string" == typeof t && (t = ta[t]), !t) return !1;
                                var r = !1;
                                try {
                                    e.isReadOnly() && (e.state.suppressEdits = !0), r = t(e, n) != B
                                } finally {
                                    e.state.suppressEdits = !1
                                }
                                return r
                            }))
                        }(t, i, r, o, e) || (1 == i ? r ? function(e, t, n, r) {
                            a ? setTimeout(H(wr, e), 0) : e.curOp.focus = E();
                            var i, o = function(e, t, n) {
                                    var r = e.getOption("configureMouse"),
                                        i = r ? r(e, t, n) : {};
                                    if (null == i.unit) {
                                        var o = y ? n.shiftKey && n.metaKey : n.altKey;
                                        i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line"
                                    }(null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || n.shiftKey);
                                    null == i.addNew && (i.addNew = x ? n.metaKey : n.ctrlKey);
                                    null == i.moveOnDrag && (i.moveOnDrag = !(x ? n.altKey : n.ctrlKey));
                                    return i
                                }(e, n, r),
                                c = e.doc.sel;
                            e.options.dragDrop && Me && !e.isReadOnly() && "single" == n && (i = c.contains(t)) > -1 && (tt((i = c.ranges[i]).from(), t) < 0 || t.xRel > 0) && (tt(i.to(), t) > 0 || t.xRel < 0) ? function(e, t, n, r) {
                                var i = e.display,
                                    o = !1,
                                    c = ei(e, (function(t) {
                                        s && (i.scroller.draggable = !1), e.state.draggingText = !1, fe(i.wrapper.ownerDocument, "mouseup", c), fe(i.wrapper.ownerDocument, "mousemove", u), fe(i.scroller, "dragstart", d), fe(i.scroller, "drop", c), o || (ye(t), r.addNew || Xi(e.doc, n, null, null, r.extend), s && !h || a && 9 == l ? setTimeout((function() {
                                            i.wrapper.ownerDocument.body.focus({
                                                preventScroll: !0
                                            }), i.input.focus()
                                        }), 20) : i.input.focus())
                                    })),
                                    u = function(e) {
                                        o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10
                                    },
                                    d = function() {
                                        return o = !0
                                    };
                                s && (i.scroller.draggable = !0);
                                e.state.draggingText = c, c.copy = !r.moveOnDrag, i.scroller.dragDrop && i.scroller.dragDrop();
                                de(i.wrapper.ownerDocument, "mouseup", c), de(i.wrapper.ownerDocument, "mousemove", u), de(i.scroller, "dragstart", d), de(i.scroller, "drop", c), Cr(e), setTimeout((function() {
                                    return i.input.focus()
                                }), 20)
                            }(e, r, t, o) : function(e, t, n, r) {
                                var i = e.display,
                                    o = e.doc;
                                ye(t);
                                var a, l, s = o.sel,
                                    c = s.ranges;
                                r.addNew && !r.extend ? (l = o.sel.contains(n), a = l > -1 ? c[l] : new Ci(n, n)) : (a = o.sel.primary(), l = o.sel.primIndex);
                                if ("rectangle" == r.unit) r.addNew || (a = new Ci(n, n)), n = cr(e, t, !0, !0), l = -1;
                                else {
                                    var u = va(e, n, r.unit);
                                    a = r.extend ? Vi(a, u.anchor, u.head, r.extend) : u
                                }
                                r.addNew ? -1 == l ? (l = c.length, Ji(o, Si(e, c.concat([a]), l), {
                                    scroll: !1,
                                    origin: "*mouse"
                                })) : c.length > 1 && c[l].empty() && "char" == r.unit && !r.extend ? (Ji(o, Si(e, c.slice(0, l).concat(c.slice(l + 1)), 0), {
                                    scroll: !1,
                                    origin: "*mouse"
                                }), s = o.sel) : Zi(o, l, a, q) : (l = 0, Ji(o, new wi([a], 0), q), s = o.sel);
                                var d = n;

                                function h(t) {
                                    if (0 != tt(d, t))
                                        if (d = t, "rectangle" == r.unit) {
                                            for (var i = [], c = e.options.tabSize, u = P(Ge(o, n.line).text, n.ch, c), h = P(Ge(o, t.line).text, t.ch, c), f = Math.min(u, h), p = Math.max(u, h), m = Math.min(n.line, t.line), g = Math.min(e.lastLine(), Math.max(n.line, t.line)); m <= g; m++) {
                                                var v = Ge(o, m).text,
                                                    x = $(v, f, c);
                                                f == p ? i.push(new Ci(et(m, x), et(m, x))) : v.length > x && i.push(new Ci(et(m, x), et(m, $(v, p, c))))
                                            }
                                            i.length || i.push(new Ci(n, n)), Ji(o, Si(e, s.ranges.slice(0, l).concat(i), l), {
                                                origin: "*mouse",
                                                scroll: !1
                                            }), e.scrollIntoView(t)
                                        } else {
                                            var y, b = a,
                                                k = va(e, t, r.unit),
                                                w = b.anchor;
                                            tt(k.anchor, w) > 0 ? (y = k.head, w = ot(b.from(), k.anchor)) : (y = k.anchor, w = it(b.to(), k.head));
                                            var C = s.ranges.slice(0);
                                            C[l] = function(e, t) {
                                                var n = t.anchor,
                                                    r = t.head,
                                                    i = Ge(e.doc, n.line);
                                                if (0 == tt(n, r) && n.sticky == r.sticky) return t;
                                                var o = ce(i);
                                                if (!o) return t;
                                                var a = le(o, n.ch, n.sticky),
                                                    l = o[a];
                                                if (l.from != n.ch && l.to != n.ch) return t;
                                                var s, c = a + (l.from == n.ch == (1 != l.level) ? 0 : 1);
                                                if (0 == c || c == o.length) return t;
                                                if (r.line != n.line) s = (r.line - n.line) * ("ltr" == e.doc.direction ? 1 : -1) > 0;
                                                else {
                                                    var u = le(o, r.ch, r.sticky),
                                                        d = u - a || (r.ch - n.ch) * (1 == l.level ? -1 : 1);
                                                    s = u == c - 1 || u == c ? d < 0 : d > 0
                                                }
                                                var h = o[c + (s ? -1 : 0)],
                                                    f = s == (1 == h.level),
                                                    p = f ? h.from : h.to,
                                                    m = f ? "after" : "before";
                                                return n.ch == p && n.sticky == m ? t : new Ci(new et(n.line, p, m), r)
                                            }(e, new Ci(lt(o, w), y)), Ji(o, Si(e, C, l), q)
                                        }
                                }
                                var f = i.wrapper.getBoundingClientRect(),
                                    p = 0;

                                function m(t) {
                                    e.state.selectingText = !1, p = 1 / 0, t && (ye(t), i.input.focus()), fe(i.wrapper.ownerDocument, "mousemove", g), fe(i.wrapper.ownerDocument, "mouseup", v), o.history.lastSelOrigin = null
                                }
                                var g = ei(e, (function(t) {
                                        0 !== t.buttons && Se(t) ? function t(n) {
                                            var a = ++p,
                                                l = cr(e, n, !0, "rectangle" == r.unit);
                                            if (l)
                                                if (0 != tt(l, d)) {
                                                    e.curOp.focus = E(), h(l);
                                                    var s = Ar(i, o);
                                                    (l.line >= s.to || l.line < s.from) && setTimeout(ei(e, (function() {
                                                        p == a && t(n)
                                                    })), 150)
                                                } else {
                                                    var c = n.clientY < f.top ? -20 : n.clientY > f.bottom ? 20 : 0;
                                                    c && setTimeout(ei(e, (function() {
                                                        p == a && (i.scroller.scrollTop += c, t(n))
                                                    })), 50)
                                                }
                                        }(t) : m(t)
                                    })),
                                    v = ei(e, m);
                                e.state.selectingText = v, de(i.wrapper.ownerDocument, "mousemove", g), de(i.wrapper.ownerDocument, "mouseup", v)
                            }(e, r, t, o)
                        }(t, r, o, e) : Ce(e) == n.scroller && ye(e) : 2 == i ? (r && Xi(t.doc, r), setTimeout((function() {
                            return n.input.focus()
                        }), 20)) : 3 == i && (C ? t.display.input.onContextMenu(e) : Cr(t)))
                    }
                }

                function va(e, t, n) {
                    if ("char" == n) return new Ci(t, t);
                    if ("word" == n) return e.findWordAt(t);
                    if ("line" == n) return new Ci(et(t.line, 0), lt(e.doc, et(t.line + 1, 0)));
                    var r = n(e, t);
                    return new Ci(r.from, r.to)
                }

                function xa(e, t, n, r) {
                    var i, o;
                    if (t.touches) i = t.touches[0].clientX, o = t.touches[0].clientY;
                    else try {
                        i = t.clientX, o = t.clientY
                    } catch (e) {
                        return !1
                    }
                    if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
                    r && ye(t);
                    var a = e.display,
                        l = a.lineDiv.getBoundingClientRect();
                    if (o > l.bottom || !ve(e, n)) return ke(t);
                    o -= l.top - a.viewOffset;
                    for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
                        var c = a.gutters.childNodes[s];
                        if (c && c.getBoundingClientRect().right >= i) return pe(e, n, e, Ye(e.doc, o), e.display.gutterSpecs[s].className, t), ke(t)
                    }
                }

                function ya(e, t) {
                    return xa(e, t, "gutterClick", !0)
                }

                function ba(e, t) {
                    wn(e.display, t) || function(e, t) {
                        if (!ve(e, "gutterContextMenu")) return !1;
                        return xa(e, t, "gutterContextMenu", !1)
                    }(e, t) || me(e, t, "contextmenu") || C || e.display.input.onContextMenu(t)
                }

                function ka(e) {
                    e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Wn(e)
                }
                ma.prototype.compare = function(e, t, n) {
                    return this.time + 400 > e && 0 == tt(t, this.pos) && n == this.button
                };
                var wa = {
                        toString: function() {
                            return "CodeMirror.Init"
                        }
                    },
                    Ca = {},
                    Sa = {};

                function La(e, t, n) {
                    if (!t != !(n && n != wa)) {
                        var r = e.display.dragFunctions,
                            i = t ? de : fe;
                        i(e.display.scroller, "dragstart", r.start), i(e.display.scroller, "dragenter", r.enter), i(e.display.scroller, "dragover", r.over), i(e.display.scroller, "dragleave", r.leave), i(e.display.scroller, "drop", r.drop)
                    }
                }

                function Ta(e) {
                    e.options.lineWrapping ? (O(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (T(e.display.wrapper, "CodeMirror-wrap"), $t(e)), sr(e), dr(e), Wn(e), setTimeout((function() {
                        return Br(e)
                    }), 100)
                }

                function Ma(e, t) {
                    var n = this;
                    if (!(this instanceof Ma)) return new Ma(e, t);
                    this.options = t = t ? R(t) : {}, R(Ca, t, !1);
                    var r = t.value;
                    "string" == typeof r ? r = new Fo(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode), this.doc = r;
                    var i = new Ma.inputStyles[t.inputStyle](this),
                        o = this.display = new gi(e, r, i, t);
                    for (var c in o.wrapper.CodeMirror = this, ka(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), Ur(this), this.state = {
                                keyMaps: [],
                                overlays: [],
                                modeGen: 0,
                                overwrite: !1,
                                delayingBlurEvent: !1,
                                focused: !1,
                                suppressEdits: !1,
                                pasteIncoming: -1,
                                cutIncoming: -1,
                                selectingText: !1,
                                draggingText: !1,
                                highlight: new _,
                                keySeq: null,
                                specialChars: null
                            }, t.autofocus && !v && o.input.focus(), a && l < 11 && setTimeout((function() {
                                return n.display.input.reset(!0)
                            }), 20),
                            function(e) {
                                var t = e.display;
                                de(t.scroller, "mousedown", ei(e, ga)), de(t.scroller, "dblclick", a && l < 11 ? ei(e, (function(t) {
                                    if (!me(e, t)) {
                                        var n = cr(e, t);
                                        if (n && !ya(e, t) && !wn(e.display, t)) {
                                            ye(t);
                                            var r = e.findWordAt(n);
                                            Xi(e.doc, r.anchor, r.head)
                                        }
                                    }
                                })) : function(t) {
                                    return me(e, t) || ye(t)
                                });
                                de(t.scroller, "contextmenu", (function(t) {
                                    return ba(e, t)
                                })), de(t.input.getField(), "contextmenu", (function(n) {
                                    t.scroller.contains(n.target) || ba(e, n)
                                }));
                                var n, r = {
                                    end: 0
                                };

                                function i() {
                                    t.activeTouch && (n = setTimeout((function() {
                                        return t.activeTouch = null
                                    }), 1e3), (r = t.activeTouch).end = +new Date)
                                }

                                function o(e, t) {
                                    if (null == t.left) return !0;
                                    var n = t.left - e.left,
                                        r = t.top - e.top;
                                    return n * n + r * r > 400
                                }
                                de(t.scroller, "touchstart", (function(i) {
                                    if (!me(e, i) && ! function(e) {
                                            if (1 != e.touches.length) return !1;
                                            var t = e.touches[0];
                                            return t.radiusX <= 1 && t.radiusY <= 1
                                        }(i) && !ya(e, i)) {
                                        t.input.ensurePolled(), clearTimeout(n);
                                        var o = +new Date;
                                        t.activeTouch = {
                                            start: o,
                                            moved: !1,
                                            prev: o - r.end <= 300 ? r : null
                                        }, 1 == i.touches.length && (t.activeTouch.left = i.touches[0].pageX, t.activeTouch.top = i.touches[0].pageY)
                                    }
                                })), de(t.scroller, "touchmove", (function() {
                                    t.activeTouch && (t.activeTouch.moved = !0)
                                })), de(t.scroller, "touchend", (function(n) {
                                    var r = t.activeTouch;
                                    if (r && !wn(t, n) && null != r.left && !r.moved && new Date - r.start < 300) {
                                        var a, l = e.coordsChar(t.activeTouch, "page");
                                        a = !r.prev || o(r, r.prev) ? new Ci(l, l) : !r.prev.prev || o(r, r.prev.prev) ? e.findWordAt(l) : new Ci(et(l.line, 0), lt(e.doc, et(l.line + 1, 0))), e.setSelection(a.anchor, a.head), e.focus(), ye(n)
                                    }
                                    i()
                                })), de(t.scroller, "touchcancel", i), de(t.scroller, "scroll", (function() {
                                    t.scroller.clientHeight && (zr(e, t.scroller.scrollTop), Rr(e, t.scroller.scrollLeft, !0), pe(e, "scroll", e))
                                })), de(t.scroller, "mousewheel", (function(t) {
                                    return ki(e, t)
                                })), de(t.scroller, "DOMMouseScroll", (function(t) {
                                    return ki(e, t)
                                })), de(t.wrapper, "scroll", (function() {
                                    return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0
                                })), t.dragFunctions = {
                                    enter: function(t) {
                                        me(e, t) || we(t)
                                    },
                                    over: function(t) {
                                        me(e, t) || (! function(e, t) {
                                            var n = cr(e, t);
                                            if (n) {
                                                var r = document.createDocumentFragment();
                                                xr(e, n, r), e.display.dragCursor || (e.display.dragCursor = N("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), A(e.display.dragCursor, r)
                                            }
                                        }(e, t), we(t))
                                    },
                                    start: function(t) {
                                        return function(e, t) {
                                            if (a && (!e.state.draggingText || +new Date - Eo < 100)) we(t);
                                            else if (!me(e, t) && !wn(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !h)) {
                                                var n = N("img", null, null, "position: fixed; left: 0; top: 0;");
                                                n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", d && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), d && n.parentNode.removeChild(n)
                                            }
                                        }(e, t)
                                    },
                                    drop: ei(e, Oo),
                                    leave: function(t) {
                                        me(e, t) || Io(e)
                                    }
                                };
                                var s = t.input.getField();
                                de(s, "keyup", (function(t) {
                                    return da.call(e, t)
                                })), de(s, "keydown", ei(e, ua)), de(s, "keypress", ei(e, ha)), de(s, "focus", (function(t) {
                                    return Sr(e, t)
                                })), de(s, "blur", (function(t) {
                                    return Lr(e, t)
                                }))
                            }(this), Ro(), Gr(this), this.curOp.forceUpdate = !0, zi(this, r), t.autofocus && !v || this.hasFocus() ? setTimeout(H(Sr, this), 20) : Lr(this), Sa) Sa.hasOwnProperty(c) && Sa[c](this, t[c], wa);
                    hi(this), t.finishInit && t.finishInit(this);
                    for (var u = 0; u < Aa.length; ++u) Aa[u](this);
                    Vr(this), s && t.lineWrapping && "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering && (o.lineDiv.style.textRendering = "auto")
                }
                Ma.defaults = Ca, Ma.optionHandlers = Sa;
                var Aa = [];

                function Na(e, t, n, r) {
                    var i, o = e.doc;
                    null == n && (n = "add"), "smart" == n && (o.mode.indent ? i = ft(e, t).state : n = "prev");
                    var a = e.options.tabSize,
                        l = Ge(o, t),
                        s = P(l.text, null, a);
                    l.stateAfter && (l.stateAfter = null);
                    var c, u = l.text.match(/^\s*/)[0];
                    if (r || /\S/.test(l.text)) {
                        if ("smart" == n && ((c = o.mode.indent(i, l.text.slice(u.length), l.text)) == B || c > 150)) {
                            if (!r) return;
                            n = "prev"
                        }
                    } else c = 0, n = "not";
                    "prev" == n ? c = t > o.first ? P(Ge(o, t - 1).text, null, a) : 0 : "add" == n ? c = s + e.options.indentUnit : "subtract" == n ? c = s - e.options.indentUnit : "number" == typeof n && (c = s + n), c = Math.max(0, c);
                    var d = "",
                        h = 0;
                    if (e.options.indentWithTabs)
                        for (var f = Math.floor(c / a); f; --f) h += a, d += "\t";
                    if (h < c && (d += V(c - h)), d != u) return mo(o, d, et(t, 0), et(t, u.length), "+input"), l.stateAfter = null, !0;
                    for (var p = 0; p < o.sel.ranges.length; p++) {
                        var m = o.sel.ranges[p];
                        if (m.head.line == t && m.head.ch < u.length) {
                            var g = et(t, u.length);
                            Zi(o, p, new Ci(g, g));
                            break
                        }
                    }
                }
                Ma.defineInitHook = function(e) {
                    return Aa.push(e)
                };
                var Da = null;

                function Fa(e) {
                    Da = e
                }

                function Ea(e, t, n, r, i) {
                    var o = e.doc;
                    e.display.shift = !1, r || (r = o.sel);
                    var a = +new Date - 200,
                        l = "paste" == i || e.state.pasteIncoming > a,
                        s = Fe(t),
                        c = null;
                    if (l && r.ranges.length > 1)
                        if (Da && Da.text.join("\n") == t) {
                            if (r.ranges.length % Da.text.length == 0) {
                                c = [];
                                for (var u = 0; u < Da.text.length; u++) c.push(o.splitLines(Da.text[u]))
                            }
                        } else s.length == r.ranges.length && e.options.pasteLinesPerSelection && (c = K(s, (function(e) {
                            return [e]
                        })));
                    for (var d = e.curOp.updateInput, h = r.ranges.length - 1; h >= 0; h--) {
                        var f = r.ranges[h],
                            p = f.from(),
                            m = f.to();
                        f.empty() && (n && n > 0 ? p = et(p.line, p.ch - n) : e.state.overwrite && !l ? m = et(m.line, Math.min(Ge(o, m.line).text.length, m.ch + X(s).length)) : l && Da && Da.lineWise && Da.text.join("\n") == t && (p = m = et(p.line, 0)));
                        var g = {
                            from: p,
                            to: m,
                            text: c ? c[h % c.length] : s,
                            origin: i || (l ? "paste" : e.state.cutIncoming > a ? "cut" : "+input")
                        };
                        co(e.doc, g), sn(e, "inputRead", e, g)
                    }
                    t && !l && Ia(e, t), Fr(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = d), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1
                }

                function Oa(e, t) {
                    var n = e.clipboardData && e.clipboardData.getData("Text");
                    if (n) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || Jr(t, (function() {
                        return Ea(t, n, 0, null, "paste")
                    })), !0
                }

                function Ia(e, t) {
                    if (e.options.electricChars && e.options.smartIndent)
                        for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
                            var i = n.ranges[r];
                            if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
                                var o = e.getModeAt(i.head),
                                    a = !1;
                                if (o.electricChars) {
                                    for (var l = 0; l < o.electricChars.length; l++)
                                        if (t.indexOf(o.electricChars.charAt(l)) > -1) {
                                            a = Na(e, i.head.line, "smart");
                                            break
                                        }
                                } else o.electricInput && o.electricInput.test(Ge(e.doc, i.head.line).text.slice(0, i.head.ch)) && (a = Na(e, i.head.line, "smart"));
                                a && sn(e, "electricInput", e, i.head.line)
                            }
                        }
                }

                function za(e) {
                    for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
                        var i = e.doc.sel.ranges[r].head.line,
                            o = {
                                anchor: et(i, 0),
                                head: et(i + 1, 0)
                            };
                        n.push(o), t.push(e.getRange(o.anchor, o.head))
                    }
                    return {
                        text: t,
                        ranges: n
                    }
                }

                function Ha(e, t, n, r) {
                    e.setAttribute("autocorrect", n ? "" : "off"), e.setAttribute("autocapitalize", r ? "" : "off"), e.setAttribute("spellcheck", !!t)
                }

                function Ra() {
                    var e = N("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
                        t = N("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
                    return s ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), m && (e.style.border = "1px solid black"), Ha(e), t
                }

                function Pa(e, t, n, r, i) {
                    var o = t,
                        a = n,
                        l = Ge(e, t.line),
                        s = i && "rtl" == e.direction ? -n : n;

                    function c(r) {
                        var o, a;
                        if (null == (o = i ? function(e, t, n, r) {
                                var i = ce(t, e.doc.direction);
                                if (!i) return Jo(t, n, r);
                                n.ch >= t.text.length ? (n.ch = t.text.length, n.sticky = "before") : n.ch <= 0 && (n.ch = 0, n.sticky = "after");
                                var o = le(i, n.ch, n.sticky),
                                    a = i[o];
                                if ("ltr" == e.doc.direction && a.level % 2 == 0 && (r > 0 ? a.to > n.ch : a.from < n.ch)) return Jo(t, n, r);
                                var l, s = function(e, n) {
                                        return Qo(t, e instanceof et ? e.ch : e, n)
                                    },
                                    c = function(n) {
                                        return e.options.lineWrapping ? (l = l || En(e, t), Qn(e, t, l, n)) : {
                                            begin: 0,
                                            end: t.text.length
                                        }
                                    },
                                    u = c("before" == n.sticky ? s(n, -1) : n.ch);
                                if ("rtl" == e.doc.direction || 1 == a.level) {
                                    var d = 1 == a.level == r < 0,
                                        h = s(n, d ? 1 : -1);
                                    if (null != h && (d ? h <= a.to && h <= u.end : h >= a.from && h >= u.begin)) {
                                        var f = d ? "before" : "after";
                                        return new et(n.line, h, f)
                                    }
                                }
                                var p = function(e, t, r) {
                                        for (var o = function(e, t) {
                                                return t ? new et(n.line, s(e, 1), "before") : new et(n.line, e, "after")
                                            }; e >= 0 && e < i.length; e += t) {
                                            var a = i[e],
                                                l = t > 0 == (1 != a.level),
                                                c = l ? r.begin : s(r.end, -1);
                                            if (a.from <= c && c < a.to) return o(c, l);
                                            if (c = l ? a.from : s(a.to, -1), r.begin <= c && c < r.end) return o(c, l)
                                        }
                                    },
                                    m = p(o + r, r, u);
                                if (m) return m;
                                var g = r > 0 ? u.end : s(u.begin, -1);
                                return null == g || r > 0 && g == t.text.length || !(m = p(r > 0 ? 0 : i.length - 1, r, c(g))) ? null : m
                            }(e.cm, l, t, n) : Jo(l, t, n))) {
                            if (r || (a = t.line + s) < e.first || a >= e.first + e.size || (t = new et(a, t.ch, t.sticky), !(l = Ge(e, a)))) return !1;
                            t = ea(i, e.cm, l, t.line, s)
                        } else t = o;
                        return !0
                    }
                    if ("char" == r) c();
                    else if ("column" == r) c(!0);
                    else if ("word" == r || "group" == r)
                        for (var u = null, d = "group" == r, h = e.cm && e.cm.getHelper(t, "wordChars"), f = !0; !(n < 0) || c(!f); f = !1) {
                            var p = l.text.charAt(t.ch) || "\n",
                                m = ee(p, h) ? "w" : d && "\n" == p ? "n" : !d || /\s/.test(p) ? null : "p";
                            if (!d || f || m || (m = "s"), u && u != m) {
                                n < 0 && (n = 1, c(), t.sticky = "after");
                                break
                            }
                            if (m && (u = m), n > 0 && !c(!f)) break
                        }
                    var g = oo(e, t, o, a, !0);
                    return nt(o, g) && (g.hitSide = !0), g
                }

                function _a(e, t, n, r) {
                    var i, o, a = e.doc,
                        l = t.left;
                    if ("page" == r) {
                        var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                            c = Math.max(s - .5 * rr(e.display), 3);
                        i = (n > 0 ? t.bottom : t.top) + n * c
                    } else "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);
                    for (;
                        (o = Zn(e, l, i)).outside;) {
                        if (n < 0 ? i <= 0 : i >= a.height) {
                            o.hitSide = !0;
                            break
                        }
                        i += 5 * n
                    }
                    return o
                }
                var Wa = function(e) {
                    this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new _, this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null
                };

                function Ba(e, t) {
                    var n = Fn(e, t.line);
                    if (!n || n.hidden) return null;
                    var r = Ge(e.doc, t.line),
                        i = Nn(n, r, t.line),
                        o = ce(r, e.doc.direction),
                        a = "left";
                    o && (a = le(o, t.ch) % 2 ? "right" : "left");
                    var l = Hn(i.map, t.ch, a);
                    return l.offset = "right" == l.collapse ? l.end : l.start, l
                }

                function ja(e, t) {
                    return t && (e.bad = !0), e
                }

                function qa(e, t, n) {
                    var r;
                    if (t == e.display.lineDiv) {
                        if (!(r = e.display.lineDiv.childNodes[n])) return ja(e.clipPos(et(e.display.viewTo - 1)), !0);
                        t = null, n = 0
                    } else
                        for (r = t;; r = r.parentNode) {
                            if (!r || r == e.display.lineDiv) return null;
                            if (r.parentNode && r.parentNode == e.display.lineDiv) break
                        }
                    for (var i = 0; i < e.display.view.length; i++) {
                        var o = e.display.view[i];
                        if (o.node == r) return Ua(o, t, n)
                    }
                }

                function Ua(e, t, n) {
                    var r = e.text.firstChild,
                        i = !1;
                    if (!t || !F(r, t)) return ja(et(Ze(e.line), 0), !0);
                    if (t == r && (i = !0, t = r.childNodes[n], n = 0, !t)) {
                        var o = e.rest ? X(e.rest) : e.line;
                        return ja(et(Ze(o), o.text.length), i)
                    }
                    var a = 3 == t.nodeType ? t : null,
                        l = t;
                    for (a || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (a = t.firstChild, n && (n = a.nodeValue.length)); l.parentNode != r;) l = l.parentNode;
                    var s = e.measure,
                        c = s.maps;

                    function u(t, n, r) {
                        for (var i = -1; i < (c ? c.length : 0); i++)
                            for (var o = i < 0 ? s.map : c[i], a = 0; a < o.length; a += 3) {
                                var l = o[a + 2];
                                if (l == t || l == n) {
                                    var u = Ze(i < 0 ? e.line : e.rest[i]),
                                        d = o[a] + r;
                                    return (r < 0 || l != t) && (d = o[a + (r ? 1 : 0)]), et(u, d)
                                }
                            }
                    }
                    var d = u(a, l, n);
                    if (d) return ja(d, i);
                    for (var h = l.nextSibling, f = a ? a.nodeValue.length - n : 0; h; h = h.nextSibling) {
                        if (d = u(h, h.firstChild, 0)) return ja(et(d.line, d.ch - f), i);
                        f += h.textContent.length
                    }
                    for (var p = l.previousSibling, m = n; p; p = p.previousSibling) {
                        if (d = u(p, p.firstChild, -1)) return ja(et(d.line, d.ch + m), i);
                        m += p.textContent.length
                    }
                }
                Wa.prototype.init = function(e) {
                    var t = this,
                        n = this,
                        r = n.cm,
                        i = n.div = e.lineDiv;

                    function o(e) {
                        for (var t = e.target; t; t = t.parentNode) {
                            if (t == i) return !0;
                            if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) break
                        }
                        return !1
                    }

                    function a(e) {
                        if (o(e) && !me(r, e)) {
                            if (r.somethingSelected()) Fa({
                                lineWise: !1,
                                text: r.getSelections()
                            }), "cut" == e.type && r.replaceSelection("", null, "cut");
                            else {
                                if (!r.options.lineWiseCopyCut) return;
                                var t = za(r);
                                Fa({
                                    lineWise: !0,
                                    text: t.text
                                }), "cut" == e.type && r.operation((function() {
                                    r.setSelections(t.ranges, 0, j), r.replaceSelection("", null, "cut")
                                }))
                            }
                            if (e.clipboardData) {
                                e.clipboardData.clearData();
                                var a = Da.text.join("\n");
                                if (e.clipboardData.setData("Text", a), e.clipboardData.getData("Text") == a) return void e.preventDefault()
                            }
                            var l = Ra(),
                                s = l.firstChild;
                            r.display.lineSpace.insertBefore(l, r.display.lineSpace.firstChild), s.value = Da.text.join("\n");
                            var c = document.activeElement;
                            z(s), setTimeout((function() {
                                r.display.lineSpace.removeChild(l), c.focus(), c == i && n.showPrimarySelection()
                            }), 50)
                        }
                    }
                    Ha(i, r.options.spellcheck, r.options.autocorrect, r.options.autocapitalize), de(i, "paste", (function(e) {
                        !o(e) || me(r, e) || Oa(e, r) || l <= 11 && setTimeout(ei(r, (function() {
                            return t.updateFromDOM()
                        })), 20)
                    })), de(i, "compositionstart", (function(e) {
                        t.composing = {
                            data: e.data,
                            done: !1
                        }
                    })), de(i, "compositionupdate", (function(e) {
                        t.composing || (t.composing = {
                            data: e.data,
                            done: !1
                        })
                    })), de(i, "compositionend", (function(e) {
                        t.composing && (e.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0)
                    })), de(i, "touchstart", (function() {
                        return n.forceCompositionEnd()
                    })), de(i, "input", (function() {
                        t.composing || t.readFromDOMSoon()
                    })), de(i, "copy", a), de(i, "cut", a)
                }, Wa.prototype.screenReaderLabelChanged = function(e) {
                    e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label")
                }, Wa.prototype.prepareSelection = function() {
                    var e = vr(this.cm, !1);
                    return e.focus = document.activeElement == this.div, e
                }, Wa.prototype.showSelection = function(e, t) {
                    e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
                }, Wa.prototype.getSelection = function() {
                    return this.cm.display.wrapper.ownerDocument.getSelection()
                }, Wa.prototype.showPrimarySelection = function() {
                    var e = this.getSelection(),
                        t = this.cm,
                        r = t.doc.sel.primary(),
                        i = r.from(),
                        o = r.to();
                    if (t.display.viewTo == t.display.viewFrom || i.line >= t.display.viewTo || o.line < t.display.viewFrom) e.removeAllRanges();
                    else {
                        var a = qa(t, e.anchorNode, e.anchorOffset),
                            l = qa(t, e.focusNode, e.focusOffset);
                        if (!a || a.bad || !l || l.bad || 0 != tt(ot(a, l), i) || 0 != tt(it(a, l), o)) {
                            var s = t.display.view,
                                c = i.line >= t.display.viewFrom && Ba(t, i) || {
                                    node: s[0].measure.map[2],
                                    offset: 0
                                },
                                u = o.line < t.display.viewTo && Ba(t, o);
                            if (!u) {
                                var d = s[s.length - 1].measure,
                                    h = d.maps ? d.maps[d.maps.length - 1] : d.map;
                                u = {
                                    node: h[h.length - 1],
                                    offset: h[h.length - 2] - h[h.length - 3]
                                }
                            }
                            if (c && u) {
                                var f, p = e.rangeCount && e.getRangeAt(0);
                                try {
                                    f = L(c.node, c.offset, u.offset, u.node)
                                } catch (e) {}
                                f && (!n && t.state.focused ? (e.collapse(c.node, c.offset), f.collapsed || (e.removeAllRanges(), e.addRange(f))) : (e.removeAllRanges(), e.addRange(f)), p && null == e.anchorNode ? e.addRange(p) : n && this.startGracePeriod()), this.rememberSelection()
                            } else e.removeAllRanges()
                        }
                    }
                }, Wa.prototype.startGracePeriod = function() {
                    var e = this;
                    clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout((function() {
                        e.gracePeriod = !1, e.selectionChanged() && e.cm.operation((function() {
                            return e.cm.curOp.selectionChanged = !0
                        }))
                    }), 20)
                }, Wa.prototype.showMultipleSelections = function(e) {
                    A(this.cm.display.cursorDiv, e.cursors), A(this.cm.display.selectionDiv, e.selection)
                }, Wa.prototype.rememberSelection = function() {
                    var e = this.getSelection();
                    this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
                }, Wa.prototype.selectionInEditor = function() {
                    var e = this.getSelection();
                    if (!e.rangeCount) return !1;
                    var t = e.getRangeAt(0).commonAncestorContainer;
                    return F(this.div, t)
                }, Wa.prototype.focus = function() {
                    "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() && document.activeElement == this.div || this.showSelection(this.prepareSelection(), !0), this.div.focus())
                }, Wa.prototype.blur = function() {
                    this.div.blur()
                }, Wa.prototype.getField = function() {
                    return this.div
                }, Wa.prototype.supportsTouch = function() {
                    return !0
                }, Wa.prototype.receivedFocus = function() {
                    var e = this;
                    this.selectionInEditor() ? this.pollSelection() : Jr(this.cm, (function() {
                        return e.cm.curOp.selectionChanged = !0
                    })), this.polling.set(this.cm.options.pollInterval, (function t() {
                        e.cm.state.focused && (e.pollSelection(), e.polling.set(e.cm.options.pollInterval, t))
                    }))
                }, Wa.prototype.selectionChanged = function() {
                    var e = this.getSelection();
                    return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
                }, Wa.prototype.pollSelection = function() {
                    if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
                        var e = this.getSelection(),
                            t = this.cm;
                        if (g && u && this.cm.display.gutterSpecs.length && function(e) {
                                for (var t = e; t; t = t.parentNode)
                                    if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
                                return !1
                            }(e.anchorNode)) return this.cm.triggerOnKeyDown({
                            type: "keydown",
                            keyCode: 8,
                            preventDefault: Math.abs
                        }), this.blur(), void this.focus();
                        if (!this.composing) {
                            this.rememberSelection();
                            var n = qa(t, e.anchorNode, e.anchorOffset),
                                r = qa(t, e.focusNode, e.focusOffset);
                            n && r && Jr(t, (function() {
                                Ji(t.doc, Li(n, r), j), (n.bad || r.bad) && (t.curOp.selectionChanged = !0)
                            }))
                        }
                    }
                }, Wa.prototype.pollContent = function() {
                    null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
                    var e, t, n, r = this.cm,
                        i = r.display,
                        o = r.doc.sel.primary(),
                        a = o.from(),
                        l = o.to();
                    if (0 == a.ch && a.line > r.firstLine() && (a = et(a.line - 1, Ge(r.doc, a.line - 1).length)), l.ch == Ge(r.doc, l.line).text.length && l.line < r.lastLine() && (l = et(l.line + 1, 0)), a.line < i.viewFrom || l.line > i.viewTo - 1) return !1;
                    a.line == i.viewFrom || 0 == (e = ur(r, a.line)) ? (t = Ze(i.view[0].line), n = i.view[0].node) : (t = Ze(i.view[e].line), n = i.view[e - 1].node.nextSibling);
                    var s, c, u = ur(r, l.line);
                    if (u == i.view.length - 1 ? (s = i.viewTo - 1, c = i.lineDiv.lastChild) : (s = Ze(i.view[u + 1].line) - 1, c = i.view[u + 1].node.previousSibling), !n) return !1;
                    for (var d = r.doc.splitLines(function(e, t, n, r, i) {
                            var o = "",
                                a = !1,
                                l = e.doc.lineSeparator(),
                                s = !1;

                            function c() {
                                a && (o += l, s && (o += l), a = s = !1)
                            }

                            function u(e) {
                                e && (c(), o += e)
                            }

                            function d(t) {
                                if (1 == t.nodeType) {
                                    var n = t.getAttribute("cm-text");
                                    if (n) return void u(n);
                                    var o, h = t.getAttribute("cm-marker");
                                    if (h) {
                                        var f = e.findMarks(et(r, 0), et(i + 1, 0), (g = +h, function(e) {
                                            return e.id == g
                                        }));
                                        return void(f.length && (o = f[0].find(0)) && u(Ve(e.doc, o.from, o.to).join(l)))
                                    }
                                    if ("false" == t.getAttribute("contenteditable")) return;
                                    var p = /^(pre|div|p|li|table|br)$/i.test(t.nodeName);
                                    if (!/^br$/i.test(t.nodeName) && 0 == t.textContent.length) return;
                                    p && c();
                                    for (var m = 0; m < t.childNodes.length; m++) d(t.childNodes[m]);
                                    /^(pre|p)$/i.test(t.nodeName) && (s = !0), p && (a = !0)
                                } else 3 == t.nodeType && u(t.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
                                var g
                            }
                            for (; d(t), t != n;) t = t.nextSibling, s = !1;
                            return o
                        }(r, n, c, t, s)), h = Ve(r.doc, et(t, 0), et(s, Ge(r.doc, s).text.length)); d.length > 1 && h.length > 1;)
                        if (X(d) == X(h)) d.pop(), h.pop(), s--;
                        else {
                            if (d[0] != h[0]) break;
                            d.shift(), h.shift(), t++
                        }
                    for (var f = 0, p = 0, m = d[0], g = h[0], v = Math.min(m.length, g.length); f < v && m.charCodeAt(f) == g.charCodeAt(f);) ++f;
                    for (var x = X(d), y = X(h), b = Math.min(x.length - (1 == d.length ? f : 0), y.length - (1 == h.length ? f : 0)); p < b && x.charCodeAt(x.length - p - 1) == y.charCodeAt(y.length - p - 1);) ++p;
                    if (1 == d.length && 1 == h.length && t == a.line)
                        for (; f && f > a.ch && x.charCodeAt(x.length - p - 1) == y.charCodeAt(y.length - p - 1);) f--, p++;
                    d[d.length - 1] = x.slice(0, x.length - p).replace(/^\u200b+/, ""), d[0] = d[0].slice(f).replace(/\u200b+$/, "");
                    var k = et(t, f),
                        w = et(s, h.length ? X(h).length - p : 0);
                    return d.length > 1 || d[0] || tt(k, w) ? (mo(r.doc, d, k, w, "+input"), !0) : void 0
                }, Wa.prototype.ensurePolled = function() {
                    this.forceCompositionEnd()
                }, Wa.prototype.reset = function() {
                    this.forceCompositionEnd()
                }, Wa.prototype.forceCompositionEnd = function() {
                    this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus())
                }, Wa.prototype.readFromDOMSoon = function() {
                    var e = this;
                    null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout((function() {
                        if (e.readDOMTimeout = null, e.composing) {
                            if (!e.composing.done) return;
                            e.composing = null
                        }
                        e.updateFromDOM()
                    }), 80))
                }, Wa.prototype.updateFromDOM = function() {
                    var e = this;
                    !this.cm.isReadOnly() && this.pollContent() || Jr(this.cm, (function() {
                        return dr(e.cm)
                    }))
                }, Wa.prototype.setUneditable = function(e) {
                    e.contentEditable = "false"
                }, Wa.prototype.onKeyPress = function(e) {
                    0 == e.charCode || this.composing || (e.preventDefault(), this.cm.isReadOnly() || ei(this.cm, Ea)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0))
                }, Wa.prototype.readOnlyChanged = function(e) {
                    this.div.contentEditable = String("nocursor" != e)
                }, Wa.prototype.onContextMenu = function() {}, Wa.prototype.resetPosition = function() {}, Wa.prototype.needsContentAttribute = !0;
                var $a = function(e) {
                    this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new _, this.hasSelection = !1, this.composing = null
                };
                $a.prototype.init = function(e) {
                        var t = this,
                            n = this,
                            r = this.cm;
                        this.createField(e);
                        var i = this.textarea;

                        function o(e) {
                            if (!me(r, e)) {
                                if (r.somethingSelected()) Fa({
                                    lineWise: !1,
                                    text: r.getSelections()
                                });
                                else {
                                    if (!r.options.lineWiseCopyCut) return;
                                    var t = za(r);
                                    Fa({
                                        lineWise: !0,
                                        text: t.text
                                    }), "cut" == e.type ? r.setSelections(t.ranges, null, j) : (n.prevInput = "", i.value = t.text.join("\n"), z(i))
                                }
                                "cut" == e.type && (r.state.cutIncoming = +new Date)
                            }
                        }
                        e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), m && (i.style.width = "0px"), de(i, "input", (function() {
                            a && l >= 9 && t.hasSelection && (t.hasSelection = null), n.poll()
                        })), de(i, "paste", (function(e) {
                            me(r, e) || Oa(e, r) || (r.state.pasteIncoming = +new Date, n.fastPoll())
                        })), de(i, "cut", o), de(i, "copy", o), de(e.scroller, "paste", (function(t) {
                            if (!wn(e, t) && !me(r, t)) {
                                if (!i.dispatchEvent) return r.state.pasteIncoming = +new Date, void n.focus();
                                var o = new Event("paste");
                                o.clipboardData = t.clipboardData, i.dispatchEvent(o)
                            }
                        })), de(e.lineSpace, "selectstart", (function(t) {
                            wn(e, t) || ye(t)
                        })), de(i, "compositionstart", (function() {
                            var e = r.getCursor("from");
                            n.composing && n.composing.range.clear(), n.composing = {
                                start: e,
                                range: r.markText(e, r.getCursor("to"), {
                                    className: "CodeMirror-composing"
                                })
                            }
                        })), de(i, "compositionend", (function() {
                            n.composing && (n.poll(), n.composing.range.clear(), n.composing = null)
                        }))
                    }, $a.prototype.createField = function(e) {
                        this.wrapper = Ra(), this.textarea = this.wrapper.firstChild
                    }, $a.prototype.screenReaderLabelChanged = function(e) {
                        e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label")
                    }, $a.prototype.prepareSelection = function() {
                        var e = this.cm,
                            t = e.display,
                            n = e.doc,
                            r = vr(e);
                        if (e.options.moveInputWithCursor) {
                            var i = Vn(e, n.sel.primary().head, "div"),
                                o = t.wrapper.getBoundingClientRect(),
                                a = t.lineDiv.getBoundingClientRect();
                            r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top)), r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left))
                        }
                        return r
                    }, $a.prototype.showSelection = function(e) {
                        var t = this.cm.display;
                        A(t.cursorDiv, e.cursors), A(t.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
                    }, $a.prototype.reset = function(e) {
                        if (!this.contextMenuPending && !this.composing) {
                            var t = this.cm;
                            if (t.somethingSelected()) {
                                this.prevInput = "";
                                var n = t.getSelection();
                                this.textarea.value = n, t.state.focused && z(this.textarea), a && l >= 9 && (this.hasSelection = n)
                            } else e || (this.prevInput = this.textarea.value = "", a && l >= 9 && (this.hasSelection = null))
                        }
                    }, $a.prototype.getField = function() {
                        return this.textarea
                    }, $a.prototype.supportsTouch = function() {
                        return !1
                    }, $a.prototype.focus = function() {
                        if ("nocursor" != this.cm.options.readOnly && (!v || E() != this.textarea)) try {
                            this.textarea.focus()
                        } catch (e) {}
                    }, $a.prototype.blur = function() {
                        this.textarea.blur()
                    }, $a.prototype.resetPosition = function() {
                        this.wrapper.style.top = this.wrapper.style.left = 0
                    }, $a.prototype.receivedFocus = function() {
                        this.slowPoll()
                    }, $a.prototype.slowPoll = function() {
                        var e = this;
                        this.pollingFast || this.polling.set(this.cm.options.pollInterval, (function() {
                            e.poll(), e.cm.state.focused && e.slowPoll()
                        }))
                    }, $a.prototype.fastPoll = function() {
                        var e = !1,
                            t = this;
                        t.pollingFast = !0, t.polling.set(20, (function n() {
                            t.poll() || e ? (t.pollingFast = !1, t.slowPoll()) : (e = !0, t.polling.set(60, n))
                        }))
                    }, $a.prototype.poll = function() {
                        var e = this,
                            t = this.cm,
                            n = this.textarea,
                            r = this.prevInput;
                        if (this.contextMenuPending || !t.state.focused || Ee(n) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
                        var i = n.value;
                        if (i == r && !t.somethingSelected()) return !1;
                        if (a && l >= 9 && this.hasSelection === i || x && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;
                        if (t.doc.sel == t.display.selForContextMenu) {
                            var o = i.charCodeAt(0);
                            if (8203 != o || r || (r = "​"), 8666 == o) return this.reset(), this.cm.execCommand("undo")
                        }
                        for (var s = 0, c = Math.min(r.length, i.length); s < c && r.charCodeAt(s) == i.charCodeAt(s);) ++s;
                        return Jr(t, (function() {
                            Ea(t, i.slice(s), r.length - s, null, e.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? n.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
                                className: "CodeMirror-composing"
                            }))
                        })), !0
                    }, $a.prototype.ensurePolled = function() {
                        this.pollingFast && this.poll() && (this.pollingFast = !1)
                    }, $a.prototype.onKeyPress = function() {
                        a && l >= 9 && (this.hasSelection = null), this.fastPoll()
                    }, $a.prototype.onContextMenu = function(e) {
                        var t = this,
                            n = t.cm,
                            r = n.display,
                            i = t.textarea;
                        t.contextMenuPending && t.contextMenuPending();
                        var o = cr(n, e),
                            c = r.scroller.scrollTop;
                        if (o && !d) {
                            n.options.resetSelectionOnContextMenu && -1 == n.doc.sel.contains(o) && ei(n, Ji)(n.doc, Li(o), j);
                            var u, h = i.style.cssText,
                                f = t.wrapper.style.cssText,
                                p = t.wrapper.offsetParent.getBoundingClientRect();
                            if (t.wrapper.style.cssText = "position: static", i.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - p.top - 5) + "px; left: " + (e.clientX - p.left - 5) + "px;\n      z-index: 1000; background: " + (a ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", s && (u = window.scrollY), r.input.focus(), s && window.scrollTo(null, u), r.input.reset(), n.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = v, r.selForContextMenu = n.doc.sel, clearTimeout(r.detectingSelectAll), a && l >= 9 && g(), C) {
                                we(e);
                                var m = function() {
                                    fe(window, "mouseup", m), setTimeout(v, 20)
                                };
                                de(window, "mouseup", m)
                            } else setTimeout(v, 50)
                        }

                        function g() {
                            if (null != i.selectionStart) {
                                var e = n.somethingSelected(),
                                    o = "​" + (e ? i.value : "");
                                i.value = "⇚", i.value = o, t.prevInput = e ? "" : "​", i.selectionStart = 1, i.selectionEnd = o.length, r.selForContextMenu = n.doc.sel
                            }
                        }

                        function v() {
                            if (t.contextMenuPending == v && (t.contextMenuPending = !1, t.wrapper.style.cssText = f, i.style.cssText = h, a && l < 9 && r.scrollbars.setScrollTop(r.scroller.scrollTop = c), null != i.selectionStart)) {
                                (!a || a && l < 9) && g();
                                var e = 0,
                                    o = function() {
                                        r.selForContextMenu == n.doc.sel && 0 == i.selectionStart && i.selectionEnd > 0 && "​" == t.prevInput ? ei(n, lo)(n) : e++ < 10 ? r.detectingSelectAll = setTimeout(o, 500) : (r.selForContextMenu = null, r.input.reset())
                                    };
                                r.detectingSelectAll = setTimeout(o, 200)
                            }
                        }
                    }, $a.prototype.readOnlyChanged = function(e) {
                        e || this.reset(), this.textarea.disabled = "nocursor" == e
                    }, $a.prototype.setUneditable = function() {}, $a.prototype.needsContentAttribute = !1,
                    function(e) {
                        var t = e.optionHandlers;

                        function n(n, r, i, o) {
                            e.defaults[n] = r, i && (t[n] = o ? function(e, t, n) {
                                n != wa && i(e, t, n)
                            } : i)
                        }
                        e.defineOption = n, e.Init = wa, n("value", "", (function(e, t) {
                            return e.setValue(t)
                        }), !0), n("mode", null, (function(e, t) {
                            e.doc.modeOption = t, Di(e)
                        }), !0), n("indentUnit", 2, Di, !0), n("indentWithTabs", !1), n("smartIndent", !0), n("tabSize", 4, (function(e) {
                            Fi(e), Wn(e), dr(e)
                        }), !0), n("lineSeparator", null, (function(e, t) {
                            if (e.doc.lineSep = t, t) {
                                var n = [],
                                    r = e.doc.first;
                                e.doc.iter((function(e) {
                                    for (var i = 0;;) {
                                        var o = e.text.indexOf(t, i);
                                        if (-1 == o) break;
                                        i = o + t.length, n.push(et(r, o))
                                    }
                                    r++
                                }));
                                for (var i = n.length - 1; i >= 0; i--) mo(e.doc, t, n[i], et(n[i].line, n[i].ch + t.length))
                            }
                        })), n("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200c\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, (function(e, t, n) {
                            e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), n != wa && e.refresh()
                        })), n("specialCharPlaceholder", Qt, (function(e) {
                            return e.refresh()
                        }), !0), n("electricChars", !0), n("inputStyle", v ? "contenteditable" : "textarea", (function() {
                            throw new Error("inputStyle can not (yet) be changed in a running editor")
                        }), !0), n("spellcheck", !1, (function(e, t) {
                            return e.getInputField().spellcheck = t
                        }), !0), n("autocorrect", !1, (function(e, t) {
                            return e.getInputField().autocorrect = t
                        }), !0), n("autocapitalize", !1, (function(e, t) {
                            return e.getInputField().autocapitalize = t
                        }), !0), n("rtlMoveVisually", !b), n("wholeLineUpdateBefore", !0), n("theme", "default", (function(e) {
                            ka(e), mi(e)
                        }), !0), n("keyMap", "default", (function(e, t, n) {
                            var r = Zo(t),
                                i = n != wa && Zo(n);
                            i && i.detach && i.detach(e, r), r.attach && r.attach(e, i || null)
                        })), n("extraKeys", null), n("configureMouse", null), n("lineWrapping", !1, Ta, !0), n("gutters", [], (function(e, t) {
                            e.display.gutterSpecs = fi(t, e.options.lineNumbers), mi(e)
                        }), !0), n("fixedGutter", !0, (function(e, t) {
                            e.display.gutters.style.left = t ? ar(e.display) + "px" : "0", e.refresh()
                        }), !0), n("coverGutterNextToScrollbar", !1, (function(e) {
                            return Br(e)
                        }), !0), n("scrollbarStyle", "native", (function(e) {
                            Ur(e), Br(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
                        }), !0), n("lineNumbers", !1, (function(e, t) {
                            e.display.gutterSpecs = fi(e.options.gutters, t), mi(e)
                        }), !0), n("firstLineNumber", 1, mi, !0), n("lineNumberFormatter", (function(e) {
                            return e
                        }), mi, !0), n("showCursorWhenSelecting", !1, gr, !0), n("resetSelectionOnContextMenu", !0), n("lineWiseCopyCut", !0), n("pasteLinesPerSelection", !0), n("selectionsMayTouch", !1), n("readOnly", !1, (function(e, t) {
                            "nocursor" == t && (Lr(e), e.display.input.blur()), e.display.input.readOnlyChanged(t)
                        })), n("screenReaderLabel", null, (function(e, t) {
                            t = "" === t ? null : t, e.display.input.screenReaderLabelChanged(t)
                        })), n("disableInput", !1, (function(e, t) {
                            t || e.display.input.reset()
                        }), !0), n("dragDrop", !0, La), n("allowDropFileTypes", null), n("cursorBlinkRate", 530), n("cursorScrollMargin", 0), n("cursorHeight", 1, gr, !0), n("singleCursorHeightPerLine", !0, gr, !0), n("workTime", 100), n("workDelay", 100), n("flattenSpans", !0, Fi, !0), n("addModeClass", !1, Fi, !0), n("pollInterval", 100), n("undoDepth", 200, (function(e, t) {
                            return e.doc.history.undoDepth = t
                        })), n("historyEventDelay", 1250), n("viewportMargin", 10, (function(e) {
                            return e.refresh()
                        }), !0), n("maxHighlightLength", 1e4, Fi, !0), n("moveInputWithCursor", !0, (function(e, t) {
                            t || e.display.input.resetPosition()
                        })), n("tabindex", null, (function(e, t) {
                            return e.display.input.getField().tabIndex = t || ""
                        })), n("autofocus", null), n("direction", "ltr", (function(e, t) {
                            return e.doc.setDirection(t)
                        }), !0), n("phrases", null)
                    }(Ma),
                    function(e) {
                        var t = e.optionHandlers,
                            n = e.helpers = {};
                        e.prototype = {
                            constructor: e,
                            focus: function() {
                                window.focus(), this.display.input.focus()
                            },
                            setOption: function(e, n) {
                                var r = this.options,
                                    i = r[e];
                                r[e] == n && "mode" != e || (r[e] = n, t.hasOwnProperty(e) && ei(this, t[e])(this, n, i), pe(this, "optionChange", this, e))
                            },
                            getOption: function(e) {
                                return this.options[e]
                            },
                            getDoc: function() {
                                return this.doc
                            },
                            addKeyMap: function(e, t) {
                                this.state.keyMaps[t ? "push" : "unshift"](Zo(e))
                            },
                            removeKeyMap: function(e) {
                                for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
                                    if (t[n] == e || t[n].name == e) return t.splice(n, 1), !0
                            },
                            addOverlay: ti((function(t, n) {
                                var r = t.token ? t : e.getMode(this.options, t);
                                if (r.startState) throw new Error("Overlays may not be stateful.");
                                ! function(e, t, n) {
                                    for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i;) r++;
                                    e.splice(r, 0, t)
                                }(this.state.overlays, {
                                    mode: r,
                                    modeSpec: t,
                                    opaque: n && n.opaque,
                                    priority: n && n.priority || 0
                                }, (function(e) {
                                    return e.priority
                                })), this.state.modeGen++, dr(this)
                            })),
                            removeOverlay: ti((function(e) {
                                for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
                                    var r = t[n].modeSpec;
                                    if (r == e || "string" == typeof e && r.name == e) return t.splice(n, 1), this.state.modeGen++, void dr(this)
                                }
                            })),
                            indentLine: ti((function(e, t, n) {
                                "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), Qe(this.doc, e) && Na(this, e, t, n)
                            })),
                            indentSelection: ti((function(e) {
                                for (var t = this.doc.sel.ranges, n = -1, r = 0; r < t.length; r++) {
                                    var i = t[r];
                                    if (i.empty()) i.head.line > n && (Na(this, i.head.line, e, !0), n = i.head.line, r == this.doc.sel.primIndex && Fr(this));
                                    else {
                                        var o = i.from(),
                                            a = i.to(),
                                            l = Math.max(n, o.line);
                                        n = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;
                                        for (var s = l; s < n; ++s) Na(this, s, e);
                                        var c = this.doc.sel.ranges;
                                        0 == o.ch && t.length == c.length && c[r].from().ch > 0 && Zi(this.doc, r, new Ci(o, c[r].to()), j)
                                    }
                                }
                            })),
                            getTokenAt: function(e, t) {
                                return xt(this, e, t)
                            },
                            getLineTokens: function(e, t) {
                                return xt(this, et(e), t, !0)
                            },
                            getTokenTypeAt: function(e) {
                                e = lt(this.doc, e);
                                var t, n = ht(this, Ge(this.doc, e.line)),
                                    r = 0,
                                    i = (n.length - 1) / 2,
                                    o = e.ch;
                                if (0 == o) t = n[2];
                                else
                                    for (;;) {
                                        var a = r + i >> 1;
                                        if ((a ? n[2 * a - 1] : 0) >= o) i = a;
                                        else {
                                            if (!(n[2 * a + 1] < o)) {
                                                t = n[2 * a + 2];
                                                break
                                            }
                                            r = a + 1
                                        }
                                    }
                                var l = t ? t.indexOf("overlay ") : -1;
                                return l < 0 ? t : 0 == l ? null : t.slice(0, l - 1)
                            },
                            getModeAt: function(t) {
                                var n = this.doc.mode;
                                return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n
                            },
                            getHelper: function(e, t) {
                                return this.getHelpers(e, t)[0]
                            },
                            getHelpers: function(e, t) {
                                var r = [];
                                if (!n.hasOwnProperty(t)) return r;
                                var i = n[t],
                                    o = this.getModeAt(e);
                                if ("string" == typeof o[t]) i[o[t]] && r.push(i[o[t]]);
                                else if (o[t])
                                    for (var a = 0; a < o[t].length; a++) {
                                        var l = i[o[t][a]];
                                        l && r.push(l)
                                    } else o.helperType && i[o.helperType] ? r.push(i[o.helperType]) : i[o.name] && r.push(i[o.name]);
                                for (var s = 0; s < i._global.length; s++) {
                                    var c = i._global[s];
                                    c.pred(o, this) && -1 == W(r, c.val) && r.push(c.val)
                                }
                                return r
                            },
                            getStateAfter: function(e, t) {
                                var n = this.doc;
                                return ft(this, (e = at(n, null == e ? n.first + n.size - 1 : e)) + 1, t).state
                            },
                            cursorCoords: function(e, t) {
                                var n = this.doc.sel.primary();
                                return Vn(this, null == e ? n.head : "object" == typeof e ? lt(this.doc, e) : e ? n.from() : n.to(), t || "page")
                            },
                            charCoords: function(e, t) {
                                return Gn(this, lt(this.doc, e), t || "page")
                            },
                            coordsChar: function(e, t) {
                                return Zn(this, (e = $n(this, e, t || "page")).left, e.top)
                            },
                            lineAtHeight: function(e, t) {
                                return e = $n(this, {
                                    top: e,
                                    left: 0
                                }, t || "page").top, Ye(this.doc, e + this.display.viewOffset)
                            },
                            heightAtLine: function(e, t, n) {
                                var r, i = !1;
                                if ("number" == typeof e) {
                                    var o = this.doc.first + this.doc.size - 1;
                                    e < this.doc.first ? e = this.doc.first : e > o && (e = o, i = !0), r = Ge(this.doc, e)
                                } else r = e;
                                return Un(this, r, {
                                    top: 0,
                                    left: 0
                                }, t || "page", n || i).top + (i ? this.doc.height - qt(r) : 0)
                            },
                            defaultTextHeight: function() {
                                return rr(this.display)
                            },
                            defaultCharWidth: function() {
                                return ir(this.display)
                            },
                            getViewport: function() {
                                return {
                                    from: this.display.viewFrom,
                                    to: this.display.viewTo
                                }
                            },
                            addWidget: function(e, t, n, r, i) {
                                var o, a, l, s = this.display,
                                    c = (e = Vn(this, lt(this.doc, e))).bottom,
                                    u = e.left;
                                if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), s.sizer.appendChild(t), "over" == r) c = e.top;
                                else if ("above" == r || "near" == r) {
                                    var d = Math.max(s.wrapper.clientHeight, this.doc.height),
                                        h = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
                                    ("above" == r || e.bottom + t.offsetHeight > d) && e.top > t.offsetHeight ? c = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= d && (c = e.bottom), u + t.offsetWidth > h && (u = h - t.offsetWidth)
                                }
                                t.style.top = c + "px", t.style.left = t.style.right = "", "right" == i ? (u = s.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? u = 0 : "middle" == i && (u = (s.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = u + "px"), n && (o = this, a = {
                                    left: u,
                                    top: c,
                                    right: u + t.offsetWidth,
                                    bottom: c + t.offsetHeight
                                }, null != (l = Nr(o, a)).scrollTop && zr(o, l.scrollTop), null != l.scrollLeft && Rr(o, l.scrollLeft))
                            },
                            triggerOnKeyDown: ti(ua),
                            triggerOnKeyPress: ti(ha),
                            triggerOnKeyUp: da,
                            triggerOnMouseDown: ti(ga),
                            execCommand: function(e) {
                                if (ta.hasOwnProperty(e)) return ta[e].call(null, this)
                            },
                            triggerElectric: ti((function(e) {
                                Ia(this, e)
                            })),
                            findPosH: function(e, t, n, r) {
                                var i = 1;
                                t < 0 && (i = -1, t = -t);
                                for (var o = lt(this.doc, e), a = 0; a < t && !(o = Pa(this.doc, o, i, n, r)).hitSide; ++a);
                                return o
                            },
                            moveH: ti((function(e, t) {
                                var n = this;
                                this.extendSelectionsBy((function(r) {
                                    return n.display.shift || n.doc.extend || r.empty() ? Pa(n.doc, r.head, e, t, n.options.rtlMoveVisually) : e < 0 ? r.from() : r.to()
                                }), U)
                            })),
                            deleteH: ti((function(e, t) {
                                var n = this.doc.sel,
                                    r = this.doc;
                                n.somethingSelected() ? r.replaceSelection("", null, "+delete") : Yo(this, (function(n) {
                                    var i = Pa(r, n.head, e, t, !1);
                                    return e < 0 ? {
                                        from: i,
                                        to: n.head
                                    } : {
                                        from: n.head,
                                        to: i
                                    }
                                }))
                            })),
                            findPosV: function(e, t, n, r) {
                                var i = 1,
                                    o = r;
                                t < 0 && (i = -1, t = -t);
                                for (var a = lt(this.doc, e), l = 0; l < t; ++l) {
                                    var s = Vn(this, a, "div");
                                    if (null == o ? o = s.left : s.left = o, (a = _a(this, s, i, n)).hitSide) break
                                }
                                return a
                            },
                            moveV: ti((function(e, t) {
                                var n = this,
                                    r = this.doc,
                                    i = [],
                                    o = !this.display.shift && !r.extend && r.sel.somethingSelected();
                                if (r.extendSelectionsBy((function(a) {
                                        if (o) return e < 0 ? a.from() : a.to();
                                        var l = Vn(n, a.head, "div");
                                        null != a.goalColumn && (l.left = a.goalColumn), i.push(l.left);
                                        var s = _a(n, l, e, t);
                                        return "page" == t && a == r.sel.primary() && Dr(n, Gn(n, s, "div").top - l.top), s
                                    }), U), i.length)
                                    for (var a = 0; a < r.sel.ranges.length; a++) r.sel.ranges[a].goalColumn = i[a]
                            })),
                            findWordAt: function(e) {
                                var t = Ge(this.doc, e.line).text,
                                    n = e.ch,
                                    r = e.ch;
                                if (t) {
                                    var i = this.getHelper(e, "wordChars");
                                    "before" != e.sticky && r != t.length || !n ? ++r : --n;
                                    for (var o = t.charAt(n), a = ee(o, i) ? function(e) {
                                            return ee(e, i)
                                        } : /\s/.test(o) ? function(e) {
                                            return /\s/.test(e)
                                        } : function(e) {
                                            return !/\s/.test(e) && !ee(e)
                                        }; n > 0 && a(t.charAt(n - 1));) --n;
                                    for (; r < t.length && a(t.charAt(r));) ++r
                                }
                                return new Ci(et(e.line, n), et(e.line, r))
                            },
                            toggleOverwrite: function(e) {
                                null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? O(this.display.cursorDiv, "CodeMirror-overwrite") : T(this.display.cursorDiv, "CodeMirror-overwrite"), pe(this, "overwriteToggle", this, this.state.overwrite))
                            },
                            hasFocus: function() {
                                return this.display.input.getField() == E()
                            },
                            isReadOnly: function() {
                                return !(!this.options.readOnly && !this.doc.cantEdit)
                            },
                            scrollTo: ti((function(e, t) {
                                Er(this, e, t)
                            })),
                            getScrollInfo: function() {
                                var e = this.display.scroller;
                                return {
                                    left: e.scrollLeft,
                                    top: e.scrollTop,
                                    height: e.scrollHeight - Tn(this) - this.display.barHeight,
                                    width: e.scrollWidth - Tn(this) - this.display.barWidth,
                                    clientHeight: An(this),
                                    clientWidth: Mn(this)
                                }
                            },
                            scrollIntoView: ti((function(e, t) {
                                null == e ? (e = {
                                    from: this.doc.sel.primary().head,
                                    to: null
                                }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                                    from: et(e, 0),
                                    to: null
                                } : null == e.from && (e = {
                                    from: e,
                                    to: null
                                }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? function(e, t) {
                                    Or(e), e.curOp.scrollToPos = t
                                }(this, e) : Ir(this, e.from, e.to, e.margin)
                            })),
                            setSize: ti((function(e, t) {
                                var n = this,
                                    r = function(e) {
                                        return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                                    };
                                null != e && (this.display.wrapper.style.width = r(e)), null != t && (this.display.wrapper.style.height = r(t)), this.options.lineWrapping && _n(this);
                                var i = this.display.viewFrom;
                                this.doc.iter(i, this.display.viewTo, (function(e) {
                                    if (e.widgets)
                                        for (var t = 0; t < e.widgets.length; t++)
                                            if (e.widgets[t].noHScroll) {
                                                hr(n, i, "widget");
                                                break
                                            }++i
                                })), this.curOp.forceUpdate = !0, pe(this, "refresh", this)
                            })),
                            operation: function(e) {
                                return Jr(this, e)
                            },
                            startOperation: function() {
                                return Gr(this)
                            },
                            endOperation: function() {
                                return Vr(this)
                            },
                            refresh: ti((function() {
                                var e = this.display.cachedTextHeight;
                                dr(this), this.curOp.forceUpdate = !0, Wn(this), Er(this, this.doc.scrollLeft, this.doc.scrollTop), ci(this.display), (null == e || Math.abs(e - rr(this.display)) > .5 || this.options.lineWrapping) && sr(this), pe(this, "refresh", this)
                            })),
                            swapDoc: ti((function(e) {
                                var t = this.doc;
                                return t.cm = null, this.state.selectingText && this.state.selectingText(), zi(this, e), Wn(this), this.display.input.reset(), Er(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, sn(this, "swapDoc", this, t), t
                            })),
                            phrase: function(e) {
                                var t = this.options.phrases;
                                return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e
                            },
                            getInputField: function() {
                                return this.display.input.getField()
                            },
                            getWrapperElement: function() {
                                return this.display.wrapper
                            },
                            getScrollerElement: function() {
                                return this.display.scroller
                            },
                            getGutterElement: function() {
                                return this.display.gutters
                            }
                        }, xe(e), e.registerHelper = function(t, r, i) {
                            n.hasOwnProperty(t) || (n[t] = e[t] = {
                                _global: []
                            }), n[t][r] = i
                        }, e.registerGlobalHelper = function(t, r, i, o) {
                            e.registerHelper(t, r, o), n[t]._global.push({
                                pred: i,
                                val: o
                            })
                        }
                    }(Ma);
                var Ga = "iter insert remove copy getEditor constructor".split(" ");
                for (var Va in Fo.prototype) Fo.prototype.hasOwnProperty(Va) && W(Ga, Va) < 0 && (Ma.prototype[Va] = function(e) {
                    return function() {
                        return e.apply(this.doc, arguments)
                    }
                }(Fo.prototype[Va]));
                return xe(Fo), Ma.inputStyles = {
                        textarea: $a,
                        contenteditable: Wa
                    }, Ma.defineMode = function(e) {
                        Ma.defaults.mode || "null" == e || (Ma.defaults.mode = e), Re.apply(this, arguments)
                    }, Ma.defineMIME = function(e, t) {
                        He[e] = t
                    }, Ma.defineMode("null", (function() {
                        return {
                            token: function(e) {
                                return e.skipToEnd()
                            }
                        }
                    })), Ma.defineMIME("text/plain", "null"), Ma.defineExtension = function(e, t) {
                        Ma.prototype[e] = t
                    }, Ma.defineDocExtension = function(e, t) {
                        Fo.prototype[e] = t
                    }, Ma.fromTextArea = function(e, t) {
                        if ((t = t ? R(t) : {}).value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus) {
                            var n = E();
                            t.autofocus = n == e || null != e.getAttribute("autofocus") && n == document.body
                        }

                        function r() {
                            e.value = l.getValue()
                        }
                        var i;
                        if (e.form && (de(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
                            var o = e.form;
                            i = o.submit;
                            try {
                                var a = o.submit = function() {
                                    r(), o.submit = i, o.submit(), o.submit = a
                                }
                            } catch (e) {}
                        }
                        t.finishInit = function(n) {
                            n.save = r, n.getTextArea = function() {
                                return e
                            }, n.toTextArea = function() {
                                n.toTextArea = isNaN, r(), e.parentNode.removeChild(n.getWrapperElement()), e.style.display = "", e.form && (fe(e.form, "submit", r), t.leaveSubmitMethodAlone || "function" != typeof e.form.submit || (e.form.submit = i))
                            }
                        }, e.style.display = "none";
                        var l = Ma((function(t) {
                            return e.parentNode.insertBefore(t, e.nextSibling)
                        }), t);
                        return l
                    },
                    function(e) {
                        e.off = fe, e.on = de, e.wheelEventPixels = bi, e.Doc = Fo, e.splitLines = Fe, e.countColumn = P, e.findColumn = $, e.isWordChar = J, e.Pass = B, e.signal = pe, e.Line = Gt, e.changeEnd = Ti, e.scrollbarModel = qr, e.Pos = et, e.cmpPos = tt, e.modes = ze, e.mimeModes = He, e.resolveMode = Pe, e.getMode = _e, e.modeExtensions = We, e.extendMode = Be, e.copyState = je, e.startState = Ue, e.innerMode = qe, e.commands = ta, e.keyMap = qo, e.keyName = Ko, e.isModifierKey = Vo, e.lookupKey = Go, e.normalizeKeyMap = $o, e.StringStream = $e, e.SharedTextMarker = Mo, e.TextMarker = Lo, e.LineWidget = wo, e.e_preventDefault = ye, e.e_stopPropagation = be, e.e_stop = we, e.addClass = O, e.contains = F, e.rmClass = T, e.keyNames = _o
                    }(Ma), Ma.version = "5.55.0", Ma
            }))
        }, {}],
        10: [function(e, t, n) {
            var r;
            r = function(e) {
                "use strict";
                var t = /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;
                e.defineMode("gfm", (function(n, r) {
                    var i = 0,
                        o = {
                            startState: function() {
                                return {
                                    code: !1,
                                    codeBlock: !1,
                                    ateSpace: !1
                                }
                            },
                            copyState: function(e) {
                                return {
                                    code: e.code,
                                    codeBlock: e.codeBlock,
                                    ateSpace: e.ateSpace
                                }
                            },
                            token: function(e, n) {
                                if (n.combineTokens = null, n.codeBlock) return e.match(/^```+/) ? (n.codeBlock = !1, null) : (e.skipToEnd(), null);
                                if (e.sol() && (n.code = !1), e.sol() && e.match(/^```+/)) return e.skipToEnd(), n.codeBlock = !0, null;
                                if ("`" === e.peek()) {
                                    e.next();
                                    var o = e.pos;
                                    e.eatWhile("`");
                                    var a = 1 + e.pos - o;
                                    return n.code ? a === i && (n.code = !1) : (i = a, n.code = !0), null
                                }
                                if (n.code) return e.next(), null;
                                if (e.eatSpace()) return n.ateSpace = !0, null;
                                if ((e.sol() || n.ateSpace) && (n.ateSpace = !1, !1 !== r.gitHubSpice)) {
                                    if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?=.{0,6}\d)(?:[a-f0-9]{7,40}\b)/)) return n.combineTokens = !0, "link";
                                    if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) return n.combineTokens = !0, "link"
                                }
                                return e.match(t) && "](" != e.string.slice(e.start - 2, e.start) && (0 == e.start || /\W/.test(e.string.charAt(e.start - 1))) ? (n.combineTokens = !0, "link") : (e.next(), null)
                            },
                            blankLine: function(e) {
                                return e.code = !1, null
                            }
                        },
                        a = {
                            taskLists: !0,
                            strikethrough: !0,
                            emoji: !0
                        };
                    for (var l in r) a[l] = r[l];
                    return a.name = "markdown", e.overlayMode(e.getMode(n, a), o)
                }), "markdown"), e.defineMIME("text/x-gfm", "gfm")
            }, "object" == typeof n && "object" == typeof t ? r(e("../../lib/codemirror"), e("../markdown/markdown"), e("../../addon/mode/overlay")) : r(CodeMirror)
        }, {
            "../../addon/mode/overlay": 6,
            "../../lib/codemirror": 9,
            "../markdown/markdown": 11
        }],
        11: [function(e, t, n) {
            var r;
            r = function(e) {
                "use strict";
                e.defineMode("markdown", (function(t, n) {
                    var r = e.getMode(t, "text/html"),
                        i = "null" == r.name;
                    void 0 === n.highlightFormatting && (n.highlightFormatting = !1), void 0 === n.maxBlockquoteDepth && (n.maxBlockquoteDepth = 0), void 0 === n.taskLists && (n.taskLists = !1), void 0 === n.strikethrough && (n.strikethrough = !1), void 0 === n.emoji && (n.emoji = !1), void 0 === n.fencedCodeBlockHighlighting && (n.fencedCodeBlockHighlighting = !0), void 0 === n.fencedCodeBlockDefaultMode && (n.fencedCodeBlockDefaultMode = "text/plain"), void 0 === n.xml && (n.xml = !0), void 0 === n.tokenTypeOverrides && (n.tokenTypeOverrides = {});
                    var o = {
                        header: "header",
                        code: "comment",
                        quote: "quote",
                        list1: "variable-2",
                        list2: "variable-3",
                        list3: "keyword",
                        hr: "hr",
                        image: "image",
                        imageAltText: "image-alt-text",
                        imageMarker: "image-marker",
                        formatting: "formatting",
                        linkInline: "link",
                        linkEmail: "link",
                        linkText: "link",
                        linkHref: "string",
                        em: "em",
                        strong: "strong",
                        strikethrough: "strikethrough",
                        emoji: "builtin"
                    };
                    for (var a in o) o.hasOwnProperty(a) && n.tokenTypeOverrides[a] && (o[a] = n.tokenTypeOverrides[a]);
                    var l = /^([*\-_])(?:\s*\1){2,}\s*$/,
                        s = /^(?:[*\-+]|^[0-9]+([.)]))\s+/,
                        c = /^\[(x| )\](?=\s)/i,
                        u = n.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
                        // Aly hack fix EasyMDE YAML front matter display bug...
                        //d = /^ {0,3}(?:\={1,}|-{2,})\s*$/,
                        d = /^ {0,3}(?:\={1,})\s*$/,
                        h = /^[^#!\[\]*_\\<>` "'(~:]+/,
                        f = /^(~~~+|```+)[ \t]*([\w\/+#-]*)[^\n`]*$/,
                        p = /^\s*\[[^\]]+?\]:.*$/,
                        m = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/;

                    function g(e, t, n) {
                        return t.f = t.inline = n, n(e, t)
                    }

                    function v(e, t, n) {
                        return t.f = t.block = n, n(e, t)
                    }

                    function x(t) {
                        if (t.linkTitle = !1, t.linkHref = !1, t.linkText = !1, t.em = !1, t.strong = !1, t.strikethrough = !1, t.quote = 0, t.indentedCode = !1, t.f == b) {
                            var n = i;
                            if (!n) {
                                var o = e.innerMode(r, t.htmlState);
                                n = "xml" == o.mode.name && null === o.state.tagStart && !o.state.context && o.state.tokenize.isInText
                            }
                            n && (t.f = S, t.block = y, t.htmlState = null)
                        }
                        return t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.prevLine = t.thisLine, t.thisLine = {
                            stream: null
                        }, null
                    }

                    function y(r, i) {
                        var a, h = r.column() === i.indentation,
                            m = !(a = i.prevLine.stream) || !/\S/.test(a.string),
                            v = i.indentedCode,
                            x = i.prevLine.hr,
                            y = !1 !== i.list,
                            b = (i.listStack[i.listStack.length - 1] || 0) + 3;
                        i.indentedCode = !1;
                        var C = i.indentation;
                        if (null === i.indentationDiff && (i.indentationDiff = i.indentation, y)) {
                            for (i.list = null; C < i.listStack[i.listStack.length - 1];) i.listStack.pop(), i.listStack.length ? i.indentation = i.listStack[i.listStack.length - 1] : i.list = !1;
                            !1 !== i.list && (i.indentationDiff = C - i.listStack[i.listStack.length - 1])
                        }
                        var S = !(m || x || i.prevLine.header || y && v || i.prevLine.fencedCodeEnd),
                            L = (!1 === i.list || x || m) && i.indentation <= b && r.match(l),
                            T = null;
                        if (i.indentationDiff >= 4 && (v || i.prevLine.fencedCodeEnd || i.prevLine.header || m)) return r.skipToEnd(), i.indentedCode = !0, o.code;
                        if (r.eatSpace()) return null;
                        if (h && i.indentation <= b && (T = r.match(u)) && T[1].length <= 6) return i.quote = 0, i.header = T[1].length, i.thisLine.header = !0, n.highlightFormatting && (i.formatting = "header"), i.f = i.inline, w(i);
                        if (i.indentation <= b && r.eat(">")) return i.quote = h ? 1 : i.quote + 1, n.highlightFormatting && (i.formatting = "quote"), r.eatSpace(), w(i);
                        if (!L && !i.setext && h && i.indentation <= b && (T = r.match(s))) {
                            var M = T[1] ? "ol" : "ul";
                            return i.indentation = C + r.current().length, i.list = !0, i.quote = 0, i.listStack.push(i.indentation), i.em = !1, i.strong = !1, i.code = !1, i.strikethrough = !1, n.taskLists && r.match(c, !1) && (i.taskList = !0), i.f = i.inline, n.highlightFormatting && (i.formatting = ["list", "list-" + M]), w(i)
                        }
                        return h && i.indentation <= b && (T = r.match(f, !0)) ? (i.quote = 0, i.fencedEndRE = new RegExp(T[1] + "+ *$"), i.localMode = n.fencedCodeBlockHighlighting && function(n) {
                            if (e.findModeByName) {
                                var r = e.findModeByName(n);
                                r && (n = r.mime || r.mimes[0])
                            }
                            var i = e.getMode(t, n);
                            return "null" == i.name ? null : i
                        }(T[2] || n.fencedCodeBlockDefaultMode), i.localMode && (i.localState = e.startState(i.localMode)), i.f = i.block = k, n.highlightFormatting && (i.formatting = "code-block"), i.code = -1, w(i)) : i.setext || !(S && y || i.quote || !1 !== i.list || i.code || L || p.test(r.string)) && (T = r.lookAhead(1)) && (T = T.match(d)) ? (i.setext ? (i.header = i.setext, i.setext = 0, r.skipToEnd(), n.highlightFormatting && (i.formatting = "header")) : (i.header = "=" == T[0].charAt(0) ? 1 : 2, i.setext = i.header), i.thisLine.header = !0, i.f = i.inline, w(i)) : L ? (r.skipToEnd(), i.hr = !0, i.thisLine.hr = !0, o.hr) : "[" === r.peek() ? g(r, i, A) : g(r, i, i.inline)
                    }

                    function b(t, n) {
                        var o = r.token(t, n.htmlState);
                        if (!i) {
                            var a = e.innerMode(r, n.htmlState);
                            ("xml" == a.mode.name && null === a.state.tagStart && !a.state.context && a.state.tokenize.isInText || n.md_inside && t.current().indexOf(">") > -1) && (n.f = S, n.block = y, n.htmlState = null)
                        }
                        return o
                    }

                    function k(e, t) {
                        var r, i = t.listStack[t.listStack.length - 1] || 0,
                            a = t.indentation < i,
                            l = i + 3;
                        return t.fencedEndRE && t.indentation <= l && (a || e.match(t.fencedEndRE)) ? (n.highlightFormatting && (t.formatting = "code-block"), a || (r = w(t)), t.localMode = t.localState = null, t.block = y, t.f = S, t.fencedEndRE = null, t.code = 0, t.thisLine.fencedCodeEnd = !0, a ? v(e, t, t.block) : r) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), o.code)
                    }

                    function w(e) {
                        var t = [];
                        if (e.formatting) {
                            t.push(o.formatting), "string" == typeof e.formatting && (e.formatting = [e.formatting]);
                            for (var r = 0; r < e.formatting.length; r++) t.push(o.formatting + "-" + e.formatting[r]), "header" === e.formatting[r] && t.push(o.formatting + "-" + e.formatting[r] + "-" + e.header), "quote" === e.formatting[r] && (!n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(o.formatting + "-" + e.formatting[r] + "-" + e.quote) : t.push("error"))
                        }
                        if (e.taskOpen) return t.push("meta"), t.length ? t.join(" ") : null;
                        if (e.taskClosed) return t.push("property"), t.length ? t.join(" ") : null;
                        if (e.linkHref ? t.push(o.linkHref, "url") : (e.strong && t.push(o.strong), e.em && t.push(o.em), e.strikethrough && t.push(o.strikethrough), e.emoji && t.push(o.emoji), e.linkText && t.push(o.linkText), e.code && t.push(o.code), e.image && t.push(o.image), e.imageAltText && t.push(o.imageAltText, "link"), e.imageMarker && t.push(o.imageMarker)), e.header && t.push(o.header, o.header + "-" + e.header), e.quote && (t.push(o.quote), !n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(o.quote + "-" + e.quote) : t.push(o.quote + "-" + n.maxBlockquoteDepth)), !1 !== e.list) {
                            var i = (e.listStack.length - 1) % 3;
                            i ? 1 === i ? t.push(o.list2) : t.push(o.list3) : t.push(o.list1)
                        }
                        return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), t.length ? t.join(" ") : null
                    }

                    function C(e, t) {
                        if (e.match(h, !0)) return w(t)
                    }

                    function S(t, i) {
                        var a = i.text(t, i);
                        if (void 0 !== a) return a;
                        if (i.list) return i.list = null, w(i);
                        if (i.taskList) return " " === t.match(c, !0)[1] ? i.taskOpen = !0 : i.taskClosed = !0, n.highlightFormatting && (i.formatting = "task"), i.taskList = !1, w(i);
                        if (i.taskOpen = !1, i.taskClosed = !1, i.header && t.match(/^#+$/, !0)) return n.highlightFormatting && (i.formatting = "header"), w(i);
                        var l = t.next();
                        if (i.linkTitle) {
                            i.linkTitle = !1;
                            var s = l;
                            "(" === l && (s = ")");
                            var u = "^\\s*(?:[^" + (s = (s + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1")) + "\\\\]+|\\\\\\\\|\\\\.)" + s;
                            if (t.match(new RegExp(u), !0)) return o.linkHref
                        }
                        if ("`" === l) {
                            var d = i.formatting;
                            n.highlightFormatting && (i.formatting = "code"), t.eatWhile("`");
                            var h = t.current().length;
                            if (0 != i.code || i.quote && 1 != h) {
                                if (h == i.code) {
                                    var f = w(i);
                                    return i.code = 0, f
                                }
                                return i.formatting = d, w(i)
                            }
                            return i.code = h, w(i)
                        }
                        if (i.code) return w(i);
                        if ("\\" === l && (t.next(), n.highlightFormatting)) {
                            var p = w(i),
                                g = o.formatting + "-escape";
                            return p ? p + " " + g : g
                        }
                        if ("!" === l && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return i.imageMarker = !0, i.image = !0, n.highlightFormatting && (i.formatting = "image"), w(i);
                        if ("[" === l && i.imageMarker && t.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)) return i.imageMarker = !1, i.imageAltText = !0, n.highlightFormatting && (i.formatting = "image"), w(i);
                        if ("]" === l && i.imageAltText) {
                            n.highlightFormatting && (i.formatting = "image");
                            var p = w(i);
                            return i.imageAltText = !1, i.image = !1, i.inline = i.f = T, p
                        }
                        if ("[" === l && !i.image) return i.linkText && t.match(/^.*?\]/) || (i.linkText = !0, n.highlightFormatting && (i.formatting = "link")), w(i);
                        if ("]" === l && i.linkText) {
                            n.highlightFormatting && (i.formatting = "link");
                            var p = w(i);
                            return i.linkText = !1, i.inline = i.f = t.match(/\(.*?\)| ?\[.*?\]/, !1) ? T : S, p
                        }
                        if ("<" === l && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) return i.f = i.inline = L, n.highlightFormatting && (i.formatting = "link"), (p = w(i)) ? p += " " : p = "", p + o.linkInline;
                        if ("<" === l && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) return i.f = i.inline = L, n.highlightFormatting && (i.formatting = "link"), (p = w(i)) ? p += " " : p = "", p + o.linkEmail;
                        if (n.xml && "<" === l && t.match(/^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i, !1)) {
                            var x = t.string.indexOf(">", t.pos);
                            if (-1 != x) {
                                var y = t.string.substring(t.start, x);
                                /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(y) && (i.md_inside = !0)
                            }
                            return t.backUp(1), i.htmlState = e.startState(r), v(t, i, b)
                        }
                        if (n.xml && "<" === l && t.match(/^\/\w*?>/)) return i.md_inside = !1, "tag";
                        if ("*" === l || "_" === l) {
                            for (var k = 1, C = 1 == t.pos ? " " : t.string.charAt(t.pos - 2); k < 3 && t.eat(l);) k++;
                            var M = t.peek() || " ",
                                A = !/\s/.test(M) && (!m.test(M) || /\s/.test(C) || m.test(C)),
                                N = !/\s/.test(C) && (!m.test(C) || /\s/.test(M) || m.test(M)),
                                D = null,
                                F = null;
                            if (k % 2 && (i.em || !A || "*" !== l && N && !m.test(C) ? i.em != l || !N || "*" !== l && A && !m.test(M) || (D = !1) : D = !0), k > 1 && (i.strong || !A || "*" !== l && N && !m.test(C) ? i.strong != l || !N || "*" !== l && A && !m.test(M) || (F = !1) : F = !0), null != F || null != D) return n.highlightFormatting && (i.formatting = null == D ? "strong" : null == F ? "em" : "strong em"), !0 === D && (i.em = l), !0 === F && (i.strong = l), f = w(i), !1 === D && (i.em = !1), !1 === F && (i.strong = !1), f
                        } else if (" " === l && (t.eat("*") || t.eat("_"))) {
                            if (" " === t.peek()) return w(i);
                            t.backUp(1)
                        }
                        if (n.strikethrough)
                            if ("~" === l && t.eatWhile(l)) {
                                if (i.strikethrough) return n.highlightFormatting && (i.formatting = "strikethrough"), f = w(i), i.strikethrough = !1, f;
                                if (t.match(/^[^\s]/, !1)) return i.strikethrough = !0, n.highlightFormatting && (i.formatting = "strikethrough"), w(i)
                            } else if (" " === l && t.match(/^~~/, !0)) {
                            if (" " === t.peek()) return w(i);
                            t.backUp(2)
                        }
                        if (n.emoji && ":" === l && t.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)) {
                            i.emoji = !0, n.highlightFormatting && (i.formatting = "emoji");
                            var E = w(i);
                            return i.emoji = !1, E
                        }
                        return " " === l && (t.match(/^ +$/, !1) ? i.trailingSpace++ : i.trailingSpace && (i.trailingSpaceNewLine = !0)), w(i)
                    }

                    function L(e, t) {
                        if (">" === e.next()) {
                            t.f = t.inline = S, n.highlightFormatting && (t.formatting = "link");
                            var r = w(t);
                            return r ? r += " " : r = "", r + o.linkInline
                        }
                        return e.match(/^[^>]+/, !0), o.linkInline
                    }

                    function T(e, t) {
                        if (e.eatSpace()) return null;
                        var r, i = e.next();
                        return "(" === i || "[" === i ? (t.f = t.inline = (r = "(" === i ? ")" : "]", function(e, t) {
                            if (e.next() === r) {
                                t.f = t.inline = S, n.highlightFormatting && (t.formatting = "link-string");
                                var i = w(t);
                                return t.linkHref = !1, i
                            }
                            return e.match(M[r]), t.linkHref = !0, w(t)
                        }), n.highlightFormatting && (t.formatting = "link-string"), t.linkHref = !0, w(t)) : "error"
                    }
                    var M = {
                        ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
                        "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/
                    };

                    function A(e, t) {
                        return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = N, e.next(), n.highlightFormatting && (t.formatting = "link"), t.linkText = !0, w(t)) : g(e, t, S)
                    }

                    function N(e, t) {
                        if (e.match(/^\]:/, !0)) {
                            t.f = t.inline = D, n.highlightFormatting && (t.formatting = "link");
                            var r = w(t);
                            return t.linkText = !1, r
                        }
                        return e.match(/^([^\]\\]|\\.)+/, !0), o.linkText
                    }

                    function D(e, t) {
                        return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = S, o.linkHref + " url")
                    }
                    var F = {
                        startState: function() {
                            return {
                                f: y,
                                prevLine: {
                                    stream: null
                                },
                                thisLine: {
                                    stream: null
                                },
                                block: y,
                                htmlState: null,
                                indentation: 0,
                                inline: S,
                                text: C,
                                formatting: !1,
                                linkText: !1,
                                linkHref: !1,
                                linkTitle: !1,
                                code: 0,
                                em: !1,
                                strong: !1,
                                header: 0,
                                setext: 0,
                                hr: !1,
                                taskList: !1,
                                list: !1,
                                listStack: [],
                                quote: 0,
                                trailingSpace: 0,
                                trailingSpaceNewLine: !1,
                                strikethrough: !1,
                                emoji: !1,
                                fencedEndRE: null
                            }
                        },
                        copyState: function(t) {
                            return {
                                f: t.f,
                                prevLine: t.prevLine,
                                thisLine: t.thisLine,
                                block: t.block,
                                htmlState: t.htmlState && e.copyState(r, t.htmlState),
                                indentation: t.indentation,
                                localMode: t.localMode,
                                localState: t.localMode ? e.copyState(t.localMode, t.localState) : null,
                                inline: t.inline,
                                text: t.text,
                                formatting: !1,
                                linkText: t.linkText,
                                linkTitle: t.linkTitle,
                                linkHref: t.linkHref,
                                code: t.code,
                                em: t.em,
                                strong: t.strong,
                                strikethrough: t.strikethrough,
                                emoji: t.emoji,
                                header: t.header,
                                setext: t.setext,
                                hr: t.hr,
                                taskList: t.taskList,
                                list: t.list,
                                listStack: t.listStack.slice(0),
                                quote: t.quote,
                                indentedCode: t.indentedCode,
                                trailingSpace: t.trailingSpace,
                                trailingSpaceNewLine: t.trailingSpaceNewLine,
                                md_inside: t.md_inside,
                                fencedEndRE: t.fencedEndRE
                            }
                        },
                        token: function(e, t) {
                            if (t.formatting = !1, e != t.thisLine.stream) {
                                if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0)) return x(t), null;
                                if (t.prevLine = t.thisLine, t.thisLine = {
                                        stream: e
                                    }, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, !t.localState && (t.f = t.block, t.f != b)) {
                                    var n = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;
                                    if (t.indentation = n, t.indentationDiff = null, n > 0) return null
                                }
                            }
                            return t.f(e, t)
                        },
                        innerMode: function(e) {
                            return e.block == b ? {
                                state: e.htmlState,
                                mode: r
                            } : e.localState ? {
                                state: e.localState,
                                mode: e.localMode
                            } : {
                                state: e,
                                mode: F
                            }
                        },
                        indent: function(t, n, i) {
                            return t.block == b && r.indent ? r.indent(t.htmlState, n, i) : t.localState && t.localMode.indent ? t.localMode.indent(t.localState, n, i) : e.Pass
                        },
                        blankLine: x,
                        getType: w,
                        blockCommentStart: "\x3c!--",
                        blockCommentEnd: "--\x3e",
                        closeBrackets: "()[]{}''\"\"``",
                        fold: "markdown"
                    };
                    return F
                }), "xml"), e.defineMIME("text/markdown", "markdown"), e.defineMIME("text/x-markdown", "markdown")
            }, "object" == typeof n && "object" == typeof t ? r(e("../../lib/codemirror"), e("../xml/xml"), e("../meta")) : r(CodeMirror)
        }, {
            "../../lib/codemirror": 9,
            "../meta": 12,
            "../xml/xml": 13
        }],
        12: [function(e, t, n) {
            (function(e) {
                "use strict";
                e.modeInfo = [{
                    name: "APL",
                    mime: "text/apl",
                    mode: "apl",
                    ext: ["dyalog", "apl"]
                }, {
                    name: "PGP",
                    mimes: ["application/pgp", "application/pgp-encrypted", "application/pgp-keys", "application/pgp-signature"],
                    mode: "asciiarmor",
                    ext: ["asc", "pgp", "sig"]
                }, {
                    name: "ASN.1",
                    mime: "text/x-ttcn-asn",
                    mode: "asn.1",
                    ext: ["asn", "asn1"]
                }, {
                    name: "Asterisk",
                    mime: "text/x-asterisk",
                    mode: "asterisk",
                    file: /^extensions\.conf$/i
                }, {
                    name: "Brainfuck",
                    mime: "text/x-brainfuck",
                    mode: "brainfuck",
                    ext: ["b", "bf"]
                }, {
                    name: "C",
                    mime: "text/x-csrc",
                    mode: "clike",
                    ext: ["c", "h", "ino"]
                }, {
                    name: "C++",
                    mime: "text/x-c++src",
                    mode: "clike",
                    ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"],
                    alias: ["cpp"]
                }, {
                    name: "Cobol",
                    mime: "text/x-cobol",
                    mode: "cobol",
                    ext: ["cob", "cpy"]
                }, {
                    name: "C#",
                    mime: "text/x-csharp",
                    mode: "clike",
                    ext: ["cs"],
                    alias: ["csharp", "cs"]
                }, {
                    name: "Clojure",
                    mime: "text/x-clojure",
                    mode: "clojure",
                    ext: ["clj", "cljc", "cljx"]
                }, {
                    name: "ClojureScript",
                    mime: "text/x-clojurescript",
                    mode: "clojure",
                    ext: ["cljs"]
                }, {
                    name: "Closure Stylesheets (GSS)",
                    mime: "text/x-gss",
                    mode: "css",
                    ext: ["gss"]
                }, {
                    name: "CMake",
                    mime: "text/x-cmake",
                    mode: "cmake",
                    ext: ["cmake", "cmake.in"],
                    file: /^CMakeLists.txt$/
                }, {
                    name: "CoffeeScript",
                    mimes: ["application/vnd.coffeescript", "text/coffeescript", "text/x-coffeescript"],
                    mode: "coffeescript",
                    ext: ["coffee"],
                    alias: ["coffee", "coffee-script"]
                }, {
                    name: "Common Lisp",
                    mime: "text/x-common-lisp",
                    mode: "commonlisp",
                    ext: ["cl", "lisp", "el"],
                    alias: ["lisp"]
                }, {
                    name: "Cypher",
                    mime: "application/x-cypher-query",
                    mode: "cypher",
                    ext: ["cyp", "cypher"]
                }, {
                    name: "Cython",
                    mime: "text/x-cython",
                    mode: "python",
                    ext: ["pyx", "pxd", "pxi"]
                }, {
                    name: "Crystal",
                    mime: "text/x-crystal",
                    mode: "crystal",
                    ext: ["cr"]
                }, {
                    name: "CSS",
                    mime: "text/css",
                    mode: "css",
                    ext: ["css"]
                }, {
                    name: "CQL",
                    mime: "text/x-cassandra",
                    mode: "sql",
                    ext: ["cql"]
                }, {
                    name: "D",
                    mime: "text/x-d",
                    mode: "d",
                    ext: ["d"]
                }, {
                    name: "Dart",
                    mimes: ["application/dart", "text/x-dart"],
                    mode: "dart",
                    ext: ["dart"]
                }, {
                    name: "diff",
                    mime: "text/x-diff",
                    mode: "diff",
                    ext: ["diff", "patch"]
                }, {
                    name: "Django",
                    mime: "text/x-django",
                    mode: "django"
                }, {
                    name: "Dockerfile",
                    mime: "text/x-dockerfile",
                    mode: "dockerfile",
                    file: /^Dockerfile$/
                }, {
                    name: "DTD",
                    mime: "application/xml-dtd",
                    mode: "dtd",
                    ext: ["dtd"]
                }, {
                    name: "Dylan",
                    mime: "text/x-dylan",
                    mode: "dylan",
                    ext: ["dylan", "dyl", "intr"]
                }, {
                    name: "EBNF",
                    mime: "text/x-ebnf",
                    mode: "ebnf"
                }, {
                    name: "ECL",
                    mime: "text/x-ecl",
                    mode: "ecl",
                    ext: ["ecl"]
                }, {
                    name: "edn",
                    mime: "application/edn",
                    mode: "clojure",
                    ext: ["edn"]
                }, {
                    name: "Eiffel",
                    mime: "text/x-eiffel",
                    mode: "eiffel",
                    ext: ["e"]
                }, {
                    name: "Elm",
                    mime: "text/x-elm",
                    mode: "elm",
                    ext: ["elm"]
                }, {
                    name: "Embedded Javascript",
                    mime: "application/x-ejs",
                    mode: "htmlembedded",
                    ext: ["ejs"]
                }, {
                    name: "Embedded Ruby",
                    mime: "application/x-erb",
                    mode: "htmlembedded",
                    ext: ["erb"]
                }, {
                    name: "Erlang",
                    mime: "text/x-erlang",
                    mode: "erlang",
                    ext: ["erl"]
                }, {
                    name: "Esper",
                    mime: "text/x-esper",
                    mode: "sql"
                }, {
                    name: "Factor",
                    mime: "text/x-factor",
                    mode: "factor",
                    ext: ["factor"]
                }, {
                    name: "FCL",
                    mime: "text/x-fcl",
                    mode: "fcl"
                }, {
                    name: "Forth",
                    mime: "text/x-forth",
                    mode: "forth",
                    ext: ["forth", "fth", "4th"]
                }, {
                    name: "Fortran",
                    mime: "text/x-fortran",
                    mode: "fortran",
                    ext: ["f", "for", "f77", "f90", "f95"]
                }, {
                    name: "F#",
                    mime: "text/x-fsharp",
                    mode: "mllike",
                    ext: ["fs"],
                    alias: ["fsharp"]
                }, {
                    name: "Gas",
                    mime: "text/x-gas",
                    mode: "gas",
                    ext: ["s"]
                }, {
                    name: "Gherkin",
                    mime: "text/x-feature",
                    mode: "gherkin",
                    ext: ["feature"]
                }, {
                    name: "GitHub Flavored Markdown",
                    mime: "text/x-gfm",
                    mode: "gfm",
                    file: /^(readme|contributing|history).md$/i
                }, {
                    name: "Go",
                    mime: "text/x-go",
                    mode: "go",
                    ext: ["go"]
                }, {
                    name: "Groovy",
                    mime: "text/x-groovy",
                    mode: "groovy",
                    ext: ["groovy", "gradle"],
                    file: /^Jenkinsfile$/
                }, {
                    name: "HAML",
                    mime: "text/x-haml",
                    mode: "haml",
                    ext: ["haml"]
                }, {
                    name: "Haskell",
                    mime: "text/x-haskell",
                    mode: "haskell",
                    ext: ["hs"]
                }, {
                    name: "Haskell (Literate)",
                    mime: "text/x-literate-haskell",
                    mode: "haskell-literate",
                    ext: ["lhs"]
                }, {
                    name: "Haxe",
                    mime: "text/x-haxe",
                    mode: "haxe",
                    ext: ["hx"]
                }, {
                    name: "HXML",
                    mime: "text/x-hxml",
                    mode: "haxe",
                    ext: ["hxml"]
                }, {
                    name: "ASP.NET",
                    mime: "application/x-aspx",
                    mode: "htmlembedded",
                    ext: ["aspx"],
                    alias: ["asp", "aspx"]
                }, {
                    name: "HTML",
                    mime: "text/html",
                    mode: "htmlmixed",
                    ext: ["html", "htm", "handlebars", "hbs"],
                    alias: ["xhtml"]
                }, {
                    name: "HTTP",
                    mime: "message/http",
                    mode: "http"
                }, {
                    name: "IDL",
                    mime: "text/x-idl",
                    mode: "idl",
                    ext: ["pro"]
                }, {
                    name: "Pug",
                    mime: "text/x-pug",
                    mode: "pug",
                    ext: ["jade", "pug"],
                    alias: ["jade"]
                }, {
                    name: "Java",
                    mime: "text/x-java",
                    mode: "clike",
                    ext: ["java"]
                }, {
                    name: "Java Server Pages",
                    mime: "application/x-jsp",
                    mode: "htmlembedded",
                    ext: ["jsp"],
                    alias: ["jsp"]
                }, {
                    name: "JavaScript",
                    mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"],
                    mode: "javascript",
                    ext: ["js"],
                    alias: ["ecmascript", "js", "node"]
                }, {
                    name: "JSON",
                    mimes: ["application/json", "application/x-json"],
                    mode: "javascript",
                    ext: ["json", "map"],
                    alias: ["json5"]
                }, {
                    name: "JSON-LD",
                    mime: "application/ld+json",
                    mode: "javascript",
                    ext: ["jsonld"],
                    alias: ["jsonld"]
                }, {
                    name: "JSX",
                    mime: "text/jsx",
                    mode: "jsx",
                    ext: ["jsx"]
                }, {
                    name: "Jinja2",
                    mime: "text/jinja2",
                    mode: "jinja2",
                    ext: ["j2", "jinja", "jinja2"]
                }, {
                    name: "Julia",
                    mime: "text/x-julia",
                    mode: "julia",
                    ext: ["jl"]
                }, {
                    name: "Kotlin",
                    mime: "text/x-kotlin",
                    mode: "clike",
                    ext: ["kt"]
                }, {
                    name: "LESS",
                    mime: "text/x-less",
                    mode: "css",
                    ext: ["less"]
                }, {
                    name: "LiveScript",
                    mime: "text/x-livescript",
                    mode: "livescript",
                    ext: ["ls"],
                    alias: ["ls"]
                }, {
                    name: "Lua",
                    mime: "text/x-lua",
                    mode: "lua",
                    ext: ["lua"]
                }, {
                    name: "Markdown",
                    mime: "text/x-markdown",
                    mode: "markdown",
                    ext: ["markdown", "md", "mkd"]
                }, {
                    name: "mIRC",
                    mime: "text/mirc",
                    mode: "mirc"
                }, {
                    name: "MariaDB SQL",
                    mime: "text/x-mariadb",
                    mode: "sql"
                }, {
                    name: "Mathematica",
                    mime: "text/x-mathematica",
                    mode: "mathematica",
                    ext: ["m", "nb", "wl", "wls"]
                }, {
                    name: "Modelica",
                    mime: "text/x-modelica",
                    mode: "modelica",
                    ext: ["mo"]
                }, {
                    name: "MUMPS",
                    mime: "text/x-mumps",
                    mode: "mumps",
                    ext: ["mps"]
                }, {
                    name: "MS SQL",
                    mime: "text/x-mssql",
                    mode: "sql"
                }, {
                    name: "mbox",
                    mime: "application/mbox",
                    mode: "mbox",
                    ext: ["mbox"]
                }, {
                    name: "MySQL",
                    mime: "text/x-mysql",
                    mode: "sql"
                }, {
                    name: "Nginx",
                    mime: "text/x-nginx-conf",
                    mode: "nginx",
                    file: /nginx.*\.conf$/i
                }, {
                    name: "NSIS",
                    mime: "text/x-nsis",
                    mode: "nsis",
                    ext: ["nsh", "nsi"]
                }, {
                    name: "NTriples",
                    mimes: ["application/n-triples", "application/n-quads", "text/n-triples"],
                    mode: "ntriples",
                    ext: ["nt", "nq"]
                }, {
                    name: "Objective-C",
                    mime: "text/x-objectivec",
                    mode: "clike",
                    ext: ["m"],
                    alias: ["objective-c", "objc"]
                }, {
                    name: "Objective-C++",
                    mime: "text/x-objectivec++",
                    mode: "clike",
                    ext: ["mm"],
                    alias: ["objective-c++", "objc++"]
                }, {
                    name: "OCaml",
                    mime: "text/x-ocaml",
                    mode: "mllike",
                    ext: ["ml", "mli", "mll", "mly"]
                }, {
                    name: "Octave",
                    mime: "text/x-octave",
                    mode: "octave",
                    ext: ["m"]
                }, {
                    name: "Oz",
                    mime: "text/x-oz",
                    mode: "oz",
                    ext: ["oz"]
                }, {
                    name: "Pascal",
                    mime: "text/x-pascal",
                    mode: "pascal",
                    ext: ["p", "pas"]
                }, {
                    name: "PEG.js",
                    mime: "null",
                    mode: "pegjs",
                    ext: ["jsonld"]
                }, {
                    name: "Perl",
                    mime: "text/x-perl",
                    mode: "perl",
                    ext: ["pl", "pm"]
                }, {
                    name: "PHP",
                    mimes: ["text/x-php", "application/x-httpd-php", "application/x-httpd-php-open"],
                    mode: "php",
                    ext: ["php", "php3", "php4", "php5", "php7", "phtml"]
                }, {
                    name: "Pig",
                    mime: "text/x-pig",
                    mode: "pig",
                    ext: ["pig"]
                }, {
                    name: "Plain Text",
                    mime: "text/plain",
                    mode: "null",
                    ext: ["txt", "text", "conf", "def", "list", "log"]
                }, {
                    name: "PLSQL",
                    mime: "text/x-plsql",
                    mode: "sql",
                    ext: ["pls"]
                }, {
                    name: "PostgreSQL",
                    mime: "text/x-pgsql",
                    mode: "sql"
                }, {
                    name: "PowerShell",
                    mime: "application/x-powershell",
                    mode: "powershell",
                    ext: ["ps1", "psd1", "psm1"]
                }, {
                    name: "Properties files",
                    mime: "text/x-properties",
                    mode: "properties",
                    ext: ["properties", "ini", "in"],
                    alias: ["ini", "properties"]
                }, {
                    name: "ProtoBuf",
                    mime: "text/x-protobuf",
                    mode: "protobuf",
                    ext: ["proto"]
                }, {
                    name: "Python",
                    mime: "text/x-python",
                    mode: "python",
                    ext: ["BUILD", "bzl", "py", "pyw"],
                    file: /^(BUCK|BUILD)$/
                }, {
                    name: "Puppet",
                    mime: "text/x-puppet",
                    mode: "puppet",
                    ext: ["pp"]
                }, {
                    name: "Q",
                    mime: "text/x-q",
                    mode: "q",
                    ext: ["q"]
                }, {
                    name: "R",
                    mime: "text/x-rsrc",
                    mode: "r",
                    ext: ["r", "R"],
                    alias: ["rscript"]
                }, {
                    name: "reStructuredText",
                    mime: "text/x-rst",
                    mode: "rst",
                    ext: ["rst"],
                    alias: ["rst"]
                }, {
                    name: "RPM Changes",
                    mime: "text/x-rpm-changes",
                    mode: "rpm"
                }, {
                    name: "RPM Spec",
                    mime: "text/x-rpm-spec",
                    mode: "rpm",
                    ext: ["spec"]
                }, {
                    name: "Ruby",
                    mime: "text/x-ruby",
                    mode: "ruby",
                    ext: ["rb"],
                    alias: ["jruby", "macruby", "rake", "rb", "rbx"]
                }, {
                    name: "Rust",
                    mime: "text/x-rustsrc",
                    mode: "rust",
                    ext: ["rs"]
                }, {
                    name: "SAS",
                    mime: "text/x-sas",
                    mode: "sas",
                    ext: ["sas"]
                }, {
                    name: "Sass",
                    mime: "text/x-sass",
                    mode: "sass",
                    ext: ["sass"]
                }, {
                    name: "Scala",
                    mime: "text/x-scala",
                    mode: "clike",
                    ext: ["scala"]
                }, {
                    name: "Scheme",
                    mime: "text/x-scheme",
                    mode: "scheme",
                    ext: ["scm", "ss"]
                }, {
                    name: "SCSS",
                    mime: "text/x-scss",
                    mode: "css",
                    ext: ["scss"]
                }, {
                    name: "Shell",
                    mimes: ["text/x-sh", "application/x-sh"],
                    mode: "shell",
                    ext: ["sh", "ksh", "bash"],
                    alias: ["bash", "sh", "zsh"],
                    file: /^PKGBUILD$/
                }, {
                    name: "Sieve",
                    mime: "application/sieve",
                    mode: "sieve",
                    ext: ["siv", "sieve"]
                }, {
                    name: "Slim",
                    mimes: ["text/x-slim", "application/x-slim"],
                    mode: "slim",
                    ext: ["slim"]
                }, {
                    name: "Smalltalk",
                    mime: "text/x-stsrc",
                    mode: "smalltalk",
                    ext: ["st"]
                }, {
                    name: "Smarty",
                    mime: "text/x-smarty",
                    mode: "smarty",
                    ext: ["tpl"]
                }, {
                    name: "Solr",
                    mime: "text/x-solr",
                    mode: "solr"
                }, {
                    name: "SML",
                    mime: "text/x-sml",
                    mode: "mllike",
                    ext: ["sml", "sig", "fun", "smackspec"]
                }, {
                    name: "Soy",
                    mime: "text/x-soy",
                    mode: "soy",
                    ext: ["soy"],
                    alias: ["closure template"]
                }, {
                    name: "SPARQL",
                    mime: "application/sparql-query",
                    mode: "sparql",
                    ext: ["rq", "sparql"],
                    alias: ["sparul"]
                }, {
                    name: "Spreadsheet",
                    mime: "text/x-spreadsheet",
                    mode: "spreadsheet",
                    alias: ["excel", "formula"]
                }, {
                    name: "SQL",
                    mime: "text/x-sql",
                    mode: "sql",
                    ext: ["sql"]
                }, {
                    name: "SQLite",
                    mime: "text/x-sqlite",
                    mode: "sql"
                }, {
                    name: "Squirrel",
                    mime: "text/x-squirrel",
                    mode: "clike",
                    ext: ["nut"]
                }, {
                    name: "Stylus",
                    mime: "text/x-styl",
                    mode: "stylus",
                    ext: ["styl"]
                }, {
                    name: "Swift",
                    mime: "text/x-swift",
                    mode: "swift",
                    ext: ["swift"]
                }, {
                    name: "sTeX",
                    mime: "text/x-stex",
                    mode: "stex"
                }, {
                    name: "LaTeX",
                    mime: "text/x-latex",
                    mode: "stex",
                    ext: ["text", "ltx", "tex"],
                    alias: ["tex"]
                }, {
                    name: "SystemVerilog",
                    mime: "text/x-systemverilog",
                    mode: "verilog",
                    ext: ["v", "sv", "svh"]
                }, {
                    name: "Tcl",
                    mime: "text/x-tcl",
                    mode: "tcl",
                    ext: ["tcl"]
                }, {
                    name: "Textile",
                    mime: "text/x-textile",
                    mode: "textile",
                    ext: ["textile"]
                }, {
                    name: "TiddlyWiki",
                    mime: "text/x-tiddlywiki",
                    mode: "tiddlywiki"
                }, {
                    name: "Tiki wiki",
                    mime: "text/tiki",
                    mode: "tiki"
                }, {
                    name: "TOML",
                    mime: "text/x-toml",
                    mode: "toml",
                    ext: ["toml"]
                }, {
                    name: "Tornado",
                    mime: "text/x-tornado",
                    mode: "tornado"
                }, {
                    name: "troff",
                    mime: "text/troff",
                    mode: "troff",
                    ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                }, {
                    name: "TTCN",
                    mime: "text/x-ttcn",
                    mode: "ttcn",
                    ext: ["ttcn", "ttcn3", "ttcnpp"]
                }, {
                    name: "TTCN_CFG",
                    mime: "text/x-ttcn-cfg",
                    mode: "ttcn-cfg",
                    ext: ["cfg"]
                }, {
                    name: "Turtle",
                    mime: "text/turtle",
                    mode: "turtle",
                    ext: ["ttl"]
                }, {
                    name: "TypeScript",
                    mime: "application/typescript",
                    mode: "javascript",
                    ext: ["ts"],
                    alias: ["ts"]
                }, {
                    name: "TypeScript-JSX",
                    mime: "text/typescript-jsx",
                    mode: "jsx",
                    ext: ["tsx"],
                    alias: ["tsx"]
                }, {
                    name: "Twig",
                    mime: "text/x-twig",
                    mode: "twig"
                }, {
                    name: "Web IDL",
                    mime: "text/x-webidl",
                    mode: "webidl",
                    ext: ["webidl"]
                }, {
                    name: "VB.NET",
                    mime: "text/x-vb",
                    mode: "vb",
                    ext: ["vb"]
                }, {
                    name: "VBScript",
                    mime: "text/vbscript",
                    mode: "vbscript",
                    ext: ["vbs"]
                }, {
                    name: "Velocity",
                    mime: "text/velocity",
                    mode: "velocity",
                    ext: ["vtl"]
                }, {
                    name: "Verilog",
                    mime: "text/x-verilog",
                    mode: "verilog",
                    ext: ["v"]
                }, {
                    name: "VHDL",
                    mime: "text/x-vhdl",
                    mode: "vhdl",
                    ext: ["vhd", "vhdl"]
                }, {
                    name: "Vue.js Component",
                    mimes: ["script/x-vue", "text/x-vue"],
                    mode: "vue",
                    ext: ["vue"]
                }, {
                    name: "XML",
                    mimes: ["application/xml", "text/xml"],
                    mode: "xml",
                    ext: ["xml", "xsl", "xsd", "svg"],
                    alias: ["rss", "wsdl", "xsd"]
                }, {
                    name: "XQuery",
                    mime: "application/xquery",
                    mode: "xquery",
                    ext: ["xy", "xquery"]
                }, {
                    name: "Yacas",
                    mime: "text/x-yacas",
                    mode: "yacas",
                    ext: ["ys"]
                }, {
                    name: "YAML",
                    mimes: ["text/x-yaml", "text/yaml"],
                    mode: "yaml",
                    ext: ["yaml", "yml"],
                    alias: ["yml"]
                }, {
                    name: "Z80",
                    mime: "text/x-z80",
                    mode: "z80",
                    ext: ["z80"]
                }, {
                    name: "mscgen",
                    mime: "text/x-mscgen",
                    mode: "mscgen",
                    ext: ["mscgen", "mscin", "msc"]
                }, {
                    name: "xu",
                    mime: "text/x-xu",
                    mode: "mscgen",
                    ext: ["xu"]
                }, {
                    name: "msgenny",
                    mime: "text/x-msgenny",
                    mode: "mscgen",
                    ext: ["msgenny"]
                }];
                for (var t = 0; t < e.modeInfo.length; t++) {
                    var n = e.modeInfo[t];
                    n.mimes && (n.mime = n.mimes[0])
                }
                e.findModeByMIME = function(t) {
                    t = t.toLowerCase();
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var r = e.modeInfo[n];
                        if (r.mime == t) return r;
                        if (r.mimes)
                            for (var i = 0; i < r.mimes.length; i++)
                                if (r.mimes[i] == t) return r
                    }
                    return /\+xml$/.test(t) ? e.findModeByMIME("application/xml") : /\+json$/.test(t) ? e.findModeByMIME("application/json") : void 0
                }, e.findModeByExtension = function(t) {
                    t = t.toLowerCase();
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var r = e.modeInfo[n];
                        if (r.ext)
                            for (var i = 0; i < r.ext.length; i++)
                                if (r.ext[i] == t) return r
                    }
                }, e.findModeByFileName = function(t) {
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var r = e.modeInfo[n];
                        if (r.file && r.file.test(t)) return r
                    }
                    var i = t.lastIndexOf("."),
                        o = i > -1 && t.substring(i + 1, t.length);
                    if (o) return e.findModeByExtension(o)
                }, e.findModeByName = function(t) {
                    t = t.toLowerCase();
                    for (var n = 0; n < e.modeInfo.length; n++) {
                        var r = e.modeInfo[n];
                        if (r.name.toLowerCase() == t) return r;
                        if (r.alias)
                            for (var i = 0; i < r.alias.length; i++)
                                if (r.alias[i].toLowerCase() == t) return r
                    }
                }
            })("object" == typeof n && "object" == typeof t ? e("../lib/codemirror") : CodeMirror)
        }, {
            "../lib/codemirror": 9
        }],
        13: [function(e, t, n) {
            (function(e) {
                "use strict";
                var t = {
                        autoSelfClosers: {
                            area: !0,
                            base: !0,
                            br: !0,
                            col: !0,
                            command: !0,
                            embed: !0,
                            frame: !0,
                            hr: !0,
                            img: !0,
                            input: !0,
                            keygen: !0,
                            link: !0,
                            meta: !0,
                            param: !0,
                            source: !0,
                            track: !0,
                            wbr: !0,
                            menuitem: !0
                        },
                        implicitlyClosed: {
                            dd: !0,
                            li: !0,
                            optgroup: !0,
                            option: !0,
                            p: !0,
                            rp: !0,
                            rt: !0,
                            tbody: !0,
                            td: !0,
                            tfoot: !0,
                            th: !0,
                            tr: !0
                        },
                        contextGrabbers: {
                            dd: {
                                dd: !0,
                                dt: !0
                            },
                            dt: {
                                dd: !0,
                                dt: !0
                            },
                            li: {
                                li: !0
                            },
                            option: {
                                option: !0,
                                optgroup: !0
                            },
                            optgroup: {
                                optgroup: !0
                            },
                            p: {
                                address: !0,
                                article: !0,
                                aside: !0,
                                blockquote: !0,
                                dir: !0,
                                div: !0,
                                dl: !0,
                                fieldset: !0,
                                footer: !0,
                                form: !0,
                                h1: !0,
                                h2: !0,
                                h3: !0,
                                h4: !0,
                                h5: !0,
                                h6: !0,
                                header: !0,
                                hgroup: !0,
                                hr: !0,
                                menu: !0,
                                nav: !0,
                                ol: !0,
                                p: !0,
                                pre: !0,
                                section: !0,
                                table: !0,
                                ul: !0
                            },
                            rp: {
                                rp: !0,
                                rt: !0
                            },
                            rt: {
                                rp: !0,
                                rt: !0
                            },
                            tbody: {
                                tbody: !0,
                                tfoot: !0
                            },
                            td: {
                                td: !0,
                                th: !0
                            },
                            tfoot: {
                                tbody: !0
                            },
                            th: {
                                td: !0,
                                th: !0
                            },
                            thead: {
                                tbody: !0,
                                tfoot: !0
                            },
                            tr: {
                                tr: !0
                            }
                        },
                        doNotIndent: {
                            pre: !0
                        },
                        allowUnquoted: !0,
                        allowMissing: !0,
                        caseFold: !0
                    },
                    n = {
                        autoSelfClosers: {},
                        implicitlyClosed: {},
                        contextGrabbers: {},
                        doNotIndent: {},
                        allowUnquoted: !1,
                        allowMissing: !1,
                        allowMissingTagName: !1,
                        caseFold: !1
                    };
                e.defineMode("xml", (function(r, i) {
                    var o, a, l = r.indentUnit,
                        s = {},
                        c = i.htmlMode ? t : n;
                    for (var u in c) s[u] = c[u];
                    for (var u in i) s[u] = i[u];

                    function d(e, t) {
                        function n(n) {
                            return t.tokenize = n, n(e, t)
                        }
                        var r = e.next();
                        return "<" == r ? e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? n(f("atom", "]]>")) : null : e.match("--") ? n(f("comment", "--\x3e")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), n(function e(t) {
                            return function(n, r) {
                                for (var i; null != (i = n.next());) {
                                    if ("<" == i) return r.tokenize = e(t + 1), r.tokenize(n, r);
                                    if (">" == i) {
                                        if (1 == t) {
                                            r.tokenize = d;
                                            break
                                        }
                                        return r.tokenize = e(t - 1), r.tokenize(n, r)
                                    }
                                }
                                return "meta"
                            }
                        }(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = f("meta", "?>"), "meta") : (o = e.eat("/") ? "closeTag" : "openTag", t.tokenize = h, "tag bracket") : "&" == r ? (e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";")) ? "atom" : "error" : (e.eatWhile(/[^&<]/), null)
                    }

                    function h(e, t) {
                        var n, r, i = e.next();
                        if (">" == i || "/" == i && e.eat(">")) return t.tokenize = d, o = ">" == i ? "endTag" : "selfcloseTag", "tag bracket";
                        if ("=" == i) return o = "equals", null;
                        if ("<" == i) {
                            t.tokenize = d, t.state = v, t.tagName = t.tagStart = null;
                            var a = t.tokenize(e, t);
                            return a ? a + " tag error" : "tag error"
                        }
                        return /[\'\"]/.test(i) ? (t.tokenize = (n = i, (r = function(e, t) {
                            for (; !e.eol();)
                                if (e.next() == n) {
                                    t.tokenize = h;
                                    break
                                }
                            return "string"
                        }).isInAttribute = !0, r), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
                    }

                    function f(e, t) {
                        return function(n, r) {
                            for (; !n.eol();) {
                                if (n.match(t)) {
                                    r.tokenize = d;
                                    break
                                }
                                n.next()
                            }
                            return e
                        }
                    }

                    function p(e, t, n) {
                        this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = n, (s.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0)
                    }

                    function m(e) {
                        e.context && (e.context = e.context.prev)
                    }

                    function g(e, t) {
                        for (var n;;) {
                            if (!e.context) return;
                            if (n = e.context.tagName, !s.contextGrabbers.hasOwnProperty(n) || !s.contextGrabbers[n].hasOwnProperty(t)) return;
                            m(e)
                        }
                    }

                    function v(e, t, n) {
                        return "openTag" == e ? (n.tagStart = t.column(), x) : "closeTag" == e ? y : v
                    }

                    function x(e, t, n) {
                        return "word" == e ? (n.tagName = t.current(), a = "tag", w) : s.allowMissingTagName && "endTag" == e ? (a = "tag bracket", w(e, 0, n)) : (a = "error", x)
                    }

                    function y(e, t, n) {
                        if ("word" == e) {
                            var r = t.current();
                            return n.context && n.context.tagName != r && s.implicitlyClosed.hasOwnProperty(n.context.tagName) && m(n), n.context && n.context.tagName == r || !1 === s.matchClosing ? (a = "tag", b) : (a = "tag error", k)
                        }
                        return s.allowMissingTagName && "endTag" == e ? (a = "tag bracket", b(e, 0, n)) : (a = "error", k)
                    }

                    function b(e, t, n) {
                        return "endTag" != e ? (a = "error", b) : (m(n), v)
                    }

                    function k(e, t, n) {
                        return a = "error", b(e, 0, n)
                    }

                    function w(e, t, n) {
                        if ("word" == e) return a = "attribute", C;
                        if ("endTag" == e || "selfcloseTag" == e) {
                            var r = n.tagName,
                                i = n.tagStart;
                            return n.tagName = n.tagStart = null, "selfcloseTag" == e || s.autoSelfClosers.hasOwnProperty(r) ? g(n, r) : (g(n, r), n.context = new p(n, r, i == n.indented)), v
                        }
                        return a = "error", w
                    }

                    function C(e, t, n) {
                        return "equals" == e ? S : (s.allowMissing || (a = "error"), w(e, 0, n))
                    }

                    function S(e, t, n) {
                        return "string" == e ? L : "word" == e && s.allowUnquoted ? (a = "string", w) : (a = "error", w(e, 0, n))
                    }

                    function L(e, t, n) {
                        return "string" == e ? L : w(e, 0, n)
                    }
                    return d.isInText = !0, {
                        startState: function(e) {
                            var t = {
                                tokenize: d,
                                state: v,
                                indented: e || 0,
                                tagName: null,
                                tagStart: null,
                                context: null
                            };
                            return null != e && (t.baseIndent = e), t
                        },
                        token: function(e, t) {
                            if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;
                            o = null;
                            var n = t.tokenize(e, t);
                            return (n || o) && "comment" != n && (a = null, t.state = t.state(o || n, e, t), a && (n = "error" == a ? n + " error" : a)), n
                        },
                        indent: function(t, n, r) {
                            var i = t.context;
                            if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + l;
                            if (i && i.noIndent) return e.Pass;
                            if (t.tokenize != h && t.tokenize != d) return r ? r.match(/^(\s*)/)[0].length : 0;
                            if (t.tagName) return !1 !== s.multilineTagIndentPastTag ? t.tagStart + t.tagName.length + 2 : t.tagStart + l * (s.multilineTagIndentFactor || 1);
                            if (s.alignCDATA && /<!\[CDATA\[/.test(n)) return 0;
                            var o = n && /^<(\/)?([\w_:\.-]*)/.exec(n);
                            if (o && o[1])
                                for (; i;) {
                                    if (i.tagName == o[2]) {
                                        i = i.prev;
                                        break
                                    }
                                    if (!s.implicitlyClosed.hasOwnProperty(i.tagName)) break;
                                    i = i.prev
                                } else if (o)
                                    for (; i;) {
                                        var a = s.contextGrabbers[i.tagName];
                                        if (!a || !a.hasOwnProperty(o[2])) break;
                                        i = i.prev
                                    }
                            for (; i && i.prev && !i.startOfLine;) i = i.prev;
                            return i ? i.indent + l : t.baseIndent || 0
                        },
                        electricInput: /<\/[\s\w:]+>$/,
                        blockCommentStart: "\x3c!--",
                        blockCommentEnd: "--\x3e",
                        configuration: s.htmlMode ? "html" : "xml",
                        helperType: s.htmlMode ? "html" : "xml",
                        skipAttribute: function(e) {
                            e.state == S && (e.state = w)
                        },
                        xmlCurrentTag: function(e) {
                            return e.tagName ? {
                                name: e.tagName,
                                close: "closeTag" == e.type
                            } : null
                        },
                        xmlCurrentContext: function(e) {
                            for (var t = [], n = e.context; n; n = n.prev) n.tagName && t.push(n.tagName);
                            return t.reverse()
                        }
                    }
                })), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
                    name: "xml",
                    htmlMode: !0
                })
            })("object" == typeof n && "object" == typeof t ? e("../../lib/codemirror") : CodeMirror)
        }, {
            "../../lib/codemirror": 9
        }],
        14: [function(e, t, n) {
            ! function(e, r) {
                "object" == typeof n && void 0 !== t ? t.exports = r() : (e = e || self).marked = r()
            }(this, (function() {
                "use strict";

                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }

                function t(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                    return r
                }

                function n(e, n) {
                    var r;
                    if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                        if (Array.isArray(e) || (r = function(e, n) {
                                if (e) {
                                    if ("string" == typeof e) return t(e, n);
                                    var r = Object.prototype.toString.call(e).slice(8, -1);
                                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? t(e, n) : void 0
                                }
                            }(e)) || n && e && "number" == typeof e.length) {
                            r && (e = r);
                            var i = 0;
                            return function() {
                                return i >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[i++]
                                }
                            }
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }
                    return (r = e[Symbol.iterator]()).next.bind(r)
                }
                var r = function(e, t) {
                        return e(t = {
                            exports: {}
                        }, t.exports), t.exports
                    }((function(e) {
                        function t() {
                            return {
                                baseUrl: null,
                                breaks: !1,
                                gfm: !0,
                                headerIds: !0,
                                headerPrefix: "",
                                highlight: null,
                                langPrefix: "language-",
                                mangle: !0,
                                pedantic: !1,
                                renderer: null,
                                sanitize: !1,
                                sanitizer: null,
                                silent: !1,
                                smartLists: !1,
                                smartypants: !1,
                                tokenizer: null,
                                walkTokens: null,
                                xhtml: !1
                            }
                        }
                        e.exports = {
                            defaults: {
                                baseUrl: null,
                                breaks: !1,
                                gfm: !0,
                                headerIds: !0,
                                headerPrefix: "",
                                highlight: null,
                                langPrefix: "language-",
                                mangle: !0,
                                pedantic: !1,
                                renderer: null,
                                sanitize: !1,
                                sanitizer: null,
                                silent: !1,
                                smartLists: !1,
                                smartypants: !1,
                                tokenizer: null,
                                walkTokens: null,
                                xhtml: !1
                            },
                            getDefaults: t,
                            changeDefaults: function(t) {
                                e.exports.defaults = t
                            }
                        }
                    })),
                    i = (r.defaults, r.getDefaults, r.changeDefaults, /[&<>"']/),
                    o = /[&<>"']/g,
                    a = /[<>"']|&(?!#?\w+;)/,
                    l = /[<>"']|&(?!#?\w+;)/g,
                    s = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;"
                    },
                    c = function(e) {
                        return s[e]
                    };
                var u = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

                function d(e) {
                    return e.replace(u, (function(e, t) {
                        return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
                    }))
                }
                var h = /(^|[^\[])\^/g;
                var f = /[^\w:]/g,
                    p = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
                var m = {},
                    g = /^[^:]+:\/*[^/]*$/,
                    v = /^([^:]+:)[\s\S]*$/,
                    x = /^([^:]+:\/*[^/]*)[\s\S]*$/;

                function y(e, t) {
                    m[" " + e] || (g.test(e) ? m[" " + e] = e + "/" : m[" " + e] = b(e, "/", !0));
                    var n = -1 === (e = m[" " + e]).indexOf(":");
                    return "//" === t.substring(0, 2) ? n ? t : e.replace(v, "$1") + t : "/" === t.charAt(0) ? n ? t : e.replace(x, "$1") + t : e + t
                }

                function b(e, t, n) {
                    var r = e.length;
                    if (0 === r) return "";
                    for (var i = 0; i < r;) {
                        var o = e.charAt(r - i - 1);
                        if (o !== t || n) {
                            if (o === t || !n) break;
                            i++
                        } else i++
                    }
                    return e.substr(0, r - i)
                }
                var k = function(e, t) {
                        if (t) {
                            if (i.test(e)) return e.replace(o, c)
                        } else if (a.test(e)) return e.replace(l, c);
                        return e
                    },
                    w = d,
                    C = function(e, t) {
                        e = e.source || e, t = t || "";
                        var n = {
                            replace: function(t, r) {
                                return r = (r = r.source || r).replace(h, "$1"), e = e.replace(t, r), n
                            },
                            getRegex: function() {
                                return new RegExp(e, t)
                            }
                        };
                        return n
                    },
                    S = function(e, t, n) {
                        if (e) {
                            var r;
                            try {
                                r = decodeURIComponent(d(n)).replace(f, "").toLowerCase()
                            } catch (e) {
                                return null
                            }
                            if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:") || 0 === r.indexOf("data:")) return null
                        }
                        t && !p.test(n) && (n = y(t, n));
                        try {
                            n = encodeURI(n).replace(/%25/g, "%")
                        } catch (e) {
                            return null
                        }
                        return n
                    },
                    L = {
                        exec: function() {}
                    },
                    T = function(e) {
                        for (var t, n, r = 1; r < arguments.length; r++)
                            for (n in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                        return e
                    },
                    M = function(e, t) {
                        var n = e.replace(/\|/g, (function(e, t, n) {
                                for (var r = !1, i = t; --i >= 0 && "\\" === n[i];) r = !r;
                                return r ? "|" : " |"
                            })).split(/ \|/),
                            r = 0;
                        if (n.length > t) n.splice(t);
                        else
                            for (; n.length < t;) n.push("");
                        for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, "|");
                        return n
                    },
                    A = b,
                    N = function(e, t) {
                        if (-1 === e.indexOf(t[1])) return -1;
                        for (var n = e.length, r = 0, i = 0; i < n; i++)
                            if ("\\" === e[i]) i++;
                            else if (e[i] === t[0]) r++;
                        else if (e[i] === t[1] && --r < 0) return i;
                        return -1
                    },
                    D = function(e) {
                        e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")
                    },
                    F = r.defaults,
                    E = A,
                    O = M,
                    I = k,
                    z = N;

                function H(e, t, n) {
                    var r = t.href,
                        i = t.title ? I(t.title) : null,
                        o = e[1].replace(/\\([\[\]])/g, "$1");
                    return "!" !== e[0].charAt(0) ? {
                        type: "link",
                        raw: n,
                        href: r,
                        title: i,
                        text: o
                    } : {
                        type: "image",
                        raw: n,
                        href: r,
                        title: i,
                        text: I(o)
                    }
                }
                var R = function() {
                        function e(e) {
                            this.options = e || F
                        }
                        var t = e.prototype;
                        return t.space = function(e) {
                            var t = this.rules.block.newline.exec(e);
                            if (t) return t[0].length > 1 ? {
                                type: "space",
                                raw: t[0]
                            } : {
                                raw: "\n"
                            }
                        }, t.code = function(e, t) {
                            var n = this.rules.block.code.exec(e);
                            if (n) {
                                var r = t[t.length - 1];
                                if (r && "paragraph" === r.type) return {
                                    raw: n[0],
                                    text: n[0].trimRight()
                                };
                                var i = n[0].replace(/^ {4}/gm, "");
                                return {
                                    type: "code",
                                    raw: n[0],
                                    codeBlockStyle: "indented",
                                    text: this.options.pedantic ? i : E(i, "\n")
                                }
                            }
                        }, t.fences = function(e) {
                            var t = this.rules.block.fences.exec(e);
                            if (t) {
                                var n = t[0],
                                    r = function(e, t) {
                                        var n = e.match(/^(\s+)(?:```)/);
                                        if (null === n) return t;
                                        var r = n[1];
                                        return t.split("\n").map((function(e) {
                                            var t = e.match(/^\s+/);
                                            return null === t ? e : t[0].length >= r.length ? e.slice(r.length) : e
                                        })).join("\n")
                                    }(n, t[3] || "");
                                return {
                                    type: "code",
                                    raw: n,
                                    lang: t[2] ? t[2].trim() : t[2],
                                    text: r
                                }
                            }
                        }, t.heading = function(e) {
                            var t = this.rules.block.heading.exec(e);
                            if (t) return {
                                type: "heading",
                                raw: t[0],
                                depth: t[1].length,
                                text: t[2]
                            }
                        }, t.nptable = function(e) {
                            var t = this.rules.block.nptable.exec(e);
                            if (t) {
                                var n = {
                                    type: "table",
                                    header: O(t[1].replace(/^ *| *\| *$/g, "")),
                                    align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                                    cells: t[3] ? t[3].replace(/\n$/, "").split("\n") : [],
                                    raw: t[0]
                                };
                                if (n.header.length === n.align.length) {
                                    var r, i = n.align.length;
                                    for (r = 0; r < i; r++) /^ *-+: *$/.test(n.align[r]) ? n.align[r] = "right" : /^ *:-+: *$/.test(n.align[r]) ? n.align[r] = "center" : /^ *:-+ *$/.test(n.align[r]) ? n.align[r] = "left" : n.align[r] = null;
                                    for (i = n.cells.length, r = 0; r < i; r++) n.cells[r] = O(n.cells[r], n.header.length);
                                    return n
                                }
                            }
                        }, t.hr = function(e) {
                            var t = this.rules.block.hr.exec(e);
                            if (t) return {
                                type: "hr",
                                raw: t[0]
                            }
                        }, t.blockquote = function(e) {
                            var t = this.rules.block.blockquote.exec(e);
                            if (t) {
                                var n = t[0].replace(/^ *> ?/gm, "");
                                return {
                                    type: "blockquote",
                                    raw: t[0],
                                    text: n
                                }
                            }
                        }, t.list = function(e) {
                            var t = this.rules.block.list.exec(e);
                            if (t) {
                                for (var n, r, i, o, a, l, s, c = t[0], u = t[2], d = u.length > 1, h = ")" === u[u.length - 1], f = {
                                        type: "list",
                                        raw: c,
                                        ordered: d,
                                        start: d ? +u.slice(0, -1) : "",
                                        loose: !1,
                                        items: []
                                    }, p = t[0].match(this.rules.block.item), m = !1, g = p.length, v = 0; v < g; v++) c = n = p[v], r = n.length, ~(n = n.replace(/^ *([*+-]|\d+[.)]) */, "")).indexOf("\n ") && (r -= n.length, n = this.options.pedantic ? n.replace(/^ {1,4}/gm, "") : n.replace(new RegExp("^ {1," + r + "}", "gm"), "")), v !== g - 1 && (i = this.rules.block.bullet.exec(p[v + 1])[0], (d ? 1 === i.length || !h && ")" === i[i.length - 1] : i.length > 1 || this.options.smartLists && i !== u) && (o = p.slice(v + 1).join("\n"), f.raw = f.raw.substring(0, f.raw.length - o.length), v = g - 1)), a = m || /\n\n(?!\s*$)/.test(n), v !== g - 1 && (m = "\n" === n.charAt(n.length - 1), a || (a = m)), a && (f.loose = !0), s = void 0, (l = /^\[[ xX]\] /.test(n)) && (s = " " !== n[1], n = n.replace(/^\[[ xX]\] +/, "")), f.items.push({
                                    type: "list_item",
                                    raw: c,
                                    task: l,
                                    checked: s,
                                    loose: a,
                                    text: n
                                });
                                return f
                            }
                        }, t.html = function(e) {
                            var t = this.rules.block.html.exec(e);
                            if (t) return {
                                type: this.options.sanitize ? "paragraph" : "html",
                                raw: t[0],
                                pre: !this.options.sanitizer && ("pre" === t[1] || "script" === t[1] || "style" === t[1]),
                                text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(t[0]) : I(t[0]) : t[0]
                            }
                        }, t.def = function(e) {
                            var t = this.rules.block.def.exec(e);
                            if (t) return t[3] && (t[3] = t[3].substring(1, t[3].length - 1)), {
                                tag: t[1].toLowerCase().replace(/\s+/g, " "),
                                raw: t[0],
                                href: t[2],
                                title: t[3]
                            }
                        }, t.table = function(e) {
                            var t = this.rules.block.table.exec(e);
                            if (t) {
                                var n = {
                                    type: "table",
                                    header: O(t[1].replace(/^ *| *\| *$/g, "")),
                                    align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                                    cells: t[3] ? t[3].replace(/\n$/, "").split("\n") : []
                                };
                                if (n.header.length === n.align.length) {
                                    n.raw = t[0];
                                    var r, i = n.align.length;
                                    for (r = 0; r < i; r++) /^ *-+: *$/.test(n.align[r]) ? n.align[r] = "right" : /^ *:-+: *$/.test(n.align[r]) ? n.align[r] = "center" : /^ *:-+ *$/.test(n.align[r]) ? n.align[r] = "left" : n.align[r] = null;
                                    for (i = n.cells.length, r = 0; r < i; r++) n.cells[r] = O(n.cells[r].replace(/^ *\| *| *\| *$/g, ""), n.header.length);
                                    return n
                                }
                            }
                        }, t.lheading = function(e) {
                            var t = this.rules.block.lheading.exec(e);
                            if (t) return {
                                type: "heading",
                                raw: t[0],
                                depth: "=" === t[2].charAt(0) ? 1 : 2,
                                text: t[1]
                            }
                        }, t.paragraph = function(e) {
                            var t = this.rules.block.paragraph.exec(e);
                            if (t) return {
                                type: "paragraph",
                                raw: t[0],
                                text: "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1]
                            }
                        }, t.text = function(e, t) {
                            var n = this.rules.block.text.exec(e);
                            if (n) {
                                var r = t[t.length - 1];
                                return r && "text" === r.type ? {
                                    raw: n[0],
                                    text: n[0]
                                } : {
                                    type: "text",
                                    raw: n[0],
                                    text: n[0]
                                }
                            }
                        }, t.escape = function(e) {
                            var t = this.rules.inline.escape.exec(e);
                            if (t) return {
                                type: "escape",
                                raw: t[0],
                                text: I(t[1])
                            }
                        }, t.tag = function(e, t, n) {
                            var r = this.rules.inline.tag.exec(e);
                            if (r) return !t && /^<a /i.test(r[0]) ? t = !0 : t && /^<\/a>/i.test(r[0]) && (t = !1), !n && /^<(pre|code|kbd|script)(\s|>)/i.test(r[0]) ? n = !0 : n && /^<\/(pre|code|kbd|script)(\s|>)/i.test(r[0]) && (n = !1), {
                                type: this.options.sanitize ? "text" : "html",
                                raw: r[0],
                                inLink: t,
                                inRawBlock: n,
                                text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(r[0]) : I(r[0]) : r[0]
                            }
                        }, t.link = function(e) {
                            var t = this.rules.inline.link.exec(e);
                            if (t) {
                                var n = z(t[2], "()");
                                if (n > -1) {
                                    var r = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + n;
                                    t[2] = t[2].substring(0, n), t[0] = t[0].substring(0, r).trim(), t[3] = ""
                                }
                                var i = t[2],
                                    o = "";
                                if (this.options.pedantic) {
                                    var a = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);
                                    a ? (i = a[1], o = a[3]) : o = ""
                                } else o = t[3] ? t[3].slice(1, -1) : "";
                                return H(t, {
                                    href: (i = i.trim().replace(/^<([\s\S]*)>$/, "$1")) ? i.replace(this.rules.inline._escapes, "$1") : i,
                                    title: o ? o.replace(this.rules.inline._escapes, "$1") : o
                                }, t[0])
                            }
                        }, t.reflink = function(e, t) {
                            var n;
                            if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
                                var r = (n[2] || n[1]).replace(/\s+/g, " ");
                                if (!(r = t[r.toLowerCase()]) || !r.href) {
                                    var i = n[0].charAt(0);
                                    return {
                                        type: "text",
                                        raw: i,
                                        text: i
                                    }
                                }
                                return H(n, r, n[0])
                            }
                        }, t.strong = function(e, t, n) {
                            void 0 === n && (n = "");
                            var r = this.rules.inline.strong.start.exec(e);
                            if (r && (!r[1] || r[1] && ("" === n || this.rules.inline.punctuation.exec(n)))) {
                                t = t.slice(-1 * e.length);
                                var i, o = "**" === r[0] ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;
                                for (o.lastIndex = 0; null != (r = o.exec(t));)
                                    if (i = this.rules.inline.strong.middle.exec(t.slice(0, r.index + 3))) return {
                                        type: "strong",
                                        raw: e.slice(0, i[0].length),
                                        text: e.slice(2, i[0].length - 2)
                                    }
                            }
                        }, t.em = function(e, t, n) {
                            void 0 === n && (n = "");
                            var r = this.rules.inline.em.start.exec(e);
                            if (r && (!r[1] || r[1] && ("" === n || this.rules.inline.punctuation.exec(n)))) {
                                t = t.slice(-1 * e.length);
                                var i, o = "*" === r[0] ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;
                                for (o.lastIndex = 0; null != (r = o.exec(t));)
                                    if (i = this.rules.inline.em.middle.exec(t.slice(0, r.index + 2))) return {
                                        type: "em",
                                        raw: e.slice(0, i[0].length),
                                        text: e.slice(1, i[0].length - 1)
                                    }
                            }
                        }, t.codespan = function(e) {
                            var t = this.rules.inline.code.exec(e);
                            if (t) {
                                var n = t[2].replace(/\n/g, " "),
                                    r = /[^ ]/.test(n),
                                    i = n.startsWith(" ") && n.endsWith(" ");
                                return r && i && (n = n.substring(1, n.length - 1)), n = I(n, !0), {
                                    type: "codespan",
                                    raw: t[0],
                                    text: n
                                }
                            }
                        }, t.br = function(e) {
                            var t = this.rules.inline.br.exec(e);
                            if (t) return {
                                type: "br",
                                raw: t[0]
                            }
                        }, t.del = function(e) {
                            var t = this.rules.inline.del.exec(e);
                            if (t) return {
                                type: "del",
                                raw: t[0],
                                text: t[1]
                            }
                        }, t.autolink = function(e, t) {
                            var n, r, i = this.rules.inline.autolink.exec(e);
                            if (i) return r = "@" === i[2] ? "mailto:" + (n = I(this.options.mangle ? t(i[1]) : i[1])) : n = I(i[1]), {
                                type: "link",
                                raw: i[0],
                                text: n,
                                href: r,
                                tokens: [{
                                    type: "text",
                                    raw: n,
                                    text: n
                                }]
                            }
                        }, t.url = function(e, t) {
                            var n;
                            if (n = this.rules.inline.url.exec(e)) {
                                var r, i;
                                if ("@" === n[2]) i = "mailto:" + (r = I(this.options.mangle ? t(n[0]) : n[0]));
                                else {
                                    var o;
                                    do {
                                        o = n[0], n[0] = this.rules.inline._backpedal.exec(n[0])[0]
                                    } while (o !== n[0]);
                                    r = I(n[0]), i = "www." === n[1] ? "http://" + r : r
                                }
                                return {
                                    type: "link",
                                    raw: n[0],
                                    text: r,
                                    href: i,
                                    tokens: [{
                                        type: "text",
                                        raw: r,
                                        text: r
                                    }]
                                }
                            }
                        }, t.inlineText = function(e, t, n) {
                            var r, i = this.rules.inline.text.exec(e);
                            if (i) return r = t ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(i[0]) : I(i[0]) : i[0] : I(this.options.smartypants ? n(i[0]) : i[0]), {
                                type: "text",
                                raw: i[0],
                                text: r
                            }
                        }, e
                    }(),
                    P = L,
                    _ = C,
                    W = T,
                    B = {
                        newline: /^\n+/,
                        code: /^( {4}[^\n]+\n*)+/,
                        fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
                        hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
                        heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
                        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
                        list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
                        html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
                        def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
                        nptable: P,
                        table: P,
                        lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
                        _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
                        text: /^[^\n]+/,
                        _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
                        _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
                    };
                B.def = _(B.def).replace("label", B._label).replace("title", B._title).getRegex(), B.bullet = /(?:[*+-]|\d{1,9}[.)])/, B.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/, B.item = _(B.item, "gm").replace(/bull/g, B.bullet).getRegex(), B.list = _(B.list).replace(/bull/g, B.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + B.def.source + ")").getRegex(), B._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", B._comment = /<!--(?!-?>)[\s\S]*?-->/, B.html = _(B.html, "i").replace("comment", B._comment).replace("tag", B._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), B.paragraph = _(B._paragraph).replace("hr", B.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", B._tag).getRegex(), B.blockquote = _(B.blockquote).replace("paragraph", B.paragraph).getRegex(), B.normal = W({}, B), B.gfm = W({}, B.normal, {
                    nptable: "^ *([^|\\n ].*\\|.*)\\n *([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
                    table: "^ *\\|(.+)\\n *\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
                }), B.gfm.nptable = _(B.gfm.nptable).replace("hr", B.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", B._tag).getRegex(), B.gfm.table = _(B.gfm.table).replace("hr", B.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", B._tag).getRegex(), B.pedantic = W({}, B.normal, {
                    html: _("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", B._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
                    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
                    heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
                    fences: P,
                    paragraph: _(B.normal._paragraph).replace("hr", B.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", B.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
                });
                var j = {
                    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
                    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
                    url: P,
                    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
                    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
                    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
                    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
                    reflinkSearch: "reflink|nolink(?!\\()",
                    strong: {
                        start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,
                        middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
                        endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation\s]|$))/,
                        endUnd: /[^\s]__(?!_)(?:(?=[punctuation\s])|$)/
                    },
                    em: {
                        start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,
                        middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
                        endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation\s]|$))/,
                        endUnd: /[^\s]_(?!_)(?:(?=[punctuation\s])|$)/
                    },
                    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
                    br: /^( {2,}|\\)\n(?!\s*$)/,
                    del: P,
                    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,
                    punctuation: /^([\s*punctuation])/,
                    _punctuation: "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"
                };
                j.punctuation = _(j.punctuation).replace(/punctuation/g, j._punctuation).getRegex(), j._blockSkip = "\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>", j._overlapSkip = "__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*", j.em.start = _(j.em.start).replace(/punctuation/g, j._punctuation).getRegex(), j.em.middle = _(j.em.middle).replace(/punctuation/g, j._punctuation).replace(/overlapSkip/g, j._overlapSkip).getRegex(), j.em.endAst = _(j.em.endAst, "g").replace(/punctuation/g, j._punctuation).getRegex(), j.em.endUnd = _(j.em.endUnd, "g").replace(/punctuation/g, j._punctuation).getRegex(), j.strong.start = _(j.strong.start).replace(/punctuation/g, j._punctuation).getRegex(), j.strong.middle = _(j.strong.middle).replace(/punctuation/g, j._punctuation).replace(/blockSkip/g, j._blockSkip).getRegex(), j.strong.endAst = _(j.strong.endAst, "g").replace(/punctuation/g, j._punctuation).getRegex(), j.strong.endUnd = _(j.strong.endUnd, "g").replace(/punctuation/g, j._punctuation).getRegex(), j.blockSkip = _(j._blockSkip, "g").getRegex(), j.overlapSkip = _(j._overlapSkip, "g").getRegex(), j._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, j._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, j._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, j.autolink = _(j.autolink).replace("scheme", j._scheme).replace("email", j._email).getRegex(), j._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, j.tag = _(j.tag).replace("comment", B._comment).replace("attribute", j._attribute).getRegex(), j._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, j._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/, j._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, j.link = _(j.link).replace("label", j._label).replace("href", j._href).replace("title", j._title).getRegex(), j.reflink = _(j.reflink).replace("label", j._label).getRegex(), j.reflinkSearch = _(j.reflinkSearch, "g").replace("reflink", j.reflink).replace("nolink", j.nolink).getRegex(), j.normal = W({}, j), j.pedantic = W({}, j.normal, {
                    strong: {
                        start: /^__|\*\*/,
                        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                        endAst: /\*\*(?!\*)/g,
                        endUnd: /__(?!_)/g
                    },
                    em: {
                        start: /^_|\*/,
                        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
                        endAst: /\*(?!\*)/g,
                        endUnd: /_(?!_)/g
                    },
                    link: _(/^!?\[(label)\]\((.*?)\)/).replace("label", j._label).getRegex(),
                    reflink: _(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", j._label).getRegex()
                }), j.gfm = W({}, j.normal, {
                    escape: _(j.escape).replace("])", "~|])").getRegex(),
                    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
                    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
                    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
                    del: /^~+(?=\S)([\s\S]*?\S)~+/,
                    text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
                }), j.gfm.url = _(j.gfm.url, "i").replace("email", j.gfm._extended_email).getRegex(), j.breaks = W({}, j.gfm, {
                    br: _(j.br).replace("{2,}", "*").getRegex(),
                    text: _(j.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
                });
                var q = {
                        block: B,
                        inline: j
                    },
                    U = r.defaults,
                    $ = q.block,
                    G = q.inline;

                function V(e) {
                    return e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…")
                }

                function X(e) {
                    var t, n, r = "",
                        i = e.length;
                    for (t = 0; t < i; t++) n = e.charCodeAt(t), Math.random() > .5 && (n = "x" + n.toString(16)), r += "&#" + n + ";";
                    return r
                }
                var K = function() {
                        function t(e) {
                            this.tokens = [], this.tokens.links = Object.create(null), this.options = e || U, this.options.tokenizer = this.options.tokenizer || new R, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options;
                            var t = {
                                block: $.normal,
                                inline: G.normal
                            };
                            this.options.pedantic ? (t.block = $.pedantic, t.inline = G.pedantic) : this.options.gfm && (t.block = $.gfm, this.options.breaks ? t.inline = G.breaks : t.inline = G.gfm), this.tokenizer.rules = t
                        }
                        t.lex = function(e, n) {
                            return new t(n).lex(e)
                        };
                        var n, r, i, o = t.prototype;
                        return o.lex = function(e) {
                            return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    "), this.blockTokens(e, this.tokens, !0), this.inline(this.tokens), this.tokens
                        }, o.blockTokens = function(e, t, n) {
                            var r, i, o, a;
                            for (void 0 === t && (t = []), void 0 === n && (n = !0), e = e.replace(/^ +$/gm, ""); e;)
                                if (r = this.tokenizer.space(e)) e = e.substring(r.raw.length), r.type && t.push(r);
                                else if (r = this.tokenizer.code(e, t)) e = e.substring(r.raw.length), r.type ? t.push(r) : ((a = t[t.length - 1]).raw += "\n" + r.raw, a.text += "\n" + r.text);
                            else if (r = this.tokenizer.fences(e)) e = e.substring(r.raw.length), t.push(r);
                            else if (r = this.tokenizer.heading(e)) e = e.substring(r.raw.length), t.push(r);
                            else if (r = this.tokenizer.nptable(e)) e = e.substring(r.raw.length), t.push(r);
                            else if (r = this.tokenizer.hr(e)) e = e.substring(r.raw.length), t.push(r);
                            else if (r = this.tokenizer.blockquote(e)) e = e.substring(r.raw.length), r.tokens = this.blockTokens(r.text, [], n), t.push(r);
                            else if (r = this.tokenizer.list(e)) {
                                for (e = e.substring(r.raw.length), o = r.items.length, i = 0; i < o; i++) r.items[i].tokens = this.blockTokens(r.items[i].text, [], !1);
                                t.push(r)
                            } else if (r = this.tokenizer.html(e)) e = e.substring(r.raw.length), t.push(r);
                            else if (n && (r = this.tokenizer.def(e))) e = e.substring(r.raw.length), this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
                                href: r.href,
                                title: r.title
                            });
                            else if (r = this.tokenizer.table(e)) e = e.substring(r.raw.length), t.push(r);
                            else if (r = this.tokenizer.lheading(e)) e = e.substring(r.raw.length), t.push(r);
                            else if (n && (r = this.tokenizer.paragraph(e))) e = e.substring(r.raw.length), t.push(r);
                            else if (r = this.tokenizer.text(e, t)) e = e.substring(r.raw.length), r.type ? t.push(r) : ((a = t[t.length - 1]).raw += "\n" + r.raw, a.text += "\n" + r.text);
                            else if (e) {
                                var l = "Infinite loop on byte: " + e.charCodeAt(0);
                                if (this.options.silent) {
                                    console.error(l);
                                    break
                                }
                                throw new Error(l)
                            }
                            return t
                        }, o.inline = function(e) {
                            var t, n, r, i, o, a, l = e.length;
                            for (t = 0; t < l; t++) switch ((a = e[t]).type) {
                                case "paragraph":
                                case "text":
                                case "heading":
                                    a.tokens = [], this.inlineTokens(a.text, a.tokens);
                                    break;
                                case "table":
                                    for (a.tokens = {
                                            header: [],
                                            cells: []
                                        }, i = a.header.length, n = 0; n < i; n++) a.tokens.header[n] = [], this.inlineTokens(a.header[n], a.tokens.header[n]);
                                    for (i = a.cells.length, n = 0; n < i; n++)
                                        for (o = a.cells[n], a.tokens.cells[n] = [], r = 0; r < o.length; r++) a.tokens.cells[n][r] = [], this.inlineTokens(o[r], a.tokens.cells[n][r]);
                                    break;
                                case "blockquote":
                                    this.inline(a.tokens);
                                    break;
                                case "list":
                                    for (i = a.items.length, n = 0; n < i; n++) this.inline(a.items[n].tokens)
                            }
                            return e
                        }, o.inlineTokens = function(e, t, n, r, i) {
                            var o;
                            void 0 === t && (t = []), void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === i && (i = "");
                            var a, l = e;
                            if (this.tokens.links) {
                                var s = Object.keys(this.tokens.links);
                                if (s.length > 0)
                                    for (; null != (a = this.tokenizer.rules.inline.reflinkSearch.exec(l));) s.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (l = l.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
                            }
                            for (; null != (a = this.tokenizer.rules.inline.blockSkip.exec(l));) l = l.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
                            for (; e;)
                                if (o = this.tokenizer.escape(e)) e = e.substring(o.raw.length), t.push(o);
                                else if (o = this.tokenizer.tag(e, n, r)) e = e.substring(o.raw.length), n = o.inLink, r = o.inRawBlock, t.push(o);
                            else if (o = this.tokenizer.link(e)) e = e.substring(o.raw.length), "link" === o.type && (o.tokens = this.inlineTokens(o.text, [], !0, r)), t.push(o);
                            else if (o = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(o.raw.length), "link" === o.type && (o.tokens = this.inlineTokens(o.text, [], !0, r)), t.push(o);
                            else if (o = this.tokenizer.strong(e, l, i)) e = e.substring(o.raw.length), o.tokens = this.inlineTokens(o.text, [], n, r), t.push(o);
                            else if (o = this.tokenizer.em(e, l, i)) e = e.substring(o.raw.length), o.tokens = this.inlineTokens(o.text, [], n, r), t.push(o);
                            else if (o = this.tokenizer.codespan(e)) e = e.substring(o.raw.length), t.push(o);
                            else if (o = this.tokenizer.br(e)) e = e.substring(o.raw.length), t.push(o);
                            else if (o = this.tokenizer.del(e)) e = e.substring(o.raw.length), o.tokens = this.inlineTokens(o.text, [], n, r), t.push(o);
                            else if (o = this.tokenizer.autolink(e, X)) e = e.substring(o.raw.length), t.push(o);
                            else if (n || !(o = this.tokenizer.url(e, X))) {
                                if (o = this.tokenizer.inlineText(e, r, V)) e = e.substring(o.raw.length), i = o.raw.slice(-1), t.push(o);
                                else if (e) {
                                    var c = "Infinite loop on byte: " + e.charCodeAt(0);
                                    if (this.options.silent) {
                                        console.error(c);
                                        break
                                    }
                                    throw new Error(c)
                                }
                            } else e = e.substring(o.raw.length), t.push(o);
                            return t
                        }, n = t, i = [{
                            key: "rules",
                            get: function() {
                                return {
                                    block: $,
                                    inline: G
                                }
                            }
                        }], (r = null) && e(n.prototype, r), i && e(n, i), t
                    }(),
                    Z = r.defaults,
                    Y = S,
                    Q = k,
                    J = function() {
                        function e(e) {
                            this.options = e || Z
                        }
                        var t = e.prototype;
                        return t.code = function(e, t, n) {
                            var r = (t || "").match(/\S*/)[0];
                            if (this.options.highlight) {
                                var i = this.options.highlight(e, r);
                                null != i && i !== e && (n = !0, e = i)
                            }
                            return r ? '<pre><code class="' + this.options.langPrefix + Q(r, !0) + '">' + (n ? e : Q(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : Q(e, !0)) + "</code></pre>\n"
                        }, t.blockquote = function(e) {
                            return "<blockquote>\n" + e + "</blockquote>\n"
                        }, t.html = function(e) {
                            return e
                        }, t.heading = function(e, t, n, r) {
                            return this.options.headerIds ? "<h" + t + ' id="' + this.options.headerPrefix + r.slug(n) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n"
                        }, t.hr = function() {
                            return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
                        }, t.list = function(e, t, n) {
                            var r = t ? "ol" : "ul";
                            return "<" + r + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + r + ">\n"
                        }, t.listitem = function(e) {
                            return "<li>" + e + "</li>\n"
                        }, t.checkbox = function(e) {
                            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
                        }, t.paragraph = function(e) {
                            return "<p>" + e + "</p>\n"
                        }, t.table = function(e, t) {
                            return t && (t = "<tbody>" + t + "</tbody>"), "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
                        }, t.tablerow = function(e) {
                            return "<tr>\n" + e + "</tr>\n"
                        }, t.tablecell = function(e, t) {
                            var n = t.header ? "th" : "td";
                            return (t.align ? "<" + n + ' align="' + t.align + '">' : "<" + n + ">") + e + "</" + n + ">\n"
                        }, t.strong = function(e) {
                            return "<strong>" + e + "</strong>"
                        }, t.em = function(e) {
                            return "<em>" + e + "</em>"
                        }, t.codespan = function(e) {
                            return "<code>" + e + "</code>"
                        }, t.br = function() {
                            return this.options.xhtml ? "<br/>" : "<br>"
                        }, t.del = function(e) {
                            return "<del>" + e + "</del>"
                        }, t.link = function(e, t, n) {
                            if (null === (e = Y(this.options.sanitize, this.options.baseUrl, e))) return n;
                            var r = '<a href="' + Q(e) + '"';
                            return t && (r += ' title="' + t + '"'), r += ">" + n + "</a>"
                        }, t.image = function(e, t, n) {
                            if (null === (e = Y(this.options.sanitize, this.options.baseUrl, e))) return n;
                            var r = '<img src="' + e + '" alt="' + n + '"';
                            return t && (r += ' title="' + t + '"'), r += this.options.xhtml ? "/>" : ">"
                        }, t.text = function(e) {
                            return e
                        }, e
                    }(),
                    ee = function() {
                        function e() {}
                        var t = e.prototype;
                        return t.strong = function(e) {
                            return e
                        }, t.em = function(e) {
                            return e
                        }, t.codespan = function(e) {
                            return e
                        }, t.del = function(e) {
                            return e
                        }, t.html = function(e) {
                            return e
                        }, t.text = function(e) {
                            return e
                        }, t.link = function(e, t, n) {
                            return "" + n
                        }, t.image = function(e, t, n) {
                            return "" + n
                        }, t.br = function() {
                            return ""
                        }, e
                    }(),
                    te = function() {
                        function e() {
                            this.seen = {}
                        }
                        return e.prototype.slug = function(e) {
                            var t = e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
                            if (this.seen.hasOwnProperty(t)) {
                                var n = t;
                                do {
                                    this.seen[n]++, t = n + "-" + this.seen[n]
                                } while (this.seen.hasOwnProperty(t))
                            }
                            return this.seen[t] = 0, t
                        }, e
                    }(),
                    ne = r.defaults,
                    re = w,
                    ie = function() {
                        function e(e) {
                            this.options = e || ne, this.options.renderer = this.options.renderer || new J, this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new ee, this.slugger = new te
                        }
                        e.parse = function(t, n) {
                            return new e(n).parse(t)
                        };
                        var t = e.prototype;
                        return t.parse = function(e, t) {
                            void 0 === t && (t = !0);
                            var n, r, i, o, a, l, s, c, u, d, h, f, p, m, g, v, x, y, b = "",
                                k = e.length;
                            for (n = 0; n < k; n++) switch ((d = e[n]).type) {
                                case "space":
                                    continue;
                                case "hr":
                                    b += this.renderer.hr();
                                    continue;
                                case "heading":
                                    b += this.renderer.heading(this.parseInline(d.tokens), d.depth, re(this.parseInline(d.tokens, this.textRenderer)), this.slugger);
                                    continue;
                                case "code":
                                    b += this.renderer.code(d.text, d.lang, d.escaped);
                                    continue;
                                case "table":
                                    for (c = "", s = "", o = d.header.length, r = 0; r < o; r++) s += this.renderer.tablecell(this.parseInline(d.tokens.header[r]), {
                                        header: !0,
                                        align: d.align[r]
                                    });
                                    for (c += this.renderer.tablerow(s), u = "", o = d.cells.length, r = 0; r < o; r++) {
                                        for (s = "", a = (l = d.tokens.cells[r]).length, i = 0; i < a; i++) s += this.renderer.tablecell(this.parseInline(l[i]), {
                                            header: !1,
                                            align: d.align[i]
                                        });
                                        u += this.renderer.tablerow(s)
                                    }
                                    b += this.renderer.table(c, u);
                                    continue;
                                case "blockquote":
                                    u = this.parse(d.tokens), b += this.renderer.blockquote(u);
                                    continue;
                                case "list":
                                    for (h = d.ordered, f = d.start, p = d.loose, o = d.items.length, u = "", r = 0; r < o; r++) v = (g = d.items[r]).checked, x = g.task, m = "", g.task && (y = this.renderer.checkbox(v), p ? g.tokens.length > 0 && "text" === g.tokens[0].type ? (g.tokens[0].text = y + " " + g.tokens[0].text, g.tokens[0].tokens && g.tokens[0].tokens.length > 0 && "text" === g.tokens[0].tokens[0].type && (g.tokens[0].tokens[0].text = y + " " + g.tokens[0].tokens[0].text)) : g.tokens.unshift({
                                        type: "text",
                                        text: y
                                    }) : m += y), m += this.parse(g.tokens, p), u += this.renderer.listitem(m, x, v);
                                    b += this.renderer.list(u, h, f);
                                    continue;
                                case "html":
                                    b += this.renderer.html(d.text);
                                    continue;
                                case "paragraph":
                                    b += this.renderer.paragraph(this.parseInline(d.tokens));
                                    continue;
                                case "text":
                                    for (u = d.tokens ? this.parseInline(d.tokens) : d.text; n + 1 < k && "text" === e[n + 1].type;) u += "\n" + ((d = e[++n]).tokens ? this.parseInline(d.tokens) : d.text);
                                    b += t ? this.renderer.paragraph(u) : u;
                                    continue;
                                default:
                                    var w = 'Token with "' + d.type + '" type was not found.';
                                    if (this.options.silent) return void console.error(w);
                                    throw new Error(w)
                            }
                            return b
                        }, t.parseInline = function(e, t) {
                            t = t || this.renderer;
                            var n, r, i = "",
                                o = e.length;
                            for (n = 0; n < o; n++) switch ((r = e[n]).type) {
                                case "escape":
                                    i += t.text(r.text);
                                    break;
                                case "html":
                                    i += t.html(r.text);
                                    break;
                                case "link":
                                    i += t.link(r.href, r.title, this.parseInline(r.tokens, t));
                                    break;
                                case "image":
                                    i += t.image(r.href, r.title, r.text);
                                    break;
                                case "strong":
                                    i += t.strong(this.parseInline(r.tokens, t));
                                    break;
                                case "em":
                                    i += t.em(this.parseInline(r.tokens, t));
                                    break;
                                case "codespan":
                                    i += t.codespan(r.text);
                                    break;
                                case "br":
                                    i += t.br();
                                    break;
                                case "del":
                                    i += t.del(this.parseInline(r.tokens, t));
                                    break;
                                case "text":
                                    i += t.text(r.text);
                                    break;
                                default:
                                    var a = 'Token with "' + r.type + '" type was not found.';
                                    if (this.options.silent) return void console.error(a);
                                    throw new Error(a)
                            }
                            return i
                        }, e
                    }(),
                    oe = T,
                    ae = D,
                    le = k,
                    se = r.getDefaults,
                    ce = r.changeDefaults,
                    ue = r.defaults;

                function de(e, t, n) {
                    if (null == e) throw new Error("marked(): input parameter is undefined or null");
                    if ("string" != typeof e) throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
                    if ("function" == typeof t && (n = t, t = null), t = oe({}, de.defaults, t || {}), ae(t), n) {
                        var r, i = t.highlight;
                        try {
                            r = K.lex(e, t)
                        } catch (e) {
                            return n(e)
                        }
                        var o = function(e) {
                            var o;
                            if (!e) try {
                                o = ie.parse(r, t)
                            } catch (t) {
                                e = t
                            }
                            return t.highlight = i, e ? n(e) : n(null, o)
                        };
                        if (!i || i.length < 3) return o();
                        if (delete t.highlight, !r.length) return o();
                        var a = 0;
                        return de.walkTokens(r, (function(e) {
                            "code" === e.type && (a++, setTimeout((function() {
                                i(e.text, e.lang, (function(t, n) {
                                    if (t) return o(t);
                                    null != n && n !== e.text && (e.text = n, e.escaped = !0), 0 === --a && o()
                                }))
                            }), 0))
                        })), void(0 === a && o())
                    }
                    try {
                        var l = K.lex(e, t);
                        return t.walkTokens && de.walkTokens(l, t.walkTokens), ie.parse(l, t)
                    } catch (e) {
                        if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", t.silent) return "<p>An error occurred:</p><pre>" + le(e.message + "", !0) + "</pre>";
                        throw e
                    }
                }
                return de.options = de.setOptions = function(e) {
                    return oe(de.defaults, e), ce(de.defaults), de
                }, de.getDefaults = se, de.defaults = ue, de.use = function(e) {
                    var t = oe({}, e);
                    if (e.renderer && function() {
                            var n = de.defaults.renderer || new J,
                                r = function(t) {
                                    var r = n[t];
                                    n[t] = function() {
                                        for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
                                        var l = e.renderer[t].apply(n, o);
                                        return !1 === l && (l = r.apply(n, o)), l
                                    }
                                };
                            for (var i in e.renderer) r(i);
                            t.renderer = n
                        }(), e.tokenizer && function() {
                            var n = de.defaults.tokenizer || new R,
                                r = function(t) {
                                    var r = n[t];
                                    n[t] = function() {
                                        for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
                                        var l = e.tokenizer[t].apply(n, o);
                                        return !1 === l && (l = r.apply(n, o)), l
                                    }
                                };
                            for (var i in e.tokenizer) r(i);
                            t.tokenizer = n
                        }(), e.walkTokens) {
                        var n = de.defaults.walkTokens;
                        t.walkTokens = function(t) {
                            e.walkTokens(t), n && n(t)
                        }
                    }
                    de.setOptions(t)
                }, de.walkTokens = function(e, t) {
                    for (var r, i = n(e); !(r = i()).done;) {
                        var o = r.value;
                        switch (t(o), o.type) {
                            case "table":
                                for (var a, l = n(o.tokens.header); !(a = l()).done;) {
                                    var s = a.value;
                                    de.walkTokens(s, t)
                                }
                                for (var c, u = n(o.tokens.cells); !(c = u()).done;)
                                    for (var d, h = n(c.value); !(d = h()).done;) {
                                        var f = d.value;
                                        de.walkTokens(f, t)
                                    }
                                break;
                            case "list":
                                de.walkTokens(o.items, t);
                                break;
                            default:
                                o.tokens && de.walkTokens(o.tokens, t)
                        }
                    }
                }, de.Parser = ie, de.parser = ie.parse, de.Renderer = J, de.TextRenderer = ee, de.Lexer = K, de.lexer = K.lex, de.Tokenizer = R, de.Slugger = te, de.parse = de, de
            }))
        }, {}],
        15: [function(e, t, n) {
            (function(n) {
                var r;
                ! function() {
                    "use strict";
                    (r = function(e, t, r, i) {
                        i = i || {}, this.dictionary = null, this.rules = {}, this.dictionaryTable = {}, this.compoundRules = [], this.compoundRuleCodes = {}, this.replacementTable = [], this.flags = i.flags || {}, this.memoized = {}, this.loaded = !1;
                        var o, a, l, s, c, u = this;

                        function d(e, t) {
                            var n = u._readFile(e, null, i.asyncLoad);
                            i.asyncLoad ? n.then((function(e) {
                                t(e)
                            })) : t(n)
                        }

                        function h(e) {
                            t = e, r && p()
                        }

                        function f(e) {
                            r = e, t && p()
                        }

                        function p() {
                            for (u.rules = u._parseAFF(t), u.compoundRuleCodes = {}, a = 0, s = u.compoundRules.length; a < s; a++) {
                                var e = u.compoundRules[a];
                                for (l = 0, c = e.length; l < c; l++) u.compoundRuleCodes[e[l]] = []
                            }
                            for (a in "ONLYINCOMPOUND" in u.flags && (u.compoundRuleCodes[u.flags.ONLYINCOMPOUND] = []), u.dictionaryTable = u._parseDIC(r), u.compoundRuleCodes) 0 === u.compoundRuleCodes[a].length && delete u.compoundRuleCodes[a];
                            for (a = 0, s = u.compoundRules.length; a < s; a++) {
                                var n = u.compoundRules[a],
                                    o = "";
                                for (l = 0, c = n.length; l < c; l++) {
                                    var d = n[l];
                                    d in u.compoundRuleCodes ? o += "(" + u.compoundRuleCodes[d].join("|") + ")" : o += d
                                }
                                u.compoundRules[a] = new RegExp(o, "i")
                            }
                            u.loaded = !0, i.asyncLoad && i.loadedCallback && i.loadedCallback(u)
                        }
                        return e && (u.dictionary = e, t && r ? p() : "undefined" != typeof window && "chrome" in window && "extension" in window.chrome && "getURL" in window.chrome.extension ? (o = i.dictionaryPath ? i.dictionaryPath : "typo/dictionaries", t || d(chrome.extension.getURL(o + "/" + e + "/" + e + ".aff"), h), r || d(chrome.extension.getURL(o + "/" + e + "/" + e + ".dic"), f)) : (o = i.dictionaryPath ? i.dictionaryPath : void 0 !== n ? n + "/dictionaries" : "./dictionaries", t || d(o + "/" + e + "/" + e + ".aff", h), r || d(o + "/" + e + "/" + e + ".dic", f))), this
                    }).prototype = {
                        load: function(e) {
                            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                            return this
                        },
                        _readFile: function(t, n, r) {
                            if (n = n || "utf8", "undefined" != typeof XMLHttpRequest) {
                                var i, o = new XMLHttpRequest;
                                return o.open("GET", t, r), r && (i = new Promise((function(e, t) {
                                    o.onload = function() {
                                        200 === o.status ? e(o.responseText) : t(o.statusText)
                                    }, o.onerror = function() {
                                        t(o.statusText)
                                    }
                                }))), o.overrideMimeType && o.overrideMimeType("text/plain; charset=" + n), o.send(null), r ? i : o.responseText
                            }
                            if (void 0 !== e) {
                                var a = e("fs");
                                try {
                                    if (a.existsSync(t)) return a.readFileSync(t, n);
                                    console.log("Path " + t + " does not exist.")
                                } catch (e) {
                                    return console.log(e), ""
                                }
                            }
                        },
                        _parseAFF: function(e) {
                            var t, n, r, i, o, a, l, s = {},
                                c = (e = this._removeAffixComments(e)).split(/\r?\n/);
                            for (i = 0, a = c.length; i < a; i++) {
                                var u = (t = c[i]).split(/\s+/),
                                    d = u[0];
                                if ("PFX" == d || "SFX" == d) {
                                    var h = u[1],
                                        f = u[2],
                                        p = [];
                                    for (o = i + 1, l = i + 1 + (n = parseInt(u[3], 10)); o < l; o++) {
                                        var m = (r = c[o].split(/\s+/))[2],
                                            g = r[3].split("/"),
                                            v = g[0];
                                        "0" === v && (v = "");
                                        var x = this.parseRuleCodes(g[1]),
                                            y = r[4],
                                            b = {};
                                        b.add = v, x.length > 0 && (b.continuationClasses = x), "." !== y && (b.match = "SFX" === d ? new RegExp(y + "$") : new RegExp("^" + y)), "0" != m && (b.remove = "SFX" === d ? new RegExp(m + "$") : m), p.push(b)
                                    }
                                    s[h] = {
                                        type: d,
                                        combineable: "Y" == f,
                                        entries: p
                                    }, i += n
                                } else if ("COMPOUNDRULE" === d) {
                                    for (o = i + 1, l = i + 1 + (n = parseInt(u[1], 10)); o < l; o++) r = (t = c[o]).split(/\s+/), this.compoundRules.push(r[1]);
                                    i += n
                                } else "REP" === d ? 3 === (r = t.split(/\s+/)).length && this.replacementTable.push([r[1], r[2]]) : this.flags[d] = u[1]
                            }
                            return s
                        },
                        _removeAffixComments: function(e) {
                            return e = (e = (e = (e = e.replace(/^\s*#.*$/gm, "")).replace(/^\s\s*/m, "").replace(/\s\s*$/m, "")).replace(/\n{2,}/g, "\n")).replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                        },
                        _parseDIC: function(e) {
                            var t = (e = this._removeDicComments(e)).split(/\r?\n/),
                                n = {};

                            function r(e, t) {
                                n.hasOwnProperty(e) || (n[e] = null), t.length > 0 && (null === n[e] && (n[e] = []), n[e].push(t))
                            }
                            for (var i = 1, o = t.length; i < o; i++) {
                                var a = t[i];
                                if (a) {
                                    var l = a.split("/", 2),
                                        s = l[0];
                                    if (l.length > 1) {
                                        var c = this.parseRuleCodes(l[1]);
                                        "NEEDAFFIX" in this.flags && -1 != c.indexOf(this.flags.NEEDAFFIX) || r(s, c);
                                        for (var u = 0, d = c.length; u < d; u++) {
                                            var h = c[u],
                                                f = this.rules[h];
                                            if (f)
                                                for (var p = this._applyRule(s, f), m = 0, g = p.length; m < g; m++) {
                                                    var v = p[m];
                                                    if (r(v, []), f.combineable)
                                                        for (var x = u + 1; x < d; x++) {
                                                            var y = c[x],
                                                                b = this.rules[y];
                                                            if (b && b.combineable && f.type != b.type)
                                                                for (var k = this._applyRule(v, b), w = 0, C = k.length; w < C; w++) {
                                                                    r(k[w], [])
                                                                }
                                                        }
                                                }
                                            h in this.compoundRuleCodes && this.compoundRuleCodes[h].push(s)
                                        }
                                    } else r(s.trim(), [])
                                }
                            }
                            return n
                        },
                        _removeDicComments: function(e) {
                            return e = e.replace(/^\t.*$/gm, "")
                        },
                        parseRuleCodes: function(e) {
                            if (!e) return [];
                            if (!("FLAG" in this.flags)) return e.split("");
                            if ("long" === this.flags.FLAG) {
                                for (var t = [], n = 0, r = e.length; n < r; n += 2) t.push(e.substr(n, 2));
                                return t
                            }
                            return "num" === this.flags.FLAG ? e.split(",") : void 0
                        },
                        _applyRule: function(e, t) {
                            for (var n = t.entries, r = [], i = 0, o = n.length; i < o; i++) {
                                var a = n[i];
                                if (!a.match || e.match(a.match)) {
                                    var l = e;
                                    if (a.remove && (l = l.replace(a.remove, "")), "SFX" === t.type ? l += a.add : l = a.add + l, r.push(l), "continuationClasses" in a)
                                        for (var s = 0, c = a.continuationClasses.length; s < c; s++) {
                                            var u = this.rules[a.continuationClasses[s]];
                                            u && (r = r.concat(this._applyRule(l, u)))
                                        }
                                }
                            }
                            return r
                        },
                        check: function(e) {
                            if (!this.loaded) throw "Dictionary not loaded.";
                            var t = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
                            if (this.checkExact(t)) return !0;
                            if (t.toUpperCase() === t) {
                                var n = t[0] + t.substring(1).toLowerCase();
                                if (this.hasFlag(n, "KEEPCASE")) return !1;
                                if (this.checkExact(n)) return !0
                            }
                            var r = t.toLowerCase();
                            if (r !== t) {
                                if (this.hasFlag(r, "KEEPCASE")) return !1;
                                if (this.checkExact(r)) return !0
                            }
                            return !1
                        },
                        checkExact: function(e) {
                            if (!this.loaded) throw "Dictionary not loaded.";
                            var t, n, r = this.dictionaryTable[e];
                            if (void 0 === r) {
                                if ("COMPOUNDMIN" in this.flags && e.length >= this.flags.COMPOUNDMIN)
                                    for (t = 0, n = this.compoundRules.length; t < n; t++)
                                        if (e.match(this.compoundRules[t])) return !0
                            } else {
                                if (null === r) return !0;
                                if ("object" == typeof r)
                                    for (t = 0, n = r.length; t < n; t++)
                                        if (!this.hasFlag(e, "ONLYINCOMPOUND", r[t])) return !0
                            }
                            return !1
                        },
                        hasFlag: function(e, t, n) {
                            if (!this.loaded) throw "Dictionary not loaded.";
                            return !(!(t in this.flags) || (void 0 === n && (n = Array.prototype.concat.apply([], this.dictionaryTable[e])), !n || -1 === n.indexOf(this.flags[t])))
                        },
                        alphabet: "",
                        suggest: function(e, t) {
                            if (!this.loaded) throw "Dictionary not loaded.";
                            if (t = t || 5, this.memoized.hasOwnProperty(e)) {
                                var n = this.memoized[e].limit;
                                if (t <= n || this.memoized[e].suggestions.length < n) return this.memoized[e].suggestions.slice(0, t)
                            }
                            if (this.check(e)) return [];
                            for (var r = 0, i = this.replacementTable.length; r < i; r++) {
                                var o = this.replacementTable[r];
                                if (-1 !== e.indexOf(o[0])) {
                                    var a = e.replace(o[0], o[1]);
                                    if (this.check(a)) return [a]
                                }
                            }
                            var l = this;

                            function s(e, t) {
                                var n, r, i, o, a, s = {};
                                if ("string" == typeof e) {
                                    var c = e;
                                    (e = {})[c] = !0
                                }
                                for (var c in e)
                                    for (n = 0, i = c.length + 1; n < i; n++) {
                                        var u = [c.substring(0, n), c.substring(n)];
                                        if (u[1] && (a = u[0] + u[1].substring(1), t && !l.check(a) || (a in s ? s[a] += 1 : s[a] = 1)), u[1].length > 1 && u[1][1] !== u[1][0] && (a = u[0] + u[1][1] + u[1][0] + u[1].substring(2), t && !l.check(a) || (a in s ? s[a] += 1 : s[a] = 1)), u[1])
                                            for (r = 0, o = l.alphabet.length; r < o; r++) l.alphabet[r] != u[1].substring(0, 1) && (a = u[0] + l.alphabet[r] + u[1].substring(1), t && !l.check(a) || (a in s ? s[a] += 1 : s[a] = 1));
                                        if (u[1])
                                            for (r = 0, o = l.alphabet.length; r < o; r++) a = u[0] + l.alphabet[r] + u[1], t && !l.check(a) || (a in s ? s[a] += 1 : s[a] = 1)
                                    }
                                return s
                            }
                            return l.alphabet = "abcdefghijklmnopqrstuvwxyz", this.memoized[e] = {
                                suggestions: function(e) {
                                    var n, r = s(e),
                                        i = s(r, !0);
                                    for (var o in r) l.check(o) && (o in i ? i[o] += r[o] : i[o] = r[o]);
                                    var a = [];
                                    for (n in i) i.hasOwnProperty(n) && a.push([n, i[n]]);
                                    a.sort((function(e, t) {
                                        var n = e[1],
                                            r = t[1];
                                        return n < r ? -1 : n > r ? 1 : t[0].localeCompare(e[0])
                                    })).reverse();
                                    var c = [],
                                        u = "lowercase";
                                    e.toUpperCase() === e ? u = "uppercase" : e.substr(0, 1).toUpperCase() + e.substr(1).toLowerCase() === e && (u = "capitalized");
                                    var d = t;
                                    for (n = 0; n < Math.min(d, a.length); n++) "uppercase" === u ? a[n][0] = a[n][0].toUpperCase() : "capitalized" === u && (a[n][0] = a[n][0].substr(0, 1).toUpperCase() + a[n][0].substr(1)), l.hasFlag(a[n][0], "NOSUGGEST") || -1 != c.indexOf(a[n][0]) ? d++ : c.push(a[n][0]);
                                    return c
                                }(e),
                                limit: t
                            }, this.memoized[e].suggestions
                        }
                    }
                }(), void 0 !== t && (t.exports = r)
            }).call(this, "/node_modules/typo-js")
        }, {
            fs: 1
        }],
        16: [function(e, t, n) {
            var r = e("codemirror");
            r.commands.tabAndIndentMarkdownList = function(e) {
                var t = e.listSelections()[0].head;
                if (!1 !== e.getStateAfter(t.line).list) e.execCommand("indentMore");
                else if (e.options.indentWithTabs) e.execCommand("insertTab");
                else {
                    var n = Array(e.options.tabSize + 1).join(" ");
                    e.replaceSelection(n)
                }
            }, r.commands.shiftTabAndUnindentMarkdownList = function(e) {
                var t = e.listSelections()[0].head;
                if (!1 !== e.getStateAfter(t.line).list) e.execCommand("indentLess");
                else if (e.options.indentWithTabs) e.execCommand("insertTab");
                else {
                    var n = Array(e.options.tabSize + 1).join(" ");
                    e.replaceSelection(n)
                }
            }
        }, {
            codemirror: 9
        }],
        17: [function(e, t, n) {
            "use strict";
            var r = e("codemirror");
            e("codemirror/addon/edit/continuelist.js"), e("./codemirror/tablist"), e("codemirror/addon/display/fullscreen.js"), e("codemirror/mode/markdown/markdown.js"), e("codemirror/addon/mode/overlay.js"), e("codemirror/addon/display/placeholder.js"), e("codemirror/addon/selection/mark-selection.js"), e("codemirror/addon/search/searchcursor.js"), e("codemirror/mode/gfm/gfm.js"), e("codemirror/mode/xml/xml.js");
            var i = e("codemirror-spell-checker"),
                o = e("marked/lib/marked"),
                a = /Mac/.test(navigator.platform),
                l = new RegExp(/(<a.*?https?:\/\/.*?[^a]>)+?/g),
                s = {
                    toggleBold: x,
                    toggleItalic: y,
                    drawLink: F,
                    toggleHeadingSmaller: C,
                    toggleHeadingBigger: S,
                    drawImage: E,
                    toggleBlockquote: w,
                    toggleOrderedList: N,
                    toggleUnorderedList: A,
                    toggleCodeBlock: k,
                    togglePreview: _,
                    toggleStrikethrough: b,
                    toggleHeading1: L,
                    toggleHeading2: T,
                    toggleHeading3: M,
                    cleanBlock: D,
                    drawTable: I,
                    drawHorizontalRule: z,
                    undo: H,
                    redo: R,
                    toggleSideBySide: P,
                    toggleFullScreen: v
                },
                c = {
                    toggleBold: "Cmd-B",
                    toggleItalic: "Cmd-I",
                    drawLink: "Cmd-K",
                    toggleHeadingSmaller: "Cmd-H",
                    toggleHeadingBigger: "Shift-Cmd-H",
                    cleanBlock: "Cmd-E",
                    drawImage: "Cmd-Alt-I",
                    toggleBlockquote: "Cmd-'",
                    toggleOrderedList: "Cmd-Alt-L",
                    toggleUnorderedList: "Cmd-L",
                    toggleCodeBlock: "Cmd-Alt-C",
                    togglePreview: "Cmd-P",
                    toggleSideBySide: "F9",
                    toggleFullScreen: "F11"
                },
                u = function() {
                    var e, t = !1;
                    return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(e.substr(0, 4))) && (t = !0), t
                };

            function d(e) {
                return e = a ? e.replace("Ctrl", "Cmd") : e.replace("Cmd", "Ctrl")
            }

            function h(e, t, n, r) {
                var i = f(e, !1, t, n, "button", r);
                i.className += " easymde-dropdown";
                var o = document.createElement("div");
                o.className = "easymde-dropdown-content";
                for (var a = 0; a < e.children.length; a++) {
                    var l, s = e.children[a];
                    l = f("string" == typeof s && s in X ? X[s] : s, !0, t, n, "button", r), o.appendChild(l)
                }
                return i.appendChild(o), i
            }

            function f(e, t, n, r, i, o) {
                e = e || {};
                var l = document.createElement(i);
                l.className = e.name, l.setAttribute("type", i), n = null == n || n, e.name && e.name in r && (s[e.name] = e.action), e.title && n && (l.title = function(e, t, n) {
                    var r, i = e;
                    t && (r = function(e) {
                        for (var t in s)
                            if (s[t] === e) return t;
                        return null
                    }(t), n[r] && (i += " (" + d(n[r]) + ")"));
                    return i
                }(e.title, e.action, r), a && (l.title = l.title.replace("Ctrl", "⌘"), l.title = l.title.replace("Alt", "⌥"))), e.noDisable && l.classList.add("no-disable"), e.noMobile && l.classList.add("no-mobile");
                var c = [];
                void 0 !== e.className && (c = e.className.split(" "));
                for (var u = [], h = 0; h < c.length; h++) {
                    var f = c[h];
                    f.match(/^fa([srlb]|(-[\w-]*)|$)/) ? u.push(f) : l.classList.add(f)
                }
                l.tabIndex = -1;
                for (var p = document.createElement("i"), m = 0; m < u.length; m++) {
                    var g = u[m];
                    p.classList.add(g)
                }
                return l.appendChild(p), void 0 !== e.icon && (l.innerHTML = e.icon), e.action && t && ("function" == typeof e.action ? l.onclick = function(t) {
                    t.preventDefault(), e.action(o)
                } : "string" == typeof e.action && (l.onclick = function(t) {
                    t.preventDefault(), window.open(e.action, "_blank")
                })), l
            }

            function p() {
                var e = document.createElement("i");
                return e.className = "separator", e.innerHTML = "|", e
            }

            function m(e, t) {
                t = t || e.getCursor("start");
                var n = e.getTokenAt(t);
                if (!n.type) return {};
                for (var r, i, o = n.type.split(" "), a = {}, l = 0; l < o.length; l++) "strong" === (r = o[l]) ? a.bold = !0 : "variable-2" === r ? (i = e.getLine(t.line), /^\s*\d+\.\s/.test(i) ? a["ordered-list"] = !0 : a["unordered-list"] = !0) : "atom" === r ? a.quote = !0 : "em" === r ? a.italic = !0 : "quote" === r ? a.quote = !0 : "strikethrough" === r ? a.strikethrough = !0 : "comment" === r ? a.code = !0 : "link" === r ? a.link = !0 : "tag" === r ? a.image = !0 : r.match(/^header(-[1-6])?$/) && (a[r.replace("header", "heading")] = !0);
                return a
            }
            var g = "";

            function v(e) {
                var t = e.codemirror;
                t.setOption("fullScreen", !t.getOption("fullScreen")), t.getOption("fullScreen") ? (g = document.body.style.overflow, document.body.style.overflow = "hidden") : document.body.style.overflow = g;
                var n = t.getWrapperElement().nextSibling;
                if (/editor-preview-active-side/.test(n.className) && P(e), e.options.onToggleFullScreen && e.options.onToggleFullScreen(t.getOption("fullScreen") || !1), void 0 !== e.options.maxHeight && (t.getOption("fullScreen") ? (t.getScrollerElement().style.removeProperty("height"), n.style.removeProperty("height")) : (t.getScrollerElement().style.height = e.options.maxHeight, e.setPreviewMaxHeight())), /fullscreen/.test(e.toolbar_div.className) ? e.toolbar_div.className = e.toolbar_div.className.replace(/\s*fullscreen\b/, "") : e.toolbar_div.className += " fullscreen", e.toolbarElements && e.toolbarElements.fullscreen) {
                    var r = e.toolbarElements.fullscreen;
                    /active/.test(r.className) ? r.className = r.className.replace(/\s*active\s*/g, "") : r.className += " active"
                }
            }

            function x(e) {
                q(e, "bold", e.options.blockStyles.bold)
            }

            function y(e) {
                q(e, "italic", e.options.blockStyles.italic)
            }

            function b(e) {
                q(e, "strikethrough", "~~")
            }

            function k(e) {
                var t = e.options.blockStyles.code;

                function n(e) {
                    if ("object" != typeof e) throw "fencing_line() takes a 'line' object (not a line number, or line text).  Got: " + typeof e + ": " + e;
                    return e.styles && e.styles[2] && -1 !== e.styles[2].indexOf("formatting-code-block")
                }

                function r(e) {
                    return e.state.base.base || e.state.base
                }

                function i(e, t, i, o, a) {
                    i = i || e.getLineHandle(t), o = o || e.getTokenAt({
                        line: t,
                        ch: 1
                    }), a = a || !!i.text && e.getTokenAt({
                        line: t,
                        ch: i.text.length - 1
                    });
                    var l = o.type ? o.type.split(" ") : [];
                    return a && r(a).indentedCode ? "indented" : -1 !== l.indexOf("comment") && (r(o).fencedChars || r(a).fencedChars || n(i) ? "fenced" : "single")
                }
                var o, a, l, s = e.codemirror,
                    c = s.getCursor("start"),
                    u = s.getCursor("end"),
                    d = s.getTokenAt({
                        line: c.line,
                        ch: c.ch || 1
                    }),
                    h = s.getLineHandle(c.line),
                    f = i(s, c.line, h, d);
                if ("single" === f) {
                    var p = h.text.slice(0, c.ch).replace("`", ""),
                        m = h.text.slice(c.ch).replace("`", "");
                    s.replaceRange(p + m, {
                        line: c.line,
                        ch: 0
                    }, {
                        line: c.line,
                        ch: 99999999999999
                    }), c.ch--, c !== u && u.ch--, s.setSelection(c, u), s.focus()
                } else if ("fenced" === f)
                    if (c.line !== u.line || c.ch !== u.ch) {
                        for (o = c.line; o >= 0 && !n(h = s.getLineHandle(o)); o--);
                        var g, v, x, y, b = r(s.getTokenAt({
                            line: o,
                            ch: 1
                        })).fencedChars;
                        n(s.getLineHandle(c.line)) ? (g = "", v = c.line) : n(s.getLineHandle(c.line - 1)) ? (g = "", v = c.line - 1) : (g = b + "\n", v = c.line), n(s.getLineHandle(u.line)) ? (x = "", y = u.line, 0 === u.ch && (y += 1)) : 0 !== u.ch && n(s.getLineHandle(u.line + 1)) ? (x = "", y = u.line + 1) : (x = b + "\n", y = u.line + 1), 0 === u.ch && (y -= 1), s.operation((function() {
                            s.replaceRange(x, {
                                line: y,
                                ch: 0
                            }, {
                                line: y + (x ? 0 : 1),
                                ch: 0
                            }), s.replaceRange(g, {
                                line: v,
                                ch: 0
                            }, {
                                line: v + (g ? 0 : 1),
                                ch: 0
                            })
                        })), s.setSelection({
                            line: v + (g ? 1 : 0),
                            ch: 0
                        }, {
                            line: y + (g ? 1 : -1),
                            ch: 0
                        }), s.focus()
                    } else {
                        var k = c.line;
                        if (n(s.getLineHandle(c.line)) && ("fenced" === i(s, c.line + 1) ? (o = c.line, k = c.line + 1) : (a = c.line, k = c.line - 1)), void 0 === o)
                            for (o = k; o >= 0 && !n(h = s.getLineHandle(o)); o--);
                        if (void 0 === a)
                            for (l = s.lineCount(), a = k; a < l && !n(h = s.getLineHandle(a)); a++);
                        s.operation((function() {
                            s.replaceRange("", {
                                line: o,
                                ch: 0
                            }, {
                                line: o + 1,
                                ch: 0
                            }), s.replaceRange("", {
                                line: a - 1,
                                ch: 0
                            }, {
                                line: a,
                                ch: 0
                            })
                        })), s.focus()
                    }
                else if ("indented" === f) {
                    if (c.line !== u.line || c.ch !== u.ch) o = c.line, a = u.line, 0 === u.ch && a--;
                    else {
                        for (o = c.line; o >= 0; o--)
                            if (!(h = s.getLineHandle(o)).text.match(/^\s*$/) && "indented" !== i(s, o, h)) {
                                o += 1;
                                break
                            }
                        for (l = s.lineCount(), a = c.line; a < l; a++)
                            if (!(h = s.getLineHandle(a)).text.match(/^\s*$/) && "indented" !== i(s, a, h)) {
                                a -= 1;
                                break
                            }
                    }
                    var w = s.getLineHandle(a + 1),
                        C = w && s.getTokenAt({
                            line: a + 1,
                            ch: w.text.length - 1
                        });
                    C && r(C).indentedCode && s.replaceRange("\n", {
                        line: a + 1,
                        ch: 0
                    });
                    for (var S = o; S <= a; S++) s.indentLine(S, "subtract");
                    s.focus()
                } else {
                    var L = c.line === u.line && c.ch === u.ch && 0 === c.ch,
                        T = c.line !== u.line;
                    L || T ? function(e, t, n, r) {
                        var i = t.line + 1,
                            o = n.line + 1,
                            a = t.line !== n.line,
                            l = r + "\n",
                            s = "\n" + r;
                        a && o++, a && 0 === n.ch && (s = r + "\n", o--), W(e, !1, [l, s]), e.setSelection({
                            line: i,
                            ch: 0
                        }, {
                            line: o,
                            ch: 0
                        })
                    }(s, c, u, t) : W(s, !1, ["`", "`"])
                }
            }

            function w(e) {
                j(e.codemirror, "quote")
            }

            function C(e) {
                B(e.codemirror, "smaller")
            }

            function S(e) {
                B(e.codemirror, "bigger")
            }

            function L(e) {
                B(e.codemirror, void 0, 1)
            }

            function T(e) {
                B(e.codemirror, void 0, 2)
            }

            function M(e) {
                B(e.codemirror, void 0, 3)
            }

            function A(e) {
                j(e.codemirror, "unordered-list")
            }

            function N(e) {
                j(e.codemirror, "ordered-list")
            }

            function D(e) {
                ! function(e) {
                    if (/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) return;
                    for (var t, n = e.getCursor("start"), r = e.getCursor("end"), i = n.line; i <= r.line; i++) t = (t = e.getLine(i)).replace(/^[ ]*([# ]+|\*|-|[> ]+|[0-9]+(.|\)))[ ]*/, ""), e.replaceRange(t, {
                        line: i,
                        ch: 0
                    }, {
                        line: i,
                        ch: 99999999999999
                    })
                }(e.codemirror)
            }

            function F(e) {
                var t = e.codemirror,
                    n = m(t),
                    r = e.options,
                    i = "https://";
                if (r.promptURLs && !(i = prompt(r.promptTexts.link, "https://"))) return !1;
                W(t, n.link, r.insertTexts.link, i)
            }

            function E(e) {
                var t = e.codemirror,
                    n = m(t),
                    r = e.options,
                    i = "https://";
                if (r.promptURLs && !(i = prompt(r.promptTexts.image, "https://"))) return !1;
                W(t, n.image, r.insertTexts.image, i)
            }

            function O(e, t) {
                var n = e.codemirror,
                    r = m(n),
                    i = e.options,
                    o = t.substr(t.lastIndexOf("/") + 1);
                W(n, r.image, i.insertTexts.uploadedImage, t), e.updateStatusBar("upload-image", e.options.imageTexts.sbOnUploaded.replace("#image_name#", o)), setTimeout((function() {
                    e.updateStatusBar("upload-image", e.options.imageTexts.sbInit)
                }), 1e3)
            }

            function I(e) {
                var t = e.codemirror,
                    n = m(t),
                    r = e.options;
                W(t, n.table, r.insertTexts.table)
            }

            function z(e) {
                var t = e.codemirror,
                    n = m(t),
                    r = e.options;
                W(t, n.image, r.insertTexts.horizontalRule)
            }

            function H(e) {
                var t = e.codemirror;
                t.undo(), t.focus()
            }

            function R(e) {
                var t = e.codemirror;
                t.redo(), t.focus()
            }

            function P(e) {
                var t = e.codemirror,
                    n = t.getWrapperElement(),
                    r = n.nextSibling,
                    i = e.toolbarElements && e.toolbarElements["side-by-side"],
                    o = !1,
                    a = [n.parentNode, e.gui.toolbar, n, r, e.gui.statusbar];
                /editor-preview-active-side/.test(r.className) ? (t.getOption("sideBySideNoFullscreen") && (t.setOption("sideBySideNoFullscreen", !1), a.forEach((function(e) {
                    ! function(e) {
                        e.className = e.className.replace(/\s*sided--no-fullscreen\s*/g, "")
                    }(e)
                }))), r.className = r.className.replace(/\s*editor-preview-active-side\s*/g, ""), i && (i.className = i.className.replace(/\s*active\s*/g, "")), n.className = n.className.replace(/\s*CodeMirror-sided\s*/g, " ")) : (setTimeout((function() {
                    t.getOption("fullScreen") || (!1 === e.options.sideBySideFullscreen ? (t.setOption("sideBySideNoFullscreen", !0), a.forEach((function(e) {
                        ! function(e) {
                            e.className += " sided--no-fullscreen"
                        }(e)
                    }))) : v(e)), r.className += " editor-preview-active-side"
                }), 1), i && (i.className += " active"), n.className += " CodeMirror-sided", o = !0);
                var l = n.lastChild;
                if (/editor-preview-active/.test(l.className)) {
                    l.className = l.className.replace(/\s*editor-preview-active\s*/g, "");
                    var s = e.toolbarElements.preview,
                        c = e.toolbar_div;
                    s.className = s.className.replace(/\s*active\s*/g, ""), c.className = c.className.replace(/\s*disabled-for-preview*/g, "")
                }
                if (t.sideBySideRenderingFunction || (t.sideBySideRenderingFunction = function() {
                        var t = e.options.previewRender(e.value(), r);
                        null != t && (r.innerHTML = t)
                    }), o) {
                    var u = e.options.previewRender(e.value(), r);
                    null != u && (r.innerHTML = u), t.on("update", t.sideBySideRenderingFunction)
                } else t.off("update", t.sideBySideRenderingFunction);
                t.refresh()
            }

            function _(e) {
                var t = e.codemirror,
                    n = t.getWrapperElement(),
                    r = e.toolbar_div,
                    i = !!e.options.toolbar && e.toolbarElements.preview,
                    o = n.lastChild,
                    a = t.getWrapperElement().nextSibling;
                if (/editor-preview-active-side/.test(a.className) && P(e), !o || !/editor-preview-full/.test(o.className)) {
                    if ((o = document.createElement("div")).className = "editor-preview-full", e.options.previewClass)
                        if (Array.isArray(e.options.previewClass))
                            for (var l = 0; l < e.options.previewClass.length; l++) o.className += " " + e.options.previewClass[l];
                        else "string" == typeof e.options.previewClass && (o.className += " " + e.options.previewClass);
                    n.appendChild(o)
                }
                /editor-preview-active/.test(o.className) ? (o.className = o.className.replace(/\s*editor-preview-active\s*/g, ""), i && (i.className = i.className.replace(/\s*active\s*/g, ""), r.className = r.className.replace(/\s*disabled-for-preview*/g, ""))) : (setTimeout((function() {
                    o.className += " editor-preview-active"
                }), 1), i && (i.className += " active", r.className += " disabled-for-preview")), o.innerHTML = e.options.previewRender(e.value(), o)
            }

            function W(e, t, n, r) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
                    var i, o = n[0],
                        a = n[1],
                        l = {},
                        s = {};
                    Object.assign(l, e.getCursor("start")), Object.assign(s, e.getCursor("end")), r && (o = o.replace("#url#", r), a = a.replace("#url#", r)), t ? (o = (i = e.getLine(l.line)).slice(0, l.ch), a = i.slice(l.ch), e.replaceRange(o + a, {
                        line: l.line,
                        ch: 0
                    })) : (i = e.getSelection(), e.replaceSelection(o + i + a), l.ch += o.length, l !== s && (s.ch += o.length)), e.setSelection(l, s), e.focus()
                }
            }

            function B(e, t, n) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
                    for (var r = e.getCursor("start"), i = e.getCursor("end"), o = r.line; o <= i.line; o++) ! function(r) {
                        var i = e.getLine(r),
                            o = i.search(/[^#]/);
                        i = void 0 !== t ? o <= 0 ? "bigger" == t ? "###### " + i : "# " + i : 6 == o && "smaller" == t ? i.substr(7) : 1 == o && "bigger" == t ? i.substr(2) : "bigger" == t ? i.substr(1) : "#" + i : 1 == n ? o <= 0 ? "# " + i : o == n ? i.substr(o + 1) : "# " + i.substr(o + 1) : 2 == n ? o <= 0 ? "## " + i : o == n ? i.substr(o + 1) : "## " + i.substr(o + 1) : o <= 0 ? "### " + i : o == n ? i.substr(o + 1) : "### " + i.substr(o + 1), e.replaceRange(i, {
                            line: r,
                            ch: 0
                        }, {
                            line: r,
                            ch: 99999999999999
                        })
                    }(o);
                    e.focus()
                }
            }

            function j(e, t) {
                if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
                    for (var n = /^(\s*)(\*|-|\+|\d*\.)(\s+)/, r = /^\s*/, i = m(e), o = e.getCursor("start"), a = e.getCursor("end"), l = {
                            quote: /^(\s*)>\s+/,
                            "unordered-list": n,
                            "ordered-list": n
                        }, s = function(e, t, i) {
                            var o = n.exec(t),
                                a = function(e, t) {
                                    return {
                                        quote: ">",
                                        "unordered-list": "*",
                                        "ordered-list": "%%i."
                                    }[e].replace("%%i", t)
                                }(e, c);
                            return null !== o ? (function(e, t) {
                                var n = new RegExp({
                                    quote: ">",
                                    "unordered-list": "*",
                                    "ordered-list": "\\d+."
                                }[e]);
                                return t && n.test(t)
                            }(e, o[2]) && (a = ""), t = o[1] + a + o[3] + t.replace(r, "").replace(l[e], "$1")) : 0 == i && (t = a + " " + t), t
                        }, c = 1, u = o.line; u <= a.line; u++) ! function(n) {
                        var r = e.getLine(n);
                        i[t] ? r = r.replace(l[t], "$1") : ("unordered-list" == t && (r = s("ordered-list", r, !0)), r = s(t, r, !1), c += 1), e.replaceRange(r, {
                            line: n,
                            ch: 0
                        }, {
                            line: n,
                            ch: 99999999999999
                        })
                    }(u);
                    e.focus()
                }
            }

            function q(e, t, n, r) {
                if (!/editor-preview-active/.test(e.codemirror.getWrapperElement().lastChild.className)) {
                    r = void 0 === r ? n : r;
                    var i, o = e.codemirror,
                        a = m(o),
                        l = n,
                        s = r,
                        c = o.getCursor("start"),
                        u = o.getCursor("end");
                    a[t] ? (l = (i = o.getLine(c.line)).slice(0, c.ch), s = i.slice(c.ch), "bold" == t ? (l = l.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, ""), s = s.replace(/(\*\*|__)/, "")) : "italic" == t ? (l = l.replace(/(\*|_)(?![\s\S]*(\*|_))/, ""), s = s.replace(/(\*|_)/, "")) : "strikethrough" == t && (l = l.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, ""), s = s.replace(/(\*\*|~~)/, "")), o.replaceRange(l + s, {
                        line: c.line,
                        ch: 0
                    }, {
                        line: c.line,
                        ch: 99999999999999
                    }), "bold" == t || "strikethrough" == t ? (c.ch -= 2, c !== u && (u.ch -= 2)) : "italic" == t && (c.ch -= 1, c !== u && (u.ch -= 1))) : (i = o.getSelection(), "bold" == t ? i = (i = i.split("**").join("")).split("__").join("") : "italic" == t ? i = (i = i.split("*").join("")).split("_").join("") : "strikethrough" == t && (i = i.split("~~").join("")), o.replaceSelection(l + i + s), c.ch += n.length, u.ch = c.ch + i.length), o.setSelection(c, u), o.focus()
                }
            }

            function U(e, t) {
                if (Math.abs(e) < 1024) return "" + e + t[0];
                var n = 0;
                do {
                    e /= 1024, ++n
                } while (Math.abs(e) >= 1024 && n < t.length);
                return "" + e.toFixed(1) + t[n]
            }

            function $(e, t) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (t[n] instanceof Array ? e[n] = t[n].concat(e[n] instanceof Array ? e[n] : []) : null !== t[n] && "object" == typeof t[n] && t[n].constructor === Object ? e[n] = $(e[n] || {}, t[n]) : e[n] = t[n]);
                return e
            }

            function G(e) {
                for (var t = 1; t < arguments.length; t++) e = $(e, arguments[t]);
                return e
            }

            function V(e) {
                var t = e.match(/[a-zA-Z0-9_\u00A0-\u02AF\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g),
                    n = 0;
                if (null === t) return n;
                for (var r = 0; r < t.length; r++) t[r].charCodeAt(0) >= 19968 ? n += t[r].length : n += 1;
                return n
            }
            var X = {
                    bold: {
                        name: "bold",
                        action: x,
                        className: "fa fa-bold",
                        title: "Bold",
                        default: !0
                    },
                    italic: {
                        name: "italic",
                        action: y,
                        className: "fa fa-italic",
                        title: "Italic",
                        default: !0
                    },
                    strikethrough: {
                        name: "strikethrough",
                        action: b,
                        className: "fa fa-strikethrough",
                        title: "Strikethrough"
                    },
                    heading: {
                        name: "heading",
                        action: C,
                        className: "fa fa-header fa-heading",
                        title: "Heading",
                        default: !0
                    },
                    "heading-smaller": {
                        name: "heading-smaller",
                        action: C,
                        className: "fa fa-header fa-heading header-smaller",
                        title: "Smaller Heading"
                    },
                    "heading-bigger": {
                        name: "heading-bigger",
                        action: S,
                        className: "fa fa-header fa-heading header-bigger",
                        title: "Bigger Heading"
                    },
                    "heading-1": {
                        name: "heading-1",
                        action: L,
                        className: "fa fa-header fa-heading header-1",
                        title: "Big Heading"
                    },
                    "heading-2": {
                        name: "heading-2",
                        action: T,
                        className: "fa fa-header fa-heading header-2",
                        title: "Medium Heading"
                    },
                    "heading-3": {
                        name: "heading-3",
                        action: M,
                        className: "fa fa-header fa-heading header-3",
                        title: "Small Heading"
                    },
                    "separator-1": {
                        name: "separator-1"
                    },
                    code: {
                        name: "code",
                        action: k,
                        className: "fa fa-code",
                        title: "Code"
                    },
                    quote: {
                        name: "quote",
                        action: w,
                        className: "fa fa-quote-left",
                        title: "Quote",
                        default: !0
                    },
                    "unordered-list": {
                        name: "unordered-list",
                        action: A,
                        className: "fa fa-list-ul",
                        title: "Generic List",
                        default: !0
                    },
                    "ordered-list": {
                        name: "ordered-list",
                        action: N,
                        className: "fa fa-list-ol",
                        title: "Numbered List",
                        default: !0
                    },
                    "clean-block": {
                        name: "clean-block",
                        action: D,
                        className: "fa fa-eraser",
                        title: "Clean block"
                    },
                    "separator-2": {
                        name: "separator-2"
                    },
                    link: {
                        name: "link",
                        action: F,
                        className: "fa fa-link",
                        title: "Create Link",
                        default: !0
                    },
                    image: {
                        name: "image",
                        action: E,
                        className: "fa fa-image",
                        title: "Insert Image",
                        default: !0
                    },
                    "upload-image": {
                        name: "upload-image",
                        action: function(e) {
                            e.openBrowseFileWindow()
                        },
                        className: "fa fa-image",
                        title: "Import an image"
                    },
                    table: {
                        name: "table",
                        action: I,
                        className: "fa fa-table",
                        title: "Insert Table"
                    },
                    "horizontal-rule": {
                        name: "horizontal-rule",
                        action: z,
                        className: "fa fa-minus",
                        title: "Insert Horizontal Line"
                    },
                    "separator-3": {
                        name: "separator-3"
                    },
                    preview: {
                        name: "preview",
                        action: _,
                        className: "fa fa-eye",
                        noDisable: !0,
                        title: "Toggle Preview",
                        default: !0
                    },
                    "side-by-side": {
                        name: "side-by-side",
                        action: P,
                        className: "fa fa-columns",
                        noDisable: !0,
                        noMobile: !0,
                        title: "Toggle Side by Side",
                        default: !0
                    },
                    fullscreen: {
                        name: "fullscreen",
                        action: v,
                        className: "fa fa-arrows-alt",
                        noDisable: !0,
                        noMobile: !0,
                        title: "Toggle Fullscreen",
                        default: !0
                    },
                    "separator-4": {
                        name: "separator-4"
                    },
                    guide: {
                        name: "guide",
                        action: "https://www.markdownguide.org/basic-syntax/",
                        className: "fa fa-question-circle",
                        noDisable: !0,
                        title: "Markdown Guide",
                        default: !0
                    },
                    "separator-5": {
                        name: "separator-5"
                    },
                    undo: {
                        name: "undo",
                        action: H,
                        className: "fa fa-undo",
                        noDisable: !0,
                        title: "Undo"
                    },
                    redo: {
                        name: "redo",
                        action: R,
                        className: "fa fa-repeat fa-redo",
                        noDisable: !0,
                        title: "Redo"
                    }
                },
                K = {
                    link: ["[", "](#url#)"],
                    image: ["![](", "#url#)"],
                    uploadedImage: ["![](#url#)", ""],
                    table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],
                    horizontalRule: ["", "\n\n-----\n\n"]
                },
                Z = {
                    link: "URL for the link:",
                    image: "URL of the image:"
                },
                Y = {
                    locale: "en-US",
                    format: {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                },
                Q = {
                    bold: "**",
                    code: "```",
                    italic: "*"
                },
                J = {
                    sbInit: "Attach files by drag and dropping or pasting from clipboard.",
                    sbOnDragEnter: "Drop image to upload it.",
                    sbOnDrop: "Uploading image #images_names#...",
                    sbProgress: "Uploading #file_name#: #progress#%",
                    sbOnUploaded: "Uploaded #image_name#",
                    sizeUnits: "b,Kb,Mb"
                },
                ee = {
                    noFileGiven: "You must select a file.",
                    typeNotAllowed: "This image type is not allowed.",
                    fileTooLarge: "Image #image_name# is too big (#image_size#).\nMaximum file size is #image_max_size#.",
                    importError: "Something went wrong when uploading the image #image_name#."
                };

            function te(e) {
                (e = e || {}).parent = this;
                var t = !0;
                if (!1 === e.autoDownloadFontAwesome && (t = !1), !0 !== e.autoDownloadFontAwesome)
                    for (var n = document.styleSheets, r = 0; r < n.length; r++) n[r].href && n[r].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/") > -1 && (t = !1);
                if (t) {
                    var i = document.createElement("link");
                    i.rel = "stylesheet", i.href = "https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css", document.getElementsByTagName("head")[0].appendChild(i)
                }
                if (e.element) this.element = e.element;
                else if (null === e.element) return void console.log("EasyMDE: Error. No element was found.");
                if (void 0 === e.toolbar)
                    for (var o in e.toolbar = [], X) Object.prototype.hasOwnProperty.call(X, o) && (-1 != o.indexOf("separator-") && e.toolbar.push("|"), (!0 === X[o].default || e.showIcons && e.showIcons.constructor === Array && -1 != e.showIcons.indexOf(o)) && e.toolbar.push(o));
                if (Object.prototype.hasOwnProperty.call(e, "previewClass") || (e.previewClass = "editor-preview"), Object.prototype.hasOwnProperty.call(e, "status") || (e.status = ["autosave", "lines", "words", "cursor"], e.uploadImage && e.status.unshift("upload-image")), e.previewRender || (e.previewRender = function(e) {
                        return this.parent.markdown(e)
                    }), e.parsingConfig = G({
                        highlightFormatting: !0
                    }, e.parsingConfig || {}), e.insertTexts = G({}, K, e.insertTexts || {}), e.promptTexts = G({}, Z, e.promptTexts || {}), e.blockStyles = G({}, Q, e.blockStyles || {}), null != e.autosave && (e.autosave.timeFormat = G({}, Y, e.autosave.timeFormat || {})), e.shortcuts = G({}, c, e.shortcuts || {}), e.minHeight = e.minHeight || "300px", e.maxHeight = e.maxHeight || void 0, e.errorCallback = e.errorCallback || function(e) {
                        alert(e)
                    }, e.uploadImage = e.uploadImage || !1, e.imageMaxSize = e.imageMaxSize || 2097152, e.imageAccept = e.imageAccept || "image/png, image/jpeg", e.imageTexts = G({}, J, e.imageTexts || {}), e.errorMessages = G({}, ee, e.errorMessages || {}), null != e.autosave && null != e.autosave.unique_id && "" != e.autosave.unique_id && (e.autosave.uniqueId = e.autosave.unique_id), this.options = e, this.render(), !e.initialValue || this.options.autosave && !0 === this.options.autosave.foundSavedValue || this.value(e.initialValue), e.uploadImage) {
                    var a = this;
                    this.codemirror.on("dragenter", (function(e, t) {
                        a.updateStatusBar("upload-image", a.options.imageTexts.sbOnDragEnter), t.stopPropagation(), t.preventDefault()
                    })), this.codemirror.on("dragend", (function(e, t) {
                        a.updateStatusBar("upload-image", a.options.imageTexts.sbInit), t.stopPropagation(), t.preventDefault()
                    })), this.codemirror.on("dragleave", (function(e, t) {
                        a.updateStatusBar("upload-image", a.options.imageTexts.sbInit), t.stopPropagation(), t.preventDefault()
                    })), this.codemirror.on("dragover", (function(e, t) {
                        a.updateStatusBar("upload-image", a.options.imageTexts.sbOnDragEnter), t.stopPropagation(), t.preventDefault()
                    })), this.codemirror.on("drop", (function(t, n) {
                        n.stopPropagation(), n.preventDefault(), e.imageUploadFunction ? a.uploadImagesUsingCustomFunction(e.imageUploadFunction, n.dataTransfer.files) : a.uploadImages(n.dataTransfer.files)
                    })), this.codemirror.on("paste", (function(t, n) {
                        e.imageUploadFunction ? a.uploadImagesUsingCustomFunction(e.imageUploadFunction, n.clipboardData.files) : a.uploadImages(n.clipboardData.files)
                    }))
                }
            }

            function ne() {
                if ("object" != typeof localStorage) return !1;
                try {
                    localStorage.setItem("smde_localStorage", 1), localStorage.removeItem("smde_localStorage")
                } catch (e) {
                    return !1
                }
                return !0
            }
            te.prototype.uploadImages = function(e, t, n) {
                if (0 !== e.length) {
                    for (var r = [], i = 0; i < e.length; i++) r.push(e[i].name), this.uploadImage(e[i], t, n);
                    this.updateStatusBar("upload-image", this.options.imageTexts.sbOnDrop.replace("#images_names#", r.join(", ")))
                }
            }, te.prototype.uploadImagesUsingCustomFunction = function(e, t) {
                if (0 !== t.length) {
                    for (var n = [], r = 0; r < t.length; r++) n.push(t[r].name), this.uploadImageUsingCustomFunction(e, t[r]);
                    this.updateStatusBar("upload-image", this.options.imageTexts.sbOnDrop.replace("#images_names#", n.join(", ")))
                }
            }, te.prototype.updateStatusBar = function(e, t) {
                var n = this.gui.statusbar.getElementsByClassName(e);
                1 === n.length ? this.gui.statusbar.getElementsByClassName(e)[0].textContent = t : 0 === n.length ? console.log("EasyMDE: status bar item " + e + " was not found.") : console.log("EasyMDE: Several status bar items named " + e + " was found.")
            }, te.prototype.markdown = function(e) {
                if (o) {
                    var t;
                    if (t = this.options && this.options.renderingConfig && this.options.renderingConfig.markedOptions ? this.options.renderingConfig.markedOptions : {}, this.options && this.options.renderingConfig && !1 === this.options.renderingConfig.singleLineBreaks ? t.breaks = !1 : t.breaks = !0, this.options && this.options.renderingConfig && !0 === this.options.renderingConfig.codeSyntaxHighlighting) {
                        var n = this.options.renderingConfig.hljs || window.hljs;
                        n && (t.highlight = function(e, t) {
                            return t && n.getLanguage(t) ? n.highlight(t, e).value : n.highlightAuto(e).value
                        })
                    }
                    o.setOptions(t);
                    var r = o(e);
                    return this.options.renderingConfig && "function" == typeof this.options.renderingConfig.sanitizerFunction && (r = this.options.renderingConfig.sanitizerFunction.call(this, r)), r = function(e) {
                        for (var t = (new DOMParser).parseFromString(e, "text/html"), n = t.getElementsByTagName("li"), r = 0; r < n.length; r++)
                            for (var i = n[r], o = 0; o < i.children.length; o++) {
                                var a = i.children[o];
                                a instanceof HTMLInputElement && "checkbox" === a.type && (i.style.marginLeft = "-1.5em", i.style.listStyleType = "none")
                            }
                        return t.documentElement.innerHTML
                    }(r = function(e) {
                        for (var t; null !== (t = l.exec(e));) {
                            var n = t[0];
                            if (-1 === n.indexOf("target=")) {
                                var r = n.replace(/>$/, ' target="_blank">');
                                e = e.replace(n, r)
                            }
                        }
                        return e
                    }(r))
                }
            }, te.prototype.render = function(e) {
                if (e || (e = this.element || document.getElementsByTagName("textarea")[0]), !this._rendered || this._rendered !== e) {
                    this.element = e;
                    var t, n, o = this.options,
                        a = this,
                        l = {};
                    for (var c in o.shortcuts) null !== o.shortcuts[c] && null !== s[c] && function(e) {
                        l[d(o.shortcuts[e])] = function() {
                            var t = s[e];
                            "function" == typeof t ? t(a) : "string" == typeof t && window.open(t, "_blank")
                        }
                    }(c);
                    if (l.Enter = "newlineAndIndentContinueMarkdownList", l.Tab = "tabAndIndentMarkdownList", l["Shift-Tab"] = "shiftTabAndUnindentMarkdownList", l.Esc = function(e) {
                            e.getOption("fullScreen") && v(a)
                        }, document.addEventListener("keydown", (function(e) {
                            27 == (e = e || window.event).keyCode && a.codemirror.getOption("fullScreen") && v(a)
                        }), !1), !1 !== o.spellChecker ? (t = "spell-checker", (n = o.parsingConfig).name = "gfm", n.gitHubSpice = !1, i({
                            codeMirrorInstance: r
                        })) : ((t = o.parsingConfig).name = "gfm", t.gitHubSpice = !1), this.codemirror = r.fromTextArea(e, {
                            mode: t,
                            backdrop: n,
                            theme: null != o.theme ? o.theme : "easymde",
                            tabSize: null != o.tabSize ? o.tabSize : 2,
                            indentUnit: null != o.tabSize ? o.tabSize : 2,
                            indentWithTabs: !1 !== o.indentWithTabs,
                            lineNumbers: !1,
                            autofocus: !0 === o.autofocus,
                            extraKeys: l,
                            lineWrapping: !1 !== o.lineWrapping,
                            allowDropFileTypes: ["text/plain"],
                            placeholder: o.placeholder || e.getAttribute("placeholder") || "",
                            styleSelectedText: null != o.styleSelectedText ? o.styleSelectedText : !u(),
                            configureMouse: function(e, t, n) {
                                return {
                                    addNew: !1
                                }
                            },
                            inputStyle: null != o.inputStyle ? o.inputStyle : u() ? "contenteditable" : "textarea",
                            spellcheck: null == o.nativeSpellcheck || o.nativeSpellcheck
                        }), this.codemirror.getScrollerElement().style.minHeight = o.minHeight, void 0 !== o.maxHeight && (this.codemirror.getScrollerElement().style.height = o.maxHeight), !0 === o.forceSync) {
                        var h = this.codemirror;
                        h.on("change", (function() {
                            h.save()
                        }))
                    }
                    this.gui = {};
                    var f = document.createElement("div");
                    f.classList.add("EasyMDEContainer");
                    var p = this.codemirror.getWrapperElement();
                    p.parentNode.insertBefore(f, p), f.appendChild(p), !1 !== o.toolbar && (this.gui.toolbar = this.createToolbar()), !1 !== o.status && (this.gui.statusbar = this.createStatusbar()), null != o.autosave && !0 === o.autosave.enabled && (this.autosave(), this.codemirror.on("change", (function() {
                        clearTimeout(a._autosave_timeout), a._autosave_timeout = setTimeout((function() {
                            a.autosave()
                        }), a.options.autosave.submit_delay || a.options.autosave.delay || 1e3)
                    }))), this.gui.sideBySide = this.createSideBySide(), this._rendered = this.element;
                    var m = this.codemirror;
                    setTimeout(function() {
                        m.refresh()
                    }.bind(m), 0)
                }
            }, te.prototype.autosave = function() {
                if (ne()) {
                    var e = this;
                    if (null == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId) return void console.log("EasyMDE: You must set a uniqueId to use the autosave feature");
                    !0 !== this.options.autosave.binded && (null != e.element.form && null != e.element.form && e.element.form.addEventListener("submit", (function() {
                        clearTimeout(e.autosaveTimeoutId), e.autosaveTimeoutId = void 0, localStorage.removeItem("smde_" + e.options.autosave.uniqueId)
                    })), this.options.autosave.binded = !0), !0 !== this.options.autosave.loaded && ("string" == typeof localStorage.getItem("smde_" + this.options.autosave.uniqueId) && "" != localStorage.getItem("smde_" + this.options.autosave.uniqueId) && (this.codemirror.setValue(localStorage.getItem("smde_" + this.options.autosave.uniqueId)), this.options.autosave.foundSavedValue = !0), this.options.autosave.loaded = !0);
                    var t = e.value();
                    "" !== t ? localStorage.setItem("smde_" + this.options.autosave.uniqueId, t) : localStorage.removeItem("smde_" + this.options.autosave.uniqueId);
                    var n = document.getElementById("autosaved");
                    if (null != n && null != n && "" != n) {
                        var r = new Date,
                            i = new Intl.DateTimeFormat([this.options.autosave.timeFormat.locale, "en-US"], this.options.autosave.timeFormat.format).format(r),
                            o = null == this.options.autosave.text ? "Autosaved: " : this.options.autosave.text;
                        n.innerHTML = o + i
                    }
                } else console.log("EasyMDE: localStorage not available, cannot autosave")
            }, te.prototype.clearAutosavedValue = function() {
                if (ne()) {
                    if (null == this.options.autosave || null == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId) return void console.log("EasyMDE: You must set a uniqueId to clear the autosave value");
                    localStorage.removeItem("smde_" + this.options.autosave.uniqueId)
                } else console.log("EasyMDE: localStorage not available, cannot autosave")
            }, te.prototype.openBrowseFileWindow = function(e, t) {
                var n = this,
                    r = this.gui.toolbar.getElementsByClassName("imageInput")[0];
                r.click(), r.addEventListener("change", (function i(o) {
                    n.options.imageUploadFunction ? n.uploadImagesUsingCustomFunction(n.options.imageUploadFunction, o.target.files) : n.uploadImages(o.target.files, e, t), r.removeEventListener("change", i)
                }))
            }, te.prototype.uploadImage = function(e, t, n) {
                var r = this;

                function i(e) {
                    r.updateStatusBar("upload-image", e), setTimeout((function() {
                        r.updateStatusBar("upload-image", r.options.imageTexts.sbInit)
                    }), 1e4), n && "function" == typeof n && n(e), r.options.errorCallback(e)
                }

                function o(t) {
                    var n = r.options.imageTexts.sizeUnits.split(",");
                    return t.replace("#image_name#", e.name).replace("#image_size#", U(e.size, n)).replace("#image_max_size#", U(r.options.imageMaxSize, n))
                }
                if (t = t || function(e) {
                        O(r, e)
                    }, e.size > this.options.imageMaxSize) i(o(this.options.errorMessages.fileTooLarge));
                else {
                    var a = new FormData;
                    a.append("image", e), r.options.imageCSRFToken && a.append("csrfmiddlewaretoken", r.options.imageCSRFToken);
                    var l = new XMLHttpRequest;
                    l.upload.onprogress = function(t) {
                        if (t.lengthComputable) {
                            var n = "" + Math.round(100 * t.loaded / t.total);
                            r.updateStatusBar("upload-image", r.options.imageTexts.sbProgress.replace("#file_name#", e.name).replace("#progress#", n))
                        }
                    }, l.open("POST", this.options.imageUploadEndpoint), l.onload = function() {
                        try {
                            var e = JSON.parse(this.responseText)
                        } catch (e) {
                            return console.error("EasyMDE: The server did not return a valid json."), void i(o(r.options.errorMessages.importError))
                        }
                        200 === this.status && e && !e.error && e.data && e.data.filePath ? t(window.location.origin + "/" + e.data.filePath) : e.error && e.error in r.options.errorMessages ? i(o(r.options.errorMessages[e.error])) : e.error ? i(o(e.error)) : (console.error("EasyMDE: Received an unexpected response after uploading the image." + this.status + " (" + this.statusText + ")"), i(o(r.options.errorMessages.importError)))
                    }, l.onerror = function(e) {
                        console.error("EasyMDE: An unexpected error occurred when trying to upload the image." + e.target.status + " (" + e.target.statusText + ")"), i(r.options.errorMessages.importError)
                    }, l.send(a)
                }
            }, te.prototype.uploadImageUsingCustomFunction = function(e, t) {
                var n = this;
                e(t, (function(e) {
                    O(n, e)
                }), (function(e) {
                    var r = function(e) {
                        var r = n.options.imageTexts.sizeUnits.split(",");
                        return e.replace("#image_name#", t.name).replace("#image_size#", U(t.size, r)).replace("#image_max_size#", U(n.options.imageMaxSize, r))
                    }(e);
                    n.updateStatusBar("upload-image", r), setTimeout((function() {
                        n.updateStatusBar("upload-image", n.options.imageTexts.sbInit)
                    }), 1e4), n.options.errorCallback(r)
                }))
            }, te.prototype.setPreviewMaxHeight = function() {
                var e = this.codemirror.getWrapperElement(),
                    t = e.nextSibling,
                    n = parseInt(window.getComputedStyle(e).paddingTop),
                    r = parseInt(window.getComputedStyle(e).borderTopWidth),
                    i = (parseInt(this.options.maxHeight) + 2 * n + 2 * r).toString() + "px";
                t.style.height = i
            }, te.prototype.createSideBySide = function() {
                var e = this.codemirror,
                    t = e.getWrapperElement(),
                    n = t.nextSibling;
                if (!n || !/editor-preview-side/.test(n.className)) {
                    if ((n = document.createElement("div")).className = "editor-preview-side", this.options.previewClass)
                        if (Array.isArray(this.options.previewClass))
                            for (var r = 0; r < this.options.previewClass.length; r++) n.className += " " + this.options.previewClass[r];
                        else "string" == typeof this.options.previewClass && (n.className += " " + this.options.previewClass);
                    t.parentNode.insertBefore(n, t.nextSibling)
                }
                if (void 0 !== this.options.maxHeight && this.setPreviewMaxHeight(), !1 === this.options.syncSideBySidePreviewScroll) return n;
                var i = !1,
                    o = !1;
                return e.on("scroll", (function(e) {
                    if (i) i = !1;
                    else {
                        o = !0;
                        var t = e.getScrollInfo().height - e.getScrollInfo().clientHeight,
                            r = parseFloat(e.getScrollInfo().top) / t,
                            a = (n.scrollHeight - n.clientHeight) * r;
                        n.scrollTop = a
                    }
                })), n.onscroll = function() {
                    if (o) o = !1;
                    else {
                        i = !0;
                        var t = n.scrollHeight - n.clientHeight,
                            r = parseFloat(n.scrollTop) / t,
                            a = (e.getScrollInfo().height - e.getScrollInfo().clientHeight) * r;
                        e.scrollTo(0, a)
                    }
                }, n
            }, te.prototype.createToolbar = function(e) {
                if ((e = e || this.options.toolbar) && 0 !== e.length) {
                    var t;
                    for (t = 0; t < e.length; t++) null != X[e[t]] && (e[t] = X[e[t]]);
                    var n = document.createElement("div");
                    n.className = "editor-toolbar";
                    var r = this,
                        i = {};
                    for (r.toolbar = e, t = 0; t < e.length; t++)
                        if (("guide" != e[t].name || !1 !== r.options.toolbarGuideIcon) && !(r.options.hideIcons && -1 != r.options.hideIcons.indexOf(e[t].name) || ("fullscreen" == e[t].name || "side-by-side" == e[t].name) && u())) {
                            if ("|" === e[t]) {
                                for (var o = !1, a = t + 1; a < e.length; a++) "|" === e[a] || r.options.hideIcons && -1 != r.options.hideIcons.indexOf(e[a].name) || (o = !0);
                                if (!o) continue
                            }! function(e) {
                                var t;
                                if (t = "|" === e ? p() : e.children ? h(e, r.options.toolbarTips, r.options.shortcuts, r) : f(e, !0, r.options.toolbarTips, r.options.shortcuts, "button", r), i[e.name || e] = t, n.appendChild(t), "upload-image" === e.name) {
                                    var o = document.createElement("input");
                                    o.className = "imageInput", o.type = "file", o.multiple = !0, o.name = "image", o.accept = r.options.imageAccept, o.style.display = "none", o.style.opacity = 0, n.appendChild(o)
                                }
                            }(e[t])
                        }
                    r.toolbar_div = n, r.toolbarElements = i;
                    var l = this.codemirror;
                    l.on("cursorActivity", (function() {
                        var e = m(l);
                        for (var t in i) ! function(t) {
                            var n = i[t];
                            e[t] ? n.className += " active" : "fullscreen" != t && "side-by-side" != t && (n.className = n.className.replace(/\s*active\s*/g, ""))
                        }(t)
                    }));
                    var s = l.getWrapperElement();
                    return s.parentNode.insertBefore(n, s), n
                }
            }, te.prototype.createStatusbar = function(e) {
                e = e || this.options.status;
                var t = this.options,
                    n = this.codemirror;
                if (e && 0 !== e.length) {
                    var r, i, o, a, l = [];
                    for (r = 0; r < e.length; r++)
                        if (i = void 0, o = void 0, a = void 0, "object" == typeof e[r]) l.push({
                            className: e[r].className,
                            defaultValue: e[r].defaultValue,
                            onUpdate: e[r].onUpdate,
                            onActivity: e[r].onActivity
                        });
                        else {
                            var s = e[r];
                            "words" === s ? (a = function(e) {
                                e.innerHTML = V(n.getValue())
                            }, i = function(e) {
                                e.innerHTML = V(n.getValue())
                            }) : "lines" === s ? (a = function(e) {
                                e.innerHTML = n.lineCount()
                            }, i = function(e) {
                                e.innerHTML = n.lineCount()
                            }) : "cursor" === s ? (a = function(e) {
                                e.innerHTML = "0:0"
                            }, o = function(e) {
                                var t = n.getCursor();
                                e.innerHTML = t.line + ":" + t.ch
                            }) : "autosave" === s ? a = function(e) {
                                null != t.autosave && !0 === t.autosave.enabled && e.setAttribute("id", "autosaved")
                            } : "upload-image" === s && (a = function(e) {
                                e.innerHTML = t.imageTexts.sbInit
                            }), l.push({
                                className: s,
                                defaultValue: a,
                                onUpdate: i,
                                onActivity: o
                            })
                        }
                    var c = document.createElement("div");
                    for (c.className = "editor-statusbar", r = 0; r < l.length; r++) {
                        var u = l[r],
                            d = document.createElement("span");
                        d.className = u.className, "function" == typeof u.defaultValue && u.defaultValue(d), "function" == typeof u.onUpdate && this.codemirror.on("update", function(e, t) {
                            return function() {
                                t.onUpdate(e)
                            }
                        }(d, u)), "function" == typeof u.onActivity && this.codemirror.on("cursorActivity", function(e, t) {
                            return function() {
                                t.onActivity(e)
                            }
                        }(d, u)), c.appendChild(d)
                    }
                    var h = this.codemirror.getWrapperElement();
                    return h.parentNode.insertBefore(c, h.nextSibling), c
                }
            }, te.prototype.value = function(e) {
                var t = this.codemirror;
                if (void 0 === e) return t.getValue();
                if (t.getDoc().setValue(e), this.isPreviewActive()) {
                    var n = t.getWrapperElement().lastChild;
                    n.innerHTML = this.options.previewRender(e, n)
                }
                return this
            }, te.toggleBold = x, te.toggleItalic = y, te.toggleStrikethrough = b, te.toggleBlockquote = w, te.toggleHeadingSmaller = C, te.toggleHeadingBigger = S, te.toggleHeading1 = L, te.toggleHeading2 = T, te.toggleHeading3 = M, te.toggleCodeBlock = k, te.toggleUnorderedList = A, te.toggleOrderedList = N, te.cleanBlock = D, te.drawLink = F, te.drawImage = E, te.drawTable = I, te.drawHorizontalRule = z, te.undo = H, te.redo = R, te.togglePreview = _, te.toggleSideBySide = P, te.toggleFullScreen = v, te.prototype.toggleBold = function() {
                x(this)
            }, te.prototype.toggleItalic = function() {
                y(this)
            }, te.prototype.toggleStrikethrough = function() {
                b(this)
            }, te.prototype.toggleBlockquote = function() {
                w(this)
            }, te.prototype.toggleHeadingSmaller = function() {
                C(this)
            }, te.prototype.toggleHeadingBigger = function() {
                S(this)
            }, te.prototype.toggleHeading1 = function() {
                L(this)
            }, te.prototype.toggleHeading2 = function() {
                T(this)
            }, te.prototype.toggleHeading3 = function() {
                M(this)
            }, te.prototype.toggleCodeBlock = function() {
                k(this)
            }, te.prototype.toggleUnorderedList = function() {
                A(this)
            }, te.prototype.toggleOrderedList = function() {
                N(this)
            }, te.prototype.cleanBlock = function() {
                D(this)
            }, te.prototype.drawLink = function() {
                F(this)
            }, te.prototype.drawImage = function() {
                E(this)
            }, te.prototype.drawTable = function() {
                I(this)
            }, te.prototype.drawHorizontalRule = function() {
                z(this)
            }, te.prototype.undo = function() {
                H(this)
            }, te.prototype.redo = function() {
                R(this)
            }, te.prototype.togglePreview = function() {
                _(this)
            }, te.prototype.toggleSideBySide = function() {
                P(this)
            }, te.prototype.toggleFullScreen = function() {
                v(this)
            }, te.prototype.isPreviewActive = function() {
                var e = this.codemirror.getWrapperElement().lastChild;
                return /editor-preview-active/.test(e.className)
            }, te.prototype.isSideBySideActive = function() {
                var e = this.codemirror.getWrapperElement().nextSibling;
                return /editor-preview-active-side/.test(e.className)
            }, te.prototype.isFullscreenActive = function() {
                return this.codemirror.getOption("fullScreen")
            }, te.prototype.getState = function() {
                return m(this.codemirror)
            }, te.prototype.toTextArea = function() {
                var e = this.codemirror,
                    t = e.getWrapperElement();
                t.parentNode && (this.gui.toolbar && t.parentNode.removeChild(this.gui.toolbar), this.gui.statusbar && t.parentNode.removeChild(this.gui.statusbar), this.gui.sideBySide && t.parentNode.removeChild(this.gui.sideBySide)), e.toTextArea(), this.autosaveTimeoutId && (clearTimeout(this.autosaveTimeoutId), this.autosaveTimeoutId = void 0, this.clearAutosavedValue())
            }, t.exports = te
        }, {
            "./codemirror/tablist": 16,
            codemirror: 9,
            "codemirror-spell-checker": 2,
            "codemirror/addon/display/fullscreen.js": 3,
            "codemirror/addon/display/placeholder.js": 4,
            "codemirror/addon/edit/continuelist.js": 5,
            "codemirror/addon/mode/overlay.js": 6,
            "codemirror/addon/search/searchcursor.js": 7,
            "codemirror/addon/selection/mark-selection.js": 8,
            "codemirror/mode/gfm/gfm.js": 10,
            "codemirror/mode/markdown/markdown.js": 11,
            "codemirror/mode/xml/xml.js": 13,
            "marked/lib/marked": 14
        }]
    }, {}, [17])(17)
}));

