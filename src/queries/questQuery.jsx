import { gql } from '@apollo/client';

const FIND_QUEST_GAMESTEP = gql`
    query FindQuestByGameStep($cardId: String!, $step: Int!) {
        findQuestByGameStep(cardID: $cardId, step: $step) {
            code
            title
            image
            description
            ... on Quiz {
            question
            options
            }
            ... on Riddle {
            question
            }
        }
    }
`

const CHECK_QUEST_ANS = gql`
    query CheckAns($code: String!, $answer: String!) {
        checkAns(code: $code, answer: $answer){
            correct
            finished
        }
    }
`

export default {FIND_QUEST_GAMESTEP, CHECK_QUEST_ANS}