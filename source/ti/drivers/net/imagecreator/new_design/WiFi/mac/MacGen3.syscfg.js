/*!
 *  Mac Gen3 config section of ImageCreator for SysConfig 
 */
"use strict";
/* $super is used to call generic module's methods */
let $super;
/* Intro splash on GUI */
let longDescription = "";
let Utils 		= system.getScript("/ti/drivers/net/imagecreator/Utils.js");
const ld       	= system.getScript("/ti/drivers/net/imagecreator/long_description.js");

let cc= Utils.country_codes();


function onDHCPServerChange(inst, ui) {
	ui.apipAddrText.readOnly = inst.AP_DHCP_SID_2
	ui.apdgText.readOnly = inst.AP_DHCP_SID_2
	ui.apDNSText.readOnly = inst.AP_DHCP_SID_2
	ui.apDhcpStartAddressText.readOnly = inst.AP_DHCP_SID_2
	ui.apDhcpLastAddressText.readOnly = inst.AP_DHCP_SID_2
	ui.apDhcpLeaseTimeText.readOnly = inst.AP_DHCP_SID_2
}

function updateSecurity(inst, ui) {
	if (inst.apSecuritySelect == "1") {
		inst.apPWText = "1234567890123"
	}
	if (inst.apSecuritySelect == "2") {
		inst.apPWText = "12345678"
	}
	if (inst.apSecuritySelect == "0") {
		inst.apPWText = ""
	}
}

/*!
 * Common General configurable across all devices.
 */
let devSpecific = {
		moduleStatic: {
			config: [ 
						{
							displayName: "General Role Settings",
							description: "",
							config: [
										
												{
													name: "StartRoleSelect",
													displayName: "Start Role",
													description:`Device mode`,
													default: "2",
													
													options: [
														{ name: "2", displayName: "Access Point" },
														{ name: "3", displayName: "P2P" },
														{ name: "0", displayName: "Station" }
													]
												},
												{
													name: "CountryCodeInput",
													displayName: "Country Code",
													default: "EU",
													
													options: cc
												},
												{
													name: "deviceNameText",
													displayName: "Device Name",
													
													default: "mysimplelink"
												},
												
												{
													name: "conPolAutoProvisioningSelect",
													displayName: "Auto Provisioning",
													default: "1",
													
													options: [
														{ name: "0", displayName: "Disable" },
														{ name: "1", displayName: "Enable" }
													]
												},
												{
													name: "AutoProvExternalConfSelect",
													displayName: "Auto Provisioning Ext. Confirmation",
													default: "0",
													
													options: [
														{ name: "0", displayName: "Disable" },
														{ name: "1", displayName: "Enable" }
													]
												}

									],
									collapsed :false
						},
						{
							displayName: "STA Role Settings",
							description: "",
							config: [
										{
											name        : "NO_PSPOLL_MODE",
											displayName : "Legacy PS Poll Mechanism",
											longDescription : "PS Poll is a packet that gets sent from a station to AP when awaking from sleep. The packet allows the Station to stay in Power Save mode while recieving packets. In higher throughput use cases, it can make sense to disable this feature to reduce the number of packets sent.",
											longDescription : ld.pspollLongDescritpion,
											default     : "0",
											options: [
												{ name: "0", displayName: "Enable" },
												{ name: "1", displayName: "Disable" }
											]
										},
										{
											name: "conPolAutoStartSelect",
											displayName: "Auto Connect Policy",
											default: "1",
											options: [
												{ name: "0", displayName: "Disable" },
												{ name: "1", displayName: "Enable" }
											]
										},
										{
											name: "conPolFastConnectSelect",
											displayName: "Fast Connect Policy",
											default: "1",
											options: [
												{ name: "0", displayName: "Disable" },
												{ name: "1", displayName: "Enable" }
											]
										},
										{
											name: "stap2pDHCPEnable",
											displayName: "DHCP Client Enable",
											default: true,
											//onChange: onDHCPClientChange
											onChange: (inst, ui) => {
												ui.staipAddrText.readOnly = inst.stap2pDHCPEnable;
												ui.stasubnetMaskText.readOnly = inst.stap2pDHCPEnable;
												ui.stadgwText.readOnly = inst.stap2pDHCPEnable;
												ui.stadnsText.readOnly = inst.stap2pDHCPEnable;
											}
										},
										{
											name: "staipAddrText",
											displayName: "IP Address",
											textType: "ipv4_address",
											default: "192.168.1.101",
											
											readOnly: true
										},
										{
											name: "stasubnetMaskText",
											displayName: "Subnet Mask",
											textType: "ipv4_address",
											default: "255.255.255.0",
											
											readOnly: true
										},
										{
											name: "stadgwText",
											displayName: "Default Gateway",
											textType: "ipv4_address",
											default: "192.168.1.31",
											
											readOnly: true
										},
										{
											name: "stadnsText",
											displayName: "DNS Server",
											textType: "ipv4_address",
											default: "192.168.1.31",
											
											readOnly: true
										}
									],
									collapsed :false
						},
						{
							displayName: "AP Role Settings",
							description: "",
							config: [
										{
											name: "apSSIDText",
											displayName: "SSID",
											
											default: "mysimplelink"
										},
										{
											name: "apMaxStaNum",
											displayName: "Max Stations",
											
											default: 4
										},
										{
											name: "hiddenSSIDSelect",
											displayName: "Hidden SSID",
											
											default: "0",
											options: [
												{ name: "1", displayName: "Enable" },
												{ name: "0", displayName: "Disable" }
											]
										},
										{
											name: "apSecuritySelect",
											displayName: "Security",
											
											default: "0",
											options: [
												{ name: "0", displayName: "Open" },
												{ name: "1", displayName: "WEP" },
												{ name: "2", displayName: "WPAv2" }
									
											],
											onChange: updateSecurity
										},
										{
											name: "apPWText",
											displayName: "Password",
											
											default: "",
											longDescription : ld.passwordLongDescritpion
										},
										{
											name: "apChannelNum",
											displayName: "Channel",
											
											default: "1",
											options: [
												{ name: "1" },
												{ name: "2" },
												{ name: "3" },
												{ name: "4" },
												{ name: "5" },
												{ name: "6" },
												{ name: "7" },
												{ name: "8" },
												{ name: "9" },
												{ name: "10" },
												{ name: "11" },
												{ name: "12" },
												{ name: "13" },
												{ name: "14" }
											]
										},
										{
											name: "AP_DHCP_SID_2",
											displayName: "DHCP Server Enable",
											default: true,
											
											//onChange: onDHCPServerChange
											onChange: (inst, ui) => {
												ui.apipAddrText.readOnly = !inst.AP_DHCP_SID_2
												ui.apdgText.readOnly = !inst.AP_DHCP_SID_2
												
												ui.apDhcpStartAddressText.readOnly = !inst.AP_DHCP_SID_2
												ui.apDhcpLastAddressText.readOnly = !inst.AP_DHCP_SID_2
												ui.apDhcpLeaseTimeText.readOnly = !inst.AP_DHCP_SID_2
											}
										},
										{
										name: "AP_DNS_SID_8",
										displayName: "DNS Server Enable",
										default: true,
										
										//onChange: onDHCPServerChange
										onChange: (inst, ui) => {
											ui.apDNSText.readOnly = !inst.AP_DNS_SID_8
										}
										},
										{
											name: "apipAddrText",
											displayName: "IP Address",
											textType: "ipv4_address",
											readOnly: false,
											default: "10.123.45.1"
										},
										{
											name: "apdgText",
											displayName: "Default Gateway",
											default: "10.123.45.1",
											readOnly: false,
											textType: "ipv4_address"
										},
										{
											name: "apDNSText",
											displayName: "DNS Server",
											default: "10.123.45.1",
											readOnly: false,
											textType: "ipv4_address"
									
										},
										{
											name: "apDhcpStartAddressText",
											displayName: "DHCP Start Address",
											default: "10.123.45.2",
											readOnly: false,
											textType: "ipv4_address"
										},
										{
											name: "apDhcpLastAddressText",
											displayName: "DHCP Last Address",
											default: "10.123.45.254",
											readOnly: false,
											textType: "ipv4_address"
										},
										{
											name: "apDhcpLeaseTimeText",
											displayName: "DHCP Lease Time (hours)",
											readOnly: false,
											default: 24
										}
										

									],
									collapsed :false
						},
						{
							displayName: "Wi-Fi® Direct/GO Settings",
							description: "",
							config: [
								{
									name: "conAnyWFDirectSelect",
									displayName: "Wi-Fi® Direct/GO",
									default: "1",
									options: [
										{ name: "0", displayName: "Disable" },
										{ name: "1", displayName: "Enable" }
									]
								},
								{
								name: "GO_DNS_SID_8",
								displayName: "DNS Server Enable",
								default: true//,
								
								//onChange: onDHCPServerChange
								},
								{
									name: "GO_DHCP_SID_2",
									displayName: "DHCP Server Enable",
									default: true//,
									
									//onChange: onDHCPServerChange
									},
								],
								collapsed :false
						}
						

					],

						
			/* override device-specific templates */
			templates: {},

			/* override generic validation with ours */
			validate              : validate
		}
};

/*!
 * Validate this module's configuration
 * @param inst       - MAC config instance to be validated
 * @param validation - Issue reporting object
 *
 */
function validate(inst, validation) {}

function extend(base)
{
    /* save base properties/methods, to use in our methods */
    $super = base;

    /* concatenate device-specific configs */
	devSpecific.moduleStatic.config = base.moduleStatic.config.concat(devSpecific.moduleStatic.config);

    /* merge and overwrite base module attributes */
    return (Object.assign({}, base, devSpecific));
}

/*!
 *  ======== exports ========
 *  Export device-specific extensions to base exports
 */
exports = {
    extend: extend
};
