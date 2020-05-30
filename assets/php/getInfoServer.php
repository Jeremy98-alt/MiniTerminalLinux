<?php
    /*
        to instance the COM Object you should insert in php.in next [com] this instruction:
            [COM_DOT_NET]
            extension=php_com_dotnet.dll
    */

    function convert($size)
    {
        $unit=array('B','KB','MB','GB','TB','PB');
        return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
    }

    function get_server_cpu_usage(){
        $load=0;
        if (stristr(PHP_OS, 'win')) 
        {
            $wmi = new COM("Winmgmts://");
            $server = $wmi->execquery("SELECT LoadPercentage FROM Win32_Processor");  
            $cpu_num = 0;
            $load_total = 0;
            foreach($server as $cpu)
            {
                $cpu_num++;
                $load_total += $cpu->loadpercentage;
            }
    
            $load= round($load_total/$cpu_num);
    
        } 
        else
        {
            $load = sys_getloadavg();
        }
        return $load;
    }

    function get_server_disk_usage() {
        $disktotal = disk_total_space ('/');
        $diskfree  = disk_free_space  ('/');
        $diskuse   = round (100 - (($diskfree / $disktotal) * 100)) .'%';
        
        return $diskuse;  
    }

    function get_server_ram_usage() {
        $wmi = new COM('WinMgmts:root/cimv2');
        $res = $wmi->ExecQuery('Select TotalPhysicalMemory from Win32_ComputerSystem');

        $system = $res->ItemIndex(0);

        printf(
            '<br> RAM Memory usage: %d MB', $system->TotalPhysicalMemory / 1024 /1024
        );
    }

    function total_lastinfo_COM(){
        $obj = new COM ( 'winmgmts://localhost/root/CIMV2' );
        $fso = new COM ( "Scripting.FileSystemObject" );    
        $wmi_computersystem    =    $obj->ExecQuery("Select * from Win32_ComputerSystem");
        $wmi_bios              =    $obj->ExecQuery("Select * from Win32_BIOS");
        $processor             =    $obj->ExecQuery("Select * from Win32_Processor");
        $LogicalDisk           =    $obj->ExecQuery("Select * from Win32_LogicalDisk");
    
        foreach ( $wmi_computersystem as $wmi_call )
        {
            $model = $wmi_call->Model;
        }
    
        foreach ( $wmi_bios as $wmi_call )
        {
            $serial = $wmi_call->SerialNumber;
            $bios_version = $wmi_call->SMBIOSBIOSVersion;
        }
    
        foreach ( $processor as $wmi_processor )
        {
            $idprocessor = $wmi_processor->ProcessorId;
            $Architecture = $wmi_processor->Architecture;
        }
    
        foreach ( $LogicalDisk as $wmi_LogicalDisk )
        {
            $SerialNumberDisk = $wmi_LogicalDisk->VolumeSerialNumber;
            $FileSystem = $wmi_LogicalDisk->FileSystem;
    
        }
    
        echo "<br>Bios version: ".$bios_version."<br/>
              Serial number of bios: ".$serial."<br/>
              Hardware Model: ".$model."<br/>
              ID-Processor: ".$idprocessor."<br/>
              Architecture-Processor: ".$Architecture."<br/>
              Disk SerialNumber: ".$SerialNumberDisk."<br/>
              FileSystem disk: ".$FileSystem."<br>
              ";
    }

    echo 'Memory allocate for Php server: ' . convert(memory_get_usage(true));
    echo '<br> CPU Server usage: ' . get_server_cpu_usage() . '%';
    echo '<br> Disk Server usage: ' . get_server_disk_usage();
    echo '<br> Php version in this server: ' . phpversion();
    echo get_server_ram_usage();
    echo total_lastinfo_COM();
?>