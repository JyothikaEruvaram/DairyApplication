/*async function getUserData(token,user_id) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "get",
    };
    return fetch(`/usersdairy/${user_id}`, requestOptions).then((response) =>
        response.json()
    );
}*/

async function deleteEntry(token, user_id) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "delete",
    };
    return fetch(`/usersdairy/${user_id}`, requestOptions).then((response) =>
        response.json()
    );
}

/*async function getUserCredentials(token, user_id) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "get",
    };
    return fetch(`/usercredentials/${user_id}`, requestOptions).then((response) =>
        response.json()
    );
}*/

async function deleteCredentials(token, id) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "delete",
    };
    return fetch(`/usercredentials/${id}`, requestOptions).then((response) =>
        response.json()
    );
}

export {deleteEntry,deleteCredentials};