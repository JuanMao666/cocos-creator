@echo off
@del ..\..\assets\resources\config\config.bin
@zip\7z.exe a -tzip ..\..\assets\resources\config\config.bin .\client\*
echo ǰ�˴�����

rem xcopy .\server ..\..\H5Res\LogicServer\data\config /s /Y 

if errorlevel 4 goto lowmemory
if errorlevel 2 goto abort
if errorlevel 0 goto exit

:lowmemory
echo �ڴ治�� ���� ��Ч���
goto exit 


:abort 
echo ��CTRL+C��������
goto exit 


:exit 
echo �˳�����


pause