(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function fullVHfix() {
        const fullScreens = document.querySelectorAll("[data-fullscreen]");
        if (fullScreens.length && isMobile.any()) {
            window.addEventListener("resize", fixHeight);
            function fixHeight() {
                let vh = .01 * window.innerHeight;
                document.documentElement.style.setProperty("--vh", `${vh}px`);
            }
            fixHeight();
        }
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu") || document.querySelector(".icon-aside-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
            if (e.target.closest(".icon-aside-menu")) document.documentElement.classList.toggle("menu-open");
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    class Popup {
        constructor(options) {
            let config = {
                logging: false,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: true,
                    goHash: true
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Проснулся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                    if ("error" !== this._dataValue) {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) this._openToHash();
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                        }
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.popupLogging(`Открыл попап`);
                } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрыл попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _openToHash() {
            let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
            if (buttons && classInHash) this.open(classInHash);
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && 0 === focusedIndex) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    function formFieldsInit(options = {
        viewPass: false
    }) {
        const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
        if (formFields.length) formFields.forEach((formField => {
            if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
        }));
        document.body.addEventListener("focusin", (function(e) {
            const targetElement = e.target;
            if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.add("_form-focus");
                    targetElement.parentElement.classList.add("_form-focus");
                }
                formValidate.removeError(targetElement);
            }
        }));
        document.body.addEventListener("focusout", (function(e) {
            const targetElement = e.target;
            if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.remove("_form-focus");
                    targetElement.parentElement.classList.remove("_form-focus");
                }
                if (targetElement.hasAttribute("data-validate")) formValidate.validateInput(targetElement);
            }
        }));
        if (options.viewPass) document.addEventListener("click", (function(e) {
            let targetElement = e.target;
            if (targetElement.closest('[class*="__viewpass"]')) {
                let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                targetElement.classList.toggle("_viewpass-active");
            }
        }));
    }
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if ("email" === formRequiredItem.dataset.required) {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: false
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectPseudoLabel: "_select-pseudo-label",
                classSelectOptionSelected: "_select-selected",
                classSelectOptionSelectedDashed: "_dashed",
                classSelectOptionSelectedDisabled: "_select-selected _disabled"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) {
                    this.selectsInit(selectItems);
                    this.setLogging(`Проснулся, построил селектов: (${selectItems.length})`);
                } else this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if ("click" === targetType) {
                    if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if ("focusin" === targetType || "focusout" === targetType) {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) "focusin" === targetType ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if ("keydown" === targetType && "Escape" === e.code) this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : document;
            const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectСlose(selectActiveItem);
            }));
        }
        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.remove(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.dataset.speed);
            }
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (originalSelect.closest("[data-one-select]")) {
                const selectOneGroup = originalSelect.closest("[data-one-select]");
                this.selectsСlose(selectOneGroup);
            }
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                _slideToggle(selectOptions, originalSelect.dataset.speed);
            }
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                    document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                    if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                }
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
            let pseudoAttribute = "";
            let pseudoAttributeClass = "";
            if (originalSelect.hasAttribute("data-pseudo-label")) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: !originalSelect.hasAttribute("data-notitle") ? selectPlaceholder.dataset.label : "Сторiнки"
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : "";
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : "";
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple && selectOption.hasAttribute("data-checked-disabled") ? ` ${this.selectClasses.classSelectOptionSelectedDisabled + ` ${selectOption.hasAttribute("data-dashed") ? `${this.selectClasses.classSelectOptionSelectedDashed}` : ""}`}` : originalSelect.multiple ? ` ${selectOption.selected ? this.selectClasses.classSelectOptionSelected + "" + `${selectOption.hasAttribute("data-dashed") ? this.selectClasses.classSelectOptionSelectedDashed : " "}` : `${selectOption.hasAttribute("data-dashed") ? `${this.selectClasses.classSelectOptionSelectedDashed}` : ""}`}` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.innerHTML = this.getOptions(originalSelect);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            if (originalSelect.multiple) {
                optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                    originalSelectSelectedItem.removeAttribute("selected");
                }));
                const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                selectSelectedItems.forEach((selectSelectedItems => {
                    originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                }));
            } else {
                if (!originalSelect.hasAttribute("data-show-selected")) {
                    if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                    optionItem.hidden = true;
                }
                originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                this.selectAction(selectItem);
            }
            if (!originalSelect.hasAttribute("data-notitle")) this.setSelectTitleValue(selectItem, originalSelect);
            this.setSelectChange(originalSelect);
        }
        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        searchActions(selectItem) {
            this.getSelectElement(selectItem).originalSelect;
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
            const _this = this;
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                true === selectOptions.hidden ? _this.selectAction(selectItem) : null;
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[select]: ${message}`) : null;
        }
    }
    modules_flsModules.select = new SelectConstructor({});
    let addWindowScrollEvent = false;
    function asideScroll() {
        addWindowScrollEvent = true;
        const asideMenu = document.querySelector(".aside-menu");
        const asideMenuShow = asideMenu.hasAttribute("data-scroll-show");
        const asideMenuShowTimer = asideMenu.dataset.scrollShow ? asideMenu.dataset.scrollShow : 500;
        const startPoint = asideMenu.dataset.scroll ? asideMenu.dataset.scroll : 0;
        let scrollDirection = 0;
        let timer;
        !asideMenu.classList.contains("_asideMenu-scroll") ? asideMenu.classList.add("_asideMenu-scroll") : null;
        !asideMenu.classList.contains("_asideMenu-show") ? asideMenu.classList.add("_asideMenu-show") : null;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                if (asideMenuShow) {
                    asideMenu.classList.contains("_asideMenu-show") ? asideMenu.classList.remove("_asideMenu-show") : null;
                    timer = setTimeout((() => {
                        !asideMenu.classList.contains("_asideMenu-show") ? asideMenu.classList.add("_asideMenu-show") : null;
                    }), asideMenuShowTimer);
                }
            } else {
                asideMenu.classList.contains("_asideMenu-scroll") ? asideMenu.classList.remove("_asideMenu-scroll") : null;
                if (asideMenuShow) asideMenu.classList.contains("_asideMenu-show") ? asideMenu.classList.remove("_asideMenu-show") : null;
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function DynamicAdapt(type) {
        this.type = type;
    }
    DynamicAdapt.prototype.init = function() {
        const _this = this;
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
        this.arraySort(this.оbjects);
        this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
            return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }), this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        }));
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ",");
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                return item.breakpoint === mediaBreakpoint;
            }));
            matchMedia.addListener((function() {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            }));
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
        if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        } else for (let i = оbjects.length - 1; i >= 0; i--) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
    };
    DynamicAdapt.prototype.moveTo = function(place, element, destination) {
        element.classList.add(this.daClassname);
        if ("last" === place || place >= destination.children.length) {
            destination.insertAdjacentElement("beforeend", element);
            return;
        }
        if ("first" === place) {
            destination.insertAdjacentElement("afterbegin", element);
            return;
        }
        destination.children[place].insertAdjacentElement("beforebegin", element);
    };
    DynamicAdapt.prototype.moveBack = function(parent, element, index) {
        element.classList.remove(this.daClassname);
        if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
    };
    DynamicAdapt.prototype.indexInParent = function(parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    DynamicAdapt.prototype.arraySort = function(arr) {
        if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) return 0;
                if ("first" === a.place || "last" === b.place) return -1;
                if ("last" === a.place || "first" === b.place) return 1;
                return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
        })); else {
            Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return 1;
                    if ("last" === a.place || "first" === b.place) return -1;
                    return b.place - a.place;
                }
                return b.breakpoint - a.breakpoint;
            }));
            return;
        }
    };
    const da = new DynamicAdapt("max");
    da.init();
    function AJAX(url, {type, method = "GET", body, answers, error, succes}) {
        async function sendFetch() {
            let query = window.fetch;
            if ("POST" === method.toLocaleUpperCase() || "PUT" === method.toLocaleUpperCase() || "PATCH" === method.toLocaleUpperCase()) {
                let form = new FormData;
                form.append("data", JSON.stringify(body));
                query = await query(url, {
                    method: method.toLocaleUpperCase(),
                    body: form
                });
            } else if ("DELETE" === method.toLocaleUpperCase()) query = await query(url, {
                method
            }); else query = await query(url);
            answers({
                status: query.status
            });
            if (query.ok) succes(await query.json()); else error(new Error("request failed"));
        }
        function XHR() {
            let xhr;
            let form = new FormData;
            if (window.XMLHttpRequest) xhr = new XMLHttpRequest; else if (window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
            if ("PUT" === method.toLocaleUpperCase() || "PATCH" === method.toLocaleUpperCase() || "POST" === method.toLocaleUpperCase()) form.append("data", JSON.stringify(body));
            xhr.responseType = "json";
            xhr.open(method.toLocaleUpperCase(), url);
            xhr.onreadystatechange = () => {
                answers({
                    readyState: xhr.readyState,
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                if (4 == xhr.readyState && xhr.status >= 200 && xhr.status <= 299) succes(xhr.response); else error(xhr.readyState);
            };
            xhr.send("object" === typeof body ? form : "string" === typeof body ? body : "");
        }
        return "fetch" === type && "function" === typeof window.fetch ? sendFetch() : XHR();
    }
    function renderHTML(menu, error, ajax, paramert = function() {}) {
        const state = {};
        let aActive = menu.querySelector("a._active");
        issetData();
        function pageToggle(index) {
            state.page = index;
            history.pushState(state, "", window.location.href);
            history.replaceState(state, "", window.location.href);
            console.log(history);
        }
        function splitUrl(url) {
            return url.match(/(?=[^\/])[A-z]+(?:\.((html)|php))/)[0];
        }
        function changeState() {
            state.href = state.href ? state.href : window.location.href;
            state.page = state.page ? splitUrl(state.page) : splitUrl(window.location.href);
        }
        function issetData() {
            if (aActive.getAttribute("data-index") && aActive.dataset.index.length) {
                changeState();
                pageToggle(aActive.dataset.index);
                query();
            } else error(new Error("page undefined"));
        }
        function query() {
            ajax("php-plugin/template.php", {
                type: "fetch",
                method: "post",
                body: state.page,
                answers: function(response) {
                    console.log(response);
                },
                error: function(error) {
                    console.error(error);
                },
                succes: function(succes) {
                    insert(succes.content);
                }
            });
        }
        function insert(content) {
            document.querySelector("main.page").innerHTML = "";
            document.querySelector("main.page").insertAdjacentHTML("beforeend", content);
            paramert();
        }
    }
    let tempTable = false;
    const cards = {
        osvLvl: `<div class="specialties__body">\n\t\t\t\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t\t\t\t<div class="card-chapter__form form-card form-card_university">\n\t\t\t\t\t\t\t\t<div class="form-card__header header-card">\n\t\t\t\t\t\t\t\t\t<h4 class="header-card__dir">Університет <span class="_icon-arrow-down"></span> ${"Освітні ступені"}</h4>\n\t\t\t\t\t\t\t\t\t<div class="header-card__buttons">\n\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_copy _icon-copy" type="reset"></button>\n\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_delete _icon-delete" type="reset"></button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div hidden class="form-card__items form-card__items_number">\n\t\t\t\t\t\t\t\t\t<p class="form-card__number">2</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_code" autocomplete="off" type="text" value="Edit name" name="form[]">\n\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t<textarea class="form-card__input form-card__input_desc form-card__input_dod-opt" spellcheck="false" autocomplete="off" name="form[]" rows="5">Edit description</textarea>\n\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items_column">\n\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_select-visible">\n\t\t\t\t\t\t\t\t\t\t<select class="form-card__select" data-scroll="80" data-submit name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t<option value="1" selected>Диплом баĸалавра про повну вищу освіту</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="2">Ще щось</option>\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_visible">\n\t\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_link" autocomplete="off" type="text" value="https://lorem-ipsum-site.com/" name="form[]">\n\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button form-card__button_copy _icon-copy"></button>\n\t\t\t\t\t\t\t\t\t\t<span class="form-card__span">Copied</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>`,
        formStudy: `<div class="specialties__body">\n\t\t\t\t\t\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t\t\t\t\t\t<div class="card-chapter__form form-card form-card_form-study">\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__header header-card">\n\t\t\t\t\t\t\t\t\t\t\t<h4 class="header-card__dir">Університет <span class="_icon-arrow-down"></span> ${"Форма навчання"}</h4>\n\t\t\t\t\t\t\t\t\t\t\t<div class="header-card__buttons">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_copy _icon-copy" type="reset"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_delete _icon-delete" type="reset"></button>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div hidden class="form-card__items form-card__items_number">\n\t\t\t\t\t\t\t\t\t\t\t<p class="form-card__number form-card__number_form">2</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items">\n\t\t\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_title" autocomplete="off" type="text" value="Edit" name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t</div>`,
        disc: `<div class="specialties__body">\n\t\t\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t\t\t<div class="card-chapter__form form-card form-card_dis">\n\t\t\t\t\t\t\t<div class="form-card__header header-card">\n\t\t\t\t\t\t\t\t<h4 class="header-card__dir">Дисципліни <span class="_icon-arrow-down"></span> ${"NN00000000"}</h4>\n\t\t\t\t\t\t\t\t<div class="header-card__buttons">\n\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_copy _icon-copy" type="reset"></button>\n\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_delete _icon-delete" type="reset"></button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div hidden class="form-card__items form-card__items_number">\n\t\t\t\t\t\t\t\t<p class="form-card__number">2</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t<textarea class="form-card__input form-card__input_desc" spellcheck="false" autocomplete="off" name="form[]" rows="3">Edit</textarea>\n\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t<label class="form-card__label">Шифр: </label>\n\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_code" autocomplete="off" type="text" value="NN00000000" name="form[]">\n\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>`,
        dodOpt: `<div class="specialties__body">\n\t\t\t\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t\t\t\t<div class="card-chapter__form form-card form-card_dod-opt">\n\t\t\t\t\t\t\t\t<div class="form-card__header header-card">\n\t\t\t\t\t\t\t\t\t<h4 class="header-card__dir">Дод. освітні опції <span class="_icon-arrow-down"></span> ${"Edit"}</h4>\n\t\t\t\t\t\t\t\t\t<div class="header-card__buttons">\n\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_copy _icon-copy" type="reset"></button>\n\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_delete _icon-delete" type="reset"></button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div hidden class="form-card__items form-card__items_number">\n\t\t\t\t\t\t\t\t\t<p class="form-card__number">2</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_code" autocomplete="off" type="text" value="Edit name" name="form[]">\n\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t<textarea class="form-card__input form-card__input_desc form-card__input_dod-opt" spellcheck="false" autocomplete="off" name="form[]" rows="5">Edit description</textarea>\n\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>`,
        spec: `\t<div class="specialties__body">\n\t\t\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t\t\t<div class="card-chapter__form form-card">\n\t\t\t\t\t\t\t<div class="form-card__header header-card">\n\t\t\t\t\t\t\t\t<h4 class="header-card__dir">Спеціальності <span class="_icon-arrow-down"></span> ${"Edit short name"}</h4>\n\t\t\t\t\t\t\t\t<div class="header-card__buttons">\n\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_copy _icon-copy" type="reset"></button>\n\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_delete _icon-delete" type="reset"></button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div hidden class="form-card__items form-card__items_number form-card__items_order-1 form-card__items_order-1">\n\t\t\t\t\t\t\t\t<p class="form-card__number">2</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-card__items form-card__items form-card__items_order-2">\n\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_title" autocomplete="off" type="text" value="Edit short name" name="form[]">\n\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-card__items form-card__items_order-3">\n\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t<textarea class="form-card__input form-card__input_desc" spellcheck="false" autocomplete="off" name="form[]" rows="3">Edit full name</textarea>\n\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="form-card__items form-card__items_order-4">\n\t\t\t\t\t\t\t\t<label class="form-card__label">Шифр: </label>\n\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_max-width">\n\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_code" autocomplete="off" type="text" value="000" name="form[]">\n\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>`,
        dodOsvOpt: `<div class="specialties__body">\n\t\t\t\t\t\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t\t\t\t\t\t<div class="card-chapter__form form-card form-card_dod-osv-opt">\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__header header-card">\n\t\t\t\t\t\t\t\t\t\t\t<h4 class="header-card__dir">Університет <span class="_icon-arrow-down"></span> ${"Edit title"}</h4>\n\t\t\t\t\t\t\t\t\t\t\t<div class="header-card__buttons">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_copy _icon-copy" type="reset"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_delete _icon-delete" type="reset"></button>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div hidden class="form-card__items form-card__items_number">\n\t\t\t\t\t\t\t\t\t\t\t<p class="form-card__number form-card__number_form">2</p>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items">\n\t\t\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_title" autocomplete="off" type="text" value="Edit title" name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t\t\t<textarea class="form-card__input form-card__input_desc form-card__input_dod-opt" spellcheck="false" autocomplete="off" name="form[]" rows="5">Edit description</textarea>\n\t\t\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items_column">\n\t\t\t\t\t\t\t\t\t\t\t<label class="form-card__label">Зв’язати з: </label>\n\t\t\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_select-visible">\n\t\t\t\t\t\t\t\t\t\t\t\t<select class="form-card__select" data-scroll="80" data-label name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="" selected>- Обрати -</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="2">Подвійні студії (в т.ч. програма Erasmus)</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="3">Практика</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="4">Мовні компетенції</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="5">Hard Skills</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="6">Soft Skills</option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="7">Cпорт</option>\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_visible">\n\t\t\t\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_link" autocomplete="off" type="text" value="https://lorem-ipsum-site.com/" name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button form-card__button_copy _icon-copy"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="form-card__span">Copied</span>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t</div>`,
        osvProg: `<div class="specialties__body">\n\t\t\t\t\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t\t\t\t\t<div class="card-chapter__form form-card form-card_osv-prog" data-one-select>\n\t\t\t\t\t\t\t\t\t<div class="form-card__header header-card">\n\t\t\t\t\t\t\t\t\t\t<h4 class="header-card__dir">Дод. освітні опції <span class="_icon-arrow-down"></span> Edit name</h4>\n\t\t\t\t\t\t\t\t\t\t<div class="header-card__buttons">\n\t\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_copy _icon-copy" type="reset"></button>\n\t\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_delete _icon-delete" type="reset"></button>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div hidden class="form-card__items form-card__items_number">\n\t\t\t\t\t\t\t\t\t\t<p class="form-card__number form-card__number_form">2</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t\t<textarea class="form-card__input form-card__input_desc form-card__input_dod-opt" spellcheck="false" autocomplete="off" name="form[]" rows="2">Edit name</textarea>\n\t\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t\t<textarea class="form-card__input form-card__input_desc form-card__input_dod-opt" spellcheck="false" autocomplete="off" name="form[]" rows="5">Edit description</textarea>\n\t\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items_column">\n\t\t\t\t\t\t\t\t\t\t<label class="form-card__label">Спеціальність</label>\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_select-visible">\n\t\t\t\t\t\t\t\t\t\t\t<select class="form-card__select" data-scroll="80" data-label data-submit name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="" selected>- Обрати -</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="2">ІПЗ</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="3">ОІОП</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="4">ПТБД</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="5">КН</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="6">ЮФ</option>\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items_column">\n\t\t\t\t\t\t\t\t\t\t<label class="form-card__label">Структурний підрозділ</label>\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_select-visible">\n\t\t\t\t\t\t\t\t\t\t\t<select class="form-card__select" data-scroll="80" data-label data-submit name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="" selected>- Обрати -</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="2">ННЕІ</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="3">ННІУБО</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="4">ФІТ</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="5">КФК</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="6">ННТІ</option>\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items_column">\n\t\t\t\t\t\t\t\t\t\t<label class="form-card__label">Освітній ступінь</label>\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_select-visible">\n\t\t\t\t\t\t\t\t\t\t\t<select class="form-card__select" data-scroll="80" data-label data-submit name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="" selected>- Обрати -</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="2">Фаховий Молодший Бакалавр</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="3">Молодший Бакалавр</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="4">Бакалавр</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="5">Магістр</option>\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items_column">\n\t\t\t\t\t\t\t\t\t\t<label class="form-card__label">Форма навчання</label>\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_select-visible">\n\t\t\t\t\t\t\t\t\t\t\t<select class="form-card__select" data-scroll="80" data-label data-submit name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="" selected>- Обрати -</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="2">Денна</option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="3">Заочна</option>\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_visible">\n\t\t\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_link" autocomplete="off" type="text" value="https://lorem-ipsum-site.com/" name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button form-card__button_copy _icon-copy"></button>\n\t\t\t\t\t\t\t\t\t\t\t<span class="form-card__span">Copied</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t</div>`,
        prof: `<div class="specialties__body">\n\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t<div class="card-chapter__form form-card form-card_prof" data-one-select>\n\t\t\t\t\t<div class="form-card__header header-card">\n\t\t\t\t\t\t<h4 class="header-card__dir">Дод. освітні опції <span class="_icon-arrow-down"></span> Edit title</h4>\n\t\t\t\t\t\t<div class="header-card__buttons">\n\t\t\t\t\t\t\t<button class="header-card__button header-card__button_copy _icon-copy" type="reset"></button>\n\t\t\t\t\t\t\t<button class="header-card__button header-card__button_delete _icon-delete" type="reset"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div hidden class="form-card__items form-card__items_number">\n\t\t\t\t\t\t<p class="form-card__number form-card__number_form">2</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t<textarea class="form-card__input form-card__input_desc form-card__input_dod-opt" spellcheck="false" autocomplete="off" name="form[]" rows="2">Edit title</textarea>\n\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-card__items form-card__items_column form-card__items_min-height">\n\t\t\t\t\t\t<label class="form-card__label">Ступінь</label>\n\n\t\t\t\t\t\t<div class="form-card__item form-card__item_select-visible">\n\t\t\t\t\t\t\t<select class="form-card__select" data-scroll="80" data-label data-submit name="form[]">\n\t\t\t\t\t\t\t\t<option value="" selected>- Обрати -</option>\n\t\t\t\t\t\t\t\t<option value="2">Фаховий Молодший Бакалавр</option>\n\t\t\t\t\t\t\t\t<option value="3">Молодший Бакалавр</option>\n\t\t\t\t\t\t\t\t<option value="4">Бакалавр</option>\n\t\t\t\t\t\t\t\t<option value="5">Магістр</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-card__items form-card__items_column form-card__items_min-height">\n\t\t\t\t\t\t<label class="form-card__label">Освітня програма</label>\n\t\t\t\t\t\t<div class="form-card__item form-card__item_select-visible">\n\t\t\t\t\t\t\t<select class="form-card__select" data-scroll="80" data-label data-submit name="form[]">\n\t\t\t\t\t\t\t\t<option value="" selected>- Обрати -</option>\n\t\t\t\t\t\t\t\t<option value="2">Економіка</option>\n\t\t\t\t\t\t\t\t<option value="3">Менеджмент</option>\n\t\t\t\t\t\t\t\t<option value="4">Право</option>\n\t\t\t\t\t\t\t\t<option value="5">Галузеве машинобудування</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>`,
        struct: `<div class="specialties__body">\n\t\t\t\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t\t\t\t<div class="card-chapter__form form-card form-card_struct">\n\t\t\t\t\t\t\t\t<div class="form-card__header header-card">\n\t\t\t\t\t\t\t\t\t<h4 class="header-card__dir">Структурні підрозділи <span class="_icon-arrow-down"></span> Card title</h4>\n\t\t\t\t\t\t\t\t\t<div class="header-card__buttons">\n\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_copy _icon-copy" type="reset"></button>\n\t\t\t\t\t\t\t\t\t\t<button class="header-card__button header-card__button_delete _icon-delete" type="reset"></button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div hidden class="form-card__items form-card__items_number">\n\t\t\t\t\t\t\t\t\t<p class="form-card__number form-card__number_form">2</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items">\n\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t<input class="form-card__input form-card__input_title" autocomplete="off" type="text" value="Edit title" name="form[]">\n\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="form-card__items">\n\t\t\t\t\t\t\t\t\t<div class="form-card__item">\n\t\t\t\t\t\t\t\t\t\t<textarea class="form-card__input form-card__input_desc form-card__input_dod-opt" spellcheck="false" autocomplete="off" name="form[]" rows="5">Edit description</textarea>\n\t\t\t\t\t\t\t\t\t\t<button type="submit" class="form-card__button _icon-done"></button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="form-card__items form-card__items_column">\n\t\t\t\t\t\t\t\t\t<label class="form-card__label">Тип підрозділу </label>\n\t\t\t\t\t\t\t\t\t<div class="form-card__item form-card__item_select-visible">\n\t\t\t\t\t\t\t\t\t\t<select class="form-card__select" data-scroll="80" data-label data-submit name="form[]">\n\t\t\t\t\t\t\t\t\t\t\t<option value="" selected>- Обрати -</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="2">Коледж</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="3">Інститут</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="4">Факультет</option>\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>`
    };
    window.addEventListener("load", mainFunc);
    document.addEventListener("beforePopupClose", (function(e) {
        const removeCard = document.querySelector("._remove-card");
        if (removeCard) removeCard.classList.remove("_remove-card");
    }));
    function mainFunc() {
        document.addEventListener("click", (function(e) {
            const target = e.target;
            if (target.closest(".menu__link")) {
                e.preventDefault();
                toogleActiveLink(target);
            }
            if (target.closest(".form-card__input")) {
                e.preventDefault();
                removeFocuseInput();
                if (target.parentElement.classList.contains("form-card__item")) target.parentElement.classList.add("_focus");
            } else removeFocuseInput();
            if (target.closest(".header-card__button_delete")) {
                modules_flsModules.popup.open("#deleteCard");
                target.classList.add("_remove-card");
            }
            if (target.closest(".delete-card__button_remove")) {
                e.preventDefault();
                removeCard();
            }
            if (target.closest(".header-card__button_copy")) {
                e.preventDefault();
                copyCard(target);
            }
            if (target.closest(".header-card__button_copy-user")) {
                const select = document.querySelector(".form-card__select");
                select.children[3].setAttribute("data-checked-disabled", "");
            }
            if (target.closest(".form-card__button_copy")) {
                e.preventDefault();
                copyLink(target);
            }
            if (target.closest(".header-fillter__input")) target.parentElement.classList.add("_focus");
            if (target.closest(".header-fillter__button_search")) target.parentElement.parentElement.classList.toggle("_visibility");
            if (target.closest(".header-fillter__button_sort")) target.classList.toggle("_active");
            if (target.closest(".controlls-specialties__button")) {
                if (target.classList.contains("controlls-specialties__button_spec")) addCard(target, cards.spec);
                if (target.classList.contains("controlls-specialties__button_dis")) addCard(target, cards.disc);
                if (target.classList.contains("controlls-specialties__button_dod-opt")) addCard(target, cards.dodOpt);
                if (target.classList.contains("controlls-specialties__button_osv-lvl")) addCard(target, cards.osvLvl, 1);
                if (target.classList.contains("controlls-specialties__button_form-study")) addCard(target, cards.formStudy);
                if (target.classList.contains("controlls-specialties__button_dod-osv-opt")) addCard(target, cards.dodOsvOpt, 1);
                if (target.classList.contains("controlls-specialties__button_osv-prog")) addCard(target, cards.osvProg, 4);
                if (target.classList.contains("controlls-specialties__button_prof")) addCard(target, cards.prof, 2);
                if (target.classList.contains("controlls-specialties__button_prof")) addCard(target, cards.prof, 2);
                if (target.classList.contains("controlls-specialties__button_struct")) addCard(target, cards.struct, 1);
            }
            if (target.closest(".menu__link._active")) ;
            if (target.closest(".specialties__button_lvl")) {
                const lvl = document.querySelector("._hidden-body_lvl");
                if (lvl) document.documentElement.classList.remove("_hidden-body_lvl"); else document.documentElement.classList.add("_hidden-body_lvl");
            }
            if (target.closest(".specialties__button_form")) {
                const form = document.querySelector("._hidden-body_form");
                if (form) document.documentElement.classList.remove("_hidden-body_form"); else document.documentElement.classList.add("_hidden-body_form");
            }
            if (target.closest(".select__value") || target.closest(".select__content") || target.closest(".select__option") || target.closest(".select__title")) {
                const selectValue = document.querySelectorAll(".select__value");
                const selectOptions = document.querySelectorAll(".select__options");
                if (selectValue) selectOptions.forEach(((select, i) => {
                    select.style.top = `${selectValue[i].clientHeight - 2}px`;
                }));
                let select;
                if (target.closest(".select__content")) select = target.parentElement.parentElement.parentElement.previousElementSibling; else if (target.closest(".select__value")) select = target.parentElement.parentElement.previousElementSibling; else if (target.closest(".select__title")) select = target.parentElement.previousElementSibling;
                if (select && select.multiple) {
                    for (let i = 0; i < select.length; i++) {
                        const sel = select[i];
                        if (sel.hasAttribute("data-checked-disabled")) select.children[i].setAttribute("selected", "selected");
                    }
                    modules_flsModules.select.setOptions(select.parentElement, select);
                }
            }
        }));
        document.addEventListener("change", (function(e) {
            toggleCartToTable();
        }));
        toggleCartToTable();
        updateFormNumber();
        renderHTML(document.querySelector(".menu"), (function(error) {
            console.error(error);
            toast("error");
        }), AJAX, (function() {
            toggleCartToTable();
        }));
    }
    function copyCard(target) {
        const header = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0];
        header.remove();
        target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.insertAdjacentHTML("afterbegin", `\n\t\t<div class="specialties__body specialties__body_hidden">\n\t\t\t${header.innerHTML}\n\t\t</div>\n\t\t<div class="specialties__body">\n\t\t\t<form action="" class="specialties__card card-chapter _delete">\n\t\t\t\t${target.parentElement.parentElement.parentElement.parentElement.innerHTML}\n\t\t\t</form>\n\t\t</div>`);
        const cards = document.querySelectorAll(".specialties__body");
        cards[1].style.overflow = `hidden`;
        cards[1].style.boxShadow = `none`;
        updateFormNumber();
        setTimeout((() => {
            const deleteClass = document.querySelector(".card-chapter._delete");
            if (deleteClass) deleteClass.classList.remove("_delete");
        }), 200);
        setTimeout((() => {
            cards[1].style.overflow = `visible`;
            cards[1].style.boxShadow = `0px 10px 13px rgba(17, 38, 146, 0.05)`;
        }), 550);
    }
    function addCard(target, card, initSelect = 0) {
        const header = target.parentElement.nextElementSibling.children[0];
        header.remove();
        target.parentElement.nextElementSibling.insertAdjacentHTML("afterbegin", `\n\t\t<div class="specialties__body specialties__body_hidden">\n\t\t\t${header.innerHTML}\n\t\t</div>\n\t\t${card}`);
        const cards = document.querySelectorAll(".specialties__body");
        if (initSelect) for (let i = 0; i < initSelect; i++) modules_flsModules.select.selectInit(document.querySelectorAll("select")[i]);
        cards[1].style.overflow = `hidden`;
        cards[1].style.boxShadow = `none`;
        updateFormNumber();
        setTimeout((() => {
            const deleteClass = document.querySelector(".card-chapter._delete");
            if (deleteClass) deleteClass.classList.remove("_delete");
        }), 200);
        setTimeout((() => {
            cards[1].style.overflow = `visible`;
            cards[1].style.boxShadow = `0px 10px 13px rgba(17, 38, 146, 0.05)`;
        }), 550);
    }
    function toggleCartToTable() {
        const table = document.querySelector("._table");
        const switchTable = document.querySelectorAll(".switch-visibility__label_table");
        const switchGrid = document.querySelectorAll(".switch-visibility__label_grid");
        const gridInput = document.querySelector("#grid");
        const tableInput = document.querySelector("#table");
        if (tableInput && tableInput.checked) {
            document.documentElement.classList.add("_table");
            switchTable.forEach((element => {
                element.classList.add("_active");
            }));
            switchGrid.forEach((element => {
                element.classList.remove("_active");
            }));
        } else if (gridInput && gridInput.checked) {
            document.documentElement.classList.remove("_table");
            switchTable.forEach((element => {
                element.classList.remove("_active");
            }));
            switchGrid.forEach((element => {
                element.classList.add("_active");
            }));
        } else if (table && gridInput) {
            document.documentElement.classList.add("_table");
            switchTable.forEach((element => {
                element.classList.add("_active");
            }));
            switchGrid.forEach((element => {
                element.classList.remove("_active");
            }));
        } else if (gridInput) {
            document.documentElement.classList.remove("_table");
            switchTable.forEach((element => {
                element.classList.remove("_active");
            }));
            switchGrid.forEach((element => {
                element.classList.add("_active");
            }));
        }
    }
    function updateFormNumber() {
        const numbersForm = document.querySelectorAll(".form-card__number_form");
        const numbers = document.querySelectorAll(".form-card__number");
        if (numbersForm.length) {
            numbers.forEach(((number, i) => {
                number.innerHTML = `${i + 1}`;
            }));
            numbersForm.forEach(((number, i) => {
                number.innerHTML = `${i + 1}`;
            }));
        } else if (numbers.length) numbers.forEach(((number, i) => {
            number.innerHTML = `${i + 1}`;
        }));
    }
    function copyLink(target) {
        target.nextElementSibling.classList.add("_show");
        setTimeout((() => {
            target.nextElementSibling.classList.remove("_show");
        }), 1500);
        const copyLink = target.previousElementSibling.previousElementSibling;
        target.parentElement.classList.add("_focus");
        copyLink.select();
        document.execCommand("copy");
    }
    function removeFocuseInput() {
        const focusInputCard = document.querySelector(".form-card__item._focus");
        const focusInputFillter = document.querySelector(".header-fillter__item._focus");
        if (focusInputCard) focusInputCard.classList.remove("_focus");
        if (focusInputFillter) focusInputFillter.classList.remove("_focus");
    }
    function removeCard() {
        const card = document.querySelector("._remove-card");
        card.parentElement.parentElement.parentElement.parentElement.classList.add("_delete");
        card.parentElement.parentElement.parentElement.parentElement.parentElement.style.overflow = `hidden`;
        card.parentElement.parentElement.parentElement.parentElement.parentElement.style.boxShadow = `none`;
        setTimeout((() => {
            card.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
            updateFormNumber();
        }), 400);
        modules_flsModules.popup.close();
    }
    function toogleActiveLink(target) {
        const activeLink = document.querySelector(".menu__link._active");
        if (activeLink) activeLink.classList.remove("_active");
        if (!target.classList.contains("_active")) {
            target.classList.add("_active");
            renderHTML(document.querySelector(".menu"), (function(error) {
                console.error(error);
                toast("error");
            }), AJAX, (function() {
                modules_flsModules.select.selectsInit(document.querySelectorAll("select"));
                toggleCartToTable();
                checkTable(target);
            }));
        }
    }
    function checkTable(target) {
        if (target.hasAttribute("data-notable")) {
            const table = document.querySelector("._table");
            if (table) {
                tempTable = true;
                table.classList.remove("_table");
            }
        } else if (tempTable) {
            document.querySelector(".switch-visibility__label_table").classList.add("_active");
            document.querySelector(".switch-visibility__label_grid").classList.remove("_active");
            document.documentElement.classList.add("_table");
            tempTable = false;
        }
    }
    function toast(type = "error", text = "Lorem ipsum dolor sit amet consectetur.", speed = 2) {
        let toastContainer = document.querySelector(".toasts-container");
        switch (type) {
          case "error":
            toastContainer.insertAdjacentHTML("beforeend", `\n\t\t\t\t<div class="toasts-container__toast toast toast_${type}">\n\t\t\t\t\t<div class="toast__progress toast__progress_${type}"></div>\n\t\t\t\t\t<div class="toast__message">\n\t\t\t\t\t\t<p class="toast__header toast__header_${type}"><span></span> ${type}</p>\n\t\t\t\t\t\t<p class="toast__text">${text}</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t`);
            break;

          case "success":
            toastContainer.insertAdjacentHTML("beforeend", `\n\t\t\t\t<div class="toasts-container__toast toast toast_${type}">\n\t\t\t\t\t<div class="toast__progress toast__progress_${type}"></div>\n\t\t\t\t\t<div class="toast__message">\n\t\t\t\t\t\t<p class="toast__header toast__header_${type}"><span></span> ${type}</p>\n\t\t\t\t\t\t<p class="toast__text">${text}</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t`);
            break;
        }
        let toast = document.querySelector(".toast:last-child .toast__progress");
        let progress_width = 100;
        setInterval((() => {
            if (progress_width <= 0) toast.closest(".toast").remove(); else {
                progress_width -= speed;
                toast.style.width = progress_width + "%";
            }
        }), 100);
    }
    window["FLS"] = true;
    isWebp();
    menuInit();
    fullVHfix();
    formFieldsInit({
        viewPass: true
    });
    //! Не забыть включить после того как сделать переключение между страницами
        asideScroll();
})();