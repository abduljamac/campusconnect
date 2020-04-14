import createDataContext from './ContextCreator'
import { AsyncStorage } from 'react-native';
import CampusConnect from '../api/CampusConnectApi'


const authReducer = (state, action) => {

    switch (action.type) {
        default:
            return state
    }
}

const fetchUserDAetails = dispatch => async () => {
    const response = await CampusConnect.get('/tracks');
    dispatch({ type: 'fetch_tracks', payload: response.data });
}

export const { Provider, Context } = createDataContext(
    authReducer,
    {  },
    {  }
)