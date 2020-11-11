#! /bin/sh

cargo build --target=thumbv7m-none-eabi

# a workaround becuase rust static libs include compiler builtins by default, chec docs/notes.md
ar vd target/thumbv7m-none-eabi/debug/librust_app.a compiler_builtins-938fa3b5396dcc28.compiler_builtins.xikbgi4a-cgu.150.rcgu.o