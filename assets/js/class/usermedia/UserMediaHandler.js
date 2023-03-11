class UserMediaHandler {

    hasUserPermission = false;

    videoPermission;

    audioPermission;

    videoDevices;

    audioDevices;

    videoconstraints = {
        video: {
            deviceId: {
                exact: 'default'
            }
        }
    };

    audioconstraints = {
        audio: {
            deviceId: {
                exact: 'default'
            },
            autoGainControl: false,
            echoCancellation: false,
            noiseSuppression: false
        }
    }

    constraints_debug = {
        video: {
            deviceId: {
                exact: 'default'
            },
            width: 640,
            height: 480,
            frameRate: 30
        }, audio: {
            deviceId: {
                exact: 'default'
            },
            autoGainControl: false,
            echoCancellation: false,
            noiseSuppression: false
        }
    };

    constructor() {
        this.checkPermissions().then(this.getDevices.bind(this));
    }

    checkPermissions() {
        return new Promise(function (resolve, reject) {
            navigator.permissions.query({name: 'camera'}).then(
                function (permissionStatus) {
                    this.videoPermission = permissionStatus;
                    navigator.permissions.query({name: 'microphone'}).then(
                        function (permissionStatus) {
                            this.audioPermission = permissionStatus;
                            if (this.videoPermission.state === 'granted' && this.audioPermission.state === 'granted') {
                                this.hasUserPermission = true;
                            } else if (this.videoPermission.state === 'denied' || this.audioPermission === 'denied') {
                                this.hasUserPermission = false;
                                alert("Access denied to camera or microphone, please reset domain permissions in your browser");
                            } else if (this.videoPermission.state === 'prompt' || this.audioPermission === 'prompt') {
                                alert("Access pending to camera or microphone, asking permissions now.");
                                this.askPermission();
                            }
                            resolve();
                        }.bind(this)
                    );
                }.bind(this)
            );
        }.bind(this));
    }

    askPermission() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio: true, video: true})
                .then(function (stream) {
                    alert('Acess granted, reloading page...');
                    location.reload();
                }.bind(this))
                .catch(function (error) {
                    alert('Acess denied to camera or microphone.');
                });
        } else {
            console.error('getUserMedia not supported');
        }

    }

    async getDevices() {
        let devices = await navigator.mediaDevices.enumerateDevices();
        this.videoDevices = devices.filter(device => device.kind === 'videoinput');
        this.audioDevices = devices.filter(device => device.kind === 'audioinput');
        this.drawSelectBox();
    }

    drawSelectBox() {
        const videoOptions = this.videoDevices.map(videoDevice => {
            return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
        });
        let cameraOptions = document.querySelector('.video-options>select');
        cameraOptions.innerHTML = videoOptions.join('');
        const audioOptions = this.audioDevices.map(audioDevice => {
            return `<option value="${audioDevice.deviceId}">${audioDevice.label}</option>`;
        });
        let micOptions = document.querySelector('.mic-options>select');
        micOptions.innerHTML = audioOptions.join('');
    }

    getVideoAudioStream() {
        if (!this.hasUserPermission) {
            alert("Acess denied to camera or microphone");
            return;
        }
        let cameraOptions = document.querySelector('.video-options>select');
        let micOptions = document.querySelector('.mic-options>select');
        let video = document.getElementById("vid");
        let audio = document.getElementById("aud");

        this.videoconstraints.video.deviceId.exact = cameraOptions.value;
        this.audioconstraints.audio.deviceId.exact = micOptions.value;
        navigator.mediaDevices
            .getUserMedia(this.videoconstraints)
            .then((stream) => {
                video.srcObject = stream;
                video.addEventListener("loadedmetadata", () => {
                    video.play();
                });
            })
            .catch(alert);
        navigator.mediaDevices
            .getUserMedia(this.audioconstraints)
            .then((stream) => {
                audio.srcObject = stream;
                audio.addEventListener("loadedmetadata", () => {
                    audio.play();
                });
            })
            .catch(alert);
        video.addEventListener('play', function () {
            let canvas = document.getElementById('canvas-stream');
            let ctx = canvas.getContext('2d');
            let $this = this; //cache
            (function loop() {
                if (!$this.paused && !$this.ended) {
                    ctx.drawImage($this, 0, 0);
                    setTimeout(loop, 1000 / 30); // drawing at 30fps
                }
            })();
        }, false);
    }

}
