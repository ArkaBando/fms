export const SET_FILE = "SET_FILE";
export const ADD_FILE = "ADD_FILE";
let initialState = {
  file: {
    parentFolderId: null,
    currentFolderId: null,
    files:[]
  },
};

const prefReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_FILE":
      state = { ...state, file: {...state.file, 
        parentFolderId: action.payload.parentFolderId ,
        currentFolderId: action.payload.currentFolderId } };
      return state;
    case "ADD_FILE":
      state = { ...state, file: { ...state.file, files: action.payload}};
      return state;
    default:
      return state;
  }
};

export default prefReducer;

export function setFileSettings(state) {
  return { type: SET_FILE, payload: state };
}
export function setFiles(state) {
    return { type: ADD_FILE, payload: state };
}