<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="referrer" content="origin">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Resq - Somebody need your help!</title>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cyborg/bootstrap.min.css" rel="stylesheet" integrity="sha384-uSbimwRPo7PKyTL6azsx1CcBce/X9Qg+wX1MAjNV1gAkSXYveZbZeMMyJghdsSol" crossorigin="anonymous">
</head>
<body>

<div class="jumbotron">
    <div class="container text-center"><h1>ResQ - Stay Safe!</h1>
        <p>Your friend added <strong>you as his ICE</strong> (<em>In Case of Emergency</em>) Contact - now we cannot connect to him to be sure that he is allright.
            <strong>Please try to contact him as fast as possible.</strong> Below you'll find last recorded location and message left by your friend.</p>
        <div id="map" style="width: 100%; height: 500px"></div>

        <script type="text/javascript">
            var lastPoint = {lat: <?=$action['lat']?>, lng: <?=$action['lat']?>};

            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(lastPoint),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            var contentString = '<div id="content">This is the last known location recorded at </div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position: lastPoint,
                map: map,
                title: 'Last known location'
            });

            infowindow.open(map, marker);
        </script>
    </div>
</div>
