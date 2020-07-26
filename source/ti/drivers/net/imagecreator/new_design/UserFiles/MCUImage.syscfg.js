/*!
 *  MCUImage Section of ImageCreator for SysConfig
 */
"use strict";

/* Intro splash on GUI */
let longDescription = `Add the host application file (MCU Image) for CC32xx devices.`;


let Common = system.getScript("/ti/drivers/Common.js");
let logWarning = Common.logWarning;
let logError = Common.logError;
const isStandAloneGUI = system.isStandAloneGUI();

let flash = (system.deviceData.deviceId == "CC3220SF") || (system.deviceData.deviceId == "CC3235SF");


let config = [   
                {   name        : "External", /*Valid only for CCS mode*/
					displayName : "Use Project MCU Image",
					default     : false,
					hidden      : isStandAloneGUI, 
                    onChange: (inst, ui) => {
						if(isStandAloneGUI)
						{
							ui.mcuFileInput.hidden = false;
						} else {
							ui.mcuFileInput.hidden = inst.External;
						}
                    }
                }, 
				{   name        : "mcuFileInput",
					displayName : "MCU Image",
					hidden      : !isStandAloneGUI, /*Should be shown always in standalone mode*/
					default     : "",
					fileFilter	: ".*"
				},
				{   name        : "Filename",
					displayName : "File System Name",
					default     : flash ? "/sys/mcuflashimg.bin" : "/sys/mcuimg.bin",
					readOnly    : true
				}, 
                {
					name        : "ProjectPath",
					displayName : "File Name",
					default     : "",
					hidden      : true
				}, 
				{
					name        : "fileSizeCfg",
					displayName : "Max File Size",
					default     : flash ? 1024*1024 : 256*1024
				}, 
				{
					name        : "Filesafe",
					displayName : "Filesafe",
					default     : false
				},
				{   name        : "Secure",
					displayName : "Secure",
					default     : true,
					onChange: (inst, ui) => {
                        ui.Static.readOnly = !inst.Secure;
                        ui.Vendor.readOnly = !inst.Secure;
                        ui.mcuKey.readOnly = !inst.Secure;
                        ui.mcuCertificate.readOnly = !inst.Secure;
                    }
				},	
				{
					name        : "Static",
					displayName : "Static",
					default     : false
				},	
				{   name        : "Vendor",
					displayName : "Vendor",
					default     : false,
					onChange: (inst, ui) => {
                        ui.FileToken.readOnly = !inst.Vendor
                    }
				},				
				{
					name        : "FileToken",
					displayName : "File Token",
					default     : "",
					readOnly    : true
				}, 
				{
					name        : "PublicWrite",
					displayName : "Public Write",
					default     : true,
				},	
				{
					name        : "PublicRead",
					displayName : "Public Read",
					default     : false
				},	
				{   name        : "NoSecurityTest",
					displayName : "No Security Test",
					default     : false,
					onChange: (inst, ui) => {
                        ui.mcuKey.readOnly = inst.NoSecurityTest;
                        ui.mcuCertificate.readOnly = inst.NoSecurityTest;
                    }
				},	
				{
					name        : "mcuKey",
					displayName : "Private Key",
					default     : "",
					fileFilter	: ".*"
				}, 
				{
					name        : "mcuCertificate",
					displayName : "Certificate",
					default     : "",
					fileFilter	: ".*",
					readOnly    : false
				}
		];




/*!
 *  ======== validate ========
 *  Validate this module's configuration
 *
 *  @param inst       - UART instance to be validated
 *  @param validation - Issue reporting object
 */
function validate(inst, validation, ui)
{
	if (isStandAloneGUI) {

		if (!inst.mcuFileInput) {

			logError(validation, inst, "mcuFileInput", "MCU file was not provided.")
		}

	} else {

		if (!inst.mcuFileInput && !inst.External) {
			logError(validation, inst, "mcuFileInput", "MCU file was not provided.")
		}

	}
	
	if (inst.Secure && !inst.mcuKey)
	{
		logError(validation, inst, "mcuKey", "Security key file was not added.")
	}
	if (inst.Secure && !inst.mcuCertificate)
	{
		logError(validation, inst, "mcuCertificate", "Certificate was not added.")
	}
	if (! inst.PublicWrite)
	{
		logWarning(validation, inst, "PublicWrite", "The file will not be overwriteable without a known token (Vendor flag) or public write access (Public Write flag)")
	}

	if (inst.fileSizeCfg < 0) {

		logError(validation, inst, "fileSizeCfg", "Illegal file size.")
	}
}

/* Common UART instance components across all devices. */
let base = {
    displayName   : "MCU Image",
    description   : "MCU Image",
    //modules       : Common.autoForcePowerModule,
	moduleStatic: {
		config        : config,
		validate      : validate
	},
    longDescription: longDescription,
    defaultInstanceName: "MCU_Image"
};

/*
 * Compose a device specific UART from this common UART definition and
 * export the device specific UART
 */
//let devId = system.deviceData.deviceId;
//let devGen = system.getScript("/ti/drivers/net/imagecreator/mcuimage/MCUImage" + devId);
//exports     = devGen.extend(base);
exports = base;

