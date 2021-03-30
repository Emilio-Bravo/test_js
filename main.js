window.addEventListener("load", function () {
  mediaOnline();
});
async function mediaOnline() {
  let video = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  document.querySelector("#video").srcObject = video;
}
