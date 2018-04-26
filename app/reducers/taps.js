import {
  TAPS_LOADING,
  UPDATE_TAPS,
  UPDATE_TAP_FIELDS,
  UPDATE_TAP_FIELD,
  SCHEMA_RECEIVED,
  UPDATE_SCHEMA_FIELD,
  SCHEMA_UPDATED,
  TAP_ERROR,
  TOGGLE_MODAL
} from '../actions/taps';

export type tapsStateType = {
  +tapsLoading: boolean,
  +taps: Array<string>,
  +tapFields: Array<{}>,
  +fieldValues: {},
  +schema: Array<{}>,
  +schemaUpdated: false,
  +error: string,
  +showModal: boolean
};

const defaultState = {
  tapsLoading: false,
  taps: [],
  tapFields: [],
  fieldValues: {},
  schema: [],
  schemaUpdated: false,
  error: '',
  showModal: false
};

export default function taps(state = defaultState, action) {
  const { fieldValues } = state;
  const { schema } = state;
  switch (action.type) {
    case TAPS_LOADING:
      return Object.assign({}, state, { tapsLoading: true });
    case UPDATE_TAPS:
      return Object.assign({}, state, {
        tapsLoading: false,
        taps: action.taps,
        error: action.error
      });
    case UPDATE_TAP_FIELDS:
      return Object.assign({}, state, {
        tapsLoading: false,
        tapFields: action.tapFields,
        error: action.error
      });
    case UPDATE_TAP_FIELD:
      fieldValues[action.key] = action.value;
      return Object.assign({}, state, {
        fieldValues
      });
    case SCHEMA_RECEIVED:
      return Object.assign({}, state, {
        tapsLoading: false,
        schema: action.schema,
        error: action.error
      });
    case UPDATE_SCHEMA_FIELD:
      if (schema[action.index]) {
        switch (action.field) {
          case 'selected':
            schema[action.index].metadata[0].metadata[action.field] =
              action.value;

            return Object.assign({}, state, {
              tapSchema: schema
            });
          case 'replication_key':
            schema[action.index].replication_key = action.value;

            return Object.assign({}, state, {
              tapSchema: schema
            });
          default:
            return state;
        }
      }
      return state;
    case SCHEMA_UPDATED:
      return Object.assign({}, state, {
        tapsLoading: false,
        schemaUpdated: true,
        error: action.error
      });
    case TAP_ERROR:
      return Object.assign({}, state, {
        showModal: true,
        schema: [],
        error: action.error,
        tapsLoading: false
      });
    case TOGGLE_MODAL:
      return { ...state, showModal: !state.showModal };
    default:
      return state;
  }
}
