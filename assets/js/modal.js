var span = document.getElementsByClassName("modal-close")[0];

span.onclick = function() {
  setInterval(function() {
    document.getElementById("letra").focus();
  }, 100);
  //modal.style.display = "none";
};
var elems = document.querySelectorAll(".modal");
var instances = M.Modal.init(elems);
instances[0].open();
