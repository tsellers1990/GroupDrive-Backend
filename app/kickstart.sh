#!/usr/bin/env bash
#Lets kick off a migration
migration(){
  echo "Starting DB Migration!"
  until npm run migrate up >> /dev/null; do echo "Retrying Migration till DB is Ready..."; sleep 2; done
  echo "Migration is Complete!"
}


#Lets setup our App for which environment we are in
case $ENV in
  local | LOCAL)
    echo "Starting App in Local Mode! This will be Buggy!!!!!"
    npm install
    migration
    npm run start-dev
    ;;
  #Are we running in a Dev Env?
  dev | DEV)
    echo "Starting App in Dev Mode"
    migration
    npm run start-dev
    ;;
  #Are we running in a QA Env?
  qa | QA)
    echo "Starting App in QA Mode"
    migration
    npm run start-dev
    ;;
  #Are we running in a Production Env?
  prod | PROD)
    echo "Starting App in Production Mode"
    migration
    npm run start-dev
   ;;
 #Error case statement, we should never hit this here!
  *)
    echo "ENV variable not set, or it is not recognized"
    exit 1
 esac