$(document).ready(function () {
    const $subscriptions = $("#subscriptions");

    // Funzione per creare una nuova riga di sottoscrizione
    function createSubscriptionRow(topic) {
        return `
            <div class="subscription-row" data-topic="${topic}">
                <span class="topic-name">${topic}</span>
                <button type="button" class="unsubscribe-btn">Unsubscribe</button>
            </div>
        `;
    }

    // Funzione per creare un nuovo form
    function createNewForm() {
        return `
            <div class="form-container">
                <input type="text" class="topic-input" placeholder="Inserisci un topic" />
                <button type="button" class="subscribe-btn">Subscribe</button>
            </div>
        `;
    }

    // Recupera i topic sottoscritti al caricamento della pagina
    $.ajax({
        url: "http://localhost:3000/topics",
        type: "GET",
        success: function (response) {
            if (response.success) {
                // Rimuovi tutto per evitare duplicati
                $subscriptions.empty();

                // Aggiungi il form sopra i topic
                $subscriptions.append(createNewForm());

                // Aggiungi i topic caricati sotto il form
                response.topics.forEach((topic) => {
                    $subscriptions.append(createSubscriptionRow(topic));
                });
            }
        },
        error: function (err) {
            console.error("Errore nel recupero dei topic:", err);
        },
    });

    // Listener per il pulsante "Subscribe"
    $subscriptions.on("click", ".subscribe-btn", function () {
        const $formContainer = $(this).closest(".form-container");
        const topic = $formContainer.find(".topic-input").val().trim();

        if (!topic) {
            alert("Inserisci un topic valido!");
            return;
        }

        // Chiamata AJAX per sottoscriversi
        $.ajax({
            url: "http://localhost:3000/subscribe",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ topic }),
            success: function (response) {
                // Aggiungi il nuovo topic alla fine
                $subscriptions.append(createSubscriptionRow(topic));
                // Resetta l'input dopo la sottoscrizione
                $formContainer.find(".topic-input").val("");
                console.log(response.message);
            },
            error: function (err) {
                console.error("Errore nella sottoscrizione:", err);
                alert("Errore nella sottoscrizione!");
            },
        });
    });

    // Listener per il pulsante "Unsubscribe"
    $subscriptions.on("click", ".unsubscribe-btn", function () {
        const $row = $(this).closest(".subscription-row");
        const topic = $row.data("topic");

        // Chiamata AJAX per annullare la sottoscrizione
        $.ajax({
            url: "http://localhost:3000/unsubscribe",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ topic }),
            success: function (response) {
                $row.remove();
                console.log(response.message);
            },
            error: function (err) {
                console.error("Errore nella cancellazione della sottoscrizione:", err);
                alert("Errore nella cancellazione!");
            },
        });
    });
});
