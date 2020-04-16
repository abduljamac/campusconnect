import createDataContext from './ContextCreator'
import CampusConnectApi from '../api/CampusConnectApi'

const userDetailReducer = (state, action) => {

    switch (action.type) {
        case 'GET_USER_DETAILS':
            return action.payload
        case 'ADD_ERROR':
            return { errorMessage: action.payload }
        default:
            return state
    }
}

const fetchUserDetails = dispatch => async () => {
    const response = await CampusConnectApi.get('/user')
    dispatch({ type: 'GET_USER_DETAILS', payload: response.data })
}

export const { Provider, Context } = createDataContext(
    userDetailReducer,
    { fetchUserDetails },
    { }
    // { errorMessage: '' }
)