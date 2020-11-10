it seems that rust library includes compiler builtins in it. so depending on how you'd include it in the lib link order, it cause this error.

```
/opt/gcc-arm-none-eabi-9-2020-q2-update/bin/../lib/gcc/arm-none-eabi/9.3.1/../../../../arm-none-eabi/bin/ld: /opt/gcc-arm-none-eabi-9-2020-q2-update/bin/../lib/gcc/arm-none-eabi/9.3.1/thumb/v7e-m/nofp/libgcc.a(_arm_addsubdf3.o): in function `__floatundidf':
(.text+0x30c): multiple definition of `__aeabi_ul2d'; ./librusty_addtion.a(compiler_builtins-938fa3b5396dcc28.compiler_builtins.xikbgi4a-cgu.150.rcgu.o):/cargo/registry/src/github.com-1ecc6299db9ec823/compiler_builtins-0.1.32/src/float/conv.rs:143: first defined here
collect2: error: ld returned 1 exit status
makefile:125: recipe for target 'mqtt_client.out' failed
make: *** [mqtt_client.out] Error 1
```

https://github.com/rust-lang/compiler-builtins/issues/345


this fixed it 
```
ar vd librusty_addtion.a compiler_builtins-938fa3b5396dcc28.compiler_builtins.xikbgi4a-cgu.150.rcgu.o
```