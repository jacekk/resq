# resq
ResqApp Repository

# Installation

## Backend

Backend is an ZF2/Apigility based API REST service which provides all required data

To fully initialize backent type

    composer install

in the /backend directory


## Frontend

### Scripts


Production build:
```
npm run build
```

Watch file changes:
```
npm run dev
```

Dev server (don't work?):
```
npm run dev-server
```

Tests:
```
npm run test
npm run test:watch
```

### Cordova installation

```
$ sudo npm install -g cordova
$ cd Resq
```

### Running

Execute one of the following:

```
$ cordova run browser
$ cordova run --target=firefox
$ cordova run --target=opera
```
