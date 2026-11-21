
/* =========================
   1. PROPERTY DATA
========================= */

const properties = [

    {
        id: 1,
        name: "Green Valley Apartments",
        location: "Whitefield, Bengaluru",
        price: 6500000,
        bedrooms: 2,
        bathrooms: 2,
        area: "1200 sq.ft.",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        tag: "Featured",
        description: "A beautiful modern apartment with spacious rooms, premium interiors, excellent connectivity and convenient access to everyday facilities."
    },

    {
        id: 2,
        name: "Luxury Palm Villa",
        location: "Sarjapur, Bengaluru",
        price: 9500000,
        bedrooms: 3,
        bathrooms: 3,
        area: "1800 sq.ft.",
        type: "Villa",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
        tag: "Popular",
        description: "A beautiful modern apartment with spacious rooms, premium interiors, excellent connectivity and convenient access to everyday facilities."
    },

    {
        id: 3,
        name: "Skyline Residency",
        location: "Electronic City, Bengaluru",
        price: 5500000,
        bedrooms: 2,
        bathrooms: 2,
        area: "1100 sq.ft.",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
        tag: "New",
        description: "A beautiful modern apartment with spacious rooms, premium interiors, excellent connectivity and convenient access to everyday facilities."
    },

    {
        id: 4,
        name: "Royal Garden Villa",
        location: "Hebbal, Bengaluru",
        price: 12000000,
        bedrooms: 4,
        bathrooms: 4,
        area: "2400 sq.ft.",
        type: "Villa",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        tag: "Premium",
        description: "A beautiful modern apartment with spacious rooms, premium interiors, excellent connectivity and convenient access to everyday facilities."
    },

    {
        id: 5,
        name: "The Grand Penthouse",
        location: "Indiranagar, Bengaluru",
        price: 15000000,
        bedrooms: 3,
        bathrooms: 3,
        area: "2000 sq.ft.",
        type: "Penthouse",
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
        tag: "Luxury",
        description: "A beautiful modern apartment with spacious rooms, premium interiors, excellent connectivity and convenient access to everyday facilities."
    },

    {
        id: 6,
        name: "Urban Living Homes",
        location: "Marathahalli, Bengaluru",
        price: 7200000,
        bedrooms: 3,
        bathrooms: 2,
        area: "1450 sq.ft.",
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        tag: "Featured",
        description: "A beautiful modern apartment with spacious rooms, premium interiors, excellent connectivity and convenient access to everyday facilities."
    }

];
// Populate property options in the contact form

function populateContactProperties() {

    const propertySelect = document.getElementById("contactProperty");

    properties.forEach(property => {

        const option = document.createElement("option");

        option.value = property.id;
        option.textContent = property.name;

        propertySelect.appendChild(option);

    });

}

populateContactProperties();


/* =========================
   2. GET HTML ELEMENTS
========================= */

const propertyGrid = document.getElementById("propertyGrid");

const searchForm = document.getElementById("searchForm");

const locationInput = document.getElementById("locationInput");

const typeInput = document.getElementById("typeInput");

const noResults = document.getElementById("noResults");

const filterButtons = document.querySelectorAll(".filter-btn");


/* =========================
   3. DISPLAY PROPERTIES
========================= */

function displayProperties(propertyList) {

    propertyGrid.innerHTML = "";

    if (propertyList.length === 0) {

        noResults.style.display = "block";

        return;
    }

    noResults.style.display = "none";

    propertyList.forEach(property => {

        const card = document.createElement("div");

        card.className = "property-card";

        card.innerHTML = `

            <div class="property-image">

                <img
                    src="${property.image}"
                    alt="${property.name}"
                    onerror="this.src='https://placehold.co/800x500?text=Property+Image'"
                >

                <span class="property-tag">
                    ${property.tag}
                </span>

            </div>

            <div class="property-info">

                <p class="property-location">
                    📍 ${property.location}
                </p>

                <h3>${property.name}</h3>

                <p class="property-price">
                    ₹${(property.price / 100000).toFixed(1)} Lakh
                </p>

                <div class="property-features">

                    <span>🛏 ${property.bedrooms} Beds</span>

                    <span>🛁 ${property.bathrooms} Baths</span>

                    <span>📐 ${property.area}</span>

                </div>
                
                <div class="property-actions">

    <button class="details-button"
        onclick="openPropertyDetails(${property.id})">
        View Details
    </button>
    <button class="location-button"
    onclick="viewPropertyLocation(${property.id})">
    📍 View Location
</button>

    <button class="compare-button"
    data-property-id="${property.id}"
    onclick="toggleCompare(${property.id}, this)">
    ${compareList.includes(property.id) ? "Remove Compare" : "Compare"}
</button>

    <button class="favorite-button"
        onclick="toggleFavorite(${property.id}, this)">
        ♡
    </button>

</div>
            </div>

        `;

        propertyGrid.appendChild(card);

    });

}


/* =========================
   4. SEARCH FUNCTION
========================= */

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const searchText = locationInput.value
        .trim()
        .toLowerCase();

    const selectedType = typeInput.value;

    const filteredProperties = properties.filter(property => {

        const matchesLocation =
            property.location.toLowerCase().includes(searchText) ||
            property.name.toLowerCase().includes(searchText);

        const matchesType =
            selectedType === "All" ||
            property.type === selectedType;

        return matchesLocation && matchesType;

    });

    displayProperties(filteredProperties);

    document.getElementById("properties").scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================
   5. CATEGORY FILTER
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove selected class from all buttons

        filterButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Highlight selected button

        this.classList.add("selected");

        // Get selected category

        const category = this.dataset.category;

        // Filter properties

        const filteredProperties = category === "All"
            ? properties
            : properties.filter(property =>
                property.type === category
            );

        // Clear search fields

        locationInput.value = "";

        typeInput.value = "All";

        displayProperties(filteredProperties);

    });

});


/* =========================
   6. INITIAL PAGE LOAD
========================= */

// Display all properties when website opens
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let compareList = JSON.parse(localStorage.getItem("compareList")) || [];


displayProperties(properties);

/* =========================
   7. PROPERTY DETAILS POPUP
========================= */

function openPropertyDetails(id) {

    const property = properties.find(item => item.id === id);

    if (!property) return;

    document.getElementById("modalImage").src = property.image;

    document.getElementById("modalName").textContent =
        property.name;

    document.getElementById("modalLocation").textContent =
        property.location;

    document.getElementById("modalPrice").textContent =
        "₹" + (property.price / 100000).toFixed(1) + " Lakh";

    document.getElementById("modalFeatures").innerHTML = `
        <span>🛏 ${property.bedrooms} Bedrooms</span>
        <span>🛁 ${property.bathrooms} Bathrooms</span>
        <span>📐 ${property.area}</span>
    `;

    document.getElementById("modalDescription").textContent =
        property.description || "Explore this beautiful property.";

    document.getElementById("propertyModal").classList.add("show");

}


/* CLOSE PROPERTY POPUP */

document.getElementById("closeModal").addEventListener("click", function() {

    document.getElementById("propertyModal").classList.remove("show");

});


/* CLOSE WHEN CLICKING OUTSIDE */

document.getElementById("propertyModal").addEventListener("click", function(event) {

    if (event.target === this) {
        this.classList.remove("show");
    }

});


/* =========================
   8. FAVOURITE FUNCTION
========================= */



function toggleFavorite(id, button) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(item => item !== id);

        button.innerHTML = "♡";

        button.classList.remove("favorited");

    } else {

        favorites.push(id);

        button.innerHTML = "♥";

        button.classList.add("favorited");

    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadDashboard();

}

/* =========================
   BOOKING FORM
========================= */

// Store the selected property
let selectedProperty = null;


// OPEN BOOKING FORM

document.getElementById("bookButton").addEventListener("click", function() {

    // Get the selected property name
    const propertyName = document.getElementById("modalName").textContent;

    // Find the selected property
    selectedProperty = properties.find(function(property) {
        return property.name === propertyName;
    });

    // Display property name in booking form
    document.getElementById("bookingPropertyName").textContent =
        "Property: " + propertyName;

    // Close property details popup
    document.getElementById("propertyModal").classList.remove("show");

    // Open booking form
    document.getElementById("bookingModal").classList.add("show");

});


// CLOSE BOOKING FORM

document.getElementById("closeBookingModal").addEventListener("click", function() {

    document.getElementById("bookingModal").classList.remove("show");

});


// CLOSE WHEN CLICKING OUTSIDE

document.getElementById("bookingModal").addEventListener("click", function(event) {

    if (event.target === this) {

        this.classList.remove("show");

    }

});

/* =========================
   CONFIRM PROPERTY BOOKING
========================= */

// Prevent selecting past dates
const visitDateInput = document.getElementById("visitDate");

const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

visitDateInput.min = localToday;



/* =========================
   BOOKING + DEMO PAYMENT
========================= */

let pendingBooking = null;

// Handle booking submission
document.getElementById("bookingForm").addEventListener("submit", function(event) {

    event.preventDefault();

    if (!selectedProperty) {
        alert("Please select a property first.");
        return;
    }

    // Temporarily store booking details
    pendingBooking = {
        propertyName: selectedProperty.name,
        customerName: document.getElementById("customerName").value,
        customerEmail: document.getElementById("customerEmail").value,
        visitDate: visitDateInput.value,
        visitTime: document.getElementById("visitTime").value,
        bookingFee: 500,
        paymentStatus: "Pending"
    };

    // Show payment modal
    document.getElementById("paymentPropertyName").textContent =
        pendingBooking.propertyName;

    document.getElementById("bookingModal").classList.remove("show");

    document.getElementById("paymentModal").classList.add("show");

});


// Handle demo payment
document.getElementById("paymentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    if (!pendingBooking) return;

    const selectedPayment = document.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
    }

    // Update payment details
    pendingBooking.paymentMethod = selectedPayment.value;
    pendingBooking.paymentStatus = "Demo Payment Successful";

    // Save booking after demo payment confirmation
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(pendingBooking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadDashboard();

    // Display booking confirmation
    document.getElementById("confirmedProperty").textContent =
        pendingBooking.propertyName;

    document.getElementById("confirmedDate").textContent =
        "Visit Date: " + pendingBooking.visitDate;

    document.getElementById("confirmedTime").textContent =
        "Visit Time: " + pendingBooking.visitTime;

    // Close payment modal
    document.getElementById("paymentModal").classList.remove("show");

    // Show confirmation modal
    document.getElementById("bookingConfirmationModal").classList.add("show");

    // Reset forms
    document.getElementById("bookingForm").reset();
    this.reset();

    pendingBooking = null;

    alert("Demo payment successful! Your booking is confirmed.");

});


// Close payment modal
document.getElementById("closePaymentModal").addEventListener("click", function() {

    document.getElementById("paymentModal").classList.remove("show");

    pendingBooking = null;

});


// Close confirmation screen
document.getElementById("finishBooking").addEventListener("click", function() {

    document.getElementById("bookingConfirmationModal").classList.remove("show");

});

/* =========================
   LOAD CUSTOMER DASHBOARD
========================= */

function loadDashboard() {

    // Get saved data
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    const enquiries = JSON.parse(localStorage.getItem("enquiries")) || [];

    // Get dashboard elements
    const bookingCount = document.getElementById("bookingCount");
    const favoriteCount = document.getElementById("favoriteCount");
    const enquiryCount = document.getElementById("enquiryCount");

    const bookingsContainer = document.getElementById("dashboardBookings");
    const favoritesContainer = document.getElementById("dashboardFavorites");
    const enquiryContainer = document.getElementById("dashboardEnquiries");

    // Update statistics
    bookingCount.textContent = bookings.length;
    favoriteCount.textContent = favoriteIds.length;
    enquiryCount.textContent = enquiries.length;

   
    // Display bookings
    if (bookings.length === 0) {

        bookingsContainer.innerHTML =
            "<p>No bookings yet. Explore properties and book a visit!</p>";

    } else {

        bookingsContainer.innerHTML = bookings.map((booking, index) => `
            <div class="dashboard-item booking-dashboard-item">

                <h3>${booking.propertyName}</h3>

                <p><strong>Customer:</strong> ${booking.customerName}</p>

                <p><strong>Email:</strong> ${booking.customerEmail}</p>

                <p><strong>Visit Date:</strong> ${booking.visitDate}</p>

                <p><strong>Visit Time:</strong> ${booking.visitTime}</p>

                <p><strong>Status:</strong> Confirmed (Demo)</p>

                <div class="booking-actions">

                    <button type="button"
                        class="view-booking-button"
                        onclick="viewBooking(${index})">
                        View Details
                    </button>

                    <button type="button"
                        class="reschedule-booking-button"
                        onclick="rescheduleBooking(${index})">
                        Reschedule
                    </button>

                    <button type="button"
                        class="cancel-booking-button"
                        onclick="cancelBooking(${index})">
                        Cancel Booking
                    </button>

                </div>

            </div>
        `).join("");
    }
 
    // Find favourite properties
    const favoriteProperties = properties.filter(property =>
        favoriteIds.includes(property.id)
    );

    // Display favourites
    if (favoriteProperties.length === 0) {

        favoritesContainer.innerHTML =
            "<p>You haven't saved any favourite properties yet.</p>";

    } else {

        favoritesContainer.innerHTML = favoriteProperties.map(property => `
            <div class="dashboard-item">
                <h3>${property.name}</h3>
                <p>${property.location}</p>
                <p>Price: ₹${property.price.toLocaleString("en-IN")}</p>
            </div>
        `).join("");
    }

    // Display enquiries
    if (enquiries.length === 0) {

        enquiryContainer.innerHTML =
            "<p>You haven't submitted any enquiries yet.</p>";

    } else {

        enquiryContainer.innerHTML = enquiries.map((enquiry, index) => `
            <div class="dashboard-enquiry">

                <h4>${enquiry.property}</h4>

                <p><strong>Name:</strong> ${enquiry.name}</p>
                <p><strong>Email:</strong> ${enquiry.email}</p>
                <p><strong>Phone:</strong> ${enquiry.phone}</p>
                <p><strong>Message:</strong> ${enquiry.message}</p>

                <small>${enquiry.date}</small>
                <button
    class="edit-enquiry-button"
    onclick="editEnquiry(${index})">
    Edit Enquiry
</button>

                <button
                    class="delete-enquiry-button"
                    onclick="deleteEnquiry(${index})">
                    Delete Enquiry
                </button>

            </div>
        `).join("");
    }
}

// Load dashboard when page opens
loadDashboard();

/* =========================
   COMPARE PROPERTIES
========================= */

function toggleCompare(id, button) {

    if (compareList.includes(id)) {

        compareList = compareList.filter(
            propertyId => propertyId !== id
        );

        button.textContent = "Compare";

    } else {

        if (compareList.length >= 3) {
            alert("You can compare a maximum of 3 properties.");
            return;
        }

        compareList.push(id);

        button.textContent = "Remove Compare";
    }

    localStorage.setItem(
        "compareList",
        JSON.stringify(compareList)
    );
    displayComparison();
}
/* =========================
   DISPLAY COMPARISON TABLE
========================= */

function displayComparison() {

    const compareContainer =
        document.getElementById("compareContainer");

    // Get selected properties
    const selectedProperties = properties.filter(property =>
        compareList.includes(property.id)
    );

    // If no properties are selected
    if (selectedProperties.length === 0) {

        compareContainer.innerHTML = `
            <div class="compare-empty">
                <h3>No Properties Selected</h3>
                <p>
                    Select up to 3 properties using the Compare button
                    to see them side by side.
                </p>
            </div>
        `;

        return;
    }

    // Create comparison table
    compareContainer.innerHTML = `

        <div class="comparison-table-wrapper">

            <table class="comparison-table">

                <thead>
                    <tr>
                        <th>Features</th>

                        ${selectedProperties.map(property => `
    <th>
        ${property.name}

        <button
            class="remove-compare-button"
            onclick="removeComparedProperty(${property.id})">
            Remove
        </button>
    </th>
`).join("")}

                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>Price</td>
                        ${selectedProperties.map(property => `
                            <td>₹${property.price.toLocaleString("en-IN")}</td>
                        `).join("")}
                    </tr>

                    <tr>
                        <td>Location</td>
                        ${selectedProperties.map(property => `
                            <td>${property.location}</td>
                        `).join("")}
                    </tr>

                    <tr>
                        <td>Bedrooms</td>
                        ${selectedProperties.map(property => `
                            <td>${property.bedrooms}</td>
                        `).join("")}
                    </tr>

                    <tr>
                        <td>Bathrooms</td>
                        ${selectedProperties.map(property => `
                            <td>${property.bathrooms}</td>
                        `).join("")}
                    </tr>

                    <tr>
                        <td>Area</td>
                        ${selectedProperties.map(property => `
                            <td>${property.area}</td>
                        `).join("")}
                    </tr>

                    <tr>
                        <td>Property Type</td>
                        ${selectedProperties.map(property => `
                            <td>${property.type}</td>
                        `).join("")}
                    </tr>

                </tbody>

            </table>

        </div>

    `;
}

// Display saved comparison when page opens
displayComparison();
/* =========================
   REMOVE COMPARED PROPERTY
========================= */

function removeComparedProperty(id) {

    compareList = compareList.filter(
        propertyId => propertyId !== id
    );

    localStorage.setItem(
        "compareList",
        JSON.stringify(compareList)
    );

    // Update comparison table
    displayComparison();

    // Update Compare button labels
    document.querySelectorAll(".compare-button").forEach(button => {

        if (Number(button.dataset.propertyId) === id) {
            button.textContent = "Compare";
        }

    });
}

/* =========================
   HANDLE CUSTOMER ENQUIRY
========================= */

document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Get customer details
    const enquiry = {
        name: document.getElementById("contactName").value,
        email: document.getElementById("contactEmail").value,
        phone: document.getElementById("contactPhone").value,
        property: document.getElementById("contactProperty").selectedOptions[0].textContent,
        message: document.getElementById("contactMessage").value,
        date: new Date().toLocaleString()
    };

    // Get existing enquiries
    let enquiries = JSON.parse(localStorage.getItem("enquiries")) || [];

    // Save new enquiry
    enquiries.push(enquiry);

    localStorage.setItem("enquiries", JSON.stringify(enquiries));

    // Refresh dashboard immediately
    loadDashboard();

    // Show success message
    document.getElementById("contactSuccess").style.display = "block";

    // Clear form
    this.reset();

});



/* =========================
   EDIT ENQUIRY POPUP
========================= */

let editingEnquiryIndex = null;

// OPEN EDIT POPUP
function editEnquiry(index) {

    const enquiries = JSON.parse(localStorage.getItem("enquiries")) || [];

    const enquiry = enquiries[index];

    if (!enquiry) {
        alert("Enquiry not found!");
        return;
    }

    editingEnquiryIndex = index;

    // Fill the form with existing details
    document.getElementById("editEnquiryName").value = enquiry.name;
    document.getElementById("editEnquiryEmail").value = enquiry.email;
    document.getElementById("editEnquiryPhone").value = enquiry.phone;
    document.getElementById("editEnquiryMessage").value = enquiry.message;

    // Open popup
    document.getElementById("editEnquiryModal").classList.add("show");
}


// CLOSE EDIT POPUP
function closeEditEnquiryModal() {

    document.getElementById("editEnquiryModal").classList.remove("show");

    editingEnquiryIndex = null;
}


// CLOSE BUTTON
document.getElementById("closeEditEnquiry").addEventListener("click", function() {
    closeEditEnquiryModal();
});


// CANCEL BUTTON
document.getElementById("cancelEditEnquiry").addEventListener("click", function() {
    closeEditEnquiryModal();
});


// SAVE UPDATED ENQUIRY
document.getElementById("editEnquiryForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Check selected enquiry
    if (editingEnquiryIndex === null) {
        alert("Please select an enquiry to edit.");
        return;
    }

    // Get saved enquiries
    let enquiries = JSON.parse(localStorage.getItem("enquiries")) || [];

    const enquiry = enquiries[editingEnquiryIndex];

    if (!enquiry) {
        alert("Enquiry not found!");
        closeEditEnquiryModal();
        loadDashboard();
        return;
    }

    // Get updated details
    const updatedName = document.getElementById("editEnquiryName").value.trim();

    const updatedEmail = document.getElementById("editEnquiryEmail").value.trim();

    const updatedPhone = document.getElementById("editEnquiryPhone").value.trim();

    const updatedMessage = document.getElementById("editEnquiryMessage").value.trim();

    // Validate fields
    if (!updatedName || !updatedEmail || !updatedPhone || !updatedMessage) {
        alert("Please fill in all fields.");
        return;
    }

    // Update enquiry
    enquiry.name = updatedName;
    enquiry.email = updatedEmail;
    enquiry.phone = updatedPhone;
    enquiry.message = updatedMessage;

    // Save updated data
    localStorage.setItem("enquiries", JSON.stringify(enquiries));

    // Close popup and refresh dashboard
    closeEditEnquiryModal();

    loadDashboard();

    alert("Enquiry updated successfully!");

});



/* =========================
   DELETE CUSTOMER ENQUIRY
========================= */

function deleteEnquiry(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) {
        return;
    }

    let enquiries = JSON.parse(localStorage.getItem("enquiries")) || [];

    enquiries.splice(index, 1);

    localStorage.setItem("enquiries", JSON.stringify(enquiries));

    loadDashboard();

}

/* =========================
   RESCHEDULE BOOKING
========================= */

let reschedulingBookingIndex = null;

// Open reschedule popup
function rescheduleBooking(index) {

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const booking = bookings[index];

    if (!booking) return;

    reschedulingBookingIndex = index;

    document.getElementById("reschedulePropertyName").textContent =
        booking.propertyName;

    const dateInput = document.getElementById("rescheduleDate");

    const today = new Date();

    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localToday;
    dateInput.value = booking.visitDate;

    document.getElementById("rescheduleTime").value = booking.visitTime;

    document.getElementById("rescheduleBookingModal")
        .classList.add("show");
}


// Close popup
function closeRescheduleModal() {

    document.getElementById("rescheduleBookingModal")
        .classList.remove("show");

    reschedulingBookingIndex = null;
}

document.getElementById("closeRescheduleModal")
    .addEventListener("click", closeRescheduleModal);


// Save new schedule
document.getElementById("rescheduleBookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        if (reschedulingBookingIndex === null) return;

        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

        const booking = bookings[reschedulingBookingIndex];

        if (!booking) return;

        booking.visitDate =
            document.getElementById("rescheduleDate").value;

        booking.visitTime =
            document.getElementById("rescheduleTime").value;

        localStorage.setItem("bookings", JSON.stringify(bookings));

        closeRescheduleModal();

        loadDashboard();

        alert("Your booking has been rescheduled successfully!");

    });
/* =========================
   CANCEL BOOKING
========================= */

function cancelBooking(index) {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.splice(index, 1);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadDashboard();

    alert("Booking cancelled successfully!");
}
/* =========================
   VIEW BOOKING DETAILS
========================= */

function viewBooking(index) {

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const booking = bookings[index];

    if (!booking) return;

    alert(
        "BOOKING DETAILS\n\n" +
        "Property: " + booking.propertyName + "\n" +
        "Customer: " + booking.customerName + "\n" +
        "Email: " + booking.customerEmail + "\n" +
        "Visit Date: " + booking.visitDate + "\n" +
        "Visit Time: " + booking.visitTime + "\n" +
        "Status: Confirmed (Demo)"
    );
}

/* =========================
   CUSTOMER PROFILE
========================= */

// Generate initials from customer name
function updateProfileAvatar(name) {

    const avatar = document.getElementById("profileAvatar");

    const initials = name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word.charAt(0).toUpperCase())
        .join("");

    avatar.textContent = initials || "GU";
}


// Load saved profile
function loadProfile() {

    const profile = JSON.parse(
        localStorage.getItem("customerProfile")
    );

    if (!profile) return;

    document.getElementById("profileName").value =
        profile.name || "";

    document.getElementById("profileEmail").value =
        profile.email || "";

    document.getElementById("profilePhone").value =
        profile.phone || "";

    updateProfileAvatar(profile.name || "");
}


// Save profile details
document.getElementById("profileForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const profile = {
            name: document.getElementById("profileName").value.trim(),
            email: document.getElementById("profileEmail").value.trim(),
            phone: document.getElementById("profilePhone").value.trim()
        };

        // Save profile in LocalStorage
        localStorage.setItem(
            "customerProfile",
            JSON.stringify(profile)
        );

        // Update avatar initials
        updateProfileAvatar(profile.name);

        // Show success message
        document.getElementById("profileSuccess").style.display = "block";

    });


// Load profile when website opens
loadProfile();
/* =========================
   PROPERTY LOCATION
========================= */

function viewPropertyLocation(propertyId) {

    const property = properties.find(
        item => item.id === propertyId
    );

    if (!property) return;

    const mapUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(property.location + ", Bengaluru, India");

    window.open(mapUrl, "_blank");

}