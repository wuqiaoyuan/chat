layui.define(function(z) {
  z("layui.mobile", layui.v)
});
layui.define(function(z) {
  var g = {
    open: "{{",
    close: "}}"
  },
    b = {
      exp: function(b) {
        return new RegExp(b, "g")
      },
      query: function(b, n, m) {
        return e((n || "") + g.open + ["#([\\s\\S])+?", "([^{#}])*?"][b || 0] + g.close + (m || ""))
      },
      escape: function(b) {
        return String(b || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
      },
      error: function(b, e) {
        return "object" == typeof console && console.error("Laytpl Error：" + b + "\n" + (e || "")), "Laytpl Error：" + b
      }
    },
    e = b.exp,
    w = function(b) {
      this.tpl = b
    };
  w.pt = w.prototype;
  window.errors = 0;
  w.pt.parse = function(p, n) {
    var m = p,
      C = e("^" + g.open + "#", ""),
      w = e(g.close + "$", "");
    p = p.replace(/\s+|\r|\t|\n/g, " ").replace(e(g.open + "#"), g.open + "# ").replace(e(g.close + "}"), "} " + g.close).replace(/\\/g, "\\\\").replace(e(g.open + "!(.+?)!" + g.close), function(b) {
      return b = b.replace(e("^" + g.open + "!"), "").replace(e("!" + g.close), "").replace(e(g.open + "|" + g.close), function(b) {
        return b.replace(/(.)/g, "\\$1")
      })
    }).replace(/(?="|')/g, "\\").replace(b.query(), function(b) {
      return b = b.replace(C, "").replace(w, ""), '";' + b.replace(/\\/g, "") + ';view+="'
    }).replace(b.query(1), function(b) {
      var m = '"+(';
      return b.replace(/\s/g, "") === g.open + g.close ? "" : (b = b.replace(e(g.open + "|" + g.close), ""), /^=/.test(b) && (b = b.replace(/^=/, ""), m = '"+_escape_('), m + b.replace(/\\/g, "") + ')+"')
    });
    p = '"use strict";var view = "' + p + '";return view;';
    try {
      return this.cache = p = new Function("d, _escape_", p), p(n, b.escape)
    } catch (E) {
      return delete this.cache, b.error(E, m)
    }
  };
  w.pt.render = function(e, n) {
    var m;
    return e ? (m = this.cache ? this.cache(e, b.escape) : this.parse(this.tpl, e), n ? void n(m) : m) : b.error("no data")
  };
  var u = function(e) {
      return "string" != typeof e ? b.error("Template not found") : new w(e)
    };
  u.config = function(b) {
    b = b || {};
    for (var e in b) g[e] = b[e]
  };
  u.v = "1.2.0";
  z("laytpl", u)
});
layui.define(function(z) {
  var g = (window, document),
    b = {
      type: 0,
      shade: !0,
      shadeClose: !0,
      fixed: !0,
      anim: "scale"
    },
    e = {
      extend: function(m) {
        var e = JSON.parse(JSON.stringify(b)),
          g;
        for (g in m) e[g] = m[g];
        return e
      },
      timer: {},
      end: {},
      touch: function(b, e) {
        b.addEventListener("click", function(b) {
          e.call(this, b)
        }, !1)
      }
    },
    w = 0,
    u = ["layui-m-layer"],
    p = function(b) {
      this.config = e.extend(b);
      this.view()
    };
  p.prototype.view = function() {
    var b = this.config,
      e = g.createElement("div");
    this.id = e.id = u[0] + w;
    e.setAttribute("class", u[0] + " " + u[0] + (b.type || 0));
    e.setAttribute("index", w);
    var p = function() {
        var e = "object" == typeof b.title;
        return b.title ? '<h3 style="' + (e ? b.title[1] : "") + '">' + (e ? b.title[0] : b.title) + "</h3>" : ""
      }(),
      E = function() {
        "string" == typeof b.btn && (b.btn = [b.btn]);
        var e, g = (b.btn || []).length;
        return 0 !== g && b.btn ? (e = '<span yes type="1">' + b.btn[0] + "</span>", 2 === g && (e = '<span no type="0">' + b.btn[1] + "</span>" + e), '<div class="layui-m-layerbtn">' + e + "</div>") : ""
      }();
    (b.fixed || (b.top = b.hasOwnProperty("top") ? b.top : 100, b.style = b.style || "", b.style += " top:" + (g.body.scrollTop + b.top) + "px"), 2 === b.type && (b.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (b.content || "") + "</p>"), b.skin && (b.anim = "up"), "msg" === b.skin && (b.shade = !1), e.innerHTML = (b.shade ? "<div " + ("string" == typeof b.shade ? 'style="' + b.shade + '"' : "") + ' class="layui-m-layershade"></div>' : "") + '<div class="layui-m-layermain" ' + (b.fixed ? "" : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (b.skin ? "layui-m-layer-" + b.skin + " " : "") + (b.className ? b.className : "") + " " + (b.anim ? "layui-m-anim-" + b.anim : "") + '" ' + (b.style ? 'style="' + b.style + '"' : "") + ">" + p + '<div class="layui-m-layercont">' + b.content + "</div>" + E + "</div></div></div>", b.type && 2 !== b.type) || (p = g.getElementsByClassName(u[0] + b.type), 1 <= p.length && n.close(p[0].getAttribute("index")));
    document.body.appendChild(e);
    e = this.elem = g.querySelectorAll("#" + this.id)[0];
    b.success && b.success(e);
    this.index = w++;
    this.action(b, e)
  };
  p.prototype.action = function(b, g) {
    var m = this;
    b.time && (e.timer[m.index] = setTimeout(function() {
      n.close(m.index)
    }, 1E3 * b.time));
    var p = function() {
        0 == this.getAttribute("type") ? (b.no && b.no(), n.close(m.index)) : b.yes ? b.yes(m.index) : n.close(m.index)
      };
    if (b.btn) for (var w = g.getElementsByClassName("layui-m-layerbtn")[0].children, C = w.length, u = 0; u < C; u++) e.touch(w[u], p);
    b.shade && b.shadeClose && (g = g.getElementsByClassName("layui-m-layershade")[0], e.touch(g, function() {
      n.close(m.index, b.end)
    }));
    b.end && (e.end[m.index] = b.end)
  };
  var n = {
    v: "2.0 m",
    index: w,
    open: function(b) {
      return (new p(b || {})).index
    },
    close: function(b) {
      var n = g.querySelectorAll("#" + u[0] + b)[0];
      n && (n.innerHTML = "", g.body.removeChild(n), clearTimeout(e.timer[b]), delete e.timer[b], "function" == typeof e.end[b] && e.end[b](), delete e.end[b])
    },
    closeAll: function() {
      for (var b = g.getElementsByClassName(u[0]), e = 0, p = b.length; e < p; e++) n.close(0 | b[0].getAttribute("index"))
    }
  };
  z("layer-mobile", n)
});
layui.define(function(z) {
  var g = function() {
      function b(f) {
        return null == f ? String(f) : Y[ca.call(f)] || "object"
      }
      function e(f) {
        return "function" == b(f)
      }
      function g(f) {
        return null != f && f == f.window
      }
      function u(f) {
        return "object" == b(f)
      }
      function p(f) {
        return u(f) && !g(f) && Object.getPrototypeOf(f) == Object.prototype
      }
      function n(f) {
        var a = !! f && "length" in f && f.length,
          b = c.type(f);
        return "function" != b && !g(f) && ("array" == b || 0 === a || "number" == typeof a && 0 < a && a - 1 in f)
      }
      function m(f) {
        return r.call(f, function(f) {
          return null != f
        })
      }
      function C(f) {
        return f.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
      }
      function L(f) {
        return f in T ? T[f] : T[f] = new RegExp("(^|\\s)" + f + "(\\s|$)")
      }
      function E(f, a) {
        return "number" != typeof a || U[C(f)] ? a : a + "px"
      }
      function Q(f) {
        return "children" in f ? I.call(f.children) : c.map(f.childNodes, function(f) {
          if (1 == f.nodeType) return f
        })
      }
      function F(f, a) {
        var b, H = f ? f.length : 0;
        for (b = 0; b < H; b++) this[b] = f[b];
        this.length = H;
        this.selector = a || ""
      }
      function G(f, a, b) {
        for (v in a) b && (p(a[v]) || S(a[v])) ? (p(a[v]) && !p(f[v]) && (f[v] = {}), S(a[v]) && !S(f[v]) && (f[v] = []), G(f[v], a[v], b)) : a[v] !== B && (f[v] = a[v])
      }
      function D(f, a) {
        return null == a ? c(f) : c(f).filter(a)
      }
      function k(f, a, b, d) {
        return e(a) ? a.call(f, b, d) : a
      }
      function K(f, a) {
        var b = f.className || "",
          H = b && b.baseVal !== B;
        return a === B ? H ? b.baseVal : b : void(H ? b.baseVal = a : f.className = a)
      }
      function O(f) {
        try {
          return f ? "true" == f || "false" != f && ("null" == f ? null : +f + "" == f ? +f : /^[\[\{]/.test(f) ? c.parseJSON(f) : f) : f
        } catch (H) {
          return f
        }
      }
      function z(f, a) {
        a(f);
        for (var b = 0, H = f.childNodes.length; b < H; b++) z(f.childNodes[b], a)
      }
      var B, v, c, J, N, x, l = [],
        d = l.concat,
        r = l.filter,
        I = l.slice,
        h = window.document,
        V = {},
        T = {},
        U = {
          "column-count": 1,
          columns: 1,
          "font-weight": 1,
          "line-height": 1,
          opacity: 1,
          "z-index": 1,
          zoom: 1
        },
        W = /^\s*<(\w+|!)[^>]*>/,
        X = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        t = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        R = /^(?:body|html)$/i,
        M = /([A-Z])/g,
        a = "val css html text data width height offset".split(" "),
        q = h.createElement("table"),
        A = h.createElement("tr"),
        Z = {
          tr: h.createElement("tbody"),
          tbody: q,
          thead: q,
          tfoot: q,
          td: A,
          th: A,
          "*": h.createElement("div")
        },
        da = /complete|loaded|interactive/,
        ea = /^[\w-]*$/,
        Y = {},
        ca = Y.toString,
        y = {},
        aa = h.createElement("div"),
        ba = {
          tabindex: "tabIndex",
          readonly: "readOnly",
          "for": "htmlFor",
          "class": "className",
          maxlength: "maxLength",
          cellspacing: "cellSpacing",
          cellpadding: "cellPadding",
          rowspan: "rowSpan",
          colspan: "colSpan",
          usemap: "useMap",
          frameborder: "frameBorder",
          contenteditable: "contentEditable"
        },
        S = Array.isArray ||
      function(f) {
        return f instanceof Array
      };
      return y.matches = function(f, a) {
        if (!a || !f || 1 !== f.nodeType) return !1;
        var b = f.matches || f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.matchesSelector;
        if (b) return b.call(f, a);
        var H;
        b = f.parentNode;
        var d = !b;
        return d && (b = aa).appendChild(f), H = ~y.qsa(b, a).indexOf(f), d && aa.removeChild(f), H
      }, N = function(f) {
        return f.replace(/-+(.)?/g, function(f, a) {
          return a ? a.toUpperCase() : ""
        })
      }, x = function(f) {
        return r.call(f, function(a, b) {
          return f.indexOf(a) == b
        })
      }, y.fragment = function(f, b, d) {
        var H, q, A;
        return X.test(f) && (H = c(h.createElement(RegExp.$1))), H || (f.replace && (f = f.replace(t, "<$1></$2>")), b === B && (b = W.test(f) && RegExp.$1), b in Z || (b = "*"), A = Z[b], A.innerHTML = "" + f, H = c.each(I.call(A.childNodes), function() {
          A.removeChild(this)
        })), p(d) && (q = c(H), c.each(d, function(f, b) {
          -1 < a.indexOf(f) ? q[f](b) : q.attr(f, b)
        })), H
      }, y.Z = function(f, a) {
        return new F(f, a)
      }, y.isZ = function(f) {
        return f instanceof y.Z
      }, y.init = function(f, a) {
        if (!f) return y.Z();
        if ("string" == typeof f) if (f = f.trim(), "<" == f[0] && W.test(f)) a = y.fragment(f, RegExp.$1, a), f = null;
        else {
          if (a !== B) return c(a).find(f);
          a = y.qsa(h, f)
        } else {
          if (e(f)) return c(h).ready(f);
          if (y.isZ(f)) return f;
          if (S(f)) a = m(f);
          else if (u(f)) a = [f], f = null;
          else if (W.test(f)) a = y.fragment(f.trim(), RegExp.$1, a), f = null;
          else {
            if (a !== B) return c(a).find(f);
            a = y.qsa(h, f)
          }
        }
        return y.Z(a, f)
      }, c = function(f, a) {
        return y.init(f, a)
      }, c.extend = function(f) {
        var a, b = I.call(arguments, 1);
        return "boolean" == typeof f && (a = f, f = b.shift()), b.forEach(function(b) {
          G(f, b, a)
        }), f
      }, y.qsa = function(f, a) {
        var b, d = "#" == a[0],
          H = !d && "." == a[0],
          q = d || H ? a.slice(1) : a,
          A = ea.test(q);
        return f.getElementById && A && d ? (b = f.getElementById(q)) ? [b] : [] : 1 !== f.nodeType && 9 !== f.nodeType && 11 !== f.nodeType ? [] : I.call(A && !d && f.getElementsByClassName ? H ? f.getElementsByClassName(q) : f.getElementsByTagName(a) : f.querySelectorAll(a))
      }, c.contains = h.documentElement.contains ?
      function(f, a) {
        return f !== a && f.contains(a)
      } : function(f, a) {
        for (; a && (a = a.parentNode);) if (a === f) return !0;
        return !1
      }, c.type = b, c.isFunction = e, c.isWindow = g, c.isArray = S, c.isPlainObject = p, c.isEmptyObject = function(f) {
        for (var a in f) return !1;
        return !0
      }, c.isNumeric = function(f) {
        var a = Number(f),
          b = typeof f;
        return null != f && "boolean" != b && ("string" != b || f.length) && !isNaN(a) && isFinite(a) || !1
      }, c.inArray = function(a, b, d) {
        return l.indexOf.call(b, a, d)
      }, c.camelCase = N, c.trim = function(a) {
        return null == a ? "" : String.prototype.trim.call(a)
      }, c.uuid = 0, c.support = {}, c.expr = {}, c.noop = function() {}, c.map = function(a, b) {
        var f, d = [];
        if (n(a)) for (f = 0; f < a.length; f++) {
          var q = b(a[f], f);
          null != q && d.push(q)
        } else for (f in a) q = b(a[f], f), null != q && d.push(q);
        return 0 < d.length ? c.fn.concat.apply([], d) : d
      }, c.each = function(a, b) {
        var f;
        if (n(a)) for (f = 0; f < a.length && !1 !== b.call(a[f], f, a[f]); f++);
        else for (f in a) if (!1 === b.call(a[f], f, a[f])) break;
        return a
      }, c.grep = function(a, b) {
        return r.call(a, b)
      }, window.JSON && (c.parseJSON = JSON.parse), c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        Y["[object " + b + "]"] = b.toLowerCase()
      }), c.fn = {
        constructor: y.Z,
        length: 0,
        forEach: l.forEach,
        reduce: l.reduce,
        push: l.push,
        sort: l.sort,
        splice: l.splice,
        indexOf: l.indexOf,
        concat: function() {
          var a, b = [];
          for (a = 0; a < arguments.length; a++) {
            var q = arguments[a];
            b[a] = y.isZ(q) ? q.toArray() : q
          }
          return d.apply(y.isZ(this) ? this.toArray() : this, b)
        },
        map: function(a) {
          return c(c.map(this, function(f, b) {
            return a.call(f, b, f)
          }))
        },
        slice: function() {
          return c(I.apply(this, arguments))
        },
        ready: function(a) {
          return da.test(h.readyState) && h.body ? a(c) : h.addEventListener("DOMContentLoaded", function() {
            a(c)
          }, !1), this
        },
        get: function(a) {
          return a === B ? I.call(this) : this[0 <= a ? a : a + this.length]
        },
        toArray: function() {
          return this.get()
        },
        size: function() {
          return this.length
        },
        remove: function() {
          return this.each(function() {
            null != this.parentNode && this.parentNode.removeChild(this)
          })
        },
        each: function(a) {
          return l.every.call(this, function(f, b) {
            return !1 !== a.call(f, b, f)
          }), this
        },
        filter: function(a) {
          return e(a) ? this.not(this.not(a)) : c(r.call(this, function(f) {
            return y.matches(f, a)
          }))
        },
        add: function(a, b) {
          return c(x(this.concat(c(a, b))))
        },
        is: function(a) {
          return 0 < this.length && y.matches(this[0], a)
        },
        not: function(a) {
          var f = [];
          if (e(a) && a.call !== B) this.each(function(b) {
            a.call(this, b) || f.push(this)
          });
          else {
            var b = "string" == typeof a ? this.filter(a) : n(a) && e(a.item) ? I.call(a) : c(a);
            this.forEach(function(a) {
              0 > b.indexOf(a) && f.push(a)
            })
          }
          return c(f)
        },
        has: function(a) {
          return this.filter(function() {
            return u(a) ? c.contains(this, a) : c(this).find(a).size()
          })
        },
        eq: function(a) {
          return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
        },
        first: function() {
          var a = this[0];
          return a && !u(a) ? a : c(a)
        },
        last: function() {
          var a = this[this.length - 1];
          return a && !u(a) ? a : c(a)
        },
        find: function(a) {
          var f = this;
          return a ? "object" == typeof a ? c(a).filter(function() {
            var a = this;
            return l.some.call(f, function(f) {
              return c.contains(f, a)
            })
          }) : 1 == this.length ? c(y.qsa(this[0], a)) : this.map(function() {
            return y.qsa(this, a)
          }) : c()
        },
        closest: function(a, b) {
          var f = [],
            d = "object" == typeof a && c(a);
          return this.each(function(q, A) {
            for (; A && !(d ? 0 <= d.indexOf(A) : y.matches(A, a));) A = A !== b && !(null != A && A.nodeType == A.DOCUMENT_NODE) && A.parentNode;
            A && 0 > f.indexOf(A) && f.push(A)
          }), c(f)
        },
        parents: function(a) {
          for (var f = [], b = this; 0 < b.length;) b = c.map(b, function(a) {
            if ((a = a.parentNode) && (null == a || a.nodeType != a.DOCUMENT_NODE) && 0 > f.indexOf(a)) return f.push(a), a
          });
          return D(f, a)
        },
        parent: function(a) {
          return D(x(this.pluck("parentNode")), a)
        },
        children: function(a) {
          return D(this.map(function() {
            return Q(this)
          }), a)
        },
        contents: function() {
          return this.map(function() {
            return this.contentDocument || I.call(this.childNodes)
          })
        },
        siblings: function(a) {
          return D(this.map(function(a, f) {
            return r.call(Q(f.parentNode), function(a) {
              return a !== f
            })
          }), a)
        },
        empty: function() {
          return this.each(function() {
            this.innerHTML = ""
          })
        },
        pluck: function(a) {
          return c.map(this, function(f) {
            return f[a]
          })
        },
        show: function() {
          return this.each(function() {
            "none" == this.style.display && (this.style.display = "");
            if ("none" == getComputedStyle(this, "").getPropertyValue("display")) {
              var a = this.style;
              var b = this.nodeName;
              var d, q;
              b = (V[b] || (d = h.createElement(b), h.body.appendChild(d), q = getComputedStyle(d, "").getPropertyValue("display"), d.parentNode.removeChild(d), "none" == q && (q = "block"), V[b] = q), V[b]);
              a.display = b
            }
          })
        },
        replaceWith: function(a) {
          return this.before(a).remove()
        },
        wrap: function(a) {
          var f = e(a);
          if (this[0] && !f) var b = c(a).get(0),
            d = b.parentNode || 1 < this.length;
          return this.each(function(q) {
            c(this).wrapAll(f ? a.call(this, q) : d ? b.cloneNode(!0) : b)
          })
        },
        wrapAll: function(a) {
          if (this[0]) {
            c(this[0]).before(a = c(a));
            for (var b;
            (b = a.children()).length;) a = b.first();
            c(a).append(this)
          }
          return this
        },
        wrapInner: function(a) {
          var b = e(a);
          return this.each(function(f) {
            var d = c(this),
              q = d.contents();
            f = b ? a.call(this, f) : a;
            q.length ? q.wrapAll(f) : d.append(f)
          })
        },
        unwrap: function() {
          return this.parent().each(function() {
            c(this).replaceWith(c(this).children())
          }), this
        },
        clone: function() {
          return this.map(function() {
            return this.cloneNode(!0)
          })
        },
        hide: function() {
          return this.css("display", "none")
        },
        toggle: function(a) {
          return this.each(function() {
            var b = c(this);
            (a === B ? "none" == b.css("display") : a) ? b.show() : b.hide()
          })
        },
        prev: function(a) {
          return c(this.pluck("previousElementSibling")).filter(a || "*")
        },
        next: function(a) {
          return c(this.pluck("nextElementSibling")).filter(a || "*")
        },
        html: function(a) {
          return 0 in arguments ? this.each(function(b) {
            var f = this.innerHTML;
            c(this).empty().append(k(this, a, b, f))
          }) : 0 in this ? this[0].innerHTML : null
        },
        text: function(a) {
          return 0 in arguments ? this.each(function(b) {
            b = k(this, a, b, this.textContent);
            this.textContent = null == b ? "" : "" + b
          }) : 0 in this ? this.pluck("textContent").join("") : null
        },
        attr: function(a, b) {
          var f;
          return "string" != typeof a || 1 in arguments ? this.each(function(f) {
            if (1 === this.nodeType) if (u(a)) for (v in a) {
              var d = v;
              f = a[v];
              null == f ? this.removeAttribute(d) : this.setAttribute(d, f)
            } else d = a, f = k(this, b, f, this.getAttribute(a)), null == f ? this.removeAttribute(d) : this.setAttribute(d, f)
          }) : 0 in this && 1 == this[0].nodeType && null != (f = this[0].getAttribute(a)) ? f : B
        },
        removeAttr: function(a) {
          return this.each(function() {
            1 === this.nodeType && a.split(" ").forEach(function(a) {
              this.removeAttribute(a)
            }, this)
          })
        },
        prop: function(a, b) {
          return a = ba[a] || a, 1 in arguments ? this.each(function(f) {
            this[a] = k(this, b, f, this[a])
          }) : this[0] && this[0][a]
        },
        removeProp: function(a) {
          return a = ba[a] || a, this.each(function() {
            delete this[a]
          })
        },
        data: function(a, b) {
          var f = "data-" + a.replace(M, "-$1").toLowerCase();
          f = 1 in arguments ? this.attr(f, b) : this.attr(f);
          return null !== f ? O(f) : B
        },
        val: function(a) {
          return 0 in arguments ? (null == a && (a = ""), this.each(function(b) {
            this.value = k(this, a, b, this.value)
          })) : this[0] && (this[0].multiple ? c(this[0]).find("option").filter(function() {
            return this.selected
          }).pluck("value") : this[0].value)
        },
        offset: function(a) {
          if (a) return this.each(function(b) {
            var f = c(this);
            b = k(this, a, b, f.offset());
            var d = f.offsetParent().offset();
            b = {
              top: b.top - d.top,
              left: b.left - d.left
            };
            "static" == f.css("position") && (b.position = "relative");
            f.css(b)
          });
          if (!this.length) return null;
          if (h.documentElement !== this[0] && !c.contains(h.documentElement, this[0])) return {
            top: 0,
            left: 0
          };
          var b = this[0].getBoundingClientRect();
          return {
            left: b.left + window.pageXOffset,
            top: b.top + window.pageYOffset,
            width: Math.round(b.width),
            height: Math.round(b.height)
          }
        },
        css: function(a, d) {
          if (2 > arguments.length) {
            var f = this[0];
            if ("string" == typeof a) return f ? f.style[N(a)] || getComputedStyle(f, "").getPropertyValue(a) : void 0;
            if (S(a)) {
              if (!f) return;
              var q = {},
                A = getComputedStyle(f, "");
              return c.each(a, function(a, b) {
                q[b] = f.style[N(b)] || A.getPropertyValue(b)
              }), q
            }
          }
          var h = "";
          if ("string" == b(a)) d || 0 === d ? h = C(a) + ":" + E(a, d) : this.each(function() {
            this.style.removeProperty(C(a))
          });
          else for (v in a) a[v] || 0 === a[v] ? h += C(v) + ":" + E(v, a[v]) + ";" : this.each(function() {
            this.style.removeProperty(C(v))
          });
          return this.each(function() {
            this.style.cssText += ";" + h
          })
        },
        index: function(a) {
          return a ? this.indexOf(c(a)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(a) {
          return !!a && l.some.call(this, function(a) {
            return this.test(K(a))
          }, L(a))
        },
        addClass: function(a) {
          return a ? this.each(function(b) {
            if ("className" in this) {
              J = [];
              var f = K(this);
              k(this, a, b, f).split(/\s+/g).forEach(function(a) {
                c(this).hasClass(a) || J.push(a)
              }, this);
              J.length && K(this, f + (f ? " " : "") + J.join(" "))
            }
          }) : this
        },
        removeClass: function(a) {
          return this.each(function(b) {
            if ("className" in this) {
              if (a === B) return K(this, "");
              J = K(this);
              k(this, a, b, J).split(/\s+/g).forEach(function(a) {
                J = J.replace(L(a), " ")
              });
              K(this, J.trim())
            }
          })
        },
        toggleClass: function(a, b) {
          return a ? this.each(function(f) {
            var d = c(this);
            k(this, a, f, K(this)).split(/\s+/g).forEach(function(a) {
              (b === B ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
            })
          }) : this
        },
        scrollTop: function(a) {
          if (this.length) {
            var b = "scrollTop" in this[0];
            return a === B ? b ? this[0].scrollTop : this[0].pageYOffset : this.each(b ?
            function() {
              this.scrollTop = a
            } : function() {
              this.scrollTo(this.scrollX, a)
            })
          }
        },
        scrollLeft: function(a) {
          if (this.length) {
            var b = "scrollLeft" in this[0];
            return a === B ? b ? this[0].scrollLeft : this[0].pageXOffset : this.each(b ?
            function() {
              this.scrollLeft = a
            } : function() {
              this.scrollTo(a, this.scrollY)
            })
          }
        },
        position: function() {
          if (this.length) {
            var a = this[0],
              b = this.offsetParent(),
              d = this.offset(),
              q = R.test(b[0].nodeName) ? {
                top: 0,
                left: 0
              } : b.offset();
            return d.top -= parseFloat(c(a).css("margin-top")) || 0, d.left -= parseFloat(c(a).css("margin-left")) || 0, q.top += parseFloat(c(b[0]).css("border-top-width")) || 0, q.left += parseFloat(c(b[0]).css("border-left-width")) || 0, {
              top: d.top - q.top,
              left: d.left - q.left
            }
          }
        },
        offsetParent: function() {
          return this.map(function() {
            for (var a = this.offsetParent || h.body; a && !R.test(a.nodeName) && "static" == c(a).css("position");) a = a.offsetParent;
            return a
          })
        }
      }, c.fn.detach = c.fn.remove, ["width", "height"].forEach(function(a) {
        var b = a.replace(/./, function(a) {
          return a[0].toUpperCase()
        });
        c.fn[a] = function(f) {
          var d, q = this[0];
          return f === B ? g(q) ? q["inner" + b] : null != q && q.nodeType == q.DOCUMENT_NODE ? q.documentElement["scroll" + b] : (d = this.offset()) && d[a] : this.each(function(b) {
            q = c(this);
            q.css(a, k(this, f, b, q[a]()))
          })
        }
      }), ["after", "prepend", "before", "append"].forEach(function(a, d) {
        var f = d % 2;
        c.fn[a] = function() {
          var a, q, A = c.map(arguments, function(f) {
            var d = [];
            return a = b(f), "array" == a ? (f.forEach(function(a) {
              return a.nodeType !== B ? d.push(a) : c.zepto.isZ(a) ? d = d.concat(a.get()) : void(d = d.concat(y.fragment(a)))
            }), d) : "object" == a || null == f ? f : y.fragment(f)
          }),
            e = 1 < this.length;
          return 1 > A.length ? this : this.each(function(a, b) {
            q = f ? b : b.parentNode;
            b = 0 == d ? b.nextSibling : 1 == d ? b.firstChild : 2 == d ? b : null;
            var x = c.contains(h.documentElement, q);
            A.forEach(function(a) {
              if (e) a = a.cloneNode(!0);
              else if (!q) return c(a).remove();
              q.insertBefore(a, b);
              x && z(a, function(a) {
                if (!(null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src)) {
                  var b = a.ownerDocument ? a.ownerDocument.defaultView : window;
                  b.eval.call(b, a.innerHTML)
                }
              })
            })
          })
        };
        c.fn[f ? a + "To" : "insert" + (d ? "Before" : "After")] = function(b) {
          return c(b)[a](this), this
        }
      }), y.Z.prototype = F.prototype = c.fn, y.uniq = x, y.deserializeValue = O, c.zepto = y, c
    }();
  !
  function(b) {
    function e(b) {
      return b._zid || (b._zid = Q++)
    }
    function g(b, c, d, r) {
      if (c = u(c), c.ns) var x = new RegExp("(?:^| )" + c.ns.replace(" ", " .* ?") + "(?: |$)");
      return (k[e(b)] || []).filter(function(b) {
        return b && (!c.e || b.e == c.e) && (!c.ns || x.test(b.ns)) && (!d || e(b.fn) === e(d)) && (!r || b.sel == r)
      })
    }
    function u(b) {
      b = ("" + b).split(".");
      return {
        e: b[0],
        ns: b.slice(1).sort().join(" ")
      }
    }
    function p(b) {
      return B[b] || z && P[b] || b
    }
    function n(c, l, d, r, g, h, n) {
      var x = e(c),
        I = k[x] || (k[x] = []);
      l.split(/\s/).forEach(function(e) {
        if ("ready" == e) return b(document).ready(d);
        var x = u(e);
        x.fn = d;
        x.sel = g;
        x.e in B && (d = function(d) {
          var h = d.relatedTarget;
          if (!h || h !== this && !b.contains(this, h)) return x.fn.apply(this, arguments)
        });
        var l = (x.del = h) || d;
        x.proxy = function(b) {
          if (b = C(b), !b.isImmediatePropagationStopped()) {
            b.data = r;
            var d = l.apply(c, b._args == E ? [b] : [b].concat(b._args));
            return !1 === d && (b.preventDefault(), b.stopPropagation()), d
          }
        };
        x.i = I.length;
        I.push(x);
        "addEventListener" in c && c.addEventListener(p(x.e), x.proxy, x.del && !z && x.e in P || !! n)
      })
    }
    function m(b, c, d, r, I) {
      var h = e(b);
      (c || "").split(/\s/).forEach(function(c) {
        g(b, c, d, r).forEach(function(d) {
          delete k[h][d.i];
          "removeEventListener" in b && b.removeEventListener(p(d.e), d.proxy, d.del && !z && d.e in P || !! I)
        })
      })
    }
    function C(e, l) {
      return !l && e.isDefaultPrevented || (l || (l = e), b.each(N, function(b, r) {
        var d = l[b];
        e[b] = function() {
          return this[r] = v, d && d.apply(l, arguments)
        };
        e[r] = c
      }), e.timeStamp || (e.timeStamp = Date.now()), (l.defaultPrevented !== E ? l.defaultPrevented : "returnValue" in l ? !1 === l.returnValue : l.getPreventDefault && l.getPreventDefault()) && (e.isDefaultPrevented = v)), e
    }
    function L(b) {
      var e, d = {
        originalEvent: b
      };
      for (e in b) J.test(e) || b[e] === E || (d[e] = b[e]);
      return C(d, b)
    }
    var E, Q = 1,
      F = Array.prototype.slice,
      G = b.isFunction,
      D = function(b) {
        return "string" == typeof b
      },
      k = {},
      K = {},
      z = "onfocusin" in window,
      P = {
        focus: "focusin",
        blur: "focusout"
      },
      B = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
      };
    K.click = K.mousedown = K.mouseup = K.mousemove = "MouseEvents";
    b.event = {
      add: n,
      remove: m
    };
    b.proxy = function(c, l) {
      var d = 2 in arguments && F.call(arguments, 2);
      if (G(c)) {
        var r = function() {
            return c.apply(l, d ? d.concat(F.call(arguments)) : arguments)
          };
        return r._zid = e(c), r
      }
      if (D(l)) return d ? (d.unshift(c[l], c), b.proxy.apply(null, d)) : b.proxy(c[l], c);
      throw new TypeError("expected function");
    };
    b.fn.bind = function(b, c, d) {
      return this.on(b, c, d)
    };
    b.fn.unbind = function(b, c) {
      return this.off(b, c)
    };
    b.fn.one = function(b, c, d, e) {
      return this.on(b, c, d, e, 1)
    };
    var v = function() {
        return !0
      },
      c = function() {
        return !1
      },
      J = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      N = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
      };
    b.fn.delegate = function(b, c, d) {
      return this.on(c, b, d)
    };
    b.fn.undelegate = function(b, c, d) {
      return this.off(c, b, d)
    };
    b.fn.live = function(c, e) {
      return b(document.body).delegate(this.selector, c, e), this
    };
    b.fn.die = function(c, e) {
      return b(document.body).undelegate(this.selector, c, e), this
    };
    b.fn.on = function(e, g, d, r, I) {
      var h, k, l = this;
      return e && !D(e) ? (b.each(e, function(b, c) {
        l.on(b, g, d, c, I)
      }), l) : (D(g) || G(r) || !1 === r || (r = d, d = g, g = E), r !== E && !1 !== d || (r = d, d = E), !1 === r && (r = c), l.each(function(c, l) {
        I && (h = function(b) {
          return m(l, b.type, r), r.apply(this, arguments)
        });
        g && (k = function(d) {
          var c, e = b(d.target).closest(g, l).get(0);
          if (e && e !== l) return c = b.extend(L(d), {
            currentTarget: e,
            liveFired: l
          }), (h || r).apply(e, [c].concat(F.call(arguments, 1)))
        });
        n(l, e, r, d, g, k || h)
      }))
    };
    b.fn.off = function(e, g, d) {
      var r = this;
      return e && !D(e) ? (b.each(e, function(b, d) {
        r.off(b, g, d)
      }), r) : (D(g) || G(d) || !1 === d || (d = g, g = E), !1 === d && (d = c), r.each(function() {
        m(this, e, d, g)
      }))
    };
    b.fn.trigger = function(e, c) {
      return e = D(e) || b.isPlainObject(e) ? b.Event(e) : C(e), e._args = c, this.each(function() {
        e.type in P && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : b(this).triggerHandler(e, c)
      })
    };
    b.fn.triggerHandler = function(e, c) {
      var d, r;
      return this.each(function(k, h) {
        d = L(D(e) ? b.Event(e) : e);
        d._args = c;
        d.target = h;
        b.each(g(h, e.type || e), function(b, e) {
          if (r = e.proxy(d), d.isImmediatePropagationStopped()) return !1
        })
      }), r
    };
    "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
      b.fn[e] = function(b) {
        return 0 in arguments ? this.bind(e, b) : this.trigger(e)
      }
    });
    b.Event = function(b, e) {
      D(b) || (e = b, b = e.type);
      var d = document.createEvent(K[b] || "Events"),
        c = !0;
      if (e) for (var g in e)"bubbles" == g ? c = !! e[g] : d[g] = e[g];
      return d.initEvent(b, c, !0), C(d)
    }
  }(g);
  (function(b) {
    function e(d, e, c, h) {
      if (d.global) return d = e || O, c = b.Event(c), b(d).trigger(c, h), !c.isDefaultPrevented()
    }
    function g(d) {
      d.global && 0 === b.active++ && e(d, null, "ajaxStart")
    }
    function u(b, c) {
      var d = c.context;
      return !1 !== c.beforeSend.call(d, b, c) && !1 !== e(c, d, "ajaxBeforeSend", [b, c]) && void e(c, d, "ajaxSend", [b, c])
    }
    function p(b, c, g, h) {
      var d = g.context;
      g.success.call(d, b, "success", c);
      h && h.resolveWith(d, [b, "success", c]);
      e(g, d, "ajaxSuccess", [c, g, b]);
      m("success", c, g)
    }
    function n(b, c, g, h, k) {
      var d = h.context;
      h.error.call(d, g, c, b);
      k && k.rejectWith(d, [g, c, b]);
      e(h, d, "ajaxError", [g, h, b || c]);
      m(c, g, h)
    }
    function m(d, c, g) {
      var h = g.context;
      g.complete.call(h, c, d);
      e(g, h, "ajaxComplete", [c, g]);
      g.global && !--b.active && e(g, null, "ajaxStop")
    }
    function C() {}
    function L(b) {
      return b && (b = b.split(";", 2)[0]), b && (b == J ? "html" : b == c ? "json" : B.test(b) ? "script" : v.test(b) && "xml") || "text"
    }
    function E(b, c) {
      return "" == c ? b : (b + "&" + c).replace(/[&?]{1,2}/, "?")
    }
    function Q(d) {
      d.processData && d.data && "string" != b.type(d.data) && (d.data = b.param(d.data, d.traditional));
      !d.data || d.type && "GET" != d.type.toUpperCase() && "jsonp" != d.dataType || (d.url = E(d.url, d.data), d.data = void 0)
    }
    function F(d, c, e, h) {
      return b.isFunction(c) && (h = e, e = c, c = void 0), b.isFunction(e) || (h = e, e = void 0), {
        url: d,
        data: c,
        success: e,
        dataType: h
      }
    }
    function G(d, c, e, h) {
      var g, k = b.isArray(c),
        n = b.isPlainObject(c);
      b.each(c, function(c, r) {
        g = b.type(r);
        h && (c = e ? h : h + "[" + (n || "object" == g || "array" == g ? c : "") + "]");
        !h && k ? d.add(r.name, r.value) : "array" == g || !e && "object" == g ? G(d, r, e, c) : d.add(c, r)
      })
    }
    var D, k, z = +new Date,
      O = window.document,
      P = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      B = /^(?:text|application)\/javascript/i,
      v = /^(?:text|application)\/xml/i,
      c = "application/json",
      J = "text/html",
      N = /^\s*$/,
      x = O.createElement("a");
    x.href = window.location.href;
    b.active = 0;
    b.ajaxJSONP = function(d, c) {
      if (!("type" in d)) return b.ajax(d);
      var e, g, k = d.jsonpCallback,
        r = (b.isFunction(k) ? k() : k) || "Zepto" + z++,
        l = O.createElement("script"),
        m = window[r],
        w = function(d) {
          b(l).triggerHandler("error", d || "abort")
        },
        t = {
          abort: w
        };
      return c && c.promise(t), b(l).on("load error", function(h, k) {
        clearTimeout(g);
        b(l).off().remove();
        "error" != h.type && e ? p(e[0], t, d, c) : n(null, k || "error", t, d, c);
        window[r] = m;
        e && b.isFunction(m) && m(e[0]);
        m = e = void 0
      }), !1 === u(t, d) ? (w("abort"), t) : (window[r] = function() {
        e = arguments
      }, l.src = d.url.replace(/\?(.+)=\?/, "?$1=" + r), O.head.appendChild(l), 0 < d.timeout && (g = setTimeout(function() {
        w("timeout")
      }, d.timeout)), t)
    };
    b.ajaxSettings = {
      type: "GET",
      beforeSend: C,
      success: C,
      error: C,
      complete: C,
      context: null,
      global: !0,
      xhr: function() {
        return new window.XMLHttpRequest
      },
      accepts: {
        script: "text/javascript, application/javascript, application/x-javascript",
        json: c,
        xml: "application/xml, text/xml",
        html: J,
        text: "text/plain"
      },
      crossDomain: !1,
      timeout: 0,
      processData: !0,
      cache: !0,
      dataFilter: C
    };
    b.ajax = function(d) {
      var c, e, h = b.extend({}, d || {}),
        l = b.Deferred && b.Deferred();
      for (D in b.ajaxSettings) void 0 === h[D] && (h[D] = b.ajaxSettings[D]);
      g(h);
      h.crossDomain || (c = O.createElement("a"), c.href = h.url, c.href = c.href, h.crossDomain = x.protocol + "//" + x.host != c.protocol + "//" + c.host);
      h.url || (h.url = window.location.toString()); - 1 < (e = h.url.indexOf("#")) && (h.url = h.url.slice(0, e));
      Q(h);
      var m = h.dataType;
      c = /\?.+=\?/.test(h.url);
      if (c && (m = "jsonp"), !1 !== h.cache && (d && !0 === d.cache || "script" != m && "jsonp" != m) || (h.url = E(h.url, "_=" + Date.now())), "jsonp" == m) return c || (h.url = E(h.url, h.jsonp ? h.jsonp + "=?" : !1 === h.jsonp ? "" : "callback=?")), b.ajaxJSONP(h, l);
      var w;
      d = h.accepts[m];
      var v = {};
      c = function(b, c) {
        v[b.toLowerCase()] = [b, c]
      };
      var F = /^([\w-]+:)\/\//.test(h.url) ? RegExp.$1 : window.location.protocol,
        t = h.xhr();
      e = t.setRequestHeader;
      if (l && l.promise(t), h.crossDomain || c("X-Requested-With", "XMLHttpRequest"), c("Accept", d || "*/*"), (d = h.mimeType || d) && (-1 < d.indexOf(",") && (d = d.split(",", 2)[0]), t.overrideMimeType && t.overrideMimeType(d)), (h.contentType || !1 !== h.contentType && h.data && "GET" != h.type.toUpperCase()) && c("Content-Type", h.contentType || "application/x-www-form-urlencoded"), h.headers) for (k in h.headers) c(k, h.headers[k]);
      if (t.setRequestHeader = c, t.onreadystatechange = function() {
        if (4 == t.readyState) {
          t.onreadystatechange = C;
          clearTimeout(w);
          var c = !1;
          if (200 <= t.status && 300 > t.status || 304 == t.status || 0 == t.status && "file:" == F) {
            if (m = m || L(h.mimeType || t.getResponseHeader("content-type")), "arraybuffer" == t.responseType || "blob" == t.responseType) var d = t.response;
            else {
              d = t.responseText;
              try {
                d = h.dataFilter == C ? d : h.dataFilter.call(h.context, d, m), "script" == m ? (0, eval)(d) : "xml" == m ? d = t.responseXML : "json" == m && (d = N.test(d) ? null : b.parseJSON(d))
              } catch (a) {
                c = a
              }
              if (c) return n(c, "parsererror", t, h, l)
            }
            p(d, t, h, l)
          } else n(t.statusText || null, t.status ? "error" : "abort", t, h, l)
        }
      }, !1 === u(t, h)) return t.abort(), n(null, "abort", t, h, l), t;
      if (t.open(h.type, h.url, !("async" in h) || h.async, h.username, h.password), h.xhrFields) for (k in h.xhrFields) t[k] = h.xhrFields[k];
      for (k in v) e.apply(t, v[k]);
      return 0 < h.timeout && (w = setTimeout(function() {
        t.onreadystatechange = C;
        t.abort();
        n(null, "timeout", t, h, l)
      }, h.timeout)), t.send(h.data ? h.data : null), t
    };
    b.get = function() {
      return b.ajax(F.apply(null, arguments))
    };
    b.post = function() {
      var d = F.apply(null, arguments);
      return d.type = "POST", b.ajax(d)
    };
    b.getJSON = function() {
      var d = F.apply(null, arguments);
      return d.dataType = "json", b.ajax(d)
    };
    b.fn.load = function(d, c, e) {
      if (!this.length) return this;
      var g, k = this,
        l = d.split(/\s/);
      d = F(d, c, e);
      var n = d.success;
      return 1 < l.length && (d.url = l[0], g = l[1]), d.success = function(d) {
        k.html(g ? b("<div>").html(d.replace(P, "")).find(g) : d);
        n && n.apply(k, arguments)
      }, b.ajax(d), this
    };
    var l = encodeURIComponent;
    b.param = function(d, c) {
      var e = [];
      return e.add = function(d, c) {
        b.isFunction(c) && (c = c());
        null == c && (c = "");
        this.push(l(d) + "=" + l(c))
      }, G(e, d, c), e.join("&").replace(/%20/g, "+")
    }
  })(g);
  (function(b) {
    b.fn.serializeArray = function() {
      var e, g, u = [],
        p = function(b) {
          return b.forEach ? b.forEach(p) : void u.push({
            name: e,
            value: b
          })
        };
      return this[0] && b.each(this[0].elements, function(n, m) {
        g = m.type;
        (e = m.name) && "fieldset" != m.nodeName.toLowerCase() && !m.disabled && "submit" != g && "reset" != g && "button" != g && "file" != g && ("radio" != g && "checkbox" != g || m.checked) && p(b(m).val())
      }), u
    };
    b.fn.serialize = function() {
      var b = [];
      return this.serializeArray().forEach(function(e) {
        b.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
      }), b.join("&")
    };
    b.fn.submit = function(e) {
      if (0 in arguments) this.bind("submit", e);
      else if (this.length) {
        var g = b.Event("submit");
        this.eq(0).trigger(g);
        g.isDefaultPrevented() || this.get(0).submit()
      }
      return this
    }
  })(g);
  (function() {
    try {
      getComputedStyle(void 0)
    } catch (e) {
      var b = getComputedStyle;
      window.getComputedStyle = function(e, g) {
        try {
          return b(e, g)
        } catch (p) {
          return null
        }
      }
    }
  })();
  z("zepto", g)
});
layui.define(["layer-mobile", "zepto"], function(z) {
  var g = layui.zepto,
    b = layui["layer-mobile"],
    e = (layui.device(), "layui-upload-enter"),
    w = {
      icon: 2,
      shift: 6
    },
    u = {
      file: "文件",
      video: "视频",
      audio: "音频"
    };
  b.msg = function(e) {
    return b.open({
      content: e || "",
      skin: "msg",
      time: 2
    })
  };
  var p = function(b) {
      this.options = b
    };
  p.prototype.init = function() {
    var b = this,
      m = b.options,
      p = g("body"),
      w = g(m.elem || ".layui-upload-file"),
      E = g('<iframe id="layui-upload-iframe" class="layui-upload-iframe" name="layui-upload-iframe"></iframe>');
    return g("#layui-upload-iframe")[0] || p.append(E), w.each(function(n, p) {
      p = g(p);
      n = '<form target="layui-upload-iframe" method="' + (m.method || "post") + '" key="set-mine" enctype="multipart/form-data" action="' + (m.url || "") + '"></form>';
      var w = p.attr("lay-type") || m.type;
      m.unwrap || (n = '<div class="layui-box layui-upload-button">' + n + '<span class="layui-upload-icon"><i class="layui-icon">&#xe608;</i>' + (p.attr("lay-title") || m.title || "上传" + (u[w] || "图片")) + "</span></div>");
      n = g(n);
      m.unwrap || n.on("dragover", function(b) {
        b.preventDefault();
        g(this).addClass(e)
      }).on("dragleave", function() {
        g(this).removeClass(e)
      }).on("drop", function() {
        g(this).removeClass(e)
      });
      "layui-upload-iframe" === p.parent("form").attr("target") && (m.unwrap ? p.unwrap() : (p.parent().next().remove(), p.unwrap().unwrap()));
      p.wrap(n);
      p.off("change").on("change", function() {
        b.action(this, w)
      })
    })
  };
  p.prototype.action = function(e, p) {
    var m = this.options,
      n = e.value,
      u = g(e),
      z = u.attr("lay-ext") || m.ext || "";
    if (n) {
      switch (p) {
      case "file":
        if (z && !RegExp("\\w\\.(" + z + ")$", "i").test(escape(n))) return b.msg("不支持该文件格式", w), e.value = "";
        break;
      case "video":
        if (!RegExp("\\w\\.(" + (z || "avi|mp4|wma|rmvb|rm|flash|3gp|flv") + ")$", "i").test(escape(n))) return b.msg("不支持该视频格式", w), e.value = "";
        break;
      case "audio":
        if (!RegExp("\\w\\.(" + (z || "mp3|wav|mid") + ")$", "i").test(escape(n))) return b.msg("不支持该音频格式", w), e.value = "";
        break;
      default:
        if (!RegExp("\\w\\.(" + (z || "jpg|png|gif|bmp|jpeg") + ")$", "i").test(escape(n))) return b.msg("不支持该图片格式", w), e.value = ""
      }
      m.before && m.before(e);
      u.parent().submit();
      var F = g("#layui-upload-iframe"),
        G = setInterval(function() {
          try {
            var g = F.contents().find("body").text()
          } catch (k) {
            b.msg("上传接口存在跨域", w), clearInterval(G)
          }
          if (g) {
            clearInterval(G);
            F.contents().find("body").html("");
            try {
              g = JSON.parse(g)
            } catch (k) {
              return b.msg("请对上传接口返回JSON字符", w)
            }
            "function" == typeof m.success && m.success(g, e)
          }
        }, 30);
      e.value = ""
    }
  };
  z("upload-mobile", function(b) {
    (new p(b || {})).init()
  })
});
layui.define(["laytpl", "upload-mobile", "layer-mobile", "zepto"], function(z) {
  var g = layui.zepto,
    b = layui.laytpl,
    e = layui["layer-mobile"],
    w = layui["upload-mobile"],
    u = layui.device(),
    p = {},
    n = function() {
      this.v = "2.1.0";
      m(g("body"), "*[layim-event]", function(a) {
        var b = g(this),
          c = b.attr("layim-event");
        M[c] ? M[c].call(this, b, a) : ""
      })
    },
    m = function(a, b, c) {
      var d, e = "function" == typeof b,
        q = function(a) {
          var b = g(this);
          b.data("lock") || (d || c.call(this, a), d = !1, b.data("lock", "true"), setTimeout(function() {
            b.removeAttr("data-lock")
          }, b.data("locktime") || 0))
        };
      return e && (c = b), a = "string" == typeof a ? g(a) : a, C ? void(e ? a.on("touchmove", function() {
        d = !0
      }).on("touchend", q) : a.on("touchmove", b, function() {
        d = !0
      }).on("touchend", b, q)) : void(e ? a.on("click", q) : a.on("click", b, q))
    },
    C = /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent);
  e.popBottom = function(a) {
    e.close(e.popBottom.index);
    e.popBottom.index = e.open(g.extend({
      type: 1,
      content: a.content || "",
      shade: !1,
      className: "layim-layer"
    }, a))
  };
  n.prototype.config = function(a) {
    a = a || {};
    a = g.extend({
      title: "我的IM",
      isgroup: 0,
      isNewFriend: !0,
      voice: "default.mp3",
      chatTitleColor: "#36373C"
    }, a);
    K(a)
  };
  n.prototype.on = function(a, b) {
    return "function" == typeof b && (p[a] ? p[a].push(b) : p[a] = [b]), this
  };
  n.prototype.chat = function(a) {
    if (window.JSON && window.JSON.parse) return B(a, -1), this
  };
  n.prototype.panel = function(a) {
    return P(a)
  };
  n.prototype.cache = function() {
    return k
  };
  n.prototype.getMessage = function(a) {
    return r(a), this
  };
  n.prototype.addList = function(a) {
    return V(a), this
  };
  n.prototype.removeList = function(a) {
    return T(a), this
  };
  n.prototype.setFriendStatus = function(a, b) {
    g(".layim-friend" + a)["online" === b ? "removeClass" : "addClass"]("layim-list-gray")
  };
  n.prototype.setChatStatus = function(a) {
    return c().elem.find(".layim-chat-status").html(a), this
  };
  n.prototype.showNew = function(a, b) {
    x(a, b)
  };
  n.prototype.content = function(a) {
    return layui.data.content(a)
  };
  var L = function(a) {
      return a = a || {}, "history" === a.type && (a.item = a.item || "d.sortHistory"), ["{{# var length = 0; layui.each(" + a.item + ", function(i, data){ length++; }}", '<li layim-event="chat" data-type="' + a.type + '" data-index="' + (a.index ? "{{" + a.index + "}}" : ("history" === a.type ? "{{data.type}}" : a.type) + "{{data.id}}") + '" class="layim-' + ("history" === a.type ? "{{data.type}}" : a.type) + '{{data.id}} {{ data.status === "offline" ? "layim-list-gray" : "" }}"><div><img src="{{data.avatar}}"></div><span>{{ data.username||data.groupname||data.name||"佚名" }}</span><p>{{ data.remark||data.sign||"" }}</p><span class="layim-msg-status">new</span></li>', "{{# }); if(length === 0){ }}", '<li class="layim-null">' + ({
        friend: "该分组下暂无好友",
        group: "暂无群组",
        history: "暂无任何消息"
      }[a.type] || "暂无数据") + "</li>", "{{# } }}"].join("")
    },
    E = function(a, b, c) {
      return ['<div class="layim-panel' + (b ? " layui-m-anim-left" : "") + '">', '<div class="layim-title" style="background-color: {{d.base.chatTitleColor}};"><p>', c ? '<i class="layui-icon layim-chat-back" layim-event="back">&#xe603;</i>' : "", '{{ d.title || d.base.title }}<span class="layim-chat-status"></span>{{# if(d.data){ }}{{# if(d.data.type === "group"){ }}<i class="layui-icon layim-chat-detail" layim-event="detail">&#xe613;</i>{{# } }}{{# } }}</p></div><div class="layui-unselect layim-content">', a, "</div></div>"].join("")
    },
    Q = ['<div class="layui-layim"><div class="layim-tab-content layui-show"><ul class="layim-list-friend"><ul class="layui-layim-list layui-show layim-list-history">', L({
      type: "history"
    }), '</ul></ul></div><div class="layim-tab-content"><ul class="layim-list-top">{{# if(d.base.isNewFriend){ }}<li layim-event="newFriend"><i class="layui-icon">&#xe654;</i>新的朋友<i class="layim-new" id="LAY_layimNewFriend"></i></li>{{# } if(d.base.isgroup){ }}<li layim-event="group"><i class="layui-icon">&#xe613;</i>群聊<i class="layim-new" id="LAY_layimNewGroup"></i></li>{{# } }}</ul><ul class="layim-list-friend">{{# layui.each(d.friend, function(index, item){ var spread = d.local["spread"+index]; }}<li><h5 layim-event="spread" lay-type="{{ spread }}"><i class="layui-icon">{{# if(spread === "true"){ }}&#xe61a;{{# } else {  }}&#xe602;{{# } }}</i><span>{{ item.groupname||"未命名分组"+index }}</span><em>(<cite class="layim-count"> {{ (item.list||[]).length }}</cite>)</em></h5><ul class="layui-layim-list {{# if(spread === "true"){ }} layui-show{{# } }}">', L({
      type: "friend",
      item: "item.list",
      index: "index"
    }), '</ul></li>{{# }); if(d.friend.length === 0){ }}<li><ul class="layui-layim-list layui-show"><li class="layim-null">暂无联系人</li></ul>{{# } }}</ul></div><div class="layim-tab-content"><ul class="layim-list-top">{{# layui.each(d.base.moreList, function(index, item){ }}<li layim-event="moreList" lay-filter="{{ item.alias }}"><i class="layui-icon {{item.iconClass||""}}">{{item.iconUnicode||""}}</i>{{item.title}}<i class="layim-new" id="LAY_layimNew{{ item.alias }}"></i></li>{{# }); if(!d.base.copyright){ }}<li layim-event="about"><i class="layui-icon">&#xe60b;</i>关于<i class="layim-new" id="LAY_layimNewAbout"></i></li>{{# } }}</ul></div></div><ul class="layui-unselect layui-layim-tab"><li title="消息" layim-event="tab" lay-type="message" class="layim-this"><i class="layui-icon">&#xe611;</i><span>消息</span><i class="layim-new" id="LAY_layimNewMsg"></i></li><li title="联系人" layim-event="tab" lay-type="friend"><i class="layui-icon">&#xe612;</i><span>联系人</span><i class="layim-new" id="LAY_layimNewList"></i></li><li title="更多" layim-event="tab" lay-type="more"><i class="layui-icon">&#xe670;</i><span>更多</span><i class="layim-new" id="LAY_layimNewMore"></i></li></ul>'].join(""),
    F = function(a) {
      return 10 > a ? "0" + (0 | a) : a
    };
  layui.data.date = function(a) {
    a = new Date(a || new Date);
    return F(a.getMonth() + 1) + "-" + F(a.getDate()) + " " + F(a.getHours()) + ":" + F(a.getMinutes())
  };
  layui.data.content = function(a) {
    var b = function(a) {
        return new RegExp("\\n*\\[" + (a || "") + "(pre|div|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*", "g")
      };
    return a = (a || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2').replace(/face\[([^\s\[\]]+?)\]/g, function(a) {
      a = a.replace(/^face/g, "");
      return '<img alt="' + a + '" title="' + a + '" src="' + X[a] + '">'
    }).replace(/img\[([^\s]+?)\]/g, function(a) {
      return '<img class="layui-layim-photos" src="' + a.replace(/(^img\[)|(\]$)/g, "") + '">'
    }).replace(/file\([\s\S]+?\)\[[\s\S]*?\]/g, function(a) {
      var b = (a.match(/file\(([\s\S]+?)\)\[/) || [])[1],
        c = (a.match(/\)\[([\s\S]*?)\]/) || [])[1];
      return b ? '<a class="layui-layim-file" href="' + b + '" download target="_blank"><i class="layui-icon">&#xe61e;</i><cite>' + (c || b) + "</cite></a>" : a
    }).replace(/audio\[([^\s]+?)\]/g, function(a) {
      return '<div class="layui-unselect layui-layim-audio" layim-event="playAudio" data-src="' + a.replace(/(^audio\[)|(\]$)/g, "") + '"><i class="layui-icon">&#xe652;</i><p>音频消息</p></div>'
    }).replace(/video\[([^\s]+?)\]/g, function(a) {
      return '<div class="layui-unselect layui-layim-video" layim-event="playVideo" data-src="' + a.replace(/(^video\[)|(\]$)/g, "") + '"><i class="layui-icon">&#xe652;</i></div>'
    }).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(a) {
      var b = (a.match(/a\(([\s\S]+?)\)\[/) || [])[1],
        c = (a.match(/\)\[([\s\S]*?)\]/) || [])[1];
      return b ? '<a href="' + b + '" target="_blank">' + (c || b) + "</a>" : a
    }).replace(b(), "<$1 $2>").replace(b("/"), "</$1>").replace(/\n/g, "<br>")
  };
  var G, D, k = {
    message: {},
    chat: []
  },
    K = function(a) {
      var c = a.init || {};
      return mine = c.mine || {}, local = layui.data("layim-mobile")[mine.id] || {}, obj = {
        base: a,
        local: local,
        mine: mine,
        history: local.history || []
      }, create = function(c) {
        var d = c.mine || {},
          e = layui.data("layim-mobile")[d.id] || {},
          q = {
            base: a,
            local: e,
            mine: d,
            friend: c.friend || [],
            group: c.group || [],
            history: e.history || []
          };
        q.sortHistory = J(q.history, "historyTime");
        k = g.extend(k, q);
        O(b(E(Q)).render(q));
        layui.each(p.ready, function(a, b) {
          b && b(q)
        })
      }, k = g.extend(k, obj), a.brief ? layui.each(p.ready, function(a, b) {
        b && b(obj)
      }) : void create(c)
    },
    O = function(a) {
      return e.open({
        type: 1,
        shade: !1,
        shadeClose: !1,
        anim: -1,
        content: a,
        success: function(a) {
          G = g(a);
          v(G.find(".layui-layim"));
          k.base.tabIndex && M.tab(g(".layui-layim-tab>li").eq(k.base.tabIndex))
        }
      })
    },
    P = function(a, c) {
      a = a || {};
      var d = g.extend({}, k, {
        title: a.title || "",
        data: a.data
      });
      return e.open({
        type: 1,
        shade: !1,
        shadeClose: !1,
        anim: -1,
        content: b(E(a.tpl, -1 !== c, !0)).render(d),
        success: function(b) {
          var c = g(b);
          c.prev().find(".layim-panel").addClass("layui-m-anim-lout");
          a.success && a.success(b);
          a.isChat || v(c.find(".layim-content"))
        },
        end: a.end
      })
    },
    B = function(a, b, d) {
      return a = a || {}, a.id ? (e.close(B.index), B.index = P({
        tpl: '<div class="layim-chat layim-chat-{{d.data.type}}"><div class="layim-chat-main"><ul></ul></div><div class="layim-chat-footer"><div class="layim-chat-send"><input type="text" autocomplete="off"><button class="layim-send layui-disabled" layim-event="send">发送</button></div><div class="layim-chat-tool" data-json="{{encodeURIComponent(JSON.stringify(d.data))}}"><span class="layui-icon layim-tool-face" title="选择表情" layim-event="face">&#xe60c;</span>{{# if(d.base && d.base.uploadImage){ }}<span class="layui-icon layim-tool-image" title="上传图片" layim-event="image">&#xe60d;<input type="file" name="file" accept="image/*"></span>{{# }; }}{{# if(d.base && d.base.uploadFile){ }}<span class="layui-icon layim-tool-image" title="发送文件" layim-event="image" data-type="file">&#xe61d;<input type="file" name="file"></span>{{# }; }}{{# layui.each(d.base.tool, function(index, item){ }}<span class="layui-icon  {{item.iconClass||""}} layim-tool-{{item.alias}}" title="{{item.title}}" layim-event="extend" lay-filter="{{ item.alias }}">{{item.iconUnicode||""}}</span>{{# }); }}</div></div></div>',
        data: a,
        title: a.name,
        isChat: !0,
        success: function(b) {
          D = g(b);
          W();
          h();
          delete k.message[a.type + a.id];
          x("Msg");
          var d = c(),
            e = d.elem.find(".layim-chat-main");
          layui.each(p.chatChange, function(a, b) {
            b && b(d)
          });
          v(e);
          d.textarea.on("focus", function() {
            setTimeout(function() {
              e.scrollTop(e[0].scrollHeight + 1E3)
            }, 500)
          })
        },
        end: function() {
          D = null;
          l.time = 0
        }
      }, b)) : e.msg("非法用户")
    },
    v = function(a) {
      u.ios && a.on("touchmove", function(b) {
        var c = a.scrollTop();
        0 >= c && (a.scrollTop(1), b.preventDefault(b));
        0 >= this.scrollHeight - c - a.height() && (a.scrollTop(a.scrollTop() - 1), b.preventDefault(b))
      })
    },
    c = function() {
      if (!D) return {};
      var a = D.find(".layim-chat"),
        b = JSON.parse(decodeURIComponent(a.find(".layim-chat-tool").data("json")));
      return {
        elem: a,
        data: b,
        textarea: a.find("input")
      }
    },
    J = function(a, b, c) {
      var d = [];
      return layui.each(a, function(a, b) {
        d.push(b)
      }), d.sort(function(a, c) {
        a = a[b];
        c = c[b];
        return c < a ? -1 : c > a ? 1 : 0
      }), c && d.reverse(), d
    },
    N = function(a) {
      var c = layui.data("layim-mobile")[k.mine.id] || {},
        d = {},
        e = c.history || {};
      e[a.type + a.id];
      if (G) {
        var g = G.find(".layim-list-history");
        a.historyTime = (new Date).getTime();
        a.sign = a.content;
        e[a.type + a.id] = a;
        c.history = e;
        layui.data("layim-mobile", {
          key: k.mine.id,
          value: c
        });
        var h = g.find(".layim-" + a.type + a.id),
          l = (k.message[a.type + a.id] || []).length;
        c = function() {
          h = g.find(".layim-" + a.type + a.id);
          h.find("p").html(a.content);
          0 < l && h.find(".layim-msg-status").html(l).addClass("layui-show")
        };
        0 < h.length ? (c(), g.prepend(h.clone()), h.remove()) : (d[a.type + a.id] = a, d = b(L({
          type: "history",
          item: "d.data"
        })).render({
          data: d
        }), g.prepend(d), c(), g.find(".layim-null").remove());
        x("Msg")
      }
    },
    x = function(a, b) {
      b || layui.each(k.message, function() {
        return b = !0, !1
      });
      g("#LAY_layimNew" + a)[b ? "addClass" : "removeClass"]("layui-show")
    },
    l = function() {
      var a = {
        username: k.mine ? k.mine.username : "访客",
        avatar: k.mine ? k.mine.avatar : layui.cache.dir + "css/pc/layim/skin/logo.jpg",
        id: k.mine ? k.mine.id : null,
        mine: !0
      },
        d = c(),
        g = d.elem.find(".layim-chat-main ul"),
        h = d.data,
        m = k.base.maxLength || 3E3,
        n = (new Date).getTime();
      d = d.textarea;
      if (a.content = d.val(), "" !== a.content) {
        if (a.content.length > m) return e.msg("内容最长不能超过" + m + "个字符");
        6E4 < n - (l.time || 0) && (g.append('<li class="layim-chat-system"><span>' + layui.data.date() + "</span></li>"), l.time = n);
        g.append(b('<li class="layim-chat-li{{ d.mine ? " layim-chat-mine" : "" }}"><div class="layim-chat-user"><img src="{{ d.avatar }}"><cite>{{ d.username||"佚名" }}</cite></div><div class="layim-chat-text">{{ layui.data.content(d.content||"&nbsp;") }}</div></li>').render(a));
        var r = {
          mine: a,
          to: h
        };
        I({
          username: r.mine.username,
          avatar: r.mine.avatar,
          id: h.id,
          type: h.type,
          content: r.mine.content,
          timestamp: n,
          mine: !0
        });
        layui.each(p.sendMessage, function(a, b) {
          b && b(r)
        });
        h.content = a.content;
        N(h);
        U();
        d.val("");
        d.next().addClass("layui-disabled")
      }
    },
    d = function() {
      var a = document.createElement("audio");
      a.src = layui.cache.dir + "css/modules/layim/voice/" + k.base.voice;
      a.play()
    },
    r = function(a) {
      a = a || {};
      var e = c().data || {};
      e = e.id == a.id && e.type == a.type;
      a.timestamp = a.timestamp || (new Date).getTime();
      a.system || I(a);
      JSON.parse(JSON.stringify(a));
      k.base.voice && d();
      (!D && a.content || !e) && (k.message[a.type + a.id] ? k.message[a.type + a.id].push(a) : k.message[a.type + a.id] = [a]);
      var h = void 0;
      if ("friend" === a.type) {
        var m;
        layui.each(k.friend, function(b, c) {
          if (layui.each(c.list, function(b, c) {
            if (c.id == a.id) return a.type = "friend", a.name = c.username, m = !0
          }), m) return !0
        });
        m || (a.temporary = !0)
      } else "group" === a.type ? layui.each(k.group, function(b, c) {
        if (c.id == a.id) return a.type = "group", a.name = a.groupname = c.groupname, h = c.avatar, !0
      }) : a.name = a.name || a.username || a.groupname;
      var n = g.extend({}, a, {
        avatar: h || a.avatar
      });
      if ("group" === a.type && delete n.username, N(n), D && e) e = D.find(".layim-chat").find(".layim-chat-main ul"), a.system ? e.append('<li class="layim-chat-system"><span>' + a.content + "</span></li>") : "" !== a.content.replace(/\s/g, "") && (6E4 < a.timestamp - (l.time || 0) && (e.append('<li class="layim-chat-system"><span>' + layui.data.date(a.timestamp) + "</span></li>"), l.time = a.timestamp), e.append(b('<li class="layim-chat-li{{ d.mine ? " layim-chat-mine" : "" }}"><div class="layim-chat-user"><img src="{{ d.avatar }}"><cite>{{ d.username||"佚名" }}</cite></div><div class="layim-chat-text">{{ layui.data.content(d.content||"&nbsp;") }}</div></li>').render(a))), U()
    },
    I = function(a) {
      var b = layui.data("layim-mobile")[k.mine.id] || {},
        c = b.chatlog || {};
      c[a.type + a.id] ? (c[a.type + a.id].push(a), 20 < c[a.type + a.id].length && c[a.type + a.id].shift()) : c[a.type + a.id] = [a];
      b.chatlog = c;
      layui.data("layim-mobile", {
        key: k.mine.id,
        value: b
      })
    },
    h = function() {
      var a = layui.data("layim-mobile")[k.mine.id] || {},
        d = c();
      a = a.chatlog || {};
      var e = d.elem.find(".layim-chat-main ul");
      layui.each(a[d.data.type + d.data.id], function(a, c) {
        (new Date).getTime() > c.timestamp && 6E4 < c.timestamp - (l.time || 0) && (e.append('<li class="layim-chat-system"><span>' + layui.data.date(c.timestamp) + "</span></li>"), l.time = c.timestamp);
        e.append(b('<li class="layim-chat-li{{ d.mine ? " layim-chat-mine" : "" }}"><div class="layim-chat-user"><img src="{{ d.avatar }}"><cite>{{ d.username||"佚名" }}</cite></div><div class="layim-chat-text">{{ layui.data.content(d.content||"&nbsp;") }}</div></li>').render(c))
      });
      U()
    },
    V = function(a) {
      var c, d = {},
        g = G.find(".layim-list-" + a.type);
      if (k[a.type]) if ("friend" === a.type) layui.each(k.friend, function(b, g) {
        if (a.groupid == g.id) return layui.each(k.friend[b].list, function(b, d) {
          if (d.id == a.id) return c = !0
        }), c ? e.msg("好友 [" + (a.username || "") + "] 已经存在列表中", {
          anim: 6
        }) : (k.friend[b].list = k.friend[b].list || [], d[k.friend[b].list.length] = a, a.groupIndex = b, k.friend[b].list.push(a), !0)
      });
      else if ("group" === a.type) {
        if (layui.each(k.group, function(b, d) {
          if (d.id == a.id) return c = !0
        }), c) return e.msg("您已是 [" + (a.groupname || "") + "] 的群成员", {
          anim: 6
        });
        d[k.group.length] = a;
        k.group.push(a)
      }
      if (!c) {
        var h = b(L({
          type: a.type,
          item: "d.data",
          index: "friend" === a.type ? "data.groupIndex" : null
        })).render({
          data: d
        });
        "friend" === a.type ? (g = g.children("li").eq(a.groupIndex), g.find(".layui-layim-list").append(h), g.find(".layim-count").html(k.friend[a.groupIndex].list.length), g.find(".layim-null")[0] && g.find(".layim-null").remove()) : "group" === a.type && (g.append(h), g.find(".layim-null")[0] && g.find(".layim-null").remove())
      }
    },
    T = function(a) {
      var b = G.find(".layim-list-" + a.type);
      k[a.type] && ("friend" === a.type ? layui.each(k.friend, function(c, d) {
        layui.each(d.list, function(d, e) {
          if (a.id == e.id) return e = b.children("li").eq(c), e.find(".layui-layim-list").children("li"), e.find(".layui-layim-list").children("li").eq(d).remove(), k.friend[c].list.splice(d, 1), e.find(".layim-count").html(k.friend[c].list.length), 0 === k.friend[c].list.length && e.find(".layui-layim-list").html('<li class="layim-null">该分组下已无好友了</li>'), !0
        })
      }) : "group" === a.type && layui.each(k.group, function(c, d) {
        if (a.id == d.id) return b.children("li").eq(c).remove(), k.group.splice(c, 1), 0 === k.group.length && b.html('<li class="layim-null">暂无群组</li>'), !0
      }))
    },
    U = function() {
      var a = c().elem.find(".layim-chat-main"),
        b = a.find("ul"),
        d = b.children(".layim-chat-li");
      20 <= d.length && (d = d.eq(0), d.prev().remove(), b.prev().hasClass("layim-chat-system") || b.before('<div class="layim-chat-system"><span layim-event="chatLog">查看更多记录</span></div>'), d.remove());
      a.scrollTop(a[0].scrollHeight + 1E3)
    },
    W = function() {
      var a = c().textarea,
        b = a.next();
      a.off("keyup").on("keyup", function(c) {
        13 === c.keyCode && (c.preventDefault(), l());
        b["" === a.val() ? "addClass" : "removeClass"]("layui-disabled")
      })
    },
    X = function() {
      var a = {};
      return layui.each("[微笑] [嘻嘻] [哈哈] [可爱] [可怜] [挖鼻] [吃惊] [害羞] [挤眼] [闭嘴] [鄙视] [爱你] [泪] [偷笑] [亲亲] [生病] [太开心] [白眼] [右哼哼] [左哼哼] [嘘] [衰] [委屈] [吐] [哈欠] [抱抱] [怒] [疑问] [馋嘴] [拜拜] [思考] [汗] [困] [睡] [钱] [失望] [酷] [色] [哼] [鼓掌] [晕] [悲伤] [抓狂] [黑线] [阴险] [怒骂] [互粉] [心] [伤心] [猪头] [熊猫] [兔子] [ok] [耶] [good] [NO] [赞] [来] [弱] [草泥马] [神马] [囧] [浮云] [给力] [围观] [威武] [奥特曼] [礼物] [钟] [话筒] [蜡烛] [蛋糕]".split(" "), function(b, c) {
        a[c] = layui.cache.dir + "images/face/" + b + ".gif"
      }), a
    }(),
    t = layui.stope,
    R = function(a, b, c) {
      var d, e = a.value;
      c || a.focus();
      document.selection ? (d = document.selection.createRange(), document.selection.empty(), d.text = b) : (d = [e.substring(0, a.selectionStart), b, e.substr(a.selectionEnd)], c || a.focus(), a.value = d.join(""))
    },
    M = {
      chat: function(a) {
        var b = layui.data("layim-mobile")[k.mine.id] || {},
          c = a.data("type"),
          d = a.data("index");
        a = a.attr("data-list") || a.index();
        var e = {};
        "friend" === c ? e = k[c][d].list[a] : "group" === c ? e = k[c][a] : "history" === c && (e = (b.history || {})[d] || {});
        e.name = e.name || e.username || e.groupname;
        "history" !== c && (e.type = c);
        B(e, !0);
        g(".layim-" + e.type + e.id).find(".layim-msg-status").removeClass("layui-show")
      },
      spread: function(a) {
        var b = a.attr("lay-type"),
          c = "true" === b ? "false" : "true",
          d = layui.data("layim-mobile")[k.mine.id] || {};
        a.next()["true" === b ? "removeClass" : "addClass"]("layui-show");
        d["spread" + a.parent().index()] = c;
        layui.data("layim-mobile", {
          key: k.mine.id,
          value: d
        });
        a.attr("lay-type", c);
        a.find(".layui-icon").html("true" === c ? "&#xe61a;" : "&#xe602;")
      },
      tab: function(a) {
        var b = a.index();
        a.addClass("layim-this").siblings().removeClass("layim-this");
        G.find(".layim-tab-content").eq(b).addClass("layui-show").siblings(".layim-tab-content").removeClass("layui-show")
      },
      back: function(a) {
        var b = a.parents(".layui-m-layer").eq(0),
          c = b.attr("index");
        setTimeout(function() {
          e.close(c)
        }, 300);
        a.parents(".layim-panel").eq(0).removeClass("layui-m-anim-left").addClass("layui-m-anim-rout");
        b.prev().find(".layim-panel").eq(0).removeClass("layui-m-anim-lout").addClass("layui-m-anim-right");
        layui.each(p.back, function(a, b) {
          setTimeout(function() {
            b && b()
          }, 200)
        })
      },
      send: function() {
        l()
      },
      face: function(a, b) {
        var d = "",
          h = c().textarea;
        layui.each(X, function(a, b) {
          d += '<li title="' + a + '"><img src="' + b + '"></li>'
        });
        d = '<ul class="layui-layim-face">' + d + "</ul>";
        e.popBottom({
          content: d,
          success: function(a) {
            a = g(a).find(".layui-layim-face").children("li");
            m(a, function() {
              return R(h[0], "face" + this.title + " ", !0), h.next()["" === h.val() ? "addClass" : "removeClass"]("layui-disabled"), !1
            })
          }
        });
        a = g(document);
        C ? a.off("touchend", M.faceHide).on("touchend", M.faceHide) : a.off("click", M.faceHide).on("click", M.faceHide);
        t(b)
      },
      faceHide: function() {
        e.close(e.popBottom.index);
        g(document).off("touchend", M.faceHide).off("click", M.faceHide)
      },
      image: function(a) {
        var b = a.data("type") || "images",
          d = c(),
          g = k.base[{
            images: "uploadImage",
            file: "uploadFile"
          }[b]] || {};
        w({
          url: g.url || "",
          method: g.type,
          elem: a.find("input")[0],
          unwrap: !0,
          type: b,
          success: function(a) {
            0 == a.code ? (a.data = a.data || {}, "images" === b ? R(d.textarea[0], "img[" + (a.data.src || "") + "]") : "file" === b && R(d.textarea[0], "file(" + (a.data.src || "") + ")[" + (a.data.name || "下载文件") + "]"), l()) : e.msg(a.msg || "上传失败")
          }
        })
      },
      extend: function(a) {
        var b = a.attr("lay-filter"),
          d = c();
        layui.each(p["tool(" + b + ")"], function(b, c) {
          c && c.call(a, function(a) {
            R(d.textarea[0], a)
          }, l, d)
        })
      },
      newFriend: function() {
        layui.each(p.newFriend, function(a, b) {
          b && b()
        })
      },
      group: function() {
        P({
          title: "群聊",
          tpl: ['<div class="layui-layim-list layim-list-group">', L({
            type: "group",
            item: "d.group"
          }), "</div>"].join(""),
          data: {}
        })
      },
      detail: function() {
        var a = c();
        layui.each(p.detail, function(b, c) {
          c && c(a.data)
        })
      },
      playAudio: function(a) {
        var b = a.data("audio"),
          c = b || document.createElement("audio"),
          d = function() {
            c.pause();
            a.removeAttr("status");
            a.find("i").html("&#xe652;")
          };
        return a.data("error") ? e.msg("播放音频源异常") : c.play ? void(a.attr("status") ? d() : (b || (c.src = a.data("src")), c.play(), a.attr("status", "pause"), a.data("audio", c), a.find("i").html("&#xe651;"), c.onended = function() {
          d()
        }, c.onerror = function() {
          e.msg("播放音频源异常");
          a.data("error", !0);
          d()
        })) : e.msg("您的浏览器不支持audio")
      },
      playVideo: function(a) {
        a = a.data("src");
        return document.createElement("video").play ? (e.close(M.playVideo.index), void(M.playVideo.index = e.open({
          type: 1,
          anim: !1,
          style: "width: 100%; height: 50%;",
          content: '<div style="background-color: #000; height: 100%;"><video style="position: absolute; width: 100%; height: 100%;" src="' + a + '" autoplay="autoplay"></video></div>'
        }))) : e.msg("您的浏览器不支持video")
      },
      chatLog: function(a) {
        var b = c();
        layui.each(p.chatlog, function(a, c) {
          c && c(b.data, b.elem.find(".layim-chat-main>ul"))
        })
      },
      moreList: function(a) {
        var b = a.attr("lay-filter");
        layui.each(p.moreList, function(a, c) {
          c && c({
            alias: b
          })
        })
      },
      about: function() {
       
      }
    };
  z("layim-mobile", new n)
}).addcss("modules/layim/layim.css?v=2.10", "skinlayim-mobilecss");
layui["layui.mobile"] || layui.config({
  base: layui.cache.dir + "lay/modules/mobile/"
}).extend({
  "layer-mobile": "layer-mobile",
  zepto: "zepto",
  "upload-mobile": "upload-mobile",
  "layim-mobile": "layim-mobile"
});
layui.define(["layer-mobile", "zepto", "layim-mobile"], function(z) {
  z("mobile", {
    layer: layui["layer-mobile"],
    layim: layui["layim-mobile"]
  })
});