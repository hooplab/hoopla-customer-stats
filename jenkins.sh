#!/bin/bash --login

# do not allow using unset variables
set -o nounset
set -o errexit
set -o pipefail

# install dependencies
bundle install

if [ $? -ne 0 ]; then
    echo "Error while installing dependencies" >&2
    exit 1
fi

# Strip origin/ from branch name so we are left only with the last part of the
# branch name. Eg. production, staging, or something else.
branch=$GIT_BRANCH
branch=$(echo $branch | sed -e 's/origin\///g')

# Build site
echo "Building branch '$branch'"
bundle exec middleman build

if [ $? -ne 0 ]; then
    echo "Error while building $branch" >&2
    exit 1
fi

if [ "master" == "$branch" ]; then
    aws s3 cp build/ s3://stats.hoopladev.no/ --recursive --acl "public-read" --include "build/*" --region "eu-west-1"
elif [ "production" == "$branch" ]; then
    aws s3 cp build/ s3://stats.hoopla.no/ --recursive --acl "public-read" --include "build/*" --region "eu-west-1"
else
    aws s3 cp build/ s3://stats-jenkins-web/$branch/ --recursive --acl "public-read" --include "build/*" --region "eu-west-1"
fi
