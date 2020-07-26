
"use strict";
/*global exports*/
/*
 * Example of a file tree
 */


exports = {
			displayName: "User Files",
			moduleStatic: {
					config: [{
						default: "",
						fileFilter: ".*",
						pickDirectory: true,
						name: "rootDirCfg",
						displayName: "Root Directory"
					}]
					
			},
	config: [{
		name: "filePathCfg",
		displayName: "File full path",
		readOnly: true,
		default: "",
	}, {
		name: "fileNameCfg",
		displayName: "File name",
		readOnly: true,
		default: "",
	}, {
		name: "paddingFileSizeCfg",
		displayName: "Max File size(bytes)",
		description: "Max size should take into consideration file updates",
		//readOnly: true,
		default: 0,
	}, {
		default: false,
		name: "failSafeCfg",
		displayName: "Failsafe",
	}, {
		default: false,
		name: "secureCfg",
		displayName: "Secure",
		onChange: (inst, ui) => {
			ui.staticCfg.readOnly = !inst.secureCfg;
			ui.vendorCfg.readOnly = !inst.secureCfg;
			ui.publicWriteCfg.readOnly = !inst.secureCfg;
			ui.publicReadCfg.readOnly = !inst.secureCfg;
			ui.noSignatureTestCfg.readOnly = !inst.secureCfg;
			ui.fileTokenCfg.readOnly = !inst.secureCfg || !inst.vendorCfg;
			ui.KeyCfg.readOnly = !inst.secureCfg;
			ui.CertCfg.readOnly = !inst.secureCfg;
		}
	}, {
		default: false,
		name: "staticCfg",
		readOnly: true,
		displayName: "Static",
	}, {
		default: false,
		name: "vendorCfg",
		readOnly: true,
		displayName: "Vendor",
		onChange: (inst, ui) => {
			ui.fileTokenCfg.readOnly = !inst.secureCfg || !inst.vendorCfg;
		}
	}, {
		default: 0,
		name: "fileTokenCfg",
		readOnly: true,
		displayName: "File Token",
	},
	{
		default: false,
		name: "publicWriteCfg",
		readOnly: true,
		displayName: "Public Write",
	}, {
		default: false,
		name: "publicReadCfg",
		readOnly: true,
		displayName: "Public Read",
	}, {
		default: false,
		name: "noSignatureTestCfg",
		readOnly: true,
		displayName: "No Signature Test",
	},
	{
		name        : "KeyCfg",
		displayName : "Private Key",
		default     : "",
		fileFilter	: ".*",
		readOnly    : true,
		/*onChange: (inst, ui) => {
			let key_name = inst.KeyCfg.substring(inst.KeyCfg.lastIndexOf('\\')+1)
			inst.KeyCfg = key_name
		}*/
	}, 
	{
		name        : "CertCfg",
		displayName : "Certificate",
		default     : "",
		fileFilter	: ".*",
		readOnly    : true
	}
],
	longDescription: "This is a file tree. All certificates should exist in root folder.",
	uiView: "fileTree",

};
