/* global AFRAME */

AFRAME.registerComponent('gesture-handler', {
    schema: {
        enabled: { default: true },
        rotationFactor: { default: 5 },
        minScale: { default: 0.3 },
        maxScale: { default: 8 },
    },

    init() {
        this.handleScale = this.handleScale.bind(this);
        this.handleRotation = this.handleRotation.bind(this);

        this.isVisible = false;
        this.initialScale = this.el.object3D.scale.clone();
        this.scaleFactor = 1;

        this.el.sceneEl.addEventListener('markerFound', () => {
            this.isVisible = true;
        });

        this.el.sceneEl.addEventListener('markerLost', () => {
            this.isVisible = false;
        });
    },

    update() {
        if (this.data.enabled) {
            this.el.sceneEl.addEventListener('onefingermove', this.handleRotation);
            this.el.sceneEl.addEventListener('twofingermove', this.handleScale);
        } else {
            this.el.sceneEl.removeEventListener('onefingermove', this.handleRotation);
            this.el.sceneEl.removeEventListener('twofingermove', this.handleScale);
        }
    },

    remove() {
        this.el.sceneEl.removeEventListener('onefingermove', this.handleRotation);
        this.el.sceneEl.removeEventListener('twofingermove', this.handleScale);
    },

    handleRotation(event) {
        if (this.isVisible) {
            this.el.object3D.rotation.y +=
                event.detail.positionChange.x * this.data.rotationFactor;
            this.el.object3D.rotation.x +=
                event.detail.positionChange.y * this.data.rotationFactor;
        }
    },

    handleScale(event) {
        if (this.isVisible) {
            this.scaleFactor *=
                1 + event.detail.spreadChange / event.detail.startSpread;

            this.scaleFactor = Math.min(
                Math.max(this.scaleFactor, this.data.minScale),
                this.data.maxScale
            );

            this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
            this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
            this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
        }
    },
});
