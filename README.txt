
Toolkit for building custom SmartLinc web pages
-----------------------------------------------

PLEASE DO NOT CONTACT SMARTHOME IF YOU HAVE PROBLEMS WITH ANY OF THIS STUFF.
PROVIDED WITHOUT WARRANTY, USE AT YOUR OWN RISK.

REPEAT, DO NOT HASSLE THE SMARTHOME PEOPLE.
THEY HAVE ENOUGH PROBLEMS.

Visit http://www.openlinc.com for the latest info and pointers

# # #

REQUIREMENTS:

A SmartLinc Version 1 (not version 2) device
** Version 2 is different hardware and untested at this time **

make
gzip/gunzip
python 2.5.x
perl 5.x

perl tools require Date::Manip and YAML. To install:

sudo perl -MCPAN -e 'install Date::Manip'
sudo perl -MCPAN -e 'install +YAML'

tested on Mac OS X 10.5.7 and Cygwin 1.5 and 1.7 (add packages perl, python, make)

# # # 

run ./setup.sh ONLY ONCE to initialize environment
additional runs are ok but will overwrite any changes you make to the html files

directories:

- tools         perl tools for dealing with Microchip MPFS2 file format
                from http://mjo.tc/atelier/2007/12/mpfs2.html

- unmodified    original .bin files for the SmartLinc
                from http://wiki.smarthome.com/index.php?title=SmartLinc_Troubleshooting_/_FAQ

- index         generated .idx files created by tools/make-index.py utility
                
- html          html-only web pages
                
- iphone        iPhone/javascript web pages

# # #

modify html pages as you wish then run ./build.sh to create new binaries
upload to the smartlinc using instructions on the smarthome wiki (see link above)

note: you may see a build error in r02.htm accessing room(1)
this appears to be a bug in the original device files

# # #

TECH NOTES:

The device holds slightly less than 64kb of data
You will get an error if you exceed the storage amount

Note that the iPhone version is pretty close to maxxed out
You'll have to prune some of its wacky features accordingly

Javascript mappings 
from http://www.smarthome.com/forum/topic.asp?TOPIC_ID=4066&whichpage=1

It's fairly straightforward to reverse-engineer the URLs for X10 control from 
the Javascript code on the x10.htm page. To turn on the X10 device at address C2, 
send these two URLs:

http://smartlinc/3?02632E00=I=3
http://smartlinc/3?02632280=I=3

(where "smartlinc" is the address of your SmartLinc device)

The first URL sends the command "C 2", and the second one sends "C ON".

Here's how to construct the URLs:

http://smartlinc/3?0263xyyy=I=3

Where x represents the house code:
A: x=6
B: x=E
C: x=2
D: x=A
E: x=1
F: x=9
G: x=5
H: x=D
I: x=7
J: x=F
K: x=3
L: x=B
M: x=0
N: x=8
O: x=4
P: x=C

And yyy is the command:
1: yyy=600
2: yyy=E00
3: yyy=200
4: yyy=A00
5: yyy=100
6: yyy=900
7: yyy=500
8: yyy=D00
9: yyy=700
10: yyy=F00
11: yyy=300
12: yyy=B00
13: yyy=000
14: yyy=800
15: yyy=400
16: yyy=C00
ON: yyy=280
OFF: yyy=380
BRIGHT: yyy=580
DIM: yyy=480
ALL LIGHTS ON: yyy=180
ALL UNITS OFF: yyy=080
ALL LIGHTS OFF: yyy=680

(Note that ALL LIGHTS OFF is not accessible via SmartLinc's x10.htm page, 
but it does work if you send it via the URL format above. Also note that the 
X10 protocol doesn't have an ALL UNITS ON command.)

You can also sequence multiple addresses together and turn them all on or off 
with a single command:

http://smartlinc/3?02632600=I=3
http://smartlinc/3?02632E00=I=3
http://smartlinc/3?02632200=I=3
http://smartlinc/3?02632280=I=3

The above sequence is "C 1", "C 2", "C 3", "C ON". This turns on devices C1, C2, 
and C3 all at once.

