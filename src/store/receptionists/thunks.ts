import { getReceptionist }        from '../../api/endpoints/receptionist';
import { IThunkAction }           from '../types';
import { fetchReceptionistAsync } from './actions';


export const changeAReceptionist: IThunkAction = async(dispatch, getState) => {
  const state = getState();
  if (state.receptionists.loading) {
    return;
  }
  dispatch(fetchReceptionistAsync.request());

  return getReceptionist()
    .then(
      receptionist => dispatch(fetchReceptionistAsync.success(receptionist)),
      error => dispatch(fetchReceptionistAsync.failure(error)),
    );
};

export const initReceptionist: IThunkAction = async(dispatch, getState) => {
  const state = getState();
  if (state.receptionists.initialized !== true) {
    return dispatch(changeAReceptionist);
  }
};
