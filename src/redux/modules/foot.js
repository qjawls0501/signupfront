import { Map } from "immutable";
import { handleActions, createAction } from "redux-actions";

const SET_FOOTER_VISIBILITY = "base/SET_FOOTER_VISIBILITY"; // 푸터 렌더링 여부 설정

export const setFooterVisibility = createAction(SET_FOOTER_VISIBILITY); // visible

const initialState = Map({
  footer: Map({
    visible: true,
  }),
});

export default handleActions(
  {
    [SET_FOOTER_VISIBILITY]: (state, action) =>
      state.setIn(["footer", "visible"], action.payload),
  },
  initialState
);
