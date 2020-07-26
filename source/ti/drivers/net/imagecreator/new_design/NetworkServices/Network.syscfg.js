/*!
 *  System settings -> Network Applications
 */
"use strict";

/* Intro splash on GUI */
let longDescription = "";
let Common = system.getScript("/ti/drivers/Common.js");
let logWarning = Common.logWarning;
let logError = Common.logError;
/*!
 * Common General configurable across all devices.
 */
let config = [
	        {//HTTP
				displayName		: "HTTP Server",
				config: [
							{
									name: "HTTP_Enabled_Roles",
									displayName: "HTTP Enabled Roles",
									description: "Enable HTTPS Server for specific Roles",
									options: [
												{
													name        : "STA_HTTP_SID_1",
													displayName : "Station",
												},
												{
													name        : "AP_HTTP_SID_1",
													displayName : "Access Point",
												},
												{
													name        : "CLS_HTTP_SID_1",
													displayName : "Wi-Fi Direct"
												},
												{
													name        : "GO_HTTP_SID_1",
													displayName : "Wi-Fi DirectGO"
												}
									],
									minSelections:0,
									default: [
									"STA_HTTP_SID_1",
									"AP_HTTP_SID_1",
									"CLS_HTTP_SID_1",
									"GO_HTTP_SID_1"] 
							},
							{
								name: "PRIM_PORT_SECURE_0",
								displayName: "Primary Port Secured",
								description:`HTTP/HTTPS server`,
								default: false,
								onChange: (inst, ui) => {
									
									ui.keyHttpPrimFileInput.hidden 	= !inst.PRIM_PORT_SECURE_0;
									ui.certHttpPrimFileInput.hidden 	= !inst.PRIM_PORT_SECURE_0;

									ui.ENABLE_CA_CERT_1.hidden 	        = !inst.PRIM_PORT_SECURE_0;

									ui.cacertHttpPrimFileInput.hidden 	= !inst.PRIM_PORT_SECURE_0 || !inst.ENABLE_CA_CERT_1;

									if (inst.PRIM_PORT_SECURE_0)
									{
										inst.PRIM_PORT_VAL = 443;
									} else {
										inst.PRIM_PORT_VAL = 80;
									}
								}
							},
							{
								name: "PRIM_PORT_VAL",
								displayName: "Primary Port Number",
								default: 80
							},
							{
								name: "ACCESS_ROM_1",
								displayName: "Enable ROM Pages",
								default: true
							},
							{
								name: "SEC_PORT_ENABLE_0",
								displayName: "Enable Secondary Port",
								default: false,
								hidden : true,
							},
							{
								name: "SEC_PORT_VAL",
								displayName: "Secondary Port Number",
								default: 8080
							},
							{
								name: "certHttpPrimFileInput",
								displayName: "HTTP Server Certificate File Name",
								description : "Certificate should be in root folder from User Files",
								default     : "",
								hidden  : true,
								fileFilter	: ".*"
							},
							{
								name: "keyHttpPrimFileInput",
								displayName: "HTTP Server Private Key",
								default     : "",
								hidden  : true,
								fileFilter	: ".*"
							},
							{
								name: "ENABLE_CA_CERT_1",
								displayName: "Enable Client Authentication",
								default: false,
								hidden  : true,
								onChange: (inst, ui) => {
									ui.cacertHttpPrimFileInput.hidden 	= !inst.ENABLE_CA_CERT_1;
								}
							},
							{
								name: "cacertHttpPrimFileInput",
								displayName: "Client CA Certificate File Name",
								default     : "",
								hidden      : true,
								fileFilter	: ".*"
							}
						],
						collapsed:false
			},
			{//MDNS
				displayName: "MDNS Server",
				config: [
					{
						name: "MDNS_Enabled_Roles",
						displayName: "MDNS Enabled Roles",
						description: "Enable MDNS for specific Roles",
						options: [
							{
								name        : "STA_MDNS_SID_4",
								displayName : "Station",
							},
							{
								name        : "AP_MDNS_SID_4",
								displayName : "Access Point",
							},
							{
								name        : "CLS_MDNS_SID_4",
								displayName : "Wi-Fi Direct"
							},
							{
								name        : "GO_MDNS_SID_4",
								displayName : "Wi-Fi DirectGO"
							}
						],
						minSelections:0,
						default: [
						"STA_MDNS_SID_4",
						"AP_MDNS_SID_4",
						"CLS_MDNS_SID_4",
						"GO_MDNS_SID_4"] 
				}
						],
			}

];

/*!
 * Validate this module's configuration
 *
 * @param inst       - instance to be validated
 * @param validation - Issue reporting object
 *
 */
function validate(inst, validation){

	if (inst.PRIM_PORT_SECURE_0) {

		if (!inst.certHttpPrimFileInput) {

			logError(validation, inst, "certHttpPrimFileInput", "HTTPS certificate was not provided.")
		}

		if (!inst.keyHttpPrimFileInput) {

			logError(validation, inst, "keyHttpPrimFileInput", "HTTPS key was not provided.")
		}

		if (inst.ENABLE_CA_CERT_1) {

			if (!inst.cacertHttpPrimFileInput) {

				logError(validation, inst, "cacertHttpPrimFileInput", "Client authentication certificate was not provided.")
			}
		}
	}

}

/* Common Network Applications instance components across all devices. */
let base = {
    displayName   : "Network Applications",
    description   : "Configure network applications internal to the Network Processor",
	moduleStatic: {
    config        : config,
    validate      : validate
	},
    longDescription: longDescription

};

exports = base;