var table;

function preload() {
  table = loadTable("ciiiiimek.csv","csv","header")
}
function setup() {
  var CX = 1200
  var CY = 600
  var Border = 70
  createCanvas(CX,CY)
  noStroke()
  

  background(255,255,255)
    
  var rows = table.getRows()
  var latmin = 999;
  var latmax = 0;
  var longmin = 999;
  var longmax = 0;
  for (var r = 0; r < rows.length; r++) {
    var lat = rows[r].getNum("lat");
    var long = rows[r].getNum("long");
    if (lat<latmin) {
        latmin = lat
    }
    if (lat>latmax) {
        latmax = lat
    }    
    if (long<longmin) {
        longmin = long
    }    
    if (long>longmax) {
        longmax = long
    }
  }
  var latdiff = latmax-latmin;
  var longdiff = longmax-longmin;
//  text(latdiff*CY,20,20);
//  text(longdiff*CX,20,40);
//  text(latdiff,20,20);
//  text(longdiff,20,40);
    
  if (latdiff * CX > longdiff * CY) {
    var L_long_x = (CX/2) - (longdiff * CY / latdiff) / 2
    var L_long_y = (CX/2) + (longdiff * CY / latdiff) / 2
    var L_lat_x = CX - Border 
    var L_lat_y = 0 + Border
  } else {
//    text('E',600,200)
    var L_long_x = 0 + Border 
    var L_long_y = CX - Border
    var L_lat_x = (CY/2) - (latdiff * CX / longdiff) / 2
    var L_lat_y = (CY/2) + (latdiff * CX / longdiff) / 2 
  }
//  text(int(L_lat_x),500,40);
//  text(int(L_lat_y),500,60);
//  text(int(L_long_x),600,40);
//  text(int(L_long_y),600,60);
    
  for (var r = 0; r < rows.length; r++) {
    var lat = rows[r].getNum("lat");
    var long = rows[r].getNum("long");
    var street = rows [r].getString("street");
    var year = rows[r].getString("year");
//    var x = map(long,18.9,19.2,10,1190);
//    var y = map(lat,47.3,47.6,590,10);
    var x = map(long,longmin,longmax,L_long_x,L_long_y);
    var y = map(lat,latmin,latmax,L_lat_y,L_lat_x);
    var d = rows[r].getNum("months");
    var s = map(d,1,50,25,100);
    var ww = rows[r].getString("withwhom")
    
    //  text(concat(concat(concat(concat(street,' '),x),' '),y),20,60+r*14);
    //text(concat(concat(concat(street,' '),ww),' '),20,60+r*14);
 if (ww == "b") {
  //  text('*',300,60+r*14);
    fill(0,0,255,50);  
    ellipse(x,y,s,s);
    fill(0,0,0);
    textSize(15);
    text(street,x,y);
    textSize(20);
    text(year,x,y+20);  
 } else if (ww == "a"){
    fill(100,250,100,50)
    ellipse(x,y,s,s); 
    fill(0,0,0);
    textSize(15);
    text(street,x,y);
    textSize(20);
    text(year,x,y+20);  
  } else {
    fill(255,0,0,50)
    ellipse(x,y,s,s); 
    fill(0,0,0);
    textSize(15);
    text(street,x,y);
    textSize(20);
    text(year,x,y+20);    
  }
}
}
   