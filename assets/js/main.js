(function() {

    var commandList = {
        help: "undefined",
        ls: "<span class='changeColorIndexHelp'>ls</span> - verify the list in your actual path",
        history: "<span class='changeColorIndexHelp'>history</span> - see the history commands",
        cls: "<span class='changeColorIndexHelp'>cls</span> - clear all content terminal",
        pwd: "<span class='changeColorIndexHelp'>pwd</span> - display the path where are you at the moment",
        op: "<span class='changeColorIndexHelp'>op</span> - make an operation",
        upload: "<span class='changeColorIndexHelp'>upload</span> - load a file in your local server",
        call: "<span class='changeColorIndexHelp'>call</span> - digits a number of phone",
        echo: "<span class='changeColorIndexHelp'>echo</span> - reply your input"
    };

    var commandHistory = [];
    var indexHistory = 0;

    //open a new terminal --> WARNING SYSTEM IT WITH onStart e onEnd
    $(".app-icon-terminal").on("click", function(){
        $(".terminal").css("display", "block");
        $(".app-icon-terminal").css("background-color","white");
    });

    //open a new send files
    $(".app-icon-file").on("click", function(){
        $(".uploadFileToServer").css("display", "block");
        $(".app-icon-file").css("background-color","white");
    });

    //open terminal through icon-terminal
    $(".icon-terminal").on("click", function(){
        $(".terminal").css("display", "block");
        $(".app-icon-terminal").css("background-color","white");
    });

    //open a new send files through icon-server
    $(".icon-server").on("click", function(){
        $(".uploadFileToServer").css("display", "block");
        $(".app-icon-file").css("background-color","white");
    });

    $(".yellow").on("click", function (event){
        console.log("Ciao");
    });

    $(".green").on("click", function(){
        var $terminal = $(".terminal");
        var attr = $terminal.hasClass("maximaze");

        if(!attr){
            $terminal.addClass("maximaze");
            $(".contentTerminal").css({"background-color":"black", "z-index":999});
        }
        else{
            $terminal.removeClass("maximaze");
            $(".contentTerminal").css("background-color","");
        }
    });

    $(".red").click(function () {
        var opened = $(this).parents(".window").fadeOut("slow", function () { 

        });

        $(".app-icon-terminal").css("background-color","");
    });

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

    function execOp($command) { 
        const newLocal = './assets/php/DoExpression.php';
        $.ajax({
            url: newLocal,
            data: {
                'first_num': $command[1],
                'operation': $command[2],
                'second_num': $command[3]
            },
            success: function (response, _status, XMLHttpRequest) {
                var $contentTerminal = $(".contentTerminal");

                $contentTerminal.append("<div class='getInfo ml-60'>Il risultato di: " + $command[1] + " " + $command[2] + " " + $command[3] + " è " + response + "</div>");
                $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");
            },
            error: function (XMLHttpRequest)
            {
                var $contentTerminal = $(".contentTerminal");

                $contentTerminal.append("<div class='getInfo ml-60'>Errore..</div>");
                $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");
                console.log(XMLHttpRequest);
            }
        });    
    }

    function execList(){
        /*working in progress*/
    }

    function execEcho($command){
        var InputList ="";
        $command.shift();
        for(var input of $command)
            InputList = InputList.concat(`${input} `);

        var $contentTerminal = $(".contentTerminal");
        $contentTerminal.append(`<div class='getInfo ml-60'>${InputList}</div>`);
        $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");
    }

    function execCall($command){
        var PhoneNumber = $command[1];
        console.log(PhoneNumber); /*Working in progress*/ 

        var $contentTerminal = $(".contentTerminal");
        $contentTerminal.append(`<div class='getInfo ml-60'>you cannot call a phone number <b>stoopid</b></div>`);
        $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");
    }

    function execPwd(){
        var loc = window.location.pathname;

        var $contentTerminal = $(".contentTerminal");

        $contentTerminal.append(`<div class='getInfo ml-60'>${loc}</div>`);
        $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");

    }

    function execHelp(){
        var $contentTerminal = $(".contentTerminal");
        
        $contentTerminal.append("<div class='getInfo ml-60'>There's the possibility to apply an autocomplete command with 'space' command</div>");
        
        for(var command in commandList){
            if(command != "help"){
                $contentTerminal.append(`<div class='getInfo ml-60'>&#9679; ${commandList[command]} </div>`);
            }    
        }

        $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");
    }

    function execCls(){
        var $contentTerminal = $(".contentTerminal");
        $contentTerminal.html("");
        $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");
    }

    function execHistory(){
        var $contentTerminal = $(".contentTerminal");
        
        commandHistory.forEach(function (command,index){
            $contentTerminal.append(`<div class='getInfo ml-60'>${index}. ${command}</div>`);
        });

        $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");
    
    }

    function errorCommand($command){
        var $contentTerminal = $(".contentTerminal");
        $contentTerminal.append(`<div class='getInfo ml-60'>the command '${$command}' isn't a function</div>`);
        $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");
    }

    function controlCommand($command){
        commandHistory.push($command);
        indexHistory=commandHistory.length;

        $command = $command.toLowerCase().split(' ');

        var flg = 0;
        for(var com in commandList){
            if(com == $command[0])
                flg = 1;
        }

        if(flg==0){
            errorCommand($command);
        }
        else {
            switch($command[0]){
                case "help":
                    execHelp();
                    break;
                case "cls":
                    execCls();
                    break;
                case "history":
                    execHistory();
                    break;
                case "pwd":
                    execPwd();
                    break;
                case "ls": //work
                    execList();
                    break;
                case "op":
                    execOp($command);
                    break;
                case "upload":
                    execUpload();
                    break;
                case "call":
                    execCall($command);
                    break;
                case "echo":
                    execEcho($command);
                    break;
            }
        }
    }

    //recommended commands - system it!
    document.addEventListener("keypress", function(event){
            var $hypoteticalCommand = $(".boxInput").last().val();
            
            if(event.which == 32) /*change this ascii code with another code..like ctrl!*/
                for(var command in commandList)
                    if(!command.search($hypoteticalCommand))
                        $(".boxInput").last().val(command);
    });

    document.addEventListener("keydown", function(event) {
        if(event.which == 13){
            let $command;
            $command = $(".boxInput").last().val();
            controlCommand($command);
        }

        if(event.which == 38){ //up arrow
            let $input;
            console.log(indexHistory);
            if(indexHistory > 0)
                indexHistory-=1;
            else
                indexHistory=0;
            $(".boxInput").last().val(commandHistory[indexHistory]);
        }

        if(event.which == 40){ //down arrow
            let $input;
            console.log(indexHistory);
            if(indexHistory < commandHistory.length)
                indexHistory+=1;
            else
                indexHistory=commandHistory.length;
            $(".boxInput").last().val(commandHistory[indexHistory]);
        }

        $(".pathname").text("~"+location.pathname);
        $(".boxInput").last().trigger("focus");
    });

    //drag and drop the terminal & server
    $( function() {
        $( ".terminal" ).draggable({handle:".bar"});
        
        $(".terminal").addClass("overWindow");
        if($(".uploadFileToServer").hasClass("overWindow"))
            $(".uploadFileToServer").removeClass("overWindow");

    } );

    $( function() {
        $( ".uploadFileToServer" ).draggable({handle:".bar"});
        
        $(".uploadFileToServer").addClass("overWindow");
        if($(".terminal").hasClass("overWindow"))
            $(".terminal").removeClass("overWindow");
    } );

    //drag and drop the icons
    $( function() {
        $( ".icon-terminal" ).draggable();
    } );

    $( function() {
        $( ".icon-server" ).draggable();
    } );

    //change pathname
    $(".pathname").text("~"+location.pathname);

    //pre-clicked input
    $(".boxInput").last().trigger("focus");
})();