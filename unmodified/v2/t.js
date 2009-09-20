var refresh = 0;
var mode = 0;

function dorefresh(also)
{
var str4,str5,str9;
var c = ((document.getElementById('sc').selectedIndex))*2;
var hex = c.toString(16);
var vidstr = document.getElementById('Vid').value;

if(vidstr.length == 8)
    vidstr = vidstr.substring(0,2)+vidstr.substring(3,5)+vidstr.substring(6,8);

str4 = '0262'+vidstr+'0F6C'+hex;   // Set Cool Point
c = ((document.getElementById('sh').selectedIndex))*2;
hex = c.toString(16);
str5 = '0262'+vidstr+'0F6D'+hex;     // Set Heat Point
if(also == 3)str9 = '0262'+vidstr+'0F6B'+ document.getElementById('md').value;    //Change Mode 02620E68C70F6BXX
else str9 = '0262'+vidstr+'0F6B'+ document.getElementById('mdf').value;    //Change Mode 02620E68C70F6BXX
    
if(also == 1) newAJAXCommand('3?' + str4 + '=I=3');
if(also == 2) newAJAXCommand('3?' + str5 + '=I=3');
if(also >= 3) newAJAXCommand('3?' + str9 + '=I=3');

if(also == 0)   refresh = 0;
else            refresh = 60;   //wait for command

document.getElementById("B1").style.color = '#808080';
  
}

function start()
{
setTimeout("newAJAXCommand('buffstatus.xml', UpdateStatusB)",1000);
refresh = 0;
document.getElementById("B1").style.color = '#808080';
}
 
function UpdateStatusB(xmlData)
{
var currentstr;
var i,j,a,b,commmand;
var str1,str2,str3,str8,str10,str11,vidstr;

vidstr = document.getElementById('Vid').value;
if(vidstr.length == 8)
    vidstr = vidstr.substring(0,2)+vidstr.substring(3,5)+vidstr.substring(6,8);
    
str1 = '0262'+vidstr+'0F6A00';        //Curent Temp 02620E68C70F6A00
str2 = '0262'+vidstr+'0F6A60';        //Current Humidity 02620E68C70F6A60
str3 = '0262'+vidstr+'0F6A20';        //Current SetPoint(s) 02620E68C70F6A20
str8 = '0262'+vidstr+'0F6B02';        //current Mode 02620E68C70F6B02
str10= '0262'+vidstr+'0FF0E8';        //current LED State 02620E68C70FF0E8
str11= '0262'+vidstr+'0FF04B';        //current Fan State 02620E68C70FF04B

currentstr = getXMLValue(xmlData, 'BS');
if(currentstr != null)
{

 Z = 0;
 while(currentstr.length > 21+Z)
    {
     if("0250" == currentstr.substring(Z,4)) break;
     Z++;
     }
 
flag = 0;  
if(currentstr.length > 21+Z)
    if("0250" == currentstr.substring(0+Z,4+Z))
        if(vidstr == currentstr.substring(4+Z,10+Z))
            if("0" == currentstr.substring(16+Z,17+Z))
                {
                if("6E" == currentstr.substring(18+Z,20+Z)) flag = 1;
                if("6F" == currentstr.substring(18+Z,20+Z)) flag = 2;
                if("70" == currentstr.substring(18+Z,20+Z)) flag = 3;
                if("71" == currentstr.substring(18+Z,20+Z)) flag = 4;
                if("72" == currentstr.substring(18+Z,20+Z)) flag = 5;
                }
 
if(currentstr.length > 21+Z)
     if("0250" == currentstr.substring(0+Z,4+Z))
        if(vidstr == currentstr.substring(4+Z,10+Z))
            if("C" == currentstr.substring(16+Z,17+Z)) 
                {
                   if("01" == currentstr.substring(14+Z,16+Z))
                        {
                        if("11" == currentstr.substring(18+Z,20+Z)) flag = 6;
                        if("13" == currentstr.substring(18+Z,20+Z)) flag = 7;
                        }
                        
                   if("02" == currentstr.substring(14+Z,16+Z))
                        {
                        if("11" == currentstr.substring(18+Z,20+Z)) flag = 8;
                        if("13" == currentstr.substring(18+Z,20+Z)) flag = 9;
                        }

                   if("03" == currentstr.substring(14+Z,16+Z))
                        {
                        if("11" == currentstr.substring(18+Z,20+Z)) flag = 10;
                        if("13" == currentstr.substring(18+Z,20+Z)) flag = 11;
                        }
                }
           if("4" == currentstr.substring(16+Z,17+Z) )
                {
                   if("01" == currentstr.substring(20+Z,22+Z))
                        {
                        if("11" == currentstr.substring(18+Z,20+Z)) flag = 6;
                        if("13" == currentstr.substring(18+Z,20+Z)) flag = 7;
                        }
                        
                   if("02" == currentstr.substring(20+Z,22+Z))
                        {
                        if("11" == currentstr.substring(18+Z,20+Z)) flag = 8;
                        if("13" == currentstr.substring(18+Z,20+Z)) flag = 9;
                        }

                   if("03" == currentstr.substring(20+Z,22+Z))
                        {
                        if("11" == currentstr.substring(18+Z,20+Z)) flag = 10;
                        if("13" == currentstr.substring(18+Z,20+Z)) flag = 11;
                        }
                }
                
if(flag != 0)
    {
    if (refresh >15 && refresh != 60) refresh = 15;

    s = currentstr.substring(20+Z,22+Z);
    s1 = currentstr.substring(21+Z,22+Z);
    s2 = currentstr.substring(20+Z,21+Z);
  
    if(flag == 7|| flag== 9)  DoCH(0);
    if(flag == 6)  DoCH(1);
    if(flag == 8)  DoCH(2);
    
    if(flag == 10) DoFAN(1);
    if(flag == 11) DoFAN(0);
    
    if(flag == 3) {DoMode(s1);DoFAN(s2);}
 
    a = s.charAt(0);
    b = s.charAt(1);
    i = parseInt('0x'+a+b)/2;

    newAJAXCommand('1?XB=M=1');

    if(flag == 1) 
        {
        document.getElementById('ans1').innerHTML = i+"\u00B0";
        document.getElementById('ans1').style.color = 'black';
        }
    if(flag == 4 ) 
        {
         document.getElementById('ans3').style.color = 'black';
         document.getElementById('ans3').innerHTML = i+"\u00B0";
        }
    if(flag == 5 ) 
        {
         document.getElementById('ans4').style.color = 'black';
         document.getElementById('ans4').innerHTML = i+"\u00B0";
        }
    if(flag == 2)
        {
        document.getElementById('ans2').style.color = 'black';
        i = i*2;
        document.getElementById('ans2').innerHTML = i+"%";
        }
     }

if(currentstr.length > 38)
    {
    Ack = currentstr.substring(34,35);
    if(Ack == '2')
        {
            command = currentstr.substring(12,16);
            Ackcmd = currentstr.substring(36,38);
            s = currentstr.substring(38,40);
            var s1 = currentstr.substring(39,40);
            var s2 = currentstr.substring(38,39);
  
           if(command == "F0E8" && Ackcmd == "F0")  DoCH(s1);
                
  
            if(command == "F04B" && Ackcmd == "F0") DoFAN(s2);
  
           if(command == "6B02" && Ackcmd == "6B") DoMode(s1);
 
                a = s.charAt(0);
                b = s.charAt(1);

                i = parseInt('0x'+a+b)/2;
 
             
            if(command == "6A00" && Ackcmd == "6A") 
                {
                document.getElementById('ans1').innerHTML = i+"\u00B0";
                document.getElementById('ans1').style.color = 'black';
                }
                
            if(command == "6A20" && Ackcmd == "6A")
                {
                document.getElementById('ans3').style.color = 'black';
                document.getElementById('ans4').style.color = 'black';

                if(mode == 1 || mode == 6)
                    {
                     document.getElementById('ans4').innerHTML = i+"\u00B0";
                     document.getElementById('ans3').innerHTML = " ";
                    }

                if(mode == 2 || mode == 7)
                    {
                     document.getElementById('ans3').innerHTML = i+"\u00B0";
                     document.getElementById('ans4').innerHTML = " ";

                    }
                if(mode == 3 || mode == 5)
                    {
                     document.getElementById('ans4').innerHTML = i+"\u00B0";
                     
                     if(currentstr.length > 60)
                        {
                        s = currentstr.substring(60,62);  
                        a = s.charAt(0);
                        b = s.charAt(1);
                        i = parseInt('0x'+a+b)/2;
                        document.getElementById('ans3').innerHTML = i+"\u00B0";
                        } 
                    }
                }

            if(command == "6A60" && Ackcmd == "6A")
                {
                document.getElementById('ans2').style.color = 'black';
                i = i*2;
                document.getElementById('ans2').innerHTML = i+"%";
                }
         }
     }
}

if(refresh == 0)   { newAJAXCommand('3?' + str1  + '=I=3');document.getElementById('ans1').style.color = '#808080';}
if(refresh == 2)   { newAJAXCommand('3?' + str2  + '=I=3');document.getElementById('ans2').style.color = '#808080';}
if(refresh == 4)    newAJAXCommand('3?' + str10 + '=I=3');
if(refresh == 6)   { newAJAXCommand('3?' + str8  + '=I=3');document.getElementById('ans8').style.color = '#808080';}
if(refresh == 8)  { newAJAXCommand('3?' + str11 + '=I=3');document.getElementById('ans9').style.color = '#808080';}
if(refresh == 10)  { newAJAXCommand('3?' + str3  + '=I=3');document.getElementById('ans3').style.color = '#808080';document.getElementById('ans4').style.color = '#808080';}

refresh++;
if (refresh >=60) refresh = 0;

if(refresh == 13) newAJAXCommand('1?XB=M=1');

if(refresh >= 13)
    {
    document.getElementById("B1").style.color = '#23498E';
    setTimeout("newAJAXCommand('buffstatus.xml', UpdateStatusB)",10000);
    }
else 
    {
    document.getElementById("B1").style.color = 'white';
    setTimeout("newAJAXCommand('buffstatus.xml', UpdateStatusB)",1000);
    }

}
              
function DoCH(s1)
{ 
document.getElementById('stat1').innerHTML=" ";
document.getElementById('stat2').innerHTML=" ";

if(((s1&0x01) == 1) && ((s1&0x02) != 2)) 
        {
        document.getElementById('stat1').innerHTML= "Cooling";
        document.getElementById('stat1').style.color= "blue";
        }
        
if(((s1&0x01) != 1) && ((s1&0x02) == 2)) 
    {
    document.getElementById('stat2').innerHTML= 'Heating';
    document.getElementById('stat2').style.color= "Red";
    }
}
function DoFAN(s2) 
{
document.getElementById('ans9').innerHTML = 'Fan Auto';
if((s2&0x01) ==0x01)  
    {
     document.getElementById('ans9').innerHTML = 'Fan On';
    }
document.getElementById('ans9').style.color = 'black';
}

function DoMode(s)          
{

document.getElementById('ans8').style.color = 'black';

if(s=='0')
    {
    document.getElementById('ans8').innerHTML = "Off";
    mode = 0;
    }
if(s=='1')
    {
    document.getElementById('ans8').innerHTML = "Heat";
    mode = 1; 
    }
if(s=='2')
    {
    document.getElementById('ans8').innerHTML = "Cool";
    mode = 2;
    }
if(s=='3')
    {
    document.getElementById('ans8').innerHTML = "Auto";
    mode = 3;
    }
 if(s=='4')
    {
    document.getElementById('ans8').innerHTML = "Fan";
    mode = 4;
    }
 if(s=='5')
    {
    document.getElementById('ans8').innerHTML = "Prog";
    mode = 5;
    }
 if(s=='6')
    {
    document.getElementById('ans8').innerHTML = "Prog H";
    mode = 6;
    }
 if(s=='7')
    {
    document.getElementById('ans8').innerHTML = "Prog C";
    mode = 7;
    }
}
function DoSet(i)
{

}

