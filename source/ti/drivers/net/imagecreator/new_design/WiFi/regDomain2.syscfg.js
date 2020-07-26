const modDef = {
	displayName: "Regulatory Domain 2.4G",
	moduleInstances: () => {
		return [{
			name: "FCC",
			displayName: "FCC Back Off Offset",
			moduleName: "/ti/drivers/net/imagecreator/new_design/WiFi/radio/2_4Ghz/RegDomain",
			/*args: {
				numChannels: 11
			},*/
			collapsed: true,
		},
		{
			name: "ETSI",
			displayName: "ETSI Back Off Offset",
			moduleName: "/ti/drivers/net/imagecreator/new_design/WiFi/radio/2_4Ghz/RegDomain",
			collapsed: true,
		},
		{
			name: "JP",
			displayName: "JP Back Off Offset",
			moduleName: "/ti/drivers/net/imagecreator/new_design/WiFi/radio/2_4Ghz/RegDomain",
			collapsed: true,
		}];
	},
	templates: {
		"/ti/drivers/net/imagecreator/summary24.xdt": {}
	}
};

exports = modDef;