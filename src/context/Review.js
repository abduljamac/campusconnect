import createDataContext from './ContextCreator'
import CampusConnectApi from '../api/CampusConnectApi'

const reviewReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_ALL_REVIEWS':
            return action.payload
        default:
            return state
    }
}

const getAllReviews = dispatch => async () => {
    const response = await CampusConnectApi.get('/reviews')
    dispatch({ type: 'FETCH_ALL_REVIEWS', payload: response.data })
}

const sendReview = dispatch => async ({ body, freelancerId }) => {
    await CampusConnectApi.post(`/review/${freelancerId}`, { body })
}

export const { Provider, Context } = createDataContext(
    reviewReducer,
    { getAllReviews, sendReview },
    {}
)