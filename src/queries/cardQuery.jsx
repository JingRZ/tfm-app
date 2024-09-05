import { gql } from '@apollo/client';

const ALL_CARDS = gql`
    query AllCards {
        allCards {
            title
            code
            duration
            image
            location
            tags
        }
    }
`

const FIND_CARD = gql`
    query FindCard($code: String!) {
        findCard(code: $code) {
            title
            code
            duration
            image
            location
            tags
            description
            checkpoints
            coins
        }
    }
`
export default {ALL_CARDS, FIND_CARD}