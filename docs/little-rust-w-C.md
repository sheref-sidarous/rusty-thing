Having the main app in rust, everything else in C
==================================================


The first step was to have my main app written in Rust while the everything else still in C, this makes sense because :

* it follows my mantra of moving from one working setup to another working setup, instorduing just one change.

* most probubly the practical approach in production stack, you already have something working in C/C++ and you'd want to add a new routine in Rust, to take advantage of its improved features or libraries.

FreeRTOS bindings
------------------






Creating a library in Rust
---------------------------
So, I followed the instructions [here](https://rust-embedded.github.io/book/interoperability/rust-with-c.html)

I start with the simplest possible example then build on top of it. Also let's first try the concept natively on x86 then add cross-compiling


cargo.toml
```
[package]
name = "rusty-addition"
version = "0.1.0"
authors = ["Sheref Sidarous <sherefyounan@gmail.com>"]
edition = "2018"

[lib]
name = "rusty_addition"
crate-type = ["staticlib"] # Creates static lib
```

src/lib.rs
```
pub fn rusty_addition(a : usize, b : usize) -> usize {
   a + b
}
```


