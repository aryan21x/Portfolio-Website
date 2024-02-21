const hamburger = document.getElementById('hamburger'); 
const menu = document.querySelector('.menu'); 
  
hamburger.addEventListener('click', function () { 
    const hamIcon = this.querySelector('.hamburger-icon'); 
    const crossIcon = this.querySelector('.cross-icon'); 
    if (hamIcon.style.display === "none") { 
        hamIcon.style.display = "inline-block"
        menu.style.display = "none"
        crossIcon.style.display = "none"
    } 
    else { 
        crossIcon.style.display = "inline-block"
        hamIcon.style.display = "none"
        menu.style.display = "block"
    } 
});


var XGui = window.XGui || {};

(function(gui){
  if (gui.PercentBar) return;

  if (!gui.sheet){
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    gui.sheet = style.sheet;
  }

  // Add Percentage Bar styles
  var barStyle = [
    ".xguiBar{",
      "position: relative;",
      "box-sizing: border-box;",
      "border: solid 1px;",
      "width: 100px;",
      "height: 10px;",
      "font-size: 1px;",
      "border-radius: 5px;",
    "}"
  ].join('');
  
  var barStyleLarge = [
    ".xguiBar.large{",
      "width: 200px;",
      "height: 20px;",
      "font-size: 2px;",
      "border-radius: 5px;",
    "}"
  ].join('');
  
  var barStyleSmall = [
    ".xguiBar.small{",
      "width: 50px;",
      "height: 5px;",
      "font-size: 0.5px;",
      "border-radius: 2px;",
    "}"
  ].join('');
  
  var i = gui.sheet.rules.length;
  
  gui.sheet.insertRule(barStyle, i);
  gui.sheet.insertRule(barStyleLarge, i + 1);
  gui.sheet.insertRule(barStyleSmall, i + 2);
  
  var perBar = function(options){
    this.size = 'medium';
    this.percent = 100;
    this.color = 'white';
    
    for (var prop in options)
      if (this.hasOwnProperty(prop))
        this[prop] = options[prop];
    
    this.domElement = document.createElement('div');
    var cssText = [
      "color: " + this.color + ";",
      "box-shadow: 0px 0px 5px,",
                 " 0px 0px 5px inset;"
    ].join('');
    this.domElement.style.cssText = cssText;
    
    this.__boxShadow = this.domElement.style.boxShadow;
    this.domElement.style.boxShadow += ', ' + this.percent + 'em 0px 0px 0px inset';
    
    this.domElement.classList.add('xguiBar');
    
    switch (this.size){
      case 'large':
        this.domElement.classList.add('large');
        break;
      case 'small':
        this.domElement.classList.add('small');
        break;
      default:
        break;
    }
  }
  
  perBar.prototype = {
    Update: function(){
      this.domElement.style.color = this.color;
      this.domElement.style.boxShadow = this.__boxShadow +
                                        ', ' + this.percent + 'em 0px 0px 0px inset';
    }
  }
  
  gui.PercentBar = perBar;
  
})(XGui);

var health = new XGui.PercentBar({size: 'large'});
document.body.appendChild(health.domElement);
health.domElement.style.position = 'absolute';
health.domElement.style.left = 'calc(80% - 100px)';
health.domElement.style.top = 'calc(45% - 50px)';
health.domElement.classList.add('health-bar'); 

var mp = new XGui.PercentBar({size: 'large', color: '#00ffff', percent: 0});
document.body.appendChild(mp.domElement);
mp.domElement.style.position = 'absolute';
mp.domElement.style.left = 'calc(80% - 100px)';
mp.domElement.style.top = 'calc(45% - 20px)';
mp.domElement.classList.add('mp-bar'); 

health.domElement.style.transform = 'skew(30deg, 0deg)';
mp.domElement.style.transform = 'skew(-30deg, 0deg)';

var lastT = 0;
var hpDir = -1;
var mpDir = -1;
function Update(t){
  requestAnimationFrame(Update);
  var delta = (t - lastT) / 1000;
  lastT = t;
  
  hpDir = health.percent >= 100 ? -1 : health.percent <= 0 ? 1 : hpDir;
  
  health.percent += Math.min(delta, 1) * hpDir * 15;
  
  health.color = health.percent >= 50 ? '#d90037' : '#FFA500';
  health.Update();
  
  mp.color = mp.percent >= -35 ? '#FFA500': '#d90037';
 
  mpDir = mp.percent <= -100 ? 1 : mp.percent >= 0 ? -1 : mpDir;
  
  mp.percent += Math.min(delta, 1) * mpDir * 10;
  mp.Update();
}
Update(0);

