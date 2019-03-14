sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/invoiceStatusFormatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],  function(Controller, JSONModel, invoiceStatusFormatter, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
            // Give the controller the invoiceStatusFormatter functions
            invoiceFormatter : invoiceStatusFormatter,
            
            // Initialize the controller
            onInit : function () {
                var oViewModel = new JSONModel({
                    currency: "EUR"
                });
                this.getView().setModel(oViewModel, "view");
            },

            // Handler for invoice search field
            onFilterInvoices : function(oEvent) {
                // Build filter array
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery) {
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                }

                // filter binding
                var oList = this.byId("invoiceList");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            },

            onPress: function (oEvent) {
                var oItem = oEvent.getSource();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("detail", {
                    invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
                });
            }
        });
});

/*
                console.log("getPath() = " + oItem.getBindingContext("invoice").getPath());
                console.log("substr(1) = " + oItem.getBindingContext("invoice").getPath().substr(1));
*/