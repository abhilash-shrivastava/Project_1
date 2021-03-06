#!/usr/bin/env bash

echo "deploying to aws"

# log into aws everything under this is executed under the ubuntu user
ssh -v ubuntu@ec2-54-209-196-250.compute-1.amazonaws.com <<ubuntu
    echo "SSH connection done"
    cd ~/apps/Project_1
    git pull github master
    apt-get -y update
    apt-get -y install nodejs
    apt-get -y install npm
    npm install
    sudo npm install forever -g
    forever start -c "npm start" ./
    forever start -c "node server.js" ./server/
ubuntu