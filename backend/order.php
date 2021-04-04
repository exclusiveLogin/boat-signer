<?php

include_once "headers.php";
include_once "dbsetting_n_connect.php";

if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
  $arr = json_decode(file_get_contents('php://input'), true);

  if(isset($arr['id'])){
    $id = $arr['id'];

    $query = "UPDATE `orders` SET `readed` = 1 WHERE `id` <= $id";
    $mysql->query($query);

    array_push($arr, array('q' => $query, "readed until_id" => $id));

    if($mysql->error) echo json_encode($mysql->error);
    echo json_encode( $arr );
  }

  if( isset($arr['name']) && isset($arr['phone']) ){
    $name = '"'.$arr['name'].'"';
    $phone = '"'.$arr['phone'].'"';
    $email = '"'.$arr['email'].'"';
    
    
    $query = "INSERT INTO `orders` (`name`, `phone`, `email`) VALUES ($name, $phone, $email)";
    $mysql->query($query);
    array_push($arr, array('q' => $query));
  

    if($mysql->error) echo json_encode($mysql->error);
    

    echo json_encode( $arr );
    
  }
}

// GETTERS
if ( $_SERVER['REQUEST_METHOD'] === 'GET' ) {
  if(!(isset($_GET['pass']) && $_GET['pass'] == 'q1w2e3r4t5y6')) {
    echo json_encode(array("error" => "Пароль не верный"));
    die();
  }


  $limit = isset($_GET['limit']) ? ' LIMIT '.$_GET['limit'] : ' LIMIT 100 ';

  $q = "SELECT * FROM `orders` $limit";

 
  $json = array();

  $res = $mysql->query( $q );

  if($mysql->error) echo json_encode($mysql->error);

  $row = $res ? $res->fetch_assoc() : false;

  while( $row ){
    array_push( $json, $row);
    $row = $res->fetch_assoc();
  }

  echo json_encode( $json );

}
