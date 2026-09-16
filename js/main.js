// Visionneuse : agrandit une œuvre au clic, flèches pour naviguer, Échap pour fermer.
(function () {
  var dialog = document.querySelector('.lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return; // sans support : le lien ouvre l'image

  var links = Array.prototype.slice.call(document.querySelectorAll('.work-image'));
  var img = dialog.querySelector('img');
  var caption = dialog.querySelector('figcaption');
  var current = 0;

  function show(i) {
    current = (i + links.length) % links.length;
    var link = links[current];
    var thumb = link.querySelector('img');
    img.src = link.getAttribute('href');
    img.alt = thumb.alt;
    var work = link.closest('.work');
    caption.textContent = (work.classList.contains('fonker') ? 'Fonkèr · ' : '') + work.querySelector('h3').textContent;
  }

  links.forEach(function (link, i) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      show(i);
      dialog.showModal();
    });
  });

  dialog.querySelector('.lb-close').addEventListener('click', function () { dialog.close(); });
  dialog.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  dialog.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  dialog.addEventListener('close', function () {
    links[current].focus();
    img.removeAttribute('src');
  });
})();
