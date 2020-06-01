import createDataContext from './ContextCreator'
import CampusConnectApi from '../api/CampusConnectApi'

const userReviewReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_ALL_REVIEWS':
            return action.payload
        default:
            return state
    }
}

const getAllUserReviews = dispatch => async () => {
    const response = await CampusConnectApi.get('/reviews/users')
    dispatch({ type: 'FETCH_ALL_REVIEWS', payload: response.data })
}

export const { Provider, Context } = createDataContext(
    userReviewReducer,
    { getAllUserReviews },
    {}
)