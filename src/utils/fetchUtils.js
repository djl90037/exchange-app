// fetchUtils.js

export const checkStatus = (response) => {
    if (response.ok) {
        // .ok returns true if response status is between 200 and 299
        return response;
    }
    throw new Error('Request was either 404 or 500');
}

export const json = (response) => response.json()