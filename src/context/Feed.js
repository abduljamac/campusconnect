import createDataContext from './ContextCreator'
import CampusConnectApi from '../api/CampusConnectApi'

const feedReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_FREELANCERS':
            return action.payload
        default:
            return state
    }
}

const fetchFreelancers = dispatch => async () => {
    const response = await CampusConnectApi.get('/freelancers')
    dispatch({ type: 'FETCH_FREELANCERS', payload: response.data })
}

export const { Provider, Context } = createDataContext(
    feedReducer,
    { fetchFreelancers },
    {}
)