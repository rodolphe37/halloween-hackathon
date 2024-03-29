const mainBoard = "#boxes";

let counter = 0;
let cardOpened = "";
let imageOpened = "";
let imgFound = 0;
let victorimage = false;

const gfxBase = [
    "gfx/icon1b.png",
    "gfx/icon2b.png",
    "gfx/icon3b.png",
    "gfx/icon4b.png",
    "gfx/icon5b.png",
    "gfx/icon6b.png",
    "gfx/icon7b.png",
    "gfx/icon8b.png",
    "gfx/icon9b.png",
    "gfx/icon10b.png"
];

/* preload images */
$(gfxBase).each(function() {
    const image = $('<img />').attr('src', this);
});

/* utils */

function doRandom(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

// put images in random order
function shuffleImgs() {
    
    let allImgs = $(mainBoard).children();
    let thisImg = $(mainBoard + " div:first-child");
    let imgsArr = new Array();
    
    for (let i = 0; i < allImgs.length; i++) {
        imgsArr[i] = $("#" + thisImg.attr("id") + " img").attr("src");
        thisImg = thisImg.next();
    }
    
    thisImg = $(mainBoard + " div:first-child");
    
    for (let z = 0; z < allImgs.length; z++) {
        const rn = doRandom(0, imgsArr.length - 1);
        
        $("#" + thisImg.attr("id") + " img").attr("src", imgsArr[rn]);
        imgsArr.splice(rn, 1);
        thisImg = thisImg.next();
    }
}

/* game elements */

// reset
function startAgain() {
    
    shuffleImgs();
    
    $(mainBoard + " div img").hide();
    $(mainBoard + " div").css("visibility", "visible");
    
    $("#success").remove();
    
    counter = 0;
    $("#counter").html("" + counter);
    
    cardOpened = "";
    imageOpened = "";
    imgFound = 0;
    
    return false;
}

// open card - show an image after user's move (click)
function openCard() {
    
    const id = $(this).attr("id");
    
    if ($("#" + id + " img").is(":hidden")) {
        $(mainBoard + " div").unbind("click", openCard);
        
        $("#" + id + " img").slideDown('fast');
        
        if (imageOpened == "") {
            cardOpened = id;
            imageOpened = $("#" + id + " img").attr("src");
            setTimeout(function() {
                $(mainBoard + " div").bind("click", openCard)
            }, 400);
        } else {
            current = $("#" + id + " img").attr("src");
            
            if (imageOpened != current) {
                setTimeout(function() {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + cardOpened + " img").slideUp('fast');
                    cardOpened = "";
                    imageOpened = "";
                }, 500);
            } else {
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + cardOpened + " img").parent().css("visibility", "hidden");
                imgFound++;
                
                cardOpened = "";
                imageOpened = "";
            }
            setTimeout(function() {
                $(mainBoard + " div").bind("click", openCard)
            }, 500);
        }
        
        counter++;
        $("#counter").html("" + counter);
        
        // finished!
        if (imgFound == gfxBase.length) {
            $("#counter").prepend('<span id="success">Done! With </span>');
            const audio2=document.createElement('audio');
           let first=true;
           window.addEventListener('mouseup',onmouseup);
           function onmouseup(){
           if(!first) return;
           first=false;
           audio2.src="./cri.mp3";
           audio2.play();
           }
            $( ".text-pop-up-top" ).prepend( "<h1>You Win!!!</h1>" );
            
        }
    }
}

// GO!
$(function() {
    
    for (let y = 1; y < 3 ; y++) {
        $.each(gfxBase, function(i, val) {
            $(mainBoard).append("<div id=card" + y + i + "><img src=" + val + " />");
        });
    }
    
    $(mainBoard + " div").click(openCard);
    shuffleImgs();
    
});