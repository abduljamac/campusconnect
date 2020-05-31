import createDataContext from './ContextCreator'
import CampusConnectApi from '../api/CampusConnectApi'

const reviewReducer = (state, action) => {
    switch (action.type) {
        case 'SUCCESS_MESSAGE':
            return { ...prevState, successMessage: action.payload }
        case 'ADD_ERROR':
            return { errorMessage: action.payload }
        default:
            return state
    }
}

const sendReview = dispatch => async ({ body, freelancerId  }) => {
    console.log(review, freelancerId)
    try {
        const response = await CampusConnectApi.post(`/review/${freelancerId}`, { body } )
        dispatch({ type: 'SUCCESS_MESSAGE', payload: response.data })
    } catch (error) {
        dispatch({ type: 'ADD_ERROR', payload: error.message })
    }
}

export const { Provider, Context } = createDataContext(
    reviewReducer,
    { sendReview },
    {}
)