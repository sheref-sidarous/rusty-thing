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

#[repr(C)]
struct MQTT_IF_initParams
{
    stackSize : u32,
    threadPriority : u8,
}

#[repr(C)]
struct MQTT_IF_ClientParams
{
    clientID : *const u8,
    username : *const u8,
    password : *const u8,
    keepaliveTime : u16,
    cleanConnect : bool,
    mqttMode31 : bool,     // false 3.1.1 (default) : true 3.1
    blockingSend : bool,
    willParams : *const MQTTClient_Will,
}

#[repr(C)]
struct MQTTClient_Will
{
    willTopic : *const u8, /* Will Topic   */
    willMsg : *const u8,   /* Will message */
    willQos : i8,   /* Will Qos     */
    retain : bool,    /* Retain Flag  */
}

#[repr(C)]
struct MQTTClient_ConnParams
{
    netconnFlags : u32, /**< Enumerate connection type  */
    serverAddr : *const u8, /**< Server Address: URL or IP  */
    port : u16, /**< Port number of MQTT server */
    method : u8, /**< Method to tcp secured socket */
    cipher : u32, /**< Cipher to tcp secured socket */
    nFiles : u32, /**< Number of files for secure transfer */
    secureFiles : *const u8, /* should be 'char * const *' */ /* SL needs 4 files*/
}

extern {
    fn InitTerm() -> u32;
    fn UART_control(handle : u32, config : u16 , arg3 : u32);
    fn UART_writePolling(handle : u32, ptr_to_str : u32, len : u32);

    fn SPI_init();
    fn Timer_init();
    fn ti_net_SlNet_initConfig() -> i32;
    fn WifiInit() -> i32;

    fn GPIO_init();
    fn GPIO_write(arg1 : u32, arg2 : u32);

    fn MQTT_IF_Init(initParams : MQTT_IF_initParams) -> i32;
    fn MQTT_IF_Subscribe(dummy : u32, topic : *const u8, qos : u32, callback : fn(topic : *const u8, payload : *const u8) -> () ) -> i32;
    fn MQTT_IF_Connect(mqttClientParams : MQTT_IF_ClientParams, mqttConnParams : MQTTClient_ConnParams, callback : fn(event : i32) -> ()) -> i32;
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
static MQTT_QOS_2 : u32 = 2;
static NULL : *const u8 = 0 as *const u8;

#[no_mangle]
pub extern "C" fn rusty_entry() {
    Task::new().name("hello").stack_size(1024).start(|| {
        main_thread();
    }).unwrap();
}

fn MQTT_EventCallback() {

}

fn TopicCallback() {

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

        let mqttInitParams = MQTT_IF_initParams{
            stackSize : 2048,
            threadPriority : 2,
        };

        if MQTT_IF_Init(mqttInitParams) < 0 {
            LOG_ERROR("MQTT_IF_Init Failed\n\r");
            loop {};
        }

        let mut ret : i32;

        ret = MQTT_IF_Subscribe(0, "Broker/To/cc32xx\0".as_ptr(), MQTT_QOS_2, TopicCallback);
        ret |= MQTT_IF_Subscribe(0, "cc32xx/ToggleLED1\0".as_ptr(), MQTT_QOS_2, TopicCallback);
        ret |= MQTT_IF_Subscribe(0, "cc32xx/ToggleLED2\0".as_ptr(), MQTT_QOS_2, TopicCallback);
        ret |= MQTT_IF_Subscribe(0, "cc32xx/ToggleLED3\0".as_ptr(), MQTT_QOS_2, TopicCallback);

        if ret < 0 {
            loop {};
        }
        else {
            LOG_ERROR("Subscribed to all topics successfully\r\n");
        }

        let mqttClientParams = MQTT_IF_ClientParams
        {
            clientID : &[u8, 16],
            username : NULL,
            password : NULL,
            keepaliveTime : 0,
            cleanConnect : true,
            mqttMode31 : true,     // false 3.1.1 (default) : true 3.1
            blockingSend : true,
            willParams : *const MQTTClient_Will,
        };

        let mqttConnParams = MQTTClient_ConnParams
        {
            netconnFlags : 0x08,
            serverAddr : "192.168.1.7\0".as_ptr(),
            port : 1883,
            method : 0,
            cipher : 0,
            nFiles : 0,
            secureFiles : NULL,
        }

        if MQTT_IF_Connect(mqttClientParams, mqttConnParams, MQTT_EventCallback) < 0 {
            LOG_ERROR("MQTT_IF_Connect Failed\n\r");
            loop {};
        };


    }

    loop {
        print("inside Rust Hearbeat <3\r\n");
        CurrentTask::delay(Duration::ms(1000));
    }

}



