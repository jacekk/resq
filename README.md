# ResQ - Stay safe!
Resq is an application that will notify your friends or family if you dont respond during urban explorations or doing extreme sports.
Just set estimated period of time and dont worry - even if your phone will loose signal Resq will notify your friends that you haven't respond in time.

# Installation

## Backend

Backend is an ~~ZF2/Apigility~~ Flight PHP Framework based API REST service which provides all required data

To fully initialize backent type

    composer install

in the /backend directory. Backend should be available on separate domain.

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
