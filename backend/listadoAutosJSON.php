<?php
require_once "clases/auto.php";

$array = array();

foreach(Auto::traerJSON("./archivos/autos.json") as $obj)
{
    $objStd = new stdClass();
    $objStd->patente = $obj->patente;
    $objStd->marca = $obj->marca;
    $objStd->color = $obj->color;
    $objStd->precio = $obj->precio;

    array_push($array, $objStd);
}

echo json_encode($array);
?>