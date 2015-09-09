#!/bin/sh
# Zips up all the quiz starts and solutions for the course and puts them in the zips directory.
# Run from the course repo root

find . -type d -name start -or -name solution | while IFS= read -r pathname;
    do
        base=$(basename "$pathname");
        path=$(dirname $pathname | sed 's/\.\///g');
        cleanpath=$(echo "$path" | sed 's/\//\-/g');
        home=$(pwd);
        pushd $path;
        find . -iname \.DS_STORE | xargs -I '{}' rm '{}';
        zip -r ${home}/zips/${cleanpath}-${base} ${base};
        popd;
done