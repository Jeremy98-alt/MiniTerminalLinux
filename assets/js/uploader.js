(function(){

    //open a new uploadFileToServer - this is the an icon menu
    $(".app-icon-file").on("click", function(){
        $(".uploadFileToServer").css("display", "block");
        $(".app-icon-file").css("background-color","white");
    });

    //open a new uploadFileToServer - this is the icon on the desktop
    $(".icon-server").on("click", function(){
        $(".uploadFileToServer").css("display", "block");
        $(".app-icon-file").css("background-color","white");
    });

    //new send file
    $(".visualizedFile").on("submit", function(e) {
        e.preventDefault();
        const newLocal = './assets/php/UploadFile.php';
        $.ajax({
            type:'POST',
            url: newLocal,
            cache: false,
            data: new FormData(this),
            contentType: false,
            processData: false,
            /*xhr: function() {
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload) myXhr.upload.addEventListener('.loadValue', progress, false);
                return myXhr;
            },*/
            beforeSend: function(){
                $(".loadValue").width("2px");
                $(".status_bar").html("File Uploaded!");
            },
            success: function (response) {
                for(var increment=2; increment < 353; increment++)
                    $(".loadValue").width(`${increment}px`);
                $(".loadValue").text(`100%`);
                $(".contentUpload").append(`<div class="success">${response}</div>`);
            },
            error: function ()
            {
                $(".status_bar").html("File NOT Uploaded!");
                console.log(XMLHttpRequest);
            }
        });    
    });

    //this is an anonymous function that make draggable the uploadFileToServer with handle the bar menu
    $( function() {
        $( ".uploadFileToServer" ).draggable({handle:".bar"});
        
        $(".uploadFileToServer").addClass("overWindow");
        if($(".terminal").hasClass("overWindow"))
            $(".terminal").removeClass("overWindow");
    } );

    //this is an anonymous function that make draggable the icon uploadFileToServer on the desktop
    $( function() {
        $( ".icon-server" ).draggable();
    } );

})();