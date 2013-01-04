module.exports = {
  'title': {
    'background': {
      'image': {
        'src': 'images/title_screen_background.jpg'
      },
      'location': {
        'x': 0,
        'y': 0
      },
      'visible': true
    },
    'backgroundMusic': {
      'sound' : {
        'src': 'songs/The_Mighty_Quinn.MP3'
      }
    },
    'start_button': {
      'image' : { 
        'src': 'images/start.png'
      },
      'location': {
        'x': 450,
        'y': 450
      },
      'visible' : true
    }
  },
  'levelOne' : {
    'progressBar' : {
      'image' : {
        'src' : 'images/progressBar.png'
      },
      'location' : {
        'x' : 300,
        'y' : 20
      },
    },
    'floor' : {
      'image' : {
        'src' : 'images/crete-pave2-0.jpg'
      },
      'location': {
        'x': 0,
        'y': 0
      },
      'visible' : true
    },
    'baby' : {
      'image' : {
        'src' : 'images/baby_mario.png'
      },
      'location': {
        'x': 710,
        'y': 505
      },
      'visible' : true
    },
    'daddy' : {
      'image' : {
        'src' : 'images/king_0.svg'
      },
      'location': {
        'x': 350,
        'y': 470
      },
      'stressRate' : 100,
      'maxStress' : 100,
      'velocity' : 5,
      'visible' : true
    },
    'food' : {
      'image' : {
        'src' : 'images/food.png'
      },
      'location' : {
        'x' : 0,
        'y' : 0
      }
    }
  }
};
