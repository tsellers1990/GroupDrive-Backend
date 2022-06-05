#!/usr/bin/env bash
#Lets kick off a migration
echo "Starting DB Migration!"
npm run migrate up

#Check if Env file is set on container
if [ "$ENV" == "" ] || [ $# -gt 1 ]; then
        echo "Please enter an environment to run!"
        exit 1
fi

#Are we running in a Dev environment?
if [ "$ENV" == "dev"] || [ "$ENV" == "DEV" ]
        echo "Starting App in Dev Mode"
        npm run start-dev
fi

#Are we running in a qa environment?
if [ "$ENV" == "qa"] || [ "$ENV" == "QA" ]
        echo "Starting App in Dev Mode"
        npm run start-dev
fi

#Are we running in a Production environment?
if [ "$ENV" == "prod"] || [ "$ENV" == "PROD" ]
        echo "Starting App in Dev Mode"
        npm run start-dev
fi