import { BaseModule, mapGetters } from './lib/BaseModule';

class Component extends BaseModule {
    constructor () {
        super();
        this.setProps(['options']);
        this.setComponent({});
        this.setMethod({
            setOptions () {
                let options = this.options || {};
                this.isShow = !!options.isShow;
                this.title = options.title || '';
                this.content = options.content || '';
                this.onHide = typeof options.onHide === 'function' ? options.onHide : null;
                this.onCancel = typeof options.onCancel === 'function' ? options.onCancel : null;
                this.onConfirm = typeof options.onConfirm === 'function' ? options.onConfirm : null;
                this.confirmButtonColor = typeof options.confirmButtonColor === 'string' && options.confirmButtonColor.indexOf('#') === 0 ? options.confirmButtonColor : '#00AAEE';
                this.cancelButtonColor = typeof options.cancelButtonColor === 'string' && options.cancelButtonColor.indexOf('#') === 0 ? options.cancelButtonColor : '#00AAEE';
                this.showMask = typeof options.showMask === 'boolean' ? options.showMask : false;
                this.autoDismiss = typeof  options.autoDismiss === 'boolean' ? options.autoDismiss : true;
                this.$nextTick(() => {
                    let el = this.$el.querySelector('.dialog-area');
                    if (el) {
                        el.style.marginTop = `${(this.windowHeight - el.offsetHeight) / 2}px`;
                    }
                });
            },
            hide () {
                this.onHide && this.onHide();
            },
            cancel () {
                this.onCancel && this.onCancel();
                this.tryToHide();
            },
            confirm () {
                this.onConfirm && this.onConfirm();
                this.tryToHide();
            },
            tryToHide () {
                if (this.autoDismiss) {
                    this.hide();
                }
            }
        });
        this.setCompute({
            ...mapGetters({
                windowHeight: 'windowHeight',
                windowWidth: 'windowWidth',
                appConfig: 'appConfig'
            })
        });
        this.setWatch({
            options () {
                this.setOptions();
            },
            shake (value) {
                if (value) {
                    let self = this;
                    if (self.autoDismiss) {
                        self.shake = false;
                        self.hide();
                    } else {
                        setTimeout(() => {
                            self.shake = false;
                        }, 300);
                    }
                }
            }
        });
    }

    getData () {
        return {
            isShow: false,
            title: '',
            content: '',
            autoDismiss: true,
            defaultWidth: '',
            defaultHeight: '',
            showMask: false,
            shake: false,
            confirmButtonColor: '#00AAEE',
            cancelButtonColor: '#00AAEE'
        };
    }

    onCreate () {
        let app = this.app;
        app.setOptions();
        app.defaultWidth = window.innerWidth;
        app.defaultHeight = window.innerHeight;
    }

    onMount () {
    }
}

module.exports = Component;
