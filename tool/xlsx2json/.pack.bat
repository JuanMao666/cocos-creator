@echo off
@call .\xlsx2Json.py %1

@call .\xlsx2refresh.py
