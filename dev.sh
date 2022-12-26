#!/bin/bash

display_help_message() {
  cat <<EOM
NAME
  dev.sh - A set of commands to easily add component to project
DESCRIPTION
  create-dto [name] Create a new dto
  create-exception [name] Create a new exception
  create-http [name] Create a new http file
  create-interface [name] Create a new interface
  create-middleware [name] Create a new middleware
  create-model [name] Create a new model
  create-route [name] Create a new route
  create-service [name] Create a new service
  create-test [name] Create a new test suite
EOM
}

create_route() {
  local $filename=$1
  local $classname=$2
  local $localVarname=$3
  local routepath="$PWD/src/routes/${filename}s.route.ts"

  if [ -f "$routepath" ]; then
    echo "File already exists"
  else
    # Create the code from template
    cp ./.template/sample.route.ts $routepath
  fi

  change_content_file $routepath $classname $localVarname
  
  echo "Route created $routepath"
}

create_controller() {
  local $filename=$1
  local $classname=$2
  local $localVarname=$3
  local controllerpath="$PWD/src/controllers/${filename}s.controller.ts"

  if [ -f "$filepath" ]; then
    echo "File already exists"
  else
    cp ./.template/sample.controller.ts $controllerpath
  fi

  change_content_file $controllerpath $classname $localVarname

  echo "Controller created $controllerpath"
}

create_service() {
  local $filename=$1
  local $classname=$2
  local $localVarname=$3
  local servicepath="$PWD/src/services/${filename}s.service.ts"

  if [ -f "$filepath" ]; then
    echo "File already exists"
  else
    cp ./.template/sample.service.ts $servicepath
  fi

  change_content_file $servicepath $classname $localVarname

  echo "Service created $servicepath"
}

create_interface() {
  local $filename=$1
  local $classname=$2
  local $localVarname=$3
  local interfacepath="$PWD/src/interfaces/${filename}s.interface.ts"

  if [ -f "$filepath" ]; then
    echo "File already exists"
  else
    cp ./.template/sample.interface.ts $interfacepath
  fi

  change_content_file $interfacepath $classname $localVarname

  echo "Interface created $interfacepath"
}

create_model() {
  local $filename=$1
  local $classname=$2
  local $localVarname=$3
  local modelpath="$PWD/src/models/${filename}s.model.ts"

  if [ -f "$filepath" ]; then
    echo "File already exists"
  else
    cp ./.template/sample.model.ts $modelpath
  fi

  change_content_file $modelpath $classname $localVarname

  echo "Model created $modelpath"
}

create_test() {
  local $filename=$1
  local $classname=$2
  local $localVarname=$3
  local testpath="$PWD/src/tests/${filename}s.test.ts"

  if [ -f "$filepath" ]; then
    echo "File already exists"
  else
    cp ./.template/sample.test.ts $testpath
  fi

  change_content_file $testpath $classname $localVarname

  echo "Test created $testpath"
}

create_http() {
  local $filename=$1
  local $classname=$2
  local $localVarname=$3
  local httppath="$PWD/src/http/${filename}s.http"

  if [ -f "$filepath" ]; then
    echo "File already exists"
  else
    cp ./.template/sample.http $httppath
  fi

  change_content_file $httppath $classname $localVarname

  echo "Http created $httppath"
}

create_dto() {
  local $filename=$1
  local $classname=$2
  local $localVarname=$3
  local dtopath="$PWD/src/dtos/${filename}s.dto.ts"

  if [ -f "$filepath" ]; then
    echo "File already exists"
  else
    cp ./.template/sample.dto.ts $dtopath
  fi

  change_content_file $dtopath $classname $localVarname

  echo "DTO created $dtopath"
}

change_content_file () {
  local filepath=$1
  local classname=$2
  local localVarname=$3

  local content=$(cat $filepath | sed -s "s/Sample/$classname/g" | sed -s "s/sample/$localVarname/g")

  echo "$content" > $filepath
}

main() {
  case "$1" in
  create-route)
    cat <<EOM
The script will create corresponding components, E.g: if you enter User, it will create:
- src/routes/users.route.ts
- src/controllers/users.controllers.ts
- src/dtos/users.dto.ts
- src/models/users.model.ts
- src/interfaces/users.interface.ts
- src/tests/users.test.ts
- src/http/users.http

Please provide the class name:
EOM
    read classname
    local filename=$(echo "${classname,,}")
    local localVarname=$(echo "${classname,,}")

    create_route $filename $classname $localVarname
    create_controller $filename $classname $localVarname
    create_service $filename $classname $localVarname
    create_model $filename $classname $localVarname
    create_test $filename $classname $localVarname
    create_interface $filename $classname $localVarname
    create_http $filename $classname $localVarname
    create_dto $filename $classname $localVarname

    exit 0
    ;;
  delete-route)
    cat <<EOM
Enter the name of the route you want to delete (singular form), e.g: user
EOM
    read filename
    if [ -f "$PWD/src/routes/${filename}s.route.ts" ]; then
      rm "$PWD/src/routes/${filename}s.route.ts"
    fi

    if [ -f "$PWD/src/controllers/${filename}s.controller.ts" ]; then
      rm "$PWD/src/controllers/${filename}s.controller.ts"
    fi

    if [ -f "$PWD/src/dtos/${filename}s.dto.ts" ]; then
      rm "$PWD/src/dtos/${filename}s.dto.ts"
    fi

    if [ -f "$PWD/src/http/${filename}s.http" ]; then
      rm "$PWD/src/http/${filename}s.http"
    fi

    if [ -f "$PWD/src/interfaces/${filename}s.interface.ts" ]; then
      rm "$PWD/src/interfaces/${filename}s.interface.ts"
    fi

    if [ -f "$PWD/src/models/${filename}s.model.ts" ]; then
      rm "$PWD/src/models/${filename}s.model.ts"
    fi

    if [ -f "$PWD/src/services/${filename}s.service.ts" ]; then
      rm "$PWD/src/services/${filename}s.service.ts"
    fi

    if [ -f "$PWD/src/tests/${filename}s.test.ts" ]; then
      rm "$PWD/src/tests/${filename}s.test.ts"
    fi

    echo "Route deleted. You will need to go to src/server.ts and delete unused routes there"

    exit 0
    ;;
  *)
    printf "Invalid argument: $1\n"
    display_help_message
    exit 1
    ;;
  esac
}

main "$@"
