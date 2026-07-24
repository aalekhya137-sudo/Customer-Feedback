// ===============================
// Customer Feedback Form
// ===============================

let selectedRating = "";
let selectedEmoji = "";

const ratings = {
    1: { emoji: "🤩", text: "Excellent" },
    2: { emoji: "😊", text: "Good" },
    3: { emoji: "😐", text: "Average" },
    4: { emoji: "☹️", text: "Poor" },
    5: { emoji: "😡", text: "Bad" }
};

// Your Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbyRyz4n95a1Lkj0iLuFG61Z4RiGRZz5EC88WyyLRtIAlEEtuEju32odxATSGvJv1sLE/exec";

// Emoji Selection
document.querySelectorAll(".emoji").forEach((emoji) => {

    emoji.addEventListener("click", function () {

        document.querySelectorAll(".emoji").forEach(e => e.classList.remove("selected"));

        this.classList.add("selected");

        selectedRating = this.dataset.rating;

        selectedEmoji = ratings[selectedRating].emoji;

        document.getElementById("ratingText").innerHTML =
            selectedEmoji + " " + ratings[selectedRating].text;

    });

});

// Submit
document.getElementById("submitBtn").addEventListener("click", function () {

    const orderNo = document.getElementById("orderNo").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const improvement = document.getElementById("improve").value.trim();

    if(orderNo==""){
        alert("Please Enter Order Number");
        return;
    }

    if(selectedRating==""){
        alert("Please Select Rating");
        return;
    }

    const feedback = {

        orderNo: orderNo,
        rating: ratings[selectedRating].text,
        emoji: selectedEmoji,
        experience: experience,
        improvement: improvement

    };

    fetch(scriptURL,{
        method:"POST",
        body:JSON.stringify(feedback),
        headers:{
            "Content-Type":"application/json"
        }
    })

    .then(res=>res.json())

    .then(data=>{

        if(data.status=="success"){

            alert("Thank You For Your Valuable Feedback");

            window.location.href="scratch.html";

        }else{

            alert(data.message);

        }

    })

    .catch(err=>{

        console.log(err);

        alert("Unable to Submit Feedback");

    });

});
