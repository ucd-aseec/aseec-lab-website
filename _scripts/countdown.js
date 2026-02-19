function updateCountdowns() {
  var cards = document.querySelectorAll("[data-deadline]");
  var now = new Date().getTime();

  cards.forEach(function (card) {
    var deadline = new Date(card.getAttribute("data-deadline") + "T23:59:59").getTime();
    var diff = deadline - now;

    var daysEl = card.querySelector('[data-unit="days"]');
    var hoursEl = card.querySelector('[data-unit="hours"]');
    var minutesEl = card.querySelector('[data-unit="minutes"]');
    var secondsEl = card.querySelector('[data-unit="seconds"]');

    if (diff <= 0) {
      card.classList.add("countdown-passed");
      if (daysEl) daysEl.textContent = "0";
      if (hoursEl) hoursEl.textContent = "0";
      if (minutesEl) minutesEl.textContent = "0";
      if (secondsEl) secondsEl.textContent = "0";
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
  });
}

window.addEventListener("load", function () {
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
});
