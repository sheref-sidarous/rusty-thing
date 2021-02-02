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

    fn GPIO_init();
    fn SPI_init();
    fn Timer_init();
    fn ti_net_SlNet_initConfig() -> i32;
    fn WifiInit() -> i32;

    fn GPIO_write(arg1 : u32, arg2 : u32);

}

static mut uartHandle : u32 = 0;

fn print(message : &str)
{
    unsafe {
        UART_writePolling(uartHandle, message.as_ptr() as u32, message.len() as u32);
    }
}

static LOG_ERROR : fn(&str)->() = print;
static CONFIG_GPIO_LED_0 : u32 = 2;
static CONFIG_GPIO_LED_1 : u32 = 3;
static CONFIG_GPIO_LED_2 : u32 = 4;
static CONFIG_GPIO_LED_OFF : u32 = 0;

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

        GPIO_init();
        SPI_init();
        Timer_init();
    
        if ti_net_SlNet_initConfig() != 0 {
            LOG_ERROR("Failed to initialize SlNetSock\n\r");
            loop {};
        }
    
        if WifiInit() < 0 {
            LOG_ERROR("Failed to initialize WiFi\n\r");
            loop {};
        }
    
        GPIO_write(CONFIG_GPIO_LED_0, CONFIG_GPIO_LED_OFF);
        GPIO_write(CONFIG_GPIO_LED_1, CONFIG_GPIO_LED_OFF);
        GPIO_write(CONFIG_GPIO_LED_2, CONFIG_GPIO_LED_OFF);

    }

    loop {
        print("inside Rust Hearbeat <3\r\n");
        CurrentTask::delay(Duration::ms(1000));
    }

}



