let services = [
    {
        id: 0,
        name: "Hair Consulations",
        description: "Take an appointment with our hairstylists to get advice on how to treat and take care of your hair.",
        price: "40",
        img: "consultation.jpeg",
        offeredBy: ['Marsell Wall', 'Butch Coolid', 'Marsell Wall']
    },
    {
        id: 1,
        name: "Hair Styling",
        description: "Several hairstyles, made by experts - exactly like or better than you'd expect!",
        price: "30-40",
        img: 'stylings.jpeg',
        offeredBy: ['Marsell Wall', 'Jule Winfield', 'Marsell Wall']
    },
    {
        id: 2,
        name: "Hair Cuts",
        description: "Whatever cut, whatever style, your call - we're here to service you!",
        price: "40-60",
        img: 'haircut.jpg',
        offeredBy: ['Marsell Wall', 'Butch Coolid', 'Jule Winfield']
    },
    {
        id: 3,
        name: "Hair Dying",
        description: "Colors, textures and bazinga.",
        price: "60-100",
        img: "drying.jpeg",
        offeredBy: ['Marsell Wall', 'Butch Coolid', 'Jule Winfield']
    },
];

function createServiceCard(service) {

    let serviceModal = createBookingModal(service);

    //  <a href="#" class="btn btn-info">Book Now!</a>

    let cardHTML = `<div class="card service" style="">
    <img class="card-img-top service-img" src="./imgs/${service.img}" alt="Image of service: ${service.name}">
    <div class="card-body">
      <h5 class="card-title fw-bold">${service.name}</h5>
      <h6 class="card-subtitle mb-2 ">$${service.price}</h6>
      <p class="card-text">${service.description}</p>
      <h6 class="card-text offeredBy">Offered by: ${service.offeredBy}</h6>
     
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
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Booking for: ${service.name}</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">

                <form>
                    <div class="form-group">
                        <label for="customer-name" class="col-form-label">Customer Name:</label>
                        <input type="text" class="form-control" id="customer-name" required>
                    </div>

                    <div class="form-group">
                        <label for="contact" class="col-form-label">Phone Contact:</label>
                        <input type="tel" class="form-control" id="contact"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="613-123-4567" required>
                    </div>

                    <div class="form-group">
                        <label for="date" class="col-form-label">Date:</label>
                        <input type="date" name="date" id="date" required>

                        <label for="bk-time">Time:</label>
                    <select name="" id="bk-time">
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

                    <div class="form-group">
                    
                    </div>

                    <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" value="submit" class="btn btn-primary confirm-booking">Confirm Booking</button>
            </div>

                </form>

            </div>
        
        </div>
    </div>
</div>`;

    return bookingModal;


}

function loadServices() {
    const servicesContainer = document.querySelector('.services-container');

    console.log('Loading services!');
    servicesContainer.innerHTML = ``;

    services.forEach(service => {
        // console.log(service);
        let sCard = createServiceCard(service);
        servicesContainer.innerHTML += sCard;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // const home = document.querySelector('#services');

    loadServices();
});

document.addEventListener("click", function (e) {
    // const home = document.querySelector('#services');

    // if (e.target.classList.contains("confirm-booking")) {
    //     console.log('Booking confirmed!');
    // }

    // window.jQuery('#exampleModal').modal('show');
});

document.addEventListener("submit", function (e) {
    
    console.log("Form was submitted");

});
