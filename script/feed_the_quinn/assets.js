module.exports = {
  'title': {
    'background': {
      'sprite': {
        'src': 'images/title_screen_background.jpg',
        'location': {
          'x': 0,
          'y': 0
        },
        'visible': true
      }
    },
    'backgroundMusic': {
      'sound' : {
        'src': 'songs/The_Mighty_Quinn.MP3'
      }
    },
    'start_button': {
      'sprite' : { 
        'src': 'images/start.png',
        'location': {
          'x': 450,
          'y': 450
        },
        'visible' : true
      }
    }
  },
  'levelOne' : {
    'progressBar' : {
      'sprite' : {
        'src' : 'images/progressBar.png',
        'location' : {
          'x' : 300,
          'y' : 20
        }
      }
    },
   'floor' : {
      'sprite' : {
        'src' : 'images/crete-pave2-0.jpg',
        'location': {
          'x': 0,
          'y': 0
        },
        'visible' : true
      }
    },
    'score' : {
      'text' : {
        'font' : '40px Calibri',
        'fillText' : 'white',
        'location' : {
          'x' : 20,
          'y' : 50
        },
        'score' : 0
      }
    },
     'baby' : {
      'sprite' : {
        'src' : 'images/baby_mario.png',
        'location': {
          'x': 710,
          'y': 505
        },
        'visible' : true
      }
    },
    'daddy' : {
      'daddy' : {
        'src' : 'images/king_0.svg',
        'location': {
          'x': 350,
          'y': 470
        },
        'stressRate' : 100,
        'maxStress' : 100,
        'velocity' : 5,
        'visible' : true
      }
    },
    'food' : {
      'sprite_sheet' : {
        'src' : 'images/food.png',
        'location' : {
          'x' : 0,
          'y' : 0
        },
        map : [ {
          x: 0,
          y: 0,
          width: 27,
          height: 31
        }, {
          x: 39,
          y: 5,
          width: 35,
          height: 31
        }, {
          x: 82,
          y: 8,
          width: 34,
          height: 28
        }, {
          x: 121,
          y: 4,
          width: 37,
          height: 36
        }, {
          x: 162,
          y: 13,
          width: 36,
          height: 22
        }, {
          x: 206,
          y: 3,
          width: 35,
          height: 38
        }]
      }
    }
  }
};
