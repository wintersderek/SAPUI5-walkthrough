sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"./controller/HelloDialog",
	"sap/ui/Device",
	"sap/ui/model/BindingMode"
 ], function (UIComponent, JSONModel, HelloDialog, Device, BindingMode) {
	"use strict";
	return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
		metadata : {
			manifest: "json"
		},
		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			// set data model
			var oData = {
				recipient : {
				name : "World"
				}
			};
			var oModel = new JSONModel(oData);
			this.setModel(oModel);

			// Set the device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode(BindingMode.OneWay);
			this.setModel(oDeviceModel, "device");

			// Add the dialog controller as a private property to promote reuse
			this._helloDialog = new HelloDialog(this.getRootControl());

			// Initialize the manifest.json Router
			this.getRouter().initialize();
		},

		// Get content density class for the component.  If the private variable
		// _sContentDensity is not set, this will set it via querying support
		// of device touch. 
		getContentDensity: function() {
			const CSS_COMPACT = "sapUiSizeCompact";
			const CSS_COZY = "sapUiSizeCozy";

			if (!this._sConentDensityClass) {
				this._sConentDensityClass = (Device.support.touch)? CSS_COZY: CSS_COMPACT;
			}
			return this._sConentDensityClass;
		},

		exit: function() {
			// Free up the resources that were created
			this._helloDialog.destroy();
			delete this._helloDialog;
		},

		// Implement functions for the HelloDialog that are used across views
		openHelloDialog: function() {
			this._helloDialog.open();
		}
	});
 });