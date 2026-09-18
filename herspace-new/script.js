function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function openDrawer() {
    document.getElementById('drawer').classList.add('open');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('no-scroll');
}

function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('no-scroll');
}

function openDonate() {
    document.getElementById('donateOverlay').classList.add('show');
    document.body.classList.add('no-scroll');
}

function closeDonate() {
    document.getElementById('donateOverlay').classList.remove('show');
    document.body.classList.remove('no-scroll');
}

function openVolunteer() {
    document.getElementById('volunteerOverlay').classList.add('show');
    document.body.classList.add('no-scroll');
}

function closeVolunteer() {
    document.getElementById('volunteerOverlay').classList.remove('show');
    document.body.classList.remove('no-scroll');
}

function openApply(role) {
    document.getElementById('applyRoleText').textContent = role;
    document.getElementById('applyOverlay').classList.add('show');
    document.body.classList.add('no-scroll');
}

function closeApply() {
    document.getElementById('applyOverlay').classList.remove('show');
    document.body.classList.remove('no-scroll');
}

function selectAmount(btn) {
    document.querySelectorAll('.amount-grid button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function toggleLang() {
    const label = document.getElementById('langLabel');
    label.textContent = label.textContent === 'اردو / English' ? 'English / اردو' : 'اردو / English';
}

function openAdmin() {
    alert('Admin Dashboard coming soon!');
}

const blogsData = [
    {
        title: "Developing Confident and Successful Learners",
        img: "assets/img_027.jpg",
        body: "<p>True academic success begins with a secure and supportive foundation. By grounding our educational spaces in fundamental values like dignity and mutual respect, we empower students to confidently embrace challenges and reach their full potential.</p><p>Through HerSpace's youth-led workshops, participants are encouraged to voice their ideas, question assumptions, and take ownership of their learning journey. This sense of agency builds not just academic confidence but also the courage to advocate for themselves and their communities.</p><p>When young people feel safe, seen, and supported, they don't just succeed in the classroom — they carry that confidence into every space they enter next.</p>"
    },
    {
        title: "Enjoy Learning with a Unique Classroom Experience",
        img: "assets/img_028.jpg",
        body: "<p>Education is most effective when it is dynamic and collaborative. Our unique classroom model moves beyond traditional lectures to create an engaging, inclusive environment where diverse perspectives drive meaningful learning.</p><p>HerSpace facilitators use participatory tools — group discussions, role play, and community mapping — to help young people connect abstract ideas about gender justice and climate action to their own lived experience.</p><p>The result is a classroom that feels less like a lecture hall and more like a movement space: one where every voice has room to be heard.</p>"
    },
    {
        title: "Passionate Teachers That Make a Difference",
        img: "assets/img_029.jpg",
        body: "<p>Our educators are dedicated mentors who look beyond the standard curricula. Whether conducting lessons in the classroom or facilitating open-air discussions, they are committed to supporting individual growth and inspiring lifelong curiosity.</p><p>Many of HerSpace's facilitators are themselves young leaders who have come up through our programs — meaning the mentorship students receive comes from people who have walked a similar path.</p><p>That shared experience builds trust quickly, and trust is often the first ingredient young people need before they're willing to speak up, take risks, and lead.</p>"
    }
];

function openBlog(idx) {
    const b = blogsData[idx];
    document.getElementById('blogModalImg').src = b.img;
    document.getElementById('blogModalImgBg').src = b.img;
    document.getElementById('blogModalTitle').textContent = b.title;
    document.getElementById('blogModalBody').innerHTML = b.body;
    document.getElementById('blogOverlay').classList.add('show');
    document.body.classList.add('no-scroll');
}

function closeBlog() {
    document.getElementById('blogOverlay').classList.remove('show');
    document.body.classList.remove('no-scroll');
}
// ================= STICKY SCROLL TEXT (TEXT ONLY) =================
// As the user scrolls a section (About Us, Our Approach, Blogs) through the
// viewport, the text block is continuously shifted upward while the image
// next to it is left completely untouched -- giving the effect of the
// image staying put while its text moves up past it. Layout, spacing,
// images, and content are not changed by this.
//
// This only runs above the 800px breakpoint, where these sections lay out
// image/text side-by-side. Below that the sections stack vertically (see
// style.css), and shifting text there would overlap the image/other
// content, so the effect is switched off and any transform is cleared.
function initStickyScrollText() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = Array.prototype.map.call(document.querySelectorAll(".reveal-text"), function (el) {
        var container = el.closest(".blog-row") || el.closest("section") || el.parentElement;
        return { el: el, container: container };
    }).filter(function (item) { return item.container; });

    if (!items.length) return;

    var mq = window.matchMedia("(min-width: 801px)");
    var ticking = false;
    var RANGE = 60; // px of upward travel, subtle and non-destructive

    function clear() {
        items.forEach(function (item) {
            item.el.style.transform = "";
        });
    }

    function update() {
        if (reduceMotion || !mq.matches) {
            clear();
            ticking = false;
            return;
        }
        var vh = window.innerHeight;
        items.forEach(function (item) {
            var rect = item.container.getBoundingClientRect();
            var total = vh + rect.height;
            var progress = (vh - rect.top) / total;
            progress = Math.min(1, Math.max(0, progress));
            var shift = (0.5 - progress) * (RANGE * 2);
            item.el.style.transform = "translateY(" + shift.toFixed(1) + "px)";
        });
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
}

document.addEventListener("DOMContentLoaded", initStickyScrollText);
