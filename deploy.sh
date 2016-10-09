#!/usr/bin/env bash

echo "deploying to aws"

# log into aws everything under this is executed under the ubuntu user
ssh ubuntu@ec2-52-88-156-243.us-west-2.compute.amazonaws.com <<ubuntu
    echo "SSH connection done"
ubuntu