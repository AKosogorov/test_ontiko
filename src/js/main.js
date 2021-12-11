document.addEventListener('DOMContentLoaded', () => {
  const calendarList = document.querySelector('.calendar__list');

  getData().then(data => fillCalendar(data));

  function getData () {
    loading(true)
    return fetch('https://conf.ontico.ru/api/conferences/forCalendar.json')
      .then(response => response.json())
      .then(result => result.result)
  };

  function fillCalendar(data) {
    setTimeout(() => {
      data.forEach(cardData => {
        calendarList.append(createCardEl(cardData))
      });
      loading(false);
    }, 1000);

    function createCardEl (cardData) {
      const cardEl = document.createElement('li');
      cardEl.classList.add('calendar__item');
      cardEl.innerHTML = fillCardEl(cardData)

      return cardEl

      function fillCardEl(card) {
        return `
          <article class="card">
            <span class="card__date">
              ${card.date_range}
            </span>
            <img class="card__logo" src="${card.logo}" alt="Логотип конференции">
            <h3 class="card__title">
              ${card.name}
            </h3>
            <p class="card__descr">
              ${card.brief}
            </p>
            <address class="card__address">
              <svg class="card__address-svg card__svg" width="13" height="18" viewbox="0 0 13 18" fill="#B5B5B5" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2372 6.3871C12.2997 2.90323 9.55254 1.68889e-06 6.18105 1.41466e-06C2.80956 1.14042e-06 -1.76429e-05 2.77419 -1.79702e-05 6.25806C-1.81339e-05 8 0.749202 10.2581 2.31008 12.9677C3.55878 15.0323 5.80643 18 5.99374 18C6.11861 18 8.49114 15.0968 9.73984 13.0323C11.3631 10.3226 12.2372 8.06452 12.2372 6.3871Z"/>
                <ellipse cx="6.11862" cy="6.09371" rx="3.67118" ry="3.69501" fill="white"/>
              </svg>
              ${card.location}
            </address>
            <a class="card__link" href="${card.uri}" target="_blank">
              <svg class="card__link-svg card__svg" width="13" height="13" viewbox="0 0 13 13" fill="#B5B5B5"
              fill="#B5B5B5" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_311)">
                  <path d="M8.12499 11.375H1.62499V1.62499H8.12499V2.43748H9.74997V0H0V13H9.75V10.5625H8.12501V11.375H8.12499Z"/>
                  <path d="M10.3006 3L9.15164 4.14892L10.2022 5.19944H6V6.82445H10.2022L9.15164 7.87498L10.3006 9.0239L13.3125 6.01194L10.3006 3Z"/>
                </g>
                <defs>
                  <clippath id="clip0_1_311">
                    <rect width="13" height="13" fill="white"/>
                  </clippath>
                </defs>
              </svg>
              ${sliceLink(card.uri)}
            </a>
            <div class="card__actions">
              <a class="card__link-actions card__link-buy" href="#">
                Купить билет
              </a>
              <a class="card__link-actions card__link-more" href="#">
                Подробнее
              </a>
            </div>
          </article>
        `
      };

      function sliceLink(link) {
        return link.split('/')[2]
      };
    };
  };

  function loading(is) {
    const loader = document.querySelector('.lds-roller');
    is ? loader.classList.add('loading') : loader.classList.remove('loading')
  }
});


