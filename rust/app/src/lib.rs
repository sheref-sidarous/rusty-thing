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
    fn InitTerm() -> u32;
    fn UART_control(handle : u32, config : u16 , arg3 : u32);
    fn UART_writePolling(handle : u32, ptr_to_str : u32, len : u32);
}

fn print(message : &str) {
    unsafe {
        raw_print(message);
    }
}

static mut uartHandle : u32 = 0;

#[no_mangle]
pub extern "C" fn rusty_entry() {
    Task::new().name("hello").stack_size(1024).start(|| {
        main_thread();
    }).unwrap();
}

fn main_thread () {

    unsafe {

        uartHandle = InitTerm();
        UART_control(uartHandle, 4, 0);

    }

    loop {
        print("inside Rust Hearbeat <3\r\n");
        CurrentTask::delay(Duration::ms(1000));
    }

}

unsafe fn raw_print(message : &str)
{
    UART_writePolling(uartHandle, message.as_ptr() as u32, message.len() as u32);
}


