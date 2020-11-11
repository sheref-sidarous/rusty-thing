Next step was to make a generic print function for debugging, ofcourse `println!` is not working because I have no std.
Instead I created a simple print fucntion that takes a str slice and translate it into a pointer and length, then on C side I printed this buffer.

Refs :
https://doc.rust-lang.org/nomicon/ffi.html
https://doc.rust-lang.org/std/string/struct.String.html
https://doc.rust-lang.org/std/primitive.str.html
