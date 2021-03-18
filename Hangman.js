const random_words = ['tiger','ocean', 'mississippi', 'xylophone', 'death', 'water', 'bubble', 'table', 'christmas', 'fire', 'ridiculous', 'cried', 'hello', 'what', 'father']
var guessed = []
var guessed_right = []
var got_wrong = 0
var word = ''
var screen = ''

function buildMan(strikes) {
    const row1 = ['   ', ' O ', ' O ', ' O ', ' O ', ' O ', ' O ']
    const row2 = ['   ', '   ', ' | ', '/| ', '/|\\', '/|\\', '/|\\']
    const row3 = ['   ', '   ', '   ', '   ', '   ', '/  ', '/ \\']
    screen = screen.concat('_____<br>|&nbsp;' + row1[strikes] + '<br>|&nbsp;' + row2[strikes] + '<br>|&nbsp;' + row3[strikes] + '<br>')
}

function round(key) {
    for (char in word) {
        char = word.charAt(char)
        if (guessed_right.includes(char)) {
            screen = screen.concat(char + ' ')
        } else {
            screen = screen.concat('_ ')
        }
    }
    screen = screen.concat('<br>')
    for (char in 'abcdefghijklmnopqrstuvwxyz') {
        char = 'abcdefghijklmnopqrstuvwxyz'.charAt(char)
        if (guessed.includes(char)) {
            screen = screen.concat('_')
        } else {
            screen = screen.concat(char)
        }
    }
    var guess = validate(key.toLowerCase())
    if (typeof guess !== 'undefined') {
        guessed.push(guess)
    } else {
        document.querySelector('#screen').style.color = 'red'
        document.querySelector('#screen').style.color = 'black'
    } // Error (Turn Screen Red?)
    if (word.includes(guess)) {
        guessed_right.push(guess)
    } else {
        got_wrong++
    }
}

function validate(item) {
    if ('abcdefghijklmnopqrstuvwxyz'.includes(item) && ! guessed.includes(item) && item.length == 1) {
        return item
    }
}

document.onkeypress = function(key) {
    if (guessed_right.length < word.length) {
        screen = ''
        buildMan(got_wrong)
        if (got_wrong >= 6) {
            screen = screen.concat(word + '<br>You Lost...')
        } else {
            round(key.key)
            if (guessed_right.length == word.length && got_wrong < 6) {
                screen = ''
                buildMan(got_wrong)
                screen = screen.concat(word + '<br>You Won!')
            }
        }
        document.querySelector('#screen').innerHTML = screen
    }
}

if (window.prompt('Do you want a random word?') == 'yes') {
    word = random_words[Math.floor(Math.random() * random_words.length)]
} else {
    word = window.prompt('Choose a word:')
}
buildMan(got_wrong)
round('')
document.querySelector('#screen').innerHTML = screen