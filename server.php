<?php 
    //prendiamo i parametri dal form dell'html tramite un metodo POST o GET
    $add = !empty($_POST['newItem']);
    $check = !empty($_POST['check']);
    $delete = !empty($_POST['delete']);

    //Leggiamo e decodifichiamo il file json
    $todo = file_get_contents(__DIR__.'/todo.json');
    $todo = json_decode($todo, true);

    //Aggiungiamo un nuovo item
    if($add !== ''){
        $todo[] = [
            'text' => $add,
            'check' => false
        ];
    };

    //Modifichiamo la variabile check nell' array associativo
    if($check !== NULL){
        if(!$todo[$check]['check']){
            $todo[$check]['check'] = true;
        }else{
             $todo[$check]['check'] = false;
        }
    };

    // Cancella l'elemento selezionato dal file json
    if($delete !== NULL){
        array_splice($todo,$delete);
    };

    // Codifica in formato json
    $todo = json_encode($todo);
    
    // Aggiunta del Todo al file json
    file_put_contents(__DIR__.'/todo.json',$todo);
    
    // Risposta in formtato json
    header('Content-Type: application/json');
    echo $todo;