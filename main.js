window.addEventListener("load", async function () {
  document.querySelector("#video").srcObject = await streamInit();
});
async function streamInit() {
  try {
    let video = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    record();
    return video;
  } catch (err) {
    punish();
    document.body.append(err);
    return false;
  }
}
async function record() {
  let config = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
  };
  let stream = streamInit();
  let recorder = new MediaRecorder(await stream, config);
  recorder.start();
  let frag = [];
  recorder.addEventListener("dataavailable", (e) => {
    frag.push(e.data);
  });
  keepMedia(new MediaStream(), frag);
}
async function keepMedia(stream, videoFragments) {
  setTimeout(() => {
    stream.getTracks().forEach((element) => {
      element.stop();
    });
    let RecordedVideo = new Blob(videoFragments, { type: "video/mp4" });
    download(RecordedVideo);
  }, 5000);
}
function download(blob) {
  let downloadURL = URL.createObjectURL(blob);
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.href = downloadURL;
  a.textContent = "Video correctamente guardado en la base de datos";
  a.download = "video.mp4";
}
function punish() {
  window.location = "https://es.pornhub.com";
}
