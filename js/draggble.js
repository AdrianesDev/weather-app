const defaultConfig = {
  open: true,
  debug: true,
  animatable: true,
};

export default function draggble($element, config = defaultConfig) {
  if (!($element instanceof HTMLElement)) {
    return console.warn(
      `Elemento invalido se esperaba un HTMLElement y se recibio ${$element}`
    );
  }
  let isOpen = config.open;

  let isDraggin = false;
  const elementRect = $element.getBoundingClientRect();
  const ELEMENT_BLOCK_SIZE = elementRect.height

  const $marker = $element.querySelector('[data-marker]');


  const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height;



  const VISIBLE_Y_POSITION = 0;
  const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE;
  let widgetPosition = VISIBLE_Y_POSITION;
  isOpen ? open() : close();

  let startY = 0;

  $marker.addEventListener('click', handleClick);
  $marker.addEventListener('pointerdown', handlePointerDown);
  $marker.addEventListener('pointerup', handlePointerUp);
  $marker.addEventListener('pointerout', handlePointerOut);
  $marker.addEventListener('pointercancel', handlePointerCancel);
  $marker.addEventListener('pointermove', handlePointerMove);

  if(config.animatable){
    setAnimation();
  }

  function setAnimation(){
    $element.style.transition = "margin-bottom .3s"
  }

  function bounce(){
    if(widgetPosition < ELEMENT_BLOCK_SIZE / 2){
      return open()
    }
    return close()
  }

  function dragEnd(){
    isDraggin = false;
    bounce()
  }


  function handlePointerDown(event){

    logger('pointer Down')
    starDrag(event)

  }

  function pageY(event){
    return event.pageY || event.touches[0].pageY
  }

  function starDrag(event){
    isDraggin = true
    startY = pageY(event)
  }
  function handlePointerMove(event){

    logger('pointer Move')
    drag(event)

  }

  function drag(event){
    const cursorY = pageY(event)
    const movementY = cursorY - startY
    widgetPosition = widgetPosition + movementY
    startY = cursorY
    if(widgetPosition > HIDDEN_Y_POSITION){
      return false
    }
    setWidgetPosition(widgetPosition)
  }
  function handlePointerUp(){

    logger('pointer up')
    dragEnd()
  }
  function handlePointerOut(){

    logger('pointer Out')
    dragEnd()
  }
  function handlePointerCancel(){

    logger('pointer Cancel')
    dragEnd()
  }

  function handleClick(){
    logger('CLICK');
    toggle();
  }

  function toggle(){
    if(!isDraggin){
      if(!isOpen){
        return open();
      }
      return close();
    }
  }

  function logger(message) {
    if (config.debug) {
      console.info(message);
    }
  }
  function open() {
    logger("abrir widget");
    isOpen = true;
    widgetPosition = VISIBLE_Y_POSITION;
    setWidgetPosition(widgetPosition);
  }
  function close() {
    logger("cerrar widget");
    isOpen = false;
    widgetPosition = HIDDEN_Y_POSITION;
    setWidgetPosition(widgetPosition);

  }
  function setWidgetPosition(value) {
    $element.style.marginBottom = `-${value}px`;
  }
}
