class Countdown extends HTMLElement {
  static observedAttributes = ["seconds", "minutes", "hours", "active"];
  /**
   * @type {NodeJS.Timeout|undefined}
   */
  #interval;

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("active", "false");
    const template = /** @type {HTMLTemplateElement} */ (
      document.getElementById("template-countdown")
    );
    this.appendChild(template.content);
    this.querySelector(".btn-start")?.addEventListener("click", () => {
      this.start();
    });
    this.querySelector(".btn-stop")?.addEventListener("click", () => {
      this.stop();
    });
  }

  /**
   * @param {string} name
   * @param {string} oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active" && newValue === "true") {
      this.#interval = setInterval(() => this.#tick(), 1000);
      return;
    }

    if (name === "active" && newValue === "false") {
      clearInterval(this.#interval);
      return;
    }

    if (name === "seconds") {
      this.style.setProperty("--seconds", newValue);
      return;
    }

    if (name === "minutes") {
      this.style.setProperty("--minutes", newValue);
      return;
    }

    if (name === "hours") {
      this.style.setProperty("--hours", newValue);
      return;
    }
  }

  start() {
    this.setAttribute("active", "true");
  }

  stop() {
    this.setAttribute("active", "false");
  }

  /** Advance the countdown by 1 second.
   * @returns {boolean} Did the countdown advance?
   */
  #tick() {
    const seconds = Number.parseInt(this.getAttribute("seconds") ?? "0");
    if (seconds > 0) {
      this.setAttribute("seconds", String(seconds - 1));
      return true;
    }

    const minutes = Number.parseInt(this.getAttribute("minutes") ?? "0");
    if (minutes > 0) {
      this.setAttribute("seconds", "59");
      this.setAttribute("minutes", String(minutes - 1));
      return true;
    }

    const hours = Number.parseInt(this.getAttribute("hours") ?? "0");
    if (hours > 0) {
      this.setAttribute("seconds", "59");
      this.setAttribute("minutes", "59");
      this.setAttribute("hours", String(hours - 1));
      return true;
    }

    return false;
  }
}

customElements.define("countdown-element", Countdown);
