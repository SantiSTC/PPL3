<?php

    class Auto {
        public string $patente;
        public string $marca;
        public string $color;
        public int $precio;

        public function __construct(string $patente, string $marca = "", string $color = "", int $precio = 0){
            $this->patente = $patente;
            $this->marca = $marca;
            $this->color = $color;
            $this->precio = $precio;
        }

        public function toJSON(){
            $obj = new Auto($this->patente, $this->marca, $this->color, $this->precio);

            return json_encode($obj);
        }

        public function guardarJSON(string $path){
            $obj = new stdClass();
            $obj->exito = false;
            $obj->mensaje = "No se ha podido guardar el auto...";

            $ar = fopen($path, "a");

            $cant = fwrite($ar, "{$this->toJSON()}\n");

            if($cant > 0)
            {
                $obj->exito = true;
                $obj->mensaje = "Auto guardado correctamente...";
            }

            fclose($ar);

            return json_encode($obj);
        }

        public static function traerJSON($path){
            $autos = array();
            $contenido = "";
            $archivo = fopen($path, "r");

            while(!feof($archivo))
            {
                $contenido = fgets($archivo);
                $obj = explode("\n\r", $contenido);
                $obj = trim($obj[0]);

                if($obj !== "")
                {
                    $data = json_decode($obj);
                    $auto = new Auto($data->patente, $data->marca, $data->color,$data->precio);
                    array_push($autos, $auto);
                }
            }

            fclose($archivo);

            return $autos;
        }

        public static function verificarAutoJSON($auto){
            $autos = Auto::traerJSON("./archivos/autos.json");

            $obj = new stdClass();
            $obj->exito = false;
            $obj->mensaje = "Auto no encontrado";

            foreach($autos as $value){
                if($value->patente == $auto->patente){
                    $obj->exito = true;
                    $obj->mensaje = "Auto encontrado.";
                    break;
                }
            }

            return json_encode($obj);
        }
    }
?>