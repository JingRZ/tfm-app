import { gql } from '@apollo/client';

const FIND_HINT = gql`
    query FindHint($cardId: String!, $step: Int!) {
        findHint(cardId: $cardId, step: $step) {
            code
            title
            cardID
            step
            description
            image
        }
    }
`
export default {FIND_HINT}