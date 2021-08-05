import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query allUsers {
    users {
        _id
        username
        bookCount
        savedBooks
    }
}
`;

export const QUERY_SINGLE_USER = gql`
query singleUser($userId: ID!) {
    user(userId: $userId) {
        _id
        username
        bookCount
        savedBooks
    }
}
`;

export const GET_ME = gql`
query me {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            image
            description
            title
            link
        }
    }
}
`;