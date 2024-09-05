import { gql } from '@apollo/client';

const FIND_AD = gql`
    query FindAd($code: String!) {
        findAd(code: $code) {
            title
            image
            url
            location
            tag
        }
    }
`
export default {FIND_AD}