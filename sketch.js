// VARIABLE
let _height;
let _rate = 1;
let _server;
let _width;



// MAIN
function setup () {
  _height = windowHeight;
  _width = windowWidth;
  
  background ('white');
  createCanvas (_width, _height);
  
  _server = new PubNub ({
    subscribeKey: 'sub-c-36471748-c13d-4e0b-932e-01b6911c7dbe',
    uuid: year () + '/' + month () + '/' + day () + '-' + hour () + ':' + minute () + ':' + second () + ':' + millis (),
  });

  _server.addListener ({presence: fetchingPresence});
  _server.subscribe ({channels: ['workshop_3'], withPresence: true});
} 

function draw () { 
  frameRate (_rate);

  ellipse (random (_width), random (_height), random (min (_height, _width) * 0.1)).fill (int (random (0,255)), int (random (0,255)), int (random (0,255))).noStroke ();
}

function fetchingPresence (presence) {
  if (presence.occupancy != _rate) {
    if (presence.occupancy > 0) {
      _rate = presence.occupancy;
    }

    print (presence.occupancy + ' guests (' + _rate + ')');
  }
}