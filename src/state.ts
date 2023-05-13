export const state = {
  data: {
    list: [],
  },
  listeners: [],

  getState() {
    return this.data;
  },

  setState(nuevoState: object) {
    this.data = nuevoState;

    for (const cb of this.listeners) {
      cb();
    }
  },

  addTask(nuevaTarea: string) {
    const oldState = this.getState(); //me devuelve una coleccion {list:["1","2","3"]}
    //le agrego la nueva tarea
    oldState.list.push(nuevaTarea);
    //actualizo el estado con la tarea agregada

    sessionStorage.setItem("ListaTareas", JSON.stringify(oldState));
    this.setState(oldState);
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
