var timeOutMS = 30000; //ms
var ajaxList = new Array();
function newAJAXCommand(url, container, repeat, data)
{
	var newAjax = new Object();
	var theTimer = new Date();
	newAjax.url = url;
	newAjax.container = container;
	newAjax.repeat = repeat;
	newAjax.ajaxReq = null;
	if(window.XMLHttpRequest) {
        newAjax.ajaxReq = new XMLHttpRequest();
        newAjax.ajaxReq.open("POST", newAjax.url, true);
        newAjax.ajaxReq.send(data);
    } else if(window.ActiveXObject) {
        newAjax.ajaxReq = new ActiveXObject("Microsoft.XMLHTTP");
        if(newAjax.ajaxReq) {
            newAjax.ajaxReq.open("POST", newAjax.url, true);
            newAjax.ajaxReq.send(data);
        }
    }
    newAjax.lastCalled = theTimer.getTime();
    ajaxList.push(newAjax);
}

function pollAJAX() {
	
	var curAjax = new Object();
	var theTimer = new Date();
	var elapsed,i;
	for(i = ajaxList.length; i > 0; i--)
	{
		curAjax = ajaxList.shift();
		if(!curAjax)
			continue;
		elapsed = theTimer.getTime() - curAjax.lastCalled;
		if(curAjax.ajaxReq.readyState == 4 && curAjax.ajaxReq.status == 200) {
			if(typeof(curAjax.container) == 'function'){
				curAjax.container(curAjax.ajaxReq.responseXML.documentElement);
			} else if(typeof(curAjax.container) == 'string') {
				document.getElementById(curAjax.container).innerHTML = curAjax.ajaxReq.responseText;
			} 
			
	    	curAjax.ajaxReq.abort();
	    	curAjax.ajaxReq = null;
			if(curAjax.repeat)
				newAJAXCommand(curAjax.url, curAjax.container, curAjax.repeat);
			continue;
		}
		
		if(elapsed > timeOutMS) {
			if(typeof(curAjax.container) == 'function'){
				curAjax.container(null);
			} else {
				alert("Command failed.\nConnection to SmartLinc was lost.");
			}
	    	curAjax.ajaxReq.abort();
	    	curAjax.ajaxReq = null;
			if(curAjax.repeat)
				newAJAXCommand(curAjax.url, curAjax.container, curAjax.repeat);
			continue;
		}
		ajaxList.push(curAjax);
	}
	setTimeout("pollAJAX()",10);
	
}
function getXMLValue(xmlData, field) {
	try {
		if(xmlData.getElementsByTagName(field)[0].firstChild.nodeValue)
			return xmlData.getElementsByTagName(field)[0].firstChild.nodeValue;
		else
			return null;
	} catch(err) { return null; }
}

setTimeout("pollAJAX()",500);


function MakeHeader()
{
var Obj  = document.getElementById('Y');
Obj.innerHTML = "<table width='100%' height='120px' border='0' cellpadding='4' cellspacing='0' class='handf'><tr><td width='10%'><a class='hw' href='index.htm'><img src='home.gif' border='0'></a></td><td width='80%' align='center' ><a>"+HA[0]+"<br>"+HA[1]+"</a></td><td width='10%' align='right'><a href='http://wiki.smarthome.com/index.php?title=SmartLinc_Help' target='_blank'><img src = 'help.gif' border=0></a></td></tr></table>"
}

function MakeFooter()
{
var Obj  = document.getElementById('foot');
Obj.innerHTML = "<table width='100%' height='120px' border='0' cellpadding='4' cellspacing='0' class='handf'><tr><td width='33%'><a href='rooms.htm'><img src = 'addroom.gif' border='0'></a></td><td width='34%' align='center'><a href='network.htm'><img src = 'settings.gif' border=0></a></td><td id ='RT' width='33%' align='right'>"+HA[2]+"</td></tr></table><br><br>"
}

function MakeSFooter()
{
var Obj  = document.getElementById('foot');
Obj.innerHTML = "<table width='100%' height='120px' border='0' cellpadding='4' cellspacing='0' class='handf'><tr><td width='33%'><a onClick='gotoscenes()'><img src = 'addscene.gif' border=0></a></td><td width='34%' align='center'><a href='network.htm'> <img src = 'settings.gif' border=0></a></td><td id ='RT' width='33%' align='right'>"+HA[2]+"</td></tr></table><br><br>"
}

function MakeRFooter()
{
var Obj  = document.getElementById('foot');
Obj.innerHTML = "<table width='100%' height='120px' border='0' cellpadding='4' cellspacing='0' class='handf'><tr><td width='33%'><a onClick='UpdateAllandgoback(0)'><u>Save</u></a></td><td width='34%' align='center'><a href='network.htm'> <img src = 'settings.gif' border=0></a></td><td id ='RT' width='33%' align='right'>"+HA[2]+"</td></tr></table><br><br>"
}

function MakeSceneControl(j)
{
var start = 1;
var iend = 16;     
var i;
  
var vstr = "00";
var vstr1 = "00";
var vstr2 = "00";

var imgs = new Array(4);     

 imgs[0] = new Image();      
 imgs[0].src = "on.gif";
 imgs[1] = new Image();      
 imgs[1].src = "off.gif";
 imgs[2] = new Image();      
 imgs[2].src = "bright.gif";
 imgs[3] = new Image();      
 imgs[3].src = "dim.gif";
  


var Obj  = document.getElementById('X');

if( HA[3] != "*")   Obj.innerHTML = "<br><center><table width='1000'><tr><td width ='125'></td><td width='400'><iframe width='320px' height='240px'src='"+HA[3]+"' more attributes>Does Not support iframe</iframe></td></tr></table></center><br>";

var count = 0;
for (i=0;i<=15;i++)
{
  if (MA[17].charAt(i) == 'f') count++;
}
if(count == 16) MA[17] = "tfffffffffffffff";


for (i=start;i<=iend;i++)
{

if (i<10) vstr = "0" + i;

if (i<10) vstr1 = "0" + i;
else        vstr1 = i;

vstr = i + ((j-1) * 16);

if (j<10)     vstr2 = "0" + j;
else        vstr2 = j;
    
  if (MA[17].charAt(i-1) != 'f' && MA[i-1] != "" )
        {

Obj.innerHTML =  Obj.innerHTML + "<div id='Line"+vstr1+"'><center><table width='1000' border='0' cellpadding='4 cellspacing='0'><tr><td width='100'><input type='image' id='c1"+vstr1+"'  class='sicons' value= &#8593 onclick=(newAJAXCommand('0?15" + vstr + "=I=0'))></td><td width='100'><input type='image' id='c2"+vstr1+"' class='icons' value='ON ' onclick=(newAJAXCommand('0?11" + vstr + "=I=0'))></td><td width='400' align='center'><span class='r01s'>"+MA[i-1]+"</span></td><td width='150'><input type='image' id='c3"+vstr1+"' class='icons' value='OFF'onclick=(newAJAXCommand('0?13" + vstr + "=I=0'))></td><td width='150'><input type='image' id='c4"+vstr1+"' class='sicons'  value=&#8595 onclick=(newAJAXCommand('0?16" + vstr + "=I=0'))></td><td width='100'><a href='setup.htm?" + vstr1 +"="+ vstr2 +"=F' class='set'>Settings</a></td></tr></table><center><br><br></div>"
        }

}

for(i=1;i<=16;i++)
  {
    if (i<10) 
    {
    vstr1 = "0" + i;
    }
    else
    {
    vstr1 = i;
    }
  if (MA[17].charAt(i-1) != 'f'  )
         {   
        if(MA[16].charAt((i-1)*4) =='f')
            {
            target = document.getElementById("c1"+vstr1);
            target.style.display="none";
            }
        else
            {
            target = document.getElementById("c1"+vstr1);
            target.src=imgs[2].src;
            }
        
        if(MA[16].charAt((i-1)*4+1) =='f')
            {
            target = document.getElementById("c2"+vstr1);
            target.style.display="none";
            }
        else
            {
            target = document.getElementById("c2"+vstr1);
            target.src=imgs[0].src;
            }
       
        if(MA[16].charAt((i-1)*4+2) =='f')
            {
            target = document.getElementById("c3"+vstr1);
            target.style.display="none";
            }
        else
            {
            target = document.getElementById("c3"+vstr1);
            target.src=imgs[1].src;
            }
       if(MA[16].charAt((i-1)*4+3) =='f')
            {
            target = document.getElementById("c4"+vstr1);
            target.style.display="none";
            }
        else
            {
            target = document.getElementById("c4"+vstr1);
            target.src=imgs[3].src;
            }
       }
            
   }

//newAJAXCommand('rstatus.xml', UpdateStatusL);
setTimeout(_scrollToTop, 100);
}

function UpdateStatusL(xmlData)
{
document.getElementById('RT').innerHTML = getXMLValue(xmlData, 'RT');
setTimeout("newAJAXCommand('rstatus.xml', UpdateStatusL)",10000);
}


function _scrollToTop() {
document.body.scrollTop = 0;
}
