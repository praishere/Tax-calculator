document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event triggered');  // Debugging

    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const closeButton = document.querySelector('.close');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted');  // Debugging

        const age = document.getElementById('age').value;
        const income = parseFloat(document.getElementById('income').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const deductions = parseFloat(document.getElementById('deductions').value);


        // Clear previous errors
        clearErrors();

        // Validate inputs
        let isValid = true;
        if (!age) {
            displayError('ageError', 'Age is required.');
            isValid = false;
        }
        if (isNaN(income)) {
            displayError('incomeError', 'Income must be a number.');
            isValid = false;
        }
        if (isNaN(extraIncome)) {
            displayError('extraIncomeError', 'Extra Income must be a number.');
            isValid = false;
        }
        if (isNaN(deductions)) {
            displayError('deductionsError', 'Deductions must be a number.');
            isValid = false;
        }

        // Check for empty fields
    if (!age || isNaN(income) || isNaN(extraIncome) || isNaN(deductions)) {
        displayError('generalError', 'All fields are mandatory.');
        isValid = false;
    }

    //Hide the general error if input field is not empty & is valid number
    if (isValid) {
        document.getElementById('generalError').style.display = 'none';
    }

        if (isValid) {
          // Calculate overall income after deductions
const overallIncome = income + extraIncome - deductions;
console.log('Overall Income:', overallIncome);  // Debugging

// Calculate tax
let tax = 0;
const incomeAfterDeductions = overallIncome - 800000;
if (incomeAfterDeductions > 0) {  // Corrected condition
    if (age === "< 40") {
        tax = 0.3 * incomeAfterDeductions;  // Calculating tax on the entire income after deductions
    } else if (age === "≥40 & <60") {
        tax = 0.4 * incomeAfterDeductions;
    } else if (age === "≥60") {
        tax = 0.1 * incomeAfterDeductions;
    }
} else {
    tax = 0; // No tax for income under 8 Lakhs after deductions
}



console.log('Tax to be paid:', tax.toFixed(1));  // Debugging


            // The output card
            const outputCard = document.createElement('div');
            outputCard.className = 'card output-card';
            const outputCardBody = document.createElement('div');
            outputCardBody.className = 'card-body';
            // Display the result
            outputCardBody.innerHTML = `
            <p>Your overall income will be <strong>Rs.${overallIncome.toFixed(2)}</strong>, after deductions</p>
    <p>Tax to be paid: <strong>Rs.${tax.toFixed(2)} </strong></p>`;
            outputCard.appendChild(outputCardBody);

            // Display modal with tax calculation
            modalContent.innerHTML = '';
            modalContent.appendChild(outputCard);

            // Show the modal
            modal.style.display = 'block';
        }
    });

    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    function displayError(id, message) {
        const errorIcon = document.getElementById(id);
        errorIcon.style.display = 'inline-block';
        errorIcon.title = message;
    }

    function clearErrors() {
        const errorIcons = document.querySelectorAll('.error-icon');
        errorIcons.forEach(icon => {
            icon.style.display = 'none';
            icon.title = '';
        });
    }
});