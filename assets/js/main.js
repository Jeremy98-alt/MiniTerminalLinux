(function() {

    var commandList = ["help","ls","history","cls","pwd"];
    var commandHistory = [];
    var indexHistory = 0;

    //open a new terminal
    $(".openTerminal").on("click", function(event){
        $(".terminal").clone().insertAfter(".terminal");
    });

    $(".yellow").on("click", function (event){
        console.log("Ciao"); //make that!
    });

    $(".green").on("click", function(){
        var $terminal = $(".terminal");
    
        $terminal.addClass("maximaze");
    });

    $(".red").click(function () {
        $(".terminal").fadeOut("slow", function () {

        });
    });

    function execList(){
        /*working in progress*/
    }

    function execPwd(){
        var loc = window.location.pathname;

        var $contentTerminal = $(".contentTerminal");

        $contentTerminal.append(`<div class='getInfo ml-60'>${loc}</div>`);
        $contentTerminal.append("<div class='getInput ml-20'><span class='pcname'>jeremy@linux-desktop</span>:<span class='pathname'></span>$<input class='boxInput ml-10'></div>");

    }

    function execHelp(){
        var $contentTerminal = $(".contentTerminal");
        
        commandList.forEach(function (command,index){
            if(index >= 1)
                $contentTerminal.append(`<div class='getInfo ml-60'>- ${command}</div>`);
        });

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

        var flg = 0;
        for(var com of commandList){
            if(com == $command)
                flg = 1;
        }

        if(flg==0){
            errorCommand($command);
        }
        else {
            switch($command){
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
                case "ls":
                    execList();
                    break;
            }
        }
    }

    //recommended commands - system it!
    document.addEventListener("keypress", function(event){
            var $hypoteticalCommand = $(".boxInput").last().val();
            
            if(event.which == 32) /*change this ascii code with another code..like ctrl!*/
                for(var command of commandList)
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

    //drag and drop the terminal
    $( function() {
        $( ".terminal" ).draggable({handle:".bar"});
    } );

    //change pathname
    $(".pathname").text("~"+location.pathname);

    //pre-clicked input
    $(".boxInput").last().trigger("focus");
})();