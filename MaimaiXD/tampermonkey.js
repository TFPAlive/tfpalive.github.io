// ==UserScript==
// @name         Maimai XD for JP
// @namespace    http://tampermonkey.net/
// @version      2024-06-10
// @description  Make your Maimai DX NET suits to your liking
// @author       魔風茅野
// @match        https://maimaidx.jp/maimai-mobile/*
// @match        https://maimaidx-eng.com/maimai-mobile/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=maimaidx.jp
// @grant        none
// ==/UserScript==
var footer = document.querySelector('body > div.wrapper.main_wrapper.t_c > footer'),
    container = document.querySelector("body > div.wrapper.main_wrapper.t_c > div.container.p_10"),
    friends = document.querySelector("body > div.wrapper.main_wrapper.t_c > div:nth-child(3) > img"),
    main = document.querySelector('body > div.wrapper.main_wrapper.t_c > div.see_through_block.m_15.m_t_10.p_10.p_r.t_l.f_0'),
    picture = document.querySelector('body > div.wrapper.main_wrapper.t_c > div.see_through_block.m_15.m_t_10.p_10.p_r.t_l.f_0 > img'),
    table = document.querySelector('body > div.wrapper.main_wrapper.t_c > div.gray_block.m_10.m_t_0.p_b_5.f_0 > div:nth-child(4) > table'),
    link = document.querySelector('body > div.wrapper.main_wrapper.t_c > div.see_through_block.m_15.m_t_10.p_10.p_r.t_l.f_0 > div.comment_block.break.f_l.f_12'),
    comment = document.querySelector('body > div.wrapper.main_wrapper.t_c > div.see_through_block.m_15.m_t_10.p_10.p_r.t_l.f_0 > div.comment_block.break.f_l.f_12'),
    rating = document.querySelector("body > div.wrapper.main_wrapper.t_c > div.see_through_block.m_15.m_t_10.p_10.p_r.t_l.f_0 > div.basic_block.p_10.f_0 > div.p_l_10.f_l > div.m_b_5 > div.f_r.t_r.f_0 > div > div"),
    icon = [document.querySelector('body > div.wrapper.main_wrapper.t_c > div.see_through_block.m_15.m_t_10.p_10.p_r.t_l.f_0 > div.basic_block.p_10.f_0 > img'), document.querySelector('body > div.wrapper.main_wrapper.t_c > div.see_through_block.m_15.m_t_0.p_10.p_r.t_l.f_0 > div.basic_block.p_10.f_0 > img')],
    name = [document.querySelector('body > div.wrapper.main_wrapper.t_c > div.see_through_block.m_15.m_t_10.p_10.p_r.t_l.f_0 > div.basic_block.p_10.f_0 > div.p_l_10.f_l > div.m_b_5 > div.name_block.f_l.f_16'), document.querySelector('body > div.wrapper.main_wrapper.t_c > div.see_through_block.m_15.m_t_0.p_10.p_r.t_l.f_0 > div.basic_block.p_10.f_0 > div.p_l_10.f_l > div.m_b_5 > div.name_block.f_l.f_16')];

if (picture) {
    picture.src = 'https://tfpalive.github.io/images/imgs/Namiel_Org.png';
}

if (table) {
    var table_executed = false;
    table.addEventListener('click', () => {
        if (['maimaidx-eng.com', 'maimaidx.jp'].indexOf(document.location.host) >= 0 && (document.location.pathname.indexOf('/maimai-mobile/record/playlogDetail') >= 0) && !table_executed) {
            document.body.appendChild(document.createElement('script')).src = 'https://spiritsunite.github.io/maimai-score-details/score-details.js';
            table_executed = true;
        }
    });
}
if (friends) {
    var friends_executed = false;
    friends.addEventListener('click', () => {
        if (['https://maimaidx.jp', 'https://maimaidx-eng.com'].indexOf(document.location.origin) >= 0 && !friends_executed) {
            document.body.appendChild(document.createElement("script")).src = 'https://myjian.github.io/mai-tools/scripts/all-in-one.js?t=' + Math.floor(Date.now() / 60000);
            friends_executed = true;
        }
    });
}
if (container) {
    container.remove();
    main.insertBefore(comment, main.childNodes[2]);
    comment.innerHTML = '<h3 class="rainbow">Yuri là một nền văn minh tốt</h3>';
}
if (link) {
    link.classList.add('rainbow');
}
if (rating) {
    var rolling = rating.innerHTML;
    rating.innerHTML = '';
}
if (footer) {
    footer.innerHTML = '';
}
for (let i = 0; i < icon.length; i++) {
    if (icon[i]) {
        var icon_executed = false;
        icon[i].src = 'https://tfpalive.github.io/images/icons/Chinatsu/UI_Card_Icon_101883.png';
        icon[i].addEventListener('click', () => {
            if (['https://maimaidx.jp', 'https://maimaidx-eng.com'].indexOf(document.location.origin) >= 0 && !icon_executed) {
                document.body.appendChild(document.createElement("script")).src = 'https://myjian.github.io/mai-tools/scripts/all-in-one.js?t=' + Math.floor(Date.now() / 60000);
                icon_executed = true;
            }
        });
    }
}
for (let i = 0; i < name.length; i++) {
    if (name[i]) {
        name[i].innerHTML = 'Ｃ３☆魔風茅野';
    }
}
if (document.URL == 'https://maimaidx.jp/maimai-mobile/home/' || document.URL == 'https://maimaidx-eng.com/maimai-mobile/home/') {
    let head = document.getElementsByTagName('HEAD')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    head.appendChild(style);
    style.innerHTML = `
.rainbow {
    text-align: center;
    font-size: 24px;
    font-family: var(--font-family);
    background: linear-gradient(to right, #6666ff, #0099ff , #00ff00, #ff3399, #6666ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: rainbow_animation 6s ease-in-out infinite;
    background-size: 400% 100%;
}

@keyframes rainbow_animation {
    0%,100% {
        background-position: 0 0;
    }
    50% {
        background-position: 100% 0;
    }
}

@property --num {
  syntax: "<integer>";
  initial-value: ${rolling};
  inherits: false;
}

@keyframes counter {
  from {
    --num: 0;
  }
  to {
    --num: ${rolling};
  }
}
div.rating_block {
  animation: counter 5s cubic-bezier(0.8, 0, 0, 0.8);
  counter-reset: num var(--num);
}

div.rating_block::after {
  content: counter(num);
}`;
};