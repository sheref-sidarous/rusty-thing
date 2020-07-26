/*!
 *  Device MAC Settings Section of ImageCreator for SysConfig
 */
"use strict";

/* Intro splash on GUI */
let longDescription = `Configure MAC Settings for Device, otherwise the device will use default values from ROM.`;


/*!
 * Common General configurable across all devices.
 */
let config = [

];

/*!
 * Validate this module's configuration
 * @param inst       - MAC config instance to be validated
 * @param validation - Issue reporting object
 *
 */
function validate(inst, validation)
{
    
}

/* Common MAC config instance components across all devices. */
let base = {
    displayName   : "Role Settings",
    description   : "System -> Role -> General Settings",
	moduleStatic: {
		config        : config,
		validate      : validate
	},
    longDescription: longDescription,
    defaultInstanceName: "Mac"
};

/*
 * Compose a device specific MAC config
 */
let devId = system.deviceData.deviceId;
let gen = "Gen2";    
if ((devId == "CC3235S") || (devId == "CC3235SF"))
{
	gen = "Gen3";
}

let devGen = system.getScript("mac/Mac" + gen);
exports     = devGen.extend(base);

