const URL = "http://localhost:3000"

function generateStarRating(score) {
  const stars = ['<i class="far fa-star"></i>', '<i class="fas fa-star-half-alt"></i>', '<i class="fas fa-star"></i>'];
  const scoreFloor = Math.floor(score);
  const scoreDiff = score - scoreFloor;
  let html = '';
  for (let i = 0; i < scoreFloor; i++) {
    html += stars[2];
  }
  if (scoreDiff >= 0.5) {
    html += stars[1];
  }
  const remaining = 5 - scoreFloor - (scoreDiff >= 0.5 ? 1 : 0);
  for (let i = 0; i < remaining; i++) {
    html += stars[0];
  }
  return html;
}


const ultimasAvaliacoes = document.querySelector('#last-ratings');
const ratingsList = document.querySelector('#last-ratings-list');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');

let ratingWidth;

function atualizaAvaliacoes() {
    while (ratingsList.firstChild) {
    ratingsList.removeChild(ratingsList.firstChild);
  }
  // Faz uma requisição para obter as últimas avaliações
  fetch(`${URL}/ratings`)
    .then(response => response.json())
    .then(ratings => {
      // Para cada avaliação, cria um novo elemento HTML e adiciona à div ultimas-avaliacoes
      ratings.forEach(rating => {
        const date = new Date(rating.createdAt);
        const options = {
          day: "2-digit",
          month: "long"
        };
        const formattedDate = date.toLocaleDateString("pt-BR", options);

        const ratingElement = document.createElement("div");
        ratingElement.classList.add("ratings");
        ratingElement.innerHTML =
          `
          <p>${rating.Organizations[0].name}<p>
          <p>${rating.Organizations[0].amountOfReviews} Avaliações</p>
          <p>"${rating.title}"</p>
          <p>Avaliado em ${formattedDate}</p>
          <div class="star-rating">
            ${generateStarRating(rating.score)}
          </div>
          <p>${rating.review}</p>
        `;
        ratingsList.appendChild(ratingElement);
      });

      ratingWidth = ratingsList.children[0].offsetWidth;
      ratingsList.style.width = `${ratingWidth * ratings.length}px`;
      
    })
    .catch(error => {
      console.log(error);
    });
}

let currentOffset = 0;
atualizaAvaliacoes();

nextButton.addEventListener('click', () => {
  if (currentOffset + ratingWidth < ratingsList.offsetWidth) {
    currentOffset += ratingWidth;
    ratingsList.style.transform = `translateX(-${currentOffset}px)`;
  }
});

prevButton.addEventListener('click', () => {
  if (currentOffset - ratingWidth >= 0) {
    currentOffset -= ratingWidth;
    ratingsList.style.transform = `translateX(-${currentOffset}px)`;
  }
});
// Chama a função para carregar as avaliações iniciais

const form = document.querySelector('form');

const searchOrganization = async (name) => {
    const response = await fetch(`${URL}/organizations?name=${name}`);
    const empresas = await response.json();
    return empresas;
};


const empresaList = document.getElementById('empresa-list');
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('#avaliar');

    modal.addEventListener('shown.bs.modal', async function() {
        const name = document.getElementById('empresa-list').value;
        const empresas = await searchOrganization(name);
        const empresaList = document.getElementById('empresa-list');

        let selectOrganizationOption = document.createElement("option");
        empresaList.innerHTML = '';
        selectOrganizationOption.append('Selecione uma empresa')
        selectOrganizationOption.setAttribute('disabled', true);
        selectOrganizationOption.setAttribute('selected', true);
        empresaList.append(selectOrganizationOption)
        empresas.forEach((empresa) => {
            const option = document.createElement('option');
            option.innerText = empresa.name;
            option.setAttribute('data-organization-id', empresa.id);
            option.addEventListener('click', () => {
                document.getElementById('empresa-list').value = empresa.name;
                empresaList.innerHTML = '';
                this.dataset.organizationId = empresa.id
                document.getElementById('organizationId').value = empresa.id; // Adiciona o id ao input escondido

            });

            empresaList.appendChild(option);
        });
    });
});

// Adiciona um event listener para o botão de enviar a avaliação
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('tituloAvaliacao').value;
    const review = document.getElementById('avaliacao').value;
    const score = document.querySelector('input[name="star"]:checked');

    // Verifica se os campos obrigatórios foram preenchidos
    if (!title || !review || !score) {
        // Cria um elemento para exibir a mensagem de erro
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        errorMessage.classList.add('error-message');

        // Adiciona o elemento ao formulário
        form.insertBefore(errorMessage, form.firstChild);
        return;
    }
    const personId = "cc765d0e-810d-483d-87c0-274349eb5628";
    const organizationId = form.elements['empresa-list'].options[form.elements['empresa-list'].selectedIndex].getAttribute('data-organization-id');

    const dateRate = new Date().toISOString();

    const response = await fetch(`${URL}/addRating`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personId,
            organizationId,
            title,
            review,
            score: score.value,
            dateRate
        })
    });


    const rating = await response.json();
    form.reset()

    const successModal = document.createElement('div');
    successModal.classList.add('modal', 'fade');
    successModal.setAttribute('id', 'successModal');
    successModal.setAttribute('tabindex', '-1');
    successModal.setAttribute('aria-labelledby', 'successModalLabel');
    successModal.setAttribute('aria-hidden', 'true');
    successModal.innerHTML = `
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <p class="sucessfull-sent">Avaliação enviada com sucesso!</p>
                </div>
                <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-rated btn-size"
            data-bs-dismiss="modal">Fechar</button>
        </div>
            </div>
        </div>
    `;

    document.body.appendChild(successModal);

    // Exibe o modal de sucesso
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();

    // Fecha o modal de avaliação
    const avaliarModal = document.getElementById('avaliar');
    const bootstrapModal = bootstrap.Modal.getInstance(avaliarModal);
    bootstrapModal.hide();

    // Chama a função para atualizar a div container teste com as novas avaliações
    ratingsList.innerHTML = '';
    ratingsList.style.transform = 'translateX(0px)';
    currentOffset = 0;
    atualizaAvaliacoes();
});

// Remove a mensagem de erro quando o usuário começa a preencher o formulário novamente
const removeError = () => {
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });
};

form.addEventListener('input', () => {
  removeError();
});

const resetForm = () => {
  removeError();
  form.reset();
};