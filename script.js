// ===============================
// Customer Feedback - GitHub Demo
// ===============================

let selectedRating = "";
let selectedEmoji = "";

// Rating text
const ratings = {
    1: { emoji: "🤩", text: "Excellent" },
    2: { emoji: "😊", text: "Good" },
    3: { emoji: "😐", text: "Average" },
    4: { emoji: "☹️", text: "Poor" },
    5: { emoji: "😡", text: "Bad" }
};

// Select Emoji
document.querySelectorAll(".emoji").forEach(function (emoji) {

    emoji.addEventListener("click", function () {

        document.querySelectorAll(".emoji").forEach(function (e) {
            e.classList.remove("selected");
        });

        this.classList.add("selected");

        selectedRating = this.dataset.rating;
        selectedEmoji = ratings[selectedRating].emoji;

        document.getElementById("ratingText").innerHTML =
            selectedEmoji + " " + ratings[selectedRating].text;

    });

});
// ===============================
const scriptURL = "https://script.google.com/macros/s/AKfycbyRyz4n95a1Lkj0iLuFG61Z4RiGRZz5EC88WyyLRtIAlEEtuEju32odxATSGvJv1sLE/exec";

// Submit Button
document.getElementById("submitBtn").addEventListener("click", function () {

    let orderNo = document.getElementById("orderNo").value.trim();
    let experience = document.getElementById("experience").value.trim();
    let improve = document.getElementById("improve").value.trim();

    // Validation
    if (orderNo === "") {
        alert("Please enter Order Number.");
        return;
    }

    if (selectedRating === "") {
        alert("Please select a rating.");
        return;
    }

    // Create Feedback Object
    const feedback = {

        orderNumber: orderNo,
        rating: ratings[selectedRating].text,
        emoji: selectedEmoji,
        experience: experience,
        improvement: improve,
        submittedOn: new Date().toLocaleString()

    };

    // Save in Browser
    let data = JSON.parse(localStorage.getItem("feedbackData")) || [];

    data.push(feedback);

    localStorage.setItem("feedbackData", JSON.stringify(data));

    // Create Feedback Text File
    let txt = `
-----------------------------------------
JAI KAPEES INFRACON PVT LTD

Customer Feedback
-----------------------------------------
Order Number : ${feedback.orderNumber}

Rating : ${feedback.emoji} ${feedback.rating}

Experience :
${feedback.experience}

Improvement :
${feedback.improvement}

Submitted On :
${feedback.submittedOn}

-----------------------------------------
`;

    // Download feedback.txt
    const blob = new Blob([txt], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "feedback.txt";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    // Thank You Message
    alert("🎉 Thank you for your valuable feedback!");const scriptURL =
"https://script.google.com/macros/s/AKfycbyRyz4n95a1Lkj0iLuFG61Z4RiGRZz5EC88WyyLRtIAlEEtuEju32odxATSGvJv1sLE/exec";

document.getElementById("submitBtn").addEventListener("click", function () {

    let orderNo = document.getElementById("orderNo").value.trim();
    let experience = document.getElementById("experience").value.trim();
    let improve = document.getElementById("improve").value.trim();

    if(orderNo==""){
        alert("Enter Order Number");
        return;
    }

    if(selectedRating==""){
        alert("Select Rating");
        return;
    }

    let feedback={

        orderNo:orderNo,
        rating:ratings[selectedRating].text,
        emoji:selectedEmoji,
        experience:experience,
        improvement:improve

    };

    fetch(scriptURL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(feedback)

    })

    .then(response=>response.json())

    .then(data=>{

        if(data.status=="success"){

            alert("Thank you for your valuable feedback.");

            window.location.href="scratch.html";

        }else{

            alert(data.message);

        }

    })

    .catch(error=>{

        console.log(error);

        alert("Connection Failed");

    });

});

    // Redirect to Scratch Card
    setTimeout(function () {

        window.location.href = "scratch.html";

    }, 2000);

});
