(function(){

    //open a new infoServer - this is the an icon menu
    $(".app-icon-setting").on("click", function(){
        $(".infoServer").css("display", "block");
        $(".app-icon-setting").css("background-color","white");

        const newLocal = './assets/php/getInfoServer.php';
        $.ajax({
            url: newLocal,
            success: function (response, _status, XMLHttpRequest) {
                var $contentInfoServer = $(".contentInfoServer");
                $contentInfoServer.append("<p>"+response+"</p>");
            },
            error: function (XMLHttpRequest)
            {
                var $contentInfoServer = $(".contentInfoServer");
                $contentInfoServer.append("Errore..");
                console.log(XMLHttpRequest);
            }
        });
    });

    //open a new infoServer - this is the icon on the desktop
    $(".icon-infoServer").on("click", function(){
        $(".infoServer").css("display", "block");
        $(".app-icon-setting").css("background-color","white");

        const newLocal = './assets/php/getInfoServer.php';
        $.ajax({
            url: newLocal,
            success: function (response, _status, XMLHttpRequest) {
                var $contentInfoServer = $(".contentInfoServer");
                $contentInfoServer.append("<p class='ml-60'>"+response+"</p>");
            },
            error: function (XMLHttpRequest)
            {
                var $contentInfoServer = $(".contentInfoServer");
                $contentInfoServer.append("Errore..");
                console.log(XMLHttpRequest);
            }
        });
    });

    //this is an anonymous function that make draggable the infoServer with handle the bar menu
    $( function() { 
        $( ".infoServer" ).draggable({handle:".bar"});
        
        $(".uploadFileToServer").addClass("overWindow");
        if($(".terminal").hasClass("overWindow"))
            $(".terminal").removeClass("overWindow");
    } );

    //this is an anonymous function that make draggable the icon infoServer on the desktop
    $( function() {
        $( ".icon-infoServer" ).draggable();
    } );

})();