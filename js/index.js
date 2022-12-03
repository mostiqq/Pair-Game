//Создаём карточку
class Card {

  _open = false
  _success = false

  constructor(container, number, action) {
    this.card = document.createElement('button')
    this.card.classList.add('game__card')
    this.card.textContent = number
    container.append(this.card)
    this.number = number

    this.card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        this.open = true
        action(this)
      }
    })
  }

  set open(value) {
    this._open = value
    if (value) {
      this.card.classList.add('open')
    } else {
      this.card.classList.remove('open')
    }
  }

  get open() {
    return this._open
  }

  set success(value) {
    this._success = value
    if (value) {
      this.card.classList.add('success')
    } else {
      this.card.classList.remove('success')
    }

  }

  get success() {
    return this._success
  }

}

function flip(card) {
  console.log(card)
}

//Получаем массив
function newGame(container) {

  let arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8].reduce(function (res, current, index, array) {
    return res.concat([current, current])
  }, [])

  let cardArray = []
  let firstCard = null
  let secondCard = null


  //Перемешаем массив

  arrayNumbers = arrayNumbers.sort(() => Math.random() - 0.5)

  for (const cardNumber of arrayNumbers) {
    cardArray.push(new Card(container, cardNumber, flip))
  }

  function flip(card) {

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false
        secondCard.open = false
        firstCard = null
        secondCard = null
      }
    }

    if (firstCard == null) {
      firstCard = card
    } else {
      if (secondCard == null) {
        secondCard = card
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true
        secondCard.success = true
        firstCard = null
        secondCard = null
      }
    }

    if (document.querySelectorAll('.success').length == arrayNumbers.length) {
      alert('Победа!')
    }
    const restartBtn = document.querySelector('.btn-restart');

    restartBtn.addEventListener('click',  () => {
      container.innerHTML = ''
      let arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8].reduce(function (res, current, index, array) {
        return res.concat([current, current])
      }, [])

      let cardArray = []
      let firstCard = null
      let secondCard = null

      newGame(container)
    })
  }




}

newGame(document.querySelector('.game__field'))






