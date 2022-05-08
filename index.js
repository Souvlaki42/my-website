// https://www.facebook.com/sharer.php?u=[post-url]
// https://twitter.com/share?url=[post-url]&text=[post-title]
// https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&is_video=[is_video]&description=[post-title]
// https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]
// https://reddit.com/submit?url=[post-url]&title=[post-title]

const fshare = document.querySelector("#fshare");
const tshare = document.querySelector("#tshare");
const pshare = document.querySelector("#pshare");
const lshare = document.querySelector("#lshare");
const rshare = document.querySelector("#rshare");


$(document).ready(function(){
    $(".filter-item").click(function(){
        const value = $(this).attr("data-filter");
        if (value == "all") {
            $(".post-box").show();
        }
        else{
            $(".post-box").not("." + value).hide();
            $(".post-box").filter("." + value).show();
        }
    });
    $(".filter-item").click(function(){
        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
});

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle("shadow", window.scrollY > 0);
});

function shareInit(){
    let postUrl = encodeURI(document.location.href);
    let postTitle = encodeURI("Hi everyone, please check this out: ");
    let postImg = encodeURI(document.querySelector(".header-img").src);

    fshare.setAttribute("href",`https://www.facebook.com/sharer.php?u=${postUrl}`);
    tshare.setAttribute("href", `https://twitter.com/share?url=${postUrl}&text=${postTitle}`);
    pshare.setAttribute("href", `https://pinterest.com/pin/create/bookmarklet/?media=${postImg}&url=${postUrl}&description=${postTitle}`);
    lshare.setAttribute("href", `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`);
    rshare.setAttribute("href", `https://reddit.com/submit?url=${postUrl}&title=${postTitle}`);
}

shareInit();