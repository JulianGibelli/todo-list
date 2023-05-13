import { state } from "../../state";

export function initFormTask() {
  class FormTask extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
          @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
            .boton{
                border:none;
                background-color:#9CBBE9;               
                padding: 10px;                 
                font-family: 'Roboto', sans-serif;
                font-size: 18px;   
                border-radius: 5px; 
                transition-duration: 0.4s;       
            }
            .boton:hover{
              cursor: pointer;              
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

            }
            .input{
              padding: 10px;
            }
            .formulario{
              padding: 15px;
              background-color: orange;
              margin: 0 auto;
              width: 80vw;              
              display: flex;
              flex-direction: column;
              gap: 15px;
            }   
            /* media queries */
            @media(min-width: 768px){
              .formulario{
                max-width:960pxv
                display: flex;
                flex-direction: row;                 
                justify-content: space-between;             
              }
              .input{
                width: 80%;                
              }
              .boton{
                width:150px;
              }
              
            }

        `;
      const form = document.createElement("form") as Element;
      form.classList.add("formulario")
      const input = document.createElement("input") as HTMLElement;
      input.classList.add("input");
      input.setAttribute("name","tarea")
      input.setAttribute("type","text")
      const boton = document.createElement("button") as HTMLElement;
      boton.textContent = "Agregar";
      boton.classList.add("boton");

      form.appendChild(input);
      form.appendChild(boton);
      this.shadowRoot?.appendChild(style);
      this.shadowRoot?.appendChild(form);

      this.shadowRoot?.querySelector("form")?.addEventListener("submit",(e)=>{
        e.preventDefault()  
        const formInputValue = (e.target as HTMLFormElement).tarea.value;  
        
        state.addTask(formInputValue)
        this.shadowRoot?.querySelector("form")?.reset()
      })
    }
    
  
  }
  customElements.define("formtask-el", FormTask);
}
