"use strict";

const fs = require("fs");
var parser = require("fast-xml-parser");

function JsonTransaction(data) {
  this.totalMoney = data.itemization[0].total_money.amount;
  this.netSalesMoney = data.itemization[0].net_sales_money.amount;
  this.taxes = data.taxes[0].rate;
}

function XmlTransaction(data) {
  this.totalMoney = data.itemization.element.total_money.amount;
  this.netSalesMoney = data.itemization.element.net_sales_money.amount;
  this.taxes = data.taxes.element[0].rate;
}

function checker(totalMoney, netSalesMoney, taxes) {
  let totalAmount = netSalesMoney + totalMoney * taxes;
  if (totalAmount === totalMoney) {
    console.log("The total amount is correct");
  } else {
    console.log("The total amount is NOT correct");
  }
}

//////////////////////////////////////////////////////////////

const jsonData = require("./data/transaction.json");
let jsonItem = new JsonTransaction(jsonData);
checker(jsonItem.totalMoney, jsonItem.netSalesMoney, jsonItem.taxes);

const xml = fs.readFileSync(`./data/transaction.xml`, {
  encoding: "utf-8",
});
var jsonObj = parser.parse(xml);
let finalJson = jsonObj.xml.root;
let xmlItem = new XmlTransaction(finalJson);
checker(xmlItem.totalMoney, xmlItem.netSalesMoney, xmlItem.taxes);
