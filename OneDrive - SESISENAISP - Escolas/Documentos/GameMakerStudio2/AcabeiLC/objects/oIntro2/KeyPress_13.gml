// Cria uma instância do objeto de transição
var transitionInstance = instance_create_depth(0, 0, 0, otransitionscred);

// Define as propriedades da transição
transitionInstance.transitioning = true;
transitionInstance.nextRoom = intro3;
audio_stop_sound(sndcuriodades);
