/**
 * @author : Aditya Pradhan
 * @description : This class is linked to the Lab3 folder's index.html file where 
 *                it contains all the javascript code required for smooth running
 *                of application.
 */



// Variables declared to store and use globally
var billTotalInputValue = 0;
var tipAmountValue = 0;
var tipAmountInput = 0;
var totalBillAmount = 0;

// Event Listener added on window object so as to set check mark on the language.
window.addEventListener("load", () => {
    document.getElementById("englishCheckMark").classList.add("showCheckMark");
});

// This function is invoked on input change of the "Bill Total" text box and checks
// if the input given is number or not
function handleBillInputChange() {
    let billTotalUserInput = document.getElementById("billTotalInput").value
    let numRegex = /^\d+$/; // Regex for only numbers
    if (billTotalUserInput.match(numRegex) == null && billTotalUserInput.length != 0) {
        let toastElement = document.getElementById("toastError");
        toastElement.classList.add("show");
        setTimeout(() => { // After 4 seconds, the class will be removed from div
            toastElement.classList.remove("show");
        }, 4000);
    }
    else if (billTotalUserInput.length == 0) {
        document.getElementById("totalAmountText").innerHTML = "$0.00";
        document.getElementById("totalAmountInput").value = 0;
    }
    else {
        if (totalBillAmount != 0 && tipAmountInput != 0) {
            billTotalInputValue = parseFloat(billTotalUserInput);
            this.calculateTotal();
        }
        else {
            billTotalInputValue = parseFloat(billTotalUserInput);
            totalBillAmount = billTotalInputValue;
            document.getElementById("totalAmountInput").value = billTotalInputValue;
            document.getElementById("totalAmountText").innerHTML = (billTotalInputValue != "") ? "$" + billTotalInputValue : "$0.00";
        }
    }

}

// This function is invoked when the user clicks on the cancel button of toast message.
function handleClose(type) {
    switch (type) {
        case 'error':
            let toastErrorElement = document.getElementById("toastError");
            toastErrorElement.classList.remove("show");
            break;
        case 'success':
            let toastSuccessElement = document.getElementById("toastSuccess");
            toastSuccessElement.classList.remove("show");
            break;
        default:
            break;
    }

}

// This function is invoked when the input range changes
function handleTipRangeChange() {
    tipAmountInput = parseInt(document.getElementById("tipInput").value);
    document.getElementById("tipPercentage").value = tipAmountInput;
    this.calculateTotal();
}

// This function is used to calculate the total amount of the bill including tip
function calculateTotal() {
    tipAmountValue = parseFloat(billTotalInputValue * (tipAmountInput / 100));
    totalBillAmount = (parseFloat(billTotalInputValue + tipAmountValue)).toFixed(2);
    document.getElementById("tipAmount").value = tipAmountValue.toFixed(2);
    document.getElementById("tipAmountText").innerHTML = "$" + tipAmountValue.toFixed(2);
    document.getElementById("totalAmountInput").value = totalBillAmount;
    document.getElementById("totalAmountText").innerHTML = "$" + totalBillAmount
}

// This function is invoked by the reset button
function handleReset() {
    document.getElementById("tipAmountText").innerHTML = "$0.00";
    document.getElementById("totalAmountText").innerHTML = "$0.00";
    billTotalInputValue = 0;
    tipAmountValue = 0;
    tipAmountInput = 0;
    totalBillAmount = 0;
}

// This function is invoked by the language change button.
// It changes the entire applications language.
function handleLanguageChange(language) {
    let toastSuccessElement = document.getElementById("toastSuccess");
    switch (language) {
        case 'en':
            document.getElementById("englishCheckMark").classList.add("showCheckMark");
            document.getElementById("frenchCheckMark").classList.remove("showCheckMark");
            toastSuccessElement.classList.add("show");
            toastSuccessElement.innerHTML = "Language Changed !!"
            setTimeout(() => {
                toastSuccessElement.classList.remove("show");
            }, 4000);

            document.getElementById("toastErrorLabel").innerHTML = "Invalid Input! Please Enter Only Numbers.";
            document.getElementById("navbarScrollingDropdown").innerHTML = "Language";
            document.getElementById("tipCalculatorHeading").innerHTML = "Tip Calculator";
            document.getElementById("billTotalInputLabel").innerHTML = "Bill Total";
            document.getElementById("billTotalInput").placeholder = "Enter the Total Bill Amount";
            document.getElementById("tipLabel").innerHTML = "Tip";
            document.getElementById("tipPercentageLabel").innerHTML = "Tip Percentage";
            document.getElementById("tipAmountLabel").innerHTML = "Tip Amount";
            document.getElementById("totalAmountInputLabel").innerHTML = "Total Bill With Tip";
            document.getElementById("totalTipHeading").innerHTML = "Total Tip";
            document.getElementById("totalAmountHeading").innerHTML = "Total Bill";
            document.getElementById("resetBtn").value = "Reset";
            break;

        case 'fr':
            document.getElementById("englishCheckMark").classList.remove("showCheckMark");
            document.getElementById("frenchCheckMark").classList.add("showCheckMark");
            toastSuccessElement.classList.add("show");
            toastSuccessElement.innerHTML = "Langue modifiée !!"
            setTimeout(() => {
                toastSuccessElement.classList.remove("show");
            }, 4000);

            document.getElementById("toastErrorLabel").innerHTML = "Entrée invalide! Veuillez saisir uniquement des chiffres.";
            document.getElementById("navbarScrollingDropdown").innerHTML = "Langue";
            document.getElementById("tipCalculatorHeading").innerHTML = "Calculateur de pourboire";
            document.getElementById("billTotalInputLabel").innerHTML = "Total de la facture";
            document.getElementById("billTotalInput").placeholder = "Entrez le montant total de la facture";
            document.getElementById("tipLabel").innerHTML = "Conseil";
            document.getElementById("tipPercentageLabel").innerHTML = "Pourcentage de pourboire";
            document.getElementById("tipAmountLabel").innerHTML = "Montant du pourboire";
            document.getElementById("totalAmountInputLabel").innerHTML = "Facture totale avec pourboire";
            document.getElementById("totalTipHeading").innerHTML = "Pourboire total";
            document.getElementById("totalAmountHeading").innerHTML = "Facture totale";
            document.getElementById("resetBtn").value = "Réinitialiser";
            break;
        default:
            break;
    }
}