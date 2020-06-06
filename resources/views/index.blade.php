<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>delivr</title>
        <link rel="stylesheet" href="app.css">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" >
        <link rel="stylesheet" type="text/css" href="{{url('assets/css/bootstrap.min.css')}}"/> 
        {{-- <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet"> --}}
    </head>
    <body>
        <div id="index"></div>
        <script src="{{ asset('js/app.js') }}"></script>    
        {{-- <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"> </script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> --}}
    </body>
</html>
