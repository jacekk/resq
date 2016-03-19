;(function () {
    function onDeviceReady() {
        console.log('[Cordova] device ready');
        // navigator.contacts.find([navigator.contacts.fieldType.phoneNumbers], function (contacts){
        //     contacts.forEach(function (contact) {
        //         console.log(contact.phoneNumbers);
        //     })
        // }, function(){console.log('contacts:error', arguments);})
        //
        // setTimeout(function () {
        //     window.plugins.ContactChooser.chooseContact(function (contactInfo) {
        //         setTimeout(function () { // use timeout to fix iOS alert problem
        //             alert(contactInfo.displayName + " " + contactInfo.email + " " + contactInfo.phoneNumber);
        //         }, 0);
        //     });
        // }, 5000);
    }

    function onPause() {
        console.log('[Cordova] pause');
    }

    function onResume() {
        console.log('[Cordova] resume');
    }

    document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener('pause', onPause, false);
    document.addEventListener('resume', onResume, false);
})();
