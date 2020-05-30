(function(){

    /*
        These are commond function implemented for the bar menu for 
        each program on my desktop
    */
    $(".yellow").on("click", function (event){
        console.log("Ciao");
    });

    $(".green").on("click", function(){
        var a = $(this).parents(".window");
        var sub = a.children(".subwindow");
        
        var $obj;
        var $child;

        a.hasClass("terminal") ? $obj = $(".terminal") : "";
        a.hasClass("uploadFileToServer") ? $obj = $(".uploadFileToServer") : "";
        a.hasClass("infoServer") ? $obj = $(".infoServer") : "";

        sub.hasClass("contentTerminal") ? $child = $(".contentTerminal") : "";
        sub.hasClass("contentUpload") ? $child = $(".contentUpload") : "";
        sub.hasClass("contentInfoServer") ? $child = $(".contentInfoServer") : "";

        var attr = $obj.hasClass("maximaze");
        if(!attr){
            $obj.addClass("maximaze");
            $child.css({"background-color":"black", "z-index":999});
        }
        else{
            $obj.removeClass("maximaze");
            $child.css("background-color","");
        }
    });

    $(".red").click(function () {
        var a = $(this).parents(".window");
        a.hasClass("terminal") ? $(".app-icon-terminal").css("background-color","") : "";
        a.hasClass("uploadFileToServer") ? $(".app-icon-file").css("background-color","") : "";
        a.hasClass("infoServer") ? $(".app-icon-setting").css("background-color","") : "";
        
        var opened = $(this).parents(".window").fadeOut("slow", function () { 
            items = ["terminal","uploadFileToServer","infoServer"];
        });
    });



})();