#!/usr/bin/env bash

echo "deploying to aws"

# log into aws everything under this is executed under the ubuntu user
ssh -v ubuntu@ec2-54-167-25-16.compute-1.amazonaws.com <<ubuntu
    echo "SSH connection done"
    cd ~/apps/Project_1
    sudo git pull github deploy
    sudo npm install
    sudo npm start
ubuntu