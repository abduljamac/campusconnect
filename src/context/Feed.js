import createDataContext from './ContextCreator'
import CampusConnectApi from '../api/CampusConnectApi'

const feedReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return action.payload
        default:
            return state
    }
}

const fetchUsers = dispatch => async () => {
    const response = await CampusConnectApi.get('/users')
    dispatch({ type: 'FETCH_USERS', payload: response.data })
}

export const { Provider, Context } = createDataContext(
    feedReducer,
    { fetchUsers },
    {}
)