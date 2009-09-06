#!/bin/bash

function build {
echo building $1...
rm -rf $1.new
mkdir $1.new
cp $1/* $1.new
gzip $1.new/*.css 2>/dev/null
gzip $1.new/*.js 2>/dev/null

touch $1.new.img
touch $1.new.c

mpfs2-make-image --idx=index/$1.idx $1.new
mv $1.new.img $1.bin

rm -rf $1.new
rm $1.new.c
}

build html
build iphone
