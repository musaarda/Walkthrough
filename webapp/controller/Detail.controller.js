sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.wt.controller.Detail", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			var iProductName = oEvent.getParameter("arguments").productName;
			var selectedItem;
			var selectedIndex;
			/*
			$.getJSON("./Invoices.json", function(data) {
				console.log(data);
			});
			*/
			$.ajax({
				url: './Invoices.json',
				dataType: 'json',
				type: 'get',
				cache: 'false',
				success: function(data) {
					$(data.Invoices).each(function(index, value) {
						console.log(value.ProductName);
						console.log(index);
						if(iProductName === value.ProductName) {
							selectedIndex = index;
							selectedItem = value;
						}
					});
				}
			});
			
			this.getView().bindElement({
				path: "/" + selectedItem,
				model: "invoice"
			});
			
			alert(oEvent.getParameter("arguments").productName);
			alert(selectedIndex);
		}
		
		
	});
});