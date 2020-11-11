#![no_std]
#![feature(alloc_error_handler)]

use core::panic::PanicInfo;
use freertos_rust::*;
use core::alloc::Layout;

#[global_allocator]
static GLOBAL: FreeRtosAllocator = FreeRtosAllocator;


#[panic_handler]
fn panic_hndlr(_info: &PanicInfo) -> ! {
    loop {}
}

#[alloc_error_handler]
fn alloc_error(_layout: Layout) -> ! {
    loop {}
}

extern {
    pub fn raw_print(a : *const u8, len:u32);
}

fn print(message : &str) {
    unsafe {
        raw_print(message.as_ptr(), message.len() as u32);
    }
}



#[no_mangle]
pub extern "C" fn rusty_entry() {
    Task::new().name("hello").stack_size(1024).start(|| {
        loop {
            print("inside Rust Hearbeat <3\r\n");
            CurrentTask::delay(Duration::ms(1000));
        }
    }).unwrap();
}
