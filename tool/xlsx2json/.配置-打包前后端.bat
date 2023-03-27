@echo off
@del ..\..\assets\resources\config\config.bin
@zip\7z.exe a -tzip ..\..\assets\resources\config\config.bin .\client\*
echo 前端打包完毕

rem xcopy .\server ..\..\H5Res\LogicServer\data\config /s /Y 

if errorlevel 4 goto lowmemory
if errorlevel 2 goto abort
if errorlevel 0 goto exit

:lowmemory
echo 内存不足 或者 无效命令。
goto exit 


:abort 
echo 按CTRL+C结束程序。
goto exit 


:exit 
echo 退出程序


pause