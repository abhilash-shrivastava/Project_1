#!/usr/bin/env bash

echo "deploying to aws"

# log into aws everything under this is executed under the ubuntu user
ssh ubuntu@ec2-54-211-23-124.compute-1.amazonaws.com <<ubuntu
    echo "SSH connection done"
ubuntu