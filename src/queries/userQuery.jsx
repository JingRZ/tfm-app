import { gql } from '@apollo/client';

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`

const REFRESH_SESSION_TOKEN = gql`
    mutation RefreshSessionToken($refreshToken: String!, $username: String!) {
        refreshSessionToken(refreshToken: $refreshToken, username: $username) {
            token
        }
    }
`

const ME = gql`
    query Me {
        me {
            username
            coins
            cards {
                cardCode
            }
        }
    }
`

const UPDATE_CARD_PROGRESS = gql`
    mutation UpdateCardStatus($cardCode: String!, $step: Int!) {
        updateCardStatus(cardCode: $cardCode, step: $step) {
            currentStep
            finish
        }
    }
`
export default {LOGIN, REFRESH_SESSION_TOKEN, ME, UPDATE_CARD_PROGRESS}