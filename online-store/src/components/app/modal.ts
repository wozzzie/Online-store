export class Modal {
    paintModal() {
        return `
        <div id="modal">
            <a id="close">CLOSE</a>
            <form id="modal-form">
                <div class="modal-form__name">NAME</div>
                <div class="modal-form__block"></div>
                <input id="name" type="text" class="modal-form__input" placeholder="Name Surname">

                <div class="modal-form__name">TEL</div>
                <div class="modal-form__block"></div>
                <input id="tel" type="text" class="modal-form__input" placeholder="+7 000 000 00 00">

                <div class="modal-form__name">ADRESS</div>
                <div class="modal-form__block"></div>
                <input id="adr" type="text" class="modal-form__input" placeholder="Country, City, Street">

                <div class="modal-form__name">E-MAIL</div>
                <div class="modal-form__block"></div>
                <input id="mail" type="text" class="modal-form__input" placeholder="Your-email@mail.com">


                <div class="modal-form__name">CARD</div>
                <div class="modal-form__block"></div>
                <input id="card-input" type="text" class="modal-form__input" placeholder="0000 0000 0000 0000">

                <div class="modal-form__name">date</div>
                <div class="modal-form__block"></div>
                <input id="card-date" type="text" class="modal-form__input" placeholder="__/__">

                <div class="modal-form__name">CVV</div>
                <div class="modal-form__block"></div>
                <input id="card-cvv" type="number" class="modal-form__input" placeholder="***">

                <div class="modal-form__img"></div>
            </form>
        </div>
        `;
    }
}
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const modalForm = document.getElementById('modal-form');

closeBtn?.addEventListener('click', closeModal);
modalForm?.addEventListener('click', (e) => e.stopPropagation());
modal?.addEventListener('click', closeModal);

function closeModal() {
    modal?.remove();
}

// const regName = /[A-Za-z]{3,}\b.+?[A-Za-z]{3,}/;
// const regAdr = /[A-Za-z]{5,}.+[A-Za-z]{5,}.+?[A-Za-z]{5,}/;
// const regTel = /^((\+[0-9])[\s]?)(\(?\d{3}\)?[\s]?)?[\d\s]{8,}$/;
// const regMail = /[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}/;
