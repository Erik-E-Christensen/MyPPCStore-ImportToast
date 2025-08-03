// ==UserScript==
// @name         Import from Toast
// @namespace    https://www.tampermonkey.net/
// @version      2.0.1
// @description  A simple script to auto import from ToastPOS
// @author       Erik Christensen
// @include      https://myppcstore.com/*
// @include      https://www.myppcstore.com/*
// @require      http://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdn.sheetjs.com/xlsx-0.19.2/package/dist/xlsx.full.min.js
// @grant        none
// ==/UserScript==
if(window.location.href == "https://myppcstore.com/Store_CloseSheet.php" || window.location.href == "https://www.myppcstore.com/Store_CloseSheet.php" && !document.getElementById("Date_CloseDate")) {
    var hasClickedOnce = false;
    $(".label").filter(".pull-right").eq(1).html('<button class="btn btn-warning" type="button" id="toastImportButton">Import from ToastPOS</button><input type="file" id="toastFile" name="toast" accept=".xlsx" style="display:none">').click(async function() {
        if(hasClickedOnce == false) {
            document.getElementById("toastFile").style.display = "block";
            hasClickedOnce = true;
        }
        else {
            if(document.getElementById("toastFile").value != "") {
                if(document.getElementById("toastFile").files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                    async function getDataFromFile(file) {
                        const data = await file.arrayBuffer();
                        const workbook = XLSX.read(data);
                        return workbook;
                    }
                    var output = await getDataFromFile(document.getElementById("toastFile").files[0]);
                    var sheet = output.Sheets["All data"];

                    function convertDollarToValue(n) {
                        n = n.toString().replace("$","");
                        n = n.toString().replace(",","");
                        return parseFloat(n);
                    }

                    // Step 2: Verify sales >$0 (is real sales summary)
                    if(sheet["B6"].v == 0) {
                        alert("Error - This sheet has no recorded sales");
                    }
                    else {
                        // Step 3: Get Values
                        // These are always in the same spot
                        var sales = await convertDollarToValue(sheet["B6"].v);
                        var tax = await convertDollarToValue(sheet["B8"].v);
                        var tips = await convertDollarToValue(sheet["B11"].v);
                        var giftcard_deffered = await convertDollarToValue(sheet["B12"].v) || 0;
                        //These move and we have to search for them
                        var amex = 0.00;
                        var discover = 0.00;
                        var mastercard = 0.00;
                        var visa = 0.00;
                        var doordash = 0.00;
                        var beverages = 0.00;
                        var buffet = 0.00;
                        var misc = 0.00;
                        var cash = 0.00;
                        var giftcard_less = 0.00;
                        var house = 0.00;
                        var delivery = 0.00;
                        var hasDoordash = false;
                        for(var i = 1; i <= 150; i++) {
                            if(sheet["B" + i] != undefined) {
                                switch(sheet["B" + i].v) {
                                    case 'AMEX':
                                        amex = await convertDollarToValue(sheet["K" + i].v);
                                        break;
                                    case 'DISCOVER':
                                        discover = await convertDollarToValue(sheet["K" + i].v);
                                        break;
                                    case 'MASTERCARD':
                                        mastercard = await convertDollarToValue(sheet["K" + i].v);
                                        break;
                                    case 'VISA':
                                        visa = await convertDollarToValue(sheet["K" + i].v);
                                        break;
                                    case 'DoorDash':
                                        doordash = doordash + await convertDollarToValue(sheet["K" + i].v);
                                        break;
                                } // End switch
                                switch(sheet["A" + i].v) {
                                    case 'Beverages':
                                        beverages = await convertDollarToValue(sheet["C" + i].v);
                                        break;
                                    case 'Buffet':
                                        buffet = await convertDollarToValue(sheet["C" + i].v);
                                        break;
                                        //Cuz Steve is dumb sometimes
                                    case 'No Category':
                                        misc = misc + await convertDollarToValue(sheet["C" + i].v);
                                        break;
                                        //End cuz Steve is dumb sometimes
                                    case 'Cash':
                                        cash = await convertDollarToValue(sheet["K" + i].v);
                                        break;
                                    case 'Gift Card':
                                        giftcard_less = await convertDollarToValue(sheet["K" + i].v);
                                        break;
                                    case 'Takeout/Catering':
                                            if(sheet["C" + i] != undefined) {
                                                misc = misc + await convertDollarToValue(sheet["C" + i].v);
                                            }
                                            break;
                                    case 'Misc':
                                        if(sheet["C" + i] != undefined) {
                                            misc = misc + await convertDollarToValue(sheet["C" + i].v);
                                        }
                                        break;
                                        /*case 'House Account':
                                            house = await convertDollarToValue(sheet["I" + i].v);
                                            break;*/
                                        case 'Delivery':
                                            house = house + await convertDollarToValue(sheet["C" + i].v);
                                            delivery = await convertDollarToValue(sheet["C" + i].v);
                                            break;
                                    case 'DoorDash':
                                        misc = misc + await convertDollarToValue(sheet["C" + i].v);
                                }// End switch
                            } // End if
                        } // End for
                        // Step 4: Put it all into the sheet
                        // Over-under notes for gift card;
                        var text = "Gift Cards - $" + giftcard_less + "\nGift Cards (Deferred) - $" + giftcard_deffered + "\nInvoices - $" + delivery;
                        document.getElementById("OverUnderMsg").value = text;
                        //AMEX
                        document.getElementById("CreditCards_Amex").value = amex;
                        updateCreditCardTotals('CreditCards_Amex');
                        //Discover
                        document.getElementById("CreditCards_DiscoverCard").value = discover;
                        updateCreditCardTotals('CreditCards_DiscoverCard');
                        //Master Card
                        document.getElementById("CreditCards_MasterCard").value = mastercard;
                        updateCreditCardTotals('CreditCards_MasterCard');
                        //Visa
                        document.getElementById("CreditCards_Visa").value = visa;
                        updateCreditCardTotals('CreditCards_Visa');
                        //Doordash
                        document.getElementById("CreditCards_ExternalOther").value = doordash;
                        updateCreditCardTotals('CreditCards_ExternalOther')
                        //Beverages
                        document.getElementById("Sales_Beverages").value = beverages;
                        //Buffet
                        document.getElementById("Sales_Buffet").value = buffet;
                        //Misc
                        document.getElementById("Sales_Misc").value = misc;
                        //Tax
                        document.getElementById("Sales_SalesTax").value = tax;
                        //Gift Card (Less)
                        document.getElementById("Sales_ATMDebitGiftCards").value = giftcard_less;
                        updateSalesTotals('Sales_ATMDebitGiftCards')
                        //Cash
                        document.getElementById("Computer_Cash").value = cash;
                        //Credit Cards
                        document.getElementById("Computer_CreditCards").value = amex + discover + mastercard + visa + doordash + house;
                        updateActualVsComputerTotals('Computer_CreditCards')
                        //Gift Card (Deffered)
                        document.getElementById("Actual_ATMDebitGift").value = giftcard_deffered; // This is what's broken
                        /*document.getElementById("Computer_ATMDebitGift").value = giftcard_deffered;*/
                        //Tips
                        document.getElementById("Actual_Tips").value = tips;
                        updateActualVsComputerTotals('Actual_Tips');
                        //House
                        document.getElementById("CreditCards_House").value = house;
                        updateCreditCardTotals('CreditCards_House');
                        //We be done
                        _goClosingSheetUpdate('Validate'); //This invokes Larry's script
                    } // End complete run
                }
                else {
                    alert("Error - You must upload an excel file, the file you uploaded is not correct. The excel file can be retrieved directly from Toast.");
                }
            }
        }
    });
}
