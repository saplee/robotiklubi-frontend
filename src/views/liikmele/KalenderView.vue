<template>
  <main>
    <div class="primary-container shadowed">
      <h1>
        Kalender
      </h1>

    </div>

    <div class="primary-container shadowed calendar-container">
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23039BE5&ctz=Europe%2FTallinn&showTz=0&showCalendars=0&showTabs=0&showPrint=0&showDate=0&showNav=0&showTitle=0&mode=MONTH&src=Y180NmMyOGI5OWYzNDA2Y2Q3M2JhNDNkZjRlZWM0NGEyZTM5YjUyOGFmNjdiOTQwOTlmYjYxMDlkZGM2ZTNlNjA4QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%238E24AA" title="Calendar"></iframe>
    </div>
  </main>
</template>

<style scoped>

.calendar-container {
  padding: 2rem;
}

iframe {
  display: block;
  border: none;
  width: 100%;
  height: 40rem;
  padding: 0;
}

</style>
