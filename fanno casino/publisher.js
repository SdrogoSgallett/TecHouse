var publishForm = document.getElementById("publishForm");

publishForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var topic = document.getElementById("topic").value.trim();
    var message = document.getElementById("message").value.trim();

    if (!topic || !message) {
        alert("Topic and message are required!");
        return;
    }

    fetch("/publish", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, message }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert(data.message);
        })
        .catch((error) => console.error("Error:", error));
});
