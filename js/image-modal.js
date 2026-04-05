(() => {
  const createModal = () => {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <button class="image-modal-backdrop" type="button" aria-label="画像を閉じる"></button>
      <div class="image-modal-dialog" role="dialog" aria-modal="true" aria-label="拡大画像">
        <button class="image-modal-close" type="button" aria-label="閉じる">×</button>
        <img class="image-modal-content" src="" alt="">
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  };

  const modal = document.querySelector('.image-modal') || createModal();
  const backdrop = modal.querySelector('.image-modal-backdrop');
  const closeButton = modal.querySelector('.image-modal-close');
  const modalImage = modal.querySelector('.image-modal-content');
  const imageFrames = document.querySelectorAll('.image-frame img');
  const explicitTriggers = document.querySelectorAll('.image-modal-trigger');

  let lastTrigger = null;

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => {
      modal.hidden = true;
    }, 180);
    if (lastTrigger) {
      if (typeof lastTrigger.focus === 'function') {
        lastTrigger.focus();
      }
      lastTrigger = null;
    }
  };

  const openModal = (trigger, src, alt) => {
    lastTrigger = trigger;
    modalImage.src = src || '';
    modalImage.alt = alt || '';
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    window.requestAnimationFrame(() => {
      modal.classList.add('is-open');
    });
    closeButton.focus();
  };

  explicitTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openModal(trigger, trigger.dataset.modalSrc || '', trigger.dataset.modalAlt || '');
    });
  });

  imageFrames.forEach((image) => {
    if (image.closest('.image-modal-trigger')) {
      return;
    }

    const frame = image.closest('.image-frame');
    if (!frame) {
      return;
    }

    frame.tabIndex = 0;
    frame.setAttribute('role', 'button');
    frame.setAttribute('aria-label', `${image.alt || '画像'}を拡大表示`);
    frame.style.cursor = 'zoom-in';

    const openFromImage = () => openModal(frame, image.currentSrc || image.src, image.alt || '');
    frame.addEventListener('click', openFromImage);
    frame.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openFromImage();
      }
    });
  });

  backdrop.addEventListener('click', closeModal);
  closeButton.addEventListener('click', closeModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
})();
