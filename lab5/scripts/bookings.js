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

  //  <a href="#" class="btn btn-info">Book Now!</a>

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
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">

                <form>
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
                            <option value="none">Anyone who is available</option>
                            <option value="provider-1">Tevin</option>
                            <option value="provider-2">Christian</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="booking-date-${service.id}" class="col-form-label date-label">Booking Date:</label>
                        <input type="date" name="date" id="booking-date-${service.id}" class="date-input" onchange="" required>
                    </div>

                    
                    <div class="form-group">
                    
                    <label for="bk-time-${service.id}">Booking Time:</label>
                    <select name="" id="bk-time-${service.id}">
                        <option value="op1">9:00AM</option>
                        <option value="op2">10:00AM</option>
                        <option value="op3">11:00AM</option>
                        <option value="op4">12:00PM</option>
                        <option value="op5">1:00PM</option>
                        <option value="op6">2:00PM</option>
                        <option value="op7">3:00PM</option>
                        <option value="op8">4:00PM</option>
                        <option value="op8">5:00PM</option>
                    </select>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" value="submit" id="confirm-${service.id}" class="btn btn-primary confirm-booking">Confirm Booking</button>
                    </div>

                </form>

            </div>
        
        </div>
    </div>
</div>`;

  return bookingModal;
}

function getAllIds(id) {
  // Replace 'yourKeyword' with the actual keyword you're looking for
  var keyword = id;

  // Select all elements whose id contains the specified keyword
  var elementsWithKeyword = document.querySelectorAll("[id*=" + keyword + "]");

  // elementsWithKeyword is a NodeList, you can convert it to an array if needed
  var elementsArray = Array.from(elementsWithKeyword);

  // Now you can loop through the array of elements or perform other operations
  /* elementsArray.forEach(function (element) {
    // Your code to work with each matching element
    console.log(element.id);
  }); */

  return elementsArray;
}

function loadServices() {
  const servicesContainer = document.querySelector(".services-container");

  console.log("Loading services!");
  servicesContainer.innerHTML = ``;

  services.forEach((service) => {
    // console.log(service);
    let sCard = createServiceCard(service);
    servicesContainer.innerHTML += sCard;
  });

  var today = new Date().toISOString().split("T")[0];
  var wMax = new Date(new Date().setDate(new Date().getDate() + 14))
    .toISOString()
    .split("T")[0];

  getAllIds("booking-date").forEach((el) => el.setAttribute("min", today));
  getAllIds("booking-date").forEach((el) => el.setAttribute("max", wMax));

  /* document
    .querySelectorAll(".booking-date")
    .forEach((el) => el.setAttribute("min", today));
  document
    .querySelectorAll(".booking-date")
    .forEach((el) => el.setAttribute("max", wMax)); */
}

function validateBookingDate() {
  // Get the selected date from the input field
  var selectedDate = document.getElementById("booking-date").value;
  console.log(selectedDate);

  // Example: Assume dates 2024-02-20 and 2024-02-25 are booked
  var bookedDates = ["2024-02-20", "2024-02-25"];

  // Check if the selected date is in the array of booked dates
  if (bookedDates.includes(selectedDate)) {
    alert("This date is booked. Please choose another date.");
    document.getElementById("bookingDate").value = ""; // Clear the input field
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  // const home = document.querySelector('#services');

  loadServices();
  //   getAllIds("booking-date");
});

document.addEventListener("click", function (e) {
  const confirmBtns = getAllIds("confirm-");
  if (confirmBtns.includes(e.target)) {
    console.log("Confirm button clicked for ");
  }
  //   if (e.target.classList.contains("confirm-booking")) {
  //       console.log('Booking confirmed!');
  //   }

  // window.jQuery('#exampleModal').modal('show');
});

document.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form was submitted");

  /* var data = null;
  for (var i = 0; i < e.target.elements.length - 2; i++) {
    data = e.target.elements[i].value;
    switch (i) {
      case 0:
        if (data == null || data == "") {
          // validation failed, throw error
        }
        break;

        case 1:
        if (data == null || data == "") {
          // validation failed, throw error
        }
        break;
    }
  } */
});
