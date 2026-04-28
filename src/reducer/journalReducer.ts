import type { Notebook } from "../types/NotebookTypes";

type State = {
  notebooks: Notebook[];
};

type Action =
  | { type: "ADD"; payload: Notebook }
  | { type: "DELETE"; payload: number }
  | { type: "UPDATE"; payload: Notebook };

export const journalReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        notebooks: [...state.notebooks, action.payload],
      };

    case "DELETE":
      return {
        ...state,
        notebooks: state.notebooks.filter((note) => note.id !== action.payload),
      };

    case "UPDATE":
      return {
        ...state,
        notebooks: state.notebooks.map((note) =>
          note.id === action.payload.id ? action.payload : note,
        ),
      };

    default:
      return state;
  }
};
