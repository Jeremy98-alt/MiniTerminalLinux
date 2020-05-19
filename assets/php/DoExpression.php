<?php
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
      }

    if($_SERVER["REQUEST_METHOD"] == "GET")
        if( !empty($_GET["first_num"]) && !empty($_GET["operation"]) && !empty($_GET["second_num"]) ) {
            $num1 = test_input($_GET["first_num"]);
            $op = test_input($_GET["operation"]);
            $num2 = test_input($_GET["second_num"]);
            
            switch($op){
                case '+':
                    echo $num1+$num2;
                    break;
                case '-':
                    echo $num1-$num2;
                    break;
                case '*':
                    echo $num1*$num2;
                    break;
                case '/':
                    try {
                        echo $num1/$num2;
                    } catch (Exception $e) {
                        echo 'operazione non consentita';
                    };
                    break;
            }
        }
?>