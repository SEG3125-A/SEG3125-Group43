let providers = [
  {
    id: 0,
    name: "Marsell Wall",
    service: [0, 1, 2, 3],
    bookedDates: [],
  },
  {
    id: 1,
    name: "Butch Coolid",
    service: [0, 2, 3],
    bookedDates: [],
  },
  {
    id: 2,
    name: "Jule Winfield",
    service: [1, 2, 3],
    bookedDates: [],
  },
];

let services = [
  {
    id: 0,
    name: "Hair Consulations",
    description:
      "Take an appointment with our hairstylists to get advice on how to treat and take care of your hair.",
    price: "40",
    img: "consultation.jpeg",
  },
  {
    id: 1,
    name: "Hair Styling",
    description:
      "Several hairstyles, made by experts - exactly like or better than you'd expect!",
    price: "30-40",
    img: "stylings.jpeg",
  },
  {
    id: 2,
    name: "Hair Cuts",
    description:
      "Whatever cut, whatever style, your call - we're here to service you!",
    price: "40-60",
    img: "haircut.jpg",
  },
  {
    id: 3,
    name: "Hair Dying",
    description: "Colors, textures and bazinga.",
    price: "60-100",
    img: "drying.jpeg",
  },
];

let bookingDetails = {
  name: "",
  dateTime: null,
  provider: null,
};

function createServiceCard(service) {
  let serviceModal = createBookingModal(service);

  let offered = "";
  for (const prov of providers) {
    if (prov.service.includes(service.id)) {
      if (offered == "") {
        offered += prov.name;
      } else {
        offered += ", " + prov.name;
      }
    }
  }

  let cardHTML = `<div class="card service" style="">
    <img class="card-img-top service-img" src="./imgs/${service.img}" alt="Image of service: ${service.name}">
    <div class="card-body">
      <h5 class="card-title fw-bold">${service.name}</h5>
      <h6 class="card-subtitle mb-2 ">$${service.price}</h6>
      <p class="card-text">${service.description}</p>
      <h6 class="card-text offeredBy">Offered by: ${offered}</h6>
     
      ${serviceModal}
    </div>
  </div>`;

  return cardHTML;
}

function createPaymentModal(serviceId) {
  let paymentModal = `<div class="modal fade" id="paymentModal-${serviceId}" aria-hidden="true" aria-labelledby="paymentModalLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="paymentModalLabel">Payment Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <form id="payment-${serviceId}"> 
        
        <div class="form-group">
        <label for="ccNumber" class="col-form-label">Credit Card Number:</label>
        <input type="text" class="form-control" id="ccNumber" required pattern="^[0-9]{16}$"  placeholder="1234123412341234">

        <label for="expiryDate" class="col-form-label">Expiry Date:</label>
        <input type="month" class="form-control" id="expiryDate" required min="${new Date()
          .toISOString()
          .substring(0, 7)}">

        <label for="cvv" class="col-form-label">CVV:</label>
        <input type="text" class="form-control" id="cvv" required pattern="^[0-9]{3}$"  placeholder="123">

        <label for="billingAddress" class="col-form-label">Billing Address:</label>
        <input type="text" class="form-control" id="address1" required>
    
        <label for="address2" class="col-form-label">Address Line 2:</label>
        <input type="text" class="form-control" id="address2">
    
        <label for="city" class="col-form-label">City:</label>
        <input type="text" class="form-control" id="city" required>
    
        <label for="province" class="col-form-label">Province:</label>
        <select id="province" class="form-control" required>
            <option value="">Select Province</option>
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NS">Nova Scotia</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="NT">Northwest Territories</option>
            <option value="NU">Nunavut</option>
            <option value="YT">Yukon</option>
        </select>
    
        <label for="country" class="col-form-label">Country:</label>
        <input type="text" class="form-control" id="country" required>
    
        <label for="postalCode" class="col-form-label">Postal Code:</label>
        <input type="text" class="form-control" id="postalCode" required pattern="^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$"  placeholder="A1B2C3">
    </div>


    <div class="modal-footer">
        <button type="submit" value="submit" id="confirm-${serviceId}" class="btn btn-primary confirm-booking footer-btn submit">Confirm Booking</button>
        <button type="button" class="btn btn-danger footer-btn" data-bs-dismiss="modal">Close</button>
    </div>
    
        </form>
      </div>
  </div>
</div>`;

  return paymentModal;
}

function createBookingModal(service) {
  let bookingModal = `
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${service.id}">
                        Book Now!
                    </button>
    
    
    <div class="modal fade" id="modal-${service.id}" tabindex="-1" role="dialog"
    aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Booking for: ${service.name}</h5>
                <button type="button" class="close px-2" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">

                <form id="form-serv-${service.id}">
                    <div class="form-group">
                        <label for="customer-name-${service.id}" class="col-form-label">Customer Name:</label>
                        <input type="text" class="form-control" id="customer-name-${service.id}" required>
                    </div>

                    <div class="form-group">
                        <label for="contact-${service.id}" class="col-form-label">Phone Contact:</label>
                        <input type="tel" class="form-control" id="contact-${service.id}"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="613-123-4567" required>
                    </div>

                    <div class="form-group provider-div">
                        <label for="bk-provider-${service.id}">Choose from our Professionals:</label>
                        <select name="" id="bk-provider-${service.id}">
                            <option value="any">Anyone who is available</option>
                            <option value="provider-1">Tevin</option>
                            <option value="provider-2">Christian</option>
                        </select>
                    </div>

                    <div class="form-group">
                      <label for="booking-date-${service.id}" class="col-form-label date-label">
                        Booking Date:
                        <span class="info-card" 
                        data-toggle="tooltip" 
                        data-placement="right" 
                        title="Dates greyed out are already booked. Please select from our available dates.">
                          <i class="fa fa-info-circle"></i>
                        </span>
                      </label>
                      <input type="date" name="date" id="booking-date-${service.id}" class="date-input" onchange="" required>
                    </div>

                    
                    <div class="form-group">
                    
                    <label for="bk-time-${service.id}">Booking Time:</label>
                    <select name="" id="bk-time-${service.id}">
                        <option value="1">9:00AM</option>
                        <option value="2">10:00AM</option>
                        <option value="3">11:00AM</option>
                        <option value="4">12:00PM</option>
                        <option value="5">1:00PM</option>
                        <option value="6">2:00PM</option>
                        <option value="7">3:00PM</option>
                        <option value="8">4:00PM</option>
                        <option value="8">5:00PM</option>
                    </select>

                    </div>

                    <div class="modal-footer">
                        <button type ="button" id="service-pay-${service.id}" class="btn btn-primary footer-btn submit go-to-payment" data-bs-target="#paymentModal-${service.id}" ">Proceed to payment</button>
                        <button type="button" class="btn btn-danger footer-btn" data-bs-dismiss="modal">Close</button>
                    </div>

                </form>

            </div>
        
        </div>
    </div>
</div>`;

  return bookingModal;
}

function getAllIds(id) {
  var elementsWithKeyword = document.querySelectorAll("[id*=" + id + "]");
  var elementsArray = Array.from(elementsWithKeyword);
  return elementsArray;
}

function loadServices() {
  const servicesContainer = document.querySelector(".services-container");

  console.log("Loading services!");
  servicesContainer.innerHTML = ``;

  services.forEach((service) => {
    let sCard = createServiceCard(service);
    servicesContainer.innerHTML += sCard;
    servicesContainer.innerHTML += createPaymentModal(service.id);
  });

  services.forEach((service) => {
    const providerElement = document.querySelector(
      "#bk-provider-" + service.id
    );
    providerElement.innerHTML = ``;
    // providerElement.innerHTML += `<option value="any">Anyone who is available</option>`;

    for (const prov of providers) {
      if (prov.service.includes(service.id)) {
        providerElement.innerHTML += `<option value="prov-${prov.id}">${prov.name}</option>`;
      }
    }
  });

  var today = new Date().toISOString().split("T")[0];
  var wMax = new Date(new Date().setDate(new Date().getDate() + 14))
    .toISOString()
    .split("T")[0];

  getAllIds("booking-date").forEach((el) => el.setAttribute("min", today));
  getAllIds("booking-date").forEach((el) => el.setAttribute("max", wMax));
}

document.addEventListener("DOMContentLoaded", function () {
  loadServices();
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("go-to-payment")) {
    console.log("Payment button clicked");
    const serviceId = e.target.id.substring(12);
    const form = document.getElementById(`form-serv-${serviceId}`);
    // console.log(form.checkValidity());
    // console.log(form.elements[2].value);

    // if (form.checkValidity()) {
      validateBookingRequest(form);
    // }

    console.log("Payment button clicked");
  }
});

function validateBookingRequest(form) {
  const startHour = 9;
  const providerId = form.elements[2].value.substring(5);
  const bkDate = form.elements[3].value;
  const bkTime = form.elements[4].value;
  const bkDateTime = new Date(bkDate + "T00:00:00").setHours(
    startHour + bkTime
  );

  if (providers[providerId].bookedDates.includes(bkDateTime)) {
    console.log("Provider already booked for this date and time");
    alert("This date is booked. Please choose another date or time.");

    return false;
  } else {
    console.log("Provider not booked and confirmd");

    function showNotification(message) {
      const notification = document.createElement('div');
  
      notification.textContent = message;
  
      notification.classList.add('notification');
  
      document.body.appendChild(notification);
  
      setTimeout(() => {
        notification.style.opacity = 0;
        document.body.removeChild(notification);
      }, 3000);
  }
  
  if (!form.elements[0].value) {
      showNotification("Please enter your name.");
      return false;
  }
  
  if (!form.elements[3].value) {
      showNotification("Please choose a date.");
      return false;
  }
  
  if (!form.elements[4].value) {
      showNotification("Please choose a time.");
      return false;
  }

    bookingDetails.name = form.elements[0].value;
    bookingDetails.dateTime = bkDateTime;
    bookingDetails.provider = providerId;

    // providers[providerId].bookedDates.push(bkDateTime);

    // Get service id for below
    const serviceId = form.elements[0].id.substring(14);

    var myModalEl = document.getElementById(`modal-${serviceId}`);
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

    var paymentModal = new bootstrap.Modal(
      document.getElementById(`paymentModal-${serviceId}`),
      {
        keyboard: false,
      }
    );
    paymentModal.show();

    for (var i = 0; i < form.elements.length - 2; i++) {
      form.elements[i].value = "";
    }

    return true;
  }
}

document.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("A Form was submitted");

  const paymentForms = getAllIds("payment-");
  
  if(paymentForms.includes(e.target)){

    const serviceId = e.target.id.substring(8);

    providers[bookingDetails.provider].bookedDates.push(bookingDetails.dateTime);

    var myModalEl = document.getElementById(`paymentModal-${serviceId}`);
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }
});
