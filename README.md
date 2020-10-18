# irrigation-system


Script to use eWeLink switchs
based on https://github.com/skydiver/ewelink-api


## Setup
make sure you have node installed

```sh
sudo apt install nodejs
```

Install NPM - node packager manager
```sh
sudo apt install npm
```

clone the repository
```git
git clone https://github.com/danielpassy/irrigation-system.git
```

cd into the folder and run npm install 
```sh
cd irrigation-system
npm install
```

rename credentials_example.json to credentials.json, edit with your credentials and you're good to go

## Usage

The entry point is located in /src/irrigation.js

navigate to src and execute the command
```sh
cd src
node navigation.js
```
