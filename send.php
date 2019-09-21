<?php 
  if(isset($_POST['name']) && isset($_POST['phone'])){
    $result = array(
      'name' => $_POST['name'], 
      'phone' => $_POST['phone'],
      'message' => $_POST['message'], );

      echo json_encode($result);
  }
?>