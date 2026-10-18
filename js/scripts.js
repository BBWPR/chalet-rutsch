(() => {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const images = Array.from(gallery.querySelectorAll('.gallery-image'));
    const counter = gallery.querySelector('.gallery-counter');
    const pauseButton = gallery.querySelector('.gallery-pause');
    let current = 0;
    let timer;
    let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(index) {
      current = (index + images.length) % images.length;
      images.forEach((image, i) => { image.hidden = i !== current; });
      counter.textContent = `Bild ${current + 1} von ${images.length}`;
    }

    function restart() {
      clearInterval(timer);
      if (!paused && !document.hidden) {
        timer = setInterval(() => show(current + 1), 3000);
      }
    }

    function move(step) {
      show(current + step);
      restart();
    }

    function updatePauseButton() {
      pauseButton.textContent = paused ? 'Diashow starten' : 'Diashow pausieren';
      pauseButton.setAttribute('aria-pressed', String(paused));
    }

    gallery.querySelector('.gallery-prev').addEventListener('click', () => move(-1));
    gallery.querySelector('.gallery-next').addEventListener('click', () => move(1));
    gallery.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    });
    pauseButton.addEventListener('click', () => {
      paused = !paused;
      updatePauseButton();
      restart();
    });
    document.addEventListener('visibilitychange', restart);
    updatePauseButton();
    restart();
  }

  const days = document.getElementById('calendar-days');
  if (days) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let month = new Date(today.getFullYear(), today.getMonth(), 1);
    let arrival = null;
    let departure = null;
    const guests = document.getElementById('guest-count');
    const format = date => date.toLocaleDateString('de-CH');

    function updateSummary() {
      document.getElementById('arrival-value').textContent = arrival ? format(arrival) : 'Bitte wählen';
      document.getElementById('departure-value').textContent = departure ? format(departure) : 'Bitte wählen';
      const nights = arrival && departure
        ? Math.round((Date.UTC(departure.getFullYear(), departure.getMonth(), departure.getDate())
          - Date.UTC(arrival.getFullYear(), arrival.getMonth(), arrival.getDate())) / 86400000)
        : 0;
      document.getElementById('stay-length').textContent = nights
        ? `${nights} ${nights === 1 ? 'Übernachtung' : 'Übernachtungen'} ausgewählt.`
        : 'Wählen Sie zwei Daten für Ihren Aufenthalt.';
      const body = `Guten Tag\n\nWir interessieren uns für einen Aufenthalt im Chalet-Rutsch.\n\nAnreise: ${arrival ? format(arrival) : 'bitte ergänzen'}\nAbreise: ${departure ? format(departure) : 'bitte ergänzen'}\nPersonen: ${guests.value}\n\nBitte teilen Sie uns Verfügbarkeit und Preis mit.\n\nName:\nTelefon:\n\nFreundliche Grüsse`;
      document.getElementById('booking-email').href = 'mailto:info@chalet-rutsch.ch?subject='
        + encodeURIComponent('Buchungsanfrage Chalet-Rutsch')
        + '&body=' + encodeURIComponent(body);
    }

    function render(focusDate) {
      document.getElementById('calendar-month').textContent = month.toLocaleDateString('de-CH', {
        month: 'long',
        year: 'numeric'
      });
      document.getElementById('previous-month').disabled = month.getFullYear() === today.getFullYear()
        && month.getMonth() === today.getMonth();
      days.replaceChildren();
      const offset = (month.getDay() + 6) % 7;
      for (let i = 0; i < offset; i++) {
        const blank = document.createElement('span');
        blank.setAttribute('aria-hidden', 'true');
        days.append(blank);
      }

      const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      for (let number = 1; number <= total; number++) {
        const date = new Date(month.getFullYear(), month.getMonth(), number);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'calendar-day';
        button.textContent = number;
        button.disabled = date < today;
        const selected = Boolean((arrival && +date === +arrival) || (departure && +date === +departure));
        button.setAttribute('aria-pressed', String(selected));
        button.setAttribute('aria-label', date.toLocaleDateString('de-CH', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }) + (arrival && +date === +arrival ? ', Anreise' : departure && +date === +departure ? ', Abreise' : ''));
        if (+date === +today) button.setAttribute('aria-current', 'date');
        if (selected) button.classList.add('selected');
        if (arrival && departure && date > arrival && date < departure) button.classList.add('in-range');
        button.addEventListener('click', () => {
          if (!arrival || departure || date <= arrival) {
            arrival = date;
            departure = null;
          } else {
            departure = date;
          }
          render(number);
        });
        days.append(button);
      }

      updateSummary();
      if (focusDate) [...days.querySelectorAll('button')]
        .find(button => +button.textContent === focusDate)?.focus();
    }

    document.getElementById('previous-month').addEventListener('click', () => {
      month = new Date(month.getFullYear(), month.getMonth() - 1, 1);
      render();
    });
    document.getElementById('next-month').addEventListener('click', () => {
      month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      render();
    });
    document.getElementById('reset-dates').addEventListener('click', () => {
      arrival = null;
      departure = null;
      render();
    });
    guests.addEventListener('change', updateSummary);
    render();
  }
})();
