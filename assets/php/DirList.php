<?php
    $dir = opendir('/XAMPP/htdocs/MiniTerminalLinux');

    while(($entry = readdir($dir)) != FALSE){
        if($entry != '.' && $entry != '..'){
            $typeFile =  '/XAMPP/htdocs/MiniTerminalLinux/' . $entry;

            if(is_dir($typeFile))
                echo "<span style='color:mediumslateblue'>" . $entry ."<span><br/>";
            else
                echo "<span style='color:white'>" . $entry ."<span><br/>";
        }

    }
?>