

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('icon-01').innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.getElementById('icon-02').innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.getElementById('icon-03').innerHTML = '<i class="bi bi-arrow-up"></i>';
    isMainPaymentButtonAvailable();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    document.getElementById('expire-date').min = `${year}-${month.toString().padStart(2, '0')}`;
    document.getElementById('expire-date').value = "";

})


const paymentHeaderElement = document.querySelector('.payment-header');
const paymentDetailsElement = document.querySelector('.payment-details');
const billingHeaderElement = document.querySelector('.billing-header');
const billingDetailsElement = document.querySelector('.billing-details');
const contactHeaderElement = document.querySelector('.contact-header');
const contactDetailsElement = document.querySelector('.contact-details');
const holderName = document.getElementById('holder-name');
const cardNo = document.getElementById('card-no');
const cvv = document.getElementById('cvv');
const expireDate = document.getElementById('expire-date')
const address = document.getElementById('address');
const city = document.getElementById('city');
const zipCode = document.getElementById('zip-code');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone-number');
const paymentSaveBtn = document.getElementById('payment-btn');
const billingSaveBtn = document.getElementById('billing-btn');
const contactSaveBtn = document.getElementById('contact-btn');
const paymentClearBtn = document.getElementById('payment-clear');
const billingClearBtn = document.getElementById('billing-clear');
const contactClearBtn = document.getElementById('contact-clear');
const mainPaymentBtn = document.getElementById('main-payment-btn');


paymentHeaderElement.addEventListener('click', () => {
    paymentDetailsElement.classList.toggle('payment-toggle');
    if (!paymentDetailsElement.classList.contains('payment-toggle')) {
        document.getElementById('icon-01').innerHTML = '<i class="bi bi-arrow-up"></i>';
    } else {
        document.getElementById('icon-01').innerHTML = '<i class="bi bi-pencil-square"></i>';
    }
});
billingHeaderElement.addEventListener('click', () => {
    billingDetailsElement.classList.toggle('billing-toggle');
    if (!billingDetailsElement.classList.contains('billing-toggle')) {
        document.getElementById('icon-02').innerHTML = '<i class="bi bi-arrow-up"></i>';
    } else {
        document.getElementById('icon-02').innerHTML = '<i class="bi bi-pencil-square"></i>';
    }
});
contactHeaderElement.addEventListener('click', () => {
    contactDetailsElement.classList.toggle('contact-toggle');
    if (!contactDetailsElement.classList.contains('contact-toggle')) {
        document.getElementById('icon-03').innerHTML = '<i class="bi bi-arrow-up"></i>';
    } else {
        document.getElementById('icon-03').innerHTML = '<i class="bi bi-pencil-square"></i>';
    }
});


//clear payment form filed
paymentClearBtn.addEventListener("click", () => {
    expireDate.value = ""
    holderName.value = ""
    cardNo.value = ""
    cvv.value = ""
})
//Clear Billing from filed
billingClearBtn.addEventListener("click", () => {
    address.value = ""
    city.value = ""
    zipCode.value = ""
    document.getElementById('address-line-02').value = '';
    document.getElementById('address-line-03').value = '';
    billingSaveBtn.classList.remove('valid-btn');
    //isMainPaymentButtonAvailable();
})
//clear contact from fields
contactClearBtn.addEventListener('click', () => {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    phoneNumber.value = '';
    contactSaveBtn.classList.remove('valid-btn');
})


//Main payment button availability

function isMainPaymentButtonAvailable() {
    const paymentSave = paymentSaveBtn.classList.contains('valid-btn');
    const billingSave = billingSaveBtn.classList.contains('valid-btn');
    const contactSave = contactSaveBtn.classList.contains('valid-btn');

    if (paymentSave && billingSave && contactSave) {
        mainPaymentBtn.classList.add('valid-btn');
    } else {
        mainPaymentBtn.classList.remove('valid-btn');
    }
}


//payment inputs validation
function paymentInputValidation() {
    const cardname = holderName.value.trim();
    const cardNumber = cardNo.value.trim();
    const cvvNumber = cvv.value.trim();

    const holderRegex = /^[a-zA-Z\s]{3,}$/;
    const cardNoRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3}$/;

    const isValidName = holderRegex.test(cardname);
    const isValidCard = cardNoRegex.test(cardNumber);
    const isValidCvv = cvvRegex.test(cvvNumber);

    holderName.classList.remove('error');
    cardNo.classList.remove('error');
    cvv.classList.remove('error');
    expireDate.classList.remove('error');
    paymentHeaderElement.classList.remove('error-header')

    if (!isValidName) {
        holderName.classList.add('error');
        paymentHeaderElement.classList.add('error-header')
    }
    if (!isValidCard) {
        cardNo.classList.add('error');
        paymentHeaderElement.classList.add('error-header')
    }
    if (!isValidCvv) {
        cvv.classList.add('error');
        paymentHeaderElement.classList.add('error-header')
    }
    if (!expireDate.value) {
        expireDate.classList.add('error');
        paymentHeaderElement.classList.add('error-header')
    }
}

//Billing Details Verification
function billingInputValidation() {

    const addressvalue = address.value.trim();
    const cityValue = city.value.trim();
    const zipcodeVlaue = zipCode.value.trim();

    address.classList.remove('error');
    city.classList.remove('error');
    zipCode.classList.remove('error');

    billingHeaderElement.classList.remove('error-header')

    if (addressvalue === '') {
        address.classList.add('error');
        billingHeaderElement.classList.add('error-header')
    }
    if (cityValue === '') {
        city.classList.add('error');
        billingHeaderElement.classList.add('error-header')
    }
    if (zipcodeVlaue === '') {
        zipCode.classList.add('error');
        billingHeaderElement.classList.add('error-header')
    }

}

//Contact Details Validation
function contactInputValidation() {
    const fNameValue = firstName.value.trim();
    const lNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phoneNumber.value.trim();

    const fnameRegex = /^[a-zA-Z\s]{3,}$/;
    const lastNameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    const isFnameValid = fnameRegex.test(fNameValue);
    const isLastNameValid = lastNameRegex.test(lNameValue);
    const isEmailValid = emailRegex.test(emailValue);
    const isPhoneValid = phoneRegex.test(phoneValue);

    firstName.classList.remove('error');
    lastName.classList.remove('error');
    email.classList.remove('error');
    phoneNumber.classList.remove('error');

    contactHeaderElement.classList.remove('error-header');

    if (!isFnameValid) {
        firstName.classList.add('error');
        contactHeaderElement.classList.add('error-header');
    }
    if (!isLastNameValid) {
        lastName.classList.add('error');
        contactHeaderElement.classList.add('error-header');
    }
    if (!isEmailValid) {
        email.classList.add('error');
        contactHeaderElement.classList.add('error-header');
    }
    if (!isPhoneValid) {
        phoneNumber.classList.add('error');
        contactHeaderElement.classList.add('error-header');
    }
}


//savePayment
paymentSaveBtn.addEventListener('click', () => {
    paymentInputValidation();

})
//save Billing Details
billingSaveBtn.addEventListener('click', () => {
    billingInputValidation();
})
//Save Contact details
contactSaveBtn.addEventListener('click', () => {
    contactInputValidation();
})

//Make payment Validation
mainPaymentBtn.addEventListener('click', () => {
    paymentInputValidation();
    billingInputValidation();
    contactInputValidation();

    const isPaymentHeader = paymentHeaderElement.classList.contains('error-header');
    const isBillingHeader = billingHeaderElement.classList.contains('error-header'); // Corrected variable name
    const isContactHeader = contactHeaderElement.classList.contains('error-header'); // Corrected variable name

    if (isPaymentHeader || isBillingHeader || isContactHeader) {
        alert("Please fill in all the required fields marked in red.");
    } else {
        window.location.href='./thankYou.html'
        console.log("No issues found.");
    }
});

//Render products from cart in order summary

/*
productsRender();*/
const carrtSummary =JSON.parse(localStorage.getItem('cart'));
const orderItemdElmenet = document.querySelector('.order-items');
function productsRender(){
    return(orderItemdElmenet.innerHTML=carrtSummary.map((item)=>{
        return `
            <div class="order-item">
                    <span>Item Name : ${item.title}</span>
                    <span>Variation : [${item.size}][${item.color}]</span>
                    <span>Item Quantity ${item.qty}:</span>
                    <span>Item Price : ${item.price}</span>
                </div>
        `
    }).join(""))
}
productsRender();

//Render Total price
function calculateTotalPrice(){
    let total=0;
    carrtSummary.forEach((item)=>{
        total+=item.price;
    })
    document.getElementById('total-price').textContent=total;
}

calculateTotalPrice();
