import { initFormTask } from "./components/form-task-el";
import { initTaskContainer } from "./components/task-container";
import { initTaskEl } from "./components/task-el";
(function () {
  initFormTask();
  initTaskContainer()
  initTaskEl()
  const cascaron = document.querySelector("#root") as HTMLElement;
  cascaron.innerHTML = `
        <header class="mainHeader"></header>
        <main>
            <h1 class="mainTitle">Mis Pendientes</h1>
            <formtask-el></formtask-el>
            <task-container></task-container>
        </main>                
        
    `;
})();
