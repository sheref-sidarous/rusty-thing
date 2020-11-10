
That got me all the way to the state where I see 

```
Rust Hearbeat <3
```

just once .. time to go debugging 

Launchpads comes with TI's debugging, and it is working on openocd.

(few words on openocd.cfg and what I had to do to get it working)

```
$ openocd -f build/ti-cc3200-launchxl.cfg 
Open On-Chip Debugger 0.10.0
Licensed under GNU GPL v2
For bug reports, read
        http://openocd.org/doc/doxygen/bugs.html
adapter speed: 100 kHz
srst_only separate srst_gates_jtag srst_open_drain connect_deassert_srst
Info : CMSIS-DAP: SWD  Supported
Info : CMSIS-DAP: JTAG Supported
Info : CMSIS-DAP: Interface Initialised (JTAG)
Info : CMSIS-DAP: FW Version = 1.2.0
Info : SWCLK/TCK = 1 SWDIO/TMS = 0 TDI = 1 TDO = 0 nTRST = 0 nRESET = 1
Info : CMSIS-DAP: Interface ready
Info : clock speed 100 kHz
Info : cmsis-dap JTAG TLR_RESET
Info : cmsis-dap JTAG TLR_RESET
Info : JTAG tap: cc32xx.jrc tap/device found: 0x0b97c02f (mfg: 0x017 (Texas Instruments), part: 0xb97c, ver: 0x0)
Info : JTAG tap: cc32xx.dap enabled
Info : cc32xx.cpu: hardware has 6 breakpoints, 4 watchpoints
```

here is what I got 

```
$ gdb-multiarch build/mqtt_client.out 
GNU gdb (Ubuntu 8.1-0ubuntu3.2) 8.1.0.20180409-git
Copyright (C) 2018 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
and "show warranty" for details.
This GDB was configured as "x86_64-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
<http://www.gnu.org/software/gdb/documentation/>.
For help, type "help".
Type "apropos word" to search for commands related to "word"...
Reading symbols from build/mqtt_client.out...done.
(gdb) target remote localhost:3333
Remote debugging using localhost:3333
0x00000000 in ?? ()
(gdb) bt
#0  0x00000000 in ?? ()
Backtrace stopped: previous frame identical to this frame (corrupt stack?)
(gdb) 
```

and the matching openocd output
```
Info : accepting 'gdb' connection on tcp/3333
undefined debug reason 7 - target needs reset
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffffffe
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffffffe
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Info : Auto-detected RTOS: FreeRTOS
Error: FreeRTOS: uxTopUsedPriority is not defined, consult the OpenOCD manual for a work-around
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffffffe
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffffffe
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
Error: JTAG-DP STICKY ERROR
Error: Failed to read memory at 0xfffff000
```

I was hoping for an easier to debug condition, like being stuck in an infinite loop. but seems like we hit an expection soon after startup :\

I think I need to establish a better debug setup.