import { state } from "../../state";

export function initTaskEl() {
  class TaskEl extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.render();
    }

    render() {
      const style = document.createElement("style");
      style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
                .tarea{
                    width:200px;
                    padding: 10px;
                    
                    min-height: 100px;
                    background-color: #FFF599; 
                    font-family: 'Roboto', sans-serif;
                }

                .selected{
                    outline: solid 2px black;
                }

                button{
                    display:none;
                }

                .seen{
                    display: inherit;
                }

                .tachado{
                    text-decoration: line-through;
                }
            
            `;
      const tarea = document.createElement("div");
      tarea.classList.add("tarea");
      tarea.textContent = this.textContent;
      tarea.setAttribute("id", this.getAttribute("id") || "");

      const botonBorrar = document.createElement("button");
      //guardo info de la tarea
      const infoTarea = this.textContent;
      botonBorrar.textContent = "Eliminar";

      tarea.addEventListener("click", () => {
        if (tarea.className.includes("selected")) {
          tarea.classList.remove("selected");
          botonBorrar.classList.remove("seen");
        } else {
          tarea.classList.add("selected");
          botonBorrar.classList.add("seen");
        }
      });

      botonBorrar.addEventListener("click", () => {
        var oldState = state.getState().list;
        var indice = oldState.findIndex((t) => t == infoTarea);
        const list = oldState.slice(0, indice).concat(oldState.slice(indice + 1));
        tarea.classList.add("tachado");

        setTimeout(() => {
          sessionStorage.removeItem("ListaTareas");
          sessionStorage.setItem("ListaTareas", JSON.stringify({ list }));

          state.setState({ list });
        }, 1000);
      });

      this.shadowRoot?.appendChild(style);
      tarea.appendChild(botonBorrar);
      this.shadowRoot?.appendChild(tarea);
    }
  }
  customElements.define("task-el", TaskEl);
}
