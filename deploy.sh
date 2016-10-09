#!/usr/bin/env bash

echo "deploying to aws"

# log into aws everything under this is executed under the ubuntu user
ssh -v ubuntu@ec2-54-167-25-16.compute-1.amazonaws.com <<ubuntu
    echo "SSH connection done"
    cd ~/apps/Project_1
    git pull github dynamo-db
    npm install
    sudo npm install forever -g
    forever start -c "npm start" ./
    node src/server/server.js
ubuntu