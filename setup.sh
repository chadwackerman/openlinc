#!/bin/bash

if [[ "$OSTYPE" == "cygwin" ]]
then cp tools/mpfs* /usr/local/bin
else echo copying mpfs tools to /usr/local/bin
sudo cp tools/mpfs* /usr/local/bin
fi

mkdir -p index

function setup {
mkdir -p $1
pushd $1 >/dev/null
rm -f *
mpfs2-fsutil --extract ../unmodified/$2
gunzip *.gz
python ../tools/make-index.py >../index/$1.idx
rm *.*#
popd >/dev/null
}

setup html HTMLOnly0819mg2.bin
setup iphone iPhone0819mg2.bin
setup v2 2412n_js2.bin

