import { state } from "../../state";

export function initTaskContainer() {
  class TaskContainer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.render();
      this.connectCallback();
    }
    connectCallback() {
      state.subscribe(() => this.render());
    }

    lodelocalstorage() {
      return sessionStorage.key(0);
    }

    render() {
      const style = document.createElement("style");
      style.innerHTML = `
        .contenedorTareas{
            margin: 20px auto;
            
            max-width: 960px;
            display: flex;
            flex-wrap: wrap;
            gap:20px;
            align-items: center;
            justify-content: space-around;

        }
      
      `;
      let sessionStorageKey = this.lodelocalstorage();
      let oldState;

      if (!sessionStorageKey) {
        oldState = state.getState().list;
      } else {
        const casi = JSON.parse(sessionStorage.getItem(sessionStorageKey) || "{}");
        oldState = casi.list;
      }

      const div = document.createElement("div");
      div.innerHTML = `
            <div class="contenedorTareas">
                ${oldState
                  .map((tarea, index) => {
                    return `<task-el id="${index}" >${tarea}</task-el>`;
                  })
                  .join("")}
            </div>
        
        `;
      while (this.shadowRoot?.firstChild) {
        this.shadowRoot.firstChild.remove();
      }
      this.shadowRoot?.appendChild(style);
      this.shadowRoot?.appendChild(div);
    }
  }

  customElements.define("task-container", TaskContainer);
}
